export type TalkLevel = "A1" | "A2" | "B1" | "B2" | "C1";

export type TalkDomain =
  | "Everyday"
  | "Home"
  | "Food"
  | "Shopping"
  | "Travel"
  | "Health"
  | "School"
  | "Work";

export const TALK_DOMAINS: TalkDomain[] = [
  "Everyday",
  "Home",
  "Food",
  "Shopping",
  "Travel",
  "Health",
  "School",
  "Work",
];

export type Dialogue = {
  id: string;
  level: TalkLevel;
  domain: TalkDomain;
  title: string;
  aim: string;
  scene: string;
  image: string;
  turns: { id: string; speaker: "Anna" | "Marko"; en?: string }[];
};

export const TALK_LEVELS: { id: TalkLevel; label: string; note: string }[] = [
  { id: "A1", label: "A1", note: "Hello, please, and thank you." },
  { id: "A2", label: "A2", note: "Ask the way, the time, and for help." },
  { id: "B1", label: "B1", note: "Plans, the past, and a small problem." },
  { id: "B2", label: "B2", note: "Give a reason, and change a plan." },
  { id: "C1", label: "Toward C1", note: "Soften a point, and weigh a choice." },
];

const pair = (prefix: string): Dialogue["turns"] =>
  ["a", "b", "c", "d", "e", "f"].map((letter, index) => ({
    id: `${prefix}-${letter}`,
    speaker: (index % 2 === 0 ? "Anna" : "Marko") as "Anna" | "Marko",
  }));

export const DIALOGUES: Dialogue[] = [
  {
    id: "house",
    level: "A1",
    domain: "Everyday",
    title: "At the door",
    aim: "Greet someone, say your name, and accept an invitation.",
    scene: "Anna is at the door. Marko is inside.",
    image: "house",
    turns: [
      { id: "d1a", speaker: "Anna" },
      { id: "d1b", speaker: "Marko" },
      { id: "d1c", speaker: "Anna" },
      { id: "d1d", speaker: "Marko" },
    ],
  },
  {
    id: "cafe",
    level: "A1",
    domain: "Food",
    title: "At the café",
    aim: "Order water and bread, and ask the price.",
    scene: "Anna sits down. Marko brings water and bread.",
    image: "cafe",
    turns: pair("cf"),
  },
  {
    id: "road",
    level: "A1",
    domain: "Travel",
    title: "On the road",
    aim: "Name what you see, and say a simple need.",
    scene: "They are walking. The mountain is ahead.",
    image: "road",
    turns: [
      { id: "d2a", speaker: "Anna" },
      { id: "d2b", speaker: "Marko" },
      { id: "d2c", speaker: "Anna" },
      { id: "d2d", speaker: "Marko" },
    ],
  },
  {
    id: "night",
    level: "A1",
    domain: "Home",
    title: "At night",
    aim: "Talk about the house, the child, and the weather.",
    scene: "The child is asleep. Rain is on the house.",
    image: "night",
    turns: [
      { id: "d3a", speaker: "Anna" },
      { id: "d3b", speaker: "Marko" },
      { id: "d3c", speaker: "Anna" },
      { id: "d3d", speaker: "Marko" },
    ],
  },
  {
    id: "station",
    level: "A2",
    domain: "Travel",
    title: "At the station",
    aim: "Ask where something is, ask the time, and buy a ticket.",
    scene: "Anna needs the train. Marko works at the station.",
    image: "station",
    turns: pair("st"),
  },
  {
    id: "help",
    level: "A2",
    domain: "Travel",
    title: "Asking the way",
    aim: "Say you are lost, and follow a short direction.",
    scene: "Anna stops a stranger. The station is nearby.",
    image: "help",
    turns: pair("hp"),
  },
  {
    id: "plan",
    level: "B1",
    domain: "Everyday",
    title: "Making a plan",
    aim: "Say what you did, and agree a time to meet.",
    scene: "They sit by the window and plan tomorrow.",
    image: "plan",
    turns: pair("pl"),
  },
  {
    id: "shop",
    level: "B1",
    domain: "Shopping",
    title: "The wrong size",
    aim: "Explain a problem, try something else, and pay.",
    scene: "Anna is at the counter. The first shirt does not fit.",
    image: "shop",
    turns: pair("sh"),
  },
  {
    id: "opinion",
    level: "B2",
    domain: "Travel",
    title: "Train or bus",
    aim: "Give an opinion, concede a point, and decide.",
    scene: "They are on the platform, choosing how to travel.",
    image: "opinion",
    turns: pair("op"),
  },
  {
    id: "late",
    level: "B2",
    domain: "Work",
    title: "Running late",
    aim: "Explain a delay, and ask someone to wait.",
    scene: "Anna calls from the station. Marko is already at the café.",
    image: "late",
    turns: pair("lt"),
  },
  {
    id: "clarify",
    level: "C1",
    domain: "Work",
    title: "A misunderstanding",
    aim: "Correct what you thought, without blaming anyone.",
    scene: "They go back over yesterday’s conversation.",
    image: "clarify",
    turns: pair("cl"),
  },
  {
    id: "choice",
    level: "C1",
    domain: "Home",
    title: "Which flat",
    aim: "Weigh two options, and leave the decision open.",
    scene: "They stand in an empty room and compare two flats.",
    image: "choice",
    turns: pair("ch"),
  },
];

