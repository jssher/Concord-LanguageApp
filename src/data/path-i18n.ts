import { useEffect, useState } from "react";

export type LessonGloss = {
  lead: string[];
  lines: string[];
};

const loaders = import.meta.glob("./path-i18n/*.json");
const cache = new Map<string, Record<string, LessonGloss>>();

/** Lesson sentences for one language. Empty when that language has no file yet. */
export function useLessonGloss(lang: string): Record<string, LessonGloss> | null {
  const [data, setData] = useState<Record<string, LessonGloss> | null>(() => {
    if (!lang || lang === "en") return {};
    return cache.get(lang) ?? null;
  });

  useEffect(() => {
    if (!lang || lang === "en") {
      setData({});
      return;
    }
    const hit = cache.get(lang);
    if (hit) {
      setData(hit);
      return;
    }
    const loader = loaders[`./path-i18n/${lang}.json`];
    if (!loader) {
      setData({});
      return;
    }
    let live = true;
    setData(null);
    loader()
      .then((mod) => {
        const raw = (mod as { default?: unknown }).default ?? mod;
        const gloss = raw && typeof raw === "object" ? (raw as Record<string, LessonGloss>) : {};
        cache.set(lang, gloss);
        if (live) setData(gloss);
      })
      .catch(() => {
        if (live) setData({});
      });
    return () => {
      live = false;
    };
  }, [lang]);

  return data;
}
