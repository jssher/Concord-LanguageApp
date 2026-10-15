import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  BookOpen,
  Box,
  Brain,
  Briefcase,
  Building2,
  Bus,
  Calendar,
  Check,
  Clock,
  CloudSun,
  Coins,
  Dumbbell,
  Eye,
  FlaskConical,
  Footprints,
  GraduationCap,
  Hammer,
  Hand,
  HeartPulse,
  Home,
  Landmark,
  Languages,
  Leaf,
  Lightbulb,
  type LucideIcon,
  MapPin,
  MessageCircle,
  Mountain,
  Music,
  PawPrint,
  Scale,
  Shirt,
  Smile,
  Sparkles,
  Utensils,
  Users,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Plus,
  Volume2,
} from "lucide-react";
import { groupsFor, posLabel, useLevel, useOutline, type CourseItem, type CourseLevel } from "@/data/course";
import { getBaseEntry, useLexicons } from "@/data/lexicon";
import { usePack } from "@/data/packs";
import { FAMILIES, LANG_BY_ID, LANGUAGES, byNearness } from "@/data/languages";
import { BATCHES } from "@/data/syllabus";
import { Plate } from "@/components/concord/plate";
import { StrokeOrder, hanChars } from "@/components/concord/strokes";
import { Flag } from "@/components/concord/flag";
import { Shell } from "@/components/concord/shell";
import { batchLabel, cardKey, genderLabel, useConcord, type Fix } from "@/lib/concord-store";
import { mergeEntry } from "@/lib/entry";
import { speak, stopSpeech } from "@/lib/speech";
import { askCard, type CardCheck } from "@/lib/ask-card";
import { noteReview } from "@/lib/league/client";
import { useWait } from "@/wait/flag";
import type { Entry } from "@/data/types";

export const Route = createFileRoute("/study")({ component: StudyPage });

const LEVEL_CHIPS: { id: CourseLevel; label: string }[] = [
  { id: "A1", label: "A1" },
  { id: "A2", label: "A2" },
  { id: "B1", label: "B1" },
  { id: "B2", label: "B2" },
  { id: "P", label: "Phrases" },
];

const GROUP_ICONS: [RegExp, LucideIcon][] = [
  [/home|room|kitchen|house/, Home],
  [/thing|object/, Box],
  [/food|drink|meal|cook|market|café|cafe/, Utensils],
  [/animal|bird/, PawPrint],
  [/plant|garden|nature|environment/, Leaf],
  [/weather|sky/, CloudSun],
  [/landscape|earth|land|stone/, Mountain],
  [/cloth|fashion|look/, Shirt],
  [/body|health|care/, HeartPulse],
  [/feel|emotion/, Smile],
  [/people|family|person|relationship/, Users],
  [/little word|greeting|polite/, Hand],
  [/time|number|when/, Clock],
  [/town|city|place|civic|building|direction/, Building2],
  [/travel|transport|bus|road|station/, Bus],
  [/shop|money|econom|bank/, Coins],
  [/work|job|business|profession/, Briefcase],
  [/school|study|class|education|classroom/, GraduationCap],
  [/language|grammar|alphabet|word about/, Languages],
  [/sport|hobby|play/, Dumbbell],
  [/music|art|culture|picture|gallery/, Music],
  [/speak|opinion|argument|nuance|conversation|phrase|social|talk/, MessageCircle],
  [/think|idea|mind/, Brain],
  [/scien|lab|technolog/, FlaskConical],
  [/mov|action|verb/, Footprints],
  [/mak|craft|workshop/, Hammer],
  [/event|plan|news|media/, Calendar],
  [/qualit|kind|describ|trait|having|happen|degree|manner|how it|way/, Sparkles],
  [/society|law|rule|institution|public/, Landmark],
  [/help/, Hand],
  [/world/, MapPin],
  [/eye|look/, Eye],
  [/scale|agree/, Scale],
  [/light/, Lightbulb],
];

function groupLabel(name: string): string {
  return name.replace(/^\d+\s/, "");
}

function groupNum(name: string, index: number): string {
  const match = /^(\d+)\b/.exec(name);
  return match ? String(Number(match[1])) : String(index + 1);
}

