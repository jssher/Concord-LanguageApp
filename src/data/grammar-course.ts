import { LANG_BY_ID } from "./languages";
import { PATH, type PathStage } from "./path";
import { SPECIFIC } from "./grammar-specific";

export type GramLesson = PathStage & {
  body: string;
  pattern: string;
};

type Note = Record<string, { body: string; pattern: string }>;

function note(body: string, pattern: string) {
  return { body, pattern };
}

/** Ten steps, A1 to B2, written for this language rather than for a family label. */
const COURSE: Record<string, Note> = {};

function put(id: string, steps: Note) {
  COURSE[id] = steps;
}

put("en", {
  sentence: note("English builds the sentence as subject, verb, object. I drink water. The verb must agree in the present: I drink, she drinks.", "I drink water."),
  nouns: note("The marks a known thing. A or an marks a new one. Plurals usually add -s, but watch men, women, children, and fish.", "the house · a book · children"),
  verbs: note("The present is the dictionary form, with -s for he, she, and it. Irregular present forms to learn early: am, is, are, have, has, do, does, go, goes.", "she sees · he has · they go"),
  food: note("Please and thank you sit at the edge of the sentence. A yes-no question flips the auxiliary: Do you want bread? Not is do not, or don’t.", "Do you want water?"),
  way: note("Where and when stay in place of the answer. The past of regular verbs adds -ed. Learn the irregulars you will say every day: went, saw, bought, came, had.", "Where is the train? · I went"),
  shop: note("Adjectives come before the noun and do not change. Comparatives add -er or more: smaller, more expensive. Adverbs of manner often add -ly.", "a smaller one · too big"),
  plan: note("Yesterday takes the past. Tomorrow takes will or be going to. I worked until twelve, but I can come at one.", "I went yesterday. I will come."),
  if: note("A real condition uses the present in the if-clause and will or can in the result. If we leave now, we will arrive before six. Would rather is the polite preference.", "If we leave now, …"),
  reason: note("Although and but concede a point. Still and even so keep your own view. Because gives the reason after the claim.", "I agree, although it costs more."),
  choice: note("Whereas corrects a contrast. It depends on names the condition. On balance and I would choose keep the decision soft rather than absolute.", "On balance, I would choose …"),
});

put("de", {
  sentence: note("The verb is in second place in a statement. Ich trinke Wasser. In a question it moves first: Trinkst du Wasser? The friend-form is du. Sie is formal.", "Ich trinke Wasser."),
  nouns: note("Every noun has der, die, or das. Learn them together. The article and the ending change with case: the subject is nominative, the object of a verb is usually accusative, and place with in or an often takes dative.", "der Tisch · die Tür · das Haus"),
  verbs: note("The present adds endings: ich trinke, du trinkst, er trinkt, wir trinken. Strong verbs may change the vowel: sehen, ich sehe, du siehst, er sieht. Sein and haben are irregular from the start.", "ich sehe · du siehst · er sieht"),
  food: note("Bitte and danke are enough for the café. A yes-no question is verb first. Nicht follows the verb for a simple no: Ich trinke nicht.", "Möchtest du Brot?"),
  way: note("Wo asks the place. The spoken past is usually haben or sein plus the participle: Ich bin gegangen, ich habe Brot gekauft. Movement and change of state take sein.", "Wo ist der Zug? · Ich bin gegangen."),
  shop: note("Adjectives after der, die, das take an ending: der kleine Tisch, eine kleine Tür. Comparative is smaller as kleiner, or mehr for longer adjectives.", "eine kleinere Größe"),
  plan: note("Gestern uses the perfect in speech. Morgen uses the present plus a time word, or werden: Ich komme morgen um eins. Weil sends the verb to the end.", "Ich habe Brot gekauft, weil …"),
  if: note("Wenn starts a condition and the verb goes to the end. The result clause is verb-second. Wenn wir jetzt gehen, kommen wir vor sechs an. Lieber is the preference: Ich warte lieber.", "Wenn wir jetzt gehen, …"),
  reason: note("Obwohl also sends the verb to the end. Aber does not. Trotzdem can start the next sentence and keeps verb-second. Weil gives the reason.", "Obwohl er mehr kostet, …"),
  choice: note("Während or wohingegen can mark the contrast. Es kommt darauf an, was dir wichtig ist. The verb in the was-clause goes to the end.", "Es kommt darauf an, was …"),
});

put("gsw", {
  sentence: note("Zürich German keeps the verb in second place, like German. Ich bi daa. The friend-form is du. These cards are speech, not schoolbook German, so the shapes will not match a Hochdeutsch table.", "Ich bi daa."),
  nouns: note("The article shrinks: d Frau, de Maa, s Huus. Gender is still there. Case is lighter in speech than in written German, but the article still tells you the gender.", "d Tür · s Huus"),
  verbs: note("Present endings are short. Sein is sii: ich bi, du bisch, er isch. Haben is haa: ich ha. Learn these two before any other irregular.", "ich bi · du bisch · er isch"),
  food: note("Bitte and danke work. A question can be verb-first or marked by tone. The café lines on the Talk page are the ones to say aloud.", "Hesch du Brot?"),
  way: note("Wo isch de Zug? The spoken past uses haa or sii plus a participle, as in German, but the participle may look different. Learn each past with the sentence, not from a Hochdeutsch list.", "Wo isch de Zug?"),
  shop: note("Adjectives usually stay close to the noun and take a short ending after the article. Smaller is chliiner. Say the pair: z gross, chliiner.", "e chliineri Grössi"),
  plan: note("Gester takes the perfect with haa or sii. Morn plus the present is enough for tomorrow. Wil sends the verb toward the end, as weil does in German.", "Ich ha Brot kauft."),
  if: note("Wenn starts the condition. The result is a normal verb-second clause. Lieber marks what you would rather do.", "Wenn mir jetzt gönd, …"),
  reason: note("Obwohl and aber work as in German. Keep obwohl-clauses for the B2 scenes, after the verb-second sentence feels automatic.", "obwohl er mee choschtet"),
  choice: note("Es chunnt druf aa, was dir wichtig isch. Put the deciding point in the was-clause, and let the verb close it.", "Es chunnt druf aa, was …"),
});

