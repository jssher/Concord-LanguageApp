import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Shell, i as LANG_BY_ID, m as useConcord, r as LANGUAGES } from "./shell-WOgA0OuT.mjs";
import { t as Flag } from "./flag-CxFaRrlz.mjs";
import { t as StrokeOrder } from "./strokes-BaqE-lO0.mjs";
import { n as stopSpeech, r as warmVoices, t as speak } from "./speech-DbfbLzfj.mjs";
import { t as Volume2 } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/letters-tObOeT8P.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var pending = null;
function loadAlphabets() {
	if (!pending) pending = fetch("/letters/alphabets.json").then((response) => {
		if (!response.ok) throw new Error("letters");
		return response.json();
	}).catch((error) => {
		pending = null;
		throw error;
	});
	return pending;
}
function isScriptList(id) {
	return id === "zh" || id === "yue" || id === "ja";
}
function isHanGlyph(glyph) {
	const chars = [...glyph];
	return chars.length === 1 && /\p{Script=Han}/u.test(chars[0]);
}
function matches(item, needle) {
	if (!needle) return true;
	return `${item.glyph} ${item.name} ${item.sound} ${item.word} ${item.gloss} ${item.reading ?? ""} ${item.note ?? ""}`.toLowerCase().includes(needle);
}
function LettersPage() {
	const focus = useConcord((s) => s.focus);
	const targets = useConcord((s) => s.targets);
	const [charts, setCharts] = (0, import_react.useState)(null);
	const [failed, setFailed] = (0, import_react.useState)(false);
	const [lang, setLang] = (0, import_react.useState)(focus && focus !== "en" ? focus : targets.find((id) => id !== "en") || "en");
	const [groupId, setGroupId] = (0, import_react.useState)("");
	const [view, setView] = (0, import_react.useState)("chart");
	const [covered, setCovered] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [activeKey, setActiveKey] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		warmVoices();
		let live = true;
		loadAlphabets().then((data) => {
			if (live) setCharts(data);
		}).catch(() => {
			if (live) setFailed(true);
		});
		return () => {
			live = false;
			stopSpeech();
		};
	}, []);
	const ids = (0, import_react.useMemo)(() => {
		if (!charts) return [];
		const known = new Set(Object.keys(charts));
		const chosen = targets.filter((id) => known.has(id) && id !== "en");
		const rest = LANGUAGES.map((item) => item.id).filter((id) => known.has(id) && !chosen.includes(id));
		return [...chosen, ...rest];
	}, [charts, targets]);
	const current = ids.includes(lang) ? lang : ids[0] ?? "";
	const meta = LANG_BY_ID.get(current);
	const chart = current && charts ? charts[current] : void 0;
	const activeGroupId = groupId === "all" && view === "words" ? "all" : chart?.groups.some((item) => item.id === groupId) ? groupId : chart?.groups[0]?.id ?? "";
	const groups = !chart ? [] : activeGroupId === "all" ? chart.groups : chart.groups.filter((item) => item.id === activeGroupId);
	const needle = query.trim().toLowerCase();
	const rows = (0, import_react.useMemo)(() => {
		const out = [];
		for (const group of groups) group.items.forEach((item, index) => {
			if (!matches(item, needle)) return;
			out.push({
				item,
				index,
				groupId: group.id,
				groupName: group.name,
				key: `${group.id}-${index}`
			});
		});
		return out;
	}, [groups, needle]);
	const selected = rows.find((row) => row.key === activeKey) ?? rows[0];
	const han = Boolean(selected && isHanGlyph(selected.item.glyph));
	const revealed = !covered || view !== "words" || open;
	const blocks = (0, import_react.useMemo)(() => {
		const out = [];
		for (const row of rows) {
			const inner = row.item.section ?? "";
			const title = activeGroupId === "all" ? inner ? `${row.groupName} · ${inner}` : row.groupName : inner;
			const last = out[out.length - 1];
			if (!last || last.title !== title) out.push({
				key: `${title}-${row.key}`,
				title,
				items: []
			});
			out[out.length - 1].items.push(row);
		}
		return out;
	}, [rows, activeGroupId]);
	(0, import_react.useEffect)(() => {
		setActiveKey("");
		setOpen(false);
		setQuery("");
	}, [
		current,
		activeGroupId,
		view
	]);
	(0, import_react.useEffect)(() => {
		if (!selected) return;
		document.getElementById(`letter-${current}-${selected.key}`)?.scrollIntoView({ block: "nearest" });
	}, [selected, current]);
	function move(step) {
		if (!rows.length || !selected) return;
		const at = Math.max(0, rows.findIndex((row) => row.key === selected.key));
		const next = rows[(at + step + rows.length) % rows.length];
		setActiveKey(next.key);
		setOpen(false);
		if (meta && (view === "chart" || !covered)) speak(next.item.word, meta.speech);
	}
	function reveal() {
		if (!selected || !meta) return;
		setOpen(true);
		speak(selected.item.word, meta.speech);
	}
	(0, import_react.useEffect)(() => {
		function onKey(event) {
			const tag = event.target?.tagName;
			if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
			if (event.key === " " || event.key === "ArrowRight" || event.key === "ArrowDown") {
				event.preventDefault();
				if (view === "words" && covered && !open) reveal();
				else move(1);
			} else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
				event.preventDefault();
				move(-1);
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	});
	const font = meta?.font ? { fontFamily: meta.font } : void 0;
	const wordCount = rows.length;
	function chooseLang(id) {
		setLang(id);
		setGroupId(view === "words" && isScriptList(id) ? "all" : "");
	}
	function showChart() {
		setView("chart");
		if (groupId === "all") setGroupId("");
	}
	function showWords() {
		if (view !== "words" && isScriptList(current)) setGroupId("all");
		setView("words");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		scroll: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-full min-h-0 w-full max-w-6xl flex-col gap-3 px-4 py-3 md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex shrink-0 flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl leading-none",
							children: "Alphabet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-w-0 flex-1 items-center gap-2 sm:flex-none",
							children: [current && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { id: current }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: current,
								onChange: (event) => chooseLang(event.target.value),
								"aria-label": "Alphabet language",
								className: "min-h-11 min-w-0 flex-1 rounded-full border border-line bg-card px-3 text-sm sm:w-52",
								children: ids.map((id) => {
									const item = LANG_BY_ID.get(id);
									if (!item) return null;
									const learning = targets.includes(id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: id,
										children: [learning ? "● " : "", item.name]
									}, id);
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: view === "words" ? "Find a word" : "Find a letter or word",
							"aria-label": view === "words" ? "Find a word" : "Find a letter or word",
							className: "min-h-11 min-w-0 flex-1 rounded-full border border-line bg-card px-3 text-sm sm:max-w-56"
						}),
						chart && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								wordCount.toLocaleString(),
								" ",
								view === "words" ? wordCount === 1 ? "word" : "words" : wordCount === 1 ? "letter" : "letters"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex rounded-full bg-chip p-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": view === "chart",
							onClick: showChart,
							className: `min-h-10 rounded-full px-3 text-sm ${view === "chart" ? "bg-ink text-paper" : "text-muted"}`,
							children: "Letters"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": view === "words",
							onClick: showWords,
							className: `min-h-10 rounded-full px-3 text-sm ${view === "words" ? "bg-ink text-paper" : "text-muted"}`,
							children: "Memory words"
						})]
					}), view === "words" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": covered,
						onClick: () => {
							setCovered((value) => !value);
							setOpen(false);
						},
						className: `min-h-10 rounded-full border px-3 text-sm ${covered ? "border-moss bg-moss text-moss-ink" : "border-line bg-card text-muted"}`,
						children: covered ? "Words covered" : "Cover the words"
					})]
				}),
				chart && chart.groups.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 gap-1 overflow-x-auto",
					children: [view === "words" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": activeGroupId === "all",
						onClick: () => setGroupId("all"),
						className: `shrink-0 rounded-full px-3 py-2 text-sm ${activeGroupId === "all" ? "bg-ink text-paper" : "border border-line bg-card text-muted"}`,
						children: "All"
					}), chart.groups.map((item) => {
						const on = item.id === activeGroupId;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": on,
							onClick: () => setGroupId(item.id),
							className: `shrink-0 rounded-full px-3 py-2 text-sm ${on ? "bg-ink text-paper" : "border border-line bg-card text-muted"}`,
							children: item.name
						}, item.id);
					})]
				}),
				!charts && !failed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Opening the alphabets…"
				}),
				failed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "The alphabet list did not open. Try the page again."
				}),
				chart && groups.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid min-h-0 flex-1 gap-3 lg:grid-cols-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "order-2 min-h-0 overflow-y-auto overscroll-contain lg:order-1 lg:col-span-3",
						children: [
							chart.note && !needle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-3 text-sm text-muted",
								children: chart.note
							}),
							view === "chart" ? blocks.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "mb-4",
								children: [section.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mb-2 text-xs font-semibold tracking-widest text-muted uppercase",
									children: section.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-6 gap-1.5 sm:grid-cols-8 xl:grid-cols-10",
									dir: meta?.dir,
									children: section.items.map((row) => {
										const on = row.key === selected?.key;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											id: `letter-${current}-${row.key}`,
											type: "button",
											dir: meta?.dir,
											"aria-pressed": on,
											"aria-label": `${row.item.glyph}, ${row.item.gloss}`,
											title: `${row.item.word} · ${row.item.gloss}`,
											onClick: () => {
												setActiveKey(row.key);
												if (meta) speak(row.item.word, meta.speech);
											},
											style: font,
											className: `grid min-h-11 place-items-center rounded-xl border px-1 text-xl leading-none ${on ? "border-moss bg-moss text-moss-ink" : "border-line bg-card"}`,
											children: row.item.glyph
										}, row.key);
									})
								})]
							}, section.key)) : blocks.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "mb-5",
								children: [section.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mb-2 text-xs font-semibold tracking-widest text-muted uppercase",
									children: section.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "flex flex-col gap-1.5",
									children: section.items.map((row) => {
										const on = row.key === selected?.key;
										const show = !covered || on && open;
										const same = row.item.word === row.item.glyph;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											id: `letter-${current}-${row.key}`,
											className: "flex items-stretch gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												dir: meta?.dir,
												"aria-pressed": on,
												"aria-label": show ? `${row.item.glyph}, ${row.item.word}, ${row.item.gloss}` : row.item.glyph,
												onClick: () => {
													if (row.key !== selected?.key) {
														setActiveKey(row.key);
														setOpen(false);
														if (!covered && meta) speak(row.item.word, meta.speech);
														return;
													}
													setOpen(true);
													if (meta) speak(row.item.word, meta.speech);
												},
												className: `grid min-h-14 min-w-0 flex-1 grid-cols-[3.25rem_minmax(0,1fr)] items-center gap-3 rounded-2xl border px-3 py-2 text-left ${on ? "border-moss bg-moss text-moss-ink" : "border-line bg-card"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-center text-3xl leading-none",
													style: font,
													children: row.item.glyph
												}), show ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "min-w-0",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block break-words text-lg leading-tight",
														style: font,
														children: same ? row.item.gloss : row.item.word
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: `block break-words text-sm ${on ? "opacity-80" : "text-muted"}`,
														children: same ? row.item.reading || row.item.sound : `${row.item.sound}${row.item.gloss ? ` · ${row.item.gloss}` : ""}`
													})]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `text-sm ${on ? "opacity-80" : "text-muted"}`,
													children: on ? "Space shows the word" : "Covered"
												})]
											}), show && meta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Speak, {
												text: row.item.word,
												lang: meta.speech,
												label: `Hear ${row.item.word}`
											})]
										}, row.key);
									})
								})]
							}, section.key)),
							rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Nothing matches that."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "pb-2 text-xs text-muted",
								children: view === "words" && covered ? "Space shows the word, then the next letter. Arrows move without revealing." : "Space or the arrow keys move to the next letter and say the word."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "order-1 max-h-72 overflow-y-auto rounded-2xl border border-line bg-card p-4 lg:order-2 lg:col-span-2 lg:max-h-none",
						children: selected && meta ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LetterDetail, {
							item: selected.item,
							speech: meta.speech,
							dir: meta.dir,
							font,
							han,
							hidden: view === "words" && !revealed,
							place: rows.findIndex((row) => row.key === selected.key) + 1,
							total: rows.length
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Choose a letter."
						})
					})]
				})
			]
		})
	});
}
function LetterDetail({ item, speech, dir, font, han, hidden, place, total }) {
	const same = item.word === item.glyph;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs text-muted",
			children: [
				place,
				" of ",
				total
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex items-end gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-6xl leading-none",
				dir,
				style: font,
				children: item.glyph
			}), !hidden && same && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Speak, {
				text: item.word,
				lang: speech,
				label: `Hear ${item.word}`
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm text-muted",
			children: [item.name, item.sound && item.sound !== item.name ? ` · ${item.sound}` : ""]
		}),
		hidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-muted",
			children: "The memory word is covered. Space shows it."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			!same && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "min-w-0 break-words text-3xl leading-tight",
					dir,
					style: font,
					children: item.word
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Speak, {
					text: item.word,
					lang: speech,
					label: `Hear ${item.word}`
				})]
			}),
			item.reading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted italic",
				children: item.reading
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-lg",
				children: item.gloss
			}),
			item.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: item.note
			})
		] }),
		han && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-widest text-muted uppercase",
				children: "Stroke order"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StrokeOrder, {
					char: item.glyph,
					font: font?.fontFamily,
					radical: item.radical,
					traditional: item.traditional,
					bare: true
				})
			})]
		}),
		!hidden && (item.radical || item.traditional && item.traditional !== item.glyph || item.simplified && item.simplified !== item.glyph) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 text-sm text-muted",
			style: font,
			children: [
				item.radical && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Radical ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xl text-ink",
					children: item.radical
				})] }),
				item.traditional && item.traditional !== item.glyph && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1",
					children: ["Traditional ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xl text-ink",
						children: item.traditional
					})]
				}),
				item.simplified && item.simplified !== item.glyph && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1",
					children: ["Simplified ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xl text-ink",
						children: item.simplified
					})]
				})
			]
		})
	] });
}
function Speak({ text, lang, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		onClick: () => speak(text, lang),
		className: "grid h-11 w-11 shrink-0 place-items-center self-center rounded-full border border-line bg-paper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-5 w-5" })
	});
}
//#endregion
export { LettersPage as component };
