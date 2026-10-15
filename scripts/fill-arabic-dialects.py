#!/usr/bin/env python3
"""Fill empty Egyptian, Hijazi, and Maghrebi lines from the Arabic sentence.

The Arabic line already matches the English card. A short closed-class map
turns it toward the dialect, and the dialect headword replaces the Arabic
headword when that word is actually in the line. Hand-written dialect lines
stay. Nothing is invented when the Arabic card has no sentence.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path("/workspace/public/course/i18n")
LEVELS = ["a1", "a2", "b1", "b2", "p"]
MARKS = re.compile(r"[\u064B-\u0652\u0670]")

# Longest first. Only function words and a few everyday nouns that the
# dialect cards already teach with these forms.
MAPS = {
    "ar-eg": [
        ("الماء", "المية"),
        ("ماء", "مية"),
        ("الخبز", "العيش"),
        ("خبز", "عيش"),
        ("لماذا", "ليه"),
        ("ماذا", "إيه"),
        ("الآن", "دلوقتي"),
        ("اليوم", "النهارده"),
        ("غدا", "بكرة"),
        ("أيضا", "كمان"),
        ("كثيرا", "كتير"),
        ("كثير", "كتير"),
        ("جدا", "أوي"),
        ("ليس", "مش"),
        ("ليست", "مش"),
        ("نحن", "إحنا"),
        ("هذا", "ده"),
        ("هذه", "دي"),
        ("ذلك", "كده"),
        ("الذي", "اللي"),
        ("التي", "اللي"),
        ("أين", "فين"),
        ("فقط", "بس"),
        ("لكن", "بس"),
        ("أريد", "عايز"),
        ("نريد", "عايزين"),
        ("جيد", "كويس"),
        ("جيدة", "كويسة"),
    ],
    "ar-sa": [
        ("الماء", "الموية"),
        ("ماء", "موية"),
        ("لماذا", "ليش"),
        ("ماذا", "إيش"),
        ("الآن", "الحين"),
        ("غدا", "بكرة"),
        ("أيضا", "كمان"),
        ("جدا", "مرة"),
        ("ليس", "مو"),
        ("ليست", "مو"),
        ("نحن", "حنا"),
        ("هذه", "هذي"),
        ("أين", "وين"),
        ("فقط", "بس"),
        ("أريد", "أبغى"),
        ("نريد", "نبغى"),
        ("تريد", "تبغى"),
        ("جيد", "كويس"),
        ("جيدة", "كويسة"),
    ],
    "ar-ma": [
        ("الماء", "الما"),
        ("لماذا", "علاش"),
        ("ماذا", "آش"),
        ("الآن", "دابا"),
        ("كثيرا", "بزاف"),
        ("كثير", "بزاف"),
        ("جدا", "بزاف"),
        ("ليس", "ماشي"),
        ("ليست", "ماشيا"),
        ("نحن", "حنا"),
        ("هذا", "هاد"),
        ("هذه", "هادي"),
        ("أين", "فين"),
        ("فقط", "غير"),
        ("أيضا", "حتى"),
        ("أريد", "بغيت"),
        ("نريد", "بغينا"),
        ("البيت", "الدار"),
        ("بيت", "دار"),
        ("جيد", "مزيان"),
        ("جيدة", "مزيانة"),
    ],
}


def bare(text: str) -> str:
    text = MARKS.sub("", text or "")
    text = text.replace("أ", "ا").replace("إ", "ا").replace("آ", "ا")
    text = text.replace("ى", "ي").replace("ة", "ه")
    return re.sub(r"\s+", " ", text).strip()


def strip_marks(text: str) -> str:
    text = MARKS.sub("", text or "")
    return re.sub(r"\s+", " ", text).strip()


def load(lang: str) -> dict[str, dict]:
    found = {}
    for level in LEVELS:
        path = ROOT / lang / f"{level}.json"
        if path.exists():
            found[level] = json.loads(path.read_text())
    return found


def arabic_index(packs: dict[str, dict]) -> dict[str, dict]:
    index = {}
    for raw in packs.values():
        index.update(raw.get("items", {}))
    return index


def apply_map(text: str, pairs: list[tuple[str, str]]) -> str:
    for src, dst in pairs:
        text = text.replace(src, dst)
    return text


def swap_head(text: str, msa_word: str, dialect_word: str) -> str:
    msa = strip_marks(msa_word).strip()
    dialect = strip_marks(dialect_word).strip()
    if not msa or not dialect or bare(msa) == bare(dialect):
        return text
    # Replace the Arabic headword, with or without the article.
    for form in (f"ال{msa}", msa):
        if form and form in text:
            repl = f"ال{dialect}" if form.startswith("ال") and not dialect.startswith("ال") else dialect
            return text.replace(form, repl, 1)
    return text


def convert(lang: str, msa_sentence: str, msa_word: str, dialect_word: str) -> str:
    text = strip_marks(msa_sentence)
    text = swap_head(text, msa_word, dialect_word)
    text = apply_map(text, MAPS[lang])
    text = re.sub(r"\s+", " ", text).strip()
    if text and text[-1] not in ".!?؟":
        text += "."
    return text


def main() -> None:
    dry = "--dry" in sys.argv
    ar = arabic_index(load("ar"))
    shown = {lang: 0 for lang in MAPS}
    for lang in MAPS:
        written = 0
        for level, raw in load(lang).items():
            items = raw.get("items", {})
            changed = False
            for key, row in items.items():
                if not str(row.get("word") or "").strip():
                    continue
                if str(row.get("sentence") or "").strip():
                    continue
                source = ar.get(key) or {}
                msa_sentence = str(source.get("sentence") or "").strip()
                if not msa_sentence:
                    continue
                sentence = convert(lang, msa_sentence, str(source.get("word") or ""), str(row.get("word") or ""))
                if not sentence or bare(sentence) == bare(msa_sentence) and bare(row["word"]) == bare(source.get("word") or ""):
                    # Still store a dialect line when only the headword changed,
                    # and also when the map fired. Skip only a total no-op copy
                    # of a missing conversion.
                    pass
                if shown[lang] < 6:
                    print(f"{lang} {key}\n  AR {strip_marks(msa_sentence)}\n  → {sentence}")
                    shown[lang] += 1
                row["sentence"] = sentence
                changed = True
                written += 1
            if changed and not dry:
                path = ROOT / lang / f"{level}.json"
                tmp = path.with_suffix(".json.tmp")
                tmp.write_text(json.dumps(raw, ensure_ascii=False, separators=(",", ":")))
                tmp.replace(path)
        print(f"{lang} {'would write' if dry else 'wrote'} {written}")


if __name__ == "__main__":
    main()
