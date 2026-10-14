"""Beginner alphabet rows. glyph|name|sound|word|gloss|reading"""

RAW = {}

def add(lang, note, *groups):
    RAW[lang] = (note, list(groups))

add("en", "The English alphabet. Each letter has a short word to hold it.",
    ("letters", "Alphabet", """
a|a|a|apple|a fruit
b|b|b|book|a book
c|c|k|cat|a cat
d|d|d|dog|a dog
e|e|e|egg|an egg
f|f|f|fish|a fish
g|g|g|girl|a girl
h|h|h|house|a house
i|i|i|ice|ice
j|j|j|juice|juice
k|k|k|key|a key
l|l|l|lamp|a lamp
m|m|m|milk|milk
n|n|n|night|night
o|o|o|orange|an orange
p|p|p|pen|a pen
q|q|kw|queen|a queen
r|r|r|rain|rain
s|s|s|sun|the sun
t|t|t|table|a table
u|u|u|umbrella|an umbrella
v|v|v|village|a village
w|w|w|water|water
x|x|ks|box|a box; x is inside the word
y|y|y|yellow|yellow
z|z|z|zoo|a zoo
"""))

add("de", "German has ä, ö, ü, and ß after the shared letters.",
    ("letters", "Alphabet", """
a|a|a|Apfel|apple
b|be|b|Buch|book
c|tse|ts|Computer|computer
d|de|d|Dach|roof
e|e|e|Ei|egg
f|ef|f|Fisch|fish
g|ge|g|Garten|garden
h|ha|h|Haus|house
i|i|i|Insel|island
j|jot|y|Jahr|year
k|ka|k|Katze|cat
l|el|l|Lampe|lamp
m|em|m|Milch|milk
n|en|n|Nacht|night
o|o|o|Orange|orange
p|pe|p|Papier|paper
q|ku|kv|Quelle|spring of water
r|er|r|Regen|rain
s|es|z|Sonne|sun
t|te|t|Tisch|table
u|u|u|Uhr|clock
v|fau|f|Vogel|bird
w|ve|v|Wasser|water
x|iks|ks|Taxi|taxi
y|ypsilon|y|Yoga|yoga
z|tsett|ts|Zug|train
ä|ä|e|Äpfel|apples
ö|ö|e|Öl|oil
ü|ü|y|Übung|exercise
ß|eszett|ss|Straße|street
"""))

add("nl", "Dutch uses the Latin alphabet. IJ is one sound, taught with the letters.",
    ("letters", "Alphabet", """
a|a|a|appel|apple
b|bee|b|boek|book
c|see|s|cent|cent
d|dee|d|deur|door
e|e|e|ei|egg
f|ef|f|fiets|bicycle
g|gee|kh|goud|gold
h|ha|h|huis|house
i|ie|i|ijs|ice
j|jee|y|jas|coat
k|ka|k|kat|cat
l|el|l|lamp|lamp
m|em|m|melk|milk
n|en|n|nacht|night
o|o|o|oor|ear
p|pee|p|pen|pen
q|kuu|k|quiz|quiz
r|er|r|regen|rain
s|es|s|zon|sun
t|tee|t|tafel|table
u|uu|y|uur|hour
v|vee|v|vis|fish
w|wee|v|water|water
x|iks|ks|xylofoon|xylophone
y|ei|i|yoghurt|yogurt
z|zet|z|zee|sea
"""),
    ("ij", "IJ", """
ij|ij|ei|ijs|ice; ij is one sound
"""))

add("da", "Danish ends with æ, ø, and å. They are separate letters.",
    ("letters", "Alphabet", """
a|a|a|abe|monkey
b|be|b|bog|book
c|se|s|cykel|bicycle
d|de|d|dør|door
e|e|e|elefant|elephant
f|ef|f|fisk|fish
g|ge|g|gade|street
h|hå|h|hus|house
i|i|i|is|ice
j|jåd|y|jord|earth
k|kå|k|kat|cat
l|el|l|lampe|lamp
m|em|m|mælk|milk
n|en|n|nat|night
o|o|o|ost|cheese
p|pe|p|pige|girl
q|ku|k|quiz|quiz
r|ær|r|regn|rain
s|es|s|sol|sun
t|te|t|tog|train
u|u|u|ur|clock
v|ve|v|vand|water
w|dobbelt-ve|v|watt|watt
x|eks|ks|xylofon|xylophone
y|y|y|yoghurt|yogurt
z|zet|s|zebra|zebra
æ|æ|e|æg|egg
ø|ø|e|øl|beer
å|å|o|ål|eel
"""))

add("gsw", "Zürich German spelling. Swiss writing uses ss, not ß.",
    ("letters", "Alphabet", """
a|a|a|Öpfel|apple
b|be|b|Buech|book
c|tse|ts|Café|café
d|de|d|Dach|roof
e|e|e|Ei|egg
f|ef|f|Fisch|fish
g|ge|g|Garte|garden
h|ha|h|Huus|house
i|i|i|Iis|ice
j|jot|y|Jahr|year
k|ka|k|Chatz|cat
l|el|l|Lampe|lamp
m|em|m|Milch|milk
n|en|n|Nacht|night
o|o|o|Oug|eye
p|pe|p|Papier|paper
q|ku|kv|Quadrat|square
r|er|r|Räge|rain
s|es|z|Sunne|sun
t|te|t|Tisch|table
u|u|u|Uhr|clock
v|fau|f|Vogel|bird
w|ve|v|Wasser|water
x|iks|ks|Taxi|taxi
y|ypsilon|y|Yoga|yoga
z|tsett|ts|Zug|train
ä|ä|e|Änte|duck
ö|ö|e|Öl|oil
ü|ü|y|über|over
"""))

add("es", "Spanish adds ñ. The accent marks the stressed syllable.",
    ("letters", "Alphabet", """
a|a|a|agua|water
b|be|b|barco|boat
c|ce|k|casa|house
d|de|d|día|day
e|e|e|estrella|star
f|efe|f|flor|flower
g|ge|g|gato|cat
h|hache|silent|hijo|son
i|i|i|isla|island
j|jota|h|juego|game
k|ka|k|kilo|kilo
l|ele|l|luna|moon
m|eme|m|mano|hand
n|ene|n|noche|night
ñ|eñe|ny|niño|child
o|o|o|oso|bear
p|pe|p|pan|bread
q|cu|k|queso|cheese
r|erre|r|río|river
s|ese|s|sol|sun
t|te|t|taza|cup
u|u|u|uva|grape
v|uve|b|vaca|cow
w|uve doble|w|wifi|wifi
x|equis|ks|xilófono|xylophone
y|ye|y|yogur|yogurt
z|zeta|th|zapato|shoe
"""),
    ("marks", "Accents", """
á|a with accent|a|árbol|tree
é|e with accent|e|él|he
í|i with accent|i|índice|index
ó|o with accent|o|óptimo|excellent
ú|u with accent|u|último|last
ü|u with dieresis|w|pingüino|penguin
"""))

add("fr", "French uses the Latin alphabet. Accents and ç change the vowel or the c.",
    ("letters", "Alphabet", """
a|a|a|ami|friend
b|bé|b|bateau|boat
c|cé|k|café|coffee
d|dé|d|dent|tooth
e|e|e|école|school
f|ef|f|fleur|flower
g|gé|g|gâteau|cake
h|hache|silent|hôtel|hotel
i|i|i|île|island
j|ji|zh|jardin|garden
k|ka|k|kilo|kilo
l|el|l|livre|book
m|em|m|maison|house
n|en|n|nuit|night
o|o|o|orange|orange
p|pé|p|pain|bread
q|ku|k|quatre|four
r|er|r|rue|street
s|es|s|soleil|sun
t|té|t|table|table
u|u|y|univers|universe
v|vé|v|ville|city
w|double vé|w|wagon|train car
x|iks|ks|xylophone|xylophone
y|i grec|i|yaourt|yogurt
z|zèd|z|zéro|zero
"""),
    ("marks", "Accents", """
à|a grave|a|à|to, at
â|a circumflex|a|âme|soul
ç|c cedilla|s|ça|that
é|e acute|e|école|school
è|e grave|e|père|father
ê|e circumflex|e|être|to be
î|i circumflex|i|île|island
ô|o circumflex|o|hôtel|hotel
œ|o e|e|cœur|heart
ù|u grave|u|où|where
û|u circumflex|u|sûr|sure
"""))

add("pt", "Brazilian Portuguese. Ç and the tildes belong to the spelling.",
    ("letters", "Alphabet", """
a|a|a|água|water
b|bê|b|bola|ball
c|cê|k|casa|house
d|dê|d|dia|day
e|é|e|escola|school
f|efe|f|flor|flower
g|gê|g|gato|cat
h|agá|silent|homem|man
i|i|i|ilha|island
j|jota|zh|janela|window
k|cá|k|quilo|kilo
l|ele|l|livro|book
m|eme|m|mão|hand
n|ene|n|noite|night
o|ó|o|ovo|egg
p|pê|p|pão|bread
q|quê|k|queijo|cheese
r|erre|h|rua|street
s|esse|s|sol|sun
t|tê|t|tarde|afternoon
u|u|u|uva|grape
v|vê|v|vaca|cow
w|dáblio|w|wi-fi|wifi
x|xis|sh|xícara|cup
y|ípsilon|y|yoga|yoga
z|zê|z|zero|zero
"""),
    ("marks", "Marks", """
á|a acute|a|árvore|tree
â|a circumflex|a|âmbar|amber
ã|a tilde|a|amanhã|tomorrow
à|a grave|a|à|to
ç|c cedilla|s|açúcar|sugar
é|e acute|e|época|period
ê|e circumflex|e|três|three
ó|o acute|o|óculos|glasses
ô|o circumflex|o|ônibus|bus
õ|o tilde|o|limões|lemons
ú|u acute|u|último|last
"""))

add("it", "Italian. H is silent, and it keeps c and g hard.",
    ("letters", "Alphabet", """
a|a|a|acqua|water
b|bi|b|bambino|child
c|ci|k|casa|house
d|di|d|donna|woman
e|e|e|elefante|elephant
f|effe|f|fiore|flower
g|gi|g|gatto|cat
h|acca|silent|hotel|hotel
i|i|i|isola|island
j|i lunga|y|jeans|jeans
k|kappa|k|kiwi|kiwi
l|elle|l|luna|moon
m|emme|m|mamma|mom
n|enne|n|notte|night
o|o|o|orso|bear
p|pi|p|pane|bread
q|cu|k|quadro|picture
r|erre|r|rosa|rose
s|esse|s|sole|sun
t|ti|t|tavolo|table
u|u|u|uva|grape
v|vu|v|vino|wine
w|doppia vu|v|whisky|whisky
x|ics|ks|xilofono|xylophone
y|ipsilon|y|yogurt|yogurt
z|zeta|ts|zio|uncle
"""),
    ("marks", "Accents", """
à|a accent|a|città|city
è|e accent|e|caffè|coffee
é|e closed|e|perché|why
ì|i accent|i|così|so
ò|o accent|o|però|but
ù|u accent|u|più|more
"""))

