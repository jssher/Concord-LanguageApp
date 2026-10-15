import { LANG_BY_ID, type LangMeta } from "./languages";

export const GRAMMAR_SECTIONS = [
  { id: "rules", title: "Main rules", blurb: "What the sentence hangs on" },
  { id: "verbs", title: "Conjugation", blurb: "How the verb changes" },
  { id: "nouns", title: "Declension", blurb: "How the noun is marked" },
  { id: "odd", title: "Irregularities", blurb: "Forms you cannot guess" },
] as const;

export type GrammarSectionId = (typeof GRAMMAR_SECTIONS)[number]["id"];

export type GrammarSection = {
  id: GrammarSectionId;
  title: string;
  blurb: string;
  summary: string;
  body: string;
  points: string[];
  table?: { caption: string; heads: string[]; rows: string[][] };
  samples: { text: string; gloss: string }[];
};

const FROM_PATH: Record<string, GrammarSectionId> = {
  sentence: "rules",
  food: "rules",
  way: "rules",
  plan: "rules",
  if: "rules",
  reason: "rules",
  choice: "rules",
  rules: "rules",
  verbs: "verbs",
  nouns: "nouns",
  shop: "nouns",
  odd: "odd",
};

export function sectionFromHash(hash: string): GrammarSectionId | null {
  return FROM_PATH[hash] ?? null;
}

type Table = NonNullable<GrammarSection["table"]>;
type Draft = {
  summary: string;
  body: string;
  points: string[];
  samples: [string, string][];
  table?: Table;
};

function sections(parts: Record<GrammarSectionId, Draft>): GrammarSection[] {
  return GRAMMAR_SECTIONS.map((meta) => {
    const part = parts[meta.id];
    return {
      id: meta.id,
      title: meta.title,
      blurb: meta.blurb,
      summary: part.summary,
      body: part.body,
      points: part.points,
      table: part.table,
      samples: part.samples.map(([text, gloss]) => ({ text, gloss })),
    };
  });
}

function guideForKnown(id: string): GrammarSection[] | null {
  const built = KNOWN[id];
  return built ? built() : null;
}

export function grammarGuide(langId: string): GrammarSection[] {
  return guideForKnown(langId) ?? familyGuide(LANG_BY_ID.get(langId));
}

