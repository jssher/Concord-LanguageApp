import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CONCEPT_BY_ID } from "@/data/concepts";
import { LESSONS } from "@/data/grammar";
import { getBaseEntry } from "@/data/lexicon";
import { LANG_BY_ID } from "@/data/languages";
import { Shell } from "@/components/concord/shell";
import { cardKey, useConcord } from "@/lib/concord-store";
import { mergeEntry } from "@/lib/entry";

export const Route = createFileRoute("/grammar")({ component: GrammarPage });

function GrammarPage() {
  const [current, setCurrent] = useState(LESSONS[0].id);
  const focus = useConcord((s) => s.focus);
  const source = useConcord((s) => s.source);
  const fixes = useConcord((s) => s.fixes);
  const setConceptId = useConcord((s) => s.setConceptId);
  const lesson = LESSONS.find((item) => item.id === current) ?? LESSONS[0];
  const lang = LANG_BY_ID.get(focus);
  const note = (lang && lesson.families[lang.family]) || lesson.families.default;

  return (
    <Shell>
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 md:grid-cols-[16rem_minmax(0,1fr)] md:px-6">
        <ol className="space-y-1">
          {LESSONS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setCurrent(item.id)}
                className={`flex min-h-11 w-full items-baseline gap-3 rounded-xl px-3 text-left ${item.id === lesson.id ? "bg-ink text-paper" : "hover:bg-chip"}`}
              >
                <span className="tabular-nums">{item.n}</span>
                <span>{item.title}</span>
              </button>
            </li>
          ))}
        </ol>
        <article className="max-w-2xl">
          <p className="text-sm tracking-widest text-accent uppercase">Lesson {lesson.n}</p>
          <h1 className="mt-2 text-5xl">{lesson.title}</h1>
          <p className="mt-4 text-lg">{lesson.body}</p>
          <aside className="mt-6 rounded-2xl border border-line bg-card p-5">
            <p className="text-xs tracking-widest text-muted uppercase">{lang ? `${lang.name} · ${lang.family}` : "Note"}</p>
            <p className="mt-2 text-lg">{note}</p>
            {lang && <p className="mt-3 text-sm text-muted">{lang.tip}</p>}
          </aside>
          <h2 className="mt-8 text-2xl">Practice on these cards</h2>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {lesson.examples.map((id) => {
              const concept = CONCEPT_BY_ID.get(id);
              const entry = mergeEntry(getBaseEntry(focus, id), fixes[cardKey(focus, id)]);
              const anchor = mergeEntry(getBaseEntry(source, id), fixes[cardKey(source, id)]);
              if (!concept) return null;
              return (
                <li key={id}>
                  <Link
                    to="/study"
                    onClick={() => setConceptId(id)}
                    className="flex min-h-14 items-baseline justify-between gap-4 py-3"
                  >
                    <span>
                      <span className="block text-xl" dir={lang?.dir} style={{ fontFamily: lang?.font }}>{entry?.word ?? concept.gloss}</span>
                      <span className="text-sm text-muted">{anchor?.sentence ?? concept.sentence}</span>
                    </span>
                    <span className="text-sm text-accent">Study</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </article>
      </div>
    </Shell>
  );
}
