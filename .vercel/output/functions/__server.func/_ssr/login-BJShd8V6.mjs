import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as signIn } from "./client-MBVlHALp.mjs";
import { a as Shell } from "./shell-WOgA0OuT.mjs";
import { t as GROK_PROVIDERS } from "./server-CbrRGjMx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BJShd8V6.js
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex w-full max-w-sm flex-col gap-4 px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-widest text-accent uppercase",
				children: "Concord"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl",
				children: "Sign in"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "Your name, score, and league stay with the account you sign in with."
			}),
			GROK_PROVIDERS.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => signIn(provider.providerId, { callbackURL: "/league" }),
				className: "inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-card px-4 text-sm",
				children: ["Continue with ", provider.label]
			}, provider.providerId))
		]
	}) });
}
//#endregion
export { Login as component };