add("ro", "Romanian adds ă, â, î, ș, and ț.",
    ("letters", "Alphabet", """
a|a|a|apă|water
ă|ă|uh|măr|apple
â|â|uh|român|Romanian
b|be|b|băiat|boy
c|ce|k|casă|house
d|de|d|dor|longing
e|e|e|elev|pupil
f|ef|f|floare|flower
g|ge|g|gară|station
h|haș|h|hartă|map
i|i|i|inimă|heart
î|î|uh|început|beginning
j|je|zh|joc|game
k|ka|k|kilogram|kilogram
l|el|l|lună|moon
m|em|m|măr|apple
n|en|n|noapte|night
o|o|o|ou|egg
p|pe|p|pâine|bread
q|chiu|k|quiz|quiz
r|er|r|râu|river
s|es|s|soare|sun
ș|ș|sh|școală|school
t|te|t|timp|time
ț|ț|ts|țară|country
u|u|u|ușă|door
v|ve|v|vacă|cow
w|dublu ve|v|watt|watt
x|ics|ks|xilofon|xylophone
y|i grec|i|yoga|yoga
z|zet|z|zi|day
"""))

add("eo", "Esperanto adds ĉ, ĝ, ĥ, ĵ, ŝ, and ŭ. The ending tells you the job of the word.",
    ("letters", "Alphabet", """
a|a|a|akvo|water
b|b|b|birdo|bird
c|c|ts|celo|aim
ĉ|ĉ|ch|ĉambro|room
d|d|d|domo|house
e|e|e|egala|equal
f|f|f|floro|flower
g|g|g|granda|big
ĝ|ĝ|j|ĝardeno|garden
h|h|h|horo|hour
ĥ|ĥ|kh|ĥoro|choir
i|i|i|infano|child
j|j|y|jaro|year
ĵ|ĵ|zh|ĵurnalo|newspaper
k|k|k|kato|cat
l|l|l|luno|moon
m|m|m|mano|hand
n|n|n|nokto|night
o|o|o|ovo|egg
p|p|p|pano|bread
r|r|r|rivero|river
s|s|s|suno|sun
ŝ|ŝ|sh|ŝipo|ship
t|t|t|tago|day
u|u|u|urbo|city
ŭ|ŭ|w|aŭto|car
v|v|v|viro|man
z|z|z|zono|belt
"""))

add("tr", "Turkish has no q, w, or x. Dotless ı and dotted i are different letters.",
    ("letters", "Alphabet", """
a|a|a|araba|car
b|be|b|balık|fish
c|ce|j|cam|glass
ç|çe|ch|çay|tea
d|de|d|deniz|sea
e|e|e|elma|apple
f|fe|f|fil|elephant
g|ge|g|göz|eye
ğ|yumuşak ge|lengthens|dağ|mountain
h|he|h|hava|weather
ı|ı|uh|ırmak|river
i|i|i|iyi|good
j|je|zh|jöle|jelly
k|ke|k|kapı|door
l|le|l|limon|lemon
m|me|m|masa|table
n|ne|n|nehir|river
o|o|o|okul|school
ö|ö|e|öğrenci|student
p|pe|p|pencere|window
r|re|r|rüzgar|wind
s|se|s|su|water
ş|şe|sh|şeker|sugar
t|te|t|taş|stone
u|u|u|uçak|airplane
ü|ü|y|üzüm|grape
v|ve|v|vazo|vase
y|ye|y|yıldız|star
z|ze|z|zaman|time
"""))

add("sq", "Albanian treats dh, gj, ll, nj, rr, sh, th, xh, and zh as single letters.",
    ("letters", "Alphabet", """
a|a|a|ari|bear
b|b|b|babë|dad
c|c|ts|cep|corner
ç|ç|ch|çaj|tea
d|d|d|derë|door
dh|dh|th|dhomë|room
e|e|e|emër|name
ë|ë|uh|ëmbël|sweet
f|f|f|fëmijë|child
g|g|g|gur|stone
gj|gj|gy|gjuhë|language
h|h|h|hënë|moon
i|i|i|im|my
j|j|y|javë|week
k|k|k|kalë|horse
l|l|l|lumë|river
ll|ll|dark l|yll|star
m|m|m|mal|mountain
n|n|n|natë|night
nj|nj|ny|një|one
o|o|o|orë|hour
p|p|p|pulë|hen
q|q|ch|qen|dog
r|r|r|rrugë|street
rr|rr|trilled r|rrotë|wheel
s|s|s|sy|eye
sh|sh|sh|shok|friend
t|t|t|tavolinë|table
th|th|th|thikë|knife
u|u|u|ujë|water
v|v|v|vëlla|brother
x|x|dz|xhep|pocket
xh|xh|j|xhaketë|jacket
y|y|y|yll|star
z|z|z|zë|voice
zh|zh|zh|zhurmë|noise
"""))

add("hr", "Croatian writes č, ć, dž, đ, lj, nj, š, and ž as letters of the alphabet.",
    ("letters", "Alphabet", """
a|a|a|auto|car
b|b|b|brod|ship
c|c|ts|cesta|road
č|č|ch|čaj|tea
ć|ć|ty|ćevap|grilled meat
d|d|d|dan|day
dž|dž|j|džep|pocket
đ|đ|dy|đak|pupil
e|e|e|evo|here
f|f|f|film|film
g|g|g|grad|city
h|h|h|hvala|thanks
i|i|i|ime|name
j|j|y|jaje|egg
k|k|k|kuća|house
l|l|l|ljeto|summer
lj|lj|ly|ljubav|love
m|m|m|more|sea
n|n|n|noć|night
nj|nj|ny|njiva|field
o|o|o|otok|island
p|p|p|pas|dog
r|r|r|ruka|hand
s|s|s|sunce|sun
š|š|sh|škola|school
t|t|t|tata|dad
u|u|u|ulica|street
v|v|v|voda|water
z|z|z|zima|winter
ž|ž|zh|žaba|frog
"""))

add("sl", "Slovenian adds č, š, and ž.",
    ("letters", "Alphabet", """
a|a|a|avto|car
b|b|b|brat|brother
c|c|ts|cesta|road
č|č|ch|čas|time
d|d|d|dan|day
e|e|e|en|one
f|f|f|film|film
g|g|g|grad|castle
h|h|h|hiša|house
i|i|i|ime|name
j|j|y|jezero|lake
k|k|k|knjiga|book
l|l|l|luna|moon
m|m|m|mesto|town
n|n|n|noč|night
o|o|o|ogenj|fire
p|p|p|pes|dog
r|r|r|roka|hand
s|s|s|sonce|sun
š|š|sh|šola|school
t|t|t|tabla|board
u|u|u|ulica|street
v|v|v|voda|water
z|z|z|zima|winter
ž|ž|zh|žaba|frog
"""))

add("pl", "Polish keeps ą, ę, ł, and the accented consonants. A few never start a word.",
    ("letters", "Alphabet", """
a|a|a|auto|car
ą|ą|on|wąż|snake
b|be|b|but|shoe
c|ce|ts|cukier|sugar
ć|cie|ch|ćma|moth
d|de|d|dom|house
e|e|e|echo|echo
ę|ę|en|gęś|goose
f|ef|f|film|film
g|gie|g|góra|mountain
h|ha|h|herbata|tea
i|i|i|imię|name
j|jot|y|jajko|egg
k|ka|k|kot|cat
l|el|l|lampa|lamp
ł|eł|w|łąka|meadow
m|em|m|mleko|milk
n|en|n|noc|night
ń|eń|ny|koń|horse
o|o|o|okno|window
ó|o kreskowane|u|ósmy|eighth
p|pe|p|pies|dog
r|er|r|ryba|fish
s|es|s|słońce|sun
ś|eś|sh|śnieg|snow
t|te|t|tata|dad
u|u|u|ulica|street
w|wu|v|woda|water
y|y|i|syn|son
z|zet|z|zima|winter
ź|ziet|zh|źrebię|foal
ż|żet|zh|żaba|frog
"""))

add("cs", "Czech includes á, č, ď, é, ě, í, ň, ó, ř, š, ť, ú, ů, ý, ž, and the letter ch.",
    ("letters", "Alphabet", """
a|a|a|auto|car
á|á|aa|máma|mom
b|b|b|bratr|brother
c|c|ts|cena|price
č|č|ch|čaj|tea
d|d|d|dům|house
ď|ď|dy|ďábel|devil
e|e|e|echo|echo
é|é|ay|mléko|milk
ě|ě|ye|děti|children
f|f|f|film|film
g|g|g|guma|rubber
h|h|h|hora|mountain
ch|ch|kh|chléb|bread
i|i|i|inkoust|ink
í|í|ee|víno|wine
j|j|y|jablko|apple
k|k|k|kůň|horse
l|l|l|lampa|lamp
m|m|m|mléko|milk
n|n|n|noc|night
ň|ň|ny|kůň|horse
o|o|o|okno|window
ó|ó|oh|móda|fashion
p|p|p|pes|dog
q|q|kv|kviz|quiz
r|r|r|ruka|hand
ř|ř|rzh|řeka|river
s|s|s|slunce|sun
š|š|sh|škola|school
t|t|t|táta|dad
ť|ť|ty|ťuk|tap
u|u|u|ulice|street
ú|ú|oo|ústa|mouth
ů|ů|oo|dům|house
v|v|v|voda|water
w|w|v|watt|watt
x|x|ks|xylofon|xylophone
y|y|i|syn|son
ý|ý|ee|sýr|cheese
z|z|z|zima|winter
ž|ž|zh|žába|frog
"""))

add("sk", "Slovak is close to Czech, with ä, ô, ľ, ĺ, ŕ, dz, and dž.",
    ("letters", "Alphabet", """
a|a|a|auto|car
á|á|aa|áno|yes
ä|ä|a|mäso|meat
b|b|b|brat|brother
c|c|ts|cena|price
č|č|ch|čaj|tea
d|d|d|dom|house
ď|ď|dy|ďakujem|thank you
dz|dz|dz|medzi|between
dž|dž|j|džús|juice
e|e|e|ešte|still
é|é|ay|mlieko|milk
f|f|f|film|film
g|g|g|guma|rubber
h|h|h|hora|mountain
ch|ch|kh|chlieb|bread
i|i|i|idea|idea
í|í|ee|víno|wine
j|j|y|jablko|apple
k|k|k|kôň|horse
l|l|l|lampa|lamp
ĺ|ĺ|long l|stĺp|column
ľ|ľ|ly|ľad|ice
m|m|m|mlieko|milk
n|n|n|noc|night
ň|ň|ny|kôň|horse
o|o|o|okno|window
ó|ó|oh|móda|fashion
ô|ô|wo|kôň|horse
p|p|p|pes|dog
q|q|kv|kvíz|quiz
r|r|r|ruka|hand
ŕ|ŕ|long r|vŕba|willow
s|s|s|slnko|sun
š|š|sh|škola|school
t|t|t|tata|dad
ť|ť|ty|ťava|camel
u|u|u|ulica|street
ú|ú|oo|ústa|mouth
v|v|v|voda|water
w|w|v|watt|watt
x|x|ks|xylos|xylose
y|y|i|syn|son
ý|ý|ee|výška|height
z|z|z|zima|winter
ž|ž|zh|žaba|frog
"""))