const KNOWN: Record<string, () => GrammarSection[]> = {
  en: () =>
    sections({
      rules: {
        summary: "Word order does the work that endings do in other languages.",
        body: "A plain statement is subject, verb, object. The verb agrees only in the present, and only with he, she, and it. Questions and negatives need a helper: do, does, did, or a form of be.",
        points: [
          "The marks a known thing. A or an marks a new one.",
          "Adjectives sit before the noun and do not change.",
          "Not goes with the helper: do not, does not, is not.",
        ],
        samples: [
          ["I drink water.", "subject, verb, object"],
          ["Does she want bread?", "the helper carries the question"],
        ],
      },
      verbs: {
        summary: "Most verbs change only for the third person, and for the past.",
        body: "The dictionary form is the present for I, you, we, and they. Add -s for he, she, and it. A regular past adds -ed. Be, have, and do are the helpers you need before any other verb.",
        points: [
          "Be going to and will both mark a plan. Be going to is the nearer one.",
          "The present progressive is am, is, or are plus -ing.",
          "Modal verbs such as can and must do not take -s.",
        ],
        table: {
          caption: "The three helpers, then a regular verb",
          heads: ["", "be", "have", "do", "see"],
          rows: [
            ["I", "am", "have", "do", "see"],
            ["you", "are", "have", "do", "see"],
            ["she", "is", "has", "does", "sees"],
            ["they", "are", "have", "do", "see"],
            ["past", "was / were", "had", "did", "saw"],
          ],
        },
        samples: [
          ["She sees the train.", "third person -s"],
          ["I went yesterday.", "an irregular past"],
        ],
      },
      nouns: {
        summary: "Nouns do not decline. Pronouns do.",
        body: "English keeps case on a closed list of pronouns, not on the house or the book. Learn I / me / my as one set. Plurals usually add -s. A few nouns change the vowel instead.",
        points: [
          "Subject: I, he, she, we, they. Object: me, him, her, us, them.",
          "Who is the subject. Whom is the object, and speech often ignores it.",
          "The possessive before a noun is my, your, his, her, our, their.",
        ],
        table: {
          caption: "Pronouns, the only real declension",
          heads: ["subject", "object", "possessive"],
          rows: [
            ["I", "me", "my"],
            ["he", "him", "his"],
            ["she", "her", "her"],
            ["we", "us", "our"],
            ["they", "them", "their"],
          ],
        },
        samples: [
          ["the child · the children", "an irregular plural"],
          ["Give it to her.", "object form"],
        ],
      },
      odd: {
        summary: "The irregulars are a short list you will say every day.",
        body: "Learn the past and the participle together. Go, went, gone. See, saw, seen. If the plural is not -s, learn it with the singular. There is no rule that will invent children from child.",
        points: [
          "Be is was or were in the past, and been after have.",
          "Have becomes has only for he, she, and it. The past is had for everyone.",
          "Man / men, woman / women, child / children, tooth / teeth, mouse / mice.",
        ],
        samples: [
          ["I have seen it.", "past participle after have"],
          ["She went, and they went.", "one past for every person"],
        ],
      },
    }),
  de: () =>
    sections({
      rules: {
        summary: "The verb takes the second place, and every noun has a gender.",
        body: "A statement is verb-second, even when a time word comes first. In a weil or dass clause the verb goes to the end. Learn each noun with der, die, or das. The friend-form is du. Sie is formal.",
        points: [
          "A yes-no question starts with the verb.",
          "Nicht follows the verb in a simple no.",
          "The case of the article changes with the job of the noun.",
        ],
        samples: [
          ["Ich trinke Wasser.", "verb in second place"],
          ["Trinkst du Wasser?", "verb first in a question"],
        ],
      },
      verbs: {
        summary: "The ending shows the person. A few verbs also change the vowel.",
        body: "Regular present endings are -e, -st, -t, -en, -t, -en. Strong verbs such as sehen change the stem for du and er. The spoken past is usually haben or sein plus a participle. Movement and a change of state take sein.",
        points: [
          "Sein and haben are irregular from the first day.",
          "A separable verb splits in a main clause: ich komme an.",
          "The polite and the they-form look the same: sie sehen, Sie sehen.",
        ],
        table: {
          caption: "Present of the two helpers and one strong verb",
          heads: ["", "sein", "haben", "sehen"],
          rows: [
            ["ich", "bin", "habe", "sehe"],
            ["du", "bist", "hast", "siehst"],
            ["er / sie", "ist", "hat", "sieht"],
            ["wir / sie / Sie", "sind", "haben", "sehen"],
          ],
        },
        samples: [
          ["Ich bin gegangen.", "movement takes sein"],
          ["Ich habe Brot gekauft.", "haben plus the participle"],
        ],
      },
      nouns: {
        summary: "Case lives on the article and the adjective, and sometimes on the noun.",
        body: "Nominative is the subject. Accusative is the ordinary object. Dative is the person you give something to, and the case after in or an when you are already there. Genitive marks possession, and speech often uses von instead.",
        points: [
          "Learn der, die, or das with the singular, and the plural beside it.",
          "After der, die, das an adjective takes an ending: der kleine Tisch.",
          "A plural dative adds -n if the plural does not already end in -n or -s.",
        ],
        table: {
          caption: "der Tisch, a masculine noun",
          heads: ["case", "singular", "plural"],
          rows: [
            ["nominative", "der Tisch", "die Tische"],
            ["accusative", "den Tisch", "die Tische"],
            ["dative", "dem Tisch", "den Tischen"],
            ["genitive", "des Tisches", "der Tische"],
          ],
        },
        samples: [
          ["die Tür · das Haus", "learn the gender with the noun"],
          ["Ich gebe dem Kind das Brot.", "dative person, accusative thing"],
        ],
      },
      odd: {
        summary: "Vowel changes and a short list of pasts will not follow the table.",
        body: "Sehen, geben, nehmen, sprechen, and fahren change the vowel in the du and er forms. The participle of a strong verb often changes the vowel and takes ge- and -en. Sein, haben, and werden do not look like the regular pattern at all.",
        points: [
          "gehen, ging, gegangen. sein, war, gewesen. haben, hatte, gehabt.",
          "Denken takes dachte, not a regular -te on the full stem.",
          "Modal verbs in the perfect use the infinitive, not the participle: ich habe gehen müssen.",
        ],
        samples: [
          ["du siehst · er sieht", "the stem vowel changes"],
          ["Ich bin gewesen.", "the irregular participle of sein"],
        ],
      },
    }),
  es: () =>
    sections({
      rules: {
        summary: "The ending of the verb can replace the subject pronoun.",
        body: "Bebo agua is a full sentence. These cards use tú for you. Nouns are masculine or feminine, and the adjective usually follows and agrees. Ser is what something is. Estar is where it is, or how it is right now.",
        points: [
          "No comes before the verb: no bebo.",
          "A yes-no question keeps the same order. The tone rises.",
          "A personal a appears before a person who is the object: veo a Ana.",
        ],
        samples: [
          ["Bebo agua.", "the ending says I"],
          ["El agua está fría.", "estar for a state, and the adjective agrees"],
        ],
      },
      verbs: {
        summary: "Three conjugations, and a stem change in the stressed forms.",
        body: "Verbs end in -ar, -er, or -ir. The present endings tell the person. Stem-changing verbs change in the singular and in they, and stay regular for we and you-plural. The preterite is a finished past. The imperfect is the background.",
        points: [
          "Ser and ir share the preterite: fui, fuiste, fue.",
          "Gustar agrees with the thing liked, not with the person: me gusta el pan.",
          "The future and the conditional add an ending to the whole infinitive.",
        ],
        table: {
          caption: "Present: one verb from each conjugation",
          heads: ["", "hablar", "comer", "vivir"],
          rows: [
            ["yo", "hablo", "como", "vivo"],
            ["tú", "hablas", "comes", "vives"],
            ["él / ella", "habla", "come", "vive"],
            ["nosotros", "hablamos", "comemos", "vivimos"],
          ],
        },
        samples: [
          ["Quiero agua.", "the stem changes under stress"],
          ["Ayer fui al mercado.", "a finished past"],
        ],
      },
      nouns: {
        summary: "There is no case on the noun. Gender and number are the declension.",
        body: "El and la are the. Un and una are a. The plural adds -s or -es. Object pronouns come before a conjugated verb, or attach to an infinitive. A few masculine nouns take el but stay masculine, such as el día and el agua.",
        points: [
          "De plus el becomes del. A plus el becomes al.",
          "The adjective agrees even when it follows: la puerta abierta.",
          "Direct and indirect pronouns can stack: me lo da.",
        ],
        table: {
          caption: "Articles",
          heads: ["", "masculine", "feminine"],
          rows: [
            ["the, singular", "el", "la"],
            ["the, plural", "los", "las"],
            ["a", "un", "una"],
          ],
        },
        samples: [
          ["los libros · las casas", "plural articles"],
          ["Se lo doy.", "the pronouns come before the verb"],
        ],
      },
      odd: {
        summary: "Ser, ir, tener, hacer, and the stem-changers are the list to learn.",
        body: "Tener is tengo, tienes, tiene, and the yo form of many -go verbs looks like it: pongo, salgo, vengo. Hacer has hago in the present and hice in the preterite. Ir and ser must be memorized. There is no shortcut from the infinitive.",
        points: [
          "Ir present: voy, vas, va, vamos.",
          "Ser present: soy, eres, es, somos.",
          "Jugar changes u to ue. Dormir and pedir change the vowel only in the stressed forms.",
        ],
        samples: [
          ["Tengo que ir.", "tener is irregular, and ir stays irregular beside it"],
          ["Hice pan.", "the preterite of hacer"],
        ],
      },
    }),
  fr: () =>
    sections({
      rules: {
        summary: "The article and the ending are doing quiet work, and many letters are silent.",
        body: "A statement is subject, verb, object. Je, tu, il, elle, nous, vous, and ils or elles are usually written even when the ending already shows the person. Negation wraps the verb: ne … pas, and speech often keeps only pas. Liaison sounds a silent consonant when the next word begins with a vowel.",
        points: [
          "Gender is masculine or feminine. The adjective usually follows and agrees.",
          "Tu is the friend-form. Vous is formal, and it is also the plural.",
          "Est-ce que, or inversion, makes a question. Tone alone is enough in speech.",
        ],
        samples: [
          ["Je bois de l’eau.", "partitive de for an amount"],
          ["Elle n’est pas là.", "ne … pas around the verb"],
        ],
      },
      verbs: {
        summary: "Two helpers, avoir and être, and three families of endings.",
        body: "Regular verbs are -er, like parler, with a large group of -ir and -re verbs beside them. The passé composé is the everyday past: avoir or être plus a participle. A short list of motion verbs, and all reflexive verbs, take être. The participle then agrees with the subject.",
        points: [
          "The present of -er verbs sounds the same in je, tu, il, and ils. Spelling keeps them apart.",
          "Aller, faire, and pouvoir are irregular in the present.",
          "The imperfect is the background past. The passé composé is the event.",
        ],
        table: {
          caption: "Present of the helpers and one regular verb",
          heads: ["", "être", "avoir", "parler"],
          rows: [
            ["je", "suis", "ai", "parle"],
            ["tu", "es", "as", "parles"],
            ["il / elle", "est", "a", "parle"],
            ["nous", "sommes", "avons", "parlons"],
            ["vous", "êtes", "avez", "parlez"],
          ],
        },
        samples: [
          ["Je suis allé.", "a motion verb takes être"],
          ["Nous avons parlé.", "avoir plus the participle"],
        ],
      },
      nouns: {
        summary: "Nouns do not decline. Articles, pronouns, and contractions do the marking.",
        body: "Le, la, and les are the. Du, de la, and des mark an amount. À and de contract with le and les: au, aux, du, des. Object pronouns come before the verb. The noun itself stays the same.",
        points: [
          "Un and une are a. Des is the plural.",
          "Possession is a separate word: mon, ton, son, and they agree with the thing owned.",
          "Y replaces à plus a place. En replaces de plus a thing.",
        ],
        table: {
          caption: "The contractions you write every day",
          heads: ["", "le", "les"],
          rows: [
            ["à +", "au", "aux"],
            ["de +", "du", "des"],
          ],
        },
        samples: [
          ["au marché · du pain", "à and de join the article"],
          ["Je le vois.", "the object pronoun before the verb"],
        ],
      },
      odd: {
        summary: "Être, avoir, aller, faire, and the past participles that do not look like the infinitive.",
        body: "Être is suis, es, est, sommes, êtes, sont. Avoir is ai, as, a, avons, avez, ont. Aller uses vais, vas, va in the singular. Faire uses fais and fait. Irregular participles include eu, été, fait, vu, pris, and mis.",
        points: [
          "Je peux, tu peux, il peut. The nous form is pouvons.",
          "Boire is bois, bois, boit, and buvons.",
          "Plurals are not always -s: un œil, des yeux. Un cheval, des chevaux.",
        ],
        samples: [
          ["Je vais au marché.", "aller is irregular"],
          ["Elle a vu le train.", "vu does not look like voir"],
        ],
      },
    }),
  it: () =>
    sections({
      rules: {
        summary: "The verb ending carries the person, and the article changes with the next sound.",
        body: "Bevo acqua is complete. Tu is the friend-form. Lei is formal. Nouns are masculine or feminine, and the adjective usually follows and agrees. Non comes before the verb.",
        points: [
          "Il, lo, la, l’, i, gli, and le are all the. The form depends on gender and the first sound.",
          "A yes-no question is the statement with a rising tone.",
          "Mi, ti, lo, la, and ci come before the conjugated verb.",
        ],
        samples: [
          ["Bevo acqua.", "no subject pronoun is required"],
          ["L’acqua è fredda.", "the article elides before a vowel"],
        ],
      },
      verbs: {
        summary: "Three conjugations, and essere or avere in the past.",
        body: "Verbs end in -are, -ere, or -ire. The passato prossimo is avere or essere plus the participle. Motion and essere itself take essere, and the participle then agrees. Some -ire verbs insert -isc- in the singular.",
        points: [
          "Essere and avere are irregular in every tense you will meet first.",
          "The imperfetto is the background. The passato prossimo is the event.",
          "Piacere works like gustar: mi piace il pane.",
        ],
        table: {
          caption: "Present",
          heads: ["", "essere", "avere", "parlare"],
          rows: [
            ["io", "sono", "ho", "parlo"],
            ["tu", "sei", "hai", "parli"],
            ["lui / lei", "è", "ha", "parla"],
            ["noi", "siamo", "abbiamo", "parliamo"],
          ],
        },
        samples: [
          ["Sono andato.", "motion takes essere, and the participle agrees"],
          ["Ho visto il treno.", "avere plus an irregular participle"],
        ],
      },
      nouns: {
        summary: "No case on the noun. Gender, number, and the article are the system.",
        body: "Most masculine nouns end in -o and become -i. Most feminine nouns end in -a and become -e. A few nouns end in -e and can be either gender. Di plus the article contracts: del, dello, della. A plus the article becomes al, allo, alla.",
        points: [
          "The adjective agrees: una porta aperta, un libro aperto.",
          "Possession uses il mio, not a bare possessive, for family words as well as things, with a few exceptions.",
          "Prepositions fuse with the article. Learn del, al, nel, and sul as words.",
        ],
        samples: [
          ["il libro · i libri", "masculine plural -i"],
          ["della porta", "di plus la"],
        ],
      },
      odd: {
        summary: "Essere, avere, andare, fare, and dire will not follow the regular endings.",
        body: "Andare is vado, vai, va, andiamo. Fare is faccio, fai, fa, facciamo. Dire is dico, dici, dice. Bere is bevo, bevi, beve. Their participles, stato, avuto, fatto, detto, and bevuto, also have to be learned.",
        points: [
          "Uscire and venire take -go or a stem change in the singular: esco, vengo.",
          "Potere is posso, puoi, può.",
          "Uomo becomes uomini. Dio becomes dei in the plural of the phrase.",
        ],
        samples: [
          ["Vado al mercato.", "andare replaces the stem"],
          ["Ho fatto il pane.", "fatto, not a regular -ato"],
        ],
      },
    }),
  pt: () =>
    sections({
      rules: {
        summary: "These cards use Brazilian Portuguese. The ending can carry the person, and você is the you.",
        body: "Bebo água is a full sentence. Você takes the same verb as ele and ela. Tu exists, and these cards do not require it. O and a mark gender and contract with de and em. Não comes before the verb.",
        points: [
          "A question is the statement plus tone.",
          "Estar plus the gerund is the action in progress: estou bebendo.",
          "The adjective usually follows and agrees.",
        ],
        samples: [
          ["Bebo água.", "the subject can drop"],
          ["Você quer pão?", "você uses the third-person form"],
        ],
      },
      verbs: {
        summary: "Three conjugations, and a small set of verbs that must be memorized.",
        body: "Verbs end in -ar, -er, or -ir. Ser, ir, and ter are irregular from the start. The pretérito perfeito is the finished past. Ir and ser share fui, foi, and foram. The personal infinitive is a Brazilian habit you will meet after the present is easy.",
        points: [
          "Ter is the have of possession: tenho, tem, temos.",
          "The future can be ir plus the infinitive: vou beber.",
          "Gostar takes de: gosto de pão.",
        ],
        table: {
          caption: "Present, Brazilian você",
          heads: ["", "ser", "ter", "falar"],
          rows: [
            ["eu", "sou", "tenho", "falo"],
            ["você / ele", "é", "tem", "fala"],
            ["nós", "somos", "temos", "falamos"],
            ["eles", "são", "têm", "falam"],
          ],
        },
        samples: [
          ["Fui ao mercado.", "ir and ser share this past"],
          ["Estou bebendo água.", "progress with the gerund"],
        ],
      },
      nouns: {
        summary: "No case. Gender, number, and the contracted article do the marking.",
        body: "O and a are the. Um and uma are a. De plus o becomes do. Em plus a becomes na. Plurals add -s. Object pronouns are often placed before the verb in Brazil, especially in speech.",
        points: [
          "Learn do, da, no, and na as single words.",
          "The adjective agrees: a água fria.",
          "A gente means we in speech and takes the third person.",
        ],
        samples: [
          ["na estação · do mercado", "em and de join the article"],
          ["os livros · as casas", "plural articles"],
        ],
      },
      odd: {
        summary: "Ser, ir, ter, vir, pôr, and a handful of plurals.",
        body: "Ser is sou, é, somos, são. Ir is vou, vai, vamos, vão. Ter is tenho, tem, temos, têm. Vir is venho, vem. Pôr is ponho, põe. Their pasts are short and must be learned as lists, not built.",
        points: [
          "Poder is posso, pode, podemos.",
          "Fazer is faço, faz, and the past is fiz.",
          "Pão becomes pães. Qualquer irregular plural is safer learned with the singular.",
        ],
        samples: [
          ["Vou pôr a mesa.", "ir and pôr are both irregular"],
          ["Ela fez pão.", "the past of fazer"],
        ],
      },
    }),
  ru: () =>
    sections({
      rules: {
        summary: "There is no article. Endings carry gender, number, and case, and aspect splits every verb in two.",
        body: "A plain sentence can be subject, verb, object, and the order can move to mark what is new. The present of быть is usually left out: я дома. Every verb is imperfective or perfective. The imperfective is the process. The perfective is the result.",
        points: [
          "Adjectives agree with the noun in gender, number, and case.",
          "Ты is the friend-form. Вы is formal and plural.",
          "Не comes immediately before the word it negates.",
        ],
        samples: [
          ["Я пью воду.", "no article, accusative ending on воду"],
          ["Я дома.", "the present of быть is omitted"],
        ],
      },
      verbs: {
        summary: "Two present conjugations, and a past that agrees with gender instead of person.",
        body: "The present, or the perfective future, ends in -у/-ю, -ешь, -ет, or in -у/-ю, -ишь, -ит. The past drops the person and marks gender: был, была, было, были. Learn each verb with its pair: читать and прочитать are one meaning in two aspects.",
        points: [
          "The perfective future looks like a present: я прочитаю.",
          "The imperfective future is быть plus the infinitive: я буду читать.",
          "Motion verbs come in pairs too: идти and ходить.",
        ],
        table: {
          caption: "Present of читать, and the past of быть",
          heads: ["", "читать", "быть, past"],
          rows: [
            ["я", "читаю", "был / была"],
            ["ты", "читаешь", "был / была"],
            ["он / она", "читает", "был / была"],
            ["мы", "читаем", "были"],
            ["они", "читают", "были"],
          ],
        },
        samples: [
          ["Она читала.", "past agrees with gender"],
          ["Я куплю хлеб.", "perfective future"],
        ],
      },
      nouns: {
        summary: "Six cases. The ending depends on gender and on the last consonant.",
        body: "Nominative is the dictionary form. Accusative is the object, and for a masculine living being it looks like the genitive. Genitive is of, and also after many numbers. Dative is to. Instrumental is with or by. Prepositional is the case after в and о when you mean location or topic.",
        points: [
          "Feminine nouns in -а often take -у in the accusative: вода, воду.",
          "Neuter nouns in -о look alike in the nominative and the accusative.",
          "Adjectives take a matching ending. Learn one adjective beside one noun.",
        ],
        table: {
          caption: "стол, masculine and inanimate",
          heads: ["case", "singular", "plural"],
          rows: [
            ["nominative", "стол", "столы"],
            ["accusative", "стол", "столы"],
            ["genitive", "стола", "столов"],
            ["dative", "столу", "столам"],
            ["instrumental", "столом", "столами"],
            ["prepositional", "столе", "столах"],
          ],
        },
        samples: [
          ["в доме", "prepositional for location"],
          ["нет воды", "genitive after a negation of existence"],
        ],
      },
      odd: {
        summary: "Хотеть, есть, дать, and the people-words ignore the regular endings.",
        body: "Быть has almost no present. Хотеть mixes the two conjugations. Идти and ехать have their own pasts, шёл and ехал, and their own perfective partners. People is люди, not a regular plural of человек. Children is дети.",
        points: [
          "Мочь is могу, можешь, может, and the past мог changes by gender.",
          "Идти, шёл, and пойти belong together. Do not build one from the other.",
          "A few masculine nouns add -а in the nominative plural: дом, дома. Learn them when you meet them.",
        ],
        samples: [
          ["Я хочу воду.", "хотеть is irregular"],
          ["Дети дома.", "the plural is not built from the singular"],
        ],
      },
    }),
  zh: () =>
    sections({
      rules: {
        summary: "The verb and the noun do not change. Word order, particles, and measure words do the grammar.",
        body: "A plain sentence is subject, verb, object. 我喝水。 Time comes before the verb, not at the end. The tone is part of the word. 的 links a description to a noun. 吗 makes a yes-no question, and 不 or 没 is the no.",
        points: [
          "There is no article and no plural ending on the noun.",
          "了 after the verb marks a completed event. 过 marks having had the experience.",
          "A question can also offer both sides: 喝不喝？",
        ],
        samples: [
          ["我喝水。", "subject, verb, object, no endings"],
          ["你喝水吗？", "吗 makes the question"],
        ],
      },
      verbs: {
        summary: "There is no conjugation. Aspect and a modal sit next to an unchanged verb.",
        body: "喝 is drink for I, you, and she, today and in a finished event. What changes is the particle. 在 before the verb, or 着 after it, marks something going on. 会 and 能 are can, with 会 for a learned skill. 要 and 会 both reach into the future. 没 negates 了. 不 negates a habit or a modal.",
        points: [
          "是 and 有 do not take 了 the way an action verb does.",
          "想 is want. 要 is want or going to, and it is stronger.",
          "The verb does not agree with the person. Say the pronoun.",
        ],
        table: {
          caption: "The same verb, different particles",
          heads: ["mark", "example", "job"],
          rows: [
            ["plain", "我喝水", "habit or now"],
            ["了", "我喝了水", "completed"],
            ["过", "我喝过", "experience"],
            ["在", "我在喝水", "in progress"],
            ["会", "我会喝", "can, or a prediction"],
          ],
        },
        samples: [
          ["我没喝。", "没 negates a completed action"],
          ["她不要面包。", "不 with a modal"],
        ],
      },
      nouns: {
        summary: "There is no case. A measure word stands between the number and the noun.",
        body: "个 is the general measure. 杯 is for a cup, 本 for a book. The order is number, measure, noun: 一个人. 在 marks a place and does not change the noun. To show the object of a 把 sentence, the object moves before the verb.",
        points: [
          "Some nouns use a special measure. Learn it with the noun.",
          "们 can mark a plural of people: 我们, 孩子们. It is not a general plural.",
          "的 can replace the noun once the noun is known: 我的.",
        ],
        table: {
          caption: "Measure words you will actually say",
          heads: ["measure", "with", "example"],
          rows: [
            ["个", "people and many things", "一个人"],
            ["杯", "a glass or cup", "一杯水"],
            ["本", "bound things", "一本书"],
            ["只", "one of a pair, or some animals", "一只"],
          ],
        },
        samples: [
          ["三杯水", "number, measure, noun"],
          ["在家", "place without a case ending"],
        ],
      },
      odd: {
        summary: "The irregularities are tones and a few words that refuse the regular particle.",
        body: "不 becomes bú before a fourth tone. 一 changes tone before another tone. 是 is negated with 不, not 没, when you mean is not. 有 is negated with 没, and 没有 is the whole word. 了 can sit after the verb or at the end of the sentence, and those are not the same job.",
        points: [
          "好 looks regular and is irregular in compounds. Learn each compound as a word.",
          "Directional endings such as 来 and 去 attach to verbs of motion.",
          "A classifier you have not met is not 个 by default in careful speech, even though 个 will be understood.",
        ],
        samples: [
          ["我不是学生。", "是 takes 不"],
          ["我没有水。", "有 takes 没"],
        ],
      },
    }),
  ja: () =>
    sections({
      rules: {
        summary: "Particles mark the job of each word. The verb closes the sentence.",
        body: "These cards use polite です and ます. は marks the topic. が marks the subject when it is new information. を marks the object. に marks a destination or a point in time. There is no article and no plural ending.",
        points: [
          "Adjectives come before the noun, or they conjugate and close the sentence.",
          "か at the end makes a question.",
          "The plain form is for dictionaries and for close speech. Start with ます.",
        ],
        samples: [
          ["水を飲みます。", "object を, verb last"],
          ["これは水です。", "topic は, copula です"],
        ],
      },
      verbs: {
        summary: "Three families: godan, ichidan, and two irregular verbs.",
        body: "Godan verbs change the last syllable: 飲む becomes 飲みます. Ichidan verbs drop る and add ます: 食べる, 食べます. する and 来る are the irregular pair. The て form is the bridge to progress, requests, and sequences. The past polite is ました.",
        points: [
          "ません is the polite no. なかったです or ませんでした is the past no.",
          "いる and ある both mean exist. いる is for living things.",
          "たい on the stem is want to: 飲みたいです.",
        ],
        table: {
          caption: "Polite present and past",
          heads: ["", "drink", "eat", "do"],
          rows: [
            ["dictionary", "飲む", "食べる", "する"],
            ["polite", "飲みます", "食べます", "します"],
            ["past", "飲みました", "食べました", "しました"],
            ["negative", "飲みません", "食べません", "しません"],
          ],
        },
        samples: [
          ["食べています。", "て plus いる for an action in progress"],
          ["駅に行きます。", "destination に, verb last"],
        ],
      },
      nouns: {
        summary: "Nouns do not decline. The particle after the noun is the case marker.",
        body: "は, が, を, に, で, へ, と, and の cover the jobs that cases cover in other languages. の links two nouns: 私の本. Counters are required with numbers. 人 for people, 杯 for cups, 本 for long objects. The number and the counter usually sit after the noun they count, or before it with の.",
        points: [
          "で marks the place where an action happens. に marks where something is.",
          "へ and に both mark a destination. に is the one to learn first.",
          "A noun plus じゃないです is the polite negative of です.",
        ],
        table: {
          caption: "Particles that replace case endings",
          heads: ["particle", "job", "example"],
          rows: [
            ["は", "topic", "水は"],
            ["を", "object", "水を飲む"],
            ["に", "destination, time, existence", "駅に"],
            ["で", "place of action", "家で"],
            ["の", "links nouns", "私の本"],
          ],
        },
        samples: [
          ["水を一杯", "a counter instead of a plural ending"],
          ["家で食べます。", "で for the place of the action"],
        ],
      },
      odd: {
        summary: "する, 来る, and the て forms that change the consonant.",
        body: "する and 来る are the only fully irregular verbs, but godan て forms look irregular until you know the groups. 買う becomes 買って. 飲む becomes 飲んで. 書く becomes 書いて. 行く is the famous exception: 行って, not 行いて. いい is the irregular adjective beside よい.",
        points: [
          "来る is きます, きました, こない.",
          "する is します. 勉強する conjugates like する.",
          "です drops to じゃありません or じゃないです in the negative. There is no regular ですません.",
        ],
        samples: [
          ["行ってきます。", "行く takes って"],
          ["来ますか。", "来る is irregular"],
        ],
      },
    }),
  ko: () =>
    sections({
      rules: {
        summary: "Particles mark the job of the noun. The verb closes the sentence, in a speech level.",
        body: "These cards use the polite 해요 style. 은 or 는 marks the topic. 이 or 가 marks the subject. 을 or 를 marks the object. There is no article. The vowel of the particle follows the last sound of the noun.",
        points: [
          "Time and place usually come before the object.",
          "Adjectives conjugate like verbs. They are descriptive verbs.",
          "요 at the end is the politeness of this style. Do not drop it with strangers.",
        ],
        samples: [
          ["물을 마셔요.", "object particle, verb last"],
          ["저는 학생이에요.", "topic, and 이다 in the polite style"],
        ],
      },
      verbs: {
        summary: "One stem, then an ending for tense and politeness. A few stems change before the ending.",
        body: "하다 becomes 해요. 먹다 becomes 먹어요. The past polite inserts 았 or 었: 먹었어요. The future polite often uses -(으)ㄹ 거예요. Negation is 안 before the verb, or -지 않아요 after the stem.",
        points: [
          "하다 verbs are a large regular family: 공부하다, 공부해요.",
          "이다, to be, is 이에요 after a consonant and 예요 after a vowel.",
          "High and low speech levels exist. Learn 해요 first, then the plain form in the dictionary.",
        ],
        table: {
          caption: "해요 style",
          heads: ["", "eat", "do", "be"],
          rows: [
            ["stem", "먹", "하", "이"],
            ["polite", "먹어요", "해요", "이에요 / 예요"],
            ["past", "먹었어요", "했어요", "이었어요"],
            ["negative", "안 먹어요", "안 해요", "아니에요"],
          ],
        },
        samples: [
          ["어제 먹었어요.", "past polite"],
          ["물 안 마셔요.", "안 before the verb"],
        ],
      },
      nouns: {
        summary: "No cases on the noun. The particle is the declension.",
        body: "Choose the particle by the last sound. 은 and 이 and 을 follow a consonant. 는 and 가 and 를 follow a vowel. 에 marks a destination or a time. 에서 marks where an action happens. 의 marks possession. Counters are used with numbers, and the number system itself has a native set and a Sino-Korean set.",
        points: [
          "People counts often use native numbers: 한 명.",
          "Minutes and money usually use Sino-Korean numbers.",
          "A noun does not mark plural unless you choose 들, and even then it is optional.",
        ],
        table: {
          caption: "Particle pairs",
          heads: ["job", "after a consonant", "after a vowel"],
          rows: [
            ["topic", "은", "는"],
            ["subject", "이", "가"],
            ["object", "을", "를"],
          ],
        },
        samples: [
          ["집에서", "에서 for the place of an action"],
          ["학교에", "에 for a destination"],
        ],
      },
      odd: {
        summary: "ㄷ, ㅂ, 르, and 하다 are the patterns that surprise people.",
        body: "듣다 becomes 들어요. 걷다 becomes 걸어요. ㅂ verbs such as 춥다 become 추워요. 르 verbs double the ㄹ. 하다 is regular inside its own pattern, and it is irregular if you try to add 아요 without the contraction. 이다 has no 안 이다. The negative is 아니에요.",
        points: [
          "으 verbs drop 으 before 어: 쓰다, 써요.",
          "The copula in the past is 이었어요 or 였어요, not a regular 하다 past.",
          "Native numbers change shape with counters: 하나 becomes 한, 둘 becomes 두.",
        ],
        samples: [
          ["추워요.", "ㅂ irregular"],
          ["들어요.", "ㄷ irregular, from 듣다"],
        ],
      },
    }),
  ar: () =>
    sections({
      rules: {
        summary: "This page is Modern Standard Arabic. Egyptian, Saudi, and Maghrebi stay on the study card.",
        body: "A verb can come first, or the subject can. The root is usually three consonants, and the vowels around them build the word. Nouns are masculine or feminine. The dual is a living number, not only an archaism. Al- is the.",
        points: [
          "The feminine ending is often -a, written ة.",
          "Adjectives follow the noun and agree.",
          "The reading on the study card is there so you can say the word before the short vowels are obvious.",
        ],
        samples: [
          ["أنا أشرب الماء.", "subject, then the verb"],
          ["الماء بارد.", "article on the noun, adjective after it"],
        ],
      },
      verbs: {
        summary: "The past is a suffix. The present is a prefix, and often a suffix too.",
        body: "Kataba means he wrote. The past adds an ending for the other persons: katabtu, katabta, katabat. The present uses a prefix: aktubu, tak tubu, yaktubu. Each verb belongs to a form, from the simple Form I out to the derived forms. Learn Form I first.",
        points: [
          "The present prefix vowel is not the same for every verb. Learn it with the verb.",
          "Lan plus the subjunctive is a future negation. Lam plus the jussive is a past negation.",
          "The dialect cards do not use this full system. Do not correct Egyptian with a Standard table.",
        ],
        table: {
          caption: "Form I, kataba, he wrote",
          heads: ["", "past", "present"],
          rows: [
            ["I", "katabtu", "aktubu"],
            ["you, masculine", "katabta", "taktubu"],
            ["he", "kataba", "yaktubu"],
            ["she", "katabat", "taktubu"],
            ["we", "katabnā", "naktubu"],
          ],
        },
        samples: [
          ["كتب", "he wrote, the dictionary past"],
          ["أكتب", "I write"],
        ],
      },
      nouns: {
        summary: "Three cases, and they are short vowels at the end of the noun.",
        body: "Nominative is -u, accusative is -a, and genitive is -i. The article al- does not change. After a preposition the noun is genitive. A sound masculine plural and a sound feminine plural are regular. Many common nouns use a broken plural instead, and that plural has to be learned.",
        points: [
          "The dual ending is -āni in the nominative and -ayni in the other cases.",
          "Idāfa, the noun-noun chain, drops the article from the first noun: bābu l-bayti.",
          "The accusative also marks some adverbs.",
        ],
        table: {
          caption: "Definite singular endings",
          heads: ["case", "ending", "job"],
          rows: [
            ["nominative", "-u", "subject"],
            ["accusative", "-a", "object"],
            ["genitive", "-i", "after a preposition, or the second noun of an idāfa"],
          ],
        },
        samples: [
          ["كتاب، كتب", "a broken plural, not a suffix"],
          ["في البيت", "genitive after a preposition"],
        ],
      },
      odd: {
        summary: "Hollow verbs, weak verbs, and broken plurals will not follow kataba.",
        body: "A hollow verb has w or y as the middle root letter, and the vowel collapses: qāla, qultu. A defective verb has a weak last letter. Hamza verbs change the seat of the hamza. Broken plurals such as kitāb, kutub are a list, not a rule you can apply blindly.",
        points: [
          "Laysa is the irregular not for a nominal sentence.",
          "Kāna takes the subject in the nominative and the predicate in the accusative.",
          "The numbers from 3 to 10 take the opposite gender of the counted noun.",
        ],
        samples: [
          ["قال، قلت", "a hollow verb changes shape with the person"],
          ["ليس بارداً", "laysa instead of a regular negative verb"],
        ],
      },
    }),
};

