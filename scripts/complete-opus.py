#!/usr/bin/env python3
"""Add the missing cards for one language from an OPUS-MT model.

Apache-2.0 models only. A line that is already translated stays.
A hand lexicon line stays. A card is written only when the model
returns the target language, not a copy of the English.
"""

from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

import ctranslate2
from huggingface_hub import snapshot_download
from transformers import MarianTokenizer

ROOT = Path("/workspace")
COURSE = ROOT / "public" / "course"
LEVELS = ["a1", "a2", "b1", "b2", "p"]
LEVEL_NAME = {"a1": "A1", "a2": "A2", "b1": "B1", "b2": "B2", "p": "P"}
CACHE = Path("/tmp/opus-fill")
SRC = CACHE / "src"
CT2 = CACHE / "ct2"

# lang, repo, prefix, script family
JOBS = [
    ("cy", "Helsinki-NLP/opus-mt-en-cy", "", "latn"),
    ("is", "Helsinki-NLP/opus-mt-en-is", "", "latn"),
    ("hr", "Helsinki-NLP/opus-mt-tc-base-en-sh", ">>hrv<<", "latn"),
    ("sr", "Helsinki-NLP/opus-mt-tc-base-en-sh", ">>srp_Cyrl<<", "cyrl"),
    ("mk", "Helsinki-NLP/opus-mt-en-mk", "", "cyrl"),
    ("mr", "Helsinki-NLP/opus-mt-en-mr", "", "deva"),
    ("gu", "Helsinki-NLP/opus-mt-en-inc", ">>guj<<", "gujr"),
    ("te", "Helsinki-NLP/opus-mt-en-dra", ">>tel<<", "telu"),
    ("ta", "Helsinki-NLP/opus-mt-en-dra", ">>tam<<", "taml"),
    ("ml", "Helsinki-NLP/opus-mt-en-ml", "", "mlym"),
    ("am", "Helsinki-NLP/opus-mt-en-afa", ">>amh<<", "ethi"),
    ("so", "Helsinki-NLP/opus-mt-en-afa", ">>som<<", "latn"),
    ("ha", "Helsinki-NLP/opus-mt-en-ha", "", "latn"),
    ("hy", "Helsinki-NLP/opus-mt-en-hy", "", "armn"),
    ("ln", "Helsinki-NLP/opus-mt-en-ln", "", "latn"),
    ("mg", "Helsinki-NLP/opus-mt-en-mg", "", "latn"),
    ("ber", "Helsinki-NLP/opus-mt-en-ber", "", "tfng"),
    ("ig", "Helsinki-NLP/opus-mt-en-ig", "", "latn"),
    ("la", "Helsinki-NLP/opus-mt-en-itc", ">>lat_Latn<<", "latn"),
    ("rm", "Helsinki-NLP/opus-mt-en-itc", ">>roh<<", "latn"),
    ("yo", "Helsinki-NLP/opus-mt-en-mul", ">>yor<<", "latn"),
    ("ka", "Helsinki-NLP/opus-mt-en-mul", ">>kat<<", "geor"),
    ("yue", "Helsinki-NLP/opus-mt-en-mul", ">>yue_Hant<<", "hant"),
]

SCRIPTS = {
    "latn": r"[A-Za-zÀ-ÖØ-öø-ÿĀ-ž]",
    "cyrl": r"[А-Яа-яЁёЈјЉљЊњЋћЂђҐґЄєІіЇї]",
    "deva": r"[\u0900-\u097F]",
    "gujr": r"[\u0A80-\u0AFF]",
    "telu": r"[\u0C00-\u0C7F]",
    "taml": r"[\u0B80-\u0BFF]",
    "mlym": r"[\u0D00-\u0D7F]",
    "ethi": r"[\u1200-\u137F]",
    "armn": r"[\u0530-\u058F]",
    "tfng": r"[\u2D30-\u2D7F]",
    "geor": r"[\u10A0-\u10FF]",
    "hant": r"[\u4E00-\u9FFF]",
    "grek": r"[\u0370-\u03FF\u1F00-\u1FFF]",
}

