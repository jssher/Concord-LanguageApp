import { Component, type ReactNode } from "react";

/** Drawn apart from the pages. If this file fails, the corner drops it and keeps the words. */
export function WaitScene() {
  return (
    <div className="wait-scene" aria-hidden="true">
      <style>{CSS}</style>
      <Cat />
      <Dog />
      <Ducks />
      <Change />
    </div>
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

function Cat() {
  return (
    <svg className="wait-act wait-cat" viewBox="0 0 96 32">
      <g className="wait-cat-body">
        <path d="M4 22c2-8 8-10 12-6 2 2 2 5 1 7" fill="#1c1915" />
        <circle cx="16" cy="16" r="5" fill="#1c1915" />
        <path d="M12 12l1.5-4 2 3M18 11l2-4 1 4" fill="#1c1915" />
        <circle cx="18" cy="16" r="0.7" fill="#f3ecdf" />
        <path d="M6 20c-4 1-5 5-2 6" fill="none" stroke="#1c1915" strokeWidth="1.4" strokeLinecap="round" />
      </g>
      <g className="wait-yarn">
        <circle r="4.2" fill="#c24d2c" />
        <path d="M-3 0h6M0-3v6M-2-2l4 4M-2 2l4-4" stroke="#fff8f3" strokeWidth="0.6" />
      </g>
    </svg>
  );
}

function Dog() {
  return (
    <svg className="wait-act wait-dog" viewBox="0 0 96 32">
      <g className="wait-dog-body">
        <ellipse cx="16" cy="20" rx="9" ry="5" fill="#6b4a2e" />
        <circle cx="26" cy="16" r="4.2" fill="#6b4a2e" />
        <path d="M23 13l-1-4 3 2M28 12l3-3-1 4" fill="#6b4a2e" />
        <circle cx="27.4" cy="15.6" r="0.6" fill="#f3ecdf" />
        <path d="M10 24v4M16 24v4M20 23v4" stroke="#6b4a2e" strokeWidth="1.4" strokeLinecap="round" />
      </g>
      <circle className="wait-ball" r="3.2" fill="#c24d2c" />
    </svg>
  );
}

function Ducks() {
  return (
    <svg className="wait-act wait-ducks" viewBox="0 0 96 32">
      <g className="wait-flock">
        <Duck x={8} y={16} s={1} />
        <Duck x={22} y={20} s={0.62} />
        <Duck x={32} y={18} s={0.55} />
        <Duck x={41} y={21} s={0.5} />
      </g>
    </svg>
  );
}

function Duck({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g className="wait-duck">
      <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="2" rx="7" ry="3.4" fill="#e2b84a" />
      <circle cx="6" cy="-1" r="2.6" fill="#e2b84a" />
      <path d="M8.2-1h3.2" stroke="#c24d2c" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M-2 5l-2 3M2 5l2 3" stroke="#1c1915" strokeWidth="1" strokeLinecap="round" />
      </g>
    </g>
  );
}

function Change() {
  return (
    <svg className="wait-act wait-change" viewBox="0 0 96 32">
      <g className="wait-larva">
        <ellipse cx="28" cy="20" rx="5" ry="3.2" fill="#1e6a52" />
        <ellipse cx="36" cy="20" rx="4" ry="3" fill="#2f8a68" />
        <ellipse cx="43" cy="19" rx="3.2" ry="2.6" fill="#1e6a52" />
        <circle cx="46" cy="18" r="1.8" fill="#1c1915" />
      </g>
      <ellipse className="wait-pupa" cx="48" cy="18" rx="5" ry="7" fill="#6b6258" />
      <g className="wait-wing">
        <ellipse cx="44" cy="16" rx="8" ry="5" fill="#c24d2c" opacity="0.9" />
        <ellipse cx="54" cy="16" rx="8" ry="5" fill="#e2b84a" opacity="0.9" />
        <ellipse cx="49" cy="18" rx="2" ry="4" fill="#1c1915" />
      </g>
    </svg>
  );
}

const CSS = `
.wait-scene { position: relative; width: 148px; height: 44px; overflow: hidden; }
.wait-act { position: absolute; inset: 0; width: 148px; height: 44px; opacity: 0; }
.wait-cat { animation: wait-show 16s infinite; }
.wait-dog { animation: wait-show 16s infinite 4s; }
.wait-ducks { animation: wait-show 16s infinite 8s; }
.wait-change { animation: wait-show 16s infinite 12s; }
@keyframes wait-show {
  0%, 22% { opacity: 1; }
  27%, 100% { opacity: 0; }
}
.wait-cat-body { animation: wait-cat 4s ease-in-out infinite; }
.wait-yarn { transform: translate(28px, 20px); animation: wait-yarn 4s ease-in-out infinite; }
@keyframes wait-cat {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(36px, -2px); }
}
@keyframes wait-yarn {
  0%, 100% { transform: translate(28px, 20px); }
  50% { transform: translate(82px, 20px); }
}
.wait-dog-body { animation: wait-dog 4s ease-in-out infinite; }
.wait-ball { transform: translate(40px, 22px); animation: wait-ball 4s ease-in-out infinite; }
@keyframes wait-dog {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(34px, 0); }
}
@keyframes wait-ball {
  0%, 100% { transform: translate(40px, 22px); }
  50% { transform: translate(84px, 14px); }
}
.wait-flock { animation: wait-flock 4s linear infinite; }
.wait-duck { animation: wait-bob 0.45s ease-in-out infinite alternate; }
.wait-duck:nth-child(2) { animation-delay: 0.1s; }
.wait-duck:nth-child(3) { animation-delay: 0.2s; }
.wait-duck:nth-child(4) { animation-delay: 0.28s; }
@keyframes wait-flock {
  from { transform: translate(-28px, 0); }
  to { transform: translate(70px, 0); }
}
@keyframes wait-bob {
  from { transform: translateY(0); }
  to { transform: translateY(-2px); }
}
.wait-larva { animation: wait-fade 4s linear infinite; }
.wait-pupa { transform-origin: 48px 18px; animation: wait-pupa 4s linear infinite; opacity: 0; }
.wait-wing { transform-origin: 49px 18px; animation: wait-wing 4s linear infinite; opacity: 0; }
@keyframes wait-fade {
  0%, 35% { opacity: 1; }
  45%, 100% { opacity: 0; }
}
@keyframes wait-pupa {
  0%, 38% { opacity: 0; }
  48%, 68% { opacity: 1; }
  78%, 100% { opacity: 0; }
}
@keyframes wait-wing {
  0%, 70% { opacity: 0; transform: scale(0.4); }
  82%, 100% { opacity: 1; transform: scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .wait-act, .wait-cat-body, .wait-yarn, .wait-dog-body, .wait-ball, .wait-flock, .wait-duck, .wait-larva, .wait-pupa, .wait-wing {
    animation: none !important;
  }
  .wait-cat { opacity: 1; }
}
`;
