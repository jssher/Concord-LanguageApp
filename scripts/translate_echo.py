#!/usr/bin/env python3
"""Retranslate picture words whose translation was copied from English."""

from __future__ import annotations

import json
import os
import re
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path("/workspace")
PROGRESS = Path("/tmp/tr_echo_done.txt")
OUT = Path("/tmp/tr_echo.jsonl")
PATTERNS = json.loads(Path("/tmp/pic_patterns.json").read_text())
READING = {
    "am", "ar", "ar-eg", "ar-ma", "ar-sa", "arc", "bg", "bn", "el", "fa", "grc", "gu", "he", "hi",
    "hy", "ja", "ka", "ko", "mk", "ml", "mr", "ru", "ta", "te", "th", "uk", "ur", "zh",
}
NAMES = {
    "am": "Amharic in Ge'ez script",
    "ar": "Modern Standard Arabic with vowels",
    "ar-eg": "Egyptian Arabic",
    "ar-ma": "Moroccan Arabic",
    "ar-sa": "Saudi Arabic",
    "arc": "Classical Syriac",
    "ber": "Tamazight",
    "bg": "Bulgarian",
    "bn": "Bengali",
    "cs": "Czech",
    "cy": "Welsh",
    "da": "Danish",
    "de": "German",
    "el": "Greek",
    "eo": "Esperanto",
    "es": "Spanish",
    "eu": "Basque",
    "fa": "Persian",
    "ff": "Fula",
    "fr": "French",
    "ga": "Irish",
    "gn": "Guarani",
    "grc": "Ancient Greek",
    "gu": "Gujarati",
    "ha": "Hausa",
    "haw": "Hawaiian",
    "he": "Hebrew with niqqud",
    "hi": "Hindi",
    "hr": "Croatian",
    "hy": "Armenian",
    "id": "Indonesian",
    "ig": "Igbo",
    "is": "Icelandic",
    "isv": "Interslavic in Latin letters",
    "it": "Italian",
    "ja": "Japanese",
    "ka": "Georgian",
    "ko": "Korean",
    "la": "Classical Latin",
    "ln": "Lingala",
    "mg": "Malagasy",
    "mk": "Macedonian",
    "ml": "Malayalam",
    "mr": "Marathi",
    "nl": "Dutch",
    "pl": "Polish",
    "pt": "Brazilian Portuguese",
    "qu": "Quechua",
    "rm": "Romansh",
    "ro": "Romanian",
    "ru": "Russian",
    "sk": "Slovak",
    "sl": "Slovenian",
    "so": "Somali",
    "sq": "Albanian",
    "sr": "Serbian",
    "sw": "Swahili",
    "ta": "Tamil",
    "te": "Telugu",
    "th": "Thai",
    "tl": "Tagalog",
    "tr": "Turkish",
    "uk": "Ukrainian",
    "ur": "Urdu",
    "vi": "Vietnamese",
    "yo": "Yoruba",
    "zh": "Simplified Chinese",
}
LATIN_SCRIPT = set(
    "cs cy da de eo es eu ff fr ga gn haw hr id ig is it la ln mg nl pl pt qu rm ro sk sl sq sw tl vi yo isv haw".split()
)
LATIN_RE = re.compile(
    r"\b(orbicularis|spinae|teres|carpi|scapulae|psoas|quadratus|fasciae|abdominis|callosum|cava|"
    r"intercostal|maximus|minimus|longus|brevis|hallucis|digitorum|radialis|ulnaris|femoris|brachii|"
    r"dorsi|capitis|latae|oculi|oris|magnus|medius|major|minor)\b",
    re.I,
)