function familyGuide(lang: LangMeta | undefined): GrammarSection[] {
  const name = lang?.name ?? "This language";
  const family = lang?.family ?? "";
  const id = lang?.id ?? "";
  const tip = lang?.tip ?? "";

  if (family === "Germanic") return germanic(name, id);
  if (family === "Romance") return romance(name, id);
  if (family === "Slavic" || id === "isv") return slavic(name, id);
  if (family === "Indic") return indic(name, id);
  if (family === "Dravidian") return dravidian(name);
  if (family === "Sinitic") return sinitic(name, id);
  if (family === "Semitic") return semitic(name, id);
  if (family === "Constructed" || family === "Machine") return constructed(name, id, tip);
  return openFamily(name, family, id, tip);
}

function germanic(name: string, id: string): GrammarSection[] {
  const verb =
    id === "nl"
      ? {
          summary: "The verb is in second place, and a subordinate clause sends it to the end.",
          table: {
            caption: "Present",
            heads: ["", "zijn", "hebben", "drinken"],
            rows: [
              ["ik", "ben", "heb", "drink"],
              ["jij", "bent", "hebt", "drinkt"],
              ["hij", "is", "heeft", "drinkt"],
              ["wij", "zijn", "hebben", "drinken"],
            ],
          },
          samples: [
            ["Ik ben gegaan.", "motion takes zijn"],
            ["Ik drink water.", "verb second"],
          ] as [string, string][],
        }
      : id === "da"
        ? {
            summary: "The present adds -r for every person. Være and have are the irregulars.",
            table: {
              caption: "Present",
              heads: ["", "være", "have", "drikke"],
              rows: [
                ["jeg", "er", "har", "drikker"],
                ["du", "er", "har", "drikker"],
                ["hun", "er", "har", "drikker"],
                ["vi", "er", "har", "drikker"],
              ],
            },
            samples: [
              ["Jeg drikker vand.", "one present ending for every person"],
              ["Jeg gik.", "an irregular past"],
            ] as [string, string][],
          }
        : id === "is"
          ? {
              summary: "The verb agrees with the person, and vera and hafa are irregular.",
              table: {
                caption: "Present of vera",
                heads: ["", "vera"],
                rows: [
                  ["ég", "er"],
                  ["þú", "ert"],
                  ["hún", "er"],
                  ["við", "erum"],
                ],
              },
              samples: [
                ["Ég drekk vatn.", "the ending shows the person"],
                ["Ég er hér.", "vera is irregular"],
              ] as [string, string][],
            }
          : id === "gsw-be"
            ? {
                summary: "Bern speech keeps a short present. Sii and haa are the verbs to learn first.",
                table: {
                  caption: "Present",
                  heads: ["", "sii", "haa"],
                  rows: [
                    ["i", "bi", "ha"],
                    ["du", "bisch", "hesch"],
                    ["är", "isch", "het"],
                    ["mir", "sy", "hei"],
                  ],
                },
                samples: [
                  ["I bi da.", "sii, city Bern"],
                  ["Hesch du Brot?", "verb first in a question"],
                ] as [string, string][],
              }
          : id === "gsw"
            ? {
                summary: "Zürich speech keeps a short present. Sii and haa are the verbs to learn first.",
                table: {
                  caption: "Present",
                  heads: ["", "sii", "haa"],
                  rows: [
                    ["ich", "bi", "ha"],
                    ["du", "bisch", "hesch"],
                    ["er", "isch", "hät"],
                    ["mir", "sind", "händ"],
                  ],
                },
                samples: [
                  ["Ich bi daa.", "sii, not the Hochdeutsch bin in writing"],
                  ["Hesch du Brot?", "verb first in a question"],
                ] as [string, string][],
              }
            : {
                summary: `${name} marks the person on the verb, or with a helper.`,
                samples: [
                  ["I drink water.", "say the person"],
                  ["I went.", "learn the past with the verb"],
                ] as [string, string][],
              };

  const noun =
    id === "nl"
      ? {
          summary: "De or het is the fact you memorize. There is no case left on ordinary nouns.",
          body: "De is common gender. Het is neuter. Plurals take -en or -s. Adjectives add -e in most positions, and stay bare in het plus an indefinite singular: een klein huis.",
          points: ["Learn de or het with the noun.", "A diminutive in -je is usually het.", "Object pronouns are a closed list: me, je, hem, haar."],
          samples: [
            ["het huis · de deur", "gender with the noun"],
            ["een klein huis", "no -e after een before a het word"],
          ] as [string, string][],
        }
      : id === "da"
        ? {
            summary: "En or et is the gender, and the definite article can be a suffix.",
            body: "Common gender takes en. Neuter takes et. A definite noun adds the article at the end: huset, døren. There is no case on the noun.",
            points: ["Learn en or et with the new noun.", "Adjectives agree with en, et, and the plural.", "Pronouns still distinguish subject and object."],
            samples: [
              ["et hus · huset", "indefinite, then the suffix article"],
              ["en dør · døren", "common gender"],
            ] as [string, string][],
          }
        : id === "is"
          ? {
              summary: "Four cases, three genders, and the article is a suffix.",
              body: "Nominative, accusative, dative, and genitive are still alive. The definite article attaches to the noun: húsið. Adjectives agree in gender, number, and case, and they use a strong or a weak ending.",
              points: ["Learn the nominative with the article first.", "The object is often accusative, and some verbs ask for dative.", "Plurals are not always a simple -ir or -ar."],
              samples: [
                ["húsið", "definite suffix"],
                ["Ég sé húsið.", "the article stays on the noun"],
              ] as [string, string][],
            }
          : id === "gsw-be"
            ? {
                summary: "The article is d, dr, or ds, and it is not the Zürich article.",
                body: "D Frau, dr Ma, and ds Huus still show gender. Nid is not nöd, and loufe is not lauffe. Learn the article with the noun.",
                points: ["Gender is still there.", "Do not correct Bern with a Zürich or Hochdeutsch chart.", "The same English sentence is on the Zürich card in Zürich spelling."],
                samples: [
                  ["ds Huus · d Türe", "neuter and feminine"],
                  ["dr Ma", "masculine"],
                ] as [string, string][],
              }
          : id === "gsw"
            ? {
                summary: "The article shrinks, and case is lighter than in written German.",
                body: "D Frau, de Maa, and s Huus still show gender. Speech does not ask you to produce a full written case table. Learn the article with the noun, and learn the pronoun forms you actually say.",
                points: ["Gender is still there.", "Do not correct Zürich speech with a Hochdeutsch case chart.", "Diminutives and pet forms are common and worth learning as words."],
                samples: [
                  ["s Huus · d Tür", "the article is part of the word you say"],
                  ["de Maa", "masculine"],
                ] as [string, string][],
              }
            : {
                summary: `${name} keeps most of the grammar on word order and a small set of pronouns.`,
                body: tipOr(langTip(id), "Learn the noun with its article or gender, and the pronoun with its object form."),
                points: ["Learn the article with the noun.", "Pronouns may keep subject and object forms.", "Plurals that do not add a regular ending have to be memorized."],
                samples: [
                  ["the house", "article with the noun"],
                  ["I see her.", "object pronoun"],
                ] as [string, string][],
              };

  return sections({
    rules: {
      summary: id === "gsw" ? "Verb second, as in German, written as Zürich speech." : id === "gsw-be" ? "Verb second, as in German, written as Bern speech." : `${name} builds the sentence around a verb in a fixed place.`,
      body:
        id === "gsw"
          ? "Ich bi daa. The verb stays in second place. These cards are Zürich speech, not Bern and not schoolbook German."
          : id === "gsw-be"
            ? "I bi da. The verb stays in second place. These cards are city Bern. dr, ds, and nid are not the Zürich forms."
            : id === "da"
            ? "Jeg drikker vand. The verb stays in second place, so a time word at the front pushes the subject after the verb."
            : id === "is"
              ? "Ég drekk vatn. The verb is in second place, and the noun’s ending shows its case."
              : id === "nl"
                ? "Ik drink water. The verb is second in a main clause and goes to the end in a subordinate clause. Je or jij is the friend-form. U is formal."
                : `${name} uses a small set of endings or helpers, and word order carries the rest.`,
      points: ["Learn the friend-form before the formal one.", "A question often starts with the verb.", "Negation sits next to the verb."],
      samples:
        id === "nl"
          ? [
              ["Ik drink water.", "verb second"],
              ["Wil je brood?", "verb first"],
            ]
          : id === "da"
            ? [
                ["Jeg drikker vand.", "verb second"],
                ["Hvor er toget?", "the verb stays second after hvor"],
              ]
            : [
                ["I drink water.", "a plain statement"],
                ["Where is it?", "a question"],
              ],
    },
    verbs: {
      summary: verb.summary,
      body: "Learn be and have, then one regular verb, then the past of go and see. Add a full table only after those sentences are easy to say.",
      points: ["Be and have are irregular.", "The spoken past may use a helper plus a participle.", "A separable or a phrasal verb belongs with its particle."],
      table: verb.table,
      samples: verb.samples,
    },
    nouns: noun,
    odd: {
      summary: "Be, have, go, and see, plus the plurals that change the vowel.",
      body: `${name} has a short list of verbs and plurals that will not follow the regular ending. Learn each one as a set: the present, the past, and the participle if the language uses one.`,
      points: ["Do not build the past of go from the present.", "Modal verbs often lack a normal person ending.", "If a plural looks unrelated, memorize the pair."],
      samples: verb.samples,
    },
  });
}

