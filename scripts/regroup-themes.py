"""Move alphabetical Extra groups into named topics.

Keeps every group that is already a real theme. Rewrites only groups whose
name contains "extra", then rebuilds public/course/stats.json from the ready
files. Does not rebuild the course from shelf.json.
"""
import json
import re
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
READY = ROOT / "public" / "course" / "ready"
COURSE = ROOT / "public" / "course"
LEVELS = ["A1", "A2", "B1", "B2", "P"]
MAX_GROUP = 56

# Specific themes first. A lemma hits a theme when the whole phrase is listed,
# or any word of it is listed (plurals included).
RULES: list[tuple[str, set[str]]] = []


def add(name: str, words: str) -> None:
    bag = set()
    for part in words.split(","):
        word = " ".join(part.strip().lower().split())
        if word:
            bag.add(word)
    RULES.append((name, bag))


add(
    "Time and numbers",
    """
    monday, tuesday, wednesday, thursday, friday, saturday, sunday, january, february, march,
    april, may, june, july, august, september, october, november, december, today, tomorrow,
    yesterday, morning, evening, noon, midnight, dawn, dusk, hour, minute, second, week, month,
    year, decade, century, daily, weekly, monthly, yearly, weekend, weekday, calendar, clock,
    o'clock, midnight, season, spring, summer, autumn, fall, winter, birthday, anniversary,
    zero, one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen,
    fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty, thirty, forty, fifty,
    sixty, seventy, eighty, ninety, hundred, thousand, million, billion, dozen, pair, half,
    quarter, double, triple, percent, percentage, kilo, kilogram, gram, liter, litre, meter,
    metre, mile, ounce, pound, ton, tonne, first, second, third, once, twice, number, digit,
    count, total, average, equal, plus, minus, multiply, divide, fraction, decimal, odd, even,
    noon, bedtime, lunchtime, daytime, nighttime, sometime, someday, anytime, every day,
    """,
)
add(
    "Food and drink",
    """
    food, meal, breakfast, lunch, dinner, supper, snack, picnic, feast, menu, recipe, diet,
    apple, pear, peach, plum, grape, grapes, cherry, lemon, orange, banana, mango, melon,
    watermelon, strawberry, raspberry, blueberry, kiwi, pineapple, coconut, fig, date, olive,
    tomato, potato, onion, garlic, carrot, cabbage, lettuce, spinach, broccoli, cucumber,
    pepper, chili, chilli, corn, pea, peas, bean, beans, rice, wheat, flour, bread, bun, roll,
    toast, sandwich, soup, salad, pasta, noodle, noodles, pizza, pie, cake, cookie, biscuit,
    chocolate, candy, sweet, sugar, honey, jam, butter, cheese, cream, milk, yogurt, egg, eggs,
    meat, beef, pork, lamb, chicken, turkey, ham, bacon, sausage, steak, fish, salmon, tuna,
    shrimp, prawn, crab, salt, pepper, spice, sauce, oil, vinegar, rice, noodle, cereal, oat,
    oats, nut, nuts, almond, peanut, walnut, coffee, tea, juice, water, wine, beer, soda,
    cola, milkshake, smoothie, cocktail, whisky, whiskey, vodka, rum, champagne, cider,
    vegetable, vegetables, fruit, fruits, dessert, pudding, ice cream, pancake, waffle, syrup,
    ketchup, mustard, mayonnaise, gravy, broth, stew, curry, sushi, dumpling, tofu, soy,
    mushroom, avocado, pumpkin, squash, beet, radish, celery, asparagus, artichoke, leek,
    apricot, lime, grapefruit, pomegranate, papaya, guava, lychee, persimmon, cantaloupe,
    edamame, mung, radicchio, arugula, daikon, kohlrabi, pico, snack, appetizer, cuisine,
    ingredient, nutrition, calorie, vegetarian, vegan, delicious, tasty, hungry, thirsty,
    bite, chew, swallow, sip, pour, serve, bake, fry, boil, roast, grill, cook, cooking,
    kitchen, oven, stove, fridge, refrigerator, freezer, microwave, toaster, kettle, pot, pan,
    skillet, wok, ladle, spatula, whisk, colander, cutting board, knife, fork, spoon, plate,
    bowl, cup, mug, glass, napkin, tray, pitcher, jug, bottle, jar, can, tin, lid, cork,
    """,
)
add(
    "Animals",
    """
    animal, pet, dog, cat, puppy, kitten, bird, fish, horse, cow, pig, sheep, goat, chicken,
    hen, rooster, duck, goose, turkey, donkey, mule, ox, bull, calf, lamb, deer, moose, elk,
    fox, wolf, bear, lion, tiger, leopard, cheetah, elephant, giraffe, zebra, monkey, ape,
    gorilla, kangaroo, koala, panda, rabbit, hare, mouse, rat, squirrel, hamster, guinea pig,
    bat, whale, dolphin, shark, seal, otter, beaver, frog, toad, snake, lizard, turtle,
    tortoise, crocodile, alligator, insect, bug, bee, wasp, ant, fly, mosquito, butterfly,
    moth, beetle, spider, scorpion, worm, snail, slug, crab, lobster, oyster, clam, squid,
    octopus, jellyfish, coral, eagle, hawk, owl, crow, raven, sparrow, robin, swan, parrot,
    penguin, flamingo, peacock, pigeon, seagull, gull, woodpecker, hummingbird, nest, egg,
    feather, wing, beak, paw, tail, fur, horn, claw, hoof, mane, scales, flock, herd, pack,
    cub, foal, chick, larva, pupa, wildlife, zoo, farm, stable, kennel, aquarium, birdcage,
    bark, meow, roar, chirp, hunt, prey, predator, mammal, reptile, amphibian, rodent, pet,
    rhinoceros, hippo, hippopotamus, camel, llama, alpaca, bison, buffalo, reindeer, ibis,
    nudibranch, wrack, dragon, unicorn, dinosaur, fossil,
    """,
)
add(
    "Plants",
    """
    plant, tree, flower, leaf, leaves, grass, forest, woods, jungle, bush, shrub, hedge, lawn,
    garden, seed, root, branch, trunk, bark, thorn, petal, blossom, bloom, bud, pollen, nectar,
    rose, tulip, daisy, lily, sunflower, orchid, violet, daffodil, dandelion, clover, moss,
    fern, ivy, cactus, palm, oak, pine, maple, birch, willow, cedar, bamboo, vine, ivy,
    vegetable patch, orchard, harvest, crop, wheat, cornfield, meadow, weed, algae, fungus,
    mushroom, toadstool, herb, mint, basil, parsley, rosemary, thyme, sage, lavender, soil,
    mud, dirt, compost, fertilizer, greenhouse, pot, seedling, sapling, timber, log, wood,
    """,
)
add(
    "Weather and sky",
    """
    weather, sky, sun, moon, star, planet, cloud, clouds, rain, rainy, snow, snowy, wind,
    windy, storm, stormy, thunder, lightning, hurricane, tornado, cyclone, typhoon, blizzard,
    fog, foggy, mist, haze, humid, humidity, drought, flood, rainbow, sunrise, sunset, shade,
    shadow, climate, temperature, degree, forecast, umbrella, raincoat, season, hail, sleet,
    frost, icy, ice, freeze, thaw, breeze, gale, sunshine, sunlight, moonlight, eclipse,
    constellation, galaxy, universe, comet, meteor, orbit, horizon, dawn, dusk, air, oxygen,
    atmosphere, virga, ultraviolet, pollen count,
    """,
)
add(
    "Landscape",
    """
    mountain, hill, valley, cliff, cave, rock, stone, sand, desert, dune, beach, shore, coast,
    island, peninsula, ocean, sea, lake, river, stream, creek, pond, waterfall, spring, well,
    wave, tide, bay, harbor, harbour, port, canal, dam, glacier, iceberg, volcano, earthquake,
    field, plain, prairie, plateau, canyon, ridge, peak, summit, slope, path, trail, forest,
    countryside, landscape, scenery, view, horizon, ground, earth, soil, mud, dust, pebble,
    boulder, mineral, metal, gold, silver, copper, iron, steel, coal, oil, gas, diamond, gem,
    crystal, marble, granite, clay, chalk,
    """,
)
add(
    "Body and health",
    """
    body, head, hair, face, eye, eyes, ear, ears, nose, mouth, lip, lips, tooth, teeth, tongue,
    cheek, chin, jaw, neck, throat, shoulder, arm, elbow, wrist, hand, hands, finger, fingers,
    thumb, nail, chest, breast, back, waist, hip, leg, legs, knee, ankle, foot, feet, toe, toes,
    skin, bone, bones, muscle, blood, heart, lung, lungs, brain, stomach, liver, kidney, nerve,
    vein, artery, spine, rib, skull, skeleton, organ, cell, gene, hormone, pulse, breath,
    health, healthy, sick, ill, illness, disease, fever, cough, cold, flu, pain, ache, headache,
    stomachache, injury, wound, cut, bruise, burn, bleed, bandage, medicine, pill, drug, dose,
    doctor, nurse, patient, hospital, clinic, pharmacy, dentist, surgery, operation, vaccine,
    virus, bacteria, infection, allergy, symptom, diagnosis, treatment, cure, heal, recovery,
    emergency, ambulance, appointment, prescription, vitamin, diet, exercise, fitness, sleep,
    tired, dizzy, nausea, vomit, sweat, tear, tears, saliva, urine, pregnant, birth, baby,
    muscle, posture, hygiene, soap, toothbrush, toothpaste, shampoo, comb, razor, beard,
    moustache, mustache, freckle, wrinkle, scar, tattoo, bald, blonde, blind, deaf, limp,
    disabled, handicap, handicapped, wheelchair, crutch, plaster, cast, x-ray, thermometer,
    stethoscope, syringe, needle, blood pressure, pulse, hygiene, toilet, bathroom tissue,
    period, menstruation, condom, hygiene, cancer, tumor, tuberculosis, asthma, diabetes,
    obesity, mental, therapy, therapist, counselor, addiction, rehab, hospice, anatomy,
    complexion, bloodstream, eyelash, eyebrow, eyelid, toenail, heel, calf, palm, fist, knuckle,
    nostril, pore, gland, tendon, ligament, joint, cartilage, intestine, bladder, uterus,
    sperm, ovary, puberty, elderly, corpse, funeral, cemetery,
    """,
)
add(
    "Clothes and looks",
    """
    clothes, clothing, shirt, t-shirt, blouse, sweater, jumper, cardigan, jacket, coat, suit,
    vest, waistcoat, dress, skirt, pants, trousers, jeans, shorts, leggings, underwear, bra,
    panties, briefs, boxer, sock, socks, stocking, tights, shoe, shoes, boot, boots, sandal,
    sandals, sneaker, sneakers, trainer, trainers, heel, hat, cap, beanie, scarf, glove, gloves,
    mitten, mittens, belt, tie, bow tie, collar, sleeve, cuff, pocket, button, zipper, zip,
    seam, hem, fabric, cotton, wool, silk, linen, leather, denim, polyester, nylon, lace,
    uniform, costume, pajamas, pyjamas, nightgown, robe, apron, raincoat, umbrella, glasses,
    sunglasses, lens, contact lens, jewelry, jewellery, ring, necklace, earring, earrings,
    bracelet, watch, handbag, purse, wallet, backpack, bag, suitcase, luggage, fashion, style,
    stylish, outfit, size, fit, tailor, laundry, iron, hanger, closet, wardrobe, mirror,
    perfume, cosmetics, lipstick, makeup, powder, comb, brush, haircut, barber, salon, dye,
    pattern, stripe, polka, fashionable, elegant, casual, formal, naked, barefoot, wear, put on,
    take off, undress, dress up, button, unbutton, zip, unzip,
    """,
)
add(
    "Home objects",
    """
    house, home, apartment, flat, room, rooms, bedroom, bathroom, kitchen, living room,
    sitting room, dining room, hall, hallway, attic, basement, cellar, garage, balcony, porch,
    yard, garden, roof, ceiling, floor, wall, door, doors, window, windows, stairs, staircase,
    step, elevator, lift, chimney, fence, gate, lock, key, doorbell, doorbell, curtain, blind,
    carpet, rug, mat, furniture, chair, table, desk, bed, sofa, couch, armchair, stool, bench,
    shelf, shelves, cupboard, cabinet, drawer, closet, wardrobe, lamp, light, bulb, candle,
    mirror, clock, picture, frame, vase, plant pot, cushion, pillow, blanket, sheet, duvet,
    mattress, towel, soap, tap, faucet, sink, bath, bathtub, shower, toilet, tile, brick,
    paint, wallpaper, nail, screw, hammer, screwdriver, drill, saw, wrench, pliers, ladder,
    bucket, broom, mop, vacuum, dustpan, sponge, detergent, trash, rubbish, garbage, bin,
    basket, box, container, bottle, jar, can, bag, rope, string, tape, glue, scissors, needle,
    thread, battery, plug, socket, switch, wire, cable, remote, television, tv, radio, phone,
    computer, laptop, screen, keyboard, mouse, printer, camera, photograph, photo, album,
    book, newspaper, magazine, letter, envelope, stamp, pen, pencil, paper, notebook, diary,
    calendar, toy, doll, ball, game, puzzle, gift, present, candle, match, lighter, fire,
    fireplace, heater, fan, air conditioner, washing machine, dryer, dishwasher, ironing,
    housework, chore, clean, dirty, tidy, mess, repair, leak, hole, crack, tool, toolbox,
    doorknob, doorkeeper, hinge, bolt, padlock, keyhole, doorbell, mailbox, postbox, address,
    neighbor, neighbour, landlord, tenant, rent, mortgage, furniture, appliance, gadget,
    device, machine, engine, motor, wheel, handle, lid, cover, tray, coaster, tablecloth,
    placemat, curtain rod, blind, shutter, porch, driveway, sidewalk, pavement, lawn, hedge,
    mailbox, chimney, gutter, tile, insulation, thermostat, smoke alarm, fire extinguisher,
    """,
)
add(
    "Town and places",
    """
    town, city, village, capital, country, nation, state, province, region, border, map,
    street, road, avenue, lane, alley, square, plaza, bridge, tunnel, corner, block, sidewalk,
    pavement, crossing, traffic, sign, light, parking, park, playground, square, downtown,
    suburb, neighborhood, neighbourhood, district, zone, area, place, location, address, site,
    building, tower, skyscraper, castle, palace, church, temple, mosque, synagogue, cathedral,
    museum, library, school, university, college, hospital, clinic, pharmacy, hotel, motel,
    hostel, restaurant, cafe, café, bar, pub, shop, store, market, mall, supermarket, bakery,
    bookstore, bookshop, bank, post office, station, airport, port, harbor, theatre, theater,
    cinema, stadium, gym, pool, zoo, aquarium, gallery, monument, statue, fountain, cemetery,
    factory, warehouse, office, farm, barn, field, prison, jail, court, police, fire station,
    embassy, town hall, city hall, parliament, capitol, ruin, ruins, landmark, destination,
    tourist, tourism, visitor, entrance, exit, gate, ticket office, waiting room, platform,
    lobby, reception, elevator, escalator, corridor, campus, dormitory, canteen, cafeteria,
    playground, kindergarten, nursery, petrol station, gas station, parking lot, crosswalk,
    roundabout, highway, motorway, path, avenue, boulevard, quay, pier, lighthouse, dam,
    """,
)
add(
    "Travel and transport",
    """
    travel, trip, journey, tour, voyage, cruise, flight, ride, drive, walk, hike, commute,
    car, bus, train, tram, subway, metro, taxi, cab, bicycle, bike, motorcycle, scooter,
    truck, van, lorry, ambulance, police car, fire engine, tractor, carriage, wagon, cart,
    boat, ship, ferry, yacht, canoe, kayak, sail, sailing, plane, airplane, aeroplane,
    helicopter, rocket, airport, station, platform, stop, ticket, passport, visa, luggage,
    suitcase, backpack, map, compass, guide, tourist, hotel, reservation, booking, check in,
    check out, delay, cancel, arrive, depart, leave, return, transfer, connection, seat,
    aisle, window seat, driver, pilot, passenger, crew, captain, conductor, fare, timetable,
    schedule, destination, route, direction, north, south, east, west, left, right, straight,
    corner, block, distance, speed, traffic, accident, petrol, gas, diesel, fuel, engine,
    wheel, tire, tyre, brake, steering, horn, seatbelt, helmet, license, licence, highway,
    motorway, railway, railroad, track, harbor, harbour, port, dock, anchor, deck, cabin,
    runway, gate, customs, immigration, boarding, luggage belt, carriage, compartment,
    """,
)
add(
    "Shopping and money",
    """
    money, cash, coin, coins, bill, note, banknote, change, price, cost, expensive, cheap,
    free, sale, discount, bargain, receipt, tax, tip, fee, fine, debt, loan, credit, debit,
    card, wallet, purse, bank, account, savings, interest, salary, wage, pay, payment, bill,
    invoice, rent, mortgage, insurance, budget, spend, save, buy, sell, shop, store, market,
    customer, cashier, checkout, basket, cart, queue, line, size, brand, quality, warranty,
    refund, exchange, order, delivery, package, parcel, postage, expensive, affordable,
    wealthy, poor, rich, poverty, economy, economic, inflation, profit, loss, investment,
    investor, stock, share, market, trade, import, export, tax, taxpayer, charity, donate,
    dollar, euro, pound, yen, cent, penny, fortune, treasure, jewel, gold, poverty, wealth,
    bargain, expensive, inexpensive, pricey, cost, worth, value, cheap, free of charge,
    """,
)
add(
    "Work",
    """
    work, job, career, profession, occupation, employment, employer, employee, boss, manager,
    colleague, coworker, office, meeting, deadline, project, task, duty, shift, overtime,
    retire, retirement, resign, fire, hire, interview, resume, cv, application, promotion,
    raise, strike, union, factory, farm, business, company, firm, industry, client, customer,
    contract, agreement, colleague, staff, team, department, secretary, assistant, intern,
    volunteer, unemployment, pension, commute, workplace, profession, skilled, labor, labour,
    engineer, doctor, nurse, teacher, lawyer, judge, police, officer, soldier, firefighter,
    farmer, cook, chef, waiter, waitress, driver, pilot, artist, musician, actor, actress,
    writer, journalist, scientist, programmer, designer, architect, mechanic, electrician,
    plumber, carpenter, builder, cleaner, barber, hairdresser, tailor, baker, butcher,
    cashier, receptionist, librarian, professor, student, pupil, dentist, vet, veterinarian,
    pharmacist, surgeon, psychologist, therapist, accountant, banker, economist, politician,
    president, minister, mayor, king, queen, prince, princess, president, ambassador, spy,
    detective, criminal, thief, pirate, astronaut, athlete, coach, referee, sailor, fisher,
    miner, hunter, shepherd, priest, monk, nun, missionary, translator, interpreter, guide,
    photographer, painter, sculptor, poet, novelist, editor, publisher, director, producer,
    singer, dancer, composer, conductor, magician, clown, athlete, champion, businesswoman,
    businessman, entrepreneur, founder, colleague, supervisor, foreman, apprentice,
    """,
)
add(
    "School and study",
    """
    school, class, classroom, lesson, course, subject, homework, exam, test, quiz, grade,
    mark, score, pass, fail, flunk, student, pupil, teacher, professor, principal, classmate,
    schoolmate, campus, university, college, degree, diploma, certificate, graduation,
    graduate, scholarship, tuition, library, textbook, notebook, pencil, pen, eraser, ruler,
    chalk, blackboard, whiteboard, desk, calculator, experiment, laboratory, lab, science,
    math, mathematics, history, geography, biology, chemistry, physics, literature, grammar,
    spelling, vocabulary, alphabet, letter, sentence, paragraph, essay, thesis, research,
    study, learn, teach, understand, memorize, revise, practice, practise, knowledge,
    ignorance, intelligent, clever, stupid, genius, talent, skill, ability, effort, attention,
    concentrate, question, answer, example, definition, dictionary, encyclopedia, chapter,
    page, title, author, read, write, count, calculate, formula, equation, theorem, proof,
    hypothesis, theory, data, chart, graph, diagram, map, globe, atlas, microscope, telescope,
    graduation, semester, term, lecture, seminar, tutor, kindergarten, nursery, primary,
    secondary, high school, curriculum, syllabus, attendance, absent, present, cheat, copy,
    """,
)
add(
    "Language",
    """
    language, word, words, sentence, phrase, grammar, verb, noun, adjective, adverb, pronoun,
    preposition, conjunction, article, tense, plural, singular, masculine, feminine, neuter,
    case, declension, conjugation, syllable, vowel, consonant, accent, dialect, translation,
    translate, interpreter, dictionary, definition, meaning, synonym, antonym, idiom, proverb,
    slang, spelling, punctuation, comma, period, full stop, question mark, exclamation,
    apostrophe, hyphen, quote, quotation, paragraph, chapter, letter, alphabet, character,
    kanji, hiragana, katakana, pinyin, tone, reading, pronunciation, pronounce, accent, fluent,
    native, foreign, bilingual, vocabulary, lexicon, syntax, semantics, metaphor, simile,
    rhyme, poem, poetry, prose, novel, story, tale, myth, legend, fable, author, poet, title,
    page, book, magazine, newspaper, article, headline, caption, ink, print, publish, editor,
    referent, definite article, inverted commas, speech, say, tell, speak, talk, ask, answer,
    shout, whisper, argue, discuss, conversation, dialogue, monologue, joke, riddle, lie,
    truth, promise, secret, news, message, letter, email, chat, call, phone,
    """,
)
add(
    "Sports and play",
    """
    sport, sports, game, play, player, team, match, score, goal, win, lose, draw, tie, champion,
    championship, tournament, league, cup, medal, prize, trophy, coach, referee, fan, stadium,
    field, court, pitch, track, pool, gym, exercise, fitness, train, practice, practise,
    football, soccer, basketball, baseball, tennis, golf, rugby, cricket, hockey, volleyball,
    badminton, ping pong, table tennis, swimming, swim, diving, diver, running, run, jogging,
    marathon, cycling, bicycle, skiing, ski, skating, skate, surfing, surf, sailing, boxing,
    wrestling, judo, karate, yoga, dance, dancing, chess, checkers, card, cards, dice, puzzle,
    toy, doll, ball, bat, racket, racquet, club, glove, helmet, net, whistle, kick, throw,
    catch, hit, jump, climb, race, compete, competition, athlete, olympic, olympics, hobby,
    leisure, free time, pastime, camping, camp, picnic, hiking, fishing, hunting, photography,
    collection, collect, kite, swing, slide, playground, video game, console, dice, board game,
    """,
)
add(
    "Music and art",
    """
    music, song, sing, singer, voice, choir, band, orchestra, concert, opera, ballet, dance,
    melody, rhythm, beat, note, scale, chord, harmony, tune, lyric, lyrics, instrument, piano,
    guitar, violin, cello, drum, drums, flute, trumpet, saxophone, clarinet, harp, organ,
    accordion, harmonica, microphone, speaker, headphone, radio, record, recording, album,
    composer, conductor, musician, audience, stage, theater, theatre, actor, actress, play,
    drama, comedy, tragedy, scene, act, role, script, film, movie, cinema, camera, photograph,
    photo, picture, painting, paint, painter, draw, drawing, sketch, sculpture, statue, clay,
    gallery, museum, exhibition, art, artist, design, designer, color, colour, canvas, brush,
    frame, portrait, landscape, abstract, style, fashion, architecture, building, pattern,
    poem, poetry, poet, novel, literature, story, culture, cultural, tradition, festival,
    carnival, parade, costume, mask, applause, clap, bow, encore, rehearsal, perform, performance,
    karaoke, maestro, gaiety,
    """,
)
add(
    "Feelings",
    """
    feel, feeling, emotion, happy, happiness, sad, sadness, angry, anger, afraid, fear, scared,
    brave, courage, love, loved, hate, hatred, like, dislike, enjoy, joy, fun, bored, boredom,
    excited, excitement, nervous, anxiety, anxious, calm, peaceful, hope, hopeful, despair,
    proud, pride, shame, ashamed, guilt, guilty, jealous, jealousy, envy, lonely, loneliness,
    surprised, surprise, shocked, shock, confused, confusion, curious, curiosity, interested,
    interesting, worried, worry, stress, stressed, relaxed, relief, grateful, gratitude, sorry,
    pity, sympathy, empathy, kindness, kind, cruel, gentle, patient, impatient, confident,
    shy, bold, mood, temper, cry, laugh, smile, frown, sigh, kiss, hug, comfort, miss, wish,
    dream, nightmare, memory, remember, forget, want, need, prefer, rather, mind, soul, heart,
    spirit, conscience, doubt, trust, believe, faith, doubt, wonder, imagine, imagination,
    lonely, cheerful, miserable, delighted, furious, terrified, terrify, awful, fantastic,
    wonderful, terrible, horrible, lovely, cute, sweet, darling, sweetheart, hero, coward,
    mood, feeling, passion, desire, lust, affection, tenderness, grief, mourn, sorrow,
    resentment, bitter, delight, pleasure, pain, suffer, suffering, comfort, uncomfortable,
    embarrassed, embarrassment, humiliated, humble, proud, arrogant, modest, sincere, honest,
    liar, loyal, betray, forgiveness, forgive, regret, remorse, hope, hopeless, optimistic,
    pessimistic, sentimental, romantic, indifference, numb, overwhelmed, frustrated, frustration,
    annoyance, annoyed, irritate, patience, serenity, serene, bliss, ecstasy, melancholy,
    nostalgic, homesick, jealous, envious, greedy, generous, selfish, selfless, lazy, laziness,
    ambitious, ambition, motivation, will, discipline, habit, instinct, impulse, temper,
    """,
)
add(
    "Ideas",
    """
    idea, ideas, thought, think, thinking, concept, notion, theory, hypothesis, principle,
    reason, logic, argument, opinion, view, belief, believe, knowledge, wisdom, truth, fact,
    fiction, myth, reality, real, imaginary, possible, impossible, probable, certain, doubt,
    question, problem, solution, answer, example, cause, effect, result, purpose, goal, aim,
    plan, method, system, process, structure, pattern, model, form, shape, type, kind, sort,
    category, class, group, set, list, order, series, sequence, part, whole, piece, detail,
    general, specific, abstract, concrete, simple, complex, similar, different, same, other,
    change, develop, development, progress, improve, improvement, increase, decrease, level,
    degree, extent, amount, quality, quantity, value, meaning, sense, point, matter, issue,
    topic, subject, theme, context, situation, condition, circumstance, opportunity, risk,
    chance, choice, decision, decide, option, alternative, advantage, disadvantage, benefit,
    drawback, limit, limitation, exception, rule, law, standard, normal, typical, unusual,
    special, ordinary, common, rare, important, unimportant, necessary, possible, available,
    obvious, apparent, clear, vague, exact, precise, approximate, relative, absolute, basic,
    advanced, modern, ancient, traditional, original, copy, version, example, sample, case,
    evidence, proof, argument, conclusion, premise, assumption, inference, analysis, analyze,
    analyse, compare, contrast, define, definition, describe, explain, explanation, interpret,
    interpretation, criticize, criticism, judge, judgment, judgement, evaluate, evaluation,
    measure, estimate, estimate, calculate, predict, prediction, expect, expectation, intend,
    intention, purpose, motive, reason, because, therefore, however, although, instead, rather,
    concept, abstract, philosophy, philosopher, ethics, moral, morality, virtue, vice, justice,
    freedom, liberty, equality, right, duty, responsibility, identity, existence, exist,
    essence, nature, culture, society, history, future, past, present, time, space, infinity,
    zero, nothing, something, everything, everyone, nobody, mystery, secret, symbol, sign,
    signal, code, information, data, message, communication, media, news, report, story,
    """,
)
add(
    "Society",
    """
    society, social, community, public, private, people, person, population, citizen, civilian,
    nation, national, nationalist, country, state, government, politics, political, politician,
    policy, law, legal, illegal, crime, criminal, police, court, judge, jury, prison, jail,
    punishment, fine, rights, duty, vote, election, democracy, republic, king, queen, empire,
    colony, war, peace, army, navy, air force, soldier, battle, weapon, gun, bomb, treaty,
    alliance, enemy, ally, border, immigration, refugee, passport, custom, tradition, religion,
    religious, god, church, prayer, priest, faith, culture, cultural, festival, ceremony,
    wedding, marriage, divorce, funeral, birthday, holiday, party, guest, host, neighbor,
    neighbour, friend, stranger, crowd, group, team, club, association, organization, union,
    charity, volunteer, protest, revolution, reform, justice, equality, freedom, poverty,
    wealth, class, gender, race, racism, racist, sexism, prejudice, discrimination, minority,
    majority, generation, child, adult, elderly, family, parent, marriage, couple, single,
    community, neighborhood, village, city, rural, urban, global, local, international,
    foreign, native, immigrant, citizen, vote, parliament, president, minister, mayor, law,
    constitution, tax, welfare, hospital, school, public, private, media, press, newspaper,
    television, internet, advertisement, propaganda, rumor, rumour, gossip, reputation, fame,
    famous, celebrity, hero, victim, witness, accident, disaster, emergency, rescue, aid,
    hunger, homeless, unemployment, strike, protest, demonstration, election, campaign, vote,
    ballot, candidate, party, policy, reform, corruption, bribe, scandal, trial, verdict,
    sentence, innocent, guilty, lawyer, attorney, sue, appeal, evidence, witness, crime,
    theft, murder, fraud, violence, peace, conflict, negotiation, compromise, agreement,
    contract, signature, permission, ban, allow, forbid, rule, regulation, custom, habit,
    norm, taboo, ritual, ceremony, tradition, heritage, monument, flag, anthem, empire,
    kingdom, republic, colony, independence, liberation, invasion, occupation, refugee,
    asylum, border, customs, smuggle, spy, terrorism, security, surveillance, privacy,
    """,
)
add(
    "Science",
    """
    science, scientific, scientist, experiment, laboratory, lab, research, theory, hypothesis,
    data, evidence, measure, measurement, microscope, telescope, atom, molecule, cell, gene,
    dna, evolution, species, fossil, dinosaur, gravity, energy, force, mass, speed, light,
    sound, heat, electricity, magnet, magnetic, chemical, chemistry, element, metal, gas,
    liquid, solid, acid, base, reaction, physics, biology, geology, astronomy, planet, star,
    galaxy, universe, orbit, rocket, satellite, space, computer, software, hardware, program,
    code, algorithm, data, internet, website, email, robot, machine, engine, technology,
    technical, digital, electronic, circuit, battery, wire, sensor, laser, radar, x-ray,
    climate, environment, environmental, pollution, recycle, carbon, oxygen, hydrogen, atom,
    nucleus, electron, proton, neutron, radiation, nuclear, solar, lunar, eclipse, equation,
    formula, mathematics, geometry, algebra, statistics, probability, variable, constant,
    virus, bacteria, vaccine, antibiotic, organ, tissue, protein, vitamin, calorie, ecosystem,
    habitat, extinct, endangered, climate change, greenhouse, ozone, earthquake, volcano,
    mineral, crystal, chemical, compound, solution, mixture, temperature, pressure, vacuum,
    frequency, wave, particle, quantum, relativity, invention, invent, discover, discovery,
    patent, engineer, engineering, mechanic, technical, automatically, digital, online, offline,
    database, network, server, chip, circuit, processor, memory, screen, pixel, byte, file,
    folder, password, user, download, upload, click, link, website, blog, virus, malware,
    """,
)
add(
    "More actions",
    """
    go, come, walk, run, sit, stand, lie, sleep, wake, eat, drink, cook, clean, wash, open,
    close, take, give, put, get, make, do, say, tell, speak, talk, ask, answer, read, write,
    listen, hear, see, look, watch, find, lose, keep, hold, carry, bring, send, buy, sell,
    pay, cost, work, play, study, learn, teach, help, try, start, stop, finish, begin, end,
    move, turn, push, pull, lift, drop, throw, catch, hit, cut, break, fix, build, grow,
    change, become, seem, feel, think, know, understand, remember, forget, want, need, like,
    love, hate, hope, wish, decide, choose, plan, wait, stay, leave, arrive, return, follow,
    lead, meet, join, share, show, hide, cover, fill, empty, pour, mix, stir, bake, fry, boil,
    drive, ride, fly, swim, climb, jump, dance, sing, laugh, cry, smile, kiss, hug, touch,
    hold, shake, nod, point, wave, call, phone, text, email, visit, travel, rest, relax,
    exercise, breathe, cough, sneeze, yawn, stretch, bend, kneel, crawl, roll, slip, fall,
    rise, raise, lower, open, shut, lock, unlock, tie, untie, fold, wrap, pack, unpack,
    wear, dress, undress, sew, knit, dig, plant, water, harvest, feed, cook, serve, taste,
    smell, burn, melt, freeze, boil, dry, wet, paint, draw, measure, weigh, count, add,
    subtract, check, test, try, fail, pass, win, lose, fight, argue, agree, refuse, accept,
    allow, forbid, promise, lie, steal, borrow, lend, owe, spend, save, waste, use, need,
    offer, invite, accept, refuse, thank, apologize, explain, describe, suggest, advise,
    warn, remind, order, ask, beg, demand, complain, praise, blame, forgive, punish, protect,
    save, rescue, attack, defend, escape, chase, follow, search, discover, invent, create,
    destroy, repair, improve, develop, increase, decrease, continue, pause, repeat, practise,
    practice, prepare, organize, arrange, manage, control, lead, follow, support, oppose,
    vote, elect, rule, govern, judge, decide, choose, prefer, compare, include, exclude,
    belong, contain, consist, depend, cause, prevent, allow, require, suppose, assume, prove,
    seem, appear, disappear, exist, happen, occur, remain, last, die, live, born, grow, age,
    marry, divorce, kiss, hug, miss, care, worry, hope, fear, enjoy, suffer, recover, heal,
    breathe, bleed, hurt, ache, swallow, chew, bite, lick, spit, vomit, sweat, shiver, faint,
    dream, wake, snore, rest, hurry, rush, delay, wait, arrive, depart, board, land, park,
    crash, skid, brake, accelerate, steer, sail, row, paddle, dive, float, sink, surf, skate,
    ski, cycle, pedal, type, click, print, copy, paste, delete, save, send, receive, download,
    upload, charge, plug, switch, press, turn, spin, roll, slide, drag, shove, poke, scratch,
    rub, wipe, sweep, mop, vacuum, dust, polish, rinse, soak, wring, hang, fold, iron, sew,
    button, zip, tie, comb, brush, shave, trim, cut, dye, bake, roast, grill, steam, chop,
    peel, slice, grate, stir, pour, spill, serve, dine, chew, sip, toast, boil over,
    abandon, acknowledge, admit, adopt, advise, afford, agree, aim, allow, announce, apologize,
    appear, apply, appreciate, approach, approve, argue, arrange, arrest, arrive, ask, assume,
    attach, attack, attempt, attend, attract, avoid, awake, bake, balance, ban, bang, base,
    bathe, battle, beam, bear, beat, become, beg, begin, behave, believe, belong, bend, bet,
    bless, block, blow, boil, book, borrow, bounce, bow, brake, branch, breathe, breed, bring,
    broadcast, brush, build, burn, burst, bury, buy, calculate, call, camp, care, carry, carve,
    catch, cause, celebrate, challenge, change, charge, chase, chat, cheat, check, cheer,
    chew, choose, chop, claim, clap, clean, clear, climb, cling, close, collect, combine,
    come, comfort, command, comment, commit, communicate, compare, compete, complain, complete,
    concentrate, concern, conclude, confess, confirm, confuse, connect, consider, consist,
    contain, continue, contribute, control, convince, cook, cool, copy, correct, cost, count,
    cover, crack, crash, crawl, create, cross, crush, cry, cure, curl, curve, cut, cycle,
    damage, dance, dare, deal, decide, declare, decorate, decrease, defend, define, delay,
    deliver, demand, deny, depend, describe, deserve, design, destroy, develop, die, differ,
    dig, disappear, disappoint, discover, discuss, dislike, dismiss, display, distance, disturb,
    dive, divide, do, double, doubt, drag, draw, dream, dress, drink, drive, drop, dry, earn,
    eat, educate, elect, embarrass, employ, empty, enable, encourage, end, enjoy, enter,
    entertain, escape, establish, estimate, examine, exchange, excite, excuse, exercise, exist,
    expand, expect, experience, explain, explode, explore, export, express, extend, face, fail,
    fall, fasten, fear, feed, feel, fight, fill, film, find, finish, fire, fit, fix, flash,
    flee, float, flood, flow, fly, fold, follow, fool, force, forget, forgive, form, found,
    freeze, frighten, fry, gather, gaze, get, give, glance, glow, glue, go, grab, graduate,
    greet, grin, grind, grow, guarantee, guard, guess, guide, handle, hang, happen, harm, hate,
    have, head, heal, hear, heat, help, hesitate, hide, hire, hit, hold, hope, hug, hunt, hurry,
    hurt, identify, ignore, imagine, imitate, import, improve, include, increase, indicate,
    influence, inform, injure, insist, inspire, install, intend, interest, interrupt, introduce,
    invent, invest, investigate, invite, involve, iron, itch, jail, jog, join, joke, judge,
    jump, keep, kick, kill, kiss, kneel, knock, know, label, land, last, laugh, launch, lay,
    lead, lean, leap, learn, leave, lend, let, lick, lie, lift, light, like, limit, link, list,
    listen, live, load, lock, look, lose, love, lower, mail, maintain, make, manage, march,
    mark, marry, match, matter, mean, measure, meet, melt, mention, mind, miss, mix, moan,
    motivate, move, murder, nail, name, need, nod, notice, obey, object, observe, obtain,
    occur, offend, offer, open, operate, order, organize, ought, owe, own, pack, paint, park,
    part, pass, pause, pay, peel, perform, permit, persuade, phone, pick, pinch, place, plan,
    plant, play, please, plug, point, poke, polish, possess, post, pour, practise, practice,
    praise, pray, prefer, prepare, present, preserve, press, pretend, prevent, print, produce,
    promise, pronounce, protect, protest, prove, provide, pull, pump, punch, punish, push, put,
    qualify, question, queue, race, rain, raise, reach, react, read, realize, receive, recognize,
    recommend, record, recover, reduce, refer, reflect, refuse, regret, reject, relate, relax,
    release, rely, remain, remember, remind, remove, repair, repeat, replace, reply, report,
    represent, request, require, rescue, research, resign, resist, respect, rest, result, retire,
    return, reveal, ring, rise, risk, rob, rock, roll, rub, ruin, rule, run, rush, sail, save,
    say, scare, scatter, score, scratch, scream, search, see, seem, sell, send, sense, separate,
    serve, set, settle, sew, shake, shall, shape, share, shave, shine, shiver, shock, shoot,
    shop, should, shout, show, shrink, shut, sigh, sign, sing, sink, sit, skate, ski, skip,
    sleep, slide, slip, smell, smile, smoke, sneeze, snow, solve, sort, sound, speak, spell,
    spend, spill, spin, spit, split, spoil, spread, squeeze, stand, stare, start, stay, steal,
    step, stick, sting, stir, stop, store, storm, study, succeed, suck, suffer, suggest, suit,
    supply, support, suppose, surprise, survive, swallow, swear, sweep, swim, swing, switch,
    take, talk, tap, taste, teach, tear, tease, telephone, tell, tend, test, thank, think,
    threaten, throw, tick, tidy, tie, time, tip, tire, touch, tour, trade, train, translate,
    trap, travel, treat, tremble, trick, trip, trust, try, turn, twist, type, undergo, understand,
    undress, unfold, unite, unlock, unpack, untie, upset, use, vanish, visit, vote, wait, wake,
    walk, wander, want, warm, warn, wash, waste, watch, water, wave, wear, weigh, welcome, whip,
    whisper, whistle, win, wink, wipe, wish, wonder, work, worry, wrap, wreck, wrestle, write,
    yawn, yell, zip, zoom, abandon, absorb, accelerate, accompany, accomplish, accuse, achieve,
    acquire, adapt, adjust, admire, admit, advance, advertise, affect, afford, age, alarm,
    alter, amaze, amuse, analyze, analyse, animate, anticipate, apologize, appeal, applaud,
    appoint, approach, approve, arise, arouse, arrange, arrest, assemble, assert, assess,
    assign, assist, associate, assure, astonish, attach, attain, attempt, attract, attribute,
    authorize, await, award, back, balance, bang, bargain, bathe, bear, beg, behave, bend,
    benefit, betray, bind, bite, blame, blast, bleed, bless, blink, boast, boil, boost, bore,
    borrow, bounce, bow, brake, brand, breathe, breed, brew, bribe, broadcast, browse, bruise,
    brush, bubble, bump, burn, burst, bury, buzz, calculate, cancel, capture, caress, carve,
    cast, catch, cater, cease, celebrate, challenge, chase, chat, cheat, check, cheer, chew,
    choke, chop, circle, circulate, cite, claim, clap, clarify, classify, click, climb, cling,
    clip, clutch, coach, coincide, collapse, collect, collide, comb, combine, comfort, command,
    commence, comment, commission, commit, communicate, commute, compare, compel, compensate,
    compete, compile, complain, complement, complete, complicate, comply, compose, comprehend,
    compress, comprise, compromise, compute, conceal, concede, conceive, concentrate, concern,
    conclude, condemn, conduct, confer, confess, confide, confine, confirm, conflict, conform,
    confront, confuse, congratulate, connect, conquer, consent, conserve, consider, consist,
    console, consolidate, constitute, construct, consult, consume, contact, contain, contemplate,
    contend, contest, continue, contract, contradict, contrast, contribute, control, convert,
    convey, convince, cooperate, coordinate, cope, copy, correct, correspond, corrupt, cough,
    counsel, count, counter, cover, crack, craft, crash, crave, crawl, create, credit, creep,
    criticise, criticize, cross, crouch, crush, cultivate, cure, curl, curse, curve, cycle,
    damage, dampen, dare, dash, date, deal, debate, decay, deceive, decide, declare, decline,
    decorate, decrease, dedicate, deduct, deem, defeat, defend, define, deflect, deform, delay,
    delegate, delete, delight, deliver, demand, demonstrate, deny, depart, depend, depict,
    deploy, deposit, depress, derive, descend, describe, desert, deserve, design, designate,
    desire, despise, destroy, detach, detect, determine, develop, devise, devote, diagnose,
    dictate, differ, dig, digest, diminish, dip, direct, disable, disagree, disappear, disappoint,
    disapprove, disarm, discharge, discipline, disclose, disconnect, discount, discourage,
    discover, discredit, discuss, disguise, disgust, dislike, dismiss, disobey, display, dispose,
    dispute, disrupt, dissolve, distinguish, distort, distract, distress, distribute, disturb,
    dive, divert, divide, divorce, dock, dominate, donate, double, doubt, download, draft, drag,
    drain, draw, dread, drill, drip, drive, drop, drown, dry, dump, duplicate, dwell, earn, ease,
    echo, edit, educate, elect, eliminate, embarrass, embrace, emerge, emigrate, emit, emphasize,
    employ, empty, enable, enclose, encounter, encourage, endanger, endorse, endure, enforce,
    engage, enhance, enjoy, enlarge, enquire, enrich, enroll, ensure, enter, entertain, entitle,
    equal, equip, erase, erect, erupt, escape, escort, establish, estimate, evaluate, evaporate,
    examine, exceed, exchange, excite, exclude, excuse, execute, exercise, exert, exhaust,
    exhibit, exist, expand, expect, expel, experience, experiment, explain, explode, exploit,
    explore, export, expose, express, extend, extract, face, facilitate, fade, fail, fake, fall,
    fascinate, fasten, favor, favour, fear, feature, feed, feel, fetch, fight, figure, file, fill,
    finance, find, finish, fire, fish, fit, fix, flash, flatten, flee, flex, flick, fling, flip,
    float, flock, flood, flourish, flow, fluctuate, flush, fly, focus, fold, follow, forbid, force,
    forecast, foresee, forge, forget, forgive, form, formulate, found, frame, freeze, frighten,
    frown, fry, fulfill, function, fund, furnish, gain, gasp, gather, gauge, gaze, generate,
    get, giggle, give, glance, glare, gleam, glide, glimpse, glitter, glow, glue, gnaw, go, govern,
    grab, grade, graduate, grant, grasp, grate, graze, greet, grieve, grind, grin, grip, groan,
    grow, growl, grumble, guarantee, guard, guess, guide, gulp, hack, hail, halt, hand, handle,
    hang, happen, harass, harm, harvest, hasten, hate, haunt, have, head, heal, heap, hear, heat,
    heave, help, hesitate, hide, highlight, hike, hinder, hint, hire, hit, hoist, hold, honk, hook,
    hop, hope, host, hover, hug, hum, hunt, hurl, hurry, hurt, identify, idle, ignite, ignore,
    illuminate, illustrate, imagine, imitate, immerse, immigrate, impair, impart, impede, implement,
    imply, import, impose, impress, improve, include, incorporate, increase, indicate, induce,
    indulge, infect, infer, inflame, inflate, influence, inform, inhabit, inherit, injure, insert,
    insist, inspect, inspire, install, instruct, insult, insure, integrate, intend, intensify,
    interact, interest, interfere, interpret, interrupt, interview, introduce, invade, invent,
    invest, investigate, invite, involve, iron, irritate, isolate, issue, itch, jail, jam, jog,
    join, joke, jolt, judge, juggle, jump, justify, keep, kick, kidnap, kill, kiss, kneel, knit,
    knock, knot, know, label, lack, land, last, laugh, launch, lay, lead, leak, lean, leap, learn,
    leave, lecture, lend, lengthen, let, lick, lie, lift, light, lighten, like, limit, linger, link,
    list, listen, live, load, loan, locate, lock, log, long, look, loosen, lose, love, lower, mail,
    maintain, make, manage, manufacture, march, mark, marry, marvel, mash, mask, master, match,
    matter, mature, mean, measure, meditate, meet, melt, mend, mention, merge, might, migrate,
    mind, mine, minimize, mislead, miss, mix, moan, mobilize, mock, model, modify, monitor, motivate,
    mount, mourn, move, mow, multiply, mumble, murder, murmur, muse, muster, mutter, nail, name,
    nap, narrate, need, neglect, negotiate, nod, nominate, note, notice, notify, nourish, number,
    obey, object, oblige, observe, obtain, occupy, occur, offend, offer, omit, open, operate, oppose,
    opt, order, organize, originate, ought, outline, overcome, overflow, overlook, overtake, owe,
    own, pace, pack, paint, pant, parade, pardon, park, part, participate, pass, pat, patch, pause,
    pay, peck, pedal, peel, peep, penetrate, perceive, perform, permit, persist, persuade, pet,
    phone, photograph, pick, picnic, picture, pierce, pile, pinch, pine, pioneer, pitch, place,
    plan, plant, play, plead, please, pledge, plot, plow, plough, plug, plunge, point, poke, polish,
    pollute, ponder, pop, possess, post, postpone, pour, practise, practice, praise, pray, preach,
    precede, predict, prefer, prepare, prescribe, present, preserve, preside, press, presume, pretend,
    prevail, prevent, price, prick, print, proceed, process, proclaim, produce, profess, program,
    progress, prohibit, project, promise, promote, prompt, pronounce, proof, propose, prosper,
    protect, protest, prove, provide, provoke, publish, pull, pump, punch, punish, purchase, pursue,
    push, put, puzzle, qualify, quarrel, question, queue, quit, quote, race, radiate, rain, raise,
    rally, range, rank, rate, reach, react, read, realize, realise, reap, rear, reason, rebel,
    recall, receive, recite, reckon, recognize, recognise, recommend, reconcile, record, recover,
    recruit, recycle, reduce, refer, reflect, reform, refresh, refuse, regard, register, regret,
    regulate, rehearse, reign, reinforce, reject, relate, relax, release, relieve, rely, remain,
    remark, remember, remind, remove, rent, repair, repay, repeat, replace, reply, report, represent,
    reproduce, request, require, rescue, research, resemble, resent, reserve, resign, resist, resolve,
    resort, respect, respond, rest, restore, restrain, restrict, result, resume, retain, retire,
    retreat, retrieve, return, reveal, revenge, reverse, review, revise, revive, revolve, reward,
    rid, ride, ring, rinse, rise, risk, roar, rob, rock, roll, rot, row, rub, ruin, rule, run, rush,
    sack, sacrifice, sail, salute, sample, satisfy, save, say, scan, scare, scatter, schedule, scold,
    score, scramble, scrape, scratch, scream, screen, screw, scrub, seal, search, seat, secure, see,
    seek, seem, seize, select, sell, send, sense, sentence, separate, serve, set, settle, sew, shake,
    shall, shame, shape, share, shatter, shave, shed, shine, shiver, shock, shoot, shop, should,
    shout, shove, show, shrink, shrug, shut, sigh, sign, signal, simplify, sing, sink, sip, sit,
    skate, sketch, ski, skip, slam, slap, sleep, slice, slide, slip, slit, slope, slow, smash, smell,
    smile, smoke, snap, snatch, sneak, sneeze, sniff, snore, snow, soak, sob, solve, sort, sound,
    sow, spare, spark, speak, specify, speed, spell, spend, spill, spin, spit, splash, split, spoil,
    sponsor, spot, spread, spring, sprinkle, spy, squeeze, stab, stack, stain, stamp, stand, stare,
    start, starve, state, stay, steal, steam, steer, step, stick, stimulate, sting, stink, stir,
    stitch, stock, stop, store, storm, strain, strap, stray, strengthen, stress, stretch, strike,
    string, strip, strive, stroke, structure, struggle, study, stuff, stumble, stun, submit, substitute,
    succeed, suck, suffer, suggest, suit, summarize, summon, supply, support, suppose, suppress,
    surge, surprise, surrender, surround, survey, survive, suspect, suspend, sustain, swallow, swear,
    sweat, sweep, swell, swim, swing, switch, symbolize, sympathize, tackle, take, talk, tame, tap,
    tape, target, taste, tax, teach, tear, tease, telephone, tell, tempt, tend, term, terrify, test,
    thank, thaw, theorize, thicken, thin, think, threaten, thrive, throw, thrust, tick, tidy, tie,
    tighten, time, tip, tire, title, toast, tolerate, toss, total, touch, tour, tow, trace, track,
    trade, trail, train, transfer, transform, translate, transmit, transport, trap, travel, tread,
    treat, tremble, trick, trigger, trim, trip, triumph, trouble, trust, try, tuck, tug, tumble, turn,
    tutor, twist, type, uncover, undergo, underline, undermine, understand, undertake, undo, undress,
    unfold, unite, unload, unlock, unpack, untie, update, upgrade, uphold, upset, urge, use, utter,
    vanish, vary, venture, verify, vibrate, view, visit, visualize, voice, volunteer, vote, vow, wait,
    wake, walk, wander, want, warm, warn, warrant, wash, waste, watch, water, wave, weaken, wear,
    weave, wed, weed, weep, weigh, welcome, whip, whirl, whisper, whistle, widen, win, wind, wink,
    wipe, wish, withdraw, witness, wonder, work, worry, worship, wound, wrap, wreck, wrestle, wring,
    wrinkle, write, yawn, yearn, yell, yield, zip, zoom,
    """,
)

