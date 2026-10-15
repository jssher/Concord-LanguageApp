#!/usr/bin/env python3
"""Point verb headwords that are still clauses at the dictionary form.

The headword and the sentence were translated separately. In several
languages the headword is "that they …" or "they want to …" instead of the
citation form used on the other cards. This replaces only those headwords,
and only with a form taken from the sentence or from an infinitive already
inside the headword whose stem is in the sentence.
"""

from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path

import simplemma

ROOT = Path("/workspace")
COURSE = ROOT / "public" / "course"
LEVELS = ["a1", "a2", "b1", "b2", "p"]

# Already aligned by scripts/align-headwords.py. Leave them alone.
DONE = {
    "cs", "da", "de", "es", "fr", "hr", "is", "it", "nl", "pl", "pt", "ro",
    "ru", "sk", "sl", "sr", "uk",
}

EL_SOFT = {"είμαι", "έχω", "μπορώ", "πρέπει", "θέλω", "παρακαλώ", "μαθαίνω", "κάνω"}
BG_SOFT = {"съм", "бъда", "мога", "трябва", "моля"}
TR_LIGHT = {"et", "ol", "yap"}
TR_STOP = {
    "bir", "bu", "şu", "o", "ve", "ile", "için", "gibi", "daha", "çok", "her",
    "ben", "sen", "biz", "siz", "onlar", "ne", "mi", "mı", "mu", "mü", "de", "da",
    "ki", "ama", "veya", "ya", "en", "sonra", "önce", "kadar", "göre", "diye",
}


def fold(text: str) -> str:
    text = unicodedata.normalize("NFKC", text or "").replace("’", "'")
    return re.sub(r"\s+", " ", text.strip().lower())


def tokens(text: str) -> list[str]:
    return re.findall(r"[^\W\d_]+", text or "", flags=re.UNICODE)


def squash(text: str) -> str:
    return re.sub(r"\s+", " ", (text or "").strip()).strip(" .。।")


def lower_first(text: str) -> str:
    text = squash(text)
    if not text:
        return text
    return text[:1].lower() + text[1:]


def tr_lower(text: str) -> str:
    return squash(text).replace("I", "ı").replace("İ", "i").lower()


def stem_in(word: str, sentence: str) -> bool:
    sent = fold(sentence)
    for part in tokens(word):
        part = fold(part)
        if len(part) < 3:
            continue
        n = 4 if len(part) >= 5 else 3
        if part[:n] in sent:
            return True
    return False


def unique(items: list[str]) -> list[str]:
    seen = set()
    out = []
    for item in items:
        key = fold(item)
        if not key or key in seen:
            continue
        seen.add(key)
        out.append(item)
    return out


def pick(cands: list[str], hint: str, prefer_first: bool) -> str | None:
    cands = unique([c for c in cands if c])
    if not cands:
        return None
    matched = [c for c in cands if stem_in(c, hint) or stem_in(hint, c)]
    if len(matched) == 1:
        return matched[0]
    if len(matched) > 1:
        return matched[0] if prefer_first else matched[-1]
    if len(cands) == 1:
        return cands[0]
    return cands[0] if prefer_first else cands[-1]


def load_english() -> dict:
    items = {}
    for level in LEVELS:
        path = COURSE / "ready" / f"{level}.json"
        if path.exists():
            for row in json.loads(path.read_text()):
                items[row["id"]] = row
    return items


def iter_verbs(lang: str, english: dict):
    for level in LEVELS:
        path = COURSE / "i18n" / lang / f"{level}.json"
        if not path.exists():
            continue
        pack = json.loads(path.read_text())
        items = pack.get("items", {})
        jobs = []
        for key, row in items.items():
            src = english.get(key)
            if not src or src.get("pos") != "verb" or src.get("kind") not in {None, "word"}:
                continue
            word = str(row.get("word") or "").strip()
            sentence = str(row.get("sentence") or "").strip()
            if word and sentence:
                jobs.append((key, row, word, sentence))
        yield path, pack, jobs


EL_TABLE = {
    "α": "a", "β": "v", "γ": "g", "δ": "d", "ε": "e", "ζ": "z", "η": "i", "θ": "th", "ι": "i", "κ": "k", "λ": "l",
    "μ": "m", "ν": "n", "ξ": "x", "ο": "o", "π": "p", "ρ": "r", "σ": "s", "ς": "s", "τ": "t", "υ": "y", "φ": "f",
    "χ": "ch", "ψ": "ps", "ω": "o", "ά": "a", "έ": "e", "ή": "i", "ί": "i", "ό": "o", "ύ": "y", "ώ": "o", "ϊ": "i", "ϋ": "y",
}
BG_TABLE = {
    "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e", "ё": "yo", "ж": "zh", "з": "z", "и": "i", "й": "y",
    "к": "k", "л": "l", "м": "m", "н": "n", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u", "ф": "f",
    "х": "kh", "ц": "ts", "ч": "ch", "ш": "sh", "щ": "sht", "ъ": "a", "ы": "y", "ь": "y", "э": "e", "ю": "yu", "я": "ya",
}


