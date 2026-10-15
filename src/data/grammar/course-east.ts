import type { GrammarCourse } from "./model";

export const EAST: Record<string, GrammarCourse> = {
  zh: {
    intro: "Mandarin leaves the verb unchanged and does the work with word order, 的, aspect particles, and classifiers.",
    lessons: [
      {
        id: "a1-order",
        level: "A1",
        title: "Word order and the topic",
        lead: "The topic comes first, then the verb, then the object, and the verb never takes a person ending.",
        notes: [
          "The opening word is what the sentence is about, and it is often the same as the subject.",
          "A time word sits before the verb, not after the object.",
          "There is no article and no plural ending on an ordinary noun, so the pronoun is said when the person matters.",
        ],
        examples: [
          ["我喝茶。", "Wǒ hē chá. I drink tea."],
          ["今天我喝茶。", "Jīntiān wǒ hē chá. Today I drink tea."],
        ],
      },
      {
        id: "a1-shi",
        level: "A1",
        title: "是 and 的",
        lead: "是 links two nouns, and 的 links a possessor or a description to the noun.",
        notes: [
          "是 is the copula for identity, as in a person being a student, and it is not used before an ordinary adjective.",
          "An adjective can be the whole predicate, and 很 in that sentence is the usual cushion rather than a strong very.",
          "的 sits between the possessor and the noun, and it can also stand in for a noun that was just named.",
        ],
        examples: [
          ["我是学生。", "Wǒ shì xuéshēng. I am a student."],
          ["这是我的书。", "Zhè shì wǒ de shū. This is my book."],
        ],
      },
      {
        id: "a1-classifier",
        level: "A1",
        title: "A number needs a classifier",
        lead: "A number cannot sit directly on a noun, so a classifier stands between them.",
        notes: [
          "The order is number, classifier, noun.",
          "个 is the general classifier and will be understood, but careful speech uses the classifier that belongs to the noun.",
          "Before a classifier, two is 两, not 二.",
        ],
        examples: [
          ["我有一本书。", "Wǒ yǒu yì běn shū. I have one book."],
          ["我有两张纸。", "Wǒ yǒu liǎng zhāng zhǐ. I have two sheets of paper."],
        ],
        table: {
          caption: "Classifiers you will actually say",
          heads: ["classifier", "for", "phrase"],
          rows: [
            ["个 gè", "people and many things", "一个人"],
            ["本 běn", "books", "一本书"],
            ["张 zhāng", "flat things", "一张纸"],
            ["只 zhī", "animals, or one of a pair", "一只猫"],
          ],
        },
      },
      {
        id: "a2-ma",
        level: "A2",
        title: "吗, and an A-not-A question",
        lead: "吗 turns a statement into a yes-no question, and A-not-A offers both answers on the verb.",
        notes: [
          "吗 goes at the end and does not change the word order.",
          "An A-not-A question repeats the verb around 不, and that question does not also take 吗.",
          "The answer repeats the verb or 是, rather than a single word that means yes.",
        ],
        examples: [
          ["你喝茶吗？", "Nǐ hē chá ma? Do you drink tea?"],
          ["你喝不喝茶？", "Nǐ hē bu hē chá? Do you drink tea or not?"],
        ],
        table: {
          caption: "Two yes-no shapes",
          heads: ["kind", "shape", "example"],
          rows: [
            ["particle", "statement plus 吗", "你喝茶吗"],
            ["A-not-A", "verb 不 verb", "喝不喝"],
            ["with 是", "是不是", "你是不是学生"],
          ],
        },
      },
      {
        id: "a2-bu",
        level: "A2",
        title: "不 against 没",
        lead: "不 refuses a habit, a state, or 是, and 没 refuses possession or a completed event.",
        notes: [
          "不是 means is not, and 没有 means do not have.",
          "Do not put 不 in front of 有 when you mean that you do not have something.",
          "不 is said bú before a fourth-tone syllable, as in bú shì, even though the character stays 不.",
        ],
        examples: [
          ["我不是老师。", "Wǒ bú shì lǎoshī. I am not a teacher."],
          ["我没有水。", "Wǒ méiyǒu shuǐ. I do not have water."],
        ],
        table: {
          caption: "Which negator",
          heads: ["meaning", "use", "example"],
          rows: [
            ["is not", "不 with 是", "不是"],
            ["do not, as a habit", "不 with the verb", "不喝"],
            ["do not have", "没 with 有", "没有"],
            ["did not happen", "没 with the verb, and no 了", "没喝"],
          ],
        },
      },
      {
        id: "a2-le",
        level: "A2",
        title: "了 for a completed event",
        lead: "了 after the verb marks that the event is complete, and it is not a past-tense ending on a person.",
        notes: [
          "Verb 了 says the event got done, and the same character at the end of a sentence often marks a new situation instead.",
          "Those two jobs can both appear, and they are not one ending.",
          "没 negates a completed event, and that negative drops 了.",
        ],
        examples: [
          ["我喝了水。", "Wǒ hē le shuǐ. I drank the water."],
          ["我没喝茶。", "Wǒ méi hē chá. I did not drink the tea."],
        ],
      },
      {
        id: "b1-guo",
        level: "B1",
        title: "过 for experience",
        lead: "过 after the verb says the experience has happened at some time, not that one event just finished.",
        notes: [
          "去过 names the fact of having gone, with no claim about a particular day.",
          "The negative is 没 plus the verb plus 过.",
          "了 bounds one event, and 过 asks whether the experience exists, so they are not substitutes.",
        ],
        examples: [
          ["我去过北京。", "Wǒ qù guo Běijīng. I have been to Beijing."],
          ["我没吃过。", "Wǒ méi chī guo. I have never eaten it."],
        ],
        table: {
          caption: "了 against 过",
          heads: ["particle", "job", "example"],
          rows: [
            ["了", "one event completed", "喝了"],
            ["过", "experience at some time", "去过"],
            ["没, no 了", "the event did not happen", "没喝"],
            ["没, then 过", "no such experience", "没吃过"],
          ],
        },
      },
      {
        id: "b1-ba",
        level: "B1",
        title: "把, the disposal construction",
        lead: "把 puts a known object before the verb when the verb says what was done to it.",
        notes: [
          "The shape is subject, 把, object, verb, and then a result, a direction, or a place, and a bare verb after 把 is not a sentence.",
          "The object is something already known, so 把 prefers a specific book over a vague one.",
          "Negation sits before 把, and 在 inside the complement is only the place phrase, as in 放在桌子上.",
        ],
        examples: [
          ["我把书放在桌子上。", "Wǒ bǎ shū fàng zài zhuōzi shàng. I put the book on the table."],
          ["我没把水喝完。", "Wǒ méi bǎ shuǐ hē wán. I did not finish the water."],
        ],
        table: {
          caption: "What has to follow the verb",
          heads: ["slot", "example", "job"],
          rows: [
            ["place", "放在桌子上", "where it ended"],
            ["result", "喝完", "finished"],
            ["negation", "没把", "before 把, not after it"],
          ],
        },
      },
      {
        id: "b2-bi",
        level: "B2",
        title: "比 for comparison",
        lead: "比 sits between the two things you compare, and the adjective takes no ending.",
        notes: [
          "A 比 B plus an adjective means A is more so than B.",
          "Do not add 很 in that basic comparison.",
          "When you mean not as much, the ordinary negative is 没有, not 不比.",
        ],
        examples: [
          ["这个比那个大。", "Zhège bǐ nàge dà. This one is bigger than that one."],
          ["我没有你高。", "Wǒ méiyǒu nǐ gāo. I am not as tall as you."],
        ],
      },
      {
        id: "b2-clause",
        level: "B2",
        title: "虽然, 但是, and a relative 的",
        lead: "虽然 and 但是 concede a point in two halves, and 的 can turn a clause into a modifier before the noun.",
        notes: [
          "虽然 starts the concession and 但是 starts the turn, and Chinese keeps both.",
          "A relative clause comes before the noun and ends with 的, with no relative pronoun and no change to the verb.",
          "That 的 is the same linker as possession, now with a whole clause in front of it.",
        ],
        examples: [
          ["虽然很贵，但是我买了。", "Suīrán hěn guì, dànshì wǒ mǎi le. Although it is expensive, I bought it."],
          ["我买的书在这里。", "Wǒ mǎi de shū zài zhèlǐ. The book I bought is here."],
        ],
      },
    ],
    cards: [
      {
        word: "个",
        gloss: "gè, general classifier",
        tag: "classifier",
        forms: [
          ["one person", "一个人"],
          ["three friends", "三个朋友"],
        ],
      },
      {
        word: "本",
        gloss: "běn, classifier for books",
        tag: "classifier",
        forms: [
          ["one book", "一本书"],
          ["this book", "这本书"],
        ],
      },
      {
        word: "张",
        gloss: "zhāng, classifier for flat things",
        tag: "classifier",
        forms: [
          ["one sheet", "一张纸"],
          ["two tables", "两张桌子"],
        ],
      },
      {
        word: "只",
        gloss: "zhī, classifier for animals or one of a pair",
        tag: "classifier",
        forms: [
          ["one cat", "一只猫"],
          ["two hands", "两只手"],
        ],
      },
      {
        word: "是",
        gloss: "shì, copula, negated with 不",
        tag: "particle",
        forms: [
          ["I am a student", "我是学生"],
          ["is not", "不是"],
        ],
      },
      {
        word: "的",
        gloss: "de, linker before the noun",
        tag: "particle",
        forms: [
          ["my book", "我的书"],
          ["a new one", "新的"],
        ],
      },
      {
        word: "了",
        gloss: "le, completed event, not a person ending",
        tag: "particle",
        forms: [
          ["drank", "喝了"],
          ["did not drink", "没喝"],
        ],
      },
      {
        word: "过",
        gloss: "guo, experience",
        tag: "particle",
        forms: [
          ["have been", "去过"],
          ["have never eaten", "没吃过"],
        ],
      },
      {
        word: "不",
        gloss: "bù, or bú before a fourth tone",
        tag: "particle",
        forms: [
          ["do not drink", "不喝"],
          ["am not", "不是"],
        ],
      },
      {
        word: "没",
        gloss: "méi, not have, or did not",
        tag: "particle",
        forms: [
          ["do not have", "没有"],
          ["did not go", "没去"],
        ],
      },
    ],
  },
  yue: {
    intro: "Hong Kong Cantonese, in traditional characters, keeps one verb shape and does the grammar with particles and classifiers.",
    lessons: [
      {
        id: "a1-hai",
        level: "A1",
        title: "係 and 嘅",
        lead: "係 is the copula for identity, and 嘅 links a possessor to the noun.",
        notes: [
          "係 does not change for person, and an adjective does not need it.",
          "嘅 ge3 sits between a possessor, or a description, and the noun.",
          "嘅 is not Mandarin 的, even though the order looks similar.",
        ],
        examples: [
          ["你係我朋友。", "nei5 hai6 ngo5 pang4 jau5. You are my friend."],
          ["呢本係我嘅書。", "ni1 bun2 hai6 ngo5 ge3 syu1. This book is mine."],
        ],
      },
      {
        id: "a1-classifier",
        level: "A1",
        title: "A classifier with every number",
        lead: "A number cannot touch the noun, so a classifier is obligatory between them.",
        notes: [
          "The order is number, classifier, noun.",
          "個 go3 is the general classifier, and 本 bun2 is the one for books.",
          "Two before a classifier is 兩 loeng5, and this is not optional decoration.",
        ],
        examples: [
          ["我有一本書。", "ngo5 jau5 jat1 bun2 syu1. I have one book."],
          ["有三個人。", "jau5 saam1 go3 jan4. There are three people."],
        ],
        table: {
          caption: "Classifiers",
          heads: ["classifier", "for", "phrase"],
          rows: [
            ["個 go3", "people and many things", "一個人"],
            ["本 bun2", "books", "一本書"],
            ["張 zoeng1", "flat things", "一張紙"],
            ["隻 zek3", "animals", "一隻貓"],
          ],
        },
      },
      {
        id: "a1-mou",
        level: "A1",
        title: "冇, not Mandarin 不",
        lead: "冇 is the negator of possession and of a completed action, and it is not Mandarin 不.",
        notes: [
          "冇水 means there is no water, or I do not have water.",
          "冇 before a verb denies that the action was completed.",
          "Do not write Mandarin 不 or 没 in a Cantonese sentence.",
        ],
        examples: [
          ["我冇水。", "ngo5 mou5 seoi2. I do not have water."],
          ["我冇食。", "ngo5 mou5 sik6. I did not eat."],
        ],
        table: {
          caption: "冇 against the other negator",
          heads: ["form", "job", "not this"],
          rows: [
            ["冇水", "have not", "not 不水"],
            ["冇食", "did not eat", "not 唔食 for a finished meal"],
            ["唔係", "is not", "that one is 唔, taught next"],
          ],
        },
      },
      {
        id: "a2-m",
        level: "A2",
        title: "唔 for a verb you do not do",
        lead: "唔 refuses a verb or 係, and it is not the negator of 有.",
        notes: [
          "唔食 means you do not eat it, as a refusal or a habit.",
          "唔係 means is not.",
          "Do not put 唔 in front of 有, and do not use 冇 to refuse a plain verb you simply do not do.",
        ],
        examples: [
          ["我唔食麵包。", "ngo5 m4 sik6 min6 baau1. I do not eat bread."],
          ["我唔係老師。", "ngo5 m4 hai6 lou5 si1. I am not a teacher."],
        ],
      },
      {
        id: "a2-aspect",
        level: "A2",
        title: "Aspect 咗 and 緊",
        lead: "咗 marks a completed action, and 緊 marks an action in progress.",
        notes: [
          "The verb itself stays the same for every person, and the particle does the aspect.",
          "食咗 says the eating got done.",
          "行緊 says the walking is going on now.",
        ],
        examples: [
          ["我食咗飯。", "ngo5 sik6 zo2 faan6. I have eaten."],
          ["男人行緊路。", "naam4 jan4 haang4 gan2 lou6. The man is walking."],
        ],
        table: {
          caption: "The same verb, two particles",
          heads: ["mark", "example", "job"],
          rows: [
            ["plain", "我食飯", "the action"],
            ["咗 zo2", "食咗", "completed"],
            ["緊 gan2", "食緊", "in progress"],
          ],
        },
      },
      {
        id: "a2-hai2",
        level: "A2",
        title: "喺 for place",
        lead: "喺 places someone or something, and it is not the copula 係.",
        notes: [
          "喺 hai2 is at or in a place, and the place word follows it.",
          "係 hai6 answers what something is, while 喺 answers where it is.",
          "The noun after 喺 does not take a case ending.",
        ],
        examples: [
          ["我喺屋企。", "ngo5 hai2 uk1 kei2. I am at home."],
          ["書喺枱上。", "syu1 hai2 toi2 soeng6. The book is on the table."],
        ],
      },
      {
        id: "b1-compare",
        level: "B1",
        title: "Comparatives",
        lead: "A comparison is adjective plus 過, and the adjective takes no ending.",
        notes: [
          "過 gwo3 sits after the adjective and before the thing you compare with.",
          "我高過你 means I am taller than you.",
          "Do not import Mandarin 比 as the basic Cantonese pattern.",
        ],
        examples: [
          ["我高過你。", "ngo5 gou1 gwo3 nei5. I am taller than you."],
          ["呢個大過嗰個。", "ni1 go3 daai6 gwo3 go2 go3. This one is bigger than that one."],
        ],
        table: {
          caption: "Adjective plus 過",
          heads: ["pattern", "example", "reading"],
          rows: [
            ["A adjective 過 B", "我高過你", "ngo5 gou1 gwo3 nei5"],
            ["with classifiers", "呢個大過嗰個", "ni1 go3 daai6 gwo3 go2 go3"],
          ],
        },
      },
      {
        id: "b1-relative",
        level: "B1",
        title: "A relative clause",
        lead: "A clause ends with 嘅 and then the noun, and there is no relative pronoun.",
        notes: [
          "The modifying clause comes before the noun.",
          "嘅 is the whole marker, and the verb does not change.",
          "The same 嘅 also links a possessor, so the position tells you which job it has.",
        ],
        examples: [
          ["我買嘅書喺度。", "ngo5 maai5 ge3 syu1 hai2 dou6. The book I bought is here."],
          ["食麵包嘅人喺度。", "sik6 min6 baau1 ge3 jan4 hai2 dou6. The person who eats bread is here."],
        ],
      },
      {
        id: "b2-aa",
        level: "B2",
        title: "The final particle 呀",
        lead: "呀 aa3 softens a remark or a short question, and it does not mark tense.",
        notes: [
          "This lesson teaches only 呀 aa3, because a nearby syllable with another tone is a different particle.",
          "呀 can make a suggestion gentler, and it can make a short question milder.",
          "It does not mean past, future, or plural, so do not translate it as a verb ending.",
        ],
        examples: [
          ["食飯呀？", "sik6 faan6 aa3? A gentle shall we eat."],
          ["好呀。", "hou2 aa3. All right."],
        ],
      },
      {
        id: "b2-not-le",
        level: "B2",
        title: "This is not Mandarin 了",
        lead: "Cantonese does not paste Mandarin 了 onto a verb to make a past tense.",
        notes: [
          "Completed action is 咗 zo2, and an action in progress is 緊 gan2.",
          "Experience is 過 gwo3 after the verb, the same character as the comparative but a different job after a verb.",
          "A sentence-final change of situation is often 啦, which is not 了 and not 咗, and this course does not treat them as one particle.",
        ],
        examples: [
          ["我食咗飯。", "ngo5 sik6 zo2 faan6. I ate, with 咗, not 了."],
          ["我食緊飯。", "ngo5 sik6 gan2 faan6. I am eating, with 緊."],
        ],
        table: {
          caption: "Cantonese aspect is not Mandarin 了",
          heads: ["job", "Cantonese", "do not write"],
          rows: [
            ["completed", "食咗", "食了"],
            ["in progress", "食緊", "在食 as if it were the same system"],
            ["experience", "食過", "食了过"],
          ],
        },
      },
    ],
    cards: [
      {
        word: "個",
        gloss: "go3, general classifier",
        tag: "classifier",
        forms: [
          ["one person", "一個人"],
          ["three people", "三個人"],
        ],
      },
      {
        word: "本",
        gloss: "bun2, classifier for books",
        tag: "classifier",
        forms: [
          ["one book", "一本書"],
          ["this book", "呢本書"],
        ],
      },
      {
        word: "係",
        gloss: "hai6, copula",
        tag: "particle",
        forms: [
          ["I am a student", "我係學生"],
          ["is not", "唔係"],
        ],
      },
      {
        word: "嘅",
        gloss: "ge3, linker",
        tag: "particle",
        forms: [
          ["my book", "我嘅書"],
          ["the one I bought", "我買嘅"],
        ],
      },
      {
        word: "冇",
        gloss: "mou5, have-not, or did not",
        tag: "particle",
        forms: [
          ["no water", "冇水"],
          ["did not eat", "冇食"],
        ],
      },
      {
        word: "唔",
        gloss: "m4, do not, before a verb or 係",
        tag: "particle",
        forms: [
          ["do not eat", "唔食"],
          ["is not", "唔係"],
        ],
      },
      {
        word: "咗",
        gloss: "zo2, completed",
        tag: "particle",
        forms: [
          ["ate", "食咗"],
          ["has gone", "行咗"],
        ],
      },
      {
        word: "緊",
        gloss: "gan2, in progress",
        tag: "particle",
        forms: [
          ["eating", "食緊"],
          ["walking", "行緊"],
        ],
      },
      {
        word: "喺",
        gloss: "hai2, at a place, not the copula",
        tag: "particle",
        forms: [
          ["at home", "喺屋企"],
          ["here", "喺度"],
        ],
      },
      {
        word: "過",
        gloss: "gwo3, than after an adjective, or experience after a verb",
        tag: "particle",
        forms: [
          ["taller than", "高過"],
          ["have eaten before", "食過"],
        ],
      },
    ],
  },
  ja: {
    intro: "This course speaks in polite です and ます, and it names the dictionary form whenever a verb changes.",
    lessons: [
      {
        id: "a1-desu",
        level: "A1",
        title: "です and ます",
        lead: "A noun takes です, a verb takes ます, and the dictionary form is the plain shape in a word list.",
        notes: [
          "学生です is the polite copula on a noun.",
          "A godan dictionary form such as 飲む becomes 飲みます, and an ichidan form such as 食べる becomes 食べます.",
          "ます is the course voice, and it is not a particle you drop with a stranger.",
        ],
        examples: [
          ["これは水です。", "Kore wa mizu desu. This is water."],
          ["水を飲みます。", "Mizu o nomimasu. I drink water. Dictionary form 飲む."],
        ],
        table: {
          caption: "Polite です and ます beside the dictionary form",
          heads: ["", "noun", "drink", "eat"],
          rows: [
            ["dictionary", "水", "飲む", "食べる"],
            ["polite", "水です", "飲みます", "食べます"],
            ["past", "水でした", "飲みました", "食べました"],
            ["negative", "水じゃないです", "飲みません", "食べません"],
          ],
        },
      },
      {
        id: "a1-wa",
        level: "A1",
        title: "は against が",
        lead: "は sets the topic, and が marks the subject when that subject is the new information.",
        notes: [
          "は does not mean grammatical subject in every sentence.",
          "が answers who or what, and it also marks the subject of an existence sentence.",
          "A topic with は is already in play, while が is often the news.",
        ],
        examples: [
          ["水は冷たいです。", "Mizu wa tsumetai desu. As for the water, it is cold."],
          ["だれが来ますか。", "Dare ga kimasu ka. Who is coming?"],
        ],
      },
      {
        id: "a1-particles",
        level: "A1",
        title: "を、に、で、へ",
        lead: "を marks the object, に marks a destination or a time, で marks where an action happens, and へ marks a direction.",
        notes: [
          "を follows the thing the verb acts on.",
          "に also marks where something exists, while で is the place of an action, so 家にいます and 家で食べます are different.",
          "へ and に can both aim at a destination, and に is the one to use first.",
        ],
        examples: [
          ["パンを食べます。", "Pan o tabemasu. I eat bread. Dictionary form 食べる."],
          ["家で食べます。", "Ie de tabemasu. I eat at home."],
        ],
        table: {
          caption: "Particles that replace case endings",
          heads: ["particle", "job", "example"],
          rows: [
            ["を", "object", "水を飲みます"],
            ["に", "destination, time, existence", "駅に行きます"],
            ["で", "place of an action", "家で食べます"],
            ["へ", "direction", "駅へ行きます"],
          ],
        },
      },
      {
        id: "a2-adj",
        level: "A2",
        title: "い and な adjectives",
        lead: "An い adjective conjugates, and a な adjective needs な before a noun and です at the end of a sentence.",
        notes: [
          "寒い stays 寒い before a noun, and the polite sentence is 寒いです.",
          "静か takes な before a noun, 静かな部屋, and the sentence is 静かです.",
          "いい is the everyday word for good and よい is its dictionary partner, so the past is よかったです, not a form built on いい.",
        ],
        examples: [
          ["今日は寒いです。", "Kyō wa samui desu. Today is cold."],
          ["静かな部屋です。", "Shizuka na heya desu. It is a quiet room."],
        ],
      },
      {
        id: "a2-te",
        level: "A2",
        title: "The て form, including 行って",
        lead: "The て form links the verb to the next piece, and 行く takes 行って rather than 行いて.",
        notes: [
          "The dictionary form is what you look up, and the て form is what you say before ください, before another clause, and before いる.",
          "Godan verbs change the last sound in groups, so 飲む becomes 飲んで and 書く becomes 書いて.",
          "する becomes して, 来る becomes 来て, and 行く is the famous godan exception 行って.",
        ],
        examples: [
          ["水を飲んでください。", "Mizu o nonde kudasai. Please drink the water. Dictionary 飲む."],
          ["駅に行ってください。", "Eki ni itte kudasai. Please go to the station. 行く takes 行って."],
        ],
        table: {
          caption: "て forms, with the exception marked",
          heads: ["dictionary", "て"],
          rows: [
            ["飲む", "飲んで"],
            ["書く", "書いて"],
            ["行く", "行って"],
            ["する", "して"],
            ["来る", "来て"],
          ],
        },
      },
      {
        id: "a2-teiru",
        level: "A2",
        title: "ている",
        lead: "The て form plus いる, polite ています, marks an action in progress or a state that still holds.",
        notes: [
          "食べています can mean eating now, and the dictionary form of the helper is いる.",
          "開いています can mean the door is open, a resulting state, not only that someone is in the middle of opening it.",
          "ある is the existence verb for things, and it is not the helper after て, so the progressive stays ています rather than てあります in this lesson.",
        ],
        examples: [
          ["子供は寝ています。", "Kodomo wa nete imasu. The child is sleeping. Dictionary 寝る."],
          ["ドアは開いています。", "Doa wa aite imasu. The door is open."],
        ],
      },
      {
        id: "b1-counters",
        level: "B1",
        title: "Counters",
        lead: "A number needs a counter, and the counter is chosen by the kind of thing.",
        notes: [
          "人 is the counter for people, and the first two are irregular: 一人 hitori and 二人 futari.",
          "From 三人 sannin the Sino-Japanese number returns.",
          "杯 counts cups, 本 counts long things, and つ is the general native counter through ten.",
        ],
        examples: [
          ["水を一杯ください。", "Mizu o ippai kudasai. One cup of water, please."],
          ["友達が二人います。", "Tomodachi ga futari imasu. There are two friends. いる is for people."],
        ],
        table: {
          caption: "Counters",
          heads: ["counter", "for", "one"],
          rows: [
            ["人", "people", "一人 hitori"],
            ["杯", "cups", "一杯 ippai"],
            ["本", "long things", "一本 ippon"],
            ["つ", "general", "一つ hitotsu"],
          ],
        },
      },
      {
        id: "b1-potential",
        level: "B1",
        title: "Potential and ことができる",
        lead: "A godan verb can take a potential stem, and ことができる is the paraphrase that works for every verb.",
        notes: [
          "The potential of a godan verb moves the last syllable to the e-row and adds る, so 飲む becomes 飲める and the polite form is 飲めます.",
          "The object of a potential is often marked with が.",
          "来る becomes 来られる, する becomes できる, and することができる is the careful form when you do not yet trust the stem.",
        ],
        examples: [
          ["日本語が少し話せます。", "Nihongo ga sukoshi hanasemasu. I can speak a little Japanese. Dictionary 話す."],
          ["泳ぐことができます。", "Oyogu koto ga dekimasu. I am able to swim. Dictionary 泳ぐ."],
        ],
      },
      {
        id: "b2-conditional",
        level: "B2",
        title: "と、ば、たら",
        lead: "と, ば, and たら all make conditions, and they are not three spellings of one English if.",
        notes: [
          "と after the plain form states a natural result, and it is a weak choice for a personal intention.",
          "ば is the provisional, at home in a general condition, as in 読めば分かります.",
          "たら is the た form plus ら, and it is the one for a particular when, including a future when.",
        ],
        examples: [
          ["春になると、暖かくなります。", "Haru ni naru to, atatakaku narimasu. When spring comes, it gets warm."],
          ["駅に着いたら、電話します。", "Eki ni tsuitara, denwa shimasu. When I arrive at the station, I will call."],
        ],
        table: {
          caption: "Three conditions",
          heads: ["pattern", "shape", "use"],
          rows: [
            ["と", "plain form plus と", "a natural result"],
            ["ば", "読めば", "a general condition"],
            ["たら", "着いたら", "a particular when"],
          ],
        },
      },
      {
        id: "b2-plain",
        level: "B2",
        title: "Plain form against ます, and のだ",
        lead: "The plain form is the dictionary shape inside many patterns, and のだ, polite んです, explains a reason.",
        notes: [
          "飲みます is the course voice at the end of a sentence, and 飲む is the plain present a dictionary lists.",
          "Polite speech still uses the plain form inside the pattern and puts んです at the end.",
          "のだ is an explanation or a pressed fact, and it is not a meaningless softener and not the same as です.",
        ],
        examples: [
          ["今日は寒いんです。", "Kyō wa samui n desu. The thing is, it is cold today."],
          ["水を飲むんです。", "Mizu o nomu n desu. Plain 飲む, with polite んです, because the drinking is the point."],
        ],
      },
    ],
    cards: [
      {
        word: "する",
        gloss: "suru, irregular, dictionary form",
        tag: "verb",
        forms: [
          ["ます", "します"],
          ["て", "して"],
          ["past", "しました"],
          ["negative", "しません"],
        ],
      },
      {
        word: "来る",
        gloss: "kuru, irregular, dictionary form",
        tag: "verb",
        forms: [
          ["ます", "来ます"],
          ["て", "来て"],
          ["past", "来ました"],
          ["plain negative", "来ない"],
        ],
      },
      {
        word: "行く",
        gloss: "iku, dictionary form, て form 行って",
        tag: "verb",
        forms: [
          ["ます", "行きます"],
          ["て", "行って"],
          ["past", "行きました"],
          ["negative", "行きません"],
        ],
      },
      {
        word: "ある",
        gloss: "aru, inanimate existence, plain negative ない",
        tag: "verb",
        forms: [
          ["ます", "あります"],
          ["て", "あって"],
          ["plain negative", "ない"],
          ["polite negative", "ありません"],
        ],
      },
      {
        word: "いる",
        gloss: "iru, people and animals, and the helper in ている",
        tag: "verb",
        forms: [
          ["ます", "います"],
          ["て", "いて"],
          ["plain negative", "いない"],
          ["polite negative", "いません"],
        ],
      },
      {
        word: "いい",
        gloss: "ii, dictionary partner よい",
        tag: "adjective",
        forms: [
          ["polite", "いいです"],
          ["past", "よかったです"],
          ["negative", "よくないです"],
          ["て", "よくて"],
        ],
      },
      {
        word: "です",
        gloss: "desu, polite copula, plain だ",
        tag: "verb",
        forms: [
          ["plain", "だ"],
          ["past polite", "でした"],
          ["past plain", "だった"],
          ["negative", "じゃないです"],
        ],
      },
      {
        word: "書く",
        gloss: "kaku, regular godan, so て is 書いて not って",
        tag: "verb",
        forms: [
          ["て", "書いて"],
          ["past", "書きました"],
          ["negative", "書きません"],
        ],
      },
      {
        word: "食べる",
        gloss: "taberu, ichidan, drop る",
        tag: "verb",
        forms: [
          ["ます", "食べます"],
          ["て", "食べて"],
          ["past", "食べました"],
          ["negative", "食べません"],
        ],
      },
    ],
  },
  ko: {
    intro: "This course uses polite 해요 style, and the dictionary form is the stem plus 다.",
    lessons: [
      {
        id: "a1-copula",
        level: "A1",
        title: "이에요, 예요, and 해요",
        lead: "이다 is 이에요 after a consonant and 예요 after a vowel, and a verb in this course ends in 해요 style.",
        notes: [
          "하다 becomes 해요, and a 하다 verb such as 공부하다 becomes 공부해요.",
          "There is no 안 이다, so the negative of the copula is 아니에요.",
          "요 is the politeness of this style, and this course does not drop it.",
        ],
        examples: [
          ["저는 학생이에요.", "Jeoneun haksaeng-ieyo. I am a student, after a consonant."],
          ["저는 친구예요.", "Jeoneun chingu-yeyo. I am a friend, 예요 after a vowel."],
        ],
        table: {
          caption: "해요 style of 이다 and 하다",
          heads: ["", "이다", "하다"],
          rows: [
            ["after a consonant", "이에요", "해요"],
            ["after a vowel", "예요", "해요"],
            ["negative", "아니에요", "안 해요"],
          ],
        },
      },
      {
        id: "a1-topic",
        level: "A1",
        title: "은 and 는 against 이 and 가",
        lead: "은 or 는 marks the topic, and 이 or 가 marks the subject when it is the new piece.",
        notes: [
          "은, 이, and 을 follow a consonant, and 는, 가, and 를 follow a vowel.",
          "저는 sets me as the topic, while 제가 presents me as the news.",
          "누구 plus 가 becomes 누가, so that pronoun does not keep both vowels.",
        ],
        examples: [
          ["저는 학생이에요.", "Jeoneun haksaeng-ieyo. As for me, I am a student."],
          ["누가 와요?", "Nuga wayo? Who is coming? 가 marks the new subject."],
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
      },
      {
        id: "a1-object",
        level: "A1",
        title: "을 and 를, 에 and 에서",
        lead: "을 or 를 marks the object, 에 marks a destination or a time, and 에서 marks where an action happens.",
        notes: [
          "물을 uses 을 because 물 ends in a consonant, and a vowel-final noun takes 를.",
          "학교에 가요 names the destination, and 집에서 먹어요 names the place of the eating.",
          "에서 is not a second spelling of 에.",
        ],
        examples: [
          ["물을 마셔요.", "Mureul masyeoyo. I drink water."],
          ["학교에서 공부해요.", "Hakgyo-eseo gongbuhaeyo. I study at school."],
        ],
      },
      {
        id: "a2-past",
        level: "A2",
        title: "The past 았 and 었",
        lead: "The polite past inserts 았 or 었 before 어요, and the vowel of the stem chooses which one.",
        notes: [
          "If the last vowel of the stem is 아 or 오, the past uses 았, so 가다 becomes 갔어요.",
          "Other vowels take 었, so 먹다 becomes 먹었어요.",
          "하다 does not become 하았어요, and the polite past is 했어요.",
        ],
        examples: [
          ["어제 빵을 먹었어요.", "Eoje ppang-eul meogeosseoyo. I ate bread yesterday."],
          ["학교에 갔어요.", "Hakgyo-e gasseoyo. I went to school."],
        ],
        table: {
          caption: "Polite present and past",
          heads: ["dictionary", "now", "past"],
          rows: [
            ["먹다", "먹어요", "먹었어요"],
            ["가다", "가요", "갔어요"],
            ["하다", "해요", "했어요"],
          ],
        },
      },
      {
        id: "a2-irregular",
        level: "A2",
        title: "ㄷ and ㅂ irregulars",
        lead: "듣다 becomes 들어요, and 돕다 becomes 도와요, and not every verb with those letters changes.",
        notes: [
          "A ㄷ irregular such as 듣다 turns ㄷ into ㄹ before a vowel, but 닫다 stays 닫아요.",
          "A ㅂ irregular such as 돕다 drops ㅂ and makes 와, while 입다 stays 입어요, and the roast verb 굽다 becomes 구워요.",
          "Before a consonant the irregular letter comes back, so 듣는 and 돕는 are not the polite forms.",
        ],
        examples: [
          ["음악을 들어요.", "Eumageul deureoyo. I listen to music, from 듣다."],
          ["친구를 도와요.", "Chingureul dowayo. I help a friend, from 돕다."],
        ],
        table: {
          caption: "The stem change in 해요 style",
          heads: ["dictionary", "polite", "change"],
          rows: [
            ["듣다", "들어요", "ㄷ becomes ㄹ"],
            ["돕다", "도와요", "ㅂ drops"],
            ["굽다", "구워요", "ㅂ drops, the roast verb"],
            ["닫다", "닫아요", "regular, ㄷ stays"],
          ],
        },
      },
      {
        id: "a2-want",
        level: "A2",
        title: "고 싶다 and ㄹ 수 있다",
        lead: "고 싶어요 means want to, and (으)ㄹ 수 있어요 means can.",
        notes: [
          "Both endings attach to the stem, so 먹다 becomes 먹고 싶어요 and 먹을 수 있어요.",
          "After a vowel, can is ㄹ 수 있어요, as in 갈 수 있어요, and after a consonant it is 을 수 있어요.",
          "하다 becomes 하고 싶어요 and 할 수 있어요, using the same contraction you already know from 해요.",
        ],
        examples: [
          ["빵을 먹고 싶어요.", "Ppang-eul meokgo sipeoyo. I want to eat bread."],
          ["한국어를 할 수 있어요.", "Hangugeoreul hal su isseoyo. I can speak Korean."],
        ],
      },
      {
        id: "b1-honorific",
        level: "B1",
        title: "Honorific 으시",
        lead: "으시 raises the subject, and it is one ending in this lesson rather than a second whole course.",
        notes: [
          "After a consonant the marker is 으시, and after a vowel it is 시, so 가다 becomes 가세요 and 읽다 becomes 읽으세요.",
          "하다 becomes 하세요.",
          "The subject can take 께서, and the familiar 해요 sentences in the rest of this course stay as they are.",
        ],
        examples: [
          ["선생님이 가세요.", "Seonsaengnimi gaseyo. The teacher goes."],
          ["선생님이 읽으세요.", "Seonsaengnimi ilgeuseyo. The teacher reads."],
        ],
        table: {
          caption: "해요 beside the honorific",
          heads: ["plain polite", "honorific"],
          rows: [
            ["가요", "가세요"],
            ["읽어요", "읽으세요"],
            ["해요", "하세요"],
          ],
        },
      },
      {
        id: "b1-relative",
        level: "B1",
        title: "A relative clause before the noun",
        lead: "The clause comes before the noun, and there is no separate who.",
        notes: [
          "An action verb in the present uses 는, so 읽는 책 is the book someone is reading.",
          "A past action uses 은 or ㄴ, so 먹은 빵 is bread that was eaten.",
          "A descriptive verb uses 은 or ㄴ in the present, as in 작은 집, and that is not the past of an action verb.",
        ],
        examples: [
          ["제가 읽는 책이에요.", "Jega ingneun chaegieyo. It is the book I am reading."],
          ["어제 먹은 빵이에요.", "Eoje meogeun ppang-ieyo. It is the bread I ate yesterday."],
        ],
      },
      {
        id: "b2-quote",
        level: "B2",
        title: "Quoting with 다고",
        lead: "A statement is quoted with 다고 or 라고, and the saying verb stays in 해요 style.",
        notes: [
          "An action verb after a vowel takes ㄴ다고, as in 온다고, and after a consonant it takes 는다고, as in 먹는다고.",
          "A noun takes 이라고 after a consonant and 라고 after a vowel.",
          "This lesson is only the statement quote, not a question quote or a command quote.",
        ],
        examples: [
          ["친구가 온다고 했어요.", "Chinguga ondago haesseoyo. My friend said that someone is coming."],
          ["학생이라고 했어요.", "Haksaeng-irago haesseoyo. They said that it is a student."],
        ],
      },
      {
        id: "b2-if",
        level: "B2",
        title: "The conditional 으면",
        lead: "으면 after a consonant, and 면 after a vowel, makes a real if.",
        notes: [
          "있다 becomes 있으면, and 오다 becomes 오면.",
          "The result clause is an ordinary 해요 sentence.",
          "A past condition uses 았으면 or 었으면, and the basic pattern in this lesson is the present one.",
        ],
        examples: [
          ["비가 오면 집에 있어요.", "Biga omyeon jibe isseoyo. If it rains, I stay home."],
          ["시간이 없으면 안 가요.", "Sigani eopseumyeon an gayo. If there is no time, I do not go."],
        ],
      },
    ],
    cards: [
      {
        word: "이다",
        gloss: "ida, the copula",
        tag: "verb",
        forms: [
          ["after a consonant", "이에요"],
          ["after a vowel", "예요"],
          ["past", "이었어요 / 였어요"],
          ["negative", "아니에요"],
        ],
      },
      {
        word: "듣다",
        gloss: "deutda, ㄷ irregular",
        tag: "verb",
        forms: [
          ["polite", "들어요"],
          ["past", "들었어요"],
          ["before a consonant", "듣는"],
        ],
      },
      {
        word: "돕다",
        gloss: "dopda, ㅂ irregular",
        tag: "verb",
        forms: [
          ["polite", "도와요"],
          ["past", "도왔어요"],
          ["before a consonant", "돕는"],
        ],
      },
      {
        word: "모르다",
        gloss: "moreuda, 르 irregular",
        tag: "verb",
        forms: [
          ["polite", "몰라요"],
          ["past", "몰랐어요"],
        ],
      },
      {
        word: "그렇다",
        gloss: "geureota, the ㅎ stem that becomes 그래요",
        tag: "verb",
        forms: [
          ["polite", "그래요"],
          ["past", "그랬어요"],
          ["modifier", "그런"],
        ],
      },
      {
        word: "하다",
        gloss: "hada, contracts to 해요",
        tag: "verb",
        forms: [
          ["polite", "해요"],
          ["past", "했어요"],
          ["negative", "안 해요"],
        ],
      },
      {
        word: "되다",
        gloss: "doeda, contracts to 돼요",
        tag: "verb",
        forms: [
          ["polite", "돼요"],
          ["past", "됐어요"],
        ],
      },
      {
        word: "굽다",
        gloss: "gupda, roast, a ㅂ irregular, not the regular bend verb",
        tag: "verb",
        forms: [
          ["polite", "구워요"],
          ["past", "구웠어요"],
          ["before a consonant", "굽는"],
        ],
      },
      {
        word: "쓰다",
        gloss: "sseuda, ㅡ drops",
        tag: "verb",
        forms: [
          ["polite", "써요"],
          ["past", "썼어요"],
        ],
      },
    ],
  },
  ar: {
    intro: "This course is Modern Standard Arabic, built from a root and a pattern, and dialect sentences stay in one labeled lesson.",
    lessons: [
      {
        id: "a1-root",
        level: "A1",
        title: "The root, and the article ال",
        lead: "A word is usually three consonants plus a vowel pattern, and ال is the article.",
        notes: [
          "The root k-t-b shows up in كتب he wrote and in كتاب a book, and the vowels are the pattern.",
          "Before a moon letter, ال is said al, and before a sun letter the l assimilates to the next consonant.",
          "Sun letters include ت ث د ذ ر ز س ش ص ض ط ظ ل and ن, and the other consonants are moon letters.",
        ],
        examples: [
          ["الْكِتَابُ جَدِيدٌ.", "al-kitābu jadīdun. The book is new. k is a moon letter."],
          ["الشَّمْسُ كَبِيرَةٌ.", "ash-shamsu kabīratun. The sun is large. sh is a sun letter."],
        ],
        table: {
          caption: "Moon letter and sun letter",
          heads: ["kind", "example", "said"],
          rows: [
            ["moon k", "الْكِتَابُ", "al-kitābu"],
            ["moon b", "الْبَابُ", "al-bābu"],
            ["sun sh", "الشَّمْسُ", "ash-shamsu"],
            ["sun n", "النُّورُ", "an-nūru"],
          ],
        },
      },
      {
        id: "a1-past",
        level: "A1",
        title: "A past-tense Form I verb",
        lead: "The past is suffixes on the stem, and this course shows verb-first order first.",
        notes: [
          "كتب means he wrote, and that third-person form is the dictionary shape.",
          "A subject-first sentence is also real Modern Standard Arabic, and the second example is the same words in that order.",
          "When a plural noun follows the verb, careful writing often leaves the verb singular, which is why this lesson uses a singular subject.",
        ],
        examples: [
          ["كَتَبَ الْوَلَدُ الدَّرْسَ.", "kataba l-waladu d-darsa. The boy wrote the lesson. Verb first."],
          ["الْوَلَدُ كَتَبَ الدَّرْسَ.", "al-waladu kataba d-darsa. The same sentence with the subject first."],
        ],
        table: {
          caption: "Past of كتب, Form I",
          heads: ["person", "form"],
          rows: [
            ["I", "كَتَبْتُ katabtu"],
            ["you, masculine", "كَتَبْتَ katabta"],
            ["he", "كَتَبَ kataba"],
            ["she", "كَتَبَتْ katabat"],
            ["we", "كَتَبْنَا katabnā"],
          ],
        },
      },
      {
        id: "a1-present",
        level: "A1",
        title: "A present-tense Form I verb",
        lead: "The present uses a prefix, and this verb's stem vowel is u.",
        notes: [
          "أكتب is I write, تكتب is you masculine, يكتب is he, and نكتب is we.",
          "She is also تكتب in the singular indicative, and you feminine is تكتبين, so the prefix alone does not separate every person.",
          "Another Form I verb may have a or i as the stem vowel, and you learn that vowel with the verb.",
        ],
        examples: [
          ["أَكْتُبُ رِسَالَةً.", "aktubu risālatan. I write a letter."],
          ["هِيَ تَكْتُبُ.", "hiya taktubu. She writes."],
        ],
        table: {
          caption: "Present of كتب",
          heads: ["person", "form"],
          rows: [
            ["I", "أَكْتُبُ aktubu"],
            ["you, masculine", "تَكْتُبُ taktubu"],
            ["he", "يَكْتُبُ yaktubu"],
            ["we", "نَكْتُبُ naktubu"],
          ],
        },
      },
      {
        id: "a2-gender",
        level: "A2",
        title: "Gender and the sound plural",
        lead: "Nouns are masculine or feminine, and a sound plural adds an ending instead of rebuilding the word.",
        notes: [
          "The feminine ending is often ة, said a in pause and atun with the case vowel in full writing.",
          "A sound masculine plural is ون in the nominative and ين in the other cases.",
          "A sound feminine plural is ات, and the adjective follows the noun and agrees.",
        ],
        examples: [
          ["مُعَلِّمٌ وَمُعَلِّمَةٌ.", "muʿallimun wa-muʿallimatun. A male teacher and a female teacher."],
          ["الْمُعَلِّمَاتُ جَدِيدَاتٌ.", "al-muʿallimātu jadīdātun. The female teachers are new."],
        ],
      },
      {
        id: "a2-broken",
        level: "A2",
        title: "A broken plural",
        lead: "Many common nouns make the plural by changing the inside of the word, and that plural is learned as a pair.",
        notes: [
          "كتاب becomes كتب, and رجل becomes رجال.",
          "There is no single ending that will invent those plurals from the singular.",
          "A sound plural and a broken plural are both real, and you do not choose by taste.",
        ],
        examples: [
          ["كِتَابٌ وَكُتُبٌ.", "kitābun wa-kutubun. One book, and the broken plural."],
          ["رَجُلٌ وَرِجَالٌ.", "rajulun wa-rijālun. One man, and the broken plural."],
        ],
        table: {
          caption: "Broken beside sound",
          heads: ["noun", "singular", "plural", "kind"],
          rows: [
            ["book", "كِتَابٌ", "كُتُبٌ", "broken"],
            ["man", "رَجُلٌ", "رِجَالٌ", "broken"],
            ["teacher, feminine", "مُعَلِّمَةٌ", "مُعَلِّمَاتٌ", "sound"],
          ],
        },
      },
      {
        id: "a2-idafa",
        level: "A2",
        title: "Idafa",
        lead: "Two nouns in a chain say of, the first noun drops its article, and the second is genitive.",
        notes: [
          "باب البيت is the door of the house, with no ال and no tanwin on باب.",
          "Only the last noun of the chain takes ال when the whole chain is definite.",
          "After a preposition the noun is also genitive, which is the same -i ending you see on the second noun.",
        ],
        examples: [
          ["بَابُ الْبَيْتِ.", "bābu l-bayti. The door of the house."],
          ["كِتَابُ الطَّالِبِ.", "kitābu ṭ-ṭālibi. The student's book."],
        ],
      },
      {
        id: "b1-dual",
        level: "B1",
        title: "The dual, briefly",
        lead: "Two is its own number, with ان in the nominative and ين after a verb or a preposition.",
        notes: [
          "كتابان is two books as a subject.",
          "رأيت كتابين uses the oblique dual because the two books are the object.",
          "This is not an ordinary plural, and the lesson stops at the noun endings.",
        ],
        examples: [
          ["كِتَابَانِ عَلَى الطَّاوِلَةِ.", "kitābāni ʿalā ṭ-ṭāwilati. Two books are on the table."],
          ["رَأَيْتُ كِتَابَيْنِ.", "raʾaytu kitābayni. I saw two books."],
        ],
      },
      {
        id: "b1-form2",
        level: "B1",
        title: "Form II as a pattern",
        lead: "Form II doubles the middle consonant of a Form I root, and this lesson does not list ten forms.",
        notes: [
          "درس means he studied, and درّس means he taught.",
          "The doubled middle letter is the mark to recognize, often a causative or an intensive.",
          "Forms III through X exist, and they are later patterns, not a table to memorize today.",
        ],
        examples: [
          ["دَرَسَ الطَّالِبُ.", "darasa ṭ-ṭālibu. The student studied. Form I."],
          ["دَرَّسَ الْمُعَلِّمُ.", "darrasa l-muʿallimu. The teacher taught. Form II."],
        ],
      },
      {
        id: "b2-dialect",
        level: "B2",
        title: "Egyptian, Gulf, and Moroccan, labeled",
        lead: "One lesson contrasts three dialects with three labeled sentences, and none of them enters an MSA table.",
        notes: [
          "Egyptian, Gulf Arabic, and Moroccan Darija do not share one present-tense paradigm.",
          "The sentences below are nominal, so this lesson does not conjugate a dialect verb as if it were كتب.",
          "The cards in this course stay Modern Standard Arabic.",
        ],
        examples: [
          ["الْكِتَاب جْدِيد.", "Egyptian: il-kitāb gidīd. The book is new."],
          ["الدَّار صْغِيرَة.", "Moroccan Darija: d-dār ṣghīra. The house is small, and دار is feminine here."],
        ],
        table: {
          caption: "Three labels, not one paradigm",
          heads: ["label", "sentence", "reading"],
          rows: [
            ["Egyptian", "الْكِتَاب جْدِيد.", "il-kitāb gidīd"],
            ["Gulf", "الْبَيْت صَغِير.", "al-bēt ṣaghīr"],
            ["Moroccan Darija", "الدَّار صْغِيرَة.", "d-dār ṣghīra"],
          ],
        },
      },
      {
        id: "b2-relative",
        level: "B2",
        title: "الذي, and case that is still visible",
        lead: "الذي follows a definite noun, and case is still written on the dual and on a pronoun suffix.",
        notes: [
          "الذي is masculine singular and التي is feminine singular, and both follow a noun that already has ال.",
          "The dual still shows case in ordinary writing: ان for a subject and ين after a verb or a preposition, and the dual relative does the same with اللذان and اللذين.",
          "An attached pronoun is a different slot from the independent هو, as in كتبته I wrote it.",
        ],
        examples: [
          ["الْكِتَابُ الَّذِي كَتَبْتُهُ.", "al-kitābu lladhī katabtuhu. The book that I wrote."],
          ["جَاءَ الْوَلَدَانِ.", "jāʾa l-waladāni. The two boys came. Nominative dual."],
        ],
      },
    ],
    cards: [
      {
        word: "كَانَ",
        gloss: "kāna, he was",
        tag: "verb",
        forms: [
          ["I", "كُنْتُ"],
          ["she", "كَانَتْ"],
          ["they", "كَانُوا"],
          ["present, he", "يَكُونُ"],
        ],
      },
      {
        word: "لَيْسَ",
        gloss: "laysa, is not, with no present stem",
        tag: "verb",
        forms: [
          ["I", "لَسْتُ"],
          ["she", "لَيْسَتْ"],
          ["they", "لَيْسُوا"],
        ],
      },
      {
        word: "رَأَى",
        gloss: "ra'ā, he saw, a weak final root",
        tag: "verb",
        forms: [
          ["I, past", "رَأَيْتُ"],
          ["he, present", "يَرَى"],
          ["I, present", "أَرَى"],
        ],
      },
      {
        word: "أَخَذَ",
        gloss: "akhadha, he took",
        tag: "verb",
        forms: [
          ["I, past", "أَخَذْتُ"],
          ["he, present", "يَأْخُذُ"],
          ["I, present", "آخُذُ"],
        ],
      },
      {
        word: "كِتَاب",
        gloss: "kitāb, book, broken plural",
        tag: "noun",
        forms: [
          ["singular", "كِتَابٌ"],
          ["plural", "كُتُبٌ"],
        ],
      },
      {
        word: "رَجُل",
        gloss: "rajul, man, broken plural",
        tag: "noun",
        forms: [
          ["singular", "رَجُلٌ"],
          ["plural", "رِجَالٌ"],
        ],
      },
      {
        word: "مُدَرِّسَة",
        gloss: "mudarrisa, feminine noun, sound plural",
        tag: "noun",
        forms: [
          ["singular", "مُدَرِّسَةٌ"],
          ["plural", "مُدَرِّسَاتٌ"],
        ],
      },
      {
        word: "بَاب",
        gloss: "bāb, door, broken plural",
        tag: "noun",
        forms: [
          ["singular", "بَابٌ"],
          ["plural", "أَبْوَابٌ"],
        ],
      },
    ],
  },
  he: {
    intro: "Hebrew on this course is vowelled for the learner, and the verb is a root set into a binyan pattern.",
    lessons: [
      {
        id: "a1-article",
        level: "A1",
        title: "The article and a pronoun",
        lead: "The article is הַ, and a present sentence of being can be a pronoun with no verb.",
        notes: [
          "הַ sits on the noun, and the next letter often takes a dagesh, as in הַבַּיִת.",
          "אֲנִי כָּאן is a full sentence, because the present of be is left out.",
          "אֶת marks a definite direct object, and it is not the article.",
        ],
        examples: [
          ["אֲנִי כָּאן.", "ani kan. I am here."],
          ["הַבַּיִת קָטָן.", "ha-bayit katan. The house is small."],
        ],
        table: {
          caption: "Pronouns",
          heads: ["", "form"],
          rows: [
            ["I", "אֲנִי"],
            ["you, masculine", "אַתָּה"],
            ["you, feminine", "אַתְּ"],
            ["he", "הוּא"],
            ["she", "הִיא"],
          ],
        },
      },
      {
        id: "a1-paal",
        level: "A1",
        title: "Present of pa'al",
        lead: "The pa'al present is the participle, and it agrees in gender and number, not in person.",
        notes: [
          "כּוֹתֵב is the masculine singular, used for I, you, and he when the speaker or subject is masculine.",
          "כּוֹתֶבֶת is the feminine singular, and the plural forms are כּוֹתְבִים and כּוֹתְבוֹת.",
          "This is only the pa'al pattern, the vowel shape קוֹטֵל around the root.",
        ],
        examples: [
          ["אֲנִי כּוֹתֵב.", "ani kotev. I write, masculine participle."],
          ["אֲנִי כּוֹתֶבֶת.", "ani kotevet. I write, feminine participle."],
        ],
        table: {
          caption: "Pa'al participle of כתב",
          heads: ["", "participle"],
          rows: [
            ["masculine singular", "כּוֹתֵב"],
            ["feminine singular", "כּוֹתֶבֶת"],
            ["masculine plural", "כּוֹתְבִים"],
            ["feminine plural", "כּוֹתְבוֹת"],
          ],
        },
      },
      {
        id: "a1-gender",
        level: "A1",
        title: "Gender",
        lead: "Nouns are masculine or feminine, and the adjective follows and agrees.",
        notes: [
          "A feminine noun often ends in ה or ת, but not always, so the gender is learned with the noun.",
          "הַדֶּלֶת פְּתוּחָה takes the feminine adjective, and הַבַּיִת קָטָן takes the masculine.",
          "The participle from the previous lesson is the same agreement, now on a verb instead of an adjective.",
        ],
        examples: [
          ["הַדֶּלֶת פְּתוּחָה.", "ha-delet petuḥa. The door is open."],
          ["הַיֶּלֶד קָטָן.", "ha-yeled katan. The boy is small."],
        ],
      },
      {
        id: "a2-past",
        level: "A2",
        title: "Past of pa'al",
        lead: "The pa'al past takes suffixes, and a dictionary cites the third person masculine.",
        notes: [
          "כָּתַב is he wrote, and that is the form you look up, not the infinitive.",
          "כָּתַבְתִּי is I wrote, כָּתַבְתָּ is you masculine, and כָּתְבָה is she wrote.",
          "The participle is not the past, so אֲנִי כּוֹתֵב does not mean I wrote.",
        ],
        examples: [
          ["כָּתַבְתִּי.", "katavti. I wrote."],
          ["הִיא כָּתְבָה.", "hi katva. She wrote."],
        ],
        table: {
          caption: "Past of a sound pa'al verb",
          heads: ["", "כתב"],
          rows: [
            ["I", "כָּתַבְתִּי"],
            ["you, masculine", "כָּתַבְתָּ"],
            ["he", "כָּתַב"],
            ["she", "כָּתְבָה"],
            ["we", "כָּתַבְנוּ"],
          ],
        },
      },
      {
        id: "a2-piel",
        level: "A2",
        title: "Pi'el as a pattern",
        lead: "Pi'el is a second pattern, with a dagesh in the middle root letter, not a list of every binyan.",
        notes: [
          "דִּבֵּר means he spoke, and the present is מְדַבֵּר, with מ at the front.",
          "The past vowels are i and e, and the middle letter keeps a dagesh.",
          "Pa'al present has no מ, so מְדַבֵּר cannot be built by reusing כּוֹתֵב.",
        ],
        examples: [
          ["הוּא מְדַבֵּר.", "hu medaber. He speaks."],
          ["דִּבַּרְתִּי עִם הַיֶּלֶד.", "dibarti im ha-yeled. I spoke with the boy."],
        ],
        table: {
          caption: "Pa'al beside pi'el",
          heads: ["", "pa'al כתב", "pi'el דבר"],
          rows: [
            ["past, he", "כָּתַב", "דִּבֵּר"],
            ["present", "כּוֹתֵב", "מְדַבֵּר"],
          ],
        },
      },
      {
        id: "a2-construct",
        level: "A2",
        title: "Construct state",
        lead: "A construct chain says of, and the first noun drops the article and may change shape.",
        notes: [
          "בֵּית הַסֵּפֶר is the school, and בֵּית is the construct of בַּיִת.",
          "The first noun has no הַ, and the second noun carries the definiteness of the whole chain.",
          "סֵפֶר הַיֶּלֶד is the boy's book, not a book that agreed with a case ending.",
        ],
        examples: [
          ["בֵּית הַסֵּפֶר.", "beit ha-sefer. The school."],
          ["סֵפֶר הַיֶּלֶד.", "sefer ha-yeled. The boy's book."],
        ],
      },
      {
        id: "b1-infinitive",
        level: "B1",
        title: "The infinitive and a prefix",
        lead: "לִ prefixes the infinitive, and a different prefix marks the future.",
        notes: [
          "לִכְתֹּב is to write, the infinitive of the pa'al verb whose past is כָּתַב.",
          "אֶכְתֹּב is I will write, and the אֶ is the future prefix for I, not the infinitive prefix.",
          "A feminine speaker says רוֹצָה where a masculine speaker says רוֹצֶה, and the infinitive itself does not change.",
        ],
        examples: [
          ["אֲנִי רוֹצֶה לִכְתֹּב.", "ani rotse likhtov. I want to write."],
          ["מָחָר אֶכְתֹּב.", "maḥar ekhtov. Tomorrow I will write."],
        ],
      },
      {
        id: "b1-hifil",
        level: "B1",
        title: "Hif'il, briefly",
        lead: "Hif'il is one causative pattern, marked by הִ in the past and מַ in the present.",
        notes: [
          "הִכְנִיס means he brought something in, which is not the same verb as a plain pa'al of the same letters.",
          "The present is מַכְנִיס, and it is not כּוֹתֵב and not מְדַבֵּר.",
          "This lesson is one pair, not the remaining binyanim.",
        ],
        examples: [
          ["הִכְנַסְתִּי אֶת הַסֵּפֶר.", "hikhnasti et ha-sefer. I brought the book in."],
          ["הוּא מַכְנִיס אֶת הַסֵּפֶר.", "hu makhnis et ha-sefer. He brings the book in."],
        ],
      },
      {
        id: "b2-she",
        level: "B2",
        title: "Relative ש",
        lead: "שֶׁ prefixes the clause that modifies a noun, and the clause follows the noun.",
        notes: [
          "הַסֵּפֶר שֶׁכָּתַבְתִּי is the book that I wrote, with no separate who and no change to the binyan.",
          "אֲשֶׁר is the formal twin of שֶׁ, and this course uses שֶׁ.",
          "The noun is definite when the relative identifies a known one, so הַ stays on the head noun.",
        ],
        examples: [
          ["הַסֵּפֶר שֶׁכָּתַבְתִּי.", "ha-sefer she-katavti. The book that I wrote."],
          ["הַיֶּלֶד שֶׁכָּתַב.", "ha-yeled she-katav. The boy who wrote."],
        ],
      },
      {
        id: "b2-natan",
        level: "B2",
        title: "The weak verb נתן",
        lead: "נָתַן will not keep both nuns in the forms you actually say.",
        notes: [
          "The past I is נָתַתִּי, not a regular suffix on נָתַן.",
          "The infinitive is לָתֵת, and the future he is יִתֵּן.",
          "The present participle נוֹתֵן still shows the nun, which is why the other forms look as if they came from a different verb.",
        ],
        examples: [
          ["נָתַתִּי לַיֶּלֶד.", "natati la-yeled. I gave to the boy."],
          ["הוּא יִתֵּן.", "hu yiten. He will give."],
        ],
        table: {
          caption: "נתן, the forms you cannot build",
          heads: ["", "form"],
          rows: [
            ["present", "נוֹתֵן"],
            ["past, I", "נָתַתִּי"],
            ["past, he", "נָתַן"],
            ["infinitive", "לָתֵת"],
            ["future, he", "יִתֵּן"],
          ],
        },
      },
    ],
    cards: [
      {
        word: "הָיָה",
        gloss: "haya, he was, present left out",
        tag: "verb",
        forms: [
          ["past, I", "הָיִיתִי"],
          ["past, she", "הָיְתָה"],
          ["infinitive", "לִהְיוֹת"],
        ],
      },
      {
        word: "הָלַךְ",
        gloss: "halakh, he went",
        tag: "verb",
        forms: [
          ["present", "הוֹלֵךְ"],
          ["present, feminine", "הוֹלֶכֶת"],
          ["past, I", "הָלַכְתִּי"],
          ["infinitive", "לָלֶכֶת"],
        ],
      },
      {
        word: "נָתַן",
        gloss: "natan, he gave",
        tag: "verb",
        forms: [
          ["present", "נוֹתֵן"],
          ["past, I", "נָתַתִּי"],
          ["infinitive", "לָתֵת"],
          ["future, he", "יִתֵּן"],
        ],
      },
      {
        word: "יֶלֶד",
        gloss: "yeled, boy, irregular plural",
        tag: "noun",
        forms: [
          ["plural", "יְלָדִים"],
          ["feminine", "יַלְדָּה"],
        ],
      },
      {
        word: "אִישׁ",
        gloss: "ish, man, irregular plural",
        tag: "noun",
        forms: [
          ["plural", "אֲנָשִׁים"],
          ["feminine", "אִשָּׁה"],
        ],
      },
      {
        word: "לָמַד",
        gloss: "lamad, he learned, against pi'el לִמֵּד he taught",
        tag: "verb",
        forms: [
          ["pa'al present", "לוֹמֵד"],
          ["pi'el past", "לִמֵּד"],
          ["pi'el present", "מְלַמֵּד"],
        ],
      },
      {
        word: "בַּיִת",
        gloss: "bayit, house",
        tag: "noun",
        forms: [
          ["plural", "בָּתִּים"],
          ["construct", "בֵּית"],
          ["with the article", "הַבַּיִת"],
        ],
      },
      {
        word: "כָּתַב",
        gloss: "katav, sound pa'al, the regular contrast",
        tag: "verb",
        forms: [
          ["past, I", "כָּתַבְתִּי"],
          ["present", "כּוֹתֵב"],
          ["infinitive", "לִכְתֹּב"],
        ],
      },
    ],
  },
  ber: {
    intro: "Standard Moroccan Tamazight marks a noun as free or annexed, and this course writes the Latin spelling while the app's cards also show Tifinagh.",
    lessons: [
      {
        id: "a1-state",
        level: "A1",
        title: "Free state and annexed state",
        lead: "The dictionary noun is the free state, and the annexed state changes the first vowel after a verb or a preposition.",
        notes: [
          "axxam is a house in the free state, and uxxam is the same noun after ɣr.",
          "A masculine a- often becomes u- in the annexed state, as argaz becomes urgaz.",
          "The app's cards also show Tifinagh, and this course writes Latin letters so a character is not invented.",
        ],
        examples: [
          ["axxam imẓẓi.", "axxam imẓẓi. A small house, in the free state."],
          ["ɣr uxxam.", "ɣr uxxam. To the house, in the annexed state."],
        ],
        table: {
          caption: "Free state and annexed state",
          heads: ["noun", "free", "annexed"],
          rows: [
            ["house", "axxam", "uxxam"],
            ["man", "argaz", "urgaz"],
          ],
        },
      },
      {
        id: "a1-affix",
        level: "A1",
        title: "Person affixes on the verb",
        lead: "Person is a prefix, a suffix, or both, not a separate pronoun that replaces the ending.",
        notes: [
          "In the perfect of ẓṛ, see, -ɣ is I, so ẓṛiɣ is I saw.",
          "You is t- at the front and -d at the end together, so tẓṛid.",
          "He is i-, as in iẓṛa, and we is n-, as in nẓṛa.",
        ],
        examples: [
          ["ẓṛiɣ tafukt.", "ẓṛiɣ tafukt. I saw the sun."],
          ["tẓṛid tafukt.", "tẓṛid tafukt. You saw the sun."],
        ],
        table: {
          caption: "Perfect of ẓṛ",
          heads: ["", "form"],
          rows: [
            ["I", "ẓṛiɣ"],
            ["you", "tẓṛid"],
            ["he", "iẓṛa"],
            ["she", "tẓṛa"],
            ["we", "nẓṛa"],
          ],
        },
      },
      {
        id: "a1-gender",
        level: "A1",
        title: "A noun's gender prefix",
        lead: "A masculine noun often starts with a-, and a feminine noun often starts and ends with t-.",
        notes: [
          "argaz is a man, and tamɣart is a woman.",
          "The feminine frame, t at the start and t at the end, is part of the noun, not an ending you add later for agreement on a verb.",
          "There is no separate word for the.",
        ],
        examples: [
          ["argaz da.", "argaz da. The man is here."],
          ["tamɣart da.", "tamɣart da. The woman is here."],
        ],
      },
      {
        id: "a2-d",
        level: "A2",
        title: "The particle d",
        lead: "d is the particle this course uses for is in an identity sentence, and it does not conjugate.",
        notes: [
          "kyyi d amddakwl inu means you are my friend.",
          "The noun after d stays in the free state.",
          "A place sentence such as nekki da, I am here, can do without d, because it is not an identity sentence.",
        ],
        examples: [
          ["kyyi d amddakwl inu.", "kyyi d amddakwl inu. You are my friend."],
          ["ntta d argaz.", "ntta d argaz. He is a man."],
        ],
      },
      {
        id: "a2-negation",
        level: "A2",
        title: "Negation",
        lead: "ur comes before the verb, and the negative perfect may change the vowel of the stem.",
        notes: [
          "ur ddiɣ is I did not go, from the verb whose positive perfect is ddiɣ.",
          "ur iddi is he did not go, and the vowel is not the vowel of idda.",
          "Learn the negative stem with the verb rather than by a universal ending.",
        ],
        examples: [
          ["ur ddiɣ.", "ur ddiɣ. I did not go."],
          ["ur iddi.", "ur iddi. He did not go."],
        ],
      },
      {
        id: "a2-object",
        level: "A2",
        title: "The direct object",
        lead: "A noun object stays in the free state, and a subject that follows the verb is annexed.",
        notes: [
          "tafukt after ẓṛiɣ is the object, and it keeps the free-state t-a.",
          "In iẓṛa urgaz tafukt, urgaz is the subject after the verb, so it is annexed, and tafukt is still the free-state object.",
          "Do not put the object into the annexed state just because it is an object.",
        ],
        examples: [
          ["ẓṛiɣ tafukt.", "ẓṛiɣ tafukt. I saw the sun. Object in the free state."],
          ["iẓṛa urgaz tafukt.", "iẓṛa urgaz tafukt. The man saw the sun."],
        ],
        table: {
          caption: "Which noun changes",
          heads: ["role", "state", "in the sentence"],
          rows: [
            ["object", "free", "tafukt"],
            ["subject after the verb", "annexed", "urgaz"],
            ["after ɣr", "annexed", "uxxam"],
          ],
        },
      },
      {
        id: "b1-relative",
        level: "B1",
        title: "The relative",
        lead: "nna introduces the clause after the noun, and a subject relative adds the participle ending n.",
        notes: [
          "argaz nna iddan is the man who went.",
          "When the head noun is the object, the verb stays a personal form and the object is not repeated, as in aɣrum nna nšša.",
          "nni and lli are variants you may meet, and they are not case endings.",
        ],
        examples: [
          ["argaz nna iddan.", "argaz nna iddan. The man who went."],
          ["aɣrum nna nšša.", "aɣrum nna nšša. The bread that we ate."],
        ],
      },
      {
        id: "b1-aspect",
        level: "B1",
        title: "Aorist against perfect",
        lead: "The aorist is the stem after ad, and the perfect is the stem that can stand alone as a finished event.",
        notes: [
          "ad iddu is he will go, ad plus the aorist of ddu.",
          "idda is he went, the perfect, with no ad.",
          "A third stem, the imperfect, is what follows ar, and the next lesson separates that stem from these two.",
        ],
        examples: [
          ["ad iddu.", "ad iddu. He will go."],
          ["idda.", "idda. He went."],
        ],
        table: {
          caption: "Aorist and perfect of go",
          heads: ["", "form", "job"],
          rows: [
            ["aorist", "ad iddu", "future or wish, after ad"],
            ["perfect", "idda", "he went"],
            ["perfect, I", "ddiɣ", "I went"],
          ],
        },
      },
      {
        id: "b2-stem",
        level: "B2",
        title: "A verb with an alternating stem",
        lead: "ddu, dda, and ttdu are three stems of go, not one stem plus a person ending.",
        notes: [
          "The aorist stem is ddu.",
          "The perfect stem is dda, so he went is idda and I went is ddiɣ.",
          "The imperfect stem is ttdu, and ar itteddu means he is going or he goes.",
        ],
        examples: [
          ["idda.", "idda. He went, perfect stem dda."],
          ["ar itteddu.", "ar itteddu. He is going, imperfect stem ttdu."],
        ],
        table: {
          caption: "Three stems of go",
          heads: ["stem", "shape", "example"],
          rows: [
            ["aorist", "ddu", "ad iddu"],
            ["perfect", "dda", "idda"],
            ["imperfect", "ttdu", "ar itteddu"],
          ],
        },
      },
      {
        id: "b2-nocase",
        level: "B2",
        title: "There is no Arabic case",
        lead: "Nothing on the noun is an Arabic nominative, accusative, or genitive vowel.",
        notes: [
          "The change from axxam to uxxam is the annexed state, not a case ending borrowed from Arabic.",
          "A preposition such as ɣr selects that annexed state, and the noun still does not take -u, -a, or -i.",
          "Gender is the t- frame or the a- prefix, which is also not an Arabic case.",
        ],
        examples: [
          ["axxam imẓẓi.", "axxam imẓẓi. A small house, with no case vowel."],
          ["ɣr uxxam.", "ɣr uxxam. To the house, annexed state only."],
        ],
      },
    ],
    cards: [
      {
        word: "ddu",
        gloss: "go, three stems",
        tag: "verb",
        forms: [
          ["aorist", "ddu"],
          ["perfect, he", "idda"],
          ["perfect, I", "ddiɣ"],
          ["imperfect", "ar itteddu"],
        ],
      },
      {
        word: "ẓṛiɣ",
        gloss: "I saw, the perfect affixes of ẓṛ",
        tag: "verb",
        forms: [
          ["I", "ẓṛiɣ"],
          ["you", "tẓṛid"],
          ["he", "iẓṛa"],
          ["she", "tẓṛa"],
          ["we", "nẓṛa"],
        ],
      },
      {
        word: "ur",
        gloss: "not, before the verb",
        tag: "particle",
        forms: [
          ["I did not go", "ur ddiɣ"],
          ["he did not go", "ur iddi"],
        ],
      },
      {
        word: "axxam",
        gloss: "house, free state",
        tag: "noun",
        forms: [
          ["free", "axxam"],
          ["annexed", "uxxam"],
          ["to the house", "ɣr uxxam"],
        ],
      },
      {
        word: "argaz",
        gloss: "man, free state",
        tag: "noun",
        forms: [
          ["free", "argaz"],
          ["annexed", "urgaz"],
        ],
      },
      {
        word: "tamɣart",
        gloss: "woman, feminine t- frame",
        tag: "noun",
        forms: [
          ["feminine", "tamɣart"],
          ["masculine pair", "argaz"],
        ],
      },
      {
        word: "d",
        gloss: "is, the identity particle",
        tag: "particle",
        forms: [
          ["you are my friend", "kyyi d amddakwl inu"],
          ["he is a man", "ntta d argaz"],
        ],
      },
      {
        word: "ar",
        gloss: "particle before the imperfect",
        tag: "particle",
        forms: [
          ["particle", "ar"],
          ["he is going", "ar itteddu"],
        ],
      },
    ],
  },
  am: {
    intro: "Amharic puts the verb last, and the verb agrees with the person who acts by a prefix and a suffix together.",
    lessons: [
      {
        id: "a1-agree",
        level: "A1",
        title: "The verb agrees with who acts",
        lead: "The verb says who is acting, and the noun does not take an Arabic case vowel.",
        notes: [
          "In the present, a prefix and a suffix together mark the person, so both pieces have to be there.",
          "እጠጣለሁ is I drink, and ይጠጣል is he drinks, from the same verb.",
          "The person stays on the verb rather than on a copied root pattern.",
        ],
        examples: [
          ["ውሃ እጠጣለሁ።", "wəha əṭäṭṭallähu. I drink water."],
          ["ውሃ ይጠጣል።", "wəha yəṭäṭṭal. He drinks water."],
        ],
        table: {
          caption: "Present of drink",
          heads: ["", "form"],
          rows: [
            ["እኔ", "እጠጣለሁ"],
            ["አንተ", "ትጠጣለህ"],
            ["እሱ", "ይጠጣል"],
            ["እኛ", "እንጠጣለን"],
          ],
        },
      },
      {
        id: "a1-present",
        level: "A1",
        title: "A present",
        lead: "The present on these cards is the stem between a person prefix and the አለ ending.",
        notes: [
          "እንበላለን is we eat, the form on the app's cards.",
          "ትመጣለህ is you come, with ት for you masculine and ለህ at the end.",
          "The citation form in a dictionary is the infinitive in መ, such as መብላት, and that is not the sentence form.",
        ],
        examples: [
          ["ዳቦ እንበላለን።", "dabo ənbällallän. We eat bread."],
          ["ወደ ቤት ትመጣለህ።", "wädä bet təmäṭalläh. You come to the house."],
        ],
      },
      {
        id: "a1-past",
        level: "A1",
        title: "A past",
        lead: "The past uses suffixes only, and the first-person suffix is ሁ or ኩ depending on the verb.",
        notes: [
          "ጠጣሁ is I drank, with ሁ.",
          "ሄድኩ is I went, with ኩ, so you cannot reuse one ending on every verb.",
          "There is no person prefix in this past, which is the opposite of the present.",
        ],
        examples: [
          ["ጠጣሁ።", "ṭäṭṭahu. I drank."],
          ["ሄድኩ።", "hedku. I went."],
        ],
      },
      {
        id: "a2-object",
        level: "A2",
        title: "Object suffixes",
        lead: "One clear set of suffixes sits on a verb that already says he, and the suffix says who is affected.",
        notes: [
          "አየኝ is he saw me, አየህ is he saw you masculine, አየው is he saw him, and አያት is he saw her.",
          "The subject is already inside አየ, so the suffix is not a second subject.",
          "A definite noun can also take ን, as in ፀሐይን, and that ን is not this set.",
        ],
        examples: [
          ["አየኝ።", "ayyäññ. He saw me."],
          ["አየው።", "ayyäw. He saw him."],
        ],
        table: {
          caption: "Object suffixes on አየ, he saw",
          heads: ["who", "form"],
          rows: [
            ["me", "አየኝ"],
            ["you, masculine", "አየህ"],
            ["him", "አየው"],
            ["her", "አያት"],
          ],
        },
      },
      {
        id: "a2-relative",
        level: "A2",
        title: "The relative የ",
        lead: "የ prefixes a past relative verb, የሚ prefixes a present one, and the clause comes before the noun.",
        notes: [
          "የሄደ ልጅ is a child who went.",
          "የሚሄድ ልጅ is a child who goes, and the ሚ is part of the present relative, not a separate who.",
          "There is no relative pronoun after the noun.",
        ],
        examples: [
          ["የሄደ ልጅ እዚህ ነው።", "yähedä ləj əzzih näw. A child who went is here."],
          ["የሚሄድ ልጅ እዚህ ነው።", "yämmihed ləj əzzih näw. A child who goes is here."],
        ],
        table: {
          caption: "The relative prefix",
          heads: ["time", "prefix", "example"],
          rows: [
            ["past", "የ", "የሄደ"],
            ["present", "የሚ", "የሚሄድ"],
          ],
        },
      },
      {
        id: "a2-copula",
        level: "A2",
        title: "The copula ነው",
        lead: "ነው agrees with the subject and closes the sentence, and it is not the verb አለ.",
        notes: [
          "እኔ ነኝ means I am, አንተ ነህ means you are when speaking to a man, and እሷ ናት means she is.",
          "አይደለም is the negative, not an unchanged ነው with a separate not in front.",
          "አለ is the verb of presence and of having, and it stays apart from ነው.",
        ],
        examples: [
          ["እኔ እዚህ ነኝ።", "əne əzzih näññ. I am here."],
          ["ሴቲቱ እዚህ ናት።", "setitu əzzih nat. The woman is here."],
        ],
        table: {
          caption: "ነው",
          heads: ["", "form"],
          rows: [
            ["እኔ", "ነኝ"],
            ["አንተ", "ነህ"],
            ["እሱ", "ነው"],
            ["እሷ", "ናት"],
            ["እኛ", "ነን"],
          ],
        },
      },
      {
        id: "b1-short",
        level: "B1",
        title: "A verb you cannot segment as Arabic",
        lead: "መጣ and አለ do not contain a tidy three-consonant root you can point at.",
        notes: [
          "መጣሁ is I came, and the person is the ending, not a vowel pattern copied from kataba.",
          "አለሁ is I am present, and አለኝ is I have, so the same little verb changes job with the suffix.",
          "Do not force either verb into an Arabic root-and-pattern table.",
        ],
        examples: [
          ["መጣሁ።", "mäṭṭahu. I came."],
          ["እኔ አለሁ።", "əne allähu. I am present."],
        ],
      },
      {
        id: "b1-question",
        level: "B1",
        title: "Questions",
        lead: "A yes-no question keeps the statement order and raises the tone, and a question word does not move the verb.",
        notes: [
          "ውሃ ትጠጣለህ with a rise is do you drink water.",
          "የት asks where, and ነህ still closes የት ነህ.",
          "ምን asks what, and it does not take a verb ending of its own.",
        ],
        examples: [
          ["ውሃ ትጠጣለህ?", "wəha təṭäṭṭalläh? Do you drink water?"],
          ["የት ነህ?", "yät näh? Where are you?"],
        ],
      },
      {
        id: "b2-subordinate",
        level: "B2",
        title: "ስለ and እንደ",
        lead: "ስለ on a verb makes a because-clause, and እንደ makes like or a that-clause.",
        notes: [
          "እሱ ስለመጣ ሄድኩ puts the reason first and the main verb last.",
          "እንደ before a noun means like, and እንደሆነ after an adjective is the that-clause of be.",
          "Neither particle is a case ending, and the verb in the main clause still agrees.",
        ],
        examples: [
          ["እሱ ስለመጣ ሄድኩ።", "əssu səlämmaṭṭa hedku. Because he came, I left."],
          ["ቤቱ ትንሽ እንደሆነ አውቃለሁ።", "betu tənniš əndähonä awqallähu. I know that the house is small."],
        ],
      },
      {
        id: "b2-polite",
        level: "B2",
        title: "Polite you",
        lead: "እርስዎ is the polite you, and አንተ stays the familiar masculine of the app's cards.",
        notes: [
          "The polite copula taught here is ነዎት.",
          "An ordinary verb takes the plural-looking u, so the polite come is ይመጣሉ.",
          "አንቺ is the familiar feminine, with ነሽ, and this lesson does not replace አንተ in the earlier sentences.",
        ],
        examples: [
          ["እርስዎ መምህር ነዎት።", "ərswo mämhər näwot. You are a teacher, polite."],
          ["አንተ መምህር ነህ።", "antä mämhər näh. You are a teacher, familiar."],
        ],
        table: {
          caption: "Familiar masculine and polite",
          heads: ["", "familiar", "polite"],
          rows: [
            ["pronoun", "አንተ", "እርስዎ"],
            ["be", "ነህ", "ነዎት"],
            ["come", "ትመጣለህ", "ይመጣሉ"],
          ],
        },
      },
    ],
    cards: [
      {
        word: "ነው",
        gloss: "näw, the copula",
        tag: "verb",
        forms: [
          ["I", "ነኝ"],
          ["you, masculine", "ነህ"],
          ["you, feminine", "ነሽ"],
          ["she", "ናት"],
          ["we", "ነን"],
        ],
      },
      {
        word: "አለ",
        gloss: "allä, be present, not ነው",
        tag: "verb",
        forms: [
          ["I", "አለሁ"],
          ["you, masculine", "አለህ"],
          ["he", "አለ"],
          ["she", "አለች"],
          ["I have", "አለኝ"],
        ],
      },
      {
        word: "መጣ",
        gloss: "mäṭṭa, he came",
        tag: "verb",
        forms: [
          ["I came", "መጣሁ"],
          ["you came", "መጣህ"],
          ["he comes", "ይመጣል"],
        ],
      },
      {
        word: "ሄደ",
        gloss: "hedä, he went",
        tag: "verb",
        forms: [
          ["I went", "ሄድኩ"],
          ["he goes", "ይሄዳል"],
          ["I go", "እሄዳለሁ"],
        ],
      },
      {
        word: "ጠጣ",
        gloss: "ṭäṭṭa, he drank",
        tag: "verb",
        forms: [
          ["I drink", "እጠጣለሁ"],
          ["I drank", "ጠጣሁ"],
          ["we drink", "እንጠጣለን"],
        ],
      },
      {
        word: "አየ",
        gloss: "ayyä, he saw",
        tag: "verb",
        forms: [
          ["I see", "አያለሁ"],
          ["I saw", "አየሁ"],
          ["he saw", "አየ"],
        ],
      },
      {
        word: "አየኝ",
        gloss: "ayyäññ, he saw me, object suffixes",
        tag: "verb",
        forms: [
          ["me", "አየኝ"],
          ["you, masculine", "አየህ"],
          ["him", "አየው"],
          ["her", "አያት"],
        ],
      },
      {
        word: "እኔ",
        gloss: "əne, pronouns",
        tag: "pronoun",
        forms: [
          ["you, masculine", "አንተ"],
          ["you, feminine", "አንቺ"],
          ["you, polite", "እርስዎ"],
          ["we", "እኛ"],
        ],
      },
    ],
  },
  arc: {
    intro: "Classical Syriac, written from right to left, builds the peal verb with suffixes in the perfect and prefixes in the imperfect.",
    lessons: [
      {
        id: "a1-perfect",
        level: "A1",
        title: "The peal perfect",
        lead: "The peal perfect adds suffixes, and the dictionary cites the third person masculine.",
        notes: [
          "ܟܬܒ is he wrote, read kthab, and that is the form to look up.",
          "Without vowels, ܟܬܒܬ is she, you, or I, so the reading in this table is what separates them.",
          "This is literary Syriac, not modern Sureth.",
        ],
        examples: [
          ["ܟܬܒ ܓܒܪܐ ܟܬܒܐ.", "kthab gabra kthaba. The man wrote a book, with the verb first."],
          ["ܟܬܒܢ ܟܬܒܐ.", "kethban kthaba. We wrote a book."],
        ],
        table: {
          caption: "Peal perfect of ܟܬܒ",
          heads: ["person", "written", "reading"],
          rows: [
            ["he", "ܟܬܒ", "kthab"],
            ["she", "ܟܬܒܬ", "kethbath"],
            ["I", "ܟܬܒܬ", "kethbeth"],
            ["we", "ܟܬܒܢ", "kethban"],
            ["they", "ܟܬܒܘ", "kthabu"],
          ],
        },
      },
      {
        id: "a1-imperfect",
        level: "A1",
        title: "The peal imperfect",
        lead: "The imperfect uses a prefix, and it is not a second past.",
        notes: [
          "ܐܟܬܘܒ is I shall write, and ܢܟܬܘܒ is he shall write.",
          "In the Western reading, we and he share the writing ܢܟܬܘܒ, and the sentence separates them.",
          "ܠܐ before the imperfect is the ordinary no, as in ܠܐ ܐܟܬܘܒ.",
        ],
        examples: [
          ["ܐܟܬܘܒ ܟܬܒܐ.", "ektob kthaba. I shall write a book."],
          ["ܠܐ ܐܟܬܘܒ.", "la ektob. I shall not write."],
        ],
        table: {
          caption: "Peal imperfect of ܟܬܒ",
          heads: ["person", "written", "reading"],
          rows: [
            ["I", "ܐܟܬܘܒ", "ektob"],
            ["you", "ܬܟܬܘܒ", "tektob"],
            ["he", "ܢܟܬܘܒ", "nektob"],
            ["we", "ܢܟܬܘܒ", "nektob, same letters as he"],
          ],
        },
      },
      {
        id: "a1-state",
        level: "A1",
        title: "States of the noun",
        lead: "Absolute, construct, and emphatic are the declension, and the emphatic is the ordinary form.",
        notes: [
          "ܓܒܪܐ, read gabra, is the emphatic, the form you meet first.",
          "The absolute and the construct of this noun share the letters ܓܒܪ, read gbar, so the job tells them apart.",
          "A definite object can take ܠ, and that ܠ is not a fourth state of the noun.",
        ],
        examples: [
          ["ܓܒܪܐ ܡܗܠܟ.", "gabra mhalek. The man is walking, emphatic noun."],
          ["ܒܝܬܐ ܙܥܘܪܐ ܐܝܬܘܗܝ.", "bayta zora ithaw. The house is small."],
        ],
        table: {
          caption: "States of man",
          heads: ["state", "form", "reading"],
          rows: [
            ["emphatic", "ܓܒܪܐ", "gabra, the ordinary noun"],
            ["construct", "ܓܒܪ", "gbar, before another noun"],
            ["absolute", "ܓܒܪ", "gbar, the bare form"],
          ],
        },
      },
      {
        id: "a2-suffix",
        level: "A2",
        title: "Pronoun suffixes on the noun",
        lead: "My, your, and his are suffixes on the noun, and the emphatic ending drops off to take them.",
        notes: [
          "ܒܝܬܐ is the house, and ܒܝܬܝ is my house.",
          "ܒܝܬܟ is your house, ܒܝܬܗ is his house, and ܒܝܬܢ is our house.",
          "These are not the subject endings of the perfect, even when a letter looks familiar.",
        ],
        examples: [
          ["ܒܝܬܝ ܐܝܬܘܗܝ.", "bayt ithaw. It is my house."],
          ["ܒܝܬܗ ܐܝܬܘܗܝ.", "bayteh ithaw. It is his house."],
        ],
        table: {
          caption: "Suffixes on house",
          heads: ["", "form"],
          rows: [
            ["my", "ܒܝܬܝ"],
            ["your", "ܒܝܬܟ"],
            ["his", "ܒܝܬܗ"],
            ["our", "ܒܝܬܢ"],
          ],
        },
      },
      {
        id: "a2-participle",
        level: "A2",
        title: "Participles",
        lead: "A peal participle plus the pronoun is a present, and it is not the perfect.",
        notes: [
          "ܟܬܒ ܐܢܐ, read kateb ana, means I am writing.",
          "The app's card for the walking man is ܓܒܪܐ ܡܗܠܟ, a participle with the noun, not a perfect of ܟܬܒ.",
          "The participle agrees in gender in careful writing, and this lesson keeps the masculine singular.",
        ],
        examples: [
          ["ܟܬܒ ܐܢܐ.", "kateb ana. I am writing."],
          ["ܓܒܪܐ ܡܗܠܟ.", "gabra mhalek. The man is walking."],
        ],
      },
      {
        id: "a2-weak",
        level: "A2",
        title: "A weak verb",
        lead: "ܚܙܐ ends in a weak letter, so its suffixes are not the suffixes of ܟܬܒ.",
        notes: [
          "ܚܙܐ is he saw, and ܚܙܝܬ is I saw.",
          "The imperfect he is ܢܚܙܐ, not a sound-verb pattern with the root swapped in.",
          "Do not force this verb into the sound table.",
        ],
        examples: [
          ["ܚܙܐ ܫܡܫܐ.", "hza shemsha. He saw the sun."],
          ["ܚܙܝܬ ܫܡܫܐ.", "hzeth shemsha. I saw the sun."],
        ],
      },
      {
        id: "b1-relative",
        level: "B1",
        title: "Relative ܕ",
        lead: "ܕ prefixes the clause that follows the noun, and it is not the participle ܕܡܝܟ.",
        notes: [
          "ܓܒܪܐ ܕܟܬܒ is the man who wrote.",
          "The ܕ is the relative particle, while ܕܡܝܟ on the app's card for the boy is a participle meaning asleep.",
          "The noun stays in the emphatic state as the ordinary head of the clause.",
        ],
        examples: [
          ["ܓܒܪܐ ܕܟܬܒ.", "gabra d-kthab. The man who wrote."],
          ["ܟܬܒܐ ܕܚܙܝܬ.", "kthaba d-hzeth. The book that I saw."],
        ],
      },
      {
        id: "b1-genitive",
        level: "B1",
        title: "Genitive with ܕ",
        lead: "ܕ between two nouns is the ordinary of, beside the older construct chain.",
        notes: [
          "ܒܝܬܐ ܕܡܠܟܐ is the house of the king, and both nouns can stay emphatic.",
          "The construct ܒܝܬ ܡܠܟܐ is the older chain, and ܕ is the one to read first.",
          "This ܕ is the same letter as the relative, and the two nouns on either side show that it is possession.",
        ],
        examples: [
          ["ܒܝܬܐ ܕܡܠܟܐ.", "bayta d-malka. The house of the king."],
          ["ܟܬܒܐ ܕܛܠܝܐ.", "kthaba d-talya. The boy's book."],
        ],
      },
      {
        id: "b2-hwa",
        level: "B2",
        title: "The irregular ܗܘܐ",
        lead: "ܗܘܐ is be in the perfect, and it does not follow ܟܬܒ.",
        notes: [
          "ܗܘܐ is he was, ܗܘܝܬ is I was, and ܗܘܬ is she was.",
          "The imperfect he is ܢܗܘܐ.",
          "ܐܝܬܝ, I am, is not a form of this perfect, and the next lesson keeps them apart.",
        ],
        examples: [
          ["ܐܢܐ ܗܘܝܬ ܗܪܟܐ.", "ena hweth harka. I was here."],
          ["ܗܘ ܗܘܐ ܡܠܟܐ.", "hu hwa malka. He was a king."],
        ],
        table: {
          caption: "ܗܘܐ, not the sound verb",
          heads: ["", "form", "reading"],
          rows: [
            ["he was", "ܗܘܐ", "hwa"],
            ["I was", "ܗܘܝܬ", "hweth"],
            ["she was", "ܗܘܬ", "hwat"],
            ["he will be", "ܢܗܘܐ", "nehwe"],
          ],
        },
      },
      {
        id: "b2-ith",
        level: "B2",
        title: "ܐܝܬ, which is not ܗܘܐ",
        lead: "ܐܝܬ with a clitic is the present of be on the app's cards, and it is not the perfect of ܗܘܐ.",
        notes: [
          "ܐܢܐ ܗܪܟܐ ܐܝܬܝ is I am here.",
          "ܐܝܬܘܗܝ is he is, and ܐܝܬܝܢ is we are.",
          "Do not rebuild these clitics as person endings on ܗܘܐ.",
        ],
        examples: [
          ["ܐܢܐ ܗܪܟܐ ܐܝܬܝ.", "ena harka ithay. I am here."],
          ["ܒܝܬܐ ܙܥܘܪܐ ܐܝܬܘܗܝ.", "bayta zora ithaw. The house is small."],
        ],
      },
    ],
    cards: [
      {
        word: "ܗܘܐ",
        gloss: "hwa, he was",
        tag: "verb",
        forms: [
          ["I was", "ܗܘܝܬ"],
          ["she was", "ܗܘܬ"],
          ["he will be", "ܢܗܘܐ"],
        ],
      },
      {
        word: "ܟܬܒ",
        gloss: "kthab, he wrote, a sound peal",
        tag: "verb",
        forms: [
          ["I wrote", "ܟܬܒܬ"],
          ["we wrote", "ܟܬܒܢ"],
          ["I shall write", "ܐܟܬܘܒ"],
          ["he shall write", "ܢܟܬܘܒ"],
        ],
      },
      {
        word: "ܒܝܬܝ",
        gloss: "bayt, my house, pronoun suffixes",
        tag: "noun",
        forms: [
          ["your", "ܒܝܬܟ"],
          ["his", "ܒܝܬܗ"],
          ["our", "ܒܝܬܢ"],
        ],
      },
      {
        word: "ܓܒܪܐ",
        gloss: "gabra, man, emphatic state",
        tag: "noun",
        forms: [
          ["emphatic", "ܓܒܪܐ"],
          ["construct or absolute", "ܓܒܪ"],
        ],
      },
      {
        word: "ܐܝܬ",
        gloss: "ith, there is, present of be",
        tag: "verb",
        forms: [
          ["I am", "ܐܝܬܝ"],
          ["you are", "ܐܝܬܝܟ"],
          ["he is", "ܐܝܬܘܗܝ"],
          ["we are", "ܐܝܬܝܢ"],
        ],
      },
      {
        word: "ܚܙܐ",
        gloss: "hza, he saw, final weak",
        tag: "verb",
        forms: [
          ["I saw", "ܚܙܝܬ"],
          ["he will see", "ܢܚܙܐ"],
          ["I see, with the pronoun", "ܚܙܐ ܐܢܐ"],
        ],
      },
      {
        word: "ܐܙܠ",
        gloss: "ezal, he went",
        tag: "verb",
        forms: [
          ["he went", "ܐܙܠ"],
          ["I went", "ܐܙܠܬ"],
        ],
      },
      {
        word: "ܟܬܒ ܐܢܐ",
        gloss: "kateb ana, participle plus pronoun",
        tag: "verb",
        forms: [
          ["I am writing", "ܟܬܒ ܐܢܐ"],
          ["the man is walking", "ܓܒܪܐ ܡܗܠܟ"],
        ],
      },
    ],
  },
};




