#!/usr/bin/env python3
"""Replace combinatorial junk plates with concrete themed nouns. Keep plate ids."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path("/workspace")
SETS = ROOT / "src/data/picture-sets.ts"
READY = ROOT / "public/course/ready/b2.json"

# id -> (title, section, candidate pool). First 25 not already pictured elsewhere win.
POOLS: dict[str, tuple[str, str, list[str]]] = {
    "ext-people-gestures-2": ("Gestures", "People", [
        "nod", "shrug", "clap", "hug", "salute", "fist bump", "facepalm", "high five",
        "beckon", "shush", "stomp", "somersault", "crossed arms", "hands on hips", "finger snap",
        "kneel", "tiptoe", "crouch", "lunge", "squat", "leap", "skip", "hop", "march",
        "cover mouth", "cover ears", "cover eyes", "scratch head", "rub chin", "pat back",
        "elbow bump", "cheek kiss", "blown kiss", "raised hand", "open palm", "clenched fist",
        "pointing finger", "stretching", "yawning", "winking", "sitting cross-legged", "deep bow",
        "curtsy", "handshake", "thumbs up", "wave", "applause", "cartwheel", "handstand",
    ]),
    "ext-people-feelings": ("Women's clothes", "Clothes", [
        "sundress", "maxi dress", "mini skirt", "pleated skirt", "pencil skirt", "wrap dress",
        "cocktail dress", "ball gown", "kitten heel", "stiletto", "ballet flat", "slingback",
        "espadrille", "wedge sandal", "platform shoe", "pantyhose", "camisole", "chemise",
        "slip dress", "negligee", "sari", "kimono", "lipstick", "mascara", "veil", "nightgown",
        "shawl", "leggings", "fishnet tights", "mule shoe", "peep-toe shoe", "clutch bag",
        "hair comb", "hair stick", "bindi", "dupatta", "choli", "lehenga", "anarkali",
    ]),
    "ext-people-feelings-2": ("Children's clothes", "Clothes", [
        "romper", "onesie", "overalls", "pinafore", "sneakers", "rain boot", "sun hat", "sandal",
        "sock", "school uniform", "hair bow", "snowsuit", "bib", "bootie", "cargo shorts",
        "tutu dress", "knee sock", "leg warmer", "sun suit", "footie pajama", "hoodie dress",
        "denim jacket", "puffer coat", "rain hat", "earmuff", "neck warmer", "wristband",
        "school tie", "plimsoll", "velcro shoe", "crawling pants", "sleep sack", "swaddle",
        "mittens clip", "bucket hat", "rash guard", "water shoe",
    ]),
    "ext-work-shop-jobs": ("The laundry room", "Home", [
        "clothespin", "fabric softener", "stain remover", "dryer sheet", "lint roller", "washboard",
        "laundry bag", "lint trap", "laundry soap", "peg bag", "ironing board cover", "spray starch",
        "mesh wash bag", "laundry ball", "sweater comb", "folding board", "laundry cart",
        "detergent pod", "bleach bottle", "steam iron", "pressing cloth", "drying horse",
        "clothes airer", "laundry tongs", "starch spray", "collar stay", "sweater stone",
        "pilling comb", "laundry marker", "sock clip", "skirt clip", "pants hanger",
    ]),
    "ext-city-traffic-signs": ("The hotel room", "Travel", [
        "slippers", "hair dryer", "shower cap", "sewing kit", "room service menu", "doorknob hanger",
        "ice bucket", "telephone", "alarm clock radio", "blackout curtain", "bed runner",
        "pillow menu", "minibar fridge", "safe box", "bathrobe belt", "vanity mirror",
        "coffee maker", "shoe mitt", "laundry list", "ice tongs", "water glass", "notepad pen",
        "luggage stool", "coat rail", "light switch", "bedside lamp", "wake-up card",
        "turn-down chocolate", "extra blanket", "spare pillow", "door viewer", "chain lock",
    ]),
    "ext-food-cooking-methods": ("Kitchen tools", "Food", [
        "cutting board", "rolling pin", "can opener", "slotted spoon", "potato masher",
        "kitchen shears", "skimmer", "box grater", "microplane", "bench scraper", "dough cutter",
        "pastry blender", "cookie cutter", "piping bag", "muffin tin", "loaf pan", "springform pan",
        "spider strainer", "fish spatula", "kitchen scale", "salad tongs", "melon baller",
        "apple corer", "channel knife", "pastry wheel", "dough docker", "bench brush",
        "flour dredger", "sugar duster", "offset spatula", "bowl scraper", "trussing needle",
    ]),
    "ext-food-cooking-methods-2": ("The doctor's office", "Health", [
        "exam table", "prescription pad", "sanitizer pump", "sharps container", "specimen cup",
        "defibrillator", "tongue blade", "exam glove", "height rod", "baby scale", "alcohol swab",
        "kidney basin", "emesis basin", "otoscope speculum", "paper sheet", "penlight",
        "tuning fork", "reflex hammer", "gauze roll", "cotton swab", "tape roll", "chart clip",
        "stool on wheels", "privacy curtain", "wall clock", "soap dispenser", "paper towel",
        "biohazard bin", "pulse oximeter", "digital thermometer", "patient gown", "glove box",
        "face shield", "shoe cover", "tourniquet", "bandage scissors", "call button", "tissue box",
        "intake form", "waiting chair", "coat hook", "step stool", "otoscope handle",
    ]),
    "ext-city-the-playground": ("Playground equipment", "City", [
        "swing", "slide", "seesaw", "merry-go-round", "climbing frame", "monkey bars",
        "balance beam", "spring rider", "tube slide", "carousel", "rope swing", "jungle gym",
        "basketball hoop", "soccer goal", "hopscotch", "play tunnel", "talk tube", "zip line",
        "rocking rider", "stepping logs", "balance disc", "climbing rope", "ring trek",
        "wobble board", "sand table", "water pump toy", "playhouse", "steering panel",
        "abacus panel", "xylophone panel", "spinner bowl", "net climber",
    ]),
    "ext-holidays-masks-and-costumes": ("Folk costume", "Clothes", [
        "poncho", "beret", "geta", "zori", "sporran", "tam", "ao dai", "thobe", "keffiyeh",
        "wimple", "coif", "wooden shoe", "obijime", "hakama", "yukata", "haori", "tabi",
        "waraji", "kasa hat", "jingasa", "hanbok ribbon", "norigae", "durag", "kufi",
        "agal", "bisht", "shemagh", "galabeya", "djellaba", "burnous", "chapan", "kalpak",
        "papakha", "ushanka", "kokoshnik", "sarafan", "rubakha",
    ]),
    "ext-holidays-masks-and-costumes-2": ("Eye care", "Health", [
        "eyeglasses", "eyeglass case", "contact solution", "eyepatch", "monocle", "bifocals",
        "reading glasses", "swim goggles", "retinoscope", "trial frame", "lens cloth", "nose pad",
        "temple tip", "phoropter", "slit lamp", "occluder", "pupilometer", "frame heater",
        "nose bridge", "spring hinge", "demo lens", "lens blank", "eyeglass cord", "pinhole occluder",
        "trial lens", "lensmeter", "pd ruler", "frame tray", "adjustment pliers", "suction cup",
    ]),
    "ext-home-the-window": ("Window parts", "Home", [
        "windowsill", "window crank", "mullion", "weatherstrip", "roller blind", "venetian blind",
        "casement", "awning window", "bay window", "window well", "storm window", "door knocker",
        "sash lock", "sash cord", "sash weight", "glazing bar", "putty bead", "window stop",
        "blind wand", "blind valance", "curtain heading", "eyelet ring", "curtain pole",
        "bracket", "finial", "tieback hook", "blackout lining", "net curtain", "pelmet",
        "window restrictor", "trickle vent", "sill nose",
    ]),
    "ext-city-the-bridge": ("Bridge parts", "City", [
        "abutment", "pylon", "suspender", "parapet", "expansion joint", "girder", "anchorage",
        "spandrel", "caisson", "suspension cable", "lamp standard", "approach span", "bridge bearing",
        "wing wall", "pier cap", "cross beam", "stringer", "deck plate", "wearing course",
        "drainage spout", "inspection gantry", "cable band", "saddle", "anchor bolt",
        "bridge joint", "parapet rail", "crash barrier", "footway", "kerb", "balustrade",
    ]),
}


def article(word: str) -> str:
    return "an" if word[:1].lower() in "aeiou" else "a"


def slug(text: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return s or "word"


def main() -> None:
    text = SETS.read_text()
    data = json.loads(text.split("=", 1)[1].rsplit(";", 1)[0])
    by_id = {plate["id"]: plate for plate in data}
    keep_words = set()
    for plate in data:
        if plate["id"] in POOLS:
            continue
        for word in plate["words"]:
            keep_words.add(word.lower())
    base = (ROOT / "src/data/pictures.ts").read_text()
    for word in re.findall(r'\ben:\s*"([^"]+)"', base):
        keep_words.add(word.lower())

    course = {}
    for level in ("a1", "a2", "b1", "b2"):
        for row in json.loads((ROOT / "public/course/ready" / f"{level}.json").read_text()):
            en = str(row.get("en", "")).strip().lower()
            if en:
                course[en] = row.get("id")

    used = set(keep_words)
    chosen: dict[str, list[str]] = {}
    for ident, (title, section, pool) in POOLS.items():
        picked = []
        for word in pool:
            key = word.strip().lower()
            if not key or key in used or key in picked:
                continue
            picked.append(word.strip())
            if len(picked) == 25:
                break
        if len(picked) < 25:
            raise SystemExit(f"{ident} only {len(picked)}: {picked}")
        for word in picked:
            used.add(word.lower())
        chosen[ident] = picked
        plate = by_id[ident]
        plate["title"] = title
        plate["section"] = section
        plate["blurb"] = f"{title}. Tap one."
        plate["words"] = picked
        print(ident, title)
        print(" ", ", ".join(picked))

    SETS.write_text(
        "/** Themed plates. Words already in the course are linked; new words were added to the course. */\n"
        "export const PICTURE_SETS: { id: string; title: string; section: string; blurb: string; words: string[] }[] = \n"
        + json.dumps(data, ensure_ascii=False, indent=2)
        + ";\n"
    )

    raw = json.loads(READY.read_text())
    nums = [int(row["id"][4:]) for row in raw if str(row.get("id", "")).startswith("pic-") and str(row["id"][4:]).isdigit()]
    n = max(nums) + 1 if nums else 10001
    new_rows = []
    linked = 0
    for words in chosen.values():
        for word in words:
            key = word.lower()
            if key in course:
                linked += 1
                continue
            ident = f"pic-{n}"
            n += 1
            row = {
                "id": ident,
                "level": "B2",
                "group": "90 Picture dictionary",
                "topic": "pictures",
                "kind": "word",
                "pos": "noun",
                "en": word,
                "sentence": f"This is {article(word)} {word}.",
                "image": slug(word),
            }
            new_rows.append(row)
            course[key] = ident
    raw.extend(new_rows)
    READY.write_text(json.dumps(raw, ensure_ascii=False, separators=(",", ":")) + "\n")
    Path("/tmp/pic_fix_rows.json").write_text(json.dumps(new_rows, ensure_ascii=False))
    print("linked existing", linked, "new rows", len(new_rows), "next", n)


if __name__ == "__main__":
    main()
