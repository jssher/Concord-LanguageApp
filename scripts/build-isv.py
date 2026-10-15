"""Fill Interslavic packs from the community dictionary.

Headwords come from https://interslavic-dictionary.com (MIT). A sentence is
written only when every content word is in that dictionary and the English
line fits a frame whose case and agreement are fixed. Nothing is copied from
the dictionary's example text, because it has none. The hand lexicon wins
on the core cards.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
READY = ROOT / "public" / "course" / "ready"
OUT = ROOT / "public" / "course" / "i18n" / "isv"
DICT = Path("/tmp/isv-basic.json")
LEX = ROOT / "src" / "data" / "lexicon" / "isv.json"

# Etymological letters the Cyrillic/Glagolitic map does not spell. ć đ ń ę ų ȯ ě stay.
NORM = str.maketrans({
    "å": "a", "Å": "A", "ė": "e", "Ė": "E", "ŕ": "r", "Ŕ": "R",
    "ĺ": "l", "Ĺ": "L", "ľ": "l", "Ľ": "L", "ď": "d", "Ď": "D",
    "ť": "t", "Ť": "T", "ś": "s", "Ś": "S", "ź": "z", "Ź": "Z",
})

PARTICLE = {"sę", "sobě"}
NOUN = {"f.", "f.sg.", "f.pl.", "m.", "m.sg.", "m.pl.", "m.anim.", "n.", "n.sg.", "n.pl."}
VOWEL_END = ("a", "o", "e", "ę", "i", "u", "y")
# Locative -ě after these consonants is a different stem. Skip rather than guess.
SOFT = set("kghjčšžćńľ")

# person: 0 I, 1 we, 2 you, 3 he/she/it, 4 they
# 3sg from the dictionary wins when it is listed; these are the ones it spells out
# or the ones the core cards already teach.
IRREG = {
    "byti": ["jesm", "jesmo", "jesi", "jest", "sųt"],
    "jesti": ["jem", "jemo", "ješ", "je", "jedut"],
    "piti": ["piju", "pijemo", "piješ", "pije", "pijut"],
    "viděti": ["viđu", "vidimo", "vidiš", "vidi", "videt"],
    "slyšati": ["slyšu", "slyšimo", "slyšiš", "slyši", "slyšet"],
    "iměti": ["imaju", "imajemo", "imaješ", "imaje", "imajut"],
    "imati": ["imaju", "imajemo", "imaješ", "imaje", "imajut"],
    "dati": ["dam", "damo", "daš", "da", "dadut"],
    "idti": ["idu", "idemo", "ideš", "ide", "idut"],
    "htěti": ["hoču", "hočemo", "hočeš", "hoče", "hočut"],
    "moči": ["mogu", "možemo", "možeš", "može", "mogut"],
    "spati": ["spim", "spimo", "spiš", "spi", "spet"],
    "hoditi": ["hodim", "hodimo", "hodiš", "hodi", "hodet"],
    "prihoditi": ["prihodim", "prihodimo", "prihodiš", "prihodi", "prihodet"],
    "sěděti": ["sědim", "sědimo", "sědiš", "sědi", "sědet"],
}

PRON = {"i": "Ja", "we": "My", "you": "Ty", "he": "On", "she": "Ona", "it": "Ono", "they": "Oni"}
BE = {
    "i": (0, "jesm"),
    "we": (1, "jesmo"),
    "you": (2, "jesi"),
    "he": (3, "jest"),
    "she": (3, "jest"),
    "it": (3, "jest"),
    "they": (4, "sųt"),
}
BE_AUX = {"i": "am", "we": "are", "you": "are", "he": "is", "she": "is", "it": "is", "they": "are"}
HERE = {"here": "tu", "there": "tam"}
PREP = {"on": "na", "in": "v", "to": "k", "from": "iz", "with": "s", "for": "za"}


def norm(text: str) -> str:
    return text.translate(NORM).strip()


def glosses(text: str) -> list[str]:
    out = []
    for part in text.lower().split(","):
        part = re.sub(r"\([^)]*\)", "", part)
        part = part.strip(" .;-")
        part = re.sub(r"^(to|a|an|the)\s+", "", part)
        part = " ".join(part.split())
        if part and len(part) < 60:
            out.append(part)
    return out


def lemma_parts(isv: str) -> list[str]:
    """Split 'iměti, imati' but keep a reflexive particle on its verb."""
    raw = norm(isv)
    if not raw:
        return []
    bits = [b.strip() for b in raw.split(",") if b.strip()]
    out = []
    for bit in bits:
        words = bit.split()
        if len(words) == 2 and words[1] in PARTICLE:
            out.append(bit)
        elif len(words) == 1:
            out.append(bit)
        elif len(words) > 1:
            out.append(bit)
    return out


def load_dict():
    rows = json.loads(DICT.read_text())["wordList"][1:]
    index: dict[str, list[dict]] = {}
    seen = set()
    for row in rows:
        pos = row[3] or ""
        try:
            rank = int(row[4]) if row[4] != "" else 9
        except ValueError:
            rank = 9
        attested = sum(1 for col in row[6:16] if col and not str(col).startswith("!"))
        for isv in lemma_parts(row[1]):
            if not isv or isv.startswith("-") or len(isv) > 40:
                continue
            item = {"isv": isv, "pos": pos, "rank": rank, "add": row[2] or "", "att": attested, "en": row[5]}
            seen.add(isv)
            for key in glosses(row[5]):
                index.setdefault(key, []).append(item)
    return index, seen


INDEX, KNOWN = load_dict()
GOLD: dict[str, dict] = {}


def load_gold() -> None:
    """Core cards keep one spelling, so a sentence does not rename a word the card already teaches."""
    if not LEX.exists():
        return
    hands = json.loads(LEX.read_text()).get("entries", {})
    for level in ("a1", "a2", "b1", "b2", "p"):
        for row in json.loads((READY / f"{level}.json").read_text()):
            hand = hands.get(row["id"])
            if not isinstance(hand, dict) or not hand.get("word"):
                continue
            key = " ".join(str(row.get("en") or "").lower().split())
            if not key or key in GOLD or " " in hand["word"]:
                continue
            pos = row.get("pos") or ""
            gender = hand.get("gender")
            if pos == "verb" or pos in {"adj", "adjective", "adv"}:
                dict_pos = {"verb": "v.tr. ipf.", "adj": "adj.", "adjective": "adj.", "adv": "adv."}[pos if pos != "adjective" else "adjective"]
                if pos == "adjective":
                    dict_pos = "adj."
            elif gender == "f":
                dict_pos = "f."
            elif gender == "n":
                dict_pos = "n."
            elif gender == "m":
                dict_pos = "m."
            else:
                continue
            addition = ""
            for cand in INDEX.get(key, []):
                if cand["isv"] == hand["word"]:
                    dict_pos = cand["pos"] or dict_pos
                    addition = cand["add"]
                    break
            GOLD[key] = {"isv": hand["word"], "pos": dict_pos, "rank": 0, "add": addition, "att": 99, "en": row["en"]}


load_gold()


def pos_ok(course: str, dict_pos: str) -> bool:
    if course == "verb":
        return dict_pos.startswith("v.")
    if course == "adj":
        return dict_pos.startswith("adj")
    if course == "adv":
        return dict_pos.startswith("adv")
    if course == "prep":
        return dict_pos.startswith("prep")
    if course == "conj":
        return dict_pos.startswith("conj")
    if course in {"pron", "det"}:
        return dict_pos.startswith("pron")
    if course == "num":
        return "num" in dict_pos
    if course in {"noun", "phrase", "line", ""}:
        return dict_pos in NOUN or (dict_pos[:1] in {"f", "m", "n"} and not dict_pos.startswith("v"))
    return False


def choose(en: str, course_pos: str) -> dict | None:
    key = " ".join(en.lower().split())
    key = re.sub(r"^(to|a|an|the)\s+", "", key)
    gold = GOLD.get(key)
    if gold and pos_ok(course_pos, gold["pos"]):
        return gold
    cands = [c for c in INDEX.get(key, []) if pos_ok(course_pos, c["pos"])]
    if not cands and course_pos == "verb":
        cands = [c for c in INDEX.get(key, []) if c["pos"].startswith("v.")]
    if not cands:
        return None
    single = [c for c in cands if " " not in c["isv"]]
    reflex = [c for c in cands if c["isv"].split(" ")[-1] in PARTICLE]
    if single:
        cands = single
    elif reflex:
        cands = reflex

    def score(c: dict) -> tuple:
        listed = glosses(c["en"])
        first = 0 if listed and listed[0] == key else 1
        ipf = 0 if "ipf" in c["pos"] or not c["pos"].startswith("v.") else 1
        return (first, c["rank"], ipf, len(listed), -c["att"], len(c["isv"]), 0 if " " not in c["isv"] else 1)

    return min(cands, key=score)


def gender_of(pos: str) -> str | None:
    if pos.startswith("f"):
        return "f"
    if pos.startswith("n"):
        return "n"
    if pos.startswith("m"):
        return "m"
    return None


def plural_pos(pos: str) -> bool:
    return "pl" in pos.split(".")


def third_person(add: str) -> str | None:
    text = add.strip()
    if text.startswith("(") and ")" in text:
        text = text[1 : text.index(")")]
    if ";" in text:
        text = text.split(";", 1)[0]
    parts = [norm(p.strip()) for p in text.split(",") if p.strip()]
    if len(parts) >= 6:
        return parts[2]
    if len(parts) >= 3 and all(re.fullmatch(r"[a-zěųęȯčšž]+", p) for p in parts[:3]):
        return parts[2]
    if len(parts) == 1 and re.fullmatch(r"[a-zěųęȯčšž]+", parts[0]):
        return parts[0]
    return None


def stem_verb(lemma: str) -> tuple[str, str]:
    parts = lemma.split()
    if len(parts) == 2 and parts[1] in PARTICLE:
        return parts[0], " " + parts[1]
    return lemma, ""


def conjugate(lemma: str, person: int, addition: str) -> str | None:
    base, particle = stem_verb(lemma)
    if base in IRREG:
        return IRREG[base][person] + particle
    given = third_person(addition)
    if given and given.endswith("aje"):
        stem = given[:-3]
        ends = ["aju", "ajemo", "aješ", "aje", "ajut"]
        return stem + ends[person] + particle
    if given and given.endswith("uje"):
        stem = given[:-3]
        ends = ["ujem", "ujemo", "uješ", "uje", "ujut"]
        return stem + ends[person] + particle
    if given == "pije" or (given and given.endswith("je") and base.endswith("iti")):
        stem = (given or "")[:-2]
        ends = ["ju", "jemo", "ješ", "je", "jut"]
        return stem + ends[person] + particle
    if given and given.endswith("i") and base.endswith(("iti", "ěti", "eti")) and not base.endswith("yti"):
        stem = given[:-1]
        ends = ["im", "imo", "iš", "i", "et"]
        return stem + ends[person] + particle
    if base.endswith("yti") and base not in IRREG:
        stem = base[:-3]
        ends = ["ju", "jemo", "ješ", "je", "jut"]
        return stem + ends[person] + particle
    if person == 3 and given and base not in {"jesti", "byti"}:
        # Trust a listed 3sg, but do not invent the other persons from it.
        if person == 3:
            return given + particle
    if base.endswith("ovati"):
        stem, ends = base[:-5], ["ujem", "ujemo", "uješ", "uje", "ujut"]
    elif base.endswith("evati"):
        stem, ends = base[:-5], ["jujem", "jujemo", "juješ", "juje", "jujut"]
    elif base.endswith("ati"):
        stem, ends = base[:-3], ["am", "amo", "aš", "a", "ajut"]
    elif base.endswith("iti"):
        stem, ends = base[:-3], ["im", "imo", "iš", "i", "et"]
    elif base.endswith(("ěti", "eti")):
        stem, ends = base[:-3], ["im", "imo", "iš", "i", "et"]
    elif base.endswith("nųti"):
        stem, ends = base[:-4], ["nem", "nemo", "neš", "ne", "nut"]
    else:
        return given + particle if person == 3 and given else None
    return stem + ends[person] + particle


def imperative(lemma: str) -> str | None:
    base, particle = stem_verb(lemma)
    if base in IRREG or base in {"byti", "jesti", "dati", "idti", "piti"}:
        return None
    if base.endswith("ovati"):
        return base[:-5] + "uj" + particle
    if base.endswith("evati"):
        return base[:-5] + "juj" + particle
    if base.endswith("ati"):
        return base[:-3] + "aj" + particle
    if base.endswith("yti") and not base.endswith("iti"):
        return base[:-2] + "j" + particle
    if base.endswith(("iti", "ěti")):
        return base[:-3] + "i" + particle
    if base.endswith("nųti"):
        return base[:-4] + "ni" + particle
    return None


def cap(text: str) -> str:
    return text[:1].upper() + text[1:] if text else text


def agree(adj: str, gender: str | None, plural: bool = False, personal: bool = False) -> str | None:
    if not adj or " " in adj:
        return None
    if plural and personal:
        if adj.endswith("y"):
            return adj[:-1] + "i"
        if adj.endswith("i"):
            return adj
        return None
    if plural:
        if adj.endswith(("y", "i")):
            return adj[:-1] + "e"
        return None
    if gender == "f" and adj.endswith(("y", "i")):
        return adj[:-1] + "a"
    if gender == "n" and adj.endswith("y"):
        return adj[:-1] + "o"
    if gender == "n" and adj.endswith("i"):
        return adj[:-1] + "e"
    if gender == "m" and adj.endswith(("y", "i")):
        return adj
    return None


def _last_ok(noun: str) -> bool:
    return bool(noun) and " " not in noun and not noun.endswith(("ę", "ų"))


def accusative(noun: str, gender: str | None, pos: str) -> str | None:
    if not _last_ok(noun) or plural_pos(pos):
        return None
    if gender == "f" and noun.endswith("a"):
        return noun[:-1] + "u"
    if gender == "m" and "anim" in pos and not noun.endswith(VOWEL_END):
        # Regular animate accusative is -a. A one-syllable e, or -ec/-en, drops a vowel: pes → psa.
        if "e" in noun[:-1] and noun.endswith(("s", "c", "n", "k", "v")) and noun.count("e") == 1 and len(noun) <= 5:
            return None
        if noun.endswith(("ec", "ek", "en", "el", "er")):
            return None
        return noun + "a"
    if gender in {"m", "n"}:
        return noun
    return None


def locative(noun: str, gender: str | None) -> str | None:
    if not _last_ok(noun):
        return None
    if gender == "m" and not noun.endswith(VOWEL_END):
        if noun[-1] in SOFT:
            return None
        return noun + "ě"
    if gender == "f" and noun.endswith("ja"):
        return noun[:-2] + "ji"
    if gender == "f" and noun.endswith("a"):
        if noun[-2] in SOFT:
            return None
        return noun[:-1] + "ě"
    if gender == "n" and noun.endswith("o"):
        if noun[-2] in SOFT:
            return None
        return noun[:-1] + "ě"
    if gender == "n" and noun.endswith("e"):
        return noun[:-1] + "u"
    return None


def dative(noun: str, gender: str | None) -> str | None:
    if not _last_ok(noun):
        return None
    if gender == "m" and not noun.endswith(VOWEL_END):
        return noun + "u"
    if gender == "f" and noun.endswith("ja"):
        return noun[:-2] + "ji"
    if gender == "f" and noun.endswith("a"):
        if noun[-2] in SOFT:
            return None
        return noun[:-1] + "ě"
    if gender == "n" and noun.endswith(("o", "e")):
        return noun[:-1] + "u"
    return None


def genitive(noun: str, gender: str | None) -> str | None:
    if not _last_ok(noun):
        return None
    if gender == "m" and not noun.endswith(VOWEL_END) and not noun.endswith("j"):
        return noun + "a"
    if gender == "f" and noun.endswith("ja"):
        return noun[:-1] + "e"  # postelja → postelje; -ja to -je keeps the j
    if gender == "f" and noun.endswith("a"):
        return noun[:-1] + "y"
    if gender == "n" and noun.endswith(("o", "e")):
        return noun[:-1] + "a"
    return None


def instrumental(noun: str, gender: str | None) -> str | None:
    if not _last_ok(noun):
        return None
    if gender == "m" and not noun.endswith(VOWEL_END) and noun[-1] not in SOFT:
        return noun + "om"
    if gender == "f" and noun.endswith("a"):
        return noun[:-1] + "oju"
    if gender == "n" and noun.endswith("o"):
        return noun[:-1] + "om"
    return None


def case_noun(noun: str, gender: str | None, pos: str, case: str) -> str | None:
    if case == "acc":
        return accusative(noun, gender, pos)
    if case == "loc":
        return locative(noun, gender)
    if case == "dat":
        return dative(noun, gender)
    if case == "gen":
        return genitive(noun, gender)
    if case == "ins":
        return instrumental(noun, gender)
    if case == "nom":
        return noun if " " not in noun else None
    return None


PREP_CASE = {"na": "loc", "v": "loc", "k": "dat", "iz": "gen", "s": "ins", "za": "acc"}


def one_form(gender: str | None, case: str) -> str:
    if gender == "f":
        return "jednu" if case == "acc" else "jedna"
    if gender == "n":
        return "jedno"
    return "jedin"


def poss_form(lemma: str, gender: str | None, plural: bool, case: str) -> str | None:
    if plural:
        if lemma.endswith("j"):
            return lemma + "e"
        if lemma.endswith("š"):
            return lemma + "e"
        return None
    if lemma.endswith("j"):  # moj, tvoj
        if case == "acc" and gender == "f":
            return lemma + "u"
        if gender == "f":
            return lemma + "a"
        if gender == "n":
            return lemma + "e"
        if gender == "m":
            return lemma
    if lemma.endswith("š"):  # naš, vaš
        if case == "acc" and gender == "f":
            return lemma + "u"
        if gender == "f":
            return lemma + "a"
        if gender == "n":
            return lemma + "e"
        if gender == "m":
            return lemma
    return None


def verb_candidates(surface: str) -> list[str]:
    s = surface.lower()
    fixed = {
        "is": "be", "am": "be", "are": "be", "be": "be",
        "has": "have", "have": "have", "had": "have",
        "goes": "go", "going": "go", "went": "go",
        "does": "do", "did": "do", "doing": "do",
        "comes": "come", "coming": "come",
        "gives": "give", "giving": "give",
        "makes": "make", "making": "make",
        "takes": "take", "taking": "take",
        "writes": "write", "writing": "write",
        "says": "say", "said": "say",
    }
    if s in fixed:
        return [fixed[s]]
    out = [s]
    if s.endswith("ies") and len(s) > 4:
        out.append(s[:-3] + "y")
    if s.endswith("es") and len(s) > 4:
        out.append(s[:-2])
    if s.endswith("s") and not s.endswith("ss") and len(s) > 3:
        out.append(s[:-1])
    if s.endswith("ing") and len(s) > 5:
        stem = s[:-3]
        out.append(stem)
        out.append(stem + "e")
        if len(stem) > 2 and stem[-1] == stem[-2]:
            out.append(stem[:-1])
    seen = []
    for item in out:
        if item not in seen:
            seen.append(item)
    return seen


# Verbs whose present we will actually put in a sentence. Anything else stays a headword only.
SAFE_VERB = {
    "eat", "drink", "see", "hear", "sleep", "walk", "go", "come", "sit", "give", "have",
    "read", "write", "wash", "open", "close", "take", "make", "buy", "cook", "hold", "know",
}


def find_verb(surface: str) -> dict | None:
    for key in verb_candidates(surface):
        hit = choose(key, "verb")
        if hit:
            return hit
    return None


def safe_verb(surface: str) -> dict | None:
    hit = find_verb(surface)
    if not hit:
        return None
    keys = verb_candidates(surface)
    listed = glosses(hit["en"])
    if not listed or listed[0] not in keys or listed[0] not in SAFE_VERB:
        return None
    return hit


def find_noun(surface: str) -> dict | None:
    return choose(surface, "noun")


def find_adj(surface: str) -> dict | None:
    return choose(surface, "adj")


def noun_phrase(surface: str, head_en: str, head: dict | None, case: str) -> str | None:
    if surface.lower() == head_en.lower() and head and gender_of(head["pos"]):
        formed = case_noun(head["isv"], gender_of(head["pos"]), head["pos"], case)
        return formed
    hit = find_noun(surface)
    if not hit:
        return None
    return case_noun(hit["isv"], gender_of(hit["pos"]), hit["pos"], case)


def subject_noun(surface: str, head_en: str, head: dict | None) -> tuple[str, str | None, bool] | None:
    if surface.lower() == head_en.lower() and head and gender_of(head["pos"]) and " " not in head["isv"]:
        return head["isv"], gender_of(head["pos"]), plural_pos(head["pos"])
    hit = find_noun(surface)
    if not hit or " " in hit["isv"]:
        return None
    return hit["isv"], gender_of(hit["pos"]), plural_pos(hit["pos"])


def adjective(surface: str, gender: str | None, plural: bool, head_en: str, head: dict | None, personal: bool = False) -> str | None:
    if surface.lower() == head_en.lower() and head and head["pos"].startswith("adj"):
        return agree(head["isv"], gender, plural, personal)
    hit = find_adj(surface)
    if not hit:
        return None
    word = agree(hit["isv"], gender, plural, personal)
    if word and head and " " in (head.get("isv") or "") and word in head["isv"].split():
        return None
    return word


def copula(plural: bool) -> str:
    return "sųt" if plural else "jest"


def sentence(en_sentence: str, en: str, entry: dict | None) -> str | None:
    raw = en_sentence.strip()
    raw = raw.strip("“”\"'")
    if raw.endswith((".", "!", "?")):
        raw = raw[:-1].strip()
    if not raw or any(ch in raw for ch in ",:;\"“”()[]—/0123456789"):
        return None
    low = " ".join(raw.lower().split())
    if "'" in low:
        return None
    head = " ".join(en.lower().split())

    def subj(word: str):
        return subject_noun(word, head, entry)

    def adj(word: str, gender: str | None, plural: bool = False, personal: bool = False):
        return adjective(word, gender, plural, head, entry, personal)

    def obj(word: str):
        return noun_phrase(word, head, entry, "acc")

    m = re.fullmatch(r"(i|we|you|he|she|it|they) (am|is|are) (here|there)", low)
    if m and m.group(2) == BE_AUX[m.group(1)]:
        return f"{PRON[m.group(1)]} {BE[m.group(1)][1]} {HERE[m.group(3)]}."

    m = re.fullmatch(r"(i|we|you|he|she|it|they) (am|is|are) (very |not )?(?P<adj>[a-z]+)", low)
    if m and m.group(2) == BE_AUX[m.group(1)] and m.group(1) in {"he", "she", "it", "they"}:
        gender = {"he": "m", "she": "f", "it": "n"}.get(m.group(1))
        plural = m.group(1) == "they"
        word = adj(m.group("adj"), gender, plural, personal=plural)
        if word:
            who = PRON[m.group(1)]
            verb = BE[m.group(1)][1]
            if (m.group(3) or "").strip() == "not":
                return f"{who} ne {verb} {word}."
            if (m.group(3) or "").strip() == "very":
                return f"{who} {verb} velmi {word}."
            return f"{who} {verb} {word}."

    m = re.fullmatch(r"(?:the|this|that|a|an) (?P<noun>[a-z]+) is (here|there)", low)
    if m:
        found = subj(m.group("noun"))
        if found:
            noun, _gender, plural = found
            return cap(f"{noun} {copula(plural)} {HERE[m.group(2)]}.")

    m = re.fullmatch(r"(?:the|this|that|a|an) (?P<noun>[a-z]+) is (very |not )?(?P<adj>[a-z]+)(?: today)?", low)
    if m and "dnes" in KNOWN:
        found = subj(m.group("noun"))
        if found:
            noun, gender, plural = found
            word = adj(m.group("adj"), gender, plural)
            if word and not any(part == word for part in noun.split()):
                today = " dnes" if low.endswith(" today") else ""
                verb = copula(plural)
                if (m.group(2) or "").strip() == "not":
                    return cap(f"{noun} ne {verb} {word}{today}.")
                if (m.group(2) or "").strip() == "very":
                    return cap(f"{noun} {verb} velmi {word}{today}.")
                return cap(f"{noun} {verb} {word}{today}.")

    m = re.fullmatch(r"it is (very |not )?(?P<adj>[a-z]+)", low)
    if m:
        word = adj(m.group("adj"), "n", False)
        if word:
            if (m.group(1) or "").strip() == "not":
                return f"To ne jest {word}."
            if (m.group(1) or "").strip() == "very":
                return f"To jest velmi {word}."
            return f"To jest {word}."

    m = re.fullmatch(r"this is (?:a|an|the) (?P<noun>[a-z]+)", low)
    if m:
        found = subj(m.group("noun"))
        if found:
            return f"To jest {found[0]}."

    m = re.fullmatch(r"this is my (?P<noun>[a-z]+)", low)
    if m:
        found = subj(m.group("noun"))
        poss = poss_form("moj", found[1] if found else None, False, "nom") if found else None
        if found and poss:
            return f"To jest {poss} {found[0]}."

    m = re.fullmatch(r"(i|you|he|she|it|we|they) (am|is|are) (my|your|our) (?P<noun>[a-z]+)", low)
    if m and m.group(2) == BE_AUX[m.group(1)]:
        found = subj(m.group("noun"))
        owner = {"my": "moj", "your": "tvoj", "our": "naš"}[m.group(3)]
        if found and owner in KNOWN:
            poss = poss_form(owner, found[1], found[2], "nom")
            if poss:
                return f"{PRON[m.group(1)]} {BE[m.group(1)][1]} {poss} {found[0]}."

    m = re.fullmatch(r"(my|your|our) (?P<noun>[a-z]+) is (?P<rest>[a-z]+)", low)
    if m:
        found = subj(m.group("noun"))
        owner = {"my": "moj", "your": "tvoj", "our": "naš"}[m.group(1)]
        if found and owner in KNOWN:
            noun, gender, plural = found
            poss = poss_form(owner, gender, plural, "nom")
            orig = raw.split()[-1]
            if poss and orig[:1].isupper() and m.group("rest") not in INDEX and m.group("rest") not in GOLD:
                if not plural:
                    return cap(f"{poss} {noun} jest {orig}.")
            word = adj(m.group("rest"), gender, plural)
            if poss and word:
                return cap(f"{poss} {noun} {copula(plural)} {word}.")

    m = re.fullmatch(r"(?:the|a|an) (?P<noun>[a-z]+) is (?:on|in) the (?P<place>[a-z]+)", low)
    if m:
        found = subj(m.group("noun"))
        place = find_noun(m.group("place"))
        if not found or not place:
            return None
        where = locative(place["isv"], gender_of(place["pos"]))
        if not where:
            return None
        prep = "na" if " is on " in f" {low} " else "v"
        return cap(f"{found[0]} {copula(found[2])} {prep} {where}.")

    m = re.fullmatch(r"please (?P<verb>[a-z]+) the (?P<noun>[a-z]+)", low)
    if m:
        verb = safe_verb(m.group("verb"))
        thing = obj(m.group("noun"))
        if not verb or not thing:
            return None
        order = imperative(verb["isv"])
        if not order:
            return None
        return f"Prosim, {order} {thing}."

    m = re.fullmatch(r"(i|we|you|he|she|it|they) (?P<verb>have|has) (?:a |an |one )?(?P<noun>[a-z]+)", low)
    if m:
        verb = safe_verb(m.group("verb"))
        hit = find_noun(m.group("noun")) if m.group("noun").lower() != head else entry
        if m.group("noun").lower() == head and entry and gender_of(entry["pos"]):
            hit = entry
        if not verb or not hit:
            return None
        who_i = BE[m.group(1)][0]
        finite = conjugate(verb["isv"], who_i, verb["add"])
        acc = accusative(hit["isv"], gender_of(hit["pos"]), hit["pos"])
        if not finite or not acc or " " in hit["isv"]:
            return None
        number = ""
        if " one " in f" {low} ":
            number = one_form(gender_of(hit["pos"]), "acc") + " "
        return f"{PRON[m.group(1)]} {finite} {number}{acc}."

    m = re.fullmatch(r"i give you the (?P<noun>[a-z]+)", low)
    if m and "tobě" in KNOWN:
        verb = safe_verb("give")
        thing = obj(m.group("noun"))
        if verb and thing:
            finite = conjugate(verb["isv"], 0, verb["add"])
            if finite:
                return f"Ja {finite} tobě {thing}."

    m = re.fullmatch(r"(i|we|you|he|she|it|they) (?P<verb>[a-z]+)(?: (?:a |an |the )?(?P<noun>[a-z]+))?", low)
    if m and m.group("verb") not in {"am", "is", "are", "have", "has"}:
        verb = safe_verb(m.group("verb"))
        if not verb:
            return None
        finite = conjugate(verb["isv"], BE[m.group(1)][0], verb["add"])
        if not finite:
            return None
        if not m.group("noun"):
            return f"{PRON[m.group(1)]} {finite}."
        thing = obj(m.group("noun"))
        if not thing:
            return None
        return f"{PRON[m.group(1)]} {finite} {thing}."

    m = re.fullmatch(r"(?:the|a|an) (?P<noun>[a-z]+) is (?P<verb>[a-z]+)ing", low)
    if m:
        found = subj(m.group("noun"))
        verb = safe_verb(m.group("verb") + "ing")
        if not found or not verb:
            return None
        finite = conjugate(verb["isv"], 4 if found[2] else 3, verb["add"])
        if not finite:
            return None
        return cap(f"{found[0]} {finite}.")

    m = re.fullmatch(r"(?:the|a|an) (?P<noun>[a-z]+) (?P<verb>[a-z]+)", low)
    if m and m.group("verb") not in {"is", "are"}:
        found = subj(m.group("noun"))
        verb = safe_verb(m.group("verb"))
        if not found or not verb:
            return None
        finite = conjugate(verb["isv"], 4 if found[2] else 3, verb["add"])
        if not finite:
            return None
        return cap(f"{found[0]} {finite}.")

    m = re.fullmatch(r"(?:the|a|an) (?P<noun>[a-z]+) (?P<verb>[a-z]+) (?:a |an |the )?(?P<obj>[a-z]+)", low)
    if m:
        found = subj(m.group("noun"))
        verb = safe_verb(m.group("verb"))
        thing = obj(m.group("obj"))
        if not found or not verb or not thing:
            return None
        finite = conjugate(verb["isv"], 4 if found[2] else 3, verb["add"])
        if not finite:
            return None
        return cap(f"{found[0]} {finite} {thing}.")

    return None


def hand_records() -> dict:
    if not LEX.exists():
        return {}
    return json.loads(LEX.read_text()).get("entries", {})


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    hands = hand_records()
    for level in ["a1", "a2", "b1", "b2", "p"]:
        rows = json.loads((READY / f"{level}.json").read_text())
        items = {}
        sent = 0
        for row in rows:
            hand = hands.get(row["id"]) if isinstance(hands.get(row["id"]), dict) else None
            if hand and hand.get("word") and hand.get("sentence"):
                rec = {"en": row["en"], "word": hand["word"], "sentence": hand["sentence"]}
                if hand.get("gender"):
                    rec["gender"] = hand["gender"]
                items[row["id"]] = rec
                sent += 1
                continue
            hit = choose(row["en"], row.get("pos") or "")
            if not hit:
                continue
            line = sentence(row.get("sentence") or "", row["en"], hit)
            rec = {"en": row["en"], "word": hit["isv"]}
            gender = gender_of(hit["pos"])
            if gender and (row.get("pos") in {"noun", "name", ""} or hit["pos"][:1] in {"f", "m", "n"}):
                if row.get("pos") in {"noun", "name"} or hit["pos"] in NOUN or hit["pos"][:1] in {"m", "f", "n"} and not hit["pos"].startswith("v"):
                    if row.get("pos") in {"noun", "name"}:
                        rec["gender"] = gender
            if line:
                rec["sentence"] = line
                sent += 1
            else:
                rec["sentence"] = ""
            items[row["id"]] = rec
        payload = {"lang": "isv", "level": level.upper() if level != "p" else "P", "items": items}
        (OUT / f"{level}.json").write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")))
        print(level, "words", len(items), "of", len(rows), "sentences", sent)


if __name__ == "__main__":
    main()