# Theme order on the shelf. Numbers are assigned from 80 in this order.
ORDER = [
    "Little words",
    "Time and numbers",
    "People",
    "Body and health",
    "Clothes and looks",
    "Feelings",
    "Home objects",
    "Food and drink",
    "Animals",
    "Plants",
    "Weather and sky",
    "Landscape",
    "Town and places",
    "Travel and transport",
    "Shopping and money",
    "Work",
    "School and study",
    "Language",
    "Sports and play",
    "Music and art",
    "Speaking",
    "Thinking",
    "Moving",
    "Making and changing",
    "Actions",
    "Events",
    "Traits",
    "Ideas",
    "Society",
    "Science",
    "Looks",
    "Qualities",
    "Kinds",
    "Having and lacking",
    "What can happen",
    "How it's done",
    "Degree",
    "When",
    "Place words",
    "Things",
]

KEEP_SMALL = {
    "Animals", "Food and drink", "People", "Feelings", "Body and health", "Clothes and looks",
    "Work", "Home objects", "Little words", "Time and numbers", "Sports and play",
}
PARENT = {
    "Plants": "Landscape",
    "Weather and sky": "Landscape",
    "Landscape": "Things",
    "Speaking": "Actions",
    "Thinking": "Actions",
    "Moving": "Actions",
    "Making and changing": "Actions",
    "Traits": "Ideas",
    "Having and lacking": "Qualities",
    "What can happen": "Qualities",
    "Kinds": "Qualities",
    "Degree": "How it's done",
    "When": "Time and numbers",
    "Place words": "Town and places",
    "Town and places": "Travel and transport",
    "Science": "School and study",
    "School and study": "Ideas",
    "Music and art": "Ideas",
    "Shopping and money": "Work",
    "Travel and transport": "Town and places",
    "Language": "Ideas",
    "Society": "Ideas",
    "Events": "Ideas",
}