export const DIALOGUE_EN: Record<string, string> = {
  d1a: "Hello. I am here.",
  d1b: "What is your name?",
  d1c: "My name is Anna. This is my friend.",
  d1d: "Come in. The bread is good.",
  d2a: "I see the mountain.",
  d2b: "The road is long.",
  d2c: "The sun is hot.",
  d2d: "We sit, and I drink water.",
  d3a: "The child sleeps.",
  d3b: "I see the moon.",
  d3c: "I hear the rain.",
  d3d: "The house is small and good.",
  "cf-a": "Hello. Water, please.",
  "cf-b": "Here you are.",
  "cf-c": "Thank you.",
  "cf-d": "Would you like bread?",
  "cf-e": "Yes, please. How much is it?",
  "cf-f": "Two. Here you are.",
  "st-a": "Excuse me. Where is the train?",
  "st-b": "It is over there.",
  "st-c": "What time is it?",
  "st-d": "It is three o’clock.",
  "st-e": "One ticket, please.",
  "st-f": "Here you are. Have a good trip.",
  "hp-a": "Excuse me. I need help.",
  "hp-b": "What is wrong?",
  "hp-c": "I am lost. Where is the station?",
  "hp-d": "It is near. Go straight, then turn left.",
  "hp-e": "Thank you very much.",
  "hp-f": "You are welcome.",
  "pl-a": "What did you do yesterday?",
  "pl-b": "I went to the market and bought bread.",
  "pl-c": "Shall we eat together tomorrow?",
  "pl-d": "Yes. Can you come at one?",
  "pl-e": "I work until twelve, but I can come at one.",
  "pl-f": "Good. We will meet at the café.",
  "sh-a": "Excuse me. This is the wrong size.",
  "sh-b": "I am sorry. Would you like a smaller one?",
  "sh-c": "Yes, please. May I try it?",
  "sh-d": "Of course. The changing room is there.",
  "sh-e": "This one fits. Can I pay by card?",
  "sh-f": "Yes. That is twenty.",
  "op-a": "I think the train is better than the bus.",
  "op-b": "I agree, although it costs more.",
  "op-c": "That is true. Still, we would save time.",
  "op-d": "If we leave now, we should arrive before six.",
  "op-e": "Then let us take the train.",
  "op-f": "Good. I will buy the tickets.",
  "lt-a": "I am afraid I am going to be late.",
  "lt-b": "What happened?",
  "lt-c": "The meeting ran long, so I missed the train.",
  "lt-d": "Do not worry. We can start without you.",
  "lt-e": "I would rather you waited, if you can.",
  "lt-f": "All right. We will wait until half past four.",
  "cl-a": "I may have misunderstood you yesterday.",
  "cl-b": "In what way?",
  "cl-c": "I thought you were against the plan, whereas you only wanted more time.",
  "cl-d": "Exactly. I am not opposed to it.",
  "cl-e": "Then we should make that clear to the others.",
  "cl-f": "Yes. Otherwise they will assume we disagree.",
  "ch-a": "On balance, I would choose the smaller flat.",
  "ch-b": "Even though the other one is closer to work?",
  "ch-c": "Yes, because the quiet is worth the longer walk.",
  "ch-d": "I see your point, although I might choose differently.",
  "ch-e": "That is fair. It depends on what matters to you.",
  "ch-f": "Then let us look at both once more before we decide.",
};
