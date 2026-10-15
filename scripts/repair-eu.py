#!/usr/bin/env python3
"""Repair the first European course batch.

Keeps full-sentence translations. Fixes systematic lemma damage:
frame leftovers, Italian E' for È, number loops, and in-law calques.
Retranslates only headwords that are still broken.
"""

from __future__ import annotations

import importlib.util
import json
import re
from pathlib import Path

spec = importlib.util.spec_from_file_location("teu", "/workspace/scripts/translate-eu.py")
teu = importlib.util.module_from_spec(spec)
spec.loader.exec_module(teu)

ROOT = Path("/workspace/public/course")
LEX = Path("/workspace/src/data/lexicon")
LEVELS = ["a1", "a2", "b1", "b2", "p"]
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

# Dictionary headwords the model calques or loops on.
FORCED = {
    "de": {
        "mother-in-law": "Schwiegermutter",
        "father-in-law": "Schwiegervater",
        "sister-in-law": "Schwägerin",
        "brother-in-law": "Schwager",
        "son-in-law": "Schwiegersohn",
        "daughter-in-law": "Schwiegertochter",
    },
    "nl": {
        "mother-in-law": "schoonmoeder",
        "father-in-law": "schoonvader",
        "sister-in-law": "schoonzus",
        "brother-in-law": "zwager",
        "son-in-law": "schoonzoon",
        "daughter-in-law": "schoondochter",
    },
    "da": {
        "mother-in-law": "svigermor",
        "father-in-law": "svigerfar",
        "sister-in-law": "svigerinde",
        "brother-in-law": "svoger",
        "son-in-law": "svigersøn",
        "daughter-in-law": "svigerdatter",
    },
    "fr": {
        "mother-in-law": "belle-mère",
        "father-in-law": "beau-père",
        "sister-in-law": "belle-sœur",
        "brother-in-law": "beau-frère",
        "son-in-law": "gendre",
        "daughter-in-law": "belle-fille",
    },
    "es": {
        "mother-in-law": "suegra",
        "father-in-law": "suegro",
        "sister-in-law": "cuñada",
        "brother-in-law": "cuñado",
        "son-in-law": "yerno",
        "daughter-in-law": "nuera",
    },
    "it": {
        "mother-in-law": "suocera",
        "father-in-law": "suocero",
        "sister-in-law": "cognata",
        "brother-in-law": "cognato",
        "son-in-law": "genero",
        "daughter-in-law": "nuora",
    },
    "pt": {
        "mother-in-law": "sogra",
        "father-in-law": "sogro",
        "sister-in-law": "cunhada",
        "brother-in-law": "cunhado",
        "son-in-law": "genro",
        "daughter-in-law": "nora",
    },
    "pl": {
        "mother-in-law": "teściowa",
        "father-in-law": "teść",
        "sister-in-law": "szwagerka",
        "brother-in-law": " szwagier",
        "son-in-law": "zięć",
        "daughter-in-law": "synowa",
    },
    "cs": {
        "mother-in-law": "tchyně",
        "father-in-law": "tchán",
        "sister-in-law": "švagrová",
        "brother-in-law": "švagr",
        "son-in-law": "zeť",
        "daughter-in-law": "snacha",
    },
    "ro": {
        "mother-in-law": "soacră",
        "father-in-law": "socru",
        "sister-in-law": "cumnată",
        "brother-in-law": "cumnat",
        "son-in-law": "ginere",
        "daughter-in-law": "noră",
    },
}

