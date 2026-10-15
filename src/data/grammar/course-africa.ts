import type { GrammarCourse } from "./model";

export const AFRICA: Record<string, GrammarCourse> = {
  sw: {
    intro: "Standard Tanzanian and Kenyan Swahili replaces masculine and feminine with noun classes, and the class prefix is part of the word.",
    lessons: [
      {
        id: "a1-class",
        level: "A1",
        title: "Noun class is the gender",
        lead: "There is no masculine or feminine, and there is no word for a or the.",
        notes: [
          "Every noun belongs to a class, and the class prefix is part of the word you learn.",
          "People use the pair m- and wa-, as in mtu and watu, and that pair is the agreement you will meet first.",
          "Do not invent a European article or a gender ending, because the class prefix does that work."
        ],
        examples: [
          ["Mtu anakaa hapa.", "A person stays here."],
          ["Watu wanakaa hapa.", "People stay here."]
        ]
      },
      {
        id: "a1-mtu",
        level: "A1",
        title: "Mtu, watu, and the subject prefix",
        lead: "The verb starts with a subject prefix that agrees with the class.",
        notes: [
          "Mtu takes a- on the verb, and watu takes wa-.",
          "The person speaking uses ni- for mimi, u- for wewe, and tu- for sisi.",
          "The prefix is not a separate word, so you cannot leave it off the verb."
        ],
        examples: [
          ["Mtu anaona jua.", "The person sees the sun."],
          ["Watu wanaona jua.", "The people see the sun."]
        ],
        table: {
          caption: "Subject prefix plus ona",
          heads: ["", "prefix", "present"],
          rows: [
            ["mimi", "ni-", "ninaona"],
            ["wewe", "u-", "unaona"],
            ["yeye or mtu", "a-", "anaona"],
            ["watu", "wa-", "wanaona"]
          ]
        }
      },
      {
        id: "a1-kivi",
        level: "A1",
        title: "Ki- and vi- for a thing",
        lead: "Many things use ki- in the singular and vi- in the plural, and the verb agrees.",
        notes: [
          "Kitu and kitabu are this class, and their plurals are vitu and vitabu.",
          "Chakula is the same class, but ki- before a vowel is written cha-, and the plural is vyakula.",
          "The subject prefix is ki- for one thing and vi- for more than one."
        ],
        examples: [
          ["Kitabu kiko mezani.", "The book is on the table."],
          ["Vyakula viko mezani.", "The foods are on the table."]
        ],
        table: {
          caption: "Class 7 and class 8",
          heads: ["singular", "plural", "prefixes"],
          rows: [
            ["kitu", "vitu", "ki- / vi-"],
            ["kitabu", "vitabu", "ki- / vi-"],
            ["chakula", "vyakula", "ki- / vi-"]
          ]
        }
      },
      {
        id: "a2-nclass",
        level: "A2",
        title: "Class 9 and 10",
        lead: "Class 9 and class 10 often look the same, and animals and many loan words live here.",
        notes: [
          "Nyumba, ndege, and mbwa do not grow an m- or a ki- prefix, and the singular and the plural noun can look identical.",
          "A thing such as nyumba takes i- for one and zi- for many on the verb.",
          "A living animal still takes the person prefixes a- and wa-, so mbwa anakula even though the noun itself is not m-wa."
        ],
        examples: [
          ["Nyumba iko hapa.", "The house is here."],
          ["Mbwa anakula.", "The dog is eating."]
        ]
      },
      {
        id: "a2-negative",
        level: "A2",
        title: "Negative subject prefixes",
        lead: "The negative has its own subject prefix, and the present drops the tense marker.",
        notes: [
          "I in the negative present is si-, you is hu-, and he or she is ha-.",
          "We is hatu-, not a separate word parked in front of tunaona.",
          "The final vowel of the present negative becomes i, so ninaona turns into sioni."
        ],
        examples: [
          ["Sioni jua.", "I do not see the sun."],
          ["Haoni jua.", "He or she does not see the sun."]
        ],
        table: {
          caption: "ona, present and negative present",
          heads: ["", "present", "negative"],
          rows: [
            ["mimi", "ninaona", "sioni"],
            ["wewe", "unaona", "huoni"],
            ["yeye", "anaona", "haoni"],
            ["sisi", "tunaona", "hatuoni"]
          ]
        }
      },
      {
        id: "a2-tense",
        level: "A2",
        title: "Tense with -na-, -li-, and -ta-",
        lead: "The tense marker sits between the subject prefix and the stem.",
        notes: [
          "-na- is the present used on these cards, as in ninaona.",
          "-li- is the past, niliona, and -ta- is the future, nitaona.",
          "The stem ona stays put for all three of these tenses."
        ],
        examples: [
          ["Niliona jua.", "I saw the sun."],
          ["Nitaona jua.", "I will see the sun."]
        ],
        table: {
          caption: "ona across three tenses",
          heads: ["", "-na-", "-li-", "-ta-"],
          rows: [
            ["mimi", "ninaona", "niliona", "nitaona"],
            ["wewe", "unaona", "uliona", "utaona"],
            ["yeye", "anaona", "aliona", "ataona"]
          ]
        }
      },
      {
        id: "b1-object",
        level: "B1",
        title: "The object infix",
        lead: "An object marker can sit between the tense marker and the stem.",
        notes: [
          "Class 1, a person, uses -m- or -mw- before a vowel, as in ninamwona.",
          "A ki- thing uses -ki-, and a class 9 thing uses -i-.",
          "The verb holds only one object marker, so the other object stays as a full noun."
        ],
        examples: [
          ["Ninamwona mtoto.", "I see the child."],
          ["Ninakiona kitabu.", "I see the book."]
        ]
      },
      {
        id: "b1-relative",
        level: "B1",
        title: "The relative",
        lead: "The relative marker agrees with the noun and can sit inside the verb.",
        notes: [
          "A person who is doing something is built a-na-ye- plus the stem, as in anayesoma.",
          "A ki- thing uses -cho-, so kinachoanguka is a thing which is falling.",
          "The same job can be done with amba- and a class ending, as in mtu ambaye anasoma."
        ],
        examples: [
          ["Mtoto anayelala yuko kitandani.", "The child who is sleeping is on the bed."],
          ["Kitabu ninachosoma kiko mezani.", "The book which I am reading is on the table."]
        ]
      },
      {
        id: "b2-kuwa",
        level: "B2",
        title: "Kuwa and the locative -ko",
        lead: "Kuwa does not make a normal present, and place uses -ko.",
        notes: [
          "Identity in the present is the copula ni, and its negative is si, not ninawa.",
          "Place uses niko, uko, and yuko, and the negatives are siko, huko, and hayuko.",
          "The past looks more regular, nilikuwa, but you still have to learn the present as its own set."
        ],
        examples: [
          ["Mimi niko hapa.", "I am here."],
          ["Mimi si mwalimu.", "I am not a teacher."]
        ],
        table: {
          caption: "Be in a place, and the past of kuwa",
          heads: ["", "place", "not there", "past"],
          rows: [
            ["mimi", "niko", "siko", "nilikuwa"],
            ["wewe", "uko", "huko", "ulikuwa"],
            ["yeye", "yuko", "hayuko", "alikuwa"],
            ["sisi", "tuko", "hatuko", "tulikuwa"]
          ]
        }
      },
      {
        id: "b2-enda",
        level: "B2",
        title: "Kwenda changes shape",
        lead: "Enda does not stay in one shape from the infinitive to the negative.",
        notes: [
          "The infinitive is kwenda, because ku- plus the vowel of enda is written kw-.",
          "The present is often the short form naenda, and the full ninaenda is the same tense.",
          "The negative present changes the final vowel, so the forms to store are siendi, huendi, and haendi."
        ],
        examples: [
          ["Naenda shuleni.", "I am going to school."],
          ["Siendi shuleni.", "I am not going to school."]
        ]
      }
    ],
    cards: [
      {
        word: "mtu",
        gloss: "person",
        tag: "noun",
        forms: [
          ["plural", "watu"],
          ["verb, one", "a-"],
          ["verb, many", "wa-"]
        ]
      },
      {
        word: "kitu",
        gloss: "thing",
        tag: "noun",
        forms: [
          ["plural", "vitu"],
          ["verb, one", "ki-"],
          ["verb, many", "vi-"]
        ]
      },
      {
        word: "kitabu",
        gloss: "book",
        tag: "noun",
        forms: [
          ["plural", "vitabu"],
          ["class", "ki- / vi-"],
          ["on the table", "kiko"]
        ]
      },
      {
        word: "chakula",
        gloss: "food",
        tag: "noun",
        forms: [
          ["plural", "vyakula"],
          ["singular place", "kiko"],
          ["verb, many", "vi-"]
        ]
      },
      {
        word: "nyumba",
        gloss: "house",
        tag: "noun",
        forms: [
          ["plural noun", "nyumba"],
          ["verb, one", "i-"],
          ["verb, many", "zi-"]
        ]
      },
      {
        word: "ona",
        gloss: "see",
        tag: "verb",
        forms: [
          ["I, present", "ninaona"],
          ["I, past", "niliona"],
          ["I, future", "nitaona"],
          ["I, negative", "sioni"]
        ]
      },
      {
        word: "enda",
        gloss: "go",
        tag: "verb",
        forms: [
          ["infinitive", "kwenda"],
          ["I, present", "naenda"],
          ["I, negative", "siendi"],
          ["I, past", "nilienda"],
          ["imperative", "nenda"]
        ]
      },
      {
        word: "ja",
        gloss: "come",
        tag: "verb",
        forms: [
          ["infinitive", "kuja"],
          ["I, present", "ninakuja"],
          ["I, negative", "siji"],
          ["I, past", "nilikuja"],
          ["imperative", "njoo"]
        ]
      },
      {
        word: "kula",
        gloss: "eat",
        tag: "verb",
        forms: [
          ["I, present", "ninakula"],
          ["I, negative", "sili"],
          ["I, past", "nilikula"],
          ["I, future", "nitakula"]
        ]
      },
      {
        word: "kuwa",
        gloss: "be",
        tag: "verb",
        forms: [
          ["identity", "ni"],
          ["not identity", "si"],
          ["I, place", "niko"],
          ["I, not there", "siko"],
          ["I, past", "nilikuwa"]
        ]
      },
      {
        word: "mimi",
        gloss: "I",
        tag: "pronoun",
        forms: [
          ["you", "wewe"],
          ["he or she", "yeye"],
          ["we", "sisi"],
          ["you plural", "ninyi"]
        ]
      }
    ]
  },
  ln: {
    intro: "Kinshasa Lingala writes the tone on the word, puts a class prefix on the noun, and puts a subject prefix on the verb.",
    lessons: [
      {
        id: "a1-prefix",
        level: "A1",
        title: "A class prefix on the noun",
        lead: "The class prefix is part of the noun, and Kinshasa still keeps it.",
        notes: [
          "Mobáli is a man, and the mo- is not an article you can drop.",
          "A person plural takes ba-, so the pair to learn is mobáli and babáli.",
          "Ndáko is a house from another class, and it does not take mo-."
        ],
        examples: [
          ["Mobáli azalí áwa.", "The man is here."],
          ["Babáli bazalí áwa.", "The men are here."]
        ],
        table: {
          caption: "Person nouns in Kinshasa Lingala",
          heads: ["meaning", "singular", "plural"],
          rows: [
            ["man", "mobáli", "babáli"],
            ["woman", "mwǎsí", "bǎsí"],
            ["child", "mwǎna", "bǎna"]
          ]
        }
      },
      {
        id: "a1-subject",
        level: "A1",
        title: "A subject prefix on the verb",
        lead: "The verb starts with a subject prefix, and that prefix is not the noun prefix.",
        notes: [
          "Na- is I, o- is you, and a- is he or she when the subject is a person.",
          "An inanimate singular on these cards takes e-, which is why ndáko ezalí.",
          "To- is we, and the infinitive ko- drops once a subject prefix is present."
        ],
        examples: [
          ["Ngáí nazalí áwa.", "I am here."],
          ["Ndáko ezalí mokɛ́.", "The house is small."]
        ],
        table: {
          caption: "kozala in the present",
          heads: ["", "prefix", "form"],
          rows: [
            ["ngáí", "na-", "nazalí"],
            ["yo", "o-", "ozalí"],
            ["ye", "a-", "azalí"],
            ["bíso", "to-", "tozalí"]
          ]
        }
      },
      {
        id: "a1-tone",
        level: "A1",
        title: "Tone is part of the word",
        lead: "The accent marks tone, and these lessons do not drop it.",
        notes: [
          "Write ndáko and mwǎsí with the marks you see, because the accent belongs to the spelling.",
          "Mokɛ́ and monɛ́nɛ are the same kind of fact, not decoration after the word.",
          "A missing accent is not a harmless shortcut in this course."
        ],
        examples: [
          ["Ndáko ezalí monɛ́nɛ.", "The house is big."],
          ["Mwǎna alálí.", "The child is sleeping."]
        ]
      },
      {
        id: "a2-present",
        level: "A2",
        title: "A Kinshasa present",
        lead: "The present on these cards is a subject prefix plus a stem, not a Swahili tense vowel.",
        notes: [
          "Namɔ́ni means I see, and tolíí means we eat.",
          "An action in progress can also be nazalí plus the infinitive, as in nazalí kolíya.",
          "Ko- marks the infinitive and does not stay in the finite form."
        ],
        examples: [
          ["Namɔ́ni mɔ́i.", "I see the sun."],
          ["Nazalí kolíya límpa.", "I am eating bread."]
        ]
      },
      {
        id: "a2-past",
        level: "A2",
        title: "A past",
        lead: "Come and go use short past stems, and a regular verb can take -ákí.",
        notes: [
          "Oyáí is you came, from koyá, and akei is he or she went, from kokende.",
          "The subject prefix is still the first piece, so the persons of go are nakei, okei, and akei.",
          "Nalobákí, I spoke, shows the longer past ending -ákí on a regular stem."
        ],
        examples: [
          ["Oyáí na ndáko.", "You came to the house."],
          ["Mwǎna akei na etéyelo.", "The child went to school."]
        ],
        table: {
          caption: "Short pasts of come and go",
          heads: ["", "come", "go"],
          rows: [
            ["I", "nayáí", "nakei"],
            ["you", "oyáí", "okei"],
            ["he or she", "ayáí", "akei"]
          ]
        }
      },
      {
        id: "a2-object",
        level: "A2",
        title: "Object marking",
        lead: "Kinshasa puts the object pronoun after the verb.",
        notes: [
          "Yo is you, ye is him or her, and ngáí is me when it is the object.",
          "Napésí yo fungóla means I gave you the key, with yo after the verb.",
          "Do not push a Swahili object infix into this verb."
        ],
        examples: [
          ["Napésí yo fungóla.", "I gave you the key."],
          ["Namɔ́ni ye.", "I see him or her."]
        ]
      },
      {
        id: "b1-negation",
        level: "B1",
        title: "Negation with tɛ́",
        lead: "Kinshasa negation is the word tɛ́ after the verb.",
        notes: [
          "Nazalí tɛ́ means I am not, and the accent on tɛ́ stays.",
          "Tɛ́ comes at the end of the clause, not as a prefix on the subject.",
          "The noun keeps its class prefix when the sentence is negative."
        ],
        examples: [
          ["Nazalí áwa tɛ́.", "I am not here."],
          ["Azalí moníngá na ngáí tɛ́.", "He or she is not my friend."]
        ]
      },
      {
        id: "b1-place",
        level: "B1",
        title: "A locative",
        lead: "Place is the preposition na, or áwa for here.",
        notes: [
          "Na ndáko means at the house or to the house.",
          "Áwa means here, as in nazalí áwa.",
          "There is no case ending on the noun to memorize."
        ],
        examples: [
          ["Nazalí na ndáko.", "I am at the house."],
          ["Oyáí na ndáko.", "You came to the house."]
        ]
      },
      {
        id: "b2-relative",
        level: "B2",
        title: "The relative óyo",
        lead: "Óyo connects a noun to the clause that describes it.",
        notes: [
          "Mobáli óyo atámboli is the man who is walking.",
          "The verb inside that clause still needs its own subject prefix.",
          "Óyo keeps its accent, and it is also the word for this."
        ],
        examples: [
          ["Mobáli óyo atámboli azalí moníngá na ngáí.", "The man who is walking is my friend."],
          ["Ndáko óyo ezalí mokɛ́.", "The house that is small."]
        ]
      },
      {
        id: "b2-not-swahili",
        level: "B2",
        title: "Not Swahili",
        lead: "Lingala and Swahili are both Bantu, and these words are not substitutes.",
        notes: [
          "Where Swahili says mtu and ninaona, Kinshasa Lingala says mobáli and namɔ́ni.",
          "Swahili negation is a subject prefix, while this Lingala puts tɛ́ after the verb.",
          "The infinitive prefix here is ko-, not ku-, and the tone marks stay on the word."
        ],
        examples: [
          ["Ngáí nazalí áwa.", "I am here."],
          ["Namɔ́ni mɔ́i.", "I see the sun."]
        ],
        table: {
          caption: "One contrast, not a shared vocabulary",
          heads: ["job", "Swahili", "Lingala"],
          rows: [
            ["person", "mtu", "mobáli"],
            ["I see", "ninaona", "namɔ́ni"],
            ["I am here", "niko hapa", "nazalí áwa"],
            ["I do not see", "sioni", "namɔ́ni tɛ́"]
          ]
        }
      }
    ],
    cards: [
      {
        word: "mobáli",
        gloss: "man",
        tag: "noun",
        forms: [
          ["plural", "babáli"],
          ["prefix", "mo- / ba-"],
          ["verb", "a-"]
        ]
      },
      {
        word: "mwǎsí",
        gloss: "woman",
        tag: "noun",
        forms: [
          ["plural", "bǎsí"],
          ["prefix", "mo- / ba-"],
          ["here", "Mwǎsí azalí áwa"]
        ]
      },
      {
        word: "ndáko",
        gloss: "house",
        tag: "noun",
        forms: [
          ["plural", "bandáko"],
          ["verb, one", "e-"],
          ["small", "ezalí mokɛ́"]
        ]
      },
      {
        word: "zalí",
        gloss: "be",
        tag: "verb",
        forms: [
          ["I", "nazalí"],
          ["you", "ozalí"],
          ["he or she", "azalí"],
          ["we", "tozalí"],
          ["I am not", "nazalí tɛ́"]
        ]
      },
      {
        word: "mɔ́nɔ",
        gloss: "see",
        tag: "verb",
        forms: [
          ["infinitive", "komɔ́nɔ"],
          ["I see", "namɔ́ni"],
          ["I do not see", "namɔ́ni tɛ́"]
        ]
      },
      {
        word: "líya",
        gloss: "eat",
        tag: "verb",
        forms: [
          ["infinitive", "kolíya"],
          ["we eat", "tolíí"],
          ["I am eating", "nazalí kolíya"]
        ]
      },
      {
        word: "yá",
        gloss: "come",
        tag: "verb",
        forms: [
          ["infinitive", "koyá"],
          ["you came", "oyáí"],
          ["he or she came", "ayáí"]
        ]
      },
      {
        word: "kende",
        gloss: "go",
        tag: "verb",
        forms: [
          ["infinitive", "kokende"],
          ["he or she went", "akei"],
          ["I went", "nakei"]
        ]
      },
      {
        word: "tɛ́",
        gloss: "not",
        tag: "particle",
        forms: [
          ["place", "after the verb"],
          ["I am not", "nazalí tɛ́"],
          ["not here", "nazalí áwa tɛ́"]
        ]
      },
      {
        word: "ngáí",
        gloss: "I",
        tag: "pronoun",
        forms: [
          ["you", "yo"],
          ["he or she", "ye"],
          ["we", "bíso"],
          ["object you", "yo"]
        ]
      }
    ]
  },
  ig: {
    intro: "Standard Igbo treats the underdot and the tone as part of the word, and it does not conjugate a verb for gender.",
    lessons: [
      {
        id: "a1-dots",
        level: "A1",
        title: "Dots and tone are letters",
        lead: "An underdot changes the vowel, and a tone can change the word.",
        notes: [
          "Ụ in ụlọ and ọ in ọkụ are not the same vowels as u and o.",
          "Ị, the pronoun for you, also needs the dot, and stripping it writes a different vowel.",
          "Tone is not written on every sentence in this deck, but when two meanings share letters the marks belong to the spelling."
        ],
        examples: [
          ["Ụlọ dị obere.", "The house is small."],
          ["Ọkụ na-ekpo ọkụ.", "The fire is hot."]
        ]
      },
      {
        id: "a1-gender",
        level: "A1",
        title: "No grammatical gender",
        lead: "Ọ is he, she, or it, and the verb does not agree for sex.",
        notes: [
          "Nwoke and nwanyị are vocabulary for man and woman, not a gender the verb must copy.",
          "The same nọ and the same bụ work for a man and for a woman.",
          "Do not add a masculine or feminine ending to the verb."
        ],
        examples: [
          ["Ọ nọ ebe a.", "He or she is here."],
          ["Nwanyị nọ ebe a.", "The woman is here."]
        ]
      },
      {
        id: "a1-verb",
        level: "A1",
        title: "A simple verb phrase",
        lead: "A pronoun plus na- plus the verb is an action in progress.",
        notes: [
          "M na-ahụ anyanwụ means I see the sun, and the verb stem does not change for person.",
          "Na- is the mark of the ongoing action, not a past ending.",
          "There is no separate article in front of ụlọ or anyanwụ."
        ],
        examples: [
          ["M na-ahụ anyanwụ.", "I see the sun."],
          ["Anyị na-eri achịcha.", "We are eating bread."]
        ]
      },
      {
        id: "a2-pronouns",
        level: "A2",
        title: "Pronouns m, ị, and ọ",
        lead: "Person sits on the pronoun, and the verb stem stays.",
        notes: [
          "M is I, ị is you, and ọ is he, she, or it.",
          "Anyị is we, and it uses the same verb as m.",
          "The dot on ị and ọ is required, because it is the vowel."
        ],
        examples: [
          ["M nọ ebe a.", "I am here."],
          ["Ị bụ enyi m.", "You are my friend."]
        ],
        table: {
          caption: "The pronoun changes and the verb does not",
          heads: ["", "pronoun", "be here"],
          rows: [
            ["I", "m", "M nọ ebe a"],
            ["you", "ị", "Ị nọ ebe a"],
            ["he or she", "ọ", "Ọ nọ ebe a"],
            ["we", "anyị", "Anyị nọ ebe a"]
          ]
        }
      },
      {
        id: "a2-aspect",
        level: "A2",
        title: "Aspect, not a Latin past",
        lead: "Time is a particle or a verb suffix, and it does not change for person.",
        notes: [
          "Na- before the verb is the action going on now.",
          "A completed action often adds an -rV ending, as in hụrụ and bịara, and m, ị, and ọ share that ending.",
          "Do not look for a different past suffix for she."
        ],
        examples: [
          ["M hụrụ anyanwụ.", "I saw the sun."],
          ["Ọ bịara.", "He or she came."]
        ],
        table: {
          caption: "hụ, see, ongoing and completed",
          heads: ["", "ongoing", "completed"],
          rows: [
            ["m", "na-ahụ", "hụrụ"],
            ["ị", "na-ahụ", "hụrụ"],
            ["ọ", "na-ahụ", "hụrụ"]
          ]
        }
      },
      {
        id: "a2-negation",
        level: "A2",
        title: "Negation",
        lead: "The negative is an ending or a helper, not a new person stem.",
        notes: [
          "A completed negative often ends in -ghị, as in ọ bịaghị, he or she did not come.",
          "Anaghị m eri nri means I do not eat food.",
          "Abụghị m is I am not, from bụ, and it is not a pronoun ending."
        ],
        examples: [
          ["Ọ bịaghị.", "He or she did not come."],
          ["Anaghị m eri nri.", "I do not eat food."]
        ],
        table: {
          caption: "Three negatives to store",
          heads: ["job", "form"],
          rows: [
            ["I am not", "abụghị m"],
            ["he or she did not come", "ọ bịaghị"],
            ["I do not eat", "anaghị m eri"]
          ]
        }
      },
      {
        id: "b1-question",
        level: "B1",
        title: "A question",
        lead: "A yes-no question can keep the statement words, and a content question uses a question word.",
        notes: [
          "Ị nọ ebe a, with question tone, asks whether you are here.",
          "Gịnị means what, and gịnị ka ị na-eme asks what you are doing.",
          "The verb still does not take a person ending inside the question."
        ],
        examples: [
          ["Ị nọ ebe a?", "Are you here?"],
          ["Gịnị ka ị na-eme?", "What are you doing?"]
        ]
      },
      {
        id: "b1-serial",
        level: "B1",
        title: "Verbs in a series",
        lead: "Two verbs can share one subject and tell one event.",
        notes: [
          "Bịa rie nri means come and eat, with both verbs in the same command.",
          "Were mmiri bịa means bring water, literally take water and come.",
          "Neither verb grows a European person ending just because another verb is beside it."
        ],
        examples: [
          ["Bịa rie nri.", "Come and eat food."],
          ["Were mmiri bịa.", "Bring water."]
        ]
      },
      {
        id: "b2-tone-pair",
        level: "B2",
        title: "A tone pair",
        lead: "Akwa is four words if you write the tones, and only one shape if you erase them.",
        notes: [
          "Ákwà, high then low, is cloth.",
          "Àkwá, low then high, is egg, and àkwà, low then low, is bed.",
          "Ákwá, high then high, is a cry, so the tone marks are the difference you must keep."
        ],
        examples: [
          ["Ákwà dị n'elu tebulu.", "The cloth is on the table."],
          ["Àkwá dị n'elu tebulu.", "The egg is on the table."]
        ],
        table: {
          caption: "Same letters, different tones",
          heads: ["word", "tones", "meaning"],
          rows: [
            ["ákwá", "high high", "cry"],
            ["ákwà", "high low", "cloth"],
            ["àkwá", "low high", "egg"],
            ["àkwà", "low low", "bed"]
          ]
        }
      },
      {
        id: "b2-relative",
        level: "B2",
        title: "A relative clause",
        lead: "A relative can be onye for a person, or the noun plus the clause, without a European relative pronoun.",
        notes: [
          "Onye na-abịa is the person who is coming.",
          "Akwụkwọ m hụrụ is the book that I saw, with m as the subject inside the clause.",
          "The verb in that clause still uses aspect, na- or the -rV ending, not a special relative conjugation for person."
        ],
        examples: [
          ["Onye na-abịa bụ enyi m.", "The person who is coming is my friend."],
          ["Akwụkwọ m hụrụ dị ọhụrụ.", "The book that I saw is new."]
        ]
      }
    ],
    cards: [
      {
        word: "ụlọ",
        gloss: "house",
        tag: "noun",
        forms: [
          ["dot", "ụ not u"],
          ["small", "dị obere"],
          ["to the house", "n'ụlọ"]
        ]
      },
      {
        word: "ọkụ",
        gloss: "fire",
        tag: "noun",
        forms: [
          ["dot", "ọ not o"],
          ["hot", "na-ekpo ọkụ"]
        ]
      },
      {
        word: "m",
        gloss: "I",
        tag: "pronoun",
        forms: [
          ["you", "ị"],
          ["he or she", "ọ"],
          ["we", "anyị"],
          ["I am here", "M nọ ebe a"]
        ]
      },
      {
        word: "ákwà",
        gloss: "cloth",
        tag: "noun",
        forms: [
          ["tones", "high low"],
          ["not egg", "àkwá"],
          ["not bed", "àkwà"]
        ]
      },
      {
        word: "àkwá",
        gloss: "egg",
        tag: "noun",
        forms: [
          ["tones", "low high"],
          ["not cloth", "ákwà"],
          ["not a cry", "ákwá"]
        ]
      },
      {
        word: "àkwà",
        gloss: "bed",
        tag: "noun",
        forms: [
          ["tones", "low low"],
          ["child on it", "Nwa nọ n'àkwà"]
        ]
      },
      {
        word: "bụ",
        gloss: "be, identity",
        tag: "verb",
        forms: [
          ["you are", "Ị bụ"],
          ["I am not", "abụghị m"],
          ["friend", "Ị bụ enyi m"]
        ]
      },
      {
        word: "nọ",
        gloss: "be in a place",
        tag: "verb",
        forms: [
          ["I am here", "M nọ ebe a"],
          ["you are here", "Ị nọ ebe a"],
          ["she is here", "Ọ nọ ebe a"]
        ]
      },
      {
        word: "bịa",
        gloss: "come",
        tag: "verb",
        forms: [
          ["ongoing", "na-abịa"],
          ["completed", "bịara"],
          ["did not come", "bịaghị"]
        ]
      },
      {
        word: "hụ",
        gloss: "see",
        tag: "verb",
        forms: [
          ["ongoing", "na-ahụ"],
          ["I saw", "M hụrụ"],
          ["you saw", "Ị hụrụ"]
        ]
      }
    ]
  },
  yo: {
    intro: "Yoruba keeps tones and underdots in the spelling, and it marks time with particles instead of a Latin conjugation.",
    lessons: [
      {
        id: "a1-letters",
        level: "A1",
        title: "Tones and dots are letters",
        lead: "A tone mark or an underdot changes the word, so these lessons do not strip them.",
        notes: [
          "Ọ in ọkùnrin and ẹ in ẹja are different vowels from o and e.",
          "High tone is an acute mark, low tone is a grave mark, and a vowel with no mark is mid.",
          "Ṣ is its own consonant, so do not rewrite a dotted letter as a plain Latin one."
        ],
        examples: [
          ["Ọkùnrin ń rìn.", "The man is walking."],
          ["Ẹja wà nínú omi.", "The fish is in the water."]
        ]
      },
      {
        id: "a1-gender",
        level: "A1",
        title: "No grammatical gender",
        lead: "Ó is he, she, or it, and the verb does not agree for sex.",
        notes: [
          "Ọkùnrin and obìnrin name a man and a woman, and that is vocabulary, not agreement.",
          "The same wà and the same ń serve for both.",
          "Do not add an ending to the verb for she."
        ],
        examples: [
          ["Ó wà níbí.", "He or she is here."],
          ["Obìnrin wà níbí.", "The woman is here."]
        ]
      },
      {
        id: "a1-aspect",
        level: "A1",
        title: "Ń, ti, and yóò",
        lead: "Time is a particle in front of a verb that does not conjugate.",
        notes: [
          "Ń marks an action in progress, as in mo ń mu omi.",
          "Ti marks an action already done, as in mo ti rí, and yóò marks a later one, as in mo yóò wá.",
          "The verb stem itself stays the same for I, you, and he or she."
        ],
        examples: [
          ["Mo ń mu omi.", "I am drinking water."],
          ["Mo yóò wá sílé.", "I will come home."]
        ],
        table: {
          caption: "Particles in front of the verb",
          heads: ["mark", "example", "job"],
          rows: [
            ["ń", "ó ń rìn", "in progress"],
            ["ti", "mo ti rí", "already"],
            ["yóò", "mo yóò wá", "later"],
            ["plain", "mo rí", "the action"]
          ]
        }
      },
      {
        id: "a2-pronouns",
        level: "A2",
        title: "Pronouns mo, o, and ó",
        lead: "The short subject pronouns carry the person, and o and ó are not the same word.",
        notes: [
          "Mo is I, o with mid tone is you, and ó with high tone is he, she, or it.",
          "A is we, and the verb after any of these pronouns stays unconjugated.",
          "The long form ìwọ is you when the pronoun stands as a noun, not the short o in front of the verb."
        ],
        examples: [
          ["Mo wà níbí.", "I am here."],
          ["Ó wà níbí.", "He or she is here."]
        ],
        table: {
          caption: "Short subject pronouns",
          heads: ["person", "form", "watch"],
          rows: [
            ["I", "mo", "mo wà"],
            ["you", "o", "mid tone"],
            ["he or she", "ó", "high tone"],
            ["we", "a", "a ń jẹ"]
          ]
        }
      },
      {
        id: "a2-negation",
        level: "A2",
        title: "Negation with kò",
        lead: "Kò is the general no, and kì í is the habitual no.",
        notes: [
          "Kò sits before the verb, as in kò rí, he or she does not see.",
          "Mo plus kò is usually written mi ò.",
          "Kì í negates a habit, so ó kì í sùn means he or she does not sleep as a habit."
        ],
        examples: [
          ["Kò rí òòrùn.", "He or she does not see the sun."],
          ["Ó kì í sùn.", "He or she does not sleep."]
        ],
        table: {
          caption: "Two negatives",
          heads: ["mark", "example", "job"],
          rows: [
            ["kò", "kò rí", "general no"],
            ["mi ò", "mi ò lọ", "I do not go"],
            ["kì í", "kì í sùn", "not a habit"]
          ]
        }
      },
      {
        id: "a2-question",
        level: "A2",
        title: "A question",
        lead: "Ṣé marks a yes-no question, and kí ni asks what.",
        notes: [
          "Ṣé o wà níbí asks if you are here, and the ṣ is not a plain s.",
          "Kí ni orúkọ rẹ asks what your name is.",
          "The verb after the question word still does not take a person ending."
        ],
        examples: [
          ["Ṣé o wà níbí?", "Are you here?"],
          ["Kí ni orúkọ rẹ?", "What is your name?"]
        ]
      },
      {
        id: "b1-serial",
        level: "B1",
        title: "Serial verbs",
        lead: "One event can be two verbs with the same subject.",
        notes: [
          "Ó ra búréèdì fún mi means he or she bought bread for me, with ra and fún in a series.",
          "Mo mú omi wá means I brought water, literally I took water and came.",
          "Neither verb changes its ending for person."
        ],
        examples: [
          ["Ó ra búréèdì fún mi.", "He or she bought bread for me."],
          ["Mo mú omi wá.", "I brought water."]
        ]
      },
      {
        id: "b1-relative",
        level: "B1",
        title: "The relative tí",
        lead: "Tí, with high tone, introduces a relative clause.",
        notes: [
          "Ọkùnrin tí ó ń rìn is the man who is walking.",
          "Do not confuse tí with the perfect particle ti, which has no high-tone mark.",
          "The verb inside the relative still uses ń, ti, or yóò in the ordinary way."
        ],
        examples: [
          ["Ọkùnrin tí ó ń rìn ni ọ̀rẹ́ mi.", "The man who is walking is my friend."],
          ["Ìwé tí mo rà wà níbí.", "The book that I bought is here."]
        ]
      },
      {
        id: "b2-tone-pair",
        level: "B2",
        title: "A pair split only by tone",
        lead: "Ìgbà and igbá use the same letters, and only the tones tell them apart.",
        notes: [
          "Ìgbà, low then low, means time.",
          "Igbá, mid then high, means calabash.",
          "Igba with no marks is mid then mid and means two hundred, so an undotted spelling is not safe."
        ],
        examples: [
          ["Ìgbà yìí dára.", "This time is good."],
          ["Igbá wà lórí tábìlì.", "The calabash is on the table."]
        ],
        table: {
          caption: "igba is not one word",
          heads: ["word", "tones", "meaning"],
          rows: [
            ["ìgbà", "low low", "time"],
            ["igbá", "mid high", "calabash"],
            ["igba", "mid mid", "two hundred"]
          ]
        }
      },
      {
        id: "b2-genitive",
        level: "B2",
        title: "Genitive",
        lead: "Possession is noun plus noun, or the particle ti when you need belonging.",
        notes: [
          "Ilé ọkùnrin is the man's house, with the possessor after the thing possessed.",
          "A pronoun possessor does the same job after the noun, as in orúkọ mi, my name.",
          "Ti marks belonging when you say whose it is, as in èyí ti èmi ni, this is mine."
        ],
        examples: [
          ["Ilé ọkùnrin kéré.", "The man's house is small."],
          ["Èyí ti èmi ni.", "This is mine."]
        ],
        table: {
          caption: "Two ways to show whose",
          heads: ["pattern", "example", "gloss"],
          rows: [
            ["noun noun", "ilé ọkùnrin", "the man's house"],
            ["noun pronoun", "orúkọ mi", "my name"],
            ["ti", "ti èmi", "mine"]
          ]
        }
      }
    ],
    cards: [
      {
        word: "ọkùnrin",
        gloss: "man",
        tag: "noun",
        forms: [
          ["dot", "ọ not o"],
          ["walking", "ń rìn"],
          ["no gender on verb", "ó"]
        ]
      },
      {
        word: "obìnrin",
        gloss: "woman",
        tag: "noun",
        forms: [
          ["here", "wà níbí"],
          ["example", "Obìnrin wà níbí"]
        ]
      },
      {
        word: "mo",
        gloss: "I",
        tag: "pronoun",
        forms: [
          ["you", "o"],
          ["he or she", "ó"],
          ["we", "a"],
          ["long you", "ìwọ"]
        ]
      },
      {
        word: "kò",
        gloss: "not",
        tag: "particle",
        forms: [
          ["general", "kò rí"],
          ["I do not", "mi ò"],
          ["not a habit", "kì í"]
        ]
      },
      {
        word: "ń",
        gloss: "in progress",
        tag: "particle",
        forms: [
          ["example", "mo ń mu omi"],
          ["he walks", "ó ń rìn"]
        ]
      },
      {
        word: "yóò",
        gloss: "will",
        tag: "particle",
        forms: [
          ["I will come", "mo yóò wá"],
          ["place", "before the verb"]
        ]
      },
      {
        word: "ìgbà",
        gloss: "time",
        tag: "noun",
        forms: [
          ["tones", "low low"],
          ["not calabash", "igbá"],
          ["not 200", "igba"]
        ]
      },
      {
        word: "igbá",
        gloss: "calabash",
        tag: "noun",
        forms: [
          ["tones", "mid high"],
          ["not time", "ìgbà"]
        ]
      },
      {
        word: "wà",
        gloss: "be in a place",
        tag: "verb",
        forms: [
          ["I am here", "mo wà níbí"],
          ["he or she is here", "ó wà níbí"]
        ]
      },
      {
        word: "rí",
        gloss: "see",
        tag: "verb",
        forms: [
          ["I see", "mo rí"],
          ["already", "mo ti rí"],
          ["not", "kò rí"]
        ]
      },
      {
        word: "tí",
        gloss: "that, who",
        tag: "particle",
        forms: [
          ["tone", "high"],
          ["not the perfect", "ti"],
          ["example", "tí ó ń rìn"]
        ]
      }
    ]
  },
  ha: {
    intro: "Hausa in Boko, the Latin spelling of school, has masculine and feminine gender and plurals that are learned as pairs.",
    lessons: [
      {
        id: "a1-gender",
        level: "A1",
        title: "Masculine and feminine",
        lead: "Nouns are masculine or feminine, and the verb pronoun agrees.",
        notes: [
          "Namiji is a man and takes yana, while mace is a woman and takes tana.",
          "Kai is you masculine and ke is you feminine.",
          "There is no article, so the gender has to be learned with the noun itself."
        ],
        examples: [
          ["Namiji yana tafiya.", "The man is walking."],
          ["Mace tana nan.", "The woman is here."]
        ]
      },
      {
        id: "a1-nece",
        level: "A1",
        title: "Ne and ce",
        lead: "The copula ne or ce agrees with the gender of the noun.",
        notes: [
          "A masculine noun takes ne, as in namiji ne and littafi sabo ne.",
          "A feminine noun takes ce, as in mace ce and tuffa ja ce.",
          "Do not put ne after a feminine noun."
        ],
        examples: [
          ["Kai abokina ne.", "You are my friend."],
          ["Tuffa ja ce.", "The apple is red."]
        ],
        table: {
          caption: "Ne and ce",
          heads: ["noun", "gender", "copula"],
          rows: [
            ["namiji", "masculine", "ne"],
            ["littafi", "masculine", "ne"],
            ["mace", "feminine", "ce"],
            ["tuffa", "feminine", "ce"]
          ]
        }
      },
      {
        id: "a1-present",
        level: "A1",
        title: "A present",
        lead: "The incomplete pronoun already means I am, you are, or she is.",
        notes: [
          "Ina, kana, yana, and tana come before the verbal noun.",
          "Ina ganin rana means I see the sun, and muna cin burodi means we are eating bread.",
          "This series is not the completed past, which uses na, ka, ya, and ta."
        ],
        examples: [
          ["Ina ganin rana.", "I see the sun."],
          ["Muna cin burodi.", "We are eating bread."]
        ],
        table: {
          caption: "Incomplete pronouns",
          heads: ["person", "form", "example"],
          rows: [
            ["I", "ina", "ina nan"],
            ["you, masculine", "kana", "kana zuwa"],
            ["he", "yana", "yana tafiya"],
            ["she", "tana", "tana nan"]
          ]
        }
      },
      {
        id: "a2-plural",
        level: "A2",
        title: "An unpredictable plural",
        lead: "The plural is a second word you memorize, not one ending added by a rule.",
        notes: [
          "Mutum becomes mutane, gida becomes gidaje, and mace becomes mata.",
          "Yaro becomes yara, and littafi becomes littattafai.",
          "A plural you have not learned is a guess, so the pair belongs on the card."
        ],
        examples: [
          ["Mutane suna nan.", "The people are here."],
          ["Gidaje suna nan.", "The houses are here."]
        ],
        table: {
          caption: "Plurals to learn as pairs",
          heads: ["singular", "plural", "meaning"],
          rows: [
            ["mutum", "mutane", "person"],
            ["gida", "gidaje", "house"],
            ["mace", "mata", "woman"],
            ["yaro", "yara", "boy"],
            ["littafi", "littattafai", "book"]
          ]
        }
      },
      {
        id: "a2-past",
        level: "A2",
        title: "The past",
        lead: "The completed pronouns na, ka, ya, and ta mark a finished event.",
        notes: [
          "Na zo means I came, and ya ci abinci means he ate food.",
          "Ta is she in this series, just as tana is she in the incomplete series.",
          "The verb after na or ya is the short stem, not the verbal noun used after ina."
        ],
        examples: [
          ["Na zo gida.", "I came home."],
          ["Ya ci abinci.", "He ate food."]
        ],
        table: {
          caption: "Completed pronouns",
          heads: ["person", "form", "example"],
          rows: [
            ["I", "na", "na zo"],
            ["you, masculine", "ka", "ka zo"],
            ["he", "ya", "ya zo"],
            ["she", "ta", "ta zo"]
          ]
        }
      },
      {
        id: "a2-object",
        level: "A2",
        title: "Object pronouns",
        lead: "The object pronoun is a short word after the verb.",
        notes: [
          "Ni is me, ka is you masculine, shi is him, and ta is her.",
          "Na ga shi means I saw him, and ina ganin ka means I see you.",
          "Before an object, gani shortens to ga in the completed form and to ganin after ina."
        ],
        examples: [
          ["Na ga shi.", "I saw him."],
          ["Ina ganin ka.", "I see you."]
        ],
        table: {
          caption: "Object pronouns",
          heads: ["person", "form"],
          rows: [
            ["me", "ni"],
            ["you, masculine", "ka"],
            ["him", "shi"],
            ["her", "ta"]
          ]
        }
      },
      {
        id: "b1-relative",
        level: "B1",
        title: "The relative",
        lead: "Da after the linked noun introduces who or which.",
        notes: [
          "A masculine noun takes the linker -n before da, so mutumin da ya zo is the man who came.",
          "Littafin da na sayi is the book that I bought, with the same linker because littafi is masculine.",
          "The verb inside the relative uses the completed or incomplete pronoun in the ordinary way."
        ],
        examples: [
          ["Mutumin da ya zo yana nan.", "The man who came is here."],
          ["Littafin da na sayi yana kan tebur.", "The book that I bought is on the table."]
        ]
      },
      {
        id: "b1-grade",
        level: "B1",
        title: "Grade 1 and a changed grade",
        lead: "A grade changes the ending and the meaning, and it is not a tense.",
        notes: [
          "Grade 1 is a basic verb ending in -a, such as karanta, read.",
          "Grade 5 ends in -ar and often sends the action away or causes it, so karantar means teach.",
          "Time still sits on the pronoun, ina for ongoing and na for completed, not on the grade vowel."
        ],
        examples: [
          ["Yana karanta littafi.", "He is reading a book."],
          ["Yana karantar da yara.", "He is teaching children."]
        ]
      },
      {
        id: "b2-focus",
        level: "B2",
        title: "Focus",
        lead: "Ne or ce after a noun can focus that noun, and it still agrees.",
        notes: [
          "Shi ne ya zo means he is the one who came.",
          "Ita ce ta zo means she is the one who came, with ce because ita is feminine.",
          "The focus copula is the same ne or ce you already use for identity, not a case ending."
        ],
        examples: [
          ["Shi ne ya zo.", "He is the one who came."],
          ["Ita ce ta zo.", "She is the one who came."]
        ]
      },
      {
        id: "b2-zo",
        level: "B2",
        title: "Zo does not stay regular",
        lead: "Zo is come, and its ongoing form is zuwa rather than a neat grade ending.",
        notes: [
          "Ya zo is he came, and the imperative is zo.",
          "The ongoing form is ina zuwa, I am coming, not a stem zo plus the usual -a.",
          "The completed negative is bai zo ba, he did not come, with the ba frame fused to ya."
        ],
        examples: [
          ["Kana zuwa gida.", "You are coming home."],
          ["Bai zo ba.", "He did not come."]
        ]
      }
    ],
    cards: [
      {
        word: "mutum",
        gloss: "person",
        tag: "noun",
        forms: [
          ["plural", "mutane"],
          ["gender", "masculine"],
          ["copula", "ne"]
        ]
      },
      {
        word: "gida",
        gloss: "house",
        tag: "noun",
        forms: [
          ["plural", "gidaje"],
          ["gender", "masculine"],
          ["copula", "ne"]
        ]
      },
      {
        word: "mace",
        gloss: "woman",
        tag: "noun",
        forms: [
          ["plural", "mata"],
          ["gender", "feminine"],
          ["copula", "ce"]
        ]
      },
      {
        word: "yaro",
        gloss: "boy",
        tag: "noun",
        forms: [
          ["plural", "yara"],
          ["gender", "masculine"]
        ]
      },
      {
        word: "littafi",
        gloss: "book",
        tag: "noun",
        forms: [
          ["plural", "littattafai"],
          ["gender", "masculine"],
          ["copula", "ne"]
        ]
      },
      {
        word: "zo",
        gloss: "come",
        tag: "verb",
        forms: [
          ["he came", "ya zo"],
          ["I am coming", "ina zuwa"],
          ["he did not come", "bai zo ba"],
          ["imperative", "zo"]
        ]
      },
      {
        word: "je",
        gloss: "go",
        tag: "verb",
        forms: [
          ["he went", "ya je"],
          ["she went", "ta je"],
          ["they went", "sun je"],
          ["he did not go", "bai je ba"]
        ]
      },
      {
        word: "ci",
        gloss: "eat",
        tag: "verb",
        forms: [
          ["he ate", "ya ci"],
          ["we are eating", "muna cin"],
          ["he did not eat", "bai ci ba"]
        ]
      },
      {
        word: "gani",
        gloss: "see",
        tag: "verb",
        forms: [
          ["I see", "ina ganin"],
          ["I saw him", "na ga shi"],
          ["ongoing before object", "ganin"]
        ]
      },
      {
        word: "ne",
        gloss: "is, masculine",
        tag: "particle",
        forms: [
          ["feminine", "ce"],
          ["he is the one", "shi ne"],
          ["she is the one", "ita ce"]
        ]
      },
      {
        word: "ina",
        gloss: "I am",
        tag: "pronoun",
        forms: [
          ["you, masculine", "kana"],
          ["he", "yana"],
          ["she", "tana"],
          ["I, completed", "na"]
        ]
      }
    ]
  },
  ff: {
    intro: "These lessons use Adamawa Fulfulde in Latin letters, where noun class is a suffix and not a European gender.",
    lessons: [
      {
        id: "a1-class",
        level: "A1",
        title: "A class suffix",
        lead: "In this Adamawa spelling the class is a suffix on the noun, learned with the word.",
        notes: [
          "Gorko is a man, and the -ko is the person-class shape of that noun.",
          "Debbo is a woman in the same person class, not a feminine ending built on gorko.",
          "Suudu is a house of the ndu class, and ndiyam is water of the liquid class."
        ],
        examples: [
          ["Gorko ena yaha.", "The man is going."],
          ["Debbo ɗoo.", "The woman is here."]
        ],
        table: {
          caption: "Class shape in Adamawa Fulfulde",
          heads: ["noun", "class", "meaning"],
          rows: [
            ["gorko", "person singular", "man"],
            ["debbo", "person singular", "woman"],
            ["suudu", "ndu", "house"],
            ["ndiyam", "liquid", "water"]
          ]
        }
      },
      {
        id: "a1-nogender",
        level: "A1",
        title: "No European gender",
        lead: "Sex is a word, debbo or gorko, not an agreement ending on the verb.",
        notes: [
          "Ena yaha is the same verb phrase for a man and for a woman.",
          "An adjective follows the class of the noun rather than a masculine or feminine article.",
          "Do not import he and she endings from English or French."
        ],
        examples: [
          ["Suudu famɗi.", "The house is small."],
          ["Cukalel ena ɗaana.", "The child is sleeping."]
        ]
      },
      {
        id: "a1-person",
        level: "A1",
        title: "Person on the verb phrase",
        lead: "The personal form is the subject series miɗo, aɗa, and ena, not a Latin suffix.",
        notes: [
          "Miɗo yaha means I am going, aɗa yaha means you are going, and ena yaha means he or she is going.",
          "The stem yaha does not grow an ending for she.",
          "Miɗo, aɗa, and ena already mean I am, you are, and he or she is, so do not add another copula."
        ],
        examples: [
          ["Miɗo yaha.", "I am going."],
          ["Gorko ena yaha.", "The man is going."]
        ],
        table: {
          caption: "Ongoing person series with yaha",
          heads: ["person", "series", "going"],
          rows: [
            ["I", "miɗo", "miɗo yaha"],
            ["you", "aɗa", "aɗa yaha"],
            ["he or she", "ena", "ena yaha"],
            ["we", "eɗen", "eɗen yaha"]
          ]
        }
      },
      {
        id: "a2-plural",
        level: "A2",
        title: "The plural class",
        lead: "The plural is often another class, and the first consonant may change.",
        notes: [
          "Gorko pluralizes as worɓe, and debbo pluralizes as rewɓe.",
          "Suudu pluralizes as cuuɗi, with s becoming c.",
          "Deftere pluralizes as defte, and none of these is an English -s."
        ],
        examples: [
          ["Worɓe ɗoo.", "The men are here."],
          ["Cuuɗi ɗoo.", "The houses are here."]
        ],
        table: {
          caption: "Singular class and plural class",
          heads: ["singular", "plural", "meaning"],
          rows: [
            ["gorko", "worɓe", "man"],
            ["debbo", "rewɓe", "woman"],
            ["suudu", "cuuɗi", "house"],
            ["deftere", "defte", "book"]
          ]
        }
      },
      {
        id: "a2-negation",
        level: "A2",
        title: "Negation",
        lead: "The negative of an ongoing or later action ends in -ataa.",
        notes: [
          "Mi yahataa means I am not going.",
          "The positive later form on these cards is -ata, so a arata is you will come and a arataa is you will not come.",
          "Do not park a separate not in front of miɗo yaha and leave the stem untouched."
        ],
        examples: [
          ["Mi yahataa.", "I am not going."],
          ["A arataa haa suudu.", "You will not come to the house."]
        ],
        table: {
          caption: "Later, and the negative",
          heads: ["verb", "later", "negative"],
          rows: [
            ["go", "mi yahata", "mi yahataa"],
            ["come", "a arata", "a arataa"]
          ]
        }
      },
      {
        id: "a2-aspect",
        level: "A2",
        title: "Aspect",
        lead: "Aspect is the shape of the verb, and person stays on the pronoun.",
        notes: [
          "Miɗo plus a stem such as yara or yi'a is the action in progress.",
          "A short completed form is mi yahi, I went.",
          "With en, the general form can take -an, as in en nyaaman buuru, we eat bread."
        ],
        examples: [
          ["Miɗo yara ndiyam.", "I am drinking water."],
          ["En nyaaman buuru.", "We eat bread."]
        ]
      },
      {
        id: "b1-relative",
        level: "B1",
        title: "A relative",
        lead: "The relative word matches the noun class.",
        notes: [
          "A person takes mo, so gorko mo yahi is the man who went.",
          "The person plural takes ɓe.",
          "Suudu takes ndu in the relative because that is its class, not because of a case ending."
        ],
        examples: [
          ["Gorko mo yahi ena ɗoo.", "The man who went is here."],
          ["Suudu ndu famɗi ena ɗoo.", "The house that is small is here."]
        ]
      },
      {
        id: "b1-ndu",
        level: "B1",
        title: "One class to memorize",
        lead: "Suudu is ndu class and cuuɗi is the plural class, and the pair is a list item.",
        notes: [
          "You cannot build cuuɗi by adding a prefix to suudu.",
          "The first consonant changes from s to c as part of the same pair.",
          "Ndiyam is liquid class and is not given an ordinary plural here."
        ],
        examples: [
          ["Suudu famɗi.", "The house is small."],
          ["Ndiyam ena peewi.", "The water is cold."]
        ]
      },
      {
        id: "b2-pronouns",
        level: "B2",
        title: "Pronouns",
        lead: "Independent pronouns and the ongoing series are two lists.",
        notes: [
          "Min is I, aan is you, kanko is he or she, and en is we.",
          "The ongoing series is miɗo, aɗa, ena, and eɗen.",
          "Ko in aan ko gido am is the identity copula, not the ongoing miɗo."
        ],
        examples: [
          ["Miɗo ɗoo.", "I am here."],
          ["Aan ko gido am.", "You are my friend."]
        ],
        table: {
          caption: "Two pronoun series",
          heads: ["person", "independent", "ongoing"],
          rows: [
            ["I", "min", "miɗo"],
            ["you", "aan", "aɗa"],
            ["he or she", "kanko", "ena"],
            ["we", "en", "eɗen"]
          ]
        }
      },
      {
        id: "b2-not-swahili",
        level: "B2",
        title: "Not Swahili classes",
        lead: "Fulfulde classes are suffixes, and they are not the Swahili pairs.",
        notes: [
          "Do not call gorko a Swahili class 1 or suudu a Swahili class 9.",
          "A Swahili prefix on a Fulfulde stem is a different language.",
          "Keep the hooks that this spelling uses, such as ɗ in miɗo and ɓ in worɓe, and do not invent further ones."
        ],
        examples: [
          ["Gorko ena yaha.", "The man is going."],
          ["Worɓe ɗoo.", "The men are here."]
        ]
      }
    ],
    cards: [
      {
        word: "gorko",
        gloss: "man",
        tag: "noun",
        forms: [
          ["plural", "worɓe"],
          ["class", "person singular"],
          ["suffix", "-ko"]
        ]
      },
      {
        word: "debbo",
        gloss: "woman",
        tag: "noun",
        forms: [
          ["plural", "rewɓe"],
          ["class", "person singular"]
        ]
      },
      {
        word: "suudu",
        gloss: "house",
        tag: "noun",
        forms: [
          ["plural", "cuuɗi"],
          ["class", "ndu"],
          ["plural class", "ɗi"]
        ]
      },
      {
        word: "ndiyam",
        gloss: "water",
        tag: "noun",
        forms: [
          ["class", "liquid"],
          ["example", "Ndiyam ena peewi"],
          ["cold", "peewi"]
        ]
      },
      {
        word: "deftere",
        gloss: "book",
        tag: "noun",
        forms: [
          ["plural", "defte"],
          ["on the table", "ena dow taabal"]
        ]
      },
      {
        word: "cukalel",
        gloss: "child",
        tag: "noun",
        forms: [
          ["class", "diminutive"],
          ["sleeping", "ena ɗaana"]
        ]
      },
      {
        word: "yaha",
        gloss: "go",
        tag: "verb",
        forms: [
          ["I am going", "miɗo yaha"],
          ["I went", "mi yahi"],
          ["I will go", "mi yahata"],
          ["I am not going", "mi yahataa"]
        ]
      },
      {
        word: "ara",
        gloss: "come",
        tag: "verb",
        forms: [
          ["infinitive", "arugo"],
          ["you will come", "a arata"],
          ["you will not come", "a arataa"]
        ]
      },
      {
        word: "nyaama",
        gloss: "eat",
        tag: "verb",
        forms: [
          ["infinitive", "nyaamgo"],
          ["we eat", "en nyaaman"]
        ]
      },
      {
        word: "min",
        gloss: "I",
        tag: "pronoun",
        forms: [
          ["ongoing", "miɗo"],
          ["you", "aan"],
          ["you ongoing", "aɗa"],
          ["he or she ongoing", "ena"]
        ]
      }
    ]
  },
  so: {
    intro: "Standard Somali puts focus on waa, baa, or ayaa, shows gender on the definite suffix, and agrees the verb with the subject.",
    lessons: [
      {
        id: "a1-gender",
        level: "A1",
        title: "Gender and -ka or -ta",
        lead: "The definite suffix shows gender, and a subject often uses -u.",
        notes: [
          "Masculine definite is basically -ka, as in ninka, and feminine is basically -ta, as in naagta.",
          "After some final sounds the consonant softens, so guri becomes guriga rather than a plain -ka.",
          "As a subject the vowel is often -u, which is why the forms to say are ninku, naagtu, and gurigu."
        ],
        examples: [
          ["Ninku wuu socdaa.", "The man walks."],
          ["Gurigu waa yar yahay.", "The house is small."]
        ],
        table: {
          caption: "Definite subject forms",
          heads: ["noun", "gender", "subject"],
          rows: [
            ["nin", "masculine", "ninku"],
            ["naag", "feminine", "naagtu"],
            ["guri", "masculine", "gurigu"],
            ["buug", "masculine", "buuggu"]
          ]
        }
      },
      {
        id: "a1-waa",
        level: "A1",
        title: "Waa focuses the verb",
        lead: "Waa is the focus marker on the verb, and a plain statement of this kind needs it.",
        notes: [
          "Waan is waa fused with I, wuu is waa fused with he, and way is waa fused with she.",
          "Waan halkan joogaa means I am here, with the focus on being here.",
          "Do not use waa in the same clause as baa or ayaa."
        ],
        examples: [
          ["Waan halkan joogaa.", "I am here."],
          ["Ninku wuu socdaa.", "The man is walking."]
        ]
      },
      {
        id: "a1-baa",
        level: "A1",
        title: "Baa or ayaa focuses a noun",
        lead: "Baa and ayaa focus a noun, and the clause takes only one focus marker.",
        notes: [
          "Rooti ayaan cunnaa means it is bread that I eat, with the focus on the bread.",
          "Qorraxda ayaan arkaa puts the focus on the sun.",
          "Ayaa and baa do the same kind of job, and neither one is a Latin case."
        ],
        examples: [
          ["Rooti ayaan cunnaa.", "It is bread that I eat."],
          ["Qorraxda ayaan arkaa.", "It is the sun that I see."]
        ]
      },
      {
        id: "a2-present",
        level: "A2",
        title: "A present",
        lead: "The present ending agrees with person and with gender.",
        notes: [
          "Keen, bring, uses keenaa for I and for he, and keentaa for you and for she.",
          "Cun, eat, follows the same pattern, so cunnaa is I eat.",
          "A progressive in -ayaa exists, but the general present on these cards is the -aa ending."
        ],
        examples: [
          ["Rooti ayaan cunnaa.", "I eat bread."],
          ["Biyo ayaan cabbaa.", "I drink water."]
        ],
        table: {
          caption: "Present of keen",
          heads: ["person", "form"],
          rows: [
            ["I", "keenaa"],
            ["you", "keentaa"],
            ["he", "keenaa"],
            ["she", "keentaa"]
          ]
        }
      },
      {
        id: "a2-past",
        level: "A2",
        title: "A past",
        lead: "The past ending changes, and you and she take a t.",
        notes: [
          "Keenay is I brought or he brought, and keentay is you brought or she brought.",
          "With verb focus, wuu keenay is he brought and way keentay is she brought.",
          "A regular past does not need a helper verb from English."
        ],
        examples: [
          ["Waan keenay rooti.", "I brought bread."],
          ["Way keentay rooti.", "She brought bread."]
        ],
        table: {
          caption: "Past of keen",
          heads: ["person", "form"],
          rows: [
            ["I", "keenay"],
            ["you", "keentay"],
            ["he", "keenay"],
            ["she", "keentay"]
          ]
        }
      },
      {
        id: "a2-pronouns",
        level: "A2",
        title: "Subject pronouns",
        lead: "Short subject pronouns can stand alone or fuse with waa.",
        notes: [
          "Aan is I, aad is you, uu is he, and ay is she.",
          "Waan, waad, wuu, and way are those pronouns fused with the verb focus waa.",
          "Aniga and adiga are the long forms, used when the person is focused as a noun."
        ],
        examples: [
          ["Waan halkan joogaa.", "I am here."],
          ["Adigu waxaad tahay saaxiibkay.", "You are my friend."]
        ],
        table: {
          caption: "Subject pronouns",
          heads: ["person", "short", "with waa", "long"],
          rows: [
            ["I", "aan", "waan", "aniga"],
            ["you", "aad", "waad", "adiga"],
            ["he", "uu", "wuu", "isaga"],
            ["she", "ay", "way", "iyada"]
          ]
        }
      },
      {
        id: "b1-reduced",
        level: "B1",
        title: "Reduced agreement",
        lead: "A focused subject, and a subject relative, uses a shorter verb agreement.",
        notes: [
          "Waan imid means I came, with the full first-person past of come.",
          "Anigu baa yimid means I am the one who came, and the verb stays in the short form yimid.",
          "A main clause with waa keeps the fuller ending, so the reduction is a real subordinate and focus pattern, not a mistake."
        ],
        examples: [
          ["Waan imid.", "I came."],
          ["Anigu baa yimid.", "I am the one who came."]
        ]
      },
      {
        id: "b1-questions",
        level: "B1",
        title: "Questions",
        lead: "Ma marks a yes-no question, and a question word can carry the focus.",
        notes: [
          "Ma timid asks whether you came.",
          "Maxaad cunaysaa asks what you are eating, with maxaa fused to the pronoun aad.",
          "The question does not copy an English do-support verb."
        ],
        examples: [
          ["Ma timid?", "Did you come?"],
          ["Maxaad cunaysaa?", "What are you eating?"]
        ]
      },
      {
        id: "b2-iman",
        level: "B2",
        title: "Iman changes the stem",
        lead: "Come does not keep one stem plus a tidy ending.",
        notes: [
          "The present singulars to store are imaadaa, timaaddaa, yimaadaa, and timaaddaa.",
          "The past singulars are imid, timid, and yimid.",
          "Learn the set, and do not build it from the regular verb keen."
        ],
        examples: [
          ["Guriga ayaad timaaddaa.", "You come to the house."],
          ["Wuu yimid.", "He came."]
        ],
        table: {
          caption: "iman, come",
          heads: ["person", "present", "past"],
          rows: [
            ["I", "imaadaa", "imid"],
            ["you", "timaaddaa", "timid"],
            ["he", "yimaadaa", "yimid"],
            ["she", "timaaddaa", "timid"]
          ]
        }
      },
      {
        id: "b2-sounds",
        level: "B2",
        title: "C and x are Somali sounds",
        lead: "C and x are consonants of their own, not English c and x.",
        notes: [
          "Cab means drink, and the first letter is a throat sound.",
          "Qorrax means sun, and the x is another throat sound, not ks.",
          "Most words stress the syllable before the last, and that stress does not replace these letters."
        ],
        examples: [
          ["Biyo ayaan cabbaa.", "I drink water."],
          ["Qorraxda ayaan arkaa.", "I see the sun."]
        ]
      }
    ],
    cards: [
      {
        word: "nin",
        gloss: "man",
        tag: "noun",
        forms: [
          ["definite", "ninka"],
          ["subject", "ninku"],
          ["gender", "masculine"]
        ]
      },
      {
        word: "naag",
        gloss: "woman",
        tag: "noun",
        forms: [
          ["definite", "naagta"],
          ["subject", "naagtu"],
          ["gender", "feminine"]
        ]
      },
      {
        word: "guri",
        gloss: "house",
        tag: "noun",
        forms: [
          ["definite", "guriga"],
          ["subject", "gurigu"],
          ["small", "waa yar yahay"]
        ]
      },
      {
        word: "waa",
        gloss: "verb focus",
        tag: "particle",
        forms: [
          ["I", "waan"],
          ["he", "wuu"],
          ["she", "way"],
          ["here", "waan halkan joogaa"]
        ]
      },
      {
        word: "baa",
        gloss: "noun focus",
        tag: "particle",
        forms: [
          ["same job", "ayaa"],
          ["I came, focused", "anigu baa yimid"],
          ["bread focused", "rooti ayaan cunnaa"]
        ]
      },
      {
        word: "keen",
        gloss: "bring",
        tag: "verb",
        forms: [
          ["I bring", "keenaa"],
          ["you bring", "keentaa"],
          ["I brought", "keenay"],
          ["she brought", "keentay"]
        ]
      },
      {
        word: "iman",
        gloss: "come",
        tag: "verb",
        forms: [
          ["you come", "timaaddaa"],
          ["he comes", "yimaadaa"],
          ["I came", "imid"],
          ["he came", "yimid"]
        ]
      },
      {
        word: "yahay",
        gloss: "be",
        tag: "verb",
        forms: [
          ["I am", "ahay"],
          ["you are", "tahay"],
          ["he is", "yahay"],
          ["she is", "tahay"]
        ]
      },
      {
        word: "cun",
        gloss: "eat",
        tag: "verb",
        forms: [
          ["I eat", "cunnaa"],
          ["you eat", "cuntaa"],
          ["I eat bread", "rooti ayaan cunnaa"]
        ]
      },
      {
        word: "cab",
        gloss: "drink",
        tag: "verb",
        forms: [
          ["I drink", "cabbaa"],
          ["you drink", "cabtaa"],
          ["water", "biyo ayaan cabbaa"]
        ]
      },
      {
        word: "aan",
        gloss: "I",
        tag: "pronoun",
        forms: [
          ["you", "aad"],
          ["he", "uu"],
          ["she", "ay"],
          ["long I", "aniga"]
        ]
      }
    ]
  }
};
