//#region node_modules/.nitro/vite/services/ssr/assets/speech-DbfbLzfj.js
var cache = /* @__PURE__ */ new Map();
function voices() {
	if (typeof window === "undefined" || !window.speechSynthesis) return [];
	return window.speechSynthesis.getVoices();
}
function warmVoices() {
	voices();
	if (typeof window === "undefined" || !window.speechSynthesis) return;
	window.speechSynthesis.onvoiceschanged = () => {
		cache.clear();
	};
}
function pickVoice(bcp47) {
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
function speak(text, bcp47, then) {
	if (typeof window === "undefined" || !window.speechSynthesis) {
		then?.();
		return;
	}
	window.speechSynthesis.cancel();
	const utterance = new SpeechSynthesisUtterance(text);
	utterance.lang = bcp47;
	const voice = pickVoice(bcp47);
	if (voice) utterance.voice = voice;
	utterance.rate = .92;
	if (then) utterance.onend = () => then();
	window.speechSynthesis.speak(utterance);
}
function stopSpeech() {
	if (typeof window === "undefined" || !window.speechSynthesis) return;
	window.speechSynthesis.cancel();
}
//#endregion
export { stopSpeech as n, warmVoices as r, speak as t };