NUMS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety", "hundred", "thousand"]
NUM = {
    "de": "null eins zwei drei vier fünf sechs sieben acht neun zehn elf zwölf dreizehn vierzehn fünfzehn sechzehn siebzehn achtzehn neunzehn zwanzig dreißig vierzig fünfzig sechzig siebzig achtzig neunzig hundert tausend".split(),
    "nl": "nul een twee drie vier vijf zes zeven acht negen tien elf twaalf dertien veertien vijftien zestien zeventien achttien negentien twintig dertig veertig vijftig zestig zeventig tachtig negentig honderd duizend".split(),
    "da": "nul en to tre fire fem seks syv otte ni ti elleve tolv tretten fjorten femten seksten sytten atten nitten tyve tredive fyrre halvtreds tres halvfjerds firs halvfems hundrede tusind".split(),
    "fr": "zéro un deux trois quatre cinq six sept huit neuf dix onze douze treize quatorze quinze seize dix-sept dix-huit dix-neuf vingt trente quarante cinquante soixante soixante-dix quatre-vingts quatre-vingt-dix cent mille".split(),
    "es": "cero uno dos tres cuatro cinco seis siete ocho nueve diez once doce trece catorce quince dieciséis diecisiete dieciocho diecinueve veinte treinta cuarenta cincuenta sesenta setenta ochenta noventa cien mil".split(),
    "it": "zero uno due tre quattro cinque sei sette otto nove dieci undici dodici tredici quattordici quindici sedici diciassette diciotto diciannove venti trenta quaranta cinquanta sessanta settanta ottanta novanta cento mille".split(),
    "pt": "zero um dois três quatro cinco seis sete oito nove dez onze doze treze catorze quinze dezesseis dezessete dezoito dezenove vinte trinta quarenta cinquenta sessenta setenta oitenta noventa cem mil".split(),
    "pl": "zero jeden dwa trzy cztery pięć sześć siedem osiem dziewięć dziesięć jedenaście dwanaście trzynaście czternaście piętnaście szesnaście siedemnaście osiemnaście dziewiętnaście dwadzieścia trzydzieści czterdzieści pięćdziesiąt sześćdziesiąt siedemdziesiąt osiemdziesiąt dziewięćdziesiąt sto tysiąc".split(),
    "cs": "nula jedna dva tři čtyři pět šest sedm osm devět deset jedenáct dvanáct třináct čtrnáct patnáct šestnáct sedmnáct osmnáct devatenáct dvacet třicet čtyřicet padesát šedesát sedmdesát osmdesát devadesát sto tisíc".split(),
    "ro": "zero unu doi trei patru cinci șase șapte opt nouă zece unsprezece doisprezece treisprezece paisprezece cincisprezece șaisprezece șaptesprezece optsprezece nouăsprezece douăzeci treizeci patruzeci cincizeci șaizeci șaptezeci optzeci nouăzeci sută mie".split(),
}

STRIP = {
    "de": [r"^(?:dies|das) ist (?:ein|eine|einen|einem|einer|der|die|das)\s+", r"^(?:dies|das) ist\s+"],
    "nl": [r"^(?:dit|dat) is (?:een|de|het)\s+"],
    "da": [r"^(?:dette|det) er (?:en|et)\s+"],
    "fr": [r"^c'est (?:un|une)\s+", r"^ceci est (?:un|une)\s+"],
    "es": [r"^(?:este|esta|esto) es (?:un|una|el|la)\s+"],
    "it": [r"^(?:e'|è|e)\s+(?:un|una|uno|un')\s*", r"^E'\s*", r"^E\s+"],
    "pt": [r"^(?:este|esta|isto|isso) é (?:um|uma|o|a)\s+", r"^(?:este|esta) é\s+"],
    "pl": [r"^to jest\s+", r"^coś\s+", r"^są\s+"],
    "cs": [r"^tohle (?:je|jsou)\s+", r"^toto (?:je|jsou)\s+", r"^to (?:je|jsou)\s+"],
    "ro": [r"^(?:ăsta|asta) e (?:un|o)\s+", r"^aceast[aă] este (?:un|o)\s+", r"^acest lucru este\s+"],
}

ART = {
    "de": r"^(?:das|der|die|den|dem|ein|eine|einen|einem|einer|a|an|the)\s+",
    "nl": r"^(?:de|het|een|a|an|the)\s+",
    "da": r"^(?:en|et|den|det|a|an|the)\s+",
    "fr": r"^(?:le|la|les|un|une|des|du|a|an|the)\s+",
    "es": r"^(?:el|la|los|las|un|una|a|an|the)\s+",
    "it": r"^(?:il|lo|la|i|gli|le|un|uno|una|a|an|the)\s+",
    "pt": r"^(?:o|a|os|as|um|uma|the|an)\s+",
    "pl": r"^(?:a|an|the)\s+",
    "cs": r"^(?:a|an|the)\s+",
    "ro": r"^(?:un|o|a|an|the)\s+",
}

VERY = r"^(?:sehr|molto|muy|très|tres|muito|meget|zeer|heel|velmi|foarte|bardzo|really|very|velice)\s+"
INF = {
    "de": [r"^zum\s+", r"^zu\s+"],
    "nl": [r"^om te\s+", r"^te\s+"],
    "da": [r"^til at\s+", r"^at\s+"],
    "fr": [r"^pour\s+", r"^à\s+"],
    "es": [r"^para\s+"],
    "it": [r"^per\s+", r"^di\s+"],
    "pt": [r"^para\s+"],
    "pl": [r"^by\s+"],
    "cs": [],
    "ro": [r"^pentru a\s+", r"^de a\s+", r"^să\s+"],
}

