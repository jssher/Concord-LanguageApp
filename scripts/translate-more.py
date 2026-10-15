#!/usr/bin/env python3
"""Translate the next course languages the same way as the first European batch.

Sentences are translated whole. A one-word headword is translated inside a
short frame, then the frame is removed. Hand-written lexicon lines replace
the machine line when the English still matches, and they keep article,
gender, plural, and a reading.
"""

from __future__ import annotations

import json
import os
import re
import sys
import time
from pathlib import Path

import argostranslate.package
import argostranslate.translate
import ctranslate2

ROOT = Path("/workspace/public/course")
LEX = Path("/workspace/src/data/lexicon")
READY = ["a1", "a2", "b1", "b2", "p"]
LEVEL_NAME = {"a1": "A1", "a2": "A2", "b1": "B1", "b2": "B2", "p": "P"}
EXTRA = ("article", "gender", "plural", "feminine", "masculine", "neuter", "reading", "sentenceReading", "note")

# file code, Argos code
LANGS = [
    ("el", "el"),
    ("ru", "ru"),
    ("uk", "uk"),
    ("bg", "bg"),
    ("sk", "sk"),
    ("sl", "sl"),
    ("ga", "ga"),
    ("eu", "eu"),
    ("sq", "sq"),
    ("tr", "tr"),
    ("ar", "ar"),
    ("he", "he"),
    ("fa", "fa"),
    ("hi", "hi"),
    ("bn", "bn"),
    ("zh", "zh"),
    ("ja", "ja"),
    ("ko", "ko"),
    ("id", "id"),
    ("vi", "vi"),
    ("th", "th"),
    ("tl", "tl"),
    ("sw", "sw"),
    ("ur", "ur"),
    ("eo", "eo"),
]

