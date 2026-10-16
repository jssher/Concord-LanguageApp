#!/usr/bin/env python3
"""Paint picture plates that do not have a jpeg yet."""

from __future__ import annotations

import importlib.util
import json
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path("/workspace")
spec = importlib.util.spec_from_file_location("bps", ROOT / "scripts/build-picture-sets.py")
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

text = (ROOT / "src/data/picture-sets.ts").read_text()
plates = json.loads(text.split("=", 1)[1].rsplit(";", 1)[0])
todo = []
for plate in plates:
    dest = ROOT / "public/pictures" / f"{plate['id']}.jpg"
    if not dest.exists() or dest.stat().st_size < 10000:
        todo.append(plate)
print("todo", len(todo), flush=True)


def one(plate):
    try:
        return plate["id"], mod.generate(plate)
    except Exception as err:
        return plate["id"], "fail " + str(err)[:160]


ok = fail = 0
with ThreadPoolExecutor(max_workers=4) as pool:
    futures = [pool.submit(one, plate) for plate in todo]
    for n, fut in enumerate(as_completed(futures), 1):
        ident, status = fut.result()
        if status == "ok" or status == "skip":
            ok += 1
        else:
            fail += 1
            print("FAIL", ident, status, flush=True)
        if n % 10 == 0 or n == len(todo):
            print(f"{n}/{len(todo)} ok {ok} fail {fail}", flush=True)
print("done", ok, fail)
