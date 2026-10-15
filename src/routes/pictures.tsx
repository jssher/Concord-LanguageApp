import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  Apple,
  BedDouble,
  Briefcase,
  Car,
  ChevronDown,
  Coffee,
  Hammer,
  HeartPulse,
  PersonStanding,
  Shirt,
  Store,
  Sun,
  Trees,
  UtensilsCrossed,
  Volume2,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Shell } from "@/components/concord/shell";
import { Flag } from "@/components/concord/flag";
import { PICTURE_SECTIONS, PLATES, type PicturePlate, type Side, type Spot } from "@/data/pictures";
import { posLabel, useLevel, type CourseItem } from "@/data/course";
import { getBaseEntry, useLexicons } from "@/data/lexicon";
import { usePack } from "@/data/packs";
import { LANG_BY_ID } from "@/data/languages";
import { mergeEntry } from "@/lib/entry";
import { cardKey, genderLabel, useConcord, type Fix } from "@/lib/concord-store";
import { speak, stopSpeech } from "@/lib/speech";

export const Route = createFileRoute("/pictures")({ component: PicturesPage });

const ICONS: Record<string, LucideIcon> = {
  kitchen: UtensilsCrossed,
  table: Apple,
  parlour: BedDouble,
  bedroom: BedDouble,
  bath: HeartPulse,
  classroom: Store,
  market: Store,
  street: Car,
  park: Trees,
  cafe: Coffee,
  clinic: HeartPulse,
  workshop: Hammer,
  farm: Sun,
  garage: Wrench,
  office: Briefcase,
  body: PersonStanding,
  food: Apple,
  clothes: Shirt,
  animals: Trees,
  tools: Wrench,
  actions: PersonStanding,
};

const SHIFT: Record<Side, string> = {
  n: "-translate-x-1/2 -translate-y-full",
  s: "-translate-x-1/2 translate-y-1",
  e: "-translate-y-1/2 translate-x-1",
  w: "-translate-y-1/2 -translate-x-full",
  c: "-translate-x-1/2 -translate-y-1/2",
};

