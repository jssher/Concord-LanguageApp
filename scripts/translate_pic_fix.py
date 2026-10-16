#!/usr/bin/env python3
"""Translate the replacement-plate rows. Separate progress from the main job."""

from __future__ import annotations

import json
import os
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path("/workspace")
ROWS = json.loads(Path("/tmp/pic_fix_rows.json").read_text())
LANGS = sorted(p.name for p in (ROOT / "public/course/i18n").iterdir() if (p / "b2.json").exists())
READING = {
    "am", "ar", "ar-eg", "ar-ma", "ar-sa", "arc", "bg", "bn", "el", "fa", "grc", "gu", "he", "hi",
    "hy", "ja", "ka", "ko", "mk", "ml", "mr", "ru", "ta", "te", "th", "uk", "ur", "zh",
}
NOTES = {
    "ar": "Modern Standard Arabic with vowels",
    "ar-eg": "Egyptian Arabic",
    "ar-ma": "Moroccan Arabic",
    "ar-sa": "Saudi Arabic",
    "zh": "Simplified Mandarin",
    "ja": "Japanese dictionary form",
    "ko": "Korean dictionary form",
    "la": "Classical Latin",
    "grc": "Ancient Greek",
    "isv": "Latin Interslavic",
    "eo": "Esperanto",
    "pt": "Brazilian Portuguese",
    "he": "Hebrew with niqqud",
}
PROGRESS = Path("/tmp/tr_fix_done.txt")
OUT = Path("/tmp/tr_fix_rows.jsonl")
PATTERNS = json.loads(Path("/tmp/pic_patterns.json").read_text())


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
    text = text.strip()
    start, end = text.find("{"), text.rfind("}")
    if start < 0 or end <= start:
        return {}
    try:
        raw = json.loads(text[start : end + 1])
    except json.JSONDecodeError:
        return {}
    return raw if isinstance(raw, dict) else {}


def batch(langs: list[str], rows: list[dict]) -> list[dict]:
    need = [lang for lang in langs if lang in READING]
    note = "; ".join(f"{k}: {NOTES[k]}" for k in langs if k in NOTES)
    lines = [f"{row['id']}|{row['en']}" for row in rows]
    prompt = (
        "Give the dictionary form of each English noun. "
        "Reply with JSON only: {lang: {id: word}}. "
        "Use the id keys exactly. No sentences. "
        + ("For " + ", ".join(need) + " the value must be \"word | latin-reading\". " if need else "")
        + (note + ". " if note else "")
        + "Languages: " + ", ".join(langs) + ".\n"
        + "\n".join(lines)
    )
    raw = parse(chat(prompt))
    out = []
    by_id = {row["id"]: row for row in rows}
    for lang in langs:
        block = raw.get(lang) or {}
        if not isinstance(block, dict):
            continue
        pattern = PATTERNS.get(lang, "This is {word}.")
        for ident, value in block.items():
            if ident not in by_id:
                continue
            word = value[0] if isinstance(value, list) else value
            word = str(word).strip()
            reading = ""
            if "|" in word:
                word, reading = [part.strip() for part in word.split("|", 1)]
            if not word or len(word) > 80:
                continue
            item = {
                "id": ident,
                "lang": lang,
                "en": by_id[ident]["en"],
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
    jobs = []
    lang_groups = [LANGS[i : i + 6] for i in range(0, len(LANGS), 6)]
    row_groups = [ROWS[i : i + 20] for i in range(0, len(ROWS), 20)]
    for lg in lang_groups:
        for rg in row_groups:
            key = ",".join(lg) + "|" + rg[0]["id"] + ":" + rg[-1]["id"]
            if key in done:
                continue
            jobs.append((key, lg, rg))
    print("langs", len(LANGS), "rows", len(ROWS), "jobs", len(jobs), flush=True)

    def work(job):
        key, lg, rg = job
        try:
            items = batch(lg, rg)
        except Exception as err:
            return key, [], str(err)[:160]
        return key, items, ""

    ok = 0
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = [pool.submit(work, job) for job in jobs]
        for n, fut in enumerate(as_completed(futures), 1):
            key, items, err = fut.result()
            if err:
                print("ERR", key[:48], err, flush=True)
                continue
            with OUT.open("a") as fh:
                for item in items:
                    fh.write(json.dumps(item, ensure_ascii=False) + "\n")
            with PROGRESS.open("a") as fh:
                fh.write(key + "\n")
            ok += 1
            if n % 10 == 0 or n == len(jobs):
                print(f"{n}/{len(jobs)} batches ok {ok} last {len(items)}", flush=True)
    print("batches written", ok)


if __name__ == "__main__":
    main()
