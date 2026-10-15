import { createServerFn } from "@tanstack/react-start";

export type GrammarTranslation = {
  summary: string;
  body: string;
  points: string[];
  caption: string;
  heads: string[];
  glosses: string[];
};

type Result = { ok: true; text: GrammarTranslation } | { ok: false; error: string };

function clip(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function list(value: unknown, maxItems: number, maxLen: number): string[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, maxItems).map((item) => clip(item, maxLen));
}

export const translateGrammar = createServerFn({ method: "POST" })
  .validator((input: {
    intoName: string;
    about: string;
    summary: string;
    body: string;
    points: string[];
    caption: string;
    heads: string[];
    glosses: string[];
  }) => ({
    intoName: clip(input?.intoName, 80),
    about: clip(input?.about, 80),
    summary: clip(input?.summary, 400),
    body: clip(input?.body, 1200),
    points: list(input?.points, 8, 300),
    caption: clip(input?.caption, 200),
    heads: list(input?.heads, 8, 80),
    glosses: list(input?.glosses, 8, 240),
  }))
  .handler(async ({ data }): Promise<Result> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false, error: "Grok is not available right now." };
    if (!data.intoName || !data.summary) return { ok: false, error: "Nothing to translate." };

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: 0.2,
        max_tokens: 900,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You translate a short grammar lesson. The lesson explains one language, but the explanation itself is in English. Translate the explanation into the requested language. Keep it clear for a beginner. Do not add rules that were not in the source. Leave grammatical forms, example sentences, and words of the language being studied unchanged when they appear inside a sentence. Translate English labels such as case, singular, past, and I. Reply with JSON only: {\"summary\":\"\",\"body\":\"\",\"points\":[],\"caption\":\"\",\"heads\":[],\"glosses\":[]}. points, heads, and glosses must keep the same count and order as the input.",
          },
          { role: "user", content: JSON.stringify(data) },
        ],
      }),
    });
    if (!res.ok) return { ok: false, error: "Grok could not translate this." };
    const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const raw = body.choices?.[0]?.message?.content ?? "";
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return { ok: false, error: "Grok could not translate this." };
    }
    const points = list(parsed.points, data.points.length, 400);
    const heads = list(parsed.heads, data.heads.length, 80);
    const glosses = list(parsed.glosses, data.glosses.length, 300);
    const text: GrammarTranslation = {
      summary: clip(parsed.summary, 500) || data.summary,
      body: clip(parsed.body, 1600) || data.body,
      points: points.length === data.points.length ? points : data.points,
      caption: clip(parsed.caption, 240) || data.caption,
      heads: heads.length === data.heads.length ? heads : data.heads,
      glosses: glosses.length === data.glosses.length ? glosses : data.glosses,
    };
    return { ok: true, text };
  });
