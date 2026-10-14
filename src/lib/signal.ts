import type { Entry } from "@/data/types";

/** Original 8,192-sign machine script. Not the Accelerando font. */
export const SIGNAL_BASE = 8192;
export const SIGNAL_START = 0xf0000;
export const SIGNAL_RATE = 22050;

const LOW = [196, 261.63, 329.63, 392, 493.88, 587.33, 698.46, 880];
const HIGH = [987.77, 1174.66, 1318.51, 1567.98, 1760, 1975.53, 2217.46, 2637.02];
const SUB = 110;
const DRONE = 65.41;
const BEAT = 2205;
const GAP = 441;

const FIELDS = ["word", "sentence", "plural", "feminine", "masculine", "neuter", "article"] as const;

export function isSignal(text: string): boolean {
  return /[\u{F0000}-\u{F1FFF}]/u.test(text);
}

export function encodeSignal(text: string): string {
  const bytes = new TextEncoder().encode(text);
  if (!bytes.length || bytes.length >= SIGNAL_BASE) return text;
  let n = 0n;
  for (const b of bytes) n = (n << 8n) | BigInt(b);
  const digits: number[] = [];
  if (n === 0n) digits.push(0);
  else while (n > 0n) {
    digits.push(Number(n % BigInt(SIGNAL_BASE)));
    n /= BigInt(SIGNAL_BASE);
  }
  digits.reverse();
  return [bytes.length, ...digits].map((id) => String.fromCodePoint(SIGNAL_START + id)).join("");
}

export function decodeSignal(glyphs: string): string {
  const ids: number[] = [];
  for (const ch of glyphs) {
    const cp = ch.codePointAt(0) ?? 0;
    if (cp >= SIGNAL_START && cp < SIGNAL_START + SIGNAL_BASE) ids.push(cp - SIGNAL_START);
  }
  if (ids.length < 2) return "";
  const len = ids[0];
  if (!len || len > 4096) return "";
  let n = 0n;
  for (const d of ids.slice(1)) n = n * BigInt(SIGNAL_BASE) + BigInt(d);
  const bytes = new Uint8Array(len);
  for (let i = len - 1; i >= 0; i--) {
    bytes[i] = Number(n & 255n);
    n >>= 8n;
  }
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return "";
  }
}

export function toSignalEntry(entry: Entry): Entry {
  const next: Entry = { ...entry, reading: entry.word };
  for (const key of FIELDS) {
    const value = entry[key];
    if (value) next[key] = encodeSignal(value);
  }
  return next;
}

function tone(samples: Float32Array, start: number, freq: number, amp: number) {
  const attack = 180;
  for (let i = 0; i < BEAT; i++) {
    const env = i < attack ? i / attack : i > BEAT - attack ? (BEAT - i) / attack : 1;
    const t = (start + i) / SIGNAL_RATE;
    samples[start + i] += Math.sin(2 * Math.PI * freq * t) * amp * env;
  }
}

function writeDyad(samples: Float32Array, start: number, id: number, shift: number) {
  tone(samples, start, LOW[(id >> shift) & 7], 0.16);
  tone(samples, start, HIGH[(id >> (shift + 3)) & 7], 0.11);
  if ((id >> 12) & 1) tone(samples, start, SUB, 0.1);
}

/** Pentatonic figure. 13 bits per sign, two soft dyads, plus a drone. */
export function renderSignal(glyphs: string): Float32Array {
  const ids: number[] = [];
  for (const ch of glyphs) {
    const cp = ch.codePointAt(0) ?? 0;
    if (cp >= SIGNAL_START && cp < SIGNAL_START + SIGNAL_BASE) ids.push(cp - SIGNAL_START);
  }
  const frame = GAP + BEAT + GAP + BEAT + GAP;
  const head = BEAT + GAP + BEAT + GAP;
  const samples = new Float32Array(head + frame * Math.max(ids.length, 1) + SIGNAL_RATE / 10);
  for (let i = 0; i < samples.length; i++) samples[i] = Math.sin((2 * Math.PI * DRONE * i) / SIGNAL_RATE) * 0.045;
  tone(samples, 0, LOW[0], 0.16);
  tone(samples, 0, HIGH[0], 0.11);
  tone(samples, BEAT + GAP, LOW[3], 0.16);
  tone(samples, BEAT + GAP, HIGH[3], 0.11);
  ids.forEach((id, index) => {
    const at = head + index * frame;
    writeDyad(samples, at + GAP, id, 0);
    writeDyad(samples, at + GAP + BEAT + GAP, id, 6);
  });
  return samples;
}

