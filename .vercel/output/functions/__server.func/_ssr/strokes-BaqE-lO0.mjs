import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/strokes-BaqE-lO0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var HANZI = {
	我: {
		radical: "戈",
		traditional: "我"
	},
	你: {
		radical: "亻",
		traditional: "你"
	},
	门: {
		radical: "门",
		traditional: "門"
	},
	床: {
		radical: "广",
		traditional: "床"
	},
	书: {
		radical: "乛",
		traditional: "書"
	},
	水: {
		radical: "水",
		traditional: "水"
	},
	火: {
		radical: "火",
		traditional: "火"
	},
	鱼: {
		radical: "鱼",
		traditional: "魚"
	},
	吃: {
		radical: "口",
		traditional: "吃"
	},
	喝: {
		radical: "口",
		traditional: "喝"
	},
	走: {
		radical: "走",
		traditional: "走"
	},
	来: {
		radical: "一",
		traditional: "來"
	},
	坐: {
		radical: "土",
		traditional: "坐"
	},
	给: {
		radical: "纟",
		traditional: "給"
	},
	树: {
		radical: "木",
		traditional: "樹"
	},
	花: {
		radical: "艹",
		traditional: "花"
	},
	雨: {
		radical: "雨",
		traditional: "雨"
	},
	山: {
		radical: "山",
		traditional: "山"
	},
	河: {
		radical: "氵",
		traditional: "河"
	},
	狗: {
		radical: "犭",
		traditional: "狗"
	},
	猫: {
		radical: "犭",
		traditional: "貓"
	},
	鸟: {
		radical: "鸟",
		traditional: "鳥"
	},
	手: {
		radical: "手",
		traditional: "手"
	},
	头: {
		radical: "大",
		traditional: "頭"
	},
	嘴: {
		radical: "口",
		traditional: "嘴"
	},
	脚: {
		radical: "月",
		traditional: "腳"
	},
	路: {
		radical: "足",
		traditional: "路"
	},
	海: {
		radical: "氵",
		traditional: "海"
	},
	一: {
		radical: "一",
		traditional: "一"
	},
	二: {
		radical: "二",
		traditional: "二"
	},
	大: {
		radical: "大",
		traditional: "大"
	},
	小: {
		radical: "小",
		traditional: "小"
	},
	好: {
		radical: "女",
		traditional: "好"
	},
	热: {
		radical: "灬",
		traditional: "熱"
	},
	冷: {
		radical: "冫",
		traditional: "冷"
	},
	红: {
		radical: "纟",
		traditional: "紅"
	},
	新: {
		radical: "斤",
		traditional: "新"
	},
	这: {
		radical: "辶",
		traditional: "這"
	}
};
var glyphs = null;
var metas = null;
function loadGlyphs() {
	if (!glyphs) glyphs = fetch("/hanzi/strokes.json").then((response) => response.ok ? response.json() : {}).catch(() => ({}));
	return glyphs;
}
function loadMeta() {
	if (!metas) metas = fetch("/hanzi/meta.json").then((response) => response.ok ? response.json() : {}).catch(() => ({}));
	return metas;
}
function medianPath(points) {
	if (!points.length) return "";
	const [x, y] = points[0];
	let path = `M ${x} ${y}`;
	for (let i = 1; i < points.length; i++) path += ` L ${points[i][0]} ${points[i][1]}`;
	return path;
}
function mandarinChar(word, speech) {
	const lang = speech.toLowerCase();
	if (!lang.startsWith("zh") && !lang.startsWith("yue")) return null;
	const text = [...word.trim()];
	if (text.length !== 1) return null;
	return /\p{Script=Han}/u.test(text[0]) ? text[0] : null;
}
function StrokeOrder({ char, font, radical, traditional, bare = false }) {
	const [glyph, setGlyph] = (0, import_react.useState)(void 0);
	const [meta, setMeta] = (0, import_react.useState)(HANZI[char] ?? {});
	const [run, setRun] = (0, import_react.useState)(0);
	const clip = (0, import_react.useId)().replace(/:/g, "");
	(0, import_react.useEffect)(() => {
		let live = true;
		setGlyph(void 0);
		setMeta({
			...HANZI[char],
			...radical || traditional ? {
				radical,
				traditional
			} : {}
		});
		Promise.all([loadGlyphs(), loadMeta()]).then(([all, extra]) => {
			if (!live) return;
			setGlyph(all[char] ?? null);
			setMeta({
				...HANZI[char],
				...extra[char],
				...radical ? { radical } : {},
				...traditional ? { traditional } : {}
			});
		});
		return () => {
			live = false;
		};
	}, [
		char,
		radical,
		traditional
	]);
	(0, import_react.useEffect)(() => {
		if (!glyph?.strokes.length) return;
		const ms = glyph.strokes.length * 420 + 900;
		const id = window.setInterval(() => setRun((value) => value + 1), ms);
		return () => window.clearInterval(id);
	}, [glyph, char]);
	const script = font ? { fontFamily: font } : void 0;
	const form = meta.traditional && meta.traditional !== char ? meta.traditional : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: bare ? "flex" : "mt-3 flex items-end gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `relative shrink-0 overflow-hidden rounded-2xl border border-line bg-paper text-ink ${bare ? "h-36 w-36" : "h-28 w-28 md:h-32 md:w-32"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					viewBox: "0 0 100 100",
					className: "absolute inset-0 h-full w-full text-line",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M50 10 V90 M10 50 H90 M16 16 L84 84 M84 16 L16 84",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "0.6"
					})
				}),
				glyph === null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute inset-0 grid place-items-center text-5xl",
					style: script,
					children: char
				}),
				glyph && glyph.strokes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					viewBox: "0 0 1024 1024",
					className: "absolute inset-1 h-[calc(100%-8px)] w-[calc(100%-8px)]",
					role: "img",
					"aria-label": `Stroke order of ${char}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						transform: "translate(0 1024) scale(1 -1)",
						children: [glyph.strokes.map((stroke, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: stroke,
							fill: "currentColor",
							opacity: "0.14"
						}, `guide-${index}`)), glyph.strokes.map((stroke, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", {
							id: `${clip}-${index}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: stroke })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: medianPath(glyph.medians[index] ?? []),
							clipPath: `url(#${clip}-${index})`,
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "256",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							pathLength: 1,
							style: {
								strokeDasharray: 1,
								strokeDashoffset: 1,
								animation: `hanzi-draw 0.42s ease-in ${index * .42}s forwards`
							}
						})] }, `stroke-${index}`))]
					}, run)
				})
			]
		}), !bare && (meta.radical || form) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 pb-1 text-xs leading-snug text-muted",
			children: [meta.radical && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Radical ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-base text-ink",
				style: script,
				children: meta.radical
			})] }), form && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1",
				children: ["Traditional ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-base text-ink",
					style: script,
					children: form
				})]
			})]
		})]
	});
}
//#endregion
export { mandarinChar as n, StrokeOrder as t };
