const cache = new Map<string, SpeechSynthesisVoice | null>();

function voices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !window.speechSynthesis) return [];
  return window.speechSynthesis.getVoices();
}

export function warmVoices(): void {
  voices();
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.onvoiceschanged = () => {
    cache.clear();
  };
}

function pickVoice(bcp47: string): SpeechSynthesisVoice | null {
  const key = bcp47.toLowerCase();
  if (cache.has(key)) return cache.get(key) ?? null;
  const all = voices();
  const exact = all.find((v) => v.lang.toLowerCase() === key);
  const prefix = key.split("-")[0];
  const loose = all.find((v) => v.lang.toLowerCase().startsWith(prefix));
  const chosen = exact ?? loose ?? null;
  cache.set(key, chosen);
  return chosen;
}

export function speak(text: string, bcp47: string, then?: () => void): void {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    then?.();
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = bcp47;
  const voice = pickVoice(bcp47);
  if (voice) utterance.voice = voice;
  utterance.rate = 0.92;
  if (then) utterance.onend = () => then();
  window.speechSynthesis.speak(utterance);
}

export function speakPair(word: string, sentence: string, bcp47: string): void {
  speak(word, bcp47, () => {
    window.setTimeout(() => speak(sentence, bcp47), 280);
  });
}

export function stopSpeech(): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
}