add("ru", "Russian has 33 letters. ъ, ы, and ь rarely start a word.",
    ("letters", "Alphabet", """
а|а|a|арбуз|watermelon|arbuz
б|бэ|b|брат|brother|brat
в|вэ|v|вода|water|voda
г|гэ|g|город|city|gorod
д|дэ|d|дом|house|dom
е|е|ye|еда|food|yeda
ё|ё|yo|ёж|hedgehog|yozh
ж|жэ|zh|жук|beetle|zhuk
з|зэ|z|зима|winter|zima
и|и|i|имя|name|imya
й|и краткое|y|йогурт|yogurt|yogurt
к|ка|k|кот|cat|kot
л|эль|l|луна|moon|luna
м|эм|m|молоко|milk|moloko
н|эн|n|ночь|night|noch
о|о|o|окно|window|okno
п|пэ|p|папа|dad|papa
р|эр|r|рука|hand|ruka
с|эс|s|солнце|sun|solntse
т|тэ|t|торт|cake|tort
у|у|u|улица|street|ulitsa
ф|эф|f|фрукт|fruit|frukt
х|ха|kh|хлеб|bread|khleb
ц|цэ|ts|цветок|flower|tsvetok
ч|че|ch|чай|tea|chay
ш|ша|sh|школа|school|shkola
щ|ща|shch|щека|cheek|shcheka
ъ|твёрдый знак|hard sign|съесть|to eat up|syest
ы|ы|y|сыр|cheese|syr
ь|мягкий знак|soft sign|мать|mother|mat
э|э|e|это|this|eto
ю|ю|yu|юг|south|yug
я|я|ya|яблоко|apple|yabloko
"""))

add("uk", "Ukrainian uses і, ї, є, and ґ. The letter и is a different vowel from і.",
    ("letters", "Alphabet", """
а|а|a|автобус|bus|avtobus
б|бе|b|брат|brother|brat
в|ве|v|вода|water|voda
г|ге|h|гриб|mushroom|hryb
ґ|ґе|g|ґудзик|button|gudzyk
д|де|d|дім|house|dim
е|е|e|екран|screen|ekran
є|є|ye|Європа|Europe|Yevropa
ж|же|zh|життя|life|zhyttya
з|зе|z|зима|winter|zyma
и|и|y|кит|whale|kyt
і|і|i|ім'я|name|imya
ї|ї|yi|їжа|food|yizha
й|йот|y|йогурт|yogurt|yohurt
к|ка|k|кіт|cat|kit
л|ел|l|ліс|forest|lis
м|ем|m|молоко|milk|moloko
н|ен|n|ніч|night|nich
о|о|o|око|eye|oko
п|пе|p|пес|dog|pes
р|ер|r|рука|hand|ruka
с|ес|s|сонце|sun|sontse
т|те|t|тато|dad|tato
у|у|u|учень|pupil|uchen
ф|еф|f|фрукт|fruit|frukt
х|ха|kh|хліб|bread|khlib
ц|це|ts|цукор|sugar|tsukor
ч|че|ch|чай|tea|chay
ш|ша|sh|школа|school|shkola
щ|ща|shch|щастя|happiness|shchastya
ь|м'який знак|soft sign|кінь|horse|kin
ю|ю|yu|юнак|young man|yunak
я|я|ya|яблуко|apple|yabluko
"""))

add("bg", "Bulgarian has no cases on the noun, but the alphabet still has ъ and ь.",
    ("letters", "Alphabet", """
а|а|a|авто|car|avto
б|бъ|b|брат|brother|brat
в|въ|v|вода|water|voda
г|гъ|g|град|city|grad
д|дъ|d|дом|house|dom
е|е|e|езеро|lake|ezero
ж|жъ|zh|жена|woman|zhena
з|зъ|z|зима|winter|zima
и|и|i|име|name|ime
й|и кратко|y|йога|yoga|yoga
к|къ|k|къща|house|kashta
л|лъ|l|луна|moon|luna
м|мъ|m|мляко|milk|mlyako
н|нъ|n|нощ|night|nosht
о|о|o|огън|fire|ogan
п|пъ|p|папа|dad|papa
р|ръ|r|ръка|hand|raka
с|съ|s|слънце|sun|slantse
т|тъ|t|татко|dad|tatko
у|у|u|улица|street|ulitsa
ф|фъ|f|фенер|lantern|fener
х|хъ|kh|хляб|bread|hlyab
ц|цъ|ts|цвете|flower|tsvete
ч|чъ|ch|чай|tea|chay
ш|шъ|sh|школа|school|shkola
щ|щъ|sht|щастие|happiness|shtastie
ъ|ер голям|uh|ъгъл|corner|agal
ь|ер малък|soft sign|синьо|blue|sinio
ю|ю|yu|юг|south|yug
я|я|ya|ябълка|apple|yabalka
"""))

add("mk", "Macedonian uses ѓ, ќ, ѕ, љ, њ, and џ.",
    ("letters", "Alphabet", """
а|а|a|автомобил|car|avtomobil
б|б|b|брат|brother|brat
в|в|v|вода|water|voda
г|г|g|град|city|grad
д|д|d|ден|day|den
ѓ|ѓ|gy|ѓумбир|ginger|gumbir
е|е|e|езеро|lake|ezero
ж|ж|zh|жена|woman|zhena
з|з|z|зима|winter|zima
ѕ|ѕ|dz|ѕид|wall|dzid
и|и|i|име|name|ime
ј|ј|y|јаболко|apple|jabolko
к|к|k|куќа|house|kukja
л|л|l|лето|summer|leto
љ|љ|ly|љубов|love|ljubov
м|м|m|море|sea|more
н|н|n|ноќ|night|nokj
њ|њ|ny|нива|field|niva
о|о|o|око|eye|oko
п|п|p|пес|dog|pes
р|р|r|рака|hand|raka
с|с|s|сонце|sun|sonce
т|т|t|татко|dad|tatko
ќ|ќ|ky|ќерка|daughter|kjerka
у|у|u|улица|street|ulica
ф|ф|f|филм|film|film
х|х|kh|храна|food|hrana
ц|ц|ts|цвет|flower|cvet
ч|ч|ch|чај|tea|chaj
џ|џ|j|џеб|pocket|dzheb
ш|ш|sh|школа|school|shkola
"""))

add("sr", "The course writes Serbian in Cyrillic. The same alphabet is also written in Latin.",
    ("cyr", "Cyrillic", """
а|а|a|ауто|car|auto
б|б|b|брат|brother|brat
в|в|v|вода|water|voda
г|г|g|град|city|grad
д|д|d|дан|day|dan
ђ|ђ|dy|ђак|pupil|đak
е|е|e|ево|here|evo
ж|ж|zh|живот|life|život
з|з|z|зима|winter|zima
и|и|i|име|name|ime
ј|ј|y|јаје|egg|jaje
к|к|k|кућа|house|kuća
л|л|l|лето|summer|leto
љ|љ|ly|љубав|love|ljubav
м|м|m|море|sea|more
н|н|n|ноћ|night|noć
њ|њ|ny|њива|field|njiva
о|о|o|отац|father|otac
п|п|p|пас|dog|pas
р|р|r|рука|hand|ruka
с|с|s|сунце|sun|sunce
т|т|t|тата|dad|tata
ћ|ћ|ty|ћерка|daughter|ćerka
у|у|u|улица|street|ulica
ф|ф|f|филм|film|film
х|х|kh|хлеб|bread|hleb
ц|ц|ts|цвет|flower|cvet
ч|ч|ch|чај|tea|čaj
џ|џ|j|џеп|pocket|džep
ш|ш|sh|школа|school|škola
"""),
    ("lat", "Latin", """
a|a|a|auto|car
b|b|b|brat|brother
v|v|v|voda|water
g|g|g|grad|city
d|d|d|dan|day
đ|đ|dy|đak|pupil
e|e|e|evo|here
ž|ž|zh|život|life
z|z|z|zima|winter
i|i|i|ime|name
j|j|y|jaje|egg
k|k|k|kuća|house
l|l|l|leto|summer
lj|lj|ly|ljubav|love
m|m|m|more|sea
n|n|n|noć|night
nj|nj|ny|njiva|field
o|o|o|otac|father
p|p|p|pas|dog
r|r|r|ruka|hand
s|s|s|sunce|sun
t|t|t|tata|dad
ć|ć|ty|ćerka|daughter
u|u|u|ulica|street
f|f|f|film|film
h|h|kh|hleb|bread
c|c|ts|cvet|flower
č|č|ch|čaj|tea
dž|dž|j|džep|pocket
š|š|sh|škola|school
"""))

add("el", "Greek has 24 letters. The accent shows the stressed vowel.",
    ("letters", "Alphabet", """
α|άλφα|a|άντρας|man|ántras
β|βήτα|v|βιβλίο|book|vivlío
γ|γάμα|gh|γυναίκα|woman|yinéka
δ|δέλτα|d|δέντρο|tree|déntro
ε|έψιλον|e|εγώ|I|egó
ζ|ζήτα|z|ζάχαρη|sugar|záhari
η|ήτα|i|ήλιος|sun|ílios
θ|θήτα|th|θάλασσα|sea|thálassa
ι|γιώτα|i|ιδέα|idea|idéa
κ|κάπα|k|κλειδί|key|klidhí
λ|λάμδα|l|λουλούδι|flower|loulóudi
μ|μι|m|μήλο|apple|mílo
ν|νι|n|νερό|water|neró
ξ|ξι|ks|ξύλο|wood|xýlo
ο|όμικρον|o|όνομα|name|ónoma
π|πι|p|πόρτα|door|pórta
ρ|ρο|r|ρόδι|pomegranate|ródi
σ|σίγμα|s|σπίτι|house|spíti
τ|ταυ|t|τραπέζι|table|trapézi
υ|ύψιλον|i|ύπνος|sleep|ýpnos
φ|φι|f|φίλος|friend|fílos
χ|χι|kh|χέρι|hand|héri
ψ|ψι|ps|ψωμί|bread|psomí
ω|ωμέγα|o|ώρα|hour|óra
"""))