GLOSS = {
    "el": {"i": "εγώ", "you": "εσύ", "he": "αυτός", "she": "αυτή", "we": "εμείς", "they": "αυτοί", "yes": "ναι", "no": "όχι", "and": "και", "or": "ή", "but": "αλλά", "not": "δεν", "please": "παρακαλώ", "thank you": "ευχαριστώ", "thanks": "ευχαριστώ"},
    "ru": {"i": "я", "you": "ты", "he": "он", "she": "она", "we": "мы", "they": "они", "yes": "да", "no": "нет", "and": "и", "or": "или", "but": "но", "not": "не", "please": "пожалуйста", "thank you": "спасибо", "thanks": "спасибо"},
    "uk": {"i": "я", "you": "ти", "he": "він", "she": "вона", "we": "ми", "they": "вони", "yes": "так", "no": "ні", "and": "і", "or": "або", "but": "але", "not": "не", "please": "будь ласка", "thank you": "дякую", "thanks": "дякую"},
    "bg": {"i": "аз", "you": "ти", "he": "той", "she": "тя", "we": "ние", "they": "те", "yes": "да", "no": "не", "and": "и", "or": "или", "but": "но", "not": "не", "please": "моля", "thank you": "благодаря", "thanks": "благодаря"},
    "sk": {"i": "ja", "you": "ty", "he": "on", "she": "ona", "we": "my", "they": "oni", "yes": "áno", "no": "nie", "and": "a", "or": "alebo", "but": "ale", "not": "nie", "please": "prosím", "thank you": "ďakujem", "thanks": "ďakujem"},
    "sl": {"i": "jaz", "you": "ti", "he": "on", "she": "ona", "we": "mi", "they": "oni", "yes": "da", "no": "ne", "and": "in", "or": "ali", "but": "ampak", "not": "ne", "please": "prosim", "thank you": "hvala", "thanks": "hvala"},
    "ga": {"i": "mé", "you": "tú", "he": "sé", "she": "sí", "we": "muid", "they": "siad", "yes": "sea", "no": "níl", "and": "agus", "or": "nó", "but": "ach", "not": "ní", "please": "le do thoil", "thank you": "go raibh maith agat", "thanks": "go raibh maith agat"},
    "eu": {"i": "ni", "you": "zu", "he": "hura", "she": "hura", "we": "gu", "they": "haiek", "yes": "bai", "no": "ez", "and": "eta", "or": "edo", "but": "baina", "not": "ez", "please": "mesedez", "thank you": "eskerrik asko", "thanks": "eskerrik asko"},
    "sq": {"i": "unë", "you": "ti", "he": "ai", "she": "ajo", "we": "ne", "they": "ata", "yes": "po", "no": "jo", "and": "dhe", "or": "ose", "but": "por", "not": "nuk", "please": "të lutem", "thank you": "faleminderit", "thanks": "faleminderit"},
    "tr": {"i": "ben", "you": "sen", "he": "o", "she": "o", "we": "biz", "they": "onlar", "yes": "evet", "no": "hayır", "and": "ve", "or": "veya", "but": "ama", "not": "değil", "please": "lütfen", "thank you": "teşekkürler", "thanks": "teşekkürler"},
    "ar": {"i": "أنا", "you": "أنت", "he": "هو", "she": "هي", "we": "نحن", "they": "هم", "yes": "نعم", "no": "لا", "and": "و", "or": "أو", "but": "لكن", "not": "لا", "please": "من فضلك", "thank you": "شكراً", "thanks": "شكراً"},
    "he": {"i": "אני", "you": "אתה", "he": "הוא", "she": "היא", "we": "אנחנו", "they": "הם", "yes": "כן", "no": "לא", "and": "ו", "or": "או", "but": "אבל", "not": "לא", "please": "בבקשה", "thank you": "תודה", "thanks": "תודה"},
    "fa": {"i": "من", "you": "تو", "he": "او", "she": "او", "we": "ما", "they": "آنها", "yes": "بله", "no": "نه", "and": "و", "or": "یا", "but": "اما", "not": "نه", "please": "لطفاً", "thank you": "متشکرم", "thanks": "ممنون"},
    "hi": {"i": "मैं", "you": "तुम", "he": "वह", "she": "वह", "we": "हम", "they": "वे", "yes": "हाँ", "no": "नहीं", "and": "और", "or": "या", "but": "लेकिन", "not": "नहीं", "please": "कृपया", "thank you": "धन्यवाद", "thanks": "धन्यवाद"},
    "bn": {"i": "আমি", "you": "তুমি", "he": "সে", "she": "সে", "we": "আমরা", "they": "তারা", "yes": "হ্যাঁ", "no": "না", "and": "এবং", "or": "বা", "but": "কিন্তু", "not": "না", "please": "অনুগ্রহ করে", "thank you": "ধন্যবাদ", "thanks": "ধন্যবাদ"},
    "zh": {"i": "我", "you": "你", "he": "他", "she": "她", "we": "我们", "they": "他们", "yes": "是", "no": "不", "and": "和", "or": "或", "but": "但是", "not": "不", "please": "请", "thank you": "谢谢", "thanks": "谢谢"},
    "ja": {"i": "私", "you": "あなた", "he": "彼", "she": "彼女", "we": "私たち", "they": "彼ら", "yes": "はい", "no": "いいえ", "and": "と", "or": "または", "but": "しかし", "not": "ない", "please": "お願いします", "thank you": "ありがとう", "thanks": "ありがとう"},
    "ko": {"i": "나", "you": "너", "he": "그", "she": "그녀", "we": "우리", "they": "그들", "yes": "네", "no": "아니요", "and": "그리고", "or": "또는", "but": "하지만", "not": "안", "please": "부탁합니다", "thank you": "감사합니다", "thanks": "고마워요"},
    "id": {"i": "saya", "you": "kamu", "he": "dia", "she": "dia", "we": "kami", "they": "mereka", "yes": "ya", "no": "tidak", "and": "dan", "or": "atau", "but": "tetapi", "not": "tidak", "please": "tolong", "thank you": "terima kasih", "thanks": "terima kasih"},
    "vi": {"i": "tôi", "you": "bạn", "he": "anh ấy", "she": "cô ấy", "we": "chúng tôi", "they": "họ", "yes": "vâng", "no": "không", "and": "và", "or": "hoặc", "but": "nhưng", "not": "không", "please": "làm ơn", "thank you": "cảm ơn", "thanks": "cảm ơn"},
    "th": {"i": "ฉัน", "you": "คุณ", "he": "เขา", "she": "เธอ", "we": "เรา", "they": "พวกเขา", "yes": "ใช่", "no": "ไม่", "and": "และ", "or": "หรือ", "but": "แต่", "not": "ไม่", "please": "โปรด", "thank you": "ขอบคุณ", "thanks": "ขอบคุณ"},
    "tl": {"i": "ako", "you": "ikaw", "he": "siya", "she": "siya", "we": "kami", "they": "sila", "yes": "oo", "no": "hindi", "and": "at", "or": "o", "but": "pero", "not": "hindi", "please": "pakiusap", "thank you": "salamat", "thanks": "salamat"},
    "sw": {"i": "mimi", "you": "wewe", "he": "yeye", "she": "yeye", "we": "sisi", "they": "wao", "yes": "ndiyo", "no": "hapana", "and": "na", "or": "au", "but": "lakini", "not": "si", "please": "tafadhali", "thank you": "asante", "thanks": "asante"},
    "ur": {"i": "میں", "you": "تم", "he": "وہ", "she": "وہ", "we": "ہم", "they": "وہ", "yes": "ہاں", "no": "نہیں", "and": "اور", "or": "یا", "but": "لیکن", "not": "نہیں", "please": "براہ کرم", "thank you": "شکریہ", "thanks": "شکریہ"},
    "eo": {"i": "mi", "you": "vi", "he": "li", "she": "ŝi", "we": "ni", "they": "ili", "yes": "jes", "no": "ne", "and": "kaj", "or": "aŭ", "but": "sed", "not": "ne", "please": "bonvolu", "thank you": "dankon", "thanks": "dankon"},
}

