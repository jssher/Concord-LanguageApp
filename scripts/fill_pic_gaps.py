#!/usr/bin/env python3
"""Fill picture-dictionary cards that still have no translation.

A missing card is one whose word is empty, identical to the English, or already
a gap marker. The marker is [[en:ENGLISH]] in both the word and the sentence,
so a later pass can find every hole with the literal text [[en:.

Aurali has no lexicon past its starter deck, so those cards stay markers.
Everything else is translated. A loanword the model returns on purpose is kept.
"""

from __future__ import annotations

import importlib.util
import json
import os
import re
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path("/workspace/public/course")
CACHE = Path("/tmp/pic_gap_cache.jsonl")
TRACK = Path("/workspace/scripts/pic-gaps.tsv")
GAP = re.compile(r"^\[\[en:(.*)\]\]$")

# No invented lexicon, and no guessed hieroglyphs.
MARKER_ONLY = {"aur", "egy"}

READING = {
    "am", "ar", "ar-eg", "ar-ma", "ar-sa", "arc", "bg", "bn", "egy", "el", "fa", "grc",
    "gu", "he", "hi", "hy", "ja", "ka", "ko", "mk", "ml", "mr", "ru", "ta", "te", "th",
    "uk", "ur", "yue", "zh",
}
# Latin-script languages that were echoing ordinary English nouns.
SUSPECT = {
    "ber", "cy", "eu", "ff", "ga", "gn", "ha", "haw", "ig", "is", "ln", "mg", "qu", "rm", "so", "sw", "tl", "yo",
}
NON_LATIN = {
    "am", "ar", "ar-eg", "ar-ma", "ar-sa", "arc", "bn", "egy", "el", "fa", "grc", "gu",
    "he", "hi", "hy", "ja", "ka", "ko", "ml", "mr", "ta", "te", "th", "ur", "yue", "zh",
}
EXTRA = {
    "ja": "これは{word}です。",
    "ko": "이것은 {word}입니다.",
    "zh": "这是{word}。",
    "am": "ይህ {word} ነው።",
    "yue": "呢個係{word}。",
    "gsw": "Das isch {word}.",
    "gsw-be": "Das isch {word}.",
    "tok": "ni li {word}.",
}
NAMES = {
    "gsw": "Zürich German, everyday speech, not standard German",
    "gsw-be": "Bern German, city Bern, not Zürich and not standard German",
    "yue": "Hong Kong Cantonese in traditional characters",
    "egy": "Middle Egyptian in Unicode hieroglyphs",
    "tok": "Toki Pona, official words only, a short compound",
    "ar": "Modern Standard Arabic with vowels",
    "ar-eg": "Egyptian Arabic",
    "ar-ma": "Moroccan Arabic",
    "ar-sa": "Saudi Arabic",
    "zh": "Simplified Mandarin",
    "ja": "Japanese",
    "ko": "Korean",
    "he": "Hebrew with niqqud",
    "pt": "Brazilian Portuguese",
    "la": "Classical Latin",
    "grc": "Ancient Greek",
    "isv": "Latin Interslavic",
    "eo": "Esperanto",
}
PU = {
    "a", "akesi", "ala", "alasa", "ale", "ali", "anpa", "ante", "anu", "awen", "e", "en",
    "esun", "ijo", "ike", "ilo", "insa", "jaki", "jan", "jelo", "jo", "kala", "kalama",
    "kama", "kasi", "ken", "kepeken", "kili", "kiwen", "ko", "kon", "kule", "kulupu",
    "kute", "la", "lape", "laso", "lawa", "len", "lete", "li", "lili", "linja", "lipu",
    "loje", "lon", "luka", "lukin", "lupa", "ma", "mama", "mani", "meli", "mi", "mije",
    "moku", "moli", "monsi", "mu", "mun", "musi", "mute", "nanpa", "nasa", "nasin",
    "nena", "ni", "nimi", "noka", "o", "olin", "ona", "open", "pakala", "pali", "palisa",
    "pan", "pana", "pi", "pilin", "pimeja", "pini", "pipi", "poka", "poki", "pona", "pu",
    "sama", "seli", "selo", "seme", "sewi", "sijelo", "sike", "sin", "sina", "sinpin",
    "sitelen", "sona", "soweli", "suli", "suno", "supa", "suwi", "tan", "taso", "tawa",
    "telo", "tenpo", "toki", "tomo", "tu", "unpa", "uta", "utala", "walo", "wan", "waso",
    "wawa", "weka", "wile",
}

spec = importlib.util.spec_from_file_location("fix_pic", "/workspace/scripts/fix_pic_sentences.py")
fix = importlib.util.module_from_spec(spec)
spec.loader.exec_module(fix)


def marker(text: str) -> str:
    return "[[en:" + text.replace("]", "") + "]]"


