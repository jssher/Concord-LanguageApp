#!/usr/bin/env python3
"""Fill a first European batch of course packs from English.

Hand-written lines stay when the English text still matches.
Sentences are translated whole. A single word is translated inside a short
frame, then the frame is removed, so the lemma is not a bare-word guess.
"""

from __future__ import annotations

import json
import os
import re
import time
from pathlib import Path

import ctranslate2
import argostranslate.package
import argostranslate.translate

ROOT = Path("/workspace/public/course")
READY = ["a1", "a2", "b1", "b2", "p"]
LEVEL_NAME = {"a1": "A1", "a2": "A2", "b1": "B1", "b2": "B2", "p": "P"}

# file code, Argos model code. Portuguese is Brazilian.
LANGS = [
    ("de", "de"),
    ("nl", "nl"),
    ("da", "da"),
    ("fr", "fr"),
    ("es", "es"),
    ("it", "it"),
    ("pt", "pb"),
    ("pl", "pl"),
    ("cs", "cs"),
    ("ro", "ro"),
]

GLOSS = {
    "de": {"i": "ich", "you": "du", "he": "er", "she": "sie", "we": "wir", "they": "sie", "it": "es", "me": "mich", "my": "mein", "your": "dein", "yes": "ja", "no": "nein", "and": "und", "or": "oder", "but": "aber", "not": "nicht", "please": "bitte", "thank you": "danke", "thanks": "danke"},
    "nl": {"i": "ik", "you": "jij", "he": "hij", "she": "zij", "we": "wij", "they": "zij", "it": "het", "me": "mij", "my": "mijn", "your": "jouw", "yes": "ja", "no": "nee", "and": "en", "or": "of", "but": "maar", "not": "niet", "please": "alsjeblieft", "thank you": "dank je", "thanks": "bedankt"},
    "da": {"i": "jeg", "you": "du", "he": "han", "she": "hun", "we": "vi", "they": "de", "it": "det", "me": "mig", "my": "min", "your": "din", "yes": "ja", "no": "nej", "and": "og", "or": "eller", "but": "men", "not": "ikke", "please": "vær så venlig", "thank you": "tak", "thanks": "tak"},
    "fr": {"i": "je", "you": "tu", "he": "il", "she": "elle", "we": "nous", "they": "ils", "it": "ce", "me": "moi", "my": "mon", "your": "ton", "yes": "oui", "no": "non", "and": "et", "or": "ou", "but": "mais", "not": "pas", "please": "s'il te plaît", "thank you": "merci", "thanks": "merci"},
    "es": {"i": "yo", "you": "tú", "he": "él", "she": "ella", "we": "nosotros", "they": "ellos", "it": "eso", "me": "me", "my": "mi", "your": "tu", "yes": "sí", "no": "no", "and": "y", "or": "o", "but": "pero", "not": "no", "please": "por favor", "thank you": "gracias", "thanks": "gracias"},
    "it": {"i": "io", "you": "tu", "he": "lui", "she": "lei", "we": "noi", "they": "loro", "it": "esso", "me": "me", "my": "mio", "your": "tuo", "yes": "sì", "no": "no", "and": "e", "or": "o", "but": "ma", "not": "non", "please": "per favore", "thank you": "grazie", "thanks": "grazie"},
    "pt": {"i": "eu", "you": "você", "he": "ele", "she": "ela", "we": "nós", "they": "eles", "it": "isso", "me": "me", "my": "meu", "your": "seu", "yes": "sim", "no": "não", "and": "e", "or": "ou", "but": "mas", "not": "não", "please": "por favor", "thank you": "obrigado", "thanks": "obrigado"},
    "pl": {"i": "ja", "you": "ty", "he": "on", "she": "ona", "we": "my", "they": "oni", "it": "to", "me": "mnie", "my": "mój", "your": "twój", "yes": "tak", "no": "nie", "and": "i", "or": "lub", "but": "ale", "not": "nie", "please": "proszę", "thank you": "dziękuję", "thanks": "dzięki"},
    "cs": {"i": "já", "you": "ty", "he": "on", "she": "ona", "we": "my", "they": "oni", "it": "to", "me": "mě", "my": "můj", "your": "tvůj", "yes": "ano", "no": "ne", "and": "a", "or": "nebo", "but": "ale", "not": "ne", "please": "prosím", "thank you": "děkuji", "thanks": "díky"},
    "ro": {"i": "eu", "you": "tu", "he": "el", "she": "ea", "we": "noi", "they": "ei", "it": "el", "me": "mă", "my": "meu", "your": "tău", "yes": "da", "no": "nu", "and": "și", "or": "sau", "but": "dar", "not": "nu", "please": "te rog", "thank you": "mulțumesc", "thanks": "mersi"},
}

