import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LANG_BY_ID } from "@/data/languages";
import { useConcord } from "@/lib/concord-store";
import { useStanding } from "@/lib/league/client";
import { leagueFor } from "@/lib/league/score";

const LINKS = [
  { to: "/study", label: "Study" },
  { to: "/letters", label: "Alphabet" },
  { to: "/path", label: "Path" },
  { to: "/grammar", label: "Grammar" },
  { to: "/talk", label: "Talk" },
  { to: "/league", label: "League" },
] as const;

export function Shell({ children, scroll = true }: { children: ReactNode; scroll?: boolean }) {
  const focus = useConcord((s) => s.focus);
  const source = useConcord((s) => s.source);
  const standing = useStanding();
  const focusName = LANG_BY_ID.get(focus)?.name ?? "Choose";
  const sourceName = LANG_BY_ID.get(source)?.name ?? "";
  const mine = standing.mine;
  const chip = mine
    ? `${leagueFor(mine.score).name} · ${mine.score.toLocaleString()}`
    : standing.status === "ready"
      ? "Add your name"
      : "League";

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-paper text-ink">
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
          {chip !== "League" && (
            <Link to="/league" className="inline-flex min-h-10 shrink-0 items-center rounded-full bg-moss px-3 text-sm text-moss-ink">
              {chip}
            </Link>
          )}
        </div>
      </header>
      <div className={scroll ? "min-h-0 flex-1 overflow-y-auto overscroll-contain" : "flex min-h-0 flex-1 flex-col overflow-hidden"}>
        {children}
      </div>
    </div>
  );
}
