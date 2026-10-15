import type { GrammarCourse } from "./model";

export const SLAVIC: Record<string, GrammarCourse> = {
  ru: {
    intro: "Russian has no articles, so the ending and the aspect do the work that small words do in English.",
    lessons: [
      {
        id: "a1-ending",
        level: "A1",
        title: "No article, and the ending does the job",
        lead: "There is no word for the or a, and the ending shows gender, number, and the job of the noun.",
        notes: [
          "A plain sentence can run subject, verb, object, and the order can move to mark what is new.",
          "Adjectives agree with the noun in gender, number, and case.",
          "Ты is the friend-form, and вы is formal or plural."
        ],
        examples: [
          ["Я пью воду.", "I drink water."],
          ["Дом маленький.", "The house is small."]
        ]
      },
      {
        id: "a1-byt",
        level: "A1",
        title: "Быть, and when to omit it",
        lead: "The present of быть is есть, and speech usually leaves that present out.",
        notes: [
          "Я дома means I am at home, with no verb written between the subject and the place.",
          "Есть stays when you mean that something exists, as in У меня есть книга.",
          "The past and the future are ordinary words you do say: был, была, было, были, and буду, будешь, будет."
        ],
        examples: [
          ["Я дома.", "I am at home."],
          ["У меня есть книга.", "I have a book."]
        ],
        table: {
          caption: "быть when the form is actually said",
          heads: ["", "present", "past", "future"],
          rows: [
            ["я", "есть, often omitted", "был / была", "буду"],
            ["ты", "есть, often omitted", "был / была", "будешь"],
            ["он / она", "есть, often omitted", "был / была", "будет"],
            ["мы", "есть, often omitted", "были", "будем"],
            ["они", "есть, often omitted", "были", "будут"]
          ]
        }
      },
      {
        id: "a1-present",
        level: "A1",
        title: "A present tense and хотеть",
        lead: "A present verb shows the person, and хотеть mixes the two conjugation patterns.",
        notes: [
          "Читать runs читаю, читаешь, читает, читаем, читаете, читают.",
          "Хотеть is хочу, хочешь, хочет in the singular, then хотим, хотите, хотят.",
          "Не sits immediately before the word it negates."
        ],
        examples: [
          ["Я читаю книгу.", "I am reading a book."],
          ["Она хочет воду.", "She wants water."]
        ],
        table: {
          caption: "Present of читать and хотеть",
          heads: ["", "читать", "хотеть"],
          rows: [
            ["я", "читаю", "хочу"],
            ["ты", "читаешь", "хочешь"],
            ["он / она", "читает", "хочет"],
            ["мы", "читаем", "хотим"],
            ["они", "читают", "хотят"]
          ]
        }
      },
      {
        id: "a2-accusative",
        level: "A2",
        title: "Accusative of a noun",
        lead: "The accusative is the ordinary object, and a living masculine looks like the genitive.",
        notes: [
          "A feminine noun in а often takes у, so вода becomes воду and книга becomes книгу.",
          "An inanimate masculine such as стол does not change in the accusative.",
          "A living masculine such as студент becomes студента."
        ],
        examples: [
          ["Я пью воду.", "I drink water."],
          ["Я вижу студента.", "I see the student."]
        ],
        table: {
          caption: "Nominative and accusative",
          heads: ["noun", "nominative", "accusative"],
          rows: [
            ["water", "вода", "воду"],
            ["book", "книга", "книгу"],
            ["table", "стол", "стол"],
            ["student", "студент", "студента"],
            ["window", "окно", "окно"]
          ]
        }
      },
      {
        id: "a2-past",
        level: "A2",
        title: "The past, which marks gender",
        lead: "The past does not mark person, and it marks gender and number instead.",
        notes: [
          "Читал is masculine, читала is feminine, читало is neuter, and читали is plural.",
          "Я читал and я читала are the same person, and the ending follows the speaker.",
          "Быть in the past is был, была, было, были, and that past is not left out."
        ],
        examples: [
          ["Она читала.", "She was reading."],
          ["Мы были дома.", "We were at home."]
        ],
        table: {
          caption: "Past of читать and быть",
          heads: ["", "читать", "быть"],
          rows: [
            ["masculine", "читал", "был"],
            ["feminine", "читала", "была"],
            ["neuter", "читало", "было"],
            ["plural", "читали", "были"]
          ]
        }
      },
      {
        id: "a2-idti-ekhat",
        level: "A2",
        title: "Going with идти or ехать",
        lead: "Идти is one trip on foot, and ехать is one trip by transport.",
        notes: [
          "Both verbs mean one journey in one direction, not a habit.",
          "Идти is иду, идёшь, идёт, and its past is шёл, шла, шло, шли.",
          "Ехать is еду, едешь, едет, and its past is ехал, ехала, ехало, ехали."
        ],
        examples: [
          ["Я иду домой.", "I am walking home."],
          ["Я еду домой.", "I am going home by transport."]
        ],
        table: {
          caption: "идти and ехать",
          heads: ["", "идти", "ехать"],
          rows: [
            ["я", "иду", "еду"],
            ["ты", "идёшь", "едешь"],
            ["он", "идёт", "едет"],
            ["past masculine", "шёл", "ехал"],
            ["past feminine", "шла", "ехала"]
          ]
        }
      },
      {
        id: "b1-aspect",
        level: "B1",
        title: "Aspect pairs",
        lead: "Each meaning comes as an imperfective process and a perfective result.",
        notes: [
          "Читать is the process or the habit, and прочитать is reading something through to the end.",
          "The perfective future has the shape of a present, so я прочитаю means I will read it through.",
          "The imperfective future uses быть plus the infinitive, so я буду читать."
        ],
        examples: [
          ["Я читаю книгу.", "I am reading the book."],
          ["Я прочитаю книгу.", "I will read the book through."]
        ]
      },
      {
        id: "b1-motion",
        level: "B1",
        title: "Verbs of motion, one trip or many",
        lead: "Идти is one trip now, and ходить is the habit or the round trip.",
        notes: [
          "Я иду в школу means I am on the way to school this once.",
          "Я хожу в школу means I go to school as a habit, and the transport pair is ехать beside ездить.",
          "Do not build the past of идти from the present, because that past is шёл while ходить makes ходил."
        ],
        examples: [
          ["Я иду в школу.", "I am on my way to school."],
          ["Я хожу в школу каждый день.", "I go to school every day."]
        ]
      },
      {
        id: "b2-kotoryj",
        level: "B2",
        title: "Relative который and case",
        lead: "Который matches the noun it follows, then takes the case of its own job in the clause.",
        notes: [
          "Который, которая, которое, and которые agree in gender and number with the noun they describe.",
          "The case comes from the relative clause, not from the main clause.",
          "Книга, которую я читаю uses которую because the book is the object of читаю."
        ],
        examples: [
          ["Человек, который идёт.", "The person who is walking."],
          ["Книга, которую я читаю.", "The book that I am reading."]
        ]
      },
      {
        id: "b2-participle",
        level: "B2",
        title: "Participles you meet in writing",
        lead: "Written Russian often uses a participle where speech uses который.",
        notes: [
          "A present active participle such as читающий means the one who is reading.",
          "A past passive participle such as прочитанный means something that has been read.",
          "Прочитанная книга agrees like an adjective, and everyday speech prefers a который clause."
        ],
        examples: [
          ["Человек, читающий газету.", "The person reading a newspaper."],
          ["Прочитанная книга лежит здесь.", "The book that has been read is here."]
        ]
      }
    ],
    cards: [
      {
        word: "быть",
        gloss: "to be",
        tag: "verb",
        forms: [
          ["present", "есть"],
          ["I future", "буду"],
          ["you future", "будешь"],
          ["past masculine", "был"],
          ["past feminine", "была"],
          ["past plural", "были"]
        ]
      },
      {
        word: "хотеть",
        gloss: "to want",
        tag: "verb",
        forms: [
          ["I", "хочу"],
          ["you", "хочешь"],
          ["he", "хочет"],
          ["we", "хотим"],
          ["they", "хотят"],
          ["past masculine", "хотел"]
        ]
      },
      {
        word: "идти",
        gloss: "to go on foot, one way",
        tag: "verb",
        forms: [
          ["I", "иду"],
          ["you", "идёшь"],
          ["he", "идёт"],
          ["we", "идём"],
          ["past masculine", "шёл"],
          ["past feminine", "шла"]
        ]
      },
      {
        word: "ходить",
        gloss: "to go on foot, not one single trip",
        tag: "verb",
        forms: [
          ["I", "хожу"],
          ["you", "ходишь"],
          ["he", "ходит"],
          ["we", "ходим"],
          ["past masculine", "ходил"],
          ["past feminine", "ходила"]
        ]
      },
      {
        word: "ехать",
        gloss: "to go by transport, one way",
        tag: "verb",
        forms: [
          ["I", "еду"],
          ["you", "едешь"],
          ["he", "едет"],
          ["we", "едем"],
          ["past masculine", "ехал"],
          ["past feminine", "ехала"]
        ]
      },
      {
        word: "есть",
        gloss: "to eat",
        tag: "verb",
        forms: [
          ["I", "ем"],
          ["you", "ешь"],
          ["he", "ест"],
          ["we", "едим"],
          ["past masculine", "ел"],
          ["past feminine", "ела"]
        ]
      },
      {
        word: "дать",
        gloss: "to give",
        tag: "verb",
        forms: [
          ["I", "дам"],
          ["you", "дашь"],
          ["he", "даст"],
          ["we", "дадим"],
          ["they", "дадут"],
          ["past masculine", "дал"]
        ]
      },
      {
        word: "мочь",
        gloss: "to be able",
        tag: "verb",
        forms: [
          ["I", "могу"],
          ["you", "можешь"],
          ["he", "может"],
          ["we", "можем"],
          ["past masculine", "мог"],
          ["past feminine", "могла"]
        ]
      },
      {
        word: "человек",
        gloss: "person",
        tag: "noun",
        forms: [
          ["nominative", "человек"],
          ["genitive", "человека"],
          ["plural", "люди"],
          ["plural genitive", "людей"]
        ]
      },
      {
        word: "ребёнок",
        gloss: "child",
        tag: "noun",
        forms: [
          ["nominative", "ребёнок"],
          ["genitive", "ребёнка"],
          ["plural", "дети"],
          ["plural genitive", "детей"]
        ]
      }
    ]
  },
  uk: {
    intro: "Ukrainian has no articles, the present of бути is є for every person, and the endings are not Russian endings.",
    lessons: [
      {
        id: "a1-endings",
        level: "A1",
        title: "Endings, not articles",
        lead: "There is no word for the or a, and the ending shows the job of the noun.",
        notes: [
          "Я тут is a full sentence, and the present of бути is usually left out.",
          "Ти is the friend-form, and ви is polite or plural.",
          "An adjective agrees with the noun, as in маленька жінка and маленький дім."
        ],
        examples: [
          ["Я тут.", "I am here."],
          ["Жінка тут.", "The woman is here."]
        ]
      },
      {
        id: "a1-ye",
        level: "A1",
        title: "Є for every person, and often left out",
        lead: "The present of бути is the same word є for every person, and speech often skips it.",
        notes: [
          "Я є, ти є, він є, and ми є all use that one word є.",
          "The present does not grow a special older shape for you, so ти takes the same є as every other person.",
          "The past is a different set, and it does change: був, була, було, були."
        ],
        examples: [
          ["Він є тут.", "He is here, with є said."],
          ["Я тут.", "I am here, with є left out."]
        ],
        table: {
          caption: "бути",
          heads: ["", "present", "past"],
          rows: [
            ["я", "є", "був / була"],
            ["ти", "є", "був / була"],
            ["він / вона", "є", "був / була"],
            ["ми", "є", "були"],
            ["вони", "є", "були"]
          ]
        }
      },
      {
        id: "a1-present",
        level: "A1",
        title: "A present, and the apostrophe",
        lead: "The present ending shows the person, and the apostrophe marks a sound of its own.",
        notes: [
          "Бачити is бачу, бачиш, бачить, бачимо, бачите, бачать.",
          "The apostrophe in п'ю and ім'я shows that the consonant and the next vowel stay separate.",
          "Хотіти is irregular: хочу, хочеш, хоче, хочемо, хочете, хочуть."
        ],
        examples: [
          ["Я бачу сонце.", "I see the sun."],
          ["Я п'ю воду.", "I drink water."]
        ],
        table: {
          caption: "Present",
          heads: ["", "бачити", "їсти", "хотіти"],
          rows: [
            ["я", "бачу", "їм", "хочу"],
            ["ти", "бачиш", "їси", "хочеш"],
            ["вона", "бачить", "їсть", "хоче"],
            ["ми", "бачимо", "їмо", "хочемо"]
          ]
        }
      },
      {
        id: "a2-accusative",
        level: "A2",
        title: "Accusative",
        lead: "The object takes the accusative, and a feminine noun in а often ends in у.",
        notes: [
          "Вода becomes воду, and жінка becomes жінку.",
          "An inanimate masculine such as дім stays дім as an object.",
          "A living masculine such as чоловік becomes чоловіка."
        ],
        examples: [
          ["Я бачу воду.", "I see the water."],
          ["Я бачу чоловіка.", "I see the man."]
        ],
        table: {
          caption: "Nominative and accusative",
          heads: ["noun", "nominative", "accusative"],
          rows: [
            ["water", "вода", "воду"],
            ["woman", "жінка", "жінку"],
            ["house", "дім", "дім"],
            ["man", "чоловік", "чоловіка"],
            ["sun", "сонце", "сонце"]
          ]
        }
      },
      {
        id: "a2-past",
        level: "A2",
        title: "The past and its gender",
        lead: "The past marks gender and number, not the person.",
        notes: [
          "Бачив is masculine, бачила is feminine, бачило is neuter, and бачили is plural.",
          "Я бачив and я бачила are both first person, and the ending follows the speaker.",
          "Бути in the past is був, була, було, and були, and this past is not dropped the way є often is."
        ],
        examples: [
          ["Вона бачила сонце.", "She saw the sun."],
          ["Вони були тут.", "They were here."]
        ],
        table: {
          caption: "Past",
          heads: ["", "бачити", "бути"],
          rows: [
            ["masculine", "бачив", "був"],
            ["feminine", "бачила", "була"],
            ["neuter", "бачило", "було"],
            ["plural", "бачили", "були"]
          ]
        }
      },
      {
        id: "a2-ity-jikhaty",
        level: "A2",
        title: "Іти and їхати",
        lead: "Іти is one trip on foot, and їхати is one trip by transport.",
        notes: [
          "Іти is іду, ідеш, іде, and the past is ішов, ішла, ішло, ішли.",
          "Їхати is їду, їдеш, їде, and the past is їхав, їхала, їхало, їхали.",
          "Learn these pasts as Ukrainian words, and do not rebuild them from a Russian past with new letters."
        ],
        examples: [
          ["Я іду додому.", "I am walking home."],
          ["Я їду додому.", "I am going home by transport."]
        ],
        table: {
          caption: "іти and їхати",
          heads: ["", "іти", "їхати"],
          rows: [
            ["я", "іду", "їду"],
            ["ти", "ідеш", "їдеш"],
            ["він", "іде", "їде"],
            ["past masculine", "ішов", "їхав"],
            ["past feminine", "ішла", "їхала"]
          ]
        }
      },
      {
        id: "b1-aspect",
        level: "B1",
        title: "Aspect",
        lead: "A verb is imperfective for a process or a habit, and perfective for a result.",
        notes: [
          "Читати is ongoing or repeated reading, and прочитати is reading through to the end.",
          "A perfective future has the shape of a present, so я прочитаю means I will finish reading it.",
          "An imperfective future uses бути, so я буду читати."
        ],
        examples: [
          ["Я читаю лист.", "I am reading the letter."],
          ["Я прочитаю лист.", "I will read the letter through."]
        ]
      },
      {
        id: "b1-motion",
        level: "B1",
        title: "Motion",
        lead: "Іти is one direction now, and ходити is walking as a habit or a round trip.",
        notes: [
          "Я іду до школи means I am on the way there once.",
          "Я ходжу до школи means I go to school as a habit.",
          "The transport pair is їхати for one trip and їздити for many, and you learn the pair rather than inventing a prefix."
        ],
        examples: [
          ["Я іду до школи.", "I am on my way to school."],
          ["Я ходжу до школи.", "I go to school as a habit."]
        ]
      },
      {
        id: "b2-yakyi",
        level: "B2",
        title: "Relative який",
        lead: "Який matches the noun, then takes the case of its job in the clause.",
        notes: [
          "Який, яка, яке, and які agree with the noun in gender and number.",
          "The case comes from the relative clause.",
          "Книжка, яку я читаю uses яку because the book is the object."
        ],
        examples: [
          ["Чоловік, який іде.", "The man who is walking."],
          ["Книжка, яку я читаю.", "The book that I am reading."]
        ]
      },
      {
        id: "b2-participle",
        level: "B2",
        title: "A participle in writing",
        lead: "Written Ukrainian can use a participle where speech uses який.",
        notes: [
          "A past passive participle such as прочитаний means something that has been read.",
          "It agrees like an adjective, so прочитана книжка is feminine and написаний лист is masculine.",
          "Everyday speech prefers a який clause, so treat the participle as a written form."
        ],
        examples: [
          ["Прочитана книжка лежить тут.", "The book that has been read is here."],
          ["Написаний лист лежить тут.", "The letter that has been written is here."]
        ]
      }
    ],
    cards: [
      {
        word: "бути",
        gloss: "to be",
        tag: "verb",
        forms: [
          ["I", "є"],
          ["you", "є"],
          ["he", "є"],
          ["we", "є"],
          ["you plural", "є"],
          ["they", "є"]
        ]
      },
      {
        word: "іти",
        gloss: "to go on foot, one way",
        tag: "verb",
        forms: [
          ["I", "іду"],
          ["you", "ідеш"],
          ["he", "іде"],
          ["we", "ідемо"],
          ["past masculine", "ішов"],
          ["past feminine", "ішла"]
        ]
      },
      {
        word: "їхати",
        gloss: "to go by transport, one way",
        tag: "verb",
        forms: [
          ["I", "їду"],
          ["you", "їдеш"],
          ["he", "їде"],
          ["we", "їдемо"],
          ["past masculine", "їхав"],
          ["past feminine", "їхала"]
        ]
      },
      {
        word: "ходити",
        gloss: "to go on foot, not one single trip",
        tag: "verb",
        forms: [
          ["I", "ходжу"],
          ["you", "ходиш"],
          ["he", "ходить"],
          ["we", "ходимо"],
          ["past masculine", "ходив"],
          ["past feminine", "ходила"]
        ]
      },
      {
        word: "їсти",
        gloss: "to eat",
        tag: "verb",
        forms: [
          ["I", "їм"],
          ["you", "їси"],
          ["she", "їсть"],
          ["we", "їмо"],
          ["past masculine", "їв"],
          ["past feminine", "їла"]
        ]
      },
      {
        word: "хотіти",
        gloss: "to want",
        tag: "verb",
        forms: [
          ["I", "хочу"],
          ["you", "хочеш"],
          ["he", "хоче"],
          ["we", "хочемо"],
          ["past masculine", "хотів"],
          ["past feminine", "хотіла"]
        ]
      },
      {
        word: "дати",
        gloss: "to give",
        tag: "verb",
        forms: [
          ["I", "дам"],
          ["you", "даси"],
          ["he", "дасть"],
          ["we", "дамо"],
          ["past masculine", "дав"],
          ["past feminine", "дала"]
        ]
      },
      {
        word: "пити",
        gloss: "to drink",
        tag: "verb",
        forms: [
          ["I", "п'ю"],
          ["you", "п'єш"],
          ["he", "п'є"],
          ["we", "п'ємо"],
          ["past masculine", "пив"],
          ["past feminine", "пила"]
        ]
      },
      {
        word: "дитина",
        gloss: "child",
        tag: "noun",
        forms: [
          ["nominative", "дитина"],
          ["accusative", "дитину"],
          ["plural", "діти"],
          ["plural genitive", "дітей"]
        ]
      },
      {
        word: "людина",
        gloss: "person",
        tag: "noun",
        forms: [
          ["nominative", "людина"],
          ["accusative", "людину"],
          ["plural", "люди"],
          ["plural genitive", "людей"]
        ]
      }
    ]
  },
  hr: {
    intro: "Standard Croatian here is ijekavian in Latin letters, with no articles, seven cases, and clitics in second position.",
    lessons: [
      {
        id: "a1-no-article",
        level: "A1",
        title: "No article",
        lead: "There is no word for the or a, and the ending shows case, gender, and number.",
        notes: [
          "Ja sam ovdje keeps the clitic sam in the second slot.",
          "Ti is the friend-form, and vi is polite or plural.",
          "Adjectives agree with the noun, so mlijeko je hladno uses the neuter form."
        ],
        examples: [
          ["Ja sam ovdje.", "I am here."],
          ["Mlijeko je hladno.", "The milk is cold."]
        ]
      },
      {
        id: "a1-biti",
        level: "A1",
        title: "Biti and the present",
        lead: "The present of biti is the clitic set sam, si, je, smo, ste, su.",
        notes: [
          "These forms cannot be built by hanging a person ending on the infinitive biti.",
          "Je is the third person singular of biti.",
          "The negative is a separate set: nisam, nisi, nije, nismo, niste, nisu."
        ],
        examples: [
          ["Ja sam ovdje.", "I am here."],
          ["Ona nije ovdje.", "She is not here."]
        ],
        table: {
          caption: "Present of biti",
          heads: ["", "affirmative", "negative"],
          rows: [
            ["ja", "sam", "nisam"],
            ["ti", "si", "nisi"],
            ["ona", "je", "nije"],
            ["mi", "smo", "nismo"],
            ["oni", "su", "nisu"]
          ]
        }
      },
      {
        id: "a1-htjeti",
        level: "A1",
        title: "A regular present, then htjeti",
        lead: "Vidjeti follows a tidy present, and htjeti does not.",
        notes: [
          "Vidjeti is vidim, vidiš, vidi, vidimo, vidite, vide.",
          "Htjeti is hoću, hoćeš, hoće, hoćemo, hoćete, hoće.",
          "Jesti changes the stem as well: jedem, jedeš, jede."
        ],
        examples: [
          ["Vidim sunce.", "I see the sun."],
          ["Hoću kavu.", "I want coffee."]
        ],
        table: {
          caption: "Present",
          heads: ["", "vidjeti", "htjeti", "jesti"],
          rows: [
            ["ja", "vidim", "hoću", "jedem"],
            ["ti", "vidiš", "hoćeš", "jedeš"],
            ["ona", "vidi", "hoće", "jede"],
            ["mi", "vidimo", "hoćemo", "jedemo"]
          ]
        }
      },
      {
        id: "a2-accusative",
        level: "A2",
        title: "Accusative",
        lead: "The object stands in the accusative, and a feminine noun in a often ends in u.",
        notes: [
          "Voda becomes vodu, and kuća becomes kuću.",
          "An inanimate masculine such as grad stays grad.",
          "A living masculine such as čovjek becomes čovjeka."
        ],
        examples: [
          ["Vidim vodu.", "I see the water."],
          ["Vidim čovjeka.", "I see the man."]
        ],
        table: {
          caption: "Nominative and accusative",
          heads: ["noun", "nominative", "accusative"],
          rows: [
            ["water", "voda", "vodu"],
            ["house", "kuća", "kuću"],
            ["city", "grad", "grad"],
            ["man", "čovjek", "čovjeka"],
            ["milk", "mlijeko", "mlijeko"]
          ]
        }
      },
      {
        id: "a2-clitics",
        level: "A2",
        title: "Clitics in second position",
        lead: "Short words such as sam and ga want the second position in the sentence.",
        notes: [
          "If the sentence starts with jučer, the clitic comes next, as in Jučer sam vidio sunce.",
          "In a stack, the auxiliary comes before an object pronoun, as in Vidio sam ga.",
          "Do not park sam at the end just because English can put am at the end."
        ],
        examples: [
          ["Jučer sam vidio sunce.", "Yesterday I saw the sun."],
          ["Vidio sam ga.", "I saw him."]
        ]
      },
      {
        id: "a2-past",
        level: "A2",
        title: "The past with the participle",
        lead: "The past is a participle that marks gender, plus a clitic of biti.",
        notes: [
          "Vidio sam is masculine, and vidjela sam is feminine.",
          "The third person keeps je and still agrees, as in ona je vidjela.",
          "The participle of ići is išao, išla, which you cannot see inside idem."
        ],
        examples: [
          ["Vidio sam mlijeko.", "I saw the milk."],
          ["Ona je vidjela sunce.", "She saw the sun."]
        ],
        table: {
          caption: "Past of vidjeti",
          heads: ["", "masculine", "feminine"],
          rows: [
            ["ja", "vidio sam", "vidjela sam"],
            ["ti", "vidio si", "vidjela si"],
            ["on / ona", "vidio je", "vidjela je"],
            ["mi", "vidjeli smo", "vidjele smo"]
          ]
        }
      },
      {
        id: "b1-aspect",
        level: "B1",
        title: "Aspect",
        lead: "Imperfective verbs name a process or a habit, and perfective verbs name a result.",
        notes: [
          "Pisati is the process of writing, and napisati is writing something to the end.",
          "A perfective present usually points to the future, so napišem means I will write it.",
          "Learn each verb with its partner instead of inventing a prefix."
        ],
        examples: [
          ["Pišem pismo.", "I am writing a letter."],
          ["Napišem pismo.", "I will write the letter."]
        ]
      },
      {
        id: "b1-cases",
        level: "B1",
        title: "The other cases you need for a preposition",
        lead: "A preposition chooses the case, so learn the preposition and the case together.",
        notes: [
          "U and na take the locative when you are already there, as in u kući and na stolu.",
          "U and na take the accusative when you are moving to the place, as in u kuću.",
          "S takes the instrumental for company, as in s bratom."
        ],
        examples: [
          ["Knjiga je na stolu.", "The book is on the table."],
          ["Idem u kuću.", "I am going into the house."]
        ],
        table: {
          caption: "Preposition and case",
          heads: ["preposition", "case", "example"],
          rows: [
            ["u, place", "locative", "u kući"],
            ["u, motion", "accusative", "u kuću"],
            ["na, place", "locative", "na stolu"],
            ["s", "instrumental", "s bratom"]
          ]
        }
      },
      {
        id: "b2-koji",
        level: "B2",
        title: "Relative koji",
        lead: "Koji agrees with the noun, then takes the case of its own job.",
        notes: [
          "Koji, koja, and koje match gender and number.",
          "The case is the case inside the relative clause.",
          "Knjiga koju čitam uses koju because the book is the object of čitam."
        ],
        examples: [
          ["Čovjek koji ide.", "The man who is going."],
          ["Knjiga koju čitam.", "The book that I am reading."]
        ]
      },
      {
        id: "b2-bih",
        level: "B2",
        title: "The conditional bih",
        lead: "The conditional clitic is bih, bi, bi, bismo, biste, bi, plus a participle.",
        notes: [
          "Bih is only the first person singular, and bismo and biste mark we and you.",
          "The participle still shows gender, so išao bih is masculine and išla bih is feminine.",
          "Htio bih kavu means I would like coffee, and the clitic stays in second position."
        ],
        examples: [
          ["Išao bih kući.", "I would go home."],
          ["Htio bih kavu.", "I would like coffee."]
        ]
      }
    ],
    cards: [
      {
        word: "biti",
        gloss: "to be",
        tag: "verb",
        forms: [
          ["I", "sam"],
          ["you", "si"],
          ["she", "je"],
          ["we", "smo"],
          ["past masculine", "bio"],
          ["past feminine", "bila"]
        ]
      },
      {
        word: "htjeti",
        gloss: "to want",
        tag: "verb",
        forms: [
          ["I", "hoću"],
          ["you", "hoćeš"],
          ["he", "hoće"],
          ["we", "hoćemo"],
          ["past masculine", "htio"],
          ["past feminine", "htjela"]
        ]
      },
      {
        word: "ići",
        gloss: "to go",
        tag: "verb",
        forms: [
          ["I", "idem"],
          ["you", "ideš"],
          ["he", "ide"],
          ["we", "idemo"],
          ["past masculine", "išao"],
          ["past feminine", "išla"]
        ]
      },
      {
        word: "doći",
        gloss: "to come",
        tag: "verb",
        forms: [
          ["I", "dođem"],
          ["you", "dođeš"],
          ["he", "dođe"],
          ["we", "dođemo"],
          ["past masculine", "došao"],
          ["past feminine", "došla"]
        ]
      },
      {
        word: "jesti",
        gloss: "to eat",
        tag: "verb",
        forms: [
          ["I", "jedem"],
          ["you", "jedeš"],
          ["he", "jede"],
          ["we", "jedemo"],
          ["past masculine", "jeo"],
          ["past feminine", "jela"]
        ]
      },
      {
        word: "moći",
        gloss: "to be able",
        tag: "verb",
        forms: [
          ["I", "mogu"],
          ["you", "možeš"],
          ["he", "može"],
          ["we", "možemo"],
          ["past masculine", "mogao"],
          ["past feminine", "mogla"]
        ]
      },
      {
        word: "dati",
        gloss: "to give",
        tag: "verb",
        forms: [
          ["I", "dam"],
          ["you", "daš"],
          ["he", "da"],
          ["we", "damo"],
          ["past masculine", "dao"],
          ["past feminine", "dala"]
        ]
      },
      {
        word: "čovjek",
        gloss: "person",
        tag: "noun",
        forms: [
          ["nominative", "čovjek"],
          ["genitive", "čovjeka"],
          ["plural", "ljudi"],
          ["plural genitive", "ljudi"]
        ]
      },
      {
        word: "dijete",
        gloss: "child",
        tag: "noun",
        forms: [
          ["nominative", "dijete"],
          ["genitive", "djeteta"],
          ["plural", "djeca"],
          ["plural genitive", "djece"]
        ]
      }
    ]
  },
  sr: {
    intro: "Serbian here is ekavian and written in Cyrillic, with no articles and with clitics in second position.",
    lessons: [
      {
        id: "a1-no-article",
        level: "A1",
        title: "No article, in ekavian Cyrillic",
        lead: "There is no word for the or a, and these examples stay in ekavian Cyrillic.",
        notes: [
          "Ја сам овде keeps the clitic сам in the second slot.",
          "Ти is the friend-form, and ви is polite or plural.",
          "The vowel is ekavian је, so the milk is млеко, not an ijekavian spelling."
        ],
        examples: [
          ["Ја сам овде.", "I am here."],
          ["Млеко је хладно.", "The milk is cold."]
        ]
      },
      {
        id: "a1-biti",
        level: "A1",
        title: "Бити",
        lead: "The present of бити is сам, си, је, смо, сте, су.",
        notes: [
          "These forms cannot be built by hanging a person ending on бити.",
          "Је is the third person singular of бити.",
          "The negative is a separate set: нисам, ниси, није, нисмо, нисте, нису."
        ],
        examples: [
          ["Ја сам овде.", "I am here."],
          ["Она није овде.", "She is not here."]
        ],
        table: {
          caption: "Present of бити",
          heads: ["", "affirmative", "negative"],
          rows: [
            ["ја", "сам", "нисам"],
            ["ти", "си", "ниси"],
            ["она", "је", "није"],
            ["ми", "смо", "нисмо"],
            ["они", "су", "нису"]
          ]
        }
      },
      {
        id: "a1-hteti",
        level: "A1",
        title: "A present and хтети",
        lead: "Видети follows a tidy present, and хтети does not.",
        notes: [
          "Видети is видим, видиш, види, видимо, видите, виде.",
          "Хтети is хоћу, хоћеш, хоће, хоћемо, хоћете, хоће.",
          "Јести changes the stem as well: једем, једеш, једе."
        ],
        examples: [
          ["Видим сунце.", "I see the sun."],
          ["Хоћу кафу.", "I want coffee."]
        ],
        table: {
          caption: "Present",
          heads: ["", "видети", "хтети", "јести"],
          rows: [
            ["ја", "видим", "хоћу", "једем"],
            ["ти", "видиш", "хоћеш", "једеш"],
            ["она", "види", "хоће", "једе"],
            ["ми", "видимо", "хоћемо", "једемо"]
          ]
        }
      },
      {
        id: "a2-accusative",
        level: "A2",
        title: "Accusative",
        lead: "The object stands in the accusative, and a feminine noun in а often ends in у.",
        notes: [
          "Вода becomes воду, and кућа becomes кућу.",
          "An inanimate masculine such as град stays град.",
          "A living masculine such as човек becomes човека."
        ],
        examples: [
          ["Видим воду.", "I see the water."],
          ["Видим човека.", "I see the man."]
        ],
        table: {
          caption: "Nominative and accusative",
          heads: ["noun", "nominative", "accusative"],
          rows: [
            ["water", "вода", "воду"],
            ["house", "кућа", "кућу"],
            ["city", "град", "град"],
            ["man", "човек", "човека"],
            ["milk", "млеко", "млеко"]
          ]
        }
      },
      {
        id: "a2-clitics",
        level: "A2",
        title: "Clitics in second place",
        lead: "Short words such as сам and га want the second place in the sentence.",
        notes: [
          "If the sentence starts with јуче, the clitic comes next, as in Јуче сам видео сунце.",
          "In a stack, the auxiliary comes before an object pronoun, as in Видео сам га.",
          "Do not park сам at the end just because English can put am at the end."
        ],
        examples: [
          ["Јуче сам видео сунце.", "Yesterday I saw the sun."],
          ["Видео сам га.", "I saw him."]
        ]
      },
      {
        id: "a2-past",
        level: "A2",
        title: "The past",
        lead: "The past is a participle that marks gender, plus a clitic of бити.",
        notes: [
          "Видео сам is masculine, and видела сам is feminine, with ekavian е rather than ije.",
          "The third person keeps је and still agrees, as in она је видела.",
          "The participle of ићи is ишао, ишла, which you cannot see inside идем."
        ],
        examples: [
          ["Видео сам млеко.", "I saw the milk."],
          ["Она је видела сунце.", "She saw the sun."]
        ],
        table: {
          caption: "Past of видети",
          heads: ["", "masculine", "feminine"],
          rows: [
            ["ја", "видео сам", "видела сам"],
            ["ти", "видео си", "видела си"],
            ["он / она", "видео је", "видела је"],
            ["ми", "видели смо", "виделе смо"]
          ]
        }
      },
      {
        id: "b1-aspect",
        level: "B1",
        title: "Aspect",
        lead: "Imperfective verbs name a process or a habit, and perfective verbs name a result.",
        notes: [
          "Писати is the process of writing, and написати is writing something to the end.",
          "A perfective present usually points to the future, so напишем means I will write it.",
          "Learn each verb with its partner instead of inventing a prefix."
        ],
        examples: [
          ["Пишем писмо.", "I am writing a letter."],
          ["Напишем писмо.", "I will write the letter."]
        ]
      },
      {
        id: "b1-cases",
        level: "B1",
        title: "Cases with a preposition",
        lead: "A preposition chooses the case, so learn the preposition and the case together.",
        notes: [
          "У and на take the locative when you are already there, as in у кући and на столу.",
          "У and на take the accusative when you are moving to the place, as in у кућу.",
          "Са takes the instrumental for company, as in са братом."
        ],
        examples: [
          ["Књига је на столу.", "The book is on the table."],
          ["Идем у кућу.", "I am going into the house."]
        ],
        table: {
          caption: "Preposition and case",
          heads: ["preposition", "case", "example"],
          rows: [
            ["у, place", "locative", "у кући"],
            ["у, motion", "accusative", "у кућу"],
            ["на, place", "locative", "на столу"],
            ["са", "instrumental", "са братом"]
          ]
        }
      },
      {
        id: "b2-koji",
        level: "B2",
        title: "Relative који",
        lead: "Који agrees with the noun, then takes the case of its own job.",
        notes: [
          "Који, која, and које match gender and number.",
          "The case is the case inside the relative clause.",
          "Књига коју читам uses коју because the book is the object of читам."
        ],
        examples: [
          ["Човек који иде.", "The man who is going."],
          ["Књига коју читам.", "The book that I am reading."]
        ]
      },
      {
        id: "b2-conditional",
        level: "B2",
        title: "The conditional",
        lead: "The conditional clitic is бих, би, би, бисмо, бисте, би, plus a participle.",
        notes: [
          "Бих is only the first person singular, and бисмо and бисте mark we and you.",
          "The participle still shows gender, so ишао бих is masculine and ишла бих is feminine.",
          "Хтео бих кафу means I would like coffee, with the ekavian participle хтео."
        ],
        examples: [
          ["Ишао бих кући.", "I would go home."],
          ["Хтео бих кафу.", "I would like coffee."]
        ]
      }
    ],
    cards: [
      {
        word: "бити",
        gloss: "to be",
        tag: "verb",
        forms: [
          ["I", "сам"],
          ["you", "си"],
          ["she", "је"],
          ["we", "смо"],
          ["past masculine", "био"],
          ["past feminine", "била"]
        ]
      },
      {
        word: "хтети",
        gloss: "to want",
        tag: "verb",
        forms: [
          ["I", "хоћу"],
          ["you", "хоћеш"],
          ["he", "хоће"],
          ["we", "хоћемо"],
          ["past masculine", "хтео"],
          ["past feminine", "хтела"]
        ]
      },
      {
        word: "ићи",
        gloss: "to go",
        tag: "verb",
        forms: [
          ["I", "идем"],
          ["you", "идеш"],
          ["he", "иде"],
          ["we", "идемо"],
          ["past masculine", "ишао"],
          ["past feminine", "ишла"]
        ]
      },
      {
        word: "доћи",
        gloss: "to come",
        tag: "verb",
        forms: [
          ["I", "дођем"],
          ["you", "дођеш"],
          ["he", "дође"],
          ["we", "дођемо"],
          ["past masculine", "дошао"],
          ["past feminine", "дошла"]
        ]
      },
      {
        word: "јести",
        gloss: "to eat",
        tag: "verb",
        forms: [
          ["I", "једем"],
          ["you", "једеш"],
          ["he", "једе"],
          ["we", "једемо"],
          ["past masculine", "јео"],
          ["past feminine", "јела"]
        ]
      },
      {
        word: "моћи",
        gloss: "to be able",
        tag: "verb",
        forms: [
          ["I", "могу"],
          ["you", "можеш"],
          ["he", "може"],
          ["we", "можемо"],
          ["past masculine", "могао"],
          ["past feminine", "могла"]
        ]
      },
      {
        word: "дати",
        gloss: "to give",
        tag: "verb",
        forms: [
          ["I", "дам"],
          ["you", "даш"],
          ["he", "да"],
          ["we", "дамо"],
          ["past masculine", "дао"],
          ["past feminine", "дала"]
        ]
      },
      {
        word: "човек",
        gloss: "person",
        tag: "noun",
        forms: [
          ["nominative", "човек"],
          ["genitive", "човека"],
          ["plural", "људи"],
          ["plural genitive", "људи"]
        ]
      },
      {
        word: "дете",
        gloss: "child",
        tag: "noun",
        forms: [
          ["nominative", "дете"],
          ["genitive", "детета"],
          ["plural", "деца"],
          ["plural genitive", "деце"]
        ]
      }
    ]
  },
  sl: {
    intro: "Slovenian has no articles, six cases, and a real dual that means exactly two.",
    lessons: [
      {
        id: "a1-no-article",
        level: "A1",
        title: "No article",
        lead: "There is no word for the or a, and the ending carries gender, number, and case.",
        notes: [
          "Jaz sem tukaj is a full sentence, and the pronoun can drop once the ending is clear.",
          "Ti is the friend-form.",
          "Adjectives agree, as in hladna voda and majhna hiša."
        ],
        examples: [
          ["Jaz sem tukaj.", "I am here."],
          ["Voda je hladna.", "The water is cold."]
        ]
      },
      {
        id: "a1-biti",
        level: "A1",
        title: "Biti",
        lead: "Biti is irregular from the first person, and sem is not a stem plus a normal ending.",
        notes: [
          "The singular and plural present is sem, si, je, smo, ste, so.",
          "The negative is nisem, nisi, ni, nismo, niste, niso.",
          "The past participle is bil, bila, bilo, and the future begins with bom, boš, bo."
        ],
        examples: [
          ["Jaz sem tukaj.", "I am here."],
          ["On ni tukaj.", "He is not here."]
        ],
        table: {
          caption: "Present of biti, singular and plural",
          heads: ["", "affirmative", "negative"],
          rows: [
            ["jaz", "sem", "nisem"],
            ["ti", "si", "nisi"],
            ["ona", "je", "ni"],
            ["mi", "smo", "nismo"],
            ["oni", "so", "niso"]
          ]
        }
      },
      {
        id: "a1-present",
        level: "A1",
        title: "A present",
        lead: "A regular present shows the person, and a few verbs hide the infinitive.",
        notes: [
          "Videti is vidim, vidiš, vidi, vidimo, vidite, vidijo.",
          "Jesti is jem, ješ, je, and iti is grem, greš, gre.",
          "Hoteti is hočem, hočeš, hoče."
        ],
        examples: [
          ["Vidim sonce.", "I see the sun."],
          ["Grem domov.", "I am going home."]
        ],
        table: {
          caption: "Present",
          heads: ["", "videti", "jesti", "iti"],
          rows: [
            ["jaz", "vidim", "jem", "grem"],
            ["ti", "vidiš", "ješ", "greš"],
            ["ona", "vidi", "je", "gre"],
            ["mi", "vidimo", "jemo", "gremo"]
          ]
        }
      },
      {
        id: "a2-accusative",
        level: "A2",
        title: "Accusative",
        lead: "The object is accusative, and a feminine noun in a often ends in o.",
        notes: [
          "Hiša becomes hišo, and voda becomes vodo.",
          "That o is not the Croatian u, so do not say vodu for Slovenian water.",
          "A living masculine such as človek becomes človeka."
        ],
        examples: [
          ["Vidim hišo.", "I see the house."],
          ["Vidim človeka.", "I see the person."]
        ],
        table: {
          caption: "Nominative and accusative",
          heads: ["noun", "nominative", "accusative"],
          rows: [
            ["water", "voda", "vodo"],
            ["house", "hiša", "hišo"],
            ["town", "mesto", "mesto"],
            ["person", "človek", "človeka"],
            ["sun", "sonce", "sonce"]
          ]
        }
      },
      {
        id: "a2-past",
        level: "A2",
        title: "The past",
        lead: "The past uses a participle that agrees in gender, with biti as the helper.",
        notes: [
          "Bil sem is masculine, and bila sem is feminine.",
          "The third person uses je, as in ona je bila.",
          "The participle of iti is šel, šla, not a piece of grem."
        ],
        examples: [
          ["Bil sem doma.", "I was at home."],
          ["Ona je šla domov.", "She went home."]
        ]
      },
      {
        id: "a2-aspect",
        level: "A2",
        title: "Aspect",
        lead: "Imperfective verbs name a process or a habit, and perfective verbs name a result.",
        notes: [
          "Pisati is the process, and napisati is the completed writing.",
          "A perfective present usually means a future result, so napišem means I will write it.",
          "Learn the partner with the verb instead of inventing a prefix."
        ],
        examples: [
          ["Pišem pismo.", "I am writing a letter."],
          ["Napišem pismo.", "I will write the letter."]
        ]
      },
      {
        id: "b1-dual",
        level: "B1",
        title: "Dual, once, with a real example",
        lead: "The dual is a real number for exactly two, beside the singular and the plural.",
        notes: [
          "Midva sva tukaj means we two are here, and sva is the dual of biti, not a polite plural.",
          "The dual of biti for you two and for they two is sta.",
          "Add the dual only when the sentence really means two, and do not treat it as a kind of plural."
        ],
        examples: [
          ["Midva sva tukaj.", "We two are here."],
          ["Onadva sta doma.", "Those two are at home."]
        ],
        table: {
          caption: "biti for one group and for exactly two",
          heads: ["", "plural", "dual"],
          rows: [
            ["we", "smo", "sva"],
            ["you", "ste", "sta"],
            ["they", "so", "sta"]
          ]
        }
      },
      {
        id: "b1-cases",
        level: "B1",
        title: "Cases with a preposition",
        lead: "Learn the preposition with the case it demands.",
        notes: [
          "V and na take the locative for a place you are already in, as in v hiši and na mizi.",
          "V takes the accusative for movement into that place, as in v hišo.",
          "Z takes the instrumental, as in z bratom."
        ],
        examples: [
          ["Knjiga je na mizi.", "The book is on the table."],
          ["Grem v hišo.", "I am going into the house."]
        ],
        table: {
          caption: "Preposition and case",
          heads: ["preposition", "case", "example"],
          rows: [
            ["v, place", "locative", "v hiši"],
            ["v, motion", "accusative", "v hišo"],
            ["na, place", "locative", "na mizi"],
            ["z", "instrumental", "z bratom"]
          ]
        }
      },
      {
        id: "b2-ki",
        level: "B2",
        title: "Relative ki",
        lead: "Ki does not change, and the case shows up on a short pronoun when it is needed.",
        notes: [
          "Človek, ki pride means the person who is coming, and ki stays ki for every gender.",
          "If the noun is the object, add a clitic, as in človek, ki ga vidim.",
          "A feminine object uses jo, as in hiša, ki jo vidim."
        ],
        examples: [
          ["Človek, ki pride.", "The person who is coming."],
          ["Hiša, ki jo vidim.", "The house that I see."]
        ]
      },
      {
        id: "b2-conditional",
        level: "B2",
        title: "The conditional",
        lead: "The conditional marker is bi for every person, plus a participle that still shows gender.",
        notes: [
          "Bi does not change for I, you, or she.",
          "Šel bi is masculine, and šla bi is feminine.",
          "Rad bi kavo is I would like coffee when the speaker is masculine, and rada bi is the feminine."
        ],
        examples: [
          ["Jaz bi šel domov.", "I would go home."],
          ["Rad bi kavo.", "I would like coffee."]
        ]
      }
    ],
    cards: [
      {
        word: "biti",
        gloss: "to be",
        tag: "verb",
        forms: [
          ["I", "sem"],
          ["you", "si"],
          ["he", "je"],
          ["we", "smo"],
          ["we two", "sva"],
          ["they two", "sta"]
        ]
      },
      {
        word: "iti",
        gloss: "to go",
        tag: "verb",
        forms: [
          ["I", "grem"],
          ["you", "greš"],
          ["he", "gre"],
          ["we", "gremo"],
          ["past masculine", "šel"],
          ["past feminine", "šla"]
        ]
      },
      {
        word: "jesti",
        gloss: "to eat",
        tag: "verb",
        forms: [
          ["I", "jem"],
          ["you", "ješ"],
          ["he", "je"],
          ["we", "jemo"],
          ["past masculine", "jedel"],
          ["past feminine", "jedla"]
        ]
      },
      {
        word: "hoteti",
        gloss: "to want",
        tag: "verb",
        forms: [
          ["I", "hočem"],
          ["you", "hočeš"],
          ["he", "hoče"],
          ["we", "hočemo"],
          ["past masculine", "hotel"],
          ["past feminine", "hotela"]
        ]
      },
      {
        word: "moči",
        gloss: "to be able",
        tag: "verb",
        forms: [
          ["I", "morem"],
          ["you", "moreš"],
          ["he", "more"],
          ["we", "moremo"],
          ["past masculine", "mogel"],
          ["past feminine", "mogla"]
        ]
      },
      {
        word: "dati",
        gloss: "to give",
        tag: "verb",
        forms: [
          ["I", "dam"],
          ["you", "daš"],
          ["he", "da"],
          ["we", "damo"],
          ["past masculine", "dal"],
          ["past feminine", "dala"]
        ]
      },
      {
        word: "človek",
        gloss: "person",
        tag: "noun",
        forms: [
          ["nominative", "človek"],
          ["genitive", "človeka"],
          ["plural", "ljudje"],
          ["plural genitive", "ljudi"]
        ]
      },
      {
        word: "otrok",
        gloss: "child",
        tag: "noun",
        forms: [
          ["nominative", "otrok"],
          ["genitive", "otroka"],
          ["plural", "otroci"],
          ["plural genitive", "otrok"]
        ]
      }
    ]
  },
  mk: {
    intro: "Macedonian hangs the article on the end of the word and has no infinitive.",
    lessons: [
      {
        id: "a1-article",
        level: "A1",
        title: "The article is -от, -та, or -то",
        lead: "The definite article is a suffix, and it agrees with gender.",
        notes: [
          "Мажот is a definite masculine, жената a definite feminine, and детето a definite neuter.",
          "A form with no suffix is indefinite.",
          "There is no separate word for the that stands in front of the noun."
        ],
        examples: [
          ["Жената е тука.", "The woman is here."],
          ["Детето спие.", "The child is sleeping."]
        ],
        table: {
          caption: "The suffix article",
          heads: ["gender", "indefinite", "definite"],
          rows: [
            ["masculine", "маж", "мажот"],
            ["feminine", "жена", "жената"],
            ["neuter", "дете", "детето"],
            ["water", "вода", "водата"],
            ["house", "куќа", "куќата"]
          ]
        }
      },
      {
        id: "a1-sum",
        level: "A1",
        title: "Сум",
        lead: "Сум is irregular, and it is the verb you need for to be.",
        notes: [
          "The present is сум, си, е, сме, сте, се.",
          "Не сум is the negative, with не in front of the verb.",
          "The past бев, беше, бевме, беа does not look like that present."
        ],
        examples: [
          ["Јас сум тука.", "I am here."],
          ["Ти си тука.", "You are here."]
        ],
        table: {
          caption: "сум",
          heads: ["", "present", "past"],
          rows: [
            ["јас", "сум", "бев"],
            ["ти", "си", "беше"],
            ["таа", "е", "беше"],
            ["ние", "сме", "бевме"],
            ["тие", "се", "беа"]
          ]
        }
      },
      {
        id: "a1-present",
        level: "A1",
        title: "A present",
        lead: "Cite the verb as the I-form, because there is no infinitive.",
        notes: [
          "Гледам, гледаш, гледа, гледаме, гледате, гледаат is a regular present.",
          "Јадам, јадеш, јаде keeps a different shape after the first person.",
          "Сакам да јадам means I want to eat, with да plus a finite verb rather than an infinitive."
        ],
        examples: [
          ["Јадам леб.", "I am eating bread."],
          ["Сакам да јадам.", "I want to eat."]
        ],
        table: {
          caption: "Present",
          heads: ["", "гледам", "јадам"],
          rows: [
            ["јас", "гледам", "јадам"],
            ["ти", "гледаш", "јадеш"],
            ["таа", "гледа", "јаде"],
            ["ние", "гледаме", "јадеме"]
          ]
        }
      },
      {
        id: "a2-clitics",
        level: "A2",
        title: "Clitic pronouns",
        lead: "Short object pronouns sit next to the verb.",
        notes: [
          "Го is a masculine or neuter object, ја is feminine, and ги is plural.",
          "Ме and те are me and you as objects.",
          "The clitic is normal even in a short sentence such as Го гледам."
        ],
        examples: [
          ["Го гледам.", "I see him."],
          ["Ја читам книгата.", "I am reading the book."]
        ],
        table: {
          caption: "Object clitics",
          heads: ["job", "clitic"],
          rows: [
            ["me", "ме"],
            ["you", "те"],
            ["him or it", "го"],
            ["her", "ја"],
            ["them", "ги"]
          ]
        }
      },
      {
        id: "a2-past",
        level: "A2",
        title: "The past with има or the aorist you recognise",
        lead: "Имам plus a neuter participle is a have-past, and a short aorist is a finished event.",
        notes: [
          "Имам јадено means I have eaten, and the participle stays in the neuter form јадено.",
          "Видов means I saw, and дојде in Тој дојде means he came.",
          "You only need to recognise these common aorists at first, not to build every one."
        ],
        examples: [
          ["Имам јадено.", "I have eaten."],
          ["Тој дојде.", "He came."]
        ]
      },
      {
        id: "a2-aspect",
        level: "A2",
        title: "Aspect without an infinitive",
        lead: "Aspect is still a split between process and result, but both halves are finite forms.",
        notes: [
          "Читам is the process of reading, and прочитам is reading something to the end.",
          "Доаѓам is coming as a process, and дојдам is the perfective you use after ќе or да.",
          "There is no infinitive to mark the pair, so learn the two finite shapes together."
        ],
        examples: [
          ["Читам книга.", "I am reading a book."],
          ["Сакам да прочитам.", "I want to finish reading."]
        ]
      },
      {
        id: "b1-article-place",
        level: "B1",
        title: "The definite ending and where it attaches",
        lead: "The article suffix hangs on the first word of the noun phrase.",
        notes: [
          "If an adjective comes first, the suffix moves onto the adjective, so добрата жена is right and добра жената is not.",
          "Мажот, жената, and детето are the suffixes when the noun itself comes first.",
          "A plural such as жените takes -те, and децата takes -та."
        ],
        examples: [
          ["Добрата жена е тука.", "The good woman is here."],
          ["Новиот маж е тука.", "The new man is here."]
        ],
        table: {
          caption: "Where the suffix sits",
          heads: ["phrase", "indefinite", "definite"],
          rows: [
            ["woman", "жена", "жената"],
            ["good woman", "добра жена", "добрата жена"],
            ["man", "маж", "мажот"],
            ["new man", "нов маж", "новиот маж"]
          ]
        }
      },
      {
        id: "b1-reduplication",
        level: "B1",
        title: "Object reduplication",
        lead: "A definite object is often said twice, once as a clitic and once as the noun.",
        notes: [
          "Го гледам мажот doubles the masculine object with го.",
          "Ја читам книгата doubles the feminine object with ја.",
          "The clitic stays even when the noun is there, and this is normal, not emphasis."
        ],
        examples: [
          ["Го гледам мажот.", "I see the man."],
          ["Ја читам книгата.", "I am reading the book."]
        ]
      },
      {
        id: "b2-relative",
        level: "B2",
        title: "Relative што and кој",
        lead: "Што does not change, and кој agrees when you need a gendered who.",
        notes: [
          "Човекот што дојде uses the indeclinable што.",
          "Кој, која, кое, and кои can mark gender and number instead.",
          "If the noun is the object, the clitic still appears, as in книгата што ја читам."
        ],
        examples: [
          ["Човекот што дојде.", "The person who came."],
          ["Книгата што ја читам.", "The book that I am reading."]
        ]
      },
      {
        id: "b2-future",
        level: "B2",
        title: "The future with ќе",
        lead: "Ќе plus a present form makes the future.",
        notes: [
          "Ќе читам means I will read, and ќе дојдам means I will come.",
          "Ќе is a particle, not a verb you conjugate.",
          "The negative future is нема да plus the present, as in нема да дојдам."
        ],
        examples: [
          ["Ќе дојдам утре.", "I will come tomorrow."],
          ["Нема да дојдам.", "I will not come."]
        ]
      }
    ],
    cards: [
      {
        word: "сум",
        gloss: "to be",
        tag: "verb",
        forms: [
          ["I", "сум"],
          ["you", "си"],
          ["she", "е"],
          ["we", "сме"],
          ["past I", "бев"],
          ["past they", "беа"]
        ]
      },
      {
        word: "одам",
        gloss: "I go",
        tag: "verb",
        forms: [
          ["I", "одам"],
          ["you", "одиш"],
          ["he", "оди"],
          ["we", "одиме"],
          ["past I", "отидов"],
          ["past he", "отиде"]
        ]
      },
      {
        word: "дојдам",
        gloss: "I come, perfective",
        tag: "verb",
        forms: [
          ["I", "дојдам"],
          ["you", "дојдеш"],
          ["he", "дојде"],
          ["aorist I", "дојдов"]
        ]
      },
      {
        word: "јадам",
        gloss: "I eat",
        tag: "verb",
        forms: [
          ["I", "јадам"],
          ["you", "јадеш"],
          ["she", "јаде"],
          ["we", "јадеме"],
          ["they", "јадат"]
        ]
      },
      {
        word: "видам",
        gloss: "I see, perfective",
        tag: "verb",
        forms: [
          ["I", "видам"],
          ["you", "видиш"],
          ["he", "види"],
          ["aorist I", "видов"],
          ["aorist he", "виде"]
        ]
      },
      {
        word: "дадам",
        gloss: "I give, perfective",
        tag: "verb",
        forms: [
          ["I", "дадам"],
          ["you", "дадеш"],
          ["he", "даде"],
          ["aorist I", "дадов"]
        ]
      },
      {
        word: "човек",
        gloss: "person",
        tag: "noun",
        forms: [
          ["nominative", "човек"],
          ["definite", "човекот"],
          ["plural", "луѓе"],
          ["plural definite", "луѓето"]
        ]
      },
      {
        word: "дете",
        gloss: "child",
        tag: "noun",
        forms: [
          ["nominative", "дете"],
          ["definite", "детето"],
          ["plural", "деца"],
          ["plural definite", "децата"]
        ]
      }
    ]
  },
  bg: {
    intro: "Bulgarian hangs the article on the end of the word and uses a finite verb where other languages use an infinitive.",
    lessons: [
      {
        id: "a1-article",
        level: "A1",
        title: "The article is a suffix",
        lead: "The definite article is an ending on the word, not a separate word in front.",
        notes: [
          "Жената, детето, and водата are definite, and the form without the suffix is indefinite.",
          "A masculine noun has a long written form and a short written form, and a later lesson separates them.",
          "Gender is still masculine, feminine, or neuter, even though the noun does not take a Russian case ending."
        ],
        examples: [
          ["Жената е тук.", "The woman is here."],
          ["Детето спи.", "The child is sleeping."]
        ],
        table: {
          caption: "Suffix article",
          heads: ["", "indefinite", "definite"],
          rows: [
            ["woman", "жена", "жената"],
            ["child", "дете", "детето"],
            ["water", "вода", "водата"],
            ["house", "къща", "къщата"],
            ["man as subject", "мъж", "мъжът"]
          ]
        }
      },
      {
        id: "a1-sam",
        level: "A1",
        title: "Съм",
        lead: "Съм is irregular, and it does the work of to be.",
        notes: [
          "The present is съм, си, е, сме, сте, са.",
          "The past is бях, беше, бяхме, бяхте, бяха.",
          "Не съм is the negative, with не in front of the verb."
        ],
        examples: [
          ["Аз съм тук.", "I am here."],
          ["Тя не е тук.", "She is not here."]
        ],
        table: {
          caption: "съм",
          heads: ["", "present", "past"],
          rows: [
            ["аз", "съм", "бях"],
            ["ти", "си", "беше"],
            ["тя", "е", "беше"],
            ["ние", "сме", "бяхме"],
            ["те", "са", "бяха"]
          ]
        }
      },
      {
        id: "a1-no-infinitive",
        level: "A1",
        title: "There is no infinitive",
        lead: "There is no infinitive, so the dictionary form is the I-form of the present.",
        notes: [
          "Виждам, виждаш, вижда is see, and you cite the verb as виждам.",
          "Ям, ядеш, яде does not follow that same first-person shape.",
          "Another verb cannot take an infinitive after it, which is why the next lesson uses да."
        ],
        examples: [
          ["Виждам слънцето.", "I see the sun."],
          ["Ядем хляб.", "We are eating bread."]
        ],
        table: {
          caption: "Present, cited from the I-form",
          heads: ["", "виждам", "ям"],
          rows: [
            ["аз", "виждам", "ям"],
            ["ти", "виждаш", "ядеш"],
            ["тя", "вижда", "яде"],
            ["ние", "виждаме", "ядем"]
          ]
        }
      },
      {
        id: "a2-da",
        level: "A2",
        title: "Да plus a finite verb",
        lead: "Да plus a verb that already shows the person replaces the infinitive.",
        notes: [
          "Искам да ям means I want to eat, and ям is a finite I-form.",
          "Искаш да ядеш changes the second verb when the person changes.",
          "Мога да чета means I can read, again with a finite verb after да."
        ],
        examples: [
          ["Искам да ям.", "I want to eat."],
          ["Мога да чета.", "I can read."]
        ]
      },
      {
        id: "a2-past",
        level: "A2",
        title: "The past",
        lead: "The aorist is a finished event, and it often uses a stem you cannot see in the present.",
        notes: [
          "Ядох is I ate, and дойде in Тя дойде is she came.",
          "Бях is the past of съм, not a form built by adding an ending to съм.",
          "Чел съм, with the participle and съм, is the perfect, closer to I have read."
        ],
        examples: [
          ["Вчера ядох хляб.", "Yesterday I ate bread."],
          ["Тя дойде.", "She came."]
        ]
      },
      {
        id: "a2-shte",
        level: "A2",
        title: "Ще for the future",
        lead: "Ще plus a present form makes the future.",
        notes: [
          "Ще чета means I will read, and ще дойда means I will come.",
          "Ще is a particle, and it does not take a person ending.",
          "The negative future is няма да plus the present, as in няма да дойда."
        ],
        examples: [
          ["Ще дойда утре.", "I will come tomorrow."],
          ["Няма да дойда.", "I will not come."]
        ]
      },
      {
        id: "b1-aspect",
        level: "B1",
        title: "Aspect",
        lead: "Imperfective forms name a process or a habit, and perfective forms name a result.",
        notes: [
          "Чета is the process of reading, and прочета is reading something through.",
          "Идвам is coming as a process, and дойда is the perfective partner.",
          "After ще or да, a perfective present points to one completed event."
        ],
        examples: [
          ["Чета книга.", "I am reading a book."],
          ["Ще прочета книгата.", "I will read the book through."]
        ],
        table: {
          caption: "Process and result",
          heads: ["meaning", "imperfective", "perfective"],
          rows: [
            ["read", "чета", "прочета"],
            ["come", "идвам", "дойда"],
            ["write", "пиша", "напиша"],
            ["see", "виждам", "видя"]
          ]
        }
      },
      {
        id: "b1-clitics",
        level: "B1",
        title: "Clitic pronouns and reduplication",
        lead: "A short pronoun can double a definite object.",
        notes: [
          "Го is a masculine object, я is feminine, and ги is plural.",
          "Книгата я чета says the book twice, once as the noun and once as я.",
          "The doubling is ordinary with a definite object, not a special emphasis."
        ],
        examples: [
          ["Книгата я чета.", "I am reading the book."],
          ["Виждам го.", "I see him."]
        ]
      },
      {
        id: "b2-koyto",
        level: "B2",
        title: "Relative който",
        lead: "Който agrees in gender and number, then takes its role in the clause.",
        notes: [
          "Който is masculine, която is feminine, което is neuter, and които is plural.",
          "Човекът, който чете uses който because the man is the subject of чете.",
          "Книгата, която чета uses която because the book is feminine and it is the object."
        ],
        examples: [
          ["Човекът, който чете.", "The man who is reading."],
          ["Книгата, която чета.", "The book that I am reading."]
        ]
      },
      {
        id: "b2-article-form",
        level: "B2",
        title: "The masculine article, full and short",
        lead: "In writing, a masculine noun takes -ът as the subject and -а everywhere else.",
        notes: [
          "The full ending -ът is the written subject form, and the short ending -а is the written form for an object or after a preposition.",
          "Човекът е тук is the subject, and виждам човека is the object.",
          "Feminine -та and neuter -то do not have this full and short pair."
        ],
        examples: [
          ["Човекът е тук.", "The man is here."],
          ["Виждам човека.", "I see the man."]
        ],
        table: {
          caption: "Written masculine article",
          heads: ["job", "form", "example"],
          rows: [
            ["subject", "full -ът", "човекът е тук"],
            ["object", "short -а", "виждам човека"],
            ["after a preposition", "short -а", "с мъжа"]
          ]
        }
      }
    ],
    cards: [
      {
        word: "съм",
        gloss: "to be",
        tag: "verb",
        forms: [
          ["I", "съм"],
          ["you", "си"],
          ["she", "е"],
          ["we", "сме"],
          ["past I", "бях"],
          ["past she", "беше"]
        ]
      },
      {
        word: "ям",
        gloss: "I eat",
        tag: "verb",
        forms: [
          ["I", "ям"],
          ["you", "ядеш"],
          ["she", "яде"],
          ["we", "ядем"],
          ["aorist I", "ядох"],
          ["participle masculine", "ял"]
        ]
      },
      {
        word: "мога",
        gloss: "I can",
        tag: "verb",
        forms: [
          ["I", "мога"],
          ["you", "можеш"],
          ["he", "може"],
          ["we", "можем"],
          ["aorist I", "можах"],
          ["participle masculine", "могъл"]
        ]
      },
      {
        word: "дойда",
        gloss: "I come, perfective",
        tag: "verb",
        forms: [
          ["I", "дойда"],
          ["you", "дойдеш"],
          ["he", "дойде"],
          ["aorist I", "дойдох"],
          ["participle masculine", "дошъл"],
          ["participle feminine", "дошла"]
        ]
      },
      {
        word: "видя",
        gloss: "I see, perfective",
        tag: "verb",
        forms: [
          ["I", "видя"],
          ["you", "видиш"],
          ["he", "види"],
          ["aorist I", "видях"],
          ["participle masculine", "видял"],
          ["participle feminine", "видяла"]
        ]
      },
      {
        word: "дам",
        gloss: "I give, perfective",
        tag: "verb",
        forms: [
          ["I", "дам"],
          ["you", "дадеш"],
          ["he", "даде"],
          ["aorist I", "дадох"],
          ["participle masculine", "дал"],
          ["participle feminine", "дала"]
        ]
      },
      {
        word: "бъда",
        gloss: "I be, perfective",
        tag: "verb",
        forms: [
          ["I", "бъда"],
          ["you", "бъдеш"],
          ["he", "бъде"],
          ["we", "бъдем"]
        ]
      },
      {
        word: "нямам",
        gloss: "I do not have",
        tag: "verb",
        forms: [
          ["I", "нямам"],
          ["you", "нямаш"],
          ["he", "няма"],
          ["we", "нямаме"]
        ]
      },
      {
        word: "човек",
        gloss: "person",
        tag: "noun",
        forms: [
          ["nominative", "човек"],
          ["subject definite", "човекът"],
          ["object definite", "човека"],
          ["plural", "хора"]
        ]
      },
      {
        word: "дете",
        gloss: "child",
        tag: "noun",
        forms: [
          ["nominative", "дете"],
          ["definite", "детето"],
          ["plural", "деца"],
          ["plural definite", "децата"]
        ]
      }
    ]
  },
  pl: {
    intro: "Polish has no articles, so case endings and aspect carry the grammar.",
    lessons: [
      {
        id: "a1-no-article",
        level: "A1",
        title: "No article",
        lead: "There is no word for the or a, and the ending shows the job of the noun.",
        notes: [
          "Jestem tutaj needs no pronoun, because the verb already says I.",
          "Ty is the friend-form, and pan or pani is the polite address.",
          "Adjectives agree, as in zimna woda and mały dom."
        ],
        examples: [
          ["Jestem tutaj.", "I am here."],
          ["Woda jest zimna.", "The water is cold."]
        ]
      },
      {
        id: "a1-byc-miec",
        level: "A1",
        title: "Być and mieć",
        lead: "Być and mieć are irregular, and both show up in ordinary sentences.",
        notes: [
          "Być is jestem, jesteś, jest, jesteśmy, jesteście, są.",
          "Mieć is mam, masz, ma, mamy, macie, mają.",
          "The future of być is będę, będziesz, będzie, and it is not the present with a new ending glued on."
        ],
        examples: [
          ["Jestem tutaj.", "I am here."],
          ["Mam chleb.", "I have bread."]
        ],
        table: {
          caption: "być and mieć",
          heads: ["", "być", "mieć"],
          rows: [
            ["ja", "jestem", "mam"],
            ["ty", "jesteś", "masz"],
            ["ona", "jest", "ma"],
            ["my", "jesteśmy", "mamy"],
            ["oni", "są", "mają"]
          ]
        }
      },
      {
        id: "a1-present",
        level: "A1",
        title: "A present and a consonant alternation",
        lead: "The present shows the person, and the consonant often changes between forms.",
        notes: [
          "Widzieć is widzę, widzisz, widzi, with a different consonant in the first person from the second.",
          "Jeść does not keep the infinitive visible: jem, jesz, je, jedzą.",
          "Chcieć is chcę, chcesz, chce, chcą."
        ],
        examples: [
          ["Widzę słońce.", "I see the sun."],
          ["Jemy chleb.", "We are eating bread."]
        ],
        table: {
          caption: "Present",
          heads: ["", "widzieć", "jeść", "chcieć"],
          rows: [
            ["ja", "widzę", "jem", "chcę"],
            ["ty", "widzisz", "jesz", "chcesz"],
            ["ona", "widzi", "je", "chce"],
            ["oni", "widzą", "jedzą", "chcą"]
          ]
        }
      },
      {
        id: "a2-accusative",
        level: "A2",
        title: "Accusative and genitive of negation",
        lead: "The object is accusative, but under nie many objects switch to the genitive.",
        notes: [
          "Woda becomes wodę as an object, with the nasal vowel ę.",
          "Mam czas uses the accusative, and nie mam czasu uses the genitive.",
          "A living masculine object already has the genitive shape, so widzę człowieka stays człowieka under nie."
        ],
        examples: [
          ["Widzę wodę.", "I see the water."],
          ["Nie mam czasu.", "I do not have time."]
        ],
        table: {
          caption: "Object, and the same object under nie",
          heads: ["noun", "accusative", "after nie"],
          rows: [
            ["water", "wodę", "wody"],
            ["coffee", "kawę", "kawy"],
            ["time", "czas", "czasu"],
            ["bread", "chleb", "chleba"],
            ["person", "człowieka", "człowieka"]
          ]
        }
      },
      {
        id: "a2-aspect",
        level: "A2",
        title: "Aspect",
        lead: "Imperfective verbs name a process or a habit, and perfective verbs name a result.",
        notes: [
          "Czytać is the process, and przeczytać is reading something to the end.",
          "A perfective present has a future meaning, so przeczytam means I will read it through.",
          "The imperfective future uses być, so będę czytać."
        ],
        examples: [
          ["Czytam książkę.", "I am reading a book."],
          ["Przeczytam książkę.", "I will read the book through."]
        ]
      },
      {
        id: "a2-isc",
        level: "A2",
        title: "Motion iść",
        lead: "Iść is one trip on foot in one direction, and its past does not look like the present.",
        notes: [
          "The present is idę, idziesz, idzie, idziemy, idziecie, idą.",
          "The past is szedłem or szłam, and szedł or szła, not a form built from idę.",
          "Chodzić is the habit or the round trip, and pójść is a perfective partner you learn as its own verb."
        ],
        examples: [
          ["Idę do domu.", "I am walking home."],
          ["Wczoraj szedłem do domu.", "Yesterday I was walking home."]
        ],
        table: {
          caption: "iść",
          heads: ["", "present", "past"],
          rows: [
            ["ja, masculine", "idę", "szedłem"],
            ["ja, feminine", "idę", "szłam"],
            ["on", "idzie", "szedł"],
            ["ona", "idzie", "szła"],
            ["oni", "idą", "szli"]
          ]
        }
      },
      {
        id: "b1-past",
        level: "B1",
        title: "The past and gender",
        lead: "The past agrees with gender, and the person is an ending on that form.",
        notes: [
          "Czytałem is I, masculine, and czytałam is I, feminine.",
          "On czytał, ona czytała, and ono czytało have no extra person ending.",
          "Byłem and byłam are the past of być, and the choice is the gender of the speaker."
        ],
        examples: [
          ["Czytałam książkę.", "I was reading a book."],
          ["Byłem w domu.", "I was at home."]
        ],
        table: {
          caption: "Past of czytać",
          heads: ["", "masculine", "feminine"],
          rows: [
            ["ja", "czytałem", "czytałam"],
            ["ty", "czytałeś", "czytałaś"],
            ["on / ona", "czytał", "czytała"],
            ["my", "czytaliśmy", "czytałyśmy"]
          ]
        }
      },
      {
        id: "b1-cases",
        level: "B1",
        title: "Cases with prepositions",
        lead: "The preposition picks the case, and a stem vowel can change when the ending is added.",
        notes: [
          "Do takes the genitive, as in do domu, and w takes the locative for a place you are in, as in w domu.",
          "Stół becomes stołu once an ending opens the syllable, because ó alternates with o.",
          "Ząb becomes zęba for the same kind of reason, with ą alternating with ę."
        ],
        examples: [
          ["Idę do domu.", "I am going to the house."],
          ["Nie ma stołu.", "There is no table."]
        ]
      },
      {
        id: "b2-ktory",
        level: "B2",
        title: "Relative który",
        lead: "Który agrees with the noun, then takes the case of its job in the clause.",
        notes: [
          "Który, która, and które match gender and number.",
          "The case comes from the relative clause, not from the main clause.",
          "Książka, którą czytam uses którą because the book is the object."
        ],
        examples: [
          ["Człowiek, który idzie.", "The man who is walking."],
          ["Książka, którą czytam.", "The book that I am reading."]
        ]
      },
      {
        id: "b2-by",
        level: "B2",
        title: "Conditional by",
        lead: "The conditional builds by into the past form, together with a person ending.",
        notes: [
          "Chciałbym is I would like, masculine, and chciałabym is feminine.",
          "The marker shows up as bym, byś, or by, fused to the participle in a plain clause.",
          "Czytałbym książkę means I would read the book, and the gender vowel stays inside the form."
        ],
        examples: [
          ["Chciałbym kawę.", "I would like coffee."],
          ["Chciałabym kawę.", "I would like coffee."]
        ]
      }
    ],
    cards: [
      {
        word: "być",
        gloss: "to be",
        tag: "verb",
        forms: [
          ["I", "jestem"],
          ["you", "jesteś"],
          ["she", "jest"],
          ["they", "są"],
          ["past I masculine", "byłem"],
          ["past I feminine", "byłam"]
        ]
      },
      {
        word: "mieć",
        gloss: "to have",
        tag: "verb",
        forms: [
          ["I", "mam"],
          ["you", "masz"],
          ["she", "ma"],
          ["they", "mają"],
          ["past I masculine", "miałem"],
          ["past I feminine", "miałam"]
        ]
      },
      {
        word: "iść",
        gloss: "to go on foot, one way",
        tag: "verb",
        forms: [
          ["I", "idę"],
          ["you", "idziesz"],
          ["he", "idzie"],
          ["they", "idą"],
          ["past he", "szedł"],
          ["past she", "szła"]
        ]
      },
      {
        word: "jeść",
        gloss: "to eat",
        tag: "verb",
        forms: [
          ["I", "jem"],
          ["you", "jesz"],
          ["she", "je"],
          ["they", "jedzą"],
          ["past he", "jadł"],
          ["past she", "jadła"]
        ]
      },
      {
        word: "chcieć",
        gloss: "to want",
        tag: "verb",
        forms: [
          ["I", "chcę"],
          ["you", "chcesz"],
          ["she", "chce"],
          ["they", "chcą"],
          ["past he", "chciał"],
          ["past she", "chciała"]
        ]
      },
      {
        word: "móc",
        gloss: "to be able",
        tag: "verb",
        forms: [
          ["I", "mogę"],
          ["you", "możesz"],
          ["he", "może"],
          ["they", "mogą"],
          ["past he", "mógł"],
          ["past she", "mogła"]
        ]
      },
      {
        word: "dać",
        gloss: "to give",
        tag: "verb",
        forms: [
          ["I", "dam"],
          ["you", "dasz"],
          ["he", "da"],
          ["they", "dadzą"],
          ["past he", "dał"],
          ["past she", "dała"]
        ]
      },
      {
        word: "wiedzieć",
        gloss: "to know",
        tag: "verb",
        forms: [
          ["I", "wiem"],
          ["you", "wiesz"],
          ["she", "wie"],
          ["they", "wiedzą"]
        ]
      },
      {
        word: "człowiek",
        gloss: "person",
        tag: "noun",
        forms: [
          ["nominative", "człowiek"],
          ["genitive", "człowieka"],
          ["plural", "ludzie"],
          ["plural genitive", "ludzi"]
        ]
      },
      {
        word: "dziecko",
        gloss: "child",
        tag: "noun",
        forms: [
          ["nominative", "dziecko"],
          ["genitive", "dziecka"],
          ["plural", "dzieci"],
          ["plural genitive", "dzieci"]
        ]
      }
    ]
  },
  cs: {
    intro: "Czech has no articles, and the nominative is the form you learn before any other case.",
    lessons: [
      {
        id: "a1-nominative",
        level: "A1",
        title: "Nominative first",
        lead: "The nominative is the dictionary form, and it is the shape of the subject.",
        notes: [
          "There is no word for the or a.",
          "Jsem tady leaves the pronoun out, because the verb already says I.",
          "Voda je studená and dům je malý are nominative, with feminine and masculine agreement."
        ],
        examples: [
          ["Jsem tady.", "I am here."],
          ["Voda je studená.", "The water is cold."]
        ]
      },
      {
        id: "a1-byt",
        level: "A1",
        title: "Být",
        lead: "Být is irregular, and the negative is fused to the verb rather than standing alone.",
        notes: [
          "The present is jsem, jsi, je, jsme, jste, jsou.",
          "The negative is nejsem, nejsi, není, nejsme, nejste, nejsou.",
          "The future is budu, budeš, bude, and the past participle is byl, byla, bylo."
        ],
        examples: [
          ["Jsem tady.", "I am here."],
          ["Nejsem tady.", "I am not here."]
        ],
        table: {
          caption: "Present of být",
          heads: ["", "affirmative", "negative"],
          rows: [
            ["já", "jsem", "nejsem"],
            ["ty", "jsi", "nejsi"],
            ["ona", "je", "není"],
            ["my", "jsme", "nejsme"],
            ["oni", "jsou", "nejsou"]
          ]
        }
      },
      {
        id: "a1-present",
        level: "A1",
        title: "A present and length",
        lead: "The present shows the person, and a long vowel in the form is part of the spelling.",
        notes: [
          "Vidět is vidím, vidíš, vidí, and the long í stays in the ending.",
          "Jíst is jím, jíš, jí, and mít is mám, máš, má, each with a long vowel you must write.",
          "Chtít does not keep its t in the present: chci, chceš, chce."
        ],
        examples: [
          ["Vidím slunce.", "I see the sun."],
          ["Jím chléb.", "I am eating bread."]
        ],
        table: {
          caption: "Present",
          heads: ["", "vidět", "jíst", "mít"],
          rows: [
            ["já", "vidím", "jím", "mám"],
            ["ty", "vidíš", "jíš", "máš"],
            ["ona", "vidí", "jí", "má"],
            ["my", "vidíme", "jíme", "máme"]
          ]
        }
      },
      {
        id: "a2-accusative",
        level: "A2",
        title: "Accusative",
        lead: "The object stands in the accusative, and a feminine noun in a often ends in u.",
        notes: [
          "Voda becomes vodu, and kniha becomes knihu.",
          "An inanimate masculine such as stůl stays stůl as an object.",
          "A living masculine such as člověk becomes člověka."
        ],
        examples: [
          ["Vidím vodu.", "I see the water."],
          ["Vidím člověka.", "I see the person."]
        ],
        table: {
          caption: "Nominative and accusative",
          heads: ["noun", "nominative", "accusative"],
          rows: [
            ["water", "voda", "vodu"],
            ["book", "kniha", "knihu"],
            ["table", "stůl", "stůl"],
            ["person", "člověk", "člověka"],
            ["sun", "slunce", "slunce"]
          ]
        }
      },
      {
        id: "a2-aspect",
        level: "A2",
        title: "Aspect",
        lead: "Imperfective verbs name a process or a habit, and perfective verbs name a result.",
        notes: [
          "Psát is the process of writing, and napsat is writing something to the end.",
          "A perfective present usually means the future, so napíšu means I will write it.",
          "Learn the pair together instead of inventing a prefix."
        ],
        examples: [
          ["Píšu dopis.", "I am writing a letter."],
          ["Napíšu dopis.", "I will write the letter."]
        ]
      },
      {
        id: "a2-past",
        level: "A2",
        title: "The past",
        lead: "The past is a participle plus a clitic of být, and the third person drops that clitic.",
        notes: [
          "Viděl jsem is masculine, and viděla jsem is feminine.",
          "On viděl and ona viděla have no je, unlike the first and second person.",
          "The participle of jít is šel, šla, which you cannot build from jdu."
        ],
        examples: [
          ["Viděl jsem dům.", "I saw the house."],
          ["Ona viděla vodu.", "She saw the water."]
        ],
        table: {
          caption: "Past of vidět",
          heads: ["", "masculine", "feminine"],
          rows: [
            ["já", "viděl jsem", "viděla jsem"],
            ["ty", "viděl jsi", "viděla jsi"],
            ["on / ona", "viděl", "viděla"],
            ["my", "viděli jsme", "viděly jsme"]
          ]
        }
      },
      {
        id: "b1-cases",
        level: "B1",
        title: "Cases with prepositions",
        lead: "The preposition chooses the case, and a long vowel may shorten when an ending is added.",
        notes: [
          "Do takes the genitive, and v takes the locative for place, as in do domu and v domě.",
          "Nominative dům and stůl change ů to o once the ending opens the syllable, giving domu and stolu.",
          "S takes the instrumental, as in s bratrem."
        ],
        examples: [
          ["Jdu do domu.", "I am going to the house."],
          ["Jsem v domě.", "I am in the house."]
        ],
        table: {
          caption: "Length alternation in the case ending",
          heads: ["", "nominative", "genitive", "locative"],
          rows: [
            ["house", "dům", "domu", "domě"],
            ["table", "stůl", "stolu", "stole"]
          ]
        }
      },
      {
        id: "b1-jit",
        level: "B1",
        title: "Motion jít",
        lead: "Jít is one trip on foot, and neither the present nor the past looks like the infinitive.",
        notes: [
          "The present is jdu, jdeš, jde, jdeme, jdete, jdou.",
          "The past participle is šel, šla, šlo, šli.",
          "The future of jít is půjdu, not budu jít, and chodit is the habit rather than one trip."
        ],
        examples: [
          ["Jdu domů.", "I am walking home."],
          ["Zítra půjdu domů.", "Tomorrow I will walk home."]
        ],
        table: {
          caption: "jít",
          heads: ["", "present", "future", "participle"],
          rows: [
            ["já", "jdu", "půjdu", "šel"],
            ["ty", "jdeš", "půjdeš", "šel"],
            ["ona", "jde", "půjde", "šla"],
            ["my", "jdeme", "půjdeme", "šli"],
            ["oni", "jdou", "půjdou", "šli"]
          ]
        }
      },
      {
        id: "b2-ktery",
        level: "B2",
        title: "Relative který",
        lead: "Který agrees with the noun, then takes the case of its job in the clause.",
        notes: [
          "Který, která, and které match gender and number.",
          "The case is decided inside the relative clause.",
          "Kniha, kterou čtu uses kterou because the book is the object of čtu."
        ],
        examples: [
          ["Muž, který jde.", "The man who is walking."],
          ["Kniha, kterou čtu.", "The book that I am reading."]
        ]
      },
      {
        id: "b2-bych",
        level: "B2",
        title: "Conditional bych",
        lead: "The conditional clitic is bych, bys, by, bychom, byste, by, plus a participle.",
        notes: [
          "Chtěl bych is I would like, masculine, and chtěla bych is feminine.",
          "The third person is by with no extra person ending, as in on by šel.",
          "Bych sits in second position, as in zítra bych šel."
        ],
        examples: [
          ["Chtěl bych kávu.", "I would like coffee."],
          ["Šel bych domů.", "I would go home."]
        ]
      }
    ],
    cards: [
      {
        word: "být",
        gloss: "to be",
        tag: "verb",
        forms: [
          ["I", "jsem"],
          ["you", "jsi"],
          ["she", "je"],
          ["they", "jsou"],
          ["past masculine", "byl"],
          ["past feminine", "byla"]
        ]
      },
      {
        word: "jít",
        gloss: "to go on foot",
        tag: "verb",
        forms: [
          ["I", "jdu"],
          ["you", "jdeš"],
          ["he", "jde"],
          ["they", "jdou"],
          ["future I", "půjdu"],
          ["past masculine", "šel"]
        ]
      },
      {
        word: "mít",
        gloss: "to have",
        tag: "verb",
        forms: [
          ["I", "mám"],
          ["you", "máš"],
          ["she", "má"],
          ["they", "mají"],
          ["past masculine", "měl"],
          ["past feminine", "měla"]
        ]
      },
      {
        word: "jíst",
        gloss: "to eat",
        tag: "verb",
        forms: [
          ["I", "jím"],
          ["you", "jíš"],
          ["she", "jí"],
          ["they", "jedí"],
          ["past masculine", "jedl"],
          ["past feminine", "jedla"]
        ]
      },
      {
        word: "chtít",
        gloss: "to want",
        tag: "verb",
        forms: [
          ["I", "chci"],
          ["you", "chceš"],
          ["she", "chce"],
          ["they", "chtějí"],
          ["past masculine", "chtěl"],
          ["past feminine", "chtěla"]
        ]
      },
      {
        word: "vědět",
        gloss: "to know",
        tag: "verb",
        forms: [
          ["I", "vím"],
          ["you", "víš"],
          ["she", "ví"],
          ["they", "vědí"]
        ]
      },
      {
        word: "moct",
        gloss: "to be able",
        tag: "verb",
        forms: [
          ["I", "můžu"],
          ["you", "můžeš"],
          ["he", "může"],
          ["they", "můžou"]
        ]
      },
      {
        word: "člověk",
        gloss: "person",
        tag: "noun",
        forms: [
          ["nominative", "člověk"],
          ["genitive", "člověka"],
          ["plural", "lidé"],
          ["plural genitive", "lidí"]
        ]
      },
      {
        word: "dítě",
        gloss: "child",
        tag: "noun",
        forms: [
          ["nominative", "dítě"],
          ["genitive", "dítěte"],
          ["plural", "děti"],
          ["plural genitive", "dětí"]
        ]
      },
      {
        word: "dům",
        gloss: "house",
        tag: "noun",
        forms: [
          ["nominative", "dům"],
          ["genitive", "domu"],
          ["locative", "domě"],
          ["plural", "domy"]
        ]
      }
    ]
  },
  sk: {
    intro: "Slovak has no articles and its own shapes, and it is not Czech written with different letters.",
    lessons: [
      {
        id: "a1-nominative",
        level: "A1",
        title: "Nominative first, and it is not Czech",
        lead: "Learn the nominative first, and do not import Czech spellings into Slovak words.",
        notes: [
          "There is no word for the or a.",
          "Ja som tu keeps som in second position, and som is not the Czech form of the same verb.",
          "Voda je studená and dom je malý are nominative, and the noun is dom, with no circle over the vowel."
        ],
        examples: [
          ["Ja som tu.", "I am here."],
          ["Voda je studená.", "The water is cold."]
        ]
      },
      {
        id: "a1-byt",
        level: "A1",
        title: "Byť",
        lead: "Byť is irregular, and the negative is nie plus the present, written as two words.",
        notes: [
          "The present is som, si, je, sme, ste, sú.",
          "The negative is nie som, nie si, nie je, nie sme, nie ste, nie sú.",
          "The future is budem, budeš, bude, and the past participle is bol, bola, bolo."
        ],
        examples: [
          ["Ja som tu.", "I am here."],
          ["Nie som tu.", "I am not here."]
        ],
        table: {
          caption: "Present of byť",
          heads: ["", "affirmative", "negative"],
          rows: [
            ["ja", "som", "nie som"],
            ["ty", "si", "nie si"],
            ["ona", "je", "nie je"],
            ["my", "sme", "nie sme"],
            ["oni", "sú", "nie sú"]
          ]
        }
      },
      {
        id: "a1-present",
        level: "A1",
        title: "A present",
        lead: "The present shows the person, and several common verbs do not follow the infinitive.",
        notes: [
          "Vidieť is vidím, vidíš, vidí.",
          "Jesť is jem, ješ, je, and ísť is idem, ideš, ide.",
          "Chcieť is chcem, chceš, chce, and vedieť is viem, vieš, vie."
        ],
        examples: [
          ["Vidím slnko.", "I see the sun."],
          ["Jem chlieb.", "I am eating bread."]
        ],
        table: {
          caption: "Present",
          heads: ["", "vidieť", "jesť", "ísť"],
          rows: [
            ["ja", "vidím", "jem", "idem"],
            ["ty", "vidíš", "ješ", "ideš"],
            ["ona", "vidí", "je", "ide"],
            ["my", "vidíme", "jeme", "ideme"]
          ]
        }
      },
      {
        id: "a2-accusative",
        level: "A2",
        title: "Accusative",
        lead: "The object stands in the accusative, and a feminine noun in a often ends in u.",
        notes: [
          "Voda becomes vodu, and kniha becomes knihu.",
          "An inanimate masculine such as stôl stays stôl as an object.",
          "A living masculine such as človek becomes človeka."
        ],
        examples: [
          ["Vidím vodu.", "I see the water."],
          ["Vidím človeka.", "I see the person."]
        ],
        table: {
          caption: "Nominative and accusative",
          heads: ["noun", "nominative", "accusative"],
          rows: [
            ["water", "voda", "vodu"],
            ["book", "kniha", "knihu"],
            ["table", "stôl", "stôl"],
            ["person", "človek", "človeka"],
            ["sun", "slnko", "slnko"]
          ]
        }
      },
      {
        id: "a2-aspect",
        level: "A2",
        title: "Aspect",
        lead: "Imperfective verbs name a process or a habit, and perfective verbs name a result.",
        notes: [
          "Písať is the process, and napísať is writing something to the end.",
          "A perfective present usually means the future, so napíšem means I will write it.",
          "Learn the Slovak pair as it is, and do not rebuild it with a Czech letter."
        ],
        examples: [
          ["Píšem list.", "I am writing a letter."],
          ["Napíšem list.", "I will write the letter."]
        ]
      },
      {
        id: "a2-past",
        level: "A2",
        title: "The past",
        lead: "The past is a participle plus a form of byť, and the third person drops that helper.",
        notes: [
          "Videl som is masculine, and videla som is feminine.",
          "On videl and ona videla have no je after the subject.",
          "The participle of ísť is išiel or išla, and a plural past such as videli does not split by gender."
        ],
        examples: [
          ["Videl som dom.", "I saw the house."],
          ["Ona videla vodu.", "She saw the water."]
        ],
        table: {
          caption: "Past of vidieť",
          heads: ["", "masculine", "feminine"],
          rows: [
            ["ja", "videl som", "videla som"],
            ["ty", "videl si", "videla si"],
            ["on / ona", "videl", "videla"]
          ]
        }
      },
      {
        id: "b1-cases",
        level: "B1",
        title: "Cases with prepositions",
        lead: "The preposition chooses the case, and ô can alternate with o.",
        notes: [
          "Do takes the genitive, and v takes the locative for place, as in do domu and v dome.",
          "Stôl becomes stola in the genitive, with ô opening into o.",
          "S takes the instrumental, as in s bratom."
        ],
        examples: [
          ["Idem do domu.", "I am going to the house."],
          ["Som v dome.", "I am in the house."]
        ],
        table: {
          caption: "Case forms, with ô where Slovak has it",
          heads: ["", "nominative", "genitive", "locative"],
          rows: [
            ["house", "dom", "domu", "dome"],
            ["table", "stôl", "stola", "stole"]
          ]
        }
      },
      {
        id: "b1-ist",
        level: "B1",
        title: "Motion ísť",
        lead: "Ísť is one trip on foot, and the present, the past, and the future are three different shapes.",
        notes: [
          "The present is idem, ideš, ide, ideme, idete, idú.",
          "The past participle is išiel, išla, išlo, išli.",
          "The future is pôjdem, not a form of budem plus the infinitive, and chodiť is the habit rather than one trip."
        ],
        examples: [
          ["Idem domov.", "I am walking home."],
          ["Zajtra pôjdem domov.", "Tomorrow I will walk home."]
        ],
        table: {
          caption: "ísť",
          heads: ["", "present", "future", "participle"],
          rows: [
            ["ja", "idem", "pôjdem", "išiel"],
            ["ty", "ideš", "pôjdeš", "išiel"],
            ["ona", "ide", "pôjde", "išla"],
            ["my", "ideme", "pôjdeme", "išli"],
            ["oni", "idú", "pôjdu", "išli"]
          ]
        }
      },
      {
        id: "b2-ktory",
        level: "B2",
        title: "Relative ktorý",
        lead: "Ktorý agrees with the noun, then takes the case of its job in the clause.",
        notes: [
          "Ktorý, ktorá, and ktoré match gender and number.",
          "The case is decided inside the relative clause.",
          "Kniha, ktorú čítam uses ktorú because the book is the object of čítam."
        ],
        examples: [
          ["Muž, ktorý ide.", "The man who is walking."],
          ["Kniha, ktorú čítam.", "The book that I am reading."]
        ]
      },
      {
        id: "b2-by",
        level: "B2",
        title: "Conditional by",
        lead: "The conditional is the clitic by plus a person of byť, kept as separate words.",
        notes: [
          "Chcel by som is I would like, masculine, and chcela by som is feminine.",
          "By and som are separate clitics, and som still shows the person.",
          "Išiel by som means I would go, with the participle išiel."
        ],
        examples: [
          ["Chcel by som kávu.", "I would like coffee."],
          ["Išiel by som domov.", "I would go home."]
        ]
      }
    ],
    cards: [
      {
        word: "byť",
        gloss: "to be",
        tag: "verb",
        forms: [
          ["I", "som"],
          ["you", "si"],
          ["she", "je"],
          ["they", "sú"],
          ["past masculine", "bol"],
          ["past feminine", "bola"]
        ]
      },
      {
        word: "ísť",
        gloss: "to go on foot",
        tag: "verb",
        forms: [
          ["I", "idem"],
          ["you", "ideš"],
          ["he", "ide"],
          ["they", "idú"],
          ["future I", "pôjdem"],
          ["past masculine", "išiel"]
        ]
      },
      {
        word: "mať",
        gloss: "to have",
        tag: "verb",
        forms: [
          ["I", "mám"],
          ["you", "máš"],
          ["she", "má"],
          ["they", "majú"],
          ["past masculine", "mal"],
          ["past feminine", "mala"]
        ]
      },
      {
        word: "jesť",
        gloss: "to eat",
        tag: "verb",
        forms: [
          ["I", "jem"],
          ["you", "ješ"],
          ["she", "je"],
          ["they", "jedia"],
          ["past masculine", "jedol"],
          ["past feminine", "jedla"]
        ]
      },
      {
        word: "chcieť",
        gloss: "to want",
        tag: "verb",
        forms: [
          ["I", "chcem"],
          ["you", "chceš"],
          ["she", "chce"],
          ["they", "chcú"],
          ["past masculine", "chcel"],
          ["past feminine", "chcela"]
        ]
      },
      {
        word: "vedieť",
        gloss: "to know",
        tag: "verb",
        forms: [
          ["I", "viem"],
          ["you", "vieš"],
          ["she", "vie"],
          ["they", "vedia"]
        ]
      },
      {
        word: "môcť",
        gloss: "to be able",
        tag: "verb",
        forms: [
          ["I", "môžem"],
          ["you", "môžeš"],
          ["he", "môže"],
          ["they", "môžu"],
          ["past masculine", "mohol"],
          ["past feminine", "mohla"]
        ]
      },
      {
        word: "človek",
        gloss: "person",
        tag: "noun",
        forms: [
          ["nominative", "človek"],
          ["genitive", "človeka"],
          ["plural", "ľudia"],
          ["plural genitive", "ľudí"]
        ]
      },
      {
        word: "dieťa",
        gloss: "child",
        tag: "noun",
        forms: [
          ["nominative", "dieťa"],
          ["genitive", "dieťaťa"],
          ["plural", "deti"],
          ["plural genitive", "detí"]
        ]
      },
      {
        word: "stôl",
        gloss: "table",
        tag: "noun",
        forms: [
          ["nominative", "stôl"],
          ["genitive", "stola"],
          ["locative", "stole"],
          ["plural", "stoly"]
        ]
      }
    ]
  }
};



