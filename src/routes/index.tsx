import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useOutline } from "@/data/outline";
import { PICTURE_WORD_COUNT } from "@/data/pictures";
import { FAMILIES, LANGUAGES } from "@/data/languages";
import { Shell } from "@/components/concord/shell";
import { Flag } from "@/components/concord/flag";
import { useConcord } from "@/lib/concord-store";
import { useWait } from "@/wait/flag";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const targets = useConcord((s) => s.targets);
  const toggleTarget = useConcord((s) => s.toggleTarget);
  const normalize = useConcord((s) => s.normalize);
  const outline = useOutline();
  useWait(outline === null);
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
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-4 pb-28 md:px-6">
        <section>
          <p className="text-xs font-semibold tracking-widest text-accent uppercase">Concord</p>
          <h1 className="mt-1 text-3xl leading-tight text-ink md:text-4xl">The same meaning, side by side.</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            English stays on the left. The languages you choose share the right, up to twelve on one card, with a picture and a sentence for each word.
            Start with a greeting and keep going through a real conversation.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link to="/study" className="rounded-2xl border border-line bg-card px-3 py-3">
              <p className="text-2xl tabular-nums text-ink">{outline ? outline.words.toLocaleString() : "…"}</p>
              <p className="text-sm text-ink">Words on the cards</p>
              <p className="text-xs text-muted">
                {outline ? `A1–B2 · ${outline.phrases.toLocaleString()} phrases` : "A1–B2"}
              </p>
            </Link>
            <Link to="/pictures" className="rounded-2xl border border-line bg-card px-3 py-3">
              <p className="text-2xl tabular-nums text-ink">{PICTURE_WORD_COUNT.toLocaleString()}</p>
              <p className="text-sm text-ink">Words in the pictures</p>
              <p className="text-xs text-muted">Picture dictionary</p>
            </Link>
          </div>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Turn languages on below, then open the cards. Space shows the next word. Switching a language does not hide it.
          </p>
        </section>

        <section className="rounded-2xl border border-line bg-card p-3">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl">Choose languages</h2>
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
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
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
                  className={`flex min-h-12 items-center gap-2 rounded-xl border px-2 text-left text-sm ${on ? "border-moss bg-moss text-moss-ink" : "border-line bg-paper"} disabled:opacity-40`}
                >
                  <Flag id={lang.id} />
                  <span className="truncate">{lang.name}</span>
                </button>
              );
            })}
          </div>
          {languages.length === 0 && <p className="px-1 py-6 text-sm text-muted">No language matches that.</p>}
          {chosen >= 12 && <p className="mt-2 text-sm text-muted">Twelve languages are on. Turn one off to add another.</p>}
        </section>
      </div>
      <div className="sticky bottom-0 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur md:px-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
          <p className="text-sm text-muted">{chosen === 0 ? "Choose at least one language." : `${chosen} chosen`}</p>
          <Link to="/pictures" className="inline-flex min-h-12 items-center rounded-full border border-line bg-card px-5">
            Picture dictionary
          </Link>
          <Link to="/study" className="inline-flex min-h-12 items-center rounded-full bg-accent px-5 text-accent-ink">
            Open the cards
          </Link>
        </div>
      </div>
    </Shell>
  );
}