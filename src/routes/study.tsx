import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Plus, Volume2 } from "lucide-react";
import { groupsFor, posLabel, useLevel, useOutline, type CourseItem, type CourseLevel } from "@/data/course";
import { getBaseEntry } from "@/data/lexicon";
import { usePack } from "@/data/packs";
import { FAMILIES, LANG_BY_ID, LANGUAGES } from "@/data/languages";
import { BATCHES } from "@/data/syllabus";
import { Plate } from "@/components/concord/plate";
import { StrokeOrder, mandarinChar } from "@/components/concord/strokes";
import { Flag } from "@/components/concord/flag";
import { Shell } from "@/components/concord/shell";
import { batchLabel, cardKey, genderLabel, useConcord, type Fix } from "@/lib/concord-store";
import { mergeEntry } from "@/lib/entry";
import { speak, stopSpeech, warmVoices } from "@/lib/speech";
import { noteReview } from "@/lib/league/client";
import type { Entry } from "@/data/types";

export const Route = createFileRoute("/study")({ component: StudyPage });

const LEVEL_CHIPS: { id: CourseLevel; label: string }[] = [
  { id: "A1", label: "A1" },
  { id: "A2", label: "A2" },
  { id: "B1", label: "B1" },
  { id: "B2", label: "B2" },
  { id: "P", label: "Phrases" },
];

function hasLine(item: CourseItem, lang: string, fixes: Record<string, Fix>): boolean {
  const entry = mergeEntry(getBaseEntry(lang, item.id, item.en), fixes[cardKey(lang, item.id)]);
  return Boolean(entry?.word && entry.sentence);
}