add("hy", "Eastern Armenian. Learn the letter with a short word.",
    ("letters", "Alphabet", """
ա|այբ|a|արջ|bear|arj
բ|բեն|b|բանալի|key|banali
գ|գիմ|g|գիրք|book|girk
դ|դա|d|դուռ|door|durr
ե|եչ|ye|երեխա|child|yerekha
զ|զա|z|զարդ|ornament|zard
է|է|e|էշ|donkey|esh
ը|ըթ|uh|ընկեր|friend|ynker
թ|թո|t|թռչուն|bird|trchun
ժ|ժե|zh|ժամ|hour|zham
ի|ինի|i|իմ|my|im
լ|լյուն|l|լուսին|moon|lusin
խ|խե|kh|խնձոր|apple|khndzor
ծ|ծա|ts|ծառ|tree|tsarr
կ|կեն|k|կատու|cat|katu
հ|հո|h|հաց|bread|hats
ձ|ձա|dz|ձու|egg|dzu
ղ|ղատ|gh|ղեկ|helm|ghek
ճ|ճե|ch|ճանապարհ|road|chanaparh
մ|մեն|m|մայր|mother|mayr
յ|հի|y|յուղ|oil|yugh
ն|նու|n|նավ|boat|nav
շ|շա|sh|շուն|dog|shun
ո|ո|vo|ոտք|foot|votk
չ|չա|ch|չիր|dried fruit|chir
պ|պե|p|պանիր|cheese|panir
ջ|ջե|j|ջուր|water|jur
ռ|ռա|r|ռադիո|radio|radio
ս|սե|s|սեղան|table|seghan
վ|վև|v|վարդ|rose|vard
տ|տյուն|t|տուն|house|tun
ր|րե|r|րոպե|minute|rope
ց|ցո|ts|ցերեկ|daytime|tserek
ւ|վյուն|v|սուրճ|coffee; ւ is the second part of ու|surj
փ|փյուր|p|փողոց|street|poghots
ք|քե|k|քար|stone|kar
օ|օ|o|օր|day|or
ֆ|ֆե|f|ֆիլմ|film|film
"""))

add("he", "Hebrew reads right to left. Vowels are marked here so the word can be read aloud.",
    ("letters", "Alphabet", """
א|alef|silent|אַבָּא|dad|aba
ב|bet|b|בַּיִת|house|bayit
ג|gimel|g|גָּמָל|camel|gamal
ד|dalet|d|דָּג|fish|dag
ה|he|h|הַר|mountain|har
ו|vav|v|וֶרֶד|rose|vered
ז|zayin|z|זַיִת|olive|zayit
ח|het|kh|חָלָב|milk|halav
ט|tet|t|טַל|dew|tal
י|yod|y|יָד|hand|yad
כ|kaf|k|כֶּלֶב|dog|kelev
ל|lamed|l|לֶחֶם|bread|lechem
מ|mem|m|מַיִם|water|mayim
נ|nun|n|נֵר|candle|ner
ס|samekh|s|סוּס|horse|sus
ע|ayin|silent|עַיִן|eye|ayin
פ|pe|p|פֶּרַח|flower|perach
צ|tsadi|ts|צִפּוֹר|bird|tsipor
ק|qof|k|קוֹל|voice|kol
ר|resh|r|רֹאשׁ|head|rosh
ש|shin|sh|שֶׁמֶשׁ|sun|shemesh
ת|tav|t|תַּפּוּחַ|apple|tapuach
"""),
    ("final", "Final letters", """
ך|final kaf|kh|מֶלֶךְ|king|melekh
ם|final mem|m|מַיִם|water|mayim
ן|final nun|n|אֶבֶן|stone|even
ף|final pe|f|כֶּסֶף|silver|kesef
ץ|final tsadi|ts|אֶרֶץ|land|erets
"""))

add("ar", "Modern Standard, Egyptian, and Saudi share these letters. The memory word changes with the variety.",
    ("msa", "Modern Standard", """
ا|alif|aa|أَسَد|lion|asad
ب|ba|b|بَيْت|house|bayt
ت|ta|t|تُفَّاحَة|apple|tuffaha
ث|tha|th|ثَلْج|snow|thalj
ج|jim|j|جَمَل|camel|jamal
ح|ha|ḥ|حَلِيب|milk|halib
خ|kha|kh|خُبْز|bread|khubz
د|dal|d|دَجَاج|chicken|dajaj
ذ|dhal|dh|ذِئْب|wolf|dhib
ر|ra|r|رَجُل|man|rajul
ز|zay|z|زَهْرَة|flower|zahra
س|sin|s|سَمَكَة|fish|samaka
ش|shin|sh|شَمْس|sun|shams
ص|sad|ṣ|صَدِيق|friend|sadiq
ض|dad|ḍ|ضَوْء|light|daw
ط|ta|ṭ|طِفْل|child|tifl
ظ|za|ẓ|ظَرْف|envelope|zarf
ع|ayn|ʿ|عَيْن|eye|ayn
غ|ghayn|gh|غَيْمَة|cloud|ghayma
ف|fa|f|فَم|mouth|fam
ق|qaf|q|قَمَر|moon|qamar
ك|kaf|k|كِتَاب|book|kitab
ل|lam|l|لَيْمُون|lemon|laymun
م|mim|m|مَاء|water|ma
ن|nun|n|نَار|fire|nar
ه|ha|h|هِلَال|crescent|hilal
و|waw|w|وَلَد|boy|walad
ي|ya|y|يَد|hand|yad
"""),
    ("eg", "Egyptian", """
ا|alif|aa|أَسَد|lion|asad
ب|ba|b|بِيت|house|bet
ت|ta|t|تُفَّاحَة|apple|toffaha
ث|tha|s or th|ثَلْج|snow|salg
ج|gim|g|جَمَل|camel|gamal
ح|ha|ḥ|حَمَام|pigeon|hamam
خ|kha|kh|خَرُوف|sheep|kharuf
د|dal|d|دِيك|rooster|dik
ذ|dhal|z|ذِئْب|wolf|deeb
ر|ra|r|رَاجِل|man|ragel
ز|zay|z|زَهْرَة|flower|zahra
س|sin|s|سَمَكَة|fish|samaka
ش|shin|sh|شَمْس|sun|shams
ص|sad|ṣ|صَاحِب|friend|saheb
ض|dad|ḍ|ضَيْف|guest|dayf
ط|ta|ṭ|طَيَّارَة|plane|tayyara
ظ|za|ẓ|ظَرْف|envelope|zarf
ع|ayn|ʿ|عِيش|bread|eish
غ|ghayn|gh|غَنَم|sheep|ghanam
ف|fa|f|فِيل|elephant|fil
ق|qaf|glottal|قَطَّة|cat|otta
ك|kaf|k|كِتَاب|book|ketab
ل|lam|l|لَيْمُون|lemon|lamun
م|mim|m|مَيَّة|water|mayya
ن|nun|n|نَار|fire|nar
ه|ha|h|هِلَال|crescent|helal
و|waw|w|وَلَد|boy|walad
ي|ya|y|يَد|hand|eed
"""),
    ("sa", "Saudi", """
ا|alif|aa|أَسَد|lion|asad
ب|ba|b|بَيْت|house|bayt
ت|ta|t|تُفَّاحَة|apple|tuffaha
ث|tha|th|ثَلْج|snow|thalj
ج|jim|j|جَمَل|camel|jamal
ح|ha|ḥ|حَلِيب|milk|halib
خ|kha|kh|خُبْز|bread|khubz
د|dal|d|دَجَاج|chicken|dajaj
ذ|dhal|dh|ذِيب|wolf|dhib
ر|ra|r|رَجَّال|man|rajjal
ز|zay|z|زَهْرَة|flower|zahra
س|sin|s|سَمَكَة|fish|samaka
ش|shin|sh|شَمْس|sun|shams
ص|sad|ṣ|صَقْر|falcon|saqr
ض|dad|ḍ|ضَوْء|light|daw
ط|ta|ṭ|طَيْر|bird|tayr
ظ|za|ẓ|ظَرْف|envelope|zarf
ع|ayn|ʿ|عَيْن|eye|ayn
غ|ghayn|gh|غَيْم|cloud|ghaym
ف|fa|f|فَم|mouth|fam
ق|qaf|g|قَمَر|moon|gamar
ك|kaf|k|كِتَاب|book|kitab
ل|lam|l|لَيْمُون|lemon|laymun
م|mim|m|مُويَة|water|moya
ن|nun|n|نَار|fire|nar
ه|ha|h|هِلَال|crescent|hilal
و|waw|w|وَلَد|boy|walad
ي|ya|y|يَد|hand|yad
"""))

add("fa", "Persian adds پ, چ, ژ, and گ to the Arabic letters.",
    ("letters", "Alphabet", """
ا|alef|a|آب|water|âb
ب|be|b|بابا|dad|bâbâ
پ|pe|p|پدر|father|pedar
ت|te|t|تخم|egg|tokhm
ث|se|s|ثانویه|secondary|sânaviye
ج|jim|j|جوجه|chick|juje
چ|che|ch|چای|tea|chây
ح|he|h|خانه|house|khâne
خ|khe|kh|خورشید|sun|khorshid
د|dâl|d|در|door|dar
ذ|zâl|z|ذره|particle|zarre
ر|re|r|روز|day|ruz
ز|ze|z|زن|woman|zan
ژ|zhe|zh|ژاکت|jacket|zhâket
س|sin|s|سیب|apple|sib
ش|shin|sh|شیر|milk|shir
ص|sâd|s|صبح|morning|sobh
ض|zâd|z|ضرب|blow|zarb
ط|tâ|t|طلا|gold|talâ
ظ|zâ|z|ظهر|noon|zohr
ع|eyn|a|عشق|love|eshgh
غ|gheyn|gh|غذا|food|ghazâ
ف|fe|f|فکر|thought|fekr
ق|qâf|gh|قاشق|spoon|qâshoq
ک|kâf|k|کتاب|book|ketâb
گ|gâf|g|گل|flower|gol
ل|lâm|l|لب|lip|lab
م|mim|m|مادر|mother|mâdar
ن|nun|n|نان|bread|nân
و|vâv|v|وقت|time|vaqt
ه|he|h|هوا|air|havâ
ی|ye|y|یک|one|yek
"""))

