"""Rebuild public/course/ready and public/course/stats.json.

Edit the curated files or shelf.json, then run: python3 scripts/build-course.py
The app loads only the ready files.
"""
import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COURSE = ROOT / "public" / "course"
TOPICS = {
    "people": "01 People",
    "home": "02 Home",
    "food": "03 Food",
    "actions": "04 Actions",
    "nature": "05 Nature",
    "animals": "06 Animals",
    "body": "07 Body",
    "places": "08 Places",
    "describing": "09 Describing",
}
FILES = {
    "A1": ["a1.json"],
    "A2": ["a2a.json", "a2b.json"],
    "B1": ["b1a.json", "b1b.json"],
    "B2": ["b2a.json", "b2b.json"],
    "P": ["phrases.json"],
}
ORDER = ["A1", "A2", "B1", "B2", "P"]
EXTRA_FROM = {"A1": 26, "A2": 17, "B1": 17, "B2": 17}


def lemma(text: str) -> str:
    return " ".join(text.strip().lower().split())


def core_items():
    en = json.loads((ROOT / "src/data/lexicon/en.json").read_text())
    text = (ROOT / "src/data/concepts.ts").read_text()
    found = []
    for block in re.findall(r"\{[^{}]+\}", text):
        fields = dict(re.findall(r'(id|topic|pos|image|gloss):\s*"([^"]+)"', block))
        if set(fields) >= {"id", "topic", "pos", "image", "gloss"}:
            found.append(fields)
    items = []
    for fields in found:
        cid, topic, pos, image, gloss = fields["id"], fields["topic"], fields["pos"], fields["image"], fields["gloss"]
        entry = en["entries"].get(cid, {})
        word = (entry.get("word") or gloss).strip()
        sentence = (entry.get("sentence") or "").strip()
        item = {
            "id": cid,
            "level": "A1",
            "group": TOPICS.get(topic, "01 People"),
            "topic": topic,
            "kind": "word",
            "pos": pos,
            "en": word,
            "sentence": sentence,
            "image": image,
        }
        if entry.get("plural"):
            item["plural"] = entry["plural"]
        items.append(item)
    return items


def keep(row):
    en = str(row.get("en") or "").strip()
    sentence = str(row.get("sentence") or "").strip()
    level = row.get("level")
    if en and sentence and level in ORDER:
        row = dict(row)
        row["en"] = en
        row["sentence"] = sentence
        return row
    return None


def extra_groups(level, rows):
    buckets = defaultdict(list)
    for row in sorted(rows, key=lambda item: lemma(item["en"])):
        ch = row["en"][:1].upper()
        buckets[ch if ch.isalpha() else "#"].append(row)
    number = EXTRA_FROM[level]
    out = []
    for ch in sorted(buckets):
        chunk = buckets[ch]
        parts = range(0, len(chunk), 40)
        for index, start in enumerate(parts):
            part = chunk[start : start + 40]
            suffix = f" {index + 1}" if len(chunk) > 40 else ""
            name = f"{number:02d} Extra {ch}{suffix}"
            number += 1
            for row in part:
                row["group"] = name
                row["topic"] = "extra"
                out.append(row)
    return out


def main():
    seen = set()
    seen_id = set()
    by_level = {level: [] for level in ORDER}
    for item in core_items():
        by_level["A1"].append(item)
        seen.add(lemma(item["en"]))
        seen_id.add(item["id"])

    def add(row):
        if row.get("kind", "word") == "word" and lemma(row["en"]) in seen:
            return
        if row.get("kind", "word") == "word":
            seen.add(lemma(row["en"]))
        cid = str(row.get("id") or lemma(row["en"]))
        while cid in seen_id:
            cid = f"{cid}-2"
        seen_id.add(cid)
        row["id"] = cid
        by_level[row["level"]].append(row)

    for level, names in FILES.items():
        for name in names:
            for raw in json.loads((COURSE / name).read_text()):
                row = keep(raw)
                if row and row["level"] == level:
                    add(row)
    for name in ["expansion.json", "dialogues.json"]:
        path = COURSE / name
        if not path.exists():
            continue
        for raw in json.loads(path.read_text()):
            row = keep(raw)
            if not row:
                continue
            if name == "dialogues.json":
                row["level"] = "P"
                row["kind"] = row.get("kind") or "phrase"
            if row["level"] in by_level:
                add(row)
    shelf_extra = {level: [] for level in ORDER if level != "P"}
    for raw in json.loads((COURSE / "shelf.json").read_text()):
        row = keep(raw)
        if not row or row.get("kind", "word") != "word":
            continue
        if lemma(row["en"]) in seen:
            continue
        seen.add(lemma(row["en"]))
        cid = str(row.get("id") or f"x-{lemma(row['en'])}")
        while cid in seen_id:
            cid = f"{cid}-2"
        seen_id.add(cid)
        row["id"] = cid
        row["kind"] = "word"
        shelf_extra[row["level"]].append(row)
    for level, rows in shelf_extra.items():
        by_level[level].extend(extra_groups(level, rows))

    ready = COURSE / "ready"
    ready.mkdir(exist_ok=True)
    src = COURSE / "src"
    src.mkdir(exist_ok=True)
    levels = []
    words = phrases = 0
    for level in ORDER:
        items = by_level[level]
        (ready / f"{level.lower()}.json").write_text(json.dumps(items, ensure_ascii=False, separators=(",", ":")))
        slim = []
        for row in items:
            out = {"id": row["id"], "en": row["en"], "pos": row.get("pos", ""), "sentence": row["sentence"]}
            if row.get("plural"):
                out["plural"] = row["plural"]
            slim.append(out)
        (src / f"{level.lower()}.json").write_text(json.dumps(slim, ensure_ascii=False, indent=2))
        groups = []
        for row in items:
            if row.get("kind", "word") == "word" and level != "P":
                words += 1
            else:
                phrases += 1
            if not groups or groups[-1]["name"] != row["group"]:
                groups.append({"name": row["group"], "count": 0, "sample": []})
            groups[-1]["count"] += 1
            if len(groups[-1]["sample"]) < 6:
                groups[-1]["sample"].append(row["en"])
        levels.append({
            "id": level,
            "count": len(items),
            "groups": [{"name": g["name"], "count": g["count"], "sample": " · ".join(g["sample"])} for g in groups],
        })
        print(level, len(items), "groups", len(groups))
    stats = {"words": words, "phrases": phrases, "levels": levels}
    (COURSE / "stats.json").write_text(json.dumps(stats, ensure_ascii=False, separators=(",", ":")))
    print("words", words, "phrases", phrases)


if __name__ == "__main__":
    main()