function StudyPage() {
  const targets = useConcord((s) => s.targets);
  const focus = useConcord((s) => s.focus);
  const level = useConcord((s) => s.level);
  const group = useConcord((s) => s.group);
  const conceptId = useConcord((s) => s.conceptId);
  const cards = useConcord((s) => s.cards);
  const fixes = useConcord((s) => s.fixes);
  const setFocus = useConcord((s) => s.setFocus);
  const setLevel = useConcord((s) => s.setLevel);
  const setGroup = useConcord((s) => s.setGroup);
  const setConceptId = useConcord((s) => s.setConceptId);
  const toggleTarget = useConcord((s) => s.toggleTarget);
  const grade = useConcord((s) => s.grade);
  const saveFix = useConcord((s) => s.saveFix);
  const clearFix = useConcord((s) => s.clearFix);
  const normalize = useConcord((s) => s.normalize);
  const courseLevel: CourseLevel = level === "A2" || level === "B1" || level === "B2" || level === "P" ? level : "A1";
  const { items, ready } = useLevel(courseLevel);
  const outline = useOutline();
  const [parallelOnly, setParallelOnly] = useState(true);
  const [later, setLater] = useState<string[]>([]);
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState("");
  const [query, setQuery] = useState("");
  const [picking, setPicking] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    normalize();
    warmVoices();
    return () => stopSpeech();
  }, [normalize]);

  const readyTargets = useMemo(
    () => targets.filter((id) => LANG_BY_ID.has(id) && id !== "en").slice(0, 12),
    [targets],
  );
  const activeFocus = readyTargets.includes(focus) ? focus : (readyTargets[0] ?? "");
  const packReady = usePack(activeFocus, courseLevel);
  const loadedGroups = useMemo(() => groupsFor(items, courseLevel), [items, courseLevel]);
  const outlineGroups = outline?.levels.find((row) => row.id === courseLevel)?.groups.map((row) => row.name) ?? [];
  const groups = useMemo(() => {
    const out = [...loadedGroups];
    for (const name of outlineGroups) if (!out.includes(name)) out.push(name);
    return out;
  }, [loadedGroups, outlineGroups]);
  const activeGroup = groups.includes(group) ? group : (groups[0] ?? "");

  useEffect(() => {
    if (activeGroup && activeGroup !== group) setGroup(activeGroup);
  }, [activeGroup, group, setGroup]);

  const deck = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (item.level !== courseLevel) return false;
      if (activeGroup && item.group !== activeGroup) return false;
      if (q && !`${item.en} ${item.sentence}`.toLowerCase().includes(q)) return false;
      if (parallelOnly && packReady && activeFocus && !hasLine(item, activeFocus, fixes)) return false;
      return true;
    });
  }, [items, courseLevel, activeGroup, query, parallelOnly, activeFocus, fixes, packReady]);

  const index = Math.max(0, deck.findIndex((item) => item.id === conceptId));
  const concept = deck[index] ?? deck[0];
  const revealed = Boolean(concept && openId === concept.id);

  useEffect(() => {
    if (!concept) return;
    if (concept.id !== conceptId) setConceptId(concept.id);
  }, [concept, conceptId, setConceptId]);

  function moveWord(step: number) {
    if (!deck.length) return;
    const i = Math.max(0, deck.findIndex((item) => item.id === (concept?.id ?? conceptId)));
    const next = deck[(i + step + deck.length) % deck.length];
    setConceptId(next.id);
    setEditing(false);
    setStatus("");
  }

  function moveLang(step: number) {
    if (!readyTargets.length || !activeFocus) return;
    const i = readyTargets.indexOf(activeFocus);
    const next = readyTargets[(i + step + readyTargets.length) % readyTargets.length];
    setFocus(next);
    setEditing(false);
    setStatus("");
  }

  function revealOrAdvance() {
    if (!concept) return;
    if (openId !== concept.id) {
      setOpenId(concept.id);
      return;
    }
    moveWord(1);
  }

  function mark(kind: "r" | "w") {
    if (!concept || !activeFocus) return;
    grade(activeFocus, concept.id, kind);
    noteReview(activeFocus, concept.id, kind);
    const stage = useConcord.getState().cards[cardKey(activeFocus, concept.id)]?.stage;
    setStatus(kind === "r" ? `Remembered · ${batchLabel(stage)}` : "Again · back in the 3-day batch");
    if (kind === "w") setLater((list) => (list.includes(concept.id) ? list : [...list, concept.id]));
    if (deck.length > 1) {
      const i = deck.findIndex((item) => item.id === concept.id);
      const following = deck[(i + 1) % deck.length];
      if (i === deck.length - 1 && later.length) {
        setConceptId(later[0]);
        setLater((list) => list.slice(1));
      } else {
        setConceptId(following.id);
      }
    }
  }

  const actions = useRef({ moveWord, moveLang, mark, revealOrAdvance, concept, activeFocus, fixes });
  actions.current = { moveWord, moveLang, mark, revealOrAdvance, concept, activeFocus, fixes };

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || tag === "BUTTON") return;
      if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
      const key = event.key;
      const now = actions.current;
      if (key === "ArrowDown") {
        event.preventDefault();
        now.moveWord(1);
      } else if (key === "ArrowUp") {
        event.preventDefault();
        now.moveWord(-1);
      } else if (key === "ArrowRight") {
        event.preventDefault();
        now.moveLang(1);
      } else if (key === "ArrowLeft") {
        event.preventDefault();
        now.moveLang(-1);
      } else if (key === "r" || key === "R") {
        event.preventDefault();
        now.mark("r");
      } else if (key === "w" || key === "W") {
        event.preventDefault();
        now.mark("w");
      } else if (key === " ") {
        event.preventDefault();
        now.revealOrAdvance();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const focusLang = LANG_BY_ID.get(activeFocus);
  const entry = concept && activeFocus ? mergeEntry(getBaseEntry(activeFocus, concept.id, concept.en), fixes[cardKey(activeFocus, concept.id)]) : undefined;
  const english = concept ? mergeEntry(getBaseEntry("en", concept.id, concept.en), fixes[cardKey("en", concept.id)]) : undefined;
  const enWord = english?.word || concept?.en || "";
  const enSentence = english?.sentence || concept?.sentence || "";
  const markState = concept && activeFocus ? cards[cardKey(activeFocus, concept.id)] : undefined;
  const fresh = items.filter((item) => !cards[cardKey(activeFocus, item.id)]).length;
  const railStart = Math.max(0, index - 18);
  const rail = deck.slice(railStart, railStart + 42);
  const chosen = readyTargets.length;

  return (
    <Shell scroll={false}>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0 border-b border-line">
          <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2 md:px-6">
            {LEVEL_CHIPS.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => {
                  setLevel(chip.id);
                  setQuery("");
                  setEditing(false);
                }}
                className={`min-h-11 shrink-0 rounded-full px-3 ${level === chip.id ? "bg-ink text-paper" : "bg-chip"}`}
              >
                {chip.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setParallelOnly((value) => !value)}
              className={`min-h-11 shrink-0 rounded-full px-3 ${parallelOnly ? "bg-moss text-moss-ink" : "bg-chip"}`}
            >
              {parallelOnly ? "Translated" : "All words"}
            </button>
          </div>
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 pb-2 md:px-6">
            <label className="sr-only" htmlFor="group">
              Group
            </label>
            <select
              id="group"
              value={activeGroup}
              onChange={(event) => setGroup(event.target.value)}
              className="min-h-11 min-w-0 flex-1 rounded-full border border-line bg-card px-3"
            >
              {groups.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="shrink-0 border-b border-line">
          <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-2 md:px-6">
            {readyTargets.map((id) => {
              const lang = LANG_BY_ID.get(id);
              if (!lang) return null;
              const on = id === activeFocus;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setFocus(id)}
                  className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-3 ${on ? "border-ink bg-ink text-paper" : "border-line bg-card"}`}
                >
                  <Flag id={id} />
                  <span>{lang.name}</span>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setPicking((value) => !value)}
              className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-line bg-card px-3"
            >
              <Plus className="h-4 w-4" />
              {picking ? "Close" : `Languages ${chosen}/12`}
            </button>
          </div>
          {picking && (
            <div className="max-h-[38dvh] overflow-y-auto border-t border-line px-4 py-3 md:px-6">
              <p className="mb-3 text-sm text-muted">Choose up to twelve. They stay as tabs on this card. English stays on the left.</p>
              <div className="mx-auto flex max-w-6xl flex-col gap-3">
                {FAMILIES.map((family) => {
                  const langs = LANGUAGES.filter((lang) => lang.family === family && lang.id !== "en");
                  if (!langs.length) return null;
                  return (
                    <div key={family}>
                      <p className="mb-1 text-xs tracking-widest text-muted uppercase">{family}</p>
                      <div className="flex flex-wrap gap-2">
                        {langs.map((lang) => {
                          const on = targets.includes(lang.id);
                          const blocked = !on && chosen >= 12;
                          return (
                            <button
                              key={lang.id}
                              type="button"
                              disabled={blocked}
                              onClick={() => toggleTarget(lang.id)}
                              className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-3 ${on ? "border-moss bg-moss text-moss-ink" : "border-line bg-card"} disabled:opacity-40`}
                            >
                              <Flag id={lang.id} />
                              {lang.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {!activeFocus ? (
          <div className="grid flex-1 place-items-center px-6 text-center">
            <div>
              <h1 className="text-4xl">Choose a language</h1>
              <p className="mt-3 text-muted">Open Languages and turn on up to twelve. Each one becomes a tab on this card.</p>
            </div>
          </div>
        ) : (
          <div className="grid min-h-0 flex-1 md:grid-cols-[11rem_minmax(0,1fr)]">
            <aside className="hidden min-h-0 border-r border-line md:flex md:flex-col">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Find a word"
                className="m-2 min-h-11 rounded-xl border border-line bg-card px-3"
              />
              <ol className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain px-2 pb-2">
                {rail.map((item, offset) => {
                  const n = railStart + offset;
                  const on = item.id === concept?.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setConceptId(item.id);
                          setEditing(false);
                        }}
                        className={`flex min-h-11 w-full items-baseline justify-between gap-2 rounded-xl px-3 text-left ${on ? "bg-ink text-paper" : "hover:bg-chip"}`}
                      >
                        <span className="truncate">{item.en}</span>
                        <span className={`text-xs tabular-nums ${on ? "text-paper" : "text-muted"}`}>{n + 1}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </aside>

            {!concept ? (
              <div className="grid place-items-center px-6 text-center">
                <div>
                  <h1 className="text-3xl">{ready ? "Nothing in this group" : "Opening this group"}</h1>
                  <p className="mt-3 text-muted">
                    {parallelOnly ? "Turn on All words, or pick another group. Translated cards are the ones with a line in this language." : "Pick another group."}
                  </p>
                </div>
              </div>
            ) : (
              <article className="grid min-h-0 grid-cols-2">
                <EnglishSide
                  item={concept}
                  word={enWord}
                  sentence={enSentence}
                  plural={english?.plural || concept.plural}
                  index={index}
                  total={deck.length}
                  stage={batchLabel(markState?.stage)}
                  revealed={revealed}
                />
                <div className="flex min-h-0 flex-col overflow-y-auto overscroll-contain p-3 md:p-5" dir={focusLang?.dir} lang={focusLang?.speech}>
                  {revealed ? (
                    activeFocus === "isv" ? (
                      <InterslavicPanels conceptId={concept.id} en={concept.en} fixes={fixes} />
                    ) : activeFocus === "ar" ? (
                      <ArabicPanels conceptId={concept.id} en={concept.en} fixes={fixes} />
                    ) : entry?.word ? (
                      <Translation entry={entry} speech={focusLang?.speech ?? "en-US"} font={focusLang?.font} />
                    ) : (
                      <p className="text-base text-muted md:text-lg">
                        {focusLang?.name} does not have this word yet. The picture and the English sentence are the meaning. Fix stores a correction on this device.
                      </p>
                    )
                  ) : (
                    <div className="grid flex-1 place-items-center text-center">
                      <div>
                        <p className="text-xs tracking-widest text-muted uppercase">{focusLang?.name}</p>
                        <p className="mt-2 font-display text-3xl md:text-4xl">Space</p>
                        <p className="mt-2 text-sm text-muted">Reveals this word. The next space opens the next one.</p>
                      </div>
                    </div>
                  )}
                  {revealed && focusLang?.voiceApprox && activeFocus !== "isv" && <p className="mt-2 text-sm text-muted">Speech uses the closest voice on this device.</p>}
                  {revealed && (
                    <div className="mt-auto flex flex-wrap gap-2 pt-3">
                      <button type="button" className="min-h-11 rounded-full px-4 text-muted" onClick={() => setEditing((value) => !value)}>
                        {editing ? "Close fix" : "Fix this card"}
                      </button>
                    </div>
                  )}
                  {status && <p className="text-sm text-moss">{status}</p>}
                  {revealed && editing && (
                    <FixForm
                      lang={activeFocus}
                      conceptId={concept.id}
                      entry={entry ?? { word: "", sentence: "" }}
                      onSave={saveFix}
                      onClear={clearFix}
                    />
                  )}
                </div>
              </article>
            )}
          </div>
        )}

        <div className="shrink-0 border-t border-line bg-paper">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-2 md:px-6">
            <div className="hidden gap-2 text-xs text-muted md:flex">
              <span className="rounded-full bg-chip px-2 py-1 tabular-nums">New {fresh}</span>
              {BATCHES.map((batch, stage) => (
                <span key={batch.id} className="rounded-full bg-chip px-2 py-1 tabular-nums">
                  {batch.label} {items.filter((item) => cards[cardKey(activeFocus, item.id)]?.stage === stage).length}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => moveLang(-1)} aria-label="Previous language" className="grid min-h-12 min-w-12 place-items-center rounded-full border border-line bg-card">
                <ChevronLeft />
              </button>
              <button type="button" onClick={() => moveWord(-1)} aria-label="Previous word" className="grid min-h-12 min-w-12 place-items-center rounded-full border border-line bg-card md:hidden">
                <ChevronUp />
              </button>
              <button type="button" onClick={() => mark("w")} className="min-h-12 flex-1 rounded-full border border-line bg-card text-base">
                Again <span className="text-muted">W</span>
              </button>
              <button type="button" onClick={() => revealOrAdvance()} className="min-h-12 flex-1 rounded-full bg-accent text-base text-accent-ink">
                {revealed ? "Next" : "Reveal"} <span className="opacity-80">Space</span>
              </button>
              <button type="button" onClick={() => mark("r")} className="min-h-12 flex-1 rounded-full bg-moss text-base text-moss-ink">
                Remembered <span className="opacity-80">R</span>
              </button>
              <button type="button" onClick={() => moveWord(1)} aria-label="Next word" className="grid min-h-12 min-w-12 place-items-center rounded-full border border-line bg-card md:hidden">
                <ChevronDown />
              </button>
              <button type="button" onClick={() => moveLang(1)} aria-label="Next language" className="grid min-h-12 min-w-12 place-items-center rounded-full border border-line bg-card">
                <ChevronRight />
              </button>
            </div>
            <p className="hidden text-center text-xs text-muted md:block">Space reveals this word, then the next. ← → change language and keep it open. ↑ ↓ move without revealing.</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function EnglishSide({
  item,
  word,
  sentence,
  plural,
  index,
  total,
  stage,
  revealed,
}: {
  item: CourseItem;
  word: string;
  sentence: string;
  plural?: string;
  index: number;
  total: number;
  stage: string;
  revealed: boolean;
}) {
  return (
    <div className="flex min-h-0 flex-col gap-2 border-r border-line p-3 md:gap-3 md:p-5">
      <div className="flex items-center gap-2 text-xs tracking-widest text-muted uppercase">
        <Flag id="en" />
        <span>English</span>
        <span className="ml-auto font-sans tracking-normal normal-case tabular-nums">
          {index + 1}/{total}
        </span>
      </div>
      {revealed ? (
        <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl leading-none md:text-5xl">{word}</h1>
              <Speak text={word} lang="en-US" label="Hear the English word" />
            </div>
            <p className="mt-1 truncate text-sm text-muted">
              {posLabel(item.pos)}
              {plural ? ` · ${plural}` : ""} · {stage}
            </p>
          </div>
      ) : (
        <div>
          <h1 className="text-3xl leading-none text-muted md:text-5xl">····</h1>
          <p className="mt-1 text-sm text-muted">Space reveals the word</p>
        </div>
      )}
      <div className="min-h-0 flex-1 overflow-hidden rounded-2xl bg-chip">
        <Plate src={item.image} alt={revealed ? word : "Picture"} />
      </div>
      {revealed && (
        <div className="flex items-start gap-2">
          <p className="line-clamp-3 text-sm leading-snug md:text-base">{sentence}</p>
          <Speak text={sentence} lang="en-US" label="Hear the English sentence" />
        </div>
      )}
    </div>
  );
}

function Translation({ entry, speech, font }: { entry: Entry; speech: string; font?: string }) {
  const script = font ? { fontFamily: font } : undefined;
  const character = mandarinChar(entry.word, speech);
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-3xl leading-none md:text-5xl" style={script}>{entry.word}</h2>
        <Speak text={entry.word} lang={speech} label="Hear the word" />
      </div>
      {entry.reading && <p className="mt-1 text-base text-muted italic">{entry.reading}</p>}
      {character && <StrokeOrder char={character} font={font} />}
      <div className="mt-2 flex flex-wrap gap-2 text-sm">
        {entry.article && <Chip>{entry.article}</Chip>}
        {genderLabel(entry.gender) && <Chip>{genderLabel(entry.gender)}</Chip>}
        {entry.plural && <Chip>plural {entry.plural}</Chip>}
        {entry.feminine && <Chip>feminine {entry.feminine}</Chip>}
        {entry.masculine && entry.masculine !== entry.word && <Chip>masculine {entry.masculine}</Chip>}
        {entry.neuter && <Chip>neuter {entry.neuter}</Chip>}
      </div>
      <div className="mt-3 flex items-start gap-2">
        <p className="text-base leading-snug md:text-lg" style={script}>{entry.sentence}</p>
        <Speak text={entry.sentence} lang={speech} label="Hear the sentence" />
      </div>
      {entry.note && <p className="mt-2 text-sm text-muted">{entry.note}</p>}
    </div>
  );
}

function InterslavicPanels({ conceptId, en, fixes }: { conceptId: string; en: string; fixes: Record<string, Fix> }) {
  const latin = mergeEntry(getBaseEntry("isv", conceptId, en), fixes[cardKey("isv", conceptId)]);
  const cyr = getBaseEntry("isv-Cyrl", conceptId, en);
  const glag = getBaseEntry("isv-Glag", conceptId, en);
  const blocks = [
    { title: "Latin", word: latin?.word, sentence: latin?.sentence, speech: "hr-HR" },
    { title: "Cyrillic", word: cyr?.word, sentence: cyr?.sentence, speech: "sr-RS" },
    { title: "Glagolitic", word: glag?.word, sentence: glag?.sentence, speech: "hr-HR", font: LANGUAGES.find((lang) => lang.id === "isv")?.font },
  ];
  if (!latin?.word) {
    return <p className="text-base text-muted">Interslavic does not have this word yet. Fix stores a Latin line on this device.</p>;
  }
  return (
    <div className="space-y-2">
      {blocks.map((block) => (
        <div key={block.title} className="rounded-2xl border border-line bg-paper p-3" style={{ fontFamily: block.font }}>
          <p className="text-xs tracking-widest text-muted uppercase">{block.title}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <h2 className="text-2xl leading-none">{block.word}</h2>
            {block.word && <Speak text={block.word} lang={block.speech} label={`Hear the ${block.title} word`} />}
          </div>
          <div className="mt-1 flex items-start gap-2">
            <p className="text-sm leading-snug">{block.sentence}</p>
            {block.sentence && <Speak text={block.sentence} lang={block.speech} label={`Hear the ${block.title} sentence`} />}
          </div>
        </div>
      ))}
    </div>
  );
}

function ArabicPanels({ conceptId, en, fixes }: { conceptId: string; en: string; fixes: Record<string, Fix> }) {
  const blocks = [
    { title: "Standard", entry: mergeEntry(getBaseEntry("ar", conceptId, en), fixes[cardKey("ar", conceptId)]), speech: "ar" },
    { title: "Egyptian", entry: getBaseEntry("ar-eg", conceptId, en), speech: "ar-EG" },
    { title: "Saudi", entry: getBaseEntry("ar-sa", conceptId, en), speech: "ar-SA" },
  ];
  if (!blocks.some((block) => block.entry?.word)) {
    return <p className="text-base text-muted">Arabic does not have this word yet. Fix stores a Standard line on this device.</p>;
  }
  return (
    <div className="space-y-2">
      {blocks.map((block) => {
        const entry = block.entry;
        const extra = [entry?.feminine && `feminine ${entry.feminine}`, entry?.plural && `plural ${entry.plural}`, entry?.note].filter(Boolean).join(" · ");
        return (
          <div key={block.title} className="rounded-2xl border border-line bg-paper p-3">
            <p className="text-xs tracking-widest text-muted uppercase" dir="ltr">{block.title}</p>
            {entry?.word ? (
              <>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <div className="min-w-0">
                    <h2 className="text-2xl leading-none">{entry.word}</h2>
                    {entry.reading && <p className="mt-1 text-sm text-muted italic" dir="ltr">{entry.reading}</p>}
                  </div>
                  <Speak text={entry.word} lang={block.speech} label={`Hear the ${block.title} word`} />
                </div>
                {extra && <p className="mt-1 text-xs text-muted" dir="ltr">{extra}</p>}
                <div className="mt-1 flex items-start gap-2">
                  <p className="text-sm leading-snug">{entry.sentence}</p>
                  <Speak text={entry.sentence} lang={block.speech} label={`Hear the ${block.title} sentence`} />
                </div>
              </>
            ) : (
              <p className="mt-1 text-sm text-muted">Not in this variety yet.</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Speak({ text, lang, label }: { text: string; lang: string; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => speak(text, lang)}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-card"
    >
      <Volume2 className="h-5 w-5" />
    </button>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return <span className="rounded-full bg-chip px-3 py-1">{children}</span>;
}

function FixForm({
  lang,
  conceptId,
  entry,
  onSave,
  onClear,
}: {
  lang: string;
  conceptId: string;
  entry: { word: string; sentence: string; article?: string; plural?: string; reading?: string };
  onSave: (lang: string, concept: string, fix: Fix) => void;
  onClear: (lang: string, concept: string) => void;
}) {
  const [word, setWord] = useState(entry.word);
  const [sentence, setSentence] = useState(entry.sentence);
  const [article, setArticle] = useState(entry.article ?? "");
  const [plural, setPlural] = useState(entry.plural ?? "");
  const [reading, setReading] = useState(entry.reading ?? "");
  return (
    <form
      className="grid gap-2 border-t border-line pt-3"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(lang, conceptId, {
          word,
          sentence,
          article: article || undefined,
          plural: plural || undefined,
          reading: reading || undefined,
        });
      }}
    >
      <label className="text-sm">
        Word
        <input value={word} onChange={(event) => setWord(event.target.value)} className="mt-1 min-h-11 w-full rounded-xl border border-line bg-paper px-3" />
      </label>
      <label className="text-sm">
        Sentence
        <input value={sentence} onChange={(event) => setSentence(event.target.value)} className="mt-1 min-h-11 w-full rounded-xl border border-line bg-paper px-3" />
      </label>
      <div className="grid grid-cols-3 gap-2">
        <input value={article} onChange={(event) => setArticle(event.target.value)} placeholder="Article" className="min-h-11 rounded-xl border border-line bg-paper px-3" />
        <input value={plural} onChange={(event) => setPlural(event.target.value)} placeholder="Plural" className="min-h-11 rounded-xl border border-line bg-paper px-3" />
        <input value={reading} onChange={(event) => setReading(event.target.value)} placeholder="Transliteration" className="min-h-11 rounded-xl border border-line bg-paper px-3" />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="min-h-11 rounded-full bg-ink px-4 text-paper">
          Save on this device
        </button>
        <button type="button" className="min-h-11 px-3 text-muted" onClick={() => onClear(lang, conceptId)}>
          Reset
        </button>
      </div>
    </form>
  );
}