function power(samples: Float32Array, start: number, freq: number): number {
  const w = (2 * Math.PI * freq) / SIGNAL_RATE;
  const coeff = 2 * Math.cos(w);
  let s1 = 0;
  let s2 = 0;
  const end = Math.min(samples.length, start + BEAT);
  for (let i = start; i < end; i++) {
    const s0 = samples[i] + coeff * s1 - s2;
    s2 = s1;
    s1 = s0;
  }
  return s1 * s1 + s2 * s2 - coeff * s1 * s2;
}

function loudest(samples: Float32Array, start: number, bank: number[]): number {
  let best = 0;
  let score = -1;
  bank.forEach((freq, index) => {
    const value = power(samples, start, freq);
    if (value > score) {
      score = value;
      best = index;
    }
  });
  return best;
}

function readId(samples: Float32Array, at: number): number {
  const a = loudest(samples, at + GAP, LOW);
  const b = loudest(samples, at + GAP, HIGH);
  const c = loudest(samples, at + GAP + BEAT + GAP, LOW);
  const d = loudest(samples, at + GAP + BEAT + GAP, HIGH);
  const sub = power(samples, at + GAP, SUB) > power(samples, at + GAP, DRONE) * 1.5;
  return a | (b << 3) | (c << 6) | (d << 9) | (sub ? 4096 : 0);
}

/** Recover the signs from a figure this module wrote. */
export function hearSignal(samples: Float32Array): string {
  const frame = GAP + BEAT + GAP + BEAT + GAP;
  const head = BEAT + GAP + BEAT + GAP;
  let bestAt = 0;
  let best = -1;
  const last = Math.max(0, samples.length - head - frame);
  for (let at = 0; at < last; at += 147) {
    const open = power(samples, at, LOW[0]) + power(samples, at, HIGH[0]);
    const next = power(samples, at + BEAT + GAP, LOW[3]) + power(samples, at + BEAT + GAP, HIGH[3]);
    const score = open + next;
    if (score > best) {
      best = score;
      bestAt = at;
    }
  }
  const ids: number[] = [];
  for (let at = bestAt + head; at + frame <= samples.length; at += frame) {
    const id = readId(samples, at);
    const strength = power(samples, at + GAP, LOW[id & 7]);
    if (strength < power(samples, at + GAP, DRONE) * 3) break;
    ids.push(id);
  }
  return ids.map((id) => String.fromCodePoint(SIGNAL_START + id)).join("");
}

let ctx: AudioContext | null = null;
let current: AudioBufferSourceNode | null = null;

export function playSignal(glyphs: string, then?: () => void): void {
  if (typeof window === "undefined") {
    then?.();
    return;
  }
  stopSignal();
  const samples = renderSignal(glyphs);
  const AudioCtx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) {
    then?.();
    return;
  }
  ctx ??= new AudioCtx();
  const buffer = ctx.createBuffer(1, samples.length, SIGNAL_RATE);
  buffer.getChannelData(0).set(samples);
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.connect(ctx.destination);
  current = src;
  src.onended = () => {
    if (current === src) current = null;
    then?.();
  };
  void ctx.resume();
  src.start();
}

export function stopSignal(): void {
  if (!current) return;
  try {
    current.stop();
  } catch {
    /* already ended */
  }
  current = null;
}
