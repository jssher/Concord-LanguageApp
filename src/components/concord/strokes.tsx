import { useEffect, useId, useState } from "react";

type Glyph = { strokes: string[]; medians: number[][][] };
type HanMeta = { radical?: string; traditional?: string };

const HANZI: Record<string, HanMeta> = {
  我: { radical: "戈", traditional: "我" },
  你: { radical: "亻", traditional: "你" },
  门: { radical: "门", traditional: "門" },
  床: { radical: "广", traditional: "床" },
  书: { radical: "乛", traditional: "書" },
  水: { radical: "水", traditional: "水" },
  火: { radical: "火", traditional: "火" },
  鱼: { radical: "鱼", traditional: "魚" },
  吃: { radical: "口", traditional: "吃" },
  喝: { radical: "口", traditional: "喝" },
  走: { radical: "走", traditional: "走" },
  来: { radical: "一", traditional: "來" },
  坐: { radical: "土", traditional: "坐" },
  给: { radical: "纟", traditional: "給" },
  树: { radical: "木", traditional: "樹" },
  花: { radical: "艹", traditional: "花" },
  雨: { radical: "雨", traditional: "雨" },
  山: { radical: "山", traditional: "山" },
  河: { radical: "氵", traditional: "河" },
  狗: { radical: "犭", traditional: "狗" },
  猫: { radical: "犭", traditional: "貓" },
  鸟: { radical: "鸟", traditional: "鳥" },
  手: { radical: "手", traditional: "手" },
  头: { radical: "大", traditional: "頭" },
  嘴: { radical: "口", traditional: "嘴" },
  脚: { radical: "月", traditional: "腳" },
  路: { radical: "足", traditional: "路" },
  海: { radical: "氵", traditional: "海" },
  一: { radical: "一", traditional: "一" },
  二: { radical: "二", traditional: "二" },
  大: { radical: "大", traditional: "大" },
  小: { radical: "小", traditional: "小" },
  好: { radical: "女", traditional: "好" },
  热: { radical: "灬", traditional: "熱" },
  冷: { radical: "冫", traditional: "冷" },
  红: { radical: "纟", traditional: "紅" },
  新: { radical: "斤", traditional: "新" },
  这: { radical: "辶", traditional: "這" },
};

let glyphs: Promise<Record<string, Glyph>> | null = null;
let metas: Promise<Record<string, HanMeta>> | null = null;

function loadGlyphs(): Promise<Record<string, Glyph>> {
  if (!glyphs) {
    glyphs = fetch("/hanzi/strokes.json")
      .then((response) => (response.ok ? response.json() : {}))
      .catch(() => ({}));
  }
  return glyphs;
}

function loadMeta(): Promise<Record<string, HanMeta>> {
  if (!metas) {
    metas = fetch("/hanzi/meta.json")
      .then((response) => (response.ok ? response.json() : {}))
      .catch(() => ({}));
  }
  return metas;
}

function medianPath(points: number[][]): string {
  if (!points.length) return "";
  const [x, y] = points[0];
  let path = `M ${x} ${y}`;
  for (let i = 1; i < points.length; i++) path += ` L ${points[i][0]} ${points[i][1]}`;
  return path;
}

export function hanChars(text: string, speech: string): string[] {
  const lang = speech.toLowerCase();
  if (!lang.startsWith("zh") && !lang.startsWith("yue") && !lang.startsWith("ja")) return [];
  return [...text].filter((ch) => /\p{Script=Han}/u.test(ch));
}

const glyphCache = new Map<string, Promise<Glyph | null>>();

function loadGlyph(char: string): Promise<Glyph | null> {
  const cached = glyphCache.get(char);
  if (cached) return cached;
  const code = (char.codePointAt(0) ?? 0).toString(16);
  const job = fetch(`/hanzi/c/${code}.json`)
    .then((response) => (response.ok ? response.json() : null))
    .then((row) => (row?.strokes?.length ? (row as Glyph) : null))
    .catch(() => null)
    .then(async (row) => {
      if (row) return row;
      const all = await loadGlyphs();
      return all[char] ?? null;
    });
  glyphCache.set(char, job);
  return job;
}

