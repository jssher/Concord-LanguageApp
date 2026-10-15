#!/usr/bin/env python3
"""Point a verb card's headword at the dictionary form used in its sentence.

The headword and the sentence were translated separately, so the headword is
often a noun, an imperative, or a different verb. The sentence is kept. The
headword becomes the infinitive of the sentence's main verb, unless the card
already shows that infinitive. Bulgarian and Macedonian are skipped: they
have no infinitive.

Stanza (Apache-2.0) supplies the lemma. A lemma is written only when it is
visibly the verb in the sentence.
"""

from __future__ import annotations

import argparse
import json
import re
import unicodedata
from pathlib import Path

import stanza

ROOT = Path("/workspace")
COURSE = ROOT / "public" / "course"
LEVELS = ["a1", "a2", "b1", "b2", "p"]
PREV = Path("/tmp/align-prev")

PROFILES = {
    "hr": ("hr", r"(?:ti|ći|sti)$", {"moći", "trebati", "morati", "smjeti", "htjeti"}),
    "sr": ("sr", r"(?:ти|ћи|сти)$", {"моћи", "требати", "морати", "смети", "хтети", "хтјети"}),
    "sl": ("sl", r"(?:ti|či)$", {"moči", "morati", "hoteti", "smeti"}),
    "pl": ("pl", r"(?:ć|c)$", {"móc", "musieć", "chcieć", "powinien"}),
    "cs": ("cs", r"(?:t|ti|ci)$", {"moci", "moct", "muset", "chtít", "smět"}),
    "de": ("de", r"(?:en|eln|ern|sein|tun)$", {"können", "müssen", "wollen", "sollen", "dürfen", "mögen"}),
    "nl": ("nl", r"(?:en|zijn)$", {"kunnen", "moeten", "willen", "zullen", "mogen"}),
    "da": ("da", r"(?:e|å)$", {"kunne", "skulle", "ville", "måtte", "burde"}),
    "sv": ("sv", r"(?:a)$", {"kunna", "skola", "vilja", "måste", "böra"}),
    "fr": ("fr", r"(?:er|ir|re|oir)$", {"pouvoir", "devoir", "vouloir", "falloir", "aller"}),
    "es": ("es", r"(?:ar|er|ir)$", {"poder", "deber", "querer", "soler", "ir"}),
    "it": ("it", r"(?:are|ere|ire|rre)$", {"potere", "dovere", "volere", "andare"}),
    "pt": ("pt", r"(?:ar|er|ir|or)$", {"poder", "dever", "querer", "ir"}),
    "ro": ("ro", r"(?:a|e|ea|i|î)$", {"putea", "trebui", "vrea", "avea"}),
    "ru": ("ru", r"(?:ть|ти|чь)$", {"мочь", "хотеть", "должен"}),
    "uk": ("uk", r"(?:ти|тися)$", {"могти", "хотіти", "мусити"}),
    "sk": ("sk", r"(?:ť|cť)$", {"môcť", "musieť", "chcieť", "smieť"}),
    "is": ("is", r"(?:a)$", {"geta", "verða", "skulu", "vilja", "mega", "eiga"}),
    "la": ("la", r"(?:re|ri|i)$", {"possum", "debeo", "volo", "nolo"}),
}

SR_CYR = "абвгдђежзијклљмнњопрстћуфхцчџш"
SR_LAT = ["a", "b", "v", "g", "d", "đ", "e", "ž", "z", "i", "j", "k", "l", "lj", "m", "n", "nj", "o", "p", "r", "s", "t", "ć", "u", "f", "h", "c", "č", "dž", "š"]
SR_TO_LAT = dict(zip(SR_CYR, SR_LAT))
SR_TO_CYR = {lat: cyr for cyr, lat in SR_TO_LAT.items()}