DROP = {
    "el": {"αυτό", "είναι", "ένα", "μία", "ένας", "μια", "θέλουν", "αυτοί", "αυτός"},
    "ru": {"это", "есть", "они", "хотят", "один", "одна", "одно"},
    "uk": {"це", "є", "вони", "хочуть", "один", "одна", "одне"},
    "bg": {"това", "е", "те", "искат", "един", "една", "едно"},
    "sk": {"toto", "je", "oni", "chcú", "jeden", "jedna", "jedno"},
    "sl": {"to", "je", "oni", "hočejo", "en", "ena", "eno"},
    "ga": {"is", "é", "í", "seo", "siad", "ba", "eadh"},
    "eu": {"hau", "da", "bat", "nahi", "dute", "dira"},
    "sq": {"kjo", "ky", "është", "një", "ata", "duan"},
    "tr": {"bu", "bir", "onlar", "istiyor", "istiyorlar"},
    "ar": {"هذا", "هذه", "هو", "هي", "يريدون"},
    "he": {"זה", "זאת", "הם", "רוצים"},
    "fa": {"این", "است", "یک", "آنها", "میخواهند"},
    "hi": {"यह", "है", "एक", "वे", "चाहते"},
    "bn": {"এই", "এক", "তারা"},
    "zh": {"这", "是", "一个", "他们", "想"},
    "ja": {"これ", "は", "です", "彼らは", "したい"},
    "ko": {"이것은", "입니다", "그들은", "싶어"},
    "id": {"ini", "adalah", "sebuah", "mereka", "ingin"},
    "vi": {"đây", "là", "một", "họ", "muốn"},
    "th": {"นี่", "คือ", "หนึ่ง", "พวกเขา", "ต้องการ"},
    "tl": {"ito", "ay", "isang", "sila", "gusto"},
    "sw": {"hii", "ni", "moja", "wao", "wanataka"},
    "ur": {"یہ", "ہے", "ایک", "وہ", "چاہتے"},
    "eo": {"tio", "ĉi", "estas", "unu", "ili", "volas"},
}

# Practical learner readings. Not a scholarly standard.
RU = {
    "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e", "ё": "yo", "ж": "zh", "з": "z", "и": "i", "й": "y",
    "к": "k", "л": "l", "м": "m", "н": "n", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u", "ф": "f",
    "х": "kh", "ц": "ts", "ч": "ch", "ш": "sh", "щ": "shch", "ъ": "", "ы": "y", "ь": "", "э": "e", "ю": "yu", "я": "ya",
}
UK = {**RU, "г": "h", "ґ": "g", "є": "ye", "і": "i", "ї": "yi", "й": "y"}
BG = {**RU, "щ": "sht", "ъ": "a", "ь": "y"}
EL = {
    "α": "a", "β": "v", "γ": "g", "δ": "d", "ε": "e", "ζ": "z", "η": "i", "θ": "th", "ι": "i", "κ": "k", "λ": "l",
    "μ": "m", "ν": "n", "ξ": "x", "ο": "o", "π": "p", "ρ": "r", "σ": "s", "ς": "s", "τ": "t", "υ": "y", "φ": "f",
    "χ": "ch", "ψ": "ps", "ω": "o", "ά": "a", "έ": "e", "ή": "i", "ί": "i", "ό": "o", "ύ": "y", "ώ": "o", "ϊ": "i", "ϋ": "y",
}


def lemma(text: str) -> str:
    return re.sub(r"\s+", " ", text.strip().lower())


def clean(text: str) -> str:
    text = text.replace("\u00a0", " ")
    text = re.sub(r"\s+", " ", text).strip().strip(" \"'")
    return text


