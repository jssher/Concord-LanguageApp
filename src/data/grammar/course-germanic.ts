import type { GrammarCourse } from "./model";
export const GERMANIC: Record<string, GrammarCourse> = {
  en: {
    intro: "English organises grammar by word order and helpers, and the only regular agreement is a third-person -s.",
    lessons: [
      {
        id: "a1-word-order",
        level: "A1",
        title: "Word order does the work",
        lead: "A plain statement is subject, verb, object, because endings do almost none of the work.",
        notes: [
          "The verb stays after the subject in a simple statement such as I drink water.",
          "Adjectives sit before the noun and do not change for number or gender.",
          "Case survives on a closed list of pronouns, not on the house or the book."
        ],
        examples: [
          ["I drink water.", "subject, verb, object"],
          ["Give it to her.", "object form of the pronoun"]
        ]
      },
      {
        id: "a1-be-do-have",
        level: "A1",
        title: "Be, do, and have",
        lead: "Be, do, and have are the helpers, and each one is irregular from the first day.",
        notes: [
          "Be is am, is, or are now, and was or were in the past, with been after have.",
          "Have becomes has only for he, she, and it, and the past is had for everyone.",
          "Do becomes does only for he, she, and it, and the past is did for everyone."
        ],
        examples: [
          ["She sees the train.", "a main verb, not one of the three helpers"],
          ["I have seen it.", "have plus a participle"]
        ],
        table: {
          caption: "The three helpers",
          heads: ["", "be", "have", "do"],
          rows: [
            ["I", "am", "have", "do"],
            ["you", "are", "have", "do"],
            ["she", "is", "has", "does"],
            ["they", "are", "have", "do"],
            ["past", "was / were", "had", "did"]
          ]
        }
      },
      {
        id: "a1-questions-not",
        level: "A1",
        title: "Questions and not",
        lead: "Questions and negatives need do-support, or a form of be, because the main verb cannot carry them.",
        notes: [
          "A yes-no question starts with do, does, did, or a form of be.",
          "Not goes with the helper: do not, does not, and is not.",
          "Who is the subject, and whom is the object, though speech often ignores whom."
        ],
        examples: [
          ["Does she want bread?", "the helper carries the question"],
          ["I drink water.", "statement order, with no helper"]
        ],
        table: {
          caption: "Not sits on the helper",
          heads: ["helper", "with not"],
          rows: [
            ["do", "do not"],
            ["does", "does not"],
            ["is", "is not"]
          ]
        }
      },
      {
        id: "a2-s-and-past",
        level: "A2",
        title: "The -s and a regular past",
        lead: "Most verbs add -s only for he, she, and it, and a regular past adds -ed for every person.",
        notes: [
          "The dictionary form is the present for I, you, we, and they.",
          "Modal verbs such as can and must do not take that -s.",
          "Go, see, come, take, and eat do not build their past with -ed."
        ],
        examples: [
          ["She sees the train.", "third person -s"],
          ["I went yesterday.", "an irregular past"]
        ],
        table: {
          caption: "See, one -s and one irregular past",
          heads: ["", "present", "past"],
          rows: [
            ["I", "see", "saw"],
            ["you", "see", "saw"],
            ["she", "sees", "saw"],
            ["they", "see", "saw"]
          ]
        }
      },
      {
        id: "a2-articles-plurals",
        level: "A2",
        title: "A, the, and plurals",
        lead: "The marks a known thing, a or an marks a new one, and a few plurals change the vowel.",
        notes: [
          "Nouns do not decline, so the article and the plural are what you learn.",
          "There is no rule that will invent children from child.",
          "Man and men, woman and women, tooth and teeth, and mouse and mice are the same kind of list."
        ],
        examples: [
          ["the child · the children", "an irregular plural"],
          ["Give it to her.", "her is the object, and the noun itself has no case"]
        ],
        table: {
          caption: "Pronouns, the only real declension",
          heads: ["subject", "object", "possessive"],
          rows: [
            ["I", "me", "my"],
            ["he", "him", "his"],
            ["she", "her", "her"],
            ["we", "us", "our"],
            ["they", "them", "their"]
          ]
        }
      },
      {
        id: "a2-going-to-will",
        level: "A2",
        title: "Going to, will, and -ing",
        lead: "Be going to and will both mark a plan, and am, is, or are plus -ing marks what is in progress.",
        notes: [
          "Be going to is the nearer plan, and will is the plainer future.",
          "The present progressive is am, is, or are plus a verb in -ing.",
          "The helper still carries questions and not, and the -ing form does not take -s."
        ],
        examples: [
          ["I am going to leave.", "be going to, the nearer plan"],
          ["She is drinking water.", "is plus -ing"]
        ]
      },
      {
        id: "b1-perfect-or-past",
        level: "B1",
        title: "Present perfect or simple past",
        lead: "Have plus a participle looks back from now, and a simple past pins the event in finished time.",
        notes: [
          "I have seen it keeps the participle after have, and been is the participle of be.",
          "Learn go, went, gone and see, saw, seen as sets.",
          "She went and they went use one past for every person."
        ],
        examples: [
          ["I have seen it.", "past participle after have"],
          ["She went, and they went.", "one past for every person"]
        ],
        table: {
          caption: "Past and participle",
          heads: ["verb", "past", "participle"],
          rows: [
            ["be", "was / were", "been"],
            ["go", "went", "gone"],
            ["see", "saw", "seen"],
            ["come", "came", "come"],
            ["eat", "ate", "eaten"]
          ]
        }
      },
      {
        id: "b1-modals-bare",
        level: "B1",
        title: "Modals leave the next verb bare",
        lead: "Can, must, and will do not take -s, and the next verb stays in the dictionary form.",
        notes: [
          "She can go is right, and a form with goes after can is not.",
          "Not and the question sit on the modal, so you do not add do.",
          "A modal has one present form for every person."
        ],
        examples: [
          ["She can see the train.", "no -s, and see stays bare"],
          ["Must she leave?", "the modal itself makes the question"]
        ],
        table: {
          caption: "One modal form for every person",
          heads: ["", "can", "must"],
          rows: [
            ["I", "can", "must"],
            ["she", "can", "must"],
            ["they", "can", "must"]
          ]
        }
      },
      {
        id: "b2-if-would",
        level: "B2",
        title: "If, would, and a condition",
        lead: "A real plan uses the present after if, and would marks the result as imagined rather than certain.",
        notes: [
          "If we leave now, we will arrive before six keeps the present in the if-clause.",
          "Would plus a bare verb is the imagined result, and would does not take -s.",
          "Would rather is the polite preference, and it still leaves the next verb bare."
        ],
        examples: [
          ["If we leave now, we will arrive before six.", "present in if, will in the result"],
          ["I would rather stay.", "would rather, then a bare verb"]
        ]
      },
      {
        id: "b2-passive-who",
        level: "B2",
        title: "The passive and who the clause is about",
        lead: "Be plus a past participle makes the old object the subject, and who points back to a noun.",
        notes: [
          "The train was seen uses was plus the participle, and the person who saw it can drop.",
          "Who is the subject of its clause, and whom is the object, though speech often ignores whom.",
          "The passive still needs a form of be, so questions and not stay on that helper."
        ],
        examples: [
          ["The train was seen.", "the old object is now the subject"],
          ["I know the child who left.", "who is the subject of the clause"]
        ]
      }
    ],
    cards: [
      {
        word: "be",
        gloss: "be",
        tag: "verb",
        forms: [
          ["I", "am"],
          ["she", "is"],
          ["you", "are"],
          ["I past", "was"],
          ["they past", "were"],
          ["participle", "been"]
        ]
      },
      {
        word: "have",
        gloss: "have",
        tag: "verb",
        forms: [
          ["I", "have"],
          ["she", "has"],
          ["they", "have"],
          ["past", "had"]
        ]
      },
      {
        word: "do",
        gloss: "do",
        tag: "verb",
        forms: [
          ["I", "do"],
          ["she", "does"],
          ["past", "did"],
          ["participle", "done"]
        ]
      },
      {
        word: "go",
        gloss: "go",
        tag: "verb",
        forms: [
          ["I", "go"],
          ["she", "goes"],
          ["past", "went"],
          ["participle", "gone"]
        ]
      },
      {
        word: "see",
        gloss: "see",
        tag: "verb",
        forms: [
          ["I", "see"],
          ["she", "sees"],
          ["past", "saw"],
          ["participle", "seen"]
        ]
      },
      {
        word: "come",
        gloss: "come",
        tag: "verb",
        forms: [
          ["I", "come"],
          ["she", "comes"],
          ["past", "came"],
          ["participle", "come"]
        ]
      },
      {
        word: "take",
        gloss: "take",
        tag: "verb",
        forms: [
          ["I", "take"],
          ["she", "takes"],
          ["past", "took"],
          ["participle", "taken"]
        ]
      },
      {
        word: "eat",
        gloss: "eat",
        tag: "verb",
        forms: [
          ["I", "eat"],
          ["she", "eats"],
          ["past", "ate"],
          ["participle", "eaten"]
        ]
      },
      {
        word: "child",
        gloss: "child",
        tag: "noun",
        forms: [
          ["one", "child"],
          ["many", "children"],
          ["the one", "the child"],
          ["the many", "the children"]
        ]
      },
      {
        word: "good",
        gloss: "good",
        tag: "adjective",
        forms: [
          ["plain", "good"],
          ["comparative", "better"],
          ["superlative", "best"],
          ["adverb", "well"]
        ]
      }
    ]
  },
  de: {
    intro: "German keeps the finite verb in second place and puts gender and case on the article.",
    lessons: [
      {
        id: "a1-verb-second",
        level: "A1",
        title: "The verb stays second",
        lead: "A statement is verb-second, even when a time word comes first.",
        notes: [
          "A yes-no question starts with the verb.",
          "Nicht follows the verb in a simple no.",
          "In a weil or dass clause the verb goes to the end, and du is the friend-form while Sie is formal."
        ],
        examples: [
          ["Ich trinke Wasser.", "verb in second place"],
          ["Trinkst du Wasser?", "verb first in a question"]
        ]
      },
      {
        id: "a1-der-die-das",
        level: "A1",
        title: "Der, die, das with the noun",
        lead: "Learn each noun with der, die, or das, because gender is part of the word.",
        notes: [
          "Die Tür is feminine and das Haus is neuter, and you store the article with the noun.",
          "After der, die, or das an adjective takes an ending, as in der kleine Tisch.",
          "Learn the plural beside the singular, because it is not always a simple extra ending."
        ],
        examples: [
          ["die Tür · das Haus", "learn the gender with the noun"],
          ["der kleine Tisch", "the adjective takes an ending"]
        ],
        table: {
          caption: "Three genders to learn with the noun",
          heads: ["gender", "article", "example"],
          rows: [
            ["masculine", "der", "der Tisch"],
            ["feminine", "die", "die Tür"],
            ["neuter", "das", "das Haus"]
          ]
        }
      },
      {
        id: "a1-sein-haben",
        level: "A1",
        title: "Sein and haben",
        lead: "Sein and haben are irregular from the first day, while a regular verb shows the person in the ending.",
        notes: [
          "Regular present endings are -e, -st, -t, -en, -t, and -en.",
          "Sehen, geben, nehmen, sprechen, and fahren change the vowel for du and er.",
          "The polite form and the they-form look the same: sie sehen, Sie sehen."
        ],
        examples: [
          ["du siehst · er sieht", "the stem vowel changes"],
          ["Ich bin gewesen.", "the irregular participle of sein"]
        ],
        table: {
          caption: "Present of the two helpers",
          heads: ["", "sein", "haben", "sehen"],
          rows: [
            ["ich", "bin", "habe", "sehe"],
            ["du", "bist", "hast", "siehst"],
            ["er / sie", "ist", "hat", "sieht"],
            ["wir / sie / Sie", "sind", "haben", "sehen"]
          ]
        }
      },
      {
        id: "a2-accusative-ein",
        level: "A2",
        title: "Accusative and ein",
        lead: "Accusative is the ordinary object, and ein changes with gender the way the definite article does.",
        notes: [
          "Nominative is the subject, and accusative is the noun the verb acts on.",
          "Masculine der becomes den, and ein becomes einen, in the accusative.",
          "Feminine die and eine, and neuter das and ein, do not change for a plain object."
        ],
        examples: [
          ["Ich trinke Wasser.", "Wasser is the object"],
          ["den Tisch", "masculine accusative"]
        ],
        table: {
          caption: "ein in the subject and the object",
          heads: ["", "masculine", "feminine", "neuter"],
          rows: [
            ["subject", "ein", "eine", "ein"],
            ["object", "einen", "eine", "ein"]
          ]
        }
      },
      {
        id: "a2-separable",
        level: "A2",
        title: "Separable verbs",
        lead: "A separable verb splits in a main clause, and the prefix goes to the end.",
        notes: [
          "Ich komme an keeps the finite verb in second place and an at the end.",
          "In a weil clause the prefix joins the verb again at the end.",
          "The participle tucks ge- in after the prefix."
        ],
        examples: [
          ["Ich komme an.", "the prefix waits at the end"],
          ["Kommst du an?", "verb first, prefix still last"]
        ]
      },
      {
        id: "a2-perfect-haben-sein",
        level: "A2",
        title: "The perfect with haben or sein",
        lead: "The spoken past is haben or sein plus a participle, and movement or a change of state takes sein.",
        notes: [
          "Ich habe Brot gekauft uses haben because the verb is not a change of place.",
          "Ich bin gegangen uses sein because gehen is movement.",
          "Gehen, ging, gegangen and haben, hatte, gehabt are sets, and denken takes dachte."
        ],
        examples: [
          ["Ich bin gegangen.", "movement takes sein"],
          ["Ich habe Brot gekauft.", "haben plus the participle"]
        ]
      },
      {
        id: "b1-dative",
        level: "B1",
        title: "Dative and two-way prepositions",
        lead: "Dative is the person you give something to, and in or an takes dative when you are already there.",
        notes: [
          "Ich gebe dem Kind das Brot puts the person in the dative and the thing in the accusative.",
          "A plural dative adds -n if the plural does not already end in -n or -s.",
          "Genitive marks possession, and speech often uses von instead."
        ],
        examples: [
          ["Ich gebe dem Kind das Brot.", "dative person, accusative thing"],
          ["dem Tisch", "dative singular"]
        ],
        table: {
          caption: "der Tisch, a masculine noun",
          heads: ["case", "singular", "plural"],
          rows: [
            ["nominative", "der Tisch", "die Tische"],
            ["accusative", "den Tisch", "die Tische"],
            ["dative", "dem Tisch", "den Tischen"],
            ["genitive", "des Tisches", "der Tische"]
          ]
        }
      },
      {
        id: "b1-modals-past",
        level: "B1",
        title: "Modals and the simple past",
        lead: "A modal takes a bare infinitive, and in the perfect it keeps that infinitive instead of a participle.",
        notes: [
          "The modal stands in second place, and the other verb stays an infinitive.",
          "Modal verbs in the perfect use the infinitive, not the participle: ich habe gehen müssen.",
          "Sein, war, gewesen does not look like a regular past at all."
        ],
        examples: [
          ["Ich habe gehen müssen.", "infinitive, not a participle"],
          ["Ich bin gewesen.", "gewesen after sein, and war is the simple past"]
        ]
      },
      {
        id: "b2-relative-case",
        level: "B2",
        title: "A relative clause and its case",
        lead: "The relative pronoun takes the case of its job inside the clause, and the verb goes to the end.",
        notes: [
          "The pronoun matches the gender and number of the noun it points to.",
          "An object inside the clause is accusative, and a receiver is dative.",
          "The verb of the relative clause stands at the end, as it does after dass."
        ],
        examples: [
          ["der Tisch, den ich sehe", "den is accusative inside the clause"],
          ["das Kind, dem ich das Brot gebe", "dem is dative inside the clause"]
        ]
      },
      {
        id: "b2-konjunktiv-passive",
        level: "B2",
        title: "Konjunktiv II and the passive",
        lead: "Konjunktiv II marks an imagined or polite result, and the passive uses werden plus a participle.",
        notes: [
          "Wäre and hätte are the Konjunktiv II of sein and haben, and würde plus an infinitive covers most other verbs.",
          "The passive turns the old object into the subject.",
          "In the passive perfect, sein takes worden, not geworden."
        ],
        examples: [
          ["Ich wäre gegangen.", "Konjunktiv II of sein, with a motion participle"],
          ["Das Brot wird gekauft.", "werden plus the participle"]
        ],
        table: {
          caption: "werden, irregular in the present",
          heads: ["", "werden"],
          rows: [
            ["ich", "werde"],
            ["du", "wirst"],
            ["er", "wird"],
            ["wir", "werden"]
          ]
        }
      }
    ],
    cards: [
      {
        word: "sein",
        gloss: "be",
        tag: "verb",
        forms: [
          ["ich", "bin"],
          ["du", "bist"],
          ["er", "ist"],
          ["wir", "sind"],
          ["past", "war"],
          ["participle", "gewesen"]
        ]
      },
      {
        word: "haben",
        gloss: "have",
        tag: "verb",
        forms: [
          ["ich", "habe"],
          ["du", "hast"],
          ["er", "hat"],
          ["past", "hatte"],
          ["participle", "gehabt"]
        ]
      },
      {
        word: "werden",
        gloss: "become, or the passive helper",
        tag: "verb",
        forms: [
          ["ich", "werde"],
          ["du", "wirst"],
          ["er", "wird"],
          ["past", "wurde"],
          ["participle", "geworden"],
          ["passive", "worden"]
        ]
      },
      {
        word: "gehen",
        gloss: "go",
        tag: "verb",
        forms: [
          ["past", "ging"],
          ["plural past", "gingen"],
          ["participle", "gegangen"],
          ["perfect", "ist gegangen"]
        ]
      },
      {
        word: "kommen",
        gloss: "come",
        tag: "verb",
        forms: [
          ["past", "kam"],
          ["plural past", "kamen"],
          ["participle", "gekommen"],
          ["perfect", "ist gekommen"]
        ]
      },
      {
        word: "sehen",
        gloss: "see",
        tag: "verb",
        forms: [
          ["du", "siehst"],
          ["er", "sieht"],
          ["past", "sah"],
          ["participle", "gesehen"]
        ]
      },
      {
        word: "essen",
        gloss: "eat",
        tag: "verb",
        forms: [
          ["du", "isst"],
          ["er", "isst"],
          ["past", "aß"],
          ["participle", "gegessen"]
        ]
      },
      {
        word: "nehmen",
        gloss: "take",
        tag: "verb",
        forms: [
          ["du", "nimmst"],
          ["er", "nimmt"],
          ["past", "nahm"],
          ["participle", "genommen"]
        ]
      },
      {
        word: "der Mann",
        gloss: "the man",
        tag: "noun",
        forms: [
          ["nominative", "der Mann"],
          ["accusative", "den Mann"],
          ["dative", "dem Mann"],
          ["genitive", "des Mannes"],
          ["plural", "die Männer"]
        ]
      },
      {
        word: "das Haus",
        gloss: "the house",
        tag: "noun",
        forms: [
          ["nominative", "das Haus"],
          ["dative", "dem Haus"],
          ["genitive", "des Hauses"],
          ["plural", "die Häuser"],
          ["plural dative", "den Häusern"]
        ]
      }
    ]
  },
  gsw: {
    intro: "Zürich German keeps the verb second and uses de, d, and s, and it is not Bern and not school German.",
    lessons: [
      {
        id: "a1-verb-second",
        level: "A1",
        title: "The verb stays second in Zürich",
        lead: "Ich bi daa is a full statement, and these forms are Zürich speech.",
        notes: [
          "A time word at the front still leaves the verb in second place.",
          "Du is the friend-form, and Si is formal.",
          "Bern uses nid, dr, and loufe, and those words are a different card."
        ],
        examples: [
          ["Ich bi daa.", "verb second"],
          ["Bisch du daa?", "a yes-no question starts with the verb"]
        ]
      },
      {
        id: "a1-de-d-s",
        level: "A1",
        title: "De, d, and s",
        lead: "Learn the article with the noun: de for masculine, d for feminine, and s for neuter.",
        notes: [
          "De Maa is masculine, d Frau is feminine, and s Huus is neuter.",
          "S Wasser, s Huus, and s Chind are neuter, and d Frau and d Tüür are feminine.",
          "A diminutive is usually neuter, and it is a word of its own."
        ],
        examples: [
          ["De Maa laufft.", "masculine article de"],
          ["D Tüür isch offe.", "feminine d"]
        ]
      },
      {
        id: "a1-sii-haa",
        level: "A1",
        title: "Sii and haa",
        lead: "Sii and haa are irregular from the first sentence, and you do not rebuild them from school German.",
        notes: [
          "Sii is bi, bisch, isch, and sind.",
          "Haa is ha, hesch, hät, and händ.",
          "Do not correct these with bin, bist, habe, or hat."
        ],
        examples: [
          ["Ich bi daa.", "sii, ich bi"],
          ["S Huus isch chlii.", "isch, and neuter s"]
        ],
        table: {
          caption: "Present",
          heads: ["", "sii", "haa", "gsee"],
          rows: [
            ["ich", "bi", "ha", "gsee"],
            ["du", "bisch", "hesch", "gseesch"],
            ["er", "isch", "hät", "gseet"],
            ["mir", "sind", "händ", "gseed"]
          ]
        }
      },
      {
        id: "a2-noed",
        level: "A2",
        title: "Nöd beside the verb",
        lead: "Nöd is the simple no, and it sits next to the verb.",
        notes: [
          "Nöd is Zürich, and it is not the Bern nid.",
          "A short no does not need an English do helper.",
          "The finite verb still stays in second place."
        ],
        examples: [
          ["Ich bi nöd daa.", "nöd beside sii"],
          ["De Maa laufft nöd.", "nöd after laufft"]
        ]
      },
      {
        id: "a2-short-present",
        level: "A2",
        title: "A short present",
        lead: "A regular present is short, and lauffe is the pattern the irregular verbs refuse.",
        notes: [
          "Lauffe goes ich lauff, du lauffsch, er laufft, and mir lauffed.",
          "Gsee, choo, gaa, and ässe do not follow lauffe.",
          "A separable verb splits in a main clause, as in German."
        ],
        examples: [
          ["De Maa laufft.", "er laufft"],
          ["Ich gsee d Sunne.", "gsee does not take a regular -e"]
        ],
        table: {
          caption: "lauffe, the regular shape",
          heads: ["", "lauffe"],
          rows: [
            ["ich", "lauff"],
            ["du", "lauffsch"],
            ["er", "laufft"],
            ["mir", "lauffed"]
          ]
        }
      },
      {
        id: "a2-spoken-past",
        level: "A2",
        title: "The spoken past",
        lead: "The spoken past is haa or sii plus a participle, and movement takes sii.",
        notes: [
          "Ich bi ggange uses sii because gaa is a change of place.",
          "The participle often adds a g- where German adds ge-.",
          "Haa's past is irregular: ich ha ghaa."
        ],
        examples: [
          ["Ich bi ggange.", "movement takes sii"],
          ["Ich ha ghaa.", "the irregular participle of haa"]
        ]
      },
      {
        id: "b1-gaa-choo-gsee",
        level: "B1",
        title: "Gaa, choo, gsee, ässe",
        lead: "Gaa, choo, gsee, and ässe replace the stem, so the lauffe endings will not invent them.",
        notes: [
          "Do not build gang from gaa by adding -e.",
          "Choo gives du chunsch, not a regular ending on choo.",
          "Ässe shortens in the plural you already meet as mir ässed."
        ],
        examples: [
          ["ich gang · du gaasch · er gaat", "gaa"],
          ["Mir ässed Broot.", "ässe in the plural"]
        ],
        table: {
          caption: "gaa and gsee",
          heads: ["", "gaa", "gsee"],
          rows: [
            ["ich", "gang", "gsee"],
            ["du", "gaasch", "gseesch"],
            ["er", "gaat", "gseet"],
            ["mir", "gönd", "gseed"]
          ]
        }
      },
      {
        id: "b1-plurals",
        level: "B1",
        title: "Plurals you learn with the noun",
        lead: "Plurals are a list you learn beside the singular, not one ending for every noun.",
        notes: [
          "Chind stays Chind, and Huus becomes Hüüser.",
          "The article still shows gender on the singular you first learned.",
          "The adjective usually follows the article rather than a full four-case table."
        ],
        examples: [
          ["S Huus isch chlii.", "neuter s, plural Hüüser"],
          ["S Chind schlaaft.", "plural Chind, with no extra ending"]
        ],
        table: {
          caption: "Plurals you memorize",
          heads: ["singular", "plural"],
          rows: [
            ["s Chind", "Chind"],
            ["s Huus", "Hüüser"],
            ["de Maa", "Mane"]
          ]
        }
      },
      {
        id: "b2-no-hochdeutsch-cases",
        level: "B2",
        title: "Do not import Hochdeutsch cases",
        lead: "Do not correct a Zürich sentence with a Hochdeutsch case chart.",
        notes: [
          "Case is lighter than in written German, and speech does not ask for a full den and dem table.",
          "The article still tells you the gender, and that is the fact to store.",
          "If a small function word changes shape, learn the shape you actually say."
        ],
        examples: [
          ["Ich gsee d Sunne.", "d Sunne, not a school accusative"],
          ["Du chunsch zum Huus.", "choo changes the vowel"]
        ]
      },
      {
        id: "b2-choene-mueesse",
        level: "B2",
        title: "Chöne and müesse",
        lead: "Chöne and müesse lack a normal past participle in the perfect, and the next verb stays bare.",
        notes: [
          "The modal stays in second place, and the other verb stays an infinitive.",
          "You cannot build that perfect with a regular ge- participle.",
          "These are Zürich modals, not the Bern card and not school können and müssen."
        ],
        examples: [
          ["Ich cha lauffe.", "chöne plus a bare infinitive"],
          ["Ich mues nöd gaa.", "müesse, with Zürich nöd"]
        ],
        table: {
          caption: "chöne and müesse",
          heads: ["", "chöne", "müesse"],
          rows: [
            ["ich", "cha", "mues"],
            ["du", "chasch", "muesch"],
            ["er", "cha", "mues"],
            ["mir", "chönd", "müend"]
          ]
        }
      }
    ],
    cards: [
      {
        word: "sii",
        gloss: "be",
        tag: "verb",
        forms: [
          ["ich", "bi"],
          ["du", "bisch"],
          ["er", "isch"],
          ["mir", "sind"]
        ]
      },
      {
        word: "haa",
        gloss: "have",
        tag: "verb",
        forms: [
          ["ich", "ha"],
          ["du", "hesch"],
          ["er", "hät"],
          ["mir", "händ"],
          ["participle", "ghaa"]
        ]
      },
      {
        word: "gaa",
        gloss: "go",
        tag: "verb",
        forms: [
          ["ich", "gang"],
          ["du", "gaasch"],
          ["er", "gaat"],
          ["mir", "gönd"],
          ["participle", "ggange"]
        ]
      },
      {
        word: "choo",
        gloss: "come",
        tag: "verb",
        forms: [
          ["ich", "chum"],
          ["du", "chunsch"],
          ["er", "chunnt"],
          ["mir", "chömed"]
        ]
      },
      {
        word: "gsee",
        gloss: "see",
        tag: "verb",
        forms: [
          ["ich", "gsee"],
          ["du", "gseesch"],
          ["er", "gseet"],
          ["mir", "gseed"]
        ]
      },
      {
        word: "ässe",
        gloss: "eat",
        tag: "verb",
        forms: [
          ["mir", "ässed"],
          ["du", "ässisch"],
          ["er", "isst"],
          ["participle", "gässe"]
        ]
      },
      {
        word: "de Maa",
        gloss: "the man",
        tag: "noun",
        forms: [
          ["article", "de"],
          ["singular", "Maa"],
          ["with article", "de Maa"],
          ["plural", "Mane"]
        ]
      },
      {
        word: "s Huus",
        gloss: "the house",
        tag: "noun",
        forms: [
          ["article", "s"],
          ["singular", "Huus"],
          ["with article", "s Huus"],
          ["plural", "Hüüser"]
        ]
      },
      {
        word: "chöne",
        gloss: "can",
        tag: "verb",
        forms: [
          ["ich", "cha"],
          ["du", "chasch"],
          ["er", "cha"],
          ["mir", "chönd"]
        ]
      },
      {
        word: "müesse",
        gloss: "must",
        tag: "verb",
        forms: [
          ["ich", "mues"],
          ["du", "muesch"],
          ["er", "mues"],
          ["mir", "müend"]
        ]
      }
    ]
  },
  "gsw-be": {
    intro: "Bern German keeps the verb second and uses dr, d, ds, and nid, which are not the Zürich forms.",
    lessons: [
      {
        id: "a1-verb-second",
        level: "A1",
        title: "I bi da, verb second",
        lead: "I bi da is city Bern, not Zürich and not school German.",
        notes: [
          "Du is the friend-form, and a question starts with the verb.",
          "The pronouns to learn first are i, du, är, mir, dir, and si.",
          "Do not mix this card with the Zürich card."
        ],
        examples: [
          ["I bi da.", "verb second, Bern sii"],
          ["Dr Ma louft.", "masculine dr"]
        ]
      },
      {
        id: "a1-dr-d-ds",
        level: "A1",
        title: "Dr, d, and ds",
        lead: "Learn dr, d, or ds with the noun, because those are not de and s.",
        notes: [
          "Dr Ma, d Frau, and ds Huus still show masculine, feminine, and neuter.",
          "Ds Wasser isch chalt, and ds Chind is neuter too.",
          "Gender is still there even though there is no written four-case table."
        ],
        examples: [
          ["Ds Chind schlaft.", "neuter ds"],
          ["D Türe isch offe.", "feminine d"]
        ]
      },
      {
        id: "a1-nid",
        level: "A1",
        title: "Nid, not the Zürich nöd",
        lead: "Nid is the Bern no, and it is not the Zürich nöd.",
        notes: [
          "Nid sits next to the verb in a simple no.",
          "Loufe is not lauffe, so do not borrow the Zürich spelling of walk.",
          "A yes-no question still starts with the verb."
        ],
        examples: [
          ["I bi nid da.", "nid, not nöd"],
          ["Dr Ma louft nid.", "nid after louft"]
        ]
      },
      {
        id: "a2-loufe",
        level: "A2",
        title: "Loufe, not lauffe",
        lead: "Loufe is the regular shape, and sii and haa are what you compare with it.",
        notes: [
          "Loufe goes i loufe, du loufsch, and är louft.",
          "The you-form often ends in -sch, as in bisch and hesch.",
          "Do not write lauffe, lauffsch, or laufft on this card."
        ],
        examples: [
          ["Dr Ma louft.", "är louft"],
          ["I loufe.", "the i form, with no extra ending"]
        ],
        table: {
          caption: "loufe, not lauffe",
          heads: ["", "loufe"],
          rows: [
            ["i", "loufe"],
            ["du", "loufsch"],
            ["är", "louft"]
          ]
        }
      },
      {
        id: "a2-short-present",
        level: "A2",
        title: "A short Bern present",
        lead: "Sii and haa replace loufe, and gseh does not take a regular ending either.",
        notes: [
          "Sii is bi, bisch, isch, and sy.",
          "Haa is ha, hesch, het, and hei.",
          "Gseh, cho, and gaa are irregular in the same broad way, but the shapes are Bern."
        ],
        examples: [
          ["I gseh d Sunne.", "gseh"],
          ["I bi da.", "bi, and da, not daa"]
        ],
        table: {
          caption: "Present",
          heads: ["", "sii", "haa", "gseh"],
          rows: [
            ["i", "bi", "ha", "gseh"],
            ["du", "bisch", "hesch", "gseesch"],
            ["är", "isch", "het", "gseet"],
            ["mir", "sy", "hei", "gsee"]
          ]
        }
      },
      {
        id: "a2-spoken-past",
        level: "A2",
        title: "The spoken past in Bern",
        lead: "The spoken past is haa or sii plus a participle, and a change of place takes sii.",
        notes: [
          "The participle and the g- prefix will not match a German textbook line for line.",
          "If a past looks like a different verb, memorize the pair.",
          "Do not paste a Zürich participle onto a Bern sentence just because the English matches."
        ],
        examples: [
          ["I ha Brot gchouft.", "haa plus a participle"],
          ["I bi ggange.", "a change of place takes sii"]
        ]
      },
      {
        id: "b1-gaa-cho",
        level: "B1",
        title: "Gaa and cho in Bern",
        lead: "Gaa and cho do not follow loufe, so you learn the persons as a set.",
        notes: [
          "Learn i gang, du geisch, and är geit, and do not invent them from loufe.",
          "Cho gives du chunsch.",
          "Mir ässe has no Zürich -ed."
        ],
        examples: [
          ["i gang · du geisch · är geit", "gaa"],
          ["Mir ässe Brot.", "ässe, plural without a Zürich -ed"]
        ],
        table: {
          caption: "gaa in Bern",
          heads: ["", "gaa"],
          rows: [
            ["i", "gang"],
            ["du", "geisch"],
            ["är", "geit"],
            ["mir", "göö"]
          ]
        }
      },
      {
        id: "b1-nouns-articles",
        level: "B1",
        title: "Nouns you learn with dr, d, or ds",
        lead: "Learn the article and the plural with the noun, because neither one falls out of a single rule.",
        notes: [
          "Plurals are memorized: Manne, Hüüser, and Chind with no extra ending.",
          "Ds Huus isch chly, and the adjective does not run through a Hochdeutsch ending chart.",
          "D Frau, dr Ma, and ds Huus are not the Zürich articles."
        ],
        examples: [
          ["Ds Huus isch chly.", "neuter ds, and chly"],
          ["Ds Wasser isch chalt.", "ds Wasser, not s Wasser"]
        ],
        table: {
          caption: "Article and plural",
          heads: ["singular", "plural"],
          rows: [
            ["dr Ma", "Manne"],
            ["ds Huus", "Hüüser"],
            ["ds Chind", "Chind"]
          ]
        }
      },
      {
        id: "b2-not-a-case-chart",
        level: "B2",
        title: "Bern is not a case chart",
        lead: "There is no written four-case table for you to produce from a Bern noun.",
        notes: [
          "Do not correct Bern with a Zürich chart or a Hochdeutsch chart.",
          "The article shows gender, and that is the marking you actually say.",
          "The same English line stays on the Zürich card in Zürich spelling, and the words are not interchangeable."
        ],
        examples: [
          ["D Türe isch offe.", "Türe and d, not the Zürich Tüür"],
          ["Du chunsch zum Huus.", "cho"]
        ]
      },
      {
        id: "b2-modals",
        level: "B2",
        title: "Modal verbs in Bern",
        lead: "A Bern modal does not follow loufe, and the next verb stays a bare infinitive.",
        notes: [
          "The modal takes second place, and nid, not nöd, marks the no.",
          "Do not give the modal a normal participle copied from a German textbook.",
          "Tue belongs on the same irregular list as sii, haa, gaa, cho, and gseh."
        ],
        examples: [
          ["I cha nid loufe.", "cha, a bare infinitive, and nid"],
          ["I mues gaa.", "a modal, then gaa"]
        ],
        table: {
          caption: "chönne, not a loufe verb",
          heads: ["", "chönne"],
          rows: [
            ["i", "cha"],
            ["du", "chasch"],
            ["är", "cha"]
          ]
        }
      }
    ],
    cards: [
      {
        word: "sii",
        gloss: "be",
        tag: "verb",
        forms: [
          ["i", "bi"],
          ["du", "bisch"],
          ["är", "isch"],
          ["mir", "sy"]
        ]
      },
      {
        word: "haa",
        gloss: "have",
        tag: "verb",
        forms: [
          ["i", "ha"],
          ["du", "hesch"],
          ["är", "het"],
          ["mir", "hei"]
        ]
      },
      {
        word: "gaa",
        gloss: "go",
        tag: "verb",
        forms: [
          ["i", "gang"],
          ["du", "geisch"],
          ["är", "geit"],
          ["mir", "göö"]
        ]
      },
      {
        word: "cho",
        gloss: "come",
        tag: "verb",
        forms: [
          ["i", "chume"],
          ["du", "chunsch"],
          ["är", "chunt"],
          ["mir", "chöme"]
        ]
      },
      {
        word: "gseh",
        gloss: "see",
        tag: "verb",
        forms: [
          ["i", "gseh"],
          ["du", "gseesch"],
          ["är", "gseet"],
          ["mir", "gsee"]
        ]
      },
      {
        word: "ässe",
        gloss: "eat",
        tag: "verb",
        forms: [
          ["infinitive", "ässe"],
          ["mir", "ässe"],
          ["participle", "ggässe"],
          ["perfect", "ha ggässe"]
        ]
      },
      {
        word: "dr Ma",
        gloss: "the man",
        tag: "noun",
        forms: [
          ["article", "dr"],
          ["singular", "Ma"],
          ["with article", "dr Ma"],
          ["plural", "Manne"]
        ]
      },
      {
        word: "ds Huus",
        gloss: "the house",
        tag: "noun",
        forms: [
          ["article", "ds"],
          ["singular", "Huus"],
          ["with article", "ds Huus"],
          ["plural", "Hüüser"]
        ]
      },
      {
        word: "chönne",
        gloss: "can",
        tag: "verb",
        forms: [
          ["i", "cha"],
          ["du", "chasch"],
          ["är", "cha"],
          ["infinitive", "chönne"]
        ]
      }
    ]
  },
  nl: {
    intro: "Dutch keeps the verb second in a main clause and sorts every noun as de or het, not as a German article.",
    lessons: [
      {
        id: "a1-verb-second",
        level: "A1",
        title: "Verb second, and it is not German",
        lead: "The verb is second in a main clause, and it goes to the end in a subordinate clause.",
        notes: [
          "A time word at the front pushes the subject after the verb.",
          "Je or jij is the friend-form, and u is formal.",
          "Because and that send the verb to the end."
        ],
        examples: [
          ["Ik drink water.", "verb second"],
          ["Ik ben hier.", "verb second with zijn"]
        ]
      },
      {
        id: "a1-de-het",
        level: "A1",
        title: "De or het",
        lead: "De is common gender, het is neuter, and you learn one of them with every noun.",
        notes: [
          "Het huis, de deur, and het kind are stored with the article.",
          "Plurals take -en or -s, as in huizen, and ordinary nouns have almost no case left.",
          "An adjective adds -e, except after een before a het-word: een klein huis."
        ],
        examples: [
          ["Het huis is klein.", "het is neuter"],
          ["De vrouw is hier.", "de"]
        ],
        table: {
          caption: "De or het with the noun",
          heads: ["noun", "article"],
          rows: [
            ["huis", "het"],
            ["deur", "de"],
            ["kind", "het"],
            ["vrouw", "de"]
          ]
        }
      },
      {
        id: "a1-zijn-hebben-gaan",
        level: "A1",
        title: "Zijn, hebben, gaan",
        lead: "Zijn and hebben are irregular, and a regular present adds -t except for ik and wij.",
        notes: [
          "Komen is ik kom, jij komt, hij komt, and wij komen.",
          "Jij drops -t when the verb comes before jij: kom jij?",
          "Do not build ging from gaan."
        ],
        examples: [
          ["Ik zie de zon.", "zien in the first person"],
          ["Jij komt naar het huis.", "komen adds -t"]
        ],
        table: {
          caption: "Present",
          heads: ["", "zijn", "hebben", "zien"],
          rows: [
            ["ik", "ben", "heb", "zie"],
            ["jij", "bent", "hebt", "ziet"],
            ["hij", "is", "heeft", "ziet"],
            ["wij", "zijn", "hebben", "zien"]
          ]
        }
      },
      {
        id: "a2-perfect",
        level: "A2",
        title: "The perfect with hebben or zijn",
        lead: "The spoken past is hebben or zijn plus a participle, and motion or a change of state takes zijn.",
        notes: [
          "Ik ben gekomen uses zijn because komen is motion.",
          "Zien, komen, gaan, and eten change the vowel in the past, and the participle is learned with that vowel.",
          "Zijn, was, geweest and hebben, had, gehad are the helper sets."
        ],
        examples: [
          ["Ik ben gekomen.", "motion takes zijn"],
          ["Wij eten brood.", "eten, and the past is not a regular -te"]
        ],
        table: {
          caption: "Past and participle",
          heads: ["verb", "past", "participle"],
          rows: [
            ["zijn", "was", "geweest"],
            ["hebben", "had", "gehad"],
            ["gaan", "ging", "gegaan"],
            ["zien", "zag", "gezien"],
            ["komen", "kwam", "gekomen"]
          ]
        }
      },
      {
        id: "a2-question-inverts",
        level: "A2",
        title: "A question inverts",
        lead: "A yes-no question starts with the verb, and niet sits after the finite verb in a simple no.",
        notes: [
          "The subject follows the verb in a yes-no question.",
          "Kom jij drops the -t because the verb stands before jij.",
          "Niet does not need an English-style do helper."
        ],
        examples: [
          ["Kom jij?", "no -t before jij"],
          ["Ik ben niet hier.", "niet after the finite verb"]
        ]
      },
      {
        id: "a2-diminutive",
        level: "A2",
        title: "The diminutive -je",
        lead: "A diminutive in -je is usually het, even when the plain noun was de.",
        notes: [
          "Het kind and a small form such as huisje both take het.",
          "Kinderen adds an extra syllable, so it is not kind plus a simple -en.",
          "The plural of stad is also not a simple -en on the singular you first learned."
        ],
        examples: [
          ["Het kind slaapt.", "het"],
          ["een klein huis", "no -e after een before a het-word"]
        ],
        table: {
          caption: "Het on the small form",
          heads: ["word", "article"],
          rows: [
            ["huis", "het"],
            ["huisje", "het"],
            ["kind", "het"],
            ["deur", "de"]
          ]
        }
      },
      {
        id: "b1-er",
        level: "B1",
        title: "Er for an indefinite subject",
        lead: "Er holds the first place when an indefinite subject would otherwise start the sentence.",
        notes: [
          "Er is a placeholder, and the indefinite subject follows the verb.",
          "It is not German er, and it does not mean he.",
          "A definite subject does not need this er."
        ],
        examples: [
          ["Er is een kind hier.", "er, then the verb, then an indefinite subject"],
          ["Het kind is hier.", "a definite subject needs no er"]
        ]
      },
      {
        id: "b1-separable",
        level: "B1",
        title: "Separable prefixes",
        lead: "A separable prefix leaves the verb and goes to the end of a main clause.",
        notes: [
          "The finite verb stays in second place, and the prefix is last.",
          "In a subordinate clause the prefix joins the verb at the end.",
          "Modal verbs such as kunnen and moeten do not take a regular past participle."
        ],
        examples: [
          ["Ik kom aan.", "aan waits at the end"],
          ["Ik ben aangekomen.", "zijn, and the prefix stays in the participle"]
        ]
      },
      {
        id: "b2-infinitive-cluster",
        level: "B2",
        title: "A cluster of infinitives",
        lead: "Modals stack infinitives at the end, while the finite verb stays in second place.",
        notes: [
          "Zullen, kunnen, mogen, and willen have their own pasts: zou, kon, mocht, and wilde.",
          "The perfect of a modal uses an infinitive rather than a regular participle.",
          "Do not build those pasts by adding -te to the full present stem."
        ],
        examples: [
          ["Ik kan komen.", "modal plus a bare infinitive"],
          ["Ik heb kunnen komen.", "infinitive, not a participle"]
        ],
        table: {
          caption: "Modal pasts you memorize",
          heads: ["modal", "past"],
          rows: [
            ["zullen", "zou"],
            ["kunnen", "kon"],
            ["mogen", "mocht"],
            ["willen", "wilde"]
          ]
        }
      },
      {
        id: "b2-die-dat-passive",
        level: "B2",
        title: "Die, dat, and the passive",
        lead: "Die points back to a de-word, dat points back to a het-word, and the passive uses worden.",
        notes: [
          "The relative clause sends its verb to the end.",
          "Worden plus a participle turns the old object into the subject.",
          "Object pronouns are a closed list: me, je, hem, and haar."
        ],
        examples: [
          ["Het huis dat klein is, is hier.", "dat after a het-word"],
          ["De vrouw wordt gezien.", "worden plus a participle"]
        ]
      }
    ],
    cards: [
      {
        word: "zijn",
        gloss: "be",
        tag: "verb",
        forms: [
          ["ik", "ben"],
          ["jij", "bent"],
          ["hij", "is"],
          ["wij", "zijn"],
          ["past", "was"],
          ["participle", "geweest"]
        ]
      },
      {
        word: "hebben",
        gloss: "have",
        tag: "verb",
        forms: [
          ["ik", "heb"],
          ["jij", "hebt"],
          ["hij", "heeft"],
          ["wij", "hebben"],
          ["past", "had"],
          ["participle", "gehad"]
        ]
      },
      {
        word: "gaan",
        gloss: "go",
        tag: "verb",
        forms: [
          ["ik", "ga"],
          ["hij", "gaat"],
          ["past", "ging"],
          ["participle", "gegaan"]
        ]
      },
      {
        word: "komen",
        gloss: "come",
        tag: "verb",
        forms: [
          ["ik", "kom"],
          ["past", "kwam"],
          ["participle", "gekomen"],
          ["perfect", "is gekomen"]
        ]
      },
      {
        word: "zien",
        gloss: "see",
        tag: "verb",
        forms: [
          ["ik", "zie"],
          ["past", "zag"],
          ["plural past", "zagen"],
          ["participle", "gezien"]
        ]
      },
      {
        word: "mogen",
        gloss: "may",
        tag: "verb",
        forms: [
          ["ik", "mag"],
          ["hij", "mag"],
          ["wij", "mogen"],
          ["past", "mocht"]
        ]
      },
      {
        word: "eten",
        gloss: "eat",
        tag: "verb",
        forms: [
          ["past", "at"],
          ["plural past", "aten"],
          ["participle", "gegeten"],
          ["perfect", "heeft gegeten"]
        ]
      },
      {
        word: "kunnen",
        gloss: "can",
        tag: "verb",
        forms: [
          ["ik", "kan"],
          ["jij", "kan"],
          ["wij", "kunnen"],
          ["past", "kon"]
        ]
      },
      {
        word: "het kind",
        gloss: "the child",
        tag: "noun",
        forms: [
          ["singular", "kind"],
          ["article", "het"],
          ["with article", "het kind"],
          ["plural", "kinderen"]
        ]
      }
    ]
  },
  da: {
    intro: "Danish keeps the verb second, barely changes it for person, and hangs the definite article on the noun.",
    lessons: [
      {
        id: "a1-verb-unchanging",
        level: "A1",
        title: "The verb almost does not change",
        lead: "One present ending serves every person, so the verb does not agree the way a German verb does.",
        notes: [
          "Jeg drikker vand, and du, hun, and vi use drikker too.",
          "There is no person ending hiding after -r.",
          "Du is the friend-form, and De is formal."
        ],
        examples: [
          ["Jeg drikker vand.", "one present ending for every person"],
          ["Jeg ser solen.", "ser for every person"]
        ]
      },
      {
        id: "a1-en-et",
        level: "A1",
        title: "En or et, then the suffix",
        lead: "Common gender takes en, neuter takes et, and the definite article is often a suffix.",
        notes: [
          "Learn en or et before you learn the definite form.",
          "Et hus becomes huset, en dør becomes døren, and vand becomes vandet.",
          "There is no case on the noun."
        ],
        examples: [
          ["Vandet er koldt.", "definite suffix on a neuter noun"],
          ["Kvinden er her.", "common gender, suffix article"]
        ],
        table: {
          caption: "Indefinite, then the suffix",
          heads: ["gender", "indefinite", "definite"],
          rows: [
            ["common", "en dør", "døren"],
            ["neuter", "et hus", "huset"],
            ["neuter", "vand", "vandet"],
            ["common", "en kvinde", "kvinden"]
          ]
        }
      },
      {
        id: "a1-er-har",
        level: "A1",
        title: "Er and har",
        lead: "Være and have are irregular, and even they keep one present form for every person.",
        notes: [
          "Være is er for jeg, du, hun, and vi.",
          "Have is har for every person in the present.",
          "The perfect is har plus a participle, or er when the verb is motion."
        ],
        examples: [
          ["Jeg er her.", "være, present er"],
          ["Du kommer til huset.", "komme, present kommer"]
        ],
        table: {
          caption: "Present, the same in every person",
          heads: ["", "være", "have", "se"],
          rows: [
            ["jeg", "er", "har", "ser"],
            ["du", "er", "har", "ser"],
            ["hun", "er", "har", "ser"],
            ["vi", "er", "har", "ser"]
          ]
        }
      },
      {
        id: "a2-verb-second-ikke",
        level: "A2",
        title: "Verb second, and ikke",
        lead: "The verb stays in second place, and ikke follows that verb in a main clause.",
        notes: [
          "A time word at the front puts the subject after the verb.",
          "Questions that are yes or no start with the verb.",
          "Ikke does not need a separate helper verb."
        ],
        examples: [
          ["Nu er jeg her.", "time word first, verb second"],
          ["Jeg drikker ikke vand.", "ikke after the verb"]
        ]
      },
      {
        id: "a2-modals",
        level: "A2",
        title: "Modal verbs",
        lead: "Kan and skal have one short present, and the next verb stays a bare infinitive.",
        notes: [
          "Kan and skal do not take the usual present -r.",
          "Their short pasts are kunne and skulle.",
          "The verb after the modal does not take -r either."
        ],
        examples: [
          ["Jeg kan se solen.", "kan, then a bare infinitive"],
          ["Jeg skal komme.", "skal, and komme stays the infinitive"]
        ],
        table: {
          caption: "One modal form for every person",
          heads: ["", "kan", "skal"],
          rows: [
            ["jeg", "kan", "skal"],
            ["du", "kan", "skal"],
            ["hun", "kan", "skal"],
            ["vi", "kan", "skal"]
          ]
        }
      },
      {
        id: "a2-past-perfect",
        level: "A2",
        title: "Past and perfect",
        lead: "A regular past adds -ede or -te, and motion in the perfect uses er rather than har.",
        notes: [
          "Være, var, været and have, havde, haft do not take -ede.",
          "Gå, gik, gået, se, så, set, and komme, kom, kommet are learned as sets.",
          "Do not build gik from gå, and the spoken past of motion uses er, not har."
        ],
        examples: [
          ["Jeg er kommet.", "motion uses er"],
          ["Manden går.", "gå, and an irregular noun"]
        ],
        table: {
          caption: "Three forms to memorize",
          heads: ["verb", "past", "participle"],
          rows: [
            ["være", "var", "været"],
            ["have", "havde", "haft"],
            ["gå", "gik", "gået"],
            ["se", "så", "set"],
            ["komme", "kom", "kommet"]
          ]
        }
      },
      {
        id: "b1-definite-adjective",
        level: "B1",
        title: "The definite adjective",
        lead: "Adjectives agree with en, et, and the plural, and a definite noun pulls in an -e form.",
        notes: [
          "En lille dør and et lille hus show gender on the article more clearly than on lille.",
          "The plural of that adjective is små, as in små huse, and it will not fall out of lille.",
          "Pronouns still distinguish subject and object: jeg, mig."
        ],
        examples: [
          ["Huset er lille.", "neuter, suffix article"],
          ["en lille dør", "common gender before the adjective"]
        ],
        table: {
          caption: "Lille before the noun",
          heads: ["", "phrase"],
          rows: [
            ["common", "en lille dør"],
            ["neuter", "et lille hus"],
            ["definite neuter", "det lille hus"],
            ["plural", "små huse"]
          ]
        }
      },
      {
        id: "b1-sin",
        level: "B1",
        title: "Sin against hans or hendes",
        lead: "Sin points back to the subject of the same clause, and hans or hendes points to someone else.",
        notes: [
          "Sin agrees with the thing owned, not with the owner.",
          "Hans and hendes are used when the owner is not the subject.",
          "This is not a case ending, and the noun still has no case."
        ],
        examples: [
          ["Manden ser sin bil.", "sin, because the subject owns it"],
          ["Kvinden ser hans bil.", "hans, because someone else owns it"]
        ]
      },
      {
        id: "b2-subordinate-verb",
        level: "B2",
        title: "The verb steps back in a subordinate clause",
        lead: "A subordinate clause does not use verb-second in the same way, so ikke can stand before the verb.",
        notes: [
          "In a main clause the verb is second and ikke follows it.",
          "After at or fordi, the verb can follow ikke.",
          "A yes-no question is still a main clause, so it starts with the verb."
        ],
        examples: [
          ["Jeg ved, at han ikke kommer.", "ikke before the verb in the at-clause"],
          ["Han kommer ikke.", "main clause, ikke after the verb"]
        ]
      },
      {
        id: "b2-s-passive",
        level: "B2",
        title: "The -s passive",
        lead: "Danish can make a passive by adding -s, or by using blive plus a participle.",
        notes: [
          "The -s form does not add a person ending.",
          "Blive plus the participle is the other passive, and the old object becomes the subject.",
          "A strong participle such as set still has to be learned with se."
        ],
        examples: [
          ["Solen ses.", "the -s passive"],
          ["Solen bliver set.", "blive plus the participle set"]
        ]
      }
    ],
    cards: [
      {
        word: "være",
        gloss: "be",
        tag: "verb",
        forms: [
          ["present", "er"],
          ["past", "var"],
          ["participle", "været"],
          ["jeg", "er"]
        ]
      },
      {
        word: "have",
        gloss: "have",
        tag: "verb",
        forms: [
          ["present", "har"],
          ["past", "havde"],
          ["participle", "haft"],
          ["jeg", "har"]
        ]
      },
      {
        word: "gøre",
        gloss: "do",
        tag: "verb",
        forms: [
          ["present", "gør"],
          ["past", "gjorde"],
          ["participle", "gjort"],
          ["jeg", "gør"]
        ]
      },
      {
        word: "gå",
        gloss: "go",
        tag: "verb",
        forms: [
          ["present", "går"],
          ["past", "gik"],
          ["participle", "gået"],
          ["jeg", "går"]
        ]
      },
      {
        word: "se",
        gloss: "see",
        tag: "verb",
        forms: [
          ["present", "ser"],
          ["past", "så"],
          ["participle", "set"],
          ["jeg", "ser"]
        ]
      },
      {
        word: "komme",
        gloss: "come",
        tag: "verb",
        forms: [
          ["present", "kommer"],
          ["past", "kom"],
          ["participle", "kommet"],
          ["perfect", "er kommet"]
        ]
      },
      {
        word: "et barn",
        gloss: "a child",
        tag: "noun",
        forms: [
          ["singular", "et barn"],
          ["definite", "barnet"],
          ["plural", "børn"],
          ["definite plural", "børnene"]
        ]
      },
      {
        word: "en mand",
        gloss: "a man",
        tag: "noun",
        forms: [
          ["singular", "en mand"],
          ["definite", "manden"],
          ["plural", "mænd"],
          ["definite plural", "mændene"]
        ]
      }
    ]
  },
  is: {
    intro: "Icelandic keeps the verb second and marks three genders and four cases on the noun, with the article as a suffix.",
    lessons: [
      {
        id: "a1-gender-article",
        level: "A1",
        title: "Gender on the noun, article on the end",
        lead: "Gender is masculine, feminine, or neuter, and the definite article is a suffix on the noun.",
        notes: [
          "Learn the nominative and the article together.",
          "Vatnið, húsið, and barnið are neuter definites, and hurðin is feminine definite.",
          "Kona, konan and maður, maðurinn are the pairs to store first."
        ],
        examples: [
          ["Húsið er lítið.", "definite suffix"],
          ["Vatnið er kalt.", "neuter agreement"]
        ],
        table: {
          caption: "The article is a suffix",
          heads: ["noun", "definite"],
          rows: [
            ["hús", "húsið"],
            ["vatn", "vatnið"],
            ["barn", "barnið"],
            ["hurð", "hurðin"],
            ["maður", "maðurinn"]
          ]
        }
      },
      {
        id: "a1-verb-second",
        level: "A1",
        title: "Verb second",
        lead: "The verb is second, so a first word that is not the subject pushes the subject after the verb.",
        notes: [
          "Ég drekk vatn is subject, verb, object.",
          "Þú is the friend-form, and a question can start with the verb.",
          "Ekki follows the verb."
        ],
        examples: [
          ["Ég er hér.", "verb second"],
          ["Ég drekk vatn.", "the ending shows the person"]
        ]
      },
      {
        id: "a1-vera-hafa",
        level: "A1",
        title: "Vera and hafa",
        lead: "Vera and hafa will not follow a regular verb, so learn the persons as a list.",
        notes: [
          "Vera is er, ert, er, and erum.",
          "Hafa is hef, hefur, hefur, and höfum.",
          "The perfect uses hafa, except where a change of place uses vera."
        ],
        examples: [
          ["ég er · þú ert · hún er", "vera"],
          ["Ég sé sólina.", "sjá, not vera"]
        ],
        table: {
          caption: "Present",
          heads: ["", "vera", "hafa", "sjá"],
          rows: [
            ["ég", "er", "hef", "sé"],
            ["þú", "ert", "hefur", "sérð"],
            ["hún", "er", "hefur", "sér"],
            ["við", "erum", "höfum", "sjáum"]
          ]
        }
      },
      {
        id: "a2-nominative-accusative",
        level: "A2",
        title: "Nominative and accusative",
        lead: "Nominative is the subject, and the ordinary object is accusative.",
        notes: [
          "Ég sé sólina puts the object in the accusative, and the article stays on the noun.",
          "Some verbs ask for the dative, not the accusative.",
          "A neuter noun often uses one form for nominative and accusative, as hús does."
        ],
        examples: [
          ["Ég sé sólina.", "the object is accusative"],
          ["Ég drekk vatn.", "neuter vatn adds no accusative ending"]
        ]
      },
      {
        id: "a2-strong-weak-noun",
        level: "A2",
        title: "One strong noun and one weak noun",
        lead: "Maður is a strong noun you memorize whole, and kona is a weak feminine learned with its article.",
        notes: [
          "Maður's cases and its plural menn have to be memorized.",
          "Kona, konan, and the plural konur are the weak feminine set.",
          "A plural is not always -ar or -ir, and bækur is the plural of bók."
        ],
        examples: [
          ["Maðurinn gengur.", "maður plus the article, ganga"],
          ["Konan er hér.", "kona plus the article"]
        ]
      },
      {
        id: "a2-regular-past",
        level: "A2",
        title: "A regular past",
        lead: "A regular past adds a dental ending, while a strong verb changes the vowel and drops the singular person ending.",
        notes: [
          "Sjá, koma, and ganga are strong, so their pasts are not an ending on the present.",
          "Vera's past is var, varst, var, and vorum.",
          "Do not build the past of koma from the present."
        ],
        examples: [
          ["Ég var hér.", "past of vera"],
          ["Þú kemur til hússins.", "koma in the present, not the past"]
        ],
        table: {
          caption: "Past of vera",
          heads: ["", "vera"],
          rows: [
            ["ég", "var"],
            ["þú", "varst"],
            ["hún", "var"],
            ["við", "vorum"]
          ]
        }
      },
      {
        id: "b1-dative-st",
        level: "B1",
        title: "Dative subjects and -st",
        lead: "Some verbs put the person in the dative, and the middle ending -st is a voice of its own.",
        notes: [
          "A dative subject does not look like nominative ég, and the verb may stay in the third person.",
          "The -st ending is not a normal person ending.",
          "Learn -st as a form of its own, after the plain present is easy."
        ],
        examples: [
          ["Mér líkar brauðið.", "dative mér, verb with the thing liked"],
          ["Ég sé sólina.", "a plain accusative object, not that pattern"]
        ]
      },
      {
        id: "b1-adjectives-agree",
        level: "B1",
        title: "Adjectives agree",
        lead: "Adjectives agree in gender, number, and case, with a strong ending and a weak ending.",
        notes: [
          "The strong ending is used without an article, and the weak ending follows the definite noun.",
          "Húsið er lítið and vatnið er kalt show neuter agreement.",
          "Strong and weak endings look irregular until the case is known, and then they are regular."
        ],
        examples: [
          ["Húsið er lítið.", "neuter agreement"],
          ["Vatnið er kalt.", "kalt agrees with neuter vatnið"]
        ]
      },
      {
        id: "b2-four-cases",
        level: "B2",
        title: "Four cases in one sentence",
        lead: "Nominative, accusative, dative, and genitive are alive, and the article suffix changes with them.",
        notes: [
          "The genitive often appears after a preposition or in possession, as in hússins.",
          "Hús is hús, hús, húsi, and húss in the indefinite singular.",
          "U-shift changes a vowel when the ending has a u, so some forms look like another word."
        ],
        examples: [
          ["Þú kemur til hússins.", "genitive after til"],
          ["Ég gef þér lykilinn.", "dative þér, accusative lykilinn"]
        ],
        table: {
          caption: "hús, neuter",
          heads: ["case", "indefinite", "definite"],
          rows: [
            ["nominative", "hús", "húsið"],
            ["accusative", "hús", "húsið"],
            ["dative", "húsi", "húsinu"],
            ["genitive", "húss", "hússins"]
          ]
        }
      },
      {
        id: "b2-strong-verbs",
        level: "B2",
        title: "Strong verbs you memorise whole",
        lead: "Sjá, koma, and ganga are memorized as whole sets, because the present is not the infinitive plus an ending.",
        notes: [
          "Sjá's present is sé, sérð, sér, and sjáum, not a stem sjá- plus an ending.",
          "Koma is kem and kemur, and ganga is geng and gengur.",
          "Vera's participle is verið, and you do not build it from er."
        ],
        examples: [
          ["Ég sé sólina.", "sjá, first person"],
          ["Maðurinn gengur.", "ganga, with the article on maður"]
        ],
        table: {
          caption: "Present stems that are not the infinitive",
          heads: ["", "sjá", "koma", "ganga"],
          rows: [
            ["ég", "sé", "kem", "geng"],
            ["þú", "sérð", "kemur", "gengur"],
            ["við", "sjáum", "komum", "göngum"]
          ]
        }
      }
    ],
    cards: [
      {
        word: "vera",
        gloss: "be",
        tag: "verb",
        forms: [
          ["ég", "er"],
          ["þú", "ert"],
          ["hún", "er"],
          ["við", "erum"],
          ["past", "var"],
          ["participle", "verið"]
        ]
      },
      {
        word: "hafa",
        gloss: "have",
        tag: "verb",
        forms: [
          ["ég", "hef"],
          ["þú", "hefur"],
          ["hún", "hefur"],
          ["við", "höfum"]
        ]
      },
      {
        word: "sjá",
        gloss: "see",
        tag: "verb",
        forms: [
          ["ég", "sé"],
          ["þú", "sérð"],
          ["hún", "sér"],
          ["við", "sjáum"],
          ["past", "sá"]
        ]
      },
      {
        word: "koma",
        gloss: "come",
        tag: "verb",
        forms: [
          ["ég", "kem"],
          ["þú", "kemur"],
          ["við", "komum"],
          ["past", "kom"]
        ]
      },
      {
        word: "ganga",
        gloss: "walk",
        tag: "verb",
        forms: [
          ["ég", "geng"],
          ["þú", "gengur"],
          ["við", "göngum"],
          ["past", "gekk"]
        ]
      },
      {
        word: "maður",
        gloss: "man",
        tag: "noun",
        forms: [
          ["nominative", "maður"],
          ["accusative", "mann"],
          ["dative", "manni"],
          ["genitive", "manns"],
          ["plural", "menn"],
          ["definite", "maðurinn"]
        ]
      },
      {
        word: "barn",
        gloss: "child",
        tag: "noun",
        forms: [
          ["singular", "barn"],
          ["definite", "barnið"],
          ["plural", "börn"],
          ["definite plural", "börnin"]
        ]
      },
      {
        word: "hús",
        gloss: "house",
        tag: "noun",
        forms: [
          ["nominative", "hús"],
          ["definite", "húsið"],
          ["dative", "húsi"],
          ["definite dative", "húsinu"],
          ["genitive", "húss"],
          ["definite genitive", "hússins"]
        ]
      }
    ]
  }
};
