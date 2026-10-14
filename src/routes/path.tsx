import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { LEVELS, useOutline } from "@/data/course";
import { LANGUAGES } from "@/data/languages";
import { BATCHES } from "@/data/syllabus";
import { LESSONS } from "@/data/grammar";
import { Shell } from "@/components/concord/shell";
import { Flag } from "@/components/concord/flag";
import { useConcord } from "@/lib/concord-store";

export const Route = createFileRoute("/path")({ component: PathPage });

function PathPage() {
  const focus = useConcord((s) => s.focus);
  const normalize = useConcord((s) => s.normalize);
  const setLevel = useConcord((s) => s.setLevel);
  const setGroup = useConcord((s) => s.setGroup);
  const outline = useOutline();
  const lang = LANGUAGES.find((item) => item.id === focus) ?? LANGUAGES.find((item) => item.id === "de");

  useEffect(() => {
    normalize();
  }, [normalize]);

  return (
    <Shell>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-4 py-10 pb-24 md:px-6">
        <header>
          <p className="text-sm font-semibold tracking-widest text-accent uppercase">What to learn</p>
          <h1 className="mt-2 text-5xl">A1 through B2, in order.</h1>
          <p className="mt-4 text-lg text-muted">
            {outline
              ? `The shelf is ${outline.words.toLocaleString()} English words, each with a sentence, then ${outline.phrases.toLocaleString()} useful sentences and dialogue lines.`
              : "The shelf runs from A1 to B2, then useful sentences and short dialogues."}{" "}
            The opening cards are translated in every language on the list. Later groups stay in English until a line is saved on the card.
          </p>
          <p className="mt-4">
            <Link to="/letters" className="text-lg">
              Start with the alphabet
            </Link>
            <span className="text-muted"> — each alphabet, then a beginner word to hold the letter. Chinese lists every character in the course, with the stroke order. Japanese is split into hiragana, katakana, and the kanji from the course.</span>
          </p>
        </header>

        {LEVELS.map((level) => {
          const row = outline?.levels.find((item) => item.id === level.id);
          const groups = row?.groups ?? [];
          return (
            <section key={level.id}>
              <h2 className="text-3xl">
                {level.label}
                {row ? ` · ${row.count.toLocaleString()}` : ""}
              </h2>
              <p className="mt-2 text-muted">{level.aim}</p>
              {groups.length > 0 && (
                <ol className="mt-6 divide-y divide-line border-y border-line">
                  {groups.map((group, index) => (
                    <li key={group.name} className="grid gap-2 py-4 sm:grid-cols-[8rem_minmax(0,1fr)]">
                      <p className="font-display text-2xl tabular-nums">{String(index + 1).padStart(2, "0")}</p>
                      <div>
                        <Link
                          to="/study"
                          className="text-2xl"
                          onClick={() => {
                            setLevel(level.id);
                            setGroup(group.name);
                          }}
                        >
                          {group.name.replace(/^\d+\s/, "")}
                        </Link>
                        <p className="text-muted">
                          {group.count.toLocaleString()} {level.id === "P" ? "lines" : "cards"}
                        </p>
                        <p className="mt-2 text-sm">{group.sample}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          );
        })}

        <section>
          <h2 className="text-3xl">How a card comes back</h2>
          <p className="mt-2 text-muted">R moves a card one step to the right. W returns it to the first batch. Each language keeps its own place for the same word.</p>
          <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {BATCHES.map((batch, index) => (
              <li key={batch.id} className="rounded-2xl border border-line bg-card px-3 py-4">
                <p className="text-xs text-muted tabular-nums">0{index + 1}</p>
                <p className="font-display text-2xl">{batch.label}</p>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-3xl">Grammar, in order</h2>
          <ol className="mt-4 space-y-3">
            {LESSONS.map((lesson) => (
              <li key={lesson.id} className="flex gap-4">
                <span className="font-display text-2xl text-accent tabular-nums">{lesson.n}</span>
                <div>
                  <Link to="/grammar" className="text-xl">
                    {lesson.title}
                  </Link>
                  <p className="text-muted">{lesson.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {lang && (
          <p className="flex items-center gap-2 text-sm text-muted">
            <Flag id={lang.id} /> Focused language: {lang.name}. A correction Grok applies on a card stays on this device.
          </p>
        )}
      </div>
    </Shell>
  );
}
