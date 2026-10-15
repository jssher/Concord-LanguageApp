import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Shell } from "@/components/concord/shell";
import { GROK_PROVIDERS, signIn } from "@/lib/auth/client";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  castVote,
  getMarks,
  getNotes,
  postNote,
  postReply,
  refreshNote,
  writeBrief,
  type NoteBoard,
  type NoteCard,
} from "@/lib/notes/api";
import { useWait } from "@/wait/flag";

export const Route = createFileRoute("/improve")({ component: ImprovePage });

const EMPTY: NoteBoard = { notes: [], brief: null, briefAt: null, stale: false };

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

function needsFold(note: NoteCard): boolean {
  if (!note.summarizedAt) return false;
  const mark = Date.parse(note.summarizedAt);
  return note.replies.some((reply) => Date.parse(reply.at) > mark);
}

function applyVotes(board: NoteBoard, votes: { id: number; vote: -1 | 1 }[]): NoteBoard {
  const mine = new Map(votes.map((vote) => [vote.id, vote.vote]));
  return {
    ...board,
    notes: board.notes.map((note) => ({ ...note, mine: mine.get(note.id) ?? 0 })),
  };
}

function SignInRow() {
  return (
    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
      {GROK_PROVIDERS.map((provider) => (
        <button
          key={provider.providerId}
          type="button"
          onClick={() => signIn(provider.providerId, { callbackURL: "/improve" })}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-paper px-4 text-sm"
        >
          Continue with {provider.label}
        </button>
      ))}
    </div>
  );
}

function ImprovePage() {
  const session = useCurrentUserState();
  const [board, setBoard] = useState<NoteBoard>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const signedIn = Boolean(session.user);

  useWait(loading || busy || session.isPending);

  useEffect(() => {
    if (session.isPending) return;
    let live = true;
    setLoading(true);
    getNotes()
      .then(async (next) => {
        if (!live) return;
        if (!session.user) {
          setBoard(next);
          return;
        }
        try {
          const marks = await getMarks();
          if (live) setBoard(applyVotes(next, marks.votes));
        } catch {
          if (live) setBoard(next);
        }
      })
      .catch(() => {
        if (live) setError("The notes could not be loaded.");
      })
      .finally(() => {
        if (live) setLoading(false);
      });
    return () => {
      live = false;
    };
  }, [session.isPending, session.user?.id]);

  async function run(task: () => Promise<{ ok: true; board: NoteBoard; warning?: string } | { ok: false; error: string }>) {
    setBusy(true);
    setError("");
    try {
      const result = await task();
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setBoard(result.board);
      if (result.warning) setError(result.warning);
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      setError(message.includes("Unauthorized") ? "Sign in to write." : message || "That did not save.");
    } finally {
      setBusy(false);
    }
  }

  function onPost(event: FormEvent) {
    event.preventDefault();
    const body = draft.trim();
    if (body.length < 8) {
      setError("Write a little more about the change.");
      return;
    }
    void run(async () => {
      const result = await postNote({ data: { body } });
      if (result.ok) setDraft("");
      return result;
    });
  }

  return (
    <Shell>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8 md:px-6">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-widest text-accent uppercase">Improve</p>
            <h1 className="mt-1 font-display text-4xl">What should change</h1>
            <p className="mt-2 max-w-xl text-muted">
              Leave a note. Grok answers each one. A reply can correct it. The brief is written only after something new arrives.
            </p>
          </div>
          {session.user ? <UserButton /> : null}
        </header>

        <Brief board={board} busy={busy} signedIn={signedIn} onWrite={() => void run(() => writeBrief())} />

        {error ? <p className="text-sm text-accent">{error}</p> : null}

        {signedIn ? (
          <form onSubmit={onPost} className="flex flex-col gap-3">
            <label className="text-sm text-muted" htmlFor="note-draft">
              A change you want
            </label>
            <textarea
              id="note-draft"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              maxLength={800}
              rows={3}
              placeholder="What should Concord do differently?"
              className="w-full resize-y rounded-2xl border border-line bg-card px-4 py-3 text-base outline-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={busy || draft.trim().length < 8}
                className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm text-accent-ink disabled:opacity-40"
              >
                Post
              </button>
            </div>
          </form>
        ) : session.isPending || loading ? (
          <div className="h-24 animate-pulse rounded-2xl bg-chip" />
        ) : (
          <section className="rounded-2xl border border-line bg-card p-4">
            <h2 className="text-2xl">Sign in to leave a note</h2>
            <p className="mt-2 text-sm text-muted">Notes, votes, and replies are kept with your name.</p>
            <SignInRow />
          </section>
        )}

        {loading ? (
          <div className="h-36 animate-pulse rounded-2xl bg-chip" />
        ) : board.notes.length === 0 && !error ? (
          <p className="text-muted">No notes yet. A useful one is turned into a short instruction. The rest just get a thank-you.</p>
        ) : board.notes.length > 0 ? (
          <ul className="grid gap-4">
            {board.notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                signedIn={signedIn}
                busy={busy}
                onVote={(vote) => {
                  if (!signedIn) {
                    setError("Sign in to vote.");
                    return;
                  }
                  void run(() => castVote({ data: { noteId: note.id, vote } }));
                }}
                onReply={(body) => void run(() => postReply({ data: { noteId: note.id, body } }))}
                onRefresh={() => void run(() => refreshNote({ data: { noteId: note.id } }))}
              />
            ))}
          </ul>
        ) : null}
      </div>
    </Shell>
  );
}

