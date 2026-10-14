import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useOutline } from "@/data/course";
import { FAMILIES, LANGUAGES } from "@/data/languages";
import { Shell } from "@/components/concord/shell";
import { Plate } from "@/components/concord/plate";
import { Flag } from "@/components/concord/flag";
import { useConcord } from "@/lib/concord-store";
import { useStanding } from "@/lib/league/client";
import { leagueFor } from "@/lib/league/score";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const targets = useConcord((s) => s.targets);
  const toggleTarget = useConcord((s) => s.toggleTarget);
  const normalize = useConcord((s) => s.normalize);
  const outline = useOutline();
  const standing = useStanding();
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("");
  const chosen = targets.filter((id) => id !== "en").length;
  const needle = query.trim().toLowerCase();
  const languages = LANGUAGES.filter((lang) => {
    if (lang.id === "en") return false;
    if (family && lang.family !== family) return false;
    if (!needle) return true;
    return `${lang.name} ${lang.native} ${lang.family}`.toLowerCase().includes(needle);
  }).sort((a, b) => a.name.localeCompare(b.name, "en"));

  useEffect(() => {
    normalize();
  }, [normalize]);

  return (
    <Shell>
      <div className="mx-auto grid h-full min-h-0 w-full max-w-6xl grid-rows-[auto_minmax(0,1fr)] gap-3 px-4 py-3 md:px-6 lg:grid-cols-[17rem_minmax(0,1fr)] lg:grid-rows-1">
        <section className="flex min-h-0 flex-col gap-3">
          <div>
            <p className="text-xs font-semibold tracking-widest text-accent uppercase">Parallel course</p>
            <h1 className="mt-1 text-3xl leading-none text-ink md:text-4xl">English on the left. Your languages on the card.</h1>
            <p className="mt-2 text-sm text-muted">
              Space reveals the word, then the next one. Up to twelve languages share the card, and switching one does not hide the word.
            </p>
            <p className="mt-2 text-sm text-muted">
              {outline
                ? `${outline.words.toLocaleString()} words · A1–B2 · ${outline.phrases.toLocaleString()} phrases`
                : "A1 through B2"}
            </p>
            {standing.mine ? (
              <p className="mt-2 text-sm">
                <Link to="/league">
                  {leagueFor(standing.mine.score).name} · {standing.mine.score.toLocaleString()} points · {standing.mine.held.toLocaleString()} still remembered
                </Link>
              </p>
            ) : standing.status === "ready" || standing.status === "guest" ? (
              <p className="mt-2 text-sm">
                <Link to="/league">Join a league with your name</Link>
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/study" className="inline-flex min-h-10 items-center rounded-full bg-accent px-4 text-sm text-accent-ink">
              Open the deck
            </Link>
            <Link to="/letters" className="inline-flex min-h-10 items-center rounded-full border border-line bg-card px-4 text-sm">
              Alphabet
            </Link>
            <Link to="/path" className="inline-flex min-h-10 items-center rounded-full border border-line bg-card px-4 text-sm">
              Path
            </Link>
            <Link to="/grammar" className="inline-flex min-h-10 items-center rounded-full border border-line bg-card px-4 text-sm">
              Grammar
            </Link>
            <Link to="/talk" className="inline-flex min-h-10 items-center rounded-full border border-line bg-card px-4 text-sm">
              Talk
            </Link>
          </div>
          <figure className="hidden overflow-hidden rounded-2xl border border-line bg-card sm:block">
            <div className="h-28 bg-chip">
              <Plate src="water" alt="A pitcher of water" />
            </div>
            <figcaption className="flex items-baseline gap-3 px-3 py-2">
              <span className="flex items-center gap-2 font-display text-xl">
                <Flag id="en" /> water
              </span>
              <span className="truncate text-sm text-muted">The water is cold.</span>
            </figcaption>
          </figure>
          <p className="text-xs leading-relaxed text-muted">
            Left and right change the language tab. Up and down move without revealing. R means remembered, W means again. A remembered card waits 3 days, then a week, and longer after that.
          </p>
        </section>

        <section className="flex min-h-0 flex-col rounded-2xl border border-line bg-card p-3">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl">I’m learning</h2>
            <span className="text-sm text-muted">{chosen}/12</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find a language"
              aria-label="Find a language"
              className="min-h-10 min-w-0 flex-1 rounded-full border border-line bg-paper px-3 text-sm"
            />
            <select
              value={family}
              onChange={(event) => setFamily(event.target.value)}
              aria-label="Language family"
              className="min-h-10 rounded-full border border-line bg-paper px-3 text-sm"
            >
              <option value="">All families</option>
              {FAMILIES.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
          <div className="mt-2 min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-4 xl:grid-cols-5">
              {languages.map((lang) => {
                const on = targets.includes(lang.id);
                const blocked = !on && chosen >= 12;
                return (
                  <button
                    key={lang.id}
                    type="button"
                    disabled={blocked}
                    title={`${lang.native} · ${lang.family}`}
                    aria-pressed={on}
                    aria-label={`${lang.name}, ${lang.native}`}
                    onClick={() => toggleTarget(lang.id)}
                    className={`flex min-h-10 items-center gap-2 rounded-xl border px-2 text-left text-sm ${on ? "border-moss bg-moss text-moss-ink" : "border-line bg-paper"} disabled:opacity-40`}
                  >
                    <Flag id={lang.id} />
                    <span className="truncate">{lang.name}</span>
                  </button>
                );
              })}
            </div>
            {languages.length === 0 && <p className="px-1 py-6 text-sm text-muted">No language matches that.</p>}
          </div>
        </section>
      </div>
    </Shell>
  );
}
