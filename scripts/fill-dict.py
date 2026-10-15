#!/usr/bin/env python3
"""Fill missing cards from open dictionaries and Tatoeba.

Wiktionary (CC BY-SA 4.0) via Kaikki, plus WikDict for Latin and Malagasy.
Only the dictionary's main sense is used. Poetic, archaic, and vulgar senses
are skipped. A frequency list breaks ties. Tatoeba (CC BY 2.0 FR) supplies a
sentence only when the English course sentence is already in the collection.
Hand-written lexicon lines win. Plurals are not guessed.

Romansh is the exception. Every sense is indexed, and only Rumantsch Grischun
is kept when the entry names an idiom. A form that belongs only to Sursilvan,
Sutsilvan, Surmiran, Puter, or Vallader is not taught as the written standard.
"""

from __future__ import annotations

import json
import re
import sqlite3
import subprocess
import sys
import unicodedata
from collections import defaultdict
from pathlib import Path
from urllib.parse import quote, urljoin

ROOT = Path("/workspace/public/course")
LEX = Path("/workspace/src/data/lexicon")
CACHE = Path("/tmp/open-dict")
READY = ["a1", "a2", "b1", "b2", "p"]
LEVEL_NAME = {"a1": "A1", "a2": "A2", "b1": "B1", "b2": "B2", "p": "P"}
EXTRA = ("article", "gender", "plural", "feminine", "masculine", "neuter", "reading", "sentenceReading", "note")
UA = "concord-dict/1.0"
SKIP_POS = {"character", "letter", "symbol", "punct", "prefix", "suffix", "interfix", "infix", "romanization", "name", "prop"}
BAD_TAGS = {
    "poetic", "literary", "uncommon", "vulgar", "derogatory", "slang", "offensive",
    "rare", "dated", "archaic", "obsolete", "nonstandard", "misspelling", "humorous",
    "informal", "childish", "eye-dialect",
}
POS_OK = {
    "noun": {"noun", "name", "prop", "num"},
    "verb": {"verb"},
    "adj": {"adj", "adv"},
    "adjective": {"adj", "adv"},
    "adv": {"adv", "adj"},
    "pron": {"pron", "noun"},
    "det": {"det", "adj", "pron"},
    "num": {"num", "noun", "adj"},
    "prep": {"prep", "adv"},
    "conj": {"conj"},
    "phrase": {"phrase", "noun", "verb", "intj", "adv", "name"},
    "line": {"phrase", "noun", "verb", "intj"},
}
# code, Kaikki language name or "", WikDict code or "", Tatoeba code, script
TARGETS = [
    ("is", "Icelandic", "", "isl", "latn"),
    ("rm", "Romansh", "", "roh", "latn"),
    ("cy", "Welsh", "", "cym", "latn"),
    ("hr", "Serbo-Croatian", "", "hrv", "latn"),
    ("sr", "Serbo-Croatian", "", "srp", "cyrl"),
    ("mk", "Macedonian", "", "mkd", "cyrl"),
    ("la", "", "la", "lat", "latn"),
    ("grc", "Ancient Greek", "", "grc", "grek"),
    ("egy", "Egyptian", "", "egy", "egyp"),
    ("yue", "Cantonese", "", "yue", "hant"),
    ("mr", "Marathi", "", "mar", "deva"),
    ("gu", "Gujarati", "", "guj", "gujr"),
    ("te", "Telugu", "", "tel", "telu"),
    ("ta", "Tamil", "", "tam", "taml"),
    ("ml", "Malayalam", "", "mal", "mlym"),
    ("am", "Amharic", "", "amh", "ethi"),
    ("hy", "Armenian", "", "hye", "armn"),
    ("ka", "Georgian", "", "kat", "geor"),
    ("ln", "Lingala", "", "lin", "latn"),
    ("yo", "Yoruba", "", "yor", "latn"),
    ("ha", "Hausa", "", "hau", "latn"),
    ("ff", "Fula", "", "ful", "latn"),
    ("so", "Somali", "", "som", "latn"),
    ("mg", "Malagasy", "mg", "mlg", "latn"),
    ("haw", "Hawaiian", "", "haw", "latn"),
    ("qu", "Quechua", "", "que", "latn"),
    ("gn", "Paraguayan Guarani", "", "grn", "latn"),
    ("arc", "Classical Syriac", "", "syc", "syrc"),
    ("ber", "Central Atlas Tamazight", "", "tzm", "tfng"),
    ("ig", "Igbo", "", "ibo", "latn"),
    ("ar-eg", "Egyptian Arabic", "", "arz", "arab"),
    ("ar-sa", "Hijazi Arabic", "", "acw", "arab"),
    ("ar-ma", "Moroccan Arabic", "", "ary", "arab"),
]
SAMPLES = ["i", "you", "water", "woman", "man", "child", "eat", "house", "big", "name", "year", "see", "friend"]
IDIOMS = {
    "sursilvan",
    "sutsilvan",
    "surmiran",
    "puter",
    "vallander",
    "vallader",
    "rumantsch-grischun",
}
RG = "rumantsch-grischun"
CAT_IDIOM = {
    "rumantsch grischun": RG,
    "sursilvan romansh": "sursilvan",
    "sutsilvan romansh": "sutsilvan",
    "surmiran romansh": "surmiran",
    "puter romansh": "puter",
    "vallader romansh": "vallander",
}


