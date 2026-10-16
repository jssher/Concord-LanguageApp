import { isSignal, playSignal, stopSignal } from "./signal";
import { clipHash, clipUrl, recordedLang } from "./audio-clip";

/** One clip. `lang` is the BCP-47 tag already stored on the language. */
export type SpeechClip = {
  text: string;
  lang: string;
};

/**
 * A voice. The cards call `speak` and never talk to a model directly.
 * To use a better voice, implement this and pass it to `setSpeechEngine`.
 * `speak` must call `then` when the clip ends or cannot play, so a word
 * can be followed by its sentence. A new `speak` replaces whatever is playing.
 */
export type SpeechEngine = {
  id: string;
  prepare?: () => void;
  speak: (clip: SpeechClip, then?: () => void) => void;
  stop: () => void;
};

const cache = new Map<string, SpeechSynthesisVoice | null>();
let opened = false;

function voices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !window.speechSynthesis) return [];
  opened = true;
  return window.speechSynthesis.getVoices();
}

function pickVoice(bcp47: string): SpeechSynthesisVoice | null {
  const key = bcp47.toLowerCase();
  if (cache.has(key)) return cache.get(key) ?? null;
  const all = voices();
  const exact = all.find((voice) => voice.lang.toLowerCase() === key);
  const prefix = key.split("-")[0];
  const loose = all.find((voice) => voice.lang.toLowerCase().startsWith(prefix));
  const chosen = exact ?? loose ?? null;
  cache.set(key, chosen);
  return chosen;
}

/** The voice built into the browser. It is the default until a model is plugged in. */
export const browserSpeech: SpeechEngine = {
  id: "browser",
  prepare() {
    voices();
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.onvoiceschanged = () => {
      cache.clear();
    };
  },
  speak(clip, then) {
    if (isSignal(clip.text)) {
      if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
      playSignal(clip.text, then);
      return;
    }
    if (typeof window === "undefined" || !window.speechSynthesis) {
      then?.();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(clip.text);
    utterance.lang = clip.lang;
    const voice = pickVoice(clip.lang);
    if (voice) utterance.voice = voice;
    utterance.rate = 0.92;
    if (then) utterance.onend = () => then();
    window.speechSynthesis.speak(utterance);
  },
  stop() {
    stopSignal();
    if (!opened || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
  },
};

let engine: SpeechEngine = browserSpeech;
let clipAudio: HTMLAudioElement | null = null;
let clipToken = 0;

function stopClip() {
  clipToken += 1;
  if (!clipAudio) return;
  clipAudio.pause();
  clipAudio.src = "";
  clipAudio = null;
}

function playUrl(url: string, token: number, then?: () => void): Promise<boolean> {
  return new Promise((resolve) => {
    if (token !== clipToken) {
      resolve(false);
      return;
    }
    const audio = new Audio(url);
    clipAudio = audio;
    let settled = false;
    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      if (clipAudio === audio) clipAudio = null;
      resolve(ok);
    };
    audio.onended = () => {
      finish(true);
      if (token === clipToken) then?.();
    };
    audio.onerror = () => finish(false);
    void audio.play().catch(() => finish(false));
  });
}

/** Recorded Grok voice, then a fresh recording from the server, then the device. */
export function grokSpeech(voice: string): SpeechEngine {
  return {
    id: `grok:${voice}`,
    speak(clip, then) {
      if (isSignal(clip.text)) {
        stopClip();
        if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
        playSignal(clip.text, then);
        return;
      }
      const token = ++clipToken;
      if (clipAudio) {
        clipAudio.pause();
        clipAudio.src = "";
        clipAudio = null;
      }
      if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
      const lang = recordedLang(clip.lang);
      void (async () => {
        if (lang) {
          const hash = await clipHash(clip.text);
          if (token !== clipToken) return;
          const played = await playUrl(clipUrl(voice, lang, hash), token, then);
          if (played || token !== clipToken) return;
        }
        if (token !== clipToken) return;
        try {
          const response = await fetch("/api/tts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: clip.text, voice, language: clip.lang }),
          });
          if (response.ok && token === clipToken) {
            const url = URL.createObjectURL(await response.blob());
            const played = await playUrl(url, token, () => {
              URL.revokeObjectURL(url);
              then?.();
            });
            if (played || token !== clipToken) return;
            URL.revokeObjectURL(url);
          }
        } catch {
          /* the device voice still speaks */
        }
        if (token !== clipToken) return;
        browserSpeech.speak(clip, then);
      })();
    },
    stop() {
      stopClip();
      browserSpeech.stop();
    },
  };
}

/** Swap the voice. The cards, the alphabet, and the dialogues keep working. */
export function setSpeechEngine(next: SpeechEngine): void {
  engine.stop();
  engine = next;
}

export function warmVoices(): void {
  engine.prepare?.();
}

export function speak(text: string, bcp47: string, then?: () => void): void {
  const line = text.trim();
  if (!line) {
    then?.();
    return;
  }
  engine.speak({ text: line, lang: bcp47 }, then);
}

export function speakPair(word: string, sentence: string, bcp47: string): void {
  speak(word, bcp47, () => {
    window.setTimeout(() => speak(sentence, bcp47), 280);
  });
}

export function stopSpeech(): void {
  engine.stop();
}