function GroupGlyph({ name }: { name: string }) {
  const label = groupLabel(name).toLowerCase();
  const Icon = GROUP_ICONS.find(([pattern]) => pattern.test(label))?.[1] ?? BookOpen;
  return <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />;
}

function hasLine(item: CourseItem, lang: string, fixes: Record<string, Fix>): boolean {
  const entry = mergeEntry(getBaseEntry(lang, item.id, item.en, item.sentence), fixes[cardKey(lang, item.id)]);
  return Boolean(entry?.word);
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
  const [status, setStatus] = useState("");
  const [query, setQuery] = useState("");
  const [picking, setPicking] = useState(false);
  const [pickingGroup, setPickingGroup] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    normalize();
    return () => stopSpeech();
  }, [normalize]);

  const readyTargets = useMemo(
    () => byNearness(targets.filter((id) => LANG_BY_ID.has(id) && id !== "en")).slice(0, 12),
    [targets],
  );
  const lexReady = useLexicons(readyTargets);
  const activeFocus = readyTargets.includes(focus) ? focus : (readyTargets[0] ?? "");
  const packReady = usePack(activeFocus, courseLevel);
  useWait(!ready || !lexReady || !packReady);
  const loadedGroups = useMemo(() => groupsFor(items, courseLevel), [items, courseLevel]);
  const outlineGroups = outline?.levels.find((row) => row.id === courseLevel)?.groups.map((row) => row.name) ?? [];
  const groups = useMemo(() => {
    const out = [...loadedGroups];
    for (const name of outlineGroups) if (!out.includes(name)) out.push(name);
    return out;
  }, [loadedGroups, outlineGroups]);
  const activeGroup = groups.includes(group) ? group : (groups[0] ?? "");
  const pickedGroup = useRef<string | null>(null);

  const progress = useMemo(() => {
    const map = new Map<string, { done: number; total: number }>();
    for (const item of items) {
      if (item.level !== courseLevel) continue;
      if (parallelOnly && packReady && activeFocus && !hasLine(item, activeFocus, fixes)) continue;
      const row = map.get(item.group) ?? { done: 0, total: 0 };
      row.total += 1;
      const mark = activeFocus ? cards[cardKey(activeFocus, item.id)] : undefined;
      if (mark && mark.stage >= 1) row.done += 1;
      map.set(item.group, row);
    }
    return map;
  }, [items, courseLevel, parallelOnly, packReady, activeFocus, fixes, cards]);

  function groupLearned(name: string): boolean {
    const row = progress.get(name);
    return Boolean(row && row.total > 0 && row.done >= row.total);
  }

  function nextUnlearned(after: string): string {
    if (!groups.length) return "";
    const start = Math.max(0, groups.indexOf(after));
    for (let step = 1; step <= groups.length; step += 1) {
      const name = groups[(start + step) % groups.length];
      const row = progress.get(name);
      if (row && row.total > 0 && row.done < row.total) return name;
    }
    return "";
  }

  const groupPane = useRef<HTMLDivElement>(null);
  useEffect(() => {
    pickedGroup.current = null;
  }, [courseLevel]);
  useEffect(() => {
    if (!pickingGroup) return;
    const tile = groupPane.current?.querySelector<HTMLButtonElement>("[aria-current='true']");
    tile?.scrollIntoView({ block: "nearest" });
  }, [activeGroup, courseLevel, pickingGroup]);

  useEffect(() => {
    if (!ready || !groups.length) return;
    if (pickedGroup.current && pickedGroup.current === group) return;
    const known = groups.includes(group);
    const learned = known && groupLearned(group);
    if (known && !learned) return;
    const nxt = known
      ? nextUnlearned(group)
      : (groups.find((name) => {
          const row = progress.get(name);
          return row && row.total > 0 && row.done < row.total;
        }) ?? groups[0] ?? "");
    if (nxt && nxt !== group) setGroup(nxt);
  }, [ready, groups, group, progress, setGroup]);

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
    setStatus("");
  }

  function moveLang(step: number) {
    if (!readyTargets.length || !activeFocus) return;
    const i = readyTargets.indexOf(activeFocus);
    const next = readyTargets[(i + step + readyTargets.length) % readyTargets.length];
    setFocus(next);
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
    if (kind === "r") {
      const state = useConcord.getState().cards;
      const pending = items.some((item) => {
        if (item.group !== activeGroup || item.level !== courseLevel || item.id === concept.id) return false;
        if (parallelOnly && packReady && activeFocus && !hasLine(item, activeFocus, fixes)) return false;
        return (state[cardKey(activeFocus, item.id)]?.stage ?? 0) < 1;
      });
      if (!pending) {
        const nxt = nextUnlearned(activeGroup);
        if (nxt) {
          pickedGroup.current = null;
          setGroup(nxt);
          setQuery("");
          setStatus("Learned. The next group is open.");
          return;
        }
        setStatus("Every group in this level is learned.");
        return;
      }
    }
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

  const tabRow = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const row = tabRow.current;
    const tab = row?.querySelector<HTMLButtonElement>(`[data-lang="${activeFocus}"]`);
    if (!row || !tab) return;
    const left = tab.offsetLeft;
    const right = left + tab.offsetWidth;
    if (left < row.scrollLeft + 8) row.scrollLeft = Math.max(0, left - 8);
    else if (right > row.scrollLeft + row.clientWidth - 8) row.scrollLeft = right - row.clientWidth + 8;
  }, [activeFocus, readyTargets]);
  const focusLang = LANG_BY_ID.get(activeFocus);
  const entry = concept && activeFocus ? mergeEntry(getBaseEntry(activeFocus, concept.id, concept.en, concept.sentence), fixes[cardKey(activeFocus, concept.id)]) : undefined;
  const english = concept ? mergeEntry(getBaseEntry("en", concept.id, concept.en), fixes[cardKey("en", concept.id)]) : undefined;
  const enWord = english?.word || concept?.en || "";
  const enSentence = english?.sentence || concept?.sentence || "";
  const markState = concept && activeFocus ? cards[cardKey(activeFocus, concept.id)] : undefined;
  const fresh = items.filter((item) => !cards[cardKey(activeFocus, item.id)]).length;
  const railStart = Math.max(0, index - 18);
  const rail = deck.slice(railStart, railStart + 42);
  const chosen = readyTargets.length;
  const activeIndex = groups.indexOf(activeGroup);
  const activeRow = progress.get(activeGroup);
  const activeLearned = activeGroup ? groupLearned(activeGroup) : false;
  const activeCount = !activeGroup ? "" : activeLearned ? "Learned" : activeRow && activeRow.total > 0 ? `${activeRow.done}/${activeRow.total}` : "—";

  return (
    <Shell scroll={false}>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0 border-b border-line">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-2 md:px-6">
            {LEVEL_CHIPS.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => {
                  setLevel(chip.id);
                  setQuery("");
                  setPickingGroup(false);
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
            <button
              type="button"
              aria-expanded={pickingGroup}
              aria-controls="category-list"
              onClick={() => {
                setPickingGroup((value) => !value);
                setPicking(false);
              }}
              className={`inline-flex min-h-11 min-w-0 flex-1 basis-56 items-center gap-2 rounded-full border px-3 text-left ${
                pickingGroup ? "border-accent bg-accent text-accent-ink" : "border-line bg-card"
              }`}
            >
              <span className="w-7 shrink-0 text-sm tabular-nums">{activeGroup ? groupNum(activeGroup, activeIndex) : ""}</span>
              {activeGroup ? <GroupGlyph name={activeGroup} /> : null}
              <span className="min-w-0 flex-1 truncate">{activeGroup ? groupLabel(activeGroup) : "Categories"}</span>
              <span className={`shrink-0 text-xs tabular-nums ${pickingGroup ? "opacity-80" : "text-muted"}`}>{activeCount}</span>
              <ChevronDown className={`h-4 w-4 shrink-0 ${pickingGroup ? "rotate-180" : ""}`} aria-hidden />
            </button>
          </div>
          {pickingGroup && (
            <div id="category-list" ref={groupPane} className="max-h-[38dvh] overflow-y-auto border-t border-line px-4 py-3 md:px-6" role="listbox" aria-label="Categories">
              <p className="mb-3 text-sm text-muted">Choose a category. This list closes when you pick one, so the card keeps the space.</p>
              <div className="mx-auto flex max-w-6xl flex-col gap-1">
                {groups.map((name, index) => {
                  const row = progress.get(name);
                  const learned = groupLearned(name);
                  const on = name === activeGroup;
                  const label = groupLabel(name);
                  const num = groupNum(name, index);
                  return (
                    <button
                      key={name}
                      type="button"
                      role="option"
                      aria-selected={on}
                      aria-current={on ? "true" : undefined}
                      aria-label={learned ? `${num} ${label}, learned` : `${num} ${label}`}
                      onClick={() => {
                        pickedGroup.current = name;
                        setGroup(name);
                        setQuery("");
                        setPickingGroup(false);
                      }}
                      className={`flex min-h-11 items-center gap-2 rounded-xl px-3 text-left ${
                        on ? "bg-ink text-paper" : learned ? "bg-chip text-muted" : "border border-line bg-card"
                      }`}
                    >
                      <span className={`w-7 shrink-0 text-sm tabular-nums ${on ? "" : "text-muted"}`}>{num}</span>
                      <GroupGlyph name={name} />
                      <span className="min-w-0 flex-1 truncate">{label}</span>
                      {learned && !on ? <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} aria-hidden /> : null}
                      <span className={`shrink-0 text-xs tabular-nums ${on ? "text-paper/80" : "text-muted"}`}>
                        {learned ? "Learned" : row && row.total > 0 ? `${row.done}/${row.total}` : "—"}
                      </span>
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => setPickingGroup(false)}
                className="mx-auto mt-4 flex min-h-12 w-full max-w-6xl items-center justify-center rounded-full bg-accent px-4 text-accent-ink"
              >
                Done — close this list
              </button>
            </div>
          )}
        </div>

        <div className="shrink-0 border-b border-line">
          <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-2 md:px-6">
            <button
              type="button"
              onClick={() => {
                setPicking((value) => !value);
                setPickingGroup(false);
              }}
              className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-3 ${picking ? "bg-accent text-accent-ink" : "border border-ink bg-card"}`}
            >
              <Plus className="h-4 w-4" />
              {picking ? "Done — close this list" : `Languages ${chosen}/12`}
            </button>
            <div ref={tabRow} className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto">
            {readyTargets.map((id) => {
              const lang = LANG_BY_ID.get(id);
              if (!lang) return null;
              const on = id === activeFocus;
              return (
                <button
                  key={id}
                  type="button"
                  data-lang={id}
                  onClick={() => setFocus(id)}
                  className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-3 ${on ? "border-ink bg-ink text-paper" : "border-line bg-card"}`}
                >
                  <Flag id={id} />
                  <span>{lang.name}</span>
                </button>
              );
            })}
            </div>
          </div>
          {picking && (
            <div className="max-h-[38dvh] overflow-y-auto border-t border-line px-4 py-3 md:px-6">
              <p className="mb-3 text-sm text-muted">Choose up to twelve. Close this list when you are finished. English stays on the left.</p>
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
              <button
                type="button"
                onClick={() => setPicking(false)}
                className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent px-4 text-accent-ink"
              >
                Done — close this list
              </button>
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
                  lang={activeFocus}
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
                        {lexReady
                          ? `${focusLang?.name} does not have this word yet. The picture and the English sentence are the meaning. Ask Grok whether a line should be added.`
                          : `Opening ${focusLang?.name}…`}
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
                  {status && <p className="mt-2 text-sm text-moss">{status}</p>}
                  {revealed && (
                    <AskGrok
                      key={`${activeFocus}:${concept.id}`}
                      lang={activeFocus}
                      languageName={focusLang?.name ?? activeFocus}
                      tip={focusLang?.tip ?? ""}
                      conceptId={concept.id}
                      english={enWord}
                      englishSentence={enSentence}
                      entry={entry}
                      saved={Boolean(fixes[cardKey(activeFocus, concept.id)])}
                      onApply={saveFix}
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
  lang,
}: {
  item: CourseItem;
  word: string;
  sentence: string;
  plural?: string;
  index: number;
  total: number;
  stage: string;
  lang?: string;
}) {
  return (
    <div className="flex min-h-0 flex-col gap-2 overflow-hidden border-r border-line p-3 md:p-4">
      <div className="flex shrink-0 items-center gap-2 text-xs tracking-widest text-muted uppercase">
        <Flag id="en" />
        <span>English</span>
        <span className="ml-auto font-sans tracking-normal normal-case tabular-nums">
          {index + 1}/{total}
        </span>
      </div>
      <div className="min-w-0 shrink-0">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-3xl leading-none md:text-4xl">{word}</h1>
          <Speak text={word} lang="en-US" label="Hear the English word" />
        </div>
        <p className="mt-1 truncate text-sm text-muted">
          {posLabel(item.pos)}
          {plural ? ` · ${plural}` : ""} · {stage}
        </p>
        <div className="mt-2 flex items-start gap-2">
          <p className="line-clamp-2 text-sm leading-snug md:text-base">{sentence}</p>
          <Speak text={sentence} lang="en-US" label="Hear the English sentence" />
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden rounded-2xl bg-chip">
        <Plate src={item.image} alt={word} lang={lang} />
      </div>
    </div>
  );
}

function voiceLine(text: string, reading?: string) {
  if (reading && /[\u{13000}-\u{1342F}]/u.test(text)) return reading;
  return text;
}

function Translation({ entry, speech, font }: { entry: Entry; speech: string; font?: string }) {
  const script = font ? { fontFamily: font } : undefined;
  const chars = hanChars(entry.word, speech);
  const chinese = speech.toLowerCase().startsWith("zh") || speech.toLowerCase().startsWith("yue");
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-3xl leading-none md:text-5xl" style={script}>{entry.word}</h2>
        <Speak text={voiceLine(entry.word, entry.reading)} lang={speech} label="Hear the word" />
      </div>
      {entry.reading && <p className="mt-1 text-base text-muted italic">{entry.reading}</p>}
      {chars.length > 0 && (
        <div className="mt-2">
          <div className="flex flex-wrap items-end gap-2">
            {chars.map((ch, index) => (
              <div key={`${ch}-${index}`} className="flex flex-col items-center gap-1">
                <StrokeOrder char={ch} font={font} compact={chars.length > 1} bare={chars.length > 1} />
                {chinese && (
                  <button
                    type="button"
                    aria-label={`Hear ${ch}`}
                    onClick={() => speak(ch, speech)}
                    className="grid h-8 w-8 place-items-center rounded-full border border-line bg-card"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mt-2 flex flex-wrap gap-2 text-sm">
        {entry.article && <Chip>{entry.article}</Chip>}
        {genderLabel(entry.gender) && <Chip>{genderLabel(entry.gender)}</Chip>}
        {entry.plural && <Chip>plural {entry.plural}</Chip>}
        {entry.feminine && <Chip>feminine {entry.feminine}</Chip>}
        {entry.masculine && entry.masculine !== entry.word && <Chip>masculine {entry.masculine}</Chip>}
        {entry.neuter && <Chip>neuter {entry.neuter}</Chip>}
      </div>
      {entry.sentence ? (
        <div className="mt-3 flex items-start gap-2">
          <p className="text-base leading-snug md:text-lg" style={script}>{entry.sentence}</p>
          <Speak text={entry.sentence} lang={speech} label="Hear the sentence" />
        </div>
      ) : null}
      {entry.sentenceReading && <p className="mt-1 text-sm text-muted italic">{entry.sentenceReading}</p>}
      {entry.note && <p className="mt-2 text-sm text-muted">{entry.note}</p>}
    </div>
  );
}

function InterslavicPanels({ conceptId, en, fixes }: { conceptId: string; en: string; fixes: Record<string, Fix> }) {
  const latin = mergeEntry(getBaseEntry("isv", conceptId, en), fixes[cardKey("isv", conceptId)]);
  const cyr = getBaseEntry("isv-Cyrl", conceptId, en);
  const glag = getBaseEntry("isv-Glag", conceptId, en);
  const blocks = [
    { title: "Latin", word: latin?.word, sentence: latin?.sentence, speak: true },
    { title: "Cyrillic", word: cyr?.word, sentence: cyr?.sentence, speak: false },
    { title: "Glagolitic", word: glag?.word, sentence: glag?.sentence, speak: false, font: LANGUAGES.find((lang) => lang.id === "isv")?.font },
  ];
  if (!latin?.word) {
    return <p className="text-base text-muted">Interslavic does not have this word yet. Ask Grok whether a line should be added.</p>;
  }
  return (
    <div className="space-y-2">
      {blocks.map((block) => (
        <div key={block.title} className="rounded-2xl border border-line bg-paper p-3" style={{ fontFamily: block.font }}>
          <p className="text-xs tracking-widest text-muted uppercase">{block.title}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <h2 className="text-2xl leading-none">{block.word}</h2>
            {block.speak && block.word && <Speak text={block.word} lang="hr-HR" label="Hear the Latin word" />}
          </div>
          {block.sentence ? (
            <div className="mt-1 flex items-start gap-2">
              <p className="text-sm leading-snug">{block.sentence}</p>
              {block.speak && <Speak text={block.sentence} lang="hr-HR" label="Hear the Latin sentence" />}
            </div>
          ) : null}
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
    { title: "Maghrebi", entry: getBaseEntry("ar-ma", conceptId, en), speech: "ar-MA" },
  ];
  if (!blocks.some((block) => block.entry?.word)) {
    return <p className="text-base text-muted">Arabic does not have this word yet. Ask Grok whether a line should be added.</p>;
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
                {entry.sentence ? (
                  <div className="mt-1 flex items-start gap-2">
                    <p className="text-sm leading-snug">{entry.sentence}</p>
                    <Speak text={entry.sentence} lang={block.speech} label={`Hear the ${block.title} sentence`} />
                  </div>
                ) : null}
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

function AskGrok({
  lang,
  languageName,
  tip,
  conceptId,
  english,
  englishSentence,
  entry,
  saved,
  onApply,
  onClear,
}: {
  lang: string;
  languageName: string;
  tip: string;
  conceptId: string;
  english: string;
  englishSentence: string;
  entry?: Entry;
  saved: boolean;
  onApply: (lang: string, concept: string, fix: Fix) => void;
  onClear: (lang: string, concept: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [check, setCheck] = useState<CardCheck | null>(null);
  const [applied, setApplied] = useState(false);
  return (
    <div className="mt-auto border-t border-line pt-3">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={busy}
          className="min-h-11 rounded-full bg-ink px-4 text-paper disabled:opacity-60"
          onClick={() => {
            setBusy(true);
            setError("");
            setApplied(false);
            void askCard({
              data: {
                language: lang,
                languageName,
                tip,
                english,
                englishSentence,
                word: entry?.word ?? "",
                sentence: entry?.sentence ?? "",
                reading: entry?.reading ?? "",
                sentenceReading: entry?.sentenceReading ?? "",
                plural: entry?.plural ?? "",
                article: entry?.article ?? "",
                note: entry?.note ?? "",
              },
            })
              .then((result) => {
                if (!result.ok) {
                  setCheck(null);
                  setError(result.error);
                  return;
                }
                setCheck(result.check);
              })
              .catch(() => {
                setCheck(null);
                setError("Grok could not check this card.");
              })
              .finally(() => setBusy(false));
          }}
        >
          {busy ? "Checking…" : "Ask Grok"}
        </button>
        {saved && (
          <button type="button" className="min-h-11 px-3 text-muted" onClick={() => { onClear(lang, conceptId); setApplied(false); setCheck(null); }}>
            Undo correction
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-muted">{error}</p>}
      {check && (
        <div className="mt-2 text-sm">
          <p>{check.reason}</p>
          {check.verdict === "correct" && check.fix && !applied && (
            <div className="mt-2 rounded-2xl border border-line bg-paper p-3">
              {check.fix.word && <p className="text-lg">{check.fix.word}</p>}
              {check.fix.reading && <p className="text-muted italic">{check.fix.reading}</p>}
              {check.fix.sentence && <p className="mt-1">{check.fix.sentence}</p>}
              {check.fix.sentenceReading && <p className="text-muted italic">{check.fix.sentenceReading}</p>}
              <button
                type="button"
                className="mt-2 min-h-11 rounded-full bg-moss px-4 text-moss-ink"
                onClick={() => {
                  onApply(lang, conceptId, check.fix!);
                  setApplied(true);
                }}
              >
                Use this correction
              </button>
            </div>
          )}
          {applied && <p className="mt-2 text-moss">Saved on this device.</p>}
        </div>
      )}
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