function lemma(text: string) {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

function useWordIndex() {
  const a1 = useLevel("A1");
  const a2 = useLevel("A2");
  const b1 = useLevel("B1");
  const b2 = useLevel("B2");
  const map = useMemo(() => {
    const next = new Map<string, CourseItem>();
    for (const item of [...a1.items, ...a2.items, ...b1.items, ...b2.items]) {
      if (item.kind !== "word") continue;
      const key = lemma(item.en);
      if (!next.has(key)) next.set(key, item);
    }
    return next;
  }, [a1.items, a2.items, b1.items, b2.items]);
  return { map, ready: a1.ready && a2.ready && b1.ready && b2.ready };
}

function PicturesPage() {
  const focus = useConcord((s) => s.focus);
  const targets = useConcord((s) => s.targets);
  const setFocus = useConcord((s) => s.setFocus);
  const fixes = useConcord((s) => s.fixes);
  const { map } = useWordIndex();
  const lexReady = useLexicons([focus, ...targets]);
  const packA1 = usePack(focus, "A1");
  const packA2 = usePack(focus, "A2");
  const packB1 = usePack(focus, "B1");
  const packB2 = usePack(focus, "B2");
  const packsReady = packA1 && packA2 && packB1 && packB2;
  const [plateId, setPlateId] = useState(PLATES[0].id);
  const [picking, setPicking] = useState(false);
  const [open, setOpen] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const plate = PLATES.find((item) => item.id === plateId) ?? PLATES[0];
  const focusLang = LANG_BY_ID.get(focus);
  const words = useMemo(() => {
    const seen: string[] = [];
    for (const spot of plate.spots) {
      const key = lemma(spot.en);
      if (!seen.includes(key)) seen.push(key);
    }
    return seen;
  }, [plate]);

  useEffect(() => stopSpeech, []);

  useEffect(() => {
    if (!active) return;
    document.getElementById(`picture-card-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, plate.id]);

  function choosePlate(id: string) {
    setPlateId(id);
    setPicking(false);
    setOpen([]);
    setActive(null);
    stopSpeech();
  }

  function pick(en: string) {
    const key = lemma(en);
    setActive(key);
    setOpen((list) => (list.includes(key) ? list : [...list, key]));
  }

  const index = PLATES.findIndex((item) => item.id === plate.id);

  return (
    <Shell scroll={false}>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0 border-b border-line">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3 md:px-6">
            <h1 className="text-2xl">Pictures</h1>
            <button
              type="button"
              aria-expanded={picking}
              aria-controls="picture-plates"
              onClick={() => setPicking((value) => !value)}
              className={`inline-flex min-h-11 min-w-0 flex-1 basis-56 items-center gap-2 rounded-full border px-3 text-left ${
                picking ? "border-accent bg-accent text-accent-ink" : "border-line bg-card"
              }`}
            >
              <span className="w-7 shrink-0 text-sm tabular-nums">{index + 1}</span>
              <PlateIcon id={plate.id} />
              <span className="min-w-0 flex-1 truncate">{plate.title}</span>
              <span className={`shrink-0 text-xs tabular-nums ${picking ? "opacity-80" : "text-muted"}`}>{plate.spots.length}</span>
              <ChevronDown className={`h-4 w-4 shrink-0 ${picking ? "rotate-180" : ""}`} aria-hidden />
            </button>
          </div>
          {picking && (
            <div id="picture-plates" className="max-h-[70dvh] overflow-y-auto border-t border-line px-4 py-3 md:px-6">
              <p className="mb-3 text-sm text-muted">Rooms, streets, the tools of a few trades, and five-by-five plates. This list closes when you pick one.</p>
              <div className="mx-auto flex max-w-6xl flex-col gap-3">
                {PICTURE_SECTIONS.map((section) => (
                  <div key={section}>
                    <p className="mb-1 text-xs tracking-widest text-muted uppercase">{section}</p>
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(11.5rem,1fr))] gap-1">
                      {PLATES.map((item, itemIndex) => {
                        if (item.section !== section) return null;
                        const on = item.id === plate.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => choosePlate(item.id)}
                            className={`flex min-h-11 items-center gap-2 rounded-xl px-2 text-left ${on ? "bg-ink text-paper" : "hover:bg-chip"}`}
                          >
                            <span className={`w-6 shrink-0 text-sm tabular-nums ${on ? "text-paper" : "text-muted"}`}>{itemIndex + 1}</span>
                            <PlateIcon id={item.id} />
                            <span className="min-w-0 flex-1 truncate">{item.title}</span>
                            <span className={`shrink-0 text-xs tabular-nums ${on ? "text-paper" : "text-muted"}`}>{item.spots.length}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-2 overflow-x-auto border-t border-line px-4 py-2 md:px-6">
            {targets.filter((id) => id !== "en").map((id) => {
              const lang = LANG_BY_ID.get(id);
              const on = id === focus;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setFocus(id)}
                  className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-3 ${on ? "border-ink bg-ink text-paper" : "border-line bg-card"}`}
                >
                  <Flag id={id} />
                  <span>{lang?.name ?? id}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(22rem,0.85fr)]">
          <div className="min-h-0 overflow-y-auto overscroll-contain px-4 py-3 md:px-6">
            <p className="mb-2 text-sm text-muted">{plate.blurb} Tap a label. The card opens beside the picture.</p>
            <PlateView plate={plate} words={words} active={active} onPick={pick} />
            <div className={`mt-3 flex flex-wrap gap-1 ${plate.compact ? "" : "lg:hidden"}`}>
              {plate.spots.map((spot, spotIndex) => {
                const key = lemma(spot.en);
                const on = key === active;
                const n = words.indexOf(key) + 1;
                return (
                  <button
                    key={`${key}-${spotIndex}`}
                    type="button"
                    onClick={() => pick(key)}
                    className={`inline-flex min-h-11 items-center gap-1 rounded-full border px-3 text-sm ${on ? "border-accent bg-accent text-accent-ink" : "border-line bg-card"}`}
                  >
                    <span className="tabular-nums">{n}</span>
                    {spot.en}
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="@container min-h-0 overflow-y-auto overscroll-contain border-t border-line lg:border-t-0 lg:border-l">
            <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-line bg-paper px-3 py-2">
              <p className="min-w-0 flex-1 truncate text-sm text-muted">
                {open.length === 0 ? "No card open yet" : `${open.length} open`}
                {focusLang ? ` · ${focusLang.name}` : ""}
              </p>
              <button type="button" onClick={() => setOpen(words)} className="min-h-11 rounded-full border border-line bg-card px-3 text-sm">
                All
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen([]);
                  setActive(null);
                }}
                className="min-h-11 rounded-full border border-line bg-card px-3 text-sm"
              >
                Clear
              </button>
            </div>
            {open.length === 0 ? (
              <p className="px-4 py-8 text-sm text-muted">Tap a window, a hammer, a cow. Its card stays here. All opens every word on this picture.</p>
            ) : (
              <div className="grid grid-cols-1 gap-3 p-3 @min-[36rem]:grid-cols-2">
                {open.map((key) => {
                  const n = words.indexOf(key) + 1;
                  const item = map.get(key);
                  return (
                    <DictCard
                      key={key}
                      n={n}
                      en={item?.en ?? key}
                      item={item}
                      on={key === active}
                      focus={focus}
                      focusName={focusLang?.name ?? focus}
                      speech={focusLang?.speech ?? "en-US"}
                      dir={focusLang?.dir}
                      font={focusLang?.font}
                      ready={lexReady && packsReady}
                      fix={fixes[cardKey(focus, item?.id ?? key)]}
                      onClose={() => setOpen((list) => list.filter((value) => value !== key))}
                    />
                  );
                })}
              </div>
            )}
          </aside>
        </div>
      </div>
    </Shell>
  );
}

function PlateIcon({ id }: { id: string }) {
  const Icon = ICONS[id] ?? Apple;
  return <Icon className="h-4 w-4 shrink-0" aria-hidden />;
}

function PlateView({ plate, words, active, onPick }: { plate: PicturePlate; words: string[]; active: string | null; onPick: (en: string) => void }) {
  if (plate.kind === "grid") {
    const pad = plate.pad ?? 0;
    return (
      <div className="relative mx-auto w-fit max-w-full">
        <img src={plate.image} alt={plate.title} className="block h-auto max-h-[68vh] w-auto max-w-full rounded-2xl" />
        <div className="absolute grid grid-cols-5 grid-rows-5" style={{ inset: `${pad}%` }}>
          {plate.spots.map((spot, index) => {
            const key = lemma(spot.en);
            const on = key === active;
            const n = words.indexOf(key) + 1;
            return (
              <button
                key={`${key}-${index}`}
                type="button"
                onClick={() => onPick(key)}
                aria-pressed={on}
                style={spot.span && spot.span > 1 ? { gridColumn: `span ${spot.span}` } : undefined}
                className={`flex items-end justify-center overflow-hidden p-0.5 ${on ? "bg-ink/15 ring-2 ring-accent ring-inset" : ""}`}
              >
                <span className={`max-w-full truncate rounded-full px-1.5 py-0.5 text-xs ${on ? "bg-accent text-accent-ink" : "bg-card/95 text-ink"}`}>
                  {n} {spot.en}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
  return <ScenePlate plate={plate} words={words} active={active} onPick={onPick} />;
}

type Callout = { spot: Spot; index: number; side: "left" | "right"; top: number };

/** Pull a label into the margin, with an arrow, when it would sit on its neighbour. */
function layoutCallouts(spots: Spot[], width: number, height: number, force: boolean): Callout[] {
  if (width < 80 || height < 80) return [];
  const parent = spots.map((_, index) => index);
  const find = (i: number): number => (parent[i] === i ? i : (parent[i] = find(parent[i])));
  const unite = (a: number, b: number) => {
    const pa = find(a);
    const pb = find(b);
    if (pa !== pb) parent[pa] = pb;
  };
  if (force) {
    for (let i = 1; i < spots.length; i++) unite(0, i);
  } else {
    for (let i = 0; i < spots.length; i++) {
      for (let j = i + 1; j < spots.length; j++) {
        const dx = Math.abs((spots[i].x ?? 50) - (spots[j].x ?? 50));
        const dy = Math.abs((spots[i].y ?? 50) - (spots[j].y ?? 50));
        if (dx <= 9 && dy <= 5.5) unite(i, j);
      }
    }
  }
  const groups = new Map<number, number[]>();
  spots.forEach((_, index) => {
    const root = find(index);
    const group = groups.get(root);
    if (group) group.push(index);
    else groups.set(root, [index]);
  });
  const callouts: Callout[] = [];
  const pending: { index: number; side: "left" | "right" }[] = [];
  for (const group of groups.values()) {
    if (group.length < 2) continue;
    const xs = group.map((index) => spots[index].x ?? 50);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const ranked = [...group].sort((a, b) => (spots[a].x ?? 50) - (spots[b].x ?? 50) || (spots[a].y ?? 50) - (spots[b].y ?? 50));
    if (maxX < 40) ranked.forEach((index) => pending.push({ index, side: "left" }));
    else if (minX > 60) ranked.forEach((index) => pending.push({ index, side: "right" }));
    else ranked.forEach((item, order) => pending.push({ index: item, side: order < Math.ceil(ranked.length / 2) ? "left" : "right" }));
  }
  for (const side of ["left", "right"] as const) {
    const members = pending.filter((item) => item.side === side).sort((a, b) => (spots[a.index].y ?? 50) - (spots[b.index].y ?? 50));
    if (members.length === 0) continue;
    const gap = 6;
    const tops: number[] = [];
    let cursor = 4;
    for (const item of members) {
      const y = ((spots[item.index].y ?? 50) / 100) * height;
      const top = Math.max(cursor, y - 18);
      tops.push(top);
      cursor = top + 36 + gap;
    }
    const overflow = cursor - gap - (height - 4);
    if (overflow > 0) {
      for (let i = 0; i < tops.length; i++) tops[i] -= overflow;
    }
    if (tops[0] < 4) {
      const room = height - 8;
      const total = members.length * 36 + gap * (members.length - 1);
      if (total <= room) {
        let y = 4;
        for (let i = 0; i < members.length; i++) {
          tops[i] = y;
          y += 36 + gap;
        }
      } else {
        const slot = room / members.length;
        for (let i = 0; i < members.length; i++) tops[i] = 4 + i * slot;
      }
    }
    members.forEach((item, order) => callouts.push({ spot: spots[item.index], index: item.index, side, top: tops[order] }));
  }
  return callouts;
}

function ScenePlate({ plate, words, active, onPick }: { plate: PicturePlate; words: string[]; active: string | null; onPick: (en: string) => void }) {
  const frame = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [lines, setLines] = useState<{ key: string; x1: number; y1: number; x2: number; y2: number; on: boolean }[]>([]);
  const callouts = useMemo(
    () => layoutCallouts(plate.spots, box.w, box.h, plate.compact === true),
    [plate, box.w, box.h],
  );
  const called = useMemo(() => new Set(callouts.map((item) => item.index)), [callouts]);

  useLayoutEffect(() => {
    const node = frame.current;
    if (!node) return;
    const measure = () => {
      const fr = node.getBoundingClientRect();
      setBox((prev) => (Math.abs(prev.w - fr.width) < 1 && Math.abs(prev.h - fr.height) < 1 ? prev : { w: fr.width, h: fr.height }));
      const next: { key: string; x1: number; y1: number; x2: number; y2: number; on: boolean }[] = [];
      for (const el of node.querySelectorAll<HTMLElement>("[data-callout]")) {
        const rect = el.getBoundingClientRect();
        const side = el.getAttribute("data-side");
        const tx = (Number(el.getAttribute("data-x")) / 100) * fr.width;
        const ty = (Number(el.getAttribute("data-y")) / 100) * fr.height;
        const x1 = side === "left" ? rect.right - fr.left : rect.left - fr.left;
        const y1 = rect.top + rect.height / 2 - fr.top;
        const dx = tx - x1;
        const dy = ty - y1;
        const len = Math.hypot(dx, dy) || 1;
        next.push({
          key: el.getAttribute("data-key") ?? "",
          x1: x1 + (dx / len) * 2,
          y1: y1 + (dy / len) * 2,
          x2: tx - (dx / len) * 9,
          y2: ty - (dy / len) * 9,
          on: el.getAttribute("data-on") === "1",
        });
      }
      setLines(next);
    };
    measure();
    const watcher = new ResizeObserver(measure);
    watcher.observe(node);
    return () => watcher.disconnect();
  }, [plate.id, callouts, active]);

  return (
    <div ref={frame} className="relative mx-auto w-fit max-w-full">
      <img src={plate.image} alt={plate.title} className="block h-auto max-h-[68vh] w-auto max-w-full rounded-2xl" />
      {box.w > 0 ? (
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${box.w} ${box.h}`} aria-hidden="true">
          <defs>
            <marker id="pin-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 Z" fill="#1c1915" />
            </marker>
            <marker id="pin-arrow-on" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 Z" fill="#c24d2c" />
            </marker>
          </defs>
          {lines.map((line) => (
            <line
              key={line.key}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={line.on ? "#c24d2c" : "#1c1915"}
              strokeWidth="1.25"
              markerEnd={line.on ? "url(#pin-arrow-on)" : "url(#pin-arrow)"}
            />
          ))}
        </svg>
      ) : null}
      {plate.spots.map((spot, index) => {
        if (called.has(index)) return null;
        return (
          <Pin
            key={`${spot.en}-${index}`}
            spot={spot}
            n={words.indexOf(lemma(spot.en)) + 1}
            on={lemma(spot.en) === active}
            compact={plate.compact}
            onPick={onPick}
          />
        );
      })}
      {callouts.map((item) => {
        const key = lemma(item.spot.en);
        const on = key === active;
        const n = words.indexOf(key) + 1;
        return (
          <span key={`call-${item.index}`}>
            <button
              type="button"
              data-callout="1"
              data-side={item.side}
              data-x={item.spot.x ?? 50}
              data-y={item.spot.y ?? 50}
              data-on={on ? "1" : "0"}
              data-key={`${item.index}`}
              onClick={() => onPick(item.spot.en)}
              aria-pressed={on}
              className={`absolute z-20 inline-flex max-w-[46%] items-center gap-1 whitespace-nowrap rounded-full border px-2 text-xs ${
                item.side === "left" ? "left-1" : "right-1"
              } ${on ? "border-accent bg-accent text-accent-ink" : "border-line bg-card/95 text-ink"}`}
              style={{ top: item.top, minHeight: 32 }}
            >
              <span className="tabular-nums">{n}</span>
              <span className="truncate">{item.spot.en}</span>
            </button>
            <button
              type="button"
              onClick={() => onPick(item.spot.en)}
              aria-label={`${n} ${item.spot.en}`}
              className={`absolute z-10 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border ${on ? "border-accent bg-accent" : "border-ink bg-paper"}`}
              style={{ left: `${item.spot.x ?? 50}%`, top: `${item.spot.y ?? 50}%` }}
            />
          </span>
        );
      })}
    </div>
  );
}

function Pin({ spot, n, on, compact, onPick }: { spot: Spot; n: number; on: boolean; compact?: boolean; onPick: (en: string) => void }) {
  const side = spot.side ?? "s";
  return (
    <button
      type="button"
      onClick={() => onPick(spot.en)}
      aria-pressed={on}
      aria-label={`${n} ${spot.en}`}
      title={spot.en}
      style={{ left: `${spot.x ?? 50}%`, top: `${spot.y ?? 50}%` }}
      className={`absolute z-10 inline-flex items-center justify-center gap-1 rounded-full border text-xs ${SHIFT[side]} ${
        compact ? "h-9 w-9" : "min-h-9 max-w-36 px-2"
      } ${on ? "z-20 border-accent bg-accent text-accent-ink" : "border-line bg-card/95 text-ink"}`}
    >
      <span className="tabular-nums">{n}</span>
      {compact ? null : <span className="truncate">{spot.en}</span>}
    </button>
  );
}

function DictCard({
  n,
  en,
  item,
  on,
  focus,
  focusName,
  speech,
  dir,
  font,
  ready,
  fix,
  onClose,
}: {
  n: number;
  en: string;
  item?: CourseItem;
  on: boolean;
  focus: string;
  focusName: string;
  speech: string;
  dir?: "ltr" | "rtl";
  font?: string;
  ready: boolean;
  fix: Fix | undefined;
  onClose: () => void;
}) {
  const id = item?.id ?? en;
  const entry = mergeEntry(getBaseEntry(focus, id, en), fix);
  const script = font ? { fontFamily: font } : undefined;
  return (
    <article id={`picture-card-${lemma(en)}`} className={`rounded-2xl border bg-card p-3 ${on ? "border-accent" : "border-line"}`}>
      <div className="flex items-start gap-2">
        <p className="pt-1 text-xs tabular-nums text-muted">{n}</p>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl leading-none">{en}</h2>
            <Hear text={en} lang="en-US" label={`Hear ${en}`} />
          </div>
          <p className="mt-1 text-xs text-muted">
            {item ? posLabel(item.pos) : "name"}
            {item?.plural ? ` · ${item.plural}` : ""}
          </p>
          {item?.sentence ? <p className="mt-2 text-sm leading-snug">{item.sentence}</p> : <p className="mt-2 text-sm text-muted">A name. No sentence on this card.</p>}
        </div>
        <button type="button" onClick={onClose} aria-label={`Close ${en}`} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line">
          ×
        </button>
      </div>
      <div className="mt-3 border-t border-line pt-2" dir={dir} lang={speech}>
        <p className="text-xs tracking-widest text-muted uppercase" dir="ltr">
          {focusName}
        </p>
        {entry?.word ? (
          <>
            <div className="mt-1 flex items-center gap-2">
              <h3 className="text-xl leading-none" style={script}>
                {entry.word}
              </h3>
              <Hear text={entry.word} lang={speech} label={`Hear ${entry.word}`} />
            </div>
            {entry.reading && (
              <p className="mt-1 text-sm text-muted italic" dir="ltr">
                {entry.reading}
              </p>
            )}
            <p className="mt-1 text-xs text-muted" dir="ltr">
              {[entry.article, genderLabel(entry.gender), entry.plural && `plural ${entry.plural}`].filter(Boolean).join(" · ")}
            </p>
            {entry.sentence ? (
              <p className="mt-2 text-sm leading-snug" style={script}>
                {entry.sentence}
              </p>
            ) : null}
          </>
        ) : (
          <p className="mt-1 text-sm text-muted">{ready ? "This language does not have this word yet." : "Opening this language…"}</p>
        )}
      </div>
    </article>
  );
}

function Hear({ text, lang, label }: { text: string; lang: string; label: string }) {
  return (
    <button type="button" aria-label={label} onClick={() => speak(text, lang)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-paper">
      <Volume2 className="h-4 w-4" />
    </button>
  );
}
