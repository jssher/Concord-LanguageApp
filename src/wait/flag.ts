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
