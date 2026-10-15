import { useEffect, useSyncExternalStore } from "react";

let pending = 0;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

/** One open load. Call the returned function when it finishes. */
export function hold(): () => void {
  pending += 1;
  emit();
  let closed = false;
  return () => {
    if (closed) return;
    closed = true;
    pending = Math.max(0, pending - 1);
    emit();
  };
}

let eggGeneration = 0;
let eggTimer: ReturnType<typeof setTimeout> | undefined;
let eggSnap = { on: false, generation: 0 };

/** Play the corner scene once, apart from any real wait. */
export function playEgg() {
  eggGeneration += 1;
  eggSnap = { on: true, generation: eggGeneration };
  emit();
  clearTimeout(eggTimer);
  eggTimer = setTimeout(() => {
    eggSnap = { on: false, generation: eggGeneration };
    emit();
  }, 5200);
}

function eggNow() {
  return eggSnap;
}

export function useEgg(): { on: boolean; generation: number } {
  return useSyncExternalStore(subscribe, eggNow, () => eggSnap);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function waiting() {
  return pending > 0;
}

export function useWaiting(): boolean {
  return useSyncExternalStore(subscribe, waiting, () => false);
}

/** Show the corner scene while `active` is true. A throw here never comes from the drawing. */
export function useWait(active: boolean) {
  useEffect(() => {
    if (!active) return;
    return hold();
  }, [active]);
}
