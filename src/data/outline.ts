import { useEffect, useState } from "react";

export type OutlineGroup = { name: string; count: number; sample: string };
export type OutlineLevel = { id: string; count: number; groups: OutlineGroup[] };
export type Outline = { words: number; phrases: number; levels: OutlineLevel[] };

const EMPTY: Outline = { words: 0, phrases: 0, levels: [] };
let outlineTask: Promise<Outline> | null = null;

export function loadOutline(): Promise<Outline> {
  if (!outlineTask) {
    outlineTask = fetch("/course/stats.json")
      .then((response) => (response.ok ? response.json() : EMPTY))
      .catch(() => EMPTY);
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
