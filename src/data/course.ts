import { useEffect, useState } from "react";
import { CONCEPTS } from "./concepts";
import { COURSE_REV, openCourseDb } from "./course-db";
import { getBaseEntry } from "./lexicon";

export type CourseLevel = "A1" | "A2" | "B1" | "B2" | "P";
export type CourseKind = "word" | "phrase" | "dialogue";

export type CourseItem = {
  id: string;
  level: CourseLevel;
  group: string;
  topic: string;
  kind: CourseKind;
  pos: string;
  en: string;
  sentence: string;
  image: string;
  plural?: string;
  forms?: string;
  scene?: string;
  who?: string;
};

export const LEVELS: { id: CourseLevel; label: string; aim: string }[] = [
  { id: "A1", label: "A1", aim: "Point, name, and get through a day." },
  { id: "A2", label: "A2", aim: "Travel, food, health, and a simple story." },
  { id: "B1", label: "B1", aim: "Opinions, problems, and everyday work." },
  { id: "B2", label: "B2", aim: "Nuance, news, and a longer conversation." },
  { id: "P", label: "Phrases", aim: "Useful sentences and short dialogues." },
];

const TOPIC_GROUP: Record<string, string> = {
  people: "01 People",
  home: "02 Home",
  food: "03 Food",
  actions: "04 Actions",
  nature: "05 Nature",
  animals: "06 Animals",
  body: "07 Body",
  places: "08 Places",
  describing: "09 Describing",
};

const POS: Record<string, string> = {
  noun: "noun",
  verb: "verb",
  adj: "adjective",
  adv: "adverb",
  pron: "pronoun",
  det: "determiner",
  num: "number",
  prep: "preposition",
  conj: "conjunction",
  phrase: "phrase",
  line: "line",
};

export function posLabel(pos: string): string {
  return POS[pos] ?? pos;
}

