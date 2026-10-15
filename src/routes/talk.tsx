import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DIALOGUE_EN, DIALOGUES, TALK_DOMAINS, TALK_LEVELS, type TalkDomain, type TalkLevel } from "@/data/dialogues";
import { TALK_MORE } from "@/data/talk-more";
import { TALK_EXTRA } from "@/data/talk-extra";
import { LEXICON, useLexicons } from "@/data/lexicon";
import { LANG_BY_ID } from "@/data/languages";
import { Shell } from "@/components/concord/shell";
import { useConcord } from "@/lib/concord-store";
import { speak, stopSpeech } from "@/lib/speech";
import { useWait } from "@/wait/flag";

export const Route = createFileRoute("/talk")({ component: TalkPage });

function lineFor(langId: string, id: string): string | undefined {
  return LEXICON[langId]?.lines[id] ?? TALK_EXTRA[langId]?.[id];
}

function english(turn: { id: string; en?: string }): string | undefined {
  return DIALOGUE_EN[turn.id] ?? turn.en;
}

function TalkPage() {
  const focus = useConcord((s) => s.focus);
  const source = useConcord((s) => s.source);
  const targets = useConcord((s) => s.targets);
  const setFocus = useConcord((s) => s.setFocus);
  const linesReady = useLexicons(targets);
  useWait(!linesReady);
  const [showMeaning, setShowMeaning] = useState(true);
  const [level, setLevel] = useState<TalkLevel>("A1");
  const [domain, setDomain] = useState<TalkDomain | "All">("All");
  const [pinned, setPinned] = useState("");
  const lang = LANG_BY_ID.get(focus);
  const sourceLang = LANG_BY_ID.get(source);
  const chorus = targets.filter((id) => id !== focus && (LEXICON[id] || TALK_EXTRA[id])).slice(0, 12);
  const scenes = [...DIALOGUES, ...TALK_MORE].filter(
    (dialogue) => dialogue.level === level && (domain === "All" || dialogue.domain === domain),
  );
  const step = TALK_LEVELS.find((item) => item.id === level);

  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    const dialogue = [...DIALOGUES, ...TALK_MORE].find((item) => item.id === id);
    if (!dialogue) return;
    setPinned(id);
    setLevel(dialogue.level);
    setDomain(dialogue.domain);
  }, []);

  useEffect(() => {
    if (!pinned) return;
    document.getElementById(`scene-${pinned}`)?.scrollIntoView({ block: "start" });
  }, [pinned, level]);

  return (
    <Shell>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 md:px-6">
        <header>
          <p className="text-sm font-semibold tracking-widest text-accent uppercase">Conversations</p>
          <h1 className="mt-2 text-4xl md:text-5xl">Conversations you can use.</h1>
          <p className="mt-2 text-muted">
            Home, food, shopping, travel, health, school, and work. Anna and Marko. Start at A1. A line that is not in your language yet stays in English.
          </p>
        </header>
        <div className="flex flex-wrap items-center gap-2">
          {TALK_LEVELS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLevel(item.id)}
              className={`min-h-11 rounded-full px-3 ${level === item.id ? "bg-ink text-paper" : "bg-chip"}`}
            >
              {item.label}
            </button>
          ))}
          <button type="button" onClick={() => setShowMeaning((value) => !value)} className="min-h-11 rounded-full border border-line bg-card px-4">
            {showMeaning ? "Hide the meaning" : "Show the meaning"}
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setDomain("All")}
            className={`min-h-11 shrink-0 rounded-full px-3 ${domain === "All" ? "bg-ink text-paper" : "bg-chip"}`}
          >
            All
          </button>
          {TALK_DOMAINS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setDomain(item)}
              className={`min-h-11 shrink-0 rounded-full px-3 ${domain === item ? "bg-ink text-paper" : "bg-chip"}`}
            >
              {item}
            </button>
          ))}
        </div>
        {step && <p className="text-sm text-muted">{step.note}</p>}
        <div className="flex gap-2 overflow-x-auto">
          {targets.filter((id) => LEXICON[id] || TALK_EXTRA[id]).map((id) => {
            const item = LANG_BY_ID.get(id);
            if (!item) return null;
            return (
              <button key={id} type="button" onClick={() => { stopSpeech(); setFocus(id); }} className={`min-h-11 shrink-0 rounded-full px-3 ${id === focus ? "bg-ink text-paper" : "bg-chip"}`}>
                {item.name}
              </button>
            );
          })}
        </div>
        {scenes.length === 0 && <p className="text-muted">No scene in this set yet. Try All, or another level.</p>}
        {scenes.map((dialogue) => {
          const sceneHasLine = focus === "en" || dialogue.turns.some((turn) => Boolean(lineFor(focus, turn.id)));
          return (
          <section key={dialogue.id} id={`scene-${dialogue.id}`} className={`scroll-mt-4 overflow-hidden rounded-2xl border bg-card ${dialogue.id === pinned ? "border-accent" : "border-line"}`}>
            <img src={`/talk/${dialogue.image}.jpg?v=1`} alt="" className="h-52 w-full object-cover" />
            <header className="border-b border-line px-5 py-4">
              <p className="text-xs tracking-widest text-muted uppercase">
                {dialogue.level === "C1" ? "Toward C1" : dialogue.level} · {dialogue.domain}
              </p>
              <h2 className="text-3xl">{dialogue.title}</h2>
              <p className="mt-1">{dialogue.aim}</p>
              <p className="text-muted">{dialogue.scene}</p>
              {!sceneHasLine && lang && (
                <p className="mt-2 text-sm text-muted">These lines are not in {lang.name} yet, so the English is here.</p>
              )}
            </header>
            <ol>
              {dialogue.turns.map((turn) => {
                const line = focus === "en" ? english(turn) : lineFor(focus, turn.id);
                const meaning = source === "en" ? english(turn) : lineFor(source, turn.id) ?? english(turn);
                const said = line ?? english(turn);
                const missing = !line;
                return (
                  <li key={turn.id} className="border-b border-line px-5 py-4 last:border-b-0">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-xs tracking-widest text-muted uppercase">{turn.speaker}</p>
                      {line && lang && (
                        <button type="button" className="min-h-11 rounded-full px-3 text-sm text-accent" onClick={() => speak(line, lang.speech)}>
                          Listen
                        </button>
                      )}
                    </div>
                    <p className="text-2xl leading-snug" dir={missing ? "ltr" : lang?.dir} lang={missing ? "en" : lang?.speech} style={{ fontFamily: missing ? undefined : lang?.font }}>
                      {said}
                    </p>
                    {missing && sceneHasLine && lang && (
                      <p className="mt-1 text-sm text-muted">This line is not in {lang.name} yet, so the English is here.</p>
                    )}
                    {focus === "ar" && (
                      <ul className="mt-2 space-y-1">
                        {([
                          ["Egyptian", "ar-eg", "ar-EG"],
                          ["Saudi", "ar-sa", "ar-SA"],
                          ["Maghrebi", "ar-ma", "ar-MA"],
                        ] as const).map(([label, id, speech]) => {
                          const text = lineFor(id, turn.id);
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
                        {chorus.map((id) => {
                          const other = LANG_BY_ID.get(id);
                          const text = lineFor(id, turn.id);
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
          );
        })}
      </div>
    </Shell>
  );
}
