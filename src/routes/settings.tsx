import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shell } from "@/components/concord/shell";
import { DEFAULT_VOICE, VOICES, type VoiceChoice } from "@/data/voices";
import { useConcord } from "@/lib/concord-store";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

type Status = { voices?: Record<string, Record<string, number>>; totals?: Record<string, number> };

function countOf(row?: Record<string, number>): number {
  if (!row) return 0;
  return Object.values(row).reduce((sum, n) => sum + (typeof n === "number" ? n : 0), 0);
}

function SettingsPage() {
  const voice = useConcord((s) => s.voice) || DEFAULT_VOICE;
  const setVoice = useConcord((s) => s.setVoice);
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    let live = true;
    const load = () => {
      fetch("/audio/status.json")
        .then((response) => (response.ok ? response.json() : null))
        .then((next: Status | null) => {
          if (live) setStatus(next);
        })
        .catch(() => {
          if (live) setStatus(null);
        });
    };
    load();
    const timer = window.setInterval(load, 15000);
    return () => {
      live = false;
      window.clearInterval(timer);
    };
  }, []);

  const women = VOICES.filter((item) => item.gender === "female");
  const men = VOICES.filter((item) => item.gender === "male");

  return (
    <Shell>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 md:px-6">
        <header>
          <p className="text-xs font-semibold tracking-widest text-accent uppercase">Concord</p>
          <h1 className="mt-1 text-4xl">Voice</h1>
          <p className="mt-2 text-sm text-muted">
            Hear buttons use this Grok voice. Eve is recorded in the languages Grok speaks natively: English, German, Spanish, Portuguese, Italian, French, Russian, Turkish, Chinese, Japanese, Korean, Hindi, Bengali, Arabic, Egyptian Arabic, Saudi Arabic, Indonesian, and Vietnamese. Any other language uses the voice on this device. A different Grok voice is recorded the first time you tap hear.
          </p>
          {status?.totals && (
            <p className="mt-2 text-sm text-muted">
              Native lines recorded for Eve: {countOf(status.voices?.eve).toLocaleString()} of {countOf(status.totals).toLocaleString()}.
            </p>
          )}
        </header>
        <VoiceGroup title="Women" voices={women} current={voice} status={status} onPick={setVoice} />
        <VoiceGroup title="Men" voices={men} current={voice} status={status} onPick={setVoice} />
      </div>
    </Shell>
  );
}

function VoiceGroup({
  title,
  voices,
  current,
  status,
  onPick,
}: {
  title: string;
  voices: VoiceChoice[];
  current: string;
  status: Status | null;
  onPick: (id: string) => void;
}) {
  return (
    <section>
      <h2 className="text-sm font-semibold tracking-widest text-muted uppercase">{title}</h2>
      <ul className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {voices.map((item) => {
          const counts = status?.voices?.[item.id];
          const recorded = countOf(counts);
          const on = item.id === current;
          return (
            <li key={item.id}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => onPick(item.id)}
                className={`flex min-h-14 w-full flex-col items-start rounded-2xl border px-3 py-2 text-left ${on ? "border-accent bg-accent/15" : "border-line bg-card"}`}
              >
                <span className="text-base">{item.name}</span>
                <span className="text-xs text-muted">{recorded > 0 ? `${recorded.toLocaleString()} recorded` : "On demand"}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
