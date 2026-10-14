"""Check translation packs against public/course/src/<level>.json.

Usage: python3 scripts/check-i18n.py a1
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
level = (sys.argv[1] if len(sys.argv) > 1 else "a1").lower()
source = json.loads((ROOT / "public/course/src" / f"{level}.json").read_text())
need = {row["id"]: row["en"] for row in source}
base = ROOT / "public/course/i18n"
if not base.exists():
    print("no packs")
    raise SystemExit(1)
bad = 0
for path in sorted(base.glob(f"*/{level}.json")):
    pack = json.loads(path.read_text())
    items = pack.get("items", {})
    missing = [i for i in need if i not in items]
    extra = [i for i in items if i not in need]
    empty = [i for i, row in items.items() if not str(row.get("word", "")).strip() or not str(row.get("sentence", "")).strip()]
    mismatch = [i for i, row in items.items() if i in need and str(row.get("en", "")).strip().lower() != need[i].strip().lower()]
    gender = [i for i, row in items.items() if row.get("gender") not in (None, "", "m", "f", "n", "c")]
    status = "OK" if not (missing or extra or empty or mismatch or gender) else "BAD"
    if status != "OK":
        bad += 1
    print(f"{status} {path.parent.name}: {len(items)} missing {len(missing)} extra {len(extra)} empty {len(empty)} en {len(mismatch)} gender {len(gender)}")
print("bad", bad)
raise SystemExit(1 if bad else 0)
