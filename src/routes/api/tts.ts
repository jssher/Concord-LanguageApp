import { createHash } from "node:crypto";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createFileRoute } from "@tanstack/react-router";
import { VOICES } from "@/data/voices";
import { grokSpeechLang } from "@/lib/audio-clip";

const VOICE_IDS = new Set(VOICES.map((voice) => voice.id));
const ROOT = path.join(process.cwd(), "public", "audio");

function clipFile(voice: string, lang: string, text: string): string {
  const hash = createHash("sha1").update(text).digest("hex");
  return path.join(ROOT, voice, lang, hash.slice(0, 2), `${hash}.mp3`);
}

async function synthesize(text: string, voice: string, language: string): Promise<Buffer> {
  const key = process.env.XAI_API_KEY;
  if (!key) throw new Error("no key");
  const response = await fetch("https://api.x.ai/v1/tts", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      voice_id: voice,
      language,
      output_format: { codec: "mp3", sample_rate: 16000, bit_rate: 32000 },
    }),
  });
  if (!response.ok) throw new Error(String(response.status));
  return Buffer.from(await response.arrayBuffer());
}

export const Route = createFileRoute("/api/tts")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { text?: string; voice?: string; language?: string };
        try {
          body = await request.json();
        } catch {
          return new Response("Bad request", { status: 400 });
        }
        const text = (body.text ?? "").trim();
        const voice = (body.voice ?? "").toLowerCase();
        const spoken = grokSpeechLang(body.language ?? "");
        if (!text || text.length > 2000 || !VOICE_IDS.has(voice) || !spoken) {
          return new Response("Bad request", { status: 400 });
        }
        const file = clipFile(voice, spoken.id, text);
        try {
          await access(file);
          const cached = await readFile(file);
          return new Response(cached, { headers: { "Content-Type": "audio/mpeg", "Cache-Control": "public, max-age=31536000" } });
        } catch {
          /* record it */
        }
        try {
          const audio = await synthesize(text, voice, spoken.tts);
          if (audio.length < 200) return new Response("Empty audio", { status: 502 });
          await mkdir(path.dirname(file), { recursive: true });
          await writeFile(file, audio);
          return new Response(audio, { headers: { "Content-Type": "audio/mpeg", "Cache-Control": "public, max-age=31536000" } });
        } catch {
          return new Response("Voice unavailable", { status: 502 });
        }
      },
    },
  },
});