REPAIR = {
    "is": str.maketrans(
        {
            "đ": "ð", "Đ": "Ð", "ķ": "ó", "Ķ": "Ó", "ū": "þ", "Ū": "Þ",
            "ũ": "ý", "Ũ": "Ý", "õ": "ð", "ō": "ð", "Ō": "Ð", "ā": "á",
            "Ā": "Á", "Ą": "i", "ä": "á", "Ä": "Á", "ü": "þ",
        }
    ),
}

SAMPLES = [
    ("I", "I am here."),
    ("water", "The water is cold."),
    ("woman", "The woman is here."),
    ("house", "This is a house."),
    ("eat", "She eats bread."),
    ("child", "The child is small."),
    ("big", "The house is big."),
    ("two", "I have two books."),
    ("friend", "This is my friend."),
    ("name", "My name is Anna."),
]


def lemma(text: str) -> str:
    text = text.casefold().strip()
    text = re.sub(r"[^\w]+", " ", text, flags=re.UNICODE)
    return re.sub(r"\s+", " ", text).strip()


def clean(text: str, lang: str) -> str:
    text = text.replace("\u00a0", " ")
    text = re.sub(r">>[A-Za-z0-9_]+<<", " ", text)
    text = re.sub(r"\s+", " ", text).strip().strip(" \"'«»“”")
    table = REPAIR.get(lang)
    return text.translate(table) if table else text


def script_ok(family: str, text: str) -> bool:
    pattern = SCRIPTS[family]
    hits = len(re.findall(pattern, text))
    if family == "tfng":
        return hits >= 1 or len(re.findall(r"[A-Za-z]", text)) >= 2
    if family == "hant":
        return hits >= 1
    return hits >= 2


def too_english(source: str, target: str, family: str) -> bool:
    if family not in {"latn", "tfng"}:
        return False
    source_words = [w for w in re.findall(r"[A-Za-z]{4,}", source.lower())]
    target_words = re.findall(r"[A-Za-z]{4,}", target.lower())
    if len(target_words) < 4 or not source_words:
        return False
    pool = set(source_words)
    same = sum(1 for word in target_words if word in pool)
    return same / len(target_words) >= 0.6


def headword_ok(family: str, source: str, target: str) -> bool:
    if not acceptable(family, source, target, allow_same=True):
        return False
    source_n = len(source.split())
    target_n = len(target.split())
    limit = 1 if source_n == 1 else source_n + 1
    if target_n > limit or len(target) > 60:
        return False
    junk = ("account", "optional", "settings", "search", "invalid", "password", "download", "general", "file")
    low = target.casefold()
    return not any(word in low for word in junk)


def acceptable(family: str, source: str, target: str, *, allow_same: bool) -> bool:
    if len(target) < 1 or len(target) > max(280, len(source) * 6):
        return False
    if ">>" in target or "<<" in target:
        return False
    if not allow_same and lemma(target) == lemma(source):
        return False
    if too_english(source, target, family):
        return False
    return script_ok(family, target)


def english_rows() -> list[dict]:
    rows = []
    for level in LEVELS:
        rows.extend(json.loads((COURSE / "ready" / f"{level}.json").read_text()))
    return rows


def load_items(lang: str, level: str) -> dict:
    path = COURSE / "i18n" / lang / f"{level}.json"
    if not path.exists():
        return {}
    raw = json.loads(path.read_text())
    items = raw.get("items", {})
    return items if isinstance(items, dict) else {}


def lexicon(lang: str) -> dict:
    path = ROOT / "src/data/lexicon" / f"{lang}.json"
    if not path.exists():
        return {}
    raw = json.loads(path.read_text())
    entries = raw.get("entries", {})
    return entries if isinstance(entries, dict) else {}


def has_line(row: dict | None, field: str, english: str) -> bool:
    if not isinstance(row, dict):
        return False
    value = str(row.get(field) or "").strip()
    if not value:
        return False
    if field == "sentence" and lemma(value) == lemma(english):
        return False
    return True


def subprocess_convert(src: Path, ct2: Path) -> None:
    subprocess.check_call(
        [
            "ct2-transformers-converter",
            "--model",
            str(src),
            "--output_dir",
            str(ct2),
            "--quantization",
            "int8",
            "--force",
        ]
    )


