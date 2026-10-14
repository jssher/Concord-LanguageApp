#!/usr/bin/env python3
"""Build public/letters/alphabets.json and hanzi stroke data.

Re-run after the Chinese or Japanese course text changes:
  python3 scripts/make-letters.py
  python3 scripts/build-literacy.py
"""

from __future__ import annotations

import json
import re
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LEX = ROOT / "src" / "data" / "lexicon"
OUT = ROOT / "public" / "letters" / "alphabets.json"
STROKES = ROOT / "public" / "hanzi" / "strokes.json"
META = ROOT / "public" / "hanzi" / "meta.json"
HAN = re.compile(r"[\u3400-\u9fff]")

# Keep the radicals already shown on the opening Mandarin cards.
CURATED = {
    "我": ("戈", "我"),
    "你": ("亻", "你"),
    "门": ("门", "門"),
    "床": ("广", "床"),
    "书": ("乛", "書"),
    "水": ("水", "水"),
    "火": ("火", "火"),
    "鱼": ("鱼", "魚"),
    "吃": ("口", "吃"),
    "喝": ("口", "喝"),
    "走": ("走", "走"),
    "来": ("一", "來"),
    "坐": ("土", "坐"),
    "给": ("纟", "給"),
    "树": ("木", "樹"),
    "花": ("艹", "花"),
    "雨": ("雨", "雨"),
    "山": ("山", "山"),
    "河": ("氵", "河"),
    "狗": ("犭", "狗"),
    "猫": ("犭", "貓"),
    "鸟": ("鸟", "鳥"),
    "手": ("手", "手"),
    "头": ("大", "頭"),
    "嘴": ("口", "嘴"),
    "脚": ("月", "腳"),
    "路": ("足", "路"),
    "海": ("氵", "海"),
    "一": ("一", "一"),
    "二": ("二", "二"),
    "大": ("大", "大"),
    "小": ("小", "小"),
    "好": ("女", "好"),
    "热": ("灬", "熱"),
    "冷": ("冫", "冷"),
    "红": ("纟", "紅"),
    "新": ("斤", "新"),
    "这": ("辶", "這"),
}


def item(glyph, name, sound, word, gloss, reading="", radical="", traditional="", simplified="", note="", section=""):
    row = {"glyph": glyph, "name": name, "sound": sound, "word": word, "gloss": gloss}
    if reading:
        row["reading"] = reading
    if radical:
        row["radical"] = radical
    if traditional:
        row["traditional"] = traditional
    if simplified:
        row["simplified"] = simplified
    if note:
        row["note"] = note
    if section:
        row["section"] = section
    return row


def parse(text: str):
    section = ""
    rows = []
    for raw in text.splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        if line.startswith("@"):
            section = line[1:].strip()
            continue
        parts = [part.strip() for part in line.split("|")]
        while len(parts) < 6:
            parts.append("")
        glyph, name, sound, word, gloss, reading = parts[:6]
        note = parts[6] if len(parts) > 6 else ""
        rows.append(item(glyph, name or glyph, sound or name or glyph, word, gloss, reading, note=note, section=section))
    return rows


def group(gid, name, rows):
    return {"id": gid, "name": name, "items": rows}


def chart(note, groups):
    return {"note": note, "groups": groups}


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def language_ids():
    text = (ROOT / "src" / "data" / "languages.ts").read_text(encoding="utf-8")
    return re.findall(r'\bid: "([^"]+)"', text)


def han_chars(value, found: set[str]):
    if isinstance(value, str):
        found.update(HAN.findall(value))
    elif isinstance(value, dict):
        for child in value.values():
            han_chars(child, found)
    elif isinstance(value, list):
        for child in value:
            han_chars(child, found)


def pack_examples(lang: str):
    data = load_json(LEX / f"{lang}.json")
    english = load_json(LEX / "en.json")
    examples = []
    order = 0
    for key, entry in data.get("entries", {}).items():
        en = english.get("entries", {}).get(key, {})
        examples.append((order, entry.get("word", ""), entry.get("reading", ""), en.get("word", key), False))
        order += 1
        examples.append((order, entry.get("sentence", ""), entry.get("reading", ""), en.get("sentence", ""), True))
        order += 1
    for key, line in data.get("lines", {}).items():
        gloss = english.get("lines", {}).get(key, "")
        examples.append((order, line, "", gloss, True))
        order += 1
    return examples


def short_def(text: str) -> str:
    bit = text.split(";")[0].split(",")[0].strip()
    return bit[:64]


