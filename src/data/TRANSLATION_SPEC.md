# Concord lexicon spec

Write one JSON file per language code. Do not edit any other file.

Path: `/workspace/src/data/lexicon/<code>.json`

Shape:

```json
{
  "entries": {
    "water": {
      "word": "…",
      "sentence": "…",
      "article": "optional",
      "gender": "m|f|n|c",
      "plural": "only if irregular or not obvious",
      "feminine": "optional other gender form of the lemma",
      "masculine": "optional",
      "neuter": "optional",
      "reading": "latin transliteration, required for non-latin scripts",
      "note": "optional, under 12 words"
    }
  },
  "lines": {
    "d1a": "…",
    "d1b": "…",
    "d1c": "…",
    "d1d": "…",
    "d2a": "…",
    "d2b": "…",
    "d2c": "…",
    "d2d": "…",
    "d3a": "…",
    "d3b": "…",
    "d3c": "…",
    "d3d": "…"
  }
}
```

Every concept id below must have `word` and `sentence`. The sentence must mean the English sentence, naturally, not a word-by-word calque if that would be ungrammatical. Keep the name Anna in Latin script unless the language’s script cannot. Then transliterate Anna.

Verbs: dictionary / infinitive form as `word`. Bulgarian and Macedonian have no infinitive — use 1st person singular and set note to "1st person singular".

Arabic: Modern Standard, with tashkeel. Hebrew: with niqqud. Chinese: simplified Mandarin + pinyin tones in reading. Japanese: dictionary form; sentences in polite です/ます; reading in hiragana. Korean: dictionary form; sentences in 해요 style; Revised Romanization in reading. Swiss German file `gsw`: Zürich dialect spelling, not Standard German. Portuguese: Brazilian. Quechua: Southern Quechua. Guarani: Paraguayan. Aramaic: Classical Syriac + latin reading. Hausa: Boko (Latin). Tagalog: modern Latin Filipino. Turkish: modern Latin. Interslavic file `isv.json`: Latin Interslavic only (basic orthography: č š ž ě). Do not write Cyrillic or Glagolitic files.

Omit plural when you are unsure. Omit gender when you are unsure. Never omit word or sentence.

Dialogue meanings:
- d1a Hello. I am here.
- d1b What is your name?
- d1c My name is Anna. This is my friend.
- d1d Come in. The bread is good.
- d2a I see the mountain.
- d2b The road is long.
- d2c The sun is hot.
- d2d We sit, and I drink water.
- d3a The child sleeps.
- d3b I see the moon.
- d3c I hear the rain.
- d3d The house is small and good.

Concepts (id — english word — sentence to match):

i — I — I am here.
you — you — You are my friend.
woman — woman — The woman is here.
man — man — The man is walking.
child — child — The child is sleeping.
name — name — My name is Anna.
friend — friend — This is my friend.
family — family — My family is at home.
house — house — The house is small.
door — door — The door is open.
key — key — The key is on the table.
table — table — The book is on the table.
bed — bed — The child is in the bed.
book — book — The book is new.
water — water — The water is cold.
fire — fire — The fire is hot.
bread — bread — The bread is good.
apple — apple — The apple is red.
egg — egg — The egg is on the table.
milk — milk — The child drinks milk.
fish — fish — The fish is in the water.
rice — rice — We eat rice.
coffee — coffee — The coffee is hot.
eat — eat — We eat bread.
drink — drink — I drink water.
see — see — I see the sun.
hear — hear — I hear the rain.
sleep — sleep — The child sleeps.
walk — walk — The man walks.
come — come — You come to the house.
sit — sit — We sit at the table.
give — give — I give you the key.
sun — sun — The sun is hot.
moon — moon — I see the moon.
tree — tree — The tree is big.
flower — flower — The flower is red.
rain — rain — The rain is cold.
mountain — mountain — The mountain is big.
river — river — The river is long.
stone — stone — The stone is small.
dog — dog — The dog is small.
cat — cat — The cat is sleeping.
bird — bird — I see two birds.
hand — hand — This is my hand.
eye — eye — This is my eye.
ear — ear — This is my ear.
head — head — This is my head.
mouth — mouth — This is my mouth.
foot — foot — My foot is cold.
road — road — The road is long.
city — city — The city is big.
school — school — The child goes to school.
sea — sea — I see the sea.
night — night — The night is cold.
one — one — I have one apple.
two — two — I see two birds.
big — big — The house is big.
small — small — The child is small.
good — good — The bread is good.
hot — hot — The fire is hot.
cold — cold — The water is cold.
red — red — The apple is red.
new — new — The book is new.
this — this — This is my house.

After writing, validate with node:

```
node -e "const fs=require('fs'); const ids=['i','you','woman','man','child','name','friend','family','house','door','key','table','bed','book','water','fire','bread','apple','egg','milk','fish','rice','coffee','eat','drink','see','hear','sleep','walk','come','sit','give','sun','moon','tree','flower','rain','mountain','river','stone','dog','cat','bird','hand','eye','ear','head','mouth','foot','road','city','school','sea','night','one','two','big','small','good','hot','cold','red','new','this']; const lines=['d1a','d1b','d1c','d1d','d2a','d2b','d2c','d2d','d3a','d3b','d3c','d3d']; for (const f of process.argv.slice(1)) { const p=JSON.parse(fs.readFileSync(f,'utf8')); const miss=ids.filter(id=>!p.entries?.[id]?.word||!p.entries?.[id]?.sentence); const ml=lines.filter(id=>!p.lines?.[id]); if(miss.length||ml.length) { console.log(f, 'MISSING', miss.join(','), ml.join(',')); process.exitCode=1;} else console.log(f,'ok', ids.length); }" file1.json file2.json
```

Fix any file that fails. Do not touch en.json or de.json.