LIGHT = {
    "hr": {"moći", "trebati", "morati", "smjeti", "htjeti", "željeti", "pokušati", "pokušavati", "učiti", "naučiti", "činiti", "biti", "moliti", "pomoći", "pomagati"},
    "sr": {"моћи", "требати", "морати", "смети", "хтети", "желети", "покушати", "учити", "чинити", "бити", "молити", "помоћи"},
    "sr-lat": {"moći", "trebati", "morati", "smeti", "hteti", "želeti", "pokušati", "pokušavati", "učiti", "naučiti", "činiti", "biti", "moliti", "pomoći", "pomagati"},
}

# Support verbs that should not replace a longer infinitive phrase.
SUPPORT = {
    "de": {"sein", "haben", "werden", "lassen", "tun", "gehen", "kommen", "machen", "geben"},
    "fr": {"être", "avoir", "faire", "mettre", "aller"},
    "es": {"ser", "estar", "haber", "ir", "dar", "hacer", "poner"},
    "it": {"essere", "avere", "fare", "andare", "stare"},
    "pt": {"ser", "estar", "haver", "ir", "fazer", "pôr", "dar"},
    "nl": {"zijn", "hebben", "worden", "laten", "doen", "gaan", "komen", "maken"},
    "da": {"være", "have", "blive", "gøre", "gå", "komme"},
    "ro": {"fi", "avea", "face"},
    "ru": {"быть", "делать", "идти"},
    "uk": {"бути", "мати", "робити"},
    "sk": {"byť", "mať", "ísť", "dať"},
    "cs": {"být", "mít", "jít", "dát"},
    "hr": {"biti", "učiti", "moliti", "činiti"},
    "sr": {"бити", "учити", "молити", "чинити"},
    "sl": {"biti"},
    "pl": {"być"},
    "is": {"vera", "hafa"},
}
KEEP_EN = {"be", "have", "do", "make", "go", "come", "let", "see", "say"}
CLITIC_LEM = {"sebe", "se", "себе", "се", "sich", "si", "się", "sa"}
VOWELS = set("aeiouyäöüáéíóúýěůàèìòùâêîôûãõåæøœăâî")
SKIP_TOKS = {"se", "si", "sich", "sa", "to", "a", "zu", "y", "en", "na", "le", "la", "les", "el", "lo", "os", "nos", "vous", "nous", "me", "te"}


def cyr_to_lat(text: str) -> str:
    out = []
    for ch in text:
        low = ch.lower()
        if low in SR_TO_LAT:
            piece = SR_TO_LAT[low]
            if ch.isupper():
                piece = piece.upper() if len(piece) == 1 else piece[:1].upper() + piece[1:]
            out.append(piece)
        else:
            out.append(ch)
    return "".join(out)


def lat_to_cyr(text: str) -> str:
    digraphs = [("dž", "џ"), ("lj", "љ"), ("nj", "њ")]
    i = 0
    out = []
    while i < len(text):
        chunk = text[i : i + 2].lower()
        hit = next((cyr for lat, cyr in digraphs if chunk == lat), None)
        if hit:
            out.append(hit.upper() if text[i].isupper() else hit)
            i += 2
            continue
        ch = text[i]
        mapped = SR_TO_CYR.get(ch.lower())
        if mapped:
            out.append(mapped.upper() if ch.isupper() else mapped)
        else:
            out.append(ch)
        i += 1
    return "".join(out)


def fold(text: str) -> str:
    text = unicodedata.normalize("NFKC", text or "").replace("’", "'")
    return re.sub(r"\s+", " ", text.strip().lower())


def tokens(text: str) -> list[str]:
    return re.findall(r"[^\W\d_]+", fold(text), flags=re.UNICODE)


def skeleton(word: str) -> str:
    chars = []
    for ch in fold(word):
        base = "".join(c for c in unicodedata.normalize("NFD", ch) if unicodedata.category(c) != "Mn")
        if base.lower() in VOWELS or not base.isalpha():
            continue
        chars.append(base.lower())
    return "".join(chars)


def contents(text: str) -> list[str]:
    return [tok for tok in tokens(text) if tok not in SKIP_TOKS and len(tok) > 1]