def align(chars: list[str], reading: str, readings: dict[str, list[str]]):
    if not reading:
        return None
    syllables = reading.split()
    if len(syllables) == len(chars) and all(syllables):
        return syllables
    rest = reading.replace(" ", "")
    chosen = []
    for char in chars:
        options = sorted(readings.get(char, []), key=len, reverse=True)
        hit = next((opt for opt in options if rest.lower().startswith(opt.lower())), "")
        if not hit:
            return None
        chosen.append(hit)
        rest = rest[len(hit) :]
    return chosen if not rest else None


def course_characters(lang: str, dictionary: dict, traditional: dict[str, str], simplified: dict[str, str]):
    best: dict[str, tuple] = {}
    syllable_of: dict[str, str] = {}
    for order, text, reading, gloss, sentence in pack_examples(lang):
        chars = HAN.findall(text)
        if not chars:
            continue
        aligned = align(chars, reading, {ch: dictionary.get(ch, {}).get("pinyin", []) for ch in chars})
        unique = []
        seen = set()
        for char in chars:
            if char not in seen:
                unique.append(char)
                seen.add(char)
        for char in unique:
            score = (len(chars), 1 if sentence else 0, len(text), order)
            prev = best.get(char)
            if prev is None or score < prev[0]:
                best[char] = (score, text, reading, gloss)
        if aligned and len(aligned) == len(chars):
            for char, syllable in zip(chars, aligned):
                syllable_of.setdefault(char, syllable)
    rows = []
    for char, (_score, word, reading, gloss) in best.items():
        info = dictionary.get(char, {})
        radical, trad = CURATED.get(char, ("", ""))
        if not radical:
            radical = info.get("radical", "")
        if not trad:
            trad = traditional.get(char, char)
        simp = simplified.get(char, "")
        sound = syllable_of.get(char) or (info.get("pinyin") or [""])[0]
        if HAN.fullmatch(word) and len(HAN.findall(word)) == 1 and reading:
            sound = reading
        note = ""
        if len(HAN.findall(word)) > 1 and info.get("definition"):
            note = short_def(info["definition"])
        rows.append(
            (
                len(info.get("pinyin") or []),
                info.get("strokes", 99) if False else 0,
                char,
                item(
                    char,
                    sound or char,
                    sound or char,
                    word,
                    gloss or short_def(info.get("definition", "")) or char,
                    reading,
                    radical,
                    trad,
                    simp if simp and simp != char else "",
                    note,
                ),
            )
        )
    return rows


def split_han(rows, stroke_count: dict[str, int]):
    singles = []
    longer = []
    for char_row in rows:
        row = char_row[2] if False else char_row
        # rows are item dicts after we change shape — handled by caller
    return singles, longer


def load_dictionary():
    path = Path("/tmp/hanzi/dictionary.txt")
    readings = {}
    if not path.exists():
        return readings
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.startswith("{"):
            continue
        row = json.loads(line)
        readings[row["character"]] = row
    return readings


def load_opencc(path: Path):
    mapping = {}
    if not path.exists():
        return mapping
    for line in path.read_text(encoding="utf-8").splitlines():
        if "\t" not in line or line.startswith("#"):
            continue
        left, right = line.split("\t", 1)
        mapping[left] = right.split()[0]
    return mapping


def fetch_stroke(char: str):
    url = "https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/" + urllib.request.quote(char) + ".json"
    try:
        with urllib.request.urlopen(url, timeout=20) as response:
            data = json.loads(response.read().decode("utf-8"))
        return char, {"strokes": data["strokes"], "medians": data["medians"]}
    except Exception:
        return char, None


