import type { Concept, TopicId } from "./types";

/**
 * Concord lexicon — one row per idea.
 * Translations live in src/data/lexicon/<lang>.json and must use these ids.
 * A sentence here is the meaning every language translates, not a calque template.
 * To correct a card, edit that language file only.
 */
export const TOPICS: { id: TopicId; label: string; blurb: string }[] = [
  { id: "people", label: "People", blurb: "Who is speaking, and who is near." },
  { id: "home", label: "Home", blurb: "The house and the things in it." },
  { id: "food", label: "Food", blurb: "What is on the table, and eating." },
  { id: "actions", label: "Actions", blurb: "The verbs you need on the first day." },
  { id: "nature", label: "Nature", blurb: "Sun, water, stone, and weather." },
  { id: "animals", label: "Animals", blurb: "The animals at the door." },
  { id: "body", label: "Body", blurb: "Hand, eye, ear — the parts you can point to." },
  { id: "places", label: "Places", blurb: "Road, city, school, sea, night." },
  { id: "describing", label: "Describing", blurb: "Size, heat, color, number, and this." },
];

export const CONCEPTS: Concept[] = [
  { id: "i", level: "A1", topic: "people", pos: "pron", image: "self", gloss: "I", sentence: "I am here." },
  { id: "you", level: "A1", topic: "people", pos: "pron", image: "friend", gloss: "you", sentence: "You are my friend." },
  { id: "woman", level: "A1", topic: "people", pos: "noun", image: "woman", gloss: "woman", sentence: "The woman is here." },
  { id: "man", level: "A1", topic: "people", pos: "noun", image: "man", gloss: "man", sentence: "The man is walking." },
  { id: "child", level: "A1", topic: "people", pos: "noun", image: "child", gloss: "child", sentence: "The child is sleeping." },
  { id: "name", level: "A1", topic: "people", pos: "noun", image: "book", gloss: "name", sentence: "My name is Anna." },
  { id: "friend", level: "A1", topic: "people", pos: "noun", image: "friend", gloss: "friend", sentence: "This is my friend." },
  { id: "family", level: "A1", topic: "people", pos: "noun", image: "family", gloss: "family", sentence: "My family is at home." },

  { id: "house", level: "A1", topic: "home", pos: "noun", image: "house", gloss: "house", sentence: "The house is small." },
  { id: "door", level: "A1", topic: "home", pos: "noun", image: "door", gloss: "door", sentence: "The door is open." },
  { id: "key", level: "A1", topic: "home", pos: "noun", image: "key", gloss: "key", sentence: "The key is on the table." },
  { id: "table", level: "A1", topic: "home", pos: "noun", image: "table", gloss: "table", sentence: "The book is on the table." },
  { id: "bed", level: "A1", topic: "home", pos: "noun", image: "bed", gloss: "bed", sentence: "The child is in the bed." },
  { id: "book", level: "A1", topic: "home", pos: "noun", image: "book", gloss: "book", sentence: "The book is new." },
  { id: "water", level: "A1", topic: "home", pos: "noun", image: "water", gloss: "water", sentence: "The water is cold." },
  { id: "fire", level: "A1", topic: "home", pos: "noun", image: "fire", gloss: "fire", sentence: "The fire is hot." },

  { id: "bread", level: "A1", topic: "food", pos: "noun", image: "bread", gloss: "bread", sentence: "The bread is good." },
  { id: "apple", level: "A1", topic: "food", pos: "noun", image: "apple", gloss: "apple", sentence: "The apple is red." },
  { id: "egg", level: "A1", topic: "food", pos: "noun", image: "egg", gloss: "egg", sentence: "The egg is on the table." },
  { id: "milk", level: "A1", topic: "food", pos: "noun", image: "milk", gloss: "milk", sentence: "The child drinks milk." },
  { id: "fish", level: "A1", topic: "food", pos: "noun", image: "fish", gloss: "fish", sentence: "The fish is in the water." },
  { id: "rice", level: "A1", topic: "food", pos: "noun", image: "rice", gloss: "rice", sentence: "We eat rice." },
  { id: "coffee", level: "A1", topic: "food", pos: "noun", image: "coffee", gloss: "coffee", sentence: "The coffee is hot." },
  { id: "eat", level: "A1", topic: "food", pos: "verb", image: "bread", gloss: "eat", sentence: "We eat bread." },

  { id: "drink", level: "A1", topic: "actions", pos: "verb", image: "water", gloss: "drink", sentence: "I drink water." },
  { id: "see", level: "A1", topic: "actions", pos: "verb", image: "eye", gloss: "see", sentence: "I see the sun." },
  { id: "hear", level: "A1", topic: "actions", pos: "verb", image: "ear", gloss: "hear", sentence: "I hear the rain." },
  { id: "sleep", level: "A1", topic: "actions", pos: "verb", image: "bed", gloss: "sleep", sentence: "The child sleeps." },
  { id: "walk", level: "A1", topic: "actions", pos: "verb", image: "road", gloss: "walk", sentence: "The man walks." },
  { id: "come", level: "A1", topic: "actions", pos: "verb", image: "door", gloss: "come", sentence: "You come to the house." },
  { id: "sit", level: "A1", topic: "actions", pos: "verb", image: "table", gloss: "sit", sentence: "We sit at the table." },
  { id: "give", level: "A1", topic: "actions", pos: "verb", image: "hand", gloss: "give", sentence: "I give you the key." },

  { id: "sun", level: "A1", topic: "nature", pos: "noun", image: "sun", gloss: "sun", sentence: "The sun is hot." },
  { id: "moon", level: "A1", topic: "nature", pos: "noun", image: "moon", gloss: "moon", sentence: "I see the moon." },
  { id: "tree", level: "A1", topic: "nature", pos: "noun", image: "tree", gloss: "tree", sentence: "The tree is big." },
  { id: "flower", level: "A1", topic: "nature", pos: "noun", image: "flower", gloss: "flower", sentence: "The flower is red." },
  { id: "rain", level: "A1", topic: "nature", pos: "noun", image: "water", gloss: "rain", sentence: "The rain is cold." },
  { id: "mountain", level: "A1", topic: "nature", pos: "noun", image: "mountain", gloss: "mountain", sentence: "The mountain is big." },
  { id: "river", level: "A1", topic: "nature", pos: "noun", image: "water", gloss: "river", sentence: "The river is long." },
  { id: "stone", level: "A1", topic: "nature", pos: "noun", image: "stone", gloss: "stone", sentence: "The stone is small." },

  { id: "dog", level: "A1", topic: "animals", pos: "noun", image: "dog", gloss: "dog", sentence: "The dog is small." },
  { id: "cat", level: "A1", topic: "animals", pos: "noun", image: "cat", gloss: "cat", sentence: "The cat is sleeping." },
  { id: "bird", level: "A1", topic: "animals", pos: "noun", image: "bird", gloss: "bird", sentence: "I see two birds." },

  { id: "hand", level: "A1", topic: "body", pos: "noun", image: "hand", gloss: "hand", sentence: "This is my hand." },
  { id: "eye", level: "A1", topic: "body", pos: "noun", image: "eye", gloss: "eye", sentence: "This is my eye." },
  { id: "ear", level: "A1", topic: "body", pos: "noun", image: "ear", gloss: "ear", sentence: "This is my ear." },
  { id: "head", level: "A1", topic: "body", pos: "noun", image: "head", gloss: "head", sentence: "This is my head." },
  { id: "mouth", level: "A1", topic: "body", pos: "noun", image: "mouth", gloss: "mouth", sentence: "This is my mouth." },
  { id: "foot", level: "A1", topic: "body", pos: "noun", image: "foot", gloss: "foot", sentence: "My foot is cold." },

  { id: "road", level: "A1", topic: "places", pos: "noun", image: "road", gloss: "road", sentence: "The road is long." },
  { id: "city", level: "A1", topic: "places", pos: "noun", image: "city", gloss: "city", sentence: "The city is big." },
  { id: "school", level: "A1", topic: "places", pos: "noun", image: "school", gloss: "school", sentence: "The child goes to school." },
  { id: "sea", level: "A1", topic: "places", pos: "noun", image: "sea", gloss: "sea", sentence: "I see the sea." },
  { id: "night", level: "A1", topic: "places", pos: "noun", image: "moon", gloss: "night", sentence: "The night is cold." },

  { id: "one", level: "A1", topic: "describing", pos: "num", image: "apple", gloss: "one", sentence: "I have one apple." },
  { id: "two", level: "A1", topic: "describing", pos: "num", image: "bird", gloss: "two", sentence: "I see two birds." },
  { id: "big", level: "A1", topic: "describing", pos: "adj", image: "mountain", gloss: "big", sentence: "The house is big." },
  { id: "small", level: "A1", topic: "describing", pos: "adj", image: "child", gloss: "small", sentence: "The child is small." },
  { id: "good", level: "A1", topic: "describing", pos: "adj", image: "bread", gloss: "good", sentence: "The bread is good." },
  { id: "hot", level: "A1", topic: "describing", pos: "adj", image: "fire", gloss: "hot", sentence: "The fire is hot." },
  { id: "cold", level: "A1", topic: "describing", pos: "adj", image: "water", gloss: "cold", sentence: "The water is cold." },
  { id: "red", level: "A1", topic: "describing", pos: "adj", image: "apple", gloss: "red", sentence: "The apple is red." },
  { id: "new", level: "A1", topic: "describing", pos: "adj", image: "book", gloss: "new", sentence: "The book is new." },
  { id: "this", level: "A1", topic: "describing", pos: "det", image: "house", gloss: "this", sentence: "This is my house." },
];

export const CONCEPT_BY_ID = new Map(CONCEPTS.map((c) => [c.id, c]));

export const POS_LABEL: Record<Concept["pos"], string> = {
  noun: "noun",
  verb: "verb",
  adj: "adjective",
  pron: "pronoun",
  det: "determiner",
  num: "number",
};
