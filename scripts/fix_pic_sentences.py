#!/usr/bin/env python3
"""Replace picture-card "This is: word." lines with a natural sentence.

The English line is already "This is a/an {word}." Other languages were filled
from a colon template. Article languages get a gender from the model; the rest
use a fixed, grammatical frame around the translated word.
"""

from __future__ import annotations

import json
import os
import re
import sys
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path("/workspace/public/course")
PATTERNS = json.loads(Path("/tmp/pic_patterns.json").read_text())
CACHE = Path("/tmp/pic_gender.json")
LEVELS = ("a1", "a2", "b1", "b2", "p")

# Frames that do not need a gendered article. {word} is the existing translation.
SIMPLE = {
    "arc": "ܗܢܐ {word}.",
    "ber": "D {word}.",
    "bg": "Това е {word}.",
    "bn": "এটি একটি {word}।",
    "cs": "Toto je {word}.",
    "cy": "Dyma {word}.",
    "eo": "Jen {word}.",
    "eu": "Hau da {word}.",
    "fa": "این یک {word} است.",
    "ff": "Ɗum ko {word}.",
    "ga": "Seo {word}.",
    "gn": "Ko {word}.",
    "grc": "Τοῦτό ἐστι {word}.",
    "gu": "આ એક {word} છે.",
    "haw": "He {word} kēia.",
    "hi": "यह एक {word} है।",
    "hr": "Ovo je {word}.",
    "hy": "Սա {word} է.",
    "id": "Ini {word}.",
    "ig": "Nke a bụ {word}.",
    "is": "Þetta er {word}.",
    "isv": "To je {word}.",
    "ka": "ეს არის {word}.",
    "la": "Hoc est {word}.",
    "ln": "Yango ezalí {word}.",
    "mg": "Ity dia {word}.",
    "mk": "Ова е {word}.",
    "ml": "ഇത് ഒരു {word} ആണ്.",
    "mr": "हे {word} आहे.",
    "nl": "Dit is een {word}.",
    "pl": "To jest {word}.",
    "qu": "Kayqa {word}.",
    "ru": "Это {word}.",
    "sk": "Toto je {word}.",
    "sl": "To je {word}.",
    "so": "Kani waa {word}.",
    "sq": "Është një {word}.",
    "sr": "Ovo je {word}.",
    "sw": "Hii ni {word}.",
    "ta": "இது ஒரு {word}.",
    "te": "ఇది ఒక {word}.",
    "tl": "Ito ay isang {word}.",
    "tr": "Bu bir {word}.",
    "uk": "Це {word}.",
    "ur": "یہ ایک {word} ہے۔",
    "vi": "Đây là {word}.",
    "yo": "Èyí ni {word}.",
}

# lang -> allowed codes. n is kept where the article differs from m.
GENDERED = {
    "de": "mfnp",
    "fr": "mfp",
    "es": "mfp",
    "it": "mfp",
    "pt": "mfp",
    "da": "cnp",
    "ro": "mfnp",
    "el": "mfnp",
    "ar": "mfp",
    "ar-eg": "mfp",
    "ar-ma": "mfp",
    "ar-sa": "mfp",
    "he": "mfp",
    "rm": "mfp",
    "ha": "mfp",
}

HINTS = {
    "de": "German. m masculine, f feminine, n neuter, p plural-only.",
    "fr": "French. m masculine, f feminine, p plural-only.",
    "es": "Spanish. m masculine, f feminine, p plural-only.",
    "it": "Italian. m masculine, f feminine, p plural-only.",
    "pt": "Brazilian Portuguese. m masculine, f feminine, p plural-only.",
    "da": "Danish. c common gender (en), n neuter (et), p plural-only.",
    "ro": "Romanian. m masculine, f feminine, n neuter, p plural-only.",
    "el": "Modern Greek. m masculine, f feminine, n neuter, p plural-only.",
    "ar": "Modern Standard Arabic. m masculine, f feminine, p non-human plural.",
    "ar-eg": "Egyptian Arabic. m masculine, f feminine, p plural.",
    "ar-ma": "Moroccan Arabic. m masculine, f feminine, p plural.",
    "ar-sa": "Saudi Arabic. m masculine, f feminine, p plural.",
    "he": "Hebrew. m masculine, f feminine, p plural.",
    "rm": "Romansh Grischun. m masculine, f feminine, p plural-only.",
    "ha": "Hausa. m masculine, f feminine, p plural.",
}