def tokens(text: str) -> list[str]:
    return re.findall(r"[a-z0-9']+", text.lower())


def stems(token: str) -> list[str]:
    # Plurals only. Stripping -ing/-ed turns "dating" into the fruit "date".
    out = [token]
    if len(token) > 4 and token.endswith("ies"):
        out.append(token[:-3] + "y")
    elif len(token) > 4 and token.endswith("es"):
        out.append(token[:-2])
    elif len(token) > 3 and token.endswith("s") and not token.endswith("ss"):
        out.append(token[:-1])
    return out


add("Food and drink", "burger, hamburger, coke, spaghetti, lemonade, omelet, omelette, chewing gum, junk food, soft drink, crisp, crisps")
add("Little words", "hello, hi, hey, bye, goodbye, thanks, thank you, pardon, please, yes, no, ok, okay")
add("People", "dad, daddy, mom, mommy, mum, guy, kid, lady, sir, pal, bride, groom, owner, foreigner")

WORD_THEME: dict[str, str] = {}
for name, bag in RULES:
    for word in bag:
        WORD_THEME.setdefault(word, name)


def hit(lemma: str, pos: str) -> str | None:
    def ok(theme: str) -> bool:
        # The long verb list must not swallow nouns that happen to share a spelling.
        return theme != "More actions" or pos == "verb"

    found = WORD_THEME.get(lemma)
    if found and ok(found):
        return found
    for name, bag in RULES:
        if not ok(name):
            continue
        for word in bag:
            if " " in word and word in lemma:
                return name
    for tok in tokens(lemma):
        for stem in stems(tok):
            theme = WORD_THEME.get(stem)
            if theme and ok(theme):
                return theme
    return None


