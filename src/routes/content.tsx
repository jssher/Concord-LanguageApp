import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Flag } from "@/components/concord/flag";
import { Shell } from "@/components/concord/shell";

type LevelCount = { words: number; sentences: number };
type Row = {
  id: string;
  name: string;
  native: string;
  family: string;
  words: number;
  sentences: number;
  same: number;
  levels: Record<"a1" | "a2" | "b1" | "b2" | "p", LevelCount>;
  note: string;
};
type Coverage = { course: Record<string, number>; languages: Row[] };

const LEVELS = [
  ["a1", "A1"],
  ["a2", "A2"],
  ["b1", "B1"],
  ["b2", "B2"],
  ["p", "Phrases"],
] as const;

export const Route = createFileRoute("/content")({ component: ContentPage });

function ContentPage() {
  const [data, setData] = useState<Coverage | null>(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"course" | "lines" | "words">("course");

  useEffect(() => {
    let live = true;
    fetch("/course/coverage.json")
      .then((response) => (response.ok ? response.json() : null))
      .then((next: Coverage | null) => {
        if (live) setData(next ?? { course: {}, languages: [] });
      })
      .catch(() => {
        if (live) setData({ course: {}, languages: [] });
      });
    return () => {
      live = false;
    };
  }, []);

  const courseTotal = data ? Object.values(data.course).reduce((sum, count) => sum + count, 0) : 0;
  const rows = useMemo(() => {
    if (!data) return [];
    const needle = query.trim().toLowerCase();
    const list = data.languages.filter((row) => {
      if (!needle) return true;
      return `${row.name} ${row.native} ${row.family}`.toLowerCase().includes(needle);
    });
    if (sort === "lines") return [...list].sort((a, b) => a.sentences - b.sentences || a.name.localeCompare(b.name));
    if (sort === "words") return [...list].sort((a, b) => a.words - b.words || a.name.localeCompare(b.name));
    return list;
  }, [data, query, sort]);

  const full = data?.languages.filter((row) => row.id !== "en" && courseTotal > 0 && row.sentences >= courseTotal).length ?? 0;
  const short = data?.languages.filter((row) => row.sentences < row.words).length ?? 0;

  return (
    <Shell>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 md:px-6">
        <header>
          <p className="text-xs font-semibold tracking-widest text-accent uppercase">Concord</p>
          <h1 className="mt-1 text-4xl">What each language has</h1>
          <p className="mt-2 max-w-3xl text-sm text-muted">
            {data
              ? `${data.languages.length} rows. ${full} languages have a line on every card. ${short} still have words without a matching line. A cell is words / lines.`
              : "Opening the counts…"}
          </p>
          {data && courseTotal > 0 && (
            <p className="mt-1 text-sm text-muted">
              The course is {courseTotal.toLocaleString()} cards
              {Object.entries(data.course).map(([level, count]) => ` · ${level} ${count.toLocaleString()}`).join("")}.
            </p>
          )}
        </header>
        <div className="flex flex-wrap items-center gap-2">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find a language"
            aria-label="Find a language"
            className="min-h-11 min-w-0 flex-1 rounded-full border border-line bg-card px-3 text-sm"
          />
          {(
            [
              ["course", "Course order"],
              ["lines", "Fewest lines"],
              ["words", "Fewest words"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setSort(id)}
              className={`min-h-11 rounded-full px-3 text-sm ${sort === id ? "bg-ink text-paper" : "bg-chip"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto rounded-2xl border border-line bg-card">
          <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
            <thead className="sticky top-0 bg-chip text-xs tracking-wide text-muted uppercase">
              <tr>
                <th className="px-3 py-2 font-semibold">Language</th>
                <th className="px-3 py-2 text-right font-semibold">Words</th>
                <th className="px-3 py-2 text-right font-semibold">Lines</th>
                {LEVELS.map(([id, label]) => (
                  <th key={id} className="px-3 py-2 text-right font-semibold">{label}</th>
                ))}
                <th className="px-3 py-2 text-right font-semibold">Still English</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const share = courseTotal ? Math.round((row.sentences / courseTotal) * 100) : 0;
                return (
                  <tr key={row.id} className="border-t border-line">
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <Flag id={row.id} />
                        <div className="min-w-0">
                          <p className="truncate">{row.name}</p>
                          <p className="truncate text-xs text-muted">{row.native}{row.note ? ` · ${row.note}` : ""}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">{row.words.toLocaleString()}</td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {row.sentences.toLocaleString()}
                      <span className="ml-1 text-xs text-muted">{share}%</span>
                    </td>
                    {LEVELS.map(([id]) => {
                      const cell = row.levels[id];
                      const bare = cell.words > 0 && cell.sentences === 0;
                      return (
                        <td key={id} className={`px-3 py-2 text-right tabular-nums ${bare ? "text-muted" : ""}`}>
                          {cell.words.toLocaleString()}
                          <span className="text-muted"> / {cell.sentences.toLocaleString()}</span>
                        </td>
                      );
                    })}
                    <td className={`px-3 py-2 text-right tabular-nums ${row.same ? "text-muted" : ""}`}>{row.same.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {data && rows.length === 0 && <p className="px-3 py-6 text-sm text-muted">No language matches that.</p>}
        </div>
      </div>
    </Shell>
  );
}