FRAME = re.compile(
    r"^(?:dies ist|das ist|dit is een|dette er|det er en|det er et|c'est un|c'est une|ceci est|"
    r"este es|esta es|esto es|questo è|questa è|è un|e un|este é|esta é|isto é|"
    r"to jest|tohle je|tohle jsou|toto je|ăsta e|asta e|aceasta este|acest lucru|this is|ça l'est)\b",
    re.I,
)


def fix_it(text: str) -> str:
    def repl(match: re.Match) -> str:
        return "È" if match.group(0)[0] == "E" else "è"

    return re.sub(r"(?<![\wÀ-ÿ])[Ee]'(?![\wÀ-ÿ])", repl, text)


def loopish(text: str) -> bool:
    if text.count("#") >= 6:
        return True
    if re.search(r"(?:\.\s*){8,}", text):
        return True
    toks = re.findall(r"[^\W\d_]+", text.lower(), re.U)
    if len(toks) >= 8:
        run = 1
        for a, b in zip(toks, toks[1:]):
            run = run + 1 if a == b else 1
            if run >= 4:
                return True
        from collections import Counter
        word, n = Counter(toks).most_common(1)[0]
        if n >= 8 and n >= len(toks) * 0.3:
            return True
    return False


def strip_frames(lang: str, text: str) -> str:
    t = text.strip()
    for _ in range(3):
        nxt = t
        for pat in STRIP.get(lang, []):
            cand = re.sub(pat, "", nxt, count=1, flags=re.I).strip()
            if cand and cand != nxt:
                nxt = cand
                break
        if nxt == t:
            break
        t = nxt
    return t.strip(" .,;:!?¿¡\"'“”")


def strip_func(lang: str, pos: str, text: str) -> str:
    t = text.strip().strip("\"“”")
    t = re.sub(r"^(?:l'|un'|d')", "", t, flags=re.I)
    if pos in {"adj", "adjective", "adv"}:
        t = re.sub(VERY, "", t, count=1, flags=re.I)
    if pos == "verb":
        for pat in INF.get(lang, []):
            t = re.sub(pat, "", t, count=1, flags=re.I)
    else:
        for _ in range(2):
            n = re.sub(ART[lang], "", t, count=1, flags=re.I)
            if n == t:
                break
            t = n
    return re.sub(r"\s+", " ", t).strip(" .,;:!?¿¡\"'“”")


def still_bad(lang: str, pos: str, word: str) -> bool:
    w = word.strip()
    wl = w.lower()
    if not w or wl in {"...", ".", "a", "an", "the", "to", "do"}:
        return True
    if loopish(w):
        return True
    if FRAME.search(wl):
        return True
    if re.search(r"\bin\s*-?\s*law\b", wl):
        return True
    if lang == "it" and re.match(r"^E(\s|')", w):
        return True
    if pos == "verb" and re.match(r"^să\b", wl):
        return True
    if pos in {"adj", "adjective"} and re.match(r"^(?:está|est|c'est|ça)\b", wl):
        return True
    if pos == "adv" and len(wl.split()) >= 3:
        return True
    if pos == "verb" and len(wl.split()) >= 5:
        return True
    if re.match(r"^a\s+[A-ZÄÖÜÀ-Ÿ]", w):
        return True
    return False


def acceptable(lang: str, pos: str, en: str, new: str, old: str) -> bool:
    if not new or len(new) > 48 or len(new.split()) > 4:
        return False
    if loopish(new) or still_bad(lang, pos, new):
        return False
    if new.lower() == en.lower() and old.lower() != en.lower() and " " not in en:
        return False
    return True


def translate(engine, texts: list[str], limit: int) -> list[str]:
    if not texts:
        return []
    tokenized = [engine.pkg.tokenizer.encode(text) for text in texts]
    kwargs = dict(
        beam_size=4,
        num_hypotheses=1,
        max_batch_size=48,
        max_decoding_length=limit,
        replace_unknowns=True,
        repetition_penalty=1.3,
        no_repeat_ngram_size=3,
    )
    try:
        batches = engine.model.translate_batch(tokenized, **kwargs)
    except TypeError:
        kwargs.pop("repetition_penalty", None)
        kwargs.pop("no_repeat_ngram_size", None)
        batches = engine.model.translate_batch(tokenized, **kwargs)
    out = []
    for batch in batches:
        value = engine.pkg.tokenizer.decode(batch.hypotheses[0])
        out.append(teu.clean(value))
    return out


def chunks(items, size):
    for i in range(0, len(items), size):
        yield items[i : i + size]


def load_pos() -> dict[str, str]:
    pos = {}
    for level in LEVELS:
        for row in json.loads((ROOT / "ready" / f"{level}.json").read_text()):
            pos[row["id"]] = row.get("pos") or "noun"
    return pos