def related(a: str, b: str) -> bool:
    left = contents(a) or [fold(a)]
    right = contents(b) or [fold(b)]
    for x in left:
        for y in right:
            if len(x) >= 4 and len(y) >= 4 and (x[:4] in y or y[:4] in x):
                return True
            sx, sy = skeleton(x), skeleton(y)
            if len(sx) >= 4 and len(sy) >= 4 and sx[:4] == sy[:4]:
                return True
            if len(x) >= 4 and len(y) >= 4 and x[:3] == y[:3]:
                return True
    return False


def load_english() -> dict:
    items = {}
    for level in LEVELS:
        path = COURSE / "ready" / f"{level}.json"
        if not path.exists():
            continue
        for row in json.loads(path.read_text()):
            items[row["id"]] = row
    return items


def bare_infinitive(word: str, ending: str) -> str:
    w = fold(word)
    w = re.sub(r"^(se |s'|sich |sa |si )", "", w)
    w = re.sub(r" (se|si|sich|się|sa|се)$", "", w)
    if re.search(r"(?:ar|er|ir|ár|ér|ír)se$", w):
        w = w[:-2]
    if re.search(r"(?:arsi|ersi|irsi)$", w):
        stem = w[:-2]
        w = stem if re.search(ending, stem) else stem + "e"
    return w


def looks_infinitive(word: str, ending: str) -> bool:
    token = bare_infinitive(word, ending)
    return bool(re.search(ending, token)) and len(token.split()) == 1 and len(token) >= 3


def stem_supported(lemma: str, surface: str) -> bool:
    """The infinitive has to be visible in the word it came from.

    Slavic -ivati/-ovati suffixes add a consonant that is not in the
    finite form (ukazuju → ukazivati), so that suffix is ignored.
    """
    lem = fold(lemma).split()[0]
    surf = fold(surface)
    if lem == surf or (len(lem) >= 4 and lem[:4] in surf):
        return True
    bare = re.sub(r"(ivati|ovati|irati|avati|evati|yvati|jati|nuti|ati|eti|iti|ći|sti|ти|ть)$", "", lem)
    return len(bare) >= 4 and bare[:4] in surf


def glued_imperative(lemma: str, surface: str) -> bool:
    """Reject 'stani' → 'staniti', where -ti was stuck onto a short imperative."""
    lem = fold(lemma).split()[0]
    surf = fold(surface)
    if surf + "ti" != lem and surf + "ти" != lem:
        return False
    return len(surf) <= 5 and surf.endswith(("ni", "nji", "ji", "ни", "њи", "ји"))


def cite_form(lang: str, lemma: str) -> str:
    lemma = fold(lemma)
    match = re.search(r" (se|si|sich|się|sa|се)$", lemma)
    if not match:
        return lemma
    bare, clit = lemma[: match.start()], match.group(1)
    if lang == "es" and re.search(r"(?:ar|er|ir)$", bare):
        return bare + "se"
    if lang == "it" and bare.endswith("e"):
        return bare[:-1] + "si"
    if lang == "pt":
        return "se " + bare
    if lang == "fr":
        return ("s'" + bare) if bare[:1] in "aeiouhâêîôûé" else "se " + bare
    if lang == "de":
        return "sich " + bare
    if lang == "pl":
        return bare + " się"
    if lang == "sk":
        return bare + " sa"
    if lang == "cs":
        return bare + " se"
    return f"{bare} {clit}"


def verb_candidates(sent, ending: str) -> list[tuple[str, str, object]]:
    found = []
    for verb in sent.words:
        if verb.upos != "VERB" or not verb.lemma:
            continue
        lemma = verb.lemma.strip()
        if not looks_infinitive(lemma, ending) or glued_imperative(lemma, verb.text) or not stem_supported(lemma, verb.text):
            continue
        expl = next(
            (
                word.text
                for word in sent.words
                if word.head == verb.id and (word.deprel or "").startswith("expl") and fold(word.lemma or word.text) in CLITIC_LEM
            ),
            None,
        )
        if expl and fold(expl) not in fold(lemma):
            lemma = f"{lemma} {fold(expl)}"
        found.append((lemma, verb.text, verb))
    return found