put("gsw-be", {
  sentence: note("Bern German also keeps the verb in second place. I bi da. The friend-form is du. These cards are city Bern, not Zürich and not schoolbook German.", "I bi da."),
  nouns: note("The article is d Frau, dr Ma, ds Huus. Gender is still there. Do not correct Bern with a Zürich or Hochdeutsch table.", "d Türe · ds Huus"),
  verbs: note("Sii: i bi, du bisch, är isch. Haa: i ha. Nid is the negation, not nöd.", "i bi · du bisch · är isch"),
  food: note("Bitte and danke work. A question can be verb-first. The words are Bern even when the English line is the same as on the Zürich card.", "Hesch du Brot?"),
  way: note("Wo isch dr Zug? The spoken past uses haa or sii plus a participle. Geit is goes. Loufe is walk.", "Wo isch dr Zug?"),
  shop: note("Adjectives take a short ending after the article. Smaller is chlyner.", "e chlyneri Grössi"),
  plan: note("Gester takes the perfect. Morn plus the present is enough for tomorrow. Wil sends the verb toward the end.", "I ha Brot gchouft."),
  if: note("Wenn starts the condition. The result is a normal verb-second clause. Lieber marks what you would rather do.", "Wenn mir jetzt göö, …"),
  reason: note("Obwohl and aber work as in German. Keep the Bern shapes. Do not swap in Zürich nöd or de.", "obwohl er mee choschtet"),
  choice: note("Es chunnt druf aa, was dir wichtig isch. The verb closes the was-clause.", "Es chunnt druf aa, was …"),
});

put("nl", {
  sentence: note("Dutch is subject, verb, object in a main clause. Ik drink water. The verb still goes to the end in a subordinate clause. The friend-form is je or jij. U is formal.", "Ik drink water."),
  nouns: note("De is common gender. Het is neuter. Learn de or het with the noun. Plurals usually take -en or -s. There is no grammatical case left on ordinary nouns.", "het huis · de deur"),
  verbs: note("The present is ik drink, jij drinkt, hij drinkt, wij drinken. Zijn and hebben are irregular: ik ben, jij bent, ik heb. A separable verb splits in a main clause: ik kom aan.", "ik ben · jij bent · hij is"),
  food: note("Alsjeblieft and dankjewel are the café words. A yes-no question puts the verb first. Niet follows the verb for a simple negation.", "Wil je brood?"),
  way: note("Waar is de trein? The spoken past is hebben or zijn plus a participle: ik ben gegaan, ik heb brood gekocht. Movement takes zijn.", "Ik ben naar de markt gegaan."),
  shop: note("Adjectives add -e after de and after het when the noun is definite or plural: het kleine huis, een klein huis. Comparatives add -er: kleiner.", "een kleinere maat"),
  plan: note("Gisteren uses the perfect. Morgen uses the present plus the time word. Omdat sends the verb to the end.", "Ik heb brood gekocht, omdat …"),
  if: note("Als starts a real condition, and the verb in that clause goes to the end. The result is verb-second. Liever marks the preference.", "Als we nu gaan, …"),
  reason: note("Hoewel sends the verb to the end. Maar does not. Toch keeps your point after the concession.", "Hoewel het meer kost, …"),
  choice: note("Het hangt ervan af wat voor jou belangrijk is. The verb in the wat-clause goes to the end.", "Het hangt ervan af wat …"),
});

put("da", {
  sentence: note("Danish is subject, verb, object. Jeg drikker vand. The verb stays in second place, so a time word at the front pushes the subject after the verb. The friend-form is du.", "Jeg drikker vand."),
  nouns: note("Common gender takes en. Neuter takes et. They become the suffix when the noun is definite: huset, døren. Learn en or et with the new noun.", "et hus · en dør · huset"),
  verbs: note("The present usually adds -r to every person: jeg ser, du ser, hun ser. Være and have are irregular: jeg er, du er, jeg har. There is no person ending to memorize.", "jeg er · jeg har · jeg ser"),
  food: note("Værsgo and tak are enough. A yes-no question is verb first or just the tone. Ikke follows the verb.", "Vil du have brød?"),
  way: note("Hvor er toget? The past adds -ede or -te, and a few verbs change the vowel: gik, så, købte. The perfect uses har or er plus a participle.", "Hvor er toget? · Jeg gik"),
  shop: note("Adjectives agree with en/et and with number: en lille dør, et lille hus, små huse. The comparative adds -ere: mindre is irregular for small.", "en mindre størrelse"),
  plan: note("I går takes the past. I morgen takes the present plus the time, or vil. Fordi can start the reason clause.", "Jeg købte brød i går."),
  if: note("Hvis starts a real condition. The result uses the present or vil. Hellere marks what you would rather do.", "Hvis vi går nu, …"),
  reason: note("Selvom concedes the point. Men is the light but. Alligevel keeps your conclusion.", "Selvom det koster mere, …"),
  choice: note("Det kommer an på, hvad der er vigtigt for dig. Keep the deciding clause after på.", "Det kommer an på, hvad …"),
});

