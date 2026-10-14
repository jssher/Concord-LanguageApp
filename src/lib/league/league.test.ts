import assert from "node:assert/strict";
import test from "node:test";
import { parseHandle, parseName, suggestHandle } from "./name.ts";
import { leagueFor, pointsForKnownCard, scoreReview } from "./score.ts";

test("accepts readable names and rejects junk", () => {
  assert.equal(parseName("Mina Okonkwo").ok, true);
  assert.equal(parseName("José Álvarez").ok, true);
  assert.equal(parseName("李明").ok, true);
  assert.equal(parseName("Mary-Jane O'Neil").ok, true);
  assert.equal(parseName("shit").ok, false);
  assert.equal(parseName("ni gger").ok, false);
  assert.equal(parseName("aaaa").ok, false);
  assert.equal(parseName("xXdarklord69").ok, false);
  assert.equal(parseName("classic").ok, true);
  assert.equal(parseName("Grape").ok, true);
});

test("links a latin handle to the name", () => {
  assert.equal(suggestHandle("Mina Okonkwo"), "mina-okonkwo");
  assert.equal(suggestHandle("José Álvarez"), "jose-alvarez");
  assert.equal(suggestHandle("李明"), "");
  assert.equal(parseHandle("mina-okonkwo").ok, true);
  assert.equal(parseHandle("concord").ok, false);
  assert.equal(parseHandle("fuck").ok, false);
  assert.equal(parseHandle("ab").ok, false);
});

test("score rewards a new word, then a recall, and not a miss", () => {
  const first = scoreReview(null, "r", "2026-10-14");
  assert.equal(first.points, 10);
  assert.equal(first.stage, 0);
  const again = scoreReview({ stage: first.stage, passes: first.passes, lapses: 0, lastPointDay: first.lastPointDay }, "r", "2026-10-14");
  assert.equal(again.points, 5);
  assert.equal(again.stage, 1);
  const miss = scoreReview({ stage: again.stage, passes: again.passes, lapses: 0, lastPointDay: again.lastPointDay }, "w", "2026-10-14");
  assert.equal(miss.points, 0);
  assert.equal(miss.stage, 0);
  assert.equal(pointsForKnownCard(3, 4), 25);
  assert.equal(leagueFor(0).id, "footpath");
  assert.equal(leagueFor(40).name, "Lane");
  assert.equal(leagueFor(1000).name, "Summit");
});
