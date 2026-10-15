import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { LEVELS, useOutline } from "@/data/course";
import { PATH } from "@/data/path";
import { lessonsIn, studyFor, PATH_LESSONS, PATH_LEVELS, type PathLesson, type PathLevel } from "@/data/path-lessons";
import { useLessonGloss } from "@/data/path-i18n";
import { LANGUAGES, LANG_BY_ID } from "@/data/languages";
import { packByEnglish, usePacks } from "@/data/packs";
import { Shell } from "@/components/concord/shell";
import { Remark } from "@/components/concord/remark";
import { Flag } from "@/components/concord/flag";
import { ScriptFonts } from "@/components/concord/fonts";
import { useConcord } from "@/lib/concord-store";
import { speak, stopSpeech } from "@/lib/speech";
import { useWait } from "@/wait/flag";

export const Route = createFileRoute("/path")({ component: PathPage });

const ON_PATH = new Set(PATH.map((stage) => `${stage.studyLevel}:${stage.studyGroup}`));

const LEVEL_NOTE: Record<PathLevel, string> = {
  A1: "Greetings, home, food, and the first day out.",
  A2: "Tickets, shops, health, school, and what happened yesterday.",
  B1: "Work, plans, problems, and a reason you can explain.",
  B2: "Meetings, study, a careful disagreement, and a choice.",
};

const WORD_ALIAS: Record<string, string[]> = {
  shoes: ["shoe"],
  colour: ["color"],
  hours: ["hour"],
  missed: ["miss"],
  notes: ["note"],
  bills: ["bill"],
};

const CHOICES = [
  LANGUAGES.find((item) => item.id === "en")!,
  ...LANGUAGES.filter((item) => item.id !== "en").sort((a, b) => a.name.localeCompare(b.name, "en")),
];

function lessonFromHash(id: string): PathLesson | undefined {
  const direct = PATH_LESSONS.find((lesson) => lesson.id === id);
  if (direct) return direct;
  return PATH_LESSONS.find((lesson) => lesson.grammar === id);
}

function wordGloss(lang: string, word: string): string | undefined {
  const tries = [word, ...(WORD_ALIAS[word.toLowerCase()] ?? [])];
  for (const text of tries) {
    const row = packByEnglish(lang, text);
    if (row?.word) return row.word;
  }
  return undefined;
}

function blank(sentence: string, word: string): string {
  let used = false;
  return sentence
    .split(/(\s+)/)
    .map((part) => {
      if (used || part.replace(/[.,!?;:]+$/g, "") !== word) return part;
      used = true;
      return "____";
    })
    .join("");
}

