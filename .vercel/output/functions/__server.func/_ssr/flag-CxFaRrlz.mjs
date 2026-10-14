import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/flag-CxFaRrlz.js
var import_jsx_runtime = require_jsx_runtime();
var FLAGS = {
	en: "🇺🇸",
	de: "🇩🇪",
	nl: "🇳🇱",
	da: "🇩🇰",
	gsw: "🇨🇭",
	es: "🇪🇸",
	fr: "🇫🇷",
	pt: "🇧🇷",
	it: "🇮🇹",
	ro: "🇷🇴",
	ru: "🇷🇺",
	uk: "🇺🇦",
	hr: "🇭🇷",
	sl: "🇸🇮",
	mk: "🇲🇰",
	bg: "🇧🇬",
	pl: "🇵🇱",
	cs: "🇨🇿",
	sk: "🇸🇰",
	sr: "🇷🇸",
	sq: "🇦🇱",
	el: "🇬🇷",
	tr: "🇹🇷",
	zh: "🇨🇳",
	yue: "🇭🇰",
	ja: "🇯🇵",
	ko: "🇰🇷",
	hi: "🇮🇳",
	mr: "🇮🇳",
	bn: "🇧🇩",
	gu: "🇮🇳",
	ur: "🇵🇰",
	te: "🇮🇳",
	ta: "🇮🇳",
	ml: "🇮🇳",
	fa: "🇮🇷",
	ar: "🇸🇦",
	ber: "🇲🇦",
	he: "🇮🇱",
	am: "🇪🇹",
	hy: "🇦🇲",
	sw: "🇰🇪",
	ln: "🇨🇩",
	ig: "🇳🇬",
	yo: "🇳🇬",
	ha: "🇳🇬",
	ff: "🇸🇳",
	so: "🇸🇴",
	tl: "🇵🇭",
	th: "🇹🇭",
	vi: "🇻🇳",
	id: "🇮🇩",
	mg: "🇲🇬",
	qu: "🇵🇪",
	gn: "🇵🇾"
};
function Flag({ id, className = "" }) {
	if (id === "eo") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Esperanto, { className });
	if (id === "isv") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Interslavic, { className });
	if (id === "arc") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Aramaic, { className });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-block text-[1.05rem] leading-none ${className}`,
		"aria-hidden": true,
		children: FLAGS[id] ?? "🏳️"
	});
}
function Esperanto({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 20 14",
		className: `inline-block h-3.5 w-5 rounded-[2px] ${className}`,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "20",
				height: "14",
				fill: "#0b7a3b"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "8",
				height: "14",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "4,2.2 4.7,4.3 6.9,4.3 5.1,5.6 5.8,7.8 4,6.5 2.2,7.8 2.9,5.6 1.1,4.3 3.3,4.3",
				fill: "#0b7a3b"
			})
		]
	});
}
function Interslavic({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 20 14",
		className: `inline-block h-3.5 w-5 rounded-[2px] ${className}`,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "20",
				height: "14",
				fill: "#1d4e89"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				y: "4.67",
				width: "20",
				height: "4.66",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				y: "9.33",
				width: "20",
				height: "4.67",
				fill: "#c0392b"
			})
		]
	});
}
function Aramaic({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 20 14",
		className: `inline-block h-3.5 w-5 rounded-[2px] ${className}`,
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "20",
				height: "14",
				fill: "#1e3a5f"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "3",
				y: "2",
				width: "14",
				height: "10",
				rx: "1",
				fill: "#f4e2b8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M6 5.2h8M6 7h6.5M6 8.8h7",
				stroke: "#1e3a5f",
				strokeWidth: "1"
			})
		]
	});
}
//#endregion
export { Flag as t };
