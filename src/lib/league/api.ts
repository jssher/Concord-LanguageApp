import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { parseHandle, parseName } from "@/lib/league/name";
import { pointsForKnownCard, scoreReview } from "@/lib/league/score";
import type { Sql } from "@/lib/db";

export type Standing = {
  name: string;
  handle: string;
  score: number;
  learned: number;
  held: number;
  firm: number;
  streak: number;
  weekPoints: number;
  languages: string[];
  following: string[];
};

export type BoardRow = {
  name: string;
  handle: string;
  score: number;
  learned: number;
  held: number;
  firm: number;
  weekPoints: number;
};

export type Person = {
  name: string;
  handle: string;
  score: number;
  learned: number;
  held: number;
  firm: number;
  streak: number;
  weekPoints: number;
  languages: string[];
  with: { name: string; handle: string }[];
};

type CardIn = {
  lang: string;
  concept: string;
  stage: number;
  passes: number;
  lapses: number;
  last: "r" | "w";
};

function num(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

async function db(): Promise<Sql> {
  const { getSql } = await import("@/lib/db");
  return getSql();
}

function duplicate(err: unknown): boolean {
  return typeof err === "object" && err !== null && "code" in err && (err as { code?: string }).code === "23505";
}

async function loadStanding(sql: Sql, userId: string): Promise<Standing | null> {
  const rows = await sql<{
    name: string;
    handle: string;
    score: number;
    learned: number;
    held: number;
    firm: number;
    streak: number;
    week_points: number;
  }>`
    select l.name, l.handle, l.score, l.learned, l.held, l.firm, l.streak,
      coalesce((
        select sum(d.points)::int from learner_days d
        where d.user_id = l.user_id and d.day >= date_trunc('week', current_date)::date
      ), 0) as week_points
    from learners l
    where l.user_id = ${userId}
  `;
  const row = rows[0];
  if (!row) return null;
  const languages = await sql<{ lang: string }>`
    select distinct lang from learner_cards
    where user_id = ${userId} and passes > 0
    order by lang
    limit 12
  `;
  const following = await sql<{ handle: string }>`
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
    following: following.map((item) => item.handle),
  };
}

async function touchLearner(sql: Sql, userId: string, points: number, learned: number, remembered: number, missed: number, today: string) {
  if (points > 0 || learned > 0 || remembered > 0 || missed > 0) {
    await sql`
      insert into learner_days (user_id, day, learned, remembered, missed, points)
      values (${userId}, ${today}::date, ${learned}, ${remembered}, ${missed}, ${points})
      on conflict (user_id, day) do update set
        learned = learner_days.learned + excluded.learned,
        remembered = learner_days.remembered + excluded.remembered,
        missed = learner_days.missed + excluded.missed,
        points = learner_days.points + excluded.points
    `;
  }
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

function cleanCards(input: unknown[]): CardIn[] {
  const out: CardIn[] = [];
  for (const row of input.slice(0, 300)) {
    if (!row || typeof row !== "object") continue;
    const item = row as Partial<CardIn>;
    const lang = String(item.lang ?? "");
    const concept = String(item.concept ?? "");
    const last = item.last === "w" ? "w" : item.last === "r" ? "r" : null;
    if (!/^[a-z0-9-]{1,16}$/.test(lang)) continue;
    if (!/^[a-z0-9][a-z0-9_.:-]{0,79}$/.test(concept)) continue;
    if (!last) continue;
    const passes = Math.max(0, Math.min(100000, Math.floor(num(item.passes))));
    const lapses = Math.max(0, Math.min(100000, Math.floor(num(item.lapses))));
    if (passes < 1 && lapses < 1) continue;
    out.push({
      lang,
      concept,
      stage: Math.max(0, Math.min(8, Math.floor(num(item.stage)))),
      passes,
      lapses,
      last,
    });
  }
  return out;
}

export const getMine = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await db();
    return loadStanding(sql, context.userId);
  });

export const getBoard = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await db();
  const rows = await sql<{
    name: string;
    handle: string;
    score: number;
    learned: number;
    held: number;
    firm: number;
    week_points: number;
  }>`
    select l.name, l.handle, l.score, l.learned, l.held, l.firm,
      coalesce((
        select sum(d.points)::int from learner_days d
        where d.user_id = l.user_id and d.day >= date_trunc('week', current_date)::date
      ), 0) as week_points
    from learners l
    order by l.score desc, l.name asc
    limit 500
  `;
  return rows.map((row) => ({
    name: row.name,
    handle: row.handle,
    score: num(row.score),
    learned: num(row.learned),
    held: num(row.held),
    firm: num(row.firm),
    weekPoints: num(row.week_points),
  })) satisfies BoardRow[];
});

export const getPerson = createServerFn({ method: "GET" })
  .validator((handle: string) => {
    const parsed = parseHandle(String(handle ?? ""));
    if (!parsed.ok) throw new Error("Bad link");
    return parsed.value;
  })
  .handler(async ({ data: handle }) => {
    const sql = await db();
    const rows = await sql<{ user_id: string }>`select user_id from learners where handle = ${handle}`;
    const userId = rows[0]?.user_id;
    if (!userId) return null;
    const standing = await loadStanding(sql, userId);
    if (!standing) return null;
    const withRows = await sql<{ name: string; handle: string }>`
      select l.name, l.handle
      from connections c
      join learners l on l.user_id = c.followee_id
      where c.follower_id = ${userId}
      order by l.name
      limit 24
    `;
    const person: Person = {
      name: standing.name,
      handle: standing.handle,
      score: standing.score,
      learned: standing.learned,
      held: standing.held,
      firm: standing.firm,
      streak: standing.streak,
      weekPoints: standing.weekPoints,
      languages: standing.languages,
      with: withRows,
    };
    return person;
  });

export const claimName = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { name?: string; handle?: string }) => ({
    name: String(input?.name ?? ""),
    handle: String(input?.handle ?? ""),
  }))
  .handler(async ({ context, data }) => {
    const name = parseName(data.name);
    if (!name.ok) return { ok: false as const, error: name.error };
    const handle = parseHandle(data.handle);
    if (!handle.ok) return { ok: false as const, error: handle.error };
    const sql = await db();
    const taken = await sql<{ user_id: string }>`
      select user_id from learners where handle = ${handle.value} and user_id <> ${context.userId}
    `;
    if (taken.length) return { ok: false as const, error: "That link is already used. Try another." };
    const existing = await sql`select user_id from learners where user_id = ${context.userId}`;
    try {
      if (existing.length) {
        await sql`
          update learners set name = ${name.value}, handle = ${handle.value}, updated_at = now()
          where user_id = ${context.userId}
        `;
      } else {
        await sql`insert into learners (user_id, name, handle) values (${context.userId}, ${name.value}, ${handle.value})`;
      }
    } catch (err) {
      if (duplicate(err)) return { ok: false as const, error: "That link is already used. Try another." };
      throw err;
    }
    const mine = await loadStanding(sql, context.userId);
    return { ok: true as const, mine };
  });

export const recordReview = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { lang?: string; concept?: string; mark?: string }) => {
    const lang = String(input?.lang ?? "");
    const concept = String(input?.concept ?? "");
    const mark = input?.mark;
    if (mark !== "r" && mark !== "w") throw new Error("Bad review");
    if (!/^[a-z0-9-]{1,16}$/.test(lang)) throw new Error("Bad review");
    if (!/^[a-z0-9][a-z0-9_.:-]{0,79}$/.test(concept)) throw new Error("Bad review");
    return { lang, concept, mark: mark === "w" ? "w" as const : "r" as const };
  })
  .handler(async ({ context, data }) => {
    const sql = await db();
    const have = await sql`select user_id from learners where user_id = ${context.userId}`;
    if (!have.length) return { ok: false as const, reason: "name" as const };
    const today = todayUtc();
    const prevRows = await sql<{
      stage: number;
      passes: number;
      lapses: number;
      last_point_day: string | null;
    }>`
      select stage, passes, lapses, last_point_day::text as last_point_day
      from learner_cards
      where user_id = ${context.userId} and lang = ${data.lang} and concept = ${data.concept}
    `;
    const prev = prevRows[0];
    const scored = scoreReview(
      prev
        ? {
            stage: num(prev.stage),
            passes: num(prev.passes),
            lapses: num(prev.lapses),
            lastPointDay: prev.last_point_day,
          }
        : null,
      data.mark,
      today,
    );
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
    await touchLearner(
      sql,
      context.userId,
      scored.points,
      data.mark === "r" && (prev ? num(prev.passes) : 0) === 0 ? 1 : 0,
      data.mark === "r" && scored.points > 0 ? 1 : 0,
      data.mark === "w" ? 1 : 0,
      today,
    );
    const mine = await loadStanding(sql, context.userId);
    return { ok: true as const, mine };
  });

export const syncCards = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => {
    if (!Array.isArray(input)) throw new Error("Bad cards");
    return cleanCards(input);
  })
  .handler(async ({ context, data }) => {
    const sql = await db();
    const have = await sql`select user_id from learners where user_id = ${context.userId}`;
    if (!have.length) return { ok: false as const, reason: "name" as const };
    if (!data.length) {
      const mine = await loadStanding(sql, context.userId);
      return { ok: true as const, mine };
    }
    const today = todayUtc();
    const payload = data.map((card) => ({
      lang: card.lang,
      concept: card.concept,
      stage: card.stage,
      passes: card.passes,
      lapses: card.lapses,
      last_mark: card.last,
      points: pointsForKnownCard(card.stage, card.passes),
    }));
    const saved = await sql<{ n: number; points: number; learned: number }>`
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
    if (num(saved[0]?.n) > 0) {
      await touchLearner(sql, context.userId, points, learned, learned, 0, today);
    }
    const mine = await loadStanding(sql, context.userId);
    return { ok: true as const, mine };
  });

export const setConnection = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { handle?: string; on?: boolean }) => {
    const handle = parseHandle(String(input?.handle ?? ""));
    if (!handle.ok) throw new Error("Bad link");
    return { handle: handle.value, on: Boolean(input?.on) };
  })
  .handler(async ({ context, data }) => {
    const sql = await db();
    const mine = await sql`select user_id from learners where user_id = ${context.userId}`;
    if (!mine.length) return { ok: false as const, error: "Add your name before you connect." };
    const target = await sql<{ user_id: string }>`select user_id from learners where handle = ${data.handle}`;
    if (!target[0]) return { ok: false as const, error: "No one uses that link." };
    if (target[0].user_id === context.userId) return { ok: false as const, error: "That is your own profile." };
    if (data.on) {
      await sql`
        insert into connections (follower_id, followee_id)
        values (${context.userId}, ${target[0].user_id})
        on conflict do nothing
      `;
    } else {
      await sql`
        delete from connections
        where follower_id = ${context.userId} and followee_id = ${target[0].user_id}
      `;
    }
    const standing = await loadStanding(sql, context.userId);
    return { ok: true as const, mine: standing };
  });
