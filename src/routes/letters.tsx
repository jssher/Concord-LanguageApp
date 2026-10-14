import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Volume2 } from "lucide-react";
import { Flag } from "@/components/concord/flag";
import { Shell } from "@/components/concord/shell";
import { StrokeOrder } from "@/components/concord/strokes";
import { LANGUAGES, LANG_BY_ID } from "@/data/languages";
import { loadAlphabet, type LetterChart, type LetterItem } from "@/data/letters";
import { useConcord } from "@/lib/concord-store";
import { speak, stopSpeech } from "@/lib/speech";

export const Route = createFileRoute("/letters")({ component: LettersPage });

type Row = {
  item: LetterItem;
  index: number;
  groupId: string;
  groupName: string;
  key: string;
};

function isHanGlyph(glyph: string) {
  const chars = [...glyph];
  return chars.length === 1 && /\p{Script=Han}/u.test(chars[0]);
}

function matches(item: LetterItem, needle: string) {
  if (!needle) return true;
  return `${item.glyph} ${item.name} ${item.sound} ${item.word} ${item.gloss} ${item.reading ?? ""} ${item.note ?? ""}`
    .toLowerCase()
    .includes(needle);
}

function LettersPage() {
  const focus = useConcord((s) => s.focus);
  const targets = useConcord((s) => s.targets);
  const [chart, setChart] = useState<LetterChart | null>(null);
  const [chartLang, setChartLang] = useState("");
  const [failed, setFailed] = useState(false);
  const [lang, setLang] = useState(focus && focus !== "en" ? focus : targets.find((id) => id !== "en") || "de");
  const [groupId, setGroupId] = useState("");
  const [view, setView] = useState<"chart" | "words">("chart");
  const [covered, setCovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeKey, setActiveKey] = useState("");

  useEffect(() => stopSpeech, []);

  const ids = useMemo(() => {
    const all = LANGUAGES.map((item) => item.id).filter((id) => id !== "en");
    const chosen = targets.filter((id) => id !== "en" && all.includes(id));
    const rest = all.filter((id) => !chosen.includes(id));
    return [...chosen, ...rest];
  }, [targets]);

  const current = ids.includes(lang) ? lang : (ids[0] ?? "");
  const ready = chart !== null && chartLang === current;

  useEffect(() => {
    if (!current) return;
    let live = true;
    setFailed(false);
    loadAlphabet(current)
      .then((data) => {
        if (live) {
          setChart(data);
          setChartLang(current);
        }
      })
      .catch(() => {
        if (live) setFailed(true);
      });
    return () => {
      live = false;
    };
  }, [current]);

  const meta = LANG_BY_ID.get(current);
  const shown = ready ? chart : undefined;
  const big = (shown?.groups.reduce((sum, group) => sum + group.items.length, 0) ?? 0) > 400;
  const activeGroupId =
    !big && groupId === "all" && view === "words"
      ? "all"
      : shown?.groups.some((item) => item.id === groupId)
        ? groupId
        : (shown?.groups[0]?.id ?? "");
  const needle = query.trim().toLowerCase();
  const rows = useMemo(() => {
    if (!shown) return [];
    const source =
      needle || activeGroupId === "all" ? shown.groups : shown.groups.filter((item) => item.id === activeGroupId);
    const out: Row[] = [];
    for (const group of source) {
      for (let index = 0; index < group.items.length; index += 1) {
        const item = group.items[index];
        if (!matches(item, needle)) continue;
        out.push({ item, index, groupId: group.id, groupName: group.name, key: `${group.id}-${index}` });
        if (needle && out.length >= 80) return out;
      }
    }
    return out;
  }, [shown, needle, activeGroupId]);
  const selected = rows.find((row) => row.key === activeKey) ?? rows[0];
  const han = Boolean(selected && isHanGlyph(selected.item.glyph));
  const revealed = !covered || view !== "words" || open;

  const blocks = useMemo(() => {
    const out: { key: string; title: string; items: Row[] }[] = [];
    for (const row of rows) {
      const inner = row.item.section ?? "";
      const title = activeGroupId === "all" ? (inner ? `${row.groupName} · ${inner}` : row.groupName) : inner;
      const last = out[out.length - 1];
      if (!last || last.title !== title) out.push({ key: `${title}-${row.key}`, title, items: [] });
      out[out.length - 1].items.push(row);
    }
    return out;
  }, [rows, activeGroupId]);

  useEffect(() => {
    setActiveKey("");
    setOpen(false);
    setQuery("");
  }, [current, activeGroupId, view]);

  useEffect(() => {
    if (!selected) return;
    document.getElementById(`letter-${current}-${selected.key}`)?.scrollIntoView({ block: "nearest" });
  }, [selected, current]);

  function move(step: number) {
    if (!rows.length || !selected) return;
    const at = Math.max(0, rows.findIndex((row) => row.key === selected.key));
    const next = rows[(at + step + rows.length) % rows.length];
    setActiveKey(next.key);
    setOpen(false);
    if (meta && (view === "chart" || !covered)) speak(next.item.word, meta.speech);
  }

  function reveal() {
    if (!selected || !meta) return;
    setOpen(true);
    speak(selected.item.word, meta.speech);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
      if (event.key === " " || event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        if (view === "words" && covered && !open) reveal();
        else move(1);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        move(-1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const font = meta?.font ? { fontFamily: meta.font } : undefined;
  const wordCount = rows.length;

  function chooseLang(id: string) {
    setLang(id);
    setGroupId("");
  }

  function showChart() {
    setView("chart");
    if (groupId === "all") setGroupId("");
  }

  function showWords() {
    setView("words");
  }

  return (
    <Shell scroll={false}>
      <div className="mx-auto flex h-full min-h-0 w-full max-w-6xl flex-col gap-3 px-4 py-3 md:px-6">
        <header className="flex shrink-0 flex-wrap items-center gap-2">
          <h1 className="text-3xl leading-none">Alphabet</h1>
          <label className="flex min-w-0 flex-1 items-center gap-2 sm:flex-none">
            {current && <Flag id={current} />}
            <select
              value={current}
              onChange={(event) => chooseLang(event.target.value)}
              aria-label="Alphabet language"
              className="min-h-11 min-w-0 flex-1 rounded-full border border-line bg-card px-3 text-sm sm:w-52"
            >
              {ids.map((id) => {
                const item = LANG_BY_ID.get(id);
                if (!item) return null;
                const learning = targets.includes(id);
                return (
                  <option key={id} value={id}>
                    {learning ? "● " : ""}
                    {item.name}
                  </option>
                );
              })}
            </select>
          </label>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={view === "words" ? "Find a word" : "Find a letter or word"}
            aria-label={view === "words" ? "Find a word" : "Find a letter or word"}
            className="min-h-11 min-w-0 flex-1 rounded-full border border-line bg-card px-3 text-sm sm:max-w-56"
          />
          {shown && (
            <p className="text-sm text-muted">
              {wordCount.toLocaleString()} {view === "words" ? (wordCount === 1 ? "word" : "words") : wordCount === 1 ? "letter" : "letters"}
            </p>
          )}
        </header>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <div className="flex rounded-full bg-chip p-1">
            <button
              type="button"
              aria-pressed={view === "chart"}
              onClick={showChart}
              className={`min-h-10 rounded-full px-3 text-sm ${view === "chart" ? "bg-ink text-paper" : "text-muted"}`}
            >
              Letters
            </button>
            <button
              type="button"
              aria-pressed={view === "words"}
              onClick={showWords}
              className={`min-h-10 rounded-full px-3 text-sm ${view === "words" ? "bg-ink text-paper" : "text-muted"}`}
            >
              Memory words
            </button>
          </div>
          {view === "words" && (
            <button
              type="button"
              aria-pressed={covered}
              onClick={() => {
                setCovered((value) => !value);
                setOpen(false);
              }}
              className={`min-h-10 rounded-full border px-3 text-sm ${covered ? "border-moss bg-moss text-moss-ink" : "border-line bg-card text-muted"}`}
            >
              {covered ? "Words covered" : "Cover the words"}
            </button>
          )}
        </div>
        {shown && shown.groups.length > 6 ? (
          <label className="flex min-w-0 flex-1 items-center gap-2">
            <span className="sr-only">Group</span>
            <select
              value={activeGroupId}
              onChange={(event) => setGroupId(event.target.value)}
              aria-label="Alphabet group"
              className="min-h-11 min-w-0 flex-1 rounded-full border border-line bg-card px-3 text-sm"
            >
              {shown.groups.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} · {item.items.length}
                </option>
              ))}
            </select>
          </label>
        ) : (
          shown &&
          shown.groups.length > 1 && (
            <div className="flex shrink-0 gap-1 overflow-x-auto">
              {!big && view === "words" && (
                <button
                  type="button"
                  aria-pressed={activeGroupId === "all"}
                  onClick={() => setGroupId("all")}
                  className={`shrink-0 rounded-full px-3 py-2 text-sm ${activeGroupId === "all" ? "bg-ink text-paper" : "border border-line bg-card text-muted"}`}
                >
                  All
                </button>
              )}
              {shown.groups.map((item) => {
                const on = item.id === activeGroupId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setGroupId(item.id)}
                    className={`shrink-0 rounded-full px-3 py-2 text-sm ${on ? "bg-ink text-paper" : "border border-line bg-card text-muted"}`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          )
        )}
        {!ready && !failed && <p className="text-sm text-muted">Opening this alphabet…</p>}
        {failed && <p className="text-sm text-muted">This alphabet did not open. Try it again.</p>}
        {shown && rows.length > 0 && (
          <div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-5">
            <div className="order-2 min-h-0 overflow-y-auto overscroll-contain lg:order-1 lg:col-span-3">
              {shown.note && !needle && <p className="mb-3 text-sm text-muted">{shown.note}</p>}
              {view === "chart" ? (
                blocks.map((section) => (
                  <section key={section.key} className="mb-4">
                    {section.title && (
                      <h2 className="mb-2 text-xs font-semibold tracking-widest text-muted uppercase">{section.title}</h2>
                    )}
                    <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-8 xl:grid-cols-10" dir={meta?.dir}>
                      {section.items.map((row) => {
                        const on = row.key === selected?.key;
                        return (
                          <button
                            key={row.key}
                            id={`letter-${current}-${row.key}`}
                            type="button"
                            dir={meta?.dir}
                            aria-pressed={on}
                            aria-label={`${row.item.glyph}, ${row.item.gloss}`}
                            title={`${row.item.word} · ${row.item.gloss}`}
                            onClick={() => {
                              setActiveKey(row.key);
                              if (meta) speak(row.item.word, meta.speech);
                            }}
                            style={font}
                            className={`grid min-h-11 place-items-center rounded-xl border px-1 text-xl leading-none ${on ? "border-moss bg-moss text-moss-ink" : "border-line bg-card"}`}
                          >
                            {row.item.glyph}
                          </button>
                        );
                      })}
                    </div>
                  </section>
                ))
              ) : (
                blocks.map((section) => (
                  <section key={section.key} className="mb-5">
                    {section.title && (
                      <h2 className="mb-2 text-xs font-semibold tracking-widest text-muted uppercase">{section.title}</h2>
                    )}
                    <ul className="flex flex-col gap-1.5">
                      {section.items.map((row) => {
                        const on = row.key === selected?.key;
                        const show = !covered || (on && open);
                        const same = row.item.word === row.item.glyph;
                        return (
                          <li key={row.key} id={`letter-${current}-${row.key}`} className="flex items-stretch gap-1.5">
                            <button
                              type="button"
                              dir={meta?.dir}
                              aria-pressed={on}
                              aria-label={show ? `${row.item.glyph}, ${row.item.word}, ${row.item.gloss}` : row.item.glyph}
                              onClick={() => {
                                if (row.key !== selected?.key) {
                                  setActiveKey(row.key);
                                  setOpen(false);
                                  if (!covered && meta) speak(row.item.word, meta.speech);
                                  return;
                                }
                                setOpen(true);
                                if (meta) speak(row.item.word, meta.speech);
                              }}
                              className={`grid min-h-14 min-w-0 flex-1 grid-cols-[3.25rem_minmax(0,1fr)] items-center gap-3 rounded-2xl border px-3 py-2 text-left ${on ? "border-moss bg-moss text-moss-ink" : "border-line bg-card"}`}
                            >
                              <span className="text-center text-3xl leading-none" style={font}>
                                {row.item.glyph}
                              </span>
                              {show ? (
                                <span className="min-w-0">
                                  <span className="block break-words text-lg leading-tight" style={font}>
                                    {same ? row.item.gloss : row.item.word}
                                  </span>
                                  <span className={`block break-words text-sm ${on ? "opacity-80" : "text-muted"}`}>
                                    {same
                                      ? row.item.reading || row.item.sound
                                      : `${row.item.sound}${row.item.gloss ? ` · ${row.item.gloss}` : ""}`}
                                  </span>
                                </span>
                              ) : (
                                <span className={`text-sm ${on ? "opacity-80" : "text-muted"}`}>
                                  {on ? "Space shows the word" : "Covered"}
                                </span>
                              )}
                            </button>
                            {show && meta && (
                              <Speak text={row.item.word} lang={meta.speech} label={`Hear ${row.item.word}`} />
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                ))
              )}
              {rows.length === 0 && <p className="text-sm text-muted">Nothing matches that.</p>}
              {needle && rows.length >= 80 && <p className="text-sm text-muted">Showing the first 80 matches.</p>}
              <p className="pb-2 text-xs text-muted">
                {view === "words" && covered
                  ? "Space shows the word, then the next letter. Arrows move without revealing."
                  : "Space or the arrow keys move to the next letter and say the word."}
              </p>
            </div>
            <aside className="order-1 max-h-72 overflow-y-auto rounded-2xl border border-line bg-card p-4 lg:order-2 lg:col-span-2 lg:max-h-none">
              {selected && meta ? (
                <LetterDetail
                  item={selected.item}
                  speech={meta.speech}
                  dir={meta.dir}
                  font={font}
                  han={han}
                  hidden={view === "words" && !revealed}
                  place={rows.findIndex((row) => row.key === selected.key) + 1}
                  total={rows.length}
                />
              ) : (
                <p className="text-sm text-muted">Choose a letter.</p>
              )}
            </aside>
          </div>
        )}
      </div>
    </Shell>
  );
}

function LetterDetail({
  item,
  speech,
  dir,
  font,
  han,
  hidden,
  place,
  total,
}: {
  item: LetterItem;
  speech: string;
  dir: "ltr" | "rtl";
  font?: { fontFamily: string };
  han: boolean;
  hidden: boolean;
  place: number;
  total: number;
}) {
  const same = item.word === item.glyph;
  return (
    <div>
      <p className="text-xs text-muted">
        {place} of {total}
      </p>
      <div className="mt-2 flex items-end gap-3">
        <p className="text-6xl leading-none" dir={dir} style={font}>
          {item.glyph}
        </p>
        {!hidden && same && <Speak text={item.word} lang={speech} label={`Hear ${item.word}`} />}
      </div>
      <p className="mt-2 text-sm text-muted">
        {item.name}
        {item.sound && item.sound !== item.name ? ` · ${item.sound}` : ""}
      </p>
      {hidden ? (
        <p className="mt-3 text-sm text-muted">The memory word is covered. Space shows it.</p>
      ) : (
        <>
          {!same && (
            <div className="mt-3 flex items-center gap-3">
              <p className="min-w-0 break-words text-3xl leading-tight" dir={dir} style={font}>
                {item.word}
              </p>
              <Speak text={item.word} lang={speech} label={`Hear ${item.word}`} />
            </div>
          )}
          {item.reading && <p className="mt-1 text-sm text-muted italic">{item.reading}</p>}
          <p className="mt-2 text-lg">{item.gloss}</p>
          {item.note && <p className="mt-1 text-sm text-muted">{item.note}</p>}
        </>
      )}
      {han && (
        <div className="mt-4">
          <p className="text-xs font-semibold tracking-widest text-muted uppercase">Stroke order</p>
          <div className="mt-2">
            <StrokeOrder char={item.glyph} font={font?.fontFamily} radical={item.radical} traditional={item.traditional} bare />
          </div>
        </div>
      )}
      {!hidden && (item.radical || (item.traditional && item.traditional !== item.glyph) || (item.simplified && item.simplified !== item.glyph)) && (
        <div className="mt-3 text-sm text-muted" style={font}>
          {item.radical && (
            <p>
              Radical <span className="text-xl text-ink">{item.radical}</span>
            </p>
          )}
          {item.traditional && item.traditional !== item.glyph && (
            <p className="mt-1">
              Traditional <span className="text-xl text-ink">{item.traditional}</span>
            </p>
          )}
          {item.simplified && item.simplified !== item.glyph && (
            <p className="mt-1">
              Simplified <span className="text-xl text-ink">{item.simplified}</span>
            </p>
          )}
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
      className="grid h-11 w-11 shrink-0 place-items-center self-center rounded-full border border-line bg-paper"
    >
      <Volume2 className="h-5 w-5" />
    </button>
  );
}