add("ur", "Urdu reads right to left. It adds ٹ, ڈ, ڑ, and a few marks to the Arabic base.",
    ("letters", "Alphabet", """
ا|alif|a|آم|mango|âm
ب|be|b|بلی|cat|billi
پ|pe|p|پانی|water|pâni
ت|te|t|تلوار|sword|talwâr
ٹ|ṭe|ṭ|ٹماٹر|tomato|ṭamâṭar
ث|se|s|ثابت|fixed|sâbit
ج|jīm|j|جہاز|ship|jahâz
چ|che|ch|چائے|tea|châe
ح|baṛī he|h|حکیم|physician|hakīm
خ|khe|kh|خرگوش|rabbit|khargosh
د|dāl|d|دروازہ|door|darvāza
ڈ|ḍāl|ḍ|ڈاکٹر|doctor|ḍākṭar
ذ|zāl|z|ذائقہ|taste|zāiqa
ر|re|r|رات|night|rāt
ڑ|ṛe|ṛ|پہاڑ|mountain|pahāṛ
ز|ze|z|زمین|earth|zamīn
ژ|zhe|zh|ژالہ|dew|zhāla
س|sīn|s|سورج|sun|sūraj
ش|shīn|sh|شیر|lion|sher
ص|suād|s|صابن|soap|sābun
ض|zuād|z|ضرورت|need|zarūrat
ط|toe|t|طوطا|parrot|totā
ظ|zoe|z|ظرف|vessel|zarf
ع|ain|a|عورت|woman|aurat
غ|ghain|gh|غبارہ|balloon|ghubāra
ف|fe|f|فائدہ|benefit|fāida
ق|qāf|q|قلم|pen|qalam
ک|kāf|k|کتاب|book|kitāb
گ|gāf|g|گھر|house|ghar
ل|lām|l|لڑکا|boy|laṛkā
م|mīm|m|مچھلی|fish|machhlī
ن|nūn|n|نام|name|nām
و|vāo|v|وقت|time|vaqt
ہ|choṭī he|h|ہاتھ|hand|hāth
ی|ye|y|یاد|memory|yād
ے|baṛī ye|e|کیسے|how|kaise
"""))

add("arc", "Classical Syriac. The letter keeps its old name, and the word is one you already meet in the course when it can.",
    ("letters", "Alphabet", """
ܐ|ālap|a|ܐܢܐ|I|enā
ܒ|bēṯ|b|ܒܝܬܐ|house|baytā
ܓ|gāmal|g|ܓܒܪܐ|man|gabrā
ܕ|dālaṯ|d|ܕܡܟ|he slept|dmek
ܗ|hē|h|ܗܠܟ|he walked|hallekh
ܘ|waw|w|ܘܪܕܐ|rose|wardā
ܙ|zayn|z|ܙܒܢ|he bought|zban
ܚ|ḥēṯ|ḥ|ܚܠܒܐ|milk|ḥalbā
ܛ|ṭēṯ|ṭ|ܛܠܝܐ|child|ṭalyā
ܝ|yōḏ|y|ܝܬܒ|he sat|iteb
ܟ|kāp̄|k|ܟܬܒܐ|book|ktābā
ܠ|lāmaḏ|l|ܠܚܡܐ|bread|laḥmā
ܡ|mīm|m|ܡܝܐ|water|mayyā
ܢ|nūn|n|ܢܘܪܐ|fire|nurā
ܣ|semkaṯ|s|ܣܗܪܐ|moon|sahrā
ܥ|ʿē|ʿ|ܥܪܣܐ|bed|arsā
ܦ|pē|p|ܦܬܘܪܐ|table|pāturā
ܨ|ṣāḏē|ṣ|ܨܠܘܬܐ|prayer|ṣlautā
ܩ|qōp̄|q|ܩܠܝܕܐ|key|qlidā
ܪ|rēš|r|ܪܚܡܐ|friend|rāḥmā
ܫ|šīn|sh|ܫܡܫܐ|sun|shemshā
ܬ|taw|t|ܬܪܥܐ|door|tarʿā
"""))

add("ber", "Standard Moroccan Tamazight in Tifinagh. The reading is the Latin spelling.",
    ("letters", "Alphabet", """
ⴰ|ya|a|ⴰⵎⴰⵏ|water|aman
ⴱ|yab|b|ⴱⴰⴱⴰ|dad|baba
ⴳ|yag|g|ⴰⵔⴳⴰⵣ|man|argaz
ⴷ|yad|d|ⴰⴷⵍⵉⵙ|book|adlis
ⴹ|yaḍ|ḍ|ⴰⵡⴹ|come|awḍ
ⴻ|yey|e|ⴻⵍⵍⵉ|that|elli
ⴼ|yaf|f|ⴼⴽ|give|fk
ⴽ|yak|k|ⴽⵢⵢⵉ|you|kyyi
ⵀ|yah|h|ⵇⵇⴰⵀⵡⴰ|coffee|qahwa
ⵃ|yaḥ|ḥ|ⴰⵃⵉⴷⵓⵙ|a dance|aḥidus
ⵄ|yaɛ|ɛ|ⵄⵉⵏ|spring|ɛin
ⵅ|yax|x|ⴰⵅⵅⴰⵎ|house|axxam
ⵇ|yaq|q|ⵇⵇⴰⵀⵡⴰ|coffee|qahwa
ⵉ|yi|i|ⵉⵙⵎ|name|ism
ⵊ|yaj|j|ⴰⵊⴷⴷⵉⴳ|flower|ajddig
ⵍ|yal|l|ⴰⵙⵍⵎ|fish|aslm
ⵎ|yam|m|ⴰⵎⴰⵏ|water|aman
ⵏ|yan|n|ⵏⴽⴽⵉ|I|nkki
ⵓ|yu|u|ⵓⵍ|heart|ul
ⵔ|yar|r|ⵔⵔⵓⵣ|rice|rruz
ⵕ|yaṛ|ṛ|ⵥⵕ|see|ẓṛ
ⵖ|yaɣ|ɣ|ⴰⵖⵔⵓⵎ|bread|aɣrum
ⵙ|yas|s|ⵙⵡ|drink|sw
ⵚ|yaṣ|ṣ|ⵟⵟⵚ|sleep|ṭṭṣ
ⵛ|yac|sh|ⵛⵛ|eat|cc
ⵜ|yat|t|ⵜⴰⴼⵓⴽⵜ|sun|tafukt
ⵟ|yaṭ|ṭ|ⵟⵟⴰⴱⵍⴰ|table|ṭṭabla
ⵡ|yaw|w|ⴰⵡⴹ|come|awḍ
ⵢ|yay|y|ⴰⵢⵢⵓⵔ|moon|ayyur
ⵣ|yaz|z|ⵔⵔⵓⵣ|rice|rruz
ⵥ|yaẓ|ẓ|ⴰⵥⵔⵓ|stone|aẓru
ⵯ|labial mark|w|ⴰⴳⵯⵉ|milk|agwi
"""))

add("ko", "Hangul letters combine into a syllable block. Learn the pieces, then the block.",
    ("consonants", "Consonants", """
@Basic
ㄱ|giyeok|g|가방|bag|gabang
ㄴ|nieun|n|나무|tree|namu
ㄷ|digeut|d|다리|leg|dari
ㄹ|rieul|r|라면|ramen|ramyeon
ㅁ|mieum|m|물|water|mul
ㅂ|bieup|b|바다|sea|bada
ㅅ|siot|s|사람|person|saram
ㅇ|ieung|silent or ng|아기|baby|agi
ㅈ|jieut|j|자전거|bicycle|jajeongeo
ㅊ|chieut|ch|차|tea|cha
ㅋ|kieuk|k|코|nose|ko
ㅌ|tieut|t|토끼|rabbit|tokki
ㅍ|pieup|p|포도|grape|podo
ㅎ|hieut|h|하늘|sky|haneul
@Tense
ㄲ|ssang giyeok|kk|꼬리|tail|kkori
ㄸ|ssang digeut|tt|딸기|strawberry|ttalgi
ㅃ|ssang bieup|pp|빵|bread|ppang
ㅆ|ssang siot|ss|쌀|rice|ssal
ㅉ|ssang jieut|jj|찌개|stew|jjigae
"""),
    ("vowels", "Vowels", """
@Basic
ㅏ|a|a|아이|child|ai
ㅑ|ya|ya|야구|baseball|yagu
ㅓ|eo|eo|어머니|mother|eomeoni
ㅕ|yeo|yeo|여자|woman|yeoja
ㅗ|o|o|오이|cucumber|oi
ㅛ|yo|yo|요리|cooking|yori
ㅜ|u|u|우유|milk|uyu
ㅠ|yu|yu|유리|glass|yuri
ㅡ|eu|eu|음악|music|eumak
ㅣ|i|i|이름|name|ireum
@Compound
ㅐ|ae|ae|개|dog|gae
ㅔ|e|e|베개|pillow|begae
ㅘ|wa|wa|과일|fruit|gwail
ㅚ|oe|oe|외투|coat|oetu
ㅝ|wo|wo|원|won|won
ㅟ|wi|wi|위|above|wi
ㅢ|ui|ui|의자|chair|uija
ㅒ|yae|yae|얘기|story|yaegi
ㅖ|ye|ye|예|yes|ye
ㅙ|wae|wae|왜|why|wae
ㅞ|we|we|웨딩|wedding|weding
"""))

add("th", "Thai consonants are remembered by their traditional names. Class matters for the tone.",
    ("consonants", "Consonants", """
@Mid
ก|ko kai|k|ไก่|chicken|kai
จ|cho chan|ch|จาน|plate|chan
ฎ|do chada|d|ชฎา|headdress|chada
ฏ|to patak|t|ปฏัก|goad|patak
ด|do dek|d|เด็ก|child|dek
ต|to tao|t|เต่า|turtle|tao
บ|bo baimai|b|ใบไม้|leaf|baimai
ป|po pla|p|ปลา|fish|pla
อ|o ang|silent|อ่าง|basin|ang
@High
ข|kho khai|kh|ไข่|egg|khai
ฃ|kho khuat|kh|ขวด|bottle|khuat
ฉ|cho ching|ch|ฉิ่ง|cymbals|ching
ฐ|tho than|th|ฐาน|base|than
ถ|tho thung|th|ถุง|bag|thung
ผ|pho phueng|ph|ผึ้ง|bee|phueng
ฝ|fo fa|f|ฝา|lid|fa
ศ|so sala|s|ศาลา|pavilion|sala
ษ|so ruesi|s|ฤๅษี|hermit|ruesi
ส|so suea|s|เสือ|tiger|suea
ห|ho hip|h|หีบ|chest|hip
@Low
ค|kho khwai|kh|ควาย|buffalo|khwai
ฅ|kho khon|kh|คน|person|khon
ฆ|kho ra-khang|kh|ระฆัง|bell|rakhang
ง|ngo ngu|ng|งู|snake|ngu
ช|cho chang|ch|ช้าง|elephant|chang
ซ|so so|s|โซ่|chain|so
ฌ|cho choe|ch|เฌอ|tree|choe
ญ|yo ying|y|หญิง|woman|ying
ฑ|tho montho|th|มณโฑ|Montho|montho
ฒ|tho phu-thao|th|ผู้เฒ่า|elder|phuthao
ณ|no nen|n|เณร|novice|nen
ท|tho thahan|th|ทหาร|soldier|thahan
ธ|tho thong|th|ธง|flag|thong
น|no nu|n|หนู|mouse|nu
พ|pho phan|ph|พาน|tray|phan
ฟ|fo fan|f|ฟัน|tooth|fan
ภ|pho samphao|ph|สำเภา|junk boat|samphao
ม|mo ma|m|ม้า|horse|ma
ย|yo yak|y|ยักษ์|giant|yak
ร|ro ruea|r|เรือ|boat|ruea
ล|lo ling|l|ลิง|monkey|ling
ว|wo waen|w|แหวน|ring|waen
ฬ|lo chula|l|จุฬา|kite|chula
ฮ|ho nok-huk|h|นกฮูก|owl|nokhuk
"""),
    ("vowels", "Vowels", """
ะ|sara a|a|จะ|will|ja
า|sara aa|aa|มา|come|maa
ิ|sara i|i|กิน|eat|kin
ี|sara ii|ii|มี|have|mii
ึ|sara ue|ue|มึน|dizzy|muen
ื|sara uee|uee|มือ|hand|mue
ุ|sara u|u|อุ่น|warm|un
ู|sara uu|uu|ปู|crab|puu
เ|sara e|e|เอง|oneself|eeng
แ|sara ae|ae|แม่|mother|mae
โ|sara o|o|โต|big|too
ใ|sara ai|ai|ใบ|leaf|bai
ไ|sara ai|ai|ไป|go|pai
เา|sara ao|ao|เรา|we|rao
อ|sara oe|oe|เธอ|you|thoe
ำ|sara am|am|น้ำ|water|naam
"""))