function romansh(): GrammarSection[] {
  return sections({
    rules: {
      summary: "The subject usually stays. Na and betg wrap the verb.",
      body: "Rumantsch Grischun keeps the pronoun more often than Italian or Spanish. Jau ves tai. Ti is the friend-form. Vus is plural, and with a capital it is polite. If a question word or another adverb starts the sentence, the verb moves in front of the subject: Pertgè na vegnis vus betg?",
      points: ["jau, ti, el, ella, nus, vus, els, ellas.", "na … betg is not.", "A yes-no question also puts the verb before the subject."],
      samples: [
        ["Jau ves tai.", "the pronoun stays"],
        ["Pertgè na vegnis vus betg?", "verb before vus"],
      ],
    },
    verbs: {
      summary: "Esser and avair first. Ir replaces the stem.",
      body: "Esser is jau sun, ti es, el è, nus essan, vus essas, els èn. Avair is jau hai, ti has, el ha, nus avain, vus avais, els han. A regular -ar verb follows gidar: jau gid, ti gidas, el gida, nus gidain. Ir is jau vom, ti vas, el va, nus giain, vus giais, els van.",
      points: ["Vegnir is jau vegn, ti vegns, el vegn.", "Dar is jau dun, ti das, el dat.", "Do not build the present of ir from the infinitive."],
      table: {
        caption: "Present",
        heads: ["", "esser", "avair"],
        rows: [
          ["jau", "sun", "hai"],
          ["ti", "es", "has"],
          ["el", "è", "ha"],
          ["nus", "essan", "avain"],
          ["vus", "essas", "avais"],
          ["els", "èn", "han"],
        ],
      },
      samples: [
        ["jau sun · ti es · el è", "esser"],
        ["jau vom · ti vas · el va", "ir"],
      ],
    },
    nouns: {
      summary: "il or la, and the adjective agrees. There is no case on the noun.",
      body: "Masculine il before a consonant, l’ before a vowel, ils in the plural. Feminine la, or l’ before a vowel, las in the plural. in and ina are a, and also one. There is no plural a. The adjective agrees: il grond chaun, la gronda paraid. Comparison is pli … che.",
      points: ["Learn l’aua and il cudesch with the article.", "in is masculine, ina is feminine.", "Grond becomes gronda, gronds, grondas."],
      samples: [
        ["il grond chaun", "masculine"],
        ["la gronda paraid", "feminine"],
        ["Questa giacca è pli pitschna che quella.", "pli … che"],
      ],
    },
    odd: {
      summary: "Esser, avair, ir, vegnir, and dar will not follow gidar.",
      body: "Ir’s present is vom, vas, va, giain, giais, van. Its participle is ì, ida. Vegnir is vegn, vegns, vegn, vegnin, vegnis, vegnan. Esser’s participle is stà, stada. Avair’s is gì, gida. An unstressed object sits before the verb, and betg closes the negation: Jau na ta ves betg.",
      points: ["Jau ves tai stresses the object.", "Jau la dun in cudesch puts the object pronoun before dar.", "i plova is the impersonal, in the third person."],
      samples: [
        ["Jau na ta ves betg.", "na … betg"],
        ["jau vom · nus giain", "ir"],
      ],
    },
  });
}

