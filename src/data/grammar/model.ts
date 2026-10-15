export const GRAMMAR_LEVELS = ["A1", "A2", "B1", "B2"] as const;

export type GrammarLevel = (typeof GRAMMAR_LEVELS)[number];

export type GrammarTable = { caption: string; heads: string[]; rows: string[][] };

/** One small step in that language's own course. */
export type GrammarLesson = {
  id: string;
  level: GrammarLevel;
  title: string;
  /** The one line to remember. */
  lead: string;
  notes: string[];
  /** Sentence in the language, then an English gloss. */
  examples: [string, string][];
  table?: GrammarTable;
};

/** Front is the word. Back is the forms you cannot build. */
export type FormCard = {
  word: string;
  gloss: string;
  tag: string;
  forms: [string, string][];
};

export type GrammarCourse = {
  intro: string;
  lessons: GrammarLesson[];
  cards: FormCard[];
};
