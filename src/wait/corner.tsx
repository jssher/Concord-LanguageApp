import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { useWaiting, useEgg } from "@/wait/flag";

type SceneModule = { WaitScene: ComponentType; WaitBoundary: ComponentType<{ children: ReactNode }> };

/** Sits on the footer line, beside the note, and does not cover the page. */
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
      className="wait-spot"
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