DROP = {
    "de": {"das", "ist", "ein", "eine", "einen", "einem", "einer", "der", "die", "den", "dem", "es", "sind", "sie", "wollen"},
    "nl": {"dit", "is", "een", "de", "het", "ze", "willen", "dat"},
    "da": {"dette", "er", "en", "et", "de", "vil", "det"},
    "fr": {"c'est", "ce", "est", "un", "une", "de", "la", "le", "des", "du", "ils", "elles", "veulent", "ceci"},
    "es": {"esto", "es", "un", "una", "el", "la", "ellos", "ellas", "quieren"},
    "it": {"questo", "questa", "è", "un", "una", "il", "la", "loro", "vogliono"},
    "pt": {"isto", "isso", "é", "um", "uma", "o", "a", "eles", "querem"},
    "pl": {"to", "jest", "się", "chcą", "ten", "ta"},
    "cs": {"toto", "je", "to", "chtějí", "se", "ten", "ta"},
    "ro": {"acesta", "aceasta", "este", "e", "un", "o", "ei", "vor"},
}


def lemma(text: str) -> str:
    return re.sub(r"\s+", " ", text.strip().lower())


def clean(text: str) -> str:
    text = text.replace("\u00a0", " ")
    text = re.sub(r"\s+", " ", text).strip()
    if text.startswith(" "):
        text = text[1:]
    return text.strip(" \"'")


def install(codes: list[str]) -> None:
    argostranslate.package.update_package_index()
    available = argostranslate.package.get_available_packages()
    have = set()
    for lang in argostranslate.translate.get_installed_languages():
        for tr in lang.translations_from:
            have.add((lang.code, tr.to_lang.code))
    for code in codes:
        if ("en", code) in have:
            continue
        pkg = next(p for p in available if p.from_code == "en" and p.to_code == code)
        print("download", code, flush=True)
        argostranslate.package.install_from_path(pkg.download())


class Engine:
    def __init__(self, code: str) -> None:
        langs = argostranslate.translate.get_installed_languages()
        src = next(lang for lang in langs if lang.code == "en")
        dst = next(lang for lang in langs if lang.code == code)
        obj = src.get_translation(dst)
        while hasattr(obj, "underlying"):
            obj = obj.underlying
        self.pkg = obj.pkg
        threads = max(2, os.cpu_count() or 2)
        self.model = ctranslate2.Translator(
            str(self.pkg.package_path / "model"),
            device="cpu",
            inter_threads=threads,
            intra_threads=threads,
        )

    def many(self, texts: list[str]) -> list[str]:
        if not texts:
            return []
        tokenized = [self.pkg.tokenizer.encode(text) for text in texts]
        batches = self.model.translate_batch(
            tokenized,
            beam_size=2,
            num_hypotheses=1,
            max_batch_size=64,
            batch_type="examples",
            replace_unknowns=True,
        )
        out = []
        for batch in batches:
            value = self.pkg.tokenizer.decode(batch.hypotheses[0])
            if value.startswith(" "):
                value = value[1:]
            out.append(clean(value))
        return out


def strip_frame(lang: str, text: str) -> str:
    drop = DROP.get(lang, set())
    parts = [p.strip(".,;:!?¿¡\"“”'") for p in clean(text).split()]
    parts = [p for p in parts if p]
    while parts and parts[0].lower() in drop:
        parts.pop(0)
    return " ".join(parts)


def frame_for(en: str, pos: str) -> str | None:
    key = lemma(en)
    if " " in key or pos in {"phrase", "line", "num"}:
        return en
    if pos == "verb":
        return f"They want to {en}."
    if pos in {"adj", "adjective", "adv"}:
        return f"This is {en}."
    return f"This is a {en}."


