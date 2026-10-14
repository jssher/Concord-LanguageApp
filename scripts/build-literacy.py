#!/usr/bin/env python3
"""Build per-language alphabet charts.

Small alphabets stay one file each, so the menu does not wait on Chinese
or Japanese. Mandarin and Cantonese get the 3,500 general-use characters.
Japanese gets kana, then the school kanji, then enough further kanji to
pass 3,500.

  python3 scripts/build-literacy.py
"""

from __future__ import annotations

import csv
import json
import re
import urllib.request
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LETTERS = ROOT / "public" / "letters"
CHARTS = LETTERS / "charts"
CACHE = Path("/tmp/cjk")
SRC = LETTERS / "alphabets.json"

FILES = {
    "gsc_level_1.txt": "https://raw.githubusercontent.com/ben-hua/general_standard_chinese/main/gsc_level_1.txt",
    "gsc_pinyin.csv": "https://raw.githubusercontent.com/ben-hua/general_standard_chinese/main/gsc_pinyin.csv",
    "dictionary.txt": "https://raw.githubusercontent.com/skishore/makemeahanzi/master/dictionary.txt",
    "kanji.json": "https://raw.githubusercontent.com/davidluzgouveia/kanji-data/master/kanji.json",
    "zh_50k.txt": "https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/zh_cn/zh_cn_50k.txt",
    "ja_50k.txt": "https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2016/ja/ja_50k.txt",
    "jyut.tsv": "https://raw.githubusercontent.com/lshk-org/jyutping-table/master/list.tsv",
}

# First dictionary sense is often the classical one. These are the everyday meanings.
GLOSS = {
    "的": "of",
    "了": "completed",
    "是": "to be",
    "不": "not",
    "在": "at",
    "我": "I",
    "你": "you",
    "他": "he",
    "她": "she",
    "它": "it",
    "这": "this",
    "那": "that",
    "有": "to have",
    "个": "measure word",
    "为": "for",
    "以": "with",
    "和": "and",
    "会": "can",
    "就": "then",
    "也": "also",
    "都": "all",
    "而": "and yet",
    "与": "and",
    "或": "or",
    "被": "by",
    "把": "disposal marker",
    "着": "in progress",
    "过": "experienced",
    "吗": "question",
    "呢": "and what about",
    "吧": "suggestion",
    "很": "very",
    "没": "have not",
    "得": "structural particle",
    "地": "adverb particle",
    "之": "of",
    "其": "its",
    "所": "that which",
    "但": "but",
    "却": "however",
    "还": "still",
    "又": "again",
    "才": "only then",
    "只": "only",
    "从": "from",
    "对": "toward",
    "给": "to give",
    "让": "to let",
    "要": "to want",
    "能": "can",
    "可": "may",
    "该": "should",
    "将": "will",
    "已": "already",
    "因": "because",
    "如": "if",
    "等": "and so on",
    "最": "most",
    "更": "even more",
    "太": "too",
    "哪": "which",
    "什么": "what",
}

HAN = re.compile(r"[\u4e00-\u9fff]")


def cache(name: str) -> Path:
    CACHE.mkdir(parents=True, exist_ok=True)
    path = CACHE / name
    if not path.exists() or path.stat().st_size == 0:
        urllib.request.urlretrieve(FILES[name], path)
    return path


def item(glyph, name, sound, word, gloss, reading="", radical="", traditional="", simplified="", note="", section=""):
    row = {"glyph": glyph, "name": name, "sound": sound, "word": word, "gloss": gloss}
    if reading:
        row["reading"] = reading
    if radical:
        row["radical"] = radical
    if traditional and traditional != glyph:
        row["traditional"] = traditional
    if simplified and simplified != glyph:
        row["simplified"] = simplified
    if note:
        row["note"] = note
    if section:
        row["section"] = section
    return row


def clean_gloss(text: str) -> str:
    clauses = [part.strip(" .") for part in re.split(r"[;,]", text or "") if part.strip(" .")]
    good = [part for part in clauses if 2 <= len(part) <= 40 and not part.startswith("(")]
    if not good:
        return "common character"
    if len(good[0]) <= 22:
        return good[0]
    return min(good, key=len)


def counts_from(path: Path) -> Counter:
    counts: Counter = Counter()
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        word, _, num = line.rpartition(" ")
        try:
            n = int(num)
        except ValueError:
            continue
        for char in word:
            if HAN.match(char):
                counts[char] += n
    return counts


def load_level1() -> list[str]:
    chars = []
    for line in cache("gsc_level_1.txt").read_text(encoding="utf-8").splitlines():
        parts = line.split()
        if len(parts) >= 2 and HAN.fullmatch(parts[1]):
            chars.append(parts[1])
    return chars