LITTLE = {"det", "pron", "prep", "conj", "num"}


def classify(item: dict) -> str:
    lemma = " ".join(str(item.get("en") or "").lower().split())
    pos = str(item.get("pos") or "")
    found = hit(lemma, pos)
    if found:
        return found
    if pos in LITTLE:
        return "Little words"
    if pos == "verb":
        return "More actions"
    if pos == "adv":
        return "Manner"
    if pos == "adj":
        return "Qualities"
    return "Everyday things"


NOT_PERSON = {
    "water", "weather", "winter", "summer", "number", "paper", "computer", "flower", "river",
    "thunder", "fever", "answer", "power", "hour", "color", "colour", "tower", "shower", "chapter",
    "corner", "finger", "shoulder", "cover", "order", "border", "member", "leather", "counter",
    "matter", "manner", "character", "disaster", "filter", "cluster", "cylinder", "barrier",
    "carrier", "folder", "sweater", "copper", "silver", "letter", "soccer", "dinner", "supper",
    "hammer", "ladder", "butter", "pepper", "drawer", "layer", "fiber", "fibre", "theatre",
    "theater", "center", "centre", "liter", "litre", "meter", "metre", "chamber", "bumper",
    "cracker", "blister", "glacier", "boulder", "partner", "hammer",
}
DEGREE = {
    "very", "really", "almost", "quite", "rather", "too", "enough", "slightly", "extremely",
    "completely", "totally", "nearly", "hardly", "barely", "just", "only", "even", "still",
    "always", "never", "often", "sometimes", "usually", "generally", "mainly", "mostly",
    "highly", "deeply", "widely", "simply", "exactly", "about", "approximately", "roughly",
    "fully", "partly", "somewhat", "overly", "sufficiently", "necessarily", "particularly",
    "especially", "absolutely", "entirely", "perfectly", "practically", "virtually", "merely",
    "fairly", "so", "such", "additionally", "adequately", "considerably", "doubly",
    "greatly", "largely", "literally", "primarily", "relatively", "remarkably", "scarcely",
    "significantly", "thoroughly", "truly", "utterly",
}
TIME_ADV = {
    "now", "then", "soon", "later", "ago", "already", "yet", "today", "yesterday", "tomorrow",
    "recently", "lately", "formerly", "previously", "currently", "suddenly", "finally",
    "eventually", "immediately", "afterwards", "afterward", "beforehand", "meanwhile", "once",
    "twice", "again", "firstly", "secondly", "thirdly", "lastly", "daily", "weekly", "early",
    "late", "tonight", "nowadays", "forever", "temporarily", "permanently", "shortly",
    "momentarily", "before", "after", "next", "ever", "anymore", "anyhow", "whenever",
    "initially", "simultaneously", "thereafter",
}
PLACE_ADV = {
    "here", "there", "away", "up", "down", "upstairs", "downstairs", "inside", "outside", "abroad",
    "ahead", "behind", "above", "below", "near", "far", "everywhere", "somewhere", "anywhere",
    "nowhere", "home", "back", "forward", "backward", "inward", "outward", "northward", "southward",
    "eastward", "westward", "skyward", "homeward", "aside", "apart", "aboard", "overboard",
    "offshore", "underground", "indoors", "outdoors", "along", "around", "through", "across",
    "over", "under", "elsewhere", "overseas", "someplace",
}
MIND_VERBS = {
    "think", "know", "believe", "understand", "remember", "forget", "decide", "consider", "expect",
    "suppose", "wonder", "realize", "realise", "recognize", "recognise", "guess", "mean", "seem",
    "hope", "wish", "want", "need", "prefer", "learn", "study", "teach", "count", "calculate",
    "imagine", "dream", "worry", "fear", "doubt", "trust", "notice", "mind", "compare", "judge",
    "assume", "prove", "solve", "choose", "plan", "intend", "recall", "remind", "confuse",
    "fascinate", "impress", "satisfy", "pretend", "ponder", "muse", "reckon", "recollect",
    "reconsider", "foresee", "predict", "estimate", "evaluate",
}
MOVE_VERBS = {
    "go", "come", "walk", "run", "jump", "swim", "fly", "drive", "ride", "climb", "fall", "rise",
    "enter", "leave", "arrive", "return", "follow", "pass", "cross", "move", "turn", "push", "pull",
    "lift", "drop", "throw", "catch", "carry", "bring", "send", "travel", "visit", "hurry", "rush",
    "escape", "chase", "reach", "wander", "crawl", "roll", "slip", "slide", "dive", "float", "sink",
    "land", "depart", "approach", "advance", "flee", "leap", "bounce", "spin", "swing", "drag",
    "flow", "spread", "stretch", "bend", "kneel", "sit", "stand", "lie", "lay", "raise", "lower",
    "open", "close", "shut", "lock", "unlock", "fill", "empty", "hang", "fold", "wrap", "pack",
    "pick", "put", "take", "get", "hold", "keep", "let",
}
MAKE_VERBS = {
    "make", "build", "create", "form", "produce", "develop", "change", "break", "fix", "repair",
    "cut", "draw", "paint", "design", "cook", "bake", "sew", "knit", "dig", "plant", "grow", "burn",
    "melt", "freeze", "mix", "stir", "boil", "fry", "clean", "wash", "destroy", "construct",
    "invent", "compose", "establish", "shape", "carve", "decorate", "mend", "assemble", "connect",
    "attach", "cover", "print", "copy", "measure", "weigh",
}
SPEAK_VERBS = {
    "say", "tell", "speak", "talk", "ask", "answer", "call", "shout", "whisper", "argue", "discuss",
    "explain", "describe", "suggest", "advise", "warn", "promise", "lie", "thank", "apologize",
    "announce", "claim", "admit", "deny", "agree", "refuse", "offer", "invite", "name", "pronounce",
    "translate", "repeat", "mention", "report", "declare", "insist", "complain", "praise", "blame",
    "greet", "introduce", "sing",
}
PEOPLE_WORDS = {
    "dad", "daddy", "mom", "mommy", "mum", "guy", "kid", "lady", "sir", "pal", "bride", "groom",
    "fool", "hero", "coward", "friend", "enemy", "stranger", "guest", "host", "baby", "adult",
}