def kana_charts():
    hira = parse(
        """
@Gojūon
あ|a|a|あめ|rain|ame
い|i|i|いぬ|dog|inu
う|u|u|うみ|sea|umi
え|e|e|えき|station|eki
お|o|o|おかね|money|okane
か|ka|ka|かさ|umbrella|kasa
き|ki|ki|き|tree|ki
く|ku|ku|くも|cloud|kumo
け|ke|ke|けさ|this morning|kesa
こ|ko|ko|こども|child|kodomo
さ|sa|sa|さかな|fish|sakana
し|shi|shi|しろ|white|shiro
す|su|su|すし|sushi|sushi
せ|se|se|せなか|back|senaka
そ|so|so|そら|sky|sora
た|ta|ta|たまご|egg|tamago
ち|chi|chi|ちず|map|chizu
つ|tsu|tsu|つき|moon|tsuki
て|te|te|て|hand|te
と|to|to|とり|bird|tori
な|na|na|なつ|summer|natsu
に|ni|ni|にく|meat|niku
ぬ|nu|nu|ぬの|cloth|nuno
ね|ne|ne|ねこ|cat|neko
の|no|no|のり|seaweed|nori
は|ha|ha|はな|flower|hana
ひ|hi|hi|ひ|fire|hi
ふ|fu|fu|ふね|boat|fune
へ|he|he|へや|room|heya
ほ|ho|ho|ほし|star|hoshi
ま|ma|ma|まど|window|mado
み|mi|mi|みず|water|mizu
む|mu|mu|むし|insect|mushi
め|me|me|め|eye|me
も|mo|mo|もり|forest|mori
や|ya|ya|やま|mountain|yama
ゆ|yu|yu|ゆき|snow|yuki
よ|yo|yo|よる|night|yoru
ら|ra|ra|らく|easy|raku
り|ri|ri|りんご|apple|ringo
る|ru|ru|るす|not home|rusu
れ|re|re|れい|zero|rei
ろ|ro|ro|ろく|six|roku
わ|wa|wa|わたし|I|watashi
を|wo|o|みずを|object marker, as in “water”|mizu o
ん|n|n|ほん|book|hon
@Voiced
が|ga|ga|がっこう|school|gakkou
ぎ|gi|gi|ぎんこう|bank|ginkou
ぐ|gu|gu|ぐつ|shoe|gutsu
げ|ge|ge|げんき|well, healthy|genki
ご|go|go|ごはん|meal|gohan
ざ|za|za|ざっし|magazine|zasshi
じ|ji|ji|じかん|time|jikan
ず|zu|zu|ずぼん|trousers|zubon
ぜ|ze|ze|ぜんぶ|all|zenbu
ぞ|zo|zo|ぞう|elephant|zou
だ|da|da|だれ|who|dare
ぢ|ji|ji|ちぢむ|shrink; usually written じ|chijimu
づ|zu|zu|つづく|continue; usually written ず|tsuzuku
で|de|de|でんしゃ|train|densha
ど|do|do|どこ|where|doko
ば|ba|ba|ばんごう|number|bangou
び|bi|bi|びょういん|hospital|byouin
ぶ|bu|bu|ぶた|pig|buta
べ|be|be|べんきょう|study|benkyou
ぼ|bo|bo|ぼうし|hat|boushi
ぱ|pa|pa|ぱん|bread|pan
ぴ|pi|pi|ぴあの|piano|piano
ぷ|pu|pu|ぷーる|pool|puuru
ぺ|pe|pe|ぺん|pen|pen
ぽ|po|po|ぽけっと|pocket|poketto
@Small letters
っ|small tsu|double consonant|がっこう|holds the consonant, as in school|gakkou
ゃ|small ya|ya|きゃく|guest|kyaku
ゅ|small yu|yu|ぎゅうにゅう|milk|gyuunyuu
ょ|small yo|yo|きょう|today|kyou
ぁ|small a|a|あぁ|used inside words, not as a word by itself
ぃ|small i|i|ひぃ|used inside words
ぅ|small u|u|ぅ|used inside words
ぇ|small e|e|ぇ|used inside words
ぉ|small o|o|ぉ|used inside words
"""
    )
    kata = parse(
        """
@Gojūon
ア|a|a|アメリカ|America|amerika
イ|i|i|イギリス|Britain|igirisu
ウ|u|u|ウール|wool|uuru
エ|e|e|エレベーター|elevator|erebeetaa
オ|o|o|オレンジ|orange|orenji
カ|ka|ka|カメラ|camera|kamera
キ|ki|ki|キロ|kilo|kiro
ク|ku|ku|クラス|class|kurasu
ケ|ke|ke|ケーキ|cake|keeki
コ|ko|ko|コーヒー|coffee|koohii
サ|sa|sa|サラダ|salad|sarada
シ|shi|shi|シャツ|shirt|shatsu
ス|su|su|スープ|soup|suupu
セ|se|se|セーター|sweater|seetaa
ソ|so|so|ソファ|sofa|sofa
タ|ta|ta|タクシー|taxi|takushii
チ|chi|chi|チーズ|cheese|chiizu
ツ|tsu|tsu|ツアー|tour|tsuaa
テ|te|te|テレビ|television|terebi
ト|to|to|トイレ|toilet|toire
ナ|na|na|ナイフ|knife|naifu
ニ|ni|ni|ニュース|news|nyuusu
ヌ|nu|nu|ヌードル|noodle|nuudoru
ネ|ne|ne|ネクタイ|necktie|nekutai
ノ|no|no|ノート|notebook|nooto
ハ|ha|ha|ハンカチ|handkerchief|hankachi
ヒ|hi|hi|ヒーロー|hero|hiiroo
フ|fu|fu|フォーク|fork|fooku
ヘ|he|he|ヘリコプター|helicopter|herikoputaa
ホ|ho|ho|ホテル|hotel|hoteru
マ|ma|ma|マスク|mask|masuku
ミ|mi|mi|ミルク|milk|miruku
ム|mu|mu|ムービー|movie|muubii
メ|me|me|メニュー|menu|menyuu
モ|mo|mo|モーター|motor|mootaa
ヤ|ya|ya|ヤード|yard|yaado
ユ|yu|yu|ユニフォーム|uniform|yunifoomu
ヨ|yo|yo|ヨーロッパ|Europe|yooroppa
ラ|ra|ra|ラジオ|radio|rajio
リ|ri|ri|リモコン|remote control|rimokon
ル|ru|ru|ルール|rule|ruuru
レ|re|re|レストラン|restaurant|resutoran
ロ|ro|ro|ロボット|robot|robotto
ワ|wa|wa|ワイン|wine|wain
ヲ|wo|o|ヲ|same sound as オ; rare outside names
ン|n|n|パン|bread|pan
@Voiced
ガ|ga|ga|ガス|gas|gasu
ギ|gi|gi|ギター|guitar|gitaa
グ|gu|gu|グラス|glass|gurasu
ゲ|ge|ge|ゲーム|game|geemu
ゴ|go|go|ゴール|goal|gooru
ザ|za|za|ザ|the, in names
ジ|ji|ji|ジュース|juice|juusu
ズ|zu|zu|ズボン|trousers|zubon
ゼ|ze|ze|ゼロ|zero|zero
ゾ|zo|zo|ゾーン|zone|zoon
ダ|da|da|ダンス|dance|dansu
ヂ|ji|ji|ヂ|rare; usually ジ
ヅ|zu|zu|ヅ|rare; usually ズ
デ|de|de|デスク|desk|desuku
ド|do|do|ドア|door|doa
バ|ba|ba|バス|bus|basu
ビ|bi|bi|ビデオ|video|bideo
ブ|bu|bu|ベッド|bed|beddo
ベ|be|be|ベルト|belt|beruto
ボ|bo|bo|ボール|ball|booru
パ|pa|pa|パン|bread|pan
ピ|pi|pi|ピアノ|piano|piano
プ|pu|pu|プール|pool|puuru
ペ|pe|pe|ペン|pen|pen
ポ|po|po|ポスト|postbox|posuto
@Marks
ー|long mark|holds the vowel|コーヒー|makes the vowel long, as in coffee|koohii
ッ|small tsu|double consonant|ベッド|holds the consonant, as in bed|beddo
ャ|small ya|ya|キャッシュ|cash|kyasshu
ュ|small yu|yu|メニュー|menu|menyuu
ョ|small yo|yo|ショッピング|shopping|shoppingu
"""
    )
    return hira, kata


