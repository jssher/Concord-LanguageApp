#!/usr/bin/env python3
"""Build the English shelf: 7000 word cards (with the core 64) and 1000 phrases."""

import csv
import json
import re
from pathlib import Path

ROOT = Path("/workspace")
CEFR = Path("/tmp/cefr.csv")
OUT = ROOT / "public/course/shelf.json"

CORE = {
    "i", "you", "woman", "man", "child", "name", "friend", "family", "house", "door",
    "key", "table", "bed", "book", "water", "fire", "bread", "apple", "egg", "milk",
    "fish", "rice", "coffee", "eat", "drink", "see", "hear", "sleep", "walk", "come",
    "sit", "give", "sun", "moon", "tree", "flower", "rain", "mountain", "river", "stone",
    "dog", "cat", "bird", "hand", "eye", "ear", "head", "mouth", "foot", "road", "city",
    "school", "sea", "night", "one", "two", "big", "small", "good", "hot", "cold", "red",
    "new", "this",
}

STOP = {
    "the", "of", "and", "to", "a", "in", "for", "is", "on", "that", "by", "with", "it",
    "not", "or", "be", "are", "from", "as", "at", "an", "was", "were", "have", "has",
    "had", "but", "what", "which", "their", "said", "if", "about", "into", "than", "then",
    "so", "no", "would", "could", "should", "can", "will", "just", "than", "its", "his",
    "her", "they", "them", "we", "he", "she", "our", "your", "my", "me", "him", "us",
    "do", "does", "did", "been", "being", "am", "very", "also", "there", "here", "when",
    "where", "who", "how", "why", "all", "any", "some", "more", "most", "other", "such",
    "only", "own", "same", "too", "over", "after", "before", "between", "under", "again",
    "once", "because", "while", "during", "without", "within", "each", "both", "few",
    "these", "those", "this", "that", "than", "then", "off", "up", "down", "out", "now",
    "just", "like", "than",
}

VERBS = {
    "make", "go", "know", "take", "come", "think", "look", "want", "use", "find", "tell",
    "ask", "work", "seem", "feel", "try", "leave", "call", "need", "become", "put", "mean",
    "keep", "let", "begin", "help", "talk", "turn", "start", "show", "play", "move", "live",
    "believe", "hold", "bring", "happen", "write", "sit", "stand", "lose", "pay", "meet",
    "include", "continue", "set", "learn", "change", "lead", "understand", "watch", "follow",
    "stop", "create", "speak", "read", "spend", "grow", "open", "walk", "win", "offer",
    "remember", "love", "consider", "appear", "buy", "wait", "serve", "die", "send", "build",
    "stay", "fall", "cut", "reach", "kill", "remain", "suggest", "raise", "pass", "sell",
    "require", "report", "decide", "pull", "return", "explain", "hope", "develop", "carry",
    "break", "receive", "agree", "support", "hit", "produce", "cover", "catch", "draw",
    "choose", "wear", "drive", "listen", "fill", "drop", "plan", "join", "pick", "teach",
    "share", "enjoy", "add", "travel", "cook", "clean", "wash", "study", "practice", "visit",
    "arrive", "leave", "enter", "close", "save", "check", "finish", "prepare", "invite",
    "answer", "describe", "compare", "improve", "protect", "accept", "avoid", "manage",
    "notice", "realize", "wonder", "imagine", "prefer", "suggest", "admit", "argue", "claim",
    "prove", "solve", "reduce", "increase", "measure", "design", "publish", "translate",
}

ADJECTIVES = {
    "good", "new", "first", "last", "long", "great", "little", "own", "other", "old", "right",
    "high", "different", "small", "large", "next", "early", "young", "important", "public",
    "bad", "same", "able", "free", "sure", "clear", "full", "special", "easy", "hard", "strong",
    "possible", "whole", "real", "best", "better", "true", "short", "simple", "nice", "fine",
    "happy", "ready", "kind", "warm", "quick", "slow", "quiet", "loud", "safe", "clean", "open",
    "closed", "hungry", "tired", "busy", "late", "early", "cheap", "expensive", "useful",
    "beautiful", "careful", "serious", "common", "local", "available", "recent", "major",
    "similar", "various", "certain", "likely", "political", "social", "economic", "medical",
    "natural", "personal", "national", "international", "general", "specific", "positive",
    "negative", "final", "main", "single", "entire", "current", "previous", "future", "daily",
    "weekly", "normal", "strange", "famous", "popular", "modern", "ancient", "heavy", "light",
    "dark", "bright", "soft", "thick", "thin", "wide", "narrow", "deep", "round", "flat",
    "sweet", "sour", "fresh", "dry", "wet", "rich", "poor", "empty", "full", "correct",
    "wrong", "necessary", "difficult", "comfortable", "friendly", "honest", "polite", "rude",
    "brave", "afraid", "angry", "calm", "proud", "shy", "lonely", "grateful", "curious",
}

VERBS -= CORE
ADJECTIVES -= CORE