put("is", {
  sentence: note("Icelandic is verb-second. Ég drekk vatn. The friend-form is þú. The verb agrees with the person, and the noun’s ending shows its case.", "Ég drekk vatn."),
  nouns: note("There are three genders and four cases. The definite article is a suffix: húsið, dyrnar. Learn the nominative with the article first. Add accusative when the noun is the object.", "húsið · dyrnar"),
  verbs: note("The present changes by person: ég sé, þú sérð, hún sér. Vera and hafa are irregular: ég er, ég hef. Learn one verb with all three persons before you add more.", "ég er · þú ert · hún er"),
  food: note("Gjörðu svo vel and takk cover the café. A question can be verb-first. Ekki follows the verb for a simple no.", "Viltu brauð?"),
  way: note("Hvar er lestin? The past is a separate stem for strong verbs. The perfect uses hafa plus a supine. Learn went, saw, and bought as whole sentences.", "Hvar er lestin?"),
  shop: note("Adjectives agree in gender, number, and case. The strong ending is used without an article, the weak ending after the definite suffix. Smaller is minni.", "minni stærð"),
  plan: note("Í gær takes the past. Á morgun takes the present plus the time word. Að plus the infinitive names the next action.", "Ég fór á markaðinn."),
  if: note("Ef starts a real condition. The result stays verb-second. Heldur marks the preference.", "Ef við förum núna, …"),
  reason: note("Þótt concedes a point and takes a subordinate word order. En is the ordinary but.", "Þótt það kosti meira, …"),
  choice: note("Það fer eftir því hvað skiptir þig máli. Keep the hvað-clause intact rather than translating word by word from English.", "Það fer eftir því hvað …"),
});

put("es", {
  sentence: note("Spanish can drop the subject. Bebo agua. The ending shows the person. The friend-form in these cards is tú. Usted is formal.", "Bebo agua."),
  nouns: note("Nouns are el or la. The adjective usually follows and agrees: el agua fría, la puerta abierta. A few masculine nouns take el but stay masculine, like el día.", "el agua · la puerta"),
  verbs: note("Present endings fall into -ar, -er, and -ir. Beber: bebo, bebes, bebe. Stem-changing verbs change in the singular and the third plural: quiero, quieres, quiere. Ser and ir are irregular.", "bebo · bebes · bebe"),
  food: note("Por favor and gracias frame the request. A yes-no question is the same order as a statement, with the tone rising. No comes before the verb: no bebo.", "¿Quieres pan?"),
  way: note("¿Dónde está el tren? Estar is for place. The preterite is the finished past: fui, vi, compré. The imperfect is the background, and it can wait until the plan scene.", "¿Dónde está el tren? · Fui"),
  shop: note("Más pequeño or menor compares. Demasiado and muy come before the adjective. The adjective still agrees when it follows the noun.", "una talla más pequeña"),
  plan: note("Ayer takes the preterite. Mañana takes ir a or the present plus the time. Porque gives the reason and takes the indicative here.", "Ayer fui al mercado."),
  if: note("Si plus the present, then the future or the present, for a real condition. Si salimos ahora, llegamos antes de las seis. Preferiría is the soft wish.", "Si salimos ahora, …"),
  reason: note("Aunque plus the indicative concedes a fact. Pero is lighter. Aun así keeps your conclusion.", "Aunque cuesta más, …"),
  choice: note("Aunque can also introduce the objection you accept. Depende de lo que te importe. En conjunto keeps the choice soft.", "Depende de lo que …"),
});

put("pt", {
  sentence: note("These cards use Brazilian Portuguese. The subject can drop. Bebo água. Você is the you of these sentences. Tu exists, but you do not need it yet.", "Bebo água."),
  nouns: note("O and a mark gender. They contract with de and em: do, da, no, na. Adjectives usually follow and agree: a água fria.", "a água · a porta · do mercado"),
  verbs: note("Present endings differ for -ar, -er, and -ir. Beber: bebo, você bebe, nós bebemos. Ser, ir, and ter are irregular. The gerund with estar is the action in progress: estou bebendo.", "bebo · você bebe"),
  food: note("Por favor and obrigado or obrigada. A question is the statement plus tone, or a question word in front. Não comes before the verb.", "Você quer pão?"),
  way: note("Onde fica a estação? The finished past is the pretérito: fui, vi, comprei. Location of a building prefers ficar.", "Onde fica o trem?"),
  shop: note("Mais pequeno or menor. Adjectives agree. Um pouco and muito sit before the adjective and do not agree.", "um tamanho menor"),
  plan: note("Ontem takes the pretérito. Amanhã takes ir plus infinitive or the present. Porque gives the reason.", "Ontem fui ao mercado."),
  if: note("Se plus the present, then the future or the present. Se sairmos agora, chegamos antes das seis. Eu preferia is the soft preference.", "Se sairmos agora, …"),
  reason: note("Embora plus the subjunctive is the careful concession. Mas is the everyday but. Use mas first. Add embora when the B2 scene is comfortable.", "mas custa mais"),
  choice: note("Depende do que importa para você. No balanço and eu escolheria keep the decision open.", "Depende do que …"),
});

put("it", {
  sentence: note("The subject usually drops. Bevo acqua. The ending shows the person. Tu is the friend-form. Lei is formal.", "Bevo acqua."),
  nouns: note("Il, lo, la, and l’ agree with gender and the next sound. Lo before s plus consonant and z. Adjectives usually follow and agree: l’acqua fredda.", "l’acqua · la porta · il libro"),
  verbs: note("Present endings split into -are, -ere, and -ire. Bere is irregular: bevo, bevi, beve. Essere and avere are the two auxiliaries to learn before any past.", "bevo · bevi · beve"),
  food: note("Per favore and grazie. A yes-no question is the statement with a rising tone. Non comes before the verb.", "Vuoi del pane?"),
  way: note("Dov’è il treno? The passato prossimo is the spoken past: sono andato, ho comprato. Movement and change take essere, and the participle agrees.", "Sono andato al mercato."),
  shop: note("Più piccolo compares. Molto and troppo come before the adjective. The adjective still agrees when it follows.", "una taglia più piccola"),
  plan: note("Ieri takes the passato prossimo. Domani takes the present plus the time, or the future if you want it explicit. Perché gives the reason.", "Ieri ho comprato il pane."),
  if: note("Se plus the present, then the present or the future, for a real plan. Se partiamo ora, arriviamo prima delle sei. Preferirei is the soft wish.", "Se partiamo ora, …"),
  reason: note("Anche se concedes a fact. Ma is the light but. Però can start the sentence that keeps your view.", "Anche se costa di più, …"),
  choice: note("Dipende da quello che conta per te. Nel complesso and sceglierei leave the choice open.", "Dipende da quello che …"),
});