def amharic_chart():
    families = [
        (0x1200, "h", "ሀገር", "country", "hager"),
        (0x1208, "l", "ለምን", "why", "lämin"),
        (0x1210, "ḥ", "ሐሳብ", "idea", "ḥasab"),
        (0x1218, "m", "መንገድ", "road", "mängäd"),
        (0x1220, "ś", "ሠላም", "peace; often written ሰላም", "śälam"),
        (0x1228, "r", "ረጅም", "long", "räjəm"),
        (0x1230, "s", "ሰው", "person", "säw"),
        (0x1238, "š", "ሸማ", "cotton shawl", "šämma"),
        (0x1240, "q", "ቀን", "day", "qän"),
        (0x1260, "b", "በግ", "sheep", "bäg"),
        (0x1270, "t", "ተራራ", "mountain", "tärara"),
        (0x1278, "č", "ቸር", "kind", "čär"),
        (0x1280, "ḫ", "ኀ", "rare; modern spelling uses ሀ", "ḫa"),
        (0x1290, "n", "ነገ", "tomorrow", "nägä"),
        (0x1298, "ñ", "ኘ", "rare ñ, mostly in older spelling", "ña"),
        (0x12A0, "ʔ", "አባት", "father", "abbat"),
        (0x12A8, "k", "ከተማ", "city", "kätäma"),
        (0x12B8, "x", "ኸ", "loan sound, like x", "xa"),
        (0x12C8, "w", "ወንድ", "man", "wänd"),
        (0x12D0, "ʕ", "ዐይን", "eye", "ʕayn"),
        (0x12D8, "z", "ዘመድ", "relative", "zämäd"),
        (0x12E0, "ž", "ዠ", "rare ž", "ža"),
        (0x12E8, "y", "የኔ", "mine", "yäne"),
        (0x12F0, "d", "ደብተር", "notebook", "däbtär"),
        (0x12F8, "ǧ", "ጀርባ", "back", "ǧärba"),
        (0x1308, "g", "ገንዘብ", "money", "gänzäb"),
        (0x1320, "ṭ", "ጠዋት", "morning", "ṭäwat"),
        (0x1328, "č̣", "ጨረቃ", "moon", "č̣äräqa"),
        (0x1330, "p̣", "ጰ", "rare p'", "p̣a"),
        (0x1338, "ṣ", "ጸሐፊ", "writer", "ṣäḥafi"),
        (0x1340, "ṣ", "ፀሐይ", "sun", "ṣäḥay"),
        (0x1348, "f", "ፈረስ", "horse", "färäs"),
        (0x1350, "p", "ፓፓያ", "papaya", "papaya"),
    ]
    orders = ["ä", "u", "i", "a", "e", "ə", "o"]
    # Course words whose first letter is a fidel form.
    pinned = {
        "እ": ("እኔ", "I", "əne"),
        "አ": ("አንተ", "you", "antä"),
        "ሴ": ("ሴት", "woman", "set"),
        "ል": ("ልጅ", "child", "ləj"),
        "ስ": ("ስም", "name", "səm"),
        "ቤ": ("ቤት", "house", "bet"),
        "በ": ("በር", "door", "bär"),
        "ቁ": ("ቁልፍ", "key", "qulf"),
        "ጠ": ("ጠረጴዛ", "table", "ṭäräppeza"),
        "አል": None,
        "መ": ("መጽሐፍ", "book", "mäṣhaf"),
        "ው": ("ውሃ", "water", "wəha"),
        "እሳ": None,
        "ዳ": ("ዳቦ", "bread", "dabbo"),
        "ፖ": ("ፖም", "apple", "pom"),
        "ወ": ("ወተት", "milk", "wätät"),
        "ዓ": ("ዓሣ", "fish", "asa"),
        "ሩ": ("ሩዝ", "rice", "ruz"),
        "ቡ": ("ቡና", "coffee", "bunna"),
        "ዛ": ("ዛፍ", "tree", "zaf"),
        "አበ": None,
        "ዝ": ("ዝናብ", "rain", "zənab"),
        "ተ": ("ተራራ", "mountain", "tärara"),
        "ድ": ("ድንጋይ", "stone", "dəngay"),
        "ጨ": ("ጨረቃ", "moon", "č̣äräqa"),
        "ፀ": ("ፀሐይ", "sun", "ṣäḥay"),
    }
    pinned = {key: value for key, value in pinned.items() if value}
    rows = []
    for base, sound, word, gloss, reading in families:
        section = f"{chr(base)} {sound}"
        for offset, vowel in enumerate(orders):
            glyph = chr(base + offset)
            syllable = f"{sound}{vowel}" if sound not in {"ʔ", "ʕ"} else vowel
            if sound == "ʔ":
                syllable = vowel
            own = pinned.get(glyph)
            if own:
                rows.append(item(glyph, syllable, syllable, own[0], own[1], own[2], section=section))
            elif offset == 0:
                rows.append(item(glyph, syllable, syllable, word, gloss, reading, section=section))
            else:
                rows.append(item(glyph, syllable, syllable, glyph, "This vowel form of the letter.", syllable, section=section))
    return chart(
        "Geʽez fidel. Each family is one consonant, then seven vowel forms. A course word is attached where that form begins a word.",
        [group("fidel", "Fidel", rows)],
    )


