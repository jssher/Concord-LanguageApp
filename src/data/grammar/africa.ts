import type { GrammarChapter } from "./types";

/** Berber through Somali, in language-list order. Arabic already has a chapter. */
export const AFRICA: Record<string, GrammarChapter> = {
  ber: {
    rules: {
      summary: "The verb is built from a root, and the noun’s first vowel marks gender.",
      body: "These cards are Standard Moroccan Tamazight, in Tifinagh. The reading is the Latin spelling. ⵏⴽⴽⵉ ⴷⴰ. A masculine noun often starts with ⴰ. A feminine noun often starts with ⵜ and ends with ⵜ. The verb can precede the subject. There is no separate word for the.",
      points: [
        "ⴽⵢⵢⵉ is you, masculine, on the friend-form.",
        "A preposition puts the noun into the annexed state, and the first vowel changes.",
        "ⴰⵔ before the verb marks the imperfect, an action in progress.",
      ],
      samples: [
        ["ⵏⴽⴽⵉ ⴷⴰ.", "a nominal sentence"],
        ["ⴰⵔⴳⴰⵣ ⴰⵔ ⵉⵜⵜⴷⴷⵓ.", "ⴰⵔ plus the imperfect"],
      ],
    },
    verbs: {
      summary: "Person is a prefix, a suffix, or both. The aorist, perfect, and imperfect are three stems.",
      body: "ⵥⵕⵉⵖ is I see, or I saw, from the perfect of ⵥⵕ. ⵏⵛⵛⴰ is we eat. The aorist is the stem you meet after ⴰⴷ or in the imperative. The imperfect is the stem after ⴰⵔ. A few verbs, including ini, say, and af, find, do not keep a stable root across those stems.",
      points: [
        "ⵖ is I, on the perfect.",
        "ⵜ…ⴷ is you.",
        "ⵉ is he, ⵜ is she, on the perfect.",
      ],
      table: {
        caption: "Perfect of ⵥⵕ",
        heads: ["", "ⵥⵕ"],
        rows: [
          ["ⵏⴽⴽⵉ", "ⵥⵕⵉⵖ"],
          ["ⴽⵢⵢⵉ", "ⵜⵥⵕⵉⴷ"],
          ["ⵏⵜⵜⴰ", "ⵉⵥⵕⴰ"],
          ["ⵏⴽⴽⵏⵉ", "ⵏⵥⵕⴰ"],
        ],
      },
      samples: [
        ["ⵥⵕⵉⵖ ⵜⴰⴼⵓⴽⵜ.", "perfect, I"],
        ["ⵏⵛⵛⴰ ⴰⵖⵔⵓⵎ.", "we eat"],
      ],
    },
    nouns: {
      summary: "Gender is a frame around the stem. The annexed state is the other shape.",
      body: "ⴰⵔⴳⴰⵣ is a man. ⵜⴰⵎⵖⴰⵔⵜ is a woman. ⴰⵅⵅⴰⵎ is a house. ⴰⵎⴰⵏ is water and is plural in shape. After a preposition the free state becomes the annexed state: ⵖⵔ ⵓⵅⵅⴰⵎ. The plural changes the vowels or adds a suffix, and many plurals are learned as pairs.",
      points: [
        "Feminine ⵜ…ⵜ.",
        "Learn free state and annexed state together.",
        "An adjective follows and agrees in gender.",
      ],
      samples: [
        ["ⴰⵅⵅⴰⵎ ⵉⵎⵥⵥⵉ.", "adjective after the noun"],
        ["ⵜⴰⵡⵡⵓⵔⵜ ⵜⴻⵔⵣⵎ.", "feminine noun"],
      ],
    },
    odd: {
      summary: "Ini, af, and the verbs whose perfect does not look like the aorist.",
      body: "A root with a weak consonant will drop it in one of the three stems. The plural of a noun is the other list: it may change the vowels inside the word rather than add a tidy ending. Do not build the annexed state by a rule you have not checked. ⵓⵅⵅⴰⵎ is the annexed shape of ⴰⵅⵅⴰⵎ.",
      points: [
        "Do not treat the three stems as one stem plus an ending.",
        "ⴰⵎⴰⵏ has no singular in ordinary use.",
        "Dialects differ. These cards stay with the standard written form.",
      ],
      samples: [
        ["ⵖⵔ ⵓⵅⵅⴰⵎ", "annexed state after ⵖⵔ"],
        ["ⴰⵔ ⵉⵜⵜⴷⴷⵓ", "imperfect, not the perfect"],
      ],
    },
  },
  he: {
    rules: {
      summary: "The article is ה־. A pattern of vowels around the root builds the word.",
      body: "These cards mark vowels for learners. אֲנִי כָּאן. אַתָּה is you, masculine. אַתְּ is feminine. Verbs belong to a binyan, a pattern. Nouns are masculine or feminine. אֶת marks a definite object. אֵין is the no of possession and of a present participle.",
      points: [
        "The adjective follows and agrees.",
        "The present is often the participle, and it agrees in gender.",
        "Right to left.",
      ],
      samples: [
        ["אֲנִי כָּאן.", "no verb of be required"],
        ["אֲנִי רוֹאֶה אֶת הַשֶּׁמֶשׁ.", "participle, אֶת, article"],
      ],
    },
    verbs: {
      summary: "A past with suffixes, and a present participle that agrees.",
      body: "כָּתַבְתִּי, כָּתַבְתָּ, כָּתַב is the past of a regular pa'al verb. The present is כּוֹתֵב, כּוֹתֶבֶת. רָאָה’s participle is רוֹאֶה. הָיָה is irregular. אָכַל’s participle is אוֹכֵל. Each binyan has its own vowels. Start with pa'al.",
      points: [
        "Gender appears on the participle and on some past endings.",
        "The future uses prefixes: אֶרְאֶה.",
        "A weak root loses a letter.",
      ],
      table: {
        caption: "Past of a sound pa'al verb, and the present participle",
        heads: ["", "past", "present"],
        rows: [
          ["אֲנִי", "כָּתַבְתִּי", "כּוֹתֵב"],
          ["אַתָּה", "כָּתַבְתָּ", "כּוֹתֵב"],
          ["הִיא", "כָּתְבָה", "כּוֹתֶבֶת"],
          ["אֲנַחְנוּ", "כָּתַבְנוּ", "כּוֹתְבִים"],
        ],
      },
      samples: [
        ["אֲנַחְנוּ אוֹכְלִים לֶחֶם.", "plural participle"],
        ["אַתָּה בָּא אֶל הַבַּיִת.", "בָּא, participle of בָּא"],
      ],
    },
    nouns: {
      summary: "No case. A construct chain replaces of.",
      body: "בַּיִת, הַבַּיִת. מַיִם is plural. הַמַּיִם קָרִים, the adjective is plural. Possession can be a suffix, סִפְרוֹ, or a construct: סֵפֶר הַתַּלְמִיד. Plurals are ־ים or ־וֹת, and many common nouns are irregular. יֶלֶד, יְלָדִים.",
      points: [
        "Learn singular and plural together.",
        "Feminine is often ־ָה or ־ֶת.",
        "The construct of בַּיִת is בֵּית.",
      ],
      samples: [
        ["הַבַּיִת קָטָן.", "article ה־"],
        ["הַדֶּלֶת פְּתוּחָה.", "feminine agreement"],
      ],
    },
    odd: {
      summary: "הָיָה, נָתַן, לָקַח, and the hollow and weak roots.",
      body: "הָיָה’s past is הָיִיתִי, and its present is left out: אֲנִי כָּאן. נָתַן and לָקַח lose a letter. A hollow verb such as בָּא keeps a vowel where the middle root letter disappeared. Broken-looking plurals, אִישׁ, אֲנָשִׁים and בַּיִת, בָּתִּים, are a list.",
      points: [
        "Do not build the present of רָאָה as a past plus an ending. Use רוֹאֶה.",
        "אֵין is not לֹא.",
        "The feminine אַתְּ and הִיא take different verb shapes from אַתָּה and הוּא.",
      ],
      samples: [
        ["רוֹאֶה · רוֹאָה", "the participle agrees"],
        ["הָיִיתִי", "past of הָיָה, not a regular pa'al vowel"],
      ],
    },
  },
  am: {
    rules: {
      summary: "The verb closes the sentence and agrees with a prefix and a suffix together.",
      body: "እኔ እዚህ ነኝ። አንተ is you, masculine. አንቺ is feminine. Nouns do not take Arabic case vowels. A definite suffix and a postposition do that work. The script is Geʽez. The reading is there until the letters are familiar.",
      points: [
        "ነኝ, ነህ, ናት, ነን.",
        "The verb agrees with the subject.",
        "An object suffix can sit on the verb.",
      ],
      samples: [
        ["እኔ እዚህ ነኝ።", "ነኝ"],
        ["ሴቲቱ እዚህ ናት።", "definite -ቱ, feminine ናት"],
      ],
    },
    verbs: {
      summary: "A root plus a pattern. The negative is a prefix.",
      body: "አያለሁ is a present of ማየት, I see. እንበላለን is we eat. ትመጣለህ is you come. The citation form is the infinitive in መ-. አለ and ነው are the two verbs for be, and they do not follow ማየት. The negative prefix አል- replaces a separate word in front of an unchanged verb.",
      points: [
        "Learn I, you, and he or she before a full chart.",
        "A relative verb is a different shape. It can wait.",
        "The gerundive is the past you meet in narration.",
      ],
      table: {
        caption: "ነው, be",
        heads: ["", "present"],
        rows: [
          ["እኔ", "ነኝ"],
          ["አንተ", "ነህ"],
          ["እሷ", "ናት"],
          ["እኛ", "ነን"],
        ],
      },
      samples: [
        ["ፀሐይን አያለሁ።", "ማየት"],
        ["ዳቦ እንበላለን።", "መብላት"],
      ],
    },
    nouns: {
      summary: "A definite suffix, and postpositions. Gender shows on people.",
      body: "ቤት, ቤቱ. ውሃ, ውሃው. ልጅ, ልጁ. The definite -u or -wa is the article. በር is door. There is no three-vowel case. Place and object are postpositions or suffixes. The plural is often -ኦች, and some nouns change the stem.",
      points: [
        "Learn the noun with and without the definite suffix.",
        "An adjective can take the article instead of the noun.",
        "Gender is not marked on every thing.",
      ],
      samples: [
        ["ቤቱ ትንሽ ነው።", "definite, ነው"],
        ["ውሃው ቀዝቃዛ ነው።", "definite on ውሃ"],
      ],
    },
    odd: {
      summary: "ነው, አለ, and the verbs whose root is not three tidy consonants.",
      body: "ነኝ does not look like አያለሁ. አለ, there is, has its own agreement. A root with a weak consonant will not show all of its letters in every form. The plural of a very common noun is safer learned as a pair. Do not force every verb into the ማየት pattern.",
      points: [
        "አል- is the negative prefix.",
        "The object suffix changes with who is affected.",
        "Geʽez spelling is the authority on the card.",
      ],
      samples: [
        ["ነኝ · ነህ · ናት", "ነው"],
        ["ወደ ቤት ትመጣለህ።", "መምጣት"],
      ],
    },
  },
  arc: {
    rules: {
      summary: "Classical Syriac. The state of the noun does the work of the article.",
      body: "These cards are the literary Aramaic still read in church and study, written in Syriac. ܐܢܐ ܗܪܟܐ ܐܝܬܝ. ܐܝܬܝ is I am. The emphatic state is the ordinary definite noun. Verbs are built on a root, with a suffix in the past and a prefix in the present.",
      points: [
        "Right to left.",
        "ܐܢܬ is you, masculine.",
        "An adjective follows and agrees in gender and state.",
      ],
      samples: [
        ["ܐܢܐ ܗܪܟܐ ܐܝܬܝ.", "ܐܝܬܝ"],
        ["ܒܝܬܐ ܙܥܘܪܐ ܐܝܬܘܗܝ.", "emphatic state, ܐܝܬܘܗܝ"],
      ],
    },
    verbs: {
      summary: "Suffixes in the perfect. Prefixes in the imperfect.",
      body: "ܚܙܐ ܐܢܐ is I see, written as a participle plus the pronoun on the card. A sound verb in the perfect adds ת suffixes: ܟܬܒܬ, I wrote. The imperfect uses a prefix: ܐܟܬܘܒ. ܗܘܐ, be, is irregular. A weak final ܐ changes the ending.",
      points: [
        "Learn the third person singular first. Dictionaries cite it.",
        "The participle plus ܐܢܐ is a present.",
        "Derived stems, the pael and the afel, change the meaning in a reusable way.",
      ],
      table: {
        caption: "ܐܝܬ, be, in the present",
        heads: ["", "form"],
        rows: [
          ["ܐܢܐ", "ܐܝܬܝ"],
          ["ܐܢܬ", "ܐܝܬܝܟ"],
          ["ܗܘ", "ܐܝܬܘܗܝ"],
          ["ܚܢܢ", "ܐܝܬܝܢ"],
        ],
      },
      samples: [
        ["ܚܙܐ ܐܢܐ ܫܡܫܐ.", "participle plus pronoun"],
        ["ܐܟܠܝܢܢ ܠܚܡܐ.", "we eat"],
      ],
    },
    nouns: {
      summary: "Absolute, emphatic, and construct. That is the declension.",
      body: "The emphatic is the form you meet first: ܒܝܬܐ, ܓܒܪܐ, ܐܢܬܬܐ, ܡܝܐ, ܬܪܥܐ. The construct is the first noun of a possession chain. The absolute appears in predicates and after numbers. Older case endings are not the system you need first. ܡܝܐ is plural in shape.",
      points: [
        "Feminine emphatic often ends in ܐ after ܬ.",
        "The plural emphatic is its own ending.",
        "A preposition can fuse with a pronoun.",
      ],
      samples: [
        ["ܓܒܪܐ ܡܗܠܟ.", "emphatic ܓܒܪܐ"],
        ["ܬܪܥܐ ܦܬܝܚ ܐܝܬܘܗܝ.", "predicate adjective"],
      ],
    },
    odd: {
      summary: "ܗܘܐ, and every verb whose last letter is weak.",
      body: "ܗܘܐ does not follow ܟܬܒ. A final ܐ or ܝ drops or changes the suffix. Hollow verbs lose the middle letter. ܐܙܠ, go, and ܐܬܐ, come, are learned as their own sets. The emphatic plural of a common noun is safer as a pair than as a rule.",
      points: [
        "Do not force a weak verb into the sound table.",
        "ܐܝܬܘܗܝ is not a regular perfect of ܗܘܐ.",
        "East and West Syriac pronounce the same letters differently. The letters on the card stay.",
      ],
      samples: [
        ["ܐܝܬܝ · ܐܝܬܘܗܝ", "be"],
        ["ܛܠܝܐ ܕܡܝܟ.", "emphatic noun, participle"],
      ],
    },
  },
  hy: {
    rules: {
      summary: "Eastern Armenian. The definite article is a suffix, and the verb closes the sentence.",
      body: "Ես այստեղ եմ։ Դու is the friend-form. Դուք is polite. There is no gender. The definite suffix is -ը after a consonant and -ն after a vowel. Չ before the verb is the simple no. A specific object can take -ին.",
      points: [
        "Եմ, ես, է, ենք, եք, են.",
        "The present of a normal verb is a participle plus եմ.",
        "Postpositions and case suffixes follow the noun.",
      ],
      samples: [
        ["Ես այստեղ եմ։", "եմ"],
        ["Կինն այստեղ է։", "definite -ն"],
      ],
    },
    verbs: {
      summary: "A participle plus եմ. Գալ, տալ, and ուտել are irregular.",
      body: "Տեսնում եմ is I see. Ուտում ենք is we eat. Գալիս ես is you come. The infinitive is the citation form. The aorist stem of գալ, տալ, and լինել does not match the present participle. Լինել is the infinitive of եմ.",
      points: [
        "Չեմ տեսնում is the negative, with չ on the helper.",
        "The future often uses կ plus a form.",
        "Անցյալ, the past, of եմ is էի.",
      ],
      table: {
        caption: "եմ",
        heads: ["", "present"],
        rows: [
          ["ես", "եմ"],
          ["դու", "ես"],
          ["նա", "է"],
          ["մենք", "ենք"],
        ],
      },
      samples: [
        ["Ես արևն եմ տեսնում։", "participle plus եմ"],
        ["Մենք հաց ենք ուտում։", "ուտել"],
      ],
    },
    nouns: {
      summary: "Case suffixes, and a definite article that is also a suffix.",
      body: "Տուն, տունը. Ջուր, ջուրը. Դուռ, դուռը. Nominative, genitive, dative, accusative, ablative, instrumental, and locative. The genitive and dative often share a form. Plural -եր or -ներ comes before the case ending. There is no gender to agree.",
      points: [
        "Learn the genitive with the noun. It is not always a tidy suffix on the nominative.",
        "Երեխան is երեխա plus -ն.",
        "An adjective before the noun does not decline when the noun carries the case.",
      ],
      samples: [
        ["Տունը փոքր է։", "definite, է"],
        ["Ջուրը սառն է։", "definite on ջուր"],
      ],
    },
    odd: {
      summary: "Եմ, գնալ, գալ, տալ, and ուտել.",
      body: "Եմ has no participle in the present. Գնացի is I went, from գնալ. Եկա is I came, from գալ. Տվի is I gave. Կերա is I ate. Those aorists are the irregular list. A genitive such as մարդ, մարդու is the noun side of the same problem.",
      points: [
        "Do not build եկա from գալիս.",
        "Չկա is there-is-not, and it is its own word.",
        "The article -ն and the case ending can sit together. Learn the spoken order from the card.",
      ],
      samples: [
        ["եմ · ես · է", "the irregular copula"],
        ["Դու գալիս ես տուն։", "գալ"],
      ],
    },
  },
  ka: {
    rules: {
      summary: "The verb agrees with more than the subject. Mkhedruli has no capitals.",
      body: "მე აქ ვარ. შენ is the friend-form. თქვენ is polite. The reading under a word is a letter-by-letter guide. A verb can mark the subject and the object at once. In the aorist of a transitive verb, the subject stands in the ergative. The present on these cards is simpler: nominative subject, verb at the end.",
      points: [
        "ვარ, ხარ, არის, ვართ.",
        "No grammatical gender.",
        "A preverb on the verb can mark direction or completion.",
      ],
      samples: [
        ["მე აქ ვარ.", "ვარ"],
        ["მე მზეს ვხედავ.", "object, then the verb"],
      ],
    },
    verbs: {
      summary: "A screeve, not a single tense ending. ვარ is irregular.",
      body: "ვხედავ is I see. ვჭამთ is we eat. მოდიხარ is you come. The present screeve uses a prefix ვ for I and a suffix for the other persons. The aorist is a different screeve, and many common verbs change the stem. ყოფნა is the infinitive of ვარ, and it does not look like ვარ.",
      points: [
        "Learn the present of one verb before the aorist.",
        "The version vowel in the middle of the verb can mean whose benefit the action is for.",
        "Negation is არ before the verb.",
      ],
      table: {
        caption: "ვარ",
        heads: ["", "present"],
        rows: [
          ["მე", "ვარ"],
          ["შენ", "ხარ"],
          ["ის", "არის"],
          ["ჩვენ", "ვართ"],
        ],
      },
      samples: [
        ["ჩვენ პურს ვჭამთ.", "ჭამა"],
        ["შენ სახლში მოდიხარ.", "მოსვლა"],
      ],
    },
    nouns: {
      summary: "Case suffixes. No gender.",
      body: "სახლი, სახლში. Nominative -ი, dative -ს, ergative -მა, genitive -ის. წყალი and კარი take the same cases. The dative marks an object in the present: მზეს, პურს. The plural -ებ comes before the case. There is no article.",
      points: [
        "The ergative is the case of a transitive subject in the aorist.",
        "Postpositions follow a case form.",
        "An adjective before the noun can take the case instead, in some styles. Start with the case on the noun.",
      ],
      samples: [
        ["სახლი პატარაა.", "nominative, a copula ending on the adjective"],
        ["კარი ღიაა.", "the same pattern"],
      ],
    },
    odd: {
      summary: "ვარ, and the verbs that change class between screeves.",
      body: "ხარ and არის do not share a stem with ვარ. სძინავს, as in ბავშვს სძინავს, is an indirect verb: the sleeper is in the dative. Those verbs are the irregular class. A preverb such as მო- in მოდიხარ is part of the verb, not a separate word you can drop.",
      points: [
        "Do not build არის from ვარ.",
        "Do not leave the preverb off.",
        "The aorist subject of a transitive verb is ergative. The present subject is not.",
      ],
      samples: [
        ["ვარ · ხარ · არის", "ყოფნა in the present"],
        ["ბავშვს სძინავს.", "dative subject"],
      ],
    },
  },
  sw: {
    rules: {
      summary: "The noun class prefix is part of the word, and the verb agrees with it.",
      body: "Mimi niko hapa. Mtu is a person, watu is people. Kitabu, vitabu. The verb starts with a subject prefix that matches the class. Ninaona jua. Hakuna and si are not the same no. These cards use standard Swahili.",
      points: [
        "Ni is the copula for identity: wewe ni rafiki yangu.",
        "Niko, yuko, tuko are be-at-a-place.",
        "The adjective takes the class prefix too.",
      ],
      samples: [
        ["Mimi niko hapa.", "locative -ko"],
        ["Mwanamume anatembea.", "class 1 subject prefix a-"],
      ],
    },
    verbs: {
      summary: "Subject prefix, tense marker, then the stem. Kuwa is irregular.",
      body: "Ni- is I, u- is you, a- is he or she, tu- is we. -na- is the present. -li- is the past. -ta- is the future. Ninaona, niliona, nitaona. Kuwa is be. Negation changes both the prefix and the tense vowel: sioni, not ni- plus a separate word.",
      points: [
        "Kuona, kula, and kuja drop ku- in many finite forms.",
        "The infinitive ku- is the citation form.",
        "An object marker can sit between the tense and the stem.",
      ],
      table: {
        caption: "ona",
        heads: ["", "present", "past", "negative present"],
        rows: [
          ["mimi", "ninaona", "niliona", "sioni"],
          ["wewe", "unaona", "uliona", "huoni"],
          ["yeye", "anaona", "aliona", "haoni"],
          ["sisi", "tunaona", "tuliona", "hatuoni"],
        ],
      },
      samples: [
        ["Ninaona jua.", "present"],
        ["Tunakula mkate.", "kula"],
      ],
    },
    nouns: {
      summary: "Classes, not masculine and feminine. The plural prefix is the declension.",
      body: "Learn every noun as a singular and plural pair. People are class 1/2, m-/wa-. Many trees are m-/mi-. Things are often ki-/vi-. Class 9/10, nyumba, mlango, often looks the same in both numbers, and the agreement shows the plural. Maji is class 6 and has no singular in ordinary use.",
      points: [
        "Nyumba ni ndogo. Ni plus an adjective without a class prefix is the pattern on this card.",
        "Niko uses the locative class.",
        "Possessives agree: yangu, wako.",
      ],
      samples: [
        ["Nyumba ni ndogo.", "class 9"],
        ["Mtoto analala.", "class 1, m-"],
      ],
    },
    odd: {
      summary: "Kuwa, kwenda, kuja, and the class 9/10 agreements.",
      body: "Kuwa’s present is ni or niko, not ninawa. Nenda and njoo are the imperatives. Kwenda becomes naenda, with the infinitive vowel changed. Class 9/10 adjectives and the verbs that agree with them are the other list. Do not invent a masculine ending.",
      points: [
        "Si and sio negate ni.",
        "Sioni is not ninaona ala.",
        "A locative suffix -ni on a noun is a class of its own.",
      ],
      samples: [
        ["niko · yuko", "kuwa in a place"],
        ["Unakuja nyumbani.", "kuja, locative -ni"],
      ],
    },
  },
  ln: {
    rules: {
      summary: "A subject prefix on the verb, and a noun class on the noun.",
      body: "These cards are Kinshasa Lingala. Accents mark the tone, and they belong to the word. Ngáí nazalí áwa. Yo ozalí. The prefix na- is I, o- is you, a- is he or she. The infinitive starts with ko-. There is no masculine and feminine in the European sense.",
      points: [
        "Zalí is be.",
        "The tone mark is not optional.",
        "A class prefix such as mo- or e- is part of the noun.",
      ],
      samples: [
        ["Ngáí nazalí áwa.", "na- plus zalí"],
        ["Mobáli atámboli.", "a- for a person"],
      ],
    },
    verbs: {
      summary: "Prefix plus stem. Kozala is the irregular helper.",
      body: "Namɔ́ni is I see. Tolíí is we eat. Oyáí is you come. The infinitives are komɔ́nɔ, kolíya, koyá. The present of many verbs is the prefix plus a stem that already includes an aspect vowel. Negation is tɛ́ after the verb in Kinshasa speech, not a European not in front.",
      points: [
        "Na-, o-, a-, to-, bo-, ba-.",
        "Ko- is the infinitive, and it drops in the finite form.",
        "Learn the tone with the stem.",
      ],
      table: {
        caption: "kozala",
        heads: ["", "present"],
        rows: [
          ["ngáí", "nazalí"],
          ["yo", "ozalí"],
          ["ye", "azalí"],
          ["bíso", "tozalí"],
        ],
      },
      samples: [
        ["Namɔ́ni mɔ́i.", "komɔ́nɔ"],
        ["Tolíí límpa.", "kolíya"],
      ],
    },
    nouns: {
      summary: "Classes. The prefix changes for the plural.",
      body: "Mobáli, mwǎsí, mwǎna, ndáko, ekuke, mái. Mo- nouns of people often pluralize with ba-. E- and li- classes have their own plurals. Mái is a liquid and stays in a plural-looking class. There is no case ending. Place is a preposition, na.",
      points: [
        "Learn singular and plural as a pair.",
        "The adjective can take a prefix that matches the noun.",
        "Do not drop the tone when you copy a word.",
      ],
      samples: [
        ["Ndáko ezalí mokɛ́.", "class agreement on ezalí"],
        ["Ekuke efungámí.", "e- class"],
      ],
    },
    odd: {
      summary: "Kozala, koyá, and kokende.",
      body: "Nazalí is not na- plus a regular stem you can see in the infinitive without a change. Koyá and kokende shorten in the finite forms. Tone pairs that look like the same letters are different words. The plural ba- on a person is regular, and a class 5 or 7 plural is the one to memorize.",
      points: [
        "Do not treat tɛ́ as a prefix.",
        "Dialects differ. These cards stay with Kinshasa forms.",
        "A missing accent is a different word.",
      ],
      samples: [
        ["nazalí · ozalí · azalí", "kozala"],
        ["Oyáí na ndáko.", "koyá"],
      ],
    },
  },
  ig: {
    rules: {
      summary: "The pronoun carries the person. Tone and the underdot carry the word.",
      body: "M nọ ebe a. Ị is you. Ọ is he or she. The verb does not take a European person ending. Na- before the verb marks an action in progress. The underdots in ụ and ọ change the vowel. Tone can change the word, and these cards mark what the spelling can mark.",
      points: [
        "Bụ is be for identity.",
        "Nọ is be in a place.",
        "Adị is be for a quality.",
      ],
      samples: [
        ["M nọ ebe a.", "nọ"],
        ["Ị bụ enyi m.", "bụ"],
      ],
    },
    verbs: {
      summary: "No conjugation table. Na- and a pronoun do the work.",
      body: "M na-ahụ anyanwụ. Anyị na-eri achịcha. Ị na-abịa n'ụlọ. Ahụ, eri, and bịa do not change for person. The negative is often aghị after the verb, or an auxiliary, not a new stem. A few verbs have a past that changes the vowel. Learn that pair when the card shows it.",
      points: [
        "M, ị, ọ, anyị.",
        "The infinitive is often the same shape as the verb.",
        "Do not add -s.",
      ],
      table: {
        caption: "The pronoun changes. The verb does not.",
        heads: ["", "nọ", "bụ"],
        rows: [
          ["m", "nọ", "bụ"],
          ["ị", "nọ", "bụ"],
          ["ọ", "nọ", "bụ"],
          ["anyị", "nọ", "bụ"],
        ],
      },
      samples: [
        ["M na-ahụ anyanwụ.", "na- plus hụ"],
        ["Anyị na-eri achịcha.", "ri"],
      ],
    },
    nouns: {
      summary: "No case and no gender ending. The plural is often a separate word.",
      body: "Ụlọ, mmiri, nwoke, nwanyị, nwa, ọnụ ụzọ. Ndị before a noun can mark a plural of people. There is no article. N' or na is in or to, and it hooks onto the next word. Possession is a pronoun after the noun: enyi m.",
      points: [
        "Underdots stay.",
        "Nwoke and nwanyị are the gender you need, and it is lexical.",
        "A verb in the infinitive can start with i-.",
      ],
      samples: [
        ["Ụlọ dị obere.", "dị"],
        ["Ọnụ ụzọ meghere.", "a verb used as a predicate"],
      ],
    },
    odd: {
      summary: "Bụ, nọ, and dị, plus the tone pairs.",
      body: "These three verbs for be are not interchangeable. Tone is the irregularity that spelling only partly shows: the same letters with a different tone can be a different word. A past that changes a vowel, such as meghere, is learned as a pair with the simple verb. Do not invent a person ending.",
      points: [
        "Do not swap bụ and nọ.",
        "Na- is not a past.",
        "The underdot is a different vowel.",
      ],
      samples: [
        ["bụ · nọ · dị", "three verbs for be"],
        ["Ị na-abịa n'ụlọ.", "bịa"],
      ],
    },
  },
  yo: {
    rules: {
      summary: "Tones and underdots are part of the spelling. The pronoun carries the person.",
      body: "Mo wà níbí. Ìwọ is you. The verb does not change for person. Ń before a verb marks an action in progress. Wà is be in a place. Jẹ́ or ni is be for identity. A low or high tone changes the word.",
      points: [
        "Mo, o, ó, a.",
        "Modifiers usually follow the noun.",
        "Kò or kì í is the no, and it sits before the verb.",
      ],
      samples: [
        ["Mo wà níbí.", "wà"],
        ["Ìwọ ni ọ̀rẹ́ mi.", "ni"],
      ],
    },
    verbs: {
      summary: "Nothing to conjugate. Ń, ti, and yóò mark time.",
      body: "Mo rí òòrùn. A ń jẹ búréèdì. Ìwọ ń wá sílé. Rí, jẹ, and wá stay as they are. Ti marks a completed action. Yóò marks a later one. There is no irregular stem in the European sense, because there is no stem change for person.",
      points: [
        "Do not add an ending for she.",
        "The negative kò replaces ń in a simple present no.",
        "A split verb can put the object in the middle. Learn those as phrases.",
      ],
      table: {
        caption: "Time is a particle",
        heads: ["mark", "example", "job"],
        rows: [
          ["plain", "mo rí", "the action"],
          ["ń", "ó ń rìn", "in progress"],
          ["ti", "mo ti rí", "already"],
          ["kò", "kò rí", "not"],
        ],
      },
      samples: [
        ["Mo rí òòrùn.", "rí"],
        ["Ọkùnrin ń rìn.", "ń"],
      ],
    },
    nouns: {
      summary: "No case and no article. Tone is the marking you cannot skip.",
      body: "Ilé, omi, ọkùnrin, obìnrin, ọmọ, ìlẹ̀kùn. Àwọn marks a plural when you need it. Sí is to, ní is at, and they do not change the noun. Possession can be a noun after the possessed noun. The underdot in ọ and ẹ is a different vowel.",
      points: [
        "Keep the tone marks.",
        "There is no gender agreement on the verb.",
        "A noun can become a verb by its place in the sentence.",
      ],
      samples: [
        ["Ilé kéré.", "no copula required"],
        ["Omi tútù.", "adjective after the noun"],
      ],
    },
    odd: {
      summary: "Wà, jẹ́, and ní, and the tone pairs.",
      body: "Wà, jẹ́, and ní are not one verb. Tone is what makes ilé different from a word with the same letters and another melody. A verb that splits around its object will look irregular if you expect a single word. Learn the phrase. Do not add a plural ending to the verb.",
      points: [
        "Do not drop a tone mark.",
        "Kò and kì í are not the same in every tense.",
        "The underdot stays.",
      ],
      samples: [
        ["wà · ni", "place, and identity"],
        ["A ń jẹ búréèdì.", "jẹ"],
      ],
    },
  },
  ha: {
    rules: {
      summary: "Boko spelling. The verb agrees in person and in gender.",
      body: "Ina nan. Kai is you, masculine. Ke is you, feminine. Yana and tana are the two third persons. Ne and ce are the copula, and they agree. There is no article. A continuous action uses the na or ke form.",
      points: [
        "Learn the gender with a person and with many nouns.",
        "The hook letters ɓ, ɗ, and ƙ are different consonants.",
        "Ba … ba wraps a negation.",
      ],
      samples: [
        ["Ina nan.", "first person continuous of be"],
        ["Kai abokina ne.", "masculine ne"],
      ],
    },
    verbs: {
      summary: "A person-aspect pronoun, then the verb. Grades change the ending.",
      body: "Ina ganin rana. Muna cin burodi. Kana zuwa gida. The pronoun ina, kana, tana already carries I-am, you-are, she-is. Gani, ci, and zo take a weak ending before an object. Hausa verbs sit in grades. A grade ending such as -ar or -o changes the meaning in a reusable way.",
      points: [
        "Na is a completed I. Ina is an incomplete I.",
        "The feminine completed pronoun is ta.",
        "Zo and je are come and go, and they are short.",
      ],
      table: {
        caption: "The incomplete pronouns",
        heads: ["", "incomplete", "completed"],
        rows: [
          ["I", "ina", "na"],
          ["you, masc.", "kana", "ka"],
          ["he", "yana", "ya"],
          ["she", "tana", "ta"],
        ],
      },
      samples: [
        ["Ina ganin rana.", "gani"],
        ["Muna cin burodi.", "ci"],
      ],
    },
    nouns: {
      summary: "Two genders, and a plural you usually cannot guess.",
      body: "Gida, ruwa, namiji, mace, yaro, kofa. Many plurals change the end of the word or use a suffix such as -ai or -uwa. Learn the pair. The linker -n or -r agrees with gender: abokina. Place is a preposition, a or zuwa, not a case ending.",
      points: [
        "Mace takes ce. Namiji takes ne.",
        "Ruwa is treated as a mass.",
        "An adjective follows the noun.",
      ],
      samples: [
        ["Gida yana da ƙanƙanta.", "yana da, have"],
        ["Kofa tana buɗe.", "feminine tana"],
      ],
    },
    odd: {
      summary: "Zo, ci, gani, and the plurals.",
      body: "Zo does not take a regular grade ending in the basic sentence. Ci shortens before an object: cin. Gani becomes ganin in the continuous. Plurals such as yara for yaro are a list. Ne and ce are not optional decoration. They agree.",
      points: [
        "Do not use ne with a feminine noun.",
        "Ba … ba is the frame of the no.",
        "A grade you have not learned is not a tense. It changes the verb’s meaning.",
      ],
      samples: [
        ["ne · ce", "the two copulas"],
        ["Kana zuwa gida.", "zo"],
      ],
    },
  },
  ff: {
    rules: {
      summary: "Noun classes, and a subject pronoun that already carries the verb of be.",
      body: "These cards are Fulfulde in Latin letters. Dialects differ. Miɗo ɗoo. Aan is you. The hooked letters ɓ, ɗ, and ƴ change the sound. A noun class shows up as a suffix on the noun and as agreement on the adjective and the verb. There is no masculine and feminine of the European kind, though people are in a person class.",
      points: [
        "Miɗo, aɗa, omo are the incomplete subject pronouns.",
        "The infinitive often ends in -go.",
        "Learn the class suffix with the noun.",
      ],
      samples: [
        ["Miɗo ɗoo.", "I am here"],
        ["Gorko ena yaha.", "a person-class noun, a verb"],
      ],
    },
    verbs: {
      summary: "The pronoun is conjugated. The verb stem is comparatively stable.",
      body: "Nyaamgo is eat. En nyaaman buuru. Arugo is come. A arata haa suudu. The ending on the stem marks aspect or voice more than person. Person sits on the pronoun. A few verbs, including wonude, be, have a short form that does not look like the infinitive.",
      points: [
        "Do not look for an -s.",
        "The negative pronoun is a different series.",
        "Voice suffixes, the middle and the passive, can wait until the active sentence is easy.",
      ],
      table: {
        caption: "Incomplete subject pronouns",
        heads: ["", "form"],
        rows: [
          ["min", "miɗo"],
          ["aan", "aɗa"],
          ["kanko", "omo / ena"],
          ["en", "eɗen"],
        ],
      },
      samples: [
        ["En nyaaman buuru.", "nyaamgo"],
        ["A arata haa suudu.", "arugo"],
      ],
    },
    nouns: {
      summary: "The class suffix is the declension.",
      body: "Gorko is a man, the -ko of the person class. Debbo is a woman. Suudu is a house, another class. Cukalel is a child. Damal is a door. Ndiyam is water. The plural is often a different class, not an -s. Learn singular class and plural class together.",
      points: [
        "Haa marks a direction.",
        "An adjective takes a matching class suffix.",
        "Dialects use different class pairings. Trust this card.",
      ],
      samples: [
        ["Suudu famɗi.", "a class noun plus a quality"],
        ["Damal ena udditii.", "class agreement on the verb"],
      ],
    },
    odd: {
      summary: "Wonude, and the class plurals.",
      body: "The verb for be is irregular because the pronoun series is the conjugation. A plural that jumps to another class will look like a different word. That is the system, and it still has to be memorized pair by pair. Do not import a French or English plural.",
      points: [
        "Hooked letters are not optional.",
        "Do not treat every -go word as a finite verb.",
        "If a dialect form and the card disagree, the card wins for this course.",
      ],
      samples: [
        ["miɗo ɗoo", "be, inside the pronoun"],
        ["Cukalel ena ɗaana.", "ɗaanude"],
      ],
    },
  },
  so: {
    rules: {
      summary: "Focus particles, and a verb that agrees with the subject.",
      body: "Waan halkan joogaa. Waa is a focus particle, and it is grammar, not a filler. Ayaa is the other focus particle, used when a noun is the focus: qorraxda ayaan arkaa. Gender is masculine or feminine, and it shows on the definite article and on the verb.",
      points: [
        "Most words stress the syllable before the last.",
        "C and x are Somali sounds.",
        "Ma is the no in a main clause.",
      ],
      samples: [
        ["Waan halkan joogaa.", "waa plus the verb"],
        ["Adigu waxaad tahay saaxiibkay.", "focus on the complement"],
      ],
    },
    verbs: {
      summary: "The ending shows person and gender. Yahay and imaw are irregular.",
      body: "Joogaa can serve more than one person when waa has fused with the pronoun: waan. A fuller present distinguishes the subject. Yahay is be. Imow is come, and its agreement is timaaddaa, yimaaddaa. Cun is eat. Arag is see. The past changes the ending, not the whole stem, for a regular verb.",
      points: [
        "A feminine third person takes a different ending from a masculine one.",
        "The progressive can use a form in -ayaa.",
        "Learn waan, waad, wuu, way as pronoun plus waa.",
      ],
      table: {
        caption: "yahay, be",
        heads: ["", "present"],
        rows: [
          ["aan", "ahay"],
          ["aad", "tahay"],
          ["uu", "yahay"],
          ["ay", "tahay"],
        ],
      },
      samples: [
        ["Qorraxda ayaan arkaa.", "arag, with focus"],
        ["Rooti ayaan cunnaa.", "cun"],
      ],
    },
    nouns: {
      summary: "Gender, a definite suffix, and no Latin case.",
      body: "Guri, gurigu. Naag, naagtu. Nin, ninku. Biyo is plural in agreement: biyuhu waa qabow yihiin. The definite suffix is -ka, -ga, -ta, or -da, chosen by gender and by the last sound. Possession is a suffix or a particle. Place is a preposition.",
      points: [
        "Learn the noun with its gender.",
        "The article is a suffix.",
        "Plural patterns are not one ending.",
      ],
      samples: [
        ["Gurigu waa yar yahay.", "definite -gu"],
        ["Albaabku waa furan yahay.", "masculine definite"],
      ],
    },
    odd: {
      summary: "Yahay, imaw, and the definite suffix.",
      body: "Tahay and yahay do not look like one regular stem. Imow’s forms timaaddaa and yimaaddaa add a syllable. The definite suffix is irregular at the join: which of -ka and -ga, and whether the last consonant doubles. Learn the definite with the noun. Do not guess it from the English the.",
      points: [
        "Waa and ayaa are not synonyms you can swap.",
        "Ma negates a verb. A noun has a different no.",
        "Biyo takes plural agreement.",
      ],
      samples: [
        ["ahay · tahay · yahay", "be"],
        ["Guriga ayaad timaaddaa.", "imaw"],
      ],
    },
  },
};