def main() -> None:
    pos_of = load_pos()
    for file_code, argos_code in LANGS:
        lex = json.loads((LEX / f"{file_code}.json").read_text()).get("entries", {})
        gloss = teu.GLOSS.get(file_code, {})
        forced = dict(FORCED.get(file_code, {}))
        forced.update(dict(zip(NUMS, NUM[file_code])))
        packs = {}
        for level in LEVELS:
            packs[level] = json.loads((ROOT / "i18n" / file_code / f"{level}.json").read_text())
        stats = {"lex": 0, "forced": 0, "gloss": 0, "strip": 0, "it": 0, "reword": 0, "resent": 0}
        jobs = []
        for level, pack in packs.items():
            for iid, item in pack["items"].items():
                en = (item.get("en") or "").strip()
                key = en.lower()
                pos = pos_of.get(iid, "noun")
                word = item.get("word") or ""
                sent = item.get("sentence") or ""
                locked = False
                if iid in lex and key == (lex[iid].get("word") or "").strip().lower():
                    word = lex[iid]["word"]
                    sent = lex[iid]["sentence"]
                    locked = True
                    stats["lex"] += 1
                elif key in forced and " " not in key:
                    word = forced[key]
                    locked = True
                    stats["forced"] += 1
                elif key in gloss and " " not in key:
                    word = gloss[key]
                    locked = True
                    stats["gloss"] += 1
                if file_code == "it":
                    nw, ns = fix_it(word), fix_it(sent)
                    if nw != word or ns != sent:
                        stats["it"] += 1
                    word, sent = nw, ns
                if not locked and " " not in key:
                    stripped = strip_frames(file_code, word)
                    if stripped and stripped != word:
                        word = stripped
                        stats["strip"] += 1
                        if file_code == "de" and pos == "noun" and word[:1].isalpha() and word[:1].islower():
                            word = word[0].upper() + word[1:]
                item["word"] = word
                item["sentence"] = sent
                if not locked and " " not in key and (still_bad(file_code, pos, word) or loopish(word)):
                    jobs.append((level, iid, "word", pos, en))
                if loopish(sent):
                    jobs.append((level, iid, "sent", pos, en))
        print(f"{file_code} pre {stats} retranslate {len(jobs)}", flush=True)
        if jobs:
            engine = teu.Engine(argos_code)
            word_jobs = [j for j in jobs if j[2] == "word"]
            sent_jobs = [j for j in jobs if j[2] == "sent"]
            for group in chunks(word_jobs, 48):
                texts = []
                for _, _, _, pos, en in group:
                    if pos == "verb":
                        texts.append(f"to {en}")
                    elif pos in {"adj", "adjective"}:
                        texts.append(f"very {en}")
                    elif pos == "adv":
                        texts.append(en)
                    elif en[:1].lower() in "aeiou":
                        texts.append(f"an {en}")
                    else:
                        texts.append(f"a {en}")
                outs = translate(engine, texts, 24)
                for job, raw in zip(group, outs):
                    level, iid, _, pos, en = job
                    item = packs[level]["items"][iid]
                    new = strip_func(file_code, pos, raw)
                    if file_code == "it":
                        new = fix_it(new)
                    if file_code == "de" and pos == "noun" and new[:1].isalpha() and new[:1].islower():
                        new = new[0].upper() + new[1:]
                    if acceptable(file_code, pos, en, new, item["word"]):
                        item["word"] = new
                        stats["reword"] += 1
            ready = {}
            for level in LEVELS:
                for row in json.loads((ROOT / "ready" / f"{level}.json").read_text()):
                    ready[row["id"]] = row["sentence"]
            sent_ids = [(level, iid) for level, iid, kind, _, _ in jobs if kind == "sent"]
            for group in chunks(sent_ids, 32):
                texts = [ready[iid] for _, iid in group]
                outs = translate(engine, texts, 80)
                for (level, iid), raw in zip(group, outs):
                    item = packs[level]["items"][iid]
                    raw = fix_it(raw) if file_code == "it" else raw
                    if raw and not loopish(raw):
                        item["sentence"] = raw
                        stats["resent"] += 1
                    elif loopish(item["sentence"]):
                        item["sentence"] = re.sub(r"(?:\.\s*){3,}", ". ", item["sentence"]).strip()
            del engine
        for level, pack in packs.items():
            path = ROOT / "i18n" / file_code / f"{level}.json"
            path.write_text(json.dumps(pack, ensure_ascii=False, separators=(",", ":")))
        print(f"{file_code} wrote {stats}", flush=True)


if __name__ == "__main__":
    main()