put("fr", {
  sentence: note("French needs the subject pronoun. Je bois de l’eau. The friend-form is tu. Vous is both formal and plural.", "Je bois de l’eau."),
  nouns: note("Le, la, and l’ agree with gender. Du, de la, and des mark an unspecified amount. Adjectives usually follow, but a short common set comes before: petit, bon, grand.", "de l’eau · la porte · le pain"),
  verbs: note("Present endings are written more than they are heard. Boire: je bois, tu bois, il boit. Être, avoir, aller, and faire are irregular and appear in almost every scene.", "je bois · tu bois · il boit"),
  food: note("S’il vous plaît and merci. A yes-no question can be est-ce que, or just the tone. Ne … pas wraps the verb in careful speech. In the café, pas alone is common.", "Vous voulez du pain ?"),
  way: note("Où est le train ? The spoken past is the passé composé: je suis allé, j’ai acheté. Movement takes être, and the participle agrees with the subject.", "Je suis allé au marché."),
  shop: note("Plus petit compares. The adjective agrees. Trop and très come before it. A size is une taille.", "une taille plus petite"),
  plan: note("Hier takes the passé composé. Demain takes the present plus the time, or aller plus infinitive. Parce que gives the reason.", "Hier, j’ai acheté du pain."),
  if: note("Si plus the present, then the present or the future. Si nous partons maintenant, nous arrivons avant six heures. Je préférerais is the soft wish.", "Si nous partons maintenant, …"),
  reason: note("Bien que takes the subjunctive and can wait. Mais and pourtant are enough for the train-or-bus scene. Quand même keeps your point.", "mais il coûte plus cher"),
  choice: note("Ça dépend de ce qui compte pour toi. Tout compte fait and je choisirais keep the decision soft.", "Ça dépend de ce qui …"),
});

put("ro", {
  sentence: note("Romanian can drop the subject. Beau apă. The ending shows the person. Tu is the friend-form. The noun often carries its own article as a suffix.", "Beau apă."),
  nouns: note("The definite article is a suffix: casa, apa. The indefinite is un or o before the noun. Adjectives usually follow and agree. Gender is masculine, feminine, or neuter.", "casa · o ușă · o carte"),
  verbs: note("The present changes by person and by conjugation class. A bea: beau, bei, bea. A fi and a avea are irregular: sunt, ești, este, and am, ai, are.", "beau · bei · bea"),
  food: note("Vă rog and mulțumesc. A yes-no question is the statement with rising tone. Nu comes before the verb.", "Vrei pâine?"),
  way: note("Unde este trenul? The compound perfect with a avea is the ordinary past: am mers, am cumpărat.", "Unde este trenul? · Am mers"),
  shop: note("Mai mic compares. The adjective agrees and usually follows the noun. Prea and foarte come before it.", "o mărime mai mică"),
  plan: note("Ieri takes the compound perfect. Mâine takes the present plus the time, or the future with o să. Pentru că gives the reason.", "Ieri am cumpărat pâine."),
  if: note("Dacă plus the present, then the present or the future. Dacă plecăm acum, ajungem înainte de șase. Aș prefera is the soft wish.", "Dacă plecăm acum, …"),
  reason: note("Deși concedes a fact. Dar is the light but. Totuși keeps the conclusion.", "Deși costă mai mult, …"),
  choice: note("Depinde de ce contează pentru tine. În ansamblu and aș alege leave the choice open.", "Depinde de ce …"),
});

put("rm", {
  sentence: note("Rumantsch Grischun usually keeps the pronoun. Jau ves tai. Ti is the friend-form. Vus is the plural, and with a capital it is the polite you. A word at the front sends the verb before the subject.", "Jau ves tai."),
  nouns: note("il before a masculine consonant, la before a feminine consonant, l’ before a vowel. in and ina are a, and also one. The adjective agrees: il grond chaun, la gronda paraid.", "l’aua · il cudesch · la chasa"),
  verbs: note("Esser: jau sun, ti es, el è, nus essan, vus essas, els èn. Avair: jau hai, ti has, el ha, nus avain, vus avais, els han. Ir does not follow its infinitive: jau vom, ti vas, el va.", "jau sun · jau hai · jau vom"),
  food: note("Gea is yes. Na … betg is the negation: Jau na ta ves betg. Allegra greets someone. Bun di and buna notg follow the time of day. A question puts the verb first.", "Gea. · Na … betg."),
  way: note("Tge asks what. Pertgè asks why, and the verb stands before the subject: Pertgè na vegnis vus betg? Going uses ir, whose present is vom, vas, va, not a form you can build from the infinitive.", "Pertgè na vegnis vus betg?"),
  shop: note("Pli … che compares: Questa giacca è pli pitschna che quella. The adjective still agrees. Grond, gronda is big. Pitschen, pitschna is small.", "pli pitschna che"),
  plan: note("Ier is yesterday. Avair’s participle is gì, gida. Esser’s is stà, stada. Ir’s is ì, ida. Learn each participle as a pair, not by changing the infinitive.", "ier · gì · stà · ì"),
  if: note("Sche introduces a condition. The result stays a normal clause. Na … betg still wraps the verb inside either half. Vus with a capital is the polite subject of a request.", "sche"),
  reason: note("Perquai che gives the reason. Ma is but. E is and, and u is or. The reason clause does not drop the subject pronoun.", "perquai che"),
  choice: note("Pli … che and main … che are the contrast you already know from comparison. Keep il or la on the noun you choose, and keep the adjective in agreement with it.", "pli … che · main … che"),
});

