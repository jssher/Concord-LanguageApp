import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { useWaiting, useEgg } from "@/wait/flag";

type SceneModule = { WaitScene: ComponentType; WaitBoundary: ComponentType<{ children: ReactNode }> };

/**
 * Floats over the page only while a page has asked to wait.
 * It is taken out of the layout, so the header and the page do not move.
 * The drawing is loaded apart from the pages. If it never arrives, nothing is added.
 */
export function WaitCorner() {
  const loading = useWaiting();
  const egg = useEgg();
  const on = loading || egg.on;
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
    <div
      role={loading ? "status" : undefined}
      aria-hidden={loading ? undefined : true}
      className="pointer-events-none fixed bottom-14 right-3 z-40 md:bottom-16 md:right-5"
    >
      {loading ? <span className="sr-only">Opening…</span> : null}
      {Scene && Boundary && !failed ? (
        <Boundary>
          <Scene key={egg.generation} />
        </Boundary>
      ) : null}
    </div>
  );
}
