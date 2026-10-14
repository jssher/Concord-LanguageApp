import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Shell } from "@/components/concord/shell";
import { Flag } from "@/components/concord/flag";
import { LANG_BY_ID } from "@/data/languages";
import { getPerson, type Person } from "@/lib/league/api";
import { connectTo, useStanding } from "@/lib/league/client";
import { leagueFor } from "@/lib/league/score";

export const Route = createFileRoute("/people/$handle")({ component: PersonPage });

function PersonPage() {
  const { handle } = Route.useParams();
  const session = useCurrentUserState();
  const standing = useStanding();
  const [person, setPerson] = useState<Person | null | undefined>(undefined);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let live = true;
    setPerson(undefined);
    getPerson({ data: handle })
      .then((row) => {
        if (live) setPerson(row);
      })
      .catch(() => {
        if (live) setPerson(null);
      });
    return () => {
      live = false;
    };
  }, [handle]);

  const mine = standing.mine;
  const connected = Boolean(mine && person && mine.following.includes(person.handle));
  const self = Boolean(mine && person && mine.handle === person.handle);

  return (
    <Shell>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 md:px-6">
        <p className="text-sm">
          <Link to="/league" className="text-muted">League</Link>
        </p>
        {person === undefined && <div className="h-36 animate-pulse rounded-2xl bg-chip" />}
        {person === null && (
          <div>
            <h1 className="text-4xl">No one uses that link.</h1>
            <p className="mt-2 text-muted">Check the spelling, or look for them on the league board.</p>
          </div>
        )}
        {person && (
          <>
            <header>
              <p className="text-xs font-semibold tracking-widest text-accent uppercase">{leagueFor(person.score).name}</p>
              <h1 className="mt-1 text-4xl">{person.name}</h1>
              <p className="text-muted">/{person.handle}</p>
              <p className="mt-3 max-w-xl text-sm text-muted">
                {person.learned.toLocaleString()} learned · {person.held.toLocaleString()} still remembered · {person.firm.toLocaleString()} firm.
                {person.streak > 0 ? ` ${person.streak} ${person.streak === 1 ? "day" : "days"} in a row.` : ""}
                {` ${person.weekPoints.toLocaleString()} this week.`}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {self ? (
                  <Link to="/league" className="inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-sm text-paper">
                    This is you
                  </Link>
                ) : mine ? (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => {
                      setBusy(true);
                      setError("");
                      void connectTo(person.handle, !connected)
                        .then((result) => {
                          if (!result.ok) setError(result.error);
                        })
                        .catch(() => setError("Could not connect."))
                        .finally(() => setBusy(false));
                    }}
                    className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm ${connected ? "bg-moss text-moss-ink" : "bg-accent text-accent-ink"}`}
                  >
                    {busy ? "Saving" : connected ? "Connected" : "Connect"}
                  </button>
                ) : !session.isPending && !session.user ? (
                  <Link to="/login" className="inline-flex min-h-11 items-center rounded-full bg-accent px-4 text-sm text-accent-ink">
                    Sign in to connect
                  </Link>
                ) : null}
                <button
                  type="button"
                  onClick={() => {
                    const url = new URL(`/people/${person.handle}`, window.location.href).toString();
                    void navigator.clipboard?.writeText(url).then(() => {
                      setCopied(true);
                      window.setTimeout(() => setCopied(false), 1600);
                    }).catch(() => setCopied(false));
                  }}
                  className="inline-flex min-h-11 items-center rounded-full border border-line bg-card px-4 text-sm"
                >
                  {copied ? "Copied" : "Copy link"}
                </button>
              </div>
              {error && <p className="mt-2 text-sm text-accent">{error}</p>}
            </header>

            <section className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Stat label="Score" value={person.score.toLocaleString()} />
              <Stat label="Learned" value={person.learned.toLocaleString()} />
              <Stat label="Remembered" value={person.held.toLocaleString()} />
              <Stat label="Firm" value={person.firm.toLocaleString()} />
            </section>

            {person.languages.length > 0 && (
              <section>
                <h2 className="text-2xl">Studying</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {person.languages.map((id) => {
                    const lang = LANG_BY_ID.get(id);
                    if (!lang) return null;
                    return (
                      <li key={id} className="inline-flex min-h-10 items-center gap-2 rounded-full bg-chip px-3 text-sm">
                        <Flag id={id} />
                        {lang.name}
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}

            <section>
              <h2 className="text-2xl">Connected with</h2>
              {person.with.length === 0 ? (
                <p className="mt-2 text-sm text-muted">No one yet.</p>
              ) : (
                <ul className="mt-2 divide-y divide-line border-y border-line">
                  {person.with.map((item) => (
                    <li key={item.handle}>
                      <Link to="/people/$handle" params={{ handle: item.handle }} className="flex min-h-12 items-baseline gap-3 py-2">
                        <span className="font-display text-xl">{item.name}</span>
                        <span className="text-sm text-muted">/{item.handle}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
    </Shell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-card px-3 py-3">
      <p className="text-xs tracking-widest text-muted uppercase">{label}</p>
      <p className="mt-1 font-display text-3xl tabular-nums">{value}</p>
    </div>
  );
}