export function lemmaOf(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

function slug(text: string): string {
  const s = text
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return s || "card";
}

const CORE: CourseItem[] = CONCEPTS.map((concept) => {
  const en = getBaseEntry("en", concept.id);
  return {
    id: concept.id,
    level: "A1",
    group: TOPIC_GROUP[concept.topic] ?? "01 People",
    topic: concept.topic,
    kind: "word",
    pos: concept.pos,
    en: en?.word || concept.gloss,
    sentence: en?.sentence || concept.sentence,
    image: concept.image,
    plural: en?.plural,
  };
});

function asLevel(value: unknown): CourseLevel | null {
  if (value === "A1" || value === "A2" || value === "B1" || value === "B2") return value;
  if (value === "P" || value === "phrase" || value === "phrases") return "P";
  return null;
}

function asKind(value: unknown): CourseKind {
  if (value === "phrase" || value === "dialogue") return value;
  return "word";
}

export function parseCourse(raw: unknown): CourseItem[] {
  const list = Array.isArray(raw) ? raw : [];
  const items: CourseItem[] = [];
  for (const row of list) {
    if (!row || typeof row !== "object") continue;
    const rec = row as Record<string, unknown>;
    const en = typeof rec.en === "string" ? rec.en.trim() : "";
    const sentence = typeof rec.sentence === "string" ? rec.sentence.trim() : "";
    const level = asLevel(rec.level);
    if (!en || !sentence || !level) continue;
    const id = typeof rec.id === "string" && rec.id.trim() ? rec.id.trim() : `${level}-${slug(en)}`;
    const kind = asKind(rec.kind);
    items.push({
      id,
      level,
      group: typeof rec.group === "string" && rec.group.trim() ? rec.group.trim() : "Group",
      topic: typeof rec.topic === "string" && rec.topic.trim() ? rec.topic.trim() : "general",
      kind,
      pos: typeof rec.pos === "string" && rec.pos.trim() ? rec.pos.trim() : kind === "word" ? "noun" : "phrase",
      en,
      sentence,
      image: typeof rec.image === "string" && rec.image.trim() ? rec.image.trim() : slug(en),
      plural: typeof rec.plural === "string" && rec.plural.trim() ? rec.plural.trim() : undefined,
      forms: typeof rec.forms === "string" && rec.forms.trim() ? rec.forms.trim() : undefined,
      scene: typeof rec.scene === "string" && rec.scene.trim() ? rec.scene.trim() : undefined,
      who: typeof rec.who === "string" && rec.who.trim() ? rec.who.trim() : undefined,
    });
  }
  return items;
}

export function mergeCourse(core: CourseItem[], extra: CourseItem[]): CourseItem[] {
  const seenLemma = new Set(core.filter((item) => item.kind === "word").map((item) => lemmaOf(item.en)));
  const seenId = new Set(core.map((item) => item.id));
  const out = [...core];
  for (const item of extra) {
    if (item.kind === "word" && seenLemma.has(lemmaOf(item.en))) continue;
    if (item.kind === "word") seenLemma.add(lemmaOf(item.en));
    let id = item.id;
    while (seenId.has(id)) id = `${id}-2`;
    seenId.add(id);
    out.push({ ...item, id });
  }
  const rank = new Map(LEVELS.map((level, index) => [level.id, index]));
  return out.sort((a, b) => {
    const byLevel = (rank.get(a.level) ?? 9) - (rank.get(b.level) ?? 9);
    if (byLevel) return byLevel;
    if (a.group !== b.group) return a.group < b.group ? -1 : 1;
    return 0;
  });
}

const COURSE_FILES: Record<CourseLevel, string[]> = {
  A1: ["ready/a1.json"],
  A2: ["ready/a2.json"],
  B1: ["ready/b1.json"],
  B2: ["ready/b2.json"],
  P: ["ready/p.json"],
};

export type OutlineGroup = { name: string; count: number; sample: string };
export type OutlineLevel = { id: string; count: number; groups: OutlineGroup[] };
export type Outline = { words: number; phrases: number; levels: OutlineLevel[] };

function idbReq<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function readLevel(level: string): Promise<CourseItem[] | null> {
  if (typeof indexedDB === "undefined") return null;
  try {
    const db = await openCourseDb();
    const raw = await idbReq(db.transaction("levels").objectStore("levels").get(level));
    db.close();
    if (!raw || typeof raw !== "object") return null;
    const rec = raw as { rev?: string; items?: CourseItem[] };
    if (rec.rev !== COURSE_REV || !Array.isArray(rec.items)) return null;
    return rec.items;
  } catch {
    return null;
  }
}

async function writeLevel(level: string, items: CourseItem[]): Promise<void> {
  if (typeof indexedDB === "undefined") return;
  try {
    const db = await openCourseDb();
    await idbReq(db.transaction("levels", "readwrite").objectStore("levels").put({ rev: COURSE_REV, items }, level));
    db.close();
  } catch {
    /* the cards stay in memory for this visit */
  }
}

async function fetchFiles(names: string[]): Promise<CourseItem[]> {
  const parts = await Promise.all(
    names.map(async (file) => {
      try {
        const response = await fetch(`/course/${file}`);
        if (!response.ok) return [];
        return parseCourse(await response.json());
      } catch {
        return [];
      }
    }),
  );
  return parts.flat();
}

const fileTask = new Map<CourseLevel, Promise<CourseItem[]>>();

function filesFor(level: CourseLevel): Promise<CourseItem[]> {
  let task = fileTask.get(level);
  if (!task) {
    task = fetchFiles(COURSE_FILES[level]);
    fileTask.set(level, task);
  }
  return task;
}

function rowsFor(level: CourseLevel, extra: CourseItem[]): CourseItem[] {
  const rows = extra.filter((item) => item.level === level);
  return level === "A1" ? mergeCourse(CORE, rows) : mergeCourse([], rows);
}

const levelTask = new Map<CourseLevel, Promise<CourseItem[]>>();

export function loadLevel(level: CourseLevel): Promise<CourseItem[]> {
  const existing = levelTask.get(level);
  if (existing) return existing;
  const job = (async () => {
    const cached = await readLevel(level);
    if (cached) return cached;
    const items = rowsFor(level, await filesFor(level));
    await writeLevel(level, items);
    return items;
  })();
  levelTask.set(level, job);
  return job;
}

export function loadLevelFast(level: CourseLevel): Promise<CourseItem[]> {
  return loadLevel(level);
}

export function loadLevelFull(level: CourseLevel): Promise<CourseItem[]> {
  return loadLevel(level);
}

export function useLevel(level: CourseLevel): { items: CourseItem[]; ready: boolean } {
  const [items, setItems] = useState<CourseItem[]>(level === "A1" ? CORE : []);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let live = true;
    setReady(false);
    setItems(level === "A1" ? CORE : []);
    loadLevel(level).then((next) => {
      if (!live) return;
      if (next.length) setItems(next);
      setReady(true);
    });
    return () => {
      live = false;
    };
  }, [level]);
  return { items, ready };
}

let outlineTask: Promise<Outline> | null = null;

export function loadOutline(): Promise<Outline> {
  if (!outlineTask) {
    outlineTask = fetch("/course/stats.json")
      .then((response) => (response.ok ? response.json() : { words: CORE.length, phrases: 0, levels: [] }))
      .catch(() => ({ words: CORE.length, phrases: 0, levels: [] }));
  }
  return outlineTask;
}

export function useOutline(): Outline | null {
  const [outline, setOutline] = useState<Outline | null>(null);
  useEffect(() => {
    let live = true;
    loadOutline().then((next) => {
      if (live) setOutline(next);
    });
    return () => {
      live = false;
    };
  }, []);
  return outline;
}

export function groupsFor(items: CourseItem[], level: string): string[] {
  const seen: string[] = [];
  for (const item of items) {
    if (item.level !== level || seen.includes(item.group)) continue;
    seen.push(item.group);
  }
  return seen;
}

export function countLevel(items: CourseItem[], level: CourseLevel): number {
  return items.filter((item) => item.level === level).length;
}