put("la", {
  sentence: note("Classical Latin has no article and often no stated subject. Aquam bibo. The ending of the noun shows its job, and the ending of the verb shows the person. Word order is freer than English.", "Aquam bibo."),
  nouns: note("Learn the nominative and the genitive together. They tell you the declension. The accusative is the ordinary object: aquam, ianuam. There is no word for the or a.", "aqua, aquae · iānua, iānuae"),
  verbs: note("The present active is the first table: bibō, bibis, bibit. Sum and possum are irregular. The infinitive on the card is the dictionary form.", "bibō · bibis · bibit"),
  food: note("Quaeso and grātiās agō cover a request. -ne on the first word can mark a yes-no question. Nōn comes before the verb.", "Vīsne pānem?"),
  way: note("Ubi est trāmen is modern vocabulary in a classical frame. The perfect is the finished past: iī, vīdī, ēmī. Learn those three before a full perfect table.", "Ubi est? · Iī"),
  shop: note("Adjectives agree in gender, number, and case. The comparative is often -ior, or minor for small. Put the adjective after the noun at first.", "magnitūdō minor"),
  plan: note("Herī takes the perfect. Crās takes the future: crās veniam. Quod gives a factual reason.", "Herī pānem ēmī."),
  if: note("Sī plus the present indicative, then the future, for a real condition. Sī nunc discēdimus, ante sextam adveniēmus. Mālim is the soft preference.", "Sī nunc discēdimus, …"),
  reason: note("Quamquam concedes a fact and takes the indicative. Sed is the light but.", "Quamquam plūs cōnstat, …"),
  choice: note("Pendet ex eō quid tibi intersit. In ūniversum and ēligam leave the decision open. Keep the case of the noun you choose visible.", "Pendet ex eō quid …"),
});

put("zh", {
  sentence: note("Mandarin is topic, then comment. 我喝水 is I drink water. There is no am. 是 links two nouns: 我是安娜. The verb does not change for person.", "我喝水。"),
  nouns: note("A number needs a measure word. Start with 个 for people and many things: 一个人, said yí ge. Then add 本 for books, 张 for flat things, 杯 for cups, and 条 for long things. 一个书 is understood, but 一本书 is the form to learn.", "一个人 · 一本书 · 一杯水"),
  verbs: note("The verb has one shape. 在 before the verb is the action in progress: 我在喝水. 了 after the verb marks a completed action and can wait until the past step. 是, 有, and 在 are the three verbs to know cold.", "我在喝水。"),
  food: note("请 and 谢谢 frame a request. A yes-no question adds 吗: 你要面包吗？ The word order does not flip.", "你要面包吗？"),
  way: note("哪儿 or 哪里 asks where. 在 marks location: 火车在那边. There is no preposition stack. 了 marks the completed trip: 我去了市场.", "火车在哪儿？"),
  shop: note("比 builds a comparison: 这件比那件小. 很 and 太 come before the adjective. The adjective does not agree with anything.", "这件比较小。"),
  plan: note("昨天 plus 了 is yesterday’s completed action. 明天 plus 要 or 会 is the plan. 因为 … 所以 … gives the reason and the result.", "昨天我去了市场。"),
  if: note("如果 … 就 … is the real condition. 如果现在走，我们六点前就到. 宁可 or 更希望 marks the preference in the late-train scene.", "如果现在走，就 …"),
  reason: note("虽然 … 但是 … is the concession. Both halves stay. 因为 gives the reason. Do not drop 但是 just because English can drop but.", "虽然更贵，但是 …"),
  choice: note("取决于 what it depends on. 总的来说 and 我会选 keep the choice soft. 反而 corrects a wrong contrast.", "这取决于什么对你重要。"),
});

put("yue", {
  sentence: note("Cantonese is topic, then comment. 我飲水. There is no am. 係 links two nouns. The verb does not change for person. These cards use traditional characters and Jyutping.", "我飲水。"),
  nouns: note("A number needs a measure word, as in Mandarin, but the spoken word is often different. 個 is the general one: 一個人. 本 for books, 張 for flat things, 杯 for cups. Learn the Jyutping with the measure word.", "一個人 · 一本書 · 一杯水"),
  verbs: note("The verb has one shape. 緊 after the verb is the action in progress: 我飲緊水. 咗 marks completion: 我去咗街市. 係, 有, and 喺 are the three to know cold.", "我飲緊水。"),
  food: note("唔該 and 多謝 are not the same thank-you. 唔該 is for a service, 多謝 for a gift. A yes-no question can use 嗎 or a verb-not-verb form: 要唔要.", "你要唔要麵包？"),
  way: note("邊度 asks where. 喺 marks location. 咗 marks the completed trip. There is no tense ending on the verb.", "火車喺邊度？"),
  shop: note("啲 and 少啲 compare without an ending. 太 and 好 come before the adjective. Nothing agrees.", "呢件細啲。"),
  plan: note("琴日 plus 咗 is yesterday. 聽日 plus 會 is the plan. 因為 … 所以 … holds the reason and the result.", "琴日我去咗街市。"),
  if: note("如果 … 就 … is the real condition. 我寧願 marks what you would rather do.", "如果而家走，就 …"),
  reason: note("雖然 … 但係 … is the concession. Keep both halves. 因為 gives the reason.", "雖然貴啲，但係 …"),
  choice: note("視乎 what it depends on. 總括嚟講 and 我會揀 keep the choice soft.", "視乎邊樣對你重要。"),
});