def chat(prompt: str) -> str:
    body = {
        "model": "grok-4-fast-non-reasoning",
        "temperature": 0,
        "max_tokens": 4000,
        "messages": [{"role": "user", "content": prompt}],
    }
    req = urllib.request.Request(
        "https://api.x.ai/v1/chat/completions",
        data=json.dumps(body).encode(),
        headers={"Authorization": f"Bearer {os.environ['XAI_API_KEY']}", "Content-Type": "application/json"},
    )
    last = ""
    for attempt in range(5):
        try:
            with urllib.request.urlopen(req, timeout=120) as res:
                data = json.loads(res.read().decode())
            return data["choices"][0]["message"]["content"]
        except Exception as err:
            last = str(err)[:200]
            time.sleep(1 + attempt * 2)
    raise RuntimeError(last)


def parse_obj(text: str) -> dict:
    text = text.strip()
    start, end = text.find("{"), text.rfind("}")
    if start < 0 or end <= start:
        return {}
    try:
        raw = json.loads(text[start : end + 1])
    except json.JSONDecodeError:
        return {}
    return raw if isinstance(raw, dict) else {}


def sentence_for(lang: str, word: str) -> str:
    if lang in fix.GENDERED:
        return fix.gendered_sentence(lang, word, fix.guess(lang, word))
    if lang in fix.SIMPLE or lang == "th":
        return fix.simple_sentence(lang, word)
    frame = EXTRA.get(lang)
    if not frame:
        raise KeyError(lang)
    return frame.replace("{word}", word)


def accept(lang: str, en: str, value: object) -> dict | None:
    text = value[0] if isinstance(value, list) else value
    text = str(text).strip().strip('"')
    if not text or "\n" in text or len(text) > 90 or text.startswith("[["):
        return None
    reading = ""
    if "|" in text:
        left, right = [part.strip() for part in text.split("|", 1)]
    else:
        left, right = text, ""

    def latin(value: str) -> bool:
        return bool(re.fullmatch(r"[A-Za-z0-9 .,'’\-/()]+", value))

    if lang in NON_LATIN and latin(left) and right and not latin(right):
        word, reading = right, ""
    else:
        word, reading = left, right
    if not word or word.lower() == "null":
        return None
    if lang in NON_LATIN and re.fullmatch(r"[A-Za-z0-9 .,'’\-/()]+", word):
        return None
    if lang == "egy" and not re.search(r"[\U00013000-\U0001342F]", word):
        return None
    if lang == "tok":
        parts = word.split()
        if not parts or len(parts) > 4 or any(part not in PU for part in parts):
            return None
    tokens = [part.strip(".,").casefold() for part in en.split() if part.strip(".,")]
    if len(tokens) > 1 and word.casefold() in tokens and len(word) <= 3:
        return None
    if lang in READING and not reading and lang != "tok":
        # A native word with no reading is still usable. Keep it.
        reading = ""
    if word.casefold() == en.casefold() and (lang in NON_LATIN or lang in SUSPECT or " " in en):
        return None
    return {"word": word, "reading": reading}


def prompt_for(lang: str, rows: list[dict]) -> str:
    name = NAMES.get(lang, lang)
    lines = [f"{row['id']}|{row['en']}" for row in rows]
    reading = ""
    if lang in READING:
        reading = " Value format is the native-script word, then \" | \", then the romanization. The word before the pipe must be in the language's own writing. "
    if lang == "egy":
        reading = " Value format is \"hieroglyphs | transliteration\". Use Unicode Egyptian hieroglyphs in the word. "
    if lang == "tok":
        reading = " Use only these words: " + " ".join(sorted(PU)) + ". "
    return (
        f"Translate each picture-dictionary noun into {name}. "
        "Reply with JSON only: {\"id\": \"word\"}. Use the id keys exactly. "
        "One headword, not a sentence and not a definition. "
        "Use the everyday word. Translate a Latin anatomical name when the language has an everyday name. "
        "Never copy a multi-word English name such as shoulder blade or milk pitcher. "
        "Keep a single international name only when this language really uses that name. "
        + reading
        + "\n"
        + "\n".join(lines)
    )


def load_pics() -> list[dict]:
    rows = []
    for row in json.loads((ROOT / "ready" / "b2.json").read_text()):
        if str(row.get("id", "")).startswith("pic-"):
            rows.append(row)
    return rows


def load_items(lang: str) -> tuple[dict, dict]:
    path = ROOT / "i18n" / lang / "b2.json"
    if not path.exists():
        return {}, {"lang": lang, "level": "B2", "items": {}}
    data = json.loads(path.read_text())
    return data.get("items") or {}, data


def is_gap(row: dict | None, en: str) -> bool:
    if not row:
        return True
    word = str(row.get("word") or "").strip()
    if not word or GAP.match(word):
        return True
    return word.casefold() == en.casefold()


def load_cache() -> dict[tuple[str, str], dict]:
    found: dict[tuple[str, str], dict] = {}
    if not CACHE.exists():
        return found
    for line in CACHE.read_text().splitlines():
        if not line.strip():
            continue
        row = json.loads(line)
        found[(row["lang"], row["id"])] = row
    return found