function romance(name: string, id: string): GrammarSection[] {
  if (id === "rm") return romansh();
  const ro = id === "ro";
  return sections({
    rules: {
      summary: ro ? "The article is a suffix, and the verb ending carries the person." : `${name} can drop the subject. The ending shows who acts.`,
      body: ro
        ? "Romanian puts the definite article on the end of the noun: omul, casa. The verb still tells you the person. Eu sunt aici is complete, and the pronoun can drop once the ending is clear."
        : `${name} uses gender on the noun and agreement on the adjective. The friend-form is enough until the sentence feels automatic. No or the local negative comes before the verb.`,
      points: ["Gender is part of the noun.", "Adjectives agree.", "A yes-no question can keep statement order."],
      samples: ro
        ? [
            ["Eu sunt aici.", "the verb agrees"],
            ["casa", "definite article on the noun"],
          ]
        : [
            ["I drink water.", "the ending can replace the pronoun"],
            ["the cold water", "the adjective agrees"],
          ],
    },
    verbs: {
      summary: ro ? "A fi and a avea are irregular. Everyone else sits in a conjugation." : "Three conjugations, plus a handful of verbs that replace the stem.",
      body: ro
        ? "The present of a fi is sunt, ești, este, suntem. A avea is am, ai, are, avem. A regular verb adds a personal ending. The perfect is a separate short form you should learn verb by verb at first."
        : `Group ${name} verbs by the infinitive ending. Learn I, you, and one third person before the plural. Ser or essere or être, and ir or andare or aller, are irregular in every Romance language that has them.`,
      points: ["Be and have or have-as-auxiliary come first.", "A finished past and a background past are different.", "Stem changes usually happen in the stressed forms only."],
      table: ro
        ? {
            caption: "Present",
            heads: ["", "a fi", "a avea"],
            rows: [
              ["eu", "sunt", "am"],
              ["tu", "ești", "ai"],
              ["el / ea", "este", "are"],
              ["noi", "suntem", "avem"],
            ],
          }
        : undefined,
      samples: ro
        ? [
            ["Sunt aici.", "a fi"],
            ["Am pâine.", "a avea"],
          ]
        : [
            ["I speak.", "present ending"],
            ["I went.", "a past that may be irregular"],
          ],
    },
    nouns: {
      summary: ro ? "The article is a suffix, and genitive and dative share a form." : "No Latin case on the noun. Gender, number, and pronouns do the work.",
      body: ro
        ? "Nominative and accusative look the same for ordinary nouns. Genitive and dative share an ending and often a preceding article-like marker, lui or a form of al. Learn the indefinite and the definite as a pair: un om, omul. A casă, casa."
        : `${name} lost the Latin cases on nouns. What remains is gender, the plural, object pronouns, and contractions of the preposition with the article.`,
      points: ro
        ? ["Learn indefinite and definite together.", "Feminine nouns often change the stem between the two.", "Pronouns still distinguish person and case more finely than nouns."]
        : ["Learn the article with the noun.", "Object pronouns usually come before the verb.", "Prepositions may fuse with the article."],
      samples: ro
        ? [
            ["un om · omul", "indefinite, then definite"],
            ["o casă · casa", "the feminine pair"],
          ]
        : [
            ["the house", "article plus noun"],
            ["I see her.", "object pronoun"],
          ],
    },
    odd: {
      summary: "Be, go, have, and want are the verbs that will not follow the chart.",
      body: `Every Romance language keeps a short irregular list from Latin. In ${name}, learn be, have, go, and do or make before you trust a regular ending. Plurals and feminine stems that change a vowel belong on the same list.`,
      points: ["Do not derive go from its infinitive.", "The first person singular is the form most likely to add an extra consonant.", "A feminine or plural that changes the stem has to be learned as a pair."],
      samples: [
        ["I am, you are.", "be is irregular"],
        ["I go.", "go replaces the stem"],
      ],
    },
  });
}

function slavic(name: string, id: string): GrammarSection[] {
  const article = id === "bg" || id === "mk";
  const inter = id === "isv";
  return sections({
    rules: {
      summary: article
        ? "The article is a suffix, and the verb has no infinitive."
        : inter
          ? "No article. One case system, written three ways."
          : "No article. Endings carry gender, number, and case.",
      body: article
        ? `${name} kept a Balkan shape: a suffixed article, and a verb system without the infinitive other Slavic languages still have. Aspect is still the deep split in the verb.`
        : inter
          ? "Interslavic is a meeting form of Slavic. Ja piju vodu. The same line is written in Latin, Cyrillic, and Glagolitic. Learn the Latin line. The speaker uses that line. There is no article."
          : `${name} does not use a word for the or a. The ending of the noun tells you its job. Verbs come in aspect pairs. Ты, ti, or the local friend-form is enough at the start.`,
      points: ["Learn the noun in the nominative first.", "Learn the verb with its aspect partner.", "Adjectives agree."],
      samples: inter
        ? [
            ["Ja piju vodu.", "Latin script, no article"],
            ["вода · воду", "the accusative changes the ending"],
          ]
        : [
            ["I drink water.", "case on the noun, not an article"],
            ["I am at home.", "the present of be may be omitted or very short"],
          ],
    },
    verbs: {
      summary: article ? "Person endings, and no infinitive to cite." : "Person endings in the present. Gender in the past.",
      body: article
        ? `${name} cites a verb as a first person, because there is no infinitive. The present ending shows the person. Aorist and imperfect exist, and aspect still decides whether you are talking about a result or a process.`
        : `The present ends in a vowel plus a person marker. The past of ${name} agrees with the gender of the subject in the singular. The future of a perfective verb often looks like a present.`,
      points: ["Be is irregular and sometimes omitted in the present.", "Motion verbs may come in a going and a habitual pair.", "Negation sits immediately before the verb."],
      samples: [
        ["I read.", "present ending"],
        ["She read.", "past may show gender"],
      ],
    },
    nouns: {
      summary: article ? "Little case remains. The article suffix agrees with gender." : id === "sl" ? "Six cases, and a dual beside singular and plural." : "Six or seven cases. Learn them from the nominative outward.",
      body: article
        ? "Bulgarian and Macedonian lost most of the case endings. What you decline instead is the pronoun, and what you add to the noun is the article: a form of -ът, -та, -то, or the Macedonian -от, -та, -то. A few vestiges of case remain on pronouns and in fixed phrases."
        : id === "sl"
          ? "Slovenian has the familiar Slavic cases and also a dual, for exactly two. This course stays with one and many until the singular cases feel automatic. The dual can wait."
          : `${name} uses nominative, accusative, genitive, dative, instrumental, and locative or prepositional. Some of the family also keep a vocative. Feminine nouns in -a often change -a to -u for the object.`,
      points: article
        ? ["Learn the noun with its article suffix.", "Pronouns keep more case than nouns.", "Gender is still masculine, feminine, or neuter."]
        : ["The accusative of a living masculine often looks like the genitive.", "Numbers force a case. Learn 1, 2, and 5 as three patterns.", "Adjectives take the same case as the noun."],
      samples: article
        ? [
            [id === "mk" ? "човекот" : "човекът", "a suffixed article"],
            ["I see him.", "case lives on the pronoun"],
          ]
        : [
            ["voda · vodu", "feminine accusative"],
            ["in the house", "locative or prepositional after a preposition"],
          ],
    },
    odd: {
      summary: "Be, want, eat, and the people-plurals do not follow the table.",
      body: `In ${name}, быть or its cousin, the verb for want, and the verb for go are irregular in every Slavic language. People and children often have a plural that is not built from the singular. Aspect partners can look unrelated. Learn the pair.`,
      points: ["Do not invent the past of go.", "A masculine nominative plural in -a, where it exists, is a list.", "Clusters of consonants move in the stem of some verbs. Learn those verbs whole."],
      samples: [
        ["I want water.", "want is irregular"],
        ["children", "learn the plural"],
      ],
    },
  });
}

function indic(name: string, id: string): GrammarSection[] {
  const noGender = id === "bn";
  return sections({
    rules: {
      summary: noGender ? "No grammatical gender. The verb still agrees with person, and the postposition does the work of case." : "The verb usually closes the sentence. Postpositions, not prepositions, mark the noun.",
      body:
        id === "hi" || id === "ur"
          ? `${name} agrees the adjective and often the verb with gender and number. को marks an object that is specific. ने appears with the subject of a transitive verb in the past, and then the verb agrees with the object instead.`
          : id === "bn"
            ? "Bengali has no grammatical gender on the noun. Ami is I. Tumi is the familiar you, and apni is polite. The verb agrees with person and level of politeness. A postposition after the noun covers location, object, and possession."
            : `${name} puts the verb at the end. Adjectives and participles agree where the language still has gender. Learn the postposition as part of the phrase, not as a separate English preposition.`,
      points: ["The object often comes before the verb.", "Politeness changes the pronoun and sometimes the verb.", "Negation is its own word or a special verb form. Learn it with the tense."],
      samples:
        id === "hi"
          ? [
              ["मैं पानी पीता हूँ।", "masculine agreement"],
              ["मैं पानी पीती हूँ।", "feminine agreement"],
            ]
          : id === "ur"
            ? [
                ["میں پانی پیتا ہوں۔", "the same grammar as Hindi, in Nastaliq"],
                ["میں پانی پیتی ہوں۔", "the verb agrees with the speaker"],
              ]
            : [
                ["I drink water.", "verb at the end"],
                ["to the house", "a postposition"],
              ],
    },
    verbs: {
      summary: "A participle plus a helper is the ordinary present.",
      body:
        id === "hi" || id === "ur"
          ? "The habitual present is the participle plus होना. The participle agrees in gender and number. होना itself is हूँ, हो, है, हैं. करना and जाना are irregular and extremely common."
          : `${name} builds many tenses from a participle plus a form of be. Learn I, you, and one third person in the present before a full chart. The infinitive or the citation form is the dictionary shape.`,
      points: ["Be is irregular.", "Gender agreement, where it exists, sits on the participle.", "A compound verb of go or give adds a shade of meaning. Learn the pair as one item."],
      table:
        id === "hi"
          ? {
              caption: "होना, present",
              heads: ["", "होना"],
              rows: [
                ["मैं", "हूँ"],
                ["तुम", "हो"],
                ["वह", "है"],
                ["हम", "हैं"],
              ],
            }
          : undefined,
      samples:
        id === "hi"
          ? [
              ["वह जाता है।", "masculine habitual"],
              ["वह जाती है।", "feminine habitual"],
            ]
          : [
              ["I am.", "be is irregular"],
              ["I go.", "learn go early"],
            ],
    },
    nouns: {
      summary: noGender ? "No gender to decline. Case is a postposition on an oblique form." : "A direct form and an oblique form, then a postposition.",
      body:
        id === "hi" || id === "ur"
          ? "लड़का is the direct singular. लड़के is the oblique singular and the direct plural. लड़कों is the oblique plural. The postposition attaches to the oblique: लड़के को, लड़कों में. Feminine nouns change less in the singular and take -ों in the oblique plural only in some patterns. Learn one masculine and one feminine type."
          : noGender
            ? "Bengali nouns do not sort into masculine and feminine. What they do have is a stem that may change before a case ending or a classifier-like counter. Learn the noun, then the word for to, in, and from as separate words after it."
            : `${name} keeps a direct form for the subject and an oblique form before postpositions. Gender, where it exists, changes the adjective and sometimes the verb. There is no long European case table. There is a small set of forms plus को, में, से, or their cousins.`,
      points: ["Learn the oblique before you attach a postposition.", "Plural oblique is its own form.", "The adjective agrees only if this language still marks gender."],
      samples:
        id === "hi"
          ? [
              ["लड़के को", "oblique plus postposition"],
              ["पानी में", "में does not need a gender"],
            ]
          : [
              ["to the house", "postposition"],
              ["in the water", "the noun may take an oblique form"],
            ],
    },
    odd: {
      summary: "Be, go, do, give, and take refuse the regular participle.",
      body: `${name} builds regular verbs from a noun plus a do-verb, and those are friendly. The old verbs for be, go, do, give, and take are not. Their stems change, and the feminine or the past may look like a different word. Learn those five before you trust a rule.`,
      points: ["The past of go is not the present stem plus an ending.", "Respectful plurals can take a plural verb for one person.", "A noun plus करना or its cousin is regular even when the simple verb is not."],
      samples: [
        ["I am, she is.", "be changes"],
        ["I went.", "learn the past of go"],
      ],
    },
  });
}

function dravidian(name: string): GrammarSection[] {
  return sections({
    rules: {
      summary: "Endings stack on a stem. The verb closes the sentence.",
      body: `${name} does not use a European article or a masculine and feminine for every noun. The verb takes a personal ending, and case is a suffix. Adjectives generally come before the noun and do not decline the way a Hindi adjective does.`,
      points: ["Learn the citation form, then the spoken form, if they differ.", "Negation may be an ending rather than a separate word.", "A polite you is worth learning with the plain you."],
      samples: [
        ["I drink water.", "verb last, with a personal ending"],
        ["to the house", "a case suffix"],
      ],
    },
    verbs: {
      summary: "The personal ending is the conjugation.",
      body: `A ${name} verb adds a tense marker and then a person marker. Learn I, you, and one third person in the present. The past stem is sometimes different, and that is the irregularity to watch. There is no person ending hiding in an auxiliary the way English uses do.`,
      points: ["The verb agrees with the subject.", "Honorific endings matter.", "A negative verb may have its own stem."],
      samples: [
        ["I see.", "first person ending"],
        ["She saw.", "the past stem may change"],
      ],
    },
    nouns: {
      summary: "Case is a suffix. There is no article to decline.",
      body: `${name} marks object, place, and motion with suffixes on the noun. The nominative is the dictionary form. Learn the accusative or dative suffix as a pair with one noun before you collect the whole case list. Plural is its own suffix and comes before the case ending.`,
      points: ["Plural, then case, in that order.", "Postpositions can follow a case suffix.", "Human and non-human nouns may take different endings."],
      samples: [
        ["the house", "dictionary form"],
        ["to the house", "a suffix, not a preposition"],
      ],
    },
    odd: {
      summary: "The past stem, and a few pronouns, will not follow the regular suffix.",
      body: `Regular ${name} verbs are wonderfully regular. The verbs for be, come, go, and give often keep an old stem in the past. Pronouns may have an oblique form before a case suffix. Learn those as pairs.`,
      points: ["Do not build the past of come from the present.", "Sandhi at the join of stem and suffix can hide a letter.", "A honorific plural for one person is normal, not a mistake."],
      samples: [
        ["I came.", "learn this past"],
        ["to me", "the pronoun may change"],
      ],
    },
  });
}

