import { useEffect, useState } from "react";
import type { CourseLevel } from "./course";
import { COURSE_REV, openCourseDb } from "./course-db";
import type { Entry } from "./types";

type PackFile = { items?: Record<string, Entry & { en?: string }> };

const memory = new Map<string, Record<string, Entry & { en?: string }>>();
const pending = new Map<string, Promise<void>>();

function lemma(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

function idbReq<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function packKey(lang: string, level: CourseLevel): string {
  return `${COURSE_REV}:${lang}:${level}`;
}

function asItems(raw: unknown): Record<string, Entry & { en?: string }> {
  if (!raw || typeof raw !== "object") return {};
  const rec = raw as PackFile & Record<string, Entry & { en?: string }>;
  const source = rec.items && typeof rec.items === "object" ? rec.items : rec;
  const items: Record<string, Entry & { en?: string }> = {};
  for (const [id, row] of Object.entries(source)) {
    if (!row || typeof row !== "object") continue;
    if (typeof row.word !== "string" || typeof row.sentence !== "string") continue;
    const word = row.word.trim();
    const sentence = row.sentence.trim();
    if (!word || !sentence) continue;
    items[id] = { ...row, word, sentence };
  }
  return items;
}

async function readPack(key: string): Promise<Record<string, Entry & { en?: string }> | null> {
  if (typeof indexedDB === "undefined") return null;
  try {
    const db = await openCourseDb();
    const raw = await idbReq(db.transaction("packs").objectStore("packs").get(key));
    db.close();
    if (!raw) return null;
    return asItems(raw);
  } catch {
    return null;
  }
}

async function writePack(key: string, items: Record<string, Entry & { en?: string }>): Promise<void> {
  if (typeof indexedDB === "undefined") return;
  try {
    const db = await openCourseDb();
    await idbReq(db.transaction("packs", "readwrite").objectStore("packs").put({ items }, key));
    db.close();
  } catch {
    /* the pack stays in memory for this visit */
  }
}

export function packEntry(lang: string, id: string, en: string): (Entry & { en?: string }) | undefined {
  const items = memory.get(lang);
  if (!items) return undefined;
  const row = items[id] ?? items[lemma(en)];
  if (!row?.word || !row.sentence) return undefined;
  if (row.en && lemma(row.en) !== lemma(en)) return undefined;
  return row;
}

export function ensurePack(lang: string, level: CourseLevel): Promise<void> {
  if (!lang || lang === "en") return Promise.resolve();
  const key = packKey(lang, level);
  const existing = pending.get(key);
  if (existing) return existing;
  const job = (async () => {
    const cached = await readPack(key);
    if (cached && Object.keys(cached).length) {
      memory.set(lang, { ...memory.get(lang), ...cached });
      return;
    }
    let items: Record<string, Entry & { en?: string }> = {};
    try {
      const response = await fetch(`/course/i18n/${lang}/${level}.json`);
      if (response.ok) items = asItems(await response.json());
    } catch {
      items = {};
    }
    memory.set(lang, { ...memory.get(lang), ...items });
    if (Object.keys(items).length) await writePack(key, items);
  })();
  pending.set(key, job);
  return job;
}

export function usePack(lang: string, level: CourseLevel): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let live = true;
    setReady(false);
    const langs = lang === "ar" ? [lang, "ar-eg", "ar-sa"] : lang ? [lang] : [];
    Promise.all(langs.map((id) => ensurePack(id, level))).then(() => {
      if (live) setReady(true);
    });
    return () => {
      live = false;
    };
  }, [lang, level]);
  return ready;
}
