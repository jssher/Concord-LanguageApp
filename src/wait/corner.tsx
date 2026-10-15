import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { useWaiting } from "@/wait/flag";

type SceneModule = { WaitScene: ComponentType; WaitBoundary: ComponentType<{ children: ReactNode }> };

/**
 * Sits under the header, only while a page has asked to wait.
 * The drawing is loaded apart from the pages. If it never arrives, the words still do.
 */
export function WaitCorner() {
  const on = useWaiting();
  const [mod, setMod] = useState<SceneModule | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let live = true;
    import("./scene")
      .then((loaded) => {
        if (live) setMod(loaded);
      })
      .catch(() => {
        if (live) setFailed(true);
      });
    return () => {
      live = false;
    };
  }, []);

  if (!on) return null;
  const Scene = mod?.WaitScene;
  const Boundary = mod?.WaitBoundary;
  return (
    <div role="status" className="pointer-events-none flex items-center justify-center gap-2 border-b border-line bg-paper px-3 py-1 text-xs text-muted">
      {Scene && Boundary && !failed ? (
        <Boundary>
          <Scene />
        </Boundary>
      ) : (
        <span className="inline-block h-2 w-2 rounded-full bg-accent" />
      )}
      <span>Opening…</span>
    </div>
  );
}