function sinitic(name: string, id: string): GrammarSection[] {
  const yue = id === "yue";
  return sections({
    rules: {
      summary: "No endings on the verb or the noun. Particles, word order, and classifiers do the grammar.",
      body: yue
        ? "Cantonese keeps the verb unchanged. 我飲水。 The polite particle and the aspect particle carry what an ending would carry in another language. These cards use traditional characters. The reading is Jyutping."
        : `${name} keeps the verb and the noun unchanged. Word order is subject, verb, object. A particle marks a question or an aspect.`,
      points: ["Tones are part of the word.", "The adjective-like verb does not need a separate to be.", "Classifiers appear as soon as you count."],
      samples: yue
        ? [
            ["我飲水。", "no ending on 飲"],
            ["你飲唔飲？", "a choice question"],
          ]
        : [
            ["I drink water.", "no ending"],
            ["Do you drink?", "a particle or a choice question"],
          ],
    },
    verbs: {
      summary: "There is nothing to conjugate. Learn the aspect particles instead.",
      body: yue
        ? "咗 marks a completed action. 緊 marks something in progress. 過 marks experience. 唔 is the simple no. 冇 is the no of possession and of a completed action. The verb itself stays 飲."
        : `${name} does not change the verb for person or tense. Learn the completed particle, the progressive mark, and the two negators.`,
      points: ["One verb form for every person.", "Negation of an action and negation of have are different.", "A modal such as can comes before the verb."],
      samples: yue
        ? [
            ["我飲咗水。", "completed"],
            ["我冇水。", "冇 for have-not"],
          ]
        : [
            ["I drank.", "a particle, not an ending"],
            ["I do not have water.", "a different negator"],
          ],
    },
    nouns: {
      summary: "No case and no plural ending. The classifier is the extra word.",
      body: yue
        ? "個 is the general classifier. 杯 is for a cup. The order is number, classifier, noun. 喺 marks a place and does not change the noun."
        : `${name} puts a classifier between the number and the noun. Place is a coverb or a preposition-like word, not a case ending.`,
      points: ["Learn the classifier with the noun.", "A bare noun can be generic.", "Possession uses a linking particle."],
      samples: yue
        ? [
            ["一杯水", "number, classifier, noun"],
            ["喺屋企", "place without a case ending"],
          ]
        : [
            ["one cup of water", "classifier"],
            ["at home", "no case ending"],
          ],
    },
    odd: {
      summary: "Tone change, and a few particles that do not mean what the character suggests.",
      body: yue
        ? "A changed tone can mark a familiar noun, and it is not written with a different character. 唔 and 冇 are not interchangeable. Some classifiers look optional and are not, once you are counting."
        : `${name} changes a few tones in combination. The negators are not one word. Learn them as separate items.`,
      points: ["Do not swap the two negators.", "A tone change on a noun may be meaningful.", "Coverbs such as give and be-at grammaticalize. Learn the grammatical use beside the full verb."],
      samples: [
        ["have and have-not", "a pair"],
        ["one person", "the classifier is required"],
      ],
    },
  });
}

function semitic(name: string, id: string): GrammarSection[] {
  return sections({
    rules: {
      summary: id === "he" ? "The article is ה־, and the pattern of vowels around the root builds the word." : `${name} builds words from a root. The pattern of vowels and affixes is the grammar.`,
      body:
        id === "he"
          ? "Hebrew writes mostly consonants, and these cards mark vowels for learners. Verbs belong to a binyan, a pattern. Nouns are masculine or feminine. There is no case ending on the noun. The construct state links two nouns."
          : id === "am"
            ? "Amharic is verb-final. The verb agrees with the subject by a combination of prefix and suffix. Nouns do not take Arabic-style case vowels. Postpositions and a definite suffix do that work. The script is Geʽez, and the reading is there until the letters are familiar."
            : id === "arc"
              ? "Classical Syriac, the literary Aramaic of these cards, uses states of the noun instead of a separate word for the. The emphatic state is the one you will meet first. Verbs are built on a root, with a suffix in the past and a prefix in the present."
              : `${name} uses a root and a pattern. Learn one sound verb before a weak one.`,
      points: ["Gender is masculine or feminine.", "The adjective follows and agrees.", "Learn the citation form the dictionary actually uses."],
      samples:
        id === "he"
          ? [
              ["אני שותה מים.", "the participle can be the present"],
              ["המים", "the article ה־"],
            ]
          : [
              ["I drink water.", "the verb agrees"],
              ["the house", "article, suffix, or state"],
            ],
    },
    verbs: {
      summary: "Past endings, present prefixes, or a participle that agrees.",
      body:
        id === "he"
          ? "The past of katav is katavti, katavta, katav. The present is often the participle, and it agrees in gender and number: kotev, kotevet. Each binyan has its own vowels. Start with pa'al."
          : id === "am"
            ? "Learn one verb as I, you, and he or she. The negative is a prefix, not a separate word in front of an unchanged verb. The root may not appear as three tidy consonants in every form."
            : `${name} distinguishes a suffix conjugation and a prefix conjugation. Learn the third person first, because dictionaries often cite it, then learn I.`,
      points: ["Weak roots lose a letter. They are the irregulars.", "Gender appears on the verb in some persons.", "Derived patterns change the meaning in a reusable way."],
      samples: [
        ["I wrote.", "suffix or the local past"],
        ["he writes", "prefix or participle"],
      ],
    },
    nouns: {
      summary: id === "he" ? "No case. A construct chain replaces of." : id === "arc" ? "The state of the noun is the declension." : "Gender, number, and a definite marker. Case is light or absent.",
      body:
        id === "he"
          ? "Bayit is a house. Ha-bayit is the house. Sifro is his book, with a possessive suffix. Two nouns in construct mark possession without a word for of: sefer ha-talmid. Plurals are -im or -ot, and many common nouns are irregular."
          : id === "arc"
            ? "The absolute, emphatic, and construct states are the forms to learn. The emphatic is the ordinary definite noun. The construct is the first noun of a possession chain. Case endings of the older language are not the system you need first."
            : `${name} marks definite and plural on the noun. If a case or a role marker exists, it is a suffix or a postposition, not the three short vowels of Classical Arabic.`,
      points: ["Learn singular and plural together.", "Feminine is often a suffix.", "Possession may be a suffix on the noun."],
      samples: [
        ["the house", "definite marker"],
        ["his book", "a suffix or a linking word"],
      ],
    },
    odd: {
      summary: "Weak letters, and plurals that do not add the regular suffix.",
      body: `In ${name}, a root with a weak consonant will not follow the sound-verb table. Learn those verbs one by one. Plurals of very common nouns are often unpredictable. The verb for be and the verb for go belong on the first irregular list.`,
      points: ["Do not force a weak verb into the strong table.", "Learn the plural with the singular.", "Be in the past is usually irregular."],
      samples: [
        ["he said", "often a weak verb"],
        ["houses", "learn the plural"],
      ],
    },
  });
}

function constructed(name: string, id: string, tip: string): GrammarSection[] {
  if (id === "eo") {
    return sections({
      rules: {
        summary: "One ending for each job. La is the only article.",
        body: "Nouns end in -o, adjectives in -a, adverbs in -e, and the infinitive in -i. The verb does not agree with the person. Mi trinkas akvon. The -n is the object.",
        points: ["Plural is -j, and it goes on the adjective too.", "The object adds -n.", "Word order is free as long as -n marks the object. Subject, verb, object is the clearest."],
        samples: [
          ["Mi trinkas akvon.", "object -n"],
          ["La akvo estas malvarma.", "la, and an adjective in -a"],
        ],
      },
      verbs: {
        summary: "No person endings. The vowel of the ending is the tense.",
        body: "As is the present. Is is the past. Os is the future. Us is the conditional. Every verb uses the same endings, including esti and iri.",
        points: ["There is no irregular verb.", "The participle endings are a later layer.", "Negation is ne before the verb."],
        table: {
          caption: "Every verb, including esti",
          heads: ["ending", "time", "example"],
          rows: [
            ["-as", "present", "mi trinkas"],
            ["-is", "past", "mi trinkis"],
            ["-os", "future", "mi trinkos"],
            ["-us", "conditional", "mi trinkus"],
          ],
        },
        samples: [
          ["Ŝi iris.", "past -is"],
          ["Ni estos.", "future of esti, still regular"],
        ],
      },
      nouns: {
        summary: "The declension is -j for plural and -n for the object.",
        body: "La domo, la domoj, la domon, la domojn. There is no gender on things. -in- can mark a woman when you need it: amiko, amikino. Possession is de, or a possessive adjective in -a.",
        points: ["Adjectives take -j and -n too, in agreement.", "There is no case beyond the object -n.", "Pronouns take the same -n: min, lin, ŝin."],
        table: {
          caption: "domo",
          heads: ["", "singular", "plural"],
          rows: [
            ["subject", "domo", "domoj"],
            ["object", "domon", "domojn"],
          ],
        },
        samples: [
          ["Mi vidas la domojn.", "plural object"],
          ["mia amiko", "possessive adjective"],
        ],
      },
      odd: {
        summary: "There is no irregular verb. The surprises are correlatives and a few stress habits.",
        body: "Esti takes -as, -is, -os, and -us like every other verb. What learners treat as irregular is the correlative table: kiu, tiu, kio, tio, and the rest. It is regular once you see the grid. Stress stays on the second vowel from the end.",
        points: ["Do not invent a person ending.", "La is invariable.", "Proper names sometimes omit -o. The -n still attaches if they are objects."],
        samples: [
          ["Kio estas tio?", "a correlative, not an irregular verb"],
          ["Mi amas lin.", "pronoun plus -n"],
        ],
      },
    });
  }
  if (id === "tok") {
    return sections({
      rules: {
        summary: "A very small vocabulary, and a few particles that do all of the grammar.",
        body: "mi moku e telo. e marks the object. li marks the predicate when the subject is not mi or sina. There is no tense ending. Time is a word such as tenpo pini if you need it.",
        points: ["mi and sina do not take li.", "Modifiers follow the word they narrow.", "One word can be a noun or a verb depending on the slot."],
        samples: [
          ["mi moku e telo.", "e marks the object"],
          ["ona li moku.", "li after a third-person subject"],
        ],
      },
      verbs: {
        summary: "Nothing conjugates. li and a preverb do the work.",
        body: "moku is eat for every person and every time. wile before it is want. ken is can. awen is continue. There is no irregular stem, because there is no stem change at all.",
        points: ["Negation is ala after the verb: mi moku ala.", "A preverb comes between li and the main word.", "Do not add a plural or a past ending."],
        samples: [
          ["mi wile moku.", "wile as a preverb"],
          ["mi moku ala.", "ala negates"],
        ],
      },
      nouns: {
        summary: "No case, no article, no plural. Word order is the marking.",
        body: "The subject comes first. e introduces the object. lon introduces a place. There is no declension to learn. A second word narrows the first.",
        points: ["Names take a capital and usually sit after jan or a similar word.", "Possession can be a modifier after the noun.", "Do not invent a plural suffix."],
        samples: [
          ["telo", "water, with no article"],
          ["mi lon tomo.", "lon for place"],
        ],
      },
      odd: {
        summary: "The irregularity is that mi and sina skip li. Everything else is stubbornly regular.",
        body: "ona li moku, but mi moku and sina moku. That is the exception. Ala, e, and li do not change for person. Meaning is broad on purpose: moku is both eat and drink.",
        points: ["Do not put li after mi or sina.", "Do not put e on a place. That is lon.", "Compounds are phrases, not new endings."],
        samples: [
          ["sina moku.", "no li"],
          ["ona li moku e kili.", "li and e together"],
        ],
      },
    });
  }
  if (id === "aur") {
    return sections({
      rules: {
        summary: "na is the article. sa means is. Adjectives follow the noun.",
        body: "Aurali is the original language of this course. An sa asi. The plural is -n on the noun. Word order stays subject, sa or the verb, then the rest. Keep the shapes on the cards. Do not import endings from a natural language.",
        points: ["na before a noun.", "sa for is.", "The adjective follows."],
        samples: [
          ["An sa asi.", "sa is the copula"],
          ["na domo", "na is the article"],
        ],
      },
      verbs: {
        summary: "sa does not conjugate. Other verbs stay as they are on the card.",
        body: "There is no person ending. Say the pronoun. Tense, if you need it, is a separate word rather than a new stem. sa is the irregular-looking word only because English speakers expect is, am, and are.",
        points: ["One form of sa for every person.", "Do not add -s.", "Learn each new verb as one unchanged shape."],
        samples: [
          ["An sa asi.", "I am here"],
          ["sa", "the same word for every person"],
        ],
      },
      nouns: {
        summary: "The plural -n is the whole declension.",
        body: "na domo, na domon. There is no case ending and no gender. Adjectives follow the noun and do not agree. If the card shows a phrase, learn the phrase rather than building a new case.",
        points: ["-n is the plural.", "na stays na in the plural.", "No gender to memorize."],
        samples: [
          ["na domo", "singular"],
          ["na domon", "plural -n"],
        ],
      },
      odd: {
        summary: "sa is the only form that feels irregular, and it is irregular only from English.",
        body: "Aurali was built to stay regular. Do not invent stem changes. If a card ever shows a second form, that form is the one to trust, not a rule from Latin or Spanish.",
        points: ["Do not conjugate sa.", "Do not add gender.", "The card is the authority for this language."],
        samples: [
          ["An sa asi.", "one copula"],
          ["na domon", "one plural rule"],
        ],
      },
    });
  }
  if (id === "sig") {
    return sections({
      rules: {
        summary: "Each sign stores an English line. The grammar under the signs is English grammar.",
        body: tip || "Signal is an original script. It does not add a new grammar. Learn the English sentence the sign stands for: word order, helpers, and pronoun case.",
        points: ["Read the English under the sign.", "Do not look for a Signal case ending.", "The speaker plays a figure a machine can turn back into the text."],
        samples: [
          ["I drink water.", "the grammar is this sentence"],
          ["She sees the train.", "English agreement still applies"],
        ],
      },
      verbs: {
        summary: "Conjugate the English verb, not the sign.",
        body: "Am, is, are, and the third-person -s are still required, because the stored sentence is English. The sign does not change when the English verb does. If the English line changes, it is a different sign.",
        points: ["Be, have, and do stay irregular English.", "Tense lives in the English line.", "One sign, one stored sentence."],
        samples: [
          ["I am here.", "English be"],
          ["She went.", "English irregular past"],
        ],
      },
      nouns: {
        summary: "English pronoun case is the only declension.",
        body: "I and me, she and her. Signal does not add cases of its own. Plurals are the English plurals of the stored line.",
        points: ["Subject and object pronouns differ.", "Nouns do not take case.", "The article is the English article."],
        samples: [
          ["Give it to her.", "object pronoun"],
          ["the children", "irregular English plural"],
        ],
      },
      odd: {
        summary: "The irregulars are the English irregulars.",
        body: "Go, went, gone. Child, children. The script does not regularize them. Learn the English set, and treat the sign as the spelling.",
        points: ["No new irregulars beyond English.", "Do not simplify a stored sentence.", "If a line looks odd, it is still English."],
        samples: [
          ["I have seen it.", "English participle"],
          ["went", "not a regular past"],
        ],
      },
    });
  }
  return openFamily(name, "Constructed", id, tip);
}

