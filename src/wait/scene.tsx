import { Component, useState, type ReactNode } from "react";

const SCENES = ["/wait/cat.gif", "/wait/dog.gif", "/wait/ducks.gif", "/wait/change.gif"] as const;

/** One small loop, chosen when the wait starts. It sits out of the page flow. */
export function WaitScene() {
  const [src] = useState(() => SCENES[Math.floor(Math.random() * SCENES.length)]);
  return (
    <>
      <style>{CSS}</style>
      <img src={src} alt="" width={220} height={122} decoding="async" className="wait-gif" />
    </>
  );
}

export class WaitBoundary extends Component<{ children: ReactNode }, { quiet: boolean }> {
  state = { quiet: false };
  static getDerivedStateFromError() {
    return { quiet: true };
  }
  render() {
    if (this.state.quiet) return null;
    return this.props.children;
  }
}

const CSS = `
.wait-spot {
  flex: 0 0 auto;
  max-width: 42%;
  pointer-events: none;
  line-height: 0;
}
.wait-gif {
  display: block;
  width: clamp(4.75rem, 26vw, 8rem);
  max-width: 100%;
  height: auto;
  aspect-ratio: 220 / 122;
  object-fit: contain;
  object-position: left top;
  border-radius: 0.5rem;
  pointer-events: none;
  user-select: none;
}
@media (prefers-reduced-motion: reduce) {
  .wait-gif { display: none; }
}
`;
