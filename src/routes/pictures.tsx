import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  Anchor,
  Apple,
  BedDouble,
  Brain,
  Briefcase,
  Bus,
  Car,
  Carrot,
  ChevronDown,
  Coffee,
  Construction,
  Flower2,
  Footprints,
  Hammer,
  Hand,
  HardHat,
  HeartPulse,
  Leaf,
  Medal,
  Music,
  PersonStanding,
  ScanFace,
  Shirt,
  Shovel,
  Smile,
  Stethoscope,
  Store,
  Sun,
  Trees,
  Umbrella,
  UtensilsCrossed,
  Volume2,
  Wrench,
  Bug,
  Bone,
  CloudSun,
  Plus,
  type LucideIcon,
} from "lucide-react";
import { Shell } from "@/components/concord/shell";
import { Flag } from "@/components/concord/flag";
import { Remark } from "@/components/concord/remark";
import { PICTURE_SECTIONS, PICTURE_WORD_COUNT, PLATES, type PicturePlate, type Side, type Spot } from "@/data/pictures";
import { posLabel, useLevel, type CourseItem, type CourseLevel } from "@/data/course";
import { getBaseEntry, useLexicons } from "@/data/lexicon";
import { ensurePack } from "@/data/packs";
import { byNearness, FAMILIES, LANG_BY_ID, LANGUAGES } from "@/data/languages";
import { mergeEntry } from "@/lib/entry";
import { batchLabel, cardKey, genderLabel, useConcord, type Fix } from "@/lib/concord-store";
import { noteReview } from "@/lib/league/client";
import { speak, stopSpeech } from "@/lib/speech";
import type { Entry } from "@/data/types";

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
  face: ScanFace,
  hand: Hand,
  foot: Footprints,
  organs: Brain,
  skeleton: Bone,
  feelings: Smile,
  food: Apple,
  clothes: Shirt,
  animals: Trees,
  tools: Wrench,
  actions: PersonStanding,
  fruits: Apple,
  vegetables: Carrot,
  meals: UtensilsCrossed,
  vehicles: Bus,
  "car-parts": Car,
  harbour: Anchor,
  jobs: HardHat,
  medical: Stethoscope,
  building: Construction,
  site: Construction,
  "garden-tools": Shovel,
  garden: Flower2,
  plant: Leaf,
  weather: CloudSun,
  beach: Umbrella,
  forest: Trees,
  insects: Bug,
  sports: Medal,
  music: Music,
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

const PACK_LEVELS: CourseLevel[] = ["A1", "A2", "B1", "B2"];

function packLangs(ids: string[]): string[] {
  const out: string[] = [];
  for (const id of ids) {
    if (id === "ar") out.push(id, "ar-eg", "ar-sa", "ar-ma");
    else if (id && id !== "en") out.push(id);
  }
  return [...new Set(out)];
}

function useCoursePacks(ids: string[]): boolean {
  const key = packLangs(ids).sort().join("|");
  const [ready, setReady] = useState(key.length === 0);
  useEffect(() => {
    const list = key ? key.split("|") : [];
    if (!list.length) {
      setReady(true);
      return;
    }
    let live = true;
    setReady(false);
    Promise.all(list.flatMap((id) => PACK_LEVELS.map((level) => ensurePack(id, level)))).then(() => {
      if (live) setReady(true);
    });
    return () => {
      live = false;
    };
  }, [key]);
  return ready;
}

