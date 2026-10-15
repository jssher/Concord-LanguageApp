#!/usr/bin/env python3
"""Write public/course/coverage.json from the course, the packs, and the hand lexicons."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path("/workspace")
COURSE = ROOT / "public" / "course"
LEVELS = ["a1", "a2", "b1", "b2", "p"]
LEVEL_NAME = {"a1": "A1", "a2": "A2", "b1": "B1", "b2": "B2", "p": "P"}


def lemma(text: str) -> str:
    return re.sub(r"\s+", " ", text.strip().lower())


def languages() -> list[dict]:
    rows = []
    for line in (ROOT / "src/data/languages.ts").read_text().splitlines():
        match = re.search(
            r'id: "([^"]+)", name: "([^"]+)", native: "([^"]+)".*?family: "([^"]+)"',
            line,
        )
        if match:
            rows.append(
                {"id": match.group(1), "name": match.group(2), "native": match.group(3), "family": match.group(4)}
            )
    return rows


def load_course() -> list[dict]:
    rows = []
    for level in LEVELS:
        rows.extend(json.loads((COURSE / "ready" / f"{level}.json").read_text()))
    return rows


def load_pack(lang: str) -> dict[str, dict]:
    found: dict[str, dict] = {}
    folder = COURSE / "i18n" / lang
    if not folder.is_dir():
        return found
    for level in LEVELS:
        path = folder / f"{level}.json"
        if not path.exists():
            continue
        raw = json.loads(path.read_text())
        items = raw.get("items", {}) if isinstance(raw, dict) else {}
        if isinstance(items, dict):
            found.update(items)
    return found


def load_lex(lang: str) -> dict:
    path = ROOT / "src/data/lexicon" / f"{lang}.json"
    if not path.exists():
        return {}
    raw = json.loads(path.read_text())
    entries = raw.get("entries", {})
    return entries if isinstance(entries, dict) else {}


def seen(row: dict | None, en: str) -> tuple[bool, bool, bool]:
    if not isinstance(row, dict):
        return False, False, False
    word = str(row.get("word") or "").strip()
    sentence = str(row.get("sentence") or "").strip()
    if not word:
        return False, False, False
    same = lemma(word) == lemma(en)
    return True, bool(sentence), same


def resolve(pack: dict | None, lex: dict | None, en: str) -> tuple[bool, bool, bool]:
    lex_ok = isinstance(lex, dict) and str(lex.get("word") or "").strip() and str(lex.get("sentence") or "").strip()
    if lex_ok:
        return seen(lex, en)
    pack_word, pack_sent, pack_same = seen(pack, en)
    if pack_word:
        return pack_word, pack_sent, pack_same
    return seen(lex, en)


def measure(lang: dict, course: list[dict], totals: dict[str, int]) -> dict:
    code = lang["id"]
    if code == "en":
        levels = {level: {"words": totals[level], "sentences": totals[level]} for level in LEVELS}
        return {**lang, "words": sum(totals.values()), "sentences": sum(totals.values()), "same": 0, "levels": levels, "note": lang.get("note") or "The source line."}
    pack = {} if code == "sig" else load_pack(code)
    lex = {} if code == "sig" else load_lex(code)
    levels = {level: {"words": 0, "sentences": 0} for level in LEVELS}
    same = 0
    for row in course:
        level = str(row["level"]).lower()
        en = str(row.get("en") or "")
        if code == "sig":
            word, sentence, unchanged = True, True, False
        else:
            word, sentence, unchanged = resolve(pack.get(row["id"]), lex.get(row["id"]), en)
        if not word:
            continue
        levels[level]["words"] += 1
        if sentence:
            levels[level]["sentences"] += 1
        if unchanged:
            same += 1
    note = lang.get("note") or ("Each sign is made from the English line." if code == "sig" else "")
    return {
        **lang,
        "words": sum(levels[level]["words"] for level in LEVELS),
        "sentences": sum(levels[level]["sentences"] for level in LEVELS),
        "same": same,
        "levels": levels,
        "note": note,
    }


def main() -> None:
    course = load_course()
    totals = {level: 0 for level in LEVELS}
    for row in course:
        totals[str(row["level"]).lower()] += 1
    out_rows = []
    for lang in languages():
        out_rows.append(measure(lang, course, totals))
    arabic = next(i for i, row in enumerate(out_rows) if row["id"] == "ar")
    for extra in (
        {"id": "ar-eg", "name": "Egyptian Arabic", "native": "مصري", "family": "Semitic", "note": "Shown on the Arabic card."},
        {"id": "ar-sa", "name": "Saudi Arabic", "native": "حجازي", "family": "Semitic", "note": "Shown on the Arabic card."},
        {"id": "ar-ma", "name": "Maghrebi Arabic", "native": "دارجة", "family": "Semitic", "note": "Shown on the Arabic card."},
    ):
        out_rows.insert(arabic + 1, measure(extra, course, totals))
        arabic += 1
    payload = {"course": {LEVEL_NAME[level]: totals[level] for level in LEVELS}, "languages": out_rows}
    dest = COURSE / "coverage.json"
    dest.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")))
    thin = [row["id"] for row in out_rows if row["id"] != "en" and row["sentences"] < row["words"]]
    print(f"wrote {dest} languages {len(out_rows)} still short {len(thin)}")


if __name__ == "__main__":
    main()
