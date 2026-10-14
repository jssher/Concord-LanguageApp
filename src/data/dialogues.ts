export type Dialogue = {
  id: string;
  title: string;
  scene: string;
  turns: { id: string; speaker: "Anna" | "Marko" }[];
};

export const DIALOGUES: Dialogue[] = [
  {
    id: "house",
    title: "At the house",
    scene: "Anna is at the door. Marko is inside.",
    turns: [
      { id: "d1a", speaker: "Anna" },
      { id: "d1b", speaker: "Marko" },
      { id: "d1c", speaker: "Anna" },
      { id: "d1d", speaker: "Marko" },
    ],
  },
  {
    id: "road",
    title: "On the road",
    scene: "They are walking. The mountain is ahead.",
    turns: [
      { id: "d2a", speaker: "Anna" },
      { id: "d2b", speaker: "Marko" },
      { id: "d2c", speaker: "Anna" },
      { id: "d2d", speaker: "Marko" },
    ],
  },
  {
    id: "night",
    title: "At night",
    scene: "The child is asleep. Rain is on the house.",
    turns: [
      { id: "d3a", speaker: "Anna" },
      { id: "d3b", speaker: "Marko" },
      { id: "d3c", speaker: "Anna" },
      { id: "d3d", speaker: "Marko" },
    ],
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
};
