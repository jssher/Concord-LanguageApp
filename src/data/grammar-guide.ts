import { AFRICA } from "./grammar/course-africa";
import { EAST } from "./grammar/course-east";
import { GERMANIC } from "./grammar/course-germanic";
import { INDIC } from "./grammar/course-indic";
import { NEAR } from "./grammar/course-near";
import { ROMANCE } from "./grammar/course-romance";
import { SLAVIC } from "./grammar/course-slavic";
import { WORLD } from "./grammar/course-world";
import type { GrammarCourse } from "./grammar/model";
import { LANG_BY_ID, LANGUAGES } from "./languages";

const COURSES: Record<string, GrammarCourse> = {
  ...GERMANIC,
  ...ROMANCE,
  ...SLAVIC,
  ...NEAR,
  ...INDIC,
  ...EAST,
  ...AFRICA,
  ...WORLD,
};

function fallback(langId: string): GrammarCourse {
  const lang = LANG_BY_ID.get(langId);
  const name = lang?.name ?? langId;
  return {
    intro: lang?.tip ?? `${name} has its own grammar.`,
    lessons: [
      {
        id: "a1-start",
        level: "A1",
        title: name,
        lead: lang?.tip ?? `Start from ${name} itself, not from a neighbour.`,
        notes: [
          "The cards of this language are the forms to trust.",
          "Do not copy an ending across from a related language.",
          "The next lessons stay inside this language.",
        ],
        examples: [
          [lang?.native ?? name, name],
          [lang?.tip ?? name, "what to watch first"],
        ],
      },
    ],
    cards: [],
  };
}

export function grammarCourse(langId: string): GrammarCourse {
  return COURSES[langId] ?? fallback(langId);
}

export function missingGrammarCourses(): string[] {
  return LANGUAGES.map((lang) => lang.id).filter((id) => !COURSES[id]);
}
