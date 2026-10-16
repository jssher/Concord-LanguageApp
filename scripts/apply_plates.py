#!/usr/bin/env python3
"""Append themed plates and English course rows for words that were not in the course."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path("/workspace")
SETS = ROOT / "src/data/picture-sets.ts"
READY = ROOT / "public/course/ready/b2.json"
PLATES = json.loads(Path("/tmp/final_plates.json").read_text())


def slug(text: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return s or "plate"


def article(word: str) -> str:
    return "an" if word[:1].lower() in "aeiou" else "a"


def main() -> None:
    text = SETS.read_text()
    current = json.loads(text.split("=", 1)[1].rsplit(";", 1)[0])
    seen = {plate["id"] for plate in current}
    extra = []
    for plate in PLATES:
        ident = "ext-" + slug(f"{plate['section']}-{plate['title']}")
        n = 2
        base = ident
        while ident in seen:
            ident = f"{base}-{n}"
            n += 1
        seen.add(ident)
        extra.append({
            "id": ident,
            "title": plate["title"],
            "section": plate["section"],
            "blurb": "Twenty-five things. Tap one.",
            "words": plate["words"],
        })
    SETS.write_text(
        "/** Themed plates. Words already in the course are linked; new words were added to the course. */\n"
        "export const PICTURE_SETS: { id: string; title: string; section: string; blurb: string; words: string[] }[] = \n"
        + json.dumps(current + extra, ensure_ascii=False, indent=2)
        + ";\n"
    )
    course = {}
    for level in ("a1", "a2", "b1", "b2"):
        for row in json.loads((ROOT / "public/course/ready" / f"{level}.json").read_text()):
            en = str(row.get("en", "")).strip().lower()
            if en:
                course[en] = row.get("id")
    new_rows = []
    n = 10001
    for plate in extra:
        for word in plate["words"]:
            key = word.lower()
            if key in course:
                continue
            ident = f"pic-{n}"
            n += 1
            sentence = f"This is {article(word)} {word}."
            row = {
                "id": ident,
                "level": "B2",
                "group": "90 Picture dictionary",
                "topic": "pictures",
                "kind": "word",
                "pos": "noun",
                "en": word,
                "sentence": sentence,
                "image": slug(word),
            }
            new_rows.append(row)
            course[key] = ident
    raw = json.loads(READY.read_text())
    raw.extend(new_rows)
    READY.write_text(json.dumps(raw, ensure_ascii=False, separators=(",", ":")) + "\n")
    Path("/tmp/pic_new_rows.json").write_text(json.dumps(new_rows, ensure_ascii=False))
    print("plates", len(current), "+", len(extra), "new course rows", len(new_rows))


if __name__ == "__main__":
    main()
