import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as LEXICON } from "./lexicon-Dbpe4LXG.mjs";
import { a as Shell, i as LANG_BY_ID, m as useConcord } from "./shell-WOgA0OuT.mjs";
import { n as stopSpeech, t as speak } from "./speech-DbfbLzfj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/talk-CPt3uSMK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DIALOGUES = [
	{
		id: "house",
		title: "At the house",
		scene: "Anna is at the door. Marko is inside.",
		turns: [
			{
				id: "d1a",
				speaker: "Anna"
			},
			{
				id: "d1b",
				speaker: "Marko"
			},
			{
				id: "d1c",
				speaker: "Anna"
			},
			{
				id: "d1d",
				speaker: "Marko"
			}
		]
	},
	{
		id: "road",
		title: "On the road",
		scene: "They are walking. The mountain is ahead.",
		turns: [
			{
				id: "d2a",
				speaker: "Anna"
			},
			{
				id: "d2b",
				speaker: "Marko"
			},
			{
				id: "d2c",
				speaker: "Anna"
			},
			{
				id: "d2d",
				speaker: "Marko"
			}
		]
	},
	{
		id: "night",
		title: "At night",
		scene: "The child is asleep. Rain is on the house.",
		turns: [
			{
				id: "d3a",
				speaker: "Anna"
			},
			{
				id: "d3b",
				speaker: "Marko"
			},
			{
				id: "d3c",
				speaker: "Anna"
			},
			{
				id: "d3d",
				speaker: "Marko"
			}
		]
	}
];
var DIALOGUE_EN = {
	d1a: "Hello. I am here.",
	d1b: "What is your name?",
	d1c: "My name is Anna. This is my friend.",
	d1d: "Come in. The bread is good.",
	d2a: "I see the mountain.",
	d2b: "The road is long.",
	d2c: "The sun is hot.",
	d2d: "We sit, and I drink water.",
	d3a: "The child sleeps.",
	d3b: "I see the moon.",
	d3c: "I hear the rain.",
	d3d: "The house is small and good."
};
function TalkPage() {
	const focus = useConcord((s) => s.focus);
	const source = useConcord((s) => s.source);
	const targets = useConcord((s) => s.targets);
	const setFocus = useConcord((s) => s.setFocus);
	const [showMeaning, setShowMeaning] = (0, import_react.useState)(true);
	const lang = LANG_BY_ID.get(focus);
	const sourceLang = LANG_BY_ID.get(source);
	const pack = LEXICON[focus];
	const sourcePack = LEXICON[source];
	const chorus = targets.filter((id) => id !== focus && LEXICON[id]).slice(0, 12);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8 md:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold tracking-widest text-accent uppercase",
					children: "Conversations"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-5xl",
					children: "Three scenes, one meaning."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setShowMeaning((v) => !v),
					className: "min-h-11 rounded-full border border-line bg-card px-4",
					children: showMeaning ? "Hide the meaning" : "Show the meaning"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto",
				children: targets.filter((id) => LEXICON[id]).map((id) => {
					const item = LANG_BY_ID.get(id);
					if (!item) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							stopSpeech();
							setFocus(id);
						},
						className: `min-h-11 shrink-0 rounded-full px-3 ${id === focus ? "bg-ink text-paper" : "bg-chip"}`,
						children: item.name
					}, id);
				})
			}),
			DIALOGUES.map((dialogue) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-line bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "border-b border-line px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl",
						children: dialogue.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: dialogue.scene
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: dialogue.turns.map((turn) => {
					const line = pack?.lines[turn.id];
					const meaning = sourcePack?.lines[turn.id] ?? DIALOGUE_EN[turn.id];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-b border-line px-5 py-4 last:border-b-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs tracking-widest text-muted uppercase",
									children: turn.speaker
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "min-h-11 rounded-full px-3 text-sm text-accent",
									onClick: () => line && lang && speak(line, lang.speech),
									children: "Listen"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl leading-snug",
								dir: lang?.dir,
								lang: lang?.speech,
								style: { fontFamily: lang?.font },
								children: line ?? "This line is not in the lexicon yet."
							}),
							focus === "ar" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-2 space-y-1",
								children: [[
									"Egyptian",
									"ar-eg",
									"ar-EG"
								], [
									"Saudi",
									"ar-sa",
									"ar-SA"
								]].map(([label, id, speech]) => {
									const text = LEXICON[id]?.lines[turn.id];
									if (!text) return null;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start justify-between gap-3 text-lg",
										dir: "rtl",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mr-2 text-xs tracking-wide text-muted uppercase",
											dir: "ltr",
											children: label
										}), text] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "min-h-11 shrink-0 rounded-full px-3 text-sm text-accent",
											onClick: () => speak(text, speech),
											children: "Listen"
										})]
									}, id);
								})
							}),
							showMeaning && source !== focus && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-muted",
								dir: sourceLang?.dir,
								lang: sourceLang?.speech,
								children: meaning
							}),
							chorus.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 space-y-1 text-sm text-muted",
								children: chorus.slice(0, 12).map((id) => {
									const other = LANG_BY_ID.get(id);
									const text = LEXICON[id]?.lines[turn.id];
									if (!other || !text) return null;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										dir: other.dir,
										lang: other.speech,
										style: { fontFamily: other.font },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mr-2 text-xs tracking-wide uppercase",
											children: other.name
										}), text]
									}, id);
								})
							})
						]
					}, turn.id);
				}) })]
			}, dialogue.id))
		]
	}) });
}
//#endregion
export { TalkPage as component };