def word_from(lang: str, en: str, pos: str, framed: str) -> str:
    gloss = GLOSS.get(lang, {}).get(lemma(en))
    if gloss and " " not in lemma(en):
        return gloss
    if " " in lemma(en) or pos in {"phrase", "line", "num"}:
        return framed or en
    got = strip_frame(lang, framed)
    if pos == "verb" and got:
        bits = got.split()
        got = bits[-1] if len(bits) > 3 else got
    if not got:
        got = framed or en
    if lang == "de" and pos == "noun" and got:
        got = got[0].upper() + got[1:]
    return got


def load_ready(level: str) -> list[dict]:
    return json.loads((ROOT / "ready" / f"{level}.json").read_text())


def load_existing(lang: str, level: str) -> dict:
    path = ROOT / "i18n" / lang / f"{level}.json"
    if not path.exists():
        return {}
    data = json.loads(path.read_text())
    items = data.get("items", data)
    return items if isinstance(items, dict) else {}


def keep(old: dict, en: str) -> bool:
    if not isinstance(old, dict):
        return False
    word = old.get("word")
    sent = old.get("sentence")
    if not isinstance(word, str) or not isinstance(sent, str):
        return False
    if not word.strip() or not sent.strip():
        return False
    prev = old.get("en")
    if isinstance(prev, str) and lemma(prev) != lemma(en):
        return False
    return True


def chunks(items: list, size: int):
    for i in range(0, len(items), size):
        yield items[i : i + size]


def main() -> None:
    codes = []
    for _file, code in LANGS:
        if code not in codes:
            codes.append(code)
    install(codes)
    t0 = time.time()
    samples = []
    for file_code, argos_code in LANGS:
        print("language", file_code, flush=True)
        engine = Engine(argos_code)
        for level in READY:
            rows = load_ready(level)
            items = load_existing(file_code, level)
            todo = []
            kept = 0
            for row in rows:
                en = row["en"].strip()
                if keep(items.get(row["id"]), en):
                    kept += 1
                    continue
                todo.append(row)
            print(f"{file_code} {level} todo {len(todo)} kept {kept}", flush=True)
            sent_map = {}
            frame_map = {}
            sentences = [row["sentence"] for row in todo]
            frames = [frame_for(row["en"].strip(), row.get("pos") or "noun") for row in todo]
            done = 0
            for group in chunks(list(enumerate(sentences)), 64):
                idxs = [i for i, _ in group]
                texts = [text for _, text in group]
                outs = engine.many(texts)
                for i, text in zip(idxs, outs):
                    sent_map[i] = text
                done += len(group)
                if done % 640 == 0:
                    print(f"  {file_code} {level} sentences {done}/{len(todo)}", flush=True)
            done = 0
            for group in chunks(list(enumerate(frames)), 64):
                idxs = [i for i, _ in group]
                texts = [text for _, text in group]
                outs = engine.many(texts)
                for i, text in zip(idxs, outs):
                    frame_map[i] = text
                done += len(group)
            for i, row in enumerate(todo):
                en = row["en"].strip()
                pos = row.get("pos") or "noun"
                sent = sent_map.get(i) or en
                word = word_from(file_code, en, pos, frame_map.get(i, ""))
                if not word:
                    word = sent
                items[row["id"]] = {"en": en, "word": word, "sentence": sent}
            out = ROOT / "i18n" / file_code
            out.mkdir(parents=True, exist_ok=True)
            payload = {"lang": file_code, "level": LEVEL_NAME[level], "items": items}
            tmp = out / f"{level}.json.tmp"
            tmp.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")))
            tmp.replace(out / f"{level}.json")
            print(f"wrote {file_code}/{level}.json {len(items)}", flush=True)
        a1 = json.loads((ROOT / "i18n" / file_code / "a1.json").read_text())["items"]
        for cid in ("i", "water", "shirt", "mother"):
            row = a1.get(cid)
            if row:
                samples.append(f"{file_code}\t{cid}\t{row['word']}\t{row['sentence']}")
        print(f"done {file_code} {round(time.time()-t0)}s", flush=True)
    Path("/tmp/eu-samples.txt").write_text("\n".join(samples) + "\n")
    print("FINISHED", round(time.time() - t0), flush=True)


if __name__ == "__main__":
    main()
