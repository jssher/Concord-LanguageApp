import { createServerFn } from "@tanstack/react-start";
import { LANG_BY_ID } from "@/data/languages";
import { authMiddleware } from "@/lib/auth/middleware";
import type { Sql } from "@/lib/db";

export type CommentKind = "comment" | "mistake";
export type CommentTarget = "card" | "section";

export type CommentRow = {
  id: number;
  handle: string;
  lang: string;
  targetKind: CommentTarget;
  targetId: string;
  label: string;
  level: string;
  bucket: string;
  kind: CommentKind;
  body: string;
  at: string;
};

export type CommentBoard = { comments: CommentRow[] };

type Posted = { ok: true } | { ok: false; error: string };

const BODY_MAX = 500;
const DAY_CAP = 24;
const PER_TARGET = 4;
const BOARD_CAP = 400;

function clip(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/\r\n/g, "\n").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").replace(/[\u0000-\u001f]/g, "").trim().slice(0, max);
}

function num(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function stamp(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string" && value) {
    const parsed = new Date(value.includes("T") ? value : value.replace(" ", "T"));
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
  }
  return "";
}

async function db(): Promise<Sql> {
  const { getSql } = await import("@/lib/db");
  return getSql();
}

function asKind(value: unknown): CommentKind | null {
  return value === "mistake" || value === "comment" ? value : null;
}

function asTarget(value: unknown): CommentTarget | null {
  return value === "card" || value === "section" ? value : null;
}

async function loadBoard(sql: Sql): Promise<CommentBoard> {
  const rows = await sql<{
    id: number;
    handle: string;
    lang: string;
    target_kind: string;
    target_id: string;
    label: string;
    level: string;
    bucket: string;
    kind: string;
    body: string;
    created_at: unknown;
  }>`
    select c.id,
      coalesce(l.handle, c.handle) as handle,
      c.lang, c.target_kind, c.target_id, c.label, c.level, c.bucket, c.kind, c.body, c.created_at
    from card_comments c
    left join learners l on l.user_id = c.user_id
    order by c.created_at desc
    limit ${BOARD_CAP}
  `;
  return {
    comments: rows.flatMap((row) => {
      const kind = asKind(row.kind);
      const targetKind = asTarget(row.target_kind);
      if (!kind || !targetKind) return [];
      return [{
        id: num(row.id),
        handle: row.handle,
        lang: row.lang,
        targetKind,
        targetId: row.target_id,
        label: row.label,
        level: row.level,
        bucket: row.bucket,
        kind,
        body: row.body,
        at: stamp(row.created_at),
      }];
    }),
  };
}

export const getComments = createServerFn({ method: "GET" }).handler(async (): Promise<CommentBoard> => {
  const sql = await db();
  return loadBoard(sql);
});

export const postComment = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: {
    lang?: string;
    targetKind?: string;
    targetId?: string;
    label?: string;
    level?: string;
    bucket?: string;
    kind?: string;
    body?: string;
  }) => {
    const lang = clip(input?.lang, 16);
    const targetKind = asTarget(input?.targetKind);
    const targetId = clip(input?.targetId, 80);
    const label = clip(input?.label, 140);
    const level = clip(input?.level, 8);
    const bucket = clip(input?.bucket, 80);
    const kind = asKind(input?.kind);
    const body = clip(input?.body, BODY_MAX);
    if (!LANG_BY_ID.has(lang) || lang === "en") throw new Error("Choose a language for this note.");
    if (!targetKind || !targetId || !label) throw new Error("That card could not be found.");
    if (!kind) throw new Error("Say whether this is a comment or a mistake.");
    if (body.length < 4) throw new Error("Write a few words.");
    return { lang, targetKind, targetId, label, level, bucket, kind, body };
  })
  .handler(async ({ data, context }): Promise<Posted> => {
    const sql = await db();
    const people = await sql<{ handle: string }>`
      select handle from learners where user_id = ${context.userId} limit 1
    `;
    const handle = people[0]?.handle;
    if (!handle) return { ok: false, error: "Set a handle in League before commenting." };
    const recent = await sql<{ n: number }>`
      select count(*)::int as n from card_comments
      where user_id = ${context.userId} and created_at > now() - interval '1 day'
    `;
    if (num(recent[0]?.n) >= DAY_CAP) return { ok: false, error: "That is enough comments for today." };
    const onTarget = await sql<{ n: number }>`
      select count(*)::int as n from card_comments
      where user_id = ${context.userId}
        and lang = ${data.lang}
        and target_kind = ${data.targetKind}
        and target_id = ${data.targetId}
    `;
    if (num(onTarget[0]?.n) >= PER_TARGET) return { ok: false, error: "You already left a few notes on this one." };
    await sql`
      insert into card_comments
        (user_id, handle, lang, target_kind, target_id, label, level, bucket, kind, body)
      values (
        ${context.userId}, ${handle}, ${data.lang}, ${data.targetKind}, ${data.targetId},
        ${data.label}, ${data.level}, ${data.bucket}, ${data.kind}, ${data.body}
      )
    `;
    return { ok: true };
  });
