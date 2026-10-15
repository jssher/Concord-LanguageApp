import raw from "./path-lessons.json";

export type PathLevel = "A1" | "A2" | "B1" | "B2";

export type PathKind = "scene" | "read" | "practice";

export type PathLesson = {
  id: string;
  level: PathLevel;
  n: number;
  title: string;
  place: string;
  aim: string;
  words: string[];
  lines: { who: string; en: string }[];
  image: string;
  grammar: string;
  /** Sentences before the lines. A reading is only this text. */
  lead: string[];
  kind: PathKind;
};

export const PATH_LEVELS: PathLevel[] = ["A1", "A2", "B1", "B2"];

export const PATH_LESSONS = (raw as PathLesson[]).map((lesson) => ({
  ...lesson,
  lead: lesson.lead ?? [],
  kind: lesson.kind ?? "scene",
}));

const STUDY: Record<PathLevel, Record<string, string>> = {
  A1: {
    People: "01 People",
    Home: "02 Home",
    Food: "03 Food",
    Town: "13 Town",
    Shop: "50 Market produce",
    Help: "08 Places",
    Health: "07 Body",
    School: "14 Classroom",
    Travel: "24 Transport",
    Night: "02 Home",
    Plans: "12 Time",
    Work: "22 People",
    Choice: "09 Describing",
  },
  A2: {
    People: "16 Descriptions",
    Home: "05 Home life",
    Food: "06 Food out",
    Town: "09 City",
    Shop: "03 Shopping",
    Help: "01 Travel",
    Health: "02 Health",
    School: "10 School",
    Travel: "01 Travel",
    Night: "05 Home life",
    Plans: "22 Free time",
    Work: "04 Work",
    Choice: "03 Shopping",
  },
  B1: {
    People: "04 Relationships",
    Home: "04 Relationships",
    Food: "27 Food craft",
    Town: "20 Civic life",
    Shop: "26 Money talk",
    Help: "07 Problems",
    Health: "12 Health",
    School: "05 Education",
    Travel: "13 Travel",
    Night: "04 Relationships",
    Plans: "16 Plans",
    Work: "08 Work",
    Choice: "06 Opinions",
  },
  B2: {
    People: "07 Emotions",
    Home: "07 Emotions",
    Food: "37 In the kitchen",
    Town: "08 Society",
    Shop: "10 Economy",
    Help: "01 Nuance",
    Health: "13 Mind",
    School: "06 Study",
    Travel: "16 World",
    Night: "07 Emotions",
    Plans: "01 Nuance",
    Work: "05 Work",
    Choice: "02 Argument",
  },
};

export function studyFor(lesson: PathLesson): { level: PathLevel; group: string } {
  const table = STUDY[lesson.level];
  return { level: lesson.level, group: table[lesson.place] ?? Object.values(table)[0] };
}

export function lessonsIn(level: PathLevel): PathLesson[] {
  return PATH_LESSONS.filter((lesson) => lesson.level === level);
}
