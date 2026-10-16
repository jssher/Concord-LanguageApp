#!/usr/bin/env python3
"""Merge translated picture rows into each language pack."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path("/workspace")
ROWS = {}
for path in (Path("/tmp/pic_new_rows.json"), Path("/tmp/pic_fix_rows.json")):
    if path.exists():
        for row in json.loads(path.read_text()):
            ROWS[row["id"]] = row
sources = [Path("/tmp/tr_rows.jsonl"), Path("/tmp/tr_fix_rows.jsonl"), Path("/tmp/tr_echo.jsonl")]
sources = [path for path in sources if path.exists()]
by_lang: dict[str, dict[str, dict]] = {}
bad = 0
for src in sources:
    for line in src.read_text().splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            item = json.loads(line)
        except json.JSONDecodeError:
            bad += 1
            continue
        lang = item.get("lang")
        ident = item.get("id")
        if not lang or ident not in ROWS or not item.get("word"):
            continue
        entry = {"en": ROWS[ident]["en"], "word": item["word"], "sentence": item.get("sentence") or ""}
        if item.get("reading"):
            entry["reading"] = item["reading"]
        if item.get("sentenceReading"):
            entry["sentenceReading"] = item["sentenceReading"]
        by_lang.setdefault(lang, {})[ident] = entry

updated = 0
for lang, extra in by_lang.items():
    path = ROOT / "public/course/i18n" / lang / "b2.json"
    if not path.exists():
        continue
    pack = json.loads(path.read_text())
    items = pack.setdefault("items", {})
    before = len(items)
    for ident, entry in extra.items():
        items[ident] = entry
    if len(items) != before or True:
        path.write_text(json.dumps(pack, ensure_ascii=False, separators=(",", ":")) + "\n")
        updated += 1
need = len(ROWS)
print("bad lines", bad, "langs", len(by_lang), "files", updated)
for lang, extra in sorted(by_lang.items()):
    if len(extra) < need:
        print(f"  {lang} {len(extra)}/{need}")
print("full", sum(1 for extra in by_lang.values() if len(extra) >= need), "/", len(by_lang))