export function StrokeOrder({
  char,
  font,
  radical,
  traditional,
  bare = false,
  compact = false,
}: {
  char: string;
  font?: string;
  radical?: string;
  traditional?: string;
  bare?: boolean;
  compact?: boolean;
}) {
  const [glyph, setGlyph] = useState<Glyph | null | undefined>(undefined);
  const [meta, setMeta] = useState<HanMeta>(HANZI[char] ?? {});
  const [run, setRun] = useState(0);
  const clip = useId().replace(/:/g, "");
  useEffect(() => {
    let live = true;
    setGlyph(undefined);
    setMeta({ ...HANZI[char], ...(radical || traditional ? { radical, traditional } : {}) });
    Promise.all([loadGlyph(char), loadMeta()]).then(([row, extra]) => {
      if (!live) return;
      setGlyph(row);
      setMeta({
        ...HANZI[char],
        ...extra[char],
        ...(radical ? { radical } : {}),
        ...(traditional ? { traditional } : {}),
      });
    });
    return () => {
      live = false;
    };
  }, [char, radical, traditional]);
  useEffect(() => {
    if (!glyph?.strokes.length) return;
    const ms = glyph.strokes.length * 420 + 900;
    const id = window.setInterval(() => setRun((value) => value + 1), ms);
    return () => window.clearInterval(id);
  }, [glyph, char]);
  const script = font ? { fontFamily: font } : undefined;
  const form = meta.traditional && meta.traditional !== char ? meta.traditional : "";
  return (
    <div className={bare || compact ? "flex items-end gap-2" : "mt-3 flex items-end gap-3"}>
      <div className={`relative shrink-0 overflow-hidden rounded-2xl border border-line bg-paper text-ink ${compact ? "h-20 w-20" : bare ? "h-36 w-36" : "h-28 w-28 md:h-32 md:w-32"}`}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-line" aria-hidden="true">
          <path d="M50 10 V90 M10 50 H90 M16 16 L84 84 M84 16 L16 84" fill="none" stroke="currentColor" strokeWidth="0.6" />
        </svg>
        {glyph === null && (
          <span className="absolute inset-0 grid place-items-center text-5xl" style={script}>
            {char}
          </span>
        )}
        {glyph && glyph.strokes.length > 0 && (
          <svg viewBox="0 0 1024 1024" className="absolute inset-1 h-[calc(100%-8px)] w-[calc(100%-8px)]" role="img" aria-label={`Stroke order of ${char}`}>
            <g key={run} transform="translate(0 1024) scale(1 -1)">
              {glyph.strokes.map((stroke, index) => (
                <path key={`guide-${index}`} d={stroke} fill="currentColor" opacity="0.14" />
              ))}
              {glyph.strokes.map((stroke, index) => (
                <g key={`stroke-${index}`}>
                  <clipPath id={`${clip}-${index}`}>
                    <path d={stroke} />
                  </clipPath>
                  <path
                    d={medianPath(glyph.medians[index] ?? [])}
                    clipPath={`url(#${clip}-${index})`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="256"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength={1}
                    style={{
                      strokeDasharray: 1,
                      strokeDashoffset: 1,
                      animation: `hanzi-draw 0.42s ease-in ${index * 0.42}s forwards`,
                    }}
                  />
                </g>
              ))}
            </g>
          </svg>
        )}
      </div>
      {!bare && (meta.radical || form) && (
        <div className="min-w-0 pb-1 text-xs leading-snug text-muted">
          {meta.radical && (
            <p>
              Radical <span className="text-base text-ink" style={script}>{meta.radical}</span>
            </p>
          )}
          {form && (
            <p className="mt-1">
              Traditional <span className="text-base text-ink" style={script}>{form}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