def build_han_groups(lang: str, dictionary, traditional, simplified, stroke_count):
    packed = []
    best = {}
    syllable_of = {}
    readings = {ch: (dictionary.get(ch, {}).get("pinyin") or []) for ch in dictionary}
    for order, text, reading, gloss, sentence in pack_examples(lang):
        chars = HAN.findall(text)
        if not chars:
            continue
        aligned = align(chars, reading, readings)
        seen = set()
        for index, char in enumerate(chars):
            if char in seen:
                continue
            seen.add(char)
            score = (len(chars), 1 if sentence else 0, len(text), order)
            prev = best.get(char)
            if prev is None or score < prev[0]:
                best[char] = (score, text, reading, gloss, order)
            if aligned and index < len(aligned):
                syllable_of.setdefault(char, aligned[index])
    singles = []
    longer = []
    for char, (score, word, reading, gloss, order) in best.items():
        info = dictionary.get(char, {})
        radical, trad = CURATED.get(char, ("", ""))
        if not radical:
            radical = info.get("radical", "")
        if not trad:
            trad = traditional.get(char, "")
        simp = simplified.get(char, "")
        sound = syllable_of.get(char, "")
        if lang == "zh":
            sound = sound or ((info.get("pinyin") or [""])[0])
        word_chars = HAN.findall(word)
        if len(word_chars) == 1 and reading:
            sound = reading
        if not sound:
            sound = char
        note = ""
        if len(word_chars) > 1 and lang == "zh" and info.get("definition"):
            note = short_def(info["definition"])
        trad_field = ""
        simp_field = ""
        if lang != "ja":
            trad_field = trad if trad and trad != char else ""
            simp_field = simp if simp and simp != char else ""
        shown = word
        extra = ""
        if len(word) > 18:
            at = word.find(char)
            start = max(0, at - 5)
            end = min(len(word), at + 7)
            shown = word[start:end].strip(" 。、，,.!?？！")
            extra = word
        row = item(
            char,
            sound,
            sound,
            shown or char,
            gloss or short_def(info.get("definition", "")) or "course word",
            reading,
            radical,
            trad_field,
            simp_field,
            note or extra,
        )
        bucket = singles if len(word_chars) == 1 else longer
        bucket.append((stroke_count.get(char, 99), order, row))
    def emit(bucket):
        bucket.sort(key=lambda row: (row[0], row[1]))
        return [row for _strokes, _order, row in bucket]
    return emit(singles), emit(longer), set(best)