def lemma(text: str) -> str:
    text = unicodedata.normalize("NFKC", text).replace("’", "'").replace("ʻ", "'")
    return re.sub(r"\s+", " ", text.strip().lower())


def norm_sent(text: str) -> str:
    text = lemma(text)
    text = re.sub(r"[^\w\s']", "", text, flags=re.UNICODE)
    return re.sub(r"\s+", " ", text).strip()


def fetch(url: str, dest: Path) -> bool:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists() and dest.stat().st_size > 1000:
        return True
    tmp = dest.with_suffix(dest.suffix + ".part")
    print(f"get {url}", flush=True)
    try:
        subprocess.check_call(
            ["curl", "-fL", "--retry", "3", "--retry-delay", "2", "-A", UA, "-o", str(tmp), url],
            stdout=subprocess.DEVNULL,
        )
    except subprocess.CalledProcessError:
        tmp.unlink(missing_ok=True)
        print(f"miss {url}", flush=True)
        return False
    if tmp.stat().st_size < 200:
        tmp.unlink(missing_ok=True)
        return False
    tmp.replace(dest)
    return True


def script_ok(word: str, script: str) -> bool:
    if not word or len(word) > 48 or "\n" in word or "{" in word:
        return False
    checks = {
        "latn": lambda w: bool(re.search(r"[A-Za-zÀ-ÿĀ-žØ-öø-ÿ]", w))
        and not re.search(r"[\u0370-\u03FF\u0400-\u04FF\u0590-\u08FF\u0900-\u0DFF\u3040-\u30FF\u4E00-\u9FFF\uAC00-\uD7AF]", w),
        "cyrl": lambda w: bool(re.search(r"[\u0400-\u04FF]", w)),
        "grek": lambda w: bool(re.search(r"[\u0370-\u03FF\u1F00-\u1FFF]", w)),
        "arab": lambda w: bool(re.search(r"[\u0600-\u06FF\u0750-\u077F]", w)),
        "hebr": lambda w: bool(re.search(r"[\u0590-\u05FF]", w)),
        "armn": lambda w: bool(re.search(r"[\u0530-\u058F]", w)),
        "geor": lambda w: bool(re.search(r"[\u10A0-\u10FF]", w)),
        "ethi": lambda w: bool(re.search(r"[\u1200-\u137F]", w)),
        "syrc": lambda w: bool(re.search(r"[\u0700-\u074F]", w)),
        "tfng": lambda w: bool(re.search(r"[\u2D30-\u2D7F]", w)),
        "hant": lambda w: bool(re.search(r"[\u4E00-\u9FFF]", w)),
        "deva": lambda w: bool(re.search(r"[\u0900-\u097F]", w)),
        "gujr": lambda w: bool(re.search(r"[\u0A80-\u0AFF]", w)),
        "telu": lambda w: bool(re.search(r"[\u0C00-\u0C7F]", w)),
        "taml": lambda w: bool(re.search(r"[\u0B80-\u0BFF]", w)),
        "mlym": lambda w: bool(re.search(r"[\u0D00-\u0D7F]", w)),
        "egyp": lambda w: bool(re.search(r"[\U00013000-\U0001342F]", w)),
    }
    return checks[script](word)


