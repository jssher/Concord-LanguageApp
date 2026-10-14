export type LangMeta = {
  id: string;
  name: string;
  native: string;
  dir: "ltr" | "rtl";
  speech: string;
  voiceApprox?: boolean;
  family: string;
  script: string;
  tip: string;
  font?: string;
};

const SANS = '"Source Sans 3", "Noto Sans", sans-serif';

export const LANGUAGES: LangMeta[] = [
  { id: "en", name: "English", native: "English", dir: "ltr", speech: "en-US", family: "Germanic", script: "Latin", tip: "Word order carries the grammar. Watch the irregular plurals." },
  { id: "de", name: "German", native: "Deutsch", dir: "ltr", speech: "de-DE", family: "Germanic", script: "Latin", tip: "Every noun has an article. Learn der, die, or das with the word." },
  { id: "nl", name: "Dutch", native: "Nederlands", dir: "ltr", speech: "nl-NL", family: "Germanic", script: "Latin", tip: "De or het is the fact you memorize with each noun." },
  { id: "da", name: "Danish", native: "Dansk", dir: "ltr", speech: "da-DK", family: "Germanic", script: "Latin", tip: "Common gender takes en. Neuter takes et." },
  { id: "gsw", name: "Swiss German", native: "Schwiizerdütsch", dir: "ltr", speech: "de-CH", voiceApprox: true, family: "Germanic", script: "Latin", tip: "Written as Zürich speech, not as schoolbook German." },
  { id: "is", name: "Icelandic", native: "Íslenska", dir: "ltr", speech: "is-IS", family: "Germanic", script: "Latin", tip: "Three genders, and the article is a suffix on the noun." },

  { id: "es", name: "Spanish", native: "Español", dir: "ltr", speech: "es-ES", family: "Romance", script: "Latin", tip: "Adjectives follow the noun and agree with it." },
  { id: "fr", name: "French", native: "Français", dir: "ltr", speech: "fr-FR", family: "Romance", script: "Latin", tip: "The article and the liaison tell you what the silent letters are doing." },
  { id: "pt", name: "Portuguese", native: "Português", dir: "ltr", speech: "pt-BR", family: "Romance", script: "Latin", tip: "Brazilian forms. Keep the article; it contracts with prepositions." },
  { id: "it", name: "Italian", native: "Italiano", dir: "ltr", speech: "it-IT", family: "Romance", script: "Latin", tip: "Gender sits on the noun. The article changes with the next sound." },
  { id: "ro", name: "Romanian", native: "Română", dir: "ltr", speech: "ro-RO", family: "Romance", script: "Latin", tip: "The article is a suffix on the noun. Gender stays with the word." },

  { id: "la", name: "Latin", native: "Latina", dir: "ltr", speech: "it-IT", voiceApprox: true, family: "Italic", script: "Latin", tip: "Classical Latin, with macrons. There is no article. Gender and case sit on the ending." },
  { id: "ga", name: "Irish", native: "Gaeilge", dir: "ltr", speech: "ga-IE", family: "Celtic", script: "Latin", tip: "The article an can change the first letter. Learn the dictionary form, then the sentence." },
  { id: "cy", name: "Welsh", native: "Cymraeg", dir: "ltr", speech: "cy-GB", family: "Celtic", script: "Latin", tip: "The article is y or yr. A feminine noun often softens its first letter after it." },

  { id: "ru", name: "Russian", native: "Русский", dir: "ltr", speech: "ru-RU", family: "Slavic", script: "Cyrillic", tip: "No articles. Endings carry gender, number, and case." },
  { id: "uk", name: "Ukrainian", native: "Українська", dir: "ltr", speech: "uk-UA", family: "Slavic", script: "Cyrillic", tip: "Endings do the work articles do in English. The apostrophe marks a separate sound." },
  { id: "hr", name: "Croatian", native: "Hrvatski", dir: "ltr", speech: "hr-HR", family: "Slavic", script: "Latin", tip: "Seven cases, and the verb likes the second position in the sentence." },
  { id: "sl", name: "Slovenian", native: "Slovenščina", dir: "ltr", speech: "sl-SI", family: "Slavic", script: "Latin", tip: "Slovenian also has a dual. This core deck stays with one and many." },
  { id: "mk", name: "Macedonian", native: "Македонски", dir: "ltr", speech: "mk-MK", family: "Slavic", script: "Cyrillic", tip: "The article is a suffix: -от, -та, -то." },
  { id: "bg", name: "Bulgarian", native: "Български", dir: "ltr", speech: "bg-BG", family: "Slavic", script: "Cyrillic", tip: "The article is a suffix, and verbs have no infinitive." },
  { id: "pl", name: "Polish", native: "Polski", dir: "ltr", speech: "pl-PL", family: "Slavic", script: "Latin", tip: "Case endings and verb aspect are the long game. Start with the dictionary form." },
  { id: "cs", name: "Czech", native: "Čeština", dir: "ltr", speech: "cs-CZ", family: "Slavic", script: "Latin", tip: "Learn the nominative first. The other cases hang off it." },
  { id: "sk", name: "Slovak", native: "Slovenčina", dir: "ltr", speech: "sk-SK", family: "Slavic", script: "Latin", tip: "Long vowels and cases. Learn the nominative, then the endings that follow." },
  { id: "sr", name: "Serbian", native: "Српски", dir: "ltr", speech: "sr-RS", family: "Slavic", script: "Cyrillic", tip: "Ekavian, written in Cyrillic. The Latin reading sits under the word." },

  { id: "sq", name: "Albanian", native: "Shqip", dir: "ltr", speech: "sq-AL", family: "Albanian", script: "Latin", tip: "The article is a suffix on the noun." },
  { id: "eu", name: "Basque", native: "Euskara", dir: "ltr", speech: "eu-ES", family: "Basque", script: "Latin", tip: "Standard Basque. The article is a suffix, -a." },
  { id: "el", name: "Greek", native: "Ελληνικά", dir: "ltr", speech: "el-GR", family: "Hellenic", script: "Greek", tip: "The article changes with gender, number, and case. Stress is written." },
  { id: "grc", name: "Ancient Greek", native: "Ἀρχαία Ἑλληνική", dir: "ltr", speech: "el-GR", voiceApprox: true, family: "Hellenic", script: "Greek", font: `"Noto Sans Greek", ${SANS}`, tip: "Attic, the old school form, with the old accent marks. The card shows the nominative or the present infinitive. Speech uses a modern Greek voice." },
  { id: "egy", name: "Egyptian", native: "r n Kmt", dir: "ltr", speech: "en-US", voiceApprox: true, family: "Egyptian", script: "Hieroglyphs", font: `"Noto Sans Egyptian Hieroglyphs", ${SANS}`, tip: "Middle Egyptian, the classical stage. The signs are the word. The line under them is how Egyptologists transliterate it. Egyptian Arabic stays on the Arabic card." },
  { id: "tr", name: "Turkish", native: "Türkçe", dir: "ltr", speech: "tr-TR", family: "Turkic", script: "Latin", tip: "No gender. Endings stack on a stem that stays recognizable." },

  { id: "zh", name: "Chinese", native: "中文", dir: "ltr", speech: "zh-CN", family: "Sinitic", script: "Han", font: `"Noto Sans SC", ${SANS}`, tip: "Mandarin, simplified characters. The reading shows the tones." },
  { id: "yue", name: "Cantonese", native: "粵語", dir: "ltr", speech: "yue-HK", voiceApprox: true, family: "Sinitic", script: "Han", font: `"Noto Sans HK", ${SANS}`, tip: "Hong Kong Cantonese, traditional characters. The reading is Jyutping." },
  { id: "ja", name: "Japanese", native: "日本語", dir: "ltr", speech: "ja-JP", family: "Japonic", script: "Japanese", font: `"Noto Sans JP", ${SANS}`, tip: "The word is the dictionary form. Sentences use polite です and ます." },
  { id: "ko", name: "Korean", native: "한국어", dir: "ltr", speech: "ko-KR", family: "Koreanic", script: "Hangul", font: `"Noto Sans KR", ${SANS}`, tip: "Sentences use polite 해요 style. Particles mark each word’s job." },
  { id: "hi", name: "Hindi", native: "हिन्दी", dir: "ltr", speech: "hi-IN", family: "Indic", script: "Devanagari", font: `"Noto Sans Devanagari", ${SANS}`, tip: "Postpositions, not prepositions. Adjectives agree with gender." },
  { id: "mr", name: "Marathi", native: "मराठी", dir: "ltr", speech: "mr-IN", family: "Indic", script: "Devanagari", font: `"Noto Sans Devanagari", ${SANS}`, tip: "The verb agrees with the subject. Neuter nouns, like मूल, take a different ending." },
  { id: "bn", name: "Bengali", native: "বাংলা", dir: "ltr", speech: "bn-BD", family: "Indic", script: "Bengali", font: `"Noto Sans Bengali", ${SANS}`, tip: "No grammatical gender. These cards use পানি, the everyday word in Bangladesh." },
  { id: "gu", name: "Gujarati", native: "ગુજરાતી", dir: "ltr", speech: "gu-IN", family: "Indic", script: "Gujarati", font: `"Noto Sans Gujarati", ${SANS}`, tip: "The verb agrees with gender and number. The reading marks the nasal vowel." },
  { id: "ur", name: "Urdu", native: "اردو", dir: "rtl", speech: "ur-PK", family: "Indic", script: "Arabic", font: `"Noto Nastaliq Urdu", "Noto Sans Arabic", ${SANS}`, tip: "Right to left, in Nastaliq. The reading is a simple Latin guide." },
  { id: "te", name: "Telugu", native: "తెలుగు", dir: "ltr", speech: "te-IN", family: "Dravidian", script: "Telugu", font: `"Noto Sans Telugu", ${SANS}`, tip: "Verbs take a personal ending. The reading shows the long vowels." },
  { id: "ta", name: "Tamil", native: "தமிழ்", dir: "ltr", speech: "ta-IN", family: "Dravidian", script: "Tamil", font: `"Noto Sans Tamil", ${SANS}`, tip: "Endings stack on the stem. There is no European-style gender on most nouns." },
  { id: "ml", name: "Malayalam", native: "മലയാളം", dir: "ltr", speech: "ml-IN", family: "Dravidian", script: "Malayalam", font: `"Noto Sans Malayalam", ${SANS}`, tip: "Agglutinative. The reading is there so you can start before the script is fluent." },

  { id: "fa", name: "Persian", native: "فارسی", dir: "rtl", speech: "fa-IR", family: "Iranian", script: "Arabic", font: `"Noto Sans Arabic", ${SANS}`, tip: "Right to left. را marks a definite object. Ezafe links words quietly." },
  { id: "ar", name: "Arabic", native: "العربية", dir: "rtl", speech: "ar", family: "Semitic", script: "Arabic", font: `"Noto Sans Arabic", ${SANS}`, tip: "One card shows Modern Standard, Egyptian, and Saudi. The reading is there so each variety can be said aloud." },
  { id: "ber", name: "Berber", native: "ⵜⴰⵎⴰⵣⵉⵖⵜ", dir: "ltr", speech: "zgh", voiceApprox: true, family: "Amazigh", script: "Tifinagh", font: `"Noto Sans Tifinagh", ${SANS}`, tip: "Standard Moroccan Tamazight, in Tifinagh. The reading is the Latin spelling." },
  { id: "he", name: "Hebrew", native: "עברית", dir: "rtl", speech: "he-IL", family: "Semitic", script: "Hebrew", font: `"Noto Sans Hebrew", ${SANS}`, tip: "Right to left, with vowels marked for learners. The article is ה־." },
  { id: "am", name: "Amharic", native: "አማርኛ", dir: "ltr", speech: "am-ET", voiceApprox: true, family: "Semitic", script: "Ethiopic", font: `"Noto Sans Ethiopic", ${SANS}`, tip: "Geʽez letters. The reading is there until the script is familiar. The verb agrees with who acts." },
  { id: "arc", name: "Aramaic", native: "ܐܪܡܝܐ", dir: "rtl", speech: "syr", voiceApprox: true, family: "Semitic", script: "Syriac", font: `"Noto Sans Syriac", ${SANS}`, tip: "Classical Syriac, the literary Aramaic still read in church and study." },
  { id: "hy", name: "Armenian", native: "Հայերեն", dir: "ltr", speech: "hy-AM", family: "Armenian", script: "Armenian", font: `"Noto Sans Armenian", ${SANS}`, tip: "Eastern Armenian. The definite article is a suffix on the noun." },
  { id: "ka", name: "Georgian", native: "ქართული", dir: "ltr", speech: "ka-GE", voiceApprox: true, family: "Kartvelian", script: "Mkhedruli", font: `"Noto Sans Georgian", ${SANS}`, tip: "Mkhedruli has no capitals. The reading under the word is a letter-by-letter guide." },

  { id: "sw", name: "Swahili", native: "Kiswahili", dir: "ltr", speech: "sw-KE", family: "Bantu", script: "Latin", tip: "Noun classes replace gender. The prefix is part of the word." },
  { id: "ln", name: "Lingala", native: "Lingála", dir: "ltr", speech: "ln", voiceApprox: true, family: "Bantu", script: "Latin", tip: "Kinshasa Lingala. Accents mark the tone, and they belong to the word." },
  { id: "ig", name: "Igbo", native: "Igbo", dir: "ltr", speech: "ig-NG", voiceApprox: true, family: "Volta-Niger", script: "Latin", tip: "The underdots change the vowel. Tone can change the word." },
  { id: "yo", name: "Yoruba", native: "Yorùbá", dir: "ltr", speech: "yo-NG", voiceApprox: true, family: "Volta-Niger", script: "Latin", tip: "Tones and underdots are part of the spelling. Keep them." },
  { id: "ha", name: "Hausa", native: "Hausa", dir: "ltr", speech: "ha-NG", voiceApprox: true, family: "Chadic", script: "Latin", tip: "Boko spelling, the Latin orthography used in school." },
  { id: "ff", name: "Fulani", native: "Fulfulde", dir: "ltr", speech: "ff", voiceApprox: true, family: "Atlantic", script: "Latin", tip: "Fulfulde in Latin letters. The hooked letters change the sound, and dialects differ." },
  { id: "so", name: "Somali", native: "Soomaali", dir: "ltr", speech: "so-SO", family: "Cushitic", script: "Latin", tip: "Most words put the main stress on the syllable before the last. C and x are Somali sounds." },

  { id: "tl", name: "Tagalog", native: "Tagalog", dir: "ltr", speech: "fil-PH", family: "Austronesian", script: "Latin", tip: "The predicate often comes first. Ang marks the focus of the sentence." },
  { id: "th", name: "Thai", native: "ไทย", dir: "ltr", speech: "th-TH", family: "Kra-Dai", script: "Thai", font: `"Noto Sans Thai", ${SANS}`, tip: "Words are not separated by spaces. The reading carries the tones." },
  { id: "vi", name: "Vietnamese", native: "Tiếng Việt", dir: "ltr", speech: "vi-VN", family: "Austroasiatic", script: "Latin", tip: "Each syllable is written apart, and the diacritic is the tone." },
  { id: "id", name: "Indonesian", native: "Bahasa Indonesia", dir: "ltr", speech: "id-ID", family: "Austronesian", script: "Latin", tip: "No gender and no conjugation. Affixes build new words from a root." },
  { id: "mg", name: "Malagasy", native: "Malagasy", dir: "ltr", speech: "mg-MG", family: "Austronesian", script: "Latin", tip: "The word you are looking for often comes first. Stress is usually on the syllable before the last." },
  { id: "haw", name: "Hawaiian", native: "ʻŌlelo Hawaiʻi", dir: "ltr", speech: "haw", voiceApprox: true, family: "Austronesian", script: "Latin", tip: "The ʻokina is a consonant. A line over a vowel is the kahakō, and it changes the word." },

  { id: "qu", name: "Quechua", native: "Runasimi", dir: "ltr", speech: "qu-PE", voiceApprox: true, family: "Quechuan", script: "Latin", tip: "Southern Quechua. A handful of suffixes does most of the grammar." },
  { id: "gn", name: "Guaraní", native: "Avañeʼẽ", dir: "ltr", speech: "gn-PY", voiceApprox: true, family: "Tupian", script: "Latin", tip: "Paraguayan Guaraní. The tilde and the nasal mark belong to the word." },

  { id: "eo", name: "Esperanto", native: "Esperanto", dir: "ltr", speech: "eo", voiceApprox: true, family: "Constructed", script: "Latin", tip: "One article, la. Nouns end in -o, adjectives in -a, verbs in -i." },
  { id: "isv", name: "Interslavic", native: "Medžuslovjansky", dir: "ltr", speech: "hr-HR", voiceApprox: true, family: "Constructed", script: "Latin", font: `"Noto Sans Glagolitic", ${SANS}`, tip: "One card shows the same sentence in Latin, Cyrillic, and Glagolitic." },
  { id: "tok", name: "Toki Pona", native: "toki pona", dir: "ltr", speech: "es-ES", voiceApprox: true, family: "Constructed", script: "Latin", tip: "About 120 words, and compounds do the rest. moku is both eat and drink." },
  { id: "aur", name: "Aurali", native: "Aurali", dir: "ltr", speech: "es-ES", voiceApprox: true, family: "Constructed", script: "Latin", tip: "An original language for this course. The article is na. sa means “is”. Adjectives follow the noun, and the plural is -n." },
  { id: "sig", name: "Signal", native: "8192", dir: "ltr", speech: "en-US", voiceApprox: true, family: "Machine", script: "Signal", font: `"Signal 8192", ${SANS}`, tip: "An original 8,192-sign script. The Accelerando font is not licensed to ship, so these shapes are new. Each sign holds 13 bits. The speaker plays a soft figure a machine can turn back into the text." },
];

export const LANG_BY_ID = new Map(LANGUAGES.map((l) => [l.id, l]));

export const FAMILIES = [...new Set(LANGUAGES.map((l) => l.family))];