def apply_map(mapping, text: str) -> str:
    index = 0
    out = []
    while index < len(text):
        matched = False
        for source, target in mapping:
            if text.startswith(source, index):
                out.append(target)
                index += len(source)
                matched = True
                break
        if not matched:
            out.append(text[index])
            index += 1
    return "".join(out)


CYR_MAP = [
    ("Dž", "Дж"), ("dž", "дж"), ("Lj", "Љ"), ("lj", "љ"), ("Nj", "Њ"), ("nj", "њ"),
    ("Č", "Ч"), ("č", "ч"), ("Š", "Ш"), ("š", "ш"), ("Ž", "Ж"), ("ž", "ж"),
    ("Ě", "Є"), ("ě", "є"),
    ("A", "А"), ("a", "а"), ("B", "Б"), ("b", "б"), ("C", "Ц"), ("c", "ц"),
    ("D", "Д"), ("d", "д"), ("E", "Е"), ("e", "е"), ("F", "Ф"), ("f", "ф"),
    ("G", "Г"), ("g", "г"), ("H", "Х"), ("h", "х"), ("I", "И"), ("i", "и"),
    ("J", "Ј"), ("j", "ј"), ("K", "К"), ("k", "к"), ("L", "Л"), ("l", "л"),
    ("M", "М"), ("m", "м"), ("N", "Н"), ("n", "н"), ("O", "О"), ("o", "о"),
    ("P", "П"), ("p", "п"), ("R", "Р"), ("r", "р"), ("S", "С"), ("s", "с"),
    ("T", "Т"), ("t", "т"), ("U", "У"), ("u", "у"), ("V", "В"), ("v", "в"),
    ("Y", "Ы"), ("y", "ы"), ("Z", "З"), ("z", "з"),
]
GLAG_MAP = [
    ("Дж", "ⰄⰆ"), ("дж", "ⰴⰶ"), ("Љ", "ⰎⰉ"), ("љ", "ⰾⰹ"), ("Њ", "ⰐⰉ"), ("њ", "ⱀⰹ"),
    ("Ы", "ⰟⰋ"), ("ы", "ⱏⰻ"), ("А", "Ⰰ"), ("а", "ⰰ"), ("Б", "Ⰱ"), ("б", "ⰱ"),
    ("В", "Ⰲ"), ("в", "ⰲ"), ("Г", "Ⰳ"), ("г", "ⰳ"), ("Д", "Ⰴ"), ("д", "ⰴ"),
    ("Е", "Ⰵ"), ("е", "ⰵ"), ("Є", "Ⱑ"), ("є", "ⱑ"), ("Ж", "Ⰶ"), ("ж", "ⰶ"),
    ("З", "Ⰸ"), ("з", "ⰸ"), ("И", "Ⰻ"), ("и", "ⰻ"), ("Ј", "Ⰹ"), ("ј", "ⰹ"),
    ("К", "Ⰽ"), ("к", "ⰽ"), ("Л", "Ⰾ"), ("л", "ⰾ"), ("М", "Ⰿ"), ("м", "ⰿ"),
    ("Н", "Ⱀ"), ("н", "ⱀ"), ("О", "Ⱁ"), ("о", "ⱁ"), ("П", "Ⱂ"), ("п", "ⱂ"),
    ("Р", "Ⱃ"), ("р", "ⱃ"), ("С", "Ⱄ"), ("с", "ⱄ"), ("Т", "Ⱅ"), ("т", "ⱅ"),
    ("У", "Ⱆ"), ("у", "ⱆ"), ("Ф", "Ⱇ"), ("ф", "ⱇ"), ("Х", "Ⱈ"), ("х", "ⱈ"),
    ("Ц", "Ⱌ"), ("ц", "ⱌ"), ("Ч", "Ⱍ"), ("ч", "ⱍ"), ("Ш", "Ⱎ"), ("ш", "ⱎ"),
]