function openFamily(name: string, family: string, id: string, tip: string): GrammarSection[] {
  const special = specialOpen(id);
  return sections({
    rules: {
      summary: special?.rulesSummary ?? `A few marks do most of the work in ${name}.`,
      body: special?.rulesBody ?? `${tip ? tip + " " : ""}${name} is best learned from a short sentence you can say, not from a translated chart. Keep every marker the language actually uses, and do not add an English ending that is not there.`,
      points: special?.rulesPoints ?? [
        "Learn one full sentence before a paradigm.",
        "Keep the script’s extra signs. They are not decoration.",
        family ? `${family} is the family, and ${name} still has its own habits.` : "Start from the sentence on the card.",
      ],
      samples: special?.rulesSamples ?? [
        ["I drink water.", "the first sentence"],
        ["I am here.", "be, or the word this language uses instead"],
      ],
    },
    verbs: {
      summary: special?.verbSummary ?? "Learn I, you, and one third person before a full table.",
      body: special?.verbBody ?? `If ${name} changes the verb for person, learn those three forms of be, go, and see. If it does not, learn the particle or the helper that marks a completed action, and do not invent an ending.`,
      points: special?.verbPoints ?? ["Be and go first.", "Negation sits in a fixed place.", "A polite form is a different conjugation, not a decoration."],
      samples: special?.verbSamples ?? [
        ["I see.", "first person or the particle"],
        ["She went.", "a past you should not build by guess"],
      ],
    },
    nouns: {
      summary: special?.nounSummary ?? "Learn the noun with the mark that makes it a real phrase.",
      body: special?.nounBody ?? `That mark may be an article, a class prefix, a case suffix, a postposition, or nothing at all. ${name} will use one of those and not the others. The bare dictionary stem is not always a word you can say.`,
      points: special?.nounPoints ?? ["Learn singular and plural together.", "Learn the marker for to and in.", "Do not add gender if the language does not have it."],
      samples: special?.nounSamples ?? [
        ["the house", "noun plus its marker"],
        ["water", "a noun you will say immediately"],
      ],
    },
    odd: {
      summary: "The irregulars are the words you cannot build, and every language has a few.",
      body: special?.oddBody ?? `In ${name}, be, go, come, and the plural of person are the usual suspects. If the card shows a second form, learn the pair. A rule that almost works will invent a form nobody says.`,
      points: ["Learn be and go as lists.", "Learn irregular plurals as pairs.", "Script changes and tone changes count as irregularities when they alter the word."],
      samples: special?.oddSamples ?? [
        ["I am.", "often irregular"],
        ["people", "often an irregular plural"],
      ],
    },
  });
}

type OpenBits = {
  rulesSummary?: string;
  rulesBody?: string;
  rulesPoints?: string[];
  rulesSamples?: [string, string][];
  verbSummary?: string;
  verbBody?: string;
  verbPoints?: string[];
  verbSamples?: [string, string][];
  nounSummary?: string;
  nounBody?: string;
  nounPoints?: string[];
  nounSamples?: [string, string][];
  oddBody?: string;
  oddSamples?: [string, string][];
};