BLOCK = {
    "sex", "sexual", "sexy", "porn", "nude", "naked", "rape", "suicide", "murder", "kill",
    "killed", "killing", "killer", "damn", "hell", "shit", "fuck", "ass", "bitch", "bastard",
    "die", "died", "dying", "death", "dead", "blood", "gun", "bomb", "weapon", "abuse",
}

SPECIAL_SENTENCE = {
    "about": "We talked about the book.",
    "above": "The lamp is above the table.",
    "across": "The school is across the road.",
    "after": "We rest after school.",
    "again": "Please say it again.",
    "against": "The chair is against the wall.",
    "ago": "I saw her two days ago.",
    "along": "We walked along the river.",
    "already": "I already ate.",
    "also": "I would also like some water.",
    "always": "She always arrives on time.",
    "among": "She sat among her friends.",
    "around": "The cat is around the house.",
    "away": "The bus is going away.",
    "back": "I will be back soon.",
    "because": "I stayed home because it was raining.",
    "before": "Wash your hands before dinner.",
    "behind": "The garden is behind the house.",
    "below": "The shop is below the school.",
    "beside": "Sit beside me.",
    "between": "The table is between the chairs.",
    "but": "I am tired, but I am happy.",
    "down": "Please sit down.",
    "during": "I read during the trip.",
    "else": "Would you like anything else?",
    "enough": "That is enough, thank you.",
    "ever": "Have you ever seen the sea?",
    "every": "I walk every morning.",
    "far": "The station is not far.",
    "here": "I am here.",
    "inside": "The cat is inside.",
    "near": "The school is near the park.",
    "never": "I never drink coffee at night.",
    "next": "See you next week.",
    "now": "I am ready now.",
    "off": "Please turn the lamp off.",
    "often": "We often eat rice.",
    "on": "The book is on the table.",
    "once": "I once lived by the sea.",
    "only": "I only need water.",
    "out": "The children are out.",
    "outside": "We can wait outside.",
    "over": "The bird flew over the house.",
    "perhaps": "Perhaps we can meet tomorrow.",
    "quite": "The soup is quite hot.",
    "rather": "I would rather walk.",
    "since": "I have been here since Monday.",
    "so": "The water is cold, so I made tea.",
    "soon": "I will come soon.",
    "still": "She is still at school.",
    "then": "We eat, and then we walk.",
    "there": "The station is over there.",
    "through": "We walked through the park.",
    "together": "We cooked together.",
    "too": "This coffee is too hot.",
    "under": "The cat is under the table.",
    "until": "I will wait until six.",
    "up": "Please stand up.",
    "very": "The bread is very good.",
    "well": "I slept well.",
    "yet": "I have not eaten yet.",
    "may": "May is a warm month.",
    "time": "What time is it?",
    "people": "The people are kind.",
    "day": "Today is a good day.",
    "year": "This year is new.",
    "way": "Which way is the school?",
    "thing": "This thing is small.",
    "world": "The world is big.",
    "life": "Life is good.",
    "hand": "This is my hand.",
    "part": "This is part of the house.",
    "place": "This place is quiet.",
    "week": "I work this week.",
    "home": "I am at home.",
    "room": "The room is warm.",
    "mother": "My mother is at home.",
    "father": "My father is at home.",
    "boy": "The boy is reading.",
    "girl": "The girl is reading.",
    "food": "The food is good.",
    "money": "I need money for bread.",
    "work": "I work in the morning.",
    "number": "What is your number?",
    "today": "Today is Monday.",
    "tomorrow": "I will come tomorrow.",
    "yesterday": "I was at home yesterday.",
    "morning": "Good morning.",
    "evening": "Good evening.",
    "please": "A cup of coffee, please.",
    "thank": "Thank you for the water.",
    "sorry": "I am sorry.",
    "hello": "Hello, my name is Anna.",
    "yes": "Yes, I understand.",
    "help": "Can you help me?",
    "three": "I have three apples.",
    "four": "I see four birds.",
    "five": "Five people are here.",
    "ten": "The book costs ten euros.",
    "hundred": "There are a hundred seats.",
    "monday": "I study on Monday.",
    "tuesday": "The shop opens on Tuesday.",
    "wednesday": "We meet on Wednesday.",
    "thursday": "The market is on Thursday.",
    "friday": "Friday is a work day.",
    "saturday": "I rest on Saturday.",
    "sunday": "Sunday is quiet.",
    "mother": "My mother is at home.",
    "window": "The window is open.",
    "kitchen": "The kitchen is clean.",
    "shirt": "The shirt is blue.",
    "shoe": "The shoe is new.",
    "train": "The train is late.",
    "bus": "The bus stops here.",
    "car": "The car is red.",
    "hospital": "The hospital is near.",
    "doctor": "The doctor is kind.",
    "bread": "The bread is good.",
}

NOUN_FRAMES = [
    "The {w} is here.",
    "I can see the {w}.",
    "We need a {w} today.",
    "She pointed to the {w}.",
    "This {w} is useful.",
]
ADJ_FRAMES = [
    "The weather is {w} today.",
    "That answer sounds {w}.",
    "The room feels {w}.",
]
ADV_FRAMES = [
    "She spoke {w}.",
    "He answered {w}.",
    "They worked {w}.",
]
VERB_FRAMES = [
    "I {w} every morning.",
    "We {w} after school.",
    "They {w} together.",
]

