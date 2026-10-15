import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LANG_BY_ID } from "@/data/languages";
import { useConcord } from "@/lib/concord-store";
import { ScriptFonts } from "@/components/concord/fonts";
import { WaitCorner } from "@/wait/corner";
import { playEgg } from "@/wait/flag";

const LINKS = [
  { to: "/study", label: "Study" },
  { to: "/pictures", label: "Pictures" },
  { to: "/letters", label: "Alphabet" },
  { to: "/path", label: "Path" },
  { to: "/grammar", label: "Grammar" },
  { to: "/league", label: "League" },
  { to: "/improve", label: "Comments" },
  { to: "/credits", label: "Credits" },
] as const;

export function Shell({ children, scroll = true }: { children: ReactNode; scroll?: boolean }) {
  const focus = useConcord((s) => s.focus);
  const source = useConcord((s) => s.source);
  const targets = useConcord((s) => s.targets);
  const focusName = LANG_BY_ID.get(focus)?.name ?? "Choose";
  const sourceName = LANG_BY_ID.get(source)?.name ?? "";

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-paper text-ink">
      <ScriptFonts ids={[focus, ...targets]} />
      <header className="shrink-0 border-b border-line">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:px-6">
          <Link to="/" className="font-display text-2xl tracking-tight">
            Concord
          </Link>
          <nav className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto text-sm">
            {LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="shrink-0 rounded-full px-3 py-2 text-muted data-[status=active]:bg-ink data-[status=active]:text-paper"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="hidden shrink-0 text-sm text-muted lg:block">
            {sourceName} → {focusName}
          </p>
        </div>
      </header>
      <div className={scroll ? "min-h-0 flex-1 overflow-y-auto overscroll-contain" : "flex min-h-0 flex-1 flex-col overflow-hidden"}>
        {children}
      </div>
      <footer className="relative z-30 shrink-0 border-t border-line">
        <div className="mx-auto flex max-w-6xl items-start gap-3 px-4 py-2 md:px-6">
          <Link
            to="/content"
            className="shrink-0 rounded-full px-3 py-1 text-sm text-muted data-[status=active]:bg-ink data-[status=active]:text-paper"
          >
            Content
          </Link>
          <div
            role="button"
            tabIndex={0}
            onClick={playEgg}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                playEgg();
              }
            }}
            className="flex min-w-0 flex-1 cursor-default items-start gap-2"
          >
            <span className="min-w-0 truncate pt-1 text-xs text-muted">Words and lines in each language</span>
            <WaitCorner />
          </div>
        </div>
      </footer>
    </div>
  );
}
