import { createServerFn } from "@tanstack/react-start";
import type { Fix } from "@/lib/concord-store";

export type CardCheck = {
  verdict: "keep" | "correct";
  reason: string;
  fix?: Fix;
};

type AskResult = { ok: true; check: CardCheck } | { ok: false; error: string };

const LIMIT = 500;

function clip(value: unknown, max = LIMIT): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function optional(value: unknown): string | undefined {
  const text = clip(value);
  return text || undefined;
}

export const askCard = createServerFn({ method: "POST" })
  .validator((input: {
    language: string;
    languageName: string;
    tip: string;
    english: string;
    englishSentence: string;
    word: string;
    sentence: string;
    reading: string;
    sentenceReading: string;
    plural: string;
    article: string;
    note: string;
    question: string;
  }) => ({
    language: clip(input?.language, 16),
    languageName: clip(input?.languageName, 80),
    tip: clip(input?.tip, 400),
    english: clip(input?.english),
    englishSentence: clip(input?.englishSentence),
    word: clip(input?.word),
    sentence: clip(input?.sentence),
    reading: clip(input?.reading),
    sentenceReading: clip(input?.sentenceReading),
    plural: clip(input?.plural, 120),
    article: clip(input?.article, 80),
    note: clip(input?.note, 300),
    question: clip(input?.question, 300),
  }))
  .handler(async ({ data }): Promise<AskResult> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false, error: "Grok is not available right now." };
    if (!data.language || !data.english) return { ok: false, error: "This card has nothing to check." };

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: 0.2,
        max_tokens: 450,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You review one learner flashcard. Decide whether it should be corrected. Change it only for a real mistake: wrong meaning, ungrammatical sentence, wrong gender or plural, or a missing reading the learner needs to say the line. Leave an acceptable card alone. Do not polish style. If the target line is empty, a correct beginner sentence is a correction. If you are not sure, keep the card. If question is set, answer that question in reason, in plain English, about this card. If the question asks for a different wording, put that wording in the replacement fields and set verdict to correct. If it is only a question, keep the card unless it also has a real mistake. Reply with JSON only: {\"verdict\":\"keep\"|\"correct\",\"reason\":\"one or two plain sentences\",\"word\":\"\",\"sentence\":\"\",\"reading\":\"\",\"sentenceReading\":\"\",\"plural\":\"\",\"article\":\"\",\"feminine\":\"\",\"note\":\"\"}. On keep, leave the replacement fields empty. reading is the pronunciation of the word. sentenceReading is the pronunciation of the sentence (pinyin for Mandarin).",
          },
          {
            role: "user",
            content: JSON.stringify(data),
          },
        ],
      }),
    });
    if (!res.ok) return { ok: false, error: "Grok could not check this card." };
    const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const raw = body.choices?.[0]?.message?.content ?? "";
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return { ok: false, error: "Grok could not check this card." };
    }
    const verdict = parsed.verdict === "correct" ? "correct" : "keep";
    const reason = clip(parsed.reason, 400) || (verdict === "keep" ? "This card is fine as it is." : "This card should be corrected.");
    if (verdict === "keep") return { ok: true, check: { verdict, reason } };
    const fix: Fix = {
      word: optional(parsed.word),
      sentence: optional(parsed.sentence),
      reading: optional(parsed.reading),
      sentenceReading: optional(parsed.sentenceReading),
      plural: optional(parsed.plural),
      article: optional(parsed.article),
      feminine: optional(parsed.feminine),
      note: optional(parsed.note),
    };
    if (!fix.word && !fix.sentence) return { ok: true, check: { verdict: "keep", reason } };
    return { ok: true, check: { verdict, reason, fix } };
  });
