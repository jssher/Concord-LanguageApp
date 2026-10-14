import { o as __toESM } from "../_runtime.mjs";
import { J as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as openCourseDb, r as getBaseEntry } from "./lexicon-Dbpe4LXG.mjs";
import { t as CONCEPTS } from "./concepts-PlhwSifQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/course-Cr79ZU-N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var LEVELS = [
	{
		id: "A1",
		label: "A1",
		aim: "Point, name, and get through a day."
	},
	{
		id: "A2",
		label: "A2",
		aim: "Travel, food, health, and a simple story."
	},
	{
		id: "B1",
		label: "B1",
		aim: "Opinions, problems, and everyday work."
	},
	{
		id: "B2",
		label: "B2",
		aim: "Nuance, news, and a longer conversation."
	},
	{
		id: "P",
		label: "Phrases",
		aim: "Useful sentences and short dialogues."
	}
];
var TOPIC_GROUP = {
	people: "01 People",
	home: "02 Home",
	food: "03 Food",
	actions: "04 Actions",
	nature: "05 Nature",
	animals: "06 Animals",
	body: "07 Body",
	places: "08 Places",
	describing: "09 Describing"
};
var POS = {
	noun: "noun",
	verb: "verb",
	adj: "adjective",
	adv: "adverb",
	pron: "pronoun",
	det: "determiner",
	num: "number",
	prep: "preposition",
	conj: "conjunction",
	phrase: "phrase",
	line: "line"
};
function posLabel(pos) {
	return POS[pos] ?? pos;
}
function lemmaOf(text) {
	return text.trim().toLowerCase().replace(/\s+/g, " ");
}
function slug(text) {
	return text.trim().toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "card";
}
var CORE = CONCEPTS.map((concept) => {
	const en = getBaseEntry("en", concept.id);
	return {
		id: concept.id,
		level: "A1",
		group: TOPIC_GROUP[concept.topic] ?? "01 People",
		topic: concept.topic,
		kind: "word",
		pos: concept.pos,
		en: en?.word || concept.gloss,
		sentence: en?.sentence || concept.sentence,
		image: concept.image,
		plural: en?.plural
	};
});
function asLevel(value) {
	if (value === "A1" || value === "A2" || value === "B1" || value === "B2") return value;
	if (value === "P" || value === "phrase" || value === "phrases") return "P";
	return null;
}
function asKind(value) {
	if (value === "phrase" || value === "dialogue") return value;
	return "word";
}
function parseCourse(raw) {
	const list = Array.isArray(raw) ? raw : [];
	const items = [];
	for (const row of list) {
		if (!row || typeof row !== "object") continue;
		const rec = row;
		const en = typeof rec.en === "string" ? rec.en.trim() : "";
		const sentence = typeof rec.sentence === "string" ? rec.sentence.trim() : "";
		const level = asLevel(rec.level);
		if (!en || !sentence || !level) continue;
		const id = typeof rec.id === "string" && rec.id.trim() ? rec.id.trim() : `${level}-${slug(en)}`;
		const kind = asKind(rec.kind);
		items.push({
			id,
			level,
			group: typeof rec.group === "string" && rec.group.trim() ? rec.group.trim() : "Group",
			topic: typeof rec.topic === "string" && rec.topic.trim() ? rec.topic.trim() : "general",
			kind,
			pos: typeof rec.pos === "string" && rec.pos.trim() ? rec.pos.trim() : kind === "word" ? "noun" : "phrase",
			en,
			sentence,
			image: typeof rec.image === "string" && rec.image.trim() ? rec.image.trim() : slug(en),
			plural: typeof rec.plural === "string" && rec.plural.trim() ? rec.plural.trim() : void 0,
			forms: typeof rec.forms === "string" && rec.forms.trim() ? rec.forms.trim() : void 0,
			scene: typeof rec.scene === "string" && rec.scene.trim() ? rec.scene.trim() : void 0,
			who: typeof rec.who === "string" && rec.who.trim() ? rec.who.trim() : void 0
		});
	}
	return items;
}
function mergeCourse(core, extra) {
	const seenLemma = new Set(core.filter((item) => item.kind === "word").map((item) => lemmaOf(item.en)));
	const seenId = new Set(core.map((item) => item.id));
	const out = [...core];
	for (const item of extra) {
		if (item.kind === "word" && seenLemma.has(lemmaOf(item.en))) continue;
		if (item.kind === "word") seenLemma.add(lemmaOf(item.en));
		let id = item.id;
		while (seenId.has(id)) id = `${id}-2`;
		seenId.add(id);
		out.push({
			...item,
			id
		});
	}
	const rank = new Map(LEVELS.map((level, index) => [level.id, index]));
	return out.sort((a, b) => {
		const byLevel = (rank.get(a.level) ?? 9) - (rank.get(b.level) ?? 9);
		if (byLevel) return byLevel;
		if (a.group !== b.group) return a.group < b.group ? -1 : 1;
		return 0;
	});
}
var COURSE_FILES = {
	A1: ["ready/a1.json"],
	A2: ["ready/a2.json"],
	B1: ["ready/b1.json"],
	B2: ["ready/b2.json"],
	P: ["ready/p.json"]
};
function idbReq(req) {
	return new Promise((resolve, reject) => {
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
}
async function readLevel(level) {
	if (typeof indexedDB === "undefined") return null;
	try {
		const db = await openCourseDb();
		const raw = await idbReq(db.transaction("levels").objectStore("levels").get(level));
		db.close();
		if (!raw || typeof raw !== "object") return null;
		const rec = raw;
		if (rec.rev !== "7" || !Array.isArray(rec.items)) return null;
		return rec.items;
	} catch {
		return null;
	}
}
async function writeLevel(level, items) {
	if (typeof indexedDB === "undefined") return;
	try {
		const db = await openCourseDb();
		await idbReq(db.transaction("levels", "readwrite").objectStore("levels").put({
			rev: "7",
			items
		}, level));
		db.close();
	} catch {}
}
async function fetchFiles(names) {
	return (await Promise.all(names.map(async (file) => {
		try {
			const response = await fetch(`/course/${file}`);
			if (!response.ok) return [];
			return parseCourse(await response.json());
		} catch {
			return [];
		}
	}))).flat();
}
var fileTask = /* @__PURE__ */ new Map();
function filesFor(level) {
	let task = fileTask.get(level);
	if (!task) {
		task = fetchFiles(COURSE_FILES[level]);
		fileTask.set(level, task);
	}
	return task;
}
function rowsFor(level, extra) {
	const rows = extra.filter((item) => item.level === level);
	return level === "A1" ? mergeCourse(CORE, rows) : mergeCourse([], rows);
}
var levelTask = /* @__PURE__ */ new Map();
function loadLevel(level) {
	const existing = levelTask.get(level);
	if (existing) return existing;
	const job = (async () => {
		const cached = await readLevel(level);
		if (cached) return cached;
		const items = rowsFor(level, await filesFor(level));
		await writeLevel(level, items);
		return items;
	})();
	levelTask.set(level, job);
	return job;
}
function useLevel(level) {
	const [items, setItems] = (0, import_react.useState)(level === "A1" ? CORE : []);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let live = true;
		setReady(false);
		setItems(level === "A1" ? CORE : []);
		loadLevel(level).then((next) => {
			if (!live) return;
			if (next.length) setItems(next);
			setReady(true);
		});
		return () => {
			live = false;
		};
	}, [level]);
	return {
		items,
		ready
	};
}
var outlineTask = null;
function loadOutline() {
	if (!outlineTask) outlineTask = fetch("/course/stats.json").then((response) => response.ok ? response.json() : {
		words: CORE.length,
		phrases: 0,
		levels: []
	}).catch(() => ({
		words: CORE.length,
		phrases: 0,
		levels: []
	}));
	return outlineTask;
}
function useOutline() {
	const [outline, setOutline] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let live = true;
		loadOutline().then((next) => {
			if (live) setOutline(next);
		});
		return () => {
			live = false;
		};
	}, []);
	return outline;
}
function groupsFor(items, level) {
	const seen = [];
	for (const item of items) {
		if (item.level !== level || seen.includes(item.group)) continue;
		seen.push(item.group);
	}
	return seen;
}
//#endregion
export { useOutline as a, useLevel as i, groupsFor as n, posLabel as r, LEVELS as t };