def translit(text: str, table: dict[str, str]) -> str:
    out = []
    for ch in text:
        low = ch.lower()
        piece = table.get(low)
        out.append(piece if piece is not None else ch)
    return "".join(out)


def set_word(row: dict, lang: str, word: str) -> None:
    row["word"] = word
    if lang == "el" and row.get("reading"):
        row["reading"] = translit(word, EL_TABLE)
    elif lang == "bg" and row.get("reading"):
        row["reading"] = translit(word, BG_TABLE)


def greek_verbs(sentence: str) -> list[str]:
    found = []
    for tok in tokens(sentence):
        lem = fold(simplemma.lemmatize(tok, lang="el"))
        if re.search(r"(?:ω|ώ|μαι)$", lem):
            found.append(lem)
    soft = [v for v in found if v not in EL_SOFT]
    return soft or found


def greek(word: str, sentence: str) -> str | None:
    bad = fold(word).startswith("να") or " " in word.strip() or not re.search(r"(?:ω|ώ|μαι)$", fold(word))
    if not bad and stem_in(word, sentence):
        return None
    cands = greek_verbs(sentence)
    if not cands:
        return None
    if not bad and len(unique(cands)) != 1:
        return None
    return pick(cands, word, prefer_first=True)


def bulgarian_verbs(doc) -> list[str]:
    sentence = " ".join(word.text for sent in doc.sentences for word in sent.words)
    found = []
    reflexive = bool(re.search(r"(?<!\w)се(?!\w)", sentence.lower()))
    for sent in doc.sentences:
        for verb in sent.words:
            if verb.upos != "VERB" or not verb.lemma:
                continue
            raw = verb.lemma.strip().lower()
            marked = bool(re.search(r"-(?:се|си)$", raw) or re.search(r"-\((?:се|си)\)$", raw))
            lem = re.sub(r"-\((?:се|си)\)$", "", raw)
            lem = re.sub(r"-(?:се|си)$", "", lem).strip()
            if marked and reflexive:
                lem = f"{lem} се"
            if lem:
                found.append(lem)
    soft = [v for v in found if v.split()[0] not in BG_SOFT]
    return soft or found


def bulgarian(word: str, doc) -> str | None:
    if not (fold(word).startswith("да") or " " in word.strip()):
        return None
    cands = bulgarian_verbs(doc)
    return pick(cands, word, prefer_first=True)


def albanian_cite(surface: str) -> str:
    surf = fold(surface)
    lem = fold(simplemma.lemmatize(surface, lang="sq"))
    plural = re.search(r"(?:jmë|jnë|në|jm|am|at|im|ni|më|on|en|in)$", surf)
    if re.search(r"(?:oj|aj|ej|ij|yj|hem)$", lem) and plural:
        return lem
    if re.search(r"(?:oj|aj|ej|ij|yj|hem|esh|oh)$", surf) and not plural:
        return surf
    if lem and surf.startswith(lem) and not plural:
        return surf
    return lem or surf


def polish_sq(cite: str) -> str:
    cite = fold(cite)
    if cite in {"mund", "duhet", "do"}:
        return ""
    if cite.endswith("jnë"):
        return cite[:-3] + "j"
    if cite.endswith("jë"):
        return cite[:-1]
    if cite.endswith("hen"):
        return cite[:-3] + "hem"
    return cite


def albanian(word: str, doc) -> str | None:
    if not (fold(word).startswith("të") or fold(word).startswith("te ") or " " in word.strip()):
        return None
    cands = []
    for sent in doc.sentences:
        for verb in sent.words:
            if verb.upos != "VERB":
                continue
            cite = polish_sq(albanian_cite(verb.text))
            if cite and cite not in {"jam"}:
                cands.append(cite)
    return pick(cands, word, prefer_first=True)


def tr_infinitive(stem: str) -> str:
    if stem.endswith("mak") or stem.endswith("mek"):
        return stem
    for ch in reversed(stem):
        if ch in "eiöü":
            return stem + "mek"
        if ch in "aıou":
            return stem + "mak"
    return stem + "mek"


