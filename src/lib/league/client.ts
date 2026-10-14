import { useEffect, useSyncExternalStore } from "react";
import { claimName, getMine, recordReview, setConnection, syncCards, type Standing } from "@/lib/league/api";
import { useConcord, type CardMark } from "@/lib/concord-store";

export type StandingSnap = {
  status: "loading" | "guest" | "ready" | "error";
  mine: Standing | null;
};

let snap: StandingSnap = { status: "loading", mine: null };
const listeners = new Set<() => void>();
let inflight: Promise<void> | null = null;
let pushed = false;
let fetchedAt = 0;

function emit(next: StandingSnap) {
  snap = next;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnap() {
  return snap;
}

function unauthorized(err: unknown): boolean {
  return err instanceof Error && (err.message === "Unauthorized" || err.message.includes("Unauthorized"));
}

function localCards(): { lang: string; concept: string; stage: number; passes: number; lapses: number; last: "r" | "w" }[] {
  const cards = useConcord.getState().cards;
  return Object.entries(cards).flatMap(([key, mark]) => {
    const split = key.indexOf(":");
    if (split < 1) return [];
    const row: CardMark = mark;
    if ((row.passes ?? 0) < 1 && (row.lapses ?? 0) < 1) return [];
    return [{
      lang: key.slice(0, split),
      concept: key.slice(split + 1),
      stage: row.stage,
      passes: row.passes,
      lapses: row.lapses,
      last: row.last,
    }];
  });
}

async function whenHydrated() {
  if (useConcord.persist.hasHydrated()) return;
  await new Promise<void>((resolve) => {
    const unsub = useConcord.persist.onFinishHydration(() => {
      unsub();
      resolve();
    });
  });
}

async function pushLocal() {
  if (pushed) return;
  await whenHydrated();
  const cards = localCards();
  let latest: Standing | null = snap.mine;
  try {
    for (let i = 0; i < cards.length; i += 300) {
      const result = await syncCards({ data: cards.slice(i, i + 300) });
      if (!result.ok || !result.mine) return;
      latest = result.mine;
    }
    pushed = true;
    if (latest) emit({ status: "ready", mine: latest });
  } catch {
    /* try again on the next refresh */
  }
}

export function refreshStanding(): Promise<void> {
  if (inflight) return inflight;
  if (snap.status !== "loading" && Date.now() - fetchedAt < 4000) return Promise.resolve();
  inflight = (async () => {
    try {
      const mine = await getMine();
      emit({ status: "ready", mine });
      fetchedAt = Date.now();
      if (mine) await pushLocal();
    } catch (err) {
      if (unauthorized(err)) emit({ status: "guest", mine: null });
      else emit({ status: "error", mine: snap.mine });
      fetchedAt = Date.now();
    }
  })().finally(() => {
    inflight = null;
  });
  return inflight;
}

export function useStanding() {
  const current = useSyncExternalStore(subscribe, getSnap, getSnap);
  useEffect(() => {
    void refreshStanding();
  }, []);
  return current;
}

export function noteReview(lang: string, concept: string, mark: "r" | "w") {
  if (snap.status !== "ready" || !snap.mine) return;
  void recordReview({ data: { lang, concept, mark } })
    .then((result) => {
      if (result.ok && result.mine) emit({ status: "ready", mine: result.mine });
      else if (!result.ok) emit({ status: "ready", mine: null });
    })
    .catch((err) => {
      if (unauthorized(err)) emit({ status: "guest", mine: null });
    });
}

export async function saveName(name: string, handle: string) {
  const result = await claimName({ data: { name, handle } });
  if (result.ok && result.mine) {
    emit({ status: "ready", mine: result.mine });
    pushed = false;
    await pushLocal();
  }
  return result;
}

export async function connectTo(handle: string, on: boolean) {
  const result = await setConnection({ data: { handle, on } });
  if (result.ok && result.mine) emit({ status: "ready", mine: result.mine });
  return result;
}

