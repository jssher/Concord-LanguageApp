import { n as createMiddleware } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/score-Dwg2HOzd.js
/**
* Auth middleware for server functions — the standard way to get the caller's
* verified user id. When deployed the session cookie is same-origin and rides
* along automatically. In the live preview the client also forwards the bearer
* token (partitioned cookies) via the `.client` hook below — call sites do not
* thread it themselves.
*
*   import { createServerFn } from "@tanstack/react-start";
*   import { getSql } from "@/lib/db";
*   import { authMiddleware } from "@/lib/auth/middleware";
*
*   export const listTodos = createServerFn({ method: "GET" })
*     .middleware([authMiddleware])
*     .handler(async ({ context }) => {
*       const sql = await getSql();
*       return sql`select * from todos where user_id = ${context.userId}`;
*     });
*
* Signed out with auth on (live preview included) -> throws `UnauthorizedError`
* (see `verify.server.ts`). With auth disabled (`VITE_AUTH_ENABLED=false`, the
* shipped default) it resolves the shared dev user — but throws instead when a
* `DATABASE_URL` is also set, so an app without sign-in must not use this at
* all. On the auth-on path, use it on every server function that touches
* per-user data and scope every query by `context.userId`.
*/
var authMiddleware = createMiddleware({ type: "function" }).client(async ({ next }) => {
	const { getBearerToken } = await import("./client-MBVlHALp.mjs").then((n) => n.n).then((n) => n.n);
	return next({ sendContext: { bearerToken: getBearerToken() ?? void 0 } });
}).server(async ({ next, context }) => {
	const { assertSameSiteRequest } = await import("./isolation.server-CGNg1r0B.mjs");
	const { requireUserId } = await import("./verify.server-BrHBofVz.mjs");
	assertSameSiteRequest();
	return next({ context: { userId: await requireUserId(context.bearerToken) } });
});
var BLOCKED = /* @__PURE__ */ new Set([
	"fuck",
	"fucker",
	"fucking",
	"fucked",
	"fck",
	"fuk",
	"fuq",
	"motherfucker",
	"shit",
	"shithead",
	"shitty",
	"sht",
	"bullshit",
	"bitch",
	"bitches",
	"btch",
	"cunt",
	"asshole",
	"arsehole",
	"ass",
	"bastard",
	"dickhead",
	"cocksucker",
	"piss",
	"slut",
	"whore",
	"whorehouse",
	"porn",
	"nude",
	"nudes",
	"xxx",
	"nigger",
	"nigga",
	"niga",
	"fag",
	"faggot",
	"faget",
	"dyke",
	"tranny",
	"retard",
	"retarded",
	"kike",
	"spic",
	"chink",
	"gook",
	"wetback",
	"paki",
	"raghead",
	"towelhead",
	"nazi",
	"hitler",
	"rape",
	"rapist",
	"raping",
	"raper"
]);
var EMBEDDED = [
	"nigger",
	"nigga",
	"faggot",
	"hitler"
];
var RESERVED = /* @__PURE__ */ new Set([
	"admin",
	"concord",
	"support",
	"moderator",
	"grok",
	"official",
	"system",
	"league",
	"staff",
	"help",
	"root",
	"team"
]);
function fold(input) {
	return input.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().replace(/0/g, "o").replace(/1/g, "i").replace(/3/g, "e").replace(/4/g, "a").replace(/5/g, "s").replace(/7/g, "t").replace(/@/g, "a").replace(/\$/g, "s");
}
function tokens(input) {
	return fold(input).split(/[^a-z]+/).filter(Boolean);
}
function disrespectful(input) {
	const parts = tokens(input);
	const joined = parts.join("");
	if (EMBEDDED.some((word) => joined.includes(word))) return true;
	return parts.some((part) => BLOCKED.has(part));
}
function latinShape(word) {
	const plain = word.normalize("NFKD").replace(/\p{M}/gu, "");
	if (/[^\p{L}'’.-]/u.test(plain)) return false;
	const latin = plain.replace(/[^A-Za-z]/g, "");
	if (!latin) return true;
	if (latin.length >= 4 && !/[aeiouy]/i.test(latin)) return false;
	if (/(.)\1{3,}/i.test(latin)) return false;
	return true;
}
function parseName(raw) {
	const name = raw.trim().replace(/\s+/g, " ");
	if (name.length < 2 || name.length > 40) return {
		ok: false,
		error: "Use a name of at least two letters."
	};
	if (!/^[\p{L}][\p{L}'’.-]{0,19}(?: [\p{L}][\p{L}'’.-]{0,19}){0,3}$/u.test(name) || !/[\p{L}]$/u.test(name)) return {
		ok: false,
		error: "Use a name people can read: letters, spaces, apostrophes, and hyphens."
	};
	if (name.split(" ").some((word) => !latinShape(word))) return {
		ok: false,
		error: "Use a name people can read: letters, spaces, apostrophes, and hyphens."
	};
	if (disrespectful(name)) return {
		ok: false,
		error: "Choose a respectful name."
	};
	return {
		ok: true,
		value: name
	};
}
function parseHandle(raw) {
	const handle = raw.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z-]/g, "");
	if (!/^[a-z](?:[a-z]|-(?!-))*[a-z]$/.test(handle) || handle.length < 3 || handle.length > 24) return {
		ok: false,
		error: "Use a short link in Latin letters, like mina-okonkwo."
	};
	if (!/[aeiouy]/.test(handle)) return {
		ok: false,
		error: "Use a short link in Latin letters, like mina-okonkwo."
	};
	if (RESERVED.has(handle)) return {
		ok: false,
		error: "That link is reserved."
	};
	if (disrespectful(handle)) return {
		ok: false,
		error: "Choose a respectful link."
	};
	return {
		ok: true,
		value: handle
	};
}
function suggestHandle(name) {
	const parsed = parseHandle(name.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 24).replace(/-+$/g, ""));
	return parsed.ok ? parsed.value : "";
}
/** Points for one review. A new word is worth more than a later recall. A mastered word scores once a day. */
function scoreReview(prev, mark, today) {
	const oldStage = prev ? prev.stage : -1;
	const oldPasses = prev?.passes ?? 0;
	const oldLapses = prev?.lapses ?? 0;
	if (mark === "w") return {
		stage: 0,
		passes: oldPasses,
		lapses: oldLapses + 1,
		points: 0,
		lastPointDay: prev?.lastPointDay ?? null
	};
	const stage = oldStage < 0 ? 0 : oldStage >= 8 ? 8 : oldStage + 1;
	let points = 0;
	if (oldPasses === 0) points = 10;
	else if (oldStage >= 0 && oldStage < 8) points = 5;
	else if (!prev?.lastPointDay || prev.lastPointDay < today) points = 1;
	return {
		stage,
		passes: oldPasses + 1,
		lapses: oldLapses,
		points,
		lastPointDay: points > 0 ? today : prev?.lastPointDay ?? null
	};
}
/** Points for a card already studied on this device, counted once when it first joins the league. */
function pointsForKnownCard(stage, passes) {
	if (passes < 1) return 0;
	return 10 + 5 * Math.max(0, Math.min(8, stage));
}
var LEAGUES = [
	{
		id: "footpath",
		name: "Footpath",
		min: 0,
		next: 40,
		blurb: "The first words you keep."
	},
	{
		id: "lane",
		name: "Lane",
		min: 40,
		next: 150,
		blurb: "A run of words you can still say."
	},
	{
		id: "high-road",
		name: "High road",
		min: 150,
		next: 400,
		blurb: "New words, and the old ones held."
	},
	{
		id: "bridge",
		name: "Bridge",
		min: 400,
		next: 1e3,
		blurb: "A lot learned, and most of it still there."
	},
	{
		id: "summit",
		name: "Summit",
		min: 1e3,
		next: null,
		blurb: "A long memory of the course."
	}
];
function leagueFor(score) {
	let current = LEAGUES[0];
	for (const league of LEAGUES) if (score >= league.min) current = league;
	return current;
}
//#endregion
export { parseName as a, suggestHandle as c, parseHandle as i, authMiddleware as n, pointsForKnownCard as o, leagueFor as r, scoreReview as s, LEAGUES as t };