def ensure_model(repo: str) -> tuple[Path, Path]:
    name = repo.split("/")[-1]
    src = SRC / name
    ct2 = CT2 / name
    if not (src / "config.json").exists():
        src.mkdir(parents=True, exist_ok=True)
        print("download", repo, flush=True)
        snapshot_download(repo, local_dir=str(src))
    if not (ct2 / "model.bin").exists():
        print("convert", name, flush=True)
        subprocess_convert(src, ct2)
    for blob in list(src.glob("*.bin")) + list(src.glob("*.safetensors")) + list(src.glob("*.h5")):
        blob.unlink(missing_ok=True)
    return src, ct2


class Engine:
    def __init__(self, repo: str, prefix: str, lang: str) -> None:
        src, ct2 = ensure_model(repo)
        self.prefix = prefix
        self.lang = lang
        self.tokenizer = MarianTokenizer.from_pretrained(src)
        threads = max(2, min(4, __import__("os").cpu_count() or 2))
        self.model = ctranslate2.Translator(str(ct2), device="cpu", inter_threads=threads, intra_threads=1)

    def many(self, texts: list[str]) -> list[str]:
        if not texts:
            return []
        prepared = [f"{self.prefix} {text}".strip() if self.prefix else text for text in texts]
        tokenized = []
        for text in prepared:
            ids = self.tokenizer.encode(text, add_special_tokens=True)
            tokenized.append(self.tokenizer.convert_ids_to_tokens(ids))
        batches = self.model.translate_batch(
            tokenized,
            beam_size=1,
            max_decoding_length=160,
            max_batch_size=48,
            batch_type="examples",
            replace_unknowns=True,
        )
        out = []
        for batch in batches:
            ids = self.tokenizer.convert_tokens_to_ids(batch.hypotheses[0])
            out.append(clean(self.tokenizer.decode(ids, skip_special_tokens=True), self.lang))
        return out


def translate_all(engine: Engine, texts: list[str]) -> list[str]:
    out: list[str] = []
    step = 48
    for start in range(0, len(texts), step):
        out.extend(engine.many(texts[start : start + step]))
        done = min(start + step, len(texts))
        if done == len(texts) or done % 480 == 0:
            print(f"  translated {done}/{len(texts)}", flush=True)
    return out


def apply_lex(row: dict, hand: dict | None) -> None:
    if not isinstance(hand, dict):
        return
    if str(hand.get("word") or "").strip():
        row["word"] = hand["word"]
    if str(hand.get("sentence") or "").strip():
        row["sentence"] = hand["sentence"]
    for key in ("article", "gender", "plural", "reading", "sentenceReading", "note"):
        if hand.get(key):
            row[key] = hand[key]