put("ja", {
  sentence: note("Japanese is topic, then comment, and the verb closes the sentence. 私は水を飲みます. は marks the topic. を marks the object. The polite present is ます.", "私は水を飲みます。"),
  nouns: note("There is no article and no gender. の joins two nouns: 私の名前. A counter is needed when you count: 一つ, 一杯, 一冊. Learn the counter with the thing.", "水を一杯 · 本を一冊"),
  verbs: note("ます is the polite present and the dictionary form is what the card shows. 飲みます comes from 飲む. です is the polite copula. いる and ある both mean exist, for animate and inanimate.", "飲みます · です"),
  food: note("ください after the object is the café request: 水をください. か at the end makes a question. ません is the polite no.", "水をください。"),
  way: note("どこ asks where. に marks the destination. The polite past replaces ます with ました: 行きました, 見ました. へ can also mark a direction.", "駅はどこですか。"),
  shop: note("い-adjectives take です in polite speech and change for the past: 小さいです, 小さかったです. な-adjectives need な before a noun. より compares.", "こちらのほうが小さいです。"),
  plan: note("昨日 takes ました. 明日 takes ます plus the time word, or つもり for an intention. から gives the reason and comes after it.", "昨日市場へ行きました。"),
  if: note("たら is the ordinary if for a real plan: 今出発したら、六時前に着きます. ほしい or てもらえますか softens a request to wait.", "今出発したら、…"),
  reason: note("が or けど concedes and stays polite. から gives the reason. でも starts the sentence that keeps your view.", "高いですが、時間はかかりません。"),
  choice: note("によります names what it depends on. どちらかというと and 選びます keep the choice soft. のではなく corrects a misunderstanding.", "静けさによります。"),
});

put("ko", {
  sentence: note("Korean is topic, then comment, and the verb closes the sentence. 저는 물을 마셔요. 은/는 marks the topic. 을/를 marks the object. These cards use polite 해요 style.", "저는 물을 마셔요."),
  nouns: note("There is no article and no gender. Counters are used with numbers: 물 한 잔, 책 한 권. The noun comes before the counter.", "물 한 잔 · 책 한 권"),
  verbs: note("해요 is the polite present. The dictionary form ends in 다: 마시다 becomes 마셔요. 이다 is the copula and attaches to the noun: 물이에요.", "마셔요 · 이에요"),
  food: note("주세요 after the noun is the request: 물 주세요. A question can be the same sentence with a rising tone, or 요 plus the question intonation. 안 before the verb is the simple no.", "물 주세요."),
  way: note("어디 asks where. 에 marks a place. The polite past is 했어요: 갔어요, 봤어요. There is no person ending.", "기차가 어디 있어요?"),
  shop: note("Adjectives behave like verbs. 더 작아요 compares. 너무 and 아주 come before the descriptive verb. Nothing agrees with gender.", "이게 더 작아요."),
  plan: note("어제 takes 었어요 or 았어요. 내일 takes the present plus the time, or 을 거예요 for a plan. 때문에 follows the reason.", "어제 시장에 갔어요."),
  if: note("면 or 으면 is the real if: 지금 출발하면 여섯 시 전에 도착해요. 으면 좋겠어요 is the soft preference.", "지금 출발하면 …"),
  reason: note("지만 concedes: 비싸지만 시간이 적게 걸려요. 왜냐하면 can introduce the reason. 그래도 keeps your point.", "비싸지만 …"),
  choice: note("에 달렸어요 names what it depends on. 차라리 and 을 것 같아요 keep the choice soft.", "무엇에 달렸어요."),
});

put("ar", {
  sentence: note("Modern Standard Arabic starts from the verb or from the noun. أَشْرَبُ مَاءً is I drink water. The prefix and the vowel pattern show the person. These cards are vowelled so the pattern is readable.", "أَشْرَبُ مَاءً."),
  nouns: note("Nouns are masculine or feminine. Feminine often ends in ة. The article is ال. A noun possessed by another noun is an idafa: the first noun has no ال, and the second is definite. بَابُ الْبَيْتِ is the door of the house.", "بَابُ الْبَيْتِ"),
  verbs: note("The present takes prefixes: أَشْرَبُ, تَشْرَبُ, يَشْرَبُ. The past is a suffix pattern: شَرِبْتُ, شَرِبَ. Learn one sound verb in both before you meet a hollow or weak root.", "أَشْرَبُ · تَشْرَبُ · يَشْرَبُ"),
  food: note("مِنْ فَضْلِكَ and شُكْرًا. A yes-no question can begin with هَلْ. The negative of the present is لَا before the verb.", "هَلْ تُرِيدُ خُبْزًا؟"),
  way: note("أَيْنَ asks where. The past is the finished action: ذَهَبْتُ. Dual forms exist for two, but the café and the station can stay in the singular until the pattern is familiar.", "أَيْنَ الْقِطَارُ؟"),
  shop: note("Adjectives follow the noun and agree in gender and definiteness. The comparative أَصْغَرُ does not agree in the simple bigger-than pattern.", "مَقَاسٌ أَصْغَرُ"),
  plan: note("أَمْسِ takes the past. غَدًا takes the present plus the time word, or سَ plus the present. لِأَنَّ gives the reason and takes a noun or a suffix after it.", "ذَهَبْتُ أَمْسِ إِلَى السُّوقِ."),
  if: note("إِذَا plus the past form can still mean a real future condition. إِذَا خَرَجْنَا الْآنَ نَصِلُ قَبْلَ السَّادِسَةِ. أُفَضِّلُ أَنْ is the preference.", "إِذَا خَرَجْنَا الْآنَ …"),
  reason: note("مَعَ أَنَّ concedes. لَكِنَّ is the but. Keep the accusative ending on لَكِنَّ when a noun follows, once the vowels are comfortable.", "مَعَ أَنَّهُ أَغْلَى …"),
  choice: note("يَتَوَقَّفُ عَلَى what it depends on. فِي الْمُحَصِّلَةِ and سَأَخْتَارُ keep the choice soft. The second noun in an idafa stays genitive.", "يَتَوَقَّفُ عَلَى مَا يَهُمُّكَ."),
});

