import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as leagueFor } from "./score-Dwg2HOzd.mjs";
import { a as Shell, c as connectTo, d as getPerson, h as useStanding, i as LANG_BY_ID } from "./shell-WOgA0OuT.mjs";
import { n as useCurrentUserState } from "./use-current-user-DHhD3EMN.mjs";
import { t as Flag } from "./flag-CxFaRrlz.mjs";
import { n as Route$1 } from "./router-BgyhyJL-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/people._handle-lhP69CD8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PersonPage() {
	const { handle } = Route$1.useParams();
	const session = useCurrentUserState();
	const standing = useStanding();
	const [person, setPerson] = (0, import_react.useState)(void 0);
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let live = true;
		setPerson(void 0);
		getPerson({ data: handle }).then((row) => {
			if (live) setPerson(row);
		}).catch(() => {
			if (live) setPerson(null);
		});
		return () => {
			live = false;
		};
	}, [handle]);
	const mine = standing.mine;
	const connected = Boolean(mine && person && mine.following.includes(person.handle));
	const self = Boolean(mine && person && mine.handle === person.handle);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 md:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/league",
					className: "text-muted",
					children: "League"
				})
			}),
			person === void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-36 animate-pulse rounded-2xl bg-chip" }),
			person === null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl",
				children: "No one uses that link."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "Check the spelling, or look for them on the league board."
			})] }),
			person && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-widest text-accent uppercase",
						children: leagueFor(person.score).name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 text-4xl",
						children: person.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted",
						children: ["/", person.handle]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 max-w-xl text-sm text-muted",
						children: [
							person.learned.toLocaleString(),
							" learned · ",
							person.held.toLocaleString(),
							" still remembered · ",
							person.firm.toLocaleString(),
							" firm.",
							person.streak > 0 ? ` ${person.streak} ${person.streak === 1 ? "day" : "days"} in a row.` : "",
							` ${person.weekPoints.toLocaleString()} this week.`
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [self ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/league",
							className: "inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-sm text-paper",
							children: "This is you"
						}) : mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: busy,
							onClick: () => {
								setBusy(true);
								setError("");
								connectTo(person.handle, !connected).then((result) => {
									if (!result.ok) setError(result.error);
								}).catch(() => setError("Could not connect.")).finally(() => setBusy(false));
							},
							className: `inline-flex min-h-11 items-center rounded-full px-4 text-sm ${connected ? "bg-moss text-moss-ink" : "bg-accent text-accent-ink"}`,
							children: busy ? "Saving" : connected ? "Connected" : "Connect"
						}) : !session.isPending && !session.user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "inline-flex min-h-11 items-center rounded-full bg-accent px-4 text-sm text-accent-ink",
							children: "Sign in to connect"
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								const url = new URL(`/people/${person.handle}`, window.location.href).toString();
								navigator.clipboard?.writeText(url).then(() => {
									setCopied(true);
									window.setTimeout(() => setCopied(false), 1600);
								}).catch(() => setCopied(false));
							},
							className: "inline-flex min-h-11 items-center rounded-full border border-line bg-card px-4 text-sm",
							children: copied ? "Copied" : "Copy link"
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-accent",
						children: error
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Score",
							value: person.score.toLocaleString()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Learned",
							value: person.learned.toLocaleString()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Remembered",
							value: person.held.toLocaleString()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Firm",
							value: person.firm.toLocaleString()
						})
					]
				}),
				person.languages.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl",
					children: "Studying"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex flex-wrap gap-2",
					children: person.languages.map((id) => {
						const lang = LANG_BY_ID.get(id);
						if (!lang) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "inline-flex min-h-10 items-center gap-2 rounded-full bg-chip px-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { id }), lang.name]
						}, id);
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl",
					children: "Connected with"
				}), person.with.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "No one yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 divide-y divide-line border-y border-line",
					children: person.with.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/people/$handle",
						params: { handle: item.handle },
						className: "flex min-h-12 items-baseline gap-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xl",
							children: item.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm text-muted",
							children: ["/", item.handle]
						})]
					}) }, item.handle))
				})] })
			] })
		]
	}) });
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-card px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-widest text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-3xl tabular-nums",
			children: value
		})]
	});
}
//#endregion
export { PersonPage as component };
