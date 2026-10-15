import type { GrammarChapter } from "./types";

/** Ukrainian through Turkish, in language-list order. Russian already has its own chapter. */
export const EUROPE_EAST: Record<string, GrammarChapter> = {
  uk: {
    rules: {
      summary: "No articles. The ending of the noun is the case, and the verb agrees with the person.",
      body: "Я тут. The present of бути is usually left out. Я бачу сонце. Ти is the friend-form. Ви is polite. The apostrophe in п’ю marks a separate sound and stays part of the spelling. Не comes immediately before the verb.",
      points: [
        "Learn the nominative, then the accusative.",
        "Adjectives agree in gender, number, and case.",
        "The past marks gender, not person: я бачив, я бачила.",
      ],
      samples: [
        ["Я тут.", "бути omitted"],
        ["Я бачу сонце.", "first person, accusative object"],
      ],
    },
    verbs: {
      summary: "Person endings in the present. Gender in the past. Aspect pairs.",
      body: "Бачити is бачу, бачиш, бачить. Їсти is їм, їси, їсть. A perfective verb’s future often looks like a present. Іти and ходити are a going-once and a going-often pair, not two synonyms you can swap. The infinitive is the citation form.",
      points: [
        "Бути in the present is є, and speech skips it.",
        "Хотіти, могти, and дати are irregular.",
        "Не бачу, with не fused to the rhythm of the verb.",
      ],
      table: {
        caption: "Present",
        heads: ["", "бачити", "їсти", "бути"],
        rows: [
          ["я", "бачу", "їм", "є"],
          ["ти", "бачиш", "їси", "є"],
          ["вона", "бачить", "їсть", "є"],
          ["ми", "бачимо", "їмо", "є"],
        ],
      },
      samples: [
        ["Ми їмо хліб.", "їсти"],
        ["Ти приходиш до дому.", "приходити, imperfective"],
      ],
    },
    nouns: {
      summary: "Seven cases. A feminine -а often becomes -у as an object.",
      body: "Вода, воду. Дім, дім in the accusative when it is not alive, and a different shape when a masculine noun is alive. Nominative, accusative, genitive, dative, instrumental, locative, and vocative. The vocative can wait. Numbers force a case: one pattern for 1, another for 2, another for 5.",
      points: [
        "Жінка, чоловік, дитина, двері.",
        "The genitive is also the case of negation for many objects.",
        "Двері is plural in form.",
      ],
      samples: [
        ["Вода холодна.", "nominative"],
        ["Дім маленький.", "no article, nominative"],
      ],
    },
    odd: {
      summary: "Бути, їсти, дати, хотіти, and the motion pair іти / ходити.",
      body: "Їм does not contain їсти as a tidy stem. Дати’s present is дам, даси, дасть. Іти’s present is іду, ідеш. People-plurals such as люди and діти are not built from the singular by a suffix you can see in advance. Aspect partners can look unrelated. Learn the pair.",
      points: [
        "Do not invent the past of піти from the present of іти.",
        "A masculine nominative plural in -и is regular. A plural in -а, where you meet one, is a list.",
        "The apostrophe is not optional.",
      ],
      samples: [
        ["я бачу · ти бачиш", "a regular present, for contrast"],
        ["їм · їси · їсть", "їсти"],
      ],
    },
  },
  hr: {
    rules: {
      summary: "No article. Clitics want the second position, and the ending is the case.",
      body: "Ja sam ovdje. Sam is a clitic and sits in second place. Ti is the friend-form. Vidim sunce. A feminine noun in -a often takes -u as the object. Ne fuses in front of the verb: ne vidim. Aspect is the deep split in the verb.",
      points: [
        "Learn the verb with its aspect partner.",
        "Adjectives agree.",
        "The present of biti is sam, si, je, smo, ste, su.",
      ],
      samples: [
        ["Ja sam ovdje.", "clitic second"],
        ["Vidim sunce.", "present, object unmarked in form here"],
      ],
    },
    verbs: {
      summary: "Person in the present. Gender in the past. Biti, htjeti, and ići are irregular.",
      body: "Vidjeti is vidim, vidiš, vidi. Jest i is jedem, jedeš, jede. A perfective present usually means a future. The past is a participle that agrees in gender plus a clitic of biti: vidio sam, vidjela sam. Motion verbs come in pairs.",
      points: [
        "Htjeti is hoću, hoćeš, hoće.",
        "Moći and ići do not follow vidjeti.",
        "The infinitive is the citation form on the card.",
      ],
      table: {
        caption: "Present",
        heads: ["", "biti", "vidjeti", "jesti"],
        rows: [
          ["ja", "sam", "vidim", "jedem"],
          ["ti", "si", "vidiš", "jedeš"],
          ["ona", "je", "vidi", "jede"],
          ["mi", "smo", "vidimo", "jedemo"],
        ],
      },
      samples: [
        ["Jedemo kruh.", "jesti"],
        ["Ti dolaziš do kuće.", "dolaziti"],
      ],
    },
    nouns: {
      summary: "Seven cases. Start from the nominative and the accusative.",
      body: "Voda, vodu. Kuća, kuću. A living masculine object often looks like the genitive. The locative is the case after u and na when you are already there. The instrumental is the case of s, with. The vocative exists and can wait.",
      points: [
        "Dijete and vrata do not pluralize like a tidy -a noun.",
        "Numbers 2, 3, and 4 take a different form from 5.",
        "The adjective takes the same case as the noun.",
      ],
      samples: [
        ["Voda je hladna.", "nominative"],
        ["Kuća je mala.", "feminine -a"],
      ],
    },
    odd: {
      summary: "Biti, htjeti, moći, ići, and jesti.",
      body: "Sam, si, je cannot be built from biti. Hoću does not look like htjeti. Ići is idem, ideš. The participle of ići is išao. Children and people are djeca and ljudi, not a suffix on the singular. Aspect pairs such as ići and doći have to be learned as partners, not as one stem plus a prefix you invent.",
      points: [
        "Je is both she-is and, in other sentences, a different clitic. Read it from the place in the sentence.",
        "Do not drop the clitic when the sentence needs biti.",
        "A consonant cluster that moves in the stem, as in jesti, jedem, is memorized with the verb.",
      ],
      samples: [
        ["sam · si · je", "biti"],
        ["jedem · jedeš · jede", "jesti"],
      ],
    },
  },
  sr: {
    rules: {
      summary: "Ekavian, in Cyrillic. No article, and the clitic wants second place.",
      body: "Ја сам овде. These cards use ekavian је, not ijekavian ije. Ти is the friend-form. Видим сунце. The Latin reading can sit under a word elsewhere in the app. The grammar is the same system as Croatian with ekavian vowels and Cyrillic spelling.",
      points: [
        "Сам, си, је, смо, сте, су.",
        "Не stands immediately before the verb.",
        "Learn the aspect partner with the verb.",
      ],
      samples: [
        ["Ја сам овде.", "clitic second"],
        ["Видим сунце.", "present"],
      ],
    },
    verbs: {
      summary: "Person in the present, gender in the past. Бити, хтети, and ићи are irregular.",
      body: "Видети is видим, видиш, види. Јести is једем, једеш, једе. The past participle agrees: видео сам, видела сам. A perfective verb used in the present usually points to the future. Доћи on the card is the perfective partner of a going verb.",
      points: [
        "Хтети is хоћу, хоћеш, хоће.",
        "Моћи is могу, можеш, може.",
        "Ићи is идем, идеш, иде.",
      ],
      table: {
        caption: "Present",
        heads: ["", "бити", "видети", "јести"],
        rows: [
          ["ја", "сам", "видим", "једем"],
          ["ти", "си", "видиш", "једеш"],
          ["она", "је", "види", "једе"],
          ["ми", "смо", "видимо", "једемо"],
        ],
      },
      samples: [
        ["Једемо хлеб.", "јести"],
        ["Долазиш кући.", "present, second person"],
      ],
    },
    nouns: {
      summary: "Seven cases. Feminine -а often becomes -у as the object.",
      body: "Вода, воду. Кућа, кућу. A living masculine object takes the genitive shape. The locative follows у and на for place. Дете and врата are not regular plurals. The adjective agrees in case.",
      points: [
        "Жена, мушкарац, дете, врата.",
        "One, two, and five take three different noun forms.",
        "There is no word for the.",
      ],
      samples: [
        ["Вода је хладна.", "nominative"],
        ["Кућа је мала.", "feminine"],
      ],
    },
    odd: {
      summary: "Бити, хтети, моћи, ићи, and јести.",
      body: "Једем does not keep јести as a stem you can see. Хоћу does not look like хтети. The participle ишао belongs to ићи. Људи and деца are the plurals to memorize. Do not rebuild an ijekavian form on this card. Екавian је is the vowel these cards use.",
      points: [
        "Do not mix Latin ije spellings into this card.",
        "Је is the third person of бити.",
        "Aspect partners are learned as pairs.",
      ],
      samples: [
        ["сам · си · је", "бити"],
        ["једем · једеш · једе", "јести"],
      ],
    },
  },
  sl: {
    rules: {
      summary: "No article. Six cases, and a dual beside one and many.",
      body: "Jaz sem tukaj. Ti is the friend-form. Vidim sonce. The dual, for exactly two, is real Slovenian and can wait until the singular cases feel automatic. This course stays with one and many. Ne comes before the verb.",
      points: [
        "Sem, si, je, smo, ste, so.",
        "The past participle agrees in gender.",
        "Learn the nominative and the accusative first.",
      ],
      samples: [
        ["Jaz sem tukaj.", "biti"],
        ["Vidim sonce.", "present, no pronoun required"],
      ],
    },
    verbs: {
      summary: "Person endings, and a short list that will not follow them.",
      body: "Videti is vidim, vidiš, vidi. Jesti is jem, ješ, je. Iti is grem, greš, gre. The future of a perfective often looks like a present. Biti’s past participle is bil, bila. A few verbs keep an older stem in the present.",
      points: [
        "Hoteti is hočem, hočeš, hoče.",
        "The dual of biti is sva, sta, sta. Leave it until you need two people.",
        "Aspect still decides whether the action is a process or a result.",
      ],
      table: {
        caption: "Present",
        heads: ["", "biti", "videti", "jesti"],
        rows: [
          ["jaz", "sem", "vidim", "jem"],
          ["ti", "si", "vidiš", "ješ"],
          ["ona", "je", "vidi", "je"],
          ["mi", "smo", "vidimo", "jemo"],
        ],
      },
      samples: [
        ["Jemo kruh.", "jesti"],
        ["Ti prihajaš k hiši.", "prihajati"],
      ],
    },
    nouns: {
      summary: "Six cases. Feminine -a often becomes -o as the object.",
      body: "Hiša, hišo. Voda stays closer to its shape than a Croatian vodu, and the accusative -o is the form to learn. A living masculine object often uses the genitive shape. The locative follows v and na for place. Otrok and vrata need their own plurals.",
      points: [
        "The dual ending is a third number, not a kind of plural.",
        "Adjectives agree.",
        "Two, three, and four do not take the same form as five.",
      ],
      samples: [
        ["Voda je hladna.", "nominative"],
        ["Hiša je majhna.", "feminine"],
      ],
    },
    odd: {
      summary: "Biti, iti, jesti, and hoteti.",
      body: "Grem does not contain iti. Jem does not contain jesti. Sem is not a regular person ending on a stem bit-. The participle šel belongs to iti. Ljudje is the plural of človek. Learn those as pairs. The dual of a verb is regular once you decide to learn it, and it is still a new column.",
      points: [
        "Do not build grem from iti.",
        "Ne bom is the negative future of biti, and it is its own set.",
        "A vowel that lengthens in a case ending is part of the grammar.",
      ],
      samples: [
        ["sem · si · je", "biti"],
        ["grem · greš · gre", "iti"],
      ],
    },
  },
  mk: {
    rules: {
      summary: "The article is a suffix. The verb has no infinitive.",
      body: "Јас сум тука. Ти is the friend-form. The article hangs on the noun: жената, мажот, водата, детето. There is no infinitive to cite, so the dictionary form is the first person: гледам, јадам. Aspect is still the deep split.",
      points: [
        "Сум, си, е, сме, сте, се.",
        "Не before the verb.",
        "A finished past and a process are different forms.",
      ],
      samples: [
        ["Јас сум тука.", "сум"],
        ["Жената е тука.", "suffixed article"],
      ],
    },
    verbs: {
      summary: "Person endings on a present stem. Cite the verb as јас.",
      body: "Гледам, гледаш, гледа. Јадам, јадеш, јаде. The aorist is a finished past and often uses a different stem. The imperfect is the background past. Сум is irregular and is also the helper in the perfect: сум видел, сум видела.",
      points: [
        "There is no infinitive to put after another verb. Macedonian uses да plus a personal form.",
        "Доаѓам is the present you see on the card.",
        "The future is ќе plus a present.",
      ],
      table: {
        caption: "Present",
        heads: ["", "сум", "гледам", "јадам"],
        rows: [
          ["јас", "сум", "гледам", "јадам"],
          ["ти", "си", "гледаш", "јадеш"],
          ["таа", "е", "гледа", "јаде"],
          ["ние", "сме", "гледаме", "јадеме"],
        ],
      },
      samples: [
        ["Го гледам сонцето.", "гледам, and a neuter object pronoun"],
        ["Јадеме леб.", "јадам"],
      ],
    },
    nouns: {
      summary: "Little case remains. The article suffix agrees with gender.",
      body: "Мажот, жената, детето, водата, куќата, вратата. -от is masculine, -та is feminine, -то is neuter. A form without the article is indefinite. Pronouns keep more case than nouns. Го is a masculine or neuter object pronoun.",
      points: [
        "Learn the noun with its article.",
        "Plural articles are -те and -та.",
        "Gender is still masculine, feminine, or neuter.",
      ],
      samples: [
        ["Куќата е мала.", "feminine article"],
        ["Детето спие.", "neuter article"],
      ],
    },
    odd: {
      summary: "Сум, and the aorist stems that do not match the present.",
      body: "Сум, си, е will not follow гледам. The aorist of a common verb can look like a different word, and it has to be learned as a pair with the present. Да sums and similar frozen case-like phrases are leftovers, not a case you decline every noun through.",
      points: [
        "Do not look for an infinitive on this card.",
        "Ке is future, not a verb of its own.",
        "A doubled object pronoun, го plus the noun, is normal.",
      ],
      samples: [
        ["сум · си · е", "the irregular copula"],
        ["Ти доаѓаш до куќата.", "доаѓам"],
      ],
    },
  },
  bg: {
    rules: {
      summary: "The article is a suffix, and the verb has no infinitive.",
      body: "Аз съм тук. Ти is the friend-form. Жената, мъжът, водата, къщата, детето. The citation form is the first person: виждам, ям. Не comes before the verb. Aspect still decides result or process.",
      points: [
        "Съм, си, е, сме, сте, са.",
        "Ще plus a present is the future.",
        "Да plus a personal form replaces the infinitive.",
      ],
      samples: [
        ["Аз съм тук.", "съм"],
        ["Жената е тук.", "article -та"],
      ],
    },
    verbs: {
      summary: "Person endings. Ям and съм are the irregulars to learn first.",
      body: "Виждам, виждаш, вижда. Ям, ядеш, яде. Идвам, идваш, идва. The aorist is the finished past. The perfect uses съм plus a participle that agrees in gender. There is no infinitive on the card.",
      points: [
        "Ям does not add the ending of виждам in the first person.",
        "Мога and ща are irregular.",
        "The renarrative, a reported past, can wait.",
      ],
      table: {
        caption: "Present",
        heads: ["", "съм", "виждам", "ям"],
        rows: [
          ["аз", "съм", "виждам", "ям"],
          ["ти", "си", "виждаш", "ядеш"],
          ["тя", "е", "вижда", "яде"],
          ["ние", "сме", "виждаме", "ядем"],
        ],
      },
      samples: [
        ["Виждам слънцето.", "виждам"],
        ["Ядем хляб.", "ям"],
      ],
    },
    nouns: {
      summary: "The article suffix is the declension you need first.",
      body: "Мъжът, жената, детето, водата, къщата, вратата. Masculine nouns have a long article -ът and a short article -а, depending on the job in the sentence. Pronouns keep case that nouns have lost. Го marks a masculine object.",
      points: [
        "Learn the noun with the article.",
        "A few vocatives survive. They can wait.",
        "Adjectives agree and can take the article themselves.",
      ],
      samples: [
        ["Къщата е малка.", "feminine article"],
        ["Детето спи.", "neuter article"],
      ],
    },
    odd: {
      summary: "Съм, ям, мога, and the aorist stems.",
      body: "Съм, си, е cannot be built from a regular present. Ям, ядеш keeps a different stem in the second person. The aorist of идвам and ям will not look like the present with a new ending glued on. Learn those pasts as words. Хора is the plural of човек.",
      points: [
        "Do not search this card for an infinitive.",
        "Нямам is the negative of имам, not не plus a regular имам in every style.",
        "The long and short masculine articles are not optional variants.",
      ],
      samples: [
        ["съм · си · е", "съм"],
        ["ям · ядеш · яде", "ям"],
      ],
    },
  },
  pl: {
    rules: {
      summary: "No article. The ending carries case, and the verb often carries the person alone.",
      body: "Jestem tutaj. The pronoun can drop. Ty is the friend-form. Widzę słońce. Nie comes before the verb. A feminine noun in -a often takes -ę as the object. Aspect pairs are the long game.",
      points: [
        "Być is jestem, jesteś, jest, jesteśmy.",
        "The past agrees in gender: widziałem, widziałam.",
        "Learn the nominative first.",
      ],
      samples: [
        ["Jestem tutaj.", "być, pronoun omitted"],
        ["Widzę słońce.", "present"],
      ],
    },
    verbs: {
      summary: "Person endings. Być, iść, jeść, and wiedzieć are irregular.",
      body: "Widzieć is widzę, widzisz, widzi. Jeść is jem, jesz, je. Iść is idę, idziesz. A perfective present usually means a future. Chodzić is the imperfective partner of a going verb, not a synonym you can freely swap with iść.",
      points: [
        "Chcieć is chcę, chcesz, chce.",
        "Móc is mogę, możesz, może.",
        "The future of być is będę.",
      ],
      table: {
        caption: "Present",
        heads: ["", "być", "widzieć", "jeść"],
        rows: [
          ["ja", "jestem", "widzę", "jem"],
          ["ty", "jesteś", "widzisz", "jesz"],
          ["ona", "jest", "widzi", "je"],
          ["my", "jesteśmy", "widzimy", "jemy"],
        ],
      },
      samples: [
        ["Jemy chleb.", "jeść"],
        ["Przychodzisz do domu.", "przychodzić"],
      ],
    },
    nouns: {
      summary: "Seven cases. Woda, wodę is the pair to learn first.",
      body: "Nominative, accusative, genitive, dative, instrumental, locative, and vocative. A living masculine object uses the genitive shape. The locative follows w and na for place and changes the stem of many nouns. Dziecko and drzwi need their own plural.",
      points: [
        "Pan and człowiek have irregular plurals.",
        "Two, three, and four take a different form from five.",
        "The adjective agrees in case.",
      ],
      samples: [
        ["Woda jest zimna.", "nominative"],
        ["Dom jest mały.", "masculine, no article"],
      ],
    },
    odd: {
      summary: "Być, iść, jeść, dać, wiedzieć, and chcieć.",
      body: "Jem does not contain jeść. Idę belongs to iść, and the past szedł looks like another verb. Dać is dam, dasz, da. Wiedzieć is wiem, wiesz, wie. Ludzie is the plural of człowiek. Learn the set. Do not invent the past of pójść from iść.",
      points: [
        "Byłem and byłam are the past of być.",
        "A masculine plural in -a, such as panowie’s relatives in other words, is a list when you meet it.",
        "Consonant shifts in widzę, widzisz are regular inside Polish and still have to be learned.",
      ],
      samples: [
        ["jestem · jesteś · jest", "być"],
        ["jem · jesz · je", "jeść"],
      ],
    },
  },
  cs: {
    rules: {
      summary: "No article. Learn the nominative, then the endings that follow.",
      body: "Jsem tady. Ty is the friend-form. Vidím slunce. A feminine -a often becomes -u as the object: voda, vodu. Ne comes before the verb. The past participle agrees in gender.",
      points: [
        "Jsem, jsi, je, jsme, jste, jsou.",
        "The second-position clitics include the past helper.",
        "Aspect pairs are learned together.",
      ],
      samples: [
        ["Jsem tady.", "být, pronoun omitted"],
        ["Vidím slunce.", "present"],
      ],
    },
    verbs: {
      summary: "Person endings. Být, jít, jíst, and chtít are irregular.",
      body: "Vidět is vidím, vidíš, vidí. Jíst is jím, jíš, jí. Jít is jdu, jdeš, jde. A perfective present usually means a future. The past is a participle plus být: viděl jsem, viděla jsem.",
      points: [
        "Moct is můžu, můžeš, může.",
        "The future of být is budu.",
        "Motion verbs come in a determined and an undetermined pair.",
      ],
      table: {
        caption: "Present",
        heads: ["", "být", "vidět", "jíst"],
        rows: [
          ["já", "jsem", "vidím", "jím"],
          ["ty", "jsi", "vidíš", "jíš"],
          ["ona", "je", "vidí", "jí"],
          ["my", "jsme", "vidíme", "jíme"],
        ],
      },
      samples: [
        ["Jíme chléb.", "jíst"],
        ["Přicházíš k domu.", "přicházet"],
      ],
    },
    nouns: {
      summary: "Seven cases, hanging off the nominative.",
      body: "Voda, vodu. Dům, and its other cases, which soften the consonant. The locative is the case after v and na for place. A living masculine accusative looks like the genitive. Dítě and dveře are not regular plurals.",
      points: [
        "Learn 1, 2, and 5 as three number patterns.",
        "The adjective takes the noun’s case.",
        "A long vowel in an ending is part of the case, not decoration.",
      ],
      samples: [
        ["Voda je studená.", "nominative"],
        ["Dům je malý.", "masculine"],
      ],
    },
    odd: {
      summary: "Být, jít, jíst, chtít, and vědět.",
      body: "Jdu does not look like jít. Jím does not look like jíst. Chci, chceš, chce loses the t of chtít in the present. Vím, víš, ví is vědět. Šel is the participle of jít. Lidé is the plural of člověk.",
      points: [
        "Do not build the past of jít from jdu.",
        "Nejsem is the negative of jsem, and the past negative is a separate pattern.",
        "Stems that add an extra consonant in the first person, vidím, are normal and still listed with the verb.",
      ],
      samples: [
        ["jsem · jsi · je", "být"],
        ["jdu · jdeš · jde", "jít"],
      ],
    },
  },
  sk: {
    rules: {
      summary: "No article. Long vowels and cases. The nominative comes first.",
      body: "Ja som tu. Ty is the friend-form. Vidím slnko. Som is a clitic and likes the second position. A feminine noun in -a often takes -u as the object. Nie comes before the verb.",
      points: [
        "Som, si, je, sme, ste, sú.",
        "The past agrees in gender.",
        "Learn the aspect partner with the verb.",
      ],
      samples: [
        ["Ja som tu.", "byť"],
        ["Vidím slnko.", "present"],
      ],
    },
    verbs: {
      summary: "Person endings. Byť, ísť, and jesť are irregular.",
      body: "Vidieť is vidím, vidíš, vidí. Jesť is jem, ješ, je. Ísť is idem, ideš, ide. A perfective present usually means a future. The past is a participle plus byť: videl som, videla som.",
      points: [
        "Chcieť is chcem, chceš, chce.",
        "Môcť is môžem, môžeš, môže.",
        "The future of byť is budem.",
      ],
      table: {
        caption: "Present",
        heads: ["", "byť", "vidieť", "jesť"],
        rows: [
          ["ja", "som", "vidím", "jem"],
          ["ty", "si", "vidíš", "ješ"],
          ["ona", "je", "vidí", "je"],
          ["my", "sme", "vidíme", "jeme"],
        ],
      },
      samples: [
        ["Jeme chlieb.", "jesť"],
        ["Prichádzaš k domu.", "prísť’s imperfective partner, prichádzať"],
      ],
    },
    nouns: {
      summary: "Six cases in daily use, and a vocative that can wait.",
      body: "Voda, vodu. Dom, and the cases that follow. The locative is the place case after v and na. A living masculine object uses the genitive shape. Dieťa and dvere are learned with their plural, not from a suffix rule.",
      points: [
        "Ľudia is the plural of človek.",
        "Two, three, and four differ from five.",
        "The rhythm of a long vowel can mark a case.",
      ],
      samples: [
        ["Voda je studená.", "nominative"],
        ["Dom je malý.", "masculine"],
      ],
    },
    odd: {
      summary: "Byť, ísť, jesť, chcieť, and vedieť.",
      body: "Idem does not contain ísť. Jem does not contain jesť. Viem, vieš, vie is vedieť. The participle išiel belongs to ísť. Do not invent a regular present by hanging -ím on the infinitive of these verbs.",
      points: [
        "Nie som is the negative.",
        "Aspect pairs can look unrelated.",
        "A stem consonant that changes in the first person is learned with the verb.",
      ],
      samples: [
        ["som · si · je", "byť"],
        ["idem · ideš · ide", "ísť"],
      ],
    },
  },
  sq: {
    rules: {
      summary: "The article is a suffix. The verb still shows the person.",
      body: "Unë jam këtu. Ti is the friend-form. Ju is polite. Gruaja, burri, uji, shtëpia. A linking article, i, e, të, or së, stands in front of many adjectives and genitives. Nuk comes before the verb.",
      points: [
        "Jam, je, është, jemi.",
        "The adjective often needs its own article: i ftohtë, e vogël.",
        "There is no infinitive in the same role as in English. The card may show a bare stem.",
      ],
      samples: [
        ["Unë jam këtu.", "jam"],
        ["Gruaja është këtu.", "definite suffix"],
      ],
    },
    verbs: {
      summary: "Person endings, and jam, kam, and shoh do not share one stem pattern.",
      body: "Shoh, sheh, sheh. Vij, vjen, vjen. Ha, ha, ha in the present of eat is short and irregular. Kam, ke, ka is have. The admirative and the optative can wait. Learn the present indicative of jam and of one regular verb first.",
      points: [
        "A regular verb in the present distinguishes unë, ti, and ne.",
        "The past often uses a different stem.",
        "Nuk jam is the negative of jam.",
      ],
      table: {
        caption: "Present",
        heads: ["", "jam", "kam", "shoh"],
        rows: [
          ["unë", "jam", "kam", "shoh"],
          ["ti", "je", "ke", "sheh"],
          ["ajo", "është", "ka", "sheh"],
          ["ne", "jemi", "kemi", "shohim"],
        ],
      },
      samples: [
        ["Shoh diellin.", "shoh"],
        ["Ne hamë bukë.", "ha"],
      ],
    },
    nouns: {
      summary: "Indefinite and definite are a pair. The definite ending is the article.",
      body: "Një grua, gruaja. Një burrë, burri. Ujë, uji. Shtëpi, shtëpia. Fëmijë, fëmija. Derë, dera. Nominative and accusative often look the same. Genitive and dative use the linking article. The plural is learned with the singular.",
      points: [
        "Feminine definite is often -a or -ja.",
        "Masculine definite is often -i or -u.",
        "The adjective’s article agrees: shtëpia është e vogël.",
      ],
      samples: [
        ["Shtëpia është e vogël.", "definite noun, adjective with e"],
        ["Uji është i ftohtë.", "uji, adjective with i"],
      ],
    },
    odd: {
      summary: "Jam, kam, shoh, ha, and vij.",
      body: "Është does not look like jam. Ha’s plural hamë adds a vowel the singular hid. Vij and vjen change the stem. The past of these verbs is a second list, not the present plus a suffix. Plurals that change the last vowel of the stem are learned as pairs.",
      points: [
        "Do not build është from jam.",
        "The linking article i, e, të, së is not the same word as the suffix article.",
        "A noun’s definite plural is its own form.",
      ],
      samples: [
        ["jam · je · është", "jam"],
        ["Ti vjen në shtëpi.", "vij"],
      ],
    },
  },
  eu: {
    rules: {
      summary: "The article is a suffix, -a. The auxiliary agrees with more than the subject.",
      body: "Ni hemen nago. Zu is the ordinary you on these cards. There is no masculine or feminine on things. Basque is ergative: the subject of a transitive verb takes -k. Eguzkia ikusten dut. The participle carries the meaning, and the auxiliary carries the agreement.",
      points: [
        "Naiz, zara, da is be for a statement of what something is.",
        "Nago, zaude, dago is be for where something is.",
        "Etxea is house plus the article.",
      ],
      samples: [
        ["Ni hemen nago.", "nago, location"],
        ["Etxea txikia da.", "article -a, da"],
      ],
    },
    verbs: {
      summary: "A few synthetic verbs, and an auxiliary for the rest.",
      body: "Ikusi, jan, and etorri on the cards are participles. Eguzkia ikusten dut is the participle plus dut. Most verbs work that way. Naiz, nago, and the transitive dut, duzu, du are the irregular system, because they agree with who acts and what is affected.",
      points: [
        "Dut is I, for a transitive present.",
        "Dugu is we.",
        "Zatoz is you-come, a synthetic form of etorri.",
      ],
      table: {
        caption: "The two verbs for be",
        heads: ["", "izan, what", "egon, where"],
        rows: [
          ["ni", "naiz", "nago"],
          ["zu", "zara", "zaude"],
          ["hura", "da", "dago"],
          ["gu", "gara", "gaude"],
        ],
      },
      samples: [
        ["Eguzkia ikusten dut.", "participle plus dut"],
        ["Zu etxera zatoz.", "etorri, synthetic"],
      ],
    },
    nouns: {
      summary: "Case suffixes. -a is the article and comes before the case.",
      body: "Etxe, etxea. The ergative adds -k: gizonak can be the man as a transitive subject, or the men. The sentence frame tells you which. Dative is -ri. Place suffixes cover in, to, and from. The plural article is -ak.",
      points: [
        "Ura is ur plus -a.",
        "There is no gender to memorize.",
        "An adjective follows and takes the article if it is last: etxe txikia.",
      ],
      samples: [
        ["Ura hotza da.", "article on the noun phrase"],
        ["Gizona oinez dabil.", "gizon plus -a"],
      ],
    },
    odd: {
      summary: "The auxiliaries, and a handful of synthetic verbs.",
      body: "Naiz, nago, dut, and the nor-nori-nork forms that agree with subject, object, and indirect object at once are a table, not a rule you can see from one example. Joan, etorri, ibili, and eduki keep a few synthetic forms. Zatoz, on the card, is the you-form of etorri. Learn the I-forms first.",
      points: [
        "Do not add a gender ending.",
        "Do not treat -ak as only a plural.",
        "Izan and egon are not interchangeable.",
      ],
      samples: [
        ["naiz · zara · da", "izan"],
        ["Ogia jaten dugu.", "jan plus the auxiliary"],
      ],
    },
  },
  el: {
    rules: {
      summary: "The article changes with gender, number, and case. Stress is written.",
      body: "Είμαι εδώ. The verb ending shows the person, so the pronoun can drop. Εσύ is the friend-form. Ο, η, το are the. Δεν comes before the verb. Modern Greek keeps nominative, accusative, and genitive.",
      points: [
        "Learn the article with the noun.",
        "The accent mark is part of the spelling.",
        "Adjectives agree and usually follow or precede in a fixed phrase.",
      ],
      samples: [
        ["Είμαι εδώ.", "είμαι"],
        ["Η γυναίκα είναι εδώ.", "feminine article"],
      ],
    },
    verbs: {
      summary: "Two sets of present endings, and a short list of irregulars.",
      body: "Είμαι, είσαι, είναι. Έχω, έχεις, έχει. A regular verb in -ω adds personal endings: βλέπω, βλέπεις, βλέπει. The aorist is a finished past and often uses a different stem. Θα plus a present is one future.",
      points: [
        "Τρώω, πάω, λέω, and έρχομαι do not follow βλέπω.",
        "The passive or middle ending -μαι is a second conjugation.",
        "Δεν βλέπω is the simple no.",
      ],
      table: {
        caption: "Present",
        heads: ["", "είμαι", "έχω", "βλέπω"],
        rows: [
          ["εγώ", "είμαι", "έχω", "βλέπω"],
          ["εσύ", "είσαι", "έχεις", "βλέπεις"],
          ["αυτή", "είναι", "έχει", "βλέπει"],
          ["εμείς", "είμαστε", "έχουμε", "βλέπουμε"],
        ],
      },
      samples: [
        ["Βλέπω τον ήλιο.", "βλέπω, accusative article τον"],
        ["Τρώμε ψωμί.", "τρώω"],
      ],
    },
    nouns: {
      summary: "Three cases, three genders.",
      body: "Ο άντρας, η γυναίκα, το σπίτι, το νερό, το παιδί, η πόρτα. Accusative is the ordinary object: τον ήλιο. Genitive marks possession: του σπιτιού. The plural article is οι, οι, τα. Neuter plurals often end in -α.",
      points: [
        "Learn singular and plural with the article.",
        "The accusative of a masculine noun often ends in a vowel different from the nominative.",
        "There is no fourth case to produce.",
      ],
      samples: [
        ["Το σπίτι είναι μικρό.", "neuter"],
        ["Η πόρτα είναι ανοιχτή.", "feminine, adjective agrees"],
      ],
    },
    odd: {
      summary: "Είμαι, έχω, πάω, λέω, τρώω, βλέπω, and έρχομαι.",
      body: "Τρώω’s past and πάω’s past do not look like the present stem. Έρχομαι is έρχομαι, έρχεσαι, έρχεται, and its aorist is ήρθα. Είμαι’s past is ήμουν. Βλέπω’s aorist is είδα. Learn those pasts as words.",
      points: [
        "Do not build είδα from βλέπω.",
        "Νερό has no plural in ordinary use.",
        "Stress can move when an ending is added, and the written accent moves with it.",
      ],
      samples: [
        ["είμαι · είσαι · είναι", "είμαι"],
        ["Έρχεσαι στο σπίτι.", "έρχομαι"],
      ],
    },
  },
  grc: {
    rules: {
      summary: "Attic Greek. The article, the case, and the accent marks are the grammar.",
      body: "These cards are Attic, with the old accent marks. Speech uses a modern Greek voice and is only a guide. Ὁ, ἡ, τό decline. The noun has nominative, genitive, dative, accusative, and vocative. Ἡ γυνὴ ἐνθάδε ἐστίν. The verb can stand without a pronoun.",
      points: [
        "The dual exists and can wait.",
        "An adjective agrees in gender, number, and case.",
        "The article is the best guide to the case when the ending is ambiguous.",
      ],
      samples: [
        ["Ἡ γυνὴ ἐνθάδε ἐστίν.", "article, noun, ἐστί"],
        ["Τὸ ὕδωρ ψυχρόν ἐστιν.", "neuter article"],
      ],
    },
    verbs: {
      summary: "A present stem and an aorist stem. Εἰμί is irregular.",
      body: "Λύω, λύεις, λύει is a regular present. Ὁρῶ is a contract verb: the vowel of the stem and the ending collapse. Ἐσθίω and ἔρχομαι do not follow λύω. Principal parts, not one stem, are how a Greek verb is learned. Εἰμί, εἶ, ἐστί.",
      points: [
        "The aorist is the finished past and is a different principal part.",
        "Οἶδα is perfect in form and present in meaning.",
        "Middle and passive endings are a second set.",
      ],
      table: {
        caption: "Present",
        heads: ["", "εἰμί", "λύω", "ὁράω"],
        rows: [
          ["ἐγώ", "εἰμί", "λύω", "ὁρῶ"],
          ["σύ", "εἶ", "λύεις", "ὁρᾷς"],
          ["αὐτή", "ἐστί", "λύει", "ὁρᾷ"],
          ["ἡμεῖς", "ἐσμέν", "λύομεν", "ὁρῶμεν"],
        ],
      },
      samples: [
        ["Ἄρτον ἐσθίω.", "ἐσθίω"],
        ["Ἔρχομαι.", "ἔρχομαι, middle ending"],
      ],
    },
    nouns: {
      summary: "Three declensions, five cases.",
      body: "First declension is often feminine: ἡ γυνή, τῆς γυναικός. Second is o-stems. Third is consonantal, and it is the one that surprises: ὁ ἀνήρ, ὁ παῖς. The dative is alive. Τὸ ὕδωρ is neuter and third declension.",
      points: [
        "Neuter nominative and accusative match.",
        "The genitive singular shows the declension.",
        "Ἡ οἰκία is first declension and easier than ἀνήρ.",
      ],
      samples: [
        ["Ὁ ἀνὴρ βαδίζει.", "third-declension noun"],
        ["Ἡ θύρα ἀνεῳγμένη ἐστίν.", "first declension"],
      ],
    },
    odd: {
      summary: "Εἰμί, εἶμι, οἶδα, φημί, and the principal parts of ὁράω and ἔρχομαι.",
      body: "Εἰμί is be. Εἶμι is go, and the accent is the difference. Ὁράω’s aorist is εἶδον. Ἔρχομαι’s aorist is ἦλθον. Contract verbs swallow a vowel. A third-declension noun such as ἀνήρ changes the stem in the other cases. Learn the genitive with the nominative.",
      points: [
        "Do not treat εἰμί and εἶμι as one verb.",
        "Do not build εἶδον from ὁράω.",
        "Accents are not decoration.",
      ],
      samples: [
        ["εἰμί · εἶ · ἐστί", "be"],
        ["Τὸ ὄρος ὁρῶ.", "contract verb"],
      ],
    },
  },
  egy: {
    rules: {
      summary: "Middle Egyptian. The signs are the word. There is no word for the or a.",
      body: "The line under the signs is the Egyptological transliteration. These cards are Middle Egyptian, not Egyptian Arabic. A verb can stand first. Jw.j can introduce a present. Gender is masculine or feminine, and number includes a dual.",
      points: [
        "Learn the signs and the transliteration together.",
        "Word order is often verb, subject, object.",
        "Egyptian Arabic stays on the Arabic card.",
      ],
      samples: [
        ["jw.j ḥr swr mw", "a present with ḥr plus the infinitive"],
        ["ḥmt dj", "a nominal sentence, no copula required"],
      ],
    },
    verbs: {
      summary: "A suffix conjugation, and a few verbs that never follow the sound pattern.",
      body: "The suffix pronouns .j, .k, .f mark the subject on a verb form. The stative is another conjugation, used for a state. Rdj, to give, and jwj or jj, to come, are irregular in every grammar of the language. A weak final consonant disappears in many forms.",
      points: [
        "Learn the suffix pronouns before a long verb table.",
        "Ḥr plus the infinitive is the present these cards use.",
        "The imperative is often the bare stem.",
      ],
      table: {
        caption: "Suffix pronouns on the verb",
        heads: ["", "pronoun", "job"],
        rows: [
          ["I", ".j", "subject suffix"],
          ["you", ".k", "subject suffix"],
          ["he", ".f", "subject suffix"],
          ["she", ".s", "subject suffix"],
        ],
      },
      samples: [
        ["mꜣꜣ.j", "I see, suffix .j"],
        ["wnm.j t", "I eat bread"],
      ],
    },
    nouns: {
      summary: "Gender, and a number that includes the dual.",
      body: "The feminine is often marked with -t. Singular, dual, and plural. There is no article. Possession can be a suffix pronoun on the noun. A plural can repeat a sign or add plural strokes rather than an ending you can hear from the transliteration alone.",
      points: [
        "Pr is house. Mw is water.",
        "The dual ending is -wy in the transliteration of many nouns.",
        "Adjectives follow the noun and agree.",
      ],
      samples: [
        ["mw qbb", "water is cool, noun then adjective"],
        ["šrj pr", "the house is small, as the card phrases it"],
      ],
    },
    odd: {
      summary: "Rdj, jj, and the weak verbs.",
      body: "Rdj does not keep a stable set of consonants across the forms. Jj, come, and jnj, bring, drop or move a weak letter. A plural written by repeating the sign will not match a suffix you predicted from the transliteration. Trust the pair on the card.",
      points: [
        "Do not force a weak verb into the strong suffix table.",
        "The stative of an adjective-verb is how many predicates are said.",
        "Honorific transposition puts a god’s name first in writing. Read the grammar after the signs, not before.",
      ],
      samples: [
        ["jj.f", "he comes"],
        ["wnm.j t", "a sound verb, for contrast"],
      ],
    },
  },
  tr: {
    rules: {
      summary: "No gender. Endings stack, and vowel harmony chooses the vowel.",
      body: "Ben buradayım. The verb closes the sentence. Sen is the friend-form. Siz is polite. There is no he or she. The plural -ler or -lar follows harmony. Bir is a, and it is not required the way English a is.",
      points: [
        "A specific object takes the accusative.",
        "Negation is a suffix, -me or -ma, inside the verb.",
        "Questions use mi, mı, mu, or mü after the word they ask about.",
      ],
      samples: [
        ["Ben buradayım.", "place plus a person ending"],
        ["Su soğuk.", "no article, no gender"],
      ],
    },
    verbs: {
      summary: "A tense suffix, then a person suffix. Gitmek and demek change the stem.",
      body: "Görmek is görüyorum, görüyorsun, görüyor. Gelmek is geliyorum. The negative sits before the tense: gelmiyorum. Gitmek becomes gidiyorum. Demek becomes diyorum. Etmek verbs such as yardım etmek follow etmek.",
      points: [
        "The past -di agrees by harmony: geldim, gördüm.",
        "Var and yok are how you say there is and there isn’t.",
        "The dictionary form is the -mek or -mak infinitive.",
      ],
      table: {
        caption: "Present progressive",
        heads: ["", "olmak", "görmek", "gelmek"],
        rows: [
          ["ben", "oluyorum", "görüyorum", "geliyorum"],
          ["sen", "oluyorsun", "görüyorsun", "geliyorsun"],
          ["o", "oluyor", "görüyor", "geliyor"],
          ["biz", "oluyoruz", "görüyoruz", "geliyoruz"],
        ],
      },
      samples: [
        ["Güneşi görüyorum.", "accusative -i, verb last"],
        ["Eve geliyorsun.", "dative -e"],
      ],
    },
    nouns: {
      summary: "Case suffixes, in a fixed order after the plural.",
      body: "Ev, evi, eve, evde, evden. Plural comes before case: evlerde. A bare object can stay without the accusative when it is not specific. Su soğuk needs no extra word for is. Benim and the possessive suffix are two ways to mark possession, and the suffix is the compact one.",
      points: [
        "Harmony picks e or a, and the following vowel.",
        "Kapı açık. Ev küçük.",
        "Pronouns have their own dative and accusative: bana, beni.",
      ],
      samples: [
        ["Ev küçük.", "no copula ending required in this style"],
        ["Çocuk uyuyor.", "subject, then the verb"],
      ],
    },
    odd: {
      summary: "Gitmek, demek, etmek, and a few loans that ignore harmony.",
      body: "Gitmek becomes gidiyorum, not gitiyorum. Demek becomes diyorum. Yemek as eat uses the same shape as the noun for food, and the person still stacks on it: yiyoruz. A small set of Arabic and Persian loans do not obey vowel harmony. Learn those words as wholes.",
      points: [
        "Do not apply harmony to a suffix you have not heard on that stem.",
        "Var and yok do not conjugate like görmek.",
        "The question particle is written separately and still harmonizes.",
      ],
      samples: [
        ["geliyorum · gelmiyorum", "the negative is inside the word"],
        ["Ekmek yiyoruz.", "yemek"],
      ],
    },
  },
};