def to_cyr(text: str) -> str:
    return apply_map(CYR_MAP, text)


def to_glag(text: str) -> str:
    return apply_map(GLAG_MAP, to_cyr(text))


def isv_chart():
    latin = parse(
        """
a|a|a|abeceda|alphabet
b|b|b|bratr|brother
c|c|ts|cěna|price
č|č|ch|čaj|tea
d|d|d|dom|house
e|e|e|jest|is
ě|ě|ye|sněg|snow
f|f|f|film|film
g|g|g|gora|mountain
h|h|h|hlěb|bread
i|i|i|ime|name
j|j|y|jabloko|apple
k|k|k|kniga|book
l|l|l|luna|moon
lj|lj|ly|ljubov|love
m|m|m|mlěko|milk
n|n|n|noč|night
nj|nj|ny|njiva|field
o|o|o|oko|eye
p|p|p|pes|dog
r|r|r|rěka|river
s|s|s|solnce|sun
š|š|sh|škola|school
t|t|t|trava|grass
u|u|u|ulica|street
v|v|v|voda|water
y|y|i|syn|son
z|z|z|zima|winter
ž|ž|zh|žena|woman
"""
    )
    cyr = [item(to_cyr(row["glyph"]), row["name"], row["sound"], to_cyr(row["word"]), row["gloss"], row["word"]) for row in latin]
    glag_names = [
        ("a", "Ⰰ", "az"), ("b", "Ⰱ", "buky"), ("v", "Ⰲ", "vědě"), ("g", "Ⰳ", "glagoli"),
        ("d", "Ⰴ", "dobro"), ("e", "Ⰵ", "jest"), ("ž", "Ⰶ", "živěte"), ("z", "Ⰸ", "zemlja"),
        ("i", "Ⰻ", "i"), ("j", "Ⰹ", "iže"), ("k", "Ⰽ", "kako"), ("l", "Ⰾ", "ljudije"),
        ("m", "Ⰿ", "myslite"), ("n", "Ⱀ", "naš"), ("o", "Ⱁ", "on"), ("p", "Ⱂ", "pokoj"),
        ("r", "Ⱃ", "rci"), ("s", "Ⱄ", "slovo"), ("t", "Ⱅ", "tvrdo"), ("u", "Ⱆ", "uk"),
        ("f", "Ⱇ", "frt"), ("h", "Ⱈ", "xěr"), ("c", "Ⱌ", "ci"), ("č", "Ⱍ", "črv"),
        ("š", "Ⱎ", "ša"), ("y", "Ⱏ", "jer"), ("ě", "Ⱑ", "jat"),
    ]
    by_glyph = {row["glyph"]: row for row in latin}
    glag = []
    for key, glyph, name in glag_names:
        src = by_glyph[key]
        glag.append(item(glyph, name, src["sound"], to_glag(src["word"]), src["gloss"], src["word"]))
    return chart(
        "One Interslavic word in Latin, Cyrillic, and Glagolitic. The Glagolitic letter keeps its old name.",
        [group("lat", "Latin", latin), group("cyr", "Cyrillic", cyr), group("glag", "Glagolitic", glag)],
    )