def gloss_key(gloss: str) -> str | None:
    g = lemma(gloss)
    g = re.sub(r"\s*\([^)]*\)", "", g).strip(" .")
    if g.startswith("to "):
        g = g[3:]
    elif g.startswith("a "):
        g = g[2:]
    elif g.startswith("an "):
        g = g[3:]
    elif g.startswith("the "):
        g = g[4:]
    g = re.split(r"[,;:/]", g)[0].strip(" .")
    if not g or len(g) > 40 or len(g.split()) > 4:
        return None
    return g


def gender_of(tags: set[str]) -> str | None:
    flags = {name for name in ("masculine", "feminine", "neuter", "common-gender") if name in tags}
    if len(flags) != 1:
        return None
    return {"masculine": "m", "feminine": "f", "neuter": "n", "common-gender": "c"}[flags.pop()]


def roman_of(obj: dict) -> str | None:
    for sound in obj.get("sounds") or []:
        tags = [str(tag).lower() for tag in (sound.get("tags") or [])]
        blob = " ".join(tags)
        for key in ("roman", "other", "zh-pron", "zh_pron"):
            val = sound.get(key)
            if not isinstance(val, str):
                continue
            val = val.strip()
            if not val or len(val) > 60:
                continue
            if key == "roman" or "roman" in blob or "jyutping" in blob or "pinyin" in blob or "latn" in blob:
                if re.search(r"[A-Za-z]", val) and not re.search(r"[\u4E00-\u9FFF]", val):
                    return val
    return None


def kaikki_file(name: str) -> Path | None:
    dest = CACHE / "kaikki" / f"{name.replace(' ', '_')}.jsonl"
    if dest.exists() and dest.stat().st_size > 1000:
        return dest
    index = f"https://kaikki.org/dictionary/{quote(name)}/index.html"
    try:
        html = subprocess.check_output(["curl", "-fsSL", "-A", UA, index], text=True, timeout=60)
    except subprocess.CalledProcessError:
        print(f"no index {name}", flush=True)
        return None
    match = re.search(r'href="([^"]+\.jsonl)"', html)
    if not match:
        print(f"no jsonl link {name}", flush=True)
        return None
    url = urljoin(f"https://kaikki.org/dictionary/{quote(name)}/", match.group(1))
    if fetch(url, dest):
        return dest
    return None


def sense_idioms(sense: dict) -> set[str]:
    found: set[str] = set()
    for tag in sense.get("tags") or []:
        if not isinstance(tag, str):
            continue
        key = tag.strip().lower().replace(" ", "-")
        if key == "vallader":
            key = "vallander"
        if key in IDIOMS:
            found.add(key)
    for cat in sense.get("categories") or []:
        name = cat.get("name") if isinstance(cat, dict) else cat
        if isinstance(name, str):
            mapped = CAT_IDIOM.get(name.strip().lower())
            if mapped:
                found.add(mapped)
    return found


def gloss_keys(gloss: str, all_parts: bool) -> list[str]:
    if not all_parts:
        key = gloss_key(gloss)
        return [key] if key else []
    g = lemma(gloss)
    g = re.sub(r"\s*\([^)]*\)", "", g).strip(" .")
    keys: list[str] = []
    for part in re.split(r"[,;:/]", g):
        key = gloss_key(part)
        if key and key not in keys:
            keys.append(key)
    return keys


