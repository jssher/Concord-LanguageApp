import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { i as parseHandle, n as authMiddleware, r as leagueFor } from "./score-Dwg2HOzd.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-WOgA0OuT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SANS = "\"Source Sans 3\", \"Noto Sans\", sans-serif";
var LANGUAGES = [
	{
		id: "en",
		name: "English",
		native: "English",
		dir: "ltr",
		speech: "en-US",
		family: "Germanic",
		script: "Latin",
		tip: "Word order carries the grammar. Watch the irregular plurals."
	},
	{
		id: "de",
		name: "German",
		native: "Deutsch",
		dir: "ltr",
		speech: "de-DE",
		family: "Germanic",
		script: "Latin",
		tip: "Every noun has an article. Learn der, die, or das with the word."
	},
	{
		id: "nl",
		name: "Dutch",
		native: "Nederlands",
		dir: "ltr",
		speech: "nl-NL",
		family: "Germanic",
		script: "Latin",
		tip: "De or het is the fact you memorize with each noun."
	},
	{
		id: "da",
		name: "Danish",
		native: "Dansk",
		dir: "ltr",
		speech: "da-DK",
		family: "Germanic",
		script: "Latin",
		tip: "Common gender takes en. Neuter takes et."
	},
	{
		id: "gsw",
		name: "Swiss German",
		native: "Schwiizerdütsch",
		dir: "ltr",
		speech: "de-CH",
		voiceApprox: true,
		family: "Germanic",
		script: "Latin",
		tip: "Written as Zürich speech, not as schoolbook German."
	},
	{
		id: "es",
		name: "Spanish",
		native: "Español",
		dir: "ltr",
		speech: "es-ES",
		family: "Romance",
		script: "Latin",
		tip: "Adjectives follow the noun and agree with it."
	},
	{
		id: "fr",
		name: "French",
		native: "Français",
		dir: "ltr",
		speech: "fr-FR",
		family: "Romance",
		script: "Latin",
		tip: "The article and the liaison tell you what the silent letters are doing."
	},
	{
		id: "pt",
		name: "Portuguese",
		native: "Português",
		dir: "ltr",
		speech: "pt-BR",
		family: "Romance",
		script: "Latin",
		tip: "Brazilian forms. Keep the article; it contracts with prepositions."
	},
	{
		id: "it",
		name: "Italian",
		native: "Italiano",
		dir: "ltr",
		speech: "it-IT",
		family: "Romance",
		script: "Latin",
		tip: "Gender sits on the noun. The article changes with the next sound."
	},
	{
		id: "ro",
		name: "Romanian",
		native: "Română",
		dir: "ltr",
		speech: "ro-RO",
		family: "Romance",
		script: "Latin",
		tip: "The article is a suffix on the noun. Gender stays with the word."
	},
	{
		id: "ru",
		name: "Russian",
		native: "Русский",
		dir: "ltr",
		speech: "ru-RU",
		family: "Slavic",
		script: "Cyrillic",
		tip: "No articles. Endings carry gender, number, and case."
	},
	{
		id: "uk",
		name: "Ukrainian",
		native: "Українська",
		dir: "ltr",
		speech: "uk-UA",
		family: "Slavic",
		script: "Cyrillic",
		tip: "Endings do the work articles do in English. The apostrophe marks a separate sound."
	},
	{
		id: "hr",
		name: "Croatian",
		native: "Hrvatski",
		dir: "ltr",
		speech: "hr-HR",
		family: "Slavic",
		script: "Latin",
		tip: "Seven cases, and the verb likes the second position in the sentence."
	},
	{
		id: "sl",
		name: "Slovenian",
		native: "Slovenščina",
		dir: "ltr",
		speech: "sl-SI",
		family: "Slavic",
		script: "Latin",
		tip: "Slovenian also has a dual. This core deck stays with one and many."
	},
	{
		id: "mk",
		name: "Macedonian",
		native: "Македонски",
		dir: "ltr",
		speech: "mk-MK",
		family: "Slavic",
		script: "Cyrillic",
		tip: "The article is a suffix: -от, -та, -то."
	},
	{
		id: "bg",
		name: "Bulgarian",
		native: "Български",
		dir: "ltr",
		speech: "bg-BG",
		family: "Slavic",
		script: "Cyrillic",
		tip: "The article is a suffix, and verbs have no infinitive."
	},
	{
		id: "pl",
		name: "Polish",
		native: "Polski",
		dir: "ltr",
		speech: "pl-PL",
		family: "Slavic",
		script: "Latin",
		tip: "Case endings and verb aspect are the long game. Start with the dictionary form."
	},
	{
		id: "cs",
		name: "Czech",
		native: "Čeština",
		dir: "ltr",
		speech: "cs-CZ",
		family: "Slavic",
		script: "Latin",
		tip: "Learn the nominative first. The other cases hang off it."
	},
	{
		id: "sk",
		name: "Slovak",
		native: "Slovenčina",
		dir: "ltr",
		speech: "sk-SK",
		family: "Slavic",
		script: "Latin",
		tip: "Long vowels and cases. Learn the nominative, then the endings that follow."
	},
	{
		id: "sr",
		name: "Serbian",
		native: "Српски",
		dir: "ltr",
		speech: "sr-RS",
		family: "Slavic",
		script: "Cyrillic",
		tip: "Ekavian, written in Cyrillic. The Latin reading sits under the word."
	},
	{
		id: "sq",
		name: "Albanian",
		native: "Shqip",
		dir: "ltr",
		speech: "sq-AL",
		family: "Albanian",
		script: "Latin",
		tip: "The article is a suffix on the noun."
	},
	{
		id: "el",
		name: "Greek",
		native: "Ελληνικά",
		dir: "ltr",
		speech: "el-GR",
		family: "Hellenic",
		script: "Greek",
		tip: "The article changes with gender, number, and case. Stress is written."
	},
	{
		id: "tr",
		name: "Turkish",
		native: "Türkçe",
		dir: "ltr",
		speech: "tr-TR",
		family: "Turkic",
		script: "Latin",
		tip: "No gender. Endings stack on a stem that stays recognizable."
	},
	{
		id: "zh",
		name: "Chinese",
		native: "中文",
		dir: "ltr",
		speech: "zh-CN",
		family: "Sinitic",
		script: "Han",
		font: `"Noto Sans SC", ${SANS}`,
		tip: "Mandarin, simplified characters. The reading shows the tones."
	},
	{
		id: "yue",
		name: "Cantonese",
		native: "粵語",
		dir: "ltr",
		speech: "yue-HK",
		voiceApprox: true,
		family: "Sinitic",
		script: "Han",
		font: `"Noto Sans HK", ${SANS}`,
		tip: "Hong Kong Cantonese, traditional characters. The reading is Jyutping."
	},
	{
		id: "ja",
		name: "Japanese",
		native: "日本語",
		dir: "ltr",
		speech: "ja-JP",
		family: "Japonic",
		script: "Japanese",
		font: `"Noto Sans JP", ${SANS}`,
		tip: "The word is the dictionary form. Sentences use polite です and ます."
	},
	{
		id: "ko",
		name: "Korean",
		native: "한국어",
		dir: "ltr",
		speech: "ko-KR",
		family: "Koreanic",
		script: "Hangul",
		font: `"Noto Sans KR", ${SANS}`,
		tip: "Sentences use polite 해요 style. Particles mark each word’s job."
	},
	{
		id: "hi",
		name: "Hindi",
		native: "हिन्दी",
		dir: "ltr",
		speech: "hi-IN",
		family: "Indic",
		script: "Devanagari",
		font: `"Noto Sans Devanagari", ${SANS}`,
		tip: "Postpositions, not prepositions. Adjectives agree with gender."
	},
	{
		id: "mr",
		name: "Marathi",
		native: "मराठी",
		dir: "ltr",
		speech: "mr-IN",
		family: "Indic",
		script: "Devanagari",
		font: `"Noto Sans Devanagari", ${SANS}`,
		tip: "The verb agrees with the subject. Neuter nouns, like मूल, take a different ending."
	},
	{
		id: "bn",
		name: "Bengali",
		native: "বাংলা",
		dir: "ltr",
		speech: "bn-BD",
		family: "Indic",
		script: "Bengali",
		font: `"Noto Sans Bengali", ${SANS}`,
		tip: "No grammatical gender. These cards use পানি, the everyday word in Bangladesh."
	},
	{
		id: "gu",
		name: "Gujarati",
		native: "ગુજરાતી",
		dir: "ltr",
		speech: "gu-IN",
		family: "Indic",
		script: "Gujarati",
		font: `"Noto Sans Gujarati", ${SANS}`,
		tip: "The verb agrees with gender and number. The reading marks the nasal vowel."
	},
	{
		id: "ur",
		name: "Urdu",
		native: "اردو",
		dir: "rtl",
		speech: "ur-PK",
		family: "Indic",
		script: "Arabic",
		font: `"Noto Nastaliq Urdu", "Noto Sans Arabic", ${SANS}`,
		tip: "Right to left, in Nastaliq. The reading is a simple Latin guide."
	},
	{
		id: "te",
		name: "Telugu",
		native: "తెలుగు",
		dir: "ltr",
		speech: "te-IN",
		family: "Dravidian",
		script: "Telugu",
		font: `"Noto Sans Telugu", ${SANS}`,
		tip: "Verbs take a personal ending. The reading shows the long vowels."
	},
	{
		id: "ta",
		name: "Tamil",
		native: "தமிழ்",
		dir: "ltr",
		speech: "ta-IN",
		family: "Dravidian",
		script: "Tamil",
		font: `"Noto Sans Tamil", ${SANS}`,
		tip: "Endings stack on the stem. There is no European-style gender on most nouns."
	},
	{
		id: "ml",
		name: "Malayalam",
		native: "മലയാളം",
		dir: "ltr",
		speech: "ml-IN",
		family: "Dravidian",
		script: "Malayalam",
		font: `"Noto Sans Malayalam", ${SANS}`,
		tip: "Agglutinative. The reading is there so you can start before the script is fluent."
	},
	{
		id: "fa",
		name: "Persian",
		native: "فارسی",
		dir: "rtl",
		speech: "fa-IR",
		family: "Iranian",
		script: "Arabic",
		font: `"Noto Sans Arabic", ${SANS}`,
		tip: "Right to left. را marks a definite object. Ezafe links words quietly."
	},
	{
		id: "ar",
		name: "Arabic",
		native: "العربية",
		dir: "rtl",
		speech: "ar",
		family: "Semitic",
		script: "Arabic",
		font: `"Noto Sans Arabic", ${SANS}`,
		tip: "One card shows Modern Standard, Egyptian, and Saudi. The reading is there so each variety can be said aloud."
	},
	{
		id: "ber",
		name: "Berber",
		native: "ⵜⴰⵎⴰⵣⵉⵖⵜ",
		dir: "ltr",
		speech: "zgh",
		voiceApprox: true,
		family: "Amazigh",
		script: "Tifinagh",
		font: `"Noto Sans Tifinagh", ${SANS}`,
		tip: "Standard Moroccan Tamazight, in Tifinagh. The reading is the Latin spelling."
	},
	{
		id: "he",
		name: "Hebrew",
		native: "עברית",
		dir: "rtl",
		speech: "he-IL",
		family: "Semitic",
		script: "Hebrew",
		font: `"Noto Sans Hebrew", ${SANS}`,
		tip: "Right to left, with vowels marked for learners. The article is ה־."
	},
	{
		id: "am",
		name: "Amharic",
		native: "አማርኛ",
		dir: "ltr",
		speech: "am-ET",
		voiceApprox: true,
		family: "Semitic",
		script: "Ethiopic",
		font: `"Noto Sans Ethiopic", ${SANS}`,
		tip: "Geʽez letters. The reading is there until the script is familiar. The verb agrees with who acts."
	},
	{
		id: "arc",
		name: "Aramaic",
		native: "ܐܪܡܝܐ",
		dir: "rtl",
		speech: "syr",
		voiceApprox: true,
		family: "Semitic",
		script: "Syriac",
		font: `"Noto Sans Syriac", ${SANS}`,
		tip: "Classical Syriac, the literary Aramaic still read in church and study."
	},
	{
		id: "hy",
		name: "Armenian",
		native: "Հայերեն",
		dir: "ltr",
		speech: "hy-AM",
		family: "Armenian",
		script: "Armenian",
		font: `"Noto Sans Armenian", ${SANS}`,
		tip: "Eastern Armenian. The definite article is a suffix on the noun."
	},
	{
		id: "sw",
		name: "Swahili",
		native: "Kiswahili",
		dir: "ltr",
		speech: "sw-KE",
		family: "Bantu",
		script: "Latin",
		tip: "Noun classes replace gender. The prefix is part of the word."
	},
	{
		id: "ln",
		name: "Lingala",
		native: "Lingála",
		dir: "ltr",
		speech: "ln",
		voiceApprox: true,
		family: "Bantu",
		script: "Latin",
		tip: "Kinshasa Lingala. Accents mark the tone, and they belong to the word."
	},
	{
		id: "ig",
		name: "Igbo",
		native: "Igbo",
		dir: "ltr",
		speech: "ig-NG",
		voiceApprox: true,
		family: "Volta-Niger",
		script: "Latin",
		tip: "The underdots change the vowel. Tone can change the word."
	},
	{
		id: "yo",
		name: "Yoruba",
		native: "Yorùbá",
		dir: "ltr",
		speech: "yo-NG",
		voiceApprox: true,
		family: "Volta-Niger",
		script: "Latin",
		tip: "Tones and underdots are part of the spelling. Keep them."
	},
	{
		id: "ha",
		name: "Hausa",
		native: "Hausa",
		dir: "ltr",
		speech: "ha-NG",
		voiceApprox: true,
		family: "Chadic",
		script: "Latin",
		tip: "Boko spelling, the Latin orthography used in school."
	},
	{
		id: "ff",
		name: "Fulani",
		native: "Fulfulde",
		dir: "ltr",
		speech: "ff",
		voiceApprox: true,
		family: "Atlantic",
		script: "Latin",
		tip: "Fulfulde in Latin letters. The hooked letters change the sound, and dialects differ."
	},
	{
		id: "so",
		name: "Somali",
		native: "Soomaali",
		dir: "ltr",
		speech: "so-SO",
		family: "Cushitic",
		script: "Latin",
		tip: "Most words put the main stress on the syllable before the last. C and x are Somali sounds."
	},
	{
		id: "tl",
		name: "Tagalog",
		native: "Tagalog",
		dir: "ltr",
		speech: "fil-PH",
		family: "Austronesian",
		script: "Latin",
		tip: "The predicate often comes first. Ang marks the focus of the sentence."
	},
	{
		id: "th",
		name: "Thai",
		native: "ไทย",
		dir: "ltr",
		speech: "th-TH",
		family: "Kra-Dai",
		script: "Thai",
		font: `"Noto Sans Thai", ${SANS}`,
		tip: "Words are not separated by spaces. The reading carries the tones."
	},
	{
		id: "vi",
		name: "Vietnamese",
		native: "Tiếng Việt",
		dir: "ltr",
		speech: "vi-VN",
		family: "Austroasiatic",
		script: "Latin",
		tip: "Each syllable is written apart, and the diacritic is the tone."
	},
	{
		id: "id",
		name: "Indonesian",
		native: "Bahasa Indonesia",
		dir: "ltr",
		speech: "id-ID",
		family: "Austronesian",
		script: "Latin",
		tip: "No gender and no conjugation. Affixes build new words from a root."
	},
	{
		id: "mg",
		name: "Malagasy",
		native: "Malagasy",
		dir: "ltr",
		speech: "mg-MG",
		family: "Austronesian",
		script: "Latin",
		tip: "The word you are looking for often comes first. Stress is usually on the syllable before the last."
	},
	{
		id: "qu",
		name: "Quechua",
		native: "Runasimi",
		dir: "ltr",
		speech: "qu-PE",
		voiceApprox: true,
		family: "Quechuan",
		script: "Latin",
		tip: "Southern Quechua. A handful of suffixes does most of the grammar."
	},
	{
		id: "gn",
		name: "Guaraní",
		native: "Avañeʼẽ",
		dir: "ltr",
		speech: "gn-PY",
		voiceApprox: true,
		family: "Tupian",
		script: "Latin",
		tip: "Paraguayan Guaraní. The tilde and the nasal mark belong to the word."
	},
	{
		id: "eo",
		name: "Esperanto",
		native: "Esperanto",
		dir: "ltr",
		speech: "eo",
		voiceApprox: true,
		family: "Constructed",
		script: "Latin",
		tip: "One article, la. Nouns end in -o, adjectives in -a, verbs in -i."
	},
	{
		id: "isv",
		name: "Interslavic",
		native: "Medžuslovjansky",
		dir: "ltr",
		speech: "hr-HR",
		voiceApprox: true,
		family: "Constructed",
		script: "Latin",
		font: `"Noto Sans Glagolitic", ${SANS}`,
		tip: "One card shows the same sentence in Latin, Cyrillic, and Glagolitic."
	}
];
var LANG_BY_ID = new Map(LANGUAGES.map((l) => [l.id, l]));
var FAMILIES = [...new Set(LANGUAGES.map((l) => l.family))];
var BATCHES = [
	{
		id: "d3",
		label: "3 days",
		days: 3
	},
	{
		id: "w1",
		label: "1 week",
		days: 7
	},
	{
		id: "w2",
		label: "2 weeks",
		days: 14
	},
	{
		id: "w4",
		label: "4 weeks",
		days: 28
	},
	{
		id: "m2",
		label: "2 months",
		days: 60
	},
	{
		id: "m4",
		label: "4 months",
		days: 120
	},
	{
		id: "m6",
		label: "6 months",
		days: 180
	},
	{
		id: "y1",
		label: "1 year",
		days: 365
	}
];
function cardKey(lang, concept) {
	return `${lang}:${concept}`;
}
function dueFor(stage, now) {
	return now + BATCHES[Math.min(stage, BATCHES.length - 1)].days * 24 * 60 * 60 * 1e3;
}
function idbRequest(req) {
	return new Promise((resolve, reject) => {
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
}
function openDb() {
	return new Promise((resolve, reject) => {
		const req = indexedDB.open("concord", 1);
		req.onupgradeneeded = () => {
			const db = req.result;
			if (!db.objectStoreNames.contains("kv")) db.createObjectStore("kv");
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
}
var memory = /* @__PURE__ */ new Map();
var storage = createJSONStorage(() => ({
	getItem: async (name) => {
		if (typeof indexedDB === "undefined") return memory.get(name) ?? null;
		try {
			const db = await openDb();
			const value = await idbRequest(db.transaction("kv").objectStore("kv").get(name));
			db.close();
			return value ?? null;
		} catch {
			return memory.get(name) ?? null;
		}
	},
	setItem: async (name, value) => {
		memory.set(name, value);
		if (typeof indexedDB === "undefined") return;
		try {
			const db = await openDb();
			await idbRequest(db.transaction("kv", "readwrite").objectStore("kv").put(value, name));
			db.close();
		} catch {}
	},
	removeItem: async (name) => {
		memory.delete(name);
		if (typeof indexedDB === "undefined") return;
		try {
			const db = await openDb();
			await idbRequest(db.transaction("kv", "readwrite").objectStore("kv").delete(name));
			db.close();
		} catch {}
	}
}));
var useConcord = create()(persist((set) => ({
	source: "en",
	targets: ["de"],
	focus: "de",
	topic: "all",
	level: "A1",
	group: "01 People",
	chorus: true,
	conceptId: "i",
	cards: {},
	fixes: {},
	setSource: (id) => set((state) => {
		const targets = state.targets.filter((t) => t !== id);
		return {
			source: id,
			targets,
			focus: targets.includes(state.focus) ? state.focus : targets[0] ?? state.focus
		};
	}),
	toggleTarget: (id) => set((state) => {
		if (id === state.source) return state;
		if (state.targets.includes(id)) {
			const targets = state.targets.filter((t) => t !== id);
			return {
				targets,
				focus: state.focus === id ? targets[0] ?? state.focus : state.focus
			};
		}
		if (state.targets.length >= 12) return state;
		return {
			targets: [...state.targets, id],
			focus: state.targets.length === 0 ? id : state.focus
		};
	}),
	setFocus: (id) => set({ focus: id }),
	setTopic: (topic) => set({ topic }),
	setLevel: (level) => set({ level }),
	setGroup: (group) => set({ group }),
	setChorus: (chorus) => set({ chorus }),
	normalize: () => set((state) => {
		const mapId = (id) => id === "isv-Latn" || id === "isv-Cyrl" || id === "isv-Glag" ? "isv" : id;
		const targets = [...new Set(state.targets.map(mapId))].filter((id) => id !== "en").slice(0, 12);
		const focusId = mapId(state.focus);
		const focus = targets.includes(focusId) ? focusId : targets[0] ?? "de";
		return {
			source: "en",
			targets: targets.length ? targets : ["de"],
			focus: targets.length ? focus : "de"
		};
	}),
	setConceptId: (conceptId) => set({ conceptId }),
	grade: (lang, concept, mark) => set((state) => {
		const key = cardKey(lang, concept);
		const prev = state.cards[key];
		const now = Date.now();
		let stage;
		let passes = prev?.passes ?? 0;
		let lapses = prev?.lapses ?? 0;
		if (mark === "r") {
			passes += 1;
			if (!prev) stage = 0;
			else if (prev.stage >= 8) stage = 8;
			else stage = prev.stage + 1;
		} else {
			lapses += 1;
			stage = 0;
		}
		const due = dueFor(Math.min(stage, 7), now);
		return { cards: {
			...state.cards,
			[key]: {
				stage,
				due,
				passes,
				lapses,
				last: mark
			}
		} };
	}),
	saveFix: (lang, concept, fix) => set((state) => ({ fixes: {
		...state.fixes,
		[cardKey(lang, concept)]: fix
	} })),
	clearFix: (lang, concept) => set((state) => {
		const fixes = { ...state.fixes };
		delete fixes[cardKey(lang, concept)];
		return { fixes };
	})
}), {
	name: "concord-v1",
	storage
}));
function batchLabel(stage) {
	if (stage === void 0) return "New";
	if (stage >= 8) return "Mastered";
	return BATCHES[Math.min(stage, BATCHES.length - 1)].label;
}
function genderLabel(gender) {
	if (gender === "m") return "masculine";
	if (gender === "f") return "feminine";
	if (gender === "n") return "neuter";
	if (gender === "c") return "common";
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function num(value) {
	const n = Number(value);
	return Number.isFinite(n) ? n : 0;
}
function cleanCards(input) {
	const out = [];
	for (const row of input.slice(0, 300)) {
		if (!row || typeof row !== "object") continue;
		const item = row;
		const lang = String(item.lang ?? "");
		const concept = String(item.concept ?? "");
		const last = item.last === "w" ? "w" : item.last === "r" ? "r" : null;
		if (!/^[a-z0-9-]{1,16}$/.test(lang)) continue;
		if (!/^[a-z0-9][a-z0-9_.:-]{0,79}$/.test(concept)) continue;
		if (!last) continue;
		const passes = Math.max(0, Math.min(1e5, Math.floor(num(item.passes))));
		const lapses = Math.max(0, Math.min(1e5, Math.floor(num(item.lapses))));
		if (passes < 1 && lapses < 1) continue;
		out.push({
			lang,
			concept,
			stage: Math.max(0, Math.min(8, Math.floor(num(item.stage)))),
			passes,
			lapses,
			last
		});
	}
	return out;
}
var getMine = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("6e94645b63df09242e64301d7d06c4343ed7e95fb23511f1834af4cf1bc2567c"));
var getBoard = createServerFn({ method: "GET" }).handler(createSsrRpc("f1f456f6a2ddb8552478638333a05d8e4e26cc7f0dd84a57384db276325cee36"));
var getPerson = createServerFn({ method: "GET" }).validator((handle) => {
	const parsed = parseHandle(String(handle ?? ""));
	if (!parsed.ok) throw new Error("Bad link");
	return parsed.value;
}).handler(createSsrRpc("2b14778d3fb962299f578fa50b786d2a11c879966142953385f246c26afc1fda"));
var claimName = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	name: String(input?.name ?? ""),
	handle: String(input?.handle ?? "")
})).handler(createSsrRpc("729cc8ace385afeadc8b49b6c191d34ae48d64b2a95bb2799979624df86f8841"));
var recordReview = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	const lang = String(input?.lang ?? "");
	const concept = String(input?.concept ?? "");
	const mark = input?.mark;
	if (mark !== "r" && mark !== "w") throw new Error("Bad review");
	if (!/^[a-z0-9-]{1,16}$/.test(lang)) throw new Error("Bad review");
	if (!/^[a-z0-9][a-z0-9_.:-]{0,79}$/.test(concept)) throw new Error("Bad review");
	return {
		lang,
		concept,
		mark: mark === "w" ? "w" : "r"
	};
}).handler(createSsrRpc("bdc6bd4624d4121bba63527362f6389e09f7927a544ea04418fb4ce39ebee362"));
var syncCards = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	if (!Array.isArray(input)) throw new Error("Bad cards");
	return cleanCards(input);
}).handler(createSsrRpc("0aae66938cc5023562119c838a58d72239db434488223b55022b0a5824da0438"));
var setConnection = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	const handle = parseHandle(String(input?.handle ?? ""));
	if (!handle.ok) throw new Error("Bad link");
	return {
		handle: handle.value,
		on: Boolean(input?.on)
	};
}).handler(createSsrRpc("cb51362b4d56775e76d2e903df10927efab247398abbb8ee30247428195ca323"));
var snap = {
	status: "loading",
	mine: null
};
var listeners = /* @__PURE__ */ new Set();
var inflight = null;
var pushed = false;
var fetchedAt = 0;
function emit(next) {
	snap = next;
	for (const listener of listeners) listener();
}
function subscribe(listener) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}
function getSnap() {
	return snap;
}
function unauthorized(err) {
	return err instanceof Error && (err.message === "Unauthorized" || err.message.includes("Unauthorized"));
}
function localCards() {
	const cards = useConcord.getState().cards;
	return Object.entries(cards).flatMap(([key, mark]) => {
		const split = key.indexOf(":");
		if (split < 1) return [];
		const row = mark;
		if ((row.passes ?? 0) < 1 && (row.lapses ?? 0) < 1) return [];
		return [{
			lang: key.slice(0, split),
			concept: key.slice(split + 1),
			stage: row.stage,
			passes: row.passes,
			lapses: row.lapses,
			last: row.last
		}];
	});
}
async function whenHydrated() {
	if (useConcord.persist.hasHydrated()) return;
	await new Promise((resolve) => {
		const unsub = useConcord.persist.onFinishHydration(() => {
			unsub();
			resolve();
		});
	});
}
async function pushLocal() {
	if (pushed) return;
	await whenHydrated();
	const cards = localCards();
	let latest = snap.mine;
	try {
		for (let i = 0; i < cards.length; i += 300) {
			const result = await syncCards({ data: cards.slice(i, i + 300) });
			if (!result.ok || !result.mine) return;
			latest = result.mine;
		}
		pushed = true;
		if (latest) emit({
			status: "ready",
			mine: latest
		});
	} catch {}
}
function refreshStanding() {
	if (inflight) return inflight;
	if (snap.status !== "loading" && Date.now() - fetchedAt < 4e3) return Promise.resolve();
	inflight = (async () => {
		try {
			const mine = await getMine();
			emit({
				status: "ready",
				mine
			});
			fetchedAt = Date.now();
			if (mine) await pushLocal();
		} catch (err) {
			if (unauthorized(err)) emit({
				status: "guest",
				mine: null
			});
			else emit({
				status: "error",
				mine: snap.mine
			});
			fetchedAt = Date.now();
		}
	})().finally(() => {
		inflight = null;
	});
	return inflight;
}
function useStanding() {
	const current = (0, import_react.useSyncExternalStore)(subscribe, getSnap, getSnap);
	(0, import_react.useEffect)(() => {
		refreshStanding();
	}, []);
	return current;
}
function noteReview(lang, concept, mark) {
	if (snap.status !== "ready" || !snap.mine) return;
	recordReview({ data: {
		lang,
		concept,
		mark
	} }).then((result) => {
		if (result.ok && result.mine) emit({
			status: "ready",
			mine: result.mine
		});
		else if (!result.ok) emit({
			status: "ready",
			mine: null
		});
	}).catch((err) => {
		if (unauthorized(err)) emit({
			status: "guest",
			mine: null
		});
	});
}
async function saveName(name, handle) {
	const result = await claimName({ data: {
		name,
		handle
	} });
	if (result.ok && result.mine) {
		emit({
			status: "ready",
			mine: result.mine
		});
		pushed = false;
		await pushLocal();
	}
	return result;
}
async function connectTo(handle, on) {
	const result = await setConnection({ data: {
		handle,
		on
	} });
	if (result.ok && result.mine) emit({
		status: "ready",
		mine: result.mine
	});
	return result;
}
var LINKS = [
	{
		to: "/study",
		label: "Study"
	},
	{
		to: "/letters",
		label: "Alphabet"
	},
	{
		to: "/path",
		label: "Path"
	},
	{
		to: "/grammar",
		label: "Grammar"
	},
	{
		to: "/talk",
		label: "Talk"
	},
	{
		to: "/league",
		label: "League"
	}
];
function Shell({ children, scroll = true }) {
	const focus = useConcord((s) => s.focus);
	const source = useConcord((s) => s.source);
	const standing = useStanding();
	const focusName = LANG_BY_ID.get(focus)?.name ?? "Choose";
	const sourceName = LANG_BY_ID.get(source)?.name ?? "";
	const mine = standing.mine;
	const chip = mine ? `${leagueFor(mine.score).name} · ${mine.score.toLocaleString()}` : standing.status === "ready" ? "Add your name" : "League";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh flex-col overflow-hidden bg-paper text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "shrink-0 border-b border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "font-display text-2xl tracking-tight",
						children: "Concord"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex min-w-0 flex-1 items-center gap-1 overflow-x-auto text-sm",
						children: LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: link.to,
							className: "shrink-0 rounded-full px-3 py-2 text-muted data-[status=active]:bg-ink data-[status=active]:text-paper",
							children: link.label
						}, link.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "hidden shrink-0 text-sm text-muted lg:block",
						children: [
							sourceName,
							" → ",
							focusName
						]
					}),
					chip !== "League" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/league",
						className: "inline-flex min-h-10 shrink-0 items-center rounded-full bg-moss px-3 text-sm text-moss-ink",
						children: chip
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: scroll ? "min-h-0 flex-1 overflow-y-auto overscroll-contain" : "flex min-h-0 flex-1 flex-col overflow-hidden",
			children
		})]
	});
}
//#endregion
export { Shell as a, connectTo as c, getPerson as d, noteReview as f, useStanding as h, LANG_BY_ID as i, genderLabel as l, useConcord as m, FAMILIES as n, batchLabel as o, saveName as p, LANGUAGES as r, cardKey as s, BATCHES as t, getBoard as u };