def load_gsc() -> dict[str, dict]:
    out = {}
    with cache("gsc_pinyin.csv").open(encoding="utf-8") as handle:
        for row in csv.DictReader(handle):
            out[row["word"]] = row
    return out


def load_defs() -> dict[str, str]:
    out = {}
    radicals = {}
    for line in cache("dictionary.txt").read_text(encoding="utf-8").splitlines():
        row = json.loads(line)
        char = row.get("character")
        if not char or len(char) != 1:
            continue
        if row.get("definition"):
            out[char] = row["definition"]
        radical = row.get("radical") or ""
        if radical and HAN.fullmatch(radical):
            radicals[char] = radical
    return out, radicals


def curated(chart: dict) -> dict[str, dict]:
    found = {}
    for group in chart.get("groups", []):
        for row in group["items"]:
            if len(row["glyph"]) == 1:
                found.setdefault(row["glyph"], row)
    return found


def chunk(items: list, plan: list[tuple[int, str]]) -> list[tuple[str, list]]:
    groups = []
    index = 0
    for size, name in plan:
        if index >= len(items):
            break
        groups.append((name, items[index : index + size]))
        index += size
    rest = items[index:]
    part = 1
    while rest:
        groups.append((f"Literacy · More {part}", rest[:300]))
        rest = rest[300:]
        part += 1
    return [(f"{n:02d} {name}", rows) for n, (name, rows) in enumerate(groups, 1)]


def zh_groups(level, gsc, defs, radicals, old, zh_counts):
    ranked = sorted(level, key=lambda char: (0 if zh_counts[char] else 1, -zh_counts[char], int(gsc[char]["stroke_count"]), char))
    shapes = [char for char in ranked[:900] if int(gsc[char]["stroke_count"]) <= 5]
    shapes.sort(key=lambda char: (int(gsc[char]["stroke_count"]), -zh_counts[char], char))
    skip = set(shapes)
    rest = [char for char in ranked if char not in skip]
    plan = [
        (220, "A1 · First words"),
        (260, "A2 · Everyday"),
        (260, "A2 · Building"),
        (280, "B1 · Reading"),
        (280, "B1 · Stories"),
        (280, "B1 · Wider"),
        (300, "B2 · General"),
        (300, "B2 · Broader"),
        (300, "Literacy · Common"),
        (320, "Literacy · Next"),
        (340, "Literacy · Later"),
    ]
    body = chunk(rest, plan)
    groups = [("01 A1 · Shapes", shapes)]
    for name, rows in body:
        number = int(name[:2]) + 1
        groups.append((f"{number:02d} {name[3:]}", rows))

    def row_for(char: str, section: str = "") -> dict:
        meta = gsc[char]
        previous = old.get(char, {})
        pinyin = (meta.get("pinyin") or "").split(",")[0].strip() or previous.get("name") or "·"
        raw = meta.get("traditional") or ""
        parts = [part for part in raw.split("、") if part]
        if parts and all(len(part) == 1 and HAN.fullmatch(part) for part in parts):
            traditional = "、".join(dict.fromkeys(parts))
        else:
            traditional = previous.get("traditional") or ""
        if not traditional:
            traditional = previous.get("traditional") or ""
        if traditional == char:
            traditional = ""
        radical = previous.get("radical") or (meta.get("radical") if HAN.fullmatch(meta.get("radical") or "") else "") or radicals.get(char, "")
        gloss = GLOSS.get(char) or clean_gloss(defs.get(char, ""))
        word = char
        reading = pinyin
        note = ""
        memory = previous.get("word") or ""
        if memory and memory != char:
            word = memory
            gloss = previous.get("gloss") or gloss
            note = GLOSS.get(char) or ""
        elif memory == char:
            gloss = previous.get("gloss") or gloss
            reading = previous.get("reading") or pinyin
            note = previous.get("note") or ""
        return item(
            char,
            previous.get("name") or pinyin,
            previous.get("sound") or pinyin,
            word,
            gloss,
            reading,
            radical,
            traditional if traditional != char else "",
            note=note,
            section=section,
        )

    out = []
    for name, chars in groups:
        rows = []
        for char in chars:
            strokes = int(gsc[char]["stroke_count"])
            section = f"{strokes} stroke" if strokes == 1 else f"{strokes} strokes"
            # Stroke sections only while the group itself is in stroke order.
            use_section = name.endswith("Shapes")
            rows.append(row_for(char, section if use_section else ""))
        out.append({"id": name[:2], "name": name, "items": rows})
    return out


def traditional_forms(meta: dict) -> list[str]:
    raw = meta.get("traditional") or ""
    forms = [part for part in raw.split("、") if len(part) == 1 and HAN.fullmatch(part)]
    if not forms:
        word = meta.get("word") or ""
        return [word] if len(word) == 1 else []
    return forms