put("ru", {
  sentence: note("Russian has no articles. The verb usually agrees with the subject, and the noun’s ending shows its job. Я пью воду. Вода is the object, so it takes the accusative воду.", "Я пью воду."),
  nouns: note("Learn the nominative first. The accusative of a feminine noun often changes -а to -у. Masculine animate objects also change. There are six cases. Add the dative and the prepositional only when a sentence forces them.", "вода · воду · дом"),
  verbs: note("The present has two conjugation patterns. Пить: пью, пьёшь, пьёт. Быть is almost absent in the present: Я здесь, not I am here. The aspect pair, imperfective and perfective, matters more than tense.", "пью · пьёшь · пьёт"),
  food: note("Пожалуйста and спасибо. A yes-no question is the statement plus tone, or ли after the verb. Не comes before the verb.", "Хочешь хлеба?"),
  way: note("Где asks where something is. Куда asks where it is going. The past does not mark person. It marks gender: я был, я была, and the perfective пошёл or пошла is the completed trip.", "Где поезд? · Я пошёл"),
  shop: note("Adjectives agree in gender, number, and case. The comparative is often меньше or a short form with -ее. Новый becomes новее.", "размер меньше"),
  plan: note("Вчера takes the past, and the perfective verb if the action finished. Завтра takes the perfective future, which looks like the present of the perfective: куплю. Потому что gives the reason.", "Вчера я купил хлеб."),
  if: note("Если plus the future perfective, then the future, for a real plan. Если выйдем сейчас, придём до шести. Я бы предпочёл is the soft wish and brings the conditional particle бы.", "Если выйдем сейчас, …"),
  reason: note("Хотя concedes. Но is the light but. Всё же keeps your conclusion. The case of the noun does not relax just because the sentence is longer.", "Хотя он дороже, …"),
  choice: note("Зависит от того, что для тебя важно. В целом and я бы выбрал leave the decision open. Бы is the conditional particle.", "Зависит от того, что …"),
});

