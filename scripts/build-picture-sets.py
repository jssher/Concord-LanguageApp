#!/usr/bin/env python3
"""Build 120 picture-dictionary plates (25 words each) from course nouns that are not already pictured, then paint each plate."""

from __future__ import annotations

import base64
import json
import os
import re
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path("/workspace")
OUT_DIR = ROOT / "public" / "pictures"
DATA = ROOT / "src" / "data" / "picture-sets.ts"
PLATE = 25

ALLOW = {
    "60 World foods": "Food",
    "87 Food and drink": "Food",
    "18 Meals out": "Food",
    "06 Food out": "Food",
    "50 Market produce": "Food",
    "51 Kitchen tools": "Home",
    "37 In the kitchen": "Home",
    "52 Around the house": "Home",
    "58 More objects": "Home",
    "86 Home objects": "Home",
    "05 Home life": "Home",
    "03 Shopping": "Home",
    "08 Hobbies": "Home",
    "11 Technology": "Home",
    "53 Clothes detail": "Clothes",
    "32 Cloth": "Clothes",
    "29 Instruments": "Music",
    "14 Arts": "Making",
    "30 Making": "Making",
    "36 Pictures": "Making",
    "34 Stage and gallery": "Making",
    "09 Culture": "Making",
    "61 Birds and animals": "Nature",
    "59 Animals and plants": "Nature",
    "44 Plants": "Nature",
    "31 Garden": "Nature",
    "55 Outdoors": "Nature",
    "11 Environment": "Nature",
    "42 Earth science": "Nature",
    "34 Land and stone": "Places",
    "35 Buildings": "Places",
    "62 Sky and weather": "Sky",
    "30 The workshop": "Workshop",
    "31 The lab": "Workshop",
    "40 Small parts": "Workshop",
    "33 Useful jobs": "Work",
    "34 On the water": "Travel",
    "39 On the road": "Travel",
    "32 Care": "The body",
    "83 Body and health": "The body",
}

# Words a picture cannot teach. Applied inside the groups above.
DROP = {
    "rinse", "stale", "cooked", "transplant", "hardening off", "realism", "composition",
    "methodology", "variable", "dataset", "finding", "outcome", "analysis", "correlation",
    "causation", "salary band", "profit margin", "diversification", "version control",
    "commit message", "merge conflict", "code review", "user story", "acceptance criterion",
    "usability test", "heuristic", "persona", "journey map", "retention", "churn",
    "postmortem", "runbook", "failover", "encryption key", "access log", "sandbox",
    "redshift", "parallax", "photometry", "spectroscopy", "occultation", "transit",
    "eccentricity", "event horizon", "accretion disk", "copyright", "negligence",
    "algorithm", "interface", "encryption", "latency", "format", "code", "developer",
    "ritual", "masterpiece", "author", "identity", "tradition", "custom", "culture",
    "community", "society", "generation", "neighborhood", "discount", "bargain", "refund",
    "sale", "offer", "brand", "receipt", "tip", "menu", "portion", "beverage",
    "delay", "boarding", "customs", "visa", "reservation", "journey", "destination",
    "remit", "milestone", "deliverable", "stakeholder", "hierarchy", "delegation",
    "reforestation", "offset", "runoff", "ozone",
    "perihelion", "aphelion", "perigee", "apogee", "unison", "octave", "semitone", "arpeggio",
    "loyalty", "reward", "variety", "display", "landlord", "tenant", "rent", "heating",
    "impact", "advisory", "outlook", "hue", "tint", "gesture", "satire", "parody",
    "choreography", "healing brush", "content aware", "panorama", "hdr", "birth", "health",
    "period", "clay", "foil",
}

