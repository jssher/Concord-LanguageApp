export type PriorCard = {
  stage: number;
  passes: number;
  lapses: number;
  lastPointDay: string | null;
};

export type ReviewScore = {
  stage: number;
  passes: number;
  lapses: number;
  points: number;
  lastPointDay: string | null;
};

/** Points for one review. A new word is worth more than a later recall. A mastered word scores once a day. */
export function scoreReview(prev: PriorCard | null, mark: "r" | "w", today: string): ReviewScore {
  const oldStage = prev ? prev.stage : -1;
  const oldPasses = prev?.passes ?? 0;
  const oldLapses = prev?.lapses ?? 0;
  if (mark === "w") {
    return {
      stage: 0,
      passes: oldPasses,
      lapses: oldLapses + 1,
      points: 0,
      lastPointDay: prev?.lastPointDay ?? null,
    };
  }
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
    lastPointDay: points > 0 ? today : (prev?.lastPointDay ?? null),
  };
}

/** Points for a card already studied on this device, counted once when it first joins the league. */
export function pointsForKnownCard(stage: number, passes: number): number {
  if (passes < 1) return 0;
  const held = Math.max(0, Math.min(8, stage));
  return 10 + 5 * held;
}

export const LEAGUES = [
  { id: "footpath", name: "Footpath", min: 0, next: 40, blurb: "The first words you keep." },
  { id: "lane", name: "Lane", min: 40, next: 150, blurb: "A run of words you can still say." },
  { id: "high-road", name: "High road", min: 150, next: 400, blurb: "New words, and the old ones held." },
  { id: "bridge", name: "Bridge", min: 400, next: 1000, blurb: "A lot learned, and most of it still there." },
  { id: "summit", name: "Summit", min: 1000, next: null, blurb: "A long memory of the course." },
] as const;

export type LeagueId = (typeof LEAGUES)[number]["id"];

export function leagueFor(score: number) {
  let current: (typeof LEAGUES)[number] = LEAGUES[0];
  for (const league of LEAGUES) {
    if (score >= league.min) current = league;
  }
  return current;
}