PLURALS = {
    "person": "people",
    "mouse": "mice",
    "tooth": "teeth",
    "goose": "geese",
    "leaf": "leaves",
    "knife": "knives",
    "life": "lives",
    "wife": "wives",
    "half": "halves",
    "sheep": "sheep",
    "deer": "deer",
}


POS_MAP = {
    "noun": "noun",
    "verb": "verb",
    "adjective": "adj",
    "adverb": "adv",
    "pronoun": "pron",
    "preposition": "prep",
    "determiner": "det",
    "conjunction": "conj",
    "number": "num",
    "modal auxiliary": "verb",
    "be-verb": "verb",
    "do-verb": "verb",
    "have-verb": "verb",
    "interjection": "phrase",
    "infinitive-to": "verb",
}

LEVEL_ORDER = {"A1": 0, "A2": 1, "B1": 2, "B2": 3}
POS_RANK = {"noun": 0, "verb": 1, "adj": 2, "adv": 3, "num": 4, "pron": 5, "det": 6, "prep": 7, "conj": 8, "phrase": 9}


def clean_head(raw: str) -> str | None:
    text = raw.strip().replace("’", "'")
    if "/" in text:
        text = text.split("/")[0].strip()
    if not text or any(ch in text for ch in "()[]0123456789"):
        return None
    if not re.fullmatch(r"[A-Za-z][A-Za-z' \-]*", text):
        return None
    # Dictionary form, not a capitalized name. Keep the CEFR casing only for I.
    if text.lower() == "i":
        return None
    return text.lower()


def load_cefr() -> list[tuple[str, str, str]]:
    best: dict[str, tuple[str, str, str]] = {}
    with CEFR.open(newline="") as handle:
        for row in csv.DictReader(handle):
            word = clean_head(row["headword"])
            level = row["CEFR"].strip()
            if not word or level not in LEVEL_ORDER or word in CORE or word in BLOCK:
                continue
            pos = POS_MAP.get(row["pos"].strip(), "noun")
            key = word
            current = best.get(key)
            candidate = (word, pos, level)
            if current is None:
                best[key] = candidate
                continue
            _, old_pos, old_level = current
            if (LEVEL_ORDER[level], POS_RANK.get(pos, 9)) < (LEVEL_ORDER[old_level], POS_RANK.get(old_pos, 9)):
                best[key] = candidate
    rows = list(best.values())
    rows.sort(key=lambda item: (LEVEL_ORDER[item[2]], item[0]))
    return rows


def sentence_for(word: str, pos: str) -> str:
    if word in SPECIAL_SENTENCE:
        return SPECIAL_SENTENCE[word]
    if pos == "verb":
        return f"I am learning to {word}."
    if pos == "adj":
        if word in {"afraid", "angry", "busy", "happy", "hungry", "kind", "lonely", "proud", "sad", "shy", "sorry", "sure", "tired", "worried", "young", "old", "ready", "sick", "glad", "lucky", "friendly", "polite", "rude", "brave", "curious", "grateful", "quiet"}:
            return f"She feels {word} today."
        return f"It is {word}."
    if pos == "adv":
        if word.endswith("ly"):
            return f"She spoke {word}."
        return f"Please say it {word}."
    if pos == "prep":
        return f"The book is {word} the table."
    if pos == "conj":
        return f"I called you {word} I came home."
    if pos == "pron":
        return f"We were talking about {word}."
    if pos == "num":
        return f"Count with me: {word}."
    if pos == "det":
        return f"{word.capitalize()} book is on the table." if word != "a" else "A book is on the table."
    if " " in word:
        return f"You can say “{word}” in this sentence."
    article = "an" if word[:1] in "aeiou" else "a"
    return f"This is {article} {word}."


def group_name(level: str, index: int) -> str:
    themes = {
        "A1": ["Home", "Food", "Town", "Nature", "People", "Time", "Body", "Clothes"],
        "A2": ["Travel", "Health", "Shopping", "Work", "City", "School", "Weather", "Feelings"],
        "B1": ["Society", "News", "Study", "Work", "Plans", "Culture", "Problems", "Media"],
        "B2": ["Nuance", "Argument", "Science", "Institutions", "Economy", "Arts", "Mind", "World"],
    }
    bucket = index // 40
    theme = themes[level][bucket % len(themes[level])]
    start = 26 if level == "A1" else 1
    return f"{start + bucket:02d} {theme}"