DROP_RE = re.compile(
    r"(tion|sion|ness|ism|ity|ance|ence|logy|nomy|ship|hood|cracy|ization|osis|itis|ment|ivity|ality)$",
    re.I,
)
KEEP_SUFFIX = {
    "pigment", "equipment", "basement", "apartment", "instrument", "apartment",
    "ointment", "apartment", "garment", "raiment", "parchment", "compartment",
    "department", "filament", "ligament", "tenement", "nutriment", "condiment",
    "sediment", "pediment", "element", "monument", "document",
}

# Extra physical nouns pulled from the rest of the course when a group is not in ALLOW.
EXTRA_OK = re.compile(
    r"^(balloon|bookcase|bookshelf|cassette|chimpanzee|cigarette|cooker|cooler|crown|drugstore|"
    r"bookcase|barrel|basin|brass|bullet|cage|carton|cashpoint|cattle|chariot|circus|cod|"
    r"coffin|courgette|crossroads|diaper|disk|dustbin|firework|gallon|ginger|goalkeeper|"
    r"gown|grave|hairdryer|handkerchief|hut|ivory|jade|loaf|lodge|loudspeaker|paddle|"
    r"parachute|pipe|popcorn|pullover|pump|rail|rainforest|saucepan|saucer|safari|"
    r"handball|handkerchief|noticeboard|photocopy|pole|rubber|saucepan|seawater|"
    r"diaper|fax|gown|graphics|hut|isle|ivory|jade|loaf|loudspeaker|nap|paddle|"
    r"parachute|pipe|popcorn|pullover|pump|saucepan|saucer|handkerchief|hairdryer|"
    r"dustbin|firework|courgette|barrel|basin|cage|carton|chimpanzee|cigarette|"
    r"bookcase|bookshelf|balloon|cooker|cooler|crown|cattle|coffin|circus|chariot)$",
    re.I,
)


def pictured() -> set[str]:
    text = (ROOT / "src/data/pictures.ts").read_text()
    words = set()
    # Spot labels only: en: "..." and grid string literals inside the PLATES array.
    body = text.split("export const PLATES", 1)[-1]
    for word in re.findall(r'en:\s*"([^"]+)"', body):
        words.add(word.strip().lower())
    for word in re.findall(r'"([^"]+)"', body):
        if len(word) < 48 and not word.startswith("/") and " " not in word or len(word) < 32:
            if word[:1].islower() or word[:1].isupper():
                words.add(word.strip().lower())
    # Blurbs are sentences. Drop anything with a period.
    return {w for w in words if "." not in w and w not in {"rooms", "out", "work", "the body", "plates", "food", "travel", "trades", "outside", "play", "music"}}


def course_words() -> list[dict]:
    rows = []
    seen = set()
    for level in ("a1", "a2", "b1", "b2"):
        data = json.loads((ROOT / "public/course/ready" / f"{level}.json").read_text())
        for row in data:
            if row.get("kind") not in (None, "word"):
                continue
            if row.get("pos") != "noun":
                continue
            en = row["en"].strip()
            key = en.lower()
            if key in seen:
                continue
            seen.add(key)
            rows.append(row)
    return rows


def concrete(en: str) -> bool:
    key = en.lower()
    if key in DROP:
        return False
    if key in KEEP_SUFFIX:
        return True
    if DROP_RE.search(key):
        return False
    if any(ch.isdigit() for ch in key):
        return False
    return True