def turkish_verbs(sentence: str) -> list[str]:
    toks = tokens(sentence)
    found = []
    for i, tok in enumerate(toks):
        lem = tr_lower(simplemma.lemmatize(tok, lang="tr"))
        if lem == tr_lower(tok) or not re.fullmatch(r"[a-zçğıöşü]+", lem) or len(lem) < 2:
            continue
        if lem in TR_STOP:
            continue
        if lem in TR_LIGHT and i > 0:
            prev = tr_lower(toks[i - 1])
            if prev not in TR_STOP and len(prev) >= 3 and not re.search(r"(mak|mek)$", prev):
                found.append(f"{prev} {tr_infinitive(lem)}")
                continue
        if lem in TR_LIGHT:
            continue
        found.append(tr_infinitive(lem))
    return found


def turkish(word: str, sentence: str) -> str | None:
    """Drop the 'they want' tail. Keep the infinitive already in the headword.

    Guessing an infinitive from the sentence misreads nouns (gölde → gölmek),
    so a new infinitive is built only when the headword has none.
    """
    raw = tr_lower(word)
    if not re.search(r"istiyor|ister", raw):
        return None
    stripped = re.sub(r"\s+istiyor\w*|\s+ister(?:ler|im|sin|iz)?$", "", raw).strip()
    if re.search(r"(?:mak|mek)$", stripped) and 1 <= len(stripped.split()) <= 3:
        return stripped
    cands = [c for c in turkish_verbs(sentence) if c not in {"vermek", "etmek", "olmak", "yapmak", "kalmak", "gelmek", "bulmak", "demek"}]
    if len(unique(cands)) == 1 and stem_in(cands[0].split()[-1], sentence):
        return cands[0]
    return None


def basque(word: str, sentence: str) -> str | None:
    stripped = re.sub(r"(?i)(?:^|\s+)nahi\s+d\w+.*$", "", word.strip()).strip(" .")
    if not stripped or fold(stripped) == fold(word):
        return None
    if len(stripped.split()) > 2 or re.search(r"(?i)nahi|dute|dut\b", stripped):
        return None
    cite = lower_first(stripped)
    if not re.search(r"(?:tu|du|i|n|tzea)$", cite):
        return None
    return cite


def hindi(word: str, sentence: str) -> str | None:
    stripped = re.sub(r"\s*चाह(?:ते|ती|ता|तीं)\s+हैं[।.]?\s*$", "", word.strip()).strip(" ।.")
    if not stripped or stripped == word.strip():
        return None
    if not re.search(r"(?:ना|नी|ने)$", stripped) or len(stripped.split()) > 3:
        return None
    if not stem_in(stripped, sentence):
        return None
    return stripped


def urdu(word: str, sentence: str) -> str | None:
    stripped = re.sub(r"\s*چاہ(?:تے|تی|تا)\s+ہیں[۔.]?\s*$", "", word.strip()).strip(" ۔.")
    if not stripped or stripped == word.strip():
        return None
    if not re.search(r"نا$", stripped) or len(stripped.split()) > 3:
        return None
    if not stem_in(stripped, sentence):
        return None
    return stripped


def bengali(word: str, sentence: str) -> str | None:
    stripped = re.sub(r"\s*চায়\s*$", "", word.strip()).strip(" ।.")
    if not stripped or stripped == word.strip() or len(stripped.split()) > 3:
        return None
    last = stripped.split()[-1]
    core = re.sub(r"(?:তে|া)$", "", last)
    lexical = stripped.split()[0]
    if (len(core) >= 2 and core in sentence) or (len(lexical) >= 2 and lexical in sentence):
        return stripped
    return None


def tagalog(word: str, sentence: str) -> str | None:
    stripped = re.sub(r"(?i)^nais nilang\s+", "", word.strip()).strip()
    if not stripped or " " in stripped or fold(stripped) == fold(word):
        return None
    return lower_first(stripped)


def korean(word: str, sentence: str) -> str | None:
    text = squash(word)
    cite = None
    match = re.match(r"^(.+?)하고\s*(?:싶|원)", text)
    if match:
        stem = match.group(1)
        cite = stem + "다" if stem.endswith("하") else stem + "하다"
    else:
        match = re.match(r"^(.+?)고\s*싶", text)
        if match:
            cite = match.group(1) + "다"
        else:
            match = re.match(r"^(.+?)기를\s*원", text)
            if match:
                cite = match.group(1) + "다"
            else:
                match = re.match(r"^(.+?)[을를]\s*원", text)
                if match and re.search(r"[가-힣]", match.group(1)) and not re.search(r"[A-Za-z]", match.group(1)):
                    cite = match.group(1) + "하다"
    if not cite or cite == text:
        return None
    stem = cite[:-2] if cite.endswith("하다") else cite[:-1]
    if len(stem) < 1 or stem not in sentence:
        return None
    return cite


