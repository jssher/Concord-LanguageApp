import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as LESSONS } from "./grammar-0O39Cdhm.mjs";
import { a as Shell, m as useConcord, r as LANGUAGES, t as BATCHES } from "./shell-WOgA0OuT.mjs";
import { t as Flag } from "./flag-CxFaRrlz.mjs";
import { a as useOutline, t as LEVELS } from "./course-Cr79ZU-N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/path-a-4JWbL_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PathPage() {
	const focus = useConcord((s) => s.focus);
	const normalize = useConcord((s) => s.normalize);
	const setLevel = useConcord((s) => s.setLevel);
	const setGroup = useConcord((s) => s.setGroup);
	const outline = useOutline();
	const lang = LANGUAGES.find((item) => item.id === focus) ?? LANGUAGES.find((item) => item.id === "de");
	(0, import_react.useEffect)(() => {
		normalize();
	}, [normalize]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-3xl flex-col gap-12 px-4 py-10 pb-24 md:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold tracking-widest text-accent uppercase",
					children: "What to learn"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-5xl",
					children: "A1 through B2, in order."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-lg text-muted",
					children: [
						outline ? `The shelf is ${outline.words.toLocaleString()} English words, each with a sentence, then ${outline.phrases.toLocaleString()} useful sentences and dialogue lines.` : "The shelf runs from A1 to B2, then useful sentences and short dialogues.",
						" ",
						"The opening cards are translated in every language on the list. Later groups stay in English until a line is saved on the card."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/letters",
						className: "text-lg",
						children: "Start with the alphabet"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: " — each alphabet, then a beginner word to hold the letter. Chinese lists every character in the course, with the stroke order. Japanese is split into hiragana, katakana, and the kanji from the course."
					})]
				})
			] }),
			LEVELS.map((level) => {
				const row = outline?.levels.find((item) => item.id === level.id);
				const groups = row?.groups ?? [];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-3xl",
						children: [level.label, row ? ` · ${row.count.toLocaleString()}` : ""]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted",
						children: level.aim
					}),
					groups.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-6 divide-y divide-line border-y border-line",
						children: groups.map((group, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid gap-2 py-4 sm:grid-cols-[8rem_minmax(0,1fr)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl tabular-nums",
								children: String(index + 1).padStart(2, "0")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/study",
									className: "text-2xl",
									onClick: () => {
										setLevel(level.id);
										setGroup(group.name);
									},
									children: group.name.replace(/^\d+\s/, "")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-muted",
									children: [
										group.count.toLocaleString(),
										" ",
										level.id === "P" ? "lines" : "cards"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm",
									children: group.sample
								})
							] })]
						}, group.name))
					})
				] }, level.id);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl",
					children: "How a card comes back"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					children: "R moves a card one step to the right. W returns it to the first batch. Each language keeps its own place for the same word."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4",
					children: BATCHES.map((batch, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-2xl border border-line bg-card px-3 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted tabular-nums",
							children: ["0", index + 1]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl",
							children: batch.label
						})]
					}, batch.id))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl",
				children: "Grammar, in order"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-4 space-y-3",
				children: LESSONS.map((lesson) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl text-accent tabular-nums",
						children: lesson.n
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/grammar",
						className: "text-xl",
						children: lesson.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: lesson.summary
					})] })]
				}, lesson.id))
			})] }),
			lang && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-2 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { id: lang.id }),
					" Focused language: ",
					lang.name,
					". Fixes you type on a card stay on this device."
				]
			})
		]
	}) });
}
//#endregion
export { PathPage as component };