ALIASES = {
    "masculine": "m",
    "masc": "m",
    "male": "m",
    "m": "m",
    "der": "m",
    "un": "m",
    "ein": "m",
    "feminine": "f",
    "fem": "f",
    "female": "f",
    "f": "f",
    "die": "f",
    "une": "f",
    "eine": "f",
    "neuter": "n",
    "neut": "n",
    "n": "n",
    "das": "n",
    "et": "n",
    "common": "c",
    "c": "c",
    "en": "c",
    "plural": "p",
    "pl": "p",
    "p": "p",
}

ES_FEM_UN = {"agua", "águila", "aguila", "hacha", "alma", "arma", "hambre", "área", "area", "ave", "habla"}
IT_UNO = re.compile(r"^(s[^aeiouàèéìòóù]|z|gn|ps|pn|x|y)", re.I)
IT_VOWEL = re.compile(r"^[aeiouàèéìòóùh]", re.I)


def chat(prompt: str) -> str:
    body = {
        "model": "grok-4-fast-non-reasoning",
        "temperature": 0,
        "max_tokens": 2500,
        "messages": [{"role": "user", "content": prompt}],
    }
    req = urllib.request.Request(
        "https://api.x.ai/v1/chat/completions",
        data=json.dumps(body).encode(),
        headers={"Authorization": f"Bearer {os.environ['XAI_API_KEY']}", "Content-Type": "application/json"},
    )
    last = ""
    for attempt in range(5):
        try:
            with urllib.request.urlopen(req, timeout=120) as res:
                data = json.loads(res.read().decode())
            return data["choices"][0]["message"]["content"]
        except Exception as err:
            last = str(err)[:200]
            time.sleep(1 + attempt * 2)
    raise RuntimeError(last)


def parse_obj(text: str) -> dict:
    text = text.strip()
    start, end = text.find("{"), text.rfind("}")
    if start < 0 or end <= start:
        return {}
    try:
        raw = json.loads(text[start : end + 1])
    except json.JSONDecodeError:
        return {}
    return raw if isinstance(raw, dict) else {}


def load_rows(lang: str) -> list[dict]:
    pattern = PATTERNS.get(lang)
    if not pattern:
        return []
    rows = []
    folder = ROOT / "i18n" / lang
    for level in LEVELS:
        path = folder / f"{level}.json"
        if not path.exists():
            continue
        items = json.loads(path.read_text()).get("items") or {}
        for ident, item in items.items():
            if not str(ident).startswith("pic-"):
                continue
            word = str(item.get("word") or "").strip()
            sentence = str(item.get("sentence") or "")
            if not word or sentence != pattern.replace("{word}", word):
                continue
            rows.append({"id": ident, "word": word, "en": str(item.get("en") or "")})
    return rows


def write_sentences(lang: str, sentences: dict[str, str]) -> int:
    folder = ROOT / "i18n" / lang
    changed = 0
    for level in LEVELS:
        path = folder / f"{level}.json"
        if not path.exists():
            continue
        raw = path.read_text()
        data = json.loads(raw)
        items = data.get("items")
        if not isinstance(items, dict):
            continue
        n = 0
        for ident, sentence in sentences.items():
            row = items.get(ident)
            if not isinstance(row, dict):
                continue
            if row.get("sentence") == sentence:
                continue
            row["sentence"] = sentence
            n += 1
        if not n:
            continue
        out = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
        if raw.endswith("\n"):
            out += "\n"
        path.write_text(out)
        changed += n
    return changed


def avoid(word: str, *prefixes: str) -> str:
    low = word.casefold()
    for prefix in prefixes:
        if low.startswith(prefix.casefold()):
            return word
    return ""


