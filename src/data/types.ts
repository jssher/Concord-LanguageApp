export type Gender = "m" | "f" | "n" | "c";

export type Pos = "noun" | "verb" | "adj" | "pron" | "det" | "num";

export type Entry = {
  word: string;
  sentence: string;
  article?: string;
  gender?: Gender;
  plural?: string;
  feminine?: string;
  masculine?: string;
  neuter?: string;
  reading?: string;
  note?: string;
};

export type LangPack = {
  entries: Record<string, Entry>;
  lines: Record<string, string>;
};

export type Concept = {
  id: string;
  level: "A1";
  topic: TopicId;
  pos: Pos;
  image: string;
  gloss: string;
  sentence: string;
};

export type TopicId =
  | "people"
  | "home"
  | "food"
  | "actions"
  | "nature"
  | "animals"
  | "body"
  | "places"
  | "describing";
