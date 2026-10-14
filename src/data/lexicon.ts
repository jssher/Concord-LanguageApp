import type { Entry, LangPack } from "./types";
import { scriptPack, toCyrillic, toGlagolitic } from "./interslavic";
import { packEntry } from "./packs";
import { encodeSignal, toSignalEntry } from "@/lib/signal";

const modules = import.meta.glob("./lexicon/*.json", { eager: true });

function asPack(mod: unknown): LangPack | null {
  const raw = (mod as { default?: unknown }).default ?? mod;
  if (!raw || typeof raw !== "object") return null;
  const pack = raw as Partial<LangPack>;
  if (!pack.entries || typeof pack.entries !== "object") return null;
  return { entries: pack.entries, lines: pack.lines ?? {} };
}

const loaded: Record<string, LangPack> = {};
for (const [path, mod] of Object.entries(modules)) {
  const id = path.split("/").pop()?.replace(/\.json$/, "");
  const pack = asPack(mod);
  if (id && pack) loaded[id] = pack;
}

if (loaded.isv) {
  loaded["isv-Latn"] = loaded.isv;
  loaded["isv-Cyrl"] = scriptPack(loaded.isv, toCyrillic);
  loaded["isv-Glag"] = scriptPack(loaded.isv, toGlagolitic);
}

if (loaded.en) {
  loaded.sig = {
    entries: Object.fromEntries(Object.entries(loaded.en.entries).map(([id, entry]) => [id, toSignalEntry(entry)])),
    lines: Object.fromEntries(Object.entries(loaded.en.lines).map(([id, line]) => [id, encodeSignal(line)])),
  };
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
  if (reviewed?.word && reviewed.sentence) return reviewed;
  return packEntry(langId, conceptId, en) ?? (id === conceptId ? undefined : packEntry(langId, id, en)) ?? (reviewed?.word ? reviewed : undefined);
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
