import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Flag } from "@/components/concord/flag";
import { Shell } from "@/components/concord/shell";
import { LANG_BY_ID } from "@/data/languages";
import { getComments, type CommentRow } from "@/lib/comments/api";
import { useConcord } from "@/lib/concord-store";
import { useWait } from "@/wait/flag";

export const Route = createFileRoute("/improve")({ component: CommentsPage });

type Group = {
  key: string;
  targetKind: CommentRow["targetKind"];
  targetId: string;
  label: string;
  level: string;
  bucket: string;
  comments: CommentRow[];
};

function when(iso: string): string {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return "";
  const mins = Math.round((Date.now() - t) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  const hours = Math.round(mins / 60);
  if (hours < 36) return `${hours}h`;
  const days = Math.round(hours / 24);
  if (days < 14) return `${days}d`;
  return new Date(t).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function groupOf(rows: CommentRow[]): Group[] {
  const map = new Map<string, Group>();
  for (const row of rows) {
    const key = `${row.targetKind}:${row.targetId}`;
    const found = map.get(key);
    if (found) found.comments.push(row);
    else {
      map.set(key, {
        key,
        targetKind: row.targetKind,
        targetId: row.targetId,
        label: row.label,
        level: row.level,
        bucket: row.bucket,
        comments: [row],
      });
    }
  }
  for (const group of map.values()) {
    group.comments.sort((a, b) => Date.parse(a.at) - Date.parse(b.at));
  }
  return [...map.values()].sort((a, b) => {
    const late = (group: Group) => Math.max(...group.comments.map((row) => Date.parse(row.at) || 0));
    return late(b) - late(a);
  });
}

function CommentsPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<CommentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lang, setLang] = useState("all");
  useWait(loading);

  useEffect(() => {
    let live = true;
    getComments()
      .then((board) => {
        if (live) setRows(board.comments);
      })
      .catch(() => {
        if (live) setError("The comments could not be loaded.");
      })
      .finally(() => {
        if (live) setLoading(false);
      });
    return () => {
      live = false;
    };
  }, []);

  const languages = useMemo(() => {
    const counts = new Map<string, number>();
    for (const row of rows) counts.set(row.lang, (counts.get(row.lang) ?? 0) + 1);
    return [...counts.entries()]
      .map(([id, count]) => ({ id, count, name: LANG_BY_ID.get(id)?.name ?? id }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [rows]);

  const shown = lang === "all" ? languages : languages.filter((item) => item.id === lang);

  function openGroup(language: string, group: Group) {
    const state = useConcord.getState();
    if (language !== "en" && !state.targets.includes(language) && state.targets.length < 12) {
      state.toggleTarget(language);
    }
    if (useConcord.getState().targets.includes(language)) state.setFocus(language);
    if (group.bucket === "pictures") {
      void navigate({ to: "/pictures", hash: encodeURIComponent(group.targetId) });
      return;
    }
    if (group.bucket === "grammar") {
      const hash = group.targetKind === "card"
        ? `card-${encodeURIComponent(group.targetId.slice("grammar:".length))}`
        : group.targetId;
      void navigate({ to: "/grammar", hash });
      return;
    }
    if (group.level) state.setLevel(group.level);
    if (group.bucket) state.setGroup(group.bucket);
    if (group.targetKind === "card") {
      state.setConceptId(group.targetId);
      void navigate({ to: "/study" });
      return;
    }
    if (group.targetId.includes(":")) {
      void navigate({ to: "/study" });
      return;
    }
    void navigate({ to: "/path", hash: group.targetId });
  }

  return (
    <Shell>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8 md:px-6">
        <header>
          <p className="text-xs font-semibold tracking-widest text-accent uppercase">Comments</p>
          <h1 className="mt-1 font-display text-4xl">Notes on cards and lessons</h1>
          <p className="mt-2 max-w-xl text-muted">
            A comment or a mistake report stays with the card or the lesson it was left on, and with the handle of the person who wrote it.
          </p>
        </header>

        {error ? <p className="text-sm text-accent">{error}</p> : null}

        {loading ? (
          <div className="h-36 animate-pulse rounded-2xl bg-chip" />
        ) : rows.length === 0 ? (
          <p className="text-muted">No comments yet. On a card or a lesson, leave a note or report a mistake.</p>
        ) : (
          <>
            {languages.length > 1 ? (
              <div className="flex gap-2 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setLang("all")}
                  className={`min-h-11 shrink-0 rounded-full px-4 text-sm ${lang === "all" ? "bg-ink text-paper" : "bg-chip"}`}
                >
                  All
                </button>
                {languages.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLang(item.id)}
                    className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-3 text-sm ${lang === item.id ? "bg-ink text-paper" : "bg-chip"}`}
                  >
                    <Flag id={item.id} />
                    {item.name}
                    <span className="tabular-nums opacity-70">{item.count}</span>
                  </button>
                ))}
              </div>
            ) : null}

            {shown.map((item) => {
              const groups = groupOf(rows.filter((row) => row.lang === item.id));
              return (
                <section key={item.id} className="flex flex-col gap-3">
                  <h2 className="flex items-center gap-2 text-2xl">
                    <Flag id={item.id} />
                    {item.name}
                  </h2>
                  <ul className="grid gap-3">
                    {groups.map((group) => (
                      <li key={group.key} className="rounded-2xl border border-line bg-card p-4">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <p className="min-w-0">
                            <span className="text-xs tracking-widest text-muted uppercase">
                              {group.targetKind === "card" ? "Card" : "Section"}
                              {group.level ? ` · ${group.level}` : ""}
                            </span>
                            <span className="mt-1 block text-lg">{group.label}</span>
                          </p>
                          <button
                            type="button"
                            onClick={() => openGroup(item.id, group)}
                            className="inline-flex min-h-11 items-center rounded-full border border-line px-3 text-sm"
                          >
                            Open
                          </button>
                        </div>
                        <ul className="mt-3 grid gap-3">
                          {group.comments.map((comment) => (
                            <li key={comment.id}>
                              <p className="text-sm text-muted">
                                <Link to="/people/$handle" params={{ handle: comment.handle }} className="font-semibold text-ink">
                                  /{comment.handle}
                                </Link>
                                {comment.kind === "mistake" ? <span className="text-accent"> · Mistake</span> : null}
                                {comment.at ? ` · ${when(comment.at)}` : ""}
                              </p>
                              <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed">{comment.body}</p>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </>
        )}
      </div>
    </Shell>
  );
}