def stem_hits(word: str, sentence: str) -> bool:
    for part in contents(word):
        sk = skeleton(part)
        for tok in tokens(sentence):
            if len(tok) < 4:
                continue
            if len(sk) >= 4 and len(skeleton(tok)) >= 4 and skeleton(tok)[:4] == sk[:4]:
                return True
            if len(part) >= 4 and (tok.startswith(part[:4]) or part.startswith(tok[: min(4, len(tok))])):
                return True
    return False


def phrase_supported(current: str, sentence: str) -> bool:
    parts = contents(current)
    if len(parts) < 2:
        return False
    hits = 0
    for part in parts:
        if len(part) < 4:
            continue
        for tok in tokens(sentence):
            if part[:4] in tok or (len(skeleton(part)) >= 4 and skeleton(tok)[:4] == skeleton(part)[:4]):
                hits += 1
                break
    return hits >= 2


def choose(current: str, cands: list[tuple[str, str, object]], ending: str, light: set[str], sentence: str) -> str | None:
    """Infinitive of the sentence verb, or None to leave the card alone.

    A headword that is already an infinitive stays. Swapping one infinitive
    for another usually picks a different verb in a long sentence.
    """
    if not cands or looks_infinitive(current, ending):
        return None

    def core(lemma: str) -> str:
        return fold(lemma).split()[0]

    # Common second-clause verbs. Do not adopt one unless it matches the headword.
    easy = light | {
        "početi", "počinjati", "čitati", "propustiti", "vidjeti", "reći", "kazati", "ići", "doći",
        "gledati", "pogledati", "znati", "misliti", "htjeti", "želeti", "želeti",
        "beginnen", "sehen", "lesen", "sagen", "kommen", "gehen",
        "voir", "lire", "dire", "venir", "aller",
        "ver", "leer", "decir", "ir", "venir",
        "vedere", "leggere", "dire", "andare",
    }
    content = [cand for cand in cands if core(cand[0]) not in light]
    related_c = [cand for cand in content if related(current, cand[0]) or related(current, cand[1])]
    if len(related_c) == 1 and fold(related_c[0][0]) != fold(current):
        return related_c[0][0]
    if len(related_c) > 1:
        roots = [cand for cand in related_c if cand[2].deprel == "root"]
        if len(roots) == 1 and fold(roots[0][0]) != fold(current):
            return roots[0][0]
        return None
    if phrase_supported(current, sentence) or stem_hits(current, sentence):
        return None
    roots = [cand for cand in content if cand[2].deprel == "root" and core(cand[0]) not in easy]
    if len(roots) == 1:
        return roots[0][0]
    xcomps = [cand for cand in content if cand[2].deprel in {"xcomp", "ccomp"} and core(cand[0]) not in easy]
    light_roots = [cand for cand in cands if cand[2].deprel == "root" and core(cand[0]) in light]
    if len(light_roots) == 1 and len(xcomps) == 1:
        return xcomps[0][0]
    return None


def clitic_on_verb(lang: str, sentence: str, bare: str) -> bool:
    clitics = {
        "es": {"se", "me", "te", "nos", "os"},
        "it": {"si", "mi", "ti", "ci", "vi"},
        "pt": {"se", "me", "te", "nos"},
        "fr": {"se", "me", "te", "nous", "vous"},
        "de": {"sich"},
    }.get(lang)
    if not clitics:
        return False
    stem = fold(bare)[:4]
    if len(stem) < 3:
        return False
    toks = tokens(sentence)
    for i, tok in enumerate(toks):
        if stem not in tok:
            continue
        if lang == "de":
            window = toks[max(0, i - 1) : i + 2]
        else:
            window = toks[max(0, i - 2) : i]
        if any(piece in clitics for piece in window):
            return True
    if lang == "fr" and re.search(rf"(?:s'|m'|t'){stem}", fold(sentence)):
        return True
    return False


