import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { BATCHES } from "@/data/syllabus";
import type { Entry } from "@/data/types";

export type CardMark = {
  stage: number;
  due: number;
  lapses: number;
  passes: number;
  last: "r" | "w";
};

export type Fix = Partial<
  Pick<Entry, "word" | "sentence" | "article" | "plural" | "reading" | "sentenceReading" | "feminine" | "masculine" | "neuter" | "note">
>;

type State = {
  source: string;
  targets: string[];
  focus: string;
  topic: string;
  level: string;
  group: string;
  chorus: boolean;
  conceptId: string;
  cards: Record<string, CardMark>;
  fixes: Record<string, Fix>;
  setSource: (id: string) => void;
  toggleTarget: (id: string) => void;
  setFocus: (id: string) => void;
  setTopic: (topic: string) => void;
  setLevel: (level: string) => void;
  setGroup: (group: string) => void;
  setChorus: (chorus: boolean) => void;
  setConceptId: (id: string) => void;
  normalize: () => void;
  grade: (lang: string, concept: string, mark: "r" | "w") => void;
  saveFix: (lang: string, concept: string, fix: Fix) => void;
  clearFix: (lang: string, concept: string) => void;
};

export function cardKey(lang: string, concept: string): string {
  return `${lang}:${concept}`;
}

function dueFor(stage: number, now: number): number {
  const days = BATCHES[Math.min(stage, BATCHES.length - 1)].days;
  return now + days * 24 * 60 * 60 * 1000;
}

function idbRequest<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("concord", 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains("kv")) db.createObjectStore("kv");
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

const memory = new Map<string, string>();

async function idbGet(name: string): Promise<string | null> {
  if (typeof indexedDB === "undefined") return null;
  const db = await openDb();
  const value = await idbRequest(db.transaction("kv").objectStore("kv").get(name));
  db.close();
  return (value as string | undefined) ?? null;
}

async function idbPut(name: string, value: string): Promise<void> {
  if (typeof indexedDB === "undefined") return;
  const db = await openDb();
  await idbRequest(db.transaction("kv", "readwrite").objectStore("kv").put(value, name));
  db.close();
}

async function idbDelete(name: string): Promise<void> {
  if (typeof indexedDB === "undefined") return;
  const db = await openDb();
  await idbRequest(db.transaction("kv", "readwrite").objectStore("kv").delete(name));
  db.close();
}

function withTimeout<T>(work: Promise<T>, ms: number): Promise<T | null> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(null), ms);
    work.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      () => {
        clearTimeout(timer);
        resolve(null);
      },
    );
  });
}

function readLocal(name: string): string | null {
  if (typeof localStorage === "undefined") return null;
  try {
    return localStorage.getItem(name);
  } catch {
    return null;
  }
}

function writeLocal(name: string, value: string) {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(name, value);
  } catch {
    /* the memory copy still holds this visit */
  }
}

/** True once the learner has chosen a language this visit. Hydration must not undo that. */
let prefsTouched = false;

const storage = createJSONStorage(() => ({
  getItem: async (name) => {
    const local = readLocal(name);
    if (local) return local;
    const saved = await withTimeout(idbGet(name), 400);
    if (saved) {
      writeLocal(name, saved);
      return saved;
    }
    return memory.get(name) ?? null;
  },
  setItem: async (name, value) => {
    memory.set(name, value);
    writeLocal(name, value);
    void idbPut(name, value);
  },
  removeItem: async (name) => {
    memory.delete(name);
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.removeItem(name);
      } catch {
        /* ignore */
      }
    }
    void idbDelete(name);
  },
}));

export const useConcord = create<State>()(
  persist(
    (set) => ({
      source: "en",
      targets: ["de"],
      focus: "de",
      topic: "all",
      level: "A1",
      group: "01 People",
      chorus: true,
      conceptId: "i",
      cards: {},
      fixes: {},
      setSource: (id) => {
        prefsTouched = true;
        set((state) => {
          const targets = state.targets.filter((t) => t !== id);
          const focus = targets.includes(state.focus) ? state.focus : (targets[0] ?? state.focus);
          return { source: id, targets, focus };
        });
      },
      toggleTarget: (id) => {
        prefsTouched = true;
        set((state) => {
          if (id === state.source) return state;
          const has = state.targets.includes(id);
          if (has) {
            const targets = state.targets.filter((t) => t !== id);
            const focus = state.focus === id ? (targets[0] ?? state.focus) : state.focus;
            return { targets, focus };
          }
          if (state.targets.length >= 12) return state;
          const targets = [...state.targets, id];
          return { targets, focus: state.targets.length === 0 ? id : state.focus };
        });
      },
      setFocus: (id) => {
        prefsTouched = true;
        set({ focus: id });
      },
      setTopic: (topic) => set({ topic }),
      setLevel: (level) => set({ level }),
      setGroup: (group) => set({ group }),
      setChorus: (chorus) => set({ chorus }),
      normalize: () =>
        set((state) => {
          const mapId = (id: string) =>
            id === "isv-Latn" || id === "isv-Cyrl" || id === "isv-Glag" ? "isv" : id;
          const targets = [...new Set(state.targets.map(mapId))].filter((id) => id !== "en").slice(0, 12);
          const focusId = mapId(state.focus);
          const focus = targets.includes(focusId) ? focusId : (targets[0] ?? "de");
          return {
            source: "en",
            targets: targets.length ? targets : ["de"],
            focus: targets.length ? focus : "de",
          };
        }),
      setConceptId: (conceptId) => set({ conceptId }),
      grade: (lang, concept, mark) =>
        set((state) => {
          const key = cardKey(lang, concept);
          const prev = state.cards[key];
          const now = Date.now();
          let stage: number;
          let passes = prev?.passes ?? 0;
          let lapses = prev?.lapses ?? 0;
          if (mark === "r") {
            passes += 1;
            if (!prev) stage = 0;
            else if (prev.stage >= 8) stage = 8;
            else stage = prev.stage + 1;
          } else {
            lapses += 1;
            stage = 0;
          }
          const due = dueFor(Math.min(stage, 7), now);
          return {
            cards: {
              ...state.cards,
              [key]: { stage, due, passes, lapses, last: mark },
            },
          };
        }),
      saveFix: (lang, concept, fix) =>
        set((state) => ({
          fixes: { ...state.fixes, [cardKey(lang, concept)]: fix },
        })),
      clearFix: (lang, concept) =>
        set((state) => {
          const fixes = { ...state.fixes };
          delete fixes[cardKey(lang, concept)];
          return { fixes };
        }),
    }),
    {
      name: "concord-v1",
      storage,
      merge: (persisted, current) => {
        const saved = (persisted ?? {}) as Partial<State>;
        const next = { ...current, ...saved };
        if (!prefsTouched) return next;
        return {
          ...next,
          source: current.source,
          targets: current.targets,
          focus: current.focus,
        };
      },
    },
  ),
);

export function batchLabel(stage: number | undefined): string {
  if (stage === undefined) return "New";
  if (stage >= 8) return "Mastered";
  return BATCHES[Math.min(stage, BATCHES.length - 1)].label;
}

export function genderLabel(gender: string | undefined): string | undefined {
  if (gender === "m") return "masculine";
  if (gender === "f") return "feminine";
  if (gender === "n") return "neuter";
  if (gender === "c") return "common";
  return undefined;
}
