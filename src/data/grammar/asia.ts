import type { GrammarChapter } from "./types";

/** Cantonese through Persian, in language-list order. Mandarin, Japanese, and Korean already have chapters. */
export const ASIA: Record<string, GrammarChapter> = {
  yue: {
    rules: {
      summary: "The verb does not change. Particles, word order, and classifiers do the grammar.",
      body: "我喺度。These cards are Hong Kong Cantonese, in traditional characters. The reading is Jyutping. 你係我朋友。係 is be for identity. 喺 is be at a place. There is no article and no plural ending. 呀 or 啊 can soften a sentence. 唔 is the simple no.",
      points: [
        "Tones are part of the word.",
        "A choice question repeats the verb around 唔: 食唔食?",
        "The adjective does not need a separate to be: 好凍.",
      ],
      samples: [
        ["我喺度。", "喺 for place"],
        ["男人行緊路。", "緊 marks an action in progress"],
      ],
    },
    verbs: {
      summary: "Nothing to conjugate. 咗, 緊, and 過 are the aspect particles.",
      body: "見 stays 見 for every person. 咗 marks a completed action. 緊 marks something in progress. 過 marks experience. 唔 is not, and 冇 is the no of possession and of a completed action. 我見到太陽 uses 到 as a result.",
      points: [
        "One shape for 我, 你, and 佢.",
        "冇水 is have-not. 唔係 is is-not.",
        "A modal such as 可以 comes before the verb.",
      ],
      table: {
        caption: "The same verb, different particles",
        heads: ["mark", "example", "job"],
        rows: [
          ["plain", "我食麵包", "the action"],
          ["緊", "行緊", "in progress"],
          ["咗", "食咗", "completed"],
          ["唔 / 冇", "唔食 · 冇水", "not, and have-not"],
        ],
      },
      samples: [
        ["我見到太陽。", "見到, result"],
        ["我哋食麵包。", "我哋 is we, verb unchanged"],
      ],
    },
    nouns: {
      summary: "No case and no plural ending. The classifier is required when you count.",
      body: "間 is the classifier for a house: 間屋. 道 for a door, 個 for many people and things. The order is number, classifier, noun. 啲 can mark a plural or an amount: 啲水. 嘅 links a possessor. 喺 marks a place and does not change the noun.",
      points: [
        "小朋友瞓緊. No plural ending on 小朋友.",
        "Learn the classifier with the noun.",
        "A changed tone on a familiar noun is meaningful, and it may not change the character.",
      ],
      samples: [
        ["間屋好細。", "classifier 間"],
        ["道門開住。", "住 for a resulting state"],
      ],
    },
    odd: {
      summary: "There is no irregular stem. 係, 喺, 有, and the two negators are the list.",
      body: "係, 喺, and 有 do not take a person ending, so they are not irregular the way a European verb is. What you cannot guess is which negator they take, and which classifier a noun takes. 唔 and 冇 are not interchangeable. Some coverbs, such as 俾 for give, also work as grammatical markers.",
      points: [
        "Do not put 唔 in front of a completed 有. Use 冇.",
        "嚟 and 去 do not become past stems.",
        "A tone change is the irregularity that can make a new word.",
      ],
      samples: [
        ["你係我朋友。", "係"],
        ["你嚟屋企。", "嚟, no ending"],
      ],
    },
  },
  hi: {
    rules: {
      summary: "The verb closes the sentence, and it agrees with gender.",
      body: "मैं यहाँ हूँ। तुम is the friend-form on these cards. आप is polite. को marks a specific object. ने appears with the subject of a transitive verb in the past, and then the verb agrees with the object instead. Postpositions, not prepositions, follow the noun.",
      points: [
        "Adjectives in -आ agree: छोटा, छोटी.",
        "The habitual present is a participle plus होना.",
        "नहीं comes before the verb.",
      ],
      samples: [
        ["मैं यहाँ हूँ।", "हूँ"],
        ["मैं सूरज देखता हूँ।", "masculine participle"],
      ],
    },
    verbs: {
      summary: "होना, करना, and जाना are irregular. Most others use a participle plus होना.",
      body: "देखता हूँ is masculine. देखती हूँ is feminine. खाते हैं agrees with हम. The past of a regular verb uses a participle in -आ. जाना’s past is गया. करना’s past is किया. होना itself is हूँ, हो, है, हैं.",
      points: [
        "तुम हो, यह है, हम हैं.",
        "The progressive is रहा plus होना.",
        "A feminine speaker changes देखता to देखती.",
      ],
      table: {
        caption: "होना",
        heads: ["", "present"],
        rows: [
          ["मैं", "हूँ"],
          ["तुम", "हो"],
          ["यह", "है"],
          ["हम", "हैं"],
        ],
      },
      samples: [
        ["हम रोटी खाते हैं।", "masculine plural agreement"],
        ["तुम घर आते हो।", "आना"],
      ],
    },
    nouns: {
      summary: "Postpositions do the work of case. Gender is masculine or feminine.",
      body: "घर, पानी, आदमी, औरत, बच्चा, दरवाज़ा. को is the object marker. में is in. पर is on. का, के, की is of, and it agrees with the thing possessed. The oblique form of a noun appears before a postposition: लड़का, लड़के का. Plurals of masculine -आ nouns change before that postposition.",
      points: [
        "Learn the gender with the noun.",
        "पानी is masculine on these cards.",
        "The oblique plural is the form you need before में and को.",
      ],
      samples: [
        ["घर छोटा है।", "masculine agreement"],
        ["दरवाज़ा खुला है।", "adjective agrees"],
      ],
    },
    odd: {
      summary: "होना, जाना, करना, देना, and लेना.",
      body: "हूँ does not contain होना. गया is the past of जाना, and गई is the feminine. दिया and लिया are the pasts of देना and लेना. In the past with ने, a transitive verb agrees with the object, which is the surprise if you expect the verb to keep agreeing with मैं.",
      points: [
        "Do not build गया from जाना.",
        "चाहिए and the modal सकना sit in their own patterns.",
        "A feminine past participle ends in -ई.",
      ],
      samples: [
        ["हूँ · हो · है · हैं", "होना"],
        ["देखता हूँ · देखती हूँ", "the same verb, two genders"],
      ],
    },
  },
  ur: {
    rules: {
      summary: "The same grammar as Hindi, written in Nastaliq, from right to left.",
      body: "میں یہاں ہوں۔ تم is the friend-form. آپ is polite. کو marks a specific object. نے with a transitive past switches agreement onto the object. The reading under a word is a guide. The script does not write every vowel.",
      points: [
        "Adjectives in ـا agree.",
        "The verb closes the sentence.",
        "نہیں comes before the verb.",
      ],
      samples: [
        ["میں یہاں ہوں۔", "ہوں"],
        ["میں سورج دیکھتا ہوں۔", "masculine agreement"],
      ],
    },
    verbs: {
      summary: "ہونا, کرنا, and جانا are irregular.",
      body: "دیکھتا ہوں is masculine. دیکھتی ہوں is feminine. The participle agrees, and ہونا carries the person. جانا’s past is گیا. کرنا’s past is کیا. ہونا is ہوں, ہو, ہے, ہیں.",
      points: [
        "تم ہو, یہ ہے, ہم ہیں.",
        "رہا plus ہونا is the progressive.",
        "A feminine speaker changes the participle, not the pronoun.",
      ],
      table: {
        caption: "ہونا",
        heads: ["", "present"],
        rows: [
          ["میں", "ہوں"],
          ["تم", "ہو"],
          ["یہ", "ہے"],
          ["ہم", "ہیں"],
        ],
      },
      samples: [
        ["ہم روٹی کھاتے ہیں۔", "plural agreement"],
        ["تم گھر آتے ہو۔", "آنا"],
      ],
    },
    nouns: {
      summary: "Postpositions, and two genders. No Latin-style case ending.",
      body: "گھر, پانی, آدمی, عورت, بچہ, دروازہ. کا, کے, کی agrees with the thing possessed. The oblique form appears before a postposition. Plurals and the oblique are learned as a pair with the singular.",
      points: [
        "Learn the gender with the noun.",
        "Persian ezafe is not the ordinary Urdu linker. Use کا.",
        "Right to left does not change the order of postpositions. They still follow the noun.",
      ],
      samples: [
        ["گھر چھوٹا ہے۔", "masculine"],
        ["دروازہ کھلا ہے۔", "agreement"],
      ],
    },
    odd: {
      summary: "ہونا, جانا, کرنا, دینا, and لینا.",
      body: "گیا, گئی, کیا, دیا, and لیا are the pasts to memorize. With نے, do not keep the verb agreeing with the subject. The feminine participle ends in ـی. Spoken Urdu shortens ہوں and ہے, and the cards keep the clear written form.",
      points: [
        "Do not build گیا from جانا.",
        "چاہیے does not take a normal person ending.",
        "The same irregulars as Hindi, in a different script.",
      ],
      samples: [
        ["ہوں · ہو · ہے · ہیں", "ہونا"],
        ["دیکھتا ہوں · دیکھتی ہوں", "gender on the participle"],
      ],
    },
  },
  mr: {
    rules: {
      summary: "The verb agrees with gender and number, and it closes the sentence.",
      body: "मी इथे आहे. तू is the friend-form on these cards. तुम्ही is plural and polite. A neuter noun such as मूल takes a different agreement from a masculine माणूस. Postpositions follow the noun. नाही is the simple no.",
      points: [
        "आहे, आहेस, आहे, आहोत.",
        "The habitual present can be a single agreeing verb: चालतो.",
        "ने marks the subject of many transitive verbs in the past.",
      ],
      samples: [
        ["मी इथे आहे.", "आहे"],
        ["माणूस चालतो.", "masculine agreement"],
      ],
    },
    verbs: {
      summary: "असणे is irregular. येणे and जाणे change the stem.",
      body: "पाहतो is I-see, masculine. पाहते is neuter. The cards use पाहतो with मी. खातो agrees the same way. येतोस is you-come. The past stem of येणे and जाणे is not the infinitive minus णे.",
      points: [
        "तू आहेस, तो आहे, ती आहे, ते आहे.",
        "A feminine third person takes आहे and a feminine participle.",
        "The progressive uses रहा plus असणे.",
      ],
      table: {
        caption: "असणे",
        heads: ["", "present"],
        rows: [
          ["मी", "आहे"],
          ["तू", "आहेस"],
          ["तो / ती", "आहे"],
          ["आम्ही", "आहोत"],
        ],
      },
      samples: [
        ["मी सूर्य पाहतो.", "masculine पाहतो"],
        ["तू घरी येतोस.", "येणे"],
      ],
    },
    nouns: {
      summary: "Three genders. The oblique form appears before a postposition.",
      body: "घर, पाणी, बाई, माणूस, मूल, दार. ला marks a specific object or a destination in many sentences. चा, ची, चे is of, and it agrees. The plural and the oblique are learned with the singular. मूल is neuter: मूल झोपतं.",
      points: [
        "पाणी is neuter.",
        "घर लहान आहे. The adjective agrees.",
        "There is no separate word for the.",
      ],
      samples: [
        ["घर लहान आहे.", "neuter or masculine agreement on लहान"],
        ["दार उघडं आहे.", "neuter दार"],
      ],
    },
    odd: {
      summary: "असणे, येणे, जाणे, and करणे.",
      body: "आहे does not look like असणे. आलो is the past of येणे. गेलो is the past of जाणे. केले is the past of करणे. With ने, agreement moves toward the object. A neuter participle in -तं, as in झोपतं, is not a masculine -तो.",
      points: [
        "Do not build आलो from येणे by a regular ending.",
        "तू and तुम्ही take different verb endings.",
        "Learn मूल with neuter agreement.",
      ],
      samples: [
        ["आहे · आहेस · आहोत", "असणे"],
        ["आम्ही पाव खातो.", "agreement with आम्ही"],
      ],
    },
  },
  bn: {
    rules: {
      summary: "No grammatical gender. The verb agrees with person and with how polite you are.",
      body: "আমি এখানে আছি। তুমি is the familiar you. আপনি is polite, and the verb changes with it. There is no he or she gender on the noun. পানি is the everyday word for water on these cards. A postposition after the noun covers place and object.",
      points: [
        "আছি, দেখি, খাই are the আমি forms.",
        "না before the verb is the simple no.",
        "The plural of a person can be a word such as রা, and it is not required when the verb already shows we.",
      ],
      samples: [
        ["আমি এখানে আছি।", "আছি, location"],
        ["পানি ঠান্ডা।", "no gender, no article"],
      ],
    },
    verbs: {
      summary: "Person and politeness, not gender. যাওয়া and আসা are the irregulars.",
      body: "দেখি, দেখো, দেখে. খাই, খাও, খায়. আসি, আসো, আসে. যাই, যাও, যায়. The stem vowel of যাওয়া and খাওয়া is not stable across every form. The present continuous uses a different participle, and the cards’ simple present is enough to start.",
      points: [
        "আছি is the location verb. It is not a regular ending on থাকা in every dialect.",
        "আপনি দেখেন is the polite shape.",
        "The negative of আছি in speech is often নেই.",
      ],
      table: {
        caption: "Present",
        heads: ["", "আছি", "দেখা", "খাওয়া"],
        rows: [
          ["আমি", "আছি", "দেখি", "খাই"],
          ["তুমি", "আছো", "দেখো", "খাও"],
          ["সে", "আছে", "দেখে", "খায়"],
          ["আমরা", "আছি", "দেখি", "খাই"],
        ],
      },
      samples: [
        ["আমি সূর্য দেখি।", "দেখা"],
        ["তুমি বাড়িতে আসো।", "আসা"],
      ],
    },
    nouns: {
      summary: "No gender and no case ending. Postpositions follow the noun.",
      body: "বাড়ি, পানি, মানুষ, দরজা. তে or এ marks a place in বাড়িতে. কে marks a person as an object. র or এর is the possessive. There is no article. A classifier such as জন for people appears when you count.",
      points: [
        "Learn তুমি and আপনি as two grammars, not two words for the same slot.",
        "The adjective does not agree.",
        "Plural রা is for people and is often optional.",
      ],
      samples: [
        ["বাড়ি ছোট।", "no agreement to add"],
        ["আমরা রুটি খাই।", "আমরা, verb খাই"],
      ],
    },
    odd: {
      summary: "যাওয়া, আসা, খাওয়া, and নেই.",
      body: "যাই does not keep যাওয়া’s shape. নেই is the negative of আছে and is not না plus আছে in the sentences you will hear. Classifiers are the other list: the wrong one is a grammar mistake. The polite আপনি ending -েন does not apply to আমি.",
      points: [
        "Do not add gender to পানি or বাড়ি.",
        "Do not use the তুমি ending for আপনি.",
        "খাই and খায় are the same verb.",
      ],
      samples: [
        ["দেখি · দেখো · দেখে", "দেখা"],
        ["আমরা রুটি খাই।", "খাওয়া"],
      ],
    },
  },
  gu: {
    rules: {
      summary: "The verb agrees with gender and number. Postpositions follow the noun.",
      body: "હું અહીં છું. તું is the familiar you. તમે is polite. છે is the ordinary is. છું agrees with હું. An adjective such as નાનું agrees with a masculine noun. નથી is the simple no.",
      points: [
        "The verb closes the sentence.",
        "ને marks an object or a recipient.",
        "The reading marks a nasal vowel when the script uses one.",
      ],
      samples: [
        ["હું અહીં છું.", "છું"],
        ["ઘર નાનું છે.", "masculine agreement"],
      ],
    },
    verbs: {
      summary: "છે is the helper. જોવું and ખાવું build a participle plus છે.",
      body: "હું સૂર્ય જોઉં છું. અમે રોટલી ખાઈએ છીએ. The participle agrees, and છે, છું, છે, છીએ carries the person. જવું and આવવું are irregular in the past. કરવું’s past is કર્યું.",
      points: [
        "તું છે or તું છે with a different participle. The card uses આવે છે.",
        "A feminine participle ends in -ઈ.",
        "The future and the simple present are different endings. Start with છે.",
      ],
      table: {
        caption: "હોવું",
        heads: ["", "present"],
        rows: [
          ["હું", "છું"],
          ["તું", "છે"],
          ["તે", "છે"],
          ["અમે", "છીએ"],
        ],
      },
      samples: [
        ["હું સૂર્ય જોઉં છું.", "જોવું"],
        ["તું ઘરે આવે છે.", "આવવું"],
      ],
    },
    nouns: {
      summary: "Three genders. The oblique appears before a postposition.",
      body: "ઘર, પાણી, બાઈ or સ્ત્રી, માણસ, બાળક, બારણું. નું, ની, નો is of, and it agrees with the thing possessed. માં is in. The plural of a masculine noun often changes the last vowel before a postposition.",
      points: [
        "પાણી ઠંડું છે. ઠંડું agrees.",
        "There is no word for the.",
        "Learn singular, plural, and oblique together.",
      ],
      samples: [
        ["ઘર નાનું છે.", "નાનું"],
        ["પાણી ઠંડું છે.", "masculine પાણી"],
      ],
    },
    odd: {
      summary: "હોવું, જવું, આવવું, and કરવું.",
      body: "છું is not a regular ending on હોવું that you can see. ગયો is the past of જવું. આવ્યો is the past of આવવું. કર્યું is the past of કરવું. The feminine and neuter of those pasts change the vowel. Learn the three genders as a set.",
      points: [
        "Do not build ગયો from જવું.",
        "તું and તમે take different forms.",
        "A nasal vowel in the ending is part of the agreement.",
      ],
      samples: [
        ["છું · છે · છીએ", "હોવું"],
        ["અમે રોટલી ખાઈએ છીએ.", "ખાવું"],
      ],
    },
  },
  te: {
    rules: {
      summary: "The verb takes a personal ending and closes the sentence. There is no gender on the verb in the first person the way Hindi has it.",
      body: "నేను ఇక్కడ ఉన్నాను. నువ్వు is the familiar you. మీరు is polite. Case is a suffix. The adjective usually comes before the noun and does not decline like a Hindi adjective. లేదు is the ordinary no.",
      points: [
        "Learn the citation form, then the spoken present.",
        "Plural suffix, then case suffix.",
        "A polite you uses a plural ending.",
      ],
      samples: [
        ["నేను ఇక్కడ ఉన్నాను.", "ఉండు, first person"],
        ["ఇల్లు చిన్నది.", "no article"],
      ],
    },
    verbs: {
      summary: "A tense marker and a person marker. వెళ్లు and రా are irregular.",
      body: "చూస్తాను is I see. తింటాం is we eat. వస్తావు is you come. రావడం’s spoken stem is వస్తా, not a regular ending on రా. The negative has its own pattern, often లేదు or a negative tense, rather than a separate word in front of an unchanged verb.",
      points: [
        "నేను -ను, నువ్వు -వు, ఆమె or అతను -డు or -ది.",
        "The infinitive on the card, చూడడం, is not the sentence form.",
        "Honorific మీరు takes a plural ending.",
      ],
      table: {
        caption: "Present",
        heads: ["", "ఉండు", "చూడు", "తిను"],
        rows: [
          ["నేను", "ఉన్నాను", "చూస్తాను", "తింటాను"],
          ["నువ్వు", "ఉన్నావు", "చూస్తావు", "తింటావు"],
          ["ఆమె", "ఉంది", "చూస్తుంది", "తింటుంది"],
          ["మేము", "ఉన్నాం", "చూస్తాం", "తింటాం"],
        ],
      },
      samples: [
        ["నేను సూర్యుడిని చూస్తాను.", "object suffix, verb last"],
        ["నువ్వు ఇంటికి వస్తావు.", "రా, and dative కి"],
      ],
    },
    nouns: {
      summary: "Case suffixes. The nominative is the dictionary form.",
      body: "ఇల్లు, ఇంటికి. The dative కి or కు marks to. లో is in. ని or ను marks an object. Plural లు comes before the case ending. There is no article. Human and non-human nouns do not take the same plural in every word.",
      points: [
        "నీళ్లు is plural in form.",
        "సూర్యుడిని shows an object ending.",
        "Gender exists on people and on some pronouns, not as der, die, das on every noun.",
      ],
      samples: [
        ["నీళ్లు చల్లగా ఉన్నాయి.", "plural agreement ఉన్నాయి"],
        ["ఇల్లు చిన్నది.", "dictionary shape"],
      ],
    },
    odd: {
      summary: "రా, పో, ఇచ్చు, and the past stem of చూడు.",
      body: "వస్తావు belongs to రావడం. వెళ్తాను belongs to వెళ్లడం. ఇచ్చు, give, keeps a stem that sandhi can hide. The past of చూడు is చూశా, not the present minus తా. Pronouns have an oblique form before a case suffix.",
      points: [
        "Do not build వస్తావు by adding -తావు to రా.",
        "Sandhi at the join of stem and suffix can change a letter.",
        "A honorific plural for one person is normal.",
      ],
      samples: [
        ["చూస్తాను · చూస్తావు", "చూడు"],
        ["తింటాం", "తిను, we"],
      ],
    },
  },
  ta: {
    rules: {
      summary: "Endings stack on the stem. The verb closes the sentence.",
      body: "நான் இங்கே இருக்கிறேன். நீ is the familiar you. நீங்கள் is polite. There is no European article. Case is a suffix. Most nouns are not masculine or feminine. People can be, and the third-person verb shows it: இருக்கிறான், இருக்கிறாள்.",
      points: [
        "The present spoken form is not the citation பார்க்க.",
        "இல்லை is the simple no.",
        "An adjective usually sits before the noun and does not agree.",
      ],
      samples: [
        ["நான் இங்கே இருக்கிறேன்.", "இரு, first person"],
        ["வீடு சிறியது.", "no article"],
      ],
    },
    verbs: {
      summary: "A tense marker and a person marker. வா and போ are irregular.",
      body: "பார்க்கிறேன் is I see. சாப்பிடுகிறோம் is we eat. வருகிறாய் is you come. The citation on the card is பார்க்க, சாப்பிட, வர. The negative verb has its own stem instead of a separate word parked in front. Past stems of வா and போ do not match the present.",
      points: [
        "நான் -ஏன், நீ -ஆய், அவன் -ஆன், அவள் -ஆள், நாங்கள் -ஓம்.",
        "Polite நீங்கள் takes a plural ending.",
        "The verb agrees with the subject.",
      ],
      table: {
        caption: "Present",
        heads: ["", "இரு", "பார்", "வா"],
        rows: [
          ["நான்", "இருக்கிறேன்", "பார்க்கிறேன்", "வருகிறேன்"],
          ["நீ", "இருக்கிறாய்", "பார்க்கிறாய்", "வருகிறாய்"],
          ["அவன்", "இருக்கிறான்", "பார்க்கிறான்", "வருகிறான்"],
          ["நாங்கள்", "இருக்கிறோம்", "பார்க்கிறோம்", "வருகிறோம்"],
        ],
      },
      samples: [
        ["நான் சூரியனைப் பார்க்கிறேன்.", "object marker, verb last"],
        ["நீ வீட்டுக்கு வருகிறாய்.", "dative க்கு"],
      ],
    },
    nouns: {
      summary: "Case suffixes. Plural, then case.",
      body: "வீடு, வீட்டுக்கு. The dative is க்கு or கு. ஐ marks an object. இல் is in. The stem can double a consonant before the suffix: வீட்டுக்கு. There is no gender ending on தண்ணீர் or வீடு. Pronouns have an oblique form.",
      points: [
        "Learn the noun with the case you will actually say.",
        "Plural கள் comes before the case.",
        "A human noun and a thing do not always take the same ending.",
      ],
      samples: [
        ["தண்ணீர் குளிர்ச்சியாக இருக்கிறது.", "impersonal agreement"],
        ["கதவு திறந்திருக்கிறது.", "a resulting state"],
      ],
    },
    odd: {
      summary: "வா, போ, சொல், and இரு.",
      body: "வந்தேன் is I came, not a regular past of வருகிறேன். போனேன் is I went. சொல்’s past is சொன்னேன். இரு supplies இருக்கிறேன் and also works as an auxiliary. Sandhi at the join can hide the dictionary stem. Learn those pasts as words.",
      points: [
        "Do not build வந்தேன் from வர by adding the present ending.",
        "இல்லை does not conjugate like பார்க்கிறேன்.",
        "A honorific plural for one person is normal.",
      ],
      samples: [
        ["வருகிறாய்", "present of வா"],
        ["நாங்கள் ரொட்டி சாப்பிடுகிறோம்.", "சாப்பிடு"],
      ],
    },
  },
  ml: {
    rules: {
      summary: "Suffixes stack, and the verb closes the sentence.",
      body: "ഞാൻ ഇവിടെയുണ്ട്. നീ is the familiar you. നിങ്ങൾ is polite. There is no article. Case is a suffix on the noun. ഉണ്ട് is the ordinary there-is and the helper in many predicates. അല്ല is the no of identity.",
      points: [
        "The citation form കാണുക is not the sentence form.",
        "Adjectives generally come before the noun.",
        "A polite you takes a plural-looking ending.",
      ],
      samples: [
        ["ഞാൻ ഇവിടെയുണ്ട്.", "ഉണ്ട്"],
        ["വീട് ചെറുതാണ്.", "ആണ് as the copula"],
      ],
    },
    verbs: {
      summary: "A tense ending and a person ending. വരിക and പോകുക are irregular.",
      body: "ഞാൻ സൂര്യനെ കാണുന്നു. ഞങ്ങൾ റൊട്ടി കഴിക്കുന്നു. നീ വീട്ടിലേക്ക് വരുന്നു. The present -ുന്നു is the form on these cards. The past stem of വരിക is വന്നു, and the past of പോകുക is പോയി. They are not the present with a new ending.",
      points: [
        "ഞാൻ, നീ, അവൾ or അവൻ, ഞങ്ങൾ.",
        "The negative continuous is a different pattern from അല്ല.",
        "Learn one verb in the present before a full chart.",
      ],
      table: {
        caption: "Present",
        heads: ["", "ഉണ്ട്", "കാണുക", "വരിക"],
        rows: [
          ["ഞാൻ", "ഉണ്ട്", "കാണുന്നു", "വരുന്നു"],
          ["നീ", "ഉണ്ട്", "കാണുന്നു", "വരുന്നു"],
          ["അവൾ", "ഉണ്ട്", "കാണുന്നു", "വരുന്നു"],
          ["ഞങ്ങൾ", "ഉണ്ട്", "കാണുന്നു", "വരുന്നു"],
        ],
      },
      samples: [
        ["ഞാൻ സൂര്യനെ കാണുന്നു.", "object എ, verb last"],
        ["നീ വീട്ടിലേക്ക് വരുന്നു.", "direction ലേക്ക്"],
      ],
    },
    nouns: {
      summary: "Case suffixes, in a fixed order. No gender on most things.",
      body: "വീട്, വീട്ടിലേക്ക്. എ marks an object: സൂര്യനെ. ഇൽ is in. ഉണ്ട് does not change for person on these cards, unlike a Tamil personal ending. People can still be masculine or feminine in the pronoun. The plural comes before the case.",
      points: [
        "Learn വെള്ളം and വീട് as stems, then the suffix.",
        "Possession can be a genitive suffix before the noun.",
        "Sandhi changes the end of the stem before a suffix.",
      ],
      samples: [
        ["വെള്ളം തണുത്തതാണ്.", "ആണ്"],
        ["വാതിൽ തുറന്നിരിക്കുന്നു.", "a state"],
      ],
    },
    odd: {
      summary: "ഉണ്ട്, ആണ്, വരിക, പോകുക, and കൊടുക്കുക.",
      body: "ഉണ്ട് and ആണ് do not take the personal endings of കാണുന്നു. വന്നു and പോയി are the pasts to memorize. കൊടുക്കുക, give, keeps an older stem in some forms. The negative ഇല്ല is the pair of ഉണ്ട്, not അല്ല plus ഉണ്ട്.",
      points: [
        "Do not conjugate ഉണ്ട് like കാണുന്നു.",
        "ഇല്ല and അല്ല are different negators.",
        "A case suffix can change the noun’s last consonant.",
      ],
      samples: [
        ["ഉണ്ട് · ആണ് · ഇല്ല", "the three helpers"],
        ["ഞങ്ങൾ റൊട്ടി കഴിക്കുന്നു.", "കഴിക്കുക"],
      ],
    },
  },
  fa: {
    rules: {
      summary: "No gender. را marks a definite object. Ezafe links words.",
      body: "من اینجام. The verb closes the sentence. تو is the friend-form. شما is polite. There is no he or she. The ezafe -e connects a noun to the next word. These cards keep a clear written form. The reading is a guide to the vowels the script omits.",
      points: [
        "Right to left.",
        "است or a short ending is the copula.",
        "نمی before the verb is the simple no.",
      ],
      samples: [
        ["من اینجام.", "a spoken copula on the pronoun"],
        ["من خورشید را می‌بینم.", "را, verb last"],
      ],
    },
    verbs: {
      summary: "A present stem and a past stem. They are often not the same.",
      body: "دیدن has the present stem بین and the past stem دید. می‌بینم is I see. رفتن has رو and رفت: می‌روم, رفتم. بودن is هستم in the present and بودم in the past. The prefix می marks the present and the imperfect.",
      points: [
        "Learn both stems with the verb.",
        "The personal ending is ـم, ـی, ـد, ـیم.",
        "A compound verb such as کار کردن keeps the noun in front and conjugates کردن.",
      ],
      table: {
        caption: "Present",
        heads: ["", "بودن", "دیدن", "آمدن"],
        rows: [
          ["من", "هستم", "می‌بینم", "می‌آیم"],
          ["تو", "هستی", "می‌بینی", "می‌آیی"],
          ["او", "است", "می‌بیند", "می‌آید"],
          ["ما", "هستیم", "می‌بینیم", "می‌آییم"],
        ],
      },
      samples: [
        ["ما نان می‌خوریم.", "خوردن"],
        ["تو به خانه می‌آیی.", "آمدن"],
      ],
    },
    nouns: {
      summary: "No case endings. را and a preposition do the marking.",
      body: "A definite object takes را. به is to, در is in, از is from. The plural is ها. Ezafe is how you attach an adjective and how you say of. Spoken Persian uses a short copula: خانه‌ست or the cards’ clearer است. خانه کوچک است.",
      points: [
        "There is no gender on خانه or آب.",
        "Pronouns have a spoken set of suffixes.",
        "The plural ها does not change the verb for gender.",
      ],
      samples: [
        ["خانه کوچک است.", "است"],
        ["در باز است.", "no article"],
      ],
    },
    odd: {
      summary: "The two stems of رفتن, دیدن, دادن, and گفتن.",
      body: "رفت and رو, دید and بین, داد and ده, گفت and گو. هستم, هستی, است is be, and the third person is not هست on these cards. Spoken Persian shortens است. بودن’s past بودم is regular once you know the past stem, and the present is the irregular half.",
      points: [
        "Do not build می‌روم from رفت.",
        "است is the irregular third person.",
        "را is not used on an indefinite object.",
      ],
      samples: [
        ["می‌بینم · می‌بینی", "present stem بین"],
        ["کودک خواب است.", "است, no agreement for gender"],
      ],
    },
  },
};
