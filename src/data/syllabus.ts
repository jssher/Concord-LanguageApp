export const BATCHES = [
  { id: "d3", label: "3 days", days: 3 },
  { id: "w1", label: "1 week", days: 7 },
  { id: "w2", label: "2 weeks", days: 14 },
  { id: "w4", label: "4 weeks", days: 28 },
  { id: "m2", label: "2 months", days: 60 },
  { id: "m4", label: "4 months", days: 120 },
  { id: "m6", label: "6 months", days: 180 },
  { id: "y1", label: "1 year", days: 365 },
] as const;

export const SHELVES: { level: string; range: string; aim: string }[] = [
  { level: "A1", range: "1–500", aim: "Point, name, and get through a day." },
  { level: "A2", range: "501–1,500", aim: "Tell a simple past and handle travel, food, and health." },
  { level: "B1", range: "1,501–3,500", aim: "Hold a story, an opinion, and a problem." },
  { level: "B2", range: "3,501–7,000", aim: "The frequency shelf where most everyday text starts to open." },
];

export const NEXT_TOPICS: { title: string; words: string }[] = [
  { title: "Survival", words: "hello, goodbye, please, thank you, yes, no, sorry, where, when, why, how, how much" },
  { title: "Numbers & time", words: "3–20, 30–100, today, tomorrow, yesterday, morning, evening, week, year, the days" },
  { title: "Family", words: "mother, father, sister, brother, daughter, son, boy, girl, baby" },
  { title: "More of the body", words: "hair, nose, tooth, arm, leg, back, finger" },
  { title: "Clothes & rooms", words: "shirt, shoes, coat, room, window, kitchen, chair, lamp" },
  { title: "Market", words: "meat, fruit, tea, sugar, salt, cheese, money, shop, buy" },
  { title: "Town", words: "street, station, bus, train, car, ticket, hospital, hotel" },
  { title: "Work of the mind", words: "read, write, speak, learn, understand, want, need, like" },
  { title: "Joining lines", words: "and, but, because, then — plus the past of the verbs you already know" },
];