def charts_from_rows():
    from letter_rows import RAW

    charts = {}
    for lang, (note, groups) in RAW.items():
        charts[lang] = chart(note, [group(gid, name, parse(text)) for gid, name, text in groups])
    return charts


def main():

    dictionary = load_dictionary()
    traditional = load_opencc(Path("/tmp/hanzi/STCharacters.txt"))
    simplified = {}
    for left, right in traditional.items():
        simplified.setdefault(right, left)
    chars = set()
    for lang in ("zh", "yue", "ja"):
        found = set()
        han_chars(load_json(LEX / f"{lang}.json"), found)
        chars.update(found)
    existing = {}
    if STROKES.exists():
        existing = load_json(STROKES)
    missing = [char for char in sorted(chars) if char not in existing]
    downloaded = {}
    if missing:
        with ThreadPoolExecutor(max_workers=16) as pool:
            futures = [pool.submit(fetch_stroke, char) for char in missing]
            for future in as_completed(futures):
                char, data = future.result()
                if data:
                    downloaded[char] = data
    strokes = {**existing, **downloaded}
    if "歩" in chars and "歩" not in strokes:
        _alias, data = fetch_stroke("步")
        if data:
            strokes["歩"] = data
    # Drop unused graphics keys if an older file stored them.
    strokes = {char: {"strokes": row["strokes"], "medians": row["medians"]} for char, row in strokes.items() if char in chars and row.get("strokes")}
    stroke_count = {char: len(row["strokes"]) for char, row in strokes.items()}
    meta = {}
    for char in sorted(chars):
        info = dictionary.get(char, {})
        radical, trad = CURATED.get(char, ("", ""))
        if not radical:
            radical = info.get("radical", "")
        if not trad:
            trad = traditional.get(char, "")
        meta[char] = {
            "radical": radical,
            "traditional": trad or char,
            "pinyin": (info.get("pinyin") or [""])[0],
        }
    STROKES.parent.mkdir(parents=True, exist_ok=True)
    STROKES.write_text(json.dumps(strokes, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    META.write_text(json.dumps(meta, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")

    zh_single, zh_more, zh_set = build_han_groups("zh", dictionary, traditional, simplified, stroke_count)
    yue_single, yue_more, yue_set = build_han_groups("yue", dictionary, traditional, simplified, stroke_count)
    ja_single, ja_more, _ja_set = build_han_groups("ja", dictionary, traditional, simplified, stroke_count)
    hira, kata = kana_charts()
    charts = charts_from_rows()
    charts["zh"] = chart(
        "Every character that appears on a Chinese card in this course. The stroke order plays on the right. One-character words come first.",
        [group("one", "One character", zh_single), group("more", "Inside a word", zh_more)],
    )
    charts["yue"] = chart(
        "Every character that appears on a Cantonese card. Readings are Jyutping from that card. Stroke order follows the written form.",
        [group("one", "One character", yue_single), group("more", "Inside a word", yue_more)],
    )
    charts["ja"] = chart(
        "Hiragana and katakana are the two kana systems. Kanji are the characters that appear on the Japanese cards. Stroke order follows the standard form of that character.",
        [
            group("hira", "Hiragana", hira),
            group("kata", "Katakana", kata),
            group("kanji", "Kanji", ja_single + ja_more),
        ],
    )
    charts["am"] = amharic_chart()
    charts["isv"] = isv_chart()
    ids = language_ids()
    missing_langs = [lang for lang in ids if lang not in charts]
    if missing_langs:
        raise SystemExit("missing alphabets: " + ", ".join(missing_langs))
    for lang, data in charts.items():
        glyphs = []
        for grp in data["groups"]:
            for row in grp["items"]:
                if not row["glyph"] or not row["word"] or not row["gloss"]:
                    raise SystemExit(f"empty field in {lang} {row}")
                glyphs.append((grp["id"], row["glyph"], row.get("section", "")))
        if lang not in ids:
            raise SystemExit("unknown language " + lang)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(charts, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(
        f"languages {len(charts)} zh {len(zh_set)} yue {len(yue_set)} ja-kanji {len(ja_single) + len(ja_more)} strokes {len(strokes)} missing-strokes {len(chars - set(strokes))}"
    )


if __name__ == "__main__":
    main()