def index_kaikki(path: Path, wanted: set[str], script: str, standard: str | None = None) -> dict[str, list[dict]]:
    index: dict[str, list[dict]] = defaultdict(list)
    seen = 0
    seen_words: set[str] = set()
    order = 0
    rg = standard == "rg"
    with path.open(encoding="utf-8") as handle:
        for line in handle:
            seen += 1
            if seen % 20000 == 0:
                print(f"  scanned {seen}", flush=True)
            try:
                obj = json.loads(line)
            except json.JSONDecodeError:
                continue
            pos = obj.get("pos") or ""
            if pos in SKIP_POS:
                continue
            word = (obj.get("word") or "").strip()
            if not script_ok(word, script) or (not rg and word in seen_words):
                continue
            senses = []
            for sense in obj.get("senses") or []:
                if "form-of" in set(sense.get("tags") or []):
                    continue
                senses.append(sense)
                if not rg:
                    break
            if not senses:
                continue
            if not rg:
                primary = senses[0]
                tags = set(obj.get("tags") or []) | set(primary.get("tags") or [])
                if tags & BAD_TAGS:
                    continue
                seen_words.add(word)
                gender = gender_of(tags) if pos in {"noun", "name", "prop"} else None
                reading = roman_of(obj) if script != "latn" else None
                matched: set[str] = set()
                for gloss in primary.get("glosses") or []:
                    for key in gloss_keys(gloss, False):
                        if key in wanted:
                            matched.add(key)
                order += 1
                for key in matched:
                    index[key].append(
                        {"word": word, "pos": pos, "gender": gender, "reading": reading, "bad": False, "ord": order}
                    )
                continue
            for sense in senses:
                tags = {tag for tag in (sense.get("tags") or []) if isinstance(tag, str)}
                if tags & BAD_TAGS:
                    continue
                matched = set()
                for gloss in sense.get("glosses") or []:
                    for key in gloss_keys(gloss, True):
                        if key in wanted:
                            matched.add(key)
                if not matched:
                    continue
                gender = gender_of(tags) if pos in {"noun", "name", "prop"} else None
                order += 1
                idioms = sense_idioms(sense)
                for key in matched:
                    index[key].append(
                        {
                            "word": word,
                            "pos": pos,
                            "gender": gender,
                            "reading": None,
                            "bad": False,
                            "ord": order,
                            "idioms": idioms,
                        }
                    )
    print(f"  indexed {len(index)} lemmas from {seen} entries", flush=True)
    return index


def load_freq(code: str) -> dict[str, int]:
    dest = CACHE / "freq" / f"{code}.txt"
    urls = [
        f"https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/{code}/{code}_50k.txt",
        f"https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2016/{code}/{code}_50k.txt",
    ]
    ok = False
    for url in urls:
        if fetch(url, dest):
            ok = True
            break
        dest.unlink(missing_ok=True)
    if not ok:
        return {}
    ranks: dict[str, int] = {}
    for i, line in enumerate(dest.read_text(encoding="utf-8", errors="replace").splitlines()):
        part = line.split("\t")[0].split(" ")[0].strip()
        key = lemma(part)
        if key and key not in ranks:
            ranks[key] = i
    print(f"  freq {code} {len(ranks)}", flush=True)
    return ranks


def load_wikdict(code: str, script: str, wanted: set[str]) -> dict[str, dict]:
    dest = CACHE / "wikdict" / f"en-{code}.sqlite3"
    url = f"https://download.wikdict.com/dictionaries/sqlite/2_2026-06/en-{code}.sqlite3"
    if not fetch(url, dest):
        return {}
    con = sqlite3.connect(dest)
    out: dict[str, dict] = {}
    for key in wanted:
        row = con.execute(
            "SELECT trans_list FROM simple_translation WHERE written_rep = ? COLLATE NOCASE",
            (key,),
        ).fetchone()
        if not row or not row[0]:
            continue
        for part in str(row[0]).split("|"):
            text = re.sub(r"\s*\([^)]*\)", "", part).strip(" .")
            text = re.sub(r"\s+", " ", text)
            if script_ok(text, script) and len(text.split()) <= 4:
                out[key] = {"word": text, "pos": "", "gender": None, "reading": None, "bad": False}
                break
    con.close()
    print(f"  wikdict {code} {len(out)}", flush=True)
    return out


def rg_rank(cand: dict) -> tuple[int, int]:
    idioms = cand.get("idioms") or set()
    if RG in idioms:
        return (0, len(idioms - {RG}))
    if not idioms:
        return (1, 0)
    return (2, len(idioms))


def choose(cands: list[dict], pos: str, freq: dict[str, int], standard: str | None = None) -> dict | None:
    if not cands:
        return None
    ok = set(POS_OK.get(pos, {pos}))
    if standard == "rg" and pos == "det":
        ok.add("article")
    pool = [c for c in cands if not c.get("bad") and c["pos"] in ok]
    if not pool and pos in {"phrase", "line"}:
        pool = [c for c in cands if not c.get("bad")]
    if not pool:
        return None
    if standard == "rg":
        best = min(rg_rank(c)[0] for c in pool)
        if best == 2:
            return None
        pool = [c for c in pool if rg_rank(c)[0] == best]
        return min(pool, key=lambda cand: (rg_rank(cand)[1], freq.get(lemma(cand["word"]), 1_000_000), cand.get("ord", 0)))
    return min(pool, key=lambda cand: (freq.get(lemma(cand["word"]), 1_000_000), cand.get("ord", 0)))


