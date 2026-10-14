import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as leagueFor } from "./score-Dwg2HOzd.mjs";
import { a as Shell, h as useStanding, m as useConcord, n as FAMILIES, r as LANGUAGES } from "./shell-WOgA0OuT.mjs";
import { t as Flag } from "./flag-CxFaRrlz.mjs";
import { a as useOutline } from "./course-Cr79ZU-N.mjs";
import { t as Plate } from "./plate-YccgCF7P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C_13x-pp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const targets = useConcord((s) => s.targets);
	const toggleTarget = useConcord((s) => s.toggleTarget);
	const normalize = useConcord((s) => s.normalize);
	const outline = useOutline();
	const standing = useStanding();
	const [query, setQuery] = (0, import_react.useState)("");
	const [family, setFamily] = (0, import_react.useState)("");
	const chosen = targets.filter((id) => id !== "en").length;
	const needle = query.trim().toLowerCase();
	const languages = LANGUAGES.filter((lang) => {
		if (lang.id === "en") return false;
		if (family && lang.family !== family) return false;
		if (!needle) return true;
		return `${lang.name} ${lang.native} ${lang.family}`.toLowerCase().includes(needle);
	}).sort((a, b) => a.name.localeCompare(b.name, "en"));
	(0, import_react.useEffect)(() => {
		normalize();
	}, [normalize]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid h-full min-h-0 w-full max-w-6xl grid-rows-[auto_minmax(0,1fr)] gap-3 px-4 py-3 md:px-6 lg:grid-cols-[17rem_minmax(0,1fr)] lg:grid-rows-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex min-h-0 flex-col gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-widest text-accent uppercase",
						children: "Parallel course"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 text-3xl leading-none text-ink md:text-4xl",
						children: "English on the left. Your languages on the card."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Space reveals the word, then the next one. Up to twelve languages share the card, and switching one does not hide the word."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: outline ? `${outline.words.toLocaleString()} words · A1–B2 · ${outline.phrases.toLocaleString()} phrases` : "A1 through B2"
					}),
					standing.mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/league",
							children: [
								leagueFor(standing.mine.score).name,
								" · ",
								standing.mine.score.toLocaleString(),
								" points · ",
								standing.mine.held.toLocaleString(),
								" still remembered"
							]
						})
					}) : standing.status === "ready" || standing.status === "guest" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/league",
							children: "Join a league with your name"
						})
					}) : null
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/study",
							className: "inline-flex min-h-10 items-center rounded-full bg-accent px-4 text-sm text-accent-ink",
							children: "Open the deck"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/letters",
							className: "inline-flex min-h-10 items-center rounded-full border border-line bg-card px-4 text-sm",
							children: "Alphabet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/path",
							className: "inline-flex min-h-10 items-center rounded-full border border-line bg-card px-4 text-sm",
							children: "Path"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/grammar",
							className: "inline-flex min-h-10 items-center rounded-full border border-line bg-card px-4 text-sm",
							children: "Grammar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/talk",
							className: "inline-flex min-h-10 items-center rounded-full border border-line bg-card px-4 text-sm",
							children: "Talk"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "hidden overflow-hidden rounded-2xl border border-line bg-card sm:block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-28 bg-chip",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plate, {
							src: "water",
							alt: "A pitcher of water"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
						className: "flex items-baseline gap-3 px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2 font-display text-xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { id: "en" }), " water"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-sm text-muted",
							children: "The water is cold."
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs leading-relaxed text-muted",
					children: "Left and right change the language tab. Up and down move without revealing. R means remembered, W means again. A remembered card waits 3 days, then a week, and longer after that."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex min-h-0 flex-col rounded-2xl border border-line bg-card p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl",
						children: "I’m learning"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm text-muted",
						children: [chosen, "/12"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: "Find a language",
						"aria-label": "Find a language",
						className: "min-h-10 min-w-0 flex-1 rounded-full border border-line bg-paper px-3 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: family,
						onChange: (event) => setFamily(event.target.value),
						"aria-label": "Language family",
						className: "min-h-10 rounded-full border border-line bg-paper px-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "All families"
						}), FAMILIES.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: name,
							children: name
						}, name))]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 min-h-0 flex-1 overflow-y-auto overscroll-contain",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-1.5 sm:grid-cols-4 xl:grid-cols-5",
					children: languages.map((lang) => {
						const on = targets.includes(lang.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: !on && chosen >= 12,
							title: `${lang.native} · ${lang.family}`,
							"aria-pressed": on,
							"aria-label": `${lang.name}, ${lang.native}`,
							onClick: () => toggleTarget(lang.id),
							className: `flex min-h-10 items-center gap-2 rounded-xl border px-2 text-left text-sm ${on ? "border-moss bg-moss text-moss-ink" : "border-line bg-paper"} disabled:opacity-40`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { id: lang.id }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: lang.name
							})]
						}, lang.id);
					})
				}), languages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-1 py-6 text-sm text-muted",
					children: "No language matches that."
				})]
			})]
		})]
	}) });
}
//#endregion
export { Home as component };
