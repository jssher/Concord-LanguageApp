import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { GROK_PROVIDERS, signIn } from "@/lib/auth/client";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUser, useCurrentUserState } from "@/lib/auth/use-current-user";
import { Shell } from "@/components/concord/shell";
import { getBoard, type BoardRow } from "@/lib/league/api";
import { connectTo, saveName, useStanding } from "@/lib/league/client";
import { parseHandle, parseName, suggestHandle } from "@/lib/league/name";
import { LEAGUES, leagueFor, type LeagueId } from "@/lib/league/score";
import { useWait } from "@/wait/flag";

export const Route = createFileRoute("/league")({ component: LeaguePage });

function LeaguePage() {
  const session = useCurrentUserState();
  const account = useCurrentUser();
  const standing = useStanding();
  const [board, setBoard] = useState<BoardRow[] | null>(null);
  const [boardError, setBoardError] = useState(false);
  const [editing, setEditing] = useState(false);
  const mine = standing.mine;
  const mineLeague = mine ? leagueFor(mine.score).id : "footpath";
  const [picked, setPicked] = useState<LeagueId | null>(null);
  const selected = picked ?? mineLeague;
  const league = LEAGUES.find((item) => item.id === selected) ?? LEAGUES[0];
  const rows = (board ?? []).filter((row) => leagueFor(row.score).id === selected);

  useEffect(() => {
    let live = true;
    getBoard()
      .then((next) => {
        if (live) setBoard(next);
      })
      .catch(() => {
        if (live) setBoardError(true);
      });
    return () => {
      live = false;
    };
  }, [mine?.handle, mine?.score, mine?.held]);

  const pending = session.isPending || standing.status === "loading";
  useWait(pending);

  return (
    <Shell>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8 md:px-6">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-widest text-accent uppercase">Leagues</p>
            <h1 className="mt-1 text-4xl">How much you learn, and still remember.</h1>
          </div>
          {session.user ? <UserButton /> : null}
        </header>

        {pending ? (
          <div className="h-36 animate-pulse rounded-2xl bg-chip" />
        ) : !session.user ? (
          <section className="rounded-2xl border border-line bg-card p-4">
            <h2 className="text-2xl">Sign in to take a name</h2>
            <p className="mt-2 text-sm text-muted">
              A readable name is linked to a short handle. People open that profile and can connect with you. What you already studied on this device is counted once you join.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              {GROK_PROVIDERS.map((provider) => (
                <button
                  key={provider.providerId}
                  type="button"
                  onClick={() => signIn(provider.providerId, { callbackURL: "/league" })}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-paper px-4 text-sm"
                >
                  Continue with {provider.label}
                </button>
              ))}
            </div>
          </section>
        ) : !mine || editing ? (
          <NameForm
            initialName={mine?.name || account?.displayName || ""}
            initialHandle={mine?.handle || ""}
            editing={Boolean(mine)}
            onCancel={mine ? () => setEditing(false) : undefined}
            onSaved={() => setEditing(false)}
          />
        ) : (
          <YourStanding onEdit={() => setEditing(true)} />
        )}

        {standing.status === "error" && (
          <p className="text-sm text-accent">The league could not be loaded. Study still works on this device.</p>
        )}

        <section>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {LEAGUES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setPicked(item.id)}
                className={`inline-flex min-h-10 shrink-0 items-center rounded-full px-3 text-sm ${item.id === selected ? "bg-ink text-paper" : "bg-chip text-ink"}`}
              >
                {item.name}
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-muted">
            {league.blurb} From {league.min.toLocaleString()} points{league.next ? `, and ${league.next.toLocaleString()} reaches the next league.` : "."}
          </p>
          {boardError && <p className="mt-3 text-sm text-accent">The board did not load.</p>}
          {!board && !boardError && <p className="mt-3 text-sm text-muted">Loading the board.</p>}
          {board && rows.length === 0 && <p className="mt-4 text-sm text-muted">No one is in {league.name} yet.</p>}
          {rows.length > 0 && (
            <ol className="mt-2 divide-y divide-line border-y border-line">
              {rows.map((row, index) => (
                <li key={row.handle} className="flex items-center gap-3 py-3">
                  <span className="w-6 shrink-0 tabular-nums text-muted">{index + 1}</span>
                  <div className="min-w-0 flex-1">
                    <Link to="/people/$handle" params={{ handle: row.handle }} className="block truncate font-display text-2xl">
                      {row.name}
                    </Link>
                    <p className="truncate text-sm text-muted">
                      {row.score.toLocaleString()} points · {row.held.toLocaleString()} still remembered
                    </p>
                  </div>
                  <ConnectButton handle={row.handle} />
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>
    </Shell>
  );
}

function YourStanding({ onEdit }: { onEdit: () => void }) {
  const standing = useStanding();
  const mine = standing.mine;
  if (!mine) return null;
  const league = leagueFor(mine.score);
  const left = league.next === null ? null : Math.max(0, league.next - mine.score);
  return (
    <section className="rounded-2xl border border-line bg-card p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="text-xs font-semibold tracking-widest text-muted uppercase">{league.name}</p>
          <h2 className="text-3xl">
            <Link to="/people/$handle" params={{ handle: mine.handle }}>{mine.name}</Link>
          </h2>
          <p className="text-sm text-muted">/{mine.handle}</p>
        </div>
        <button type="button" onClick={onEdit} className="text-sm text-muted underline-offset-4 hover:underline">
          Edit name
        </button>
      </div>
      <p className="mt-3 text-sm text-muted">
        {mine.streak > 0 ? `${mine.streak} ${mine.streak === 1 ? "day" : "days"} in a row. ` : ""}
        {mine.weekPoints.toLocaleString()} this week.
        {left !== null ? ` ${left.toLocaleString()} points to the next league.` : " This is the top league."}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="Score" value={mine.score.toLocaleString()} />
        <Stat label="Learned" value={mine.learned.toLocaleString()} />
        <Stat label="Remembered" value={mine.held.toLocaleString()} />
        <Stat label="Firm" value={mine.firm.toLocaleString()} />
      </div>
      <p className="mt-3 text-sm text-muted">
        A new word is 10 points. Remembering it again is 5, until you know it well. A miss keeps the word out of “still remembered” until you get it again. The same well-known word scores at most once a day.
      </p>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-paper px-3 py-3">
      <p className="text-xs tracking-widest text-muted uppercase">{label}</p>
      <p className="mt-1 font-display text-3xl tabular-nums">{value}</p>
    </div>
  );
}

function NameForm({
  initialName,
  initialHandle,
  editing,
  onCancel,
  onSaved,
}: {
  initialName: string;
  initialHandle: string;
  editing: boolean;
  onCancel?: () => void;
  onSaved: () => void;
}) {
  const suggested = parseName(initialName).ok ? initialName.trim().replace(/\s+/g, " ") : "";
  const [name, setName] = useState(initialHandle ? initialName : suggested);
  const [handle, setHandle] = useState(initialHandle || suggestHandle(suggested));
  const [touched, setTouched] = useState(Boolean(initialHandle));
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const parsedName = parseName(name);
    if (!parsedName.ok) {
      setError(parsedName.error);
      return;
    }
    const parsedHandle = parseHandle(handle);
    if (!parsedHandle.ok) {
      setError(parsedHandle.error);
      return;
    }
    setBusy(true);
    setError("");
    try {
      const result = await saveName(parsedName.value, parsedHandle.value);
      if (!result.ok) setError(result.error);
      else onSaved();
    } catch (err) {
      setError(err instanceof Error && err.message === "Unauthorized" ? "Sign in to keep this name." : "That name could not be saved.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-line bg-card p-4">
      <h2 className="text-2xl">{editing ? "Edit your name" : "What should people call you?"}</h2>
      <p className="mt-2 text-sm text-muted">
        Use a real name. Nothing rude, and no codes. The link under it is how someone opens your profile.
      </p>
      <label className="mt-4 block text-sm" htmlFor="learner-name">Name</label>
      <input
        id="learner-name"
        value={name}
        onChange={(event) => {
          const value = event.target.value;
          setName(value);
          if (!touched) setHandle(suggestHandle(value));
        }}
        autoComplete="name"
        maxLength={40}
        className="mt-1 min-h-11 w-full rounded-full border border-line bg-paper px-3"
      />
      <label className="mt-3 block text-sm" htmlFor="learner-handle">Link</label>
      <input
        id="learner-handle"
        value={handle}
        onChange={(event) => {
          setTouched(true);
          setHandle(event.target.value.toLowerCase());
        }}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        maxLength={24}
        placeholder="mina-okonkwo"
        className="mt-1 min-h-11 w-full rounded-full border border-line bg-paper px-3"
      />
      {error && <p className="mt-3 text-sm text-accent">{error}</p>}
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="submit" disabled={busy} className="inline-flex min-h-11 items-center rounded-full bg-accent px-4 text-sm text-accent-ink disabled:opacity-50">
          {busy ? "Saving" : editing ? "Save name" : "Join the league"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

function ConnectButton({ handle }: { handle: string }) {
  const standing = useStanding();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const mine = standing.mine;
  if (!mine || mine.handle === handle) return null;
  const on = mine.following.includes(handle);
  return (
    <div className="flex shrink-0 flex-col items-end gap-1">
      <button
        type="button"
        disabled={busy}
        onClick={() => {
          setBusy(true);
          setError("");
          void connectTo(handle, !on)
            .then((result) => {
              if (!result.ok) setError(result.error);
            })
            .catch(() => setError("Could not connect."))
            .finally(() => setBusy(false));
        }}
        className={`inline-flex min-h-10 items-center rounded-full border px-3 text-sm ${on ? "border-moss bg-moss text-moss-ink" : "border-line bg-paper"}`}
      >
        {busy ? "Saving" : on ? "Connected" : "Connect"}
      </button>
      {error && <span className="max-w-32 text-right text-xs text-accent">{error}</span>}
    </div>
  );
}
