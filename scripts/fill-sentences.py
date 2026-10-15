#!/usr/bin/env python3
"""Fill empty course sentences from the English line.

Models are OPUS-MT (Apache-2.0, and CC-BY-4.0 for the South Slavic model).
A sentence that is already written is kept. The hand lexicon is not edited.
A line is skipped when the model returns English, the wrong script, or nothing.
"""

from __future__ import annotations

import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

import ctranslate2
from huggingface_hub import snapshot_download
from transformers import MarianTokenizer

ROOT = Path("/workspace")
COURSE = ROOT / "public" / "course"
LEVELS = ["a1", "a2", "b1", "b2", "p"]
CACHE = Path("/tmp/opus-fill")
SRC = CACHE / "src"
CT2 = CACHE / "ct2"

# Welsh, Marathi, Gujarati, Tamil, and Malayalam were sampled and the open model
# changed the meaning too often, so they are not filled from it.
# Egyptian, Hijazi, and Maghrebi are filled by fill-arabic-dialects.py.
JOBS = [
    ("is", "Helsinki-NLP/opus-mt-en-is", ""),
    ("hr", "Helsinki-NLP/opus-mt-tc-base-en-sh", ">>hrv<<"),
    ("sr", "Helsinki-NLP/opus-mt-tc-base-en-sh", ">>srp_Cyrl<<"),
    ("mk", "Helsinki-NLP/opus-mt-en-mk", ""),
    ("mr", "Helsinki-NLP/opus-mt-en-inc", ">>mar<<"),
    ("te", "Helsinki-NLP/opus-mt-en-dra", ">>tel<<"),
    ("am", "Helsinki-NLP/opus-mt-en-afa", ">>amh<<"),
    ("so", "Helsinki-NLP/opus-mt-en-afa", ">>som<<"),
    ("ha", "Helsinki-NLP/opus-mt-en-ha", ""),
    ("hy", "Helsinki-NLP/opus-mt-en-hy", ""),
    ("ln", "Helsinki-NLP/opus-mt-en-ln", ""),
    ("mg", "Helsinki-NLP/opus-mt-en-mg", ""),
    ("ber", "Helsinki-NLP/opus-mt-en-ber", ""),
]

# Some 2020 OPUS vocabularies stored Latin letters under the wrong code point.
# These letters are not part of the target language, so the swap is safe.
REPAIR = {
    "is": str.maketrans(
        {
            "đ": "ð",
            "Đ": "Ð",
            "ķ": "ó",
            "Ķ": "Ó",
            "ū": "þ",
            "Ū": "Þ",
            "ũ": "ý",
            "Ũ": "Ý",
            "õ": "ð",
            "ō": "ð",
            "Ō": "Ð",
            "ā": "á",
            "Ā": "Á",
            "Ą": "i",
            "ä": "á",
            "Ä": "Á",
            "ü": "þ",
        }
    ),
}

SCRIPTS = {
    "sr": r"[А-Яа-яЁёЈјЉљЊњЋћЂђ]",
    "mk": r"[А-Яа-яЁёЈјЉљЊњ]",
    "mr": r"[\u0900-\u097F]",
    "gu": r"[\u0A80-\u0AFF]",
    "bn": r"[\u0980-\u09FF]",
    "te": r"[\u0C00-\u0C7F]",
    "ta": r"[\u0B80-\u0BFF]",
    "ml": r"[\u0D00-\u0D7F]",
    "ar-eg": r"[\u0600-\u06FF]",
    "ar-ma": r"[\u0600-\u06FF]",
    "ar-sa": r"[\u0600-\u06FF]",
    "am": r"[\u1200-\u137F]",
    "so": r"[A-Za-z]",
    "hy": r"[\u0530-\u058F]",
    "yue": r"[\u4E00-\u9FFF]",
    "ber": r"[\u2D30-\u2D7F\u0600-\u06FFA-Za-z]",
}


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


def lemma(text: str) -> str:
    text = text.casefold().strip()
    text = re.sub(r"[^\w]+", " ", text, flags=re.UNICODE)
    return re.sub(r"\s+", " ", text).strip()