def thai(word: str) -> str:
    if re.match(r"[A-Za-z0-9]", word):
        return f"นี่คือ {word}"
    return f"นี่คือ{word}"


def simple_sentence(lang: str, word: str) -> str:
    if lang == "th":
        return thai(word)
    if lang == "nl" and avoid(word, "een ", "de ", "het "):
        return f"Dit is {word}."
    if lang == "tr" and avoid(word, "bir "):
        return f"Bu {word}."
    if lang == "hi" and avoid(word, "एक "):
        return f"यह {word} है।"
    if lang == "bn" and avoid(word, "একটি ", "একটা "):
        return f"এটি {word}।"
    if lang == "fa" and avoid(word, "یک "):
        return f"این {word} است."
    frame = SIMPLE[lang]
    return frame.replace("{word}", word)


def cap_de(word: str) -> str:
    if " " in word or "-" in word:
        return word
    if word[:1].islower() and re.match(r"[a-zäöüß]", word[:1]):
        return word[:1].upper() + word[1:]
    return word


def gendered_sentence(lang: str, word: str, code: str) -> str:
    w = word.strip()
    if lang == "de":
        if avoid(w, "der ", "die ", "das ", "ein ", "eine ", "einen "):
            return f"Das ist {w}."
        if code == "p":
            return f"Das sind {w}."
        art = "eine" if code == "f" else "ein"
        return f"Das ist {art} {cap_de(w)}."
    if lang == "fr":
        if avoid(w, "un ", "une ", "des ", "le ", "la ", "les ", "l'"):
            return f"C’est {w}."
        if code == "p":
            return f"Ce sont des {w}."
        return f"C’est {'une' if code == 'f' else 'un'} {w}."
    if lang == "es":
        if code == "p":
            return f"Estos son {w}."
        head = w.split()[0].lower() if w else ""
        if code == "f" and head in ES_FEM_UN:
            art = "un"
        else:
            art = "una" if code == "f" else "un"
        return f"Esto es {art} {w}."
    if lang == "it":
        if code == "p":
            return f"Questi sono {w}."
        if code == "f":
            if IT_VOWEL.match(w):
                return f"Questa è un'{w}."
            return f"Questa è una {w}."
        if IT_UNO.match(w):
            return f"Questo è uno {w}."
        return f"Questo è un {w}."
    if lang == "pt":
        if code == "p":
            return f"Isso são {w}."
        return f"Isso é {'uma' if code == 'f' else 'um'} {w}."
    if lang == "da":
        if code == "p":
            return f"Det er {w}."
        return f"Det er {'et' if code == 'n' else 'en'} {w}."
    if lang == "ro":
        if code == "p":
            return f"Acestea sunt {w}."
        if code == "f":
            return f"Aceasta este o {w}."
        return f"Acesta este un {w}."
    if lang == "el":
        if code == "p":
            return f"Αυτά είναι {w}."
        if code == "f":
            return f"Αυτή είναι μια {w}."
        if code == "m":
            return f"Αυτός είναι ένας {w}."
        return f"Αυτό είναι ένα {w}."
    if lang == "ar":
        dem = "هذه" if code in {"f", "p"} else "هذا"
        return f"{dem} {w}."
    if lang == "ar-eg":
        dem = "دي" if code in {"f", "p"} else "ده"
        return f"{dem} {w}."
    if lang == "ar-ma":
        dem = "هادي" if code in {"f", "p"} else "هاد"
        return f"{dem} {w}."
    if lang == "ar-sa":
        dem = "هذي" if code in {"f", "p"} else "هذا"
        return f"{dem} {w}."
    if lang == "he":
        if code == "p":
            return f"אלה {w}."
        return f"{'זאת' if code == 'f' else 'זה'} {w}."
    if lang == "rm":
        if code == "p":
            return f"Quai èn {w}."
        return f"Quai è {'ina' if code == 'f' else 'in'} {w}."
    if lang == "ha":
        return f"Wannan {w} {'ce' if code == 'f' else 'ne'}."
    raise KeyError(lang)


