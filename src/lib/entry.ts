import { getBaseEntry } from "@/data/lexicon";
import type { Entry } from "@/data/types";
import { cardKey, useConcord, type Fix } from "@/lib/concord-store";

export function mergeEntry(base: Entry | undefined, fix: Fix | undefined): Entry | undefined {
  if (!base) return undefined;
  if (!fix) return base;
  return { ...base, ...fix };
}

export function useEntry(lang: string, conceptId: string): Entry | undefined {
  const fix = useConcord((s) => s.fixes[cardKey(lang, conceptId)]);
  return mergeEntry(getBaseEntry(lang, conceptId), fix);
}
