import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LEVELS, useOutline } from "@/data/course";
import { PATH } from "@/data/path";
import { lessonsIn, studyFor, PATH_LESSONS, PATH_LEVELS, type PathLesson, type PathLevel } from "@/data/path-lessons";
import { LANGUAGES } from "@/data/languages";
import { Shell } from "@/components/concord/shell";
import { Flag } from "@/components/concord/flag";
import { useConcord } from "@/lib/concord-store";
import { useWait } from "@/wait/flag";

export const Route = createFileRoute("/path")({ component: PathPage });

const ON_PATH = new Set(PATH.map((stage) => `${stage.studyLevel}:${stage.studyGroup}`));

const LEVEL_NOTE: Record<PathLevel, string> = {
  A1: "Greetings, home, food, and the first day out.",
  A2: "Tickets, shops, health, school, and what happened yesterday.",
  B1: "Work, plans, problems, and a reason you can explain.",
  B2: "Meetings, study, a careful disagreement, and a choice.",
};

function lessonFromHash(id: string): PathLesson | undefined {
  const direct = PATH_LESSONS.find((lesson) => lesson.id === id);
  if (direct) return direct;
  return PATH_LESSONS.find((lesson) => lesson.grammar === id);
}

function PathPage() {
  const focus = useConcord((s) => s.focus);
  const normalize = useConcord((s) => s.normalize);
  const setLevel = useConcord((s) => s.setLevel);
  const setGroup = useConcord((s) => s.setGroup);
  const outline = useOutline();
  useWait(outline === null);
  const lang = LANGUAGES.find((item) => item.id === focus);
  const [level, setPathLevel] = useState<PathLevel>("A1");
  const [openId, setOpenId] = useState("a1-01");
  const [shelf, setShelf] = useState(false);
  const lessons = lessonsIn(level);
  const open = PATH_LESSONS.find((lesson) => lesson.id === openId) ?? lessons[0];
  const grammar = PATH.find((stage) => stage.id === open?.grammar);
  const index = lessons.findIndex((lesson) => lesson.id === open?.id);

  useEffect(() => {
    normalize();
  }, [normalize]);

  useEffect(() => {
    const id = window.location.hash.replace("#", "").replace(/^stage-/, "");
    const lesson = id ? lessonFromHash(id) : undefined;
    if (!lesson) return;
    setPathLevel(lesson.level);
    setOpenId(lesson.id);
  }, []);

  function choose(lesson: PathLesson, scroll: boolean) {
    setPathLevel(lesson.level);
    setOpenId(lesson.id);
    window.history.replaceState(null, "", `#${lesson.id}`);
    if (scroll) document.getElementById("open-lesson")?.scrollIntoView({ block: "start" });
  }

  return (
    <Shell>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8 pb-24 md:px-6">
        <header>
          <p className="text-sm font-semibold tracking-widest text-accent uppercase">What to learn</p>
          <h1 className="mt-2 text-4xl md:text-5xl">Fifty lessons in each level.</h1>
          <p className="mt-4 text-lg text-muted">
            Each lesson is a short scene that teaches a few words. Read it, then open those words in Study. Grammar is the rules, the verb, the noun, and the irregular forms
            {lang ? ` for ${lang.name}` : ""}.
          </p>
        </header>

        <div className="flex gap-2 overflow-x-auto">
          {PATH_LEVELS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                const next = lessonsIn(id)[0];
                if (next) choose(next, false);
              }}
              className={`min-h-11 shrink-0 rounded-full px-4 ${level === id ? "bg-ink text-paper" : "bg-chip"}`}
            >
              {id}
              <span className="ml-2 tabular-nums opacity-70">{lessonsIn(id).length}</span>
            </button>
          ))}
        </div>
        <p className="text-sm text-muted">{LEVEL_NOTE[level]}</p>

        {open && (
          <article id="open-lesson" className="scroll-mt-4 overflow-hidden rounded-3xl border border-line bg-card">
            <img src={`${open.image}?v=1`} alt="" className="h-44 w-full object-cover" />
            <div className="p-5">
              <p className="text-xs tracking-widest text-accent uppercase">
                {open.level} · {String(open.n).padStart(2, "0")} · {open.place}
                {grammar ? ` · ${grammar.title}` : ""}
              </p>
              <h2 className="mt-1 text-3xl">{open.title}</h2>
              <p className="mt-2">{open.aim}</p>
              <ol className="mt-4 space-y-3">
                {open.lines.map((line) => (
                  <li key={`${line.who}-${line.en}`}>
                    <p className="text-xs tracking-widest text-muted uppercase">{line.who}</p>
                    <p className="text-xl leading-snug">{line.en}</p>
                  </li>
                ))}
              </ol>
              <ul className="mt-4 flex flex-wrap gap-2">
                {open.words.map((word) => (
                  <li key={word} className="rounded-full bg-chip px-3 py-1">
                    {word}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-muted">The scene is in English. Study says the same words in the languages you chose.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="min-h-11 rounded-full border border-line px-4 py-2"
                  disabled={index <= 0}
                  onClick={() => {
                    const prev = lessons[index - 1];
                    if (prev) choose(prev, false);
                  }}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="min-h-11 rounded-full border border-line px-4 py-2"
                  disabled={index < 0 || index >= lessons.length - 1}
                  onClick={() => {
                    const next = lessons[index + 1];
                    if (next) choose(next, false);
                  }}
                >
                  Next
                </button>
                <Link
                  to="/study"
                  className="min-h-11 rounded-full bg-ink px-4 py-2 text-paper"
                  onClick={() => {
                    const target = studyFor(open);
                    setLevel(target.level);
                    setGroup(target.group);
                  }}
                >
                  Study {studyFor(open).group.replace(/^\d+\s/, "")}
                </Link>
                <Link to="/grammar" hash={open.grammar} className="min-h-11 rounded-full bg-chip px-4 py-2">
                  Grammar
                </Link>
              </div>
            </div>
          </article>
        )}

        <ol className="grid gap-2 sm:grid-cols-2">
          {lessons.map((lesson) => {
            const on = lesson.id === open?.id;
            return (
              <li key={lesson.id}>
                <button
                  type="button"
                  aria-current={on ? "true" : undefined}
                  onClick={() => choose(lesson, true)}
                  className={`min-h-11 w-full rounded-2xl px-3 py-2 text-left ${on ? "bg-ink text-paper" : "bg-card"}`}
                >
                  <span className="tabular-nums">{String(lesson.n).padStart(2, "0")}</span> {lesson.title}
                  <span className={`mt-0.5 block text-sm ${on ? "text-paper/80" : "text-muted"}`}>{lesson.words.join(", ")}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <section>
          <button type="button" className="text-lg" onClick={() => setShelf((value) => !value)}>
            {shelf ? "Hide the rest of the shelf" : "More words, still in themes"}
          </button>
          <p className="mt-2 text-muted">
            The lessons are the order to follow. The shelf is the rest, in themes: food, work, the body, and what is left over.
          </p>
          {shelf && outline && (
            <div className="mt-6 space-y-8">
              {LEVELS.map((rowLevel) => {
                const row = outline.levels.find((item) => item.id === rowLevel.id);
                const groups = (row?.groups ?? []).filter((group) => !ON_PATH.has(`${rowLevel.id}:${group.name}`));
                const themed = groups.filter((group) => !/extra/i.test(group.name));
                const extras = groups.filter((group) => /extra/i.test(group.name));
                if (themed.length === 0 && extras.length === 0) return null;
                return (
                  <div key={rowLevel.id}>
                    <h3 className="text-2xl">
                      {rowLevel.label}
                      {row ? ` · ${row.count.toLocaleString()}` : ""}
                    </h3>
                    <ul className="mt-3 divide-y divide-line border-y border-line">
                      {themed.map((group) => (
                        <li key={group.name} className="py-3">
                          <Link
                            to="/study"
                            className="text-xl"
                            onClick={() => {
                              setLevel(rowLevel.id);
                              setGroup(group.name);
                            }}
                          >
                            {group.name.replace(/^\d+\s/, "")}
                          </Link>
                          <p className="text-sm text-muted">
                            {group.count.toLocaleString()} {rowLevel.id === "P" ? "lines" : "cards"} · {group.sample}
                          </p>
                        </li>
                      ))}
                    </ul>
                    {extras.length > 0 && (
                      <details className="mt-3">
                        <summary className="cursor-pointer text-muted">Alphabetical leftovers ({extras.length})</summary>
                        <ul className="mt-2 space-y-1 text-sm text-muted">
                          {extras.map((group) => (
                            <li key={group.name}>
                              <Link
                                to="/study"
                                onClick={() => {
                                  setLevel(rowLevel.id);
                                  setGroup(group.name);
                                }}
                              >
                                {group.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {lang && (
          <p className="flex items-center gap-2 text-sm text-muted">
            <Flag id={lang.id} /> Grammar on this path is written for {lang.name}. The lesson text stays in English.
          </p>
        )}
      </div>
    </Shell>
  );
}
