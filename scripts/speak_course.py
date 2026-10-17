#!/usr/bin/env python3
"""Record course words and sentences in every language Grok speaks natively.

The folder name matches the course id. `tts` is the BCP-47 code sent to the
model so the voice uses that language's sounds. Flashcards and the picture
dictionary both live in the course packs, as words and as sentences.
"""

from __future__ import annotations

import hashlib
import json
import os
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path("/workspace/public/audio")
COURSE = Path("/workspace/public/course")
# Course order. English first, then the next native language in the catalog.
# id, tts language, pack id ("en" reads the English course).
LANGS = [
    ("en", "en", "en"),
    ("de", "de", "de"),
    ("es", "es-ES", "es"),
    ("pt", "pt-BR", "pt"),
    ("it", "it", "it"),
    ("fr", "fr", "fr"),
    ("ru", "ru", "ru"),
    ("tr", "tr", "tr"),
    ("zh", "zh", "zh"),
    ("ja", "ja", "ja"),
    ("ko", "ko", "ko"),
    ("hi", "hi", "hi"),
    ("bn", "bn", "bn"),
    ("ar", "ar", "ar"),
    ("ar-eg", "ar-EG", "ar-eg"),
    ("ar-sa", "ar-SA", "ar-sa"),
    ("id", "id", "id"),
    ("vi", "vi", "vi"),
]
LEVELS = ("a1", "a2", "b1", "b2", "p")
VOICE = "eve"
FORMAT = {"codec": "mp3", "sample_rate": 16000, "bit_rate": 32000}
WORKERS = 24


def lines_of(pack: str) -> set[str]:
    found: set[str] = set()
    if pack == "en":
        for level in LEVELS:
            path = COURSE / "ready" / f"{level}.json"
            if not path.exists():
                continue
            for row in json.loads(path.read_text()):
                for key in ("en", "sentence"):
                    text = str(row.get(key) or "").strip()
                    if text:
                        found.add(text)
        return found
    for level in LEVELS:
        path = COURSE / "i18n" / pack / f"{level}.json"
        if not path.exists():
            continue
        items = json.loads(path.read_text()).get("items") or {}
        for entry in items.values():
            if not isinstance(entry, dict):
                continue
            for key in ("word", "sentence"):
                text = str(entry.get(key) or "").strip()
                if text:
                    found.add(text)
    return found


def dest(lang: str, text: str) -> Path:
    digest = hashlib.sha1(text.encode()).hexdigest()
    return ROOT / VOICE / lang / digest[:2] / f"{digest}.mp3"


def speak(lang: str, tts: str, text: str) -> str:
    file = dest(lang, text)
    if file.exists() and file.stat().st_size > 200:
        return "skip"
    body = json.dumps(
        {"text": text, "voice_id": VOICE, "language": tts, "output_format": FORMAT}
    ).encode()
    req = urllib.request.Request(
        "https://api.x.ai/v1/tts",
        data=body,
        headers={"Authorization": f"Bearer {os.environ['XAI_API_KEY']}", "Content-Type": "application/json"},
    )
    last = ""
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=60) as res:
                data = res.read()
            if len(data) < 200 or data[:1] != b"\xff":
                last = f"bad {len(data)}"
                time.sleep(1)
                continue
            file.parent.mkdir(parents=True, exist_ok=True)
            tmp = file.with_suffix(".part")
            tmp.write_bytes(data)
            tmp.replace(file)
            return "ok"
        except Exception as err:
            last = str(err)[:160]
            time.sleep(1 + attempt)
    return f"fail {last}"


def write_status(counts: dict[str, int], totals: dict[str, int]) -> None:
    ROOT.mkdir(parents=True, exist_ok=True)
    (ROOT / "status.json").write_text(
        json.dumps({"voices": {VOICE: counts}, "totals": totals}, separators=(",", ":"))
    )


def main() -> None:
    catalog = {lang: lines_of(pack) for lang, _tts, pack in LANGS}
    totals = {lang: len(rows) for lang, rows in catalog.items()}
    print("totals", totals, "sum", sum(totals.values()), flush=True)
    counts = {lang: 0 for lang, _, _ in LANGS}
    for lang, tts, _pack in LANGS:
        rows = catalog[lang]
        pending = [text for text in rows if not (dest(lang, text).exists() and dest(lang, text).stat().st_size > 200)]
        counts[lang] = len(rows) - len(pending)
        print(lang, tts, "todo", len(pending), "have", counts[lang], flush=True)
        write_status(counts, totals)
        if not pending:
            continue
        ok = fail = 0
        with ThreadPoolExecutor(max_workers=WORKERS) as pool:
            futures = [pool.submit(speak, lang, tts, text) for text in pending]
            for n, fut in enumerate(as_completed(futures), 1):
                status = fut.result()
                if status == "ok":
                    ok += 1
                    counts[lang] += 1
                elif status != "skip":
                    fail += 1
                if n % 200 == 0 or n == len(futures):
                    write_status(counts, totals)
                    print(f"{lang} {n}/{len(futures)} ok {ok} fail {fail}", flush=True)
        # One more pass over anything the first wave missed.
        missed = [text for text in rows if not (dest(lang, text).exists() and dest(lang, text).stat().st_size > 200)]
        if missed:
            print(lang, "retry", len(missed), flush=True)
            with ThreadPoolExecutor(max_workers=8) as pool:
                for fut in as_completed([pool.submit(speak, lang, tts, text) for text in missed]):
                    if fut.result() == "ok":
                        counts[lang] += 1
        still = sum(1 for text in rows if not (dest(lang, text).exists() and dest(lang, text).stat().st_size > 200))
        counts[lang] = len(rows) - still
        write_status(counts, totals)
        print(lang, "done", counts[lang], "/", totals[lang], "missing", still, flush=True)
    write_status(counts, totals)
    print("finished", counts, flush=True)


if __name__ == "__main__":
    main()