def swahili(word: str, sentence: str) -> str | None:
    match = re.match(r"(?i)^wanahitaji\s+(.+)$", word.strip())
    if not match:
        return None
    rest = match.group(1).strip(".,")
    parts = rest.split()
    if parts[0].lower() == "kuwa" and len(parts) > 1 and parts[1].lower() == "na":
        cite = "kuwa na"
    else:
        cite = parts[0].lower().strip(".,")
    if not (cite.startswith("ku") or cite.startswith("kw")):
        return None
    if not stem_in(cite, sentence):
        return None
    return cite


def arabic_lemma(lemma: str) -> str | None:
    lem = (lemma or "").strip()
    if not re.search(r"[\u0600-\u06FF]", lem):
        return None
    if re.search(r"[\u064B-\u0652\u0670]{2}", lem):
        return None
    bare = re.sub(r"[\u064B-\u0652\u0670\u0640]", "", lem)
    if len(bare) < 3 or len(bare) > 8:
        return None
    return lem


def arabic(word: str, doc) -> str | None:
    if not re.match(r"^(?:أن|إن|إنهم|انهم)\b", word.strip()):
        return None
    cands = []
    for sent in doc.sentences:
        for verb in sent.words:
            if verb.upos != "VERB":
                continue
            lem = arabic_lemma(verb.lemma or "")
            if lem:
                cands.append(lem)
    return pick(cands, word, prefer_first=True)


EO_SOFT = {"bonvoli", "povi", "devi"}


def eo_hits(inf: str, sentence: str) -> bool:
    stem = fold(inf)[:-1]
    if len(stem) < 2:
        return False
    return any(fold(tok).startswith(stem) for tok in tokens(sentence))


def esperanto(word: str, sentence: str) -> str | None:
    raw = fold(word)
    if re.fullmatch(r"[a-zĉĝĥĵŝŭ]+i", raw) and eo_hits(raw, sentence):
        return None
    found = []
    for tok in tokens(sentence):
        lem = fold(simplemma.lemmatize(tok, lang="eo"))
        tok_f = fold(tok)
        if re.search(r"(?:as|is|os|us|u|i)$", tok_f) and re.fullmatch(r"[a-zĉĝĥĵŝŭ]{3,}i", lem) and lem not in EO_SOFT:
            found.append(lem)
    content = [v for v in found if v != "esti"] or found
    only = unique(content)
    if not only:
        return None
    if re.fullmatch(r"[a-zĉĝĥĵŝŭ]+i", raw):
        return only[0] if only[0] != raw else None
    return pick(content, word, prefer_first=True)


def armenian(word: str, sentence: str) -> str | None:
    raw = word.strip()
    # գնալ and գնել share a shape the lemmatizer confuses, so a real infinitive stays.
    if re.search(r"(?:ել|ալ)$", raw):
        return None
    found = []
    for tok in tokens(sentence):
        lem = simplemma.lemmatize(tok, lang="hy")
        if re.search(r"(?:ել|ալ)$", lem) and lem != tok and lem not in {"խնդրել"}:
            found.append(lem)
    soft = [v for v in found if v not in {"ուզել"}]
    return pick(soft or found, raw, prefer_first=True)


def persian(word: str, sentence: str) -> str | None:
    if "خواه" not in word or " " not in word:
        return None
    found = []
    for tok in tokens(word):
        if tok.startswith("ب") and len(tok) > 3:
            lem = simplemma.lemmatize(tok, lang="fa")
            if lem and lem != tok:
                inf = lem if lem.endswith("ن") else lem + "ن"
                found.append(inf)
    for tok in tokens(sentence):
        lem = simplemma.lemmatize(tok, lang="fa")
        if lem and lem != tok and re.search(r"[\u0600-\u06FF]", lem) and len(lem) >= 3:
            inf = lem if lem.endswith("ن") else None
            if inf:
                found.append(inf)
    chosen = pick(unique(found), word, prefer_first=False)
    if chosen and (stem_in(chosen, sentence) or stem_in(chosen, word)):
        return chosen
    return None


