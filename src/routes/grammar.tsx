import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Flag } from "@/components/concord/flag";
import { Shell } from "@/components/concord/shell";
import { GRAMMAR_SECTIONS, grammarGuide, sectionFromHash, type GrammarSectionId } from "@/data/grammar-guide";
import { LANG_BY_ID, LANGUAGES } from "@/data/languages";
import { useConcord } from "@/lib/concord-store";
import { translateGrammar, type GrammarTranslation } from "@/lib/translate-grammar";

export const Route = createFileRoute("/grammar")({ component: GrammarPage });

function GrammarPage() {
  const focus = useConcord((s) => s.focus);
  const [langId, setLangId] = useState(focus || "en");
  const [sectionId, setSectionId] = useState<GrammarSectionId>("rules");
  const [into, setInto] = useState("");
  const [translation, setTranslation] = useState<GrammarTranslation | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const request = useRef(0);
  const ids = useMemo(
    () => LANGUAGES.map((item) => item.id).sort((a, b) => (LANG_BY_ID.get(a)?.name ?? a).localeCompare(LANG_BY_ID.get(b)?.name ?? b, "en")),
    [],
  );
  const current = ids.includes(langId) ? langId : "en";
  const lang = LANG_BY_ID.get(current);
  const intoLang = into ? LANG_BY_ID.get(into) : undefined;
  const guide = grammarGuide(current);
  const section = guide.find((item) => item.id === sectionId) ?? guide[0];
  const shown = translation ?? null;

  useEffect(() => {
    const next = sectionFromHash(window.location.hash.replace("#", ""));
    if (next) setSectionId(next);
  }, [current]);

  useEffect(() => {
    request.current += 1;
    setTranslation(null);
    setError("");
  }, [current, sectionId, into]);

  function chooseSection(id: GrammarSectionId) {
    setSectionId(id);
    window.history.replaceState(null, "", `#${id}`);
  }

  function askTranslation() {
    if (!section || !intoLang || intoLang.id === "en") return;
    const ticket = request.current;
    setBusy(true);
    setError("");
    void translateGrammar({
      data: {
        intoName: intoLang.name,
        about: lang?.name ?? current,
        summary: section.summary,
        body: section.body,
        points: section.points,
        caption: section.table?.caption ?? "",
        heads: section.table?.heads ?? [],
        glosses: section.samples.map((sample) => sample.gloss),
      },
    })
      .then((result) => {
        if (ticket !== request.current) return;
        if (!result.ok) {
          setTranslation(null);
          setError(result.error);
          return;
        }
        setTranslation(result.text);
      })
      .catch(() => {
        if (ticket !== request.current) return;
        setTranslation(null);
        setError("Grok could not translate this.");
      })
      .finally(() => {
        if (ticket === request.current) setBusy(false);
      });
  }

  const summary = shown?.summary || section?.summary || "";
  const body = shown?.body || section?.body || "";
  const points = shown?.points?.length ? shown.points : section?.points ?? [];
  const glosses = shown?.glosses?.length === section?.samples.length ? shown.glosses : null;
  const heads = shown && section?.table && shown.heads.length === section.table.heads.length ? shown.heads : section?.table?.heads;
  const caption = shown?.caption || section?.table?.caption;
  const explainDir = shown && intoLang ? intoLang.dir : "ltr";
  const explainFont = shown && intoLang?.font ? { fontFamily: intoLang.font } : undefined;

  return (
    <Shell>
      <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 py-6 pb-16 md:grid-cols-[15rem_minmax(0,1fr)] md:px-6">
        <aside className="flex flex-col gap-3">
          <header>
            <h1 className="text-3xl leading-none">Grammar</h1>
            <p className="mt-2 text-sm text-muted">Explained in English. The examples stay in the language you pick.</p>
          </header>
          <label className="flex min-w-0 items-center gap-2">
            {current && <Flag id={current} />}
            <select
              value={current}
              onChange={(event) => setLangId(event.target.value)}
              aria-label="Language to explain"
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
          <div className="rounded-2xl border border-line bg-card p-3">
            <label className="block text-xs tracking-widest text-muted uppercase" htmlFor="grammar-into">
              Translate to
            </label>
            <select
              id="grammar-into"
              value={into}
              onChange={(event) => setInto(event.target.value)}
              className="mt-2 min-h-11 w-full rounded-full border border-line bg-paper px-3 text-sm"
            >
              <option value="">English</option>
              {ids
                .filter((id) => id !== "en")
                .map((id) => {
                  const item = LANG_BY_ID.get(id);
                  if (!item) return null;
                  return (
                    <option key={id} value={id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
            <button
              type="button"
              disabled={!into || into === "en" || busy}
              onClick={askTranslation}
              className="mt-2 min-h-11 w-full rounded-full bg-ink px-3 text-sm text-paper disabled:opacity-50"
            >
              {busy ? "Translating…" : "Translate with Grok"}
            </button>
            {error && <p className="mt-2 text-sm text-muted">{error}</p>}
          </div>
          <div className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
            {GRAMMAR_SECTIONS.map((item) => {
              const on = item.id === section?.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => chooseSection(item.id)}
                  className={`min-h-11 shrink-0 rounded-2xl px-3 py-2 text-left md:w-full ${on ? "bg-ink text-paper" : "bg-card"}`}
                >
                  <span className="block text-sm font-semibold">{item.title}</span>
                  <span className={`block text-xs ${on ? "text-paper/80" : "text-muted"}`}>{item.blurb}</span>
                </button>
              );
            })}
          </div>
        </aside>
        {section && lang && (
          <article className="min-w-0">
            <p className="text-xs font-semibold tracking-widest text-accent uppercase">
              {lang.name} · {section.title}
              {shown && intoLang ? ` · ${intoLang.name}` : ""}
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl" dir={explainDir} style={explainFont}>
              {summary}
            </h2>
            <p className="mt-4 text-lg leading-snug" dir={explainDir} style={explainFont}>
              {body}
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {points.map((point) => (
                <li key={point} className="rounded-2xl bg-card px-3 py-2" dir={explainDir} style={explainFont}>
                  {point}
                </li>
              ))}
            </ul>
            {section.table && heads && (
              <div className="mt-5 overflow-x-auto rounded-2xl border border-line">
                <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
                  <caption className="border-b border-line px-3 py-2 text-left text-xs tracking-widest text-muted uppercase" dir={explainDir} style={explainFont}>
                    {caption}
                  </caption>
                  <thead>
                    <tr>
                      {heads.map((head, index) => (
                        <th key={`${head}-${index}`} className="px-3 py-2 font-semibold" dir={explainDir} style={explainFont}>
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row) => (
                      <tr key={row.join("|")} className="border-t border-line">
                        {row.map((cell, index) => (
                          <td
                            key={`${cell}-${index}`}
                            dir={index === 0 ? explainDir : lang.dir}
                            className="px-3 py-2"
                            style={index === 0 ? explainFont : lang.font ? { fontFamily: lang.font } : undefined}
                          >
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
              {section.samples.map((sample, index) => (
                <li key={sample.text} className="rounded-2xl border border-line bg-card px-4 py-3">
                  <p className="text-2xl leading-snug" dir={lang.dir} lang={lang.speech} style={{ fontFamily: lang.font }}>
                    {sample.text}
                  </p>
                  <p className="mt-1 text-sm text-muted" dir={explainDir} style={explainFont}>
                    {glosses ? glosses[index] : sample.gloss}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        )}
      </div>
    </Shell>
  );
}