def load_course() -> list[dict]:
    rows = []
    for level in READY:
        rows.extend(json.loads((ROOT / "ready" / f"{level}.json").read_text()))
    return rows


def load_existing(lang: str, level: str) -> dict:
    path = ROOT / "i18n" / lang / f"{level}.json"
    if not path.exists():
        return {}
    data = json.loads(path.read_text())
    items = data.get("items", data)
    return items if isinstance(items, dict) else {}


def keep(old: dict, en: str) -> bool:
    if not isinstance(old, dict):
        return False
    word = old.get("word")
    sent = old.get("sentence")
    if not isinstance(word, str) or not word.strip():
        return False
    if not isinstance(sent, str) or not sent.strip():
        return False
    prev = old.get("en")
    if isinstance(prev, str) and lemma(prev) != lemma(en):
        return False
    return True


def load_english_sentences(wanted: set[str]) -> dict[str, str]:
    import bz2

    dest = CACHE / "eng_sentences.tsv.bz2"
    fetch("https://downloads.tatoeba.org/exports/per_language/eng/eng_sentences.tsv.bz2", dest)
    ids: dict[str, str] = {}
    with bz2.open(dest, "rt", encoding="utf-8", errors="replace") as handle:
        for line in handle:
            parts = line.rstrip("\n").split("\t")
            if len(parts) < 3:
                continue
            key = norm_sent(parts[2])
            if key in wanted and parts[0] not in ids:
                ids[parts[0]] = parts[2].strip()
    print(f"tatoeba english hits {len(ids)}", flush=True)
    return ids


def tatoeba_map(code: str, eng_ids: dict[str, str]) -> dict[str, str]:
    if not code:
        return {}
    import bz2

    sent_path = CACHE / "tatoeba" / f"{code}_sentences.tsv.bz2"
    link_path = CACHE / "tatoeba" / f"{code}-eng_links.tsv.bz2"
    base = "https://downloads.tatoeba.org/exports/per_language"
    if not fetch(f"{base}/{code}/{code}_sentences.tsv.bz2", sent_path):
        return {}
    if not fetch(f"{base}/{code}/{code}-eng_links.tsv.bz2", link_path):
        return {}
    want_eng = set(eng_ids)
    targets: dict[str, str] = {}
    with bz2.open(link_path, "rt", encoding="utf-8", errors="replace") as handle:
        for line in handle:
            parts = line.rstrip("\n").split("\t")
            if len(parts) >= 2 and parts[1] in want_eng:
                targets[parts[0]] = parts[1]
    found: dict[str, str] = {}
    with bz2.open(sent_path, "rt", encoding="utf-8", errors="replace") as handle:
        for line in handle:
            parts = line.rstrip("\n").split("\t")
            if len(parts) < 3 or parts[0] not in targets:
                continue
            english = eng_ids[targets[parts[0]]]
            key = norm_sent(english)
            text = parts[2].strip()
            if not text or norm_sent(text) == key:
                continue
            prev = found.get(key)
            if prev is None or len(text) < len(prev):
                found[key] = text
    print(f"  tatoeba {code} sentences {len(found)}", flush=True)
    return found


def overlay(lang: str, items: dict, english: dict) -> None:
    path = LEX / f"{lang}.json"
    if not path.exists():
        return
    lex = json.loads(path.read_text()).get("entries", {})
    for iid, hand in lex.items():
        row = items.get(iid)
        if row is None or not isinstance(hand, dict):
            continue
        en_hand = english.get(iid, {})
        if lemma(str(row.get("en") or "")) != lemma(str(en_hand.get("word") or "")):
            continue
        if hand.get("word"):
            row["word"] = hand["word"]
            row.pop("plural", None)
            row.pop("gender", None)
        if hand.get("sentence"):
            row["sentence"] = hand["sentence"]
        for key in EXTRA:
            if hand.get(key):
                row[key] = hand[key]


