export type GrammarTable = { caption: string; heads: string[]; rows: string[][] };

export type GrammarSlot = {
  summary: string;
  body: string;
  points: string[];
  samples: [string, string][];
  table?: GrammarTable;
};

export type GrammarChapter = {
  rules: GrammarSlot;
  verbs: GrammarSlot;
  nouns: GrammarSlot;
  odd: GrammarSlot;
};
