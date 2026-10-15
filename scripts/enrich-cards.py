#!/usr/bin/env python3
"""Copy hand-written grammar notes onto course cards, and read an article
off the sentence when it stands directly in front of the dictionary word.
"""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path("/workspace/public/course/i18n")
LEX = Path("/workspace/src/data/lexicon")
LEVELS = ["a1", "a2", "b1", "b2", "p"]
EXTRA = ("article", "gender", "plural", "feminine", "masculine", "neuter", "reading", "sentenceReading", "note")

# article immediately before the lemma -> (article shown, gender)
ARTICLES = {
    "de": {"der": ("der", "m"), "die": ("die", "f"), "das": ("das", "n")},
    "nl": {"de": ("de", "c"), "het": ("het", "n")},
    "da": {"en": ("en", "c"), "et": ("et", "n")},
    "fr": {"le": ("le", "m"), "la": ("la", "f")},
    "es": {"el": ("el", "m"), "la": ("la", "f")},
    "it": {"il": ("il", "m"), "lo": ("lo", "m"), "la": ("la", "f")},
    "pt": {"o": ("o", "m"), "a": ("a", "f")},
    "el": {"ο": ("ο", "m"), "η": ("η", "f"), "το": ("το", "n")},
}


def lemma(text: str) -> str:
    return re.sub(r"\s+", " ", text.strip().lower())


def token(text: str) -> str:
    return text.strip(".,;:!?¿¡\"“”'«»()[]").lower()


def from_sentence(lang: str, word: str, sentence: str) -> tuple[str, str] | None:
    table = ARTICLES.get(lang)
    if not table or " " in word.strip():
        return None
    parts = [token(p) for p in sentence.split()]
    parts = [p for p in parts if p]
    want = token(word)
    for i, part in enumerate(parts[:-1]):
        if part in table and parts[i + 1] == want:
            return table[part]
    return None


def load_lex(lang: str) -> dict:
    path = LEX / f"{lang}.json"
    if not path.exists():
        return {}
    data = json.loads(path.read_text())
    return data.get("entries", {})


def main() -> None:
    english = load_lex("en")
    changed = 0
    for lang_dir in sorted(p for p in ROOT.iterdir() if p.is_dir()):
        lang = lang_dir.name
        lex = load_lex(lang)
        for level in LEVELS:
            path = lang_dir / f"{level}.json"
            if not path.exists():
                continue
            data = json.loads(path.read_text())
            items = data.get("items", data)
            if not isinstance(items, dict):
                continue
            dirty = False
            for iid, row in items.items():
                if not isinstance(row, dict):
                    continue
                en = str(row.get("en") or "")
                hand = lex.get(iid)
                en_hand = english.get(iid, {})
                if hand and lemma(en) == lemma(str(en_hand.get("word") or "")):
                    for key in EXTRA:
                        value = hand.get(key)
                        if value and row.get(key) != value:
                            row[key] = value
                            dirty = True
                    if hand.get("word") and row.get("word") != hand["word"]:
                        row["word"] = hand["word"]
                        dirty = True
                    if hand.get("sentence") and row.get("sentence") != hand["sentence"]:
                        row["sentence"] = hand["sentence"]
                        dirty = True
                if row.get("article"):
                    continue
                found = from_sentence(lang, str(row.get("word") or ""), str(row.get("sentence") or ""))
                if not found:
                    continue
                article, gender = found
                row["article"] = article
                row["gender"] = gender
                dirty = True
            if dirty:
                data["items"] = items
                path.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")))
                changed += 1
                print("updated", lang, level, flush=True)
    print("files", changed, flush=True)


if __name__ == "__main__":
    main()