function familyFallback(id: string, name: string, family: string): Note {
  const shared = {
    food: note(`${name}: please and thank you sit beside the request. A yes-no question does not need English word order. Negation stays next to the verb, or on the particle this language actually uses.`, "please · thank you"),
    way: note(`${name}: learn where and when as whole questions. Then one completed form for went and saw. Do not build a full tense table before those two sentences are easy.`, "Where is it?"),
    shop: note(`${name}: compare with the word this language uses for smaller. If the adjective agrees, agree. If it does not, do not invent an ending.`, "a smaller one"),
    plan: note(`${name}: yesterday’s finished action, then tomorrow’s plan. Because introduces the reason after you have made the claim.`, "yesterday · tomorrow"),
    if: note(`${name}: a real if about a plan you can still carry out. Then the preference I would rather. Save imaginary past conditions for later.`, "If we leave now, …"),
    reason: note(`${name}: one word concedes the other person’s fact, and a different word keeps your conclusion. Although and but are not the same word.`, "although · but"),
    choice: note(`${name}: it depends on, said with this language’s verb, and a soft I would choose. Correct a wrong contrast before you close the decision.`, "It depends on …"),
  };
  const head: Note = {
    sentence: note(`${name} starts with a short sentence you can say today. Keep the friend-form, and keep every marker the language puts on the noun or the verb.`, "I am here."),
    nouns: note(`${name}: learn the noun with its article, class, gender, or ending. The bare dictionary stem is not always a word you can say.`, "house · water"),
    verbs: note(`${name}: learn I, you, and one third person in the present or polite form. Be, have, go, and see come before a regular table.`, "I see"),
    ...shared,
  };
  if (family === "Celtic") {
    head.sentence = note(`${name} puts the verb first in a plain sentence. The article can change the first consonant of the noun. Learn the dictionary form, then the form after the article.`, "Tá mé anseo. · Mae hi yma.");
    head.nouns = note(id === "ga"
      ? "Irish an comes before the noun and can lenite or eclipse the first letter. Learn an plus the noun as one piece."
      : "Welsh y or yr comes before the noun. A feminine singular often softens the first letter after the article. Learn the pair.", id === "ga" ? "an doras" : "y drws");
  }
  if (family === "Dravidian") {
    head.sentence = note(`${name} stacks endings on the verb. The verb usually closes the sentence. There is no European-style article.`, "I drink water.");
    head.nouns = note(`${name} does not sort table and water into masculine and feminine the way Hindi does. Case is a suffix. Learn the noun and the accusative or dative suffix as a pair.`, "house · water");
  }
  if (family === "Bantu" || id === "ln") {
    head.nouns = note(`${name} marks the noun with a class prefix, and the verb agrees with that class. People take one pair of prefixes. Things take another. Learn the singular and the plural together.`, "person · people");
  }
  if (family === "Austronesian" && id === "tl") {
    head.sentence = note("Tagalog often puts the predicate first. Ang marks the focus of the sentence, the noun the verb is about. It is not simply the English subject.", "Ang pangalan ko ay Anna.");
  }
  if (id === "id" || id === "ms") {
    head.sentence = note("Indonesian has no gender and no verb ending for person. Saya minum air. Affixes such as me- and -kan build a new verb from a root. Learn the root before the affix.", "Saya minum air.");
    head.verbs = note("The verb does not change for I or you. Sudah before the verb marks a completed action. Akan or mau marks a plan.", "saya minum · sudah pergi");
  }
  if (id === "vi") {
    head.sentence = note("Vietnamese keeps the verb unchanged. Tôi uống nước. Each syllable is written apart, and the tone mark is part of the word. Không before the verb is the simple no.", "Tôi uống nước.");
    head.nouns = note("There is no article and no gender. A classifier appears when you count: một cốc nước, một quyển sách. Learn the classifier with the noun.", "một cốc nước");
  }
  if (id === "th") {
    head.sentence = note("Thai does not change the verb for person. Words are not separated by spaces. The polite particle ค่ะ or ครับ closes a sentence and shows the speaker.", "ฉันดื่มน้ำ");
    head.nouns = note("A classifier is required when you count. แก้ว for cups, เล่ม for books. The noun comes first, then the number and the classifier.", "น้ำหนึ่งแก้ว");
  }
  if (id === "eu") {
    head.nouns = note("Basque puts the article on the end of the noun: -a. The verb agrees with the subject and often with the object. There is no masculine or feminine on things.", "etxea · ura");
  }
  if (id === "hu" || id === "tr") {
    head.nouns = note(`${name} has no gender. Case and person are suffixes, and vowel harmony chooses the vowel.`, "ev · su");
  }
  if (id === "eo") {
    head.sentence = note("Esperanto uses one ending for each job. Nouns end in -o, adjectives in -a, the infinitive in -i. La is the only article.", "Mi trinkas akvon.");
    head.nouns = note("The plural is -j. The object adds -n. La is the. There is no gender on things. Amiko can become amikino when you need to specify a woman.", "la domo · la akvo");
  }
  if (id === "tok") {
    head.sentence = note("Toki Pona uses a small set of words. mi moku e telo. e marks the object. li marks the verb when the subject is not mi or sina.", "mi moku e telo.");
    head.nouns = note("There is no article and no plural ending. A second noun narrows the first: telo moku is not needed for water. moku is both eat and drink.", "telo · moku");
  }
  if (id === "isv") {
    head.sentence = note("Interslavic is verb-friendly and has no article. Ja piju vodu. The same sentence appears in Latin, Cyrillic, and Glagolitic. Learn the Latin line first. The speaker uses that line.", "Ja piju vodu.");
    head.nouns = note("Nouns keep a Slavic gender and a simple case ending. The accusative of a feminine noun often changes -a to -u. Do not look for an article.", "voda · vodu");
  }
  if (id === "aur") {
    head.sentence = note("Aurali puts na before a noun and sa for is. An sa asi. Adjectives follow the noun, and the plural is -n.", "An sa asi.");
  }
  if (id === "sig") {
    head.sentence = note("Signal does not translate. Each sign stores the English line. The grammar you are learning is the English grammar under the signs. The speaker plays a figure a machine can turn back into that line.", "I drink water.");
  }
  if (id === "egy") {
    head.sentence = note("Middle Egyptian can put the verb first. There is no word for the or a. The transliteration under the signs is how you read the card aloud. Egyptian Arabic stays on the Arabic card.", "jw.j ḥr swr mw");
    head.nouns = note("Gender is masculine or feminine, often shown by a final -t. Number can be singular, dual, or plural. Learn the signs and the transliteration together.", "pr · mw");
  }
  if (id === "qu") {
    head.sentence = note("Southern Quechua stacks suffixes. The verb ending shows the person. Ñuqa yaku ukyani. A small set of suffixes does most of the grammar.", "Ñuqa yaku ukyani.");
  }
  if (id === "gn") {
    head.sentence = note("Guaraní often puts the person prefix on both the noun and the verb. Che is I. The tilde and the nasal mark belong to the word.", "Che a'u y");
  }
  if (id === "ka") {
    head.nouns = note("Georgian has no articles and no capitals. The verb is a polypersonal stack: it can mark the subject and the object. Learn the reading under the word, then the suffix that means in or to.", "სახლი · წყალი");
  }
  if (id === "hy") {
    head.nouns = note("Eastern Armenian has no gender. The definite article is a suffix on the noun. Case is also a suffix. Learn the plain noun, then the definite form.", "տուն · ջուր");
  }
  if (id === "am") {
    head.verbs = note("Amharic verbs agree with the person by prefix and suffix together. The root is a pattern, as in other Semitic languages. Start with I, you, and he or she for one regular verb.", "I drink water");
  }
  if (id === "sq") {
    head.nouns = note("Albanian puts the definite article on the end of the noun. The indefinite and the definite are a pair. Gender is masculine or feminine.", "shtëpia · uji");
  }
  if (id === "ber") {
    head.sentence = note("Tamazight uses a verb that changes its vowels for aspect, and a noun that may change its first vowel between free and annexed state. These cards are in Tifinagh. The Latin reading is the line to say.", "ⵏⴽⴽⵉ ⴷⴰ.");
  }
  return head;
}

export function lessonsFor(langId: string): GramLesson[] {
  const lang = LANG_BY_ID.get(langId);
  const own = COURSE[langId];
  const extra = SPECIFIC[langId] ?? {};
  const fallback = lang ? familyFallback(langId, lang.name, lang.family) : familyFallback(langId, langId, "this");
  return PATH.map((stage) => {
    const row = own?.[stage.id] ?? extra[stage.id] ?? fallback[stage.id];
    return { ...stage, body: row.body, pattern: row.pattern };
  });
}
