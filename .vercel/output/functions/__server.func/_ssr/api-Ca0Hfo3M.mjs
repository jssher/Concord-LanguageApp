import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { a as parseName, i as parseHandle, n as authMiddleware, o as pointsForKnownCard, s as scoreReview } from "./score-Dwg2HOzd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-Ca0Hfo3M.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function num(value) {
	const n = Number(value);
	return Number.isFinite(n) ? n : 0;
}
function todayUtc() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
async function db() {
	const { getSql } = await import("./db-DPV5DYxO.mjs").then((n) => n.t).then((n) => n.t);
	return getSql();
}
function duplicate(err) {
	return typeof err === "object" && err !== null && "code" in err && err.code === "23505";
}
async function loadStanding(sql, userId) {
	const row = (await sql`
    select l.name, l.handle, l.score, l.learned, l.held, l.firm, l.streak,
      coalesce((
        select sum(d.points)::int from learner_days d
        where d.user_id = l.user_id and d.day >= date_trunc('week', current_date)::date
      ), 0) as week_points
    from learners l
    where l.user_id = ${userId}
  `)[0];
	if (!row) return null;
	const languages = await sql`
    select distinct lang from learner_cards
    where user_id = ${userId} and passes > 0
    order by lang
    limit 12
  `;
	const following = await sql`
    select l.handle
    from connections c
    join learners l on l.user_id = c.followee_id
    where c.follower_id = ${userId}
    order by l.name
    limit 48
  `;
	return {
		name: row.name,
		handle: row.handle,
		score: num(row.score),
		learned: num(row.learned),
		held: num(row.held),
		firm: num(row.firm),
		streak: num(row.streak),
		weekPoints: num(row.week_points),
		languages: languages.map((item) => item.lang),
		following: following.map((item) => item.handle)
	};
}
async function touchLearner(sql, userId, points, learned, remembered, missed, today) {
	if (points > 0 || learned > 0 || remembered > 0 || missed > 0) await sql`
      insert into learner_days (user_id, day, learned, remembered, missed, points)
      values (${userId}, ${today}::date, ${learned}, ${remembered}, ${missed}, ${points})
      on conflict (user_id, day) do update set
        learned = learner_days.learned + excluded.learned,
        remembered = learner_days.remembered + excluded.remembered,
        missed = learner_days.missed + excluded.missed,
        points = learner_days.points + excluded.points
    `;
	await sql`
    update learners set
      score = score + ${points},
      learned = (select count(*)::int from learner_cards where user_id = ${userId} and passes > 0),
      held = (select count(*)::int from learner_cards where user_id = ${userId} and last_mark = 'r'),
      firm = (select count(*)::int from learner_cards where user_id = ${userId} and last_mark = 'r' and stage >= 3),
      streak = case
        when last_day = ${today}::date then streak
        when last_day = (${today}::date - 1) then streak + 1
        else 1
      end,
      last_day = ${today}::date,
      updated_at = now()
    where user_id = ${userId}
  `;
}
function cleanCards(input) {
	const out = [];
	for (const row of input.slice(0, 300)) {
		if (!row || typeof row !== "object") continue;
		const item = row;
		const lang = String(item.lang ?? "");
		const concept = String(item.concept ?? "");
		const last = item.last === "w" ? "w" : item.last === "r" ? "r" : null;
		if (!/^[a-z0-9-]{1,16}$/.test(lang)) continue;
		if (!/^[a-z0-9][a-z0-9_.:-]{0,79}$/.test(concept)) continue;
		if (!last) continue;
		const passes = Math.max(0, Math.min(1e5, Math.floor(num(item.passes))));
		const lapses = Math.max(0, Math.min(1e5, Math.floor(num(item.lapses))));
		if (passes < 1 && lapses < 1) continue;
		out.push({
			lang,
			concept,
			stage: Math.max(0, Math.min(8, Math.floor(num(item.stage)))),
			passes,
			lapses,
			last
		});
	}
	return out;
}
var getMine_createServerFn_handler = createServerRpc({
	id: "6e94645b63df09242e64301d7d06c4343ed7e95fb23511f1834af4cf1bc2567c",
	name: "getMine",
	filename: "src/lib/league/api.ts"
}, (opts) => getMine.__executeServer(opts));
var getMine = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMine_createServerFn_handler, async ({ context }) => {
	return loadStanding(await db(), context.userId);
});
var getBoard_createServerFn_handler = createServerRpc({
	id: "f1f456f6a2ddb8552478638333a05d8e4e26cc7f0dd84a57384db276325cee36",
	name: "getBoard",
	filename: "src/lib/league/api.ts"
}, (opts) => getBoard.__executeServer(opts));
var getBoard = createServerFn({ method: "GET" }).handler(getBoard_createServerFn_handler, async () => {
	return (await (await db())`
    select l.name, l.handle, l.score, l.learned, l.held, l.firm,
      coalesce((
        select sum(d.points)::int from learner_days d
        where d.user_id = l.user_id and d.day >= date_trunc('week', current_date)::date
      ), 0) as week_points
    from learners l
    order by l.score desc, l.name asc
    limit 500
  `).map((row) => ({
		name: row.name,
		handle: row.handle,
		score: num(row.score),
		learned: num(row.learned),
		held: num(row.held),
		firm: num(row.firm),
		weekPoints: num(row.week_points)
	}));
});
var getPerson_createServerFn_handler = createServerRpc({
	id: "2b14778d3fb962299f578fa50b786d2a11c879966142953385f246c26afc1fda",
	name: "getPerson",
	filename: "src/lib/league/api.ts"
}, (opts) => getPerson.__executeServer(opts));
var getPerson = createServerFn({ method: "GET" }).validator((handle) => {
	const parsed = parseHandle(String(handle ?? ""));
	if (!parsed.ok) throw new Error("Bad link");
	return parsed.value;
}).handler(getPerson_createServerFn_handler, async ({ data: handle }) => {
	const sql = await db();
	const userId = (await sql`select user_id from learners where handle = ${handle}`)[0]?.user_id;
	if (!userId) return null;
	const standing = await loadStanding(sql, userId);
	if (!standing) return null;
	const withRows = await sql`
      select l.name, l.handle
      from connections c
      join learners l on l.user_id = c.followee_id
      where c.follower_id = ${userId}
      order by l.name
      limit 24
    `;
	return {
		name: standing.name,
		handle: standing.handle,
		score: standing.score,
		learned: standing.learned,
		held: standing.held,
		firm: standing.firm,
		streak: standing.streak,
		weekPoints: standing.weekPoints,
		languages: standing.languages,
		with: withRows
	};
});
var claimName_createServerFn_handler = createServerRpc({
	id: "729cc8ace385afeadc8b49b6c191d34ae48d64b2a95bb2799979624df86f8841",
	name: "claimName",
	filename: "src/lib/league/api.ts"
}, (opts) => claimName.__executeServer(opts));
var claimName = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	name: String(input?.name ?? ""),
	handle: String(input?.handle ?? "")
})).handler(claimName_createServerFn_handler, async ({ context, data }) => {
	const name = parseName(data.name);
	if (!name.ok) return {
		ok: false,
		error: name.error
	};
	const handle = parseHandle(data.handle);
	if (!handle.ok) return {
		ok: false,
		error: handle.error
	};
	const sql = await db();
	if ((await sql`
      select user_id from learners where handle = ${handle.value} and user_id <> ${context.userId}
    `).length) return {
		ok: false,
		error: "That link is already used. Try another."
	};
	const existing = await sql`select user_id from learners where user_id = ${context.userId}`;
	try {
		if (existing.length) await sql`
          update learners set name = ${name.value}, handle = ${handle.value}, updated_at = now()
          where user_id = ${context.userId}
        `;
		else await sql`insert into learners (user_id, name, handle) values (${context.userId}, ${name.value}, ${handle.value})`;
	} catch (err) {
		if (duplicate(err)) return {
			ok: false,
			error: "That link is already used. Try another."
		};
		throw err;
	}
	return {
		ok: true,
		mine: await loadStanding(sql, context.userId)
	};
});
var recordReview_createServerFn_handler = createServerRpc({
	id: "bdc6bd4624d4121bba63527362f6389e09f7927a544ea04418fb4ce39ebee362",
	name: "recordReview",
	filename: "src/lib/league/api.ts"
}, (opts) => recordReview.__executeServer(opts));
var recordReview = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	const lang = String(input?.lang ?? "");
	const concept = String(input?.concept ?? "");
	const mark = input?.mark;
	if (mark !== "r" && mark !== "w") throw new Error("Bad review");
	if (!/^[a-z0-9-]{1,16}$/.test(lang)) throw new Error("Bad review");
	if (!/^[a-z0-9][a-z0-9_.:-]{0,79}$/.test(concept)) throw new Error("Bad review");
	return {
		lang,
		concept,
		mark: mark === "w" ? "w" : "r"
	};
}).handler(recordReview_createServerFn_handler, async ({ context, data }) => {
	const sql = await db();
	if (!(await sql`select user_id from learners where user_id = ${context.userId}`).length) return {
		ok: false,
		reason: "name"
	};
	const today = todayUtc();
	const prev = (await sql`
      select stage, passes, lapses, last_point_day::text as last_point_day
      from learner_cards
      where user_id = ${context.userId} and lang = ${data.lang} and concept = ${data.concept}
    `)[0];
	const scored = scoreReview(prev ? {
		stage: num(prev.stage),
		passes: num(prev.passes),
		lapses: num(prev.lapses),
		lastPointDay: prev.last_point_day
	} : null, data.mark, today);
	await sql`
      insert into learner_cards (user_id, lang, concept, stage, passes, lapses, last_mark, last_at, last_point_day)
      values (
        ${context.userId}, ${data.lang}, ${data.concept}, ${scored.stage}, ${scored.passes},
        ${scored.lapses}, ${data.mark}, now(), ${scored.lastPointDay}::date
      )
      on conflict (user_id, lang, concept) do update set
        stage = excluded.stage,
        passes = excluded.passes,
        lapses = excluded.lapses,
        last_mark = excluded.last_mark,
        last_at = now(),
        last_point_day = excluded.last_point_day
    `;
	await touchLearner(sql, context.userId, scored.points, data.mark === "r" && (prev ? num(prev.passes) : 0) === 0 ? 1 : 0, data.mark === "r" && scored.points > 0 ? 1 : 0, data.mark === "w" ? 1 : 0, today);
	return {
		ok: true,
		mine: await loadStanding(sql, context.userId)
	};
});
var syncCards_createServerFn_handler = createServerRpc({
	id: "0aae66938cc5023562119c838a58d72239db434488223b55022b0a5824da0438",
	name: "syncCards",
	filename: "src/lib/league/api.ts"
}, (opts) => syncCards.__executeServer(opts));
var syncCards = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	if (!Array.isArray(input)) throw new Error("Bad cards");
	return cleanCards(input);
}).handler(syncCards_createServerFn_handler, async ({ context, data }) => {
	const sql = await db();
	if (!(await sql`select user_id from learners where user_id = ${context.userId}`).length) return {
		ok: false,
		reason: "name"
	};
	if (!data.length) return {
		ok: true,
		mine: await loadStanding(sql, context.userId)
	};
	const today = todayUtc();
	const payload = data.map((card) => ({
		lang: card.lang,
		concept: card.concept,
		stage: card.stage,
		passes: card.passes,
		lapses: card.lapses,
		last_mark: card.last,
		points: pointsForKnownCard(card.stage, card.passes)
	}));
	const saved = await sql`
      with incoming as (
        select * from jsonb_to_recordset(${JSON.stringify(payload)}::jsonb) as x(
          lang text, concept text, stage int, passes int, lapses int, last_mark text, points int
        )
      ),
      inserted as (
        insert into learner_cards (user_id, lang, concept, stage, passes, lapses, last_mark, last_at, last_point_day)
        select ${context.userId}, i.lang, i.concept, i.stage, i.passes, i.lapses, i.last_mark, now(),
          case when i.passes > 0 then ${today}::date else null end
        from incoming i
        on conflict (user_id, lang, concept) do nothing
        returning passes, stage
      )
      select
        count(*)::int as n,
        coalesce(sum(case when passes > 0 then 10 + 5 * stage else 0 end), 0)::int as points,
        coalesce(sum(case when passes > 0 then 1 else 0 end), 0)::int as learned
      from inserted
    `;
	const points = num(saved[0]?.points);
	const learned = num(saved[0]?.learned);
	if (num(saved[0]?.n) > 0) await touchLearner(sql, context.userId, points, learned, learned, 0, today);
	return {
		ok: true,
		mine: await loadStanding(sql, context.userId)
	};
});
var setConnection_createServerFn_handler = createServerRpc({
	id: "cb51362b4d56775e76d2e903df10927efab247398abbb8ee30247428195ca323",
	name: "setConnection",
	filename: "src/lib/league/api.ts"
}, (opts) => setConnection.__executeServer(opts));
var setConnection = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => {
	const handle = parseHandle(String(input?.handle ?? ""));
	if (!handle.ok) throw new Error("Bad link");
	return {
		handle: handle.value,
		on: Boolean(input?.on)
	};
}).handler(setConnection_createServerFn_handler, async ({ context, data }) => {
	const sql = await db();
	if (!(await sql`select user_id from learners where user_id = ${context.userId}`).length) return {
		ok: false,
		error: "Add your name before you connect."
	};
	const target = await sql`select user_id from learners where handle = ${data.handle}`;
	if (!target[0]) return {
		ok: false,
		error: "No one uses that link."
	};
	if (target[0].user_id === context.userId) return {
		ok: false,
		error: "That is your own profile."
	};
	if (data.on) await sql`
        insert into connections (follower_id, followee_id)
        values (${context.userId}, ${target[0].user_id})
        on conflict do nothing
      `;
	else await sql`
        delete from connections
        where follower_id = ${context.userId} and followee_id = ${target[0].user_id}
      `;
	return {
		ok: true,
		mine: await loadStanding(sql, context.userId)
	};
});
//#endregion
export { claimName_createServerFn_handler, getBoard_createServerFn_handler, getMine_createServerFn_handler, getPerson_createServerFn_handler, recordReview_createServerFn_handler, setConnection_createServerFn_handler, syncCards_createServerFn_handler };
