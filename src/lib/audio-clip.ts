/** Same path the recorder writes. SHA-1 of the exact spoken text. */
export async function clipHash(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(text));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

/** English and German course audio. Other tags are not in the recorded set. */
export function recordedLang(bcp47: string): "en" | "de" | null {
  const tag = bcp47.toLowerCase();
  if (tag === "en" || tag.startsWith("en-")) return "en";
  if (tag === "de" || tag === "de-de") return "de";
  return null;
}

export function clipUrl(voice: string, lang: string, hash: string): string {
  return `/audio/${voice}/${lang}/${hash.slice(0, 2)}/${hash}.mp3`;
}
