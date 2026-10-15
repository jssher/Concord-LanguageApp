import type { GrammarChapter } from "./types";

/** Chapters in language-list order, from Zürich German through Welsh. */
export const EUROPE_NORTH: Record<string, GrammarChapter> = {
  gsw: {
    rules: {
      summary: "The verb stays second, and the article is de, d, or s.",
      body: "Ich bi daa. These cards are Zürich speech, not Bern and not schoolbook German. A time word at the front still leaves the verb in second place. Du is the friend-form. Si is formal. Nöd is the simple no, and it sits next to the verb.",
      points: [
        "A yes-no question starts with the verb: Bisch du daa?",
        "Do not correct a Zürich sentence with a Hochdeutsch case chart.",
        "Bern uses nid, dr, and loufe. Those words are a different card.",
      ],
      samples: [
        ["Ich bi daa.", "verb second"],
        ["De Maa laufft.", "masculine article de"],
      ],
    },
    verbs: {
      summary: "Sii and haa are irregular from the first sentence. Most other verbs add a short ending.",
      body: "A regular present is short: ich lauff, du lauffsch, er laufft, mir lauffed. The spoken past is haa or sii plus a participle. Movement takes sii: ich bi ggange. Gsee, choo, gaa, and ässe do not follow lauffe.",
      points: [
        "Sii is bi, bisch, isch, sind.",
        "Haa is ha, hesch, hät, händ.",
        "A separable verb splits in a main clause, as in German.",
      ],
      table: {
        caption: "Present",
        heads: ["", "sii", "haa", "gsee"],
        rows: [
          ["ich", "bi", "ha", "gsee"],
          ["du", "bisch", "hesch", "gseesch"],
          ["er", "isch", "hät", "gseet"],
          ["mir", "sind", "händ", "gseed"],
        ],
      },
      samples: [
        ["Ich gsee d Sunne.", "gsee does not take a regular -e"],
        ["Du chunsch zum Huus.", "choo changes the vowel"],
      ],
    },
    nouns: {
      summary: "Gender is still there. Case is lighter than in written German.",
      body: "Learn the article with the noun. De Maa is masculine, d Frau is feminine, s Huus is neuter. Plurals are a list: Chind stays Chind, Huus becomes Hüüser. The adjective usually follows the article rather than a full four-case table.",
      points: [
        "S Wasser, s Huus, s Chind.",
        "D Frau, d Tüür.",
        "A diminutive is usually neuter, and it is a word of its own.",
      ],
      samples: [
        ["S Huus isch chlii.", "neuter s"],
        ["D Tüür isch offe.", "feminine d"],
      ],
    },
    odd: {
      summary: "Sii, haa, gaa, choo, gsee, and ässe will not follow lauffe.",
      body: "Gaa replaces the stem: ich gang, du gaasch, er gaat. Choo gives du chunsch, not a regular ending on choo. Ässe shortens in the plural you already see on the card: mir ässed. The participle often adds a g- where German adds ge-.",
      points: [
        "Do not build gang from gaa by adding -e.",
        "Haa’s past is irregular: ich ha ghaa.",
        "Modal verbs such as chöne and müesse lack a normal past participle in the perfect.",
      ],
      samples: [
        ["ich gang · du gaasch · er gaat", "gaa"],
        ["Mir ässed Broot.", "ässe in the plural"],
      ],
    },
  },
  "gsw-be": {
    rules: {
      summary: "The verb stays second. The article is dr, d, or ds, and the no is nid.",
      body: "I bi da. These cards are city Bern, not Zürich and not schoolbook German. Du is the friend-form. A question starts with the verb. Nid is not the Zürich nöd, and loufe is not lauffe.",
      points: [
        "I, du, är, mir, dir, si.",
        "Dr Ma, d Frau, ds Huus.",
        "Do not mix this card with the Zürich card.",
      ],
      samples: [
        ["I bi da.", "verb second, Bern sii"],
        ["Dr Ma louft.", "masculine dr"],
      ],
    },
    verbs: {
      summary: "Sii and haa first. Loufe is the regular shape to compare them with.",
      body: "Loufe goes i loufe, du loufsch, är louft. Sii and haa replace that pattern. The spoken past is haa or sii plus a participle, and a change of place takes sii. Gseh, cho, and gaa are irregular in the same way as in other Swiss German.",
      points: [
        "Sii is bi, bisch, isch, sy.",
        "Haa is ha, hesch, het, hei.",
        "The you-form often ends in -sch: bisch, hesch.",
      ],
      table: {
        caption: "Present",
        heads: ["", "sii", "haa", "gseh"],
        rows: [
          ["i", "bi", "ha", "gseh"],
          ["du", "bisch", "hesch", "gseesch"],
          ["är", "isch", "het", "gseet"],
          ["mir", "sy", "hei", "gsee"],
        ],
      },
      samples: [
        ["I gseh d Sunne.", "gseh"],
        ["Du chunsch zum Huus.", "cho"],
      ],
    },
    nouns: {
      summary: "Learn dr, d, or ds with the noun. There is no written four-case table to produce.",
      body: "Dr Ma, d Frau, ds Huus, ds Chind, d Türe. Plurals are memorized: Manne, Hüüser, and Chind with no extra ending. The adjective does not run through a Hochdeutsch ending chart.",
      points: [
        "Ds Wasser isch chalt.",
        "Ds Huus isch chly.",
        "Gender is still masculine, feminine, or neuter.",
      ],
      samples: [
        ["Ds Chind schlaft.", "neuter ds"],
        ["D Türe isch offe.", "feminine d"],
      ],
    },
    odd: {
      summary: "Sii, haa, gaa, cho, gseh, and tue do not follow loufe.",
      body: "Gaa’s present is not loufe plus a new vowel you can guess. Learn i gang, du geisch, är geit as a set. Cho gives du chunsch. The participle and the g- prefix will not match a German textbook line for line.",
      points: [
        "Nid, not nöd.",
        "Loufe, not lauffe.",
        "If a past looks like a different verb, memorize the pair.",
      ],
      samples: [
        ["i gang · du geisch · är geit", "gaa"],
        ["Mir ässe Brot.", "ässe, plural without a Zürich -ed"],
      ],
    },
  },
  nl: {
    rules: {
      summary: "The verb is second in a main clause, and it goes to the end in a subordinate clause.",
      body: "Ik drink water. Je or jij is the friend-form. U is formal. A time word at the front pushes the subject after the verb. Niet sits after the finite verb in a simple no. De or het is part of the noun.",
      points: [
        "A yes-no question starts with the verb.",
        "Because and that send the verb to the end.",
        "Learn de or het with every new noun.",
      ],
      samples: [
        ["Ik ben hier.", "verb second"],
        ["Het huis is klein.", "het is neuter"],
      ],
    },
    verbs: {
      summary: "Zijn and hebben are irregular. A regular present adds -t except for ik and wij.",
      body: "Komen is ik kom, jij komt, hij komt, wij komen. The spoken past is hebben or zijn plus a participle. Motion and a change of state take zijn: ik ben gekomen. Zien, komen, gaan, and eten change the vowel in the past.",
      points: [
        "Jij drops -t when the verb comes before jij: kom jij?",
        "The participle of a strong verb often has a changed vowel and no -d.",
        "Modal verbs such as kunnen and moeten do not take a regular past participle.",
      ],
      table: {
        caption: "Present",
        heads: ["", "zijn", "hebben", "zien"],
        rows: [
          ["ik", "ben", "heb", "zie"],
          ["jij", "bent", "hebt", "ziet"],
          ["hij", "is", "heeft", "ziet"],
          ["wij", "zijn", "hebben", "zien"],
        ],
      },
      samples: [
        ["Ik zie de zon.", "zien in the first person"],
        ["Jij komt naar het huis.", "komen adds -t"],
      ],
    },
    nouns: {
      summary: "De or het, and almost no case left on the noun.",
      body: "De is common gender. Het is neuter. Plurals take -en or -s: kinderen, huizen. An adjective adds -e, except after een before a het-word: een klein huis. Object pronouns are a closed list: me, je, hem, haar.",
      points: [
        "A diminutive in -je is usually het.",
        "Het kind, de deur, het huis.",
        "The plural of stad and kind is not a simple -en on the singular you first learned.",
      ],
      samples: [
        ["De vrouw is hier.", "de"],
        ["Het kind slaapt.", "het"],
      ],
    },
    odd: {
      summary: "Zijn, hebben, gaan, zien, komen, and eten will not follow a regular -te past.",
      body: "Zijn, was, geweest. Hebben, had, gehad. Gaan, ging, gegaan. Zien, zag, gezien. Komen, kwam, gekomen. Eten, at, gegeten. The vowel change is the irregularity, and the participle has to be learned with it.",
      points: [
        "Do not build ging from gaan.",
        "A plural such as kinderen adds an extra syllable.",
        "Zullen, kunnen, mogen, and willen have their own pasts: zou, kon, mocht, wilde.",
      ],
      samples: [
        ["ik ben · jij bent · hij is", "zijn"],
        ["Wij eten brood.", "eten stays irregular in the past"],
      ],
    },
  },
  da: {
    rules: {
      summary: "The verb is second, and one present ending serves every person.",
      body: "Jeg drikker vand. A time word at the front puts the subject after the verb. Du is the friend-form. De is formal. Ikke follows the verb. The noun’s gender is en or et, and the definite article is often a suffix.",
      points: [
        "Questions that are yes or no start with the verb.",
        "A subordinate clause does not use verb-second in the same way.",
        "Learn en or et before you learn the definite form.",
      ],
      samples: [
        ["Jeg er her.", "one verb form, verb second"],
        ["Vandet er koldt.", "definite suffix on a neuter noun"],
      ],
    },
    verbs: {
      summary: "The present adds -r for every person. Være and have are the irregulars you need first.",
      body: "Drikke is drikker for jeg, du, hun, and vi. The past of a regular verb adds -ede or -te. Være, have, gå, se, and komme do not. The perfect is har plus a participle, or er for motion: jeg er kommet.",
      points: [
        "There is no person ending hiding after -r.",
        "Modal verbs such as kan and skal have a short past: kunne, skulle.",
        "The participle of a strong verb often changes the vowel: se, set.",
      ],
      table: {
        caption: "Present, the same in every person",
        heads: ["", "være", "have", "se"],
        rows: [
          ["jeg", "er", "har", "ser"],
          ["du", "er", "har", "ser"],
          ["hun", "er", "har", "ser"],
          ["vi", "er", "har", "ser"],
        ],
      },
      samples: [
        ["Jeg ser solen.", "ser for every person"],
        ["Du kommer til huset.", "komme, present kommer"],
      ],
    },
    nouns: {
      summary: "En or et, and the definite article attaches to the noun.",
      body: "Common gender takes en. Neuter takes et. Hus becomes huset, dør becomes døren, vand becomes vandet. There is no case on the noun. Adjectives agree with en, et, and the plural. Pronouns still distinguish subject and object: jeg, mig.",
      points: [
        "Et hus · huset. En dør · døren.",
        "Barnet is the definite of barn.",
        "Plurals add -e or -er, and a few change the vowel.",
      ],
      samples: [
        ["Kvinden er her.", "common gender, suffix article"],
        ["Huset er lille.", "neuter, suffix article"],
      ],
    },
    odd: {
      summary: "Være, have, gå, se, and komme do not take -ede.",
      body: "Være, var, været. Have, havde, haft. Gå, gik, gået. Se, så, set. Komme, kom, kommet. These are the verbs in the first lessons. Learn the three forms together. Mand and barn are also not regular in the plural: mænd, børn.",
      points: [
        "Do not build gik from gå.",
        "Manden, mændene. Barnet, børnene.",
        "The spoken past of motion uses er, not har.",
      ],
      samples: [
        ["Jeg er her.", "være, present er"],
        ["Manden går.", "gå, and an irregular noun"],
      ],
    },
  },
  is: {
    rules: {
      summary: "The verb is second, and the noun’s ending is the case.",
      body: "Ég drekk vatn. Þú is the friend-form. A question can start with the verb. The definite article is a suffix, and it declines with the noun. Ekki follows the verb. Gender is masculine, feminine, or neuter.",
      points: [
        "Learn the nominative and the article together.",
        "Some verbs ask for the dative, not the accusative.",
        "Adjectives agree in gender, number, and case.",
      ],
      samples: [
        ["Ég er hér.", "verb second"],
        ["Ég sé sólina.", "the object is accusative"],
      ],
    },
    verbs: {
      summary: "The ending shows the person. Vera and hafa will not follow a regular verb.",
      body: "A regular present distinguishes ég, þú, and við. The past of a strong verb changes the vowel and drops the person ending in the singular. Sjá, koma, and ganga are strong. The perfect uses hafa, except where a change of place uses vera.",
      points: [
        "Vera is er, ert, er, erum.",
        "Hafa is hef, hefur, hefur, höfum.",
        "The middle ending -st is a separate voice. Learn it later, as a form of its own.",
      ],
      table: {
        caption: "Present",
        heads: ["", "vera", "hafa", "sjá"],
        rows: [
          ["ég", "er", "hef", "sé"],
          ["þú", "ert", "hefur", "sérð"],
          ["hún", "er", "hefur", "sér"],
          ["við", "erum", "höfum", "sjáum"],
        ],
      },
      samples: [
        ["Ég sé sólina.", "sjá, first person"],
        ["Þú kemur til hússins.", "koma"],
      ],
    },
    nouns: {
      summary: "Four cases, three genders, and the article is a suffix.",
      body: "Nominative, accusative, dative, and genitive are alive. Hús is neuter, húsið is the definite. Kona, konan. Maður, maðurinn. The genitive often appears after a preposition or in possession: hússins. Adjectives have a strong ending and a weak ending.",
      points: [
        "Vatnið, húsið, barnið are neuter definites.",
        "Hurðin is feminine definite.",
        "A plural is not always -ar or -ir. Menn and bækur are lists.",
      ],
      table: {
        caption: "hús, neuter",
        heads: ["case", "indefinite", "definite"],
        rows: [
          ["nominative", "hús", "húsið"],
          ["accusative", "hús", "húsið"],
          ["dative", "húsi", "húsinu"],
          ["genitive", "húss", "hússins"],
        ],
      },
      samples: [
        ["Húsið er lítið.", "definite suffix"],
        ["Vatnið er kalt.", "neuter agreement"],
      ],
    },
    odd: {
      summary: "Vera, hafa, sjá, koma, ganga, and the noun maður do not follow the regular table.",
      body: "Sjá’s present is sé, sérð, sér, not a stem sjá- plus an ending. Koma is kem, kemur. Ganga is geng, gengur. Vera’s past is var, varst, var, vorum. Maður’s cases and its plural menn have to be memorized. U-shift changes a vowel when the ending has a u.",
      points: [
        "Do not build the past of koma from the present.",
        "Vera’s participle is verið.",
        "Strong and weak adjective endings are a second irregular-looking list, and they are regular once the case is known.",
      ],
      samples: [
        ["ég er · þú ert · hún er", "vera"],
        ["Maðurinn gengur.", "maður plus the article, ganga"],
      ],
    },
  },
  ro: {
    rules: {
      summary: "The article is a suffix, and the verb ending carries the person.",
      body: "Eu sunt aici. The pronoun can drop once the ending is clear: Văd soarele. Tu is the friend-form. Nouns are masculine, feminine, or neuter. The adjective usually follows and agrees. Nu comes before the verb.",
      points: [
        "Learn the indefinite and the definite as a pair.",
        "Pe marks a specific person as an object.",
        "A yes-no question can keep statement order.",
      ],
      samples: [
        ["Eu sunt aici.", "a fi"],
        ["Femeia este aici.", "definite suffix on a feminine noun"],
      ],
    },
    verbs: {
      summary: "A fi and a avea are irregular. A veni and a vedea change the stem.",
      body: "A regular verb in -a keeps a stable stem and adds a personal ending. The perfect is a short form you should learn verb by verb at first: am văzut. There is also a compound perfect with a avea. The infinitive on the card, a vedea, is the citation form, not the form you say in the sentence.",
      points: [
        "A fi is sunt, ești, este, suntem.",
        "A avea is am, ai, are, avem.",
        "A vrea, a bea, a da, a sta, and a lua belong on the same irregular list.",
      ],
      table: {
        caption: "Present",
        heads: ["", "a fi", "a avea", "a veni"],
        rows: [
          ["eu", "sunt", "am", "vin"],
          ["tu", "ești", "ai", "vii"],
          ["el / ea", "este", "are", "vine"],
          ["noi", "suntem", "avem", "venim"],
        ],
      },
      samples: [
        ["Văd soarele.", "a vedea, first person"],
        ["Tu vii la casă.", "a veni"],
      ],
    },
    nouns: {
      summary: "The definite article hangs on the end of the noun. Genitive and dative share a form.",
      body: "Un bărbat, bărbatul. O casă, casa. O femeie, femeia. Apă, apa. A feminine noun often changes its ending between the indefinite and the definite. Lui or a form of al marks possession. Neuter nouns look masculine in the singular and feminine in the plural.",
      points: [
        "Copilul, ușa, apa.",
        "The plural of a feminine noun is not always -e.",
        "Pronouns keep more case than nouns: eu, mine, mie.",
      ],
      samples: [
        ["Casa este mică.", "casă plus the article"],
        ["Ușa este deschisă.", "ușă, definite ușa"],
      ],
    },
    odd: {
      summary: "A fi, a avea, a vrea, a veni, a vedea, and a mânca do not follow one chart.",
      body: "A vedea is văd, vezi, vede. A bea is beau, bei, bea. A mânca keeps an â that the spelling will not let you rebuild from the spoken vowel alone. Feminine stems that add or drop a letter between casă and casa are the noun side of the same problem.",
      points: [
        "Do not cite a Romanian verb from the first person alone if the card shows an infinitive.",
        "The short perfect am fost is a fi, not a regular participle.",
        "Numbers and the genitive article al agree, and they are a small extra list.",
      ],
      samples: [
        ["sunt · ești · este", "a fi"],
        ["Mâncăm pâine.", "a mânca, we"],
      ],
    },
  },
  rm: {
    rules: {
      summary: "The pronoun usually stays. Na and betg wrap the verb.",
      body: "These cards are Rumantsch Grischun, the shared written form, not one of the five spoken idioms. Jau ves tai. Ti is the friend-form. Vus is plural, and with a capital it is polite. If a question word starts the sentence, the verb moves in front of the subject.",
      points: [
        "jau, ti, el, ella, nus, vus, els, ellas.",
        "na … betg is not.",
        "A yes-no question also puts the verb before the subject.",
      ],
      samples: [
        ["Jau ves tai.", "the pronoun stays"],
        ["Pertgè na vegnis vus betg?", "verb before vus"],
      ],
    },
    verbs: {
      summary: "Esser and avair first. Ir replaces the stem.",
      body: "A regular -ar verb follows gidar: jau gid, ti gidas, el gida, nus gidain. Esser, avair, ir, vegnir, and dar do not. The cards cite vesair, mangiar, and vegnir. The sentence uses the personal form, not that infinitive.",
      points: [
        "Vegnir is jau vegn, ti vegns, el vegn.",
        "Dar is jau dun, ti das, el dat.",
        "Do not build the present of ir from the infinitive.",
      ],
      table: {
        caption: "Present",
        heads: ["", "esser", "avair", "ir"],
        rows: [
          ["jau", "sun", "hai", "vom"],
          ["ti", "es", "has", "vas"],
          ["el", "è", "ha", "va"],
          ["nus", "essan", "avain", "giain"],
        ],
      },
      samples: [
        ["jau sun · ti es · el è", "esser"],
        ["jau vom · nus giain", "ir"],
      ],
    },
    nouns: {
      summary: "Il or la, and the adjective agrees. There is no case on the noun.",
      body: "Masculine il before a consonant, l’ before a vowel, ils in the plural. Feminine la, or l’ before a vowel, las in the plural. The cards use aua for water and chasa for house. In and ina are a, and also one. There is no plural a. Comparison is pli … che.",
      points: [
        "Learn l’aua and the article as one piece.",
        "In is masculine, ina is feminine.",
        "Grond becomes gronda, gronds, grondas.",
      ],
      samples: [
        ["il um · la dunna", "man and woman, with the article"],
        ["l’aua · la chasa", "water and house"],
      ],
    },
    odd: {
      summary: "Esser, avair, ir, vegnir, and dar will not follow gidar.",
      body: "Ir’s present is vom, vas, va, giain, giais, van. Its participle is ì, ida. Esser’s participle is stà, stada. Avair’s is gì, gida. An unstressed object sits before the verb, and betg closes the negation: Jau na ta ves betg.",
      points: [
        "Jau ves tai stresses the object.",
        "Jau la dun in cudesch puts the object pronoun before dar.",
        "I plova is impersonal, in the third person.",
      ],
      samples: [
        ["Jau na ta ves betg.", "na … betg, object before the verb"],
        ["jau vegn · ti vegns", "vegnir"],
      ],
    },
  },
  la: {
    rules: {
      summary: "No article. The ending is the case, and the verb ending is the person.",
      body: "These cards are Classical Latin with macrons. Fēmina hīc est. The subject can follow the verb, and it can be left out: Sōlem videō. An adjective agrees in gender, number, and case. Tū is the friend-form. There is no word for the or a.",
      points: [
        "Learn the nominative and the accusative of a noun together.",
        "Word order is freer than English because the ending carries the job.",
        "The macrons are part of the learner’s spelling on these cards.",
      ],
      samples: [
        ["Ego hīc sum.", "sum agrees with ego"],
        ["Sōlem videō.", "accusative object, verb ending for I"],
      ],
    },
    verbs: {
      summary: "Four conjugations. Sum, eō, and volō are irregular.",
      body: "Amō, amās, amat is the present of a first-conjugation verb. Vidēre is second: videō, vidēs, videt. Venīre is fourth: veniō, venīs. The perfect stem is often a different word from the present stem, and it is learned as a principal part.",
      points: [
        "Sum, es, est, sumus, estis, sunt.",
        "The perfect of videō is vīdī, not a regular -vī on the present stem.",
        "Deponent verbs look passive and mean active. They can wait until the active present is easy.",
      ],
      table: {
        caption: "Present",
        heads: ["", "sum", "videō", "veniō"],
        rows: [
          ["ego", "sum", "videō", "veniō"],
          ["tū", "es", "vidēs", "venīs"],
          ["ea", "est", "videt", "venit"],
          ["nōs", "sumus", "vidēmus", "venīmus"],
        ],
      },
      samples: [
        ["Tū ad domum venīs.", "venīre"],
        ["Pānem edimus.", "edere, we"],
      ],
    },
    nouns: {
      summary: "Five declensions. Start with the first and the second.",
      body: "Aqua, aquam is feminine. Dominus, dominum is masculine. Bellum, bellum in the accusative is neuter. Nominative, accusative, genitive, dative, and ablative are the cases to learn. Domus mixes the fourth and the second. The vocative can wait, except for names in -us.",
      points: [
        "Neuter nominative and accusative are the same, and the plural nominative ends in -a.",
        "The genitive singular tells you the declension.",
        "An adjective of the first and second declension agrees with a third-declension noun.",
      ],
      table: {
        caption: "aqua, first declension",
        heads: ["case", "singular", "plural"],
        rows: [
          ["nominative", "aqua", "aquae"],
          ["accusative", "aquam", "aquās"],
          ["genitive", "aquae", "aquārum"],
          ["ablative", "aquā", "aquīs"],
        ],
      },
      samples: [
        ["Aqua frīgida est.", "nominative, adjective agrees"],
        ["Iānua aperta est.", "another first-declension noun"],
      ],
    },
    odd: {
      summary: "Sum, eō, ferō, volō, and a crowd of perfect stems.",
      body: "Sum does not contain a visible stem. Eō, īs, it is go. Volō, vīs, vult is want. Ferō, fers, fert loses the vowel. Edō, ēs, est overlaps with sum in the third person and has to be read from the sentence. Many perfects are unrelated in shape: videō, vīdī, vīsus.",
      points: [
        "Possum is pot- plus sum, and the t changes before s: possum, potes.",
        "Īnfāns and domus do not decline like aqua.",
        "Do not invent a regular perfect in -vī for a strong verb.",
      ],
      samples: [
        ["sum · es · est", "the irregular copula"],
        ["Vir ambulat.", "a regular first-conjugation verb, for contrast"],
      ],
    },
  },
  ga: {
    rules: {
      summary: "The verb comes first. The article can change the first letter of the noun.",
      body: "Tá mé anseo. Tá is the present of bí, and it is not a regular ending on bí. Tú is the friend-form. An is the article. It lenites a feminine noun, an bhean, and it can prefix t- to a masculine vowel, an t-uisce. Ní is the simple no, and it lenites.",
      points: [
        "Learn an plus the noun, not the dictionary form alone.",
        "A yes-no question puts an before the verb and mutates it.",
        "Ag plus a verbal noun is how you say an action in progress.",
      ],
      samples: [
        ["Tá mé anseo.", "verb first"],
        ["Tá an bhean anseo.", "lenition after an"],
      ],
    },
    verbs: {
      summary: "Bí is irregular, and so are the verbs you need every day.",
      body: "A regular present adds a personal ending: ólaim, feicim is already irregular. The analytic form with a pronoun is also common. The past often lenites and uses a particle. Irregular verbs include abair, beir, bí, clois, déan, faigh, feic, ith, tabhair, tar, and téigh.",
      points: [
        "Tá, not a form built on bí, in a plain statement.",
        "Bhí is the past. Beidh is the future.",
        "The dependent form after ní or an is not always the same as the statement.",
      ],
      table: {
        caption: "bí in a statement",
        heads: ["", "present", "past", "future"],
        rows: [
          ["mé", "tá mé", "bhí mé", "beidh mé"],
          ["tú", "tá tú", "bhí tú", "beidh tú"],
          ["sí", "tá sí", "bhí sí", "beidh sí"],
          ["muid", "tá muid", "bhí muid", "beidh muid"],
        ],
      },
      samples: [
        ["Feicim an ghrian.", "feic, first person"],
        ["Tagann tú go dtí an teach.", "tar, present tagann"],
      ],
    },
    nouns: {
      summary: "Two genders. What looks like case is mostly the article and the genitive.",
      body: "Fear is masculine, bean is feminine. After an, bean becomes an bhean. Teach stays an teach. The genitive appears in phrases and after some verbal nouns. There is no Latin case ending on an ordinary noun in the sentence. Prepositions fuse with pronouns: agam, agat, dom.",
      points: [
        "An t-uisce, an bhean, an fear, an doras.",
        "Learn the genitive when a phrase on the card shows it, not as a full table.",
        "The plural of bean is mná. The plural of fear is fir.",
      ],
      samples: [
        ["Tá an teach beag.", "adjective after the noun"],
        ["Tá an doras oscailte.", "doras after an"],
      ],
    },
    odd: {
      summary: "Eleven irregular verbs, and the prepositional pronouns.",
      body: "Feic does not stay feic- in every tense. Tar becomes tagann in the present and tháinig in the past. Téigh becomes téann and chuaigh. Faigh and tabhair look unrelated across the tenses. Agam is not ag plus mé in speech. Learn the fused form.",
      points: [
        "Abair, déan, faigh, feic, tabhair, tar, téigh, ith.",
        "Ní fheicim lenites. An bhfeiceann tú eclipses.",
        "Bean, mná and fear, fir are the noun irregulars to learn with them.",
      ],
      samples: [
        ["tá · bhí · beidh", "bí"],
        ["Ithimid arán.", "ith, we"],
      ],
    },
  },
  cy: {
    rules: {
      summary: "The verb comes first. A feminine noun often softens after the article.",
      body: "Dw i yma. Mae starts a sentence about someone else. Ti is the friend-form. The article is y, yr before a vowel, or ’r after a vowel. Menyw becomes fenyw after ’r. Tŷ becomes fach in mae’r tŷ’n fach. Ddim after the verb is the simple no.",
      points: [
        "Yn links a noun to an adjective or a verb-noun.",
        "Learn the dictionary form and the form after the article as a pair.",
        "A question often uses a different shape of bod.",
      ],
      samples: [
        ["Dw i yma.", "bod, first person"],
        ["Mae’r fenyw yma.", "soft mutation after the article"],
      ],
    },
    verbs: {
      summary: "Bod is irregular, and the action often sits in a verb-noun after yn.",
      body: "Dw i’n gweld yr haul. Person is on bod, not on gweld. Mae, dw i, rwyt ti, and ydyn ni are the statement forms. The negative and the question use other forms of bod. Mynd, dod, cael, gwneud, and gwybod are the other irregulars.",
      points: [
        "Dw i, rwyt ti, mae e / mae hi, ydyn ni.",
        "The past of going that you meet early is es i.",
        "A short verb ending still exists, and the periphrastic with bod is the everyday one.",
      ],
      table: {
        caption: "bod in a statement",
        heads: ["", "bod"],
        rows: [
          ["i", "dw i"],
          ["ti", "rwyt ti"],
          ["hi", "mae hi"],
          ["ni", "dyn ni / ydyn ni"],
        ],
      },
      samples: [
        ["Dw i’n gweld yr haul.", "bod plus a verb-noun"],
        ["Rwyt ti’n dod i’r tŷ.", "dod after bod"],
      ],
    },
    nouns: {
      summary: "Two genders. Mutation is the live change, not a case ending.",
      body: "There is no case ending on the noun. The first letter changes after the article, after a feminine noun, and after some prepositions. Soft mutation pairs: p/b, t/d, c/g, b/f, d/dd, g drops, m/f. Plurals are often not an -au you can predict. Dyn, menyw, and plentyn each have their own plural.",
      points: [
        "Y drws, yr haul, y tŷ, dŵr.",
        "Mae’r tŷ’n fach shows a feminine noun mutating the adjective.",
        "Possession is a pronoun before the noun, fy, dy, ei, and those pronouns mutate too.",
      ],
      samples: [
        ["Mae’r dyn yn cerdded.", "masculine after ’r"],
        ["Mae’r drws yn agored.", "drws"],
      ],
    },
    odd: {
      summary: "Bod, mynd, dod, cael, gwneud, and gwybod.",
      body: "Their past and negative stems do not look like the citation form. Es i is the past of mynd. Des i is the past of dod. Ces i is the past of cael. A mutation that drops g makes a word look as if it had no first letter. That is regular mutation, and it still has to be learned.",
      points: [
        "Do not conjugate mynd like a regular verb-noun.",
        "Mae and dw are the same verb.",
        "Plurals such as plant for plentyn are a list.",
      ],
      samples: [
        ["dw i · mae hi", "two forms of bod"],
        ["es i", "past of mynd, not a regular ending"],
      ],
    },
  },
};