function specialOpen(id: string): OpenBits | null {
  const all: Record<string, OpenBits> = {
    la: {
      rulesSummary: "No article. The ending is the case, and the verb ending is the person.",
      rulesBody: "Classical Latin with macrons on these cards. Puella aquam bibit. The subject can follow the verb. An adjective agrees in gender, number, and case.",
      rulesPoints: ["There is no word for the or a.", "Word order is freer than English because the ending carries the job.", "Learn the nominative and the accusative of a noun together."],
      rulesSamples: [
        ["Puella aquam bibit.", "nominative, then accusative"],
        ["Aqua est frigida.", "the adjective agrees"],
      ],
      verbSummary: "Four conjugations, and sum is irregular.",
      verbBody: "Amō, amās, amat is the present of a first-conjugation verb. Sum, es, est, sumus will not follow that table. The perfect stem is often different from the present stem, and it has to be learned with the verb.",
      verbSamples: [
        ["amō, amās, amat", "present"],
        ["sum, es, est", "irregular"],
      ],
      nounSummary: "Five declensions. Start with the first and the second.",
      nounBody: "Puella, puellae is feminine. Dominus, dominī is masculine. Bellum, bellī is neuter. Nominative, accusative, genitive, dative, and ablative are the cases to learn. The vocative can wait, except for names in -us.",
      nounSamples: [
        ["puella, puellam", "nominative, accusative"],
        ["aquam", "object of bibit"],
      ],
      oddBody: "Sum, eō, ferō, and volō are irregular. So are many perfect stems: videō, vīdī. Neuter nouns use the same form for nominative and accusative, and their plural nominative ends in -a.",
      oddSamples: [
        ["sum, es, est", "not a regular verb"],
        ["bellum, bella", "neuter plural in -a"],
      ],
    },
    el: {
      rulesSummary: "The article changes with gender, number, and case. Stress is written.",
      rulesBody: "Modern Greek keeps nominative, accusative, and genitive. Ο, η, το are the. The verb ending shows the person, so the pronoun can drop. Δεν comes before the verb.",
      rulesSamples: [
        ["Πίνω νερό.", "the ending says I"],
        ["Το νερό είναι κρύο.", "neuter article"],
      ],
      verbSummary: "Two sets of endings, and a few very common irregulars.",
      verbBody: "Είμαι is I am: είμαι, είσαι, είναι. Έχω is I have. A regular verb in -ω adds personal endings. The aorist is a finished past and often uses a different stem.",
      verbSamples: [
        ["είμαι, είσαι, είναι", "be"],
        ["έχω, έχεις, έχει", "have"],
      ],
      nounSummary: "Three cases, three genders.",
      nounBody: "Learn the article with the noun: ο φίλος, η πόρτα, το σπίτι. Accusative is the ordinary object. Genitive marks possession. The plural article is οι, οι, τα, and the noun ending changes with it.",
      nounSamples: [
        ["το σπίτι", "neuter"],
        ["της πόρτας", "genitive"],
      ],
      oddBody: "Είμαι, πάω, λέω, τρώω, and βλέπω do not follow the regular -ω chart. Their past stems look like different verbs. Learn those pasts as words.",
    },
    grc: {
      rulesSummary: "Attic Greek. Article, case, and a verb that can stand first.",
      rulesBody: "The old accent marks are part of the spelling. Ὁ, ἡ, τό decline. The noun has nominative, genitive, dative, accusative, and vocative. Dual exists and can wait. Speech on the card uses a modern Greek voice.",
      rulesSamples: [
        ["ὁ ἄνθρωπος", "article and noun"],
        ["λύω", "I loosen, the dictionary present"],
      ],
      verbSummary: "Person and number, and a stem for the present and a stem for the aorist.",
      verbBody: "Λύω, λύεις, λύει in the present. Εἰμί is irregular: εἰμί, εἶ, ἐστί. The aorist is the finished past and is a different principal part. Learn principal parts, not one stem.",
      nounSummary: "Three declensions, five cases.",
      nounBody: "First declension is often feminine, second is o-stems, third is consonantal and the one that surprises. The dative is alive. The article agrees and is the best guide to the case when the noun ending is ambiguous.",
      oddBody: "Εἰμί, εἶμι, οἶδα, and φημί are irregular. Contract verbs swallow a vowel. Principal parts of common verbs, including ὁράω and ἔρχομαι, must be memorized.",
    },
    tr: {
      rulesSummary: "No gender. Endings stack, and vowel harmony chooses the vowel.",
      rulesBody: "Turkish is verb-final. Evdeyim is a stem plus endings. There is no he or she gender. The plural -ler or -lar follows harmony. Bir is a, and it is not required the way English a is.",
      rulesSamples: [
        ["Su içiyorum.", "verb at the end, with a person ending"],
        ["evde", "locative suffix"],
      ],
      verbSummary: "A tense suffix, then a person suffix.",
      verbBody: "Gelmek is come. Geliyorum, geliyorsun, geliyor. The negative is a suffix, -me or -ma, before the tense: gelmiyorum. Harmony decides e or a, and the following vowel as well.",
      verbSamples: [
        ["geliyorum", "I am coming"],
        ["gelmiyorum", "the negative is inside the word"],
      ],
      nounSummary: "Case suffixes, in a fixed order after the plural.",
      nounBody: "Ev, evi, eve, evde, evden. Plural comes before case: evlerde. The accusative is used when the object is specific. A bare object can stay without it.",
      nounSamples: [
        ["evi gördüm", "specific object"],
        ["evde", "in the house"],
      ],
      oddBody: "Gitmek becomes gidiyorum. Demek becomes diyorum. Etmek verbs such as yardım etmek follow etmek, and the noun in front stays. Harmony has a few Arabic and Persian loans that do not obey it. Learn those words as wholes.",
    },
    sw: {
      rulesSummary: "The noun class prefix is part of the word, and the verb agrees with it.",
      rulesBody: "Mtu is a person. Watu is people. Kitabu is a book. Vitabu is books. The verb starts with a subject prefix that matches the class. Nina soma is I am reading, written ninasoma.",
      rulesSamples: [
        ["Ninasoma.", "I am reading"],
        ["mtu · watu", "class 1 and 2"],
      ],
      verbSummary: "Subject prefix, tense marker, then the stem.",
      verbBody: "Ni- is I, u- is you, a- is he or she. -na- is the present. -li- is the past. -ta- is the future. Kuwa is be and is irregular. Negation changes both the prefix and the tense vowel.",
      verbSamples: [
        ["ninasoma · nilisoma · nitasoma", "present, past, future"],
        ["sisomi", "the negative is not na plus a separate word"],
      ],
      nounSummary: "Classes, not masculine and feminine. The plural prefix is the declension.",
      nounBody: "Learn every noun as a singular and plural pair. People are class 1/2, m-/wa-. Many trees and tools are m-/mi-. Many things are ki-/vi-. Class 9/10 often looks the same in both numbers, and the agreement on the adjective and the verb is what shows the plural.",
      nounSamples: [
        ["kitabu · vitabu", "ki-/vi-"],
        ["ndege", "class 9/10, singular and plural can look alike"],
      ],
      oddBody: "Kuwa, kwenda, and kuja do not take the usual prefixes in every tense. Nenda and naja are the imperatives you will hear. Class 9/10 nouns and the adjectives that agree with them are the other list to memorize rather than build.",
    },
    fa: {
      rulesSummary: "No gender. را marks a definite object. Ezafe links words quietly.",
      rulesBody: "Persian is verb-final. Man âb mixoram, I drink water. The ezafe -e connects a noun to the next word: âb-e sard, cold water. There is no he or she distinction.",
      rulesSamples: [
        ["Man âb mixoram.", "verb at the end"],
        ["âb-e sard", "ezafe"],
      ],
      verbSummary: "A present stem and a past stem. They are not always the same.",
      verbBody: "The present adds mi- and a personal ending to the present stem. The past adds the ending to the past stem. Raftan has the past stem raft and the present stem rav. Budan is be. Learn both stems with the verb.",
      verbSamples: [
        ["miravam", "I go"],
        ["raftam", "I went"],
      ],
      nounSummary: "No case endings. را and a preposition do the marking.",
      nounBody: "A definite object takes را. Be, dar, and az cover to, in, and from. The plural is -hâ. Ezafe is how you say of and how you attach an adjective. Pronouns have a spoken set of suffixes.",
      nounSamples: [
        ["ketâb râ", "a definite object"],
        ["dar khâne", "in the house"],
      ],
      oddBody: "The present and past stems of go, see, say, and give are irregular. Hastam, hasti, ast is be in the present, and budam is the past. Spoken Persian also shortens ast to -e. The cards keep a clear written form.",
    },
    eu: {
      rulesSummary: "The article is a suffix, -a. The verb agrees with more than the subject.",
      rulesBody: "Etxea is the house. There is no masculine or feminine on things. Basque is ergative: the subject of a transitive verb takes -k. The auxiliary carries the agreement.",
      rulesSamples: [
        ["etxea", "article -a"],
        ["naiz", "I am"],
      ],
      verbSummary: "A few synthetic verbs, and an auxiliary for the rest.",
      verbBody: "Naiz, zara, da is be. Dut is the transitive auxiliary for I. Most verbs are a participle plus that auxiliary. Learn naiz and dut before a long table.",
      nounSummary: "Case suffixes. -a is the article and comes before the case ending.",
      nounBody: "Absolutive is the plain form. Ergative adds -k. Dative adds -ri. Place suffixes cover in, to, and from. The plural article is -ak, and it can look like the ergative singular, so the sentence frame matters.",
      oddBody: "The auxiliaries are the irregular system. Nor-nori-nork verbs agree with subject, object, and indirect object at once. Allocation of forms is a table, not a rule you can see from one example. Learn the I-forms first.",
    },
    ga: {
      rulesSummary: "The verb comes first. The article can change the first letter of the noun.",
      rulesBody: "Tá mé anseo. Tá is be, and it comes first. An is the article and can lenite or eclipse the next word. Learn an plus the noun as one piece, not as the dictionary form plus a rule you apply later.",
      rulesSamples: [
        ["Tá mé anseo.", "verb first"],
        ["an doras", "the article may change the first sound"],
      ],
      verbSummary: "A verb for be that is not the dictionary bí in the present.",
      verbBody: "Tá, táimid or tá muid, and the dependent form. The past often lenites and adds a particle. Irregular verbs include abair, beir, faigh, feic, and téigh. There are not many, and they are constant.",
      nounSummary: "Two genders. Case shows up after the article and in the genitive.",
      nounBody: "Most of what English does with word order, Irish does with the initial mutation and a preposition that fuses with the pronoun: agam, dom. Learn those prepositional pronouns as words.",
      oddBody: "The irregular verbs and the prepositional pronouns are the list. Do not build feic from the present you first learned, and do not build agam from ag plus mé in speech. The fused form is the form.",
    },
    cy: {
      rulesSummary: "The verb comes first. A feminine noun often softens after the article.",
      rulesBody: "Mae hi yma. Y or yr is the article. A feminine singular softens its first consonant after y. Learn the pair, the dictionary form and the form after the article.",
      rulesSamples: [
        ["Mae hi yma.", "verb first"],
        ["y drws", "soft mutation after the article"],
      ],
      verbSummary: "Bod is irregular, and it is the verb you need every day.",
      verbBody: "Mae is the third person of bod in a plain statement. Dw i is I am. The negative and the question use a different form of bod. Other verbs take endings, and a periphrastic bod plus a verb-noun is very common.",
      nounSummary: "Two genders. Mutation is the live remnant of older changes.",
      nounBody: "There is no case ending on the noun. What changes is the first letter, under the article, after a feminine noun, and after certain prepositions. Learn the soft mutation pairs: p/b, t/d, c/g, b/f, d/dd, g/ drops, m/f.",
      oddBody: "Bod, mynd, gwneud, cael, and dod are the irregular verbs. Their stems in the past and in the negative do not look like the citation form. Mutations that drop g make a word look as if it had no first letter. That is regular mutation, and it still has to be learned.",
    },
    th: {
      rulesSummary: "The verb does not change. A classifier is required when you count.",
      rulesBody: "ฉันดื่มน้ำ. Words are not separated by spaces. The polite particle ค่ะ or ครับ closes a sentence. There is no article and no plural ending.",
      rulesSamples: [
        ["ฉันดื่มน้ำ", "no ending on the verb"],
        ["น้ำหนึ่งแก้ว", "noun, number, classifier"],
      ],
      verbSummary: "Nothing to conjugate. Time words and particles sit around the verb.",
      verbBody: "ดื่ม is drink for every person. แล้ว can mark completion. จะ marks a plan. ไม่ is the no, and it comes before the verb. The polite particle is not optional in careful speech.",
      nounSummary: "No case. Classifiers are the extra morphology.",
      nounBody: "แก้ว for cups, คน for people, เล่ม for books. The noun comes first, then the number and the classifier. ที่ marks a place in a relative phrase. The noun itself does not decline.",
      oddBody: "The irregularities are spelling and tone, not stems. A classifier you have not learned is not optional. ค่ะ and ครับ are chosen by the speaker, not by the noun.",
    },
    vi: {
      rulesSummary: "The verb does not change. Each syllable is written apart, and the diacritic is the tone.",
      rulesBody: "Tôi uống nước. Không before the verb is the simple no. Đã marks a completed action. Sẽ marks a plan. There is no article and no gender.",
      rulesSamples: [
        ["Tôi uống nước.", "no ending"],
        ["một cốc nước", "a classifier when you count"],
      ],
      verbSummary: "Particles, not endings.",
      verbBody: "Uống stays uống. Tôi, bạn, and cô ấy do not change it. Là is be for identity. Có is have. Their negation is không phải and không có, which you should learn as phrases.",
      nounSummary: "Classifiers stand in for the missing plural and article system.",
      nounBody: "Một cốc nước, một quyển sách. The classifier is required with a number. CÁI is common and not universal. Place is ở plus the noun, with no case ending.",
      oddBody: "Tone is the irregularity that changes a word into another word. Không phải and không có are not one negator. Pronouns change with respect, and the wrong one is a grammar mistake, not a style choice.",
    },
    id: {
      rulesSummary: "No gender and no person ending. Affixes build new words from a root.",
      rulesBody: "Saya minum air. Sudah before the verb marks a completed action. Akan or mau marks a plan. Tidak is the no for verbs. Bukan is the no for nouns.",
      rulesSamples: [
        ["Saya minum air.", "one verb form"],
        ["Saya sudah pergi.", "sudah for completion"],
      ],
      verbSummary: "The verb does not conjugate. Me- and di- change its role.",
      verbBody: "Minum is drink for I and for she. Menyala from nyala shows how me- plus a root changes the first sound. Di- plus the root is the passive. Learn the root first, then the affix.",
      nounSummary: "No case and no gender. Plural can be a doubled word.",
      nounBody: "Rumah-rumah is houses, and it is optional when a number is present. Ke marks to. Di marks at. Dari marks from. -nya is a handy definite or possessive ending.",
      oddBody: "The irregulars are the sound changes under me-: a root in t, s, p, or k may lose that consonant. Tidak and bukan are not interchangeable. Pergi and makan do not take me- in the basic sentence.",
    },
    tl: {
      rulesSummary: "The predicate often comes first. Ang marks the focus, not simply the English subject.",
      rulesBody: "Umiinom ako ng tubig. The verb takes a focus affix. Ang points at the noun the affix is about. Ng marks the other noun. Sa marks a direction or a place.",
      rulesSamples: [
        ["Umiinom ako ng tubig.", "actor focus"],
        ["Ang pangalan ko ay Anna.", "ang marks the focus"],
      ],
      verbSummary: "Focus affixes, not person endings.",
      verbBody: "Um- and mag- are actor focus. In- and -in are object focus. The start of the action, the completed action, and the unfinished action each have a form. Learn one verb in actor focus before the other focuses.",
      nounSummary: "Ang, ng, and sa are the declension.",
      nounBody: "There is no case ending on the noun. The marker in front of it does the work. Pronouns have ang, ng, and sa forms: ako, ko, akin. Learn the pronoun set with the markers.",
      oddBody: "The focus system is the irregularity from an English point of view, and it is regular inside Tagalog. What is truly irregular is a short list of verbs whose completed form does not look like the root. Learn those when the card shows them.",
    },
    egy: {
      rulesSummary: "Middle Egyptian can put the verb first. There is no word for the or a.",
      rulesBody: "The signs are the word. The line under them is the transliteration. Jw.j ḥr swr mw is one way to say I am drinking water. Egyptian Arabic stays on the Arabic card and is a different language.",
      rulesSamples: [
        ["jw.j ḥr swr mw", "a present made with ḥr plus the infinitive"],
        ["pr · mw", "house and water, no article"],
      ],
      verbSummary: "A suffix conjugation, and a few verbs that are irregular in every grammar of the language.",
      verbBody: "The suffix pronouns .j, .k, .f mark the subject on a verb form. The stative is another conjugation, used for a state. Rdj, to give, and jjj, to come, do not follow the sound pattern.",
      nounSummary: "Gender, and number that includes a dual.",
      nounBody: "Masculine and feminine, the feminine often with -t. Singular, dual, and plural. There is no case written in the late classical spelling the way a student of Akkadian expects, but the ending can still matter in the transliteration. Learn the signs and the transliteration together.",
      oddBody: "Weak verbs and the verb to give are the list. A plural can repeat the sign or add marks rather than an ending you can hear from the transliteration alone. Trust the card’s pair.",
    },
    qu: {
      rulesSummary: "A handful of suffixes does most of the grammar.",
      rulesBody: "Southern Quechua. Ñuqa yaku ukyani, or yakuta ukyani. The verb ending shows the person. -ta is the object. There is no gender on the noun.",
      rulesSamples: [
        ["Yakuta ukyani.", "object -ta, verb with a person ending"],
        ["Ñuqa", "I"],
      ],
      verbSummary: "Person suffixes on the verb.",
      verbBody: "-ni is I, -nki is you, -n is he or she, in the present of a regular verb. The past adds a different suffix before the person. Learn one verb in those three persons.",
      nounSummary: "Case is a suffix. -ta, -man, -pi, -paq.",
      nounBody: "The noun does not change its stem. You add the case. Plural -kuna comes before the case suffix. There is no article.",
      oddBody: "A few verbs keep an older stem, and the transitions between suffixes can change a consonant. The regular system is the point of the language. Do not add gender, and do not add an article.",
    },
    gn: {
      rulesSummary: "The person marker can sit on the verb and on the possessed noun.",
      rulesBody: "Paraguayan Guaraní. Che is I. A- on the verb is the first person for a large class of verbs. The tilde and the nasal mark belong to the word and change it.",
      rulesSamples: [
        ["Che", "I"],
        ["y", "water"],
      ],
      verbSummary: "A prefix for the person, not a string of European endings.",
      verbBody: "A- is I for oral verbs, re- is you, o- is he or she. Another class of verbs uses a different set, closer to the possessive prefixes. Learn which class a verb belongs to before you add the prefix.",
      nounSummary: "No gender and no case table. Possession is a prefix.",
      nounBody: "Che- on a noun is my. The plural of a noun is often not required if the sentence already shows number. Postpositions come after the noun.",
      oddBody: "Nasal harmony spreads across the prefix. A verb in the wrong class will look almost right and be wrong. The two person-marking classes are the irregularity to respect.",
    },
  };
  return all[id] ?? null;
}

function langTip(id: string): string {
  return LANG_BY_ID.get(id)?.tip ?? "";
}

function tipOr(tip: string, fallback: string): string {
  return tip || fallback;
}