def last_token(lemma: str) -> str:
    toks = tokens(lemma)
    return toks[-1] if toks else lemma


def looks_like_person(tok: str) -> bool:
    if tok in NOT_PERSON or tok in PEOPLE_WORDS or len(tok) < 5:
        return tok in PEOPLE_WORDS
    return tok.endswith(("ist", "ian", "eer", "woman", "man", "person"))


def finer(item: dict, theme: str) -> str:
    lemma = " ".join(str(item.get("en") or "").lower().split())
    tok = last_token(lemma)
    if theme == "Qualities":
        if tok.endswith(("able", "ible")):
            return "What can happen"
        if tok.endswith(("ful", "less")):
            return "Having and lacking"
        if tok.endswith(("ous", "ive", "ical", "ial", "ic", "al", "ary", "ory")) and len(tok) > 5:
            return "Kinds"
        return "Qualities"
    if theme == "Manner":
        if lemma in PLACE_ADV or tok in PLACE_ADV:
            return "Place words"
        if lemma in TIME_ADV or tok in TIME_ADV:
            return "When"
        if lemma in DEGREE or tok in DEGREE:
            return "Degree"
        return "How it's done"
    if theme == "More actions":
        if lemma in MIND_VERBS or tok in MIND_VERBS:
            return "Thinking"
        if lemma in SPEAK_VERBS or tok in SPEAK_VERBS:
            return "Speaking"
        if lemma in MOVE_VERBS or tok in MOVE_VERBS:
            return "Moving"
        if lemma in MAKE_VERBS or tok in MAKE_VERBS or tok.endswith(("ize", "ise", "ify")):
            return "Making and changing"
        return "Actions"
    if theme == "Everyday things":
        if lemma in PEOPLE_WORDS or looks_like_person(tok):
            return "People"
        if tok.endswith(("ness", "ity", "hood", "ship", "ism")) and len(tok) > 5:
            return "Traits"
        if tok.endswith(("tion", "sion", "ment", "ance", "ence")) and len(tok) > 5:
            return "Events"
        return "Things"
    return theme


