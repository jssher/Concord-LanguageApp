#!/usr/bin/env python3
"""Record every English and German course word and sentence with Grok TTS."""

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
VOICES = ["eve", "leo"]
FORMAT = {"codec": "mp3", "sample_rate": 16000, "bit_rate": 32000}


def texts() -> dict[str, list[str]]:
    found: dict[str, set[str]] = {"en": set(), "de": set()}
    for level in ("a1", "a2", "b1", "b2"):
        rows = json.loads((COURSE / "ready" / f"{level}.json").read_text())
        for row in rows:
            for key in ("en", "sentence"):
                text = str(row.get(key) or "").strip()
                if text:
                    found["en"].add(text)
        pack = json.loads((COURSE / "i18n" / "de" / f"{level}.json").read_text())
        items = pack.get("items", {})
        for entry in items.values():
            if not isinstance(entry, dict):
                continue
            for key in ("word", "sentence"):
                text = str(entry.get(key) or "").strip()
                if text:
                    found["de"].add(text)
    return {lang: sorted(values) for lang, values in found.items()}


def dest(voice: str, lang: str, text: str) -> Path:
    digest = hashlib.sha1(text.encode()).hexdigest()
    return ROOT / voice / lang / digest[:2] / f"{digest}.mp3"


def speak(voice: str, lang: str, text: str) -> str:
    file = dest(voice, lang, text)
    if file.exists() and file.stat().st_size > 200:
        return "skip"
    body = json.dumps(
        {"text": text, "voice_id": voice, "language": lang, "output_format": FORMAT}
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
            file.write_bytes(data)
            return "ok"
        except Exception as err:
            last = str(err)[:160]
            time.sleep(1 + attempt)
    return f"fail {last}"


def write_status(counts: dict[str, dict[str, int]], totals: dict[str, int]) -> None:
    ROOT.mkdir(parents=True, exist_ok=True)
    (ROOT / "status.json").write_text(
        json.dumps({"voices": counts, "totals": totals}, separators=(",", ":"))
    )


def main() -> None:
    lines = texts()
    totals = {lang: len(rows) for lang, rows in lines.items()}
    print("totals", totals, flush=True)
    counts = {voice: {"en": 0, "de": 0} for voice in VOICES}
    for voice in VOICES:
        for lang, rows in lines.items():
            pending = [(lang, text) for text in rows if not (dest(voice, lang, text).exists() and dest(voice, lang, text).stat().st_size > 200)]
            counts[voice][lang] = len(rows) - len(pending)
            print(voice, lang, "todo", len(pending), "have", counts[voice][lang], flush=True)
            write_status(counts, totals)
            ok = fail = 0
            with ThreadPoolExecutor(max_workers=16) as pool:
                futures = [pool.submit(speak, voice, lang, text) for lang, text in pending]
                for n, fut in enumerate(as_completed(futures), 1):
                    status = fut.result()
                    if status == "ok":
                        ok += 1
                        counts[voice][lang] += 1
                    elif status != "skip":
                        fail += 1
                    if n % 100 == 0 or n == len(futures):
                        write_status(counts, totals)
                        print(f"{voice} {lang} {n}/{len(futures)} ok {ok} fail {fail}", flush=True)
    write_status(counts, totals)
    print("done", counts, flush=True)


if __name__ == "__main__":
    main()