def slug(text: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return s or "plate"


def build_plates() -> list[dict]:
    known = pictured()
    # Also drop anything already named in an earlier picture-sets file.
    buckets: dict[str, list[str]] = {}
    order: list[str] = []
    for row in course_words():
        en = row["en"].strip()
        key = en.lower()
        if key in known or not concrete(en):
            continue
        group = row["group"]
        if group not in ALLOW and not EXTRA_OK.match(en):
            continue
        section = ALLOW.get(group, "Home")
        name = group.split(" ", 1)[-1] if group[:1].isdigit() else group
        label = f"{section}|{name}"
        if label not in buckets:
            buckets[label] = []
            order.append(label)
        if key not in {w.lower() for w in buckets[label]}:
            buckets[label].append(en)
    plates = []
    used: set[str] = set()
    leftover: dict[str, list[str]] = {}

    def emit(section: str, name: str, words: list[str]) -> None:
        fresh = []
        for word in words:
            key = word.lower()
            if key in used:
                continue
            used.add(key)
            fresh.append(word)
        chunks = [fresh[i : i + PLATE] for i in range(0, len(fresh), PLATE)]
        if chunks and len(chunks[-1]) < PLATE:
            leftover.setdefault(section, []).extend(chunks.pop())
            for word in leftover[section][-len(chunks[-1]) if False else 0 :]:
                pass
            # the short tail was appended; remove those lemmas from used so the section plate can own them
            tail = leftover[section][- (PLATE if False else len(fresh) % PLATE or 0) :]
            # recompute tail cleanly
        many = len(chunks) > 1
        for index, chunk in enumerate(chunks, start=1):
            title = f"{name} {index}" if many else name
            plates.append({
                "id": "set-" + slug(f"{section}-{title}"),
                "title": title[:1].upper() + title[1:],
                "section": section,
                "blurb": "Twenty-five things. Tap one.",
                "words": chunk,
            })

    # The emit helper above is replaced below. Keep this function simple.
    plates.clear()
    used.clear()
    pools: dict[str, list[tuple[str, list[str]]]] = {}
    def add_bucket(section: str, name: str, words: list[str]) -> None:
        pools.setdefault(section, []).append((name, words))

    for label in order:
        section, name = label.split("|", 1)
        add_bucket(section, name, buckets[label])

    extra_path = ROOT / "src" / "data" / "picture-extra.json"
    if extra_path.exists():
        group_of = {row["en"].strip().lower(): row["group"] for row in course_words()}
        extra_groups: dict[str, list[str]] = {}
        for en in json.loads(extra_path.read_text()):
            key = en.strip().lower()
            if not key or key in known or not concrete(en):
                continue
            group = group_of.get(key, "More things")
            extra_groups.setdefault(group, [])
            if key not in {w.lower() for w in extra_groups[group]}:
                extra_groups[group].append(en.strip())
        for group, words in extra_groups.items():
            name = group.split(" ", 1)[-1] if group[:1].isdigit() else group
            add_bucket("More", name, words)

    remain: dict[str, list[str]] = {}
    for section, groups in pools.items():
        for name, words in groups:
            fresh = []
            for word in words:
                key = word.lower()
                if key in used or key in known:
                    continue
                used.add(key)
                fresh.append(word)
            full = len(fresh) // PLATE
            for index in range(full):
                chunk = fresh[index * PLATE : (index + 1) * PLATE]
                title = f"{name} {index + 1}" if full > 1 or len(fresh) % PLATE else name
                if full == 1 and len(fresh) % PLATE:
                    title = name
                plates.append({
                    "id": "set-" + slug(f"{section}-{title}-{index+1}"),
                    "title": title[:1].upper() + title[1:],
                    "section": section,
                    "blurb": "Twenty-five things. Tap one.",
                    "words": chunk,
                })
            tail = fresh[full * PLATE :]
            if tail:
                remain.setdefault(section, []).extend(tail)
                for word in tail:
                    used.discard(word.lower())
        extra = []
        for word in remain.get(section, []):
            key = word.lower()
            if key in used:
                continue
            used.add(key)
            extra.append(word)
        full = len(extra) // PLATE
        for index in range(full):
            chunk = extra[index * PLATE : (index + 1) * PLATE]
            title = f"More {section.lower()} {index + 1}" if full > 1 else f"More {section.lower()}"
            plates.append({
                "id": "set-" + slug(f"{section}-more-{index+1}"),
                "title": title[:1].upper() + title[1:],
                "section": section,
                "blurb": "Twenty-five things. Tap one.",
                "words": chunk,
            })

    seen_id: set[str] = set()
    for plate in plates:
        ident = plate["id"]
        n = 2
        while ident in seen_id:
            ident = f"{plate['id']}-{n}"
            n += 1
        plate["id"] = ident
        seen_id.add(ident)
    return plates


def prompt_for(words: list[str]) -> str:
    rows = [words[i : i + 5] for i in range(0, 25, 5)]
    while len(rows) < 5:
        rows.append([])
    lines = []
    for i, row in enumerate(rows, start=1):
        if not row:
            continue
        lines.append(f"Row {i}: " + ", ".join(f"one {w}" for w in row))
    return (
        "A square picture-dictionary plate, soft realistic painted illustration, like a printed children's encyclopedia. "
        "Exactly 5 equal columns and 5 equal rows. The four gutters and the outer edges are pure white, and the gutters fall at one fifth, two fifths, three fifths, and four fifths of the width and of the height. "
        "Equal white gutters between cells. No text, no letters, no numbers, no captions, no watermark. "
        "Each cell holds one object only, centered, similar scale, fully inside the cell. "
        "Left to right, top to bottom. " + " ".join(lines)
    )


def generate(plate: dict) -> str:
    dest = OUT_DIR / f"{plate['id']}.jpg"
    if dest.exists() and dest.stat().st_size > 10000:
        return "skip"
    key = os.environ["XAI_API_KEY"]
    body = {
        "model": "grok-imagine-image-2.0",
        "prompt": prompt_for(plate["words"][:25]),
        "quality": "low",
        "aspect_ratio": "1:1",
        "n": 1,
        "response_format": "b64_json",
    }
    req = urllib.request.Request(
        "https://api.x.ai/v1/images/generations",
        data=json.dumps(body).encode(),
        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
    )
    last = ""
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=180) as res:
                data = json.loads(res.read().decode())
            blob = base64.b64decode(data["data"][0]["b64_json"])
            dest.write_bytes(blob)
            return "ok"
        except Exception as err:
            last = str(err)[:180]
            time.sleep(2 + attempt * 3)
    return f"fail {last}"


