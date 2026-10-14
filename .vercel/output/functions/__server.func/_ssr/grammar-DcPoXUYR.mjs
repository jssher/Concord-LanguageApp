import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as getBaseEntry } from "./lexicon-Dbpe4LXG.mjs";
import { n as CONCEPT_BY_ID } from "./concepts-PlhwSifQ.mjs";
import { t as LESSONS } from "./grammar-0O39Cdhm.mjs";
import { a as Shell, i as LANG_BY_ID, m as useConcord, s as cardKey } from "./shell-WOgA0OuT.mjs";
import { t as mergeEntry } from "./entry-DVwZTeSD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/grammar-DcPoXUYR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GrammarPage() {
	const [current, setCurrent] = (0, import_react.useState)(LESSONS[0].id);
	const focus = useConcord((s) => s.focus);
	const source = useConcord((s) => s.source);
	const fixes = useConcord((s) => s.fixes);
	const setConceptId = useConcord((s) => s.setConceptId);
	const lesson = LESSONS.find((item) => item.id === current) ?? LESSONS[0];
	const lang = LANG_BY_ID.get(focus);
	const note = lang && lesson.families[lang.family] || lesson.families.default;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 md:grid-cols-[16rem_minmax(0,1fr)] md:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "space-y-1",
			children: LESSONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setCurrent(item.id),
				className: `flex min-h-11 w-full items-baseline gap-3 rounded-xl px-3 text-left ${item.id === lesson.id ? "bg-ink text-paper" : "hover:bg-chip"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular-nums",
					children: item.n
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.title })]
			}) }, item.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm tracking-widest text-accent uppercase",
					children: ["Lesson ", lesson.n]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-5xl",
					children: lesson.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-lg",
					children: lesson.body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "mt-6 rounded-2xl border border-line bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-widest text-muted uppercase",
							children: lang ? `${lang.name} · ${lang.family}` : "Note"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-lg",
							children: note
						}),
						lang && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: lang.tip
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-8 text-2xl",
					children: "Practice on these cards"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y divide-line border-y border-line",
					children: lesson.examples.map((id) => {
						const concept = CONCEPT_BY_ID.get(id);
						const entry = mergeEntry(getBaseEntry(focus, id), fixes[cardKey(focus, id)]);
						const anchor = mergeEntry(getBaseEntry(source, id), fixes[cardKey(source, id)]);
						if (!concept) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/study",
							onClick: () => setConceptId(id),
							className: "flex min-h-14 items-baseline justify-between gap-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xl",
								dir: lang?.dir,
								style: { fontFamily: lang?.font },
								children: entry?.word ?? concept.gloss
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted",
								children: anchor?.sentence ?? concept.sentence
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-accent",
								children: "Study"
							})]
						}) }, id);
					})
				})
			]
		})]
	}) });
}
//#endregion
export { GrammarPage as component };
