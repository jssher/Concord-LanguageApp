import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Moon, Sun } from "lucide-react";
import { LANG_BY_ID } from "@/data/languages";
import { DEFAULT_VOICE } from "@/data/voices";
import { useConcord } from "@/lib/concord-store";
import { applyVoice } from "@/lib/speech";
import { ScriptFonts } from "@/components/concord/fonts";
import { WaitCorner } from "@/wait/corner";
import { playEgg } from "@/wait/flag";
import { useEffect } from "react";

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
  const voice = useConcord((s) => s.voice) || DEFAULT_VOICE;
  const dark = useConcord((s) => s.dark);
  const setDark = useConcord((s) => s.setDark);
  const focusName = LANG_BY_ID.get(focus)?.name ?? "Choose";
  const sourceName = LANG_BY_ID.get(source)?.name ?? "";

  useEffect(() => {
    applyVoice(voice);
  }, [voice]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#1c1915" : "#f3ecdf");
  }, [dark]);

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
          <button
            type="button"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={dark}
            onClick={() => setDark(!dark)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border"
            style={
              dark
                ? { background: "#f3ecdf", color: "#c24d2c", borderColor: "#1c1915" }
                : { background: "#1c1915", color: "#f3ecdf", borderColor: "#f3ecdf" }
            }
          >
            {dark ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
          </button>
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
          <Link
            to="/settings"
            className="shrink-0 rounded-full px-3 py-1 text-sm text-muted data-[status=active]:bg-ink data-[status=active]:text-paper"
          >
            Settings
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