def split_large(name: str, rows: list[dict]) -> list[tuple[str, list[dict]]]:
    """One tile per theme until it is too long, then a few plainly named parts. Never A–Z."""
    cap = 56
    if len(rows) <= cap:
        return [(name, rows)]
    parts = min(6, (len(rows) + cap - 1) // cap)
    size = (len(rows) + parts - 1) // parts
    chunks = [rows[i : i + size] for i in range(0, len(rows), size)]
    pretty = {
        "How it's done": "ways",
        "Things": "things",
        "Actions": "actions",
        "Events": "events",
        "Qualities": "qualities",
        "Kinds": "kinds",
        "Traits": "traits",
        "People": "people",
        "Ideas": "ideas",
    }.get(name, name[:1].lower() + name[1:])
    tails = [
        name,
        f"More {pretty}",
        f"Further {pretty}",
        f"Other {pretty}",
        f"Still more {pretty}",
        f"And more {pretty}",
    ]
    return [(tails[index], chunk) for index, chunk in enumerate(chunks)]


def is_extra(name: str) -> bool:
    return "extra" in name.lower()


def regroup(items: list[dict]) -> tuple[list[dict], Counter]:
    buckets: dict[str, list[tuple[int, dict]]] = defaultdict(list)
    kept: list[tuple[int, dict]] = []
    for index, item in enumerate(items):
        if is_extra(str(item.get("group") or "")):
            buckets[finer(item, classify(item))].append((index, item))
        else:
            kept.append((index, item))
    # Thin tiles are hard to use. Fold them into a neighbour unless the name is already a real lesson.
    changed = True
    while changed:
        changed = False
        for source, rows in list(buckets.items()):
            if source in KEEP_SMALL or len(rows) >= 8:
                continue
            target = PARENT.get(source)
            guard = 0
            while target and target not in buckets and guard < 6:
                target = PARENT.get(target)
                guard += 1
            if not target or target not in buckets or target == source:
                continue
            buckets[target].extend(buckets.pop(source))
            changed = True
            break
    names_in_order = [name for name in ORDER if name in buckets]
    names_in_order += sorted(set(buckets) - set(names_in_order))
    number = 80
    used_names = {str(item.get("group") or "") for _, item in kept}
    report: Counter = Counter()
    assigned: list[tuple[str, int, dict]] = []
    for theme in names_in_order:
        indexed = buckets[theme]
        rows = [item for _, item in indexed]
        index_of = {id(item): index for index, item in indexed}
        for label, chunk in split_large(theme, rows):
            title = label
            while True:
                candidate = f"{number:02d} {title}"
                number += 1
                if candidate not in used_names:
                    break
            used_names.add(candidate)
            slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-") or "topic"
            for item in chunk:
                item["group"] = candidate
                item["topic"] = slug
                report[candidate] += 1
                assigned.append((candidate, index_of[id(item)], item))
    merged_keys = [(str(item.get("group") or ""), index, item) for index, item in kept]
    merged_keys.extend(assigned)
    merged_keys.sort(key=lambda triple: (triple[0], triple[1]))
    return [item for _, _, item in merged_keys], report


def stats_from_ready() -> None:
    levels = []
    words = phrases = 0
    for level in LEVELS:
        items = json.loads((READY / f"{level.lower()}.json").read_text())
        groups = []
        for row in items:
            if row.get("kind", "word") == "word" and level != "P":
                words += 1
            else:
                phrases += 1
            if not groups or groups[-1]["name"] != row["group"]:
                groups.append({"name": row["group"], "count": 0, "sample": []})
            groups[-1]["count"] += 1
            if len(groups[-1]["sample"]) < 6:
                groups[-1]["sample"].append(row["en"])
        levels.append({
            "id": level,
            "count": len(items),
            "groups": [{"name": g["name"], "count": g["count"], "sample": " · ".join(g["sample"])} for g in groups],
        })
        print(level, len(items), "groups", len(groups))
    stats = {"words": words, "phrases": phrases, "levels": levels}
    (COURSE / "stats.json").write_text(json.dumps(stats, ensure_ascii=False, separators=(",", ":")))
    print("words", words, "phrases", phrases)


def main() -> None:
    for level in ("a1", "a2", "b1", "b2"):
        path = READY / f"{level}.json"
        items = json.loads(path.read_text())
        before = Counter(item["group"] for item in items if is_extra(item.get("group", "")))
        merged, report = regroup(items)
        leftover = [item["en"] for item in merged if item.get("topic") in {"everyday-things", "qualities", "manner", "more-actions", "little-words"}]
        print(f"\n== {level} extra groups {len(before)} -> themes {len(report)}")
        for name, count in report.most_common():
            print(f"  {count:4} {name}")
        generics = [name for name in report if any(piece in name for piece in ("Everyday", "Qualities", "Manner", "More actions", "Little words"))]
        generic_n = sum(report[name] for name in generics)
        print(f"  generic {generic_n}")
        path.write_text(json.dumps(merged, ensure_ascii=False, separators=(",", ":")))
    stats_from_ready()


if __name__ == "__main__":
    main()