def chat(prompt: str) -> str:
    body = {
        "model": "grok-4-fast-non-reasoning",
        "temperature": 0,
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
            last = str(err)[:180]
            time.sleep(1 + attempt * 2)
    raise RuntimeError(last)


def parse(text: str) -> dict:
    start, end = text.find("{"), text.rfind("}")
    if start < 0 or end <= start:
        return {}
    try:
        raw = json.loads(text[start : end + 1])
    except json.JSONDecodeError:
        return {}
    return raw if isinstance(raw, dict) else {}


def targets() -> dict[str, list[dict]]:
    rows = {}
    for path in (Path("/tmp/pic_new_rows.json"), Path("/tmp/pic_fix_rows.json")):
        for row in json.loads(path.read_text()):
            rows[row["id"]] = row
    last = {}
    for src in (Path("/tmp/tr_rows.jsonl"), Path("/tmp/tr_fix_rows.jsonl"), OUT):
        if not src.exists():
            continue
        for line in src.read_text().splitlines():
            if not line.strip():
                continue
            try:
                item = json.loads(line)
            except json.JSONDecodeError:
                continue
            if item.get("id") in rows and item.get("word") and item.get("lang"):
                last[(item["lang"], item["id"])] = item
    by_lang: dict[str, list[dict]] = {}
    for (lang, ident), item in last.items():
        en = rows[ident]["en"]
        if item["word"].strip().lower() != en.lower():
            continue
        if lang in LATIN_SCRIPT and LATIN_RE.search(en):
            continue
        by_lang.setdefault(lang, []).append(rows[ident])
    for lang in by_lang:
        by_lang[lang].sort(key=lambda row: row["id"])
    return by_lang


def batch(lang: str, rows: list[dict]) -> list[dict]:
    name = NAMES.get(lang, lang)
    lines = [f"{row['id']}|{row['en']}" for row in rows]
    prompt = (
        f"Translate each English noun into {name}. Never copy the English spelling. "
        "Reply with JSON only: {id: word}. "
        + ("The value must be \"native word | latin reading\". " if lang in READING else "")
        + "\n"
        + "\n".join(lines)
    )
    raw = parse(chat(prompt))
    pattern = PATTERNS.get(lang, "This is {word}.")
    out = []
    by_id = {row["id"]: row for row in rows}
    for ident, value in raw.items():
        if ident not in by_id:
            continue
        word = str(value[0] if isinstance(value, list) else value).strip()
        reading = ""
        if "|" in word:
            word, reading = [part.strip() for part in word.split("|", 1)]
        en = by_id[ident]["en"]
        if not word or len(word) > 80 or word.lower() == en.lower():
            continue
        item = {
            "id": ident,
            "lang": lang,
            "en": en,
            "word": word,
            "sentence": pattern.replace("{word}", word),
        }
        if reading:
            item["reading"] = reading
        out.append(item)
    return out


def main() -> None:
    done = set()
    if PROGRESS.exists():
        done = {line.strip() for line in PROGRESS.read_text().splitlines() if line.strip()}
    by_lang = targets()
    jobs = []
    for lang, rows in sorted(by_lang.items()):
        for i in range(0, len(rows), 20):
            chunk = rows[i : i + 20]
            key = f"{lang}|{chunk[0]['id']}:{chunk[-1]['id']}"
            if key in done:
                continue
            jobs.append((key, lang, chunk))
    print("langs", len(by_lang), "jobs", len(jobs), flush=True)

    def work(job):
        key, lang, chunk = job
        try:
            items = batch(lang, chunk)
        except Exception as err:
            return key, [], str(err)[:160], len(chunk)
        return key, items, "", len(chunk)

    ok = 0
    with ThreadPoolExecutor(max_workers=16) as pool:
        futures = [pool.submit(work, job) for job in jobs]
        for n, fut in enumerate(as_completed(futures), 1):
            key, items, err, expect = fut.result()
            if items:
                with OUT.open("a") as fh:
                    for item in items:
                        fh.write(json.dumps(item, ensure_ascii=False) + "\n")
            if err or len(items) < expect * 0.5:
                print("ERR", key[:60], err or f"short {len(items)}/{expect}", flush=True)
                continue
            with PROGRESS.open("a") as fh:
                fh.write(key + "\n")
            ok += 1
            if n % 20 == 0 or n == len(jobs):
                print(f"{n}/{len(jobs)} ok {ok} last {len(items)}", flush=True)
    print("batches written", ok)


if __name__ == "__main__":
    main()
