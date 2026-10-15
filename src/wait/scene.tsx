import { Component, useState, type ReactNode } from "react";

const SCENES = ["/wait/cat.gif", "/wait/dog.gif", "/wait/ducks.gif", "/wait/change.gif"] as const;

/** One small loop, chosen when the wait starts. It sits out of the page flow. */
export function WaitScene() {
  const [src] = useState(() => SCENES[Math.floor(Math.random() * SCENES.length)]);
  return (
    <>
      <style>{CSS}</style>
      <img src={src} alt="" className="wait-gif" />
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
.wait-gif {
  display: block;
  height: 5.5rem;
  width: auto;
  max-width: min(16rem, 46vw);
  border-radius: 0.75rem;
  pointer-events: none;
  user-select: none;
}
@media (prefers-reduced-motion: reduce) {
  .wait-gif { display: none; }
}
`;
