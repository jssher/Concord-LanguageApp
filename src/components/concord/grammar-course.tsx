import { useEffect, useRef, useState } from "react";
import { Flag } from "@/components/concord/flag";
import { Remark } from "@/components/concord/remark";
import { GRAMMAR_LEVELS, type FormCard, type GrammarCourse, type GrammarLesson } from "@/data/grammar/model";
import { LANG_BY_ID, LANGUAGES, type LangMeta } from "@/data/languages";
import { translateGrammar, type GrammarTranslation } from "@/lib/translate-grammar";

const STORE = "concord-grammar-course";

type Saved = { lesson: string; known: string[] };

function readSaved(langId: string): Saved {
  try {
    const all = JSON.parse(localStorage.getItem(STORE) ?? "{}") as Record<string, Saved>;
    const row = all[langId];
    return { lesson: row?.lesson ?? "", known: Array.isArray(row?.known) ? row.known : [] };
  } catch {
    return { lesson: "", known: [] };
  }
}

function writeSaved(langId: string, saved: Saved) {
  try {
    const all = JSON.parse(localStorage.getItem(STORE) ?? "{}") as Record<string, Saved>;
    all[langId] = saved;
    localStorage.setItem(STORE, JSON.stringify(all));
  } catch {
    /* the course still works if the browser refuses storage */
  }
}