def nounish(word: str) -> bool:
    parts = contents(word)
    if len(parts) != 1:
        return False
    return bool(re.search(r"(a|o|e|ost|nje|anje|enje|ija|а|о|е|ие|ость|ние|ция|је)$", parts[0]))


def repair_language(lang: str, write: bool) -> int:
    """Undo replacements that dropped a reflexive or picked a different clause."""
    path = PREV / f"align-{lang}.json"
    if not path.exists():
        return 0
    report = json.loads(path.read_text())["changed"]
    packs: dict[str, tuple[Path, dict]] = {}
    n = 0
    for row in report:
        level = row["level"]
        if level not in packs:
            file = COURSE / "i18n" / lang / f"{level}.json"
            packs[level] = (file, json.loads(file.read_text()) if file.exists() else {"items": {}})
        file, pack = packs[level]
        item = pack.get("items", {}).get(row["id"])
        if not item:
            continue
        current = str(item.get("word") or "")
        new, old, sent = str(row["new"]), str(row["old"]), str(row["sentence"] or "")
        if fold(current) != fold(new):
            continue
        restored = None
        o, nw = fold(old), fold(new)
        bare = o[:-2] if lang == "es" and re.fullmatch(r".+(?:ar|er|ir|ár|ér|ír)se", o) else ""
        if lang == "it" and re.search(r"(?:arsi|ersi|irsi)$", o):
            stem = o[:-2]
            bare = stem if re.search(r"(?:are|ere|ire|rre|ar|er|ir)$", stem) else stem + "e"
        if lang == "fr" and (o.startswith("se ") or o.startswith("s'")):
            bare = o[3:] if o.startswith("se ") else o[2:]
        if lang == "de" and o.startswith("sich "):
            bare = o[5:]
        if lang == "pt":
            if o.startswith("se "):
                bare = o[3:]
            elif nw.endswith(" se"):
                bare = nw[:-3]
        same_pron = bool(bare) and (nw == bare or nw == f"{bare} se" or related(bare, nw.split()[0]))
        if same_pron and clitic_on_verb(lang, sent, bare):
            if lang == "pt":
                restored = "se " + nw.split()[0].removesuffix("se").strip()
                if restored == "se " or not related(restored, bare):
                    restored = "se " + bare.split()[0]
            elif lang == "es":
                restored = bare + "se" if re.search(r"(?:ar|er|ir)$", bare) else o
            elif lang == "it":
                restored = (bare[:-1] + "si") if bare.endswith("e") else o
            elif lang == "fr":
                restored = ("s'" + bare) if bare[:1] in "aeiouhâêîôûé" else "se " + bare
            elif lang == "de":
                restored = "sich " + bare
        elif bare and clitic_on_verb(lang, sent, bare) and not stem_hits(nw, sent) and stem_hits(bare, sent):
            restored = o
        core = (contents(new) or [fold(new)])[0]
        separable = any(part.endswith(core) and part != core and len(part) > len(core) + 2 for part in contents(old))
        if restored is None and core in SUPPORT.get(lang, set()) and not related(old, new) and fold(row.get("en")) not in KEEP_EN:
            if separable or phrase_supported(old, sent):
                restored = old
        if restored is None and not related(old, new) and stem_hits(old, sent) and not stem_hits(new, sent):
            restored = old
        elif (
            restored is None
            and not related(old, new)
            and stem_hits(old, sent)
            and stem_hits(new, sent)
            and len(contents(old)) == 1
            and not nounish(old)
        ):
            restored = old
        if restored is None and current != fold(current) and fold(current) == fold(new):
            restored = fold(new)
        if not restored or fold(restored) == fold(current):
            continue
        item["word"] = restored
        n += 1
        if not write:
            print(f"  {lang} {row.get('en')}: {current!r} -> {restored!r} | {sent[:90]}")
    if write:
        for file, pack in packs.values():
            if file.exists():
                file.write_text(json.dumps(pack, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    return n


def align_language(lang: str, write: bool) -> dict:
    code, ending, modals = PROFILES[lang]
    latin_sr = lang == "sr"
    if latin_sr:
        ending = r"(?:ti|ći|sti)$"
        modals = PROFILES["hr"][2]
    english = load_english()
    nlp = stanza.Pipeline(code, processors="tokenize,pos,lemma,depparse", verbose=False, use_gpu=False)
    changed = []
    kept = 0
    skipped = 0
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
            sentence = str(row.get("sentence") or "").strip()
            word = str(row.get("word") or "").strip()
            if not sentence or not word:
                skipped += 1
                continue
            jobs.append((key, row, src, word, sentence))
        if not jobs:
            continue
        docs = nlp.bulk_process([cyr_to_lat(sentence) if latin_sr else sentence for *_, sentence in jobs])
        dirty = False
        light = (LIGHT["sr-lat"] if latin_sr else LIGHT.get(lang, set())) | modals
        for (key, row, src, word, sentence), doc in zip(jobs, docs):
            if not doc.sentences:
                skipped += 1
                continue
            if re.match(r"i am learning to\b", str(src.get("sentence") or ""), re.I):
                kept += 1
                continue
            word_cmp = cyr_to_lat(word) if latin_sr else word
            sent_cmp = cyr_to_lat(sentence) if latin_sr else sentence
            cands = []
            for sent in doc.sentences:
                cands.extend(verb_candidates(sent, ending))
            lemma = choose(word_cmp, cands, ending, light, sent_cmp)
            if lemma and fold(word_cmp).startswith("ne") and not fold(lemma).startswith("ne"):
                stripped = fold(word_cmp)[2:].lstrip()
                if stripped and related(stripped, lemma) and re.search(r"(?<!\w)ne(?!\w)", fold(sent_cmp)):
                    lemma = "ne " + fold(lemma).split()[0] + (" " + " ".join(fold(lemma).split()[1:]) if " " in fold(lemma) else "")
                    lemma = re.sub(r"\s+", " ", lemma).strip()
            if lemma:
                lemma = cite_form("hr" if latin_sr else lang, lemma)
            if latin_sr and lemma:
                lemma = lat_to_cyr(lemma)
            if lemma:
                lemma = fold(lemma)
            if not lemma or fold(lemma) == fold(word):
                kept += 1
                continue
            surface = next((surf for lem, surf, _verb in cands if fold(cite_form("hr" if latin_sr else lang, lem)).split()[0] == fold(lemma).split()[0]), "")
            changed.append(
                {
                    "level": level,
                    "id": key,
                    "en": src.get("en"),
                    "old": word,
                    "new": lemma,
                    "surface": surface,
                    "sentence": sentence,
                    "english": src.get("sentence"),
                }
            )
            if write:
                row["word"] = lemma
                dirty = True
        if write and dirty:
            path.write_text(json.dumps(pack, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
            print(f"wrote {path}", flush=True)
    return {"lang": lang, "changed": changed, "kept": kept, "skipped": skipped}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("lang")
    parser.add_argument("--write", action="store_true")
    parser.add_argument("--repair-only", action="store_true")
    args = parser.parse_args()
    if args.lang not in PROFILES:
        raise SystemExit(f"no profile for {args.lang}")
    repaired = repair_language(args.lang, args.write or args.repair_only)
    print(f"{args.lang} repaired {repaired}", flush=True)
    if args.repair_only:
        return
    report = align_language(args.lang, args.write)
    out = Path(f"/tmp/align-{args.lang}.json")
    out.write_text(json.dumps({"kept": report["kept"], "skipped": report["skipped"], "changed": report["changed"]}, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"{args.lang} changed {len(report['changed'])} kept {report['kept']} skipped {report['skipped']} -> {out}")


if __name__ == "__main__":
    main()