add("vi", "Vietnamese letters include ă, â, ê, ô, ơ, ư, and đ. Tone marks sit on the vowel.",
    ("letters", "Alphabet", """
a|a|a|anh|older brother
ă|ă|a|ăn|eat
â|â|uh|âm|sound
b|bê|b|bò|cow
c|xê|k|cá|fish
d|dê|z|dê|goat
đ|đê|d|đèn|lamp
e|e|e|em|younger sibling
ê|ê|ay|ếch|frog
g|giê|g|gà|chicken
h|hát|h|hoa|flower
i|i|i|ít|few
k|ca|k|kẹo|candy
l|e-lờ|l|lửa|fire
m|em-mờ|m|mẹ|mother
n|en-nờ|n|nước|water
o|o|o|ong|bee
ô|ô|oh|ô tô|car
ơ|ơ|uh|ơi|hey
p|pê|p|pin|battery
q|quy|kw|quả|fruit
r|e-rờ|r|rắn|snake
s|ét-sì|s|sữa|milk
t|tê|t|tôi|I
u|u|u|uống|drink
ư|ư|uh|ướt|wet
v|vê|v|vịt|duck
x|ích|s|xe|vehicle
y|i dài|y|yêu|love
"""))

add("id", "Indonesian spelling is close to the sound. There is no grammatical gender.",
    ("letters", "Alphabet", """
a|a|a|air|water
b|be|b|buku|book
c|ce|ch|cinta|love
d|de|d|daun|leaf
e|e|e|ekor|tail
f|ef|f|foto|photo
g|ge|g|gula|sugar
h|ha|h|hujan|rain
i|i|i|ikan|fish
j|je|j|jendela|window
k|ka|k|kucing|cat
l|el|l|laut|sea
m|em|m|matahari|sun
n|en|n|nama|name
o|o|o|orang|person
p|pe|p|pintu|door
q|ki|k|Quran|Quran
r|er|r|rumah|house
s|es|s|susu|milk
t|te|t|tangan|hand
u|u|u|ular|snake
v|fe|f|vas|vase
w|we|w|warna|color
x|eks|ks|xilofon|xylophone
y|ye|y|yang|which
z|zet|z|zebra|zebra
"""))

add("tl", "Modern Filipino uses the Latin alphabet, including the older ng.",
    ("letters", "Alphabet", """
a|a|a|aso|dog
b|ba|b|bata|child
c|si|s|Cebu|Cebu
d|da|d|dila|tongue
e|e|e|eskwela|school
f|ef|f|Filipino|Filipino
g|ga|g|gatas|milk
h|ha|h|halaman|plant
i|i|i|isda|fish
j|ja|h|jeep|jeep
k|ka|k|kalye|street
l|la|l|langit|sky
m|ma|m|manok|chicken
n|na|n|nanay|mother
ñ|enye|ny|niño|child
ng|ng|ng|ngipin|tooth
o|o|o|oo|yes
p|pa|p|puso|heart
q|kyu|k|quiz|quiz
r|ra|r|radyo|radio
s|sa|s|saging|banana
t|ta|t|tatay|father
u|u|u|ulan|rain
v|vi|b|video|video
w|wa|w|wika|language
x|eks|ks|x-ray|x-ray
y|ya|y|yelo|ice
z|zi|z|zoo|zoo
"""))

add("mg", "Malagasy uses the Latin alphabet. The word you want often comes first in the sentence.",
    ("letters", "Alphabet", """
a|a|a|alika|dog
b|be|b|boky|book
d|de|d|dokotera|doctor
e|e|e|efatra|four
f|ef|f|fanafody|medicine
g|ge|g|gasy|Malagasy
h|ha|h|hazo|tree
i|i|i|izaho|I
j|ji|j|jiro|lamp
k|ka|k|kisoa|pig
l|el|l|lalana|road
m|em|m|maso|eye
n|en|n|neny|mother
o|o|o|orana|rain
p|pe|p|paoma|apple
r|er|r|rano|water
s|es|s|saka|cat
t|te|t|trano|house
v|ve|v|volana|moon
y|i greka|i|vary|rice
z|zed|z|zaza|child
"""))

add("sw", "Swahili uses Latin letters. Ch, sh, ny, and ng' are single sounds.",
    ("letters", "Alphabet", """
a|a|a|asubuhi|morning
b|b|b|baba|father
d|d|d|dada|sister
e|e|e|embe|mango
f|f|f|furaha|joy
g|g|g|gari|car
h|h|h|habari|news
i|i|i|inzi|fly
j|j|j|jua|sun
k|k|k|kaka|brother
l|l|l|lala|sleep
m|m|m|maji|water
n|n|n|nchi|country
o|o|o|ofisi|office
p|p|p|paka|cat
r|r|r|rafiki|friend
s|s|s|samaki|fish
t|t|t|tatu|three
u|u|u|uma|fork
v|v|v|viti|chair
w|w|w|wimbo|song
y|y|y|yai|egg
z|z|z|zawadi|gift
"""),
    ("sounds", "Digraphs", """
ch|ch|ch|chakula|food
dh|dh|dh|dhahabu|gold
gh|gh|gh|ghali|expensive
ng'|ng'|ng|ng'ombe|cow
ny|ny|ny|nyumba|house
sh|sh|sh|shule|school
th|th|th|thelathini|thirty
"""))

add("so", "Somali spelling matches the sound. C, x, and q are throat sounds.",
    ("letters", "Alphabet", """
b|b|b|biyo|water
t|t|t|tufaax|apple
j|j|j|jaceyl|love
x|x|ḥ|xiddig|star
kh|kh|kh|khudaar|vegetables
d|d|d|dab|fire
r|r|r|rooti|bread
s|s|s|saaxiib|friend
sh|sh|sh|shaah|tea
dh|dh|retroflex d|dhagax|stone
c|c|ayn|caano|milk
g|g|g|guri|house
f|f|f|fure|key
q|q|q|qoys|family
k|k|k|kalluun|fish
l|l|l|lug|leg
m|m|m|magac|name
n|n|n|naag|woman
w|w|w|webi|river
h|h|h|hilib|meat
y|y|y|yar|small
a|a|a|aniga|I
e|e|e|ey|dog
i|i|i|imaw|come
o|o|o|ogow|know
u|u|u|ukun|egg
"""))

add("ha", "Hausa in Boko, the Latin school spelling. Ɓ, ɗ, and ƙ change the sound.",
    ("letters", "Alphabet", """
a|a|a|aboki|friend
b|b|b|burodi|bread
ɓ|ɓ|implosive b|ɓera|mouse
c|c|ch|ci|eat
d|d|d|dutse|stone
ɗ|ɗ|implosive d|ɗaki|room
e|e|e|eba|a yam meal
f|f|f|fure|flower
g|g|g|gida|house
h|h|h|hanya|road
i|i|i|iyali|family
j|j|j|jaki|donkey
k|k|k|kifi|fish
ƙ|ƙ|ejective k|ƙwai|egg
l|l|l|littafi|book
m|m|m|mace|woman
n|n|n|namiji|man
o|o|o|ofis|office
r|r|r|ruwa|water
s|s|s|suna|name
sh|sh|sh|shinkafa|rice
t|t|t|tebur|table
ts|ts|ts|tsuntsu|bird
u|u|u|uwa|mother
w|w|w|wuta|fire
y|y|y|yaro|boy
z|z|z|zaki|lion
'|hamza|glottal|a'a|no
"""))

add("yo", "Yoruba tones and the underdots are part of the spelling. Keep them.",
    ("letters", "Alphabet", """
a|a|a|àga|chair
b|b|b|bàtà|shoe
d|d|d|dòdò|fried plantain
e|e|e|èmi|I
ẹ|ẹ|eh|ẹja|fish
f|f|f|fún|give
g|g|g|gàrí|cassava meal
gb|gb|gb|gbọ́|hear
h|h|h|hàn|show
i|i|i|ìwé|book
j|j|j|jẹ|eat
k|k|k|kí|greet
l|l|l|lọ|go
m|m|m|mu|drink
n|n|n|ní|have
o|o|o|omi|water
ọ|ọ|aw|ọmọ|child
p|p|kp|pupa|red
r|r|r|rí|see
s|s|s|sùn|sleep
ṣ|ṣ|sh|ṣe|do
t|t|t|tà|sell
u|u|u|tú|untie
w|w|w|wá|come
y|y|y|yìí|this
"""))

add("ig", "Igbo underdots and the digraphs gb, gh, kp, and nw are letters, not decorations.",
    ("letters", "Alphabet", """
a|a|a|akwụkwọ|book
b|b|b|bịa|come
ch|ch|ch|chi|day, god
d|d|d|di|husband
e|e|e|ego|money
f|f|f|foto|photo
g|g|g|gị|you
gb|gb|gb|gbaa|run
gh|gh|gh|ghọ|become
gw|gw|gw|gwuo|dig
h|h|h|hụ|see
i|i|i|isi|head
ị|ị|ih|ịga|to go
j|j|j|ji|yam
k|k|k|kedu|how
kp|kp|kp|kpọọ|call
kw|kw|kw|kwuo|speak
l|l|l|lee|look
m|m|m|mmiri|water
n|n|n|nne|mother
nw|nw|nw|nwa|child
ny|ny|ny|nye|give
o|o|o|osisi|tree
ọ|ọ|aw|ọkụ|fire
p|p|p|pụọ|leave
r|r|r|rie|eat
s|s|s|sị|say
sh|sh|sh|shuga|sugar
t|t|t|taa|today
u|u|u|ube|pear
ụ|ụ|oo|ụlọ|house
v|v|v|vuu|a buzz
w|w|w|wee|then
y|y|y|ya|he, she
z|z|z|zuo|buy
ṅ|ṅ|nasal n|ṅụọ|drink
"""))