function Brief({
  board,
  busy,
  signedIn,
  onWrite,
}: {
  board: NoteBoard;
  busy: boolean;
  signedIn: boolean;
  onWrite: () => void;
}) {
  const canWrite = signedIn && board.notes.length > 0 && (board.stale || !board.brief);
  return (
    <section className="rounded-2xl border border-line bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl">Brief</h2>
        <button
          type="button"
          disabled={!canWrite || busy}
          onClick={onWrite}
          className="inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-sm text-paper disabled:opacity-40"
        >
          {board.brief ? "Update the brief" : "Write the brief"}
        </button>
      </div>
      {board.brief ? (
        <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap">{board.brief}</p>
      ) : (
        <p className="mt-3 text-sm text-muted">
          Grok writes this once, as ranked instructions. It stays shut until a new note arrives, or a note’s summary changes.
        </p>
      )}
      {board.brief && !board.stale ? (
        <p className="mt-3 text-xs text-muted">Nothing new since this brief.</p>
      ) : null}
      {board.stale && board.brief ? (
        <p className="mt-3 text-xs text-muted">New notes are in. The brief can be written again.</p>
      ) : null}
      {!signedIn && board.notes.length > 0 ? (
        <p className="mt-3 text-xs text-muted">Sign in to ask Grok for the brief.</p>
      ) : null}
    </section>
  );
}

function NoteItem({
  note,
  signedIn,
  busy,
  onVote,
  onReply,
  onRefresh,
}: {
  note: NoteCard;
  signedIn: boolean;
  busy: boolean;
  onVote: (vote: -1 | 1) => void;
  onReply: (body: string) => void;
  onRefresh: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const fold = needsFold(note);
  const unread = !note.kind && note.tries < 3;

  function send(event: FormEvent) {
    event.preventDefault();
    const body = text.trim();
    if (body.length < 2) return;
    onReply(body);
    setText("");
    setOpen(false);
  }

  return (
    <li className="flex gap-2 rounded-2xl border border-line bg-card p-3 sm:gap-3 sm:p-4">
      <div className="flex shrink-0 flex-col items-center">
        <button
          type="button"
          aria-label="Upvote"
          disabled={busy}
          onClick={() => onVote(1)}
          className={`grid size-11 place-items-center rounded-full ${note.mine === 1 ? "bg-ink text-paper" : "text-muted"}`}
        >
          <ChevronUp className="size-5" />
        </button>
        <span className={`text-sm tabular-nums ${note.score < 0 ? "text-accent" : note.score > 0 ? "text-ink" : "text-muted"}`}>
          {note.score}
        </span>
        <button
          type="button"
          aria-label="Downvote"
          disabled={busy}
          onClick={() => onVote(-1)}
          className={`grid size-11 place-items-center rounded-full ${note.mine === -1 ? "bg-ink text-paper" : "text-muted"}`}
        >
          <ChevronDown className="size-5" />
        </button>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-muted">
          <span className="font-semibold text-ink">{note.author}</span>
          {note.at ? ` · ${when(note.at)}` : ""}
        </p>
        <p className="mt-1 whitespace-pre-wrap text-base leading-relaxed">{note.body}</p>
        {note.grok ? (
          <div className="mt-3 rounded-2xl bg-chip px-3 py-3">
            <p className="text-xs font-semibold tracking-widest text-muted uppercase">Grok</p>
            <p className={`mt-1 text-sm leading-relaxed whitespace-pre-wrap ${note.kind === "thanks" ? "text-muted" : ""}`}>
              {note.grok}
            </p>
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted">Grok has not read this note yet.</p>
        )}
        {note.replies.length > 0 ? (
          <ul className="mt-3 grid gap-3 border-l border-line pl-3">
            {note.replies.map((reply) => (
              <li key={reply.id}>
                <p className="text-sm text-muted">
                  <span className="font-semibold text-ink">{reply.author}</span>
                  {reply.at ? ` · ${when(reply.at)}` : ""}
                </p>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed">{reply.body}</p>
              </li>
            ))}
          </ul>
        ) : null}
        {signedIn ? (
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm"
            >
              Reply
            </button>
            {unread || fold ? (
              <button
                type="button"
                disabled={busy}
                onClick={onRefresh}
                className="inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-sm text-paper disabled:opacity-40"
              >
                {fold ? "Update the summary" : "Ask Grok"}
              </button>
            ) : null}
          </div>
        ) : null}
        {open ? (
          <form onSubmit={send} className="mt-3 flex flex-col gap-2">
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              maxLength={500}
              rows={2}
              aria-label="Reply"
              placeholder="Agree, correct it, or add a point."
              className="w-full resize-y rounded-2xl border border-line bg-paper px-3 py-2 text-sm outline-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={busy || text.trim().length < 2}
                className="inline-flex min-h-11 items-center rounded-full bg-accent px-4 text-sm text-accent-ink disabled:opacity-40"
              >
                Send
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </li>
  );
}