def run(lang: str, repo: str, prefix: str, family: str, write: bool, limit: int) -> dict:
    rows = english_rows()
    if limit:
        rows = rows[:limit]
    hands = lexicon(lang)
    by_level: dict[str, list[dict]] = {level: [] for level in LEVELS}
    for row in rows:
        by_level[str(row["level"]).lower()].append(row)
    existing = {level: load_items(lang, level) for level in LEVELS}

    need_word: list[tuple[str, str]] = []
    need_sent: list[tuple[str, str]] = []
    for row in rows:
        level = str(row["level"]).lower()
        old = existing[level].get(row["id"])
        hand = hands.get(row["id"])
        if isinstance(hand, dict) and str(hand.get("word") or "").strip():
            word_done = True
        else:
            word_done = has_line(old, "word", row["en"])
        if isinstance(hand, dict) and str(hand.get("sentence") or "").strip():
            sent_done = True
        else:
            sent_done = has_line(old, "sentence", row["sentence"])
        if not word_done:
            need_word.append((row["id"], row["en"]))
        if not sent_done:
            need_sent.append((row["id"], row["sentence"]))

    print(f"{lang} cards {len(rows)} need word {len(need_word)} need sentence {len(need_sent)}", flush=True)
    if not need_word and not need_sent:
        return {"lang": lang, "added": 0, "sentences": 0, "still_word": 0, "still_sent": 0}

    engine = Engine(repo, prefix, lang)
    word_map = {}
    sent_map = {}
    word_src = dict(need_word)
    sent_src = dict(need_sent)
    if need_word:
        print(f"{lang} words", flush=True)
        translated = translate_all(engine, [text for _, text in need_word])
        framed_ids = []
        framed_text = []
        for (key, src), text in zip(need_word, translated):
            text = text.strip(".,;:!?¡¿\"'")
            if headword_ok(family, src, text):
                word_map[key] = text
            elif len(src.split()) <= 3:
                framed_ids.append(key)
                framed_text.append(f"This is {src}.")
        if framed_text:
            print(f"{lang} framed words {len(framed_text)}", flush=True)
            for key, src, text in zip(framed_ids, [word_src[k] for k in framed_ids], translate_all(engine, framed_text)):
                # Keep the last one to three words. The frame adds a copula in front.
                parts = [part.strip(".,;:!?¡¿\"'()[]") for part in text.split()]
                parts = [part for part in parts if part]
                if len(parts) >= 2:
                    text = " ".join(parts[-min(3, max(1, len(src.split()))):])
                else:
                    text = " ".join(parts)
                if headword_ok(family, src, text) and key not in word_map:
                    word_map[key] = text
    if need_sent:
        print(f"{lang} sentences", flush=True)
        for (key, src), text in zip(need_sent, translate_all(engine, [text for _, text in need_sent])):
            if acceptable(family, src, text, allow_same=False):
                sent_map[key] = text

    added = 0
    filled = 0
    still_word = 0
    still_sent = 0
    samples = []
    for level in LEVELS:
        items: dict[str, dict] = {}
        for row in by_level[level]:
            old = existing[level].get(row["id"])
            item = dict(old) if isinstance(old, dict) else {"en": row["en"]}
            item["en"] = row["en"]
            if row["id"] in word_map and not has_line(old, "word", row["en"]):
                item["word"] = word_map[row["id"]]
            if row["id"] in sent_map and not has_line(old, "sentence", row["sentence"]):
                item["sentence"] = sent_map[row["id"]]
                filled += 1
            apply_lex(item, hands.get(row["id"]))
            if not str(item.get("word") or "").strip():
                still_word += 1
                continue
            if not isinstance(old, dict):
                added += 1
            if not str(item.get("sentence") or "").strip():
                still_sent += 1
            items[row["id"]] = item
            if len(samples) < 6 and row["id"] in sent_map:
                samples.append(f"{row['en']} | {item.get('word')} | {item.get('sentence')}")
        if write and items:
            out = COURSE / "i18n" / lang
            out.mkdir(parents=True, exist_ok=True)
            payload = {"lang": lang, "level": LEVEL_NAME[level], "items": items}
            tmp = out / f"{level}.json.tmp"
            tmp.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")))
            tmp.replace(out / f"{level}.json")
    stats = {
        "lang": lang,
        "added": added,
        "sentences": filled,
        "words": len(word_map),
        "still_word": still_word,
        "still_sent": still_sent,
        "samples": samples,
    }
    print(
        f"{lang} DONE added {added} new sentences {filled} words {len(word_map)} "
        f"still missing word {still_word} sentence {still_sent}",
        flush=True,
    )
    for line in samples:
        print("  ", line, flush=True)
    del engine
    return stats


def main() -> None:
    args = sys.argv[1:]
    write = "--write" in args
    limit = 0
    only: list[str] = []
    for arg in args:
        if arg.startswith("--limit="):
            limit = int(arg.split("=", 1)[1])
        elif arg.startswith("--only="):
            only = [part for part in arg.split("=", 1)[1].split(",") if part]
        elif arg != "--write":
            only.append(arg)
    wanted = set(only)
    engines_done: list[str] = []
    for lang, repo, prefix, family in JOBS:
        if wanted and lang not in wanted:
            continue
        run(lang, repo, prefix, family, write, limit)
        engines_done.append(lang)
    print("finished", ",".join(engines_done), flush=True)


if __name__ == "__main__":
    main()