def translit(text: str, table: dict[str, str]) -> str:
    out = []
    for ch in text:
        low = ch.lower()
        if low in table:
            piece = table[low]
            out.append(piece.upper() if ch.isupper() and piece else piece)
        else:
            out.append(ch)
    return "".join(out)


def reading_for(lang: str, word: str, sentence: str) -> tuple[str, str]:
    table = {"ru": RU, "uk": UK, "bg": BG, "el": EL}.get(lang)
    if not table:
        return "", ""
    return translit(word, table), translit(sentence, table)


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
        pkg = next((p for p in available if p.from_code == "en" and p.to_code == code), None)
        if pkg is None:
            print("missing model", code, flush=True)
            continue
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
            intra_threads=1,
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
            repetition_penalty=1.3,
            no_repeat_ngram_size=3,
            max_decoding_length=80,
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
    parts = [p.strip(".,;:!?¿¡\"“”'«»") for p in clean(text).split()]
    parts = [p for p in parts if p]
    while parts and parts[0].lower() in drop:
        parts.pop(0)
    return " ".join(parts)


def frame_for(en: str, pos: str) -> str:
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
    return got or framed or en


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


def overlay(lang: str, items: dict, english: dict) -> None:
    path = LEX / f"{lang}.json"
    if not path.exists():
        return
    lex = json.loads(path.read_text()).get("entries", {})
    for iid, hand in lex.items():
        row = items.get(iid)
        en_hand = english.get(iid, {})
        if not row or not isinstance(hand, dict):
            continue
        if lemma(str(row.get("en") or "")) != lemma(str(en_hand.get("word") or "")):
            continue
        if hand.get("word"):
            row["word"] = hand["word"]
        if hand.get("sentence"):
            row["sentence"] = hand["sentence"]
        for key in EXTRA:
            if hand.get(key):
                row[key] = hand[key]


def add_readings(lang: str, items: dict) -> None:
    if lang not in {"ru", "uk", "bg", "el"}:
        return
    for row in items.values():
        if row.get("reading"):
            continue
        word, sentence = reading_for(lang, str(row.get("word") or ""), str(row.get("sentence") or ""))
        if word and word != row.get("word"):
            row["reading"] = word
        if sentence and sentence != row.get("sentence"):
            row["sentenceReading"] = sentence


def selected() -> list[tuple[str, str]]:
    want = set(sys.argv[1:])
    if not want:
        return LANGS
    return [pair for pair in LANGS if pair[0] in want]


def main() -> None:
    langs = selected()
    install([code for _, code in langs])
    english = json.loads((LEX / "en.json").read_text()).get("entries", {})
    t0 = time.time()
    for file_code, argos_code in langs:
        print("language", file_code, flush=True)
        try:
            engine = Engine(argos_code)
        except StopIteration:
            print("skip, model not installed", file_code, flush=True)
            continue
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
            sent_map: dict[int, str] = {}
            frame_map: dict[int, str] = {}
            sentences = [row["sentence"] for row in todo]
            frames = [frame_for(row["en"].strip(), row.get("pos") or "noun") for row in todo]
            done = 0
            for group in chunks(list(enumerate(sentences)), 64):
                idxs = [i for i, _ in group]
                outs = engine.many([text for _, text in group])
                for i, text in zip(idxs, outs):
                    sent_map[i] = text
                done += len(group)
                if done % 1280 == 0 or done == len(todo):
                    print(f"  {file_code} {level} sentences {done}/{len(todo)}", flush=True)
            for group in chunks(list(enumerate(frames)), 64):
                idxs = [i for i, _ in group]
                outs = engine.many([text for _, text in group])
                for i, text in zip(idxs, outs):
                    frame_map[i] = text
            for i, row in enumerate(todo):
                en = row["en"].strip()
                pos = row.get("pos") or "noun"
                sent = sent_map.get(i) or en
                word = word_from(file_code, en, pos, frame_map.get(i, ""))
                items[row["id"]] = {"en": en, "word": word, "sentence": sent}
            overlay(file_code, items, english)
            add_readings(file_code, items)
            out = ROOT / "i18n" / file_code
            out.mkdir(parents=True, exist_ok=True)
            payload = {"lang": file_code, "level": LEVEL_NAME[level], "items": items}
            tmp = out / f"{level}.json.tmp"
            tmp.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")))
            tmp.replace(out / f"{level}.json")
            print(f"wrote {file_code}/{level}.json {len(items)}", flush=True)
        print(f"done {file_code} {round(time.time()-t0)}s", flush=True)
    print("FINISHED", round(time.time() - t0), flush=True)


if __name__ == "__main__":
    main()