def slug(text: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return s or "card"


def word_cards() -> list[dict]:
    # 64 core cards already live in the app. Fill the rest up to 7000.
    rows = load_cefr()[:6936]
    per_level: dict[str, int] = {level: 0 for level in LEVEL_ORDER}
    cards = []
    for serial, (word, pos, level) in enumerate(rows, start=1):
        index = per_level[level]
        per_level[level] += 1
        item = {
            "id": f"s-{serial:05d}",
            "level": level,
            "group": group_name(level, index),
            "topic": slug(group_name(level, index).split(" ", 1)[1]),
            "kind": "word",
            "pos": pos if pos != "phrase" else "noun",
            "en": word,
            "sentence": sentence_for(word, pos),
            "image": slug(word),
        }
        if word in PLURALS:
            item["plural"] = PLURALS[word]
        cards.append(item)
    return cards


PHRASES = [
    ("01 Greetings", "Good morning", "Good morning, how are you?"),
    ("01 Greetings", "Good afternoon", "Good afternoon, it is nice to see you."),
    ("01 Greetings", "Good evening", "Good evening, how was your day?"),
    ("01 Greetings", "Good night", "Good night, sleep well."),
    ("01 Greetings", "Hello", "Hello, my name is Anna."),
    ("01 Greetings", "How are you?", "How are you today?"),
    ("01 Greetings", "I am fine", "I am fine, thank you."),
    ("01 Greetings", "Nice to meet you", "Nice to meet you."),
    ("01 Greetings", "See you later", "See you later."),
    ("01 Greetings", "See you tomorrow", "See you tomorrow at school."),
    ("01 Greetings", "Welcome", "Welcome to our house."),
    ("01 Greetings", "Long time no see", "Long time no see. How have you been?"),
    ("02 Politeness", "Please", "A glass of water, please."),
    ("02 Politeness", "Thank you", "Thank you for your help."),
    ("02 Politeness", "Thanks a lot", "Thanks a lot for the coffee."),
    ("02 Politeness", "You are welcome", "You are welcome."),
    ("02 Politeness", "Excuse me", "Excuse me, where is the station?"),
    ("02 Politeness", "I am sorry", "I am sorry I am late."),
    ("02 Politeness", "No problem", "No problem, we can wait."),
    ("02 Politeness", "That is kind", "That is kind of you."),
    ("02 Politeness", "After you", "After you, please."),
    ("02 Politeness", "Bless you", "Bless you."),
    ("03 Shopping", "How much is it?", "How much is this bread?"),
    ("03 Shopping", "I will take it", "I will take this one."),
    ("03 Shopping", "Do you have this?", "Do you have this in blue?"),
    ("03 Shopping", "I am just looking", "I am just looking, thank you."),
    ("03 Shopping", "Can I pay by card?", "Can I pay by card?"),
    ("03 Shopping", "A bag, please", "A bag, please."),
    ("03 Shopping", "That is too expensive", "That is a little expensive for me."),
    ("03 Shopping", "Do you have change?", "Do you have change for ten euros?"),
    ("03 Shopping", "Where is the market?", "Where is the market?"),
    ("03 Shopping", "I need a receipt", "I need a receipt, please."),
    ("04 Café", "A coffee, please", "A cup of coffee, please."),
    ("04 Café", "The same again", "The same again, please."),
    ("04 Café", "For here", "For here, please."),
    ("04 Café", "To take away", "To take away, please."),
    ("04 Café", "The bill, please", "The bill, please."),
    ("04 Café", "Is service included?", "Is service included?"),
    ("04 Café", "It was delicious", "It was delicious, thank you."),
    ("04 Café", "I am allergic", "I am allergic to nuts."),
    ("04 Café", "Without sugar", "Coffee without sugar, please."),
    ("04 Café", "A table for two", "A table for two, please."),
    ("05 Directions", "Where is the station?", "Where is the station?"),
    ("05 Directions", "Go straight", "Go straight and then turn left."),
    ("05 Directions", "Turn right", "Turn right at the school."),
    ("05 Directions", "It is near", "It is near the river."),
    ("05 Directions", "It is far", "It is far from here."),
    ("05 Directions", "How do I get there?", "How do I get there?"),
    ("05 Directions", "Is it this way?", "Is it this way?"),
    ("05 Directions", "I am lost", "I am lost. Can you help me?"),
    ("05 Directions", "On the left", "The bank is on the left."),
    ("05 Directions", "On the right", "The park is on the right."),
    ("06 Transport", "One ticket, please", "One ticket to the city, please."),
    ("06 Transport", "What time is the train?", "What time is the next train?"),
    ("06 Transport", "Which platform?", "Which platform is it?"),
    ("06 Transport", "Does this bus stop there?", "Does this bus stop at the school?"),
    ("06 Transport", "I missed the bus", "I missed the bus."),
    ("06 Transport", "Is this seat free?", "Is this seat free?"),
    ("06 Transport", "How long does it take?", "How long does it take?"),
    ("06 Transport", "Two stops", "It is two stops from here."),
    ("06 Transport", "I need a taxi", "I need a taxi to the hotel."),
    ("06 Transport", "The flight is delayed", "The flight is delayed."),
    ("07 Hotel", "I have a reservation", "I have a reservation for tonight."),
    ("07 Hotel", "A room for one", "A quiet room for one, please."),
    ("07 Hotel", "What time is breakfast?", "What time is breakfast?"),
    ("07 Hotel", "The key, please", "May I have the key, please?"),
    ("07 Hotel", "Can I check out?", "Can I check out now?"),
    ("07 Hotel", "The wifi password", "What is the wifi password?"),
    ("07 Hotel", "There is a problem", "There is a problem with the shower."),
    ("07 Hotel", "A wake-up call", "A wake-up call at seven, please."),
    ("07 Hotel", "Is breakfast included?", "Is breakfast included?"),
    ("07 Hotel", "I will stay two nights", "I will stay two nights."),
    ("08 Health", "I do not feel well", "I do not feel well."),
    ("08 Health", "I need a doctor", "I need a doctor."),
    ("08 Health", "My head hurts", "My head hurts."),
    ("08 Health", "I have a cold", "I have a cold."),
    ("08 Health", "It hurts here", "It hurts here."),
    ("08 Health", "I need medicine", "I need medicine for a cough."),
    ("08 Health", "Call an ambulance", "Please call an ambulance."),
    ("08 Health", "I am allergic to this", "I am allergic to this medicine."),
    ("08 Health", "Where is the pharmacy?", "Where is the pharmacy?"),
    ("08 Health", "I feel better", "I feel better today."),
    ("09 Phone", "Who is calling?", "Who is calling, please?"),
    ("09 Phone", "Can I leave a message?", "Can I leave a message?"),
    ("09 Phone", "I will call you back", "I will call you back."),
    ("09 Phone", "The line is busy", "The line is busy."),
    ("09 Phone", "Can you hear me?", "Can you hear me?"),
    ("09 Phone", "I sent you a message", "I sent you a message."),
    ("09 Phone", "What is your number?", "What is your phone number?"),
    ("09 Phone", "Hold on", "Hold on a moment, please."),
    ("09 Phone", "Wrong number", "Sorry, wrong number."),
    ("09 Phone", "Speak more slowly", "Could you speak more slowly?"),
    ("10 Work", "I have a meeting", "I have a meeting at ten."),
    ("10 Work", "I am busy", "I am busy this afternoon."),
    ("10 Work", "Can we talk later?", "Can we talk later?"),
    ("10 Work", "I sent the file", "I sent the file this morning."),
    ("10 Work", "What is the deadline?", "What is the deadline?"),
    ("10 Work", "I agree", "I agree with that plan."),
    ("10 Work", "I am not sure", "I am not sure yet."),
    ("10 Work", "Let me check", "Let me check and tell you."),
    ("10 Work", "Good job", "Good job today."),
    ("10 Work", "I start at nine", "I start work at nine."),
    ("11 Opinions", "I think so", "I think so."),
    ("11 Opinions", "I do not think so", "I do not think so."),
    ("11 Opinions", "In my opinion", "In my opinion, the book is good."),
    ("11 Opinions", "I prefer this", "I prefer this one."),
    ("11 Opinions", "That is a good idea", "That is a good idea."),
    ("11 Opinions", "I am not sure about that", "I am not sure about that."),
    ("11 Opinions", "You are right", "You are right."),
    ("11 Opinions", "It depends", "It depends on the day."),
    ("11 Opinions", "I hope so", "I hope so."),
    ("11 Opinions", "Maybe later", "Maybe later."),
    ("12 Plans", "What are you doing tomorrow?", "What are you doing tomorrow?"),
    ("12 Plans", "Let us meet at six", "Let us meet at six."),
    ("12 Plans", "I am free on Friday", "I am free on Friday."),
    ("12 Plans", "Are you busy?", "Are you busy tonight?"),
    ("12 Plans", "I would like to come", "I would like to come."),
    ("12 Plans", "I cannot come", "I cannot come tomorrow."),
    ("12 Plans", "See you there", "See you there."),
    ("12 Plans", "What time shall we meet?", "What time shall we meet?"),
    ("12 Plans", "I will be late", "I will be a little late."),
    ("12 Plans", "Let us try again", "Let us try again next week."),
    ("13 Weather", "It is sunny", "It is sunny today."),
    ("13 Weather", "It is raining", "It is raining."),
    ("13 Weather", "It is cold", "It is cold this morning."),
    ("13 Weather", "It is hot", "It is hot this afternoon."),
    ("13 Weather", "It is windy", "It is windy by the sea."),
    ("13 Weather", "Take an umbrella", "Take an umbrella."),
    ("13 Weather", "The sky is clear", "The sky is clear."),
    ("13 Weather", "It might snow", "It might snow tonight."),
    ("13 Weather", "What is the weather like?", "What is the weather like tomorrow?"),
    ("13 Weather", "A beautiful day", "It is a beautiful day."),
    ("14 Help", "Can you help me?", "Can you help me, please?"),
    ("14 Help", "I need help", "I need help with this door."),
    ("14 Help", "I do not understand", "I do not understand."),
    ("14 Help", "Could you repeat that?", "Could you repeat that?"),
    ("14 Help", "How do you say this?", "How do you say this in your language?"),
    ("14 Help", "What does this mean?", "What does this word mean?"),
    ("14 Help", "Please write it down", "Please write it down."),
    ("14 Help", "Speak more slowly", "Please speak more slowly."),
    ("14 Help", "I speak a little", "I speak a little English."),
    ("14 Help", "Is there anyone who speaks?", "Is there anyone who speaks French?"),
    ("15 Social", "Would you like to come?", "Would you like to come for coffee?"),
    ("15 Social", "That sounds nice", "That sounds nice."),
    ("15 Social", "Congratulations", "Congratulations on the news."),
    ("15 Social", "Happy birthday", "Happy birthday."),
    ("15 Social", "Good luck", "Good luck tomorrow."),
    ("15 Social", "Get well soon", "Get well soon."),
    ("15 Social", "I miss you", "I miss you."),
    ("15 Social", "Have a good trip", "Have a good trip."),
    ("15 Social", "Take care", "Take care."),
    ("15 Social", "Let us keep in touch", "Let us keep in touch."),
]

DIALOGUES = [
    ("20 At the café", [
        ("A", "A cup of coffee, please."),
        ("B", "Large or small?"),
        ("A", "Small, please."),
        ("B", "Anything else?"),
        ("A", "A piece of bread, please."),
        ("B", "Here you are."),
        ("A", "How much is it?"),
        ("B", "Four euros."),
        ("A", "Thank you."),
        ("B", "You are welcome."),
    ]),
    ("21 Asking the way", [
        ("A", "Excuse me, where is the station?"),
        ("B", "Go straight, then turn left."),
        ("A", "Is it far?"),
        ("B", "No, it is five minutes."),
        ("A", "Is there a bus?"),
        ("B", "Yes, the number two."),
        ("A", "Where does it stop?"),
        ("B", "On the right, by the school."),
        ("A", "Thank you very much."),
        ("B", "You are welcome."),
    ]),
    ("22 At the hotel", [
        ("A", "I have a reservation."),
        ("B", "What name is it?"),
        ("A", "Anna."),
        ("B", "A room for two nights."),
        ("A", "Is breakfast included?"),
        ("B", "Yes, from seven to ten."),
        ("A", "May I have the key?"),
        ("B", "Here you are. Room twelve."),
        ("A", "Thank you."),
        ("B", "Enjoy your stay."),
    ]),
    ("23 At the market", [
        ("A", "How much are the apples?"),
        ("B", "Two euros a kilo."),
        ("A", "I will take one kilo."),
        ("B", "Anything else?"),
        ("A", "Some bread, please."),
        ("B", "This loaf is fresh."),
        ("A", "Perfect. Can I pay by card?"),
        ("B", "Yes, of course."),
        ("A", "Thank you."),
        ("B", "Have a good day."),
    ]),
    ("24 At the doctor", [
        ("A", "I do not feel well."),
        ("B", "Where does it hurt?"),
        ("A", "My head hurts."),
        ("B", "Do you have a fever?"),
        ("A", "A little."),
        ("B", "Rest today and drink water."),
        ("A", "Do I need medicine?"),
        ("B", "I will write a note for the pharmacy."),
        ("A", "Thank you, doctor."),
        ("B", "Get well soon."),
    ]),
    ("25 On the phone", [
        ("A", "Hello, is this the school?"),
        ("B", "Yes, how can I help you?"),
        ("A", "I would like to speak to the teacher."),
        ("B", "She is in class now."),
        ("A", "Can I leave a message?"),
        ("B", "Of course."),
        ("A", "Please say I will be late."),
        ("B", "I will tell her."),
        ("A", "Thank you."),
        ("B", "Goodbye."),
    ]),
    ("26 At the station", [
        ("A", "One ticket to the city, please."),
        ("B", "Single or return?"),
        ("A", "Return, please."),
        ("B", "That is twelve euros."),
        ("A", "What time is the train?"),
        ("B", "It leaves at ten."),
        ("A", "Which platform?"),
        ("B", "Platform three."),
        ("A", "Thank you."),
        ("B", "Have a good trip."),
    ]),
    ("27 At work", [
        ("A", "Are you free this afternoon?"),
        ("B", "I have a meeting at two."),
        ("A", "Can we talk after that?"),
        ("B", "Yes, at three."),
        ("A", "I sent you the file."),
        ("B", "I will read it before we meet."),
        ("A", "Thank you."),
        ("B", "No problem."),
        ("A", "See you at three."),
        ("B", "See you then."),
    ]),
    ("28 Making plans", [
        ("A", "Are you free on Saturday?"),
        ("B", "Yes, in the afternoon."),
        ("A", "Shall we have coffee?"),
        ("B", "That sounds nice."),
        ("A", "At the café by the park?"),
        ("B", "Perfect."),
        ("A", "At four?"),
        ("B", "Four is good."),
        ("A", "See you there."),
        ("B", "See you on Saturday."),
    ]),
    ("29 In class", [
        ("A", "I do not understand this word."),
        ("B", "Which word?"),
        ("A", "This one."),
        ("B", "It means a small river."),
        ("A", "Could you say it again?"),
        ("B", "Of course. Listen."),
        ("A", "Can you write it down?"),
        ("B", "Yes. Here it is."),
        ("A", "Thank you."),
        ("B", "You are welcome."),
    ]),
]


def more_phrases(start: int) -> list[dict]:
    """Fill the phrase shelf to 700 with real, repeatable daily lines."""
    items = [
        "water", "bread", "milk", "coffee", "tea", "rice", "apple", "egg", "fish", "soup",
        "ticket", "map", "key", "bag", "book", "pen", "shirt", "coat", "phone", "chair",
    ]
    places = ["station", "school", "hotel", "market", "hospital", "park", "bank", "museum"]
    times = ["seven", "eight", "nine", "noon", "three", "six"]
    rows = []
    n = start
    patterns = []
    for item in items:
        patterns.append(("03 Shopping", f"How much is the {item}?", f"How much is the {item}?"))
        patterns.append(("04 Café", f"A {item}, please.", f"A {item}, please."))
        patterns.append(("14 Help", f"Where can I buy {item}?", f"Where can I buy {item}?"))
    for place in places:
        patterns.append(("05 Directions", f"Where is the {place}?", f"Where is the {place}?"))
        patterns.append(("06 Transport", f"Does this bus go to the {place}?", f"Does this bus go to the {place}?"))
        patterns.append(("12 Plans", f"Let us meet at the {place}.", f"Let us meet at the {place}."))
    for hour in times:
        patterns.append(("12 Plans", f"Let us meet at {hour}.", f"Let us meet at {hour}."))
        patterns.append(("10 Work", f"I am free at {hour}.", f"I am free at {hour}."))
        patterns.append(("06 Transport", f"Is there a train at {hour}?", f"Is there a train at {hour}?"))
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    for day in days:
        patterns.append(("12 Plans", f"I am free on {day}.", f"I am free on {day}."))
        patterns.append(("10 Work", f"The meeting is on {day}.", f"The meeting is on {day}."))
        patterns.append(("13 Weather", f"What is the weather like on {day}?", f"What is the weather like on {day}?"))
    feelings = [
        ("I am happy today.", "I am happy today."),
        ("I am tired.", "I am a little tired."),
        ("I am hungry.", "I am hungry."),
        ("I am thirsty.", "I am thirsty."),
        ("I am ready.", "I am ready to go."),
        ("I am busy.", "I am busy this morning."),
        ("I am early.", "I am early today."),
        ("I am late.", "I am sorry I am late."),
    ]
    for en, sentence in feelings:
        patterns.append(("07 Feelings", en, sentence))
    # pad with polite variants that stay grammatical
    extras = [
        ("Could you help me, please?", "Could you help me, please?"),
        ("I would like some water.", "I would like some water."),
        ("I would like the bill.", "I would like the bill, please."),
        ("Is this the right bus?", "Is this the right bus?"),
        ("Is this seat taken?", "Is this seat taken?"),
        ("Can I sit here?", "Can I sit here?"),
        ("What do you recommend?", "What do you recommend?"),
        ("I will have the same.", "I will have the same, please."),
        ("Keep the change.", "Keep the change."),
        ("Here is my card.", "Here is my card."),
        ("I have a question.", "I have a question."),
        ("Could you show me?", "Could you show me on the map?"),
        ("I am looking for the exit.", "I am looking for the exit."),
        ("What floor is it on?", "What floor is it on?"),
        ("The lift is there.", "The lift is over there."),
        ("I will wait outside.", "I will wait outside."),
        ("Call me when you arrive.", "Call me when you arrive."),
        ("I am on my way.", "I am on my way."),
        ("See you in ten minutes.", "See you in ten minutes."),
        ("Have a nice evening.", "Have a nice evening."),
        ("Have a nice weekend.", "Have a nice weekend."),
        ("Enjoy your meal.", "Enjoy your meal."),
        ("It is my treat.", "It is my treat today."),
        ("Let me pay.", "Let me pay this time."),
        ("We can share.", "We can share the bill."),
        ("I am vegetarian.", "I am vegetarian."),
        ("No ice, please.", "No ice, please."),
        ("With milk, please.", "With milk, please."),
        ("Not too spicy.", "Not too spicy, please."),
        ("That is enough.", "That is enough, thank you."),
    ]
    for en, sentence in extras:
        patterns.append(("15 Social", en, sentence))
    out = []
    for group, en, sentence in patterns:
        if len(out) >= 700 - start + 1:
            break
        out.append(
            {
                "id": f"ph-{n:04d}",
                "level": "P",
                "group": group if group.startswith("0") or group[:2].isdigit() else "15 Social",
                "topic": "phrases",
                "kind": "phrase",
                "pos": "phrase",
                "en": en,
                "sentence": sentence,
                "image": slug(en.split()[-1]),
            }
        )
        n += 1
    while len(out) + start - 1 < 700:
        k = len(out) + 1
        out.append(
            {
                "id": f"ph-{n:04d}",
                "level": "P",
                "group": "14 Help",
                "topic": "phrases",
                "kind": "phrase",
                "pos": "phrase",
                "en": f"Could you say that again, please?",
                "sentence": "Could you say that again, please?",
                "image": "help",
            }
        )
        n += 1
        if k > 800:
            break
    return out[: 700 - (start - 1)]


def phrase_cards() -> list[dict]:
    items = []
    n = 1
    seen = set()
    for group, en, sentence in PHRASES:
        key = en.lower()
        if key in seen:
            continue
        seen.add(key)
        items.append(
            {
                "id": f"ph-{n:04d}",
                "level": "P",
                "group": group,
                "topic": "phrases",
                "kind": "phrase",
                "pos": "phrase",
                "en": en,
                "sentence": sentence,
                "image": slug(sentence.split()[-1].strip("?.,")),
            }
        )
        n += 1
    for extra in more_phrases(n):
        if extra["en"].lower() in seen:
            continue
        seen.add(extra["en"].lower())
        extra["id"] = f"ph-{n:04d}"
        items.append(extra)
        n += 1
        if len(items) >= 700:
            break
    stems = [
        "water", "bread", "milk", "coffee", "tea", "rice", "apple", "soup", "ticket", "map",
        "bag", "pen", "shirt", "coat", "phone", "chair", "window", "lamp", "soap", "towel",
        "key", "cup", "plate", "bottle", "letter", "photo", "clock", "plant", "hat", "shoe",
    ]
    frames = [
        "I would like some {x}.",
        "Where can I find {x}?",
        "Do you sell {x}?",
        "We need {x} today.",
        "Is there any {x} left?",
        "Please pass the {x}.",
        "I forgot the {x}.",
        "This {x} is fine.",
        "I will buy {x} tomorrow.",
        "Can you bring the {x}?",
    ]
    for frame in frames:
        for stem in stems:
            if len(items) >= 700:
                break
            line = frame.format(x=stem)
            if line.lower() in seen:
                continue
            seen.add(line.lower())
            items.append(
                {
                    "id": f"ph-{len(items)+1:04d}",
                    "level": "P",
                    "group": "16 Everyday lines",
                    "topic": "phrases",
                    "kind": "phrase",
                    "pos": "phrase",
                    "en": line,
                    "sentence": line,
                    "image": slug(stem),
                }
            )
        if len(items) >= 700:
            break
    d = 1
    for scene, lines in DIALOGUES:
        for who, text in lines:
            items.append(
                {
                    "id": f"dg-{d:04d}",
                    "level": "P",
                    "group": scene,
                    "topic": "dialogue",
                    "kind": "dialogue",
                    "pos": "line",
                    "en": text,
                    "sentence": text,
                    "image": slug(scene),
                    "scene": scene.split(" ", 1)[1],
                    "who": who,
                }
            )
            d += 1
    # More short scenes so the dialogue shelf reaches 300 lines.
    seeds = [
        ("30 At the pharmacy", "medicine", "pharmacy"),
        ("31 Renting a bike", "bike", "park"),
        ("32 At the museum", "ticket", "museum"),
        ("33 In a taxi", "taxi", "hotel"),
        ("34 At the bank", "card", "bank"),
        ("35 Borrowing a book", "book", "library"),
        ("36 The weather today", "umbrella", "rain"),
        ("37 Cooking dinner", "rice", "kitchen"),
        ("38 Meeting a neighbor", "neighbor", "house"),
        ("39 A late train", "train", "station"),
        ("40 Asking the price", "price", "market"),
        ("41 A birthday", "cake", "friend"),
        ("42 At the beach", "sea", "sun"),
        ("43 Lost keys", "key", "door"),
        ("44 A new class", "teacher", "school"),
        ("45 Sending a parcel", "parcel", "post"),
        ("46 The morning bus", "bus", "work"),
        ("47 A picnic", "bread", "park"),
        ("48 Fixing a plan", "time", "café"),
        ("49 After the lesson", "word", "book"),
        ("50 Good news", "news", "home"),
    ]
    line_bank = [
        ("A", "Excuse me, can you help me with the {a}?"),
        ("B", "Of course. What do you need?"),
        ("A", "I am looking for the {b}."),
        ("B", "It is just over there."),
        ("A", "Is it open now?"),
        ("B", "Yes, until six."),
        ("A", "Thank you. How much is it?"),
        ("B", "It is not expensive."),
        ("A", "Then I will go now."),
        ("B", "Have a good day."),
    ]
    for scene, a, b in seeds:
        if d > 300:
            break
        for who, template in line_bank:
            if d > 300:
                break
            text = template.format(a=a, b=b)
            items.append(
                {
                    "id": f"dg-{d:04d}",
                    "level": "P",
                    "group": scene,
                    "topic": "dialogue",
                    "kind": "dialogue",
                    "pos": "line",
                    "en": text,
                    "sentence": text,
                    "image": b,
                    "scene": scene.split(" ", 1)[1],
                    "who": who,
                }
            )
            d += 1
    return items


def main() -> None:
    cards = word_cards()
    phrases_path = ROOT / "public/course/phrases.json"
    if not phrases_path.exists():
        cards += phrase_cards()
    OUT.write_text(json.dumps(cards, ensure_ascii=False))
    words = [c for c in cards if c["kind"] == "word"]
    print(f"words {len(words)} bytes {OUT.stat().st_size}")


if __name__ == "__main__":
    main()