def normalize(lang: str, value: object) -> str:
    code = ALIASES.get(str(value).strip().lower(), "")
    if lang == "da" and code in {"m", "f"}:
        code = "c"
    allowed = GENDERED[lang]
    if code in allowed:
        return code
    if code == "n" and "n" not in allowed and "m" in allowed:
        return "m"
    return ""


def guess(lang: str, word: str) -> str:
    token = word.strip().split()[-1].lower() if lang == "de" else word.strip().split()[0].lower()
    if lang == "de":
        if token.endswith(("ung", "heit", "keit", "schaft", "ion", "tät", "ei", "ur", "anz", "enz", "ade", "itis")):
            return "f"
        if token.endswith(("chen", "lein", "ment", "um", "tum")):
            return "n"
        if token.endswith("e"):
            return "f"
        return "m"
    if lang == "da":
        return "n" if token.endswith(("um", "ment")) else "c"
    if lang in {"fr", "es", "it", "pt", "ro", "rm", "ha", "ar", "ar-eg", "ar-ma", "ar-sa", "he"}:
        if token.endswith("s") and lang in {"es", "pt", "fr"} and not token.endswith(("ss", "is", "us")):
            return "m"
        if lang == "fr" and token.endswith(("tion", "sion", "té", "ette", "elle", "e")) and not token.endswith(("age", "ege", "isme")):
            return "f"
        if lang == "es" and token.endswith(("ión", "dad", "tad", "ez", "a")):
            return "f"
        if lang == "it" and token.endswith(("zione", "tà", "a")):
            return "f"
        if lang == "pt" and token.endswith(("ção", "dade", "gem", "a")):
            return "f"
        if lang == "ro" and token.endswith(("ie", "tate", "e", "ă", "a")):
            return "f"
        return "m"
    if lang == "el":
        if token.endswith(("α", "η")):
            return "f"
        if token.endswith(("ο", "ι", "μα")):
            return "n"
        return "m"
    return "m"


def load_cache() -> dict[str, dict[str, str]]:
    if not CACHE.exists():
        return {}
    return json.loads(CACHE.read_text())


def save_cache(cache: dict[str, dict[str, str]]) -> None:
    CACHE.write_text(json.dumps(cache, ensure_ascii=False, separators=(",", ":")))


def fetch_batch(lang: str, rows: list[dict]) -> dict[str, str]:
    payload = [{"id": row["id"], "word": row["word"], "en": row["en"]} for row in rows]
    prompt = (
        "Label the grammatical gender of each headword for a picture card that means "
        '"This is a/an NOUN." Reply with JSON only: {"id":"code"}. '
        "No markdown and no extra words. "
        + HINTS[lang]
        + " Use p when the headword is plural-only. Trust an adjective ending that already shows agreement.\n"
        + json.dumps(payload, ensure_ascii=False)
    )
    raw = parse_obj(chat(prompt))
    out = {}
    for ident, value in raw.items():
        code = normalize(lang, value)
        if code:
            out[str(ident)] = code
    return out


def fill_genders(langs: list[str], rows_by_lang: dict[str, list[dict]]) -> dict[str, dict[str, str]]:
    cache = load_cache()
    jobs = []
    for lang in langs:
        have = cache.setdefault(lang, {})
        missing = [row for row in rows_by_lang[lang] if row["id"] not in have]
        for start in range(0, len(missing), 40):
            jobs.append((lang, missing[start : start + 40]))
    print(f"gender batches {len(jobs)}", flush=True)
    done = 0
    if jobs:
        with ThreadPoolExecutor(max_workers=12) as pool:
            future_map = {pool.submit(fetch_batch, lang, batch): (lang, batch) for lang, batch in jobs}
            for future in as_completed(future_map):
                lang, batch = future_map[future]
                try:
                    found = future.result()
                except Exception as err:
                    print(f"batch fail {lang} {err}", flush=True)
                    found = {}
                cache.setdefault(lang, {}).update(found)
                done += 1
                if done % 25 == 0:
                    save_cache(cache)
                    print(f"batches {done}/{len(jobs)}", flush=True)
        save_cache(cache)
    # Retry ids the model skipped, in smaller groups.
    retry = []
    for lang in langs:
        have = cache.setdefault(lang, {})
        missing = [row for row in rows_by_lang[lang] if row["id"] not in have]
        for start in range(0, len(missing), 15):
            retry.append((lang, missing[start : start + 15]))
    print(f"retry batches {len(retry)}", flush=True)
    if retry:
        with ThreadPoolExecutor(max_workers=8) as pool:
            future_map = {pool.submit(fetch_batch, lang, batch): lang for lang, batch in retry}
            for future in as_completed(future_map):
                lang = future_map[future]
                try:
                    cache[lang].update(future.result())
                except Exception as err:
                    print(f"retry fail {lang} {err}", flush=True)
        save_cache(cache)
    return cache