add("ln", "Kinshasa Lingala. Accents mark the tone. Ɛ and ɔ are vowels of their own.",
    ("letters", "Alphabet", """
a|a|a|azali|is
b|b|b|búku|book
d|d|d|ndáko|house
e|e|e|ekuke|door
ɛ|ɛ|eh|mbúla|rain
f|f|f|fungóla|key
i|i|i|likeí|egg
k|k|k|kafé|coffee
l|l|l|lobɔ́kɔ|hand
m|m|m|mái|water
n|n|n|nkómbó|name
o|o|o|moníngá|friend
ɔ|ɔ|aw|mɔ́tɔ|fire
p|p|p|pɔm|apple
s|s|s|sánzá|moon
t|t|t|butú|night
u|u|u|búku|book
w|w|w|mwǎna|child
y|y|y|yo|you
z|z|z|nzɛtɛ|tree
"""))

add("ff", "Fulfulde in Latin letters. Ɓ, ɗ, and ƴ are not the same as b, d, and y.",
    ("letters", "Alphabet", """
a|a|a|aan|you
b|b|b|buuru|bread
ɓ|ɓ|implosive b|ɓoccoonde|egg
d|d|d|debbo|woman
ɗ|ɗ|implosive d|ɗaanugo|sleep
e|e|e|en|we
f|f|f|ful|flower
g|g|g|gorko|man
h|h|h|haayre|stone
i|i|i|innde|name
j|j|j|joodaago|sit
k|k|k|kosam|milk
l|l|l|lekki|tree
m|m|m|min|I
n|n|n|ndiyam|water
o|o|o|on|we, you plural
p|p|p|pomme|apple
r|r|r|rewɓe|women
s|s|s|suudu|house
t|t|t|toɓo|rain
u|u|u|usun|pestle
w|w|w|wuro|village
y|y|y|yiite|fire
ƴ|ƴ|implosive y|ƴiiƴam|blood
ŋ|ŋ|ng|ŋari|beauty
ɲ|ɲ|ny|ɲalawma|day
"""))

add("qu", "Southern Quechua, in the spelling used on the cards. Apostrophes mark a sharp consonant.",
    ("letters", "Alphabet", """
a|a|a|allqu|dog
ch|ch|ch|challwa|fish
ch'|ch'|sharp ch|ch'uñu|freeze-dried potato
h|h|h|hatun|big
i|i|i|inti|sun
k|k|k|killa|moon
k'|k'|sharp k|k'aspi|stick
l|l|l|lima|Lima
ll|ll|ly|llaqta|town
m|m|m|maki|hand
n|n|n|nina|fire
ñ|ñ|ny|ñawi|eye
p|p|p|para|rain
ph|ph|aspirated p|phuyu|cloud
p'|p'|sharp p|p'unchaw|day
q|q|q|qhari|man
q'|q'|sharp q|q'umir|green
r|r|r|rumi|stone
s|s|s|sach'a|tree
t|t|t|t'anta|bread
t'|t'|sharp t|t'ika|flower
u|u|u|uma|head
w|w|w|wasi|house
y|y|y|yaku|water
"""))

add("gn", "Paraguayan Guaraní. The tilde and the nasal vowels belong to the word.",
    ("letters", "Alphabet", """
a|a|a|ama|rain
ã|ã|nasal a|tã|clan, tooth
ch|ch|ch|che|I
e|e|e|heta|many
ẽ|ẽ|nasal e|tẽ|no, in some words
g|g|g|guata|walk
g̃|g̃|nasal g|g̃uahẽ|arrive
h|h|h|hendu|hear
i|i|i|ita|stone
ĩ|ĩ|nasal i|ha'ĩ|I said
j|j|j|jasy|moon
k|k|k|kuña|woman
l|l|l|llave|key
m|m|m|mitã|child
mb|mb|mb|mbujape|bread
n|n|n|nde|you
nd|nd|nd|ndéve|to you
ng|ng|ng|ngotyo|all
ñ|ñ|ny|kuña|woman
o|o|o|óga|house
õ|õ|nasal o|tõ|no
p|p|p|pira|fish
r|r|r|rógue|leaf
s|s|s|so'o|meat
t|t|t|téra|name
u|u|u|u|eat, drink
ũ|ũ|nasal u|tytũ|dark
v|v|v|vevúi|light
y|y|y|y|water
'|puso|glottal|ha'e|I am
"""))

add("hi", "Hindi vowels and consonants. The inherent a is part of the consonant until a vowel mark replaces it.",
    ("vowels", "Vowels", """
अ|a|a|अनार|pomegranate|anaar
आ|aa|aa|आम|mango|aam
इ|i|i|इमली|tamarind|imli
ई|ii|ee|ईख|sugarcane|iikh
उ|u|u|उल्लू|owl|ullu
ऊ|uu|oo|ऊन|wool|uun
ए|e|ay|एक|one|ek
ऐ|ai|ai|ऐनक|glasses|ainak
ओ|o|oh|ओस|dew|os
औ|au|au|औरत|woman|aurat
अं|an|an|अंगूर|grapes|angoor
अः|ah|ah|दुःख|sorrow|dukh
"""),
    ("consonants", "Consonants", """
क|ka|k|कबूतर|pigeon|kabutar
ख|kha|kh|खरगोश|rabbit|khargosh
ग|ga|g|गमला|pot|gamla
घ|gha|gh|घर|house|ghar
च|cha|ch|चम्मच|spoon|chammach
छ|chha|chh|छाता|umbrella|chhaata
ज|ja|j|जहाज|ship|jahaaj
झ|jha|jh|झंडा|flag|jhanda
ट|ta|ṭ|टमाटर|tomato|tamaatar
ठ|tha|ṭh|ठंडा|cold|thanda
ड|da|ḍ|डमरू|drum|damaru
ढ|dha|ḍh|ढोलक|drum|dholak
त|ta|t|तरबूज|watermelon|tarbuuj
थ|tha|th|थाली|plate|thaali
द|da|d|दरवाज़ा|door|darvaaza
ध|dha|dh|धनुष|bow|dhanush
न|na|n|नल|tap|nal
प|pa|p|पतंग|kite|patang
फ|pha|ph|फल|fruit|phal
ब|ba|b|बकरी|goat|bakri
भ|bha|bh|भालू|bear|bhaalu
म|ma|m|मछली|fish|machhli
य|ya|y|यात्री|traveler|yaatri
र|ra|r|रेल|train|rel
ल|la|l|लड़का|boy|ladka
व|va|v|वकील|lawyer|vakiil
श|sha|sh|शेर|lion|sher
ष|sha|sh|षट्कोण|hexagon|shatkon
स|sa|s|सांप|snake|saanp
ह|ha|h|हाथी|elephant|haathi
क्ष|ksha|ksh|क्षमा|forgiveness|kshama
त्र|tra|tr|त्रिशूल|trident|trishul
ज्ञ|gya|gy|ज्ञान|knowledge|gyaan
"""))

add("mr", "Marathi uses Devanagari and adds ळ. The verb agrees with the subject.",
    ("vowels", "Vowels", """
अ|a|a|अननस|pineapple|ananas
आ|aa|aa|आंबा|mango|aambaa
इ|i|i|इडली|idli|idli
ई|ii|ee|ईश्वर|god|ishvar
उ|u|u|उंदीर|rat|undir
ऊ|uu|oo|ऊस|sugarcane|us
ए|e|ay|एक|one|ek
ऐ|ai|ai|ऐरण|anvil|airan
ओ|o|oh|ओठ|lip|oth
औ|au|au|औषध|medicine|aushadh
अं|an|an|अंगठी|ring|angthi
"""),
    ("consonants", "Consonants", """
क|ka|k|कमळ|lotus|kamal
ख|kha|kh|खिडकी|window|khidki
ग|ga|g|गाय|cow|gaay
घ|gha|gh|घर|house|ghar
च|cha|ch|चमचा|spoon|chamchaa
छ|chha|chh|छत्री|umbrella|chhatri
ज|ja|j|जहाज|ship|jahaaj
झ|jha|jh|झाड|tree|jhaad
ट|ta|ṭ|टोपी|cap|topi
ठ|tha|ṭh|ठसा|stamp|thasaa
ड|da|ḍ|डोळे|eyes|dole
ढ|dha|ḍh|ढग|cloud|dhag
त|ta|t|तांदूळ|rice|taandul
थ|tha|th|थंड|cold|thand
द|da|d|दरवाजा|door|darvaajaa
ध|dha|dh|धनुष्य|bow|dhanushya
न|na|n|नदी|river|nadi
प|pa|p|पाणी|water|paani
फ|pha|ph|फळ|fruit|phal
ब|ba|b|बकरी|goat|bakri
भ|bha|bh|भात|cooked rice|bhaat
म|ma|m|मासा|fish|maasaa
य|ya|y|यात्रा|journey|yaatraa
र|ra|r|रस्ता|road|rastaa
ल|la|l|लिंबू|lemon|limbu
व|va|v|वारा|wind|vaaraa
श|sha|sh|शहर|city|shahar
ष|sha|sh|षटकोन|hexagon|shatkon
स|sa|s|सूर्य|sun|surya
ह|ha|h|हात|hand|haat
ळ|la|ḷ|बाळ|baby|baal
"""))

add("bn", "Bengali has no grammatical gender. The vowel marks sit on the consonant.",
    ("vowels", "Vowels", """
অ|ô|o|অজগর|python|ôjogor
আ|a|a|আম|mango|am
ই|i|i|ইলিশ|hilsa fish|ilish
ঈ|ii|ee|ঈগল|eagle|iigol
উ|u|u|উট|camel|ut
ঊ|uu|oo|ঊষা|dawn|usha
এ|e|ay|এক|one|ek
ঐ|oi|oi|ঐক্য|unity|oikko
ও|o|oh|ওজন|weight|ojon
ঔ|ou|ou|ঔষধ|medicine|oushodh
"""),
    ("consonants", "Consonants", """
ক|kô|k|কলম|pen|kolom
খ|khô|kh|খাতা|notebook|khata
গ|gô|g|গরু|cow|goru
ঘ|ghô|gh|ঘর|house|ghor
চ|chô|ch|চাল|rice|chal
ছ|chhô|chh|ছাতা|umbrella|chhata
জ|jô|j|জল|water|jol
ঝ|jhô|jh|ঝড়|storm|jhor
ট|tô|ṭ|টমেটো|tomato|tomato
ঠ|ṭhô|ṭh|ঠোঁট|lip|thont
ড|dô|ḍ|ডাল|branch|dal
ঢ|ḍhô|ḍh|ঢাক|drum|dhak
ত|tô|t|তাল|palm|tal
থ|thô|th|থালা|plate|thala
দ|dô|d|দরজা|door|dorja
ধ|dhô|dh|ধান|paddy|dhan
ন|nô|n|নদী|river|nodi
প|pô|p|পাখি|bird|pakhi
ফ|phô|f|ফুল|flower|phul
ব|bô|b|বই|book|boi
ভ|bhô|bh|ভাত|cooked rice|bhat
ম|mô|m|মাছ|fish|mach
য|jô|j|যম|Yama|jom
র|rô|r|রাস্তা|road|rasta
ল|lô|l|লাল|red|lal
শ|shô|sh|শাক|greens|shak
ষ|shô|sh|ষাঁড়|bull|shar
স|sô|sh|সূর্য|sun|shurjo
হ|hô|h|হাত|hand|hat
ড়|ṛô|ṛ|গাড়ি|car|gari
য়|yô|y|মায়া|affection|maya
"""))