def write_data(plates: list[dict]) -> None:
    payload = []
    for plate in plates:
        image = OUT_DIR / f"{plate['id']}.jpg"
        if not image.exists() or image.stat().st_size < 10000:
            continue
        payload.append({k: plate[k] for k in ("id", "title", "section", "blurb", "words")})
    lines = [
        "/** Painted plates for words that were already in the course and not yet pictured. */",
        "export const PICTURE_SETS: { id: string; title: string; section: string; blurb: string; words: string[] }[] = ",
        json.dumps(payload, ensure_ascii=False, indent=2),
        ";",
        "",
    ]
    DATA.write_text("\n".join(lines))


def main() -> None:
    plates = build_plates()
    words = sum(len(p["words"]) for p in plates)
    print(f"plates {len(plates)} words {words}")
    # Pad or trim toward 3000 by keeping the longest plates first if we overshoot.
    if len(plates) > 120:
        plates = plates[:120]
        print(f"trimmed plates {len(plates)} words {sum(len(p['words']) for p in plates)}")
    from collections import Counter
    print(Counter(p["section"] for p in plates))
    for plate in plates:
        print(f"- {plate['section']} | {plate['title']} ({len(plate['words'])}) {', '.join(plate['words'][:4])}")
    if os.environ.get("SELECT_ONLY"):
        return
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    done = 0
    with ThreadPoolExecutor(max_workers=5) as pool:
        futures = {pool.submit(generate, plate): plate for plate in plates}
        for fut in as_completed(futures):
            plate = futures[fut]
            status = fut.result()
            done += 1
            print(f"[{done}/{len(plates)}] {plate['id']} {status}", flush=True)
    write_data(plates)
    ready = json.loads(DATA.read_text().split("=", 1)[1].rsplit(";", 1)[0])
    print("wrote", len(ready), "plates", sum(len(p["words"]) for p in ready), "words")


if __name__ == "__main__":
    main()