def yue_groups(zh_chart, gsc, jyut, old):
    groups = []
    seen = set()
    for group in zh_chart:
        rows = []
        for source in group["items"]:
            simp = source["glyph"]
            forms = traditional_forms(gsc.get(simp, {"word": simp, "traditional": source.get("traditional", simp)}))
            if simp not in forms and len(forms) == 1 and forms[0] == simp:
                forms = [simp]
            for form in forms:
                if form in seen:
                    continue
                seen.add(form)
                previous = old.get(form) or old.get(simp) or {}
                reading = jyut.get(form) or jyut.get(simp) or previous.get("reading") or ""
                note = previous.get("note") or ""
                if form != simp:
                    extra = f"simplified {simp}"
                    note = f"{note}. {extra}".strip(". ") if note else extra
                if previous.get("glyph") == form and previous.get("word"):
                    word = previous["word"]
                    gloss = previous.get("gloss") or source["gloss"]
                elif len(source.get("word") or "") > 1:
                    word = form
                    gloss = source.get("note") or source["gloss"]
                else:
                    word = form
                    gloss = source["gloss"]
                rows.append(
                    item(
                        form,
                        reading or "·",
                        reading,
                        word,
                        gloss,
                        reading,
                        source.get("radical") or previous.get("radical") or "",
                        simplified="" if form == simp else simp,
                        note=note,
                        section=source.get("section") or "",
                    )
                )
        groups.append({"id": group["id"], "name": group["name"], "items": rows})
    return groups


def ja_name(kun: list[str], on: list[str]) -> str:
    for reading in kun:
        if reading and "." not in reading:
            return reading
    if on:
        return on[0]
    if kun:
        return kun[0].replace(".", "")
    return "·"


def ja_reading(kun: list[str], on: list[str]) -> str:
    parts = [reading.replace(".", "・") for reading in kun[:2] if reading]
    parts += [reading for reading in on[:2] if reading and reading not in parts]
    return " · ".join(parts)


def ja_groups(kanji: dict, ja_counts, radicals, old_kanji, kana_groups):
    def sort_school(chars: list[str]) -> list[str]:
        return sorted(chars, key=lambda char: (kanji[char].get("strokes") or 99, -ja_counts[char], char))

    def sort_use(chars: list[str]) -> list[str]:
        return sorted(chars, key=lambda char: (0 if ja_counts[char] else 1, -ja_counts[char], kanji[char].get("strokes") or 99, char))

    by_grade: dict[int, list[str]] = {}
    for char, row in kanji.items():
        if len(char) != 1 or not HAN.fullmatch(char):
            continue
        grade = row.get("grade")
        if grade in (1, 2, 3, 4, 5, 6, 8, 9, 10):
            by_grade.setdefault(grade, []).append(char)

    pairs: list[tuple[str, list[str], str]] = []
    for grade, label in (
        (1, "Grade 1"),
        (2, "Grade 2"),
        (3, "Grade 3"),
        (4, "Grade 4"),
        (5, "Grade 5"),
        (6, "Grade 6"),
    ):
        pairs.append((label, sort_school(by_grade.get(grade, [])), "school"))

    secondary = sort_use(by_grade.get(8, []))
    for index, start in enumerate(range(0, len(secondary), 280), 1):
        pairs.append((f"Secondary · {index}", secondary[start : start + 280], "use"))

    names = sort_use(by_grade.get(9, []) + by_grade.get(10, []))
    for index, start in enumerate(range(0, len(names), 300), 1):
        pairs.append((f"Names · {index}", names[start : start + 300], "use"))

    used = {char for _, chars, _ in pairs for char in chars}
    extra = [
        char
        for char, row in kanji.items()
        if len(char) == 1 and HAN.fullmatch(char) and char not in used and row.get("meanings")
    ]
    extra = sort_use(extra)
    # Official lists first. Then the next characters people actually meet.
    seen_extra = []
    for char in extra:
        if ja_counts[char] or (kanji[char].get("strokes") or 99) <= 16:
            seen_extra.append(char)
        if len(used) + len(seen_extra) >= 3520:
            break
    if len(used) + len(seen_extra) < 3500:
        for char in extra:
            if char not in seen_extra:
                seen_extra.append(char)
            if len(used) + len(seen_extra) >= 3520:
                break
    for index, start in enumerate(range(0, len(seen_extra), 280), 1):
        pairs.append((f"Books · {index}", seen_extra[start : start + 280], "use"))

    squeezed: list[tuple[str, list[str], str]] = []
    for label, chars, kind in pairs:
        if squeezed and len(chars) < 40 and squeezed[-1][0].split(" · ")[0] == label.split(" · ")[0]:
            previous_label, previous_chars, previous_kind = squeezed[-1]
            squeezed[-1] = (previous_label, previous_chars + chars, previous_kind)
            continue
        squeezed.append((label, chars, kind))
    pairs = squeezed

    def row_for(char: str, kind: str) -> dict:
        row = kanji[char]
        previous = old_kanji.get(char, {})
        kun = [reading for reading in row.get("readings_kun") or [] if reading and not reading.startswith("-")]
        on = [reading for reading in row.get("readings_on") or [] if reading]
        meaning = (row.get("meanings") or ["kanji"])[0]
        if meaning:
            meaning = meaning[0].lower() + meaning[1:]
        strokes = row.get("strokes") or 0
        section = f"{strokes} stroke" if strokes == 1 else f"{strokes} strokes"
        name = ja_name(kun, on)
        reading = ja_reading(kun, on)
        word = char
        gloss = meaning or "kanji"
        note = ""
        memory = previous.get("word") or ""
        if memory and memory != char:
            word = memory
            gloss = previous.get("gloss") or gloss
        elif memory == char:
            gloss = previous.get("gloss") or gloss
            name = previous.get("name") or name
            reading = previous.get("reading") or reading
            note = previous.get("note") or ""
        if not note and kind != "school":
            note = section
        return item(
            char,
            name,
            previous.get("sound") or name,
            word,
            gloss,
            reading,
            previous.get("radical") or radicals.get(char, ""),
            note=note,
            section=section if kind == "school" else "",
        )

    groups = []
    for group in kana_groups:
        groups.append({"id": group["id"], "name": group["name"], "items": group["items"]})
    start = len(groups)
    for offset, (label, chars, kind) in enumerate(pairs, start + 1):
        groups.append(
            {
                "id": f"{offset:02d}",
                "name": f"{offset:02d} {label}",
                "items": [row_for(char, kind) for char in chars],
            }
        )
    # Number kana in the same run of names so the menu reads in order.
    numbered = []
    for index, group in enumerate(groups, 1):
        label = group["name"]
        if index <= start:
            label = f"{index:02d} {label}"
        numbered.append({**group, "id": f"{index:02d}", "name": label})
    return numbered