def append_cache(rows: list[dict]) -> None:
    with CACHE.open("a") as fh:
        for row in rows:
            fh.write(json.dumps(row, ensure_ascii=False) + "\n")


def translate_batch(lang: str, rows: list[dict]) -> list[dict]:
    raw = parse_obj(chat(prompt_for(lang, rows)))
    out = []
    for row in rows:
        got = accept(lang, row["en"], raw.get(row["id"]))
        if not got:
            out.append({"lang": lang, "id": row["id"], "en": row["en"], "sentence": row["sentence"], "ok": False})
            continue
        sent = got["reading"] if lang == "egy" and got["reading"] else sentence_for(lang, got["word"])
        item = {
            "lang": lang,
            "id": row["id"],
            "en": row["en"],
            "sentence_en": row["sentence"],
            "word": got["word"],
            "sentence": sent,
            "ok": True,
        }
        if got["reading"]:
            item["reading"] = got["reading"]
        out.append(item)
    return out


def apply_lang(lang: str, pics: list[dict], cache: dict[tuple[str, str], dict]) -> tuple[int, int]:
    items, data = load_items(lang)
    filled = 0
    marked = 0
    for pic in pics:
        en = str(pic["en"]).strip()
        current = items.get(pic["id"])
        if not is_gap(current, en):
            continue
        hit = cache.get((lang, pic["id"]))
        row = dict(current or {})
        row["en"] = en
        if hit and hit.get("ok") and hit.get("word"):
            row["word"] = hit["word"]
            row["sentence"] = hit["sentence"]
            if hit.get("reading"):
                row["reading"] = hit["reading"]
            elif "reading" in row and lang not in READING:
                row.pop("reading", None)
            filled += 1
        else:
            row["word"] = marker(en)
            row["sentence"] = marker(str(pic.get("sentence") or f"This is a {en}."))
            row.pop("reading", None)
            marked += 1
        items[pic["id"]] = row
    data["lang"] = lang
    data["level"] = "B2"
    data["items"] = items
    if not filled and not marked:
        return filled, marked
    path = ROOT / "i18n" / lang / "b2.json"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")))
    return filled, marked


def main() -> None:
    pics = load_pics()
    langs = sorted(p.name for p in (ROOT / "i18n").iterdir() if p.is_dir())
    cache = load_cache()
    jobs: list[tuple[str, list[dict]]] = []
    marker_langs = []
    for lang in langs:
        items, _ = load_items(lang)
        need = []
        for pic in pics:
            en = str(pic["en"]).strip()
            if not is_gap(items.get(pic["id"]), en):
                continue
            if (lang, pic["id"]) in cache:
                continue
            need.append({"id": pic["id"], "en": en, "sentence": pic.get("sentence") or ""})
        if not need:
            continue
        if lang in MARKER_ONLY:
            marker_langs.append((lang, need))
            continue
        for i in range(0, len(need), 25):
            jobs.append((lang, need[i : i + 25]))
    print(f"langs {len(langs)} pics {len(pics)} batches {len(jobs)} marker-only {len(marker_langs)}", flush=True)

    def work(job: tuple[str, list[dict]]):
        lang, rows = job
        try:
            return translate_batch(lang, rows), ""
        except Exception as err:
            return [{"lang": lang, "id": row["id"], "en": row["en"], "ok": False} for row in rows], str(err)[:160]

    done = 0
    with ThreadPoolExecutor(max_workers=16) as pool:
        futures = [pool.submit(work, job) for job in jobs]
        for fut in as_completed(futures):
            rows, err = fut.result()
            append_cache(rows)
            for row in rows:
                cache[(row["lang"], row["id"])] = row
            done += 1
            if err or done % 25 == 0 or done == len(jobs):
                ok = sum(1 for row in rows if row.get("ok"))
                print(f"{done}/{len(jobs)} +{ok} {err}", flush=True)
    for lang, need in marker_langs:
        rows = [{"lang": lang, "id": row["id"], "en": row["en"], "ok": False} for row in need]
        append_cache(rows)
        for row in rows:
            cache[(row["lang"], row["id"])] = row
        print(f"marked {lang} {len(rows)}", flush=True)

    track = ["lang\tid\ten\tsentence"]
    total_filled = 0
    total_marked = 0
    for lang in langs:
        filled, marked = apply_lang(lang, pics, cache)
        total_filled += filled
        total_marked += marked
        if filled or marked:
            print(f"wrote {lang} filled {filled} marked {marked}", flush=True)
        items, _ = load_items(lang)
        for pic in pics:
            row = items.get(pic["id"]) or {}
            word = str(row.get("word") or "")
            match = GAP.match(word)
            if match:
                track.append(f"{lang}\t{pic['id']}\t{pic['en']}\t{pic.get('sentence') or ''}")
    TRACK.write_text("\n".join(track) + "\n")
    print(f"filled {total_filled} marked {total_marked} track {len(track)-1}", flush=True)


if __name__ == "__main__":
    main()
