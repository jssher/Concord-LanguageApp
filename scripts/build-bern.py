"""Turn the Zürich cards into city Bern, same English sentence by sentence.

Closed-class words and the regular Zürich/Bern differences only.
Words that are the same in both cities stay as they are.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MAP = {
    "ich": "i",
    "de": "dr",
    "nöd": "nid",
    "daa": "da",
    "gsee": "gseh",
    "gseet": "gseht",
    "ghööre": "ghöre",
    "ghöör": "ghör",
    "ghöört": "ghört",
    "schlaafe": "schlafe",
    "schlaaft": "schlaft",
    "lauffe": "loufe",
    "laufft": "louft",
    "lauft": "louft",
    "choo": "cho",
    "chlii": "chly",
    "chli": "chly",
    "chliiner": "chlyner",
    "grooss": "gross",
    "zwäi": "zwöi",
    "gaat": "geit",
    "wääg": "wäg",
    "broot": "brot",
    "root": "rot",
    "äin": "eine",
    "äis": "eis",
    "min": "mi",
    "dää": "dä",
    "maa": "ma",
    "mane": "manne",
    "tüür": "türe",
    "ässed": "ässe",
    "sitzed": "sitze",
    "gönd": "göö",
}


def convert_word(word: str, nxt: str) -> str:
    match = re.match(r"^([^A-Za-zÄÖÜäöü]*)([A-Za-zÄÖÜäöü]+)([^A-Za-zÄÖÜäöü]*)$", word)
    if not match:
        return word
    pre, body, post = match.groups()
    low = body.lower()
    nxt_clean = re.sub(r"^[^A-Za-zÄÖÜäöü]+", "", nxt)
    if low == "s" and nxt_clean[:1].isupper():
        repl = "Ds" if body[:1].isupper() else "ds"
    elif low in MAP:
        repl = MAP[low]
        if body[:1].isupper():
            repl = repl[:1].upper() + repl[1:]
    else:
        repl = body
    return pre + repl + post


def convert(text: str) -> str:
    if not isinstance(text, str) or not text:
        return text
    parts = text.split(" ")
    out = []
    for index, part in enumerate(parts):
        nxt = parts[index + 1] if index + 1 < len(parts) else ""
        out.append(convert_word(part, nxt))
    return " ".join(out)


def convert_entry(entry: dict) -> dict:
    out = dict(entry)
    for key in ("word", "sentence", "plural", "feminine", "masculine", "neuter", "note"):
        if key in out and isinstance(out[key], str):
            out[key] = convert(out[key])
    if out.get("article") == "de":
        out["article"] = "dr"
    elif out.get("article") == "s":
        out["article"] = "ds"
    return out


def main() -> None:
    lex = json.loads((ROOT / "src/data/lexicon/gsw.json").read_text())
    lex["entries"] = {key: convert_entry(value) for key, value in lex["entries"].items()}
    lex["lines"] = {key: convert(value) for key, value in lex.get("lines", {}).items()}
    target = ROOT / "src/data/lexicon/gsw-be.json"
    target.write_text(json.dumps(lex, ensure_ascii=False, indent=2) + "\n")

    pack = json.loads((ROOT / "public/course/i18n/gsw/a1.json").read_text())
    items = {}
    for key, row in pack["items"].items():
        items[key] = convert_entry(row)
    out = {"lang": "gsw-be", "level": "A1", "items": items}
    dest = ROOT / "public/course/i18n/gsw-be"
    dest.mkdir(parents=True, exist_ok=True)
    (dest / "a1.json").write_text(json.dumps(out, ensure_ascii=False, separators=(",", ":")))
    print("lexicon", len(lex["entries"]), "pack", len(items))
    print(lex["entries"]["i"]["sentence"])
    print(lex["entries"]["man"]["sentence"])
    print(lex["entries"]["child"]["sentence"])
    print(lex["entries"]["house"]["sentence"])
    print(lex["entries"]["see"]["sentence"])
    print(lex["entries"]["walk"]["sentence"])


if __name__ == "__main__":
    main()