def apply_simple() -> None:
    for lang in sorted(SIMPLE):
        rows = load_rows(lang)
        if lang == "th":
            # Thai uses the same colon template but the frame is special-cased.
            pass
        sentences = {row["id"]: simple_sentence(lang, row["word"]) for row in rows}
        n = write_sentences(lang, sentences) if sentences else 0
        print(f"simple {lang} matched {len(rows)} wrote {n}", flush=True)
    th_rows = load_rows("th")
    n = write_sentences("th", {row["id"]: thai(row["word"]) for row in th_rows}) if th_rows else 0
    print(f"simple th matched {len(th_rows)} wrote {n}", flush=True)


def apply_gendered(pilot: bool) -> None:
    rows_by_lang = {lang: load_rows(lang) for lang in GENDERED}
    for lang, rows in rows_by_lang.items():
        print(f"need {lang} {len(rows)}", flush=True)
    if pilot:
        sample = rows_by_lang["de"][:12]
        found = fetch_batch("de", sample)
        for row in sample:
            code = found.get(row["id"]) or guess("de", row["word"])
            print(row["en"], "|", row["word"], "|", code, "|", gendered_sentence("de", row["word"], code))
        return
    cache = fill_genders(list(GENDERED), rows_by_lang)
    for lang, rows in rows_by_lang.items():
        sentences = {}
        guessed = 0
        for row in rows:
            code = cache.get(lang, {}).get(row["id"]) or ""
            if not code:
                code = guess(lang, row["word"])
                guessed += 1
            sentences[row["id"]] = gendered_sentence(lang, row["word"], code)
        n = write_sentences(lang, sentences) if sentences else 0
        print(f"gender {lang} wrote {n} guessed {guessed}", flush=True)


def spot() -> None:
    want = {
        "de": re.compile(r"^Das (ist ein|ist eine|sind) "),
        "fr": re.compile(r"^(C’est un |C’est une |Ce sont des )"),
        "es": re.compile(r"^(Esto es un |Esto es una |Estos son )"),
        "ru": re.compile(r"^Это \S"),
        "nl": re.compile(r"^Dit is "),
        "ar": re.compile(r"^(هذا|هذه) \S"),
        "hi": re.compile(r"^यह "),
        "ja": None,
    }
    for lang, rule in want.items():
        path = ROOT / "i18n" / lang / "b2.json"
        items = json.loads(path.read_text())["items"]
        pics = [(i, it) for i, it in items.items() if str(i).startswith("pic-")]
        bad = 0
        colon = 0
        shown = 0
        print(f"\n== {lang} ==")
        for ident, item in pics:
            sentence = item.get("sentence") or ""
            if ": " in sentence[:16] or sentence.startswith("Das ist:"):
                colon += 1
            if rule and not rule.match(sentence):
                bad += 1
                if shown < 5:
                    print(" BAD", item.get("en"), sentence)
                    shown += 1
            elif shown < 3 and lang != "ja":
                print(" ", item.get("en"), "|", item.get("word"), "|", sentence)
                shown += 1
        print(f"pics {len(pics)} colonish {colon} rule-miss {bad}")


def main() -> None:
    pilot = "--pilot" in sys.argv
    if pilot:
        apply_gendered(True)
        return
    apply_simple()
    apply_gendered(False)
    spot()


if __name__ == "__main__":
    main()