add("gu", "Gujarati vowels and consonants. The verb agrees with gender and number.",
    ("vowels", "Vowels", """
અ|a|a|અનાનસ|pineapple|ananas
આ|aa|aa|આંબો|mango|aambo
ઇ|i|i|ઇંડું|egg|indu
ઈ|ii|ee|ઈશ્વર|god|ishvar
ઉ|u|u|ઉંદર|rat|undar
ઊ|uu|oo|ઊન|wool|un
એ|e|ay|એક|one|ek
ઐ|ai|ai|ઐનક|glasses|ainak
ઓ|o|oh|ઓરડો|room|ordo
ઔ|au|au|ઔષધ|medicine|aushadh
અં|an|an|અંગૂઠો|thumb|angutho
"""),
    ("consonants", "Consonants", """
ક|ka|k|કબૂતર|pigeon|kabutar
ખ|kha|kh|ખરગોશ|rabbit|khargosh
ગ|ga|g|ગાય|cow|gaay
ઘ|gha|gh|ઘર|house|ghar
ચ|cha|ch|ચમચી|spoon|chamchi
છ|chha|chh|છત્રી|umbrella|chhatri
જ|ja|j|જહાજ|ship|jahaaj
ઝ|jha|jh|ઝાડ|tree|jhaad
ટ|ta|ṭ|ટમેટું|tomato|tametu
ઠ|tha|ṭh|ઠંડું|cold|thandu
ડ|da|ḍ|ડબ્બો|box|dabbo
ઢ|dha|ḍh|ઢોલ|drum|dhol
ત|ta|t|તરબૂચ|watermelon|tarbuch
થ|tha|th|થાળી|plate|thaali
દ|da|d|દરવાજો|door|darvajo
ધ|dha|dh|ધનુષ|bow|dhanush
ન|na|n|નદી|river|nadi
પ|pa|p|પાણી|water|paani
ફ|pha|ph|ફળ|fruit|phal
બ|ba|b|બકરી|goat|bakri
ભ|bha|bh|ભાત|cooked rice|bhaat
મ|ma|m|માછલી|fish|machhli
ય|ya|y|યાત્રા|journey|yaatra
ર|ra|r|રસ્તો|road|rasto
લ|la|l|લીંબુ|lemon|limbu
વ|va|v|વાઘ|tiger|vaagh
શ|sha|sh|શહેર|city|shahar
ષ|sha|sh|ષટ્કોણ|hexagon|shatkon
સ|sa|s|સૂર્ય|sun|surya
હ|ha|h|હાથી|elephant|haathi
"""))

add("ta", "Tamil vowels and consonants. A few consonants rarely start a word, so the example holds them inside it.",
    ("vowels", "Vowels", """
அ|a|a|அம்மா|mother|ammaa
ஆ|aa|aa|ஆடு|goat|aadu
இ|i|i|இலை|leaf|ilai
ஈ|ii|ee|ஈ|fly, the insect|ii
உ|u|u|உப்பு|salt|uppu
ஊ|uu|oo|ஊர்|town|uur
எ|e|e|எலி|rat|eli
ஏ|ee|ay|ஏணி|ladder|eeni
ஐ|ai|ai|ஐந்து|five|ainthu
ஒ|o|o|ஒன்று|one|onru
ஓ|oo|oh|ஓடம்|boat|oodam
ஔ|au|au|ஔவை|a poet's name|auvai
"""),
    ("consonants", "Consonants", """
க|ka|k|கை|hand|kai
ங|nga|ng|மங்கை|young woman|mangai
ச|cha|ch|சோறு|cooked rice|sooru
ஞ|nya|ny|ஞாயிறு|Sunday|nyaayiru
ட|ta|ṭ|படம்|picture|padam
ண|na|ṇ|மணி|bell|mani
த|tha|th|தலை|head|thalai
ந|na|n|நாய்|dog|naay
ப|pa|p|பால்|milk|paal
ம|ma|m|மரம்|tree|maram
ய|ya|y|யானை|elephant|yaanai
ர|ra|r|பருத்தி|cotton|paruthi
ல|la|l|பல்|tooth|pal
வ|va|v|வீடு|house|viidu
ழ|zha|zh|வாழை|banana|vaazhai
ள|la|ḷ|பிள்ளை|child|pillai
ற|ra|r|அறை|room|arai
ன|na|n|மனிதன்|person|manithan
"""),
    ("loans", "Loan letters", """
ஜ|ja|j|ஜன்னல்|window|jannal
ஷ|sha|sh|ஷர்ட்|shirt|shirt
ஸ|sa|s|பாஸ்|pass|paas
ஹ|ha|h|ஹோட்டல்|hotel|hotel
"""))

add("te", "Telugu vowels and consonants. Long and short vowels are different letters.",
    ("vowels", "Vowels", """
అ|a|a|అమ్మ|mother|amma
ఆ|aa|aa|ఆవు|cow|aavu
ఇ|i|i|ఇల్లు|house|illu
ఈ|ii|ee|ఈగ|fly|iiga
ఉ|u|u|ఉప్పు|salt|uppu
ఊ|uu|oo|ఊరు|village|uuru
ఎ|e|e|ఎలుక|rat|eluka
ఏ|ee|ay|ఏనుగు|elephant|eenugu
ఐ|ai|ai|ఐదు|five|aidu
ఒ|o|o|ఒంటె|camel|onte
ఓ|oo|oh|ఓడ|ship|oda
ఔ|au|au|ఔషధం|medicine|aushadham
"""),
    ("consonants", "Consonants", """
క|ka|k|కన్ను|eye|kannu
ఖ|kha|kh|ఖని|mine|khani
గ|ga|g|గుర్రం|horse|gurram
ఘ|gha|gh|ఘంట|bell|ghanta
చ|cha|ch|చెయ్యి|hand|cheyyi
ఛ|chha|chh|ఛాయ|shade|chaaya
జ|ja|j|జలం|water|jalam
ట|ta|ṭ|టమాట|tomato|tamaata
ఠ|tha|ṭh|పఠం|lesson|patham
డ|da|ḍ|డబ్బా|box|dabba
ఢ|dha|ḍh|ఢంకా|drum|dhanka
త|ta|t|తల|head|tala
థ|tha|th|కథ|story|katha
ద|da|d|దారం|thread|daaram
ధ|dha|dh|ధనం|wealth|dhanam
న|na|n|నీరు|water|neeru
ప|pa|p|పాలు|milk|paalu
ఫ|pha|f|ఫలం|fruit|phalam
బ|ba|b|బిడ్డ|child|bidda
భ|bha|bh|భూమి|earth|bhumi
మ|ma|m|మనిషి|person|manishi
య|ya|y|యాత్ర|journey|yaatra
ర|ra|r|రాయి|stone|raayi
ల|la|l|లంక|island|lanka
వ|va|v|వెన్న|butter|venna
శ|sha|sh|శక్తి|power|shakti
ష|sha|sh|షట్కోణం|hexagon|shatkonam
స|sa|s|సూర్యుడు|sun|suryudu
హ|ha|h|హంస|swan|hamsa
ళ|la|ḷ|కళ|art|kala
క్ష|ksha|ksh|క్షమ|forgiveness|kshama
"""))

add("ml", "Malayalam vowels and consonants. The reading shows the long vowels.",
    ("vowels", "Vowels", """
അ|a|a|അമ്മ|mother|amma
ആ|aa|aa|ആന|elephant|aana
ഇ|i|i|ഇല|leaf|ila
ഈ|ii|ee|ഈച്ച|fly|iiccha
ഉ|u|u|ഉപ്പ്|salt|uppu
ഊ|uu|oo|ഊര്|village|uur
ഋ|ru|ru|ഋഷി|sage|rshi
എ|e|e|എലി|rat|eli
ഏ|ee|ay|ഏണി|ladder|eeni
ഐ|ai|ai|ഐസ്|ice|ais
ഒ|o|o|ഒന്ന്|one|onnu
ഓ|oo|oh|ഓണം|Onam|onam
ഔ|au|au|ഔഷധം|medicine|aushadham
"""),
    ("consonants", "Consonants", """
ക|ka|k|കണ്ണ്|eye|kannu
ഖ|kha|kh|ഖനി|mine|khani
ഗ|ga|g|ഗുരു|teacher|guru
ഘ|gha|gh|ഘടം|pot|ghatam
ങ|nga|ng|മങ്ങ്|dim|mangngu
ച|cha|ch|ചായ|tea|chaaya
ഛ|chha|chh|ഛായ|shade|chaaya
ജ|ja|j|ജലം|water|jalam
ഞ|nya|ny|ഞാൻ|I|njaan
ട|ta|ṭ|ടൗൺ|town|town
ഡ|da|ḍ|ഡോക്ടർ|doctor|doctor
ത|tha|th|തല|head|thala
ഥ|tha|th|കഥ|story|katha
ദ|da|d|ദിവസം|day|divasam
ധ|dha|dh|ധനം|wealth|dhanam
ന|na|n|നായ|dog|naaya
പ|pa|p|പാൽ|milk|paal
ഫ|pha|f|ഫലം|fruit|phalam
ബ|ba|b|ബസ്|bus|bas
ഭ|bha|bh|ഭൂമി|earth|bhumi
മ|ma|m|മരം|tree|maram
യ|ya|y|യാത്ര|journey|yaatra
ര|ra|r|രാത്രി|night|raathri
ല|la|l|ലക്ഷം|lakh|laksham
വ|va|v|വീട്|house|veedu
ശ|sha|sh|ശരി|correct|shari
ഷ|sha|sh|കഷ്ടം|hardship|kashtam
സ|sa|s|സൂര്യൻ|sun|suryan
ഹ|ha|h|ഹൃദയം|heart|hridayam
ള|la|ḷ|വള്ളം|boat|vallam
ഴ|zha|zh|മഴ|rain|mazha
റ|ra|r|പാറ|rock|paara
"""))