def write_level(lang: str, level: str, items: dict) -> None:
    if not items:
        return
    out = ROOT / "i18n" / lang
    out.mkdir(parents=True, exist_ok=True)
    payload = {"lang": lang, "level": LEVEL_NAME[level], "items": items}
    tmp = out / f"{level}.json.tmp"
    tmp.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")))
    tmp.replace(out / f"{level}.json")


def main() -> None:
    only = set(sys.argv[1:])
    rows = load_course()
    wanted = {lemma(row["en"]) for row in rows if row.get("en")}
    course_norm = {norm_sent(row["sentence"]) for row in rows if row.get("sentence")}
    english = json.loads((LEX / "en.json").read_text()).get("entries", {})
    eng_ids = load_english_sentences(course_norm)
    parsed: dict[tuple[str, str], dict[str, list[dict]]] = {}
    wikdict_cache: dict[tuple[str, str], dict[str, dict]] = {}
    freq_cache: dict[str, dict[str, int]] = {}
    for code, name, wiki, tato, script in TARGETS:
        if only and code not in only:
            continue
        print(f"language {code}", flush=True)
        standard = "rg" if code == "rm" else None
        if code not in freq_cache:
            freq_cache[code] = load_freq(code.split("-")[0])
        freq = freq_cache[code]
        cands: dict[str, list[dict]] = {}
        if name:
            key = (name, script, standard or "")
            if key not in parsed:
                path = kaikki_file(name)
                parsed[key] = index_kaikki(path, wanted, script, standard) if path else {}
            cands = parsed[key]
        wiki_map: dict[str, dict] = {}
        if wiki:
            wkey = (wiki, script)
            if wkey not in wikdict_cache:
                wikdict_cache[wkey] = load_wikdict(wiki, script, wanted)
            wiki_map = wikdict_cache[wkey]
        sentences = tatoeba_map(tato, eng_ids)
        lex_entries: dict = {}
        lex_path = LEX / f"{code}.json"
        if lex_path.exists():
            lex_entries = json.loads(lex_path.read_text()).get("entries", {})
        print("  samples", flush=True)
        sample_pos = {"eat": "verb", "big": "adj", "i": "pron", "you": "pron", "see": "verb", "friend": "noun"}
        for sample in SAMPLES:
            hit = choose(cands.get(sample, []), sample_pos.get(sample, "noun"), freq, standard)
            if hit is None and sample in wiki_map:
                hit = wiki_map[sample]
            print(f"    {sample}: {hit['word'] if hit else '-'}", flush=True)
        by_level: dict[str, list[dict]] = defaultdict(list)
        for row in rows:
            by_level[str(row["level"]).lower()].append(row)
        total = 0
        with_sent = 0
        for level in READY:
            items = {}
            existing = load_existing(code, level)
            for row in by_level.get(level, []):
                en = row["en"].strip()
                key = lemma(en)
                if keep(existing.get(row["id"]), en):
                    items[row["id"]] = existing[row["id"]]
                    continue
                hit = choose(cands.get(key, []), row.get("pos") or "noun", freq, standard)
                if hit is None:
                    hit = wiki_map.get(key)
                if not hit:
                    hand = lex_entries.get(row["id"])
                    if isinstance(hand, dict) and str(hand.get("word") or "").strip():
                        hit = {"word": str(hand["word"]).strip(), "pos": "", "gender": None, "reading": None, "bad": False}
                    else:
                        continue
                sent = sentences.get(norm_sent(row.get("sentence") or ""), "")
                made = {"en": en, "word": hit["word"], "sentence": sent}
                if hit.get("gender") and (row.get("pos") or "noun") in {"noun", "name"}:
                    made["gender"] = hit["gender"]
                if hit.get("reading"):
                    made["reading"] = hit["reading"]
                items[row["id"]] = made
            overlay(code, items, english)
            write_level(code, level, items)
            total += len(items)
            with_sent += sum(1 for item in items.values() if item.get("sentence"))
            print(f"  wrote {code}/{level}.json {len(items)}", flush=True)
        print(f"done {code} cards {total} with sentence {with_sent}", flush=True)


if __name__ == "__main__":
    main()
