import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plate-YccgCF7P.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Real photographs. A card picks one at random each time that picture opens. */
var VARIANTS = {
	woman: 4,
	man: 4
};
function pick(src) {
	const count = VARIANTS[src];
	if (!count) return src;
	return `${src}-${1 + Math.floor(Math.random() * count)}`;
}
function Plate({ src, alt }) {
	const [file, setFile] = (0, import_react.useState)(() => pick(src));
	const [failed, setFailed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setFile(pick(src));
		setFailed(false);
	}, [src]);
	if (failed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid h-full w-full place-items-center bg-chip px-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-3xl text-muted",
			children: alt
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: `/cards/${file}.jpg?v=4`,
		alt,
		decoding: "async",
		fetchPriority: "high",
		className: "h-full w-full object-contain",
		onError: () => {
			if (file !== src) setFile(src);
			else setFailed(true);
		}
	});
}
//#endregion
export { Plate as t };
