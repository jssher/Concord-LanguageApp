import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DIALOGUE_EN, DIALOGUES } from "@/data/dialogues";
import { LEXICON } from "@/data/lexicon";
import { LANG_BY_ID } from "@/data/languages";
import { Shell } from "@/components/concord/shell";
import { useConcord } from "@/lib/concord-store";
import { speak, stopSpeech } from "@/lib/speech";

export const Route = createFileRoute("/talk")({ component: TalkPage });

function TalkPage() {
  const focus = useConcord((s) => s.focus);
  const source = useConcord((s) => s.source);
  const targets = useConcord((s) => s.targets);
  const setFocus = useConcord((s) => s.setFocus);
  const [showMeaning, setShowMeaning] = useState(true);
  const lang = LANG_BY_ID.get(focus);
  const sourceLang = LANG_BY_ID.get(source);
  const pack = LEXICON[focus];
  const sourcePack = LEXICON[source];
  const chorus = targets.filter((id) => id !== focus && LEXICON[id]).slice(0, 12);

  return (
    <Shell>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8 md:px-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold tracking-widest text-accent uppercase">Conversations</p>
            <h1 className="mt-2 text-5xl">Three scenes, one meaning.</h1>
          </div>
          <button type="button" onClick={() => setShowMeaning((v) => !v)} className="min-h-11 rounded-full border border-line bg-card px-4">
            {showMeaning ? "Hide the meaning" : "Show the meaning"}
          </button>
        </header>
        <div className="flex gap-2 overflow-x-auto">
          {targets.filter((id) => LEXICON[id]).map((id) => {
            const item = LANG_BY_ID.get(id);
            if (!item) return null;
            return (
              <button key={id} type="button" onClick={() => { stopSpeech(); setFocus(id); }} className={`min-h-11 shrink-0 rounded-full px-3 ${id === focus ? "bg-ink text-paper" : "bg-chip"}`}>
                {item.name}
              </button>
            );
          })}
        </div>
        {DIALOGUES.map((dialogue) => (
          <section key={dialogue.id} className="rounded-2xl border border-line bg-card">
            <header className="border-b border-line px-5 py-4">
              <h2 className="text-3xl">{dialogue.title}</h2>
              <p className="text-muted">{dialogue.scene}</p>
            </header>
            <ol>
              {dialogue.turns.map((turn) => {
                const line = pack?.lines[turn.id];
                const meaning = sourcePack?.lines[turn.id] ?? DIALOGUE_EN[turn.id];
                return (
                  <li key={turn.id} className="border-b border-line px-5 py-4 last:border-b-0">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-xs tracking-widest text-muted uppercase">{turn.speaker}</p>
                      <button
                        type="button"
                        className="min-h-11 rounded-full px-3 text-sm text-accent"
                        onClick={() => line && lang && speak(line, lang.speech)}
                      >
                        Listen
                      </button>
                    </div>
                    <p className="text-2xl leading-snug" dir={lang?.dir} lang={lang?.speech} style={{ fontFamily: lang?.font }}>
                      {line ?? "This line is not in the lexicon yet."}
                    </p>
                    {focus === "ar" && (
                      <ul className="mt-2 space-y-1">
                        {([
                          ["Egyptian", "ar-eg", "ar-EG"],
                          ["Saudi", "ar-sa", "ar-SA"],
                        ] as const).map(([label, id, speech]) => {
                          const text = LEXICON[id]?.lines[turn.id];
                          if (!text) return null;
                          return (
                            <li key={id} className="flex items-start justify-between gap-3 text-lg" dir="rtl">
                              <p>
                                <span className="mr-2 text-xs tracking-wide text-muted uppercase" dir="ltr">{label}</span>
                                {text}
                              </p>
                              <button type="button" className="min-h-11 shrink-0 rounded-full px-3 text-sm text-accent" onClick={() => speak(text, speech)}>
                                Listen
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                    {showMeaning && source !== focus && (
                      <p className="mt-2 text-muted" dir={sourceLang?.dir} lang={sourceLang?.speech}>
                        {meaning}
                      </p>
                    )}
                    {chorus.length > 0 && (
                      <ul className="mt-3 space-y-1 text-sm text-muted">
                        {chorus.slice(0, 12).map((id) => {
                          const other = LANG_BY_ID.get(id);
                          const text = LEXICON[id]?.lines[turn.id];
                          if (!other || !text) return null;
                          return (
                            <li key={id} dir={other.dir} lang={other.speech} style={{ fontFamily: other.font }}>
                              <span className="mr-2 text-xs tracking-wide uppercase">{other.name}</span>
                              {text}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </Shell>
  );
}
