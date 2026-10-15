import type { GrammarCourse } from "./model";

export const WORLD: Record<string, GrammarCourse> = {
  tl: {
    intro: "Tagalog puts the predicate first, and ang marks the focus, not a Spanish subject.",
    lessons: [
      {
        id: "a1-predicate",
        level: "A1",
        title: "Predicate first",
        lead: "The predicate often comes first, and the focus follows it.",
        notes: [
          "Nandito ako starts with the place word, not with the English subject.",
          "An adjective can be the whole predicate, as in Malamig ang tubig.",
          "Nothing in that order is masculine or feminine agreement.",
        ],
        examples: [
          ["Nandito ako.", "I am here."],
          ["Malamig ang tubig.", "The water is cold."],
        ],
      },
      {
        id: "a1-markers",
        level: "A1",
        title: "Ang, ng, and sa",
        lead: "Ang, ng, and sa mark the job of a noun, and the noun itself does not decline.",
        notes: [
          "Ang marks the focus, the noun the verb affix is about, which is not simply the English subject.",
          "Ng marks the other noun, and sa marks a place or a direction.",
          "Names use si, ni, and kay in those same three jobs.",
        ],
        examples: [
          ["Kumakain kami ng tinapay.", "We are eating bread, and ng marks the bread."],
          ["Dumadating ka sa bahay.", "You are arriving at the house."],
        ],
        table: {
          caption: "The three markers",
          heads: ["job", "common", "name"],
          rows: [
            ["focus", "ang", "si"],
            ["other noun", "ng", "ni"],
            ["place", "sa", "kay"],
          ],
        },
      },
      {
        id: "a1-pronouns",
        level: "A1",
        title: "Ako, ka, siya",
        lead: "Ako, ka, and siya are the focus forms, and each has a ng form and a sa form.",
        notes: [
          "Ako is I in focus, ko is the ng form, and akin is the sa form.",
          "Ka follows the predicate, while ikaw is the free word for you.",
          "Siya is he or she with one form, because the pronoun does not mark gender.",
        ],
        examples: [
          ["Ikaw ang kaibigan ko.", "You are my friend."],
          ["Nandito siya.", "He or she is here."],
        ],
      },
      {
        id: "a2-mag-um",
        level: "A2",
        title: "Mag- against um-",
        lead: "Um- and mag- are both actor focus, and the root decides which one it takes.",
        notes: [
          "Kain takes um-: kumain, kumakain, kakain.",
          "Lakad takes mag-: naglakad, naglalakad, maglalakad.",
          "The affix shows focus and aspect, not the person, so do not swap um- and mag- to mean she.",
        ],
        examples: [
          ["Kumakain kami ng tinapay.", "We are eating bread."],
          ["Naglalakad ang lalaki.", "The man is walking."],
        ],
        table: {
          caption: "Actor focus, two roots",
          heads: ["aspect", "kain, um-", "lakad, mag-"],
          rows: [
            ["completed", "kumain", "naglakad"],
            ["imperfect", "kumakain", "naglalakad"],
            ["contemplated", "kakain", "maglalakad"],
            ["infinitive", "kumain", "maglakad"],
          ],
        },
      },
      {
        id: "a2-object",
        level: "A2",
        title: "Object focus",
        lead: "This course teaches one object-focus pattern, the kita set, and stops there.",
        notes: [
          "Nakikita ko ang araw puts ang on the thing seen.",
          "The actor is then ko, the ng form, not ako.",
          "Do not add a second focus affix on top of this pattern.",
        ],
        examples: [
          ["Nakikita ko ang araw.", "I see the sun."],
          ["Nakikita ko ang buwan.", "I see the moon."],
        ],
      },
      {
        id: "a2-already",
        level: "A2",
        title: "Already and still",
        lead: "Na means already, and pa means still, and neither one is a person ending.",
        notes: [
          "Na sits after the first part of the predicate: Kumain na ako.",
          "Pa means the situation is still going: Kumakain pa ako.",
          "Hindi pa is not yet, and it is not the same as a bare hindi.",
        ],
        examples: [
          ["Kumain na ako.", "I have already eaten."],
          ["Kumakain pa ako.", "I am still eating."],
        ],
        table: {
          caption: "Na and pa",
          heads: ["mark", "sense", "example"],
          rows: [
            ["na", "already", "Kumain na ako."],
            ["pa", "still", "Kumakain pa ako."],
            ["hindi pa", "not yet", "Hindi pa ako kumakain."],
            ["hindi", "not", "Hindi ako kumakain."],
          ],
        },
      },
      {
        id: "b1-linker",
        level: "B1",
        title: "Linker na or -ng",
        lead: "The linker joins a modifier to a noun, as -ng after a vowel and na after a consonant.",
        notes: [
          "Malaki ends in a vowel, so the linker is -ng: malaking bahay.",
          "Maliit ends in a consonant, so the linker is the word na: maliit na bahay.",
          "The linker is not the already-particle na, even though the spelling matches.",
        ],
        examples: [
          ["malaking bahay", "a big house"],
          ["maliit na bahay", "a small house"],
        ],
      },
      {
        id: "b1-question",
        level: "B1",
        title: "A question",
        lead: "Ba marks a yes-no question, and it does not flip the predicate-first order.",
        notes: [
          "Ba follows the first part of the predicate: Nandito ka ba?",
          "Ano, sino, and saan ask what, who, and where, and the focus marker stays.",
          "The verb affix does not change just because the sentence is a question.",
        ],
        examples: [
          ["Nandito ka ba?", "Are you here?"],
          ["Ano ang pangalan mo?", "What is your name?"],
        ],
        table: {
          caption: "Question words",
          heads: ["word", "asks", "example"],
          rows: [
            ["ba", "yes or no", "Nandito ka ba?"],
            ["ano", "what", "Ano ang pangalan mo?"],
            ["sino", "who", "Sino ka?"],
            ["saan", "where", "Saan ka?"],
          ],
        },
      },
      {
        id: "b2-pseudo",
        level: "B2",
        title: "Gusto and kailangan",
        lead: "Gusto and kailangan are pseudo-verbs, and the actor is the ng form.",
        notes: [
          "Gusto ko ng tinapay uses ko, not ako.",
          "Kailangan ko ng tubig works the same way, with no person ending on kailangan.",
          "Gusto kong kumain links ko to the verb with the linker -ng.",
        ],
        examples: [
          ["Gusto ko ng tinapay.", "I want bread."],
          ["Kailangan ko ng tubig.", "I need water."],
        ],
      },
      {
        id: "b2-no-gender",
        level: "B2",
        title: "Not Spanish gender",
        lead: "Tagalog has no grammatical gender, so do not treat Spanish articles or agreement as Tagalog grammar.",
        notes: [
          "Ang is a focus marker, not a masculine or feminine article.",
          "Maliit stays maliit for lalaki and for babae, because the adjective does not agree.",
          "A Spanish loan such as mesa does not bring el or la with it.",
        ],
        examples: [
          ["Maliit ang lalaki.", "The man is small."],
          ["Maliit ang babae.", "The woman is small, with the same adjective."],
        ],
        table: {
          caption: "What not to import",
          heads: ["Spanish habit", "Tagalog", "job"],
          rows: [
            ["el or la", "ang", "focus"],
            ["gendered adjective", "maliit", "no agreement"],
            ["noun gender", "none", "lalaki and babae are nouns"],
          ],
        },
      },
    ],
    cards: [
      {
        word: "ako",
        gloss: "I, focus form",
        tag: "pronoun",
        forms: [
          ["focus", "ako"],
          ["ng", "ko"],
          ["sa", "akin"],
          ["exclusive we", "kami"],
        ],
      },
      {
        word: "ka",
        gloss: "you, after the predicate",
        tag: "pronoun",
        forms: [
          ["enclitic", "ka"],
          ["free", "ikaw"],
          ["ng", "mo"],
          ["sa", "iyo"],
        ],
      },
      {
        word: "siya",
        gloss: "he or she, one form",
        tag: "pronoun",
        forms: [
          ["focus", "siya"],
          ["ng", "niya"],
          ["sa", "kanya"],
          ["they", "sila"],
        ],
      },
      {
        word: "ang",
        gloss: "focus marker",
        tag: "particle",
        forms: [
          ["common", "ang"],
          ["name", "si"],
          ["plural people", "ang mga"],
          ["example", "ang tubig"],
        ],
      },
      {
        word: "ng",
        gloss: "non-focus noun marker",
        tag: "particle",
        forms: [
          ["common", "ng"],
          ["name", "ni"],
          ["object", "ng tinapay"],
          ["actor out of focus", "ko"],
        ],
      },
      {
        word: "sa",
        gloss: "place or direction",
        tag: "particle",
        forms: [
          ["place", "sa"],
          ["name", "kay"],
          ["house", "sa bahay"],
          ["toward a name", "kay Ana"],
        ],
      },
      {
        word: "kain",
        gloss: "eat, um- actor focus",
        tag: "verb",
        forms: [
          ["completed", "kumain"],
          ["imperfect", "kumakain"],
          ["contemplated", "kakain"],
          ["infinitive", "kumain"],
        ],
      },
      {
        word: "lakad",
        gloss: "walk, mag- actor focus",
        tag: "verb",
        forms: [
          ["completed", "naglakad"],
          ["imperfect", "naglalakad"],
          ["contemplated", "maglalakad"],
          ["infinitive", "maglakad"],
        ],
      },
      {
        word: "na",
        gloss: "already, not the linker",
        tag: "particle",
        forms: [
          ["already", "na"],
          ["still", "pa"],
          ["not yet", "hindi pa"],
          ["example", "Kumain na ako."],
        ],
      },
      {
        word: "gusto",
        gloss: "want, pseudo-verb",
        tag: "verb",
        forms: [
          ["want", "gusto"],
          ["need", "kailangan"],
          ["not want", "ayaw"],
          ["with ng actor", "gusto ko"],
        ],
      },
    ],
  },
  th: {
    intro: "Thai does not conjugate, words are not spaced, and a classifier is required once you count.",
    lessons: [
      {
        id: "a1-shape",
        level: "A1",
        title: "No spaces, and no endings",
        lead: "The verb has one shape for every person, and Thai script does not put spaces between words.",
        notes: [
          "ฉันเห็น and คุณเห็น and เขาเห็น use the same เห็น.",
          "A tone is part of the word, so the reading in the gloss is where the tone is written.",
          "Do not add an ending for she, and do not insert spaces to match English words.",
        ],
        examples: [
          ["ฉันอยู่ที่นี่", "chǎn yûu thîi nîi, I am here."],
          ["ฉันเห็นพระอาทิตย์", "chǎn hěn phrá-aa-thít, I see the sun."],
        ],
      },
      {
        id: "a1-classifier",
        level: "A1",
        title: "A classifier with a number",
        lead: "A number needs a classifier, and the noun does not take a plural ending instead.",
        notes: [
          "The usual order is noun, number, classifier, as in น้ำหนึ่งแก้ว.",
          "คน classifies people, หลัง classifies houses, แก้ว classifies glasses, and เล่ม classifies books.",
          "Skipping the classifier once you count is a grammar mistake, not a short cut.",
        ],
        examples: [
          ["น้ำหนึ่งแก้ว", "náam nʉ̀ng gɛ̀ɛo, one glass of water."],
          ["บ้านหนึ่งหลัง", "bâan nʉ̀ng lǎng, one house."],
        ],
        table: {
          caption: "Classifier with the noun",
          heads: ["noun", "classifier", "count"],
          rows: [
            ["คน", "คน", "สองคน"],
            ["บ้าน", "หลัง", "หนึ่งหลัง"],
            ["น้ำ", "แก้ว", "หนึ่งแก้ว"],
            ["หนังสือ", "เล่ม", "หนึ่งเล่ม"],
          ],
        },
      },
      {
        id: "a1-mai",
        level: "A1",
        title: "ไม่",
        lead: "ไม่ before the verb is the simple no, and ไม่ได้ is a different no.",
        notes: [
          "ไม่กิน means does not eat, and the verb stays กิน.",
          "ไม่ได้กิน, with ไม่ได้ before the verb, is did not get to eat, while กินไม่ได้, with ได้ after, is cannot eat.",
          "ยังไม่ is not yet, so it is not the same sentence as a bare ไม่.",
        ],
        examples: [
          ["ฉันไม่กิน", "chǎn mâi gin, I do not eat."],
          ["ฉันกินไม่ได้", "chǎn gin mâi dâai, I cannot eat."],
        ],
      },
      {
        id: "a2-polite",
        level: "A2",
        title: "ค่ะ and ครับ",
        lead: "ค่ะ and ครับ close a careful sentence and mark the speaker, not the noun.",
        notes: [
          "ค่ะ is the particle a woman speaker uses, and ครับ is the one a man speaker uses.",
          "They are not verb endings, and they do not agree with บ้าน or with น้ำ.",
          "The verb is still one shape whether the particle is there or not.",
        ],
        examples: [
          ["ฉันอยู่ที่นี่ค่ะ", "chǎn yûu thîi nîi khâ, I am here, woman speaking."],
          ["ฉันอยู่ที่นี่ครับ", "chǎn yûu thîi nîi khráp, I am here, man speaking."],
        ],
        table: {
          caption: "The polite particle follows the speaker",
          heads: ["speaker", "particle", "tone"],
          rows: [
            ["woman", "ค่ะ", "khâ, falling"],
            ["man", "ครับ", "khráp, high"],
          ],
        },
      },
      {
        id: "a2-thii",
        level: "A2",
        title: "ที่ for a relative",
        lead: "ที่ before a clause makes a relative, and it is the same spelling as the place word.",
        notes: [
          "คนที่เดิน is the person who walks.",
          "บ้านที่เล็ก is the house that is small, and เล็ก still needs no copula.",
          "ที่ does not change for number or for the person inside the clause.",
        ],
        examples: [
          ["คนที่เดิน", "khon thîi doen, the person who walks."],
          ["บ้านที่เล็ก", "bâan thîi lék, the house that is small."],
        ],
      },
      {
        id: "a2-yang",
        level: "A2",
        title: "ยัง and แล้ว",
        lead: "ยัง is still or, with ไม่, not yet, and แล้ว is already.",
        notes: [
          "ยังกิน means still eating.",
          "ยังไม่กิน means not yet eating, which is not the same as ไม่กิน.",
          "กินแล้ว means already ate, and แล้ว does not conjugate.",
        ],
        examples: [
          ["ฉันยังไม่กิน", "chǎn yang mâi gin, I have not eaten yet."],
          ["ฉันกินแล้ว", "chǎn gin lɛ́ɛo, I have already eaten."],
        ],
        table: {
          caption: "ยัง, ไม่, and แล้ว",
          heads: ["mark", "example", "sense"],
          rows: [
            ["ยัง", "ยังกิน", "still"],
            ["ยังไม่", "ยังไม่กิน", "not yet"],
            ["แล้ว", "กินแล้ว", "already"],
            ["ไม่", "ไม่กิน", "not"],
          ],
        },
      },
      {
        id: "b1-copula",
        level: "B1",
        title: "เป็น against คือ",
        lead: "เป็น puts a noun in a class, and คือ identifies, while an adjective needs neither.",
        notes: [
          "คุณเป็นเพื่อนของฉัน uses เป็น for a role or a class.",
          "นี่คือเพื่อนของฉัน uses คือ to identify which thing this is.",
          "น้ำเย็น and บ้านเล็ก are complete, because an adjective is already a predicate.",
        ],
        examples: [
          ["คุณเป็นเพื่อนของฉัน", "khun bpen phʉ̂an khɔ̌ɔng chǎn, You are my friend."],
          ["นี่คือเพื่อนของฉัน", "nîi khʉʉ phʉ̂an khɔ̌ɔng chǎn, This is my friend."],
        ],
      },
      {
        id: "b1-serial",
        level: "B1",
        title: "A serial verb",
        lead: "Two verbs can sit together with no word between them and no ending on either.",
        notes: [
          "ไปกิน means go and eat, and both verbs stay in the dictionary shape.",
          "มานั่ง means come and sit.",
          "There is still no person ending on the first verb or the second.",
        ],
        examples: [
          ["ฉันไปกินข้าว", "chǎn bpai gin khâao, I go and eat rice."],
          ["คุณมานั่ง", "khun maa nâng, You come and sit."],
        ],
        table: {
          caption: "Two verbs, one shape each",
          heads: ["series", "reading", "sense"],
          rows: [
            ["ไปกิน", "bpai gin", "go eat"],
            ["มานั่ง", "maa nâng", "come sit"],
            ["ไปซื้อ", "bpai sʉ́ʉ", "go buy"],
          ],
        },
      },
      {
        id: "b2-compare",
        level: "B2",
        title: "Comparison",
        lead: "กว่า after the adjective compares, and the adjective still does not agree.",
        notes: [
          "เล็กกว่า means smaller than whatever follows.",
          "บ้านนี้เล็กกว่าบ้านนั้น needs no extra ending on เล็ก.",
          "มาก after an adjective is degree, not a comparative ending.",
        ],
        examples: [
          ["บ้านนี้เล็กกว่า", "bâan nîi lék kwàa, This house is smaller."],
          ["น้ำนี้เย็นกว่า", "náam nîi yen kwàa, This water is colder."],
        ],
      },
      {
        id: "b2-mai-question",
        level: "B2",
        title: "ไหม, said honestly",
        lead: "ไหม at the end makes a yes-no question, and it is not the word ไม่.",
        notes: [
          "ไหม is rising mǎi, while ไม่ is falling mâi, so they are different words.",
          "ไหม does not mark tense, person, or the speaker, and it is not a verb ending.",
          "คะ or ครับ can still follow it, because politeness is a separate particle.",
        ],
        examples: [
          ["คุณกินไหม", "khun gin mǎi, Do you eat?"],
          ["คุณอยู่ที่นี่ไหม", "khun yûu thîi nîi mǎi, Are you here?"],
        ],
        table: {
          caption: "Two words learners mix",
          heads: ["word", "tone", "job"],
          rows: [
            ["ไม่", "mâi, falling", "not"],
            ["ไหม", "mǎi, rising", "yes-no question"],
            ["ค่ะ", "khâ, falling", "polite, woman speaking"],
            ["ครับ", "khráp, high", "polite, man speaking"],
          ],
        },
      },
    ],
    cards: [
      {
        word: "ไม่",
        gloss: "not, before the verb",
        tag: "particle",
        forms: [
          ["not", "ไม่"],
          ["not yet", "ยังไม่"],
          ["did not", "ไม่ได้กิน"],
          ["cannot", "กินไม่ได้"],
        ],
      },
      {
        word: "ยัง",
        gloss: "still, or not yet with ไม่",
        tag: "particle",
        forms: [
          ["still", "ยัง"],
          ["not yet", "ยังไม่"],
          ["still eating", "ยังกิน"],
          ["not yet eating", "ยังไม่กิน"],
        ],
      },
      {
        word: "แล้ว",
        gloss: "already",
        tag: "particle",
        forms: [
          ["already", "แล้ว"],
          ["ate", "กินแล้ว"],
          ["saw", "เห็นแล้ว"],
          ["came", "มาแล้ว"],
        ],
      },
      {
        word: "ค่ะ",
        gloss: "polite close, woman speaking",
        tag: "particle",
        forms: [
          ["particle", "ค่ะ"],
          ["here", "อยู่ที่นี่ค่ะ"],
          ["not the noun", "ค่ะ"],
          ["after ไหม", "ไหมคะ"],
        ],
      },
      {
        word: "ครับ",
        gloss: "polite close, man speaking",
        tag: "particle",
        forms: [
          ["particle", "ครับ"],
          ["here", "อยู่ที่นี่ครับ"],
          ["not the noun", "ครับ"],
          ["after ไหม", "ไหมครับ"],
        ],
      },
      {
        word: "ที่",
        gloss: "relative, also a place word",
        tag: "particle",
        forms: [
          ["relative", "ที่"],
          ["who walks", "คนที่เดิน"],
          ["that is small", "บ้านที่เล็ก"],
          ["place", "ที่นี่"],
        ],
      },
      {
        word: "เป็น",
        gloss: "be, for a class or role",
        tag: "verb",
        forms: [
          ["class", "เป็น"],
          ["friend", "เป็นเพื่อน"],
          ["not คือ", "เป็น"],
          ["no ending", "เป็น"],
        ],
      },
      {
        word: "คือ",
        gloss: "be, for identity",
        tag: "verb",
        forms: [
          ["identity", "คือ"],
          ["this is", "นี่คือ"],
          ["not เป็น", "คือ"],
          ["no ending", "คือ"],
        ],
      },
      {
        word: "คน",
        gloss: "classifier for people",
        tag: "classifier",
        forms: [
          ["classifier", "คน"],
          ["one", "หนึ่งคน"],
          ["two", "สองคน"],
          ["with noun", "คนสองคน"],
        ],
      },
      {
        word: "แก้ว",
        gloss: "classifier for glasses",
        tag: "classifier",
        forms: [
          ["classifier", "แก้ว"],
          ["one glass", "หนึ่งแก้ว"],
          ["of water", "น้ำหนึ่งแก้ว"],
          ["not optional", "หนึ่งแก้ว"],
        ],
      },
    ],
  },
  vi: {
    intro: "Vietnamese does not conjugate, each syllable is spaced, and the tone mark is part of the word.",
    lessons: [
      {
        id: "a1-tone",
        level: "A1",
        title: "Tone marks are part of the word",
        lead: "Each syllable is written apart, and a missing tone mark is a different word.",
        notes: [
          "Ma, má, mà, mả, mã, and mạ are six words, not one word with decoration.",
          "Tôi ở đây keeps the hỏi mark on ở, and you cannot leave it off.",
          "The verb does not add an ending beside that tone.",
        ],
        examples: [
          ["Tôi ở đây.", "I am here."],
          ["Nước lạnh.", "The water is cold."],
        ],
      },
      {
        id: "a1-la",
        level: "A1",
        title: "Là, and when it drops",
        lead: "Là links two nouns, and an adjective or a place does not need it.",
        notes: [
          "Bạn là bạn của tôi uses là because both sides are nouns.",
          "Nước lạnh and Cửa đang mở have no là, because an adjective or a state is already the predicate.",
          "Ở đây is a place predicate and does not take là either.",
        ],
        examples: [
          ["Bạn là bạn của tôi.", "You are my friend."],
          ["Cửa đang mở.", "The door is open."],
        ],
        table: {
          caption: "When là stays",
          heads: ["predicate", "là", "example"],
          rows: [
            ["noun", "yes", "Bạn là bạn của tôi."],
            ["adjective", "no", "Nước lạnh."],
            ["place", "no", "Tôi ở đây."],
            ["state", "no", "Cửa đang mở."],
          ],
        },
      },
      {
        id: "a1-classifier",
        level: "A1",
        title: "A classifier",
        lead: "A number takes a classifier, and the noun does not grow a plural ending instead.",
        notes: [
          "Một ngôi nhà uses ngôi for a building, and một cốc nước uses cốc for a glass.",
          "Người stands with a person, as in người phụ nữ, and con stands with many animals.",
          "Những or các can mark a plural, and they are optional when the sentence is already clear.",
        ],
        examples: [
          ["Một ngôi nhà.", "One house."],
          ["Một cốc nước.", "One glass of water."],
        ],
      },
      {
        id: "a2-khong",
        level: "A2",
        title: "Không against chưa",
        lead: "Không is not, and chưa is not yet, and they are not interchangeable.",
        notes: [
          "Tôi không ăn means I do not eat.",
          "Tôi chưa ăn means I have not eaten yet.",
          "Không phải negates identity, and không có negates having, so one không does not cover every sentence.",
        ],
        examples: [
          ["Tôi không ăn.", "I do not eat."],
          ["Tôi chưa ăn.", "I have not eaten yet."],
        ],
        table: {
          caption: "Two negators",
          heads: ["word", "sense", "example"],
          rows: [
            ["không", "not", "không thấy"],
            ["chưa", "not yet", "chưa thấy"],
            ["không phải", "not this identity", "không phải bạn"],
            ["không có", "not have", "không có nước"],
          ],
        },
      },
      {
        id: "a2-roi",
        level: "A2",
        title: "Rồi",
        lead: "Rồi at the end marks completion, and the verb in front of it does not change.",
        notes: [
          "Tôi ăn rồi means the eating is done.",
          "Đã before the verb can also mark completion, and rồi is the piece that sits at the end.",
          "Rồi is not a past ending glued onto ăn.",
        ],
        examples: [
          ["Tôi ăn rồi.", "I have already eaten."],
          ["Bạn đến rồi.", "You have arrived."],
        ],
      },
      {
        id: "a2-duoc",
        level: "A2",
        title: "Được and bị",
        lead: "Được marks a welcome outcome or permission, and bị marks an unwelcome one.",
        notes: [
          "Tôi được nghỉ means I get to rest.",
          "Tôi bị ốm means sickness happened to me.",
          "Neither word is a person ending, and the main verb stays as it is.",
        ],
        examples: [
          ["Tôi được nghỉ.", "I get to rest."],
          ["Tôi bị ốm.", "I got sick."],
        ],
        table: {
          caption: "Được against bị",
          heads: ["word", "slant", "example"],
          rows: [
            ["được", "welcome or allowed", "được nghỉ"],
            ["bị", "unwelcome", "bị ốm"],
            ["không được", "not allowed", "không được đi"],
          ],
        },
      },
      {
        id: "b1-ma",
        level: "B1",
        title: "Relative mà",
        lead: "Mà introduces a relative clause, and the verb inside it still does not change.",
        notes: [
          "Người mà tôi thấy is the person whom I see.",
          "Ngôi nhà mà bạn thích is the house that you like, and ngôi stays the classifier.",
          "Mà is not a case ending on người or on nhà.",
        ],
        examples: [
          ["Người mà tôi thấy.", "The person whom I see."],
          ["Ngôi nhà mà bạn thích.", "The house that you like."],
        ],
      },
      {
        id: "b1-compare",
        level: "B1",
        title: "Comparison",
        lead: "Hơn after the adjective compares, and the adjective does not agree.",
        notes: [
          "Nhỏ hơn means smaller.",
          "Nhà này nhỏ hơn nhà kia needs no ending on nhỏ.",
          "Rất before the adjective is degree, not a comparative.",
        ],
        examples: [
          ["Nhà này nhỏ hơn.", "This house is smaller."],
          ["Nước này lạnh hơn.", "This water is colder."],
        ],
        table: {
          caption: "Hơn",
          heads: ["adjective", "comparative", "example"],
          rows: [
            ["nhỏ", "nhỏ hơn", "Nhà này nhỏ hơn."],
            ["lạnh", "lạnh hơn", "Nước này lạnh hơn."],
            ["nóng", "nóng hơn", "Lửa này nóng hơn."],
          ],
        },
      },
      {
        id: "b2-serial",
        level: "B2",
        title: "A serial verb",
        lead: "Two verbs can follow one subject, and neither verb takes a person ending.",
        notes: [
          "Tôi đi mua bánh mì means I go and buy bread.",
          "Chúng tôi ngồi ăn means we sit and eat.",
          "The tones stay on each syllable, and no ending is added between the verbs.",
        ],
        examples: [
          ["Tôi đi mua bánh mì.", "I go and buy bread."],
          ["Chúng tôi ngồi ăn.", "We sit and eat."],
        ],
      },
      {
        id: "b2-pronouns",
        level: "B2",
        title: "Tôi, bạn, anh, chị",
        lead: "Tôi, bạn, anh, and chị encode the speaker's relation, not European gender agreement.",
        notes: [
          "Tôi is the I of these cards, and bạn is the peer you.",
          "Anh addresses a man who is older or a peer, and chị addresses a woman in that same social place.",
          "Adjectives do not agree with anh or chị, so this set is not a gender system.",
        ],
        examples: [
          ["Tôi thấy anh.", "I see you, said to a man."],
          ["Chị là bạn của tôi.", "She is my friend, said of an older woman."],
        ],
        table: {
          caption: "One careful set",
          heads: ["word", "who", "not"],
          rows: [
            ["tôi", "I, neutral", "not a gender ending"],
            ["bạn", "you, peer", "not she"],
            ["anh", "you or he, older man", "not masculine agreement"],
            ["chị", "you or she, older woman", "not feminine agreement"],
          ],
        },
      },
    ],
    cards: [
      {
        word: "không",
        gloss: "not",
        tag: "particle",
        forms: [
          ["not", "không"],
          ["not see", "không thấy"],
          ["not identity", "không phải"],
          ["not have", "không có"],
        ],
      },
      {
        word: "chưa",
        gloss: "not yet",
        tag: "particle",
        forms: [
          ["not yet", "chưa"],
          ["not yet eat", "chưa ăn"],
          ["not yet see", "chưa thấy"],
          ["not không", "chưa"],
        ],
      },
      {
        word: "rồi",
        gloss: "completion at the end",
        tag: "particle",
        forms: [
          ["done", "rồi"],
          ["eaten", "ăn rồi"],
          ["arrived", "đến rồi"],
          ["seen", "thấy rồi"],
        ],
      },
      {
        word: "là",
        gloss: "be, for identity",
        tag: "verb",
        forms: [
          ["identity", "là"],
          ["you are", "bạn là"],
          ["this is", "đây là"],
          ["drops with cold", "nước lạnh"],
        ],
      },
      {
        word: "ngôi",
        gloss: "classifier for buildings",
        tag: "classifier",
        forms: [
          ["house", "ngôi nhà"],
          ["one", "một ngôi nhà"],
          ["small", "ngôi nhà nhỏ"],
          ["person is người", "người phụ nữ"],
        ],
      },
      {
        word: "cốc",
        gloss: "classifier for a glass",
        tag: "classifier",
        forms: [
          ["glass", "cốc"],
          ["of water", "một cốc nước"],
          ["book", "một cuốn sách"],
          ["fruit", "quả táo"],
        ],
      },
      {
        word: "tôi",
        gloss: "I, neutral",
        tag: "pronoun",
        forms: [
          ["I", "tôi"],
          ["here", "tôi ở đây"],
          ["see", "tôi thấy"],
          ["my", "của tôi"],
        ],
      },
      {
        word: "bạn",
        gloss: "you, peer",
        tag: "pronoun",
        forms: [
          ["you", "bạn"],
          ["are", "bạn là"],
          ["come", "bạn đến"],
          ["not a gender", "bạn"],
        ],
      },
      {
        word: "anh",
        gloss: "older or peer man, as address",
        tag: "pronoun",
        forms: [
          ["address", "anh"],
          ["I see you", "tôi thấy anh"],
          ["not agreement", "anh"],
          ["pair", "chị"],
        ],
      },
      {
        word: "được",
        gloss: "get to, or a welcome passive",
        tag: "particle",
        forms: [
          ["get to", "được"],
          ["rest", "được nghỉ"],
          ["not allowed", "không được"],
          ["unwelcome is bị", "bị"],
        ],
      },
    ],
  },
  id: {
    intro: "Indonesian has no gender and no person ending, and affixes build words from a root.",
    lessons: [
      {
        id: "a1-no-ending",
        level: "A1",
        title: "No endings on the verb",
        lead: "The verb stays one shape for saya, kamu, and dia.",
        notes: [
          "Saya melihat, kamu datang, and dia makan do not add a person ending.",
          "Sedang before the verb marks an action in progress, and akan or mau marks a plan.",
          "Do not add -s for dia.",
        ],
        examples: [
          ["Saya di sini.", "I am here."],
          ["Saya melihat matahari.", "I see the sun."],
        ],
      },
      {
        id: "a1-tidak",
        level: "A1",
        title: "Tidak against bukan",
        lead: "Tidak negates a verb or an adjective, and bukan negates a noun.",
        notes: [
          "Saya tidak makan uses tidak because makan is a verb.",
          "Itu bukan rumah uses bukan because rumah is a noun.",
          "Air itu tidak dingin takes tidak, because an adjective is not a noun.",
        ],
        examples: [
          ["Saya tidak makan.", "I do not eat."],
          ["Itu bukan rumah.", "That is not a house."],
        ],
        table: {
          caption: "Tidak and bukan",
          heads: ["word", "negates", "example"],
          rows: [
            ["tidak", "verb", "tidak makan"],
            ["tidak", "adjective", "tidak dingin"],
            ["bukan", "noun", "bukan rumah"],
            ["jangan", "a command", "jangan makan"],
          ],
        },
      },
      {
        id: "a1-men",
        level: "A1",
        title: "MeN- and the noun",
        lead: "MeN- builds an active verb, and the noun object follows it.",
        notes: [
          "Lihat becomes melihat, and saya melihat matahari puts the noun after the verb.",
          "A root in t, s, p, or k may lose that consonant, so tulis becomes menulis.",
          "Makan, minum, and pergi do not take meN- in the basic sentence.",
        ],
        examples: [
          ["Saya melihat matahari.", "I see the sun."],
          ["Saya menulis buku.", "I write a book."],
        ],
      },
      {
        id: "a2-di",
        level: "A2",
        title: "Di- for a passive",
        lead: "Di- on the root makes a passive, and the verb still does not mark person.",
        notes: [
          "Roti itu dimakan means the bread is eaten.",
          "The actor, if you name one, follows as a phrase, and dia does not put an ending on di-.",
          "Di as a separate word means at, which is not the prefix di-.",
        ],
        examples: [
          ["Roti itu dimakan.", "The bread is eaten."],
          ["Surat itu ditulis.", "The letter is written."],
        ],
        table: {
          caption: "Active meN- and passive di-",
          heads: ["root", "active", "passive"],
          rows: [
            ["lihat", "melihat", "dilihat"],
            ["tulis", "menulis", "ditulis"],
            ["makan", "makan", "dimakan"],
          ],
        },
      },
      {
        id: "a2-ber",
        level: "A2",
        title: "Ber-",
        lead: "Ber- builds a verb of having or of doing, and it is not a person ending.",
        notes: [
          "Jalan becomes berjalan, as in Laki-laki itu sedang berjalan.",
          "Ber- can also mean having, but the basic walk verb is the one to learn first.",
          "Saya berjalan and dia berjalan are the same verb.",
        ],
        examples: [
          ["Laki-laki itu sedang berjalan.", "The man is walking."],
          ["Kami berjalan.", "We walk."],
        ],
      },
      {
        id: "a2-redup",
        level: "A2",
        title: "Reduplication",
        lead: "A plural can be the word said twice, and it is not an -s.",
        notes: [
          "Rumah-rumah means houses.",
          "The doubling is optional when a number or itu already shows which houses you mean.",
          "Do not write rumahs.",
        ],
        examples: [
          ["rumah-rumah", "houses"],
          ["Rumah itu kecil.", "That house is small, with no doubling."],
        ],
        table: {
          caption: "Plural by doubling",
          heads: ["one", "many", "not"],
          rows: [
            ["rumah", "rumah-rumah", "rumahs"],
            ["buku", "buku-buku", "bukus"],
            ["orang", "orang-orang", "orangs"],
          ],
        },
      },
      {
        id: "b1-yang",
        level: "B1",
        title: "Yang as the relative",
        lead: "Yang turns the next words into a relative clause.",
        notes: [
          "Rumah yang kecil is the house that is small.",
          "Orang yang datang is the person who comes, and datang does not change.",
          "Yang is not an article and not a gender marker.",
        ],
        examples: [
          ["Rumah yang kecil.", "The house that is small."],
          ["Orang yang datang.", "The person who comes."],
        ],
      },
      {
        id: "b1-sudah",
        level: "B1",
        title: "Sudah and belum",
        lead: "Sudah is already, and belum is not yet.",
        notes: [
          "Saya sudah makan means I have already eaten.",
          "Saya belum makan means I have not eaten yet.",
          "Belum is the pair of sudah, while tidak is the plain no.",
        ],
        examples: [
          ["Saya sudah makan.", "I have already eaten."],
          ["Saya belum makan.", "I have not eaten yet."],
        ],
        table: {
          caption: "Time is a word in front",
          heads: ["mark", "example", "job"],
          rows: [
            ["plain", "saya makan", "the action"],
            ["sedang", "sedang berjalan", "in progress"],
            ["sudah", "sudah makan", "already"],
            ["belum", "belum makan", "not yet"],
          ],
        },
      },
      {
        id: "b2-ter",
        level: "B2",
        title: "Ter- for an accidental",
        lead: "Ter- can mark an accident or a state you did not plan.",
        notes: [
          "Saya tertidur means I fell asleep, not that I performed a careful verb of sleeping.",
          "Pintu itu terbuka is the door in an open state, the same prefix in a stative use.",
          "Ter- is still not a person ending.",
        ],
        examples: [
          ["Saya tertidur.", "I fell asleep."],
          ["Pintu itu terbuka.", "The door is open."],
        ],
      },
      {
        id: "b2-ke-an",
        level: "B2",
        title: "A ke- -an noun",
        lead: "Ke- and -an together build a noun from a root.",
        notes: [
          "Ada becomes keadaan, the state of things.",
          "Sehat becomes kesehatan, and the result is a noun, not a conjugated verb.",
          "Learn the pair as a word, rather than adding the frame to every root at once.",
        ],
        examples: [
          ["keadaan", "a state or condition"],
          ["kesehatan", "health"],
        ],
        table: {
          caption: "Ke- -an",
          heads: ["root", "noun", "sense"],
          rows: [
            ["ada", "keadaan", "condition"],
            ["sehat", "kesehatan", "health"],
            ["aman", "keamanan", "safety"],
            ["satu", "kesatuan", "a unit"],
          ],
        },
      },
    ],
    cards: [
      {
        word: "tidak",
        gloss: "not, for a verb or adjective",
        tag: "particle",
        forms: [
          ["not", "tidak"],
          ["not eat", "tidak makan"],
          ["not cold", "tidak dingin"],
          ["not a noun", "tidak"],
        ],
      },
      {
        word: "bukan",
        gloss: "not, for a noun",
        tag: "particle",
        forms: [
          ["not a noun", "bukan"],
          ["not a house", "bukan rumah"],
          ["not a friend", "bukan teman"],
          ["not tidak", "bukan"],
        ],
      },
      {
        word: "sudah",
        gloss: "already",
        tag: "particle",
        forms: [
          ["already", "sudah"],
          ["ate", "sudah makan"],
          ["saw", "sudah melihat"],
          ["not yet is belum", "belum"],
        ],
      },
      {
        word: "belum",
        gloss: "not yet",
        tag: "particle",
        forms: [
          ["not yet", "belum"],
          ["not yet eat", "belum makan"],
          ["not yet come", "belum datang"],
          ["not tidak", "belum"],
        ],
      },
      {
        word: "yang",
        gloss: "relative",
        tag: "particle",
        forms: [
          ["relative", "yang"],
          ["small", "yang kecil"],
          ["who comes", "yang datang"],
          ["the house", "rumah yang kecil"],
        ],
      },
      {
        word: "saya",
        gloss: "I",
        tag: "pronoun",
        forms: [
          ["I", "saya"],
          ["friend you", "kamu"],
          ["formal you", "Anda"],
          ["he or she", "dia"],
        ],
      },
      {
        word: "meN-",
        gloss: "active verb builder",
        tag: "particle",
        forms: [
          ["lihat", "melihat"],
          ["tulis", "menulis"],
          ["makan stays", "makan"],
          ["pergi stays", "pergi"],
        ],
      },
      {
        word: "di-",
        gloss: "passive prefix",
        tag: "particle",
        forms: [
          ["lihat", "dilihat"],
          ["tulis", "ditulis"],
          ["makan", "dimakan"],
          ["at is a word", "di rumah"],
        ],
      },
      {
        word: "ber-",
        gloss: "do or have",
        tag: "particle",
        forms: [
          ["jalan", "berjalan"],
          ["kata", "berkata"],
          ["main", "bermain"],
          ["no person", "berjalan"],
        ],
      },
      {
        word: "ter-",
        gloss: "accidental or stative",
        tag: "particle",
        forms: [
          ["sleep", "tertidur"],
          ["fall", "terjatuh"],
          ["open", "terbuka"],
          ["late", "terlambat"],
        ],
      },
    ],
  },
  mg: {
    intro: "Malagasy puts the predicate first, and the person follows it as a pronoun.",
    lessons: [
      {
        id: "a1-predicate",
        level: "A1",
        title: "The predicate comes first",
        lead: "The word you are looking for often comes first, and the pronoun follows.",
        notes: [
          "Eto aho starts with here, not with I.",
          "Mandeha ilay lehilahy starts with the walking.",
          "That order is ordinary, not a special emphasis.",
        ],
        examples: [
          ["Eto aho.", "I am here."],
          ["Mandeha ilay lehilahy.", "The man is walking."],
        ],
      },
      {
        id: "a1-tsy",
        level: "A1",
        title: "Tsy is the no",
        lead: "Tsy before the predicate is the no.",
        notes: [
          "Tsy eto aho means I am not here.",
          "Tsy mandeha aho means I am not walking.",
          "Tsy does not take a person ending of its own.",
        ],
        examples: [
          ["Tsy eto aho.", "I am not here."],
          ["Tsy mandeha aho.", "I am not walking."],
        ],
        table: {
          caption: "Tsy before the predicate",
          heads: ["yes", "no"],
          rows: [
            ["Eto aho.", "Tsy eto aho."],
            ["Mandeha aho.", "Tsy mandeha aho."],
            ["Mahita aho.", "Tsy mahita aho."],
          ],
        },
      },
      {
        id: "a1-pronouns",
        level: "A1",
        title: "Pronouns",
        lead: "Aho, ianao, izy, and izahay sit after the predicate, and they do not change the verb.",
        notes: [
          "Aho is I, ianao is you, and izy is he or she with one form.",
          "Izahay is we excluding the listener.",
          "There is no gender agreement on the verb or the adjective.",
        ],
        examples: [
          ["Eto aho.", "I am here."],
          ["Mihinana mofo izahay.", "We eat bread."],
        ],
      },
      {
        id: "a2-prefix",
        level: "A2",
        title: "A verb with a prefix",
        lead: "A prefix such as mi- or ma- builds the verb, and the person stays a pronoun.",
        notes: [
          "Mihinana and mandeha and mahita are built with a prefix on a root.",
          "The pronoun after them does not add a second ending to the verb.",
          "Tonga and avy do not take that m- prefix in the basic sentence.",
        ],
        examples: [
          ["Mahita ny masoandro aho.", "I see the sun."],
          ["Mihinana mofo izahay.", "We eat bread."],
        ],
        table: {
          caption: "Prefix, then the pronoun",
          heads: ["verb", "shape", "person"],
          rows: [
            ["see", "mahita", "aho after it"],
            ["eat", "mihinana", "izahay after it"],
            ["walk", "mandeha", "no person ending"],
            ["come", "tonga", "no m-"],
          ],
        },
      },
      {
        id: "a2-tense",
        level: "A2",
        title: "Tense particles",
        lead: "On this class of verbs, m- is present, n- is past, and h- is future.",
        notes: [
          "Mandeha, nandeha, and handeha keep the rest of the word and change the first letter.",
          "Matory, natory, and hatory work the same way.",
          "Tonga does not become matonga, so learn which verbs refuse the prefix.",
        ],
        examples: [
          ["Nandeha aho.", "I went."],
          ["Tonga any an-trano ianao.", "You arrive at the house."],
        ],
      },
      {
        id: "a2-definite",
        level: "A2",
        title: "The definite",
        lead: "Ny marks a known noun, and ilay points at a specific one.",
        notes: [
          "Ny rano and ny trano are the water and the house when they are known.",
          "Ilay lehilahy points at that particular man.",
          "There is no gender on ny or on ilay.",
        ],
        examples: [
          ["Kely ny trano.", "The house is small."],
          ["Misokatra ny varavarana.", "The door is open."],
        ],
        table: {
          caption: "Ny and ilay",
          heads: ["mark", "job", "example"],
          rows: [
            ["ny", "known", "ny trano"],
            ["ilay", "that one", "ilay lehilahy"],
            ["none", "tonga stays bare", "tonga"],
          ],
        },
      },
      {
        id: "b1-relative",
        level: "B1",
        title: "A relative",
        lead: "Izay introduces a relative clause after the noun.",
        notes: [
          "Ny trano izay kely is the house that is small.",
          "Ilay lehilahy izay mandeha is the man who is walking.",
          "The verb inside izay still does not take a person ending.",
        ],
        examples: [
          ["ny trano izay kely", "the house that is small"],
          ["ilay lehilahy izay mandeha", "the man who is walking"],
        ],
      },
      {
        id: "b1-question",
        level: "B1",
        title: "A question",
        lead: "Ve after the predicate marks a yes-no question.",
        notes: [
          "Mandeha ve ianao keeps the verb first and puts ve after it.",
          "Aiza asks where, and the predicate still leads.",
          "The pronoun does not move to the front to make the question.",
        ],
        examples: [
          ["Mandeha ve ianao?", "Are you walking?"],
          ["Eto ve aho?", "Am I here?"],
        ],
        table: {
          caption: "Ve and aiza",
          heads: ["word", "job", "example"],
          rows: [
            ["ve", "yes or no", "Mandeha ve ianao?"],
            ["aiza", "where", "Aiza ianao?"],
            ["tsy", "not", "Tsy eto aho."],
          ],
        },
      },
      {
        id: "b2-order",
        level: "B2",
        title: "Against Indonesian order",
        lead: "Malagasy puts the predicate first, while Indonesian puts the person first.",
        notes: [
          "Mihinana mofo aho starts with eating.",
          "The Indonesian line Saya makan roti starts with saya, so the same family does not share one word order.",
          "Do not repair a Malagasy sentence by moving aho to the front.",
        ],
        examples: [
          ["Mihinana mofo aho.", "I eat bread, predicate first."],
          ["Eto aho.", "I am here, predicate first."],
        ],
      },
      {
        id: "b2-possession",
        level: "B2",
        title: "Possession",
        lead: "Possession is a suffix on the noun, not a separate gendered word.",
        notes: [
          "Anarako is my name, and namako is my friend.",
          "Fianakaviako is my family, with -ko on the noun.",
          "The suffix does not change for the gender of the owner, because there is no such gender.",
        ],
        examples: [
          ["Anna no anarako.", "Anna is my name."],
          ["Ity no namako.", "This is my friend."],
        ],
        table: {
          caption: "Possession on the noun",
          heads: ["mine", "sense"],
          rows: [
            ["anarako", "my name"],
            ["namako", "my friend"],
            ["fianakaviako", "my family"],
          ],
        },
      },
    ],
    cards: [
      {
        word: "tsy",
        gloss: "not",
        tag: "particle",
        forms: [
          ["not", "tsy"],
          ["not here", "Tsy eto aho."],
          ["not walking", "Tsy mandeha aho."],
          ["not seeing", "Tsy mahita aho."],
        ],
      },
      {
        word: "aho",
        gloss: "I",
        tag: "pronoun",
        forms: [
          ["I", "aho"],
          ["here", "Eto aho."],
          ["see", "Mahita aho."],
          ["not", "Tsy eto aho."],
        ],
      },
      {
        word: "ianao",
        gloss: "you",
        tag: "pronoun",
        forms: [
          ["you", "ianao"],
          ["arrive", "Tonga ianao."],
          ["question", "Mandeha ve ianao?"],
          ["friend", "Ianao no namako."],
        ],
      },
      {
        word: "izy",
        gloss: "he or she",
        tag: "pronoun",
        forms: [
          ["he or she", "izy"],
          ["here", "Eto izy."],
          ["one form", "izy"],
          ["we exclusive", "izahay"],
        ],
      },
      {
        word: "ny",
        gloss: "known noun",
        tag: "particle",
        forms: [
          ["the", "ny"],
          ["house", "ny trano"],
          ["water", "ny rano"],
          ["door", "ny varavarana"],
        ],
      },
      {
        word: "ilay",
        gloss: "that specific one",
        tag: "particle",
        forms: [
          ["specific", "ilay"],
          ["man", "ilay lehilahy"],
          ["child", "ilay zaza"],
          ["woman", "ilay vehivavy"],
        ],
      },
      {
        word: "m-",
        gloss: "present, against n- and h-",
        tag: "particle",
        forms: [
          ["present", "mandeha"],
          ["past", "nandeha"],
          ["future", "handeha"],
          ["no prefix", "tonga"],
        ],
      },
      {
        word: "ve",
        gloss: "yes-no question",
        tag: "particle",
        forms: [
          ["question", "ve"],
          ["walking", "Mandeha ve ianao?"],
          ["here", "Eto ve aho?"],
          ["after predicate", "ve"],
        ],
      },
    ],
  },
  haw: {
    intro: "Hawaiian keeps the ʻokina and the kahakō as letters, and the verb does not take a person ending.",
    lessons: [
      {
        id: "a1-letters",
        level: "A1",
        title: "ʻOkina and kahakō",
        lead: "The ʻokina is a consonant, and the kahakō is a long vowel that changes the word.",
        notes: [
          "Aia au ma ʻaneʻi has two ʻokina, and neither one is an optional apostrophe.",
          "Lā, the sun, has a kahakō, and a short la is not the same word.",
          "Dropping either mark is a different word, not a spelling variant.",
        ],
        examples: [
          ["Aia au ma ʻaneʻi.", "I am here."],
          ["ʻIke au i ka lā.", "I see the sun."],
        ],
      },
      {
        id: "a1-article",
        level: "A1",
        title: "Ka and ke",
        lead: "Ka and ke are the singular article, and the next sound chooses which one.",
        notes: [
          "Ke comes before a word that starts with k, e, a, or o, as in ke kāne, ke keiki, and ke ahi.",
          "Ka comes elsewhere, as in ka hale, ka wahine, and ka lā.",
          "Ka and ke are not a gender.",
        ],
        examples: [
          ["Aia ka wahine ma ʻaneʻi.", "The woman is here."],
          ["Ke hele nei ke kāne.", "The man is walking."],
        ],
        table: {
          caption: "Ka and ke",
          heads: ["article", "before", "example"],
          rows: [
            ["ke", "k, e, a, o", "ke kāne"],
            ["ke", "k", "ke keiki"],
            ["ke", "a", "ke ahi"],
            ["ka", "other sounds", "ka hale"],
            ["ka", "l", "ka lā"],
          ],
        },
      },
      {
        id: "a1-ao",
        level: "A1",
        title: "A versus o possession",
        lead: "O marks what is not acquired, and a marks what is, and the choice is a list.",
        notes: [
          "Koʻu inoa and koʻu hoa are o-class, the things you do not control.",
          "Kaʻu palaoa is a-class, food you have.",
          "The split is not European gender, and you learn it with the noun.",
        ],
        examples: [
          ["ʻO Anna koʻu inoa.", "Anna is my name."],
          ["ʻO ʻoe koʻu hoa.", "You are my friend."],
        ],
        table: {
          caption: "A and o, my",
          heads: ["class", "my", "example"],
          rows: [
            ["o", "koʻu", "koʻu inoa"],
            ["o", "koʻu", "koʻu hoa"],
            ["a", "kaʻu", "kaʻu palaoa"],
          ],
        },
      },
      {
        id: "a2-pronouns",
        level: "A2",
        title: "Au, ʻoe, ʻo ia",
        lead: "Au, ʻoe, and ʻo ia do not change the verb.",
        notes: [
          "Au is I, ʻoe is you, and ʻo ia is he or she.",
          "ʻIke au and ʻIke ʻoe and ʻIke ʻo ia use the same ʻike.",
          "ʻO in ʻo ia marks the pronoun, and it is not a gender.",
        ],
        examples: [
          ["ʻIke au i ka lā.", "I see the sun."],
          ["Inu au i ka wai.", "I drink the water."],
        ],
      },
      {
        id: "a2-particles",
        level: "A2",
        title: "Ua, e, and ke",
        lead: "Ua, e, and ke mark aspect, and they are not person endings.",
        notes: [
          "Ua before the verb marks a completed action, as in Ua hele au.",
          "E before the verb marks a plan or a command.",
          "Ke and nei around the verb mark an action in progress, as in Ke hele nei ke kāne.",
        ],
        examples: [
          ["Ua hele au.", "I went."],
          ["Ke hele nei ke kāne.", "The man is walking."],
        ],
        table: {
          caption: "Aspect particles",
          heads: ["mark", "job", "example"],
          rows: [
            ["ua", "completed", "Ua hele au."],
            ["e", "plan or command", "E hele ʻoe."],
            ["ke … nei", "in progress", "Ke hele nei ke kāne."],
            ["aia", "place", "Aia au ma ʻaneʻi."],
          ],
        },
      },
      {
        id: "a2-aole",
        level: "A2",
        title: "ʻAʻole",
        lead: "ʻAʻole is the no, and both ʻokina stay in the word.",
        notes: [
          "ʻAʻole au ma ʻaneʻi means I am not here.",
          "ʻAʻole anu ka wai means the water is not cold.",
          "ʻAʻole does not add a person ending to the verb.",
        ],
        examples: [
          ["ʻAʻole au ma ʻaneʻi.", "I am not here."],
          ["ʻAʻole anu ka wai.", "The water is not cold."],
        ],
      },
      {
        id: "b1-direction",
        level: "B1",
        title: "Mai and aku",
        lead: "Mai points toward the speaker, and aku points away.",
        notes: [
          "Hele mai is come toward me.",
          "Hele aku is go away from me.",
          "They sit after the verb, and they are not tense endings.",
        ],
        examples: [
          ["Hele mai ʻoe i ka hale.", "Come to the house."],
          ["Hele aku ʻoe.", "Go away."],
        ],
      },
      {
        id: "b1-possessive",
        level: "B1",
        title: "Possessive pronouns",
        lead: "The possessive pronoun keeps the a or o class of the noun.",
        notes: [
          "O-class mine, yours, and his or hers are koʻu, kou, and kona.",
          "A-class mine, yours, and his or hers are kaʻu, kāu, and kāna.",
          "ʻO kēia koʻu hoa uses the o-class form because hoa is o-class on these cards.",
        ],
        examples: [
          ["ʻO kēia koʻu hoa.", "This is my friend."],
          ["Aia koʻu ʻohana ma ka hale.", "My family is at the house."],
        ],
        table: {
          caption: "Possessive pronouns",
          heads: ["person", "o-class", "a-class"],
          rows: [
            ["my", "koʻu", "kaʻu"],
            ["your", "kou", "kāu"],
            ["his or her", "kona", "kāna"],
          ],
        },
      },
      {
        id: "b2-relative",
        level: "B2",
        title: "A relative",
        lead: "A relative clause follows the noun, with i, and ai if the head is not the subject.",
        notes: [
          "Ka wahine i hele mai is the woman who came, and the subject of hele is the woman.",
          "Ka hale i ʻike ai au is the house that I saw, and ai marks that the house is not the subject of ʻike.",
          "The verb still does not take a person ending inside the clause.",
        ],
        examples: [
          ["ka wahine i hele mai", "the woman who came"],
          ["ka hale i ʻike ai au", "the house that I saw"],
        ],
      },
      {
        id: "b2-pehea",
        level: "B2",
        title: "Pehea and a question",
        lead: "Pehea asks how, and anei after the phrase marks a yes-no question.",
        notes: [
          "Pehea ʻoe asks how you are.",
          "ʻIke anei ʻoe i ka lā asks whether you see the sun, without moving the verb to a new shape.",
          "Anei is a particle, not a person ending, and the ʻokina in related words stays.",
        ],
        examples: [
          ["Pehea ʻoe?", "How are you?"],
          ["ʻIke anei ʻoe i ka lā?", "Do you see the sun?"],
        ],
        table: {
          caption: "Two questions",
          heads: ["word", "job", "example"],
          rows: [
            ["pehea", "how", "Pehea ʻoe?"],
            ["anei", "yes or no", "ʻIke anei ʻoe?"],
            ["ʻaʻole", "not", "ʻAʻole au."],
          ],
        },
      },
    ],
    cards: [
      {
        word: "au",
        gloss: "I",
        tag: "pronoun",
        forms: [
          ["I", "au"],
          ["here", "Aia au ma ʻaneʻi."],
          ["see", "ʻIke au"],
          ["not", "ʻAʻole au"],
        ],
      },
      {
        word: "ʻoe",
        gloss: "you",
        tag: "pronoun",
        forms: [
          ["you", "ʻoe"],
          ["come", "Hele mai ʻoe"],
          ["focused", "ʻO ʻoe"],
          ["how", "Pehea ʻoe?"],
        ],
      },
      {
        word: "ʻo ia",
        gloss: "he or she",
        tag: "pronoun",
        forms: [
          ["he or she", "ʻo ia"],
          ["pronoun", "ia"],
          ["see", "ʻIke ʻo ia"],
          ["one form", "ʻo ia"],
        ],
      },
      {
        word: "ka",
        gloss: "singular article",
        tag: "particle",
        forms: [
          ["article", "ka"],
          ["house", "ka hale"],
          ["water", "ka wai"],
          ["sun", "ka lā"],
        ],
      },
      {
        word: "ke",
        gloss: "singular article before k, e, a, o",
        tag: "particle",
        forms: [
          ["article", "ke"],
          ["man", "ke kāne"],
          ["child", "ke keiki"],
          ["fire", "ke ahi"],
        ],
      },
      {
        word: "ua",
        gloss: "completed",
        tag: "particle",
        forms: [
          ["completed", "ua"],
          ["went", "Ua hele au."],
          ["saw", "Ua ʻike au."],
          ["opened", "Ua wehe ka puka."],
        ],
      },
      {
        word: "ʻaʻole",
        gloss: "not",
        tag: "particle",
        forms: [
          ["not", "ʻaʻole"],
          ["not I", "ʻAʻole au"],
          ["not cold", "ʻAʻole anu ka wai."],
          ["both ʻokina", "ʻaʻole"],
        ],
      },
      {
        word: "mai",
        gloss: "toward the speaker",
        tag: "particle",
        forms: [
          ["toward me", "mai"],
          ["come", "hele mai"],
          ["to the house", "Hele mai ʻoe i ka hale."],
          ["not aku", "mai"],
        ],
      },
      {
        word: "aku",
        gloss: "away from the speaker",
        tag: "particle",
        forms: [
          ["away", "aku"],
          ["go away", "hele aku"],
          ["command", "Hele aku ʻoe."],
          ["not mai", "aku"],
        ],
      },
      {
        word: "koʻu",
        gloss: "my, o-class",
        tag: "pronoun",
        forms: [
          ["my, o", "koʻu"],
          ["name", "koʻu inoa"],
          ["friend", "koʻu hoa"],
          ["your, o", "kou"],
        ],
      },
    ],
  },
  qu: {
    intro: "Southern Quechua does the grammar with a handful of suffixes, and there is no gender.",
    lessons: [
      {
        id: "a1-suffix",
        level: "A1",
        title: "A suffix, not a preposition",
        lead: "Case is a suffix on the noun, not a word in front of it.",
        notes: [
          "-ta marks an object, -man marks toward, and -pi marks at or in.",
          "There is no article and no gender on wasi or on yaku.",
          "An adjective does not take the case when the noun already carries it.",
        ],
        examples: [
          ["Ñuqa intita rikuni.", "I see the sun."],
          ["Qam wasiman hamunki.", "You come toward the house."],
        ],
      },
      {
        id: "a1-mi",
        level: "A1",
        title: "-mi and the focus",
        lead: "-mi, or -m after a vowel, marks what you vouch for firsthand.",
        notes: [
          "Paymi hamun puts the focus on pay and says the speaker affirms it.",
          "Ñuqam kaypi kani uses -m because ñuqa ends in a vowel.",
          "-mi is not a gender marker and not a person ending.",
        ],
        examples: [
          ["Paymi hamun.", "He or she comes, and I affirm it."],
          ["Ñuqam kaypi kani.", "I am here, firsthand."],
        ],
        table: {
          caption: "-mi and -m",
          heads: ["after", "form", "example"],
          rows: [
            ["consonant", "-mi", "Paymi"],
            ["vowel", "-m", "Ñuqam"],
            ["hearsay, later", "-si", "Paysi"],
          ],
        },
      },
      {
        id: "a1-person",
        level: "A1",
        title: "Personal endings",
        lead: "The verb ending shows the person, and the noun does not agree in gender.",
        notes: [
          "-ni is I, -nki is you, and -n is he or she.",
          "Rikuni, rikunki, and rikun are one verb, rikuy.",
          "Kay does not follow that stem: kani, kanki, kan.",
        ],
        examples: [
          ["Ñuqa kaypi kani.", "I am here."],
          ["Ñuqa intita rikuni.", "I see the sun."],
        ],
      },
      {
        id: "a2-we",
        level: "A2",
        title: "Inclusive and exclusive we",
        lead: "Ñuqanchik includes you, and ñuqayku does not.",
        notes: [
          "Ñuqayku t'antata mikhuyku is we eat bread, and you are not in that we.",
          "Ñuqanchik mikhunchik includes the listener.",
          "The two we forms are different suffixes, not a polite plural.",
        ],
        examples: [
          ["Ñuqayku t'antata mikhuyku.", "We eat bread, not including you."],
          ["Ñuqanchik mikhunchik.", "We, including you, eat."],
        ],
        table: {
          caption: "Present persons",
          heads: ["person", "kay", "rikuy", "hamuy"],
          rows: [
            ["ñuqa", "kani", "rikuni", "hamuni"],
            ["qam", "kanki", "rikunki", "hamunki"],
            ["pay", "kan", "rikun", "hamun"],
            ["ñuqayku", "kayku", "rikuyku", "hamuyku"],
            ["ñuqanchik", "kanchik", "rikunchik", "hamunchik"],
          ],
        },
      },
      {
        id: "a2-past",
        level: "A2",
        title: "The past",
        lead: "The past puts -rqa before the person ending.",
        notes: [
          "Rirqani is I went, from riy.",
          "Hamurqanki is you came.",
          "The person ending is still there after -rqa.",
        ],
        examples: [
          ["Ñuqa rirqani.", "I went."],
          ["Qam hamurqanki.", "You came."],
        ],
      },
      {
        id: "a2-object",
        level: "A2",
        title: "Object marking",
        lead: "-ta marks an object noun, and -wa- inside the verb marks me.",
        notes: [
          "Intita and t'antata take -ta, and the verb still shows the subject.",
          "Rikuwan means he or she sees me, with -wa- before the subject ending.",
          "Rikuwanki means you see me.",
        ],
        examples: [
          ["Ñuqayku t'antata mikhuyku.", "We eat bread."],
          ["Rikuwanki.", "You see me."],
        ],
        table: {
          caption: "Object on the noun and in the verb",
          heads: ["mark", "where", "example"],
          rows: [
            ["-ta", "noun", "intita"],
            ["-wa-", "verb, me", "rikuwan"],
            ["-wa-nki", "you see me", "rikuwanki"],
          ],
        },
      },
      {
        id: "b1-switch",
        level: "B1",
        title: "-spa and -pti",
        lead: "-spa keeps the same subject, and -pti switches to someone else.",
        notes: [
          "-spa means the extra verb has the same subject as the main verb.",
          "-pti means the extra verb has a different subject, and a person marker sits on -pti.",
          "These are subordinate suffixes, not new tenses and not prepositions.",
        ],
        examples: [
          ["Mikhuspa rini.", "I go, having eaten."],
          ["Pay hamuptin, rini.", "When he or she comes, I go."],
        ],
      },
      {
        id: "b1-si",
        level: "B1",
        title: "Evidential -si",
        lead: "-si, or -s after a vowel, marks hearsay, against firsthand -mi.",
        notes: [
          "Paysi hamun means he or she comes, so people say.",
          "It does not change the person ending on hamun.",
          "Use -mi when you vouch for it, and -si when you are passing it on.",
        ],
        examples: [
          ["Paysi hamun.", "He or she comes, they say."],
          ["Paymi hamun.", "He or she comes, and I affirm it."],
        ],
        table: {
          caption: "Two evidentials",
          heads: ["mark", "source", "example"],
          rows: [
            ["-mi / -m", "firsthand", "Paymi hamun."],
            ["-si / -s", "hearsay", "Paysi hamun."],
          ],
        },
      },
      {
        id: "b2-negation",
        level: "B2",
        title: "Negation",
        lead: "Mana and -chu wrap the verb.",
        notes: [
          "Mana rikunichu means I do not see.",
          "Mana kanchu means is not.",
          "The person ending stays inside the frame.",
        ],
        examples: [
          ["Mana rikunichu.", "I do not see."],
          ["Mana kanchu.", "He or she is not."],
        ],
      },
      {
        id: "b2-hamuy",
        level: "B2",
        title: "Hamuy, riy, and kay",
        lead: "Hamuy and riy take the regular persons, and kay does not show the stem kay-.",
        notes: [
          "Hamuni, hamunki, hamun, and hamuyku are the I, you, he or she, and exclusive we of hamuy.",
          "Rini, rinki, and rin are riy, and the past I-form is rirqani.",
          "Kay is kani, kanki, kan, not a stem kay plus -ni.",
        ],
        examples: [
          ["Qam wasiman hamunki.", "You come toward the house."],
          ["Ñuqa rirqani.", "I went."],
        ],
        table: {
          caption: "Hamuy against kay",
          heads: ["person", "hamuy", "riy", "kay"],
          rows: [
            ["ñuqa", "hamuni", "rini", "kani"],
            ["qam", "hamunki", "rinki", "kanki"],
            ["pay", "hamun", "rin", "kan"],
            ["ñuqayku", "hamuyku", "riyku", "kayku"],
          ],
        },
      },
    ],
    cards: [
      {
        word: "-ta",
        gloss: "object",
        tag: "particle",
        forms: [
          ["object", "-ta"],
          ["sun", "intita"],
          ["bread", "t'antata"],
          ["water", "yakuta"],
        ],
      },
      {
        word: "-mi",
        gloss: "firsthand focus",
        tag: "particle",
        forms: [
          ["after consonant", "-mi"],
          ["after vowel", "-m"],
          ["he comes", "Paymi hamun."],
          ["I am here", "Ñuqam kaypi kani."],
        ],
      },
      {
        word: "rikuy",
        gloss: "see",
        tag: "verb",
        forms: [
          ["I", "rikuni"],
          ["you", "rikunki"],
          ["he or she", "rikun"],
          ["we exclusive", "rikuyku"],
          ["we inclusive", "rikunchik"],
        ],
      },
      {
        word: "hamuy",
        gloss: "come",
        tag: "verb",
        forms: [
          ["I", "hamuni"],
          ["you", "hamunki"],
          ["he or she", "hamun"],
          ["we exclusive", "hamuyku"],
          ["we inclusive", "hamunchik"],
        ],
      },
      {
        word: "riy",
        gloss: "go",
        tag: "verb",
        forms: [
          ["I", "rini"],
          ["you", "rinki"],
          ["he or she", "rin"],
          ["we exclusive", "riyku"],
          ["past I", "rirqani"],
        ],
      },
      {
        word: "kay",
        gloss: "be, the stem does not show",
        tag: "verb",
        forms: [
          ["I", "kani"],
          ["you", "kanki"],
          ["he or she", "kan"],
          ["we exclusive", "kayku"],
          ["we inclusive", "kanchik"],
        ],
      },
      {
        word: "ñuqayku",
        gloss: "we, excluding you",
        tag: "pronoun",
        forms: [
          ["exclusive", "ñuqayku"],
          ["inclusive", "ñuqanchik"],
          ["I", "ñuqa"],
          ["you", "qam"],
        ],
      },
      {
        word: "mana",
        gloss: "not, with -chu",
        tag: "particle",
        forms: [
          ["not", "mana"],
          ["closer", "-chu"],
          ["I do not see", "Mana rikunichu."],
          ["is not", "Mana kanchu."],
        ],
      },
      {
        word: "-spa",
        gloss: "same subject",
        tag: "particle",
        forms: [
          ["same subject", "-spa"],
          ["having eaten", "Mikhuspa"],
          ["other subject", "-pti"],
          ["when he comes", "hamuptin"],
        ],
      },
      {
        word: "-si",
        gloss: "hearsay",
        tag: "particle",
        forms: [
          ["after consonant", "-si"],
          ["after vowel", "-s"],
          ["they say", "Paysi hamun."],
          ["not -mi", "-si"],
        ],
      },
    ],
  },
  gn: {
    intro: "Paraguayan Guaraní puts the person on the verb as a prefix, and the tilde belongs to the word.",
    lessons: [
      {
        id: "a1-prefix",
        level: "A1",
        title: "A prefix for the person",
        lead: "On an active verb, a- is I, re- is you, and o- is he or she.",
        notes: [
          "Ahecha is I see, reju is you come, and oguata is he or she walks.",
          "Ro'u is we eat, with the exclusive prefix ro-.",
          "The class of the verb decides the prefix, so do not put a- on a che-class verb.",
        ],
        examples: [
          ["Ahecha kuarahy.", "I see the sun."],
          ["Reju hógape.", "You come to the house."],
        ],
      },
      {
        id: "a1-nasal",
        level: "A1",
        title: "Nasal harmony",
        lead: "A nasal or glottal root changes the prefix, and the changed form is the one to learn.",
        notes: [
          "Hecha is oral, so the I-form keeps a plain a-: ahecha.",
          "Y'u does not stay a plain a plus the root: the I-form is ha'u.",
          "That change is the harmony, and you learn ha'u as a set with the verb.",
        ],
        examples: [
          ["Ahecha kuarahy.", "I see the sun."],
          ["Ha'u y.", "I drink water."],
        ],
        table: {
          caption: "The prefix meets the root",
          heads: ["root", "I-form", "why"],
          rows: [
            ["hecha", "ahecha", "oral, plain a-"],
            ["y'u", "ha'u", "the prefix changes"],
            ["guata", "oguata", "o- for he or she"],
            ["u", "ro'u", "ro- for we"],
          ],
        },
      },
      {
        id: "a1-negation",
        level: "A1",
        title: "Negation",
        lead: "Nda- and -i wrap an oral verb.",
        notes: [
          "Ahecha becomes ndahechái.",
          "The person prefix stays inside the frame.",
          "A nasal root takes n- rather than nd-, and that is the same harmony as the prefix.",
        ],
        examples: [
          ["Ahecha kuarahy.", "I see the sun."],
          ["Ndahechái.", "I do not see."],
        ],
      },
      {
        id: "a2-past",
        level: "A2",
        title: "A past",
        lead: "Recent past is -kuri after the verb, and it does not replace the person prefix.",
        notes: [
          "Aha is I go, and ahákuri is I went.",
          "The prefix a- is still the person.",
          "Future -ta is a different suffix, not a new set of persons.",
        ],
        examples: [
          ["Ahákuri.", "I went."],
          ["Ahechákuri kuarahy.", "I saw the sun."],
        ],
        table: {
          caption: "Person stays, time is a suffix",
          heads: ["time", "form", "sense"],
          rows: [
            ["present", "aha", "I go"],
            ["recent past", "ahákuri", "I went"],
            ["future", "aháta", "I will go"],
          ],
        },
      },
      {
        id: "a2-pronouns",
        level: "A2",
        title: "Che, nde, ha'e",
        lead: "Che is I and also my, nde is you, and ha'e is he or she.",
        notes: [
          "Che aime ko'ápe uses che beside the verb that already has its own shape.",
          "Nde che angirũ uses nde for you and che for my.",
          "Ha'e does not mark gender.",
        ],
        examples: [
          ["Che aime ko'ápe.", "I am here."],
          ["Nde che angirũ.", "You are my friend."],
        ],
      },
      {
        id: "a2-question",
        level: "A2",
        title: "A question",
        lead: "Pa after the verb marks a yes-no question.",
        notes: [
          "Reju pa asks whether you come.",
          "The person prefix does not change in the question.",
          "Pa is not a tense and not a tilde you can drop.",
        ],
        examples: [
          ["Reju pa?", "Do you come?"],
          ["Ahecha pa?", "Do I see?"],
        ],
        table: {
          caption: "Pa",
          heads: ["statement", "question"],
          rows: [
            ["Reju.", "Reju pa?"],
            ["Ahecha.", "Ahecha pa?"],
            ["Oguata.", "Oguata pa?"],
          ],
        },
      },
      {
        id: "b1-relative",
        level: "B1",
        title: "A relative",
        lead: "-va on the verb makes a relative.",
        notes: [
          "Kuimba'e oguatáva is the man who walks.",
          "The person prefix stays on the verb inside -va.",
          "The tilde and the accent stay when -va is added.",
        ],
        examples: [
          ["Kuimba'e oguatáva.", "The man who walks."],
          ["Óga michĩva.", "A house that is small."],
        ],
      },
      {
        id: "b1-possession",
        level: "B1",
        title: "Possession",
        lead: "Che on a noun is my, and the noun may change its first sound.",
        notes: [
          "Cheréra is my name, from téra, and the mark stays.",
          "Che angirũ is my friend.",
          "Che is the same word as the pronoun I, not a gendered possessive.",
        ],
        examples: [
          ["Cheréra Anna.", "My name is Anna."],
          ["Nde che angirũ.", "You are my friend."],
        ],
        table: {
          caption: "Che on the noun",
          heads: ["noun", "mine", "sense"],
          rows: [
            ["téra", "cheréra", "my name"],
            ["angirũ", "che angirũ", "my friend"],
            ["óga", "óga", "house, place is hógape"],
          ],
        },
      },
      {
        id: "b2-irregular",
        level: "B2",
        title: "Aime and oĩ",
        lead: "Aime is I am in a place, and the third person is oĩ, not a regular o- plus aime.",
        notes: [
          "Che aime ko'ápe is I am here.",
          "Kuña oĩ ko'ápe is the woman is here.",
          "Learn aime, reime, and oĩ as a set, and keep the tilde on oĩ.",
        ],
        examples: [
          ["Che aime ko'ápe.", "I am here."],
          ["Kuña oĩ ko'ápe.", "The woman is here."],
        ],
      },
      {
        id: "b2-tilde",
        level: "B2",
        title: "Do not strip the marks",
        lead: "The tilde, the accent, and the glottal mark belong to the word.",
        notes: [
          "Ho'ysã without the tilde is not the word on the card.",
          "Ko'ápe keeps both the glottal and the accent.",
          "Óga, okẽ, kuña, and mitã are incomplete if a mark is dropped.",
        ],
        examples: [
          ["Y ho'ysã.", "The water is cold."],
          ["Óga michĩ.", "The house is small."],
        ],
        table: {
          caption: "Marks that stay",
          heads: ["word", "mark", "sentence"],
          rows: [
            ["ho'ysã", "tilde", "Y ho'ysã."],
            ["ko'ápe", "glottal and accent", "Che aime ko'ápe."],
            ["óga", "accent", "Óga michĩ."],
            ["oĩ", "tilde", "Kuña oĩ ko'ápe."],
          ],
        },
      },
    ],
    cards: [
      {
        word: "a-",
        gloss: "I, on an active oral verb",
        tag: "particle",
        forms: [
          ["I", "a-"],
          ["see", "ahecha"],
          ["you", "re-"],
          ["he or she", "o-"],
          ["we", "ro-"],
        ],
      },
      {
        word: "hecha",
        gloss: "see",
        tag: "verb",
        forms: [
          ["I", "ahecha"],
          ["you", "rehecha"],
          ["he or she", "ohecha"],
          ["we", "rohecha"],
        ],
      },
      {
        word: "ju",
        gloss: "come",
        tag: "verb",
        forms: [
          ["I", "aju"],
          ["you", "reju"],
          ["he or she", "ou"],
          ["to the house", "Reju hógape."],
        ],
      },
      {
        word: "che",
        gloss: "I, and my",
        tag: "pronoun",
        forms: [
          ["I", "che"],
          ["here", "Che aime ko'ápe."],
          ["my friend", "che angirũ"],
          ["my name", "cheréra"],
        ],
      },
      {
        word: "nde",
        gloss: "you",
        tag: "pronoun",
        forms: [
          ["you", "nde"],
          ["my friend", "Nde che angirũ."],
          ["not a gender", "nde"],
          ["he or she is ha'e", "ha'e"],
        ],
      },
      {
        word: "ha'e",
        gloss: "he or she",
        tag: "pronoun",
        forms: [
          ["he or she", "ha'e"],
          ["is here", "Ha'e oĩ ko'ápe."],
          ["one form", "ha'e"],
          ["glottal stays", "ha'e"],
        ],
      },
      {
        word: "nda-",
        gloss: "not, with -i",
        tag: "particle",
        forms: [
          ["frame start", "nda-"],
          ["frame end", "-i"],
          ["I do not see", "ndahechái"],
          ["nasal pair", "n-"],
        ],
      },
      {
        word: "aime",
        gloss: "be in a place",
        tag: "verb",
        forms: [
          ["I", "aime"],
          ["you", "reime"],
          ["he or she", "oĩ"],
          ["we", "roime"],
        ],
      },
      {
        word: "pa",
        gloss: "yes-no question",
        tag: "particle",
        forms: [
          ["question", "pa"],
          ["come", "Reju pa?"],
          ["see", "Ahecha pa?"],
          ["after the verb", "pa"],
        ],
      },
      {
        word: "-kuri",
        gloss: "recent past",
        tag: "particle",
        forms: [
          ["past", "-kuri"],
          ["I went", "ahákuri"],
          ["I saw", "ahechákuri"],
          ["person stays", "a-"],
        ],
      },
    ],
  },
  eo: {
    intro: "Esperanto gives one ending to each job, and there is no irregular verb.",
    lessons: [
      {
        id: "a1-endings",
        level: "A1",
        title: "La, and an ending for each job",
        lead: "La is the only article, and the ending tells you the job of the word.",
        notes: [
          "Nouns end in -o, adjectives in -a, adverbs in -e, and the infinitive in -i.",
          "La does not change for number or for case.",
          "Stress stays on the second vowel from the end.",
        ],
        examples: [
          ["La akvo estas malvarma.", "The water is cold."],
          ["La domo estas malgranda.", "The house is small."],
        ],
      },
      {
        id: "a1-tense",
        level: "A1",
        title: "The same endings for esti",
        lead: "Esti takes -as, -is, -os, and -us like trinki, and the verb does not agree with the person.",
        notes: [
          "Mi estas, vi estas, and li estas are the same ending.",
          "Mi iris and mi trinkis use the same past -is.",
          "There is no irregular verb hiding in esti.",
        ],
        examples: [
          ["Mi estas ĉi tie.", "I am here."],
          ["Vi venas al la domo.", "You come to the house."],
        ],
        table: {
          caption: "Every verb, including esti",
          heads: ["ending", "time", "esti", "trinki"],
          rows: [
            ["-as", "present", "estas", "trinkas"],
            ["-is", "past", "estis", "trinkis"],
            ["-os", "future", "estos", "trinkos"],
            ["-us", "conditional", "estus", "trinkus"],
          ],
        },
      },
      {
        id: "a1-jn",
        level: "A1",
        title: "-j and -n",
        lead: "Plural is -j, and the object adds -n.",
        notes: [
          "La domo, la domoj, la domon, and la domojn are the whole declension.",
          "The adjective takes -j and -n too, in agreement.",
          "There is no case beyond the object -n.",
        ],
        examples: [
          ["Ni manĝas panon.", "We eat bread."],
          ["Mi vidas la sunon.", "I see the sun."],
        ],
      },
      {
        id: "a2-pronouns",
        level: "A2",
        title: "Pronouns and min",
        lead: "Pronouns take the same object -n, so mi becomes min.",
        notes: [
          "Mi, vi, li, ŝi, ĝi, ni, and ili are the subject forms.",
          "Min, vin, lin, and ŝin are the object forms.",
          "Vi is you, singular and plural, and it does not change the verb.",
        ],
        examples: [
          ["Mi estas ĉi tie.", "I am here."],
          ["Li vidas min.", "He sees me."],
        ],
        table: {
          caption: "Pronoun and object",
          heads: ["subject", "object", "possessive"],
          rows: [
            ["mi", "min", "mia"],
            ["vi", "vin", "via"],
            ["li", "lin", "lia"],
            ["ŝi", "ŝin", "ŝia"],
            ["ni", "nin", "nia"],
          ],
        },
      },
      {
        id: "a2-participle",
        level: "A2",
        title: "A participle, later",
        lead: "Participle endings exist, and they are a later layer, not a second conjugation.",
        notes: [
          "La pordo estas malfermita uses -ita as an adjective.",
          "You do not need a participle to say the present, the past, or the future.",
          "The verb itself is still malfermi with -as, -is, and -os.",
        ],
        examples: [
          ["La pordo estas malfermita.", "The door is open."],
          ["La infano dormas.", "The child sleeps."],
        ],
      },
      {
        id: "a2-correlative",
        level: "A2",
        title: "Correlatives",
        lead: "Kiu, tio, and kio are one grid, not a list of irregular verbs.",
        notes: [
          "Ki- asks, ti- points, i- is some, ĉi- is every, and neni- is none.",
          "-u is a person, -o a thing, -e a place, -am a time, and -el a way.",
          "Kio estas tio is a correlative sentence, and esti in it is still regular.",
        ],
        examples: [
          ["Kio estas tio?", "What is that?"],
          ["Kiu estas tie?", "Who is there?"],
        ],
        table: {
          caption: "A corner of the grid",
          heads: ["", "person", "thing", "place"],
          rows: [
            ["ki-", "kiu", "kio", "kie"],
            ["ti-", "tiu", "tio", "tie"],
            ["ĉi-", "ĉiu", "ĉio", "ĉie"],
            ["neni-", "neniu", "nenio", "nenie"],
          ],
        },
      },
      {
        id: "b1-order",
        level: "B1",
        title: "Word order and -n",
        lead: "Word order is free because -n marks the object.",
        notes: [
          "Mi vidas la sunon and La sunon vidas mi are the same claim.",
          "Subject, verb, object is the clearest order.",
          "Without -n, the listener cannot tell which noun is the object.",
        ],
        examples: [
          ["Mi vidas la sunon.", "I see the sun."],
          ["La sunon vidas mi.", "I see the sun, with the object first."],
        ],
      },
      {
        id: "b1-ne",
        level: "B1",
        title: "Ne before the verb",
        lead: "Ne comes before the verb, and it is not a suffix.",
        notes: [
          "Mi ne trinkas means I do not drink.",
          "The ending stays -as, -is, or -os after ne.",
          "Ne does not agree with the person.",
        ],
        examples: [
          ["Mi ne trinkas.", "I do not drink."],
          ["Li ne estas ĉi tie.", "He is not here."],
        ],
        table: {
          caption: "Ne before the ending",
          heads: ["yes", "no"],
          rows: [
            ["Mi trinkas.", "Mi ne trinkas."],
            ["Mi estas ĉi tie.", "Mi ne estas ĉi tie."],
            ["Ni manĝas.", "Ni ne manĝas."],
          ],
        },
      },
      {
        id: "b2-regular",
        level: "B2",
        title: "No irregular verb",
        lead: "There is no irregular verb, and esti is not an exception.",
        notes: [
          "Esti, iri, trinki, and vidi use the same five endings.",
          "Do not memorize a special present for esti.",
          "What looks irregular to a learner is the correlative grid, and that grid is regular too.",
        ],
        examples: [
          ["Mi estas ĉi tie.", "I am here, with -as."],
          ["Mi iris.", "I went, with -is, like every verb."],
        ],
      },
      {
        id: "b2-names",
        level: "B2",
        title: "Proper names and -n",
        lead: "A proper name may omit -o, and it still takes -n when it is the object.",
        notes: [
          "Anna venas needs no -n, because Anna is the subject.",
          "Mi vidas Anna-n keeps -n on the name.",
          "La is still the only article, and the name does not take a gender ending.",
        ],
        examples: [
          ["Anna venas.", "Anna comes."],
          ["Mi vidas Anna-n.", "I see Anna."],
        ],
        table: {
          caption: "Names",
          heads: ["job", "form"],
          rows: [
            ["subject", "Anna venas."],
            ["object", "Mi vidas Anna-n."],
            ["with la", "La akvo"],
          ],
        },
      },
    ],
    cards: [
      {
        word: "mi",
        gloss: "I",
        tag: "pronoun",
        forms: [
          ["subject", "mi"],
          ["object", "min"],
          ["possessive", "mia"],
          ["we", "ni"],
          ["we object", "nin"],
        ],
      },
      {
        word: "vi",
        gloss: "you, singular or plural",
        tag: "pronoun",
        forms: [
          ["subject", "vi"],
          ["object", "vin"],
          ["possessive", "via"],
          ["same plural", "vi"],
        ],
      },
      {
        word: "li",
        gloss: "he",
        tag: "pronoun",
        forms: [
          ["subject", "li"],
          ["object", "lin"],
          ["possessive", "lia"],
          ["they", "ili"],
          ["they object", "ilin"],
        ],
      },
      {
        word: "ŝi",
        gloss: "she",
        tag: "pronoun",
        forms: [
          ["subject", "ŝi"],
          ["object", "ŝin"],
          ["possessive", "ŝia"],
          ["present", "ŝi estas"],
        ],
      },
      {
        word: "kiu",
        gloss: "who, which one",
        tag: "pronoun",
        forms: [
          ["who", "kiu"],
          ["that one", "tiu"],
          ["someone", "iu"],
          ["everyone", "ĉiu"],
          ["no one", "neniu"],
        ],
      },
      {
        word: "kio",
        gloss: "what",
        tag: "pronoun",
        forms: [
          ["what", "kio"],
          ["that", "tio"],
          ["something", "io"],
          ["everything", "ĉio"],
          ["nothing", "nenio"],
        ],
      },
      {
        word: "kie",
        gloss: "where",
        tag: "particle",
        forms: [
          ["where", "kie"],
          ["there", "tie"],
          ["somewhere", "ie"],
          ["everywhere", "ĉie"],
          ["nowhere", "nenie"],
        ],
      },
      {
        word: "kiam",
        gloss: "when",
        tag: "particle",
        forms: [
          ["when", "kiam"],
          ["then", "tiam"],
          ["sometime", "iam"],
          ["always", "ĉiam"],
          ["never", "neniam"],
        ],
      },
      {
        word: "kiel",
        gloss: "how",
        tag: "particle",
        forms: [
          ["how", "kiel"],
          ["thus", "tiel"],
          ["somehow", "iel"],
          ["every way", "ĉiel"],
          ["no way", "neniel"],
        ],
      },
      {
        word: "kia",
        gloss: "what kind",
        tag: "particle",
        forms: [
          ["what kind", "kia"],
          ["that kind", "tia"],
          ["some kind", "ia"],
          ["every kind", "ĉia"],
          ["no kind", "nenia"],
        ],
      },
    ],
  },
  isv: {
    intro: "Interslavic has no article, the present of byti includes jesm, and the plural is sųt.",
    lessons: [
      {
        id: "a1-jesm",
        level: "A1",
        title: "No article, and jesm is said",
        lead: "There is no word for the, and Ja jesm tu keeps jesm.",
        notes: [
          "Ja jesm tu is I am here, and the verb is not dropped.",
          "Žena jest tu has no article before žena.",
          "The Latin line is the line this course speaks.",
        ],
        examples: [
          ["Ja jesm tu.", "I am here."],
          ["Žena jest tu.", "A woman is here."],
        ],
      },
      {
        id: "a1-byti",
        level: "A1",
        title: "Jesm, jesi, jest, sųt",
        lead: "The present of byti is jesm, jesi, jest, jesmo, jeste, and sųt.",
        notes: [
          "Ja jesm, ty jesi, and ona jest are three different forms.",
          "The plural they-form is sųt, not a spelling without the ų.",
          "Byti is the one present you cannot build by a regular ending on the infinitive.",
        ],
        examples: [
          ["Ja jesm tu.", "I am here."],
          ["Dveri sųt otvorjene.", "The doors are open."],
        ],
        table: {
          caption: "Present of byti",
          heads: ["person", "form"],
          rows: [
            ["ja", "jesm"],
            ["ty", "jesi"],
            ["ona", "jest"],
            ["my", "jesmo"],
            ["oni", "sųt"],
          ],
        },
      },
      {
        id: "a1-gender",
        level: "A1",
        title: "Gender on the adjective",
        lead: "The adjective agrees with the noun in gender.",
        notes: [
          "Voda jest zimna is feminine.",
          "Dom jest maly is masculine, and kniga jest nova is feminine.",
          "There is still no article to agree.",
        ],
        examples: [
          ["Voda jest zimna.", "The water is cold."],
          ["Dom jest maly.", "The house is small."],
        ],
      },
      {
        id: "a2-accusative",
        level: "A2",
        title: "Accusative",
        lead: "A feminine noun in -a often takes -u as the object.",
        notes: [
          "Ja piju vodu changes voda to vodu.",
          "A neuter object such as sȯlnce often looks like the nominative.",
          "A living masculine object often uses the genitive shape, as in mųža.",
        ],
        examples: [
          ["Ja piju vodu.", "I drink water."],
          ["Ja viđu mųža.", "I see the man."],
        ],
        table: {
          caption: "Nominative and object",
          heads: ["noun", "nominative", "object"],
          rows: [
            ["water", "voda", "vodu"],
            ["book", "kniga", "knigu"],
            ["man", "mųž", "mųža"],
            ["sun", "sȯlnce", "sȯlnce"],
          ],
        },
      },
      {
        id: "a2-past",
        level: "A2",
        title: "A past participle that agrees",
        lead: "The past participle agrees in gender.",
        notes: [
          "Viděl is masculine, and viděla is feminine.",
          "The participle is not a person ending of the present type.",
          "Neuter vidělo and plural viděli belong to the same set.",
        ],
        examples: [
          ["Mųž viděl sȯlnce.", "The man saw the sun."],
          ["Žena viděla sȯlnce.", "The woman saw the sun."],
        ],
      },
      {
        id: "a2-aspect",
        level: "A2",
        title: "Aspect",
        lead: "Piti is imperfective, and vypiti is the perfective pair.",
        notes: [
          "Ja piju vodu is the unbounded drinking.",
          "Ja vypiju vodu uses the perfective present, which marks a future completion.",
          "Learn the pair together, not as two unrelated verbs.",
        ],
        examples: [
          ["Ja piju vodu.", "I drink water."],
          ["Ja vypiju vodu.", "I will drink the water up."],
        ],
        table: {
          caption: "One aspect pair",
          heads: ["aspect", "infinitive", "ja"],
          rows: [
            ["imperfective", "piti", "piju"],
            ["perfective", "vypiti", "vypiju"],
          ],
        },
      },
      {
        id: "b1-relative",
        level: "B1",
        title: "A relative",
        lead: "Ktory introduces a relative clause and agrees.",
        notes: [
          "Mųž, ktory hodi is a man who walks.",
          "Voda, ktoru ja piju keeps the accusative ktoru.",
          "Ktory is not an article.",
        ],
        examples: [
          ["To jest mųž, ktory hodi.", "That is a man who walks."],
          ["Voda, ktoru ja piju, jest zimna.", "The water that I drink is cold."],
        ],
      },
      {
        id: "b1-motion",
        level: "B1",
        title: "Prihoditi",
        lead: "The card's come is prihoditi, and ty prihodiš is you come.",
        notes: [
          "Ty prihodiš k domu uses the present ending -iš.",
          "Hoditi is the unbounded walking verb, as in Mųž hodi.",
          "The person ending is real here, and it is not optional.",
        ],
        examples: [
          ["Ty prihodiš k domu.", "You come to the house."],
          ["Mųž hodi.", "The man walks."],
        ],
        table: {
          caption: "Prihoditi",
          heads: ["person", "form"],
          rows: [
            ["ja", "prihodim"],
            ["ty", "prihodiš"],
            ["ona", "prihodi"],
            ["my", "prihodimo"],
          ],
        },
      },
      {
        id: "b2-conditional",
        level: "B2",
        title: "The conditional",
        lead: "The conditional is the particle by with a person form, plus a participle that agrees.",
        notes: [
          "Ja byh viděl is I would see, masculine.",
          "Ona by viděla is she would see, and the participle is feminine.",
          "By is not a past tense by itself.",
        ],
        examples: [
          ["Ja byh viděl.", "I would see."],
          ["Ona by viděla.", "She would see."],
        ],
      },
      {
        id: "b2-scripts",
        level: "B2",
        title: "Three scripts, one grammar",
        lead: "Latin, Cyrillic, and Glagolitic are three spellings of one grammar.",
        notes: [
          "This course teaches the Latin line, which is the line the speaker uses.",
          "A letter from another script is not a new case and not a new verb ending.",
          "Ja jesm tu is the same sentence in every script, and sųt stays the plural of byti.",
        ],
        examples: [
          ["Ja jesm tu.", "I am here."],
          ["Voda jest zimna.", "The water is cold."],
        ],
        table: {
          caption: "One line to learn",
          heads: ["sentence", "point"],
          rows: [
            ["Ja jesm tu.", "jesm is said"],
            ["Voda jest zimna.", "feminine adjective"],
            ["Ty prihodiš.", "the card's come"],
            ["Dveri sųt otvorjene.", "plural sųt"],
          ],
        },
      },
    ],
    cards: [
      {
        word: "byti",
        gloss: "be",
        tag: "verb",
        forms: [
          ["ja", "jesm"],
          ["ty", "jesi"],
          ["on", "jest"],
          ["my", "jesmo"],
          ["vy", "jeste"],
          ["oni", "sųt"],
        ],
      },
      {
        word: "ja",
        gloss: "I",
        tag: "pronoun",
        forms: [
          ["I", "ja"],
          ["am", "jesm"],
          ["you", "ty"],
          ["we", "my"],
        ],
      },
      {
        word: "viděti",
        gloss: "see",
        tag: "verb",
        forms: [
          ["ja", "viđu"],
          ["ty", "vidiš"],
          ["ona", "vidi"],
          ["my", "vidimo"],
        ],
      },
      {
        word: "jesti",
        gloss: "eat",
        tag: "verb",
        forms: [
          ["ja", "jem"],
          ["ty", "ješ"],
          ["ona", "je"],
          ["my", "jemo"],
        ],
      },
      {
        word: "prihoditi",
        gloss: "come",
        tag: "verb",
        forms: [
          ["ja", "prihodim"],
          ["ty", "prihodiš"],
          ["ona", "prihodi"],
          ["my", "prihodimo"],
        ],
      },
      {
        word: "viděl",
        gloss: "saw, past participle",
        tag: "verb",
        forms: [
          ["masculine", "viděl"],
          ["feminine", "viděla"],
          ["neuter", "vidělo"],
          ["plural", "viděli"],
        ],
      },
      {
        word: "voda",
        gloss: "water",
        tag: "noun",
        forms: [
          ["nominative", "voda"],
          ["accusative", "vodu"],
          ["cold", "zimna"],
          ["sentence", "Voda jest zimna."],
        ],
      },
      {
        word: "ktory",
        gloss: "who, which",
        tag: "pronoun",
        forms: [
          ["masculine", "ktory"],
          ["feminine", "ktora"],
          ["neuter", "ktore"],
          ["feminine object", "ktoru"],
        ],
      },
      {
        word: "by",
        gloss: "conditional",
        tag: "particle",
        forms: [
          ["ja", "byh"],
          ["ty", "bys"],
          ["on", "by"],
          ["my", "byhmo"],
          ["vy", "byste"],
        ],
      },
    ],
  },
  tok: {
    intro: "Toki Pona has about 120 words, no conjugation, and li, e, ala, and lon do the grammar.",
    lessons: [
      {
        id: "a1-li",
        level: "A1",
        title: "Li, except after mi and sina",
        lead: "Li marks the predicate, except after mi or sina alone.",
        notes: [
          "Mi lon ni has no li.",
          "Meli li lon ni needs li because the subject is not mi or sina.",
          "Sina moku also skips li.",
        ],
        examples: [
          ["mi lon ni.", "I am here."],
          ["meli li lon ni.", "The woman is here."],
        ],
      },
      {
        id: "a1-e-lon",
        level: "A1",
        title: "E against lon",
        lead: "E marks the object, and lon marks a place.",
        notes: [
          "Mi lukin e suno uses e because suno is what is seen.",
          "Mi lon ni uses lon for the place, not e.",
          "Do not put e on a place.",
        ],
        examples: [
          ["mi lukin e suno.", "I see the sun."],
          ["mi lon ni.", "I am here."],
        ],
        table: {
          caption: "E and lon",
          heads: ["word", "job", "example"],
          rows: [
            ["e", "object", "mi moku e telo"],
            ["lon", "place", "mi lon tomo"],
            ["li", "predicate", "meli li lon ni"],
          ],
        },
      },
      {
        id: "a1-ala",
        level: "A1",
        title: "Ala after the word",
        lead: "Ala follows the word it negates.",
        notes: [
          "Mi moku ala means I do not eat.",
          "Ala does not go in front the way English not does.",
          "There is no negative ending to add.",
        ],
        examples: [
          ["mi moku ala.", "I do not eat."],
          ["ona li moku ala.", "He or she does not eat."],
        ],
      },
      {
        id: "a2-modifiers",
        level: "A2",
        title: "Modifiers follow",
        lead: "A second word narrows the first, and it follows.",
        notes: [
          "Jan lili is a small person, a child.",
          "Tomo lili is a small house.",
          "Moku is both eat and drink, and the word after e tells you which.",
        ],
        examples: [
          ["tomo li lili.", "The house is small."],
          ["jan lili li lape.", "The child sleeps."],
        ],
        table: {
          caption: "Modifier after the head",
          heads: ["head", "modifier", "sense"],
          rows: [
            ["jan", "lili", "child"],
            ["tomo", "lili", "small house"],
            ["telo", "lete", "cold water"],
            ["jan", "pona", "friend"],
          ],
        },
      },
      {
        id: "a2-preverb",
        level: "A2",
        title: "Wile and ken",
        lead: "Wile and ken are preverbs, and they are not conjugations.",
        notes: [
          "Mi wile moku means I want to eat.",
          "Mi ken tawa means I can go.",
          "After li, the preverb sits before the main word: ona li wile moku.",
        ],
        examples: [
          ["mi wile moku.", "I want to eat."],
          ["mi ken tawa.", "I can go."],
        ],
      },
      {
        id: "a2-mute",
        level: "A2",
        title: "Mi mute needs li",
        lead: "Li returns when mi is modified, as in mi mute li moku.",
        notes: [
          "Mi moku has no li, because the subject is mi alone.",
          "Mi mute is no longer just mi, so li comes back.",
          "Sina mute li moku works the same way.",
        ],
        examples: [
          ["mi moku e telo.", "I drink."],
          ["mi mute li moku e pan.", "We eat bread."],
        ],
        table: {
          caption: "When li returns",
          heads: ["subject", "li", "example"],
          rows: [
            ["mi", "no", "mi moku"],
            ["sina", "no", "sina moku"],
            ["mi mute", "yes", "mi mute li moku"],
            ["ona", "yes", "ona li moku"],
          ],
        },
      },
      {
        id: "b1-tenpo",
        level: "B1",
        title: "Tenpo pini",
        lead: "Time is a word, and tenpo pini places a clause in the past.",
        notes: [
          "Tenpo pini la mi moku means in the past, I eat.",
          "Tenpo kama la places the clause ahead.",
          "There is no past ending on moku.",
        ],
        examples: [
          ["tenpo pini la mi moku.", "In the past, I eat."],
          ["tenpo kama la mi tawa.", "In the future, I go."],
        ],
      },
      {
        id: "b1-jan",
        level: "B1",
        title: "Names and jan",
        lead: "A name is capitalized, and it usually follows jan.",
        notes: [
          "Nimi mi li Anna means my name is Anna.",
          "Jan Anna li moku needs li, because the subject is not bare mi or sina.",
          "The capital is not an ending.",
        ],
        examples: [
          ["nimi mi li Anna.", "My name is Anna."],
          ["jan Anna li moku.", "Anna eats."],
        ],
        table: {
          caption: "Jan and a name",
          heads: ["phrase", "li", "sense"],
          rows: [
            ["nimi mi", "yes, after nimi", "my name"],
            ["jan Anna", "yes", "the person Anna"],
            ["mi", "no", "I"],
          ],
        },
      },
      {
        id: "b2-question",
        level: "B2",
        title: "Anu seme",
        lead: "This course marks a yes-no question with anu seme at the end.",
        notes: [
          "Anu means or, and seme means what, so the line offers the statement or what.",
          "Sina wile e pan anu seme asks whether you want bread.",
          "Ala stays the negator in this course, and the question is not a verb ending.",
        ],
        examples: [
          ["sina wile e pan anu seme?", "Do you want bread?"],
          ["sina lon tomo anu seme?", "Are you at the house?"],
        ],
      },
      {
        id: "b2-no-ending",
        level: "B2",
        title: "No ending to memorise",
        lead: "There is no ending for person, tense, or plural.",
        notes: [
          "Mi moku and sina moku are the same word moku.",
          "Mute means many, and it is a word after the noun, not a suffix.",
          "Do not invent an ending and attach it to moku.",
        ],
        examples: [
          ["mi moku.", "I eat or drink."],
          ["sina moku.", "You eat or drink, the same word."],
        ],
        table: {
          caption: "What not to add",
          heads: ["English habit", "Toki Pona"],
          rows: [
            ["a past ending", "tenpo pini la"],
            ["a plural ending", "mute"],
            ["a person ending", "the same word"],
            ["not in front", "ala after"],
          ],
        },
      },
    ],
    cards: [
      {
        word: "li",
        gloss: "predicate marker",
        tag: "particle",
        forms: [
          ["after ona", "ona li moku"],
          ["after meli", "meli li lon"],
          ["not after mi", "mi moku"],
          ["not after sina", "sina moku"],
          ["after mi mute", "mi mute li moku"],
        ],
      },
      {
        word: "e",
        gloss: "object marker",
        tag: "particle",
        forms: [
          ["drink", "mi moku e telo"],
          ["see", "mi lukin e suno"],
          ["eat", "mi mute li moku e pan"],
          ["not a place", "e"],
        ],
      },
      {
        word: "ala",
        gloss: "not, after the word",
        tag: "particle",
        forms: [
          ["not eat", "mi moku ala"],
          ["she does not", "ona li moku ala"],
          ["not want", "mi wile ala"],
          ["none", "jan ala"],
        ],
      },
      {
        word: "lon",
        gloss: "at, be in a place",
        tag: "particle",
        forms: [
          ["here", "mi lon ni"],
          ["at the house", "mi lon tomo"],
          ["she is there", "ona li lon tomo"],
          ["not e", "lon"],
        ],
      },
      {
        word: "wile",
        gloss: "want",
        tag: "particle",
        forms: [
          ["want to eat", "mi wile moku"],
          ["want bread", "mi wile e pan"],
          ["she wants", "ona li wile moku"],
          ["not want", "mi wile ala"],
        ],
      },
      {
        word: "ken",
        gloss: "can",
        tag: "particle",
        forms: [
          ["can eat", "mi ken moku"],
          ["can go", "mi ken tawa"],
          ["she can", "ona li ken tawa"],
          ["cannot", "mi ken ala"],
        ],
      },
      {
        word: "kama",
        gloss: "come, or become",
        tag: "particle",
        forms: [
          ["come", "mi kama"],
          ["become good", "mi kama pona"],
          ["start eating", "mi kama moku"],
          ["she comes", "ona li kama"],
        ],
      },
      {
        word: "tawa",
        gloss: "go, or toward",
        tag: "particle",
        forms: [
          ["go", "mi tawa"],
          ["to the house", "mi tawa tomo"],
          ["for you", "ni li tawa sina"],
          ["go eat", "mi tawa moku"],
        ],
      },
      {
        word: "mi",
        gloss: "I, and li stays off",
        tag: "pronoun",
        forms: [
          ["I", "mi"],
          ["no li", "mi moku"],
          ["we", "mi mute"],
          ["we need li", "mi mute li moku"],
        ],
      },
      {
        word: "sina",
        gloss: "you, and li stays off",
        tag: "pronoun",
        forms: [
          ["you", "sina"],
          ["no li", "sina moku"],
          ["friend", "sina jan pona mi"],
          ["you all", "sina mute li moku"],
        ],
      },
    ],
  },
  aur: {
    intro: "Aurali uses na before the noun and one unchanged sa for is, and a content verb does not take sa.",
    lessons: [
      {
        id: "a1-na",
        level: "A1",
        title: "Na before the noun",
        lead: "Na is the article, and it stays na in the plural.",
        notes: [
          "Na hara is the house, and na nai is the water.",
          "Na sela sa asi puts na on the noun, not on sa.",
          "Do not drop na and treat the bare root as the sentence noun.",
        ],
        examples: [
          ["Na sela sa asi.", "The woman is here."],
          ["Na nai sa nesi.", "The water is cold."],
        ],
      },
      {
        id: "a1-sa",
        level: "A1",
        title: "Sa does not change",
        lead: "Sa is is, and an, te, le, and ane all use that same sa.",
        notes: [
          "An sa asi, te sa, le sa, and ane sa are one form.",
          "Sa does not take a person ending.",
          "Do not add -s.",
        ],
        examples: [
          ["An sa asi.", "I am here."],
          ["Na sela sa asi.", "The woman is here."],
        ],
        table: {
          caption: "Sa, the same form",
          heads: ["pronoun", "sa"],
          rows: [
            ["an", "sa"],
            ["te", "sa"],
            ["le", "sa"],
            ["ane", "sa"],
          ],
        },
      },
      {
        id: "a1-verb",
        level: "A1",
        title: "A content verb without sa",
        lead: "A content verb does not take sa.",
        notes: [
          "An ora na hari is I see the sun, with ora alone.",
          "Ane mesa tasi is we eat bread, with no sa.",
          "Sa is only the copula.",
        ],
        examples: [
          ["An ora na hari.", "I see the sun."],
          ["Ane mesa tasi.", "We eat bread."],
        ],
      },
      {
        id: "a2-plural",
        level: "A2",
        title: "Plural -n",
        lead: "The plural is -n on the noun, and na does not change.",
        notes: [
          "Na hara is one house, and na haran is houses.",
          "The adjective does not take -n to match the noun.",
          "There is no other plural ending.",
        ],
        examples: [
          ["Na hara sa lini.", "The house is small."],
          ["Na haran sa lini.", "The houses are small."],
        ],
        table: {
          caption: "Plural -n",
          heads: ["one", "many"],
          rows: [
            ["na hara", "na haran"],
            ["na sela", "na selan"],
            ["na piri", "na pirin"],
          ],
        },
      },
      {
        id: "a2-adjective",
        level: "A2",
        title: "Adjectives follow",
        lead: "An adjective follows, and it does not agree.",
        notes: [
          "Na hara sa lini puts lini after sa.",
          "Lini stays lini for one house and for many.",
          "There is no masculine or feminine form of lini.",
        ],
        examples: [
          ["Na hara sa lini.", "The house is small."],
          ["Na nai sa nesi.", "The water is cold."],
        ],
      },
      {
        id: "a2-pronouns",
        level: "A2",
        title: "An, te, le, ane",
        lead: "An, te, le, and ane are the pronouns, and the verb does not change with them.",
        notes: [
          "An is I, te is you, le is he or she, and ane is we.",
          "Le ora and an ora are the same ora.",
          "Say the pronoun, because the verb will not show the person.",
        ],
        examples: [
          ["Te vena ve na hara.", "You come to the house."],
          ["An nava nai.", "I drink water."],
        ],
        table: {
          caption: "Pronouns",
          heads: ["person", "pronoun", "with sa", "with ora"],
          rows: [
            ["I", "an", "an sa", "an ora"],
            ["you", "te", "te sa", "te ora"],
            ["he or she", "le", "le sa", "le ora"],
            ["we", "ane", "ane sa", "ane ora"],
          ],
        },
      },
      {
        id: "b1-gender",
        level: "B1",
        title: "No gender",
        lead: "There is no gender agreement, even where two nouns name a man and a woman.",
        notes: [
          "Selo and sela are two nouns, not an ending you copy onto every word.",
          "Na stays na, and sa stays sa, for both.",
          "Lini does not change to match either noun.",
        ],
        examples: [
          ["Na selo tera.", "The man walks."],
          ["Na sela sa asi.", "The woman is here."],
        ],
      },
      {
        id: "b1-question",
        level: "B1",
        title: "A question",
        lead: "A question is the statement with a rising voice, and this course has no question particle.",
        notes: [
          "Te vena asks whether you come, by the rise at the end.",
          "An sa asi with that rise asks whether I am here.",
          "Do not invent a particle, and do not borrow one from another language.",
        ],
        examples: [
          ["Te vena?", "Do you come?"],
          ["An sa asi?", "Am I here?"],
        ],
        table: {
          caption: "Intonation, not a particle",
          heads: ["statement", "question"],
          rows: [
            ["Te vena.", "Te vena?"],
            ["An sa asi.", "An sa asi?"],
            ["An ora na hari.", "An ora na hari?"],
          ],
        },
      },
      {
        id: "b2-no-import",
        level: "B2",
        title: "Do not import an ending",
        lead: "Do not add a foreign ending, and do not borrow si for if.",
        notes: [
          "Ora does not become oras for le.",
          "A condition is two sentences, because the cards have not given a word that only means if.",
          "Spanish, Latin, and Esperanto endings are not Aurali grammar.",
        ],
        examples: [
          ["Le ora na hari.", "He or she sees the sun."],
          ["An sa asi.", "I am here, and sa has no ending."],
        ],
      },
      {
        id: "b2-card",
        level: "B2",
        title: "The card is the authority",
        lead: "If a guess and the card disagree, the card wins.",
        notes: [
          "Sa on the card is sa for every person.",
          "An ora na hari, Ane mesa tasi, and Te vena ve na hara are the shapes to trust.",
          "Do not repair a card with an ending from another language.",
        ],
        examples: [
          ["An sa asi.", "I am here."],
          ["Te vena ve na hara.", "You come to the house."],
        ],
        table: {
          caption: "Shapes the card fixes",
          heads: ["sentence", "point"],
          rows: [
            ["An sa asi.", "sa unchanged"],
            ["Na sela sa asi.", "na before the noun"],
            ["An ora na hari.", "no sa on ora"],
            ["Ane mesa tasi.", "mesa unchanged"],
            ["Te vena ve na hara.", "vena unchanged"],
          ],
        },
      },
    ],
    cards: [
      {
        word: "sa",
        gloss: "is, the same form for every person",
        tag: "verb",
        forms: [
          ["an", "sa"],
          ["te", "sa"],
          ["le", "sa"],
          ["ane", "sa"],
        ],
      },
      {
        word: "an",
        gloss: "I",
        tag: "pronoun",
        forms: [
          ["I", "an"],
          ["am", "an sa"],
          ["see", "an ora"],
          ["drink", "an nava"],
        ],
      },
      {
        word: "te",
        gloss: "you",
        tag: "pronoun",
        forms: [
          ["you", "te"],
          ["are", "te sa"],
          ["come", "te vena"],
          ["see", "te ora"],
        ],
      },
      {
        word: "le",
        gloss: "he or she",
        tag: "pronoun",
        forms: [
          ["he or she", "le"],
          ["is", "le sa"],
          ["see", "le ora"],
          ["same verb", "ora"],
        ],
      },
      {
        word: "ane",
        gloss: "we",
        tag: "pronoun",
        forms: [
          ["we", "ane"],
          ["are", "ane sa"],
          ["eat", "ane mesa"],
          ["sit", "ane sota"],
        ],
      },
      {
        word: "na",
        gloss: "article",
        tag: "particle",
        forms: [
          ["house", "na hara"],
          ["houses", "na haran"],
          ["water", "na nai"],
          ["woman", "na sela"],
        ],
      },
      {
        word: "-n",
        gloss: "plural on the noun",
        tag: "particle",
        forms: [
          ["houses", "haran"],
          ["with na", "na haran"],
          ["birds", "pirin"],
          ["adjective stays", "lini"],
        ],
      },
      {
        word: "ora",
        gloss: "see, one shape",
        tag: "verb",
        forms: [
          ["an", "ora"],
          ["te", "ora"],
          ["le", "ora"],
          ["ane", "ora"],
        ],
      },
      {
        word: "mesa",
        gloss: "eat, one shape",
        tag: "verb",
        forms: [
          ["an", "mesa"],
          ["te", "mesa"],
          ["le", "mesa"],
          ["ane", "mesa"],
        ],
      },
      {
        word: "vena",
        gloss: "come, one shape",
        tag: "verb",
        forms: [
          ["an", "vena"],
          ["te", "vena"],
          ["le", "vena"],
          ["ane", "vena"],
        ],
      },
    ],
  },
  sig: {
    intro: "The sign stores an English sentence, and the grammar under it is English.",
    lessons: [
      {
        id: "a1-stores",
        level: "A1",
        title: "The sign stores an English sentence",
        lead: "Each sign stores an English line, and that line is the grammar.",
        notes: [
          "Read the English under the sign.",
          "Signal does not add a grammar of its own on top of that line.",
          "If you change the English, you need a different sign.",
        ],
        examples: [
          ["I am here.", "The stored line is ordinary English."],
          ["I drink water.", "The sign stores this sentence."],
        ],
      },
      {
        id: "a1-helpers",
        level: "A1",
        title: "Be, do, and have",
        lead: "Be, do, and have stay irregular English, because the stored line is English.",
        notes: [
          "I am, you are, and she is are still required.",
          "She has and she does keep the English third-person form.",
          "The sign does not regularize them.",
        ],
        examples: [
          ["I am here.", "English be."],
          ["She has a book.", "English have."],
        ],
        table: {
          caption: "The English helpers the signs store",
          heads: ["", "be", "have", "do"],
          rows: [
            ["I", "am", "have", "do"],
            ["you", "are", "have", "do"],
            ["she", "is", "has", "does"],
            ["they", "are", "have", "do"],
          ],
        },
      },
      {
        id: "a1-question",
        level: "A1",
        title: "Questions need a helper",
        lead: "An English yes-no question needs a helper in front.",
        notes: [
          "Do you want water moves do before the subject.",
          "Are you here uses be as that helper.",
          "The sign does not invent a question ending.",
        ],
        examples: [
          ["Do you want water?", "Do supports the question."],
          ["Are you here?", "Be supports the question."],
        ],
      },
      {
        id: "a2-not",
        level: "A2",
        title: "Not with the helper",
        lead: "Not sits with the helper, not as a Signal suffix.",
        notes: [
          "I do not drink water puts not after do.",
          "She is not here puts not after is.",
          "Do not write a new negative ending on the sign.",
        ],
        examples: [
          ["I do not drink water.", "Not follows do."],
          ["She is not here.", "Not follows is."],
        ],
        table: {
          caption: "Not with the helper",
          heads: ["helper", "negative"],
          rows: [
            ["do", "I do not go."],
            ["does", "She does not see."],
            ["is", "She is not here."],
            ["have", "I have not seen it."],
          ],
        },
      },
      {
        id: "a2-case",
        level: "A2",
        title: "Pronoun case",
        lead: "I and me, and she and her, are English case, not a Signal case.",
        notes: [
          "I is the subject, and me is the object.",
          "Give it to her uses the object form her.",
          "The sign does not add a case ending of its own.",
        ],
        examples: [
          ["Give it to her.", "Her is the object form."],
          ["I see her.", "I is the subject, and her is the object."],
        ],
      },
      {
        id: "a2-past",
        level: "A2",
        title: "Went and saw",
        lead: "Went and saw are irregular English pasts, and the sign does not simplify them.",
        notes: [
          "I went is the past of go, not a regular goed.",
          "She saw is the past of see, not a regular seed.",
          "Came is the past of come, and the participle is come.",
        ],
        examples: [
          ["I went.", "Irregular past of go."],
          ["She saw the sun.", "Irregular past of see."],
        ],
        table: {
          caption: "Irregular pasts in the English line",
          heads: ["verb", "past", "participle"],
          rows: [
            ["go", "went", "gone"],
            ["see", "saw", "seen"],
            ["come", "came", "come"],
            ["be", "was", "been"],
          ],
        },
      },
      {
        id: "b1-articles",
        level: "B1",
        title: "A, the, and children",
        lead: "A and the are the English articles, and child takes the English plural children.",
        notes: [
          "A child and the child use the English articles.",
          "Children is the plural, not a regular childs.",
          "The sign does not store a separate plural ending.",
        ],
        examples: [
          ["a child", "English a."],
          ["the children", "English irregular plural."],
        ],
      },
      {
        id: "b1-no-case",
        level: "B1",
        title: "The sign does not add a case",
        lead: "Nouns do not take a Signal case, because the only case is the English pronoun case.",
        notes: [
          "The house and a book stay English noun phrases.",
          "There is no Signal suffix meaning to or of.",
          "If the English line has to her, that to is English.",
        ],
        examples: [
          ["the house", "No Signal case on house."],
          ["Give it to her.", "To and her are English."],
        ],
        table: {
          caption: "English case only",
          heads: ["job", "form"],
          rows: [
            ["subject", "I"],
            ["object", "me"],
            ["subject", "she"],
            ["object", "her"],
          ],
        },
      },
      {
        id: "b2-one-list",
        level: "B2",
        title: "No second irregular list",
        lead: "There is no second irregular list hiding in the symbols.",
        notes: [
          "Go, went, gone and see, saw, seen are English.",
          "Be, was, been and child, children are English.",
          "The symbols do not add another set of irregular stems.",
        ],
        examples: [
          ["I have seen it.", "English participle."],
          ["went", "Not a regular past."],
        ],
      },
      {
        id: "b2-different",
        level: "B2",
        title: "A different line is a different sign",
        lead: "If the English line changes, it is a different sign.",
        notes: [
          "I go and I went are two stored lines.",
          "She sees the train is not the same sign as I see the train.",
          "Do not edit the English and keep the old sign.",
        ],
        examples: [
          ["She sees the train.", "One stored line."],
          ["I went.", "A different stored line."],
        ],
        table: {
          caption: "Change the line, change the sign",
          heads: ["line", "why it differs"],
          rows: [
            ["I am here.", "present be"],
            ["She is here.", "different person"],
            ["I went.", "irregular past"],
            ["the children", "irregular plural"],
          ],
        },
      },
    ],
    cards: [
      {
        word: "be",
        gloss: "English be, stored as the line",
        tag: "verb",
        forms: [
          ["I", "am"],
          ["she", "is"],
          ["you", "are"],
          ["they", "are"],
          ["past I", "was"],
          ["past they", "were"],
        ],
      },
      {
        word: "have",
        gloss: "English have",
        tag: "verb",
        forms: [
          ["I", "have"],
          ["she", "has"],
          ["past", "had"],
          ["participle", "had"],
        ],
      },
      {
        word: "do",
        gloss: "English do",
        tag: "verb",
        forms: [
          ["I", "do"],
          ["she", "does"],
          ["past", "did"],
          ["participle", "done"],
        ],
      },
      {
        word: "go",
        gloss: "English go",
        tag: "verb",
        forms: [
          ["I", "go"],
          ["she", "goes"],
          ["past", "went"],
          ["participle", "gone"],
        ],
      },
      {
        word: "see",
        gloss: "English see",
        tag: "verb",
        forms: [
          ["I", "see"],
          ["she", "sees"],
          ["past", "saw"],
          ["participle", "seen"],
        ],
      },
      {
        word: "come",
        gloss: "English come",
        tag: "verb",
        forms: [
          ["I", "come"],
          ["she", "comes"],
          ["past", "came"],
          ["participle", "come"],
        ],
      },
      {
        word: "child",
        gloss: "English child",
        tag: "noun",
        forms: [
          ["one", "child"],
          ["many", "children"],
          ["a", "a child"],
          ["the", "the children"],
        ],
      },
      {
        word: "good",
        gloss: "English degree, good, better, best",
        tag: "particle",
        forms: [
          ["plain", "good"],
          ["comparative", "better"],
          ["superlative", "best"],
          ["adverb", "well"],
        ],
      },
    ],
  },
};










