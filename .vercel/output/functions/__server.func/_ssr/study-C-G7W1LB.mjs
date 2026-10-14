import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as usePack, r as getBaseEntry } from "./lexicon-Dbpe4LXG.mjs";
import { a as Shell, f as noteReview, i as LANG_BY_ID, l as genderLabel, m as useConcord, n as FAMILIES, o as batchLabel, r as LANGUAGES, s as cardKey, t as BATCHES } from "./shell-WOgA0OuT.mjs";
import { t as mergeEntry } from "./entry-DVwZTeSD.mjs";
import { t as Flag } from "./flag-CxFaRrlz.mjs";
import { n as mandarinChar, t as StrokeOrder } from "./strokes-BaqE-lO0.mjs";
import { n as stopSpeech, r as warmVoices, t as speak } from "./speech-DbfbLzfj.mjs";
import { a as ChevronRight, i as ChevronUp, o as ChevronLeft, r as Plus, s as ChevronDown, t as Volume2 } from "../_libs/lucide-react.mjs";
import { a as useOutline, i as useLevel, n as groupsFor, r as posLabel } from "./course-Cr79ZU-N.mjs";
import { t as Plate } from "./plate-YccgCF7P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/study-C-G7W1LB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LEVEL_CHIPS = [
	{
		id: "A1",
		label: "A1"
	},
	{
		id: "A2",
		label: "A2"
	},
	{
		id: "B1",
		label: "B1"
	},
	{
		id: "B2",
		label: "B2"
	},
	{
		id: "P",
		label: "Phrases"
	}
];
function hasLine(item, lang, fixes) {
	const entry = mergeEntry(getBaseEntry(lang, item.id, item.en), fixes[cardKey(lang, item.id)]);
	return Boolean(entry?.word && entry.sentence);
}
function StudyPage() {
	const targets = useConcord((s) => s.targets);
	const focus = useConcord((s) => s.focus);
	const level = useConcord((s) => s.level);
	const group = useConcord((s) => s.group);
	const conceptId = useConcord((s) => s.conceptId);
	const cards = useConcord((s) => s.cards);
	const fixes = useConcord((s) => s.fixes);
	const setFocus = useConcord((s) => s.setFocus);
	const setLevel = useConcord((s) => s.setLevel);
	const setGroup = useConcord((s) => s.setGroup);
	const setConceptId = useConcord((s) => s.setConceptId);
	const toggleTarget = useConcord((s) => s.toggleTarget);
	const grade = useConcord((s) => s.grade);
	const saveFix = useConcord((s) => s.saveFix);
	const clearFix = useConcord((s) => s.clearFix);
	const normalize = useConcord((s) => s.normalize);
	const courseLevel = level === "A2" || level === "B1" || level === "B2" || level === "P" ? level : "A1";
	const { items, ready } = useLevel(courseLevel);
	const outline = useOutline();
	const [parallelOnly, setParallelOnly] = (0, import_react.useState)(true);
	const [later, setLater] = (0, import_react.useState)([]);
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [status, setStatus] = (0, import_react.useState)("");
	const [query, setQuery] = (0, import_react.useState)("");
	const [picking, setPicking] = (0, import_react.useState)(false);
	const [openId, setOpenId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		normalize();
		warmVoices();
		return () => stopSpeech();
	}, [normalize]);
	const readyTargets = (0, import_react.useMemo)(() => targets.filter((id) => LANG_BY_ID.has(id) && id !== "en").slice(0, 12), [targets]);
	const activeFocus = readyTargets.includes(focus) ? focus : readyTargets[0] ?? "";
	const packReady = usePack(activeFocus, courseLevel);
	const loadedGroups = (0, import_react.useMemo)(() => groupsFor(items, courseLevel), [items, courseLevel]);
	const outlineGroups = outline?.levels.find((row) => row.id === courseLevel)?.groups.map((row) => row.name) ?? [];
	const groups = (0, import_react.useMemo)(() => {
		const out = [...loadedGroups];
		for (const name of outlineGroups) if (!out.includes(name)) out.push(name);
		return out;
	}, [loadedGroups, outlineGroups]);
	const activeGroup = groups.includes(group) ? group : groups[0] ?? "";
	(0, import_react.useEffect)(() => {
		if (activeGroup && activeGroup !== group) setGroup(activeGroup);
	}, [
		activeGroup,
		group,
		setGroup
	]);
	const deck = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return items.filter((item) => {
			if (item.level !== courseLevel) return false;
			if (activeGroup && item.group !== activeGroup) return false;
			if (q && !`${item.en} ${item.sentence}`.toLowerCase().includes(q)) return false;
			if (parallelOnly && packReady && activeFocus && !hasLine(item, activeFocus, fixes)) return false;
			return true;
		});
	}, [
		items,
		courseLevel,
		activeGroup,
		query,
		parallelOnly,
		activeFocus,
		fixes,
		packReady
	]);
	const index = Math.max(0, deck.findIndex((item) => item.id === conceptId));
	const concept = deck[index] ?? deck[0];
	const revealed = Boolean(concept && openId === concept.id);
	(0, import_react.useEffect)(() => {
		if (!concept) return;
		if (concept.id !== conceptId) setConceptId(concept.id);
	}, [
		concept,
		conceptId,
		setConceptId
	]);
	function moveWord(step) {
		if (!deck.length) return;
		const i = Math.max(0, deck.findIndex((item) => item.id === (concept?.id ?? conceptId)));
		const next = deck[(i + step + deck.length) % deck.length];
		setConceptId(next.id);
		setEditing(false);
		setStatus("");
	}
	function moveLang(step) {
		if (!readyTargets.length || !activeFocus) return;
		const i = readyTargets.indexOf(activeFocus);
		const next = readyTargets[(i + step + readyTargets.length) % readyTargets.length];
		setFocus(next);
		setEditing(false);
		setStatus("");
	}
	function revealOrAdvance() {
		if (!concept) return;
		if (openId !== concept.id) {
			setOpenId(concept.id);
			return;
		}
		moveWord(1);
	}
	function mark(kind) {
		if (!concept || !activeFocus) return;
		grade(activeFocus, concept.id, kind);
		noteReview(activeFocus, concept.id, kind);
		const stage = useConcord.getState().cards[cardKey(activeFocus, concept.id)]?.stage;
		setStatus(kind === "r" ? `Remembered · ${batchLabel(stage)}` : "Again · back in the 3-day batch");
		if (kind === "w") setLater((list) => list.includes(concept.id) ? list : [...list, concept.id]);
		if (deck.length > 1) {
			const i = deck.findIndex((item) => item.id === concept.id);
			const following = deck[(i + 1) % deck.length];
			if (i === deck.length - 1 && later.length) {
				setConceptId(later[0]);
				setLater((list) => list.slice(1));
			} else setConceptId(following.id);
		}
	}
	const actions = (0, import_react.useRef)({
		moveWord,
		moveLang,
		mark,
		revealOrAdvance,
		concept,
		activeFocus,
		fixes
	});
	actions.current = {
		moveWord,
		moveLang,
		mark,
		revealOrAdvance,
		concept,
		activeFocus,
		fixes
	};
	(0, import_react.useEffect)(() => {
		function onKey(event) {
			const tag = event.target?.tagName;
			if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || tag === "BUTTON") return;
			if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
			const key = event.key;
			const now = actions.current;
			if (key === "ArrowDown") {
				event.preventDefault();
				now.moveWord(1);
			} else if (key === "ArrowUp") {
				event.preventDefault();
				now.moveWord(-1);
			} else if (key === "ArrowRight") {
				event.preventDefault();
				now.moveLang(1);
			} else if (key === "ArrowLeft") {
				event.preventDefault();
				now.moveLang(-1);
			} else if (key === "r" || key === "R") {
				event.preventDefault();
				now.mark("r");
			} else if (key === "w" || key === "W") {
				event.preventDefault();
				now.mark("w");
			} else if (key === " ") {
				event.preventDefault();
				now.revealOrAdvance();
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	const focusLang = LANG_BY_ID.get(activeFocus);
	const entry = concept && activeFocus ? mergeEntry(getBaseEntry(activeFocus, concept.id, concept.en), fixes[cardKey(activeFocus, concept.id)]) : void 0;
	const english = concept ? mergeEntry(getBaseEntry("en", concept.id, concept.en), fixes[cardKey("en", concept.id)]) : void 0;
	const enWord = english?.word || concept?.en || "";
	const enSentence = english?.sentence || concept?.sentence || "";
	const markState = concept && activeFocus ? cards[cardKey(activeFocus, concept.id)] : void 0;
	const fresh = items.filter((item) => !cards[cardKey(activeFocus, item.id)]).length;
	const railStart = Math.max(0, index - 18);
	const rail = deck.slice(railStart, railStart + 42);
	const chosen = readyTargets.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		scroll: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-1 flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shrink-0 border-b border-line",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2 md:px-6",
						children: [LEVEL_CHIPS.map((chip) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setLevel(chip.id);
								setQuery("");
								setEditing(false);
							},
							className: `min-h-11 shrink-0 rounded-full px-3 ${level === chip.id ? "bg-ink text-paper" : "bg-chip"}`,
							children: chip.label
						}, chip.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setParallelOnly((value) => !value),
							className: `min-h-11 shrink-0 rounded-full px-3 ${parallelOnly ? "bg-moss text-moss-ink" : "bg-chip"}`,
							children: parallelOnly ? "Translated" : "All words"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-6xl items-center gap-3 px-4 pb-2 md:px-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "sr-only",
							htmlFor: "group",
							children: "Group"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "group",
							value: activeGroup,
							onChange: (event) => setGroup(event.target.value),
							className: "min-h-11 min-w-0 flex-1 rounded-full border border-line bg-card px-3",
							children: groups.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: name,
								children: name
							}, name))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shrink-0 border-b border-line",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-2 md:px-6",
						children: [readyTargets.map((id) => {
							const lang = LANG_BY_ID.get(id);
							if (!lang) return null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setFocus(id),
								className: `inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-3 ${id === activeFocus ? "border-ink bg-ink text-paper" : "border-line bg-card"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { id }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: lang.name })]
							}, id);
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setPicking((value) => !value),
							className: "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-line bg-card px-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), picking ? "Close" : `Languages ${chosen}/12`]
						})]
					}), picking && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-h-[38dvh] overflow-y-auto border-t border-line px-4 py-3 md:px-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-3 text-sm text-muted",
							children: "Choose up to twelve. They stay as tabs on this card. English stays on the left."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto flex max-w-6xl flex-col gap-3",
							children: FAMILIES.map((family) => {
								const langs = LANGUAGES.filter((lang) => lang.family === family && lang.id !== "en");
								if (!langs.length) return null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-1 text-xs tracking-widest text-muted uppercase",
									children: family
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-2",
									children: langs.map((lang) => {
										const on = targets.includes(lang.id);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											disabled: !on && chosen >= 12,
											onClick: () => toggleTarget(lang.id),
											className: `inline-flex min-h-11 items-center gap-2 rounded-full border px-3 ${on ? "border-moss bg-moss text-moss-ink" : "border-line bg-card"} disabled:opacity-40`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { id: lang.id }), lang.name]
										}, lang.id);
									})
								})] }, family);
							})
						})]
					})]
				}),
				!activeFocus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid flex-1 place-items-center px-6 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-4xl",
						children: "Choose a language"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted",
						children: "Open Languages and turn on up to twelve. Each one becomes a tab on this card."
					})] })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid min-h-0 flex-1 md:grid-cols-[11rem_minmax(0,1fr)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "hidden min-h-0 border-r border-line md:flex md:flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "Find a word",
							className: "m-2 min-h-11 rounded-xl border border-line bg-card px-3"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain px-2 pb-2",
							children: rail.map((item, offset) => {
								const n = railStart + offset;
								const on = item.id === concept?.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										setConceptId(item.id);
										setEditing(false);
									},
									className: `flex min-h-11 w-full items-baseline justify-between gap-2 rounded-xl px-3 text-left ${on ? "bg-ink text-paper" : "hover:bg-chip"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: item.en
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-xs tabular-nums ${on ? "text-paper" : "text-muted"}`,
										children: n + 1
									})]
								}) }, item.id);
							})
						})]
					}), !concept ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid place-items-center px-6 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl",
							children: ready ? "Nothing in this group" : "Opening this group"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-muted",
							children: parallelOnly ? "Turn on All words, or pick another group. Translated cards are the ones with a line in this language." : "Pick another group."
						})] })
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "grid min-h-0 grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnglishSide, {
							item: concept,
							word: enWord,
							sentence: enSentence,
							plural: english?.plural || concept.plural,
							index,
							total: deck.length,
							stage: batchLabel(markState?.stage),
							revealed
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-h-0 flex-col overflow-y-auto overscroll-contain p-3 md:p-5",
							dir: focusLang?.dir,
							lang: focusLang?.speech,
							children: [
								revealed ? activeFocus === "isv" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InterslavicPanels, {
									conceptId: concept.id,
									en: concept.en,
									fixes
								}) : activeFocus === "ar" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArabicPanels, {
									conceptId: concept.id,
									en: concept.en,
									fixes
								}) : entry?.word ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Translation, {
									entry,
									speech: focusLang?.speech ?? "en-US",
									font: focusLang?.font
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-base text-muted md:text-lg",
									children: [focusLang?.name, " does not have this word yet. The picture and the English sentence are the meaning. Fix stores a correction on this device."]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid flex-1 place-items-center text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs tracking-widest text-muted uppercase",
											children: focusLang?.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 font-display text-3xl md:text-4xl",
											children: "Space"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm text-muted",
											children: "Reveals this word. The next space opens the next one."
										})
									] })
								}),
								revealed && focusLang?.voiceApprox && activeFocus !== "isv" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: "Speech uses the closest voice on this device."
								}),
								revealed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-auto flex flex-wrap gap-2 pt-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "min-h-11 rounded-full px-4 text-muted",
										onClick: () => setEditing((value) => !value),
										children: editing ? "Close fix" : "Fix this card"
									})
								}),
								status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-moss",
									children: status
								}),
								revealed && editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FixForm, {
									lang: activeFocus,
									conceptId: concept.id,
									entry: entry ?? {
										word: "",
										sentence: ""
									},
									onSave: saveFix,
									onClear: clearFix
								})
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "shrink-0 border-t border-line bg-paper",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-6xl flex-col gap-2 px-4 py-2 md:px-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden gap-2 text-xs text-muted md:flex",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full bg-chip px-2 py-1 tabular-nums",
									children: ["New ", fresh]
								}), BATCHES.map((batch, stage) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full bg-chip px-2 py-1 tabular-nums",
									children: [
										batch.label,
										" ",
										items.filter((item) => cards[cardKey(activeFocus, item.id)]?.stage === stage).length
									]
								}, batch.id))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => moveLang(-1),
										"aria-label": "Previous language",
										className: "grid min-h-12 min-w-12 place-items-center rounded-full border border-line bg-card",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => moveWord(-1),
										"aria-label": "Previous word",
										className: "grid min-h-12 min-w-12 place-items-center rounded-full border border-line bg-card md:hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => mark("w"),
										className: "min-h-12 flex-1 rounded-full border border-line bg-card text-base",
										children: ["Again ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted",
											children: "W"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => revealOrAdvance(),
										className: "min-h-12 flex-1 rounded-full bg-accent text-base text-accent-ink",
										children: [
											revealed ? "Next" : "Reveal",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "opacity-80",
												children: "Space"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => mark("r"),
										className: "min-h-12 flex-1 rounded-full bg-moss text-base text-moss-ink",
										children: ["Remembered ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "opacity-80",
											children: "R"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => moveWord(1),
										"aria-label": "Next word",
										className: "grid min-h-12 min-w-12 place-items-center rounded-full border border-line bg-card md:hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => moveLang(1),
										"aria-label": "Next language",
										className: "grid min-h-12 min-w-12 place-items-center rounded-full border border-line bg-card",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "hidden text-center text-xs text-muted md:block",
								children: "Space reveals this word, then the next. ← → change language and keep it open. ↑ ↓ move without revealing."
							})
						]
					})
				})
			]
		})
	});
}
function EnglishSide({ item, word, sentence, plural, index, total, stage, revealed }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-col gap-2 border-r border-line p-3 md:gap-3 md:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-xs tracking-widest text-muted uppercase",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { id: "en" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "English" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-auto font-sans tracking-normal normal-case tabular-nums",
						children: [
							index + 1,
							"/",
							total
						]
					})
				]
			}),
			revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl leading-none md:text-5xl",
						children: word
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Speak, {
						text: word,
						lang: "en-US",
						label: "Hear the English word"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 truncate text-sm text-muted",
					children: [
						posLabel(item.pos),
						plural ? ` · ${plural}` : "",
						" · ",
						stage
					]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl leading-none text-muted md:text-5xl",
				children: "····"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Space reveals the word"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-hidden rounded-2xl bg-chip",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plate, {
					src: item.image,
					alt: revealed ? word : "Picture"
				})
			}),
			revealed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "line-clamp-3 text-sm leading-snug md:text-base",
					children: sentence
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Speak, {
					text: sentence,
					lang: "en-US",
					label: "Hear the English sentence"
				})]
			})
		]
	});
}
function Translation({ entry, speech, font }) {
	const script = font ? { fontFamily: font } : void 0;
	const character = mandarinChar(entry.word, speech);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl leading-none md:text-5xl",
				style: script,
				children: entry.word
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Speak, {
				text: entry.word,
				lang: speech,
				label: "Hear the word"
			})]
		}),
		entry.reading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-base text-muted italic",
			children: entry.reading
		}),
		character && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StrokeOrder, {
			char: character,
			font
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex flex-wrap gap-2 text-sm",
			children: [
				entry.article && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: entry.article }),
				genderLabel(entry.gender) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: genderLabel(entry.gender) }),
				entry.plural && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, { children: ["plural ", entry.plural] }),
				entry.feminine && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, { children: ["feminine ", entry.feminine] }),
				entry.masculine && entry.masculine !== entry.word && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, { children: ["masculine ", entry.masculine] }),
				entry.neuter && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, { children: ["neuter ", entry.neuter] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex items-start gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-base leading-snug md:text-lg",
				style: script,
				children: entry.sentence
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Speak, {
				text: entry.sentence,
				lang: speech,
				label: "Hear the sentence"
			})]
		}),
		entry.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: entry.note
		})
	] });
}
function InterslavicPanels({ conceptId, en, fixes }) {
	const latin = mergeEntry(getBaseEntry("isv", conceptId, en), fixes[cardKey("isv", conceptId)]);
	const cyr = getBaseEntry("isv-Cyrl", conceptId, en);
	const glag = getBaseEntry("isv-Glag", conceptId, en);
	const blocks = [
		{
			title: "Latin",
			word: latin?.word,
			sentence: latin?.sentence,
			speech: "hr-HR"
		},
		{
			title: "Cyrillic",
			word: cyr?.word,
			sentence: cyr?.sentence,
			speech: "sr-RS"
		},
		{
			title: "Glagolitic",
			word: glag?.word,
			sentence: glag?.sentence,
			speech: "hr-HR",
			font: LANGUAGES.find((lang) => lang.id === "isv")?.font
		}
	];
	if (!latin?.word) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-base text-muted",
		children: "Interslavic does not have this word yet. Fix stores a Latin line on this device."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2",
		children: blocks.map((block) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border border-line bg-paper p-3",
			style: { fontFamily: block.font },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-widest text-muted uppercase",
					children: block.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl leading-none",
						children: block.word
					}), block.word && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Speak, {
						text: block.word,
						lang: block.speech,
						label: `Hear the ${block.title} word`
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex items-start gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-snug",
						children: block.sentence
					}), block.sentence && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Speak, {
						text: block.sentence,
						lang: block.speech,
						label: `Hear the ${block.title} sentence`
					})]
				})
			]
		}, block.title))
	});
}
function ArabicPanels({ conceptId, en, fixes }) {
	const blocks = [
		{
			title: "Standard",
			entry: mergeEntry(getBaseEntry("ar", conceptId, en), fixes[cardKey("ar", conceptId)]),
			speech: "ar"
		},
		{
			title: "Egyptian",
			entry: getBaseEntry("ar-eg", conceptId, en),
			speech: "ar-EG"
		},
		{
			title: "Saudi",
			entry: getBaseEntry("ar-sa", conceptId, en),
			speech: "ar-SA"
		}
	];
	if (!blocks.some((block) => block.entry?.word)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-base text-muted",
		children: "Arabic does not have this word yet. Fix stores a Standard line on this device."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2",
		children: blocks.map((block) => {
			const entry = block.entry;
			const extra = [
				entry?.feminine && `feminine ${entry.feminine}`,
				entry?.plural && `plural ${entry.plural}`,
				entry?.note
			].filter(Boolean).join(" · ");
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-line bg-paper p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-widest text-muted uppercase",
					dir: "ltr",
					children: block.title
				}), entry?.word ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl leading-none",
								children: entry.word
							}), entry.reading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted italic",
								dir: "ltr",
								children: entry.reading
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Speak, {
							text: entry.word,
							lang: block.speech,
							label: `Hear the ${block.title} word`
						})]
					}),
					extra && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						dir: "ltr",
						children: extra
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-snug",
							children: entry.sentence
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Speak, {
							text: entry.sentence,
							lang: block.speech,
							label: `Hear the ${block.title} sentence`
						})]
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Not in this variety yet."
				})]
			}, block.title);
		})
	});
}
function Speak({ text, lang, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		onClick: () => speak(text, lang),
		className: "grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-5 w-5" })
	});
}
function Chip({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "rounded-full bg-chip px-3 py-1",
		children
	});
}
function FixForm({ lang, conceptId, entry, onSave, onClear }) {
	const [word, setWord] = (0, import_react.useState)(entry.word);
	const [sentence, setSentence] = (0, import_react.useState)(entry.sentence);
	const [article, setArticle] = (0, import_react.useState)(entry.article ?? "");
	const [plural, setPlural] = (0, import_react.useState)(entry.plural ?? "");
	const [reading, setReading] = (0, import_react.useState)(entry.reading ?? "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid gap-2 border-t border-line pt-3",
		onSubmit: (event) => {
			event.preventDefault();
			onSave(lang, conceptId, {
				word,
				sentence,
				article: article || void 0,
				plural: plural || void 0,
				reading: reading || void 0
			});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm",
				children: ["Word", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: word,
					onChange: (event) => setWord(event.target.value),
					className: "mt-1 min-h-11 w-full rounded-xl border border-line bg-paper px-3"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-sm",
				children: ["Sentence", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: sentence,
					onChange: (event) => setSentence(event.target.value),
					className: "mt-1 min-h-11 w-full rounded-xl border border-line bg-paper px-3"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: article,
						onChange: (event) => setArticle(event.target.value),
						placeholder: "Article",
						className: "min-h-11 rounded-xl border border-line bg-paper px-3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: plural,
						onChange: (event) => setPlural(event.target.value),
						placeholder: "Plural",
						className: "min-h-11 rounded-xl border border-line bg-paper px-3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: reading,
						onChange: (event) => setReading(event.target.value),
						placeholder: "Transliteration",
						className: "min-h-11 rounded-xl border border-line bg-paper px-3"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "min-h-11 rounded-full bg-ink px-4 text-paper",
					children: "Save on this device"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-11 px-3 text-muted",
					onClick: () => onClear(lang, conceptId),
					children: "Reset"
				})]
			})
		]
	});
}
//#endregion
export { StudyPage as component };
