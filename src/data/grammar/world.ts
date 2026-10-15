import type { GrammarChapter } from "./types";

/** Tagalog through Signal, in language-list order. */
export const WORLD: Record<string, GrammarChapter> = {
  tl: {
    rules: {
      summary: "The predicate often comes first. Ang marks the focus, not simply the English subject.",
      body: "Nandito ako. The verb takes a focus affix. Ang points at the noun the affix is about. Ng marks the other noun. Sa marks a direction or a place. Ikaw is you. There is no European gender.",
      points: [
        "Ako, ikaw, siya, kami.",
        "Hindi before the predicate is the simple no.",
        "Learn one focus before the others.",
      ],
      samples: [
        ["Nandito ako.", "predicate first"],
        ["Ikaw ang kaibigan ko.", "ang marks the focus"],
      ],
    },
    verbs: {
      summary: "Focus affixes, not person endings.",
      body: "Kumakain kami ng tinapay. Kumain uses the actor-focus infix -um- and the imperfect reduplication. Nakikita is a different focus, and the actor is then ko, not ako. Mag- is the other actor focus. Completed, imperfect, and contemplated are three forms of the same verb.",
      points: [
        "Um- and mag- are actor focus.",
        "-in and i- are other focuses.",
        "The pronoun changes with the focus: ako, ko, akin.",
      ],
      table: {
        caption: "kain, actor focus",
        heads: ["", "form"],
        rows: [
          ["completed", "kumain"],
          ["imperfect", "kumakain"],
          ["contemplated", "kakain"],
          ["infinitive", "kumain"],
        ],
      },
      samples: [
        ["Kumakain kami ng tinapay.", "actor focus, ng for the object"],
        ["Nakikita ko ang araw.", "the focus is the thing seen"],
      ],
    },
    nouns: {
      summary: "Ang, ng, and sa are the declension.",
      body: "There is no case ending on bahay, tubig, or pinto. The marker in front does the work. Personal names use si, ni, and kay instead of ang, ng, and sa. Plurals of people can take mga. Pronouns have three forms, one for each marker.",
      points: [
        "Ang bahay, ng bahay, sa bahay.",
        "Maliit ang bahay. The adjective can be the predicate.",
        "No gender agreement.",
      ],
      samples: [
        ["Malamig ang tubig.", "predicate adjective"],
        ["Bukas ang pinto.", "ang phrase as the focus"],
      ],
    },
    odd: {
      summary: "The completed form that does not look like the root.",
      body: "The focus system is regular inside Tagalog and irregular only from English. What is truly irregular is a short list whose completed form is not the root plus -um-. Punta becomes pumunta. Dating becomes dumating. Kita and kuha are the others to learn as sets. Nandito is a predicate of place, not a form of punta.",
      points: [
        "Do not put ako in a slot that needs ko.",
        "Hindi and wala are different negators.",
        "A verb’s focus and its time are both marked. One affix is not enough.",
      ],
      samples: [
        ["Dumadating ka sa bahay.", "dating"],
        ["Naglalakad ang lalaki.", "lakad, mag- focus"],
      ],
    },
  },
  th: {
    rules: {
      summary: "The verb does not change. A classifier is required when you count.",
      body: "ฉันอยู่ที่นี่. Words are not separated by spaces. ค่ะ or ครับ closes a careful sentence, and it is chosen by the speaker. There is no article and no plural ending. ไม่ comes before the verb.",
      points: [
        "Tones are part of the word. The reading carries them.",
        "กำลัง before the verb marks an action in progress.",
        "เป็น is be for a noun. An adjective does not need it.",
      ],
      samples: [
        ["ฉันอยู่ที่นี่", "อยู่ for place"],
        ["ผู้ชายกำลังเดิน", "กำลัง"],
      ],
    },
    verbs: {
      summary: "Nothing to conjugate. Time words and particles sit around the verb.",
      body: "เห็น is see for every person. กิน is eat. มา is come. แล้ว can mark completion. จะ marks a plan. ไม่เห็น is the no. The polite particle is not a verb ending. There is no irregular stem, because the stem does not change.",
      points: [
        "One form for ฉัน, คุณ, and เขา.",
        "ได้ before a verb can mean can, or a past, depending on the sentence.",
        "เป็น and คือ are not interchangeable in every sentence.",
      ],
      table: {
        caption: "Particles around กิน",
        heads: ["mark", "example", "job"],
        rows: [
          ["plain", "กิน", "the action"],
          ["กำลัง", "กำลังกิน", "in progress"],
          ["แล้ว", "กินแล้ว", "already"],
          ["ไม่", "ไม่กิน", "not"],
        ],
      },
      samples: [
        ["ฉันเห็นพระอาทิตย์", "เห็น, no ending"],
        ["พวกเรากินขนมปัง", "กิน"],
      ],
    },
    nouns: {
      summary: "No case. Classifiers are the extra morphology.",
      body: "คน for people, หลัง for houses, แก้ว for cups. The order is noun, number, classifier, or number, classifier, noun in a fuller phrase. ที่ marks a place. ของ marks possession. The noun itself does not decline. น้ำเย็น needs no verb of be.",
      points: [
        "Learn the classifier with the noun.",
        "A bare noun can be generic.",
        "ไม่ and ไม่ได้ are not the same no.",
      ],
      samples: [
        ["บ้านเล็ก", "adjective after the noun"],
        ["ประตูเปิดอยู่", "อยู่ for a state"],
      ],
    },
    odd: {
      summary: "The irregularities are classifiers, tones, and the two copulas.",
      body: "เป็น and คือ, and อยู่ for place, are the verbs that do not behave like กิน. A classifier you have not learned is not optional once you count. ค่ะ and ครับ agree with the speaker, not with the noun. A tone that the spelling marks is part of the word. There is no past stem to memorize.",
      points: [
        "Do not add an ending for she.",
        "Do not skip the classifier with a number.",
        "Politeness is a particle, not a conjugation.",
      ],
      samples: [
        ["คุณเป็นเพื่อนของฉัน", "เป็น"],
        ["คุณมาที่บ้าน", "มา"],
      ],
    },
  },
  vi: {
    rules: {
      summary: "The verb does not change. Each syllable is written apart, and the diacritic is the tone.",
      body: "Tôi ở đây. Bạn is the you on these cards. Không before the verb is the simple no. Đã marks a completed action. Sẽ marks a plan. There is no article and no gender agreement. Một classifier comes with a number.",
      points: [
        "Là is be for identity. An adjective does not need là.",
        "Đang marks an action in progress.",
        "The tone mark is part of the word.",
      ],
      samples: [
        ["Tôi ở đây.", "ở for place"],
        ["Người đàn ông đang đi bộ.", "đang"],
      ],
    },
    verbs: {
      summary: "Particles, not endings.",
      body: "Thấy, ăn, and đến stay as they are for tôi, bạn, and cô ấy. Là and có are the verbs to learn as phrases. Their negation is không phải and không có, not one không in front of every verb. Có thể is can. Muốn is want.",
      points: [
        "Không thấy, đã thấy, sẽ thấy.",
        "Phải is must, and không phải is a different use.",
        "There is no irregular past stem.",
      ],
      table: {
        caption: "Particles around thấy",
        heads: ["mark", "example", "job"],
        rows: [
          ["plain", "tôi thấy", "the action"],
          ["đang", "đang thấy", "in progress"],
          ["đã", "đã thấy", "completed"],
          ["không", "không thấy", "not"],
        ],
      },
      samples: [
        ["Tôi thấy mặt trời.", "thấy"],
        ["Chúng tôi ăn bánh mì.", "ăn"],
      ],
    },
    nouns: {
      summary: "Classifiers stand in for the missing article and plural.",
      body: "Một ngôi nhà, một cốc nước, một người. Cái is common and not universal. Những or các can mark a plural, and it is optional when the sentence is already clear. Ở marks a place. Của marks possession. The noun does not decline.",
      points: [
        "Learn the classifier with the noun.",
        "Người phụ nữ. Người is the classifier for a person.",
        "Pronouns change with respect. The wrong one is a grammar mistake.",
      ],
      samples: [
        ["Ngôi nhà nhỏ.", "classifier ngôi"],
        ["Cửa đang mở.", "no ending on cửa"],
      ],
    },
    odd: {
      summary: "Là, có, and the tone pairs. Not a verb stem list.",
      body: "Không phải and không có are not one negator. Là does not take đã the way thấy does in every sentence. Tone is the irregularity that turns a syllable into another word. Pronouns such as tôi, mình, and cậu are grammar, not style. There is nothing to conjugate.",
      points: [
        "Do not add an ending for she.",
        "Do not drop a tone mark.",
        "Bạn ăn and tôi ăn are the same verb.",
      ],
      samples: [
        ["Bạn là bạn của tôi.", "là"],
        ["Bạn đến nhà.", "đến"],
      ],
    },
  },
  id: {
    rules: {
      summary: "No gender and no person ending. Affixes build new words from a root.",
      body: "Saya di sini. Kamu is the friend-form. Anda is more formal. Sudah before the verb marks a completed action. Akan or mau marks a plan. Tidak is the no for verbs. Bukan is the no for nouns.",
      points: [
        "The verb does not agree.",
        "Itu after a noun can mark the, as in rumah itu.",
        "Yang turns the next words into a relative clause.",
      ],
      samples: [
        ["Saya di sini.", "di for place"],
        ["Air itu dingin.", "itu, no agreement"],
      ],
    },
    verbs: {
      summary: "The verb does not conjugate. Me- and di- change its role.",
      body: "Melihat is see for saya and for dia. Makan and pergi do not take me- in the basic sentence. Menyala from nyala shows how me- plus a root can change the first sound. Di- plus the root is the passive. Sedang marks an action in progress.",
      points: [
        "Saya melihat, kamu datang, dia makan.",
        "Jangan is the no of a command.",
        "A root in t, s, p, or k may lose that consonant under me-.",
      ],
      table: {
        caption: "Time is a word in front",
        heads: ["mark", "example", "job"],
        rows: [
          ["plain", "saya makan", "the action"],
          ["sedang", "sedang berjalan", "in progress"],
          ["sudah", "sudah makan", "already"],
          ["tidak", "tidak makan", "not"],
        ],
      },
      samples: [
        ["Saya melihat matahari.", "me- plus lihat"],
        ["Kami makan roti.", "makan, no me-"],
      ],
    },
    nouns: {
      summary: "No case and no gender. Plural can be a doubled word.",
      body: "Rumah-rumah is houses, and it is optional when a number or itu is present. Ke marks to. Di marks at. Dari marks from. -nya is a definite or possessive ending. Anak itu. Pintu itu terbuka.",
      points: [
        "Learn the root, then the affix.",
        "Orang is the classifier-like word for people.",
        "There is nothing to agree.",
      ],
      samples: [
        ["Rumah itu kecil.", "itu"],
        ["Pintu itu terbuka.", "a state"],
      ],
    },
    odd: {
      summary: "The sound changes under me-, and the pair tidak and bukan.",
      body: "Tidak and bukan are not interchangeable. Pergi, makan, and tidur do not take me- in the basic sentence, and melihat does. A root that loses t, s, p, or k under me- will look irregular if you expect the dictionary root to survive. Ada is there-is, and its negative is tidak ada.",
      points: [
        "Do not put bukan before melihat.",
        "Do not add -s for dia.",
        "The doubled plural is not required after a number.",
      ],
      samples: [
        ["Kamu datang ke rumah.", "datang"],
        ["Laki-laki itu sedang berjalan.", "sedang"],
      ],
    },
  },
  mg: {
    rules: {
      summary: "The word you are looking for often comes first.",
      body: "Eto aho. The predicate can lead, and the subject follows. Ianao is you. No gender and no article of the European kind. Ny marks a definite noun. Ilay points at a specific one. Stress is usually on the syllable before the last.",
      points: [
        "Aho, ianao, izy, izahay.",
        "Tsy before the predicate is the simple no.",
        "The verb does not agree with a European ending.",
      ],
      samples: [
        ["Eto aho.", "predicate first"],
        ["Mandeha ilay lehilahy.", "verb first"],
      ],
    },
    verbs: {
      summary: "A prefix marks time. The root stays.",
      body: "M- is a present, n- a past, h- a future, on a large class of verbs. Mahita is see. Mihinana is eat. Tonga is come, and it does not take m- in the basic sentence. These prefixes are the conjugation. There is no person ending on the verb.",
      points: [
        "Matory, natory, hatory.",
        "No is a relative or focused form and changes the shape again.",
        "Learn which verbs take m- and which, like tonga and avy, do not.",
      ],
      table: {
        caption: "Tense prefixes",
        heads: ["time", "prefix", "example"],
        rows: [
          ["present", "m-", "mandeha"],
          ["past", "n-", "nandeha"],
          ["future", "h-", "handeha"],
          ["none", "—", "tonga"],
        ],
      },
      samples: [
        ["Mahita ny masoandro aho.", "mahita, subject after"],
        ["Mihinana mofo izahay.", "mihinana"],
      ],
    },
    nouns: {
      summary: "Ny or ilay, and no case ending.",
      body: "Ny rano, ny trano, ny varavarana. Any and any an- mark place. Possession can be a suffix or a particle after the noun. The plural is often shown by the pronoun or left unmarked. An adjective follows, or it is the predicate: kely ny trano.",
      points: [
        "Do not add gender.",
        "The predicate-first order is normal.",
        "A place name takes a locative prefix.",
      ],
      samples: [
        ["Kely ny trano.", "predicate, then ny"],
        ["Misokatra ny varavarana.", "verb first"],
      ],
    },
    odd: {
      summary: "Tonga, avy, and the verbs that refuse the m- prefix.",
      body: "Tonga any an-trano ianao. Tonga does not become matonga. Avy is the other one to learn whole. The no- form used when the subject is in focus looks like a different verb and is a regular change once you have seen it. Do not invent a person ending.",
      points: [
        "Aho follows the predicate.",
        "Tsy is the no.",
        "Stress stays on the syllable before the last when a suffix is added.",
      ],
      samples: [
        ["Tonga any an-trano ianao.", "tonga, no m-"],
        ["Matory ilay zaza.", "matory, with m-"],
      ],
    },
  },
  haw: {
    rules: {
      summary: "The predicate often comes first. The ʻokina is a consonant, and the kahakō is a vowel length.",
      body: "Aia au ma ʻaneʻi. Aia is the verb for a place. Au is I. ʻO marks a name or a focused noun. There is no gender and no European tense ending. Ke … nei around a verb marks an action in progress.",
      points: [
        "The ʻokina is not an apostrophe you can skip.",
        "A line over a vowel is the kahakō, and it changes the word.",
        "ʻAʻole is the no.",
      ],
      samples: [
        ["Aia au ma ʻaneʻi.", "aia, place"],
        ["Ke hele nei ke kāne.", "ke … nei"],
      ],
    },
    verbs: {
      summary: "Particles of time, not a person ending.",
      body: "ʻIke au i ka lā. ʻAi mākou i ka palaoa. Au, ʻoe, and ʻo ia do not change the verb. I ka plus a verb can mark a completed action. E plus a verb can mark a plan or a command. Aia, he, and ʻo are the three ways a sentence starts when there is no action verb.",
      points: [
        "I marks an object.",
        "Ma marks a place.",
        "There is no irregular stem for person. The particles are the grammar.",
      ],
      table: {
        caption: "How a sentence starts",
        heads: ["word", "job", "example"],
        rows: [
          ["aia", "place", "aia au"],
          ["he", "a thing", "he hale"],
          ["ke … nei", "in progress", "ke hele nei"],
          ["ʻaʻole", "not", "ʻaʻole au"],
        ],
      },
      samples: [
        ["ʻIke au i ka lā.", "verb, then the subject"],
        ["ʻAi mākou i ka palaoa.", "i for the object"],
      ],
    },
    nouns: {
      summary: "Ka or ke is the article. O and a are two kinds of possession.",
      body: "Ka wahine, ke kāne, ka hale, ka wai. Ke is used before a word that starts with k, a, e, or o, and ka elsewhere. There is no case ending. Possession splits into o, the things you do not control, and a, the things you do. That split is the irregular-looking part of the noun system, and it is a list.",
      points: [
        "Ka lā, ke keiki.",
        "Liʻiliʻi ka hale. The predicate can lead.",
        "Plurals of a few nouns use a different word, and most do not change.",
      ],
      samples: [
        ["Aia ka wahine ma ʻaneʻi.", "ka"],
        ["Anu ka wai.", "predicate adjective"],
      ],
    },
    odd: {
      summary: "Aia, and the o/a possession split. Not a list of past stems.",
      body: "Aia does not conjugate. The o and a classes of possession are the forms you cannot guess from English my. Directional particles such as mai and aku sit after the verb and change the meaning. A missing ʻokina is a different word, not a spelling variant.",
      points: [
        "Do not drop the ʻokina or the kahakō.",
        "Do not add a person ending.",
        "Ke and ka are not a gender.",
      ],
      samples: [
        ["Aia au ma ʻaneʻi.", "aia"],
        ["Ke moe nei ke keiki.", "ke … nei"],
      ],
    },
  },
  qu: {
    rules: {
      summary: "A handful of suffixes does most of the grammar.",
      body: "Southern Quechua. Ñuqa kaypi kani. The verb ending shows the person. -ta is the object. There is no gender and no article. Qam is you. The adjective usually comes before the noun and does not agree.",
      points: [
        "-ni is I, -nki is you, -n is he or she.",
        "Negation is mana … chu around the verb.",
        "The noun does not change its stem.",
      ],
      samples: [
        ["Ñuqa kaypi kani.", "kay, I"],
        ["Ñuqa intita rikuni.", "object -ta"],
      ],
    },
    verbs: {
      summary: "Person suffixes. Kay is irregular.",
      body: "Rikuni is I see. Mikhuyku is we eat, an exclusive we. Hamunki is you come. A regular present is the stem plus -ni, -nki, -n. The past adds a suffix before the person. Kay, be, is kani, kanki, and it does not follow rikuni’s stem.",
      points: [
        "Ñuqayku is we, exclusive. Ñuqanchik is we, including you.",
        "The infinitive on the card is the citation form.",
        "A transition between suffixes can change a consonant.",
      ],
      table: {
        caption: "Present",
        heads: ["", "kay", "rikuy", "hamuy"],
        rows: [
          ["ñuqa", "kani", "rikuni", "hamuni"],
          ["qam", "kanki", "rikunki", "hamunki"],
          ["pay", "kan", "rikun", "hamun"],
          ["ñuqayku", "kayku", "rikuyku", "hamuyku"],
        ],
      },
      samples: [
        ["Ñuqayku t'antata mikhuyku.", "exclusive we, object -ta"],
        ["Qam wasiman hamunki.", "-man for toward"],
      ],
    },
    nouns: {
      summary: "Case is a suffix. -ta, -man, -pi, -paq.",
      body: "Wasi, wasiman, wasipi. Yaku chiri needs no copula on this card. Plural -kuna comes before the case suffix. There is no article. Possession is a suffix on the noun: wasiy, my house. The same slot can mark the person on the verb.",
      points: [
        "Learn -ta and -pi before the rest.",
        "Do not add gender.",
        "An adjective does not take the case when the noun carries it.",
      ],
      samples: [
        ["Yaku chiri.", "no article"],
        ["Wasi huch'uy.", "adjective after, on this card"],
      ],
    },
    odd: {
      summary: "Kay, and a few verbs that keep an older stem.",
      body: "Kani is not riku- plus a person. A small set of verbs changes a consonant when a suffix is added. That is the irregular list, and it is short. The regular system is the point of the language. Do not add an article, and do not add gender.",
      points: [
        "Mana … chu is the negation frame.",
        "-kuna before the case, not after.",
        "Exclusive and inclusive we are different suffixes.",
      ],
      samples: [
        ["kani · kanki · kan", "kay"],
        ["Punku kichasqa.", "a participle as a predicate"],
      ],
    },
  },
  gn: {
    rules: {
      summary: "The person marker can sit on the verb and on a possessed noun.",
      body: "Paraguayan Guaraní. Che aime ko'ápe. Che is I. A- on the verb is the first person of one class. Nde is you. The tilde and the nasal mark belong to the word. There is no gender and no article.",
      points: [
        "Two verb classes use two different person markers.",
        "The predicate can lead.",
        "Nd- or n- is the negative prefix.",
      ],
      samples: [
        ["Che aime ko'ápe.", "che, and a-"],
        ["Ahecha kuarahy.", "a- on hecha"],
      ],
    },
    verbs: {
      summary: "A prefix for the person. The class of the verb decides which prefix.",
      body: "A- is I, re- is you, o- is he or she, for oral or active verbs: ahecha, reju, oguata. Another class uses the same prefixes as possession: che, nde, i-. Learn the class before you add the prefix. Ro'u is we eat, with the exclusive prefix.",
      points: [
        "Aime is be in a place.",
        "The future and the past are suffixes or particles, not a new person set.",
        "Nasal harmony spreads from the root into the prefix.",
      ],
      table: {
        caption: "Active person prefixes",
        heads: ["", "prefix", "example"],
        rows: [
          ["I", "a-", "ahecha"],
          ["you", "re-", "reju"],
          ["he / she", "o-", "oguata"],
          ["we", "ro-", "ro'u"],
        ],
      },
      samples: [
        ["Reju hógape.", "ju"],
        ["Ro'u mbujape.", "u, we"],
      ],
    },
    nouns: {
      summary: "No case table. Possession is a prefix.",
      body: "Che- on a noun is my. Óga is house, hógape is at the house, with a place suffix. Y is water. Okẽ is door. The plural of a noun is often not required if the sentence already shows number. Postpositions come after the noun.",
      points: [
        "Keep the tilde.",
        "A quality can be a verb: ho'ysã.",
        "There is no gender to add.",
      ],
      samples: [
        ["Y ho'ysã.", "a quality predicate"],
        ["Óga michĩ.", "noun, then the quality"],
      ],
    },
    odd: {
      summary: "The two person-marking classes, and nasal harmony.",
      body: "A verb in the wrong class will look almost right and be wrong. Areko uses a different pattern from ahecha. Nasal harmony turns a prefix into a nasal form. That change is regular and still has to be learned as part of the word. The tilde is not decoration.",
      points: [
        "Do not put a- on a verb of the che- class.",
        "Nd- is the negative, and it harmonizes too.",
        "Che is both I and my.",
      ],
      samples: [
        ["ahecha · reju · oguata", "one class"],
        ["Kuña oĩ ko'ápe.", "ĩ, be"],
      ],
    },
  },
  eo: {
    rules: {
      summary: "One ending for each job. La is the only article.",
      body: "Nouns end in -o, adjectives in -a, adverbs in -e, and the infinitive in -i. The verb does not agree with the person. Mi trinkas akvon. The -n is the object. Vi is you, singular and plural.",
      points: [
        "Plural is -j, and it goes on the adjective too.",
        "The object adds -n.",
        "Word order is free as long as -n marks the object. Subject, verb, object is the clearest.",
      ],
      samples: [
        ["Mi estas ĉi tie.", "esti, present -as"],
        ["La akvo estas malvarma.", "la, adjective in -a"],
      ],
    },
    verbs: {
      summary: "No person endings. The vowel of the ending is the tense.",
      body: "As is the present. Is is the past. Os is the future. Us is the conditional. Every verb uses the same endings, including esti and iri. There is no irregular verb.",
      points: [
        "Ne before the verb is the no.",
        "The participle endings are a later layer.",
        "Esti takes -as like trinki.",
      ],
      table: {
        caption: "Every verb, including esti",
        heads: ["ending", "time", "example"],
        rows: [
          ["-as", "present", "mi estas"],
          ["-is", "past", "mi iris"],
          ["-os", "future", "mi estos"],
          ["-us", "conditional", "mi estus"],
        ],
      },
      samples: [
        ["Mi vidas la sunon.", "vidi"],
        ["Ni manĝas panon.", "manĝi, object -n"],
      ],
    },
    nouns: {
      summary: "The declension is -j for plural and -n for the object.",
      body: "La domo, la domoj, la domon, la domojn. There is no gender on things. -in- can mark a woman when you need it: viro, virino. Possession is de, or a possessive adjective in -a: mia amiko.",
      points: [
        "Adjectives take -j and -n too, in agreement.",
        "There is no case beyond the object -n.",
        "Pronouns take the same -n: min, lin, ŝin.",
      ],
      table: {
        caption: "domo",
        heads: ["", "singular", "plural"],
        rows: [
          ["subject", "domo", "domoj"],
          ["object", "domon", "domojn"],
        ],
      },
      samples: [
        ["La domo estas malgranda.", "adjective agrees, no plural"],
        ["La infano dormas.", "no person ending"],
      ],
    },
    odd: {
      summary: "There is no irregular verb. The surprises are the correlatives.",
      body: "Esti takes -as, -is, -os, and -us like every other verb. What learners treat as irregular is the correlative table: kiu, tiu, kio, tio, and the rest. It is regular once you see the grid. Stress stays on the second vowel from the end.",
      points: [
        "Do not invent a person ending.",
        "La is invariable.",
        "Proper names sometimes omit -o. The -n still attaches if they are objects.",
      ],
      samples: [
        ["Kio estas tio?", "a correlative, not an irregular verb"],
        ["Vi venas al la domo.", "veni, still regular"],
      ],
    },
  },
  isv: {
    rules: {
      summary: "No article. One Slavic grammar, written three ways.",
      body: "Ja jesm tu. The same sentence is on the card in Latin, Cyrillic, and Glagolitic. Learn the Latin line. The speaker uses that line. Ty is the friend-form. A feminine noun takes agreement: voda jest zimna. There is no word for the.",
      points: [
        "Jesm, jesi, jest, jesmo, jeste, sųt.",
        "The adjective agrees in gender.",
        "Ne comes before the verb.",
      ],
      samples: [
        ["Ja jesm tu.", "byti"],
        ["Žena jest tu.", "no article"],
      ],
    },
    verbs: {
      summary: "Person endings. Byti is irregular. The rest is built to be regular.",
      body: "Viděti is viđu, vidiš, vidi. Jesti is jem, ješ, je. The card’s come is prihodiš. A past participle agrees in gender. Interslavic keeps aspect pairs, as the Slavic languages do. The present of byti is the one you cannot build from the infinitive.",
      points: [
        "Do not invent a fourth script.",
        "The infinitive is the citation form.",
        "A perfective present can mark a future, as in Slavic generally.",
      ],
      table: {
        caption: "Present",
        heads: ["", "byti", "viděti", "jesti"],
        rows: [
          ["ja", "jesm", "viđu", "jem"],
          ["ty", "jesi", "vidiš", "ješ"],
          ["ona", "jest", "vidi", "je"],
          ["my", "jesmo", "vidimo", "jemo"],
        ],
      },
      samples: [
        ["Ja viđu sȯlnce.", "viděti"],
        ["My jemo hlěb.", "jesti"],
      ],
    },
    nouns: {
      summary: "Cases, as in Slavic. Start with nominative and accusative.",
      body: "Voda, vodu. Dom, and its cases. There is no article to decline. The adjective takes the noun’s case. Dętę and dveri are learned with their own plural. The Latin, Cyrillic, and Glagolitic lines are the same grammar.",
      points: [
        "Learn the Latin form first.",
        "A living masculine object often uses the genitive shape.",
        "The same ending is not always spelled with the same Latin letter across the flavors. Trust the card.",
      ],
      samples: [
        ["Voda jest zimna.", "nominative"],
        ["Dom jest maly.", "masculine"],
      ],
    },
    odd: {
      summary: "Byti, jesti, and idti. The alphabet is not an irregular verb.",
      body: "Jesm does not contain byti as a visible stem. Jem belongs to jesti. Idti’s present is idu, and it is the motion verb to learn whole. The three scripts are spellings of one sentence, not three grammars. Do not treat a Glagolitic letter as a new ending.",
      points: [
        "Do not drop jesm. Interslavic says it.",
        "Aspect pairs are learned together.",
        "A flavor that adds ė or ȯ is still the same word.",
      ],
      samples: [
        ["jesm · jesi · jest", "byti"],
        ["Ty prihodiš k domu.", "prihoditi"],
      ],
    },
  },
  tok: {
    rules: {
      summary: "A very small vocabulary, and a few particles that do all of the grammar.",
      body: "mi lon ni. e marks the object. li marks the predicate when the subject is not mi or sina. There is no tense ending. Time is a word such as tenpo pini if you need it. moku is both eat and drink.",
      points: [
        "mi and sina do not take li.",
        "Modifiers follow the word they narrow.",
        "One word can be a noun or a verb depending on the slot.",
      ],
      samples: [
        ["mi lon ni.", "lon for place, no li after mi"],
        ["meli li lon ni.", "li after a third-person subject"],
      ],
    },
    verbs: {
      summary: "Nothing conjugates. li and a preverb do the work.",
      body: "moku is eat for every person and every time. wile before it is want. ken is can. kama and tawa are come and go, and they are also preverbs. There is no irregular stem, because there is no stem change at all.",
      points: [
        "Negation is ala after the verb: mi moku ala.",
        "A preverb comes between li and the main word.",
        "Do not add a plural or a past ending.",
      ],
      samples: [
        ["mi lukin e suno.", "e marks the object"],
        ["mi mute li moku e pan.", "li after mi mute"],
      ],
    },
    nouns: {
      summary: "No case, no article, no plural ending. Word order is the marking.",
      body: "The subject comes first. e introduces the object. lon introduces a place. A second word narrows the first: jan lili, tomo lili. Names take a capital and usually sit after jan.",
      points: [
        "Do not invent a plural suffix.",
        "Possession can be a modifier after the noun.",
        "mute is many, and it is a word, not an ending.",
      ],
      samples: [
        ["telo li lete.", "adjective after the noun"],
        ["jan lili li lape.", "a compound subject"],
      ],
    },
    odd: {
      summary: "The irregularity is that mi and sina skip li.",
      body: "ona li moku, but mi moku and sina moku. That is the exception. mi mute is no longer just mi, so li returns: mi mute li moku. Ala, e, and li do not change for person.",
      points: [
        "Do not put li after mi or sina alone.",
        "Do not put e on a place. That is lon.",
        "Compounds are phrases, not new endings.",
      ],
      samples: [
        ["sina jan pona mi.", "no li, a noun predicate"],
        ["sina kama lon tomo.", "kama, lon"],
      ],
    },
  },
  aur: {
    rules: {
      summary: "na is the article. sa means is. Adjectives follow the noun.",
      body: "Aurali is the original language of this course. An sa asi. The plural is -n on the noun. Word order stays subject, sa or the verb, then the rest. Te is you. Keep the shapes on the cards. Do not import endings from a natural language.",
      points: [
        "na before a noun.",
        "sa for is.",
        "A content verb does not take sa.",
      ],
      samples: [
        ["An sa asi.", "sa is the copula"],
        ["Na sela sa asi.", "na, then the noun"],
      ],
    },
    verbs: {
      summary: "sa does not conjugate. Other verbs stay as they are on the card.",
      body: "There is no person ending. Say the pronoun. An ora na hari is I see. Ane mesa tasi is we eat. Te vena ve na hara is you come. Tense, if a card needs it, is a separate word rather than a new stem.",
      points: [
        "One form of sa for every person.",
        "Do not add -s.",
        "Learn each new verb as one unchanged shape.",
      ],
      table: {
        caption: "sa, the only copula",
        heads: ["", "sa"],
        rows: [
          ["an", "sa"],
          ["te", "sa"],
          ["le", "sa"],
          ["ane", "sa"],
        ],
      },
      samples: [
        ["An ora na hari.", "ora, no sa"],
        ["Ane mesa tasi.", "mesa"],
      ],
    },
    nouns: {
      summary: "The plural -n is the whole declension.",
      body: "na hara, na haran. There is no case ending and no gender. Adjectives follow the noun and do not agree. Na nai, na selo, na miri, na pela. If the card shows a phrase, learn the phrase rather than building a new case.",
      points: [
        "-n is the plural.",
        "na stays na in the plural.",
        "No gender to memorize.",
      ],
      samples: [
        ["Na hara sa lini.", "adjective after the noun"],
        ["Na nai sa nesi.", "sa, not a person ending"],
      ],
    },
    odd: {
      summary: "sa is the only form that feels irregular, and it is irregular only from English.",
      body: "Aurali was built to stay regular. Do not invent stem changes. If a card ever shows a second form, that form is the one to trust, not a rule from Latin or Spanish. Do not borrow si for if.",
      points: [
        "Do not conjugate sa.",
        "Do not add gender.",
        "The card is the authority for this language.",
      ],
      samples: [
        ["An sa asi.", "one copula"],
        ["Te vena ve na hara.", "vena, unchanged"],
      ],
    },
  },
  sig: {
    rules: {
      summary: "Each sign stores an English line. The grammar under the signs is English.",
      body: "Signal is an original script. It does not add a new grammar. Learn the English sentence the sign stands for: word order, helpers, and pronoun case. The speaker plays a figure a machine can turn back into that line.",
      points: [
        "Read the English under the sign.",
        "Do not look for a Signal case ending.",
        "One sign, one stored sentence.",
      ],
      samples: [
        ["I drink water.", "the grammar is this sentence"],
        ["She sees the train.", "English agreement still applies"],
      ],
    },
    verbs: {
      summary: "Conjugate the English verb, not the sign.",
      body: "Am, is, are, and the third-person -s are still required, because the stored sentence is English. The sign does not change when the English verb does. If the English line changes, it is a different sign. Be, have, and do stay irregular English.",
      points: [
        "Tense lives in the English line.",
        "Do, does, and did carry questions and the simple no.",
        "A modal such as can does not take -s.",
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
      samples: [
        ["I am here.", "English be"],
        ["She went.", "English irregular past"],
      ],
    },
    nouns: {
      summary: "English pronoun case is the only declension.",
      body: "I and me, she and her. Signal does not add cases of its own. Plurals are the English plurals of the stored line. The article is the English article.",
      points: [
        "Subject and object pronouns differ.",
        "Nouns do not take a Signal case.",
        "Child, children stays irregular because the English does.",
      ],
      samples: [
        ["Give it to her.", "object pronoun"],
        ["the children", "irregular English plural"],
      ],
    },
    odd: {
      summary: "The irregulars are the English irregulars.",
      body: "Go, went, gone. See, saw, seen. Be, was, been. The script does not regularize them. Learn the English set, and treat the sign as the spelling. There is no second irregular list hiding in the symbols.",
      points: [
        "No new irregulars beyond English.",
        "Do not simplify a stored sentence.",
        "If a line looks odd, it is still English.",
      ],
      samples: [
        ["I have seen it.", "English participle"],
        ["went", "not a regular past"],
      ],
    },
  },
};