def clean(text: str, lang: str = "") -> str:
    text = text.replace("\u00a0", " ")
    text = re.sub(r">>[A-Za-z0-9_]+<<", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    text = text.strip(" \"'«»“”")
    table = REPAIR.get(lang)
    if table:
        text = text.translate(table)
    return text


def script_ok(lang: str, text: str) -> bool:
    pattern = SCRIPTS.get(lang)
    if not pattern:
        return bool(re.search(r"[^\W\d_]", text, flags=re.UNICODE))
    return len(re.findall(pattern, text)) >= 2


def latin_leak(text: str) -> bool:
    for word in re.findall(r"[A-Za-z]{3,}", text):
        if word.casefold() not in {"anna"}:
            return True
    return False


def acceptable(lang: str, source: str, target: str) -> bool:
    target = clean(target, lang)
    if len(target) < 2 or len(target) > max(240, len(source) * 5):
        return False
    if ">>" in target or "<<" in target:
        return False
    if lemma(target) == lemma(source):
        return False
    if lang not in {"is", "cy", "rm", "la", "hr", "haw", "so", "ha", "ff", "yo", "ln", "mg", "ber"} and latin_leak(target):
        return False
    return script_ok(lang, target)


def english() -> dict[str, str]:
    found = {}
    for level in LEVELS:
        rows = json.loads((COURSE / "ready" / f"{level}.json").read_text())
        for row in rows:
            sentence = str(row.get("sentence") or "").strip()
            if sentence:
                found[row["id"]] = sentence
    return found


def lexicon_done(lang: str) -> set[str]:
    path = ROOT / "src/data/lexicon" / f"{lang}.json"
    done = set()
    if not path.exists():
        return done
    raw = json.loads(path.read_text())
    entries = raw.get("entries", {}) if isinstance(raw, dict) else {}
    for key, row in entries.items():
        if not isinstance(row, dict):
            continue
        if str(row.get("word") or "").strip() and str(row.get("sentence") or "").strip():
            done.add(key)
    return done


def pending(lang: str, en: dict[str, str]) -> list[tuple[str, str, str]]:
    covered = lexicon_done(lang)
    jobs = []
    for level in LEVELS:
        path = COURSE / "i18n" / lang / f"{level}.json"
        if not path.exists():
            continue
        items = json.loads(path.read_text()).get("items", {})
        for key, row in items.items():
            if key in covered or key not in en:
                continue
            if not str(row.get("word") or "").strip():
                continue
            sentence = str(row.get("sentence") or "").strip()
            if sentence and lemma(sentence) != lemma(en[key]):
                continue
            jobs.append((level, key, en[key]))
    return jobs


def ensure_model(repo: str) -> tuple[Path, Path]:
    name = repo.split("/")[-1]
    src = SRC / name
    ct2 = CT2 / name
    if not (src / "config.json").exists():
        src.mkdir(parents=True, exist_ok=True)
        print("download", repo, flush=True)
        snapshot_download(repo, local_dir=str(src))
    if not (ct2 / "model.bin").exists():
        ct2.parent.mkdir(parents=True, exist_ok=True)
        print("convert", name, flush=True)
        subprocess_convert(src, ct2)
    for blob in list(src.glob("*.bin")) + list(src.glob("*.safetensors")) + list(src.glob("*.h5")) + list(src.glob("*.onnx")):
        blob.unlink(missing_ok=True)
    return src, ct2


class Engine:
    def __init__(self, repo: str, prefix: str) -> None:
        src, ct2 = ensure_model(repo)
        self.prefix = prefix
        self.tokenizer = MarianTokenizer.from_pretrained(src)
        threads = max(2, min(8, __import__("os").cpu_count() or 2))
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
            beam_size=2,
            max_decoding_length=160,
            max_batch_size=32,
            batch_type="examples",
            replace_unknowns=True,
        )
        out = []
        for batch in batches:
            ids = self.tokenizer.convert_tokens_to_ids(batch.hypotheses[0])
            out.append(clean(self.tokenizer.decode(ids, skip_special_tokens=True)))
        return out


def write_level(lang: str, level: str, updates: dict[str, str], en: dict[str, str]) -> int:
    path = COURSE / "i18n" / lang / f"{level}.json"
    raw = json.loads(path.read_text())
    items = raw.get("items", {})
    changed = 0
    for key, sentence in updates.items():
        row = items.get(key)
        if not isinstance(row, dict):
            continue
        existing = str(row.get("sentence") or "").strip()
        # Keep a real translation. Replace only an empty line or a line that is still English.
        if existing and lemma(existing) != lemma(en.get(key, "")):
            continue
        row["sentence"] = sentence
        changed += 1
    if not changed:
        return 0
    tmp = path.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(raw, ensure_ascii=False, separators=(",", ":")))
    tmp.replace(path)
    return changed


def run_lang(lang: str, engine: Engine, en: dict[str, str], limit: int, dry: bool) -> None:
    jobs = pending(lang, en)
    if limit:
        jobs = jobs[:limit]
    print(f"{lang} pending {len(jobs)}", flush=True)
    if not jobs:
        return
    kept = 0
    skipped = 0
    by_level: dict[str, dict[str, str]] = {level: {} for level in LEVELS}
    samples = []
    step = 32
    for start in range(0, len(jobs), step):
        chunk = jobs[start : start + step]
        translated = engine.many([sentence for _, _, sentence in chunk])
        for (level, key, source), target in zip(chunk, translated):
            target = clean(target, lang)
            if not acceptable(lang, source, target):
                skipped += 1
                continue
            by_level[level][key] = target
            kept += 1
            if len(samples) < 8:
                samples.append(f"{key}\n  EN {source}\n  → {target}")
        print(f"  {lang} {min(start + step, len(jobs))}/{len(jobs)} kept {kept} skipped {skipped}", flush=True)
    for line in samples:
        print(line, flush=True)
    if dry:
        print(f"{lang} dry kept {kept} skipped {skipped}", flush=True)
        return
    written = 0
    for level, updates in by_level.items():
        if updates:
            written += write_level(lang, level, updates, en)
    print(f"{lang} wrote {written}", flush=True)


def main() -> None:
    args = sys.argv[1:]
    dry = "--dry" in args
    limit = 0
    only = []
    for arg in args:
        if arg.startswith("--limit="):
            limit = int(arg.split("=", 1)[1])
        elif arg.startswith("--only="):
            only = arg.split("=", 1)[1].split(",")
        elif arg not in {"--dry"}:
            only.append(arg)
    wanted = set(only)
    en = english()
    engines: dict[tuple[str, str], Engine] = {}
    seen_models: list[str] = []
    for lang, repo, prefix in JOBS:
        if wanted and lang not in wanted:
            continue
        key = (repo, prefix)
        if key not in engines:
            engines[key] = Engine(repo, prefix)
            if repo not in seen_models:
                seen_models.append(repo)
        run_lang(lang, engines[key], en, limit, dry)
        # Drop the translator before the next model so RAM stays small.
        if all(item[1] != repo or (wanted and item[0] not in wanted) for item in JOBS[JOBS.index((lang, repo, prefix)) + 1 :]):
            engines.pop(key, None)
    if not dry and not wanted:
        shutil.rmtree(SRC, ignore_errors=True)


if __name__ == "__main__":
    main()
