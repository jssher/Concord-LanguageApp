export type PathStage = {
  id: string;
  level: "A1" | "A2" | "B1" | "B2";
  title: string;
  aim: string;
  image: string;
  studyLevel: "A1" | "A2" | "B1" | "B2" | "P";
  studyGroup: string;
  talk: string;
  words: string;
};

/** One order for words, scenes, and grammar. Extra shelf groups stay off this path. */
export const PATH: PathStage[] = [
  {
    id: "sentence",
    level: "A1",
    title: "A person and a sentence",
    aim: "Say who you are. Learn how this language builds one plain sentence.",
    image: "/cards/friend.jpg",
    studyLevel: "A1",
    studyGroup: "01 People",
    talk: "house",
    words: "I, you, name, friend",
  },
  {
    id: "nouns",
    level: "A1",
    title: "Things you can point at",
    aim: "House, water, book. Learn the article, class, or measure word that belongs with the noun.",
    image: "/cards/house.jpg",
    studyLevel: "A1",
    studyGroup: "02 Home",
    talk: "night",
    words: "house, door, book, water",
  },
  {
    id: "verbs",
    level: "A1",
    title: "What people do",
    aim: "A present or polite dictionary form, enough to talk about now.",
    image: "/cards/road.jpg",
    studyLevel: "A1",
    studyGroup: "04 Actions",
    talk: "road",
    words: "see, drink, walk, sleep",
  },
  {
    id: "food",
    level: "A1",
    title: "Ask for something",
    aim: "Please, thank you, and a question. Then order water and bread.",
    image: "/cards/bread.jpg",
    studyLevel: "A1",
    studyGroup: "03 Food",
    talk: "cafe",
    words: "water, bread, coffee, eat",
  },
  {
    id: "way",
    level: "A2",
    title: "Find the way",
    aim: "Where, when, and a short direction. Past or location, if this language marks them.",
    image: "/talk/station.jpg",
    studyLevel: "A2",
    studyGroup: "01 Travel",
    talk: "station",
    words: "station, ticket, train, time",
  },
  {
    id: "shop",
    level: "A2",
    title: "A small problem",
    aim: "Describe a thing, compare it, and ask for another.",
    image: "/talk/shop.jpg",
    studyLevel: "A2",
    studyGroup: "03 Shopping",
    talk: "shop",
    words: "size, price, smaller, card",
  },
  {
    id: "plan",
    level: "B1",
    title: "What happened, and what is next",
    aim: "A finished action, then a plan. This is where tense or aspect becomes useful.",
    image: "/talk/plan.jpg",
    studyLevel: "B1",
    studyGroup: "07 Problems",
    talk: "plan",
    words: "yesterday, tomorrow, meet, work",
  },
  {
    id: "if",
    level: "B1",
    title: "If, and a preference",
    aim: "A real condition, and a polite wish. Then the late-train scene.",
    image: "/talk/late.jpg",
    studyLevel: "B1",
    studyGroup: "06 Opinions",
    talk: "late",
    words: "if, rather, wait, because",
  },
  {
    id: "reason",
    level: "B2",
    title: "Agree, with a but",
    aim: "Concession and a reason. Weigh the train against the bus.",
    image: "/talk/opinion.jpg",
    studyLevel: "B2",
    studyGroup: "01 Nuance",
    talk: "opinion",
    words: "although, still, agree, because",
  },
  {
    id: "choice",
    level: "B2",
    title: "A careful choice",
    aim: "Hold two ideas, correct a misunderstanding, and leave a decision open.",
    image: "/talk/choice.jpg",
    studyLevel: "B2",
    studyGroup: "02 Argument",
    talk: "choice",
    words: "although, whereas, depend, decide",
  },
];