function cleanTokens(sentence: string): string[] {
  return sentence
    .replace(/[“”„«»".,!?;:()]/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

function hash(seed: string): number {
  let n = 2166136261;
  for (let i = 0; i < seed.length; i++) n = Math.imul(n ^ seed.charCodeAt(i), 16777619);
  return n >>> 0;
}

function shuffled(seed: string, words: string[]): string[] {
  const copy = [...words];
  let n = hash(seed);
  for (let i = copy.length - 1; i > 0; i--) {
    n = (Math.imul(n, 1664525) + 1013904223) >>> 0;
    const j = n % (i + 1);
    const swap = copy[i];
    copy[i] = copy[j];
    copy[j] = swap;
  }
  if (copy.length > 1 && copy.every((word, index) => word === words[index])) copy.push(copy.shift() as string);
  return copy;
}

type Step =
  | { type: "order"; ask: string; meaning?: string; answer: string[]; pool: string[] }
  | { type: "reply"; ask: string; prompt: string; meaning?: string; options: string[]; answer: number }
  | { type: "gap"; prompt: string; options: string[]; answer: string };

function buildSteps(lesson: PathLesson, glossLines: string[] | undefined, languageName: string): Step[] {
  const english = lesson.lines.map((line) => line.en);
  if (english.length < 2) return [];
  const translated = glossLines && glossLines.length === english.length ? glossLines : undefined;
  const spoken = translated ?? english;
  const steps: Step[] = [];
  const orderAt = Math.max(0, english.findIndex((line) => cleanTokens(line).length >= 3));
  const answer = cleanTokens(spoken[orderAt]);
  if (answer.length >= 2) {
    steps.push({
      type: "order",
      ask: translated ? `Put the ${languageName} words in order.` : "Put the words in order.",
      meaning: translated ? english[orderAt] : undefined,
      answer,
      pool: shuffled(`${lesson.id}:order`, answer),
    });
  }
  const correct = spoken[1];
  const options = shuffled(
    `${lesson.id}:reply`,
    [correct, ...spoken.filter((_, index) => index !== 1)].slice(0, 3),
  );
  steps.push({
    type: "reply",
    ask: "What comes next?",
    prompt: spoken[0],
    meaning: translated ? english[0] : undefined,
    options,
    answer: options.indexOf(correct),
  });
  const last = spoken[spoken.length - 1];
  const tokens = cleanTokens(last);
  const pick = [...tokens].reverse().find((token) => token.length > 2) ?? tokens[tokens.length - 1];
  if (pick) {
    const distractors = spoken
      .flatMap((line) => cleanTokens(line))
      .filter((token, index, all) => token.toLowerCase() !== pick.toLowerCase() && token.length > 2 && all.indexOf(token) === index)
      .slice(0, 3);
    const choices = shuffled(`${lesson.id}:gap`, [pick, ...distractors]);
    steps.push({
      type: "gap",
      prompt: blank(last, pick),
      options: choices,
      answer: pick,
    });
  }
  return steps;
}

function Practice({ lesson, glossLines, languageName }: { lesson: PathLesson; glossLines?: string[]; languageName: string }) {
  const steps = useMemo(() => buildSteps(lesson, glossLines, languageName), [lesson, glossLines, languageName]);
  const [index, setIndex] = useState(0);
  const [built, setBuilt] = useState<string[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [mark, setMark] = useState<"right" | "wrong" | null>(null);

  useEffect(() => {
    setIndex(0);
    setBuilt([]);
    setPicked(null);
    setMark(null);
  }, [lesson.id, languageName]);

  if (!steps.length) return null;
  const step = steps[index];

  function next() {
    setBuilt([]);
    setPicked(null);
    setMark(null);
    setIndex((value) => value + 1);
  }

  if (!step) {
    return (
      <div className="mt-5 rounded-2xl bg-chip/60 p-4">
        <p className="text-lg">Done. The lines are there if you want them again.</p>
      </div>
    );
  }

  return (
    <div className="mt-5 rounded-2xl bg-chip/60 p-4">
      <p className="text-xs tracking-widest text-accent uppercase">
        Practice · {index + 1} / {steps.length}
      </p>
      {step.type === "order" ? (
        <div className="mt-2">
          <p>{step.ask}</p>
          {step.meaning ? <p className="mt-1 text-muted">{step.meaning}</p> : null}
          <p className="mt-3 min-h-11 rounded-2xl bg-card px-3 py-2 text-lg leading-snug">{built.join(" ") || "…"}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {step.pool.map((word, wordIndex) => {
              const used = built.filter((item) => item === word).length;
              const before = step.pool.slice(0, wordIndex).filter((item) => item === word).length;
              const hidden = before < used;
              return (
                <li key={`${word}-${wordIndex}`}>
                  <button
                    type="button"
                    disabled={hidden || mark === "right"}
                    className="min-h-11 rounded-full bg-card px-3 disabled:opacity-30"
                    onClick={() => setBuilt((value) => [...value, word])}
                  >
                    {word}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className="min-h-11 rounded-full border border-line bg-card px-4" onClick={() => { setBuilt((value) => value.slice(0, -1)); setMark(null); }}>
              Undo
            </button>
            <button
              type="button"
              className="min-h-11 rounded-full bg-ink px-4 text-paper"
              onClick={() => setMark(built.join(" ").toLowerCase() === step.answer.join(" ").toLowerCase() ? "right" : "wrong")}
            >
              Check
            </button>
            {mark === "right" ? (
              <button type="button" className="min-h-11 rounded-full bg-moss px-4 text-moss-ink" onClick={next}>
                Next
              </button>
            ) : null}
          </div>
          {mark === "wrong" ? <p className="mt-2 text-sm text-muted">Not yet.</p> : null}
          {mark === "right" ? <p className="mt-2 text-sm">Yes.</p> : null}
        </div>
      ) : (
        <div className="mt-2">
          <p>{step.type === "reply" ? step.ask : "Choose the missing word."}</p>
          {step.type === "reply" ? (
            <>
              <p className="mt-2 text-lg leading-snug">{step.prompt}</p>
              {step.meaning ? <p className="text-muted">{step.meaning}</p> : null}
            </>
          ) : (
            <p className="mt-2 text-lg leading-snug">{step.prompt}</p>
          )}
          <ul className="mt-3 flex flex-col gap-2">
            {(step.type === "reply" ? step.options : step.options).map((option, optionIndex) => {
              const on = picked === optionIndex;
              const right = step.type === "reply" ? optionIndex === step.answer : option.toLowerCase() === step.answer.toLowerCase();
              return (
                <li key={option}>
                  <button
                    type="button"
                    className={`min-h-11 w-full rounded-2xl px-3 py-2 text-left ${on && right ? "bg-moss text-moss-ink" : on ? "bg-ink text-paper" : "bg-card"}`}
                    onClick={() => {
                      setPicked(optionIndex);
                      setMark(right ? "right" : "wrong");
                    }}
                  >
                    {option}
                  </button>
                </li>
              );
            })}
          </ul>
          {mark === "wrong" ? (
            <p className="mt-2 text-sm text-muted">{step.type === "reply" ? step.options[step.answer] : step.answer}</p>
          ) : null}
          {mark ? (
            <button type="button" className="mt-3 min-h-11 rounded-full bg-ink px-4 text-paper" onClick={next}>
              {index + 1 >= steps.length ? "Finish" : "Next"}
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}

function PathPage() {
  const focus = useConcord((s) => s.focus);
  const pathLang = useConcord((s) => s.pathLang);
  const setPathLang = useConcord((s) => s.setPathLang);
  const normalize = useConcord((s) => s.normalize);
  const setLevel = useConcord((s) => s.setLevel);
  const setGroup = useConcord((s) => s.setGroup);
  const outline = useOutline();
  const gloss = useLessonGloss(pathLang);
  const packsReady = usePacks(pathLang);
  useWait(outline === null);
  const lang = LANG_BY_ID.get(pathLang) ?? LANG_BY_ID.get("en");
  const [level, setPathLevel] = useState<PathLevel>("A1");
  const [openId, setOpenId] = useState("a1-01");
  const [shelf, setShelf] = useState(false);
  const [picking, setPicking] = useState(false);
  const [query, setQuery] = useState("");
  const [showLines, setShowLines] = useState(false);
  const lessons = lessonsIn(level);
  const open = PATH_LESSONS.find((lesson) => lesson.id === openId) ?? lessons[0];
  const grammar = PATH.find((stage) => stage.id === open?.grammar);
  const index = lessons.findIndex((lesson) => lesson.id === open?.id);
  const lessonGloss = open && gloss ? gloss[open.id] : undefined;
  const paired = pathLang !== "en" && gloss !== null;
  const hasSentences = Boolean(lessonGloss && (lessonGloss.lead?.length || lessonGloss.lines?.length));
  const needle = query.trim().toLowerCase();
  const matches = CHOICES.filter((item) => !needle || `${item.name} ${item.native}`.toLowerCase().includes(needle));

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

  useEffect(() => {
    setShowLines(false);
  }, [openId]);

  function choose(lesson: PathLesson, scroll: boolean) {
    setPathLevel(lesson.level);
    setOpenId(lesson.id);
    window.history.replaceState(null, "", `#${lesson.id}`);
    if (scroll) document.getElementById("open-lesson")?.scrollIntoView({ block: "start" });
  }

  function chooseLanguage(id: string) {
    stopSpeech();
    setPathLang(id);
    setPicking(false);
    setQuery("");
  }

  const commentLang = pathLang !== "en" ? pathLang : focus !== "en" ? focus : "";

  return (
    <Shell>
      <ScriptFonts ids={[pathLang]} />
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8 pb-24 md:px-6">
        <header>
          <p className="text-sm font-semibold tracking-widest text-accent uppercase">What to learn</p>
          <h1 className="mt-2 text-4xl md:text-5xl">Fifty lessons in each level.</h1>
          <p className="mt-4 text-lg text-muted">
            A lesson can be a reading, a scene, or a short practice. The English comes first. One other language sits beside it.
          </p>
        </header>

        <section>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold tracking-widest text-accent uppercase">One language</p>
            <button type="button" className="min-h-11 rounded-full bg-ink px-4 text-paper" onClick={() => setPicking((value) => !value)}>
              {lang ? <Flag id={lang.id} /> : null} {pathLang === "en" ? "English only" : lang?.name}
            </button>
          </div>
          <p className="mt-2 text-sm text-muted">The path uses one language, not the list from Study.</p>
          {picking && (
            <div className="mt-3">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Find a language"
                className="min-h-11 w-full rounded-2xl border border-line bg-card px-3"
                aria-label="Find a language"
              />
              <ul className="mt-2 max-h-52 overflow-y-auto rounded-2xl border border-line bg-card">
                {matches.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      aria-pressed={item.id === pathLang}
                      className={`flex min-h-11 w-full items-baseline gap-2 px-3 text-left ${item.id === pathLang ? "bg-ink text-paper" : ""}`}
                      onClick={() => chooseLanguage(item.id)}
                    >
                      <Flag id={item.id} />
                      <span>{item.id === "en" ? "English only" : item.name}</span>
                      {item.id !== "en" ? <span className={item.id === pathLang ? "text-paper/70" : "text-muted"}>{item.native}</span> : null}
                    </button>
                  </li>
                ))}
                {matches.length === 0 ? <li className="px-3 py-3 text-muted">No language with that name.</li> : null}
              </ul>
            </div>
          )}
        </section>

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
                {open.kind === "read" ? " · Reading" : open.kind === "practice" ? " · Practice" : ""}
                {grammar ? ` · ${grammar.title}` : ""}
              </p>
              <h2 className="mt-1 text-3xl">{open.title}</h2>
              <p className="mt-2">{open.aim}</p>
              {pathLang !== "en" && gloss && !hasSentences ? (
                <p className="mt-3 text-sm text-muted">
                  These sentences are not in {lang?.name} yet. Words we already have sit beside the English.
                </p>
              ) : null}
              {open.lead.length > 0 && (
                <div className="mt-4 space-y-3">
                  {open.kind === "scene" ? <p className="text-xs tracking-widest text-muted uppercase">Before the lines</p> : null}
                  {open.lead.map((sentence, sentenceIndex) => {
                    const tr = paired && hasSentences ? lessonGloss?.lead?.[sentenceIndex] : undefined;
                    return (
                      <div key={`${open.id}-lead-${sentenceIndex}`} className={tr ? "grid gap-1 border-t border-line pt-3 first:border-t-0 first:pt-0 md:grid-cols-2 md:gap-6" : ""}>
                        <p className="text-lg leading-snug">{sentence}</p>
                        {tr ? (
                          <p className="text-lg leading-snug" dir={lang?.dir} lang={lang?.speech} style={lang?.font ? { fontFamily: lang.font } : undefined}>
                            {tr}
                          </p>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              )}
              {open.kind === "practice" ? (
                <Practice
                  key={`${open.id}:${pathLang}:${hasSentences ? "t" : "e"}`}
                  lesson={open}
                  glossLines={paired && hasSentences ? lessonGloss?.lines : undefined}
                  languageName={lang?.name ?? "English"}
                />
              ) : null}
              {open.kind !== "read" && open.lines.length > 0 && (open.kind === "scene" || showLines) && (
                <ol className="mt-4 space-y-3">
                  {open.kind === "scene" ? <p className="text-xs tracking-widest text-muted uppercase">The lines</p> : null}
                  {open.lines.map((line, lineIndex) => {
                    const tr = paired && hasSentences ? lessonGloss?.lines?.[lineIndex] : undefined;
                    return (
                      <li key={`${line.who}-${line.en}`}>
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-xs tracking-widest text-muted uppercase">{line.who}</p>
                          {tr && lang ? (
                            <button type="button" className="min-h-11 rounded-full px-3 text-sm text-accent" onClick={() => speak(tr, lang.speech)}>
                              Listen
                            </button>
                          ) : null}
                        </div>
                        <div className={tr ? "grid gap-1 md:grid-cols-2 md:gap-6" : ""}>
                          <p className="text-xl leading-snug">{line.en}</p>
                          {tr ? (
                            <p className="text-xl leading-snug" dir={lang?.dir} lang={lang?.speech} style={lang?.font ? { fontFamily: lang.font } : undefined}>
                              {tr}
                            </p>
                          ) : null}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              )}
              {open.kind === "practice" && open.lines.length > 0 ? (
                <button type="button" className="mt-3 min-h-11 text-left text-muted" onClick={() => setShowLines((value) => !value)}>
                  {showLines ? "Hide the lines" : "Show the lines"}
                </button>
              ) : null}
              <ul className="mt-4 flex flex-wrap gap-2">
                {open.words.map((word) => {
                  const tr = pathLang !== "en" && packsReady ? wordGloss(pathLang, word) : undefined;
                  return (
                    <li key={word} className="rounded-full bg-chip px-3 py-1">
                      {word}
                      {tr ? (
                        <span dir={lang?.dir} lang={lang?.speech} style={lang?.font ? { fontFamily: lang.font } : undefined}>
                          {" "}
                          · {tr}
                        </span>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
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
              {commentLang ? (
                <Remark
                  key={`${commentLang}:${open.id}`}
                  lang={commentLang}
                  scopes={[{
                    kind: "section",
                    id: open.id,
                    label: open.title,
                    level: open.level,
                    bucket: "",
                    name: "Lesson",
                  }]}
                />
              ) : null}
            </div>
          </article>
        )}

        <ol className="grid gap-2 sm:grid-cols-2">
          {lessons.map((lesson) => {
            const on = lesson.id === open?.id;
            const kind = lesson.kind === "read" ? "Reading" : lesson.kind === "practice" ? "Practice" : lesson.words.join(", ");
            return (
              <li key={lesson.id}>
                <button
                  type="button"
                  aria-current={on ? "true" : undefined}
                  onClick={() => choose(lesson, true)}
                  className={`min-h-11 w-full rounded-2xl px-3 py-2 text-left ${on ? "bg-ink text-paper" : "bg-card"}`}
                >
                  <span className="tabular-nums">{String(lesson.n).padStart(2, "0")}</span> {lesson.title}
                  <span className={`mt-0.5 block text-sm ${on ? "text-paper/80" : "text-muted"}`}>{kind}</span>
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
      </div>
    </Shell>
  );
}