def main() -> None:
    alphabets = json.loads(SRC.read_text(encoding="utf-8"))
    gsc = load_gsc()
    level = [char for char in load_level1() if char in gsc]
    defs, radicals = load_defs()
    zh_counts = counts_from(cache("zh_50k.txt"))
    ja_counts = counts_from(cache("ja_50k.txt"))
    kanji = json.loads(cache("kanji.json").read_text(encoding="utf-8"))
    jyut = {}
    for line in cache("jyut.tsv").read_text(encoding="utf-8").splitlines()[1:]:
        parts = line.split("\t")
        if len(parts) >= 3 and parts[0] and parts[0] not in jyut and parts[2]:
            jyut[parts[0]] = parts[2]

    zh = zh_groups(level, gsc, defs, radicals, curated(alphabets["zh"]), zh_counts)
    yue = yue_groups(zh, gsc, jyut, curated(alphabets["yue"]))
    ja = ja_groups(kanji, ja_counts, radicals, curated(alphabets["ja"]), alphabets["ja"]["groups"][:2])

    charts = {
        "zh": {
            "note": "The 3,500 characters used for everyday literacy, in the order to learn them. Simple shapes come first, then the words you meet most. Finish a group before the next.",
            "groups": zh,
        },
        "yue": {
            "note": "The same literacy list in traditional characters, with Jyutping. The groups follow the Mandarin steps, so the two stay side by side.",
            "groups": yue,
        },
        "ja": {
            "note": "Hiragana, then katakana, then the kanji of each school year. After the school list come names and the further characters you meet in books. Finish a group before the next.",
            "groups": ja,
        },
    }

    CHARTS.mkdir(parents=True, exist_ok=True)
    for lang, chart in alphabets.items():
        if lang not in charts:
            charts[lang] = chart
    for lang, chart in charts.items():
        path = CHARTS / f"{lang}.json"
        path.write_text(json.dumps(chart, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")

    def total(chart):
        return sum(len(group["items"]) for group in chart["groups"])

    print("zh", total(charts["zh"]), [(group["name"], len(group["items"])) for group in charts["zh"]["groups"]])
    print("yue", total(charts["yue"]), "jyut", sum(1 for g in charts["yue"]["groups"] for row in g["items"] if row.get("reading")))
    print("ja", total(charts["ja"]), [(group["name"], len(group["items"])) for group in charts["ja"]["groups"]])
    kanji_n = total(charts["ja"]) - sum(len(group["items"]) for group in charts["ja"]["groups"][:2])
    print("ja kanji", kanji_n)
    print("files", len(list(CHARTS.glob('*.json'))))
    # A peek at the first words, so a bad gloss is obvious.
    peek = charts["zh"]["groups"][1]["items"][:12]
    print("peek", [(row["glyph"], row["gloss"], row["name"]) for row in peek])


if __name__ == "__main__":
    main()
