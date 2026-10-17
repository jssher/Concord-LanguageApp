/** Same path the recorder writes. SHA-1 of the exact spoken text. */
export async function clipHash(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(text));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

/**
 * Languages Grok text-to-speech speaks natively.
 * `id` is the folder under /audio. `tts` is the BCP-47 code sent to the model.
 * Other course languages are not listed: the model does not have a native voice for them.
 */
const GROK_SPEECH: Record<string, { id: string; tts: string }> = {
  en: { id: "en", tts: "en" },
  "en-us": { id: "en", tts: "en" },
  de: { id: "de", tts: "de" },
  "de-de": { id: "de", tts: "de" },
  es: { id: "es", tts: "es-ES" },
  "es-es": { id: "es", tts: "es-ES" },
  pt: { id: "pt", tts: "pt-BR" },
  "pt-br": { id: "pt", tts: "pt-BR" },
  fr: { id: "fr", tts: "fr" },
  "fr-fr": { id: "fr", tts: "fr" },
  it: { id: "it", tts: "it" },
  "it-it": { id: "it", tts: "it" },
  ru: { id: "ru", tts: "ru" },
  "ru-ru": { id: "ru", tts: "ru" },
  tr: { id: "tr", tts: "tr" },
  "tr-tr": { id: "tr", tts: "tr" },
  zh: { id: "zh", tts: "zh" },
  "zh-cn": { id: "zh", tts: "zh" },
  ja: { id: "ja", tts: "ja" },
  "ja-jp": { id: "ja", tts: "ja" },
  ko: { id: "ko", tts: "ko" },
  "ko-kr": { id: "ko", tts: "ko" },
  hi: { id: "hi", tts: "hi" },
  "hi-in": { id: "hi", tts: "hi" },
  bn: { id: "bn", tts: "bn" },
  "bn-bd": { id: "bn", tts: "bn" },
  ar: { id: "ar", tts: "ar" },
  "ar-eg": { id: "ar-eg", tts: "ar-EG" },
  "ar-sa": { id: "ar-sa", tts: "ar-SA" },
  id: { id: "id", tts: "id" },
  "id-id": { id: "id", tts: "id" },
  vi: { id: "vi", tts: "vi" },
  "vi-vn": { id: "vi", tts: "vi" },
};

export function grokSpeechLang(bcp47: string): { id: string; tts: string } | null {
  return GROK_SPEECH[bcp47.trim().toLowerCase()] ?? null;
}

/** Folder for a recorded clip, or null when Grok has no native voice for that tag. */
export function recordedLang(bcp47: string): string | null {
  return grokSpeechLang(bcp47)?.id ?? null;
}

export function clipUrl(voice: string, lang: string, hash: string): string {
  return `/audio/${voice}/${lang}/${hash.slice(0, 2)}/${hash}.mp3`;
}