function PicturesPage() {
  const targets = useConcord((s) => s.targets);
  const fixes = useConcord((s) => s.fixes);
  const toggleTarget = useConcord((s) => s.toggleTarget);
  const normalize = useConcord((s) => s.normalize);
  const { map } = useWordIndex();
  const langs = useMemo(
    () => byNearness(targets.filter((id) => LANG_BY_ID.has(id) && id !== "en")).slice(0, 12),
    [targets],
  );
  const lexReady = useLexicons(langs);
  const packsReady = useCoursePacks(langs);
  const ready = lexReady && packsReady;
  const [plateId, setPlateId] = useState(PLATES[0].id);
  const [picking, setPicking] = useState(false);
  const [pickingLangs, setPickingLangs] = useState(false);
  const [open, setOpen] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const plate = PLATES.find((item) => item.id === plateId) ?? PLATES[0];
  const chosen = useMemo(() => new Set(open), [open]);
  const words = useMemo(() => {
    const seen: string[] = [];
    for (const spot of plate.spots) {
      const key = lemma(spot.en);
      if (!seen.includes(key)) seen.push(key);
    }
    return seen;
  }, [plate]);

  useEffect(() => {
    normalize();
    return () => stopSpeech();
  }, [normalize]);

  useEffect(() => {
    const key = decodeURIComponent(window.location.hash.replace(/^#/, "")).trim().toLowerCase();
    if (!key) return;
    const found = PLATES.find((item) => item.spots.some((spot) => lemma(spot.en) === key));
    if (!found) return;
    setPlateId(found.id);
    setOpen([key]);
    setActive(key);
  }, []);

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
    if (open.includes(key)) {
      const next = open.filter((value) => value !== key);
      setOpen(next);
      setActive(next.at(-1) ?? null);
      return;
    }
    setActive(key);
    setOpen((list) => [...list, key]);
  }

  const index = PLATES.findIndex((item) => item.id === plate.id);

  return (
    <Shell scroll={false}>
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0 border-b border-line">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3 md:px-6">
            <div className="shrink-0">
              <h1 className="text-2xl leading-none">Pictures</h1>
              <p className="text-xs tabular-nums text-muted">{PICTURE_WORD_COUNT.toLocaleString()} words</p>
            </div>
            <button
              type="button"
              aria-expanded={picking}
              aria-controls="picture-plates"
              onClick={() => {
                setPicking((value) => !value);
                setPickingLangs(false);
              }}
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
              <p className="mb-3 text-sm text-muted">Rooms, the body, weather, music, food, and trades. This list closes when you pick one.</p>
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
          <div className="flex items-center gap-2 border-t border-line px-4 py-2 md:px-6">
            <button
              type="button"
              aria-expanded={pickingLangs}
              onClick={() => {
                setPickingLangs((value) => !value);
                setPicking(false);
              }}
              className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-3 ${pickingLangs ? "bg-accent text-accent-ink" : "border border-ink bg-card"}`}
            >
              <Plus className="h-4 w-4" />
              {pickingLangs ? "Done — close this list" : `Languages ${langs.length}/12`}
            </button>
            <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto">
              {langs.map((id) => {
                const lang = LANG_BY_ID.get(id);
                if (!lang) return null;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed
                    aria-label={`Remove ${lang.name}`}
                    onClick={() => toggleTarget(id)}
                    className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-ink bg-ink px-3 text-paper"
                  >
                    <Flag id={id} />
                    <span>{lang.name}</span>
                    <span aria-hidden>×</span>
                  </button>
                );
              })}
            </div>
          </div>
          {pickingLangs && (
            <div className="max-h-[38dvh] overflow-y-auto border-t border-line px-4 py-3 md:px-6">
              <p className="mb-3 text-sm text-muted">Choose up to twelve. A selected word is shown in every language that is on. English stays on the card.</p>
              <div className="mx-auto flex max-w-6xl flex-col gap-3">
                {FAMILIES.map((family) => {
                  const familyLangs = LANGUAGES.filter((lang) => lang.family === family && lang.id !== "en");
                  if (!familyLangs.length) return null;
                  return (
                    <div key={family}>
                      <p className="mb-1 text-xs tracking-widest text-muted uppercase">{family}</p>
                      <div className="flex flex-wrap gap-2">
                        {familyLangs.map((lang) => {
                          const on = targets.includes(lang.id);
                          const blocked = !on && langs.length >= 12;
                          return (
                            <button
                              key={lang.id}
                              type="button"
                              disabled={blocked}
                              aria-pressed={on}
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

        <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(22rem,0.85fr)]">
          <div className="min-h-0 overflow-y-auto overscroll-contain px-4 py-3 md:px-6">
            <p className="mb-2 text-sm text-muted">{plate.blurb} Tap a word. Only the ones you tap stay open, in every language above.</p>
            <PlateView plate={plate} words={words} active={active} chosen={chosen} onPick={pick} />
            {plate.kind === "zoom" ? null : (
            <div className={`mt-3 flex flex-wrap gap-1 ${plate.compact ? "" : "lg:hidden"}`}>
              {plate.spots.map((spot, spotIndex) => {
                const key = lemma(spot.en);
                const on = key === active;
                const picked = chosen.has(key);
                const n = words.indexOf(key) + 1;
                return (
                  <button
                    key={`${key}-${spotIndex}`}
                    type="button"
                    onClick={() => pick(key)}
                    aria-pressed={picked}
                    className={`inline-flex min-h-11 items-center gap-1 rounded-full border px-3 text-sm ${on ? "border-accent bg-accent text-accent-ink" : picked ? "border-ink bg-ink text-paper" : "border-line bg-card"}`}
                  >
                    <span className="tabular-nums">{n}</span>
                    {spot.en}
                  </button>
                );
              })}
            </div>
            )}
          </div>

          <aside className="min-h-0 overflow-y-auto overscroll-contain border-t border-line lg:border-t-0 lg:border-l">
            <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-line bg-paper px-3 py-2">
              <p className="min-w-0 flex-1 truncate text-sm text-muted">
                {open.length === 0 ? "No word selected" : `${open.length} selected`}
                {langs.length ? ` · ${langs.length} ${langs.length === 1 ? "language" : "languages"}` : ""}
              </p>
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
              <p className="px-4 py-8 text-sm text-muted">Tap a window, a hammer, a cow. Only that word stays here, written in each language you have turned on.</p>
            ) : (
              <div className="flex flex-col gap-3 p-3">
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
                      langs={langs}
                      fixes={fixes}
                      ready={ready}
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

function PlateView({
  plate,
  words,
  active,
  chosen,
  onPick,
}: {
  plate: PicturePlate;
  words: string[];
  active: string | null;
  chosen: Set<string>;
  onPick: (en: string) => void;
}) {
  if (plate.kind === "grid") {
    const pad = plate.pad ?? 0;
    return (
      <div className="relative mx-auto w-fit max-w-full">
        <img src={plate.image} alt={plate.title} className="block h-auto max-h-[68vh] w-auto max-w-full rounded-2xl" />
        <div className="absolute grid grid-cols-5 grid-rows-5" style={{ inset: `${pad}%` }}>
          {plate.spots.map((spot, index) => {
            const key = lemma(spot.en);
            const on = key === active;
            const picked = chosen.has(key);
            const n = words.indexOf(key) + 1;
            return (
              <button
                key={`${key}-${index}`}
                type="button"
                onClick={() => onPick(key)}
                aria-pressed={picked}
                style={spot.span && spot.span > 1 ? { gridColumn: `span ${spot.span}` } : undefined}
                className={`flex items-end justify-center overflow-hidden p-0.5 ${on ? "bg-ink/15 ring-2 ring-accent ring-inset" : picked ? "bg-ink/10" : ""}`}
              >
                <span className={`max-w-full truncate rounded-full px-1.5 py-0.5 text-xs ${on ? "bg-accent text-accent-ink" : picked ? "bg-ink text-paper" : "bg-card/95 text-ink"}`}>
                  {n} {spot.en}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
  if (plate.kind === "zoom") return <ZoomPlate plate={plate} words={words} active={active} chosen={chosen} onPick={onPick} />;
  return <ScenePlate plate={plate} words={words} active={active} chosen={chosen} onPick={onPick} />;
}

function cropStyle(image: string, crop: NonNullable<Spot["crop"]>): CSSProperties {
  const w = crop.w / 100;
  const h = crop.h / 100;
  const x = crop.x / 100;
  const y = crop.y / 100;
  return {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: `${100 / w}% ${100 / h}%`,
    backgroundPosition: `${(x / (1 - w)) * 100}% ${(y / (1 - h)) * 100}%`,
  };
}

function ZoomPlate({
  plate,
  words,
  active,
  chosen,
  onPick,
}: {
  plate: PicturePlate;
  words: string[];
  active: string | null;
  chosen: Set<string>;
  onPick: (en: string) => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
      <img src={plate.image} alt={plate.title} className="mx-auto block h-auto max-h-[38vh] w-auto max-w-full rounded-2xl" />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {plate.spots.map((spot, index) => {
          const key = lemma(spot.en);
          const on = key === active;
          const picked = chosen.has(key);
          const n = words.indexOf(key) + 1;
          return (
            <button
              key={`${key}-${index}`}
              type="button"
              onClick={() => onPick(key)}
              aria-pressed={picked}
              className={`relative aspect-square overflow-hidden rounded-2xl border bg-card ${on ? "border-accent ring-2 ring-accent" : picked ? "border-ink" : "border-line"}`}
            >
              {spot.crop ? <span className="absolute inset-0" style={cropStyle(plate.image, spot.crop)} /> : null}
              <span className="absolute inset-0 flex items-center justify-center p-2">
                <span className={`max-w-full rounded-full px-3 py-1 text-center text-sm font-medium ${on ? "bg-accent text-accent-ink" : picked ? "bg-ink text-paper" : "bg-card/95 text-ink"}`}>
                  <span className="sr-only">{n} </span>
                  {spot.en}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
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

function ScenePlate({
  plate,
  words,
  active,
  chosen,
  onPick,
}: {
  plate: PicturePlate;
  words: string[];
  active: string | null;
  chosen: Set<string>;
  onPick: (en: string) => void;
}) {
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
            picked={chosen.has(lemma(spot.en))}
            compact={plate.compact}
            onPick={onPick}
          />
        );
      })}
      {callouts.map((item) => {
        const key = lemma(item.spot.en);
        const on = key === active;
        const picked = chosen.has(key);
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
              aria-pressed={picked}
              className={`absolute z-20 inline-flex max-w-[46%] items-center gap-1 whitespace-nowrap rounded-full border px-2 text-xs ${
                item.side === "left" ? "left-1" : "right-1"
              } ${on ? "border-accent bg-accent text-accent-ink" : picked ? "border-ink bg-ink text-paper" : "border-line bg-card/95 text-ink"}`}
              style={{ top: item.top, minHeight: 32 }}
            >
              <span className="tabular-nums">{n}</span>
              <span className="truncate">{item.spot.en}</span>
            </button>
            <button
              type="button"
              onClick={() => onPick(item.spot.en)}
              aria-label={`${n} ${item.spot.en}`}
              className={`absolute z-10 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border ${on ? "border-accent bg-accent" : picked ? "border-ink bg-ink" : "border-ink bg-paper"}`}
              style={{ left: `${item.spot.x ?? 50}%`, top: `${item.spot.y ?? 50}%` }}
            />
          </span>
        );
      })}
    </div>
  );
}

function Pin({ spot, n, on, picked, compact, onPick }: { spot: Spot; n: number; on: boolean; picked: boolean; compact?: boolean; onPick: (en: string) => void }) {
  const side = spot.side ?? "s";
  return (
    <button
      type="button"
      onClick={() => onPick(spot.en)}
      aria-pressed={picked || on}
      aria-label={`${n} ${spot.en}`}
      title={spot.en}
      style={{ left: `${spot.x ?? 50}%`, top: `${spot.y ?? 50}%` }}
      className={`absolute z-10 inline-flex items-center justify-center gap-1 rounded-full border text-xs ${SHIFT[side]} ${
        compact ? "h-9 w-9" : "min-h-9 max-w-36 px-2"
      } ${on ? "z-20 border-accent bg-accent text-accent-ink" : picked ? "border-ink bg-ink text-paper" : "border-line bg-card/95 text-ink"}`}
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
  langs,
  fixes,
  ready,
  onClose,
}: {
  n: number;
  en: string;
  item?: CourseItem;
  on: boolean;
  langs: string[];
  fixes: Record<string, Fix>;
  ready: boolean;
  onClose: () => void;
}) {
  const id = item?.id ?? en;
  const english = mergeEntry(getBaseEntry("en", id, en, item?.sentence), fixes[cardKey("en", id)]);
  const sentence = english?.sentence || item?.sentence || "";
  return (
    <article id={`picture-card-${lemma(en)}`} className={`rounded-2xl border bg-card p-3 ${on ? "border-accent" : "border-line"}`}>
      <div className="flex items-start gap-2">
        <p className="pt-1 text-xs tabular-nums text-muted">{n}</p>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Flag id="en" />
            <h2 className="text-2xl leading-none">{english?.word || en}</h2>
            <Hear text={english?.word || en} lang="en-US" label={`Hear ${en}`} />
          </div>
          <p className="mt-1 text-xs text-muted">
            {item ? posLabel(item.pos) : "name"}
            {english?.plural || item?.plural ? ` · ${english?.plural || item?.plural}` : ""}
          </p>
          {sentence ? (
            <div className="mt-2 flex items-start gap-2">
              <p className="text-sm leading-snug">{sentence}</p>
              <Hear text={sentence} lang="en-US" label={`Hear the English sentence for ${en}`} />
            </div>
          ) : (
            <p className="mt-2 text-sm text-muted">A name. No sentence on this card.</p>
          )}
        </div>
        <button type="button" onClick={onClose} aria-label={`Close ${en}`} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line">
          ×
        </button>
      </div>
      {langs.length === 0 ? (
        <p className="mt-3 border-t border-line pt-2 text-sm text-muted">Turn a language on above. This word will be written in each one.</p>
      ) : (
        <div className="mt-3 space-y-3 border-t border-line pt-3">
          {langs.map((langId) =>
            langId === "isv" ? (
              <InterslavicBlock key={langId} conceptId={id} en={en} fixes={fixes} level={item?.level ?? ""} />
            ) : langId === "ar" ? (
              <ArabicBlock key={langId} conceptId={id} en={en} fixes={fixes} ready={ready} level={item?.level ?? ""} />
            ) : (
              <LangBlock key={langId} langId={langId} conceptId={id} en={en} sentence={sentence} fix={fixes[cardKey(langId, id)]} ready={ready} level={item?.level ?? ""} />
            ),
          )}
        </div>
      )}
    </article>
  );
}

function facts(entry: Entry | undefined): string[] {
  return [
    entry?.article,
    genderLabel(entry?.gender),
    entry?.plural && `plural ${entry.plural}`,
    entry?.feminine && `feminine ${entry.feminine}`,
    entry?.masculine && entry.masculine !== entry.word && `masculine ${entry.masculine}`,
    entry?.neuter && `neuter ${entry.neuter}`,
  ].filter((part): part is string => Boolean(part));
}

function PictureRemark({ langId, en, word, level }: { langId: string; en: string; word?: string; level: string }) {
  return (
    <div dir="ltr">
      <Remark
        lang={langId}
        scopes={[{
          kind: "card",
          id: lemma(en),
          label: [en, word].filter(Boolean).join(" · "),
          level,
          bucket: "pictures",
          name: "Card",
        }]}
      />
    </div>
  );
}

function LangBlock({
  langId,
  conceptId,
  en,
  sentence,
  fix,
  ready,
  level,
}: {
  langId: string;
  conceptId: string;
  en: string;
  sentence: string;
  fix: Fix | undefined;
  ready: boolean;
  level: string;
}) {
  const lang = LANG_BY_ID.get(langId);
  const mark = useConcord((s) => s.cards[cardKey(langId, conceptId)]);
  const grade = useConcord((s) => s.grade);
  const entry = mergeEntry(getBaseEntry(langId, conceptId, en, sentence), fix);
  const script = lang?.font ? { fontFamily: lang.font } : undefined;
  const bits = facts(entry);
  function markCard(kind: "r" | "w") {
    grade(langId, conceptId, kind);
    noteReview(langId, conceptId, kind);
  }
  return (
    <div dir={lang?.dir} lang={lang?.speech}>
      <div className="flex items-center gap-2" dir="ltr">
        <Flag id={langId} />
        <p className="text-xs tracking-widest text-muted uppercase">{lang?.name ?? langId}</p>
        <span className="ml-auto text-xs text-muted">{batchLabel(mark?.stage)}</span>
      </div>
      {entry?.word ? (
        <>
          <div className="mt-1 flex items-center gap-2">
            <h3 className="text-xl leading-none" style={script}>
              {entry.word}
            </h3>
            <Hear text={entry.reading && /[\u{13000}-\u{1342F}]/u.test(entry.word) ? entry.reading : entry.word} lang={lang?.speech ?? "en-US"} label={`Hear ${entry.word}`} />
          </div>
          {entry.reading && (
            <p className="mt-1 text-sm text-muted italic" dir="ltr">
              {entry.reading}
            </p>
          )}
          {bits.length > 0 && (
            <p className="mt-1 text-xs text-muted" dir="ltr">
              {bits.join(" · ")}
            </p>
          )}
          {entry.sentence ? (
            <div className="mt-2 flex items-start gap-2">
              <p className="text-sm leading-snug" style={script}>
                {entry.sentence}
              </p>
              <Hear text={entry.sentence} lang={lang?.speech ?? "en-US"} label={`Hear the sentence in ${lang?.name ?? langId}`} />
            </div>
          ) : null}
          {entry.sentenceReading && <p className="mt-1 text-sm text-muted italic">{entry.sentenceReading}</p>}
          {entry.note && <p className="mt-1 text-sm text-muted">{entry.note}</p>}
          <GradeButtons onMark={markCard} />
          <PictureRemark langId={langId} en={en} word={entry.word} level={level} />
        </>
      ) : (
        <>
          <p className="mt-1 text-sm text-muted">{ready ? "This language does not have this word yet." : "Opening this language…"}</p>
          <PictureRemark langId={langId} en={en} level={level} />
        </>
      )}
    </div>
  );
}

function GradeButtons({ onMark }: { onMark: (kind: "r" | "w") => void }) {
  return (
    <div className="mt-2 flex gap-2" dir="ltr">
      <button type="button" onClick={() => onMark("w")} className="min-h-9 flex-1 rounded-full border border-line bg-paper text-sm">
        Again
      </button>
      <button type="button" onClick={() => onMark("r")} className="min-h-9 flex-1 rounded-full bg-moss text-sm text-moss-ink">
        Remembered
      </button>
    </div>
  );
}

function InterslavicBlock({ conceptId, en, fixes, level }: { conceptId: string; en: string; fixes: Record<string, Fix>; level: string }) {
  const mark = useConcord((s) => s.cards[cardKey("isv", conceptId)]);
  const grade = useConcord((s) => s.grade);
  const latin = mergeEntry(getBaseEntry("isv", conceptId, en), fixes[cardKey("isv", conceptId)]);
  const cyr = getBaseEntry("isv-Cyrl", conceptId, en);
  const glag = getBaseEntry("isv-Glag", conceptId, en);
  const font = LANG_BY_ID.get("isv")?.font;
  const blocks = [
    { title: "Latin", word: latin?.word, sentence: latin?.sentence, speak: true },
    { title: "Cyrillic", word: cyr?.word, sentence: cyr?.sentence, speak: false },
    { title: "Glagolitic", word: glag?.word, sentence: glag?.sentence, speak: false, font },
  ];
  return (
    <div>
      <div className="flex items-center gap-2">
        <Flag id="isv" />
        <p className="text-xs tracking-widest text-muted uppercase">Interslavic</p>
        <span className="ml-auto text-xs text-muted">{batchLabel(mark?.stage)}</span>
      </div>
      {!latin?.word ? (
        <>
          <p className="mt-1 text-sm text-muted">Interslavic does not have this word yet.</p>
          <PictureRemark langId="isv" en={en} level={level} />
        </>
      ) : (
        <div className="mt-1 space-y-2">
          {blocks.map((block) => (
            <div key={block.title} style={{ fontFamily: block.font }}>
              <p className="text-xs text-muted">{block.title}</p>
              <div className="flex items-center gap-2">
                <h3 className="text-xl leading-none">{block.word}</h3>
                {block.speak && block.word && <Hear text={block.word} lang="hr-HR" label="Hear the Latin word" />}
              </div>
              {block.sentence ? <p className="mt-1 text-sm leading-snug">{block.sentence}</p> : null}
            </div>
          ))}
          <GradeButtons
            onMark={(kind) => {
              grade("isv", conceptId, kind);
              noteReview("isv", conceptId, kind);
            }}
          />
          <PictureRemark langId="isv" en={en} word={latin?.word} level={level} />
        </div>
      )}
    </div>
  );
}

function ArabicBlock({ conceptId, en, fixes, ready, level }: { conceptId: string; en: string; fixes: Record<string, Fix>; ready: boolean; level: string }) {
  const mark = useConcord((s) => s.cards[cardKey("ar", conceptId)]);
  const grade = useConcord((s) => s.grade);
  const blocks = [
    { title: "Standard", entry: mergeEntry(getBaseEntry("ar", conceptId, en), fixes[cardKey("ar", conceptId)]), speech: "ar" },
    { title: "Egyptian", entry: getBaseEntry("ar-eg", conceptId, en), speech: "ar-EG" },
    { title: "Saudi", entry: getBaseEntry("ar-sa", conceptId, en), speech: "ar-SA" },
    { title: "Maghrebi", entry: getBaseEntry("ar-ma", conceptId, en), speech: "ar-MA" },
  ];
  const any = blocks.some((block) => block.entry?.word);
  return (
    <div dir="rtl" lang="ar">
      <div className="flex items-center gap-2" dir="ltr">
        <Flag id="ar" />
        <p className="text-xs tracking-widest text-muted uppercase">Arabic</p>
        <span className="ml-auto text-xs text-muted">{batchLabel(mark?.stage)}</span>
      </div>
      {!any ? (
        <>
          <p className="mt-1 text-sm text-muted" dir="ltr">
            {ready ? "Arabic does not have this word yet." : "Opening Arabic…"}
          </p>
          <PictureRemark langId="ar" en={en} level={level} />
        </>
      ) : (
        <div className="mt-1 space-y-2">
          {blocks.map((block) => {
            const entry = block.entry;
            const bits = facts(entry);
            return (
              <div key={block.title}>
                <p className="text-xs text-muted" dir="ltr">
                  {block.title}
                </p>
                {entry?.word ? (
                  <>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl leading-none">{entry.word}</h3>
                      <Hear text={entry.word} lang={block.speech} label={`Hear the ${block.title} word`} />
                    </div>
                    {entry.reading && (
                      <p className="mt-1 text-sm text-muted italic" dir="ltr">
                        {entry.reading}
                      </p>
                    )}
                    {bits.length > 0 && (
                      <p className="mt-1 text-xs text-muted" dir="ltr">
                        {bits.join(" · ")}
                      </p>
                    )}
                    {entry.sentence ? (
                      <div className="mt-1 flex items-start gap-2">
                        <p className="text-sm leading-snug">{entry.sentence}</p>
                        <Hear text={entry.sentence} lang={block.speech} label={`Hear the ${block.title} sentence`} />
                      </div>
                    ) : null}
                  </>
                ) : (
                  <p className="text-sm text-muted" dir="ltr">
                    Not in this variety yet.
                  </p>
                )}
              </div>
            );
          })}
          <GradeButtons
            onMark={(kind) => {
              grade("ar", conceptId, kind);
              noteReview("ar", conceptId, kind);
            }}
          />
          <PictureRemark langId="ar" en={en} word={blocks[0]?.entry?.word} level={level} />
        </div>
      )}
    </div>
  );
}

function Hear({ text, lang, label }: { text: string; lang: string; label: string }) {
  return (
    <button type="button" aria-label={label} onClick={() => speak(text, lang)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-paper">
      <Volume2 className="h-4 w-4" />
    </button>
  );
}