export function GrammarCourseScreen({
  lang,
  course,
  onLanguage,
}: {
  lang: LangMeta;
  course: GrammarCourse;
  onLanguage: (id: string) => void;
}) {
  const [mode, setMode] = useState<"lesson" | "cards">("lesson");
  const [index, setIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [face, setFace] = useState<"word" | "forms">("word");
  const [known, setKnown] = useState<string[]>([]);
  const [hideKnown, setHideKnown] = useState(false);
  const [into, setInto] = useState("");
  const [translation, setTranslation] = useState<GrammarTranslation | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const request = useRef(0);
  const ids = [...LANGUAGES].map((item) => item.id).sort((a, b) => (LANG_BY_ID.get(a)?.name ?? a).localeCompare(LANG_BY_ID.get(b)?.name ?? b, "en"));
  const lesson = course.lessons[index] ?? course.lessons[0];
  const intoLang = into ? LANG_BY_ID.get(into) : undefined;
  const deck = hideKnown ? course.cards.filter((card) => !known.includes(card.word)) : course.cards;
  const card = deck[Math.min(cardIndex, Math.max(0, deck.length - 1))];
  const shown = translation;
  const explainDir = shown && intoLang ? intoLang.dir : "ltr";
  const explainFont = shown && intoLang?.font ? { fontFamily: intoLang.font } : undefined;

  useEffect(() => {
    const saved = readSaved(lang.id);
    setKnown(saved.known);
    const hash = window.location.hash.replace("#", "");
    if (hash === "cards") {
      setMode("cards");
      setCardIndex(0);
      setFace("word");
      return;
    }
    if (hash.startsWith("card-")) {
      const word = decodeURIComponent(hash.slice("card-".length));
      const found = course.cards.findIndex((item) => item.word === word);
      setHideKnown(false);
      setMode("cards");
      setCardIndex(found >= 0 ? found : 0);
      setFace("word");
      return;
    }
    const found = course.lessons.findIndex((item) => item.id === hash);
    const restored = course.lessons.findIndex((item) => item.id === saved.lesson);
    const next = found >= 0 ? found : restored >= 0 ? restored : 0;
    setMode("lesson");
    setIndex(next);
    setTranslation(null);
    setError("");
    request.current += 1;
  }, [lang.id, course]);

  useEffect(() => {
    setFace("word");
  }, [cardIndex, lang.id, hideKnown]);

  function openLesson(next: number) {
    const item = course.lessons[next];
    if (!item) return;
    setMode("lesson");
    setIndex(next);
    setTranslation(null);
    setError("");
    request.current += 1;
    window.history.replaceState(null, "", `#${item.id}`);
    writeSaved(lang.id, { lesson: item.id, known });
  }

  function openCards() {
    setMode("cards");
    setCardIndex(0);
    setFace("word");
    setTranslation(null);
    window.history.replaceState(null, "", "#cards");
  }

  function mark(word: string, keep: boolean) {
    const next = keep ? [...new Set([...known, word])] : known.filter((item) => item !== word);
    setKnown(next);
    writeSaved(lang.id, { lesson: lesson?.id ?? "", known: next });
    setFace("word");
    setCardIndex((value) => {
      const pool = hideKnown ? course.cards.filter((item) => !next.includes(item.word)) : course.cards;
      if (pool.length === 0) return 0;
      const step = keep && !hideKnown ? value + 1 : value;
      return Math.min(step, pool.length - 1);
    });
  }

  function askTranslation() {
    if (!lesson || !intoLang || intoLang.id === "en") return;
    const mine = ++request.current;
    setBusy(true);
    setError("");
    void translateGrammar({
      data: {
        intoName: intoLang.name,
        about: lang.name,
        summary: lesson.lead,
        body: lesson.notes.join(" "),
        points: lesson.notes,
        caption: lesson.table?.caption ?? "",
        heads: lesson.table?.heads ?? [],
        glosses: lesson.examples.map((sample) => sample[1]),
      },
    })
      .then((result) => {
        if (mine !== request.current) return;
        if (!result.ok) {
          setTranslation(null);
          setError(result.error);
          return;
        }
        setTranslation(result.text);
      })
      .catch(() => {
        if (mine !== request.current) return;
        setTranslation(null);
        setError("Grok could not translate this.");
      })
      .finally(() => {
        if (mine === request.current) setBusy(false);
      });
  }

  const lead = shown?.summary || lesson?.lead || "";
  const notes = shown?.points?.length === lesson?.notes.length ? shown.points : lesson?.notes ?? [];
  const glosses = shown?.glosses?.length === lesson?.examples.length ? shown.glosses : null;
  const heads = shown && lesson?.table && shown.heads.length === lesson.table.heads.length ? shown.heads : lesson?.table?.heads;
  const caption = shown?.caption || lesson?.table?.caption;

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 py-6 pb-16 md:grid-cols-[16rem_minmax(0,1fr)] md:px-6">
      <aside className="flex flex-col gap-3">
        <header>
          <h1 className="text-3xl leading-none">Grammar</h1>
          <p className="mt-2 text-sm text-muted">{course.intro}</p>
        </header>
        <label className="flex min-w-0 items-center gap-2">
          <Flag id={lang.id} />
          <select
            value={lang.id}
            onChange={(event) => onLanguage(event.target.value)}
            aria-label="Language"
            className="min-h-11 min-w-0 flex-1 rounded-full border border-line bg-card px-3 text-sm"
          >
            {ids.map((id) => {
              const item = LANG_BY_ID.get(id);
              if (!item) return null;
              return (
                <option key={id} value={id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </label>
        <div className="flex gap-2">
          <button type="button" aria-pressed={mode === "lesson"} onClick={() => openLesson(index)} className={`min-h-11 flex-1 rounded-full px-3 text-sm ${mode === "lesson" ? "bg-ink text-paper" : "bg-card"}`}>
            Lessons
          </button>
          <button type="button" aria-pressed={mode === "cards"} onClick={openCards} className={`min-h-11 flex-1 rounded-full px-3 text-sm ${mode === "cards" ? "bg-ink text-paper" : "bg-card"}`}>
            Cards {course.cards.length}
          </button>
        </div>
        {mode === "lesson" ? (
          <>
            <label className="md:hidden">
              <span className="sr-only">Lesson</span>
              <select value={index} onChange={(event) => openLesson(Number(event.target.value))} className="min-h-11 w-full rounded-full border border-line bg-card px-3 text-sm">
                {course.lessons.map((item, itemIndex) => (
                  <option key={item.id} value={itemIndex}>
                    {item.level} · {item.title}
                  </option>
                ))}
              </select>
            </label>
            <div className="hidden flex-col gap-3 md:flex">
              {GRAMMAR_LEVELS.map((level) => {
                const rows = course.lessons.map((item, itemIndex) => ({ item, itemIndex })).filter((row) => row.item.level === level);
                if (!rows.length) return null;
                return (
                  <div key={level}>
                    <p className="mb-1 text-xs tracking-widest text-muted uppercase">{level}</p>
                    <div className="flex flex-col gap-1">
                      {rows.map(({ item, itemIndex }) => {
                        const on = itemIndex === index;
                        return (
                          <button key={item.id} type="button" aria-pressed={on} onClick={() => openLesson(itemIndex)} className={`min-h-11 rounded-2xl px-3 py-2 text-left text-sm ${on ? "bg-ink text-paper" : "bg-card"}`}>
                            {item.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-2">
            <button type="button" aria-pressed={hideKnown} onClick={() => setHideKnown((value) => !value)} className={`min-h-11 rounded-full px-3 text-sm ${hideKnown ? "bg-moss text-moss-ink" : "bg-card"}`}>
              {hideKnown ? "Still learning" : "All forms"}
            </button>
            <label className="md:hidden">
              <span className="sr-only">Card</span>
              <select
                value={deck.length ? Math.min(cardIndex, deck.length - 1) : 0}
                onChange={(event) => { setCardIndex(Number(event.target.value)); setFace("word"); }}
                className="min-h-11 w-full rounded-full border border-line bg-card px-3 text-sm"
              >
                {deck.map((item, itemIndex) => (
                  <option key={item.word} value={itemIndex}>
                    {item.word} · {item.gloss}
                  </option>
                ))}
              </select>
            </label>
            <div className="hidden flex-col gap-1 md:flex">
              {deck.map((item, itemIndex) => {
                const on = item.word === card?.word;
                return (
                  <button key={item.word} type="button" aria-pressed={on} onClick={() => { setCardIndex(itemIndex); setFace("word"); }} className={`flex min-h-11 items-baseline gap-2 rounded-2xl px-3 py-2 text-left text-sm ${on ? "bg-ink text-paper" : "bg-card"} ${known.includes(item.word) ? "opacity-60" : ""}`}>
                    <span className="shrink-0" dir={lang.dir} style={lang.font ? { fontFamily: lang.font } : undefined}>{item.word}</span>
                    <span className={`truncate text-xs ${on ? "text-paper/80" : "text-muted"}`}>{item.gloss}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </aside>
      {mode === "cards" ? (
        <CardFace lang={lang} card={card} place={deck.length ? Math.min(cardIndex, deck.length - 1) + 1 : 0} total={deck.length} known={known} face={face} onFlip={() => setFace((value) => (value === "word" ? "forms" : "word"))} onPrev={() => { setCardIndex((value) => Math.max(0, value - 1)); setFace("word"); }} onNext={() => { setCardIndex((value) => Math.min(deck.length - 1, value + 1)); setFace("word"); }} onKnow={() => card && mark(card.word, !known.includes(card.word))} />
      ) : (
        lesson && (
          <article className="min-w-0">
            <p className="text-xs font-semibold tracking-widest text-accent uppercase">
              {lang.name} · {lesson.level} · {index + 1} of {course.lessons.length}
              {shown && intoLang ? ` · ${intoLang.name}` : ""}
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl">{lesson.title}</h2>
            <p className="mt-4 text-lg leading-snug" dir={explainDir} style={explainFont}>
              {lead}
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {notes.map((note, noteIndex) => (
                <li key={`${lesson.id}-${noteIndex}`} className="rounded-2xl bg-card px-3 py-2" dir={explainDir} style={explainFont}>
                  {note}
                </li>
              ))}
            </ul>
            {lesson.table && heads && (
              <div className="mt-5 overflow-x-auto rounded-2xl border border-line">
                <table className="w-full min-w-[24rem] border-collapse text-left text-sm">
                  <caption className="border-b border-line px-3 py-2 text-left text-xs tracking-widest text-muted uppercase" dir={explainDir} style={explainFont}>
                    {caption}
                  </caption>
                  <thead>
                    <tr>
                      {heads.map((head, headIndex) => (
                        <th key={`${head}-${headIndex}`} className="px-3 py-2 font-semibold" dir={explainDir} style={explainFont}>
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {lesson.table.rows.map((row) => (
                      <tr key={row.join("|")} className="border-t border-line">
                        {row.map((cell, cellIndex) => (
                          <td key={`${cell}-${cellIndex}`} dir={cellIndex === 0 ? explainDir : lang.dir} className="px-3 py-2" style={cellIndex === 0 ? explainFont : lang.font ? { fontFamily: lang.font } : undefined}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <ul className="mt-5 flex flex-col gap-3">
              {lesson.examples.map((sample, sampleIndex) => (
                <li key={sample[0]} className="rounded-2xl border border-line bg-card px-4 py-3">
                  <p className="text-2xl leading-snug" dir={lang.dir} lang={lang.speech} style={lang.font ? { fontFamily: lang.font } : undefined}>
                    {sample[0]}
                  </p>
                  <p className="mt-1 text-sm text-muted" dir={explainDir} style={explainFont}>
                    {glosses ? glosses[sampleIndex] : sample[1]}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-2">
              <button type="button" disabled={index === 0} onClick={() => openLesson(index - 1)} className="min-h-11 rounded-full border border-line bg-card px-4 text-sm disabled:opacity-40">
                Previous
              </button>
              <button type="button" onClick={() => (index + 1 < course.lessons.length ? openLesson(index + 1) : openCards())} className="min-h-11 rounded-full bg-accent px-4 text-sm text-accent-ink">
                {index + 1 < course.lessons.length ? "Next lesson" : "Irregular cards"}
              </button>
            </div>
            {lang.id !== "en" && (
              <Remark
                key={`${lang.id}:${lesson.id}`}
                lang={lang.id}
                scopes={[{
                  kind: "section",
                  id: lesson.id,
                  label: lesson.title,
                  level: lesson.level,
                  bucket: "grammar",
                  name: "Lesson",
                }]}
              />
            )}
            <div className="mt-6 rounded-2xl border border-line bg-card p-3">
              <label className="block text-xs tracking-widest text-muted uppercase" htmlFor="grammar-into">
                Translate the lesson
              </label>
              <select id="grammar-into" value={into} onChange={(event) => { setInto(event.target.value); setTranslation(null); }} className="mt-2 min-h-11 w-full rounded-full border border-line bg-paper px-3 text-sm">
                <option value="">English</option>
                {ids.filter((id) => id !== "en").map((id) => {
                  const item = LANG_BY_ID.get(id);
                  if (!item) return null;
                  return (
                    <option key={id} value={id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              <button type="button" disabled={!into || into === "en" || busy} onClick={askTranslation} className="mt-2 min-h-11 w-full rounded-full bg-ink px-3 text-sm text-paper disabled:opacity-50">
                {busy ? "Translating…" : "Translate with Grok"}
              </button>
              {error && <p className="mt-2 text-sm text-muted">{error}</p>}
            </div>
          </article>
        )
      )}
    </div>
  );
}

function CardFace({
  lang,
  card,
  place,
  total,
  known,
  face,
  onFlip,
  onPrev,
  onNext,
  onKnow,
}: {
  lang: LangMeta;
  card: FormCard | undefined;
  place: number;
  total: number;
  known: string[];
  face: "word" | "forms";
  onFlip: () => void;
  onPrev: () => void;
  onNext: () => void;
  onKnow: () => void;
}) {
  if (!card) {
    return (
      <article className="rounded-3xl border border-line bg-card px-6 py-16 text-center">
        <h2 className="text-3xl">Nothing left in this pile</h2>
        <p className="mt-3 text-muted">Turn off “Still learning” to see the forms you already marked.</p>
      </article>
    );
  }
  const mine = known.includes(card.word);
  return (
    <article className="min-w-0">
      <p className="text-xs font-semibold tracking-widest text-accent uppercase">
        {lang.name} · {card.tag} · {place} of {total}
      </p>
      <button type="button" onClick={onFlip} aria-pressed={face === "forms"} className="mt-3 w-full rounded-3xl border border-line bg-card px-6 py-8 text-left">
        {face === "word" ? (
          <>
            <p className="text-xs tracking-widest text-muted uppercase">Word</p>
            <p className="mt-3 text-5xl leading-tight" dir={lang.dir} lang={lang.speech} style={lang.font ? { fontFamily: lang.font } : undefined}>
              {card.word}
            </p>
            <p className="mt-3 text-lg text-muted">{card.gloss}</p>
            <p className="mt-8 text-sm text-muted">Tap the card for the forms.</p>
          </>
        ) : (
          <>
            <p className="text-xs tracking-widest text-muted uppercase">Forms</p>
            <ul className="mt-2">
              {card.forms.map(([label, form]) => (
                <li key={label} className="flex items-baseline justify-between gap-4 border-t border-line py-3 first:border-t-0">
                  <span className="text-sm text-muted">{label}</span>
                  <span className="text-right text-2xl leading-tight" dir={lang.dir} lang={lang.speech} style={lang.font ? { fontFamily: lang.font } : undefined}>
                    {form}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </button>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={onPrev} disabled={place <= 1} className="min-h-11 rounded-full border border-line bg-card px-4 text-sm disabled:opacity-40">
          Previous
        </button>
        <button type="button" onClick={onKnow} className={`min-h-11 rounded-full px-4 text-sm ${mine ? "bg-moss text-moss-ink" : "bg-card"}`}>
          {mine ? "Known" : "I know this"}
        </button>
        <button type="button" onClick={onNext} disabled={place >= total} className="min-h-11 rounded-full bg-accent px-4 text-sm text-accent-ink disabled:opacity-40">
          Next card
        </button>
      </div>
      {lang.id !== "en" && (
        <Remark
          key={`${lang.id}:${card.word}`}
          lang={lang.id}
          scopes={[{
            kind: "card",
            id: `grammar:${card.word}`,
            label: `${card.word} · ${card.gloss}`,
            level: "",
            bucket: "grammar",
            name: "Card",
          }]}
        />
      )}
    </article>
  );
}

export type { GrammarLesson };
