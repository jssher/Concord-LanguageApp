import { useEffect, useState } from "react";
import type { Entry, LangPack } from "./types";
import { scriptPack, toCyrillic, toGlagolitic } from "./interslavic";
import { packEntry } from "./packs";
import { encodeSignal, toSignalEntry } from "@/lib/signal";
import enFile from "./lexicon/en.json";

const loaders = import.meta.glob(["./lexicon/*.json", "!./lexicon/en.json"]);

function asPack(mod: unknown): LangPack | null {
  const raw = (mod as { default?: unknown }).default ?? mod;
  if (!raw || typeof raw !== "object") return null;
  const pack = raw as Partial<LangPack>;
  if (!pack.entries || typeof pack.entries !== "object") return null;
  return { entries: pack.entries, lines: pack.lines ?? {} };
}

const loaded: Record<string, LangPack> = {};
const pending = new Map<string, Promise<void>>();

function install(id: string, pack: LangPack) {
  loaded[id] = pack;
  if (id === "isv") {
    loaded["isv-Latn"] = pack;
    loaded["isv-Cyrl"] = scriptPack(pack, toCyrillic);
    loaded["isv-Glag"] = scriptPack(pack, toGlagolitic);
  }
}

const englishPack = asPack(enFile);
if (englishPack) install("en", englishPack);

if (loaded.en) {
  loaded.sig = {
    entries: Object.fromEntries(Object.entries(loaded.en.entries).map(([id, entry]) => [id, toSignalEntry(entry)])),
    lines: Object.fromEntries(Object.entries(loaded.en.lines).map(([id, line]) => [id, encodeSignal(line)])),
  };
}

function rootId(langId: string): string {
  if (langId === "isv-Latn" || langId === "isv-Cyrl" || langId === "isv-Glag") return "isv";
  return langId;
}

function withKin(id: string): string[] {
  const root = rootId(id);
  if (root === "ar") return ["ar", "ar-eg", "ar-sa", "ar-ma"];
  return [root];
}

/** Loads one language file. Other languages stay out of memory until chosen. */
export function ensureLexicon(langId: string): Promise<void> {
  const id = rootId(langId);
  if (!id || id === "en" || id === "sig" || loaded[id]) return Promise.resolve();
  const existing = pending.get(id);
  if (existing) return existing;
  const loader = loaders[`./lexicon/${id}.json`];
  if (!loader) return Promise.resolve();
  const job = loader()
    .then((mod) => {
      const pack = asPack(mod);
      if (pack) install(id, pack);
    })
    .catch(() => {
      pending.delete(id);
    });
  pending.set(id, job);
  return job;
}

/** True once every requested language file is in memory. */
export function useLexicons(ids: string[]): boolean {
  const key = [...new Set(ids.flatMap(withKin).filter((id) => id && id !== "en" && id !== "sig"))].sort().join("|");
  const [ready, setReady] = useState(() => key.split("|").filter(Boolean).every((id) => Boolean(loaded[id])));
  useEffect(() => {
    const list = key ? key.split("|") : [];
    if (list.every((id) => loaded[id])) {
      setReady(true);
      return;
    }
    let live = true;
    setReady(false);
    Promise.all(list.map((id) => ensureLexicon(id))).then(() => {
      if (live) setReady(true);
    });
    return () => {
      live = false;
    };
  }, [key]);
  return ready;
}

export const LEXICON: Record<string, LangPack> = loaded;

const lemmaToId = new Map<string, string>();
const english = loaded.en;
if (english) {
  for (const [id, entry] of Object.entries(english.entries)) {
    if (entry.word) lemmaToId.set(entry.word.trim().toLowerCase().replace(/\s+/g, " "), id);
  }
}

export function lexiconId(conceptId: string, en: string): string {
  if (english?.entries[conceptId]) return conceptId;
  const lemma = en.trim().toLowerCase().replace(/\s+/g, " ");
  return lemmaToId.get(lemma) ?? conceptId;
}

export function hasLexicon(langId: string): boolean {
  return Boolean(LEXICON[langId]);
}

export function getPack(langId: string): LangPack | undefined {
  return LEXICON[langId];
}

const SCRIPT_FIELDS = ["word", "sentence", "plural", "feminine", "masculine", "neuter", "article"] as const;

function mapScript(entry: Entry, fn: (value: string) => string): Entry {
  const next = { ...entry };
  for (const key of SCRIPT_FIELDS) {
    const value = next[key];
    if (value) next[key] = fn(value);
  }
  return next;
}

function lookup(langId: string, conceptId: string, en: string): Entry | undefined {
  const id = lexiconId(conceptId, en);
  const reviewed = LEXICON[langId]?.entries[id];
  const pack = packEntry(langId, conceptId, en) ?? (id === conceptId ? undefined : packEntry(langId, id, en));
  const entry = reviewed?.word && reviewed.sentence ? reviewed : pack ?? (reviewed?.word ? reviewed : undefined);
  if (entry?.word?.startsWith("[[en:") && entry.word.endsWith("]]")) return undefined;
  return entry;
}

export function getBaseEntry(langId: string, conceptId: string, en = "", sentence = ""): Entry | undefined {
  if (langId === "sig") {
    const enEntry = lookup("en", conceptId, en);
    const word = enEntry?.word || en.trim();
    const line = enEntry?.sentence || sentence.trim();
    if (!word || !line) return undefined;
    return toSignalEntry({ ...(enEntry ?? { word, sentence: line }), word, sentence: line });
  }
  if (langId === "isv-Cyrl" || langId === "isv-Glag") {
    const direct = lookup(langId, conceptId, en);
    if (direct?.word && direct.sentence) return direct;
    const latin = lookup("isv", conceptId, en);
    if (!latin?.word) return undefined;
    return mapScript(latin, langId === "isv-Cyrl" ? toCyrillic : toGlagolitic);
  }
  return lookup(langId, conceptId, en);
}

export function coverage(langId: string, conceptIds: string[]): number {
  const entries = LEXICON[langId]?.entries;
  if (!entries) return 0;
  return conceptIds.filter((id) => entries[id]?.word && entries[id]?.sentence).length;
}