def macedonian_cite(surface: str) -> str | None:
    surf = fold(surface)
    if re.search(r"(?:ам|јам)$", surf) and len(surf) > 3:
        return surf
    lem = fold(simplemma.lemmatize(surface, lang="mk"))
    if lem == surf:
        return None
    present = bool(re.search(r"(?:ува|ира|ава|еме|аме|име|ат|ам)$", surf))
    if not present:
        return None
    if lem.endswith("и"):
        return lem[:-1] + "ам"
    if lem.endswith("е"):
        return lem[:-1] + "ам"
    if lem.endswith("а"):
        return lem + "м"
    return None


def macedonian(word: str, sentence: str) -> str | None:
    raw = fold(word.strip())
    if " " in word.strip() and not raw.startswith("да "):
        return None
    if re.search(r"(?:ам|јам|ем|им)$", raw) and " " not in raw and stem_in(raw, sentence):
        return None
    found = []
    for tok in tokens(sentence):
        cite = macedonian_cite(tok)
        if cite and cite not in {"можам", "сум", "имам", "требам", "сакам"}:
            found.append(cite)
    looks_verb = " " not in raw and bool(re.search(r"(?:а|и|е|ува|ира)$", raw))
    matched = [c for c in unique(found) if stem_in(c, raw) or stem_in(raw, c)]
    if len(matched) == 1:
        return None if fold(matched[0]) == raw else matched[0]
    if looks_verb:
        return None
    if len(unique(found)) == 1:
        return found[0]
    return None


def irish(word: str, sentence: str) -> str | None:
    stripped = re.sub(r"(?i)^mhaith leo\s+", "", word.strip()).strip()
    if not stripped or " " in stripped or fold(stripped) == fold(word):
        return None
    cite = lower_first(stripped)
    if not stem_in(cite, sentence):
        return None
    return cite


HAND = {
    "el": greek,
    "tr": turkish,
    "eu": basque,
    "hi": hindi,
    "ur": urdu,
    "bn": bengali,
    "tl": tagalog,
    "ko": korean,
    "sw": swahili,
    "eo": esperanto,
    "hy": armenian,
    "mk": macedonian,
    "ga": irish,
}

STANZA = {"bg": bulgarian, "sq": albanian, "ar": arabic, "ar-eg": arabic, "ar-ma": arabic, "ar-sa": arabic}


def apply_lang(lang: str, english: dict, write: bool) -> list[dict]:
    import stanza

    changed = []
    packs = list(iter_verbs(lang, english))
    docs = None
    if lang in STANZA:
        sentences = [sentence for _, _, jobs in packs for *_, sentence in jobs]
        if lang.startswith("ar"):
            code = "ar"
        else:
            code = lang
        nlp = stanza.Pipeline(code, processors="tokenize,pos,lemma", verbose=False, use_gpu=False)
        docs = nlp.bulk_process(sentences) if sentences else []
    cursor = 0
    for path, pack, jobs in packs:
        dirty = False
        for key, row, word, sentence in jobs:
            doc = docs[cursor] if docs is not None else None
            if docs is not None:
                cursor += 1
            src = english.get(key, {})
            en_sent = str(src.get("sentence") or "")
            if re.match(r"i am learning to\b", en_sent, re.I):
                continue
            if lang in STANZA:
                cite = STANZA[lang](word, doc)
            else:
                cite = HAND[lang](word, sentence)
            if not cite:
                continue
            cite = squash(cite)
            if not cite or fold(cite) == fold(word) or len(cite) > 40 or len(cite.split()) > 3:
                continue
            changed.append({"id": key, "old": word, "new": cite, "sentence": sentence, "en": english.get(key, {}).get("en")})
            if write:
                set_word(row, lang, cite)
                dirty = True
        if write and dirty:
            path.write_text(json.dumps(pack, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
            print(f"wrote {path}", flush=True)
    return changed


def main() -> None:
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("langs", nargs="*")
    parser.add_argument("--write", action="store_true")
    args = parser.parse_args()
    english = load_english()
    langs = args.langs or list(HAND) + ["bg", "sq", "ar", "ar-eg", "ar-ma", "ar-sa"]
    for lang in langs:
        if lang in DONE:
            print(f"skip {lang}")
            continue
        if lang not in HAND and lang not in STANZA:
            print(f"no handler {lang}")
            continue
        if not (COURSE / "i18n" / lang).exists():
            print(f"missing {lang}")
            continue
        changed = apply_lang(lang, english, args.write)
        print(f"\n==== {lang} {len(changed)} ====")
        for row in changed[:12]:
            print(f"  {row['en']}: {row['old'][:42]!r} -> {row['new']!r}")
            print(f"    {row['sentence'][:90]}")
        out = Path(f"/tmp/align-rest-{lang}.json")
        out.write_text(json.dumps(changed, ensure_ascii=False, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
