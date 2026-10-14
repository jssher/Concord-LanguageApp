#!/usr/bin/env python3
"""Write 3000 new words and 1000 new sentences/dialogues, skipping anything already in the course."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COURSE = ROOT / "public" / "course"

VOWELS = set("aeiou")


def lemma(text: str) -> str:
    return " ".join(text.strip().lower().split())


def article(word: str) -> str:
    return "an" if word[:1].lower() in VOWELS else "a"


def slug(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", lemma(text)).strip("-")


def load_seen():
    words, phrases = set(), set()
    names = ["a1.json", "a2a.json", "a2b.json", "b1a.json", "b1b.json", "b2a.json", "b2b.json", "shelf.json", "phrases.json"]
    for name in names:
        for row in json.loads((COURSE / name).read_text()):
            en = row.get("en")
            if not en:
                continue
            if row.get("kind", "word") == "word" and row.get("level") != "P" and name != "phrases.json":
                words.add(lemma(en))
            else:
                phrases.add(lemma(en))
    text = (ROOT / "src/data/concepts.ts").read_text()
    for gloss in re.findall(r'gloss:\s*"([^"]+)"', text):
        words.add(lemma(gloss))
    en = json.loads((ROOT / "src/data/lexicon/en.json").read_text())
    for entry in en.get("entries", {}).values():
        if entry.get("word"):
            words.add(lemma(entry["word"]))
    for line in en.get("lines", {}).values():
        phrases.add(lemma(line))
    return words, phrases


def words_of(blob: str):
    return [part.strip() for part in blob.replace("\n", ",").split(",") if part.strip()]


def add_words(bucket, seen, level, group, topic, pos, blob, templates):
    made = []
    for index, word in enumerate(words_of(blob)):
        key = lemma(word)
        if not key or key in seen or any(ch.isdigit() for ch in key):
            continue
        seen.add(key)
        sentence = templates[index % len(templates)].format(w=word, a=article(word))
        if key not in lemma(sentence):
            raise SystemExit(f"sentence misses {word!r}: {sentence}")
        made.append({
            "id": f"exp-{level.lower()}-{len(bucket) + len(made) + 1:04d}",
            "level": level,
            "group": group,
            "topic": topic,
            "kind": "word",
            "pos": pos,
            "en": word,
            "sentence": sentence,
            "image": slug(word),
        })
    bucket.extend(made)
    return len(made)


def main():
    seen, seen_phrases = load_seen()
    words = []
    count = lambda level, group, topic, pos, blob, templates: add_words(words, seen, level, group, topic, pos, blob, templates)

    # --- A1 concrete ---
    count("A1", "50 Market produce", "food", "noun", """
      kiwi, apricot, pomegranate, grapefruit, lime, blueberry, blackberry, cranberry, watermelon, cantaloupe,
      tangerine, clementine, persimmon, lychee, guava, avocado, radish, turnip, beet, parsnip, celery, zucchini,
      cauliflower, asparagus, artichoke, kale, arugula, scallion, shallot, chive, dill, parsley, cilantro, basil,
      thyme, rosemary, oregano, cumin, paprika, turmeric, cinnamon, nutmeg, ginger, chili, lentil, chickpea,
      sesame, almond, walnut, peanut, cashew, hazelnut, pistachio, raisin, prune, fig, jicama, kohlrabi, daikon,
      endive, radicchio, plantain, okra, yam, edamame, bok choy, leek
    """, [
      "I bought {a} {w} at the market.",
      "The {w} is fresh today.",
      "Please wash the {w}.",
      "We eat {w} at home.",
    ])
    count("A1", "51 Kitchen tools", "food", "noun", """
      whisk, colander, spatula, ladle, peeler, zester, corkscrew, saucepan, skillet, wok, kettle,
      grater, sieve, mortar, pestle, trivet, teapot, coaster, napkin, placemat, tray, pitcher, tumbler,
      mug, saucer, teaspoon, tablespoon, chopstick, apron, oven mitt, dishcloth, sponge, drainer, funnel,
      timer, scale, blender, toaster, mixer
    """, [
      "Please hand me the {w}.",
      "I washed the {w} after dinner.",
      "The {w} lives in the kitchen drawer.",
      "We keep the {w} by the stove.",
    ])
    count("A1", "52 Around the house", "home", "noun", """
      duvet, pillowcase, bedsheet, mattress, headboard, nightstand, bookshelf, rug, curtain, blinds, hanger,
      hamper, ironing board, clothesline, peg, doorbell, peephole, doormat, welcome mat, porch, staircase,
      railing, landing, attic, basement, cupboard, drawer, shelf, hook, switch, socket, plug, bulb, candle,
      matchbox, flashlight, battery, remote, cushion, throw, vase, frame, mirror, clock, calendar, bin,
      recycling bin, dustpan, broom, mop, bucket, sponge, soap, towel, toothbrush, toothpaste, comb, hairbrush,
      shampoo, razor, tissue, laundry basket
    """, [
      "The {w} is in the house.",
      "Please put the {w} away.",
      "We need a new {w}.",
      "I can see the {w} from here.",
    ])
    count("A1", "53 Clothes detail", "clothes", "noun", """
      zipper, button, collar, cuff, sleeve, pocket, hem, seam, lining, hood, belt, buckle, lace, sole, heel,
      sandal, slipper, sneaker, boot, scarf, glove, mitten, beanie, cap, brim, swimsuit, robe, vest,
      cardigan, sweater, hoodie, belt loop, scarf pin, bracelet, necklace, earring, ring,
      umbrella, backpack, purse, wallet, suitcase
    """, [
      "I like this {w}.",
      "I need this {w} today.",
      "Where is my {w}?",
      "She bought this {w} yesterday.",
    ])
    count("A1", "54 Small actions", "actions", "verb", """
      rinse, chop, peel, slice, stir, boil, roast, steam, mash, bake, fold, wipe, sweep, dust,
      hang, push, pull, lift, drop, catch, throw, share, choose, count, spell, draw, color, cut, glue
    """, [
      "Please {w} it now.",
      "I will {w} it after lunch.",
      "Can you {w} this for me?",
      "We can {w} it together.",
    ])
    count("A1", "55 Outdoors", "nature", "noun", """
      puddle, sidewalk, crosswalk, curb, driveway, fence, gate, lawn, hedge, flowerbed, garden hose, watering can,
      seed, sprout, branch, twig, bark, root, acorn, pinecone, pebble, shell, wave, shore, sand, picnic blanket,
      bench, playground, swing, slide, seesaw, path, trail, bridge, pond, duck, goose, squirrel, butterfly,
      bee, ant, spider, worm, snail, frog, turtle
    """, [
      "Look at the {w}.",
      "We saw the {w} outside.",
      "The children like the {w}.",
      "The {w} is easy to see from here.",
    ])
    count("A1", "56 Materials", "describing", "noun", """
      wood, metal, plastic, glass, paper, cloth, cotton, wool, silk, leather, rubber, stone, clay, sand,
      cardboard, foil, string, rope, tape, glue, paint, chalk, ink, crayon
    """, [
      "This is made of {w}.",
      "We need more {w}.",
      "The {w} feels smooth.",
      "I can see the {w} from here.",
    ])
    count("A1", "57 Everyday describing", "describing", "adjective", """
      soft, hard, smooth, rough, heavy, light, loud, quiet, sweet, sour, salty, spicy, fresh, stale, ripe,
      raw, cooked, dirty, clean, wet, dry, full, empty, early, late, fast, slow, easy, ready, busy,
      careful, messy, tidy, warm, cool, bright, dark, kind, polite
    """, [
      "This one is {w}.",
      "I want the {w} one.",
      "It looks {w}.",
      "Today it is {w}.",
    ])

    # --- A2 ---
    count("A2", "18 Meals out", "food", "noun", """
      appetizer, entree, side dish, garnish, condiment, vinaigrette, crouton, broth, noodle, dumpling, sushi,
      risotto, gnocchi, ravioli, lasagna, paella, falafel, hummus, pita, tortilla, salsa, guacamole, taco,
      burrito, curry, naan, samosa, kimchi, miso, tofu, tempeh, sauerkraut, pretzel, bagel, croissant, muffin,
      scone, waffle, pancake, syrup, granola, oatmeal, yogurt, smoothie, milkshake, lemonade, herbal tea,
      espresso, latte, cappuccino, refill, takeaway, doggy bag, high chair, booster seat
    """, [
      "I ordered the {w}.",
      "The {w} was very good.",
      "The menu lists the {w}.",
      "We tried the {w} last night.",
    ])
    count("A2", "19 Errands", "town", "noun", """
      laundromat, dry cleaner, locksmith, cobbler, tailor, optician, dentist, clinic, pharmacy counter,
      post office box, parcel, postage, envelope, stamp booklet, form, signature, photocopy, printout,
      appointment card, waiting room, ticket machine, turnstile, platform screen, departure board, arrival board,
      lost property, information desk, cloakroom, locker, combination, receipt, barcode, refund desk, fitting room,
      checkout, basket, trolley, aisle, shelf label, price tag, loyalty card, cashback, ATM, PIN, coin, banknote
    """, [
      "Please keep the {w}.",
      "I asked about the {w}.",
      "The {w} is in my bag.",
      "Where did I put the {w}?",
    ])
    count("A2", "20 Home repairs", "home", "noun", """
      screwdriver, hammer, pliers, wrench, drill, screw, nail, bolt, nut, washer, hinge, latch, padlock,
      sandpaper, paintbrush, roller, tray, stepladder, tape measure, level, plunger, washer hose, fuse, bulb,
      extension cord, adapter, hook, bracket, curtain rod, shelf bracket, wall plug, rawl plug, spackle,
      sandpaper block, dustpan brush, mop bucket, clothes peg, iron, starch, lint, stain, bleach
    """, [
      "The {w} is in the toolbox.",
      "We need the {w} for this job.",
      "Please pass the {w}.",
      "I bought the {w} at the hardware shop.",
    ])
    count("A2", "21 Health visit", "health", "noun", """
      symptom, thermometer, bandage, plaster, ointment, antiseptic, tablet, capsule, syrup, dosage, pharmacy,
      prescription, allergy, asthma, inhaler, crutch, sling, ice pack, heat pack, blister, bruise, sprain,
      cough, sneeze, fever, rash, itch, dizziness, nausea, appetite, rest, check-up, vaccination, waiting list,
      referral, nurse, dentist, filling, toothbrush, floss, mouthwash
    """, [
      "The {w} helped me feel better.",
      "Please bring the {w}.",
      "I asked about the {w}.",
      "The nurse explained the {w}.",
    ])
    count("A2", "22 Free time", "hobbies", "noun", """
      hobby, sketch, watercolor, canvas, easel, clay, pottery, kiln, yarn, knitting needle, crochet hook,
      puzzle, board game, dice, checker, chessboard, pawn, kite, frisbee, jump rope, skateboard, roller skate,
      helmet, knee pad, bicycle pump, helmet strap, campsite, tent peg, sleeping bag, flashlight, camp stove,
      trail map, binoculars, notebook, journal, sticker, scrapbook, camera, tripod, album
    """, [
      "We brought the {w} with us.",
      "The {w} is in the cupboard.",
      "I learned to use the {w}.",
      "Please don't forget the {w}.",
    ])
    count("A2", "23 Music and sport", "hobbies", "noun", """
      flute, clarinet, trumpet, trombone, drum, violin, cello, guitar, piano, keyboard, microphone, speaker,
      headphone, playlist, chorus, verse, rhythm, melody, rehearsal, concert hall, ticket stub, jersey, whistle,
      goalpost, net, racket, shuttlecock, goggles, lane, stopwatch, scoreboard, referee, teammate, captain,
      practice, warmup, stretch, water bottle, towel
    """, [
      "The {w} is part of practice.",
      "Please bring the {w}.",
      "We need the {w} for the game.",
      "The coach brought the {w}.",
    ])
    count("A2", "24 Travel words", "travel", "noun", """
      itinerary, booking, confirmation, e-ticket, boarding pass, aisle seat, window seat, overhead bin,
      seat belt, tray table, layover, connection, gate, boarding time, delay, announcement, carousel, customs form,
      declaration, suitcase tag, neck pillow, adapter plug, guidebook, phrasebook, city map, day pass, metro card,
      rideshare, pickup point, drop-off, fare, tip jar, hostel, bunk, dorm, front desk, wake-up call, checkout time,
      late checkout, room key, safe, minibar
    """, [
      "Please check the {w}.",
      "The {w} is in my bag.",
      "We asked about the {w}.",
      "I kept the {w} in my pocket.",
    ])
    count("A2", "25 Useful verbs", "actions", "verb", """
      pack, unpack, reserve, confirm, cancel, postpone, transfer, exchange, wrap, unwrap,
      charge, recharge, download, upload, print, scan, copy, sign, underline, highlight,
      repeat, explain, describe, compare, recommend, remind, suggest, accept, decline,
      request, deliver
    """, [
      "Please {w} it today.",
      "I need to {w} this.",
      "Can you {w} it for me?",
      "We should {w} it before evening.",
    ])
    count("A2", "26 Manners", "describing", "adjective", """
      helpful, patient, generous, honest, funny, serious, nervous, calm, proud, embarrassed, surprised,
      disappointed, excited, bored, interested, worried, confident, shy, friendly, lonely, grateful,
      sure, unsure
    """, [
      "She was {w}.",
      "He was {w} too.",
      "They were {w}.",
      "Everyone there was {w}.",
    ])

    # --- B1 ---
    count("B1", "18 Study skills", "education", "noun", """
      outline, draft, revision, citation, source, quotation, paraphrase, summary, abstract, footnote, bibliography,
      appendix, glossary, index, heading, subheading, paragraph, topic sentence, transition, example, evidence,
      counterexample, chart, graph, axis, caption, slide, handout, worksheet, rubric, deadline extension,
      office hour, tutorial, peer review, feedback, plagiarism, quotation mark, brainstorm, mind map, flashcard,
      mnemonic, highlight, margin, annotation
    """, [
      "Add the {w} before you submit the paper.",
      "The {w} makes the argument easier to follow.",
      "We discussed the {w} in the seminar.",
      "Please check the {w}.",
    ])
    count("B1", "19 At work", "work", "noun", """
      agenda, minutes, action item, follow-up, deadline, milestone, stakeholder, briefing, handover, roster,
      shift, timesheet, invoice, estimate, quote, purchase order, inventory, stockroom, supplier, shipment,
      warehouse, loading dock, forklift, pallet, barcode scanner, safety vest, hard hat, fire drill, first-aid kit,
      incident report, suggestion box, noticeboard, break room, coworking space, hot desk, headset, mute button,
      screen share, attachment, filename, folder, backup, password manager
    """, [
      "The {w} is on the shared drive.",
      "Please update the {w} after the meeting.",
      "We reviewed the {w} this morning.",
      "Ask the team about the {w}.",
    ])
    count("B1", "20 Civic life", "society", "noun", """
      resident, tenant, landlord, lease, deposit, utility bill, meter reading, recycling point, compost, bulky waste,
      neighborhood watch, community center, notice, petition, volunteer shift, donation, food bank, shelter,
      crosswalk signal, speed bump, bike lane, bus lane, parking permit, visitor permit, noise complaint,
      maintenance request, elevator inspection, smoke alarm, fire escape, assembly point, first aider, lost pet,
      bulletin, newsletter, town hall, polling place, ballot, voter registration
    """, [
      "The {w} is explained in the notice.",
      "Residents asked about the {w}.",
      "Please bring the {w} to the meeting.",
      "The {w} helps the neighborhood.",
    ])
    count("B1", "21 Body and care", "health", "noun", """
      wrist, ankle, elbow, shoulder, hip, knee, thigh, calf, heel, arch, palm, knuckle, fingernail, thumbnail,
      eyebrow, eyelash, nostril, jaw, chin, cheek, forehead, temple, spine, rib, lung, kidney, liver, stomach lining,
      pulse, blood pressure, hydration, posture, eyesight, hearing test, filling, crown, retainer, night guard,
      sunscreen, moisturizer, blister plaster, compression sock, heating pad
    """, [
      "The nurse checked my {w}.",
      "Rest is good for the {w}.",
      "I described the pain in my {w}.",
      "This exercise supports the {w}.",
    ])
    count("B1", "22 Media", "media", "noun", """
      headline, byline, caption, column, editorial, op-ed, interview, podcast, episode, host, guest, listener,
      subscriber, comment section, fact check, source link, archive, timestamp, livestream, replay, clip, subtitle,
      captioning, voiceover, soundtrack, trailer, spoiler, review, rating, box office, paperback, hardcover,
      dust jacket, bookmark, reading list, book club, author talk
    """, [
      "The {w} changed how I read the story.",
      "We mentioned the {w} in class.",
      "Please read the {w} first.",
      "The {w} is available online.",
    ])
    count("B1", "23 Nature detail", "nature", "noun", """
      estuary, delta, glacier, tundra, savanna, canopy, understory, lichen, fern, algae, plankton, coral, reef,
      dune, oasis, geyser, crater, sediment, silt, clay, loam, boulder, pebble, tributary, watershed, marsh,
      swamp, lagoon, peninsula, isthmus, plateau, canyon, ravine, ridge, summit, meadow, orchard, vineyard,
      apiary, beehive, compost heap, rain barrel, birdhouse, feeder
    """, [
      "The guide pointed out the {w}.",
      "The {w} shapes this landscape.",
      "We learned how the {w} forms.",
      "The {w} is protected here.",
    ])
    count("B1", "24 Clear verbs", "actions", "verb", """
      clarify, summarize, outline, revise, cite, quote, paraphrase, proofread, format, submit, attach, schedule,
      reschedule, confirm, delegate, prioritize, resolve, recycle, reduce, reuse, install, replace, repair,
      maintain, inspect, report, document, acknowledge, approve, reject, postpone
    """, [
      "Please {w} it before Friday.",
      "We should {w} the plan.",
      "I will {w} the details.",
      "Can the team {w} this today?",
    ])
    count("B1", "25 Balanced words", "describing", "adjective", """
      accurate, approximate, detailed, brief, formal, informal, optional, required, flexible, strict, fair,
      unfair, efficient, wasteful, sustainable, disposable, reusable, renewable, affordable, expensive, reasonable,
      excessive, moderate, significant, minor, major, temporary, permanent, mutual, one-sided, practical,
      theoretical, relevant, irrelevant, credible, doubtful, transparent, confidential, urgent, routine
    """, [
      "The result is {w}.",
      "The approach is {w}.",
      "That detail is {w}.",
      "The policy is {w}.",
    ])
    count("B1", "26 Money talk", "money", "noun", """
      budget, expense, income, savings, interest, fee, penalty, refund, installment, down payment, balance,
      statement, transfer, direct debit, standing order, overdraft, currency, exchange rate, receipt book,
      expense report, reimbursement, per diem, scholarship, grant, tuition, stipend, donation receipt, tax return,
      deduction, allowance, invoice number, due date, late fee, payment plan
    """, [
      "Check the {w} before you pay.",
      "The {w} is listed on the statement.",
      "We agreed on the {w}.",
      "Ask the office about the {w}.",
    ])
    count("B1", "27 Food craft", "food", "noun", """
      marinade, brine, stock, roux, batter, dough, yeast, starter, glaze, reduction, emulsion, zest, pith,
      fillet, mince, skewer, griddle, steamer, Dutch oven, ramekin, mandoline, pastry brush, cooling rack,
      parchment, cling film, airtight container, leftover, portion, serving, garnish, palate, texture, aroma,
      umami, ferment, pickle, preserve, chutney, relish
    """, [
      "The recipe starts with the {w}.",
      "Taste the {w} before you serve it.",
      "The {w} changes the texture.",
      "Leave the {w} to rest.",
    ])

    # --- B2 ---
    count("B2", "18 Academic writing", "study", "noun", """
      thesis, hypothesis, premise, caveat, limitation, implication, correlation, causation, variable, control group,
      sample size, outlier, margin of error, confidence interval, literature review, methodology, replication,
      peer review, conflict of interest, disclosure, appendix, dataset, codebook, rubric, criterion, benchmark,
      abstract, keyword, citation style, plagiarism check, revision memo, counterargument, concession, rebuttal,
      qualifier, hedge, stance, scope, framework, construct
    """, [
      "State the {w} before the results.",
      "The {w} limits what we can claim.",
      "Reviewers asked about the {w}.",
      "Define the {w} in the introduction.",
    ])
    count("B2", "19 Lab and science", "science", "noun", """
      beaker, flask, pipette, petri dish, agar, centrifuge, microscope, slide, coverslip, specimen, solvent,
      solute, solution, catalyst, isotope, ion, neutron, proton, electron, molecule, compound, reaction, yield,
      enzyme, substrate, cell membrane, nucleus, mitochondrion, ribosome, chromosome, allele, genotype, phenotype,
      mutation, protein, hormone, neuron, synapse, stimulus, placebo, dosage, trial
    """, [
      "The lab notes describe the {w}.",
      "Measure the {w} carefully.",
      "The {w} affects the result.",
      "Label the {w} before you store it.",
    ])
    count("B2", "20 Law and agreements", "law", "noun", """
      clause, waiver, amendment, addendum, affidavit, deposition, subpoena, plaintiff, defendant, injunction,
      statute, ordinance, precedent, liability, negligence, damages, settlement, arbitration, mediation, notary,
      witness, testimony, verdict, appeal, bail, parole, probation, easement, lien, escrow, leasehold, trademark,
      patent, copyright notice, confidentiality, non-disclosure, indemnity, termination, renewal, notice period
    """, [
      "Read the {w} before you sign.",
      "The {w} protects both sides.",
      "Counsel explained the {w}.",
      "The agreement includes the {w}.",
    ])
    count("B2", "21 Economy", "economy", "noun", """
      incentive, subsidy, tariff, quota, surplus, shortage, inflation, deflation, purchasing power, wage, salary band,
      payroll, overhead, revenue, profit margin, loss, dividend, equity, bond, yield, portfolio, diversification,
      liquidity, collateral, credit score, interest rate, principal, installment, default, bankruptcy, audit,
      compliance, regulator, monopoly, competition, supply chain, bottleneck, forecast, scenario, baseline
    """, [
      "The report explains the {w}.",
      "A change in the {w} affects prices.",
      "Investors watched the {w}.",
      "The {w} is in the appendix.",
    ])
    count("B2", "22 Mind and behavior", "mind", "noun", """
      attention span, working memory, habit loop, cue, routine, reward, bias, assumption, inference, intuition,
      reflection, impulse, restraint, motivation, grit, burnout, recovery, boundary, feedback loop, self-talk,
      mindset, reframe, perspective, empathy, compassion, resentment, gratitude, awe, curiosity, doubt, certainty,
      nuance, ambiguity, tradeoff, priority, constraint, incentive, commitment, accountability
    """, [
      "The chapter discusses the {w}.",
      "Notice the {w} before you decide.",
      "The {w} can change the outcome.",
      "We named the {w} in the discussion.",
    ])
    count("B2", "23 Arts practice", "arts", "noun", """
      composition, palette, pigment, glaze, underpainting, brushstroke, perspective, vanishing point, proportion,
      contrast, texture, negative space, motif, variation, improvisation, tempo, dynamics, timbre, harmony, dissonance,
      chord, scale, notation, rehearsal mark, cue, staging, blocking, prop, backdrop, spotlight, intermission,
      encore, critique, portfolio, artist statement, medium, installation, caption, patronage
    """, [
      "The {w} guides the piece.",
      "She adjusted the {w}.",
      "Critics mentioned the {w}.",
      "Practice the {w} slowly.",
    ])
    count("B2", "24 Public issues", "society", "noun", """
      stakeholder map, consultation, hearing, briefing paper, position paper, recommendation, implementation,
      pilot, evaluation, indicator, baseline, target, disparity, access, barrier, outreach, uptake, safeguard,
      grievance, appeal process, transparency, accountability, oversight, audit trail, disclosure, privacy,
      consent, data retention, anonymization, bias audit, public comment, minority report, sunset clause
    """, [
      "The proposal includes the {w}.",
      "Publish the {w} with the decision.",
      "Residents asked for a clear {w}.",
      "The {w} should be easy to find.",
    ])
    count("B2", "25 Precise verbs", "actions", "verb", """
      infer, imply, assert, concede, qualify, refute, corroborate, synthesize, contextualize,
      disclose, redact, audit, forecast, undermine, reinforce, articulate, substantiate, illustrate, scrutinize
    """, [
      "The author tries to {w} the claim.",
      "We need to {w} the evidence.",
      "Please {w} the point in one sentence.",
      "A careful reader will {w} the result.",
    ])
    count("B2", "26 Precise adjectives", "describing", "adjective", """
      tentative, explicit, implicit, robust, fragile, provisional, conclusive, anecdotal, empirical, theoretical,
      qualitative, quantitative, longitudinal, cross-sectional, representative, skewed, negligible, substantial,
      incremental, systemic, structural, procedural, substantive, rhetorical, literal, figurative, ambiguous,
      precise, verbose, concise, coherent, inconsistent, nuanced, pragmatic, idealistic, cautious, bold,
      equitable, extractive, regenerative
    """, [
      "The finding is {w}.",
      "The example is {w}.",
      "That wording is {w}.",
      "The design is {w}.",
    ])
    count("B2", "27 Environment science", "environment", "noun", """
      biodiversity, habitat loss, invasive species, keystone species, pollinator, watershed, runoff, aquifer,
      groundwater, desalination, reforestation, peatland, wetland restoration, carbon sink, emission factor,
      life-cycle assessment, embodied energy, circular economy, repairability, e-waste, microfiber, particulate,
      air quality index, heat island, green roof, permeable pavement, bioswale, composting toilet, greywater,
      rainwater harvesting, seed bank, corridor, buffer zone, carrying capacity, tipping point, adaptation,
      mitigation, resilience, vulnerability, exposure
    """, [
      "The plan measures the {w}.",
      "Local projects focus on the {w}.",
      "The {w} reduces long-term risk.",
      "The report defines the {w}.",
    ])
    count("B2", "28 Professional tools", "technology", "noun", """
      version control, commit message, branch, merge conflict, code review, ticket, backlog, sprint, standup,
      retrospective, user story, acceptance criterion, wireframe, prototype, usability test, heuristic, persona,
      journey map, funnel, conversion, retention, churn, dashboard, metric, alert, incident, postmortem, runbook,
      failover, redundancy, encryption key, access log, permission, role, sandbox, staging, production, rollback
    """, [
      "Document the {w} for the next person.",
      "The team reviewed the {w}.",
      "Check the {w} before release.",
      "A clear {w} saves time.",
    ])

    # Extra banks used only if a level is still short. Real words, same sentence rules.
    extras = []
    count_extra = lambda level, group, topic, pos, blob, templates: extras.append((level, group, topic, pos, blob, templates))
    count_extra("A1", "58 More objects", "home", "noun", """
      coaster, doily, trivet, canister, scoop, tongs, lid, stopper, strainer, juicer, garlic press, salad spinner,
      dish rack, drying mat, pot holder, tea towel, tablecloth, runner, centerpiece, candlestick, match, wick,
      lampshade, night light, alarm clock, wall clock, hook rail, shoe rack, umbrella stand, key bowl, mail tray,
      notice board, magnet, clip, rubber band, paper clip, stapler, hole punch, eraser, sharpener, ruler, protractor,
      compass, sticker, label, envelope, postcard, stamp, pen cap, pencil case
    """, [
      "The {w} is on the table.",
      "Please pass the {w}.",
      "I put the {w} in the box.",
      "We have the {w} at home.",
    ])
    count_extra("A1", "59 Animals and plants", "nature", "noun", """
      sparrow, robin, pigeon, seagull, owl, swan, pelican, penguin, parrot, goldfish, hamster, guinea pig, rabbit,
      kitten, puppy, foal, calf, lamb, kid, chick, duckling, tadpole, caterpillar, cocoon, ladybug, dragonfly,
      grasshopper, cricket, moth, beetle, ivy, moss, clover, dandelion, daisy, tulip, rose, sunflower, cactus,
      fern, seaweed, mushroom, pine, oak, maple, birch, willow, palm
    """, [
      "We saw the {w} in the park.",
      "The {w} is small and easy to spot.",
      "A child can name the {w}.",
      "Look at the {w}.",
    ])
    count_extra("A2", "27 City services", "town", "noun", """
      crosswalk button, pedestrian signal, bike share, docking station, tram stop, ferry terminal, taxi stand,
      carriage, conductor, inspector, lost-and-found, baggage claim, oversized bag,
      stroller, wheelchair ramp, elevator, escalator, mezzanine, concourse, kiosk, newsstand, flower stall,
      bakery counter, butcher, fishmonger, greengrocer, deli, checkout belt, bagging area, bottle return,
      recycling slot, water fountain, bench, shelter, timetable, night bus, last train
    """, [
      "Look for the {w}.",
      "The {w} is just ahead.",
      "We used the {w} today.",
      "The sign points to the {w}.",
    ])
    count_extra("A2", "28 Social words", "feelings", "noun", """
      invitation, RSVP, host, guest list, potluck, playlist, name tag, icebreaker, toast, speech, gift wrap,
      thank-you note, greeting card, bouquet, candle, balloon, confetti, party hat, favor, seating plan,
      plus one, dietary note, allergy card, shared ride, meeting point, rain plan, group photo, caption,
      memory, tradition
    """, [
      "The {w} made the evening easier.",
      "Please add the {w}.",
      "We forgot the {w}.",
      "The {w} is a nice touch.",
    ])
    count_extra("B1", "28 Learning verbs", "education", "verb", """
      skim, scan, annotate, highlight, summarize, restate, expand, condense, reorder, classify, label, define,
      illustrate, demonstrate, practice, rehearse, memorize, review, self-test, teach back, discuss, debate,
      role-play, simulate, observe, record, transcribe, translate, interpret, adapt, simplify, elaborate
    """, [
      "Please {w} the passage.",
      "Learners {w} the idea in pairs.",
      "I will {w} it tonight.",
      "The task is to {w} the text.",
    ])
    count_extra("B1", "29 Community nouns", "society", "noun", """
      mutual aid, tool library, seed swap, repair cafe, community fridge, time bank, skill share, noticeboard,
      block party, street tree, curb cut, bench plaque, little library, book swap, coat drive, school supply drive,
      blood drive, first-aid course, night class, language exchange, conversation table, mentor, mentee,
      reference, portfolio piece, certificate, attendance, makeup class, syllabus change, reading week
    """, [
      "We talked about the {w}.",
      "The notice mentions the {w}.",
      "Please bring the {w}.",
      "People asked about the {w}.",
    ])
    count_extra("B2", "29 Argument words", "study", "noun", """
      claim, warrant, backing, rebuttal, qualifier, counterclaim, assumption, stipulation, distinction, analogy,
      counterexample, exception, edge case, scope condition, operational definition, proxy, indicator, threshold,
      baseline comparison, sensitivity analysis, robustness check, alternative explanation, confound, covariate,
      mechanism, pathway, feedback, lag, spillover, generalizability
    """, [
      "Name the {w} explicitly.",
      "The {w} belongs in the paper.",
      "A reviewer asked about the {w}.",
      "We added the {w} after review.",
    ])
    count_extra("B2", "30 Craft and making", "arts", "noun", """
      template, jig, clamp, vise, chisel, mallet, plane, rasp, file, awl, brad, dowel, veneer, inlay, joinery,
      mortise, tenon, rabbet, kerf, grain, warp, finish, sealant, primer, undercoat, topcoat, patina, solder,
      flux, seam, rivet, grommet, pattern piece, notch, dart, pleat, gathering, bias tape, interfacing
    """, [
      "Mark the {w} before you cut.",
      "The {w} keeps the piece steady.",
      "A clean {w} makes the next step easier.",
      "Choose the {w} that matches the material.",
    ])

    by_level = {}
    for row in words:
        by_level.setdefault(row["level"], []).append(row)
    quotas = {"A1": 500, "A2": 700, "B1": 900, "B2": 900}
    for level, group, topic, pos, blob, templates in extras:
        have = len(by_level.get(level, []))
        if have >= quotas[level]:
            continue
        need = quotas[level] - have
        before = len(words)
        count(level, group, topic, pos, blob, templates)
        added = words[before:]
        if len(added) > need:
            # keep only what this level still needs; release the rest back to seen so later banks can use them
            for row in added[need:]:
                seen.discard(lemma(row["en"]))
            del words[before + need :]
        by_level[level] = [row for row in words if row["level"] == level]

    # If still short, pull the specialist banks.
    short = sum(quotas.values()) - len(words)
    if short > 0:
        from wordbank import BANKS
        for level, group, topic, pos, blob, templates in BANKS:
            if len([row for row in words if row["level"] == level]) >= quotas[level]:
                continue
            before = len(words)
            count(level, group, topic, pos, blob, templates)
            need = quotas[level] - (len([row for row in words[:before] if row["level"] == level]))
            added = words[before:]
            if len(added) > need:
                for row in added[need:]:
                    seen.discard(lemma(row["en"]))
                del words[before + need :]
        short = sum(quotas.values()) - len(words)
    if short > 0:
        from collections import Counter
        raise SystemExit(f"only {len(words)} new words, short by {short} {Counter(row['level'] for row in words)}")

    # Trim overflow, preferring to keep earlier groups.
    chosen = []
    taken = {level: 0 for level in quotas}
    for row in words:
        if taken[row["level"]] >= quotas[row["level"]]:
            continue
        taken[row["level"]] += 1
        chosen.append(row)
    if len(chosen) != 3000:
        raise SystemExit(f"expected 3000 words, got {len(chosen)} {taken}")

    for index, row in enumerate(chosen, start=1):
        row["id"] = f"exp-{index:04d}"

    from collections import defaultdict
    grouped = defaultdict(list)
    for row in chosen:
        grouped[(row["level"], row["group"])].append(row)
    fold_names = {}
    for (level, group), rows in grouped.items():
        if len(rows) >= 8 and len(rows) > len(grouped.get((level, fold_names.get(level, "")), [])):
            fold_names[level] = group
    for (level, group), rows in grouped.items():
        if len(rows) < 8 and level in fold_names:
            for row in rows:
                row["group"] = fold_names[level]
    adjectives = {
        "commutative", "associative", "distributive", "dominant", "recessive",
        "analytic", "synthetic", "benign", "malignant",
    }
    for row in chosen:
        if lemma(row["en"]) in adjectives:
            row["pos"] = "adjective"
            row["sentence"] = f"The example is {row['en']}."

    phrases = []

    def add_phrase(group, kind, text):
        key = lemma(text)
        if key in seen_phrases:
            return False
        seen_phrases.add(key)
        phrases.append({
            "id": f"dlg-{len(phrases) + 1:04d}",
            "level": "P",
            "group": group,
            "topic": "phrases",
            "kind": kind,
            "pos": "phrase",
            "en": text.rstrip("."),
            "sentence": text if text.endswith((".", "?", "!")) else text + ".",
            "image": "talk",
        })
        return True

    a1_places = ["bakery", "library", "pharmacy", "playground", "elevator", "ticket office", "bus stop", "fitting room", "lost and found", "information desk", "restroom", "exit", "parking lot", "cloakroom", "taxi stand"]
    a1_items = ["umbrella", "charger", "water bottle", "map", "receipt", "jacket", "notebook", "phone", "hat", "lunchbox", "keys", "glasses", "scarf", "ticket", "bag"]
    a1_food = ["soup", "bread", "rice", "apple", "tea", "milk", "salad", "cheese", "egg", "fish"]
    for place in a1_places:
        add_phrase("50 A1 Useful sentences", "phrase", f"Excuse me, where is the {place}?")
        add_phrase("50 A1 Useful sentences", "phrase", f"Is the {place} far from here?")
    for item in a1_items:
        add_phrase("50 A1 Useful sentences", "phrase", f"I think I left my {item} here.")
        add_phrase("50 A1 Useful sentences", "phrase", f"Could you look after my {item} for a moment?")
    for food in a1_food:
        add_phrase("50 A1 Useful sentences", "phrase", f"I would like some {food}, please.")
        add_phrase("50 A1 Useful sentences", "phrase", f"The {food} is very good.")
    for line in [
        "Could you say that more slowly, please?",
        "Could you write that down for me?",
        "How do you spell your name?",
        "I don't understand this word.",
        "What does this word mean?",
        "Can I pay by card?",
        "Can I pay in cash?",
        "That's all, thank you.",
        "I'm just looking, thank you.",
        "I'll be right back.",
        "See you tomorrow morning.",
        "Have a good evening.",
        "The same for me, please.",
        "Not too spicy, please.",
        "No sugar, please.",
        "With ice, please.",
        "Without ice, please.",
        "A table by the window, please.",
        "This seat is free.",
        "Is this seat taken?",
        "After you.",
        "Excuse me, I need to get past.",
        "Bless you.",
        "No, thank you. I'm fine.",
        "Yes, please. That would help.",
        "My name is on the list.",
        "I have an appointment at three.",
        "I'm a little early.",
        "I'm sorry I'm late.",
        "The train leaves in ten minutes.",
        "Which way is the center?",
        "Please speak a little louder.",
        "I speak a little English.",
        "I am still learning.",
        "That was very kind of you.",
        "I can come back later.",
        "Today is fine for me.",
        "Tomorrow is better for me.",
        "I live near the school.",
        "I work near the station.",
    ]:
        add_phrase("50 A1 Useful sentences", "phrase", line)

    a2_lines = [
        "I'd like to change my reservation to Friday.",
        "Is it possible to sit somewhere quieter?",
        "Could you recommend something mild?",
        "I'm allergic to nuts.",
        "Does this dish contain dairy?",
        "Could we split the bill?",
        "Could we have the bill, please?",
        "I think there's a mistake on the bill.",
        "I'd like to return this. I have the receipt.",
        "Do you have this in a larger size?",
        "I'll think about it and come back.",
        "What time do you close today?",
        "Is there a discount for students?",
        "Could you call a taxi for me?",
        "How long is the wait?",
        "I'll wait if it isn't long.",
        "Could you keep my bag while I look?",
        "The connection is only five minutes. Is that enough?",
        "Is the flight still on time?",
        "Where do I collect my luggage?",
        "I need a wake-up call at seven.",
        "The shower isn't working.",
        "Could someone look at the heating?",
        "Is breakfast included?",
        "I'd like a late checkout if possible.",
        "Can I leave my luggage after checkout?",
        "I'm here to see Dr. Patel.",
        "I have had this cough since Monday.",
        "It hurts when I swallow.",
        "I'm not taking any medicine.",
        "How often should I take this?",
        "Should I take it with food?",
        "I need to renew this prescription.",
        "The package did not arrive.",
        "I was out when the driver came.",
        "Could you leave it at the front desk?",
        "I would like to open a savings account.",
        "Here is my identification.",
        "Where do I sign?",
        "Can you explain the fee?",
        "I would like a window seat if you have one.",
        "Is this seat reserved?",
        "Could you tell me when we reach the center?",
        "Does this bus stop at the museum?",
        "I need to buy a day pass.",
        "The machine didn't return my card.",
        "Could I speak to the manager, please?",
        "I don't want to make a complaint. I just need help.",
        "Thank you for sorting that out.",
        "I'll send the details by email.",
        "Could we move the meeting to the afternoon?",
        "I can do Tuesday or Wednesday.",
        "Thursday is difficult for me.",
        "Let's confirm the time by text.",
        "I'll be about ten minutes late.",
        "Please start without me.",
        "Could you send me the notes afterwards?",
        "I have a question about the homework.",
        "Which chapter should I read?",
        "May I have an extra day for the essay?",
        "I finished the first draft.",
        "Could you look at my introduction?",
        "I joined the class last week.",
        "Where can I find the recording?",
        "The link in the email doesn't open.",
        "I can share my screen.",
        "You're on mute.",
        "Could you say the last point again?",
        "I'll put that in the chat.",
        "Let's take a short break.",
        "We can finish the rest tomorrow.",
        "I liked your suggestion.",
        "I see it a little differently.",
        "Can we look at one example?",
        "That makes more sense now.",
        "I'll practice this tonight.",
        "Could you recommend a simple book?",
        "I prefer a paper copy.",
        "Is the ebook available?",
        "I already returned the other book.",
        "When is it due?",
        "May I renew it?",
        "The library was closed on Monday.",
        "I'll reserve it online.",
        "Thank you. I'll come back this afternoon.",
    ]
    for line in a2_lines:
        add_phrase("51 A2 Useful sentences", "phrase", line)

    b1_lines = [
        "The main point is that we should start earlier.",
        "I agree with the goal, but not with the timing.",
        "Could you give me a concrete example?",
        "Let me restate that to be sure I understood.",
        "If I understand you, we have two options.",
        "The first option is cheaper, but slower.",
        "The second option costs more and finishes sooner.",
        "I would rather finish sooner.",
        "We should write the decision down.",
        "Who will follow up on that action?",
        "I can take the first task.",
        "I don't have capacity for another task this week.",
        "Could we move this item to next week's agenda?",
        "The deadline is Friday at noon.",
        "I need the draft by Wednesday so I can review it.",
        "Please copy the whole team when you send it.",
        "I attached the spreadsheet to the email.",
        "The figures in row four don't match the chart.",
        "I corrected the total and highlighted the change.",
        "Thanks for catching that. I'll update the slide.",
        "The customer asked for a quieter room.",
        "I explained the delay and offered a new time.",
        "She accepted the new time.",
        "We should apologize for the wait.",
        "A short update now will prevent a longer complaint later.",
        "I recommend we pilot this with one class first.",
        "If the pilot works, we can extend it next month.",
        "The risk is that people will not see the notice.",
        "We can reduce that risk by sending a reminder.",
        "What would success look like after two weeks?",
        "Let's agree on one measure and stick to it.",
        "I learned more from the discussion than from the reading.",
        "The author claims that habit matters more than talent.",
        "The evidence is interesting, but the sample is small.",
        "I would not generalize from one example.",
        "A better question is why the result changed.",
        "Could we compare this source with the one from Tuesday?",
        "They disagree about the cause, not about the facts.",
        "I'll summarize both views in the introduction.",
        "My conclusion is cautious because the data is incomplete.",
        "The landlord said the repair will happen on Thursday.",
        "Please text me when the plumber is on the way.",
        "I'll be at work, but my neighbor can open the door.",
        "We sorted the recycling into paper, glass, and plastic.",
        "The bulky waste collection is on the first Monday.",
        "I signed the petition at the community center.",
        "The meeting is open to anyone who lives on this street.",
        "I'd like to volunteer for the Saturday shift.",
        "I can help for two hours, but not the whole day.",
        "Could you send the address and a contact number?",
        "If it rains, we should move the event indoors.",
        "The feedback was mostly positive.",
        "One comment asked us to speak more slowly.",
        "I'll add a short summary at the end next time.",
        "That change is small and worth doing.",
        "I feel more confident about the presentation now.",
        "I still want to practice the opening once more.",
        "Tell me if I am going too fast.",
        "Stop me if the example is not clear.",
        "I appreciate the honest feedback.",
        "I'll revise the middle section tonight.",
        "The final version will be shorter.",
        "Shorter is better if the point stays clear.",
    ]
    for line in b1_lines:
        add_phrase("52 B1 Useful sentences", "phrase", line)

    b2_lines = [
        "The claim is narrower than the headline suggests.",
        "We can support the trend, but not the cause.",
        "The study shows an association, not a mechanism.",
        "A confound could explain the same pattern.",
        "I would want a replication before changing policy.",
        "The sample does not represent the whole population.",
        "That limitation belongs in the conclusion.",
        "The authors acknowledge the gap, which strengthens the paper.",
        "If we define the term this way, the result changes.",
        "Let's state the definition before we use the number.",
        "The chart makes the increase look steeper than it is.",
        "Check the axis before you quote the figure.",
        "A small absolute change can still matter.",
        "The practical effect is modest.",
        "I would describe it as promising rather than proven.",
        "The recommendation should match the strength of the evidence.",
        "We can pilot the change without treating it as permanent.",
        "Set a review date so the decision can be reversed.",
        "The cost is front-loaded, and the benefit comes later.",
        "Who carries the risk if the pilot fails?",
        "The contract should say who owns the data.",
        "Please add a plain-language summary of that clause.",
        "The notice period is thirty days on either side.",
        "I am comfortable with the scope, not with the penalty.",
        "We can accept the amendment if the date moves.",
        "Put the disagreement in writing so it stays precise.",
        "I am not questioning the goal. I am questioning the method.",
        "Those are different objections, and they need different answers.",
        "A compromise is possible if we separate the two issues.",
        "Let's decide the principle first and the details second.",
        "The public summary should avoid jargon.",
        "Say what will change for a resident next month.",
        "If nothing changes for them, do not imply that it will.",
        "Transparency is useful only if people can find the document.",
        "Publish the comments and the response together.",
        "A minority view can still improve the final text.",
        "I would rather be accurate than reassuring.",
        "Uncertainty is not a reason to say nothing.",
        "Tell people what you know, what you don't, and what happens next.",
        "That sentence is doing too much work. Split it.",
        "The verb is buried. Make the actor the subject.",
        "Cut the hedge if you are actually sure.",
        "Keep the hedge if the evidence is thin.",
        "Read it aloud. The long sentence loses the point.",
        "The example is vivid, but it is not typical.",
        "Use a typical example, then mention the exception.",
        "The analogy helps until it starts to mislead.",
        "Stop the analogy when the cases diverge.",
        "I changed my mind after seeing the second source.",
        "The second source answers the objection I had.",
        "I still disagree, and I can say why in one sentence.",
        "We don't need to resolve that today.",
        "We do need to name it so it is not forgotten.",
        "I'll write the dissent as a short note, not a speech.",
        "The note should be firm and not personal.",
        "Thank you. That distinction was the missing piece.",
        "I can support the proposal with that change.",
        "Without that change, I would vote no.",
        "Record both the decision and the reason.",
        "Future readers will need the reason more than the slogan.",
    ]
    for line in b2_lines:
        add_phrase("53 B2 Useful sentences", "phrase", line)

    dialogues = [
        ("54 A1 Conversations", [
            ("At the bakery", [
                "Good morning. What would you like?",
                "Two rolls and a small loaf, please.",
                "Anything else with that?",
                "A bottle of milk as well, please.",
                "That's four dollars.",
                "Here you are.",
                "Thank you. Would you like a bag?",
                "Yes, please.",
                "Have a good day.",
                "You too. Goodbye.",
            ]),
            ("Asking the time", [
                "Excuse me, do you have the time?",
                "Yes, it's quarter past three.",
                "Thank you. Is the museum still open?",
                "It closes at five.",
                "So I have time to walk there.",
                "Yes, it's about ten minutes on foot.",
                "Do I go straight from here?",
                "Straight, then left at the lights.",
                "Thank you very much.",
                "You're welcome.",
            ]),
            ("A birthday at home", [
                "Happy birthday! Come in.",
                "Thank you. This is for you.",
                "You didn't need to bring anything.",
                "I wanted to. It's a small cake.",
                "It looks wonderful. Please sit down.",
                "The room looks lovely.",
                "We're glad you could come.",
                "I wouldn't miss it.",
                "Would you like tea or juice?",
                "Tea, please.",
            ]),
            ("Borrowing a pen", [
                "Excuse me, may I borrow a pen?",
                "Of course. Here you are.",
                "Thank you. I need to sign this form.",
                "Take your time.",
                "Which line do I sign?",
                "The line at the bottom.",
                "Done. Here is your pen.",
                "Thank you.",
                "Did you write the date as well?",
                "Yes, I did.",
            ]),
            ("On the phone with a friend", [
                "Hi, it's Nora. Is this a good time?",
                "Hi, Nora. Yes, I can talk.",
                "Are you free on Saturday afternoon?",
                "I am free after two.",
                "Shall we meet at the park?",
                "That sounds good.",
                "I'll bring some bread and fruit.",
                "I'll bring drinks.",
                "See you at two, then.",
                "See you then.",
            ]),
            ("At the market", [
                "Are these tomatoes ripe?",
                "Yes, they are sweet today.",
                "I'll take four, please.",
                "Would you like some herbs as well?",
                "A small bunch of parsley, please.",
                "Here you are.",
                "How much is that altogether?",
                "Three dollars.",
                "Thank you. Have a good morning.",
                "You too.",
            ]),
            ("Finding a seat", [
                "Excuse me, is this seat free?",
                "Yes, please sit down.",
                "Thank you. It's busy today.",
                "The train is always busy at this hour.",
                "Do you know which stop is the museum?",
                "It's the third stop.",
                "Thank you. I'll watch the board.",
                "The announcement will say it too.",
                "That's helpful.",
                "Enjoy your visit.",
            ]),
            ("Closing the window", [
                "It's a little cold in here.",
                "Shall I close the window?",
                "Yes, please.",
                "There. Is that better?",
                "Much better, thank you.",
                "I can get you a blanket too.",
                "No, thank you. This is fine.",
                "Would you like some tea?",
                "Yes, please. With no sugar.",
                "I'll put the kettle on.",
            ]),
            ("A pet at the door", [
                "Your dog is very friendly.",
                "He likes visitors.",
                "May I pet him?",
                "Yes, he enjoys that.",
                "What is his name?",
                "His name is Milo.",
                "Hello, Milo.",
                "He wants to show you his ball.",
                "I'll throw it once.",
                "He will bring it back.",
            ]),
            ("Leaving a class", [
                "That's all for today.",
                "Thank you. The lesson was clear.",
                "Please review the ten words tonight.",
                "I will.",
                "Tomorrow we will use them in sentences.",
                "Should I bring the same notebook?",
                "Yes, and a pen.",
                "What time do we start?",
                "We start at nine.",
                "See you tomorrow.",
            ]),
        ]),
        ("55 A2 Conversations", [
            ("Changing a booking", [
                "Hello, I have a booking for tonight under Rahman.",
                "Yes, I see it. A table for two at seven.",
                "Could we move it to eight?",
                "Let me check. Yes, eight is free.",
                "Wonderful. It's still for two.",
                "I've updated it.",
                "Could we have a table away from the door?",
                "I'll note that.",
                "Thank you for your help.",
                "We'll see you at eight.",
            ]),
            ("At the clinic", [
                "Good morning. I have an appointment with the nurse.",
                "Please take a seat. You're a few minutes early.",
                "I've had a sore throat since yesterday.",
                "Any fever?",
                "No fever, but it hurts to swallow.",
                "Are you taking any medicine?",
                "Only water and rest so far.",
                "The nurse will call you shortly.",
                "Thank you.",
                "There's water on the table if you need it.",
            ]),
            ("Returning an item", [
                "Hello, I'd like to return this shirt.",
                "Do you have the receipt?",
                "Yes, here it is.",
                "Is there a problem with it?",
                "The size is smaller than I expected.",
                "We can exchange it or refund it.",
                "An exchange would be perfect, in a larger size.",
                "We have that size in blue.",
                "Blue is fine.",
                "You can try it in the room on the left.",
            ]),
            ("A delayed train", [
                "Excuse me, has the train to the center been delayed?",
                "Yes, it will leave twenty minutes late.",
                "Is the next train any sooner?",
                "The next one is already full.",
                "I'll wait for this one, then.",
                "Platform two is unchanged.",
                "Will I miss my connection?",
                "You should still have ten minutes.",
                "That's a relief.",
                "Listen for the announcement in case it changes.",
            ]),
            ("Joining a class", [
                "Hello, is the evening class still open?",
                "Yes, we have two places left.",
                "I can come on Tuesdays.",
                "Tuesday is our conversation class.",
                "What level is it?",
                "It's for learners who can already talk about everyday topics.",
                "That sounds right for me.",
                "Bring a notebook next week.",
                "Where is the room?",
                "Room four, on the first floor.",
            ]),
            ("A delivery", [
                "Hello, I have a package for this address.",
                "Thank you. I've been expecting it.",
                "Please sign here.",
                "Can I check the name first?",
                "Of course. It says Kim.",
                "That's me.",
                "Would you like me to leave it inside the door?",
                "Here is fine, thank you.",
                "Have a good afternoon.",
                "You too.",
            ]),
            ("At the library", [
                "Hello, I'd like to join the library.",
                "Please bring a proof of address.",
                "I have a letter and my card.",
                "That's enough. I'll make the card now.",
                "How many books can I borrow?",
                "Up to six at a time.",
                "How long can I keep them?",
                "Three weeks, and you can renew them online.",
                "That's perfect.",
                "Your card is ready.",
            ]),
            ("Paying a bill", [
                "I'd like to pay this bill, please.",
                "You can pay by card or cash.",
                "Card, please.",
                "The amount is forty-two dollars.",
                "Does that include the fee?",
                "Yes, the fee is already included.",
                "Please go ahead.",
                "Enter your number on the pad.",
                "It's approved.",
                "Here is your receipt. Thank you.",
            ]),
            ("A noisy evening", [
                "I'm sorry about the noise last night.",
                "It did keep me up for a while.",
                "We had friends over and lost track of time.",
                "I understand. It was a special occasion.",
                "We'll keep it quieter from now on.",
                "I appreciate that.",
                "If it happens again, please knock.",
                "I will, and thank you for coming by.",
                "We're glad to be neighbors.",
                "So am I.",
            ]),
            ("Sharing a recipe", [
                "This soup is delicious. What's in it?",
                "Lentils, lemon, and a little cumin.",
                "Is it difficult to make?",
                "No. It simmers for about half an hour.",
                "Do you add salt at the start?",
                "I add it near the end.",
                "I'll try it this weekend.",
                "Use fresh lemon if you can.",
                "I will. Thank you for the recipe.",
                "Tell me how it turns out.",
            ]),
        ]),
        ("56 B1 Conversations", [
            ("A project delay", [
                "I need to flag a delay on the report.",
                "How long do you expect?",
                "Two days. The numbers arrived late.",
                "Will that affect the Friday meeting?",
                "We can still present the outline on Friday.",
                "And the full report on Tuesday?",
                "Yes. I'll send a short note today so nobody is surprised.",
                "Please include what you already know.",
                "I will, and I'll mark what is still missing.",
                "That works. Thank you for the early warning.",
            ]),
            ("Disagreeing at work", [
                "I see the appeal of launching next week.",
                "But you have a concern.",
                "We haven't tested the form with real users.",
                "We could launch to a small group first.",
                "That would answer my concern.",
                "How many people do you suggest?",
                "Twenty is enough for the first round.",
                "Let's do that and review on Thursday.",
                "I'll write the test questions.",
                "I'll recruit the group.",
            ]),
            ("A follow-up visit", [
                "The cough is better, but I still feel tired.",
                "How is your sleep?",
                "I wake up once or twice.",
                "Are you drinking enough water?",
                "More than last week.",
                "Good. Keep the same dose for three more days.",
                "Should I stay home from work?",
                "Rest this afternoon, and go back tomorrow if you feel up to it.",
                "What if the fever returns?",
                "Call us. Don't wait the weekend.",
            ]),
            ("Discussing a story", [
                "What did you make of the article?",
                "The reporting is careful, but the headline is strong.",
                "I thought the same.",
                "The study shows a link, not a cause.",
                "The last paragraph does say that.",
                "Many readers won't get that far.",
                "So the useful question is how the headline could be fairer.",
                "And still interesting enough to read.",
                "I'd mention both in the summary.",
                "Agreed. I'll draft it that way.",
            ]),
            ("A study group", [
                "Shall we divide the chapter?",
                "I'll take the method section.",
                "I'll take the results.",
                "Then I can take the discussion.",
                "Let's each bring three questions.",
                "And one term we still find confusing.",
                "We can meet at four in the library.",
                "The group room is free then.",
                "I'll book it.",
                "Send the page numbers in the chat.",
            ]),
            ("Asking for feedback", [
                "Could you look at the opening paragraph?",
                "Of course. What do you want feedback on?",
                "Whether the question is clear.",
                "The question is clear. The second sentence repeats it.",
                "I can cut that sentence.",
                "Then the example can move up.",
                "That's better. Anything else?",
                "Read it aloud once. One clause is hard to follow.",
                "I'll simplify it tonight.",
                "Send me the revision if you want a second look.",
            ]),
            ("A repair request", [
                "The kitchen tap has been dripping for a week.",
                "Thank you for reporting it.",
                "I already put a bucket under it.",
                "A plumber can come on Wednesday morning.",
                "I'll be at work. Can they come after four?",
                "I can ask. Thursday after four is already open.",
                "Thursday is fine.",
                "Please make sure someone over eighteen is home.",
                "My partner will be there.",
                "I'll email the confirmation.",
            ]),
            ("Choosing a course", [
                "I'm deciding between the writing course and the speaking course.",
                "Which skill do you use more at work?",
                "I write emails every day and present once a month.",
                "Then writing will help you sooner.",
                "I also get nervous when I present.",
                "You could take speaking next term.",
                "Is the writing course very formal?",
                "It uses workplace examples, not literary essays.",
                "That suits me.",
                "I can hold a place until Friday.",
            ]),
            ("A neighborhood meeting", [
                "Thanks for coming. The topic is the crossing on our street.",
                "Cars don't slow down at the corner.",
                "We've asked the city for a speed bump.",
                "What can we do while we wait?",
                "A temporary sign and a parent rota at school time.",
                "I can do Tuesday mornings.",
                "I'll take Thursday.",
                "Please don't step into the road. The sign is the reminder.",
                "And we'll share the city's reply when it arrives.",
                "I'll send notes tonight.",
            ]),
            ("Setting a boundary", [
                "I can help with the move, but only in the morning.",
                "That's already a big help.",
                "I have a class at two that I can't miss.",
                "We'll schedule the heavy things before noon.",
                "I can also bring boxes tonight.",
                "Perfect. Please don't feel you have to stay after.",
                "I won't. I want to arrive rested tomorrow.",
                "We'll order lunch for the people who stay.",
                "Text me what time to be there.",
                "Nine o'clock at the side door.",
            ]),
            ("Summarizing a meeting", [
                "Before we stop, let me check the decisions.",
                "We agreed to pilot the form with one class.",
                "Maya will write the questions.",
                "And I will invite the participants.",
                "We'll read the results next Thursday.",
                "No other project changes this week.",
                "Did I miss anything?",
                "Please send the note to people who could not attend.",
                "I will, this afternoon.",
                "Thank you, everyone.",
            ]),
            ("At a parent evening", [
                "Thank you for coming in.",
                "We're glad to be here. How is she doing?",
                "She participates well and helps other students.",
                "That's good to hear.",
                "Her written answers are a little short.",
                "We can practice one full sentence at home.",
                "Even three times a week would help.",
                "We'll try that.",
                "She is happy in the class. This is a small next step.",
                "Thank you for being specific.",
            ]),
            ("Travel insurance", [
                "Does the policy cover a missed connection?",
                "Yes, if the delay is longer than three hours.",
                "What documents would I need?",
                "The booking, the delay notice, and your receipts.",
                "Are pre-existing conditions excluded?",
                "Yes. They're listed on page two.",
                "I'll read that before I buy it.",
                "You can save the quote until midnight.",
                "If I buy it, when does cover start?",
                "At the time of purchase, for trips booked earlier as well.",
            ]),
            ("A volunteer shift", [
                "Thanks for signing up for the food bank.",
                "Where should I go?",
                "Use the side door and ask for Sam.",
                "What will I be doing?",
                "Sorting fruit and greeting people.",
                "I've done greeting before, but not sorting.",
                "Sam will show you. It takes ten minutes to learn.",
                "Should I bring anything?",
                "Just comfortable shoes and a bottle of water.",
                "I'll be there at nine.",
            ]),
            ("Comparing two flats", [
                "The first flat is closer to work.",
                "The second is quieter and a little cheaper.",
                "How much cheaper?",
                "Eighty dollars a month, but the commute is longer.",
                "I value a short commute.",
                "Then the first one fits you better.",
                "Is the building noisy at night?",
                "The street is calm after eight.",
                "I'll take a second look on Saturday.",
                "I can meet you there at eleven.",
            ]),
        ]),
        ("57 B2 Conversations", [
            ("Reading a chart", [
                "The line rises sharply after year three.",
                "Look at the scale. It starts at ninety, not zero.",
                "So the change is smaller than it appears.",
                "It's about four points, not a doubling.",
                "The caption also says the sample changed.",
                "Then we shouldn't treat it as one continuous series.",
                "I'll note both limits in the slide.",
                "And avoid the word surge.",
                "Increase is fair.",
                "Yes. Let the number do the work.",
            ]),
            ("A research method", [
                "Why interviews rather than a survey?",
                "We need reasons, not only counts.",
                "How many interviews will you do?",
                "Twelve, or until the same themes keep returning.",
                "How will you choose people?",
                "From three different departments, with a mix of new and long-serving staff.",
                "Will you record them?",
                "Only with written consent, and we'll delete the audio after transcription.",
                "That answers my main concern.",
                "I'll add it to the methods section.",
            ]),
            ("Negotiating a clause", [
                "The penalty for a late draft is too high.",
                "It's there to keep the schedule honest.",
                "I understand the aim. The amount is the problem.",
                "What would you accept?",
                "Half the amount, and a two-day grace period.",
                "I can agree to the grace period.",
                "And reduce the penalty by a third?",
                "Yes, if the final deadline itself does not move.",
                "That's acceptable.",
                "I'll send the revised clause this afternoon.",
            ]),
            ("Climate choices", [
                "The city can fund trees or the bus lanes, but not both this year.",
                "Which one reduces heat and travel time for more people?",
                "The bus lanes help more commuters immediately.",
                "Trees help the streets that have no shade.",
                "Could the tree budget start on those three streets only?",
                "That would cost less than the full plan.",
                "Then both can begin, at a smaller scale.",
                "We should publish the tradeoff, not hide it.",
                "Agreed. People can accept a limit if they can see it.",
                "I'll draft that explanation in plain language.",
            ]),
            ("Editing a paragraph", [
                "This paragraph has three ideas.",
                "I was trying to keep them together.",
                "The reader loses the subject by the fourth line.",
                "I can split it after the example.",
                "Yes. And make the researcher the subject of the first sentence.",
                "The study found is weaker than she found.",
                "Use she found if the person did the work.",
                "What about the hedge, may suggest?",
                "Keep it. The evidence is not conclusive.",
                "I'll send the shorter version tonight.",
            ]),
            ("A performance review", [
                "Your writing has become much clearer this year.",
                "Thank you. I worked on that deliberately.",
                "The next step is delegating earlier.",
                "I hold tasks because I don't want to overload the team.",
                "That protects them, and it bottlenecks you.",
                "I could hand over the first draft, not the final one.",
                "That's a good boundary.",
                "I'll try it on the next brief.",
                "We'll review how it felt in a month.",
                "I'd like that.",
            ]),
            ("An ethical question", [
                "The quote is powerful, but the speaker could be identified.",
                "Even with the name removed?",
                "The role and the town together are enough.",
                "Then we shouldn't use the quote in that form.",
                "We can describe the theme without the distinctive detail.",
                "Will that weaken the piece?",
                "A little. It also keeps a promise.",
                "The promise comes first.",
                "I'll rewrite the paragraph and show you both versions.",
                "We'll publish only the safer one.",
            ]),
            ("Comparing sources", [
                "The two reports use the same year and reach different totals.",
                "Do they count the same thing?",
                "One includes part-time staff. The other doesn't.",
                "Then the difference is a definition, not a dispute.",
                "We should say that before we quote either number.",
                "Which definition matches our question?",
                "Ours is about hours available, so part-time work counts.",
                "Use the first report, and footnote the second.",
                "I'll explain the gap in one sentence.",
                "That's enough. Don't make it a side essay.",
            ]),
            ("A public meeting", [
                "We'll take comments in the order people signed up.",
                "Each person has two minutes.",
                "Please speak to the proposal, not to other speakers.",
                "If you have a question of fact, park it and we'll answer at the end.",
                "The draft is on the chairs and on the website.",
                "Changes from the last draft are marked.",
                "We will not vote tonight.",
                "The record will stay open for written comments until Friday.",
                "Names are optional on written comments.",
                "Thank you for keeping the room respectful.",
            ]),
            ("Explaining a trend", [
                "Applications rose, but completions did not.",
                "So interest grew faster than follow-through.",
                "The drop happens after the second week.",
                "That suggests the start is welcoming and the middle is not.",
                "We don't yet know whether time or difficulty causes it.",
                "Don't claim the cause in the summary.",
                "I can say where the drop happens and what we will test next.",
                "That's the honest version.",
                "The next test is a shorter second assignment.",
                "And a check on whether people were told how long it would take.",
            ]),
            ("Mediating", [
                "You both want the project to succeed. You disagree about the order.",
                "I want the research finished before we design.",
                "I want a rough design now so the research has a target.",
                "Those can be sequenced without a winner.",
                "A one-page design, clearly marked as provisional.",
                "Then the research can test those assumptions.",
                "And the design can change when the research comes back.",
                "I can live with provisional if it is labeled.",
                "I'll label every page.",
                "Then we have a plan.",
            ]),
            ("A grant budget", [
                "The largest cost is staff time, not equipment.",
                "Reviewers will ask why the time is so high.",
                "Because interviews take longer to analyze than to conduct.",
                "Put that reason next to the number.",
                "The travel line is small.",
                "Keep it. Cutting it would limit who can take part.",
                "Is the contingency reasonable?",
                "Five percent is modest for this kind of work.",
                "I'll add one sentence on what it is for.",
                "Good. Unsupported round numbers invite cuts.",
            ]),
            ("Risk", [
                "The likely outcome is a small gain.",
                "The unlikely outcome is a serious loss.",
                "So the average hides the part that matters.",
                "We should show both, not only the average.",
                "Can we reduce the serious loss without losing the gain?",
                "A slower rollout would do that.",
                "It also delays the benefit.",
                "Say that. Let the board choose with both consequences visible.",
                "I won't recommend a single number as if it were certain.",
                "That's the right standard for this decision.",
            ]),
            ("Cultural context", [
                "The example is funny in one culture and rude in another.",
                "Then it shouldn't be the example in a mixed room.",
                "I didn't see that when I wrote it.",
                "That's useful to know. The point of the slide can stay.",
                "I'll replace the joke with a neutral case.",
                "Check the image too. The gesture isn't universal.",
                "I'll use an object instead of a person.",
                "That also avoids a stock-photo stereotype.",
                "Thank you for saying it directly.",
                "Better now than after the talk.",
            ]),
            ("Closing a debate", [
                "We've heard the case for waiting and the case for starting.",
                "The facts are not really in dispute.",
                "The disagreement is about how much uncertainty we can accept.",
                "I can accept a pilot, not a full launch.",
                "I can accept a pilot if it has a stop date.",
                "Then that is the proposal in front of us.",
                "A three-month pilot, with a published review.",
                "And no automatic renewal.",
                "Renewal would need a separate decision.",
                "I'll write that down as the decision.",
            ]),
        ]),
    ]
    for group, scenes in dialogues:
        for _title, lines in scenes:
            if len(lines) != 10:
                raise SystemExit(f"{_title} has {len(lines)} lines")
            for line in lines:
                add_phrase(group, "dialogue", line)

    # Top up sentence groups with extra real lines if templates/dedupe left a gap, then trim to 1000.
    fillers = [
        ("50 A1 Useful sentences", "phrase", [
            "Please come in.",
            "Please wait here.",
            "I am ready.",
            "I am not ready yet.",
            "This is my friend.",
            "This is my sister.",
            "I would like water, please.",
            "I don't eat meat.",
            "I like this one.",
            "I don't like that one.",
            "How much is this?",
            "Where do I pay?",
            "Can you help me, please?",
            "I need a bag, please.",
            "The door is open.",
            "The shop is closed.",
            "See you on Monday.",
            "See you next week.",
            "Good luck.",
            "Well done.",
            "That is correct.",
            "Try again, please.",
            "Please repeat after me.",
            "I remember this word.",
            "I forgot this word.",
        ]),
        ("51 A2 Useful sentences", "phrase", [
            "Could you hold my place in the line?",
            "I'll be back in two minutes.",
            "Is the tip included?",
            "We'll have tap water for the table.",
            "Could you make this to go?",
            "I have a reservation under the name Costa.",
            "The room key isn't working.",
            "Which platform is the airport train?",
            "Is this the line for returns?",
            "I bought this yesterday.",
            "Could you gift-wrap it?",
            "I don't need a bag, thank you.",
            "Please text me when it's ready.",
            "I can pick it up after work.",
            "Is there a later appointment?",
            "Morning is better than afternoon.",
            "I already created an account.",
            "I forgot my password.",
            "Could you reset it?",
            "The page won't load.",
        ]),
        ("52 B1 Useful sentences", "phrase", [
            "Let's park that question and come back to it.",
            "I want to build on what Sam just said.",
            "The constraint is time, not interest.",
            "We can do it well, or we can do it this week. Not both.",
            "I'll own the communication. Please own the schedule.",
            "Send me the raw notes, not a polished version.",
            "A polished version can wait until we agree.",
            "I changed the order so the example comes first.",
            "Tell me if the tone is too direct.",
            "Direct is fine if it stays kind.",
            "I can live with the decision.",
            "I don't need to win the point.",
            "The useful outcome is a next step.",
            "Write the next step as a verb, not a topic.",
            "Review the draft is a next step. Quality is not.",
        ]),
        ("53 B2 Useful sentences", "phrase", [
            "Separate what was measured from what was inferred.",
            "The footnote carries the caveat. The slide should too.",
            "Don't let a metaphor become the finding.",
            "If the category is unstable, don't rank people inside it.",
            "A null result is still a result. Report it.",
            "Pre-commit to the comparison so the story can't wander.",
            "Ask who is missing from the room before you generalize.",
            "The dissent is part of the record, not a disruption.",
            "Price the maintenance, not only the launch.",
            "A policy that cannot be explained in plain speech is not ready.",
            "Show the alternative you rejected, and why.",
            "Confidence should fall when the data gets thinner.",
            "Don't average away the group that bears the harm.",
            "The decision rule matters more than the slogan.",
            "End with what a careful person should do on Monday.",
            "Write the uncertainty in the same size as the headline.",
            "A model is a tool. It is not the territory.",
            "If two measures disagree, inspect the definitions.",
            "Do not smooth the series until you have shown the raw one.",
            "The appendix can hold the detail. The abstract cannot.",
            "Say who collected the data, and when.",
            "A single interview can illustrate. It cannot prove.",
            "Keep the verb close to its subject.",
            "Name the actor. Avoid a stack of nouns.",
            "Cut the sentence that repeats the previous one.",
            "One claim per paragraph is enough.",
            "The last sentence should be checkable.",
            "Replace the adjective with a number when you have one.",
            "If you have no number, do not invent a tone of precision.",
            "Invite the objection before someone else does.",
            "A fair summary includes the strongest opposing point.",
            "We can disagree and still share the next step.",
            "Write the next step so a stranger could do it.",
            "Put the date on the decision, not only the opinion.",
        ]),
        ("51 A2 Useful sentences", "phrase", [
            "The library card is in the front pocket.",
            "I reserved the book under my family name.",
            "The reading room is quiet after six.",
            "Please return the key to the front desk.",
            "The lift is out of order, so we'll use the stairs.",
            "The waiting room is the second door on the left.",
            "I have the confirmation email on my phone.",
            "Could you print a copy for the file?",
            "The form asks for an emergency contact.",
            "I'll write my mobile number on the back.",
            "The class moves to room twelve next week.",
            "Bring headphones if you want to use the recording.",
            "The worksheet is double sided.",
            "Please write in pen, not pencil.",
            "You may use a dictionary during the quiz.",
            "The quiz is twenty minutes long.",
            "We will check the answers together.",
            "There is no trick question.",
            "Skip a question if you need to, then come back.",
            "Put your name in the top corner.",
            "The café stops serving food at four.",
            "They still serve tea after that.",
            "I'd like the soup of the day.",
            "Is the soup vegetarian today?",
            "I'll have the salad without onions.",
            "Could we sit away from the speaker?",
            "The music is a little loud for conversation.",
            "We'd like a jug of water for the table.",
            "Please tell the kitchen about the nut allergy.",
            "We'll order dessert after the main course.",
            "The train after this one has more seats.",
            "I'll stand if you want the seat.",
            "This bag can go on the rack.",
            "Mind the gap when you step off.",
            "The doors close thirty seconds before departure.",
            "Tickets are checked at the barrier.",
            "I bought the ticket on my phone.",
            "The barcode is not loading.",
            "The staff member said a paper ticket is fine.",
            "Platform numbers can change, so listen for the announcement.",
            "The pharmacy closes for lunch between one and two.",
            "The evening clinic starts at six.",
            "I need a repeat of the same medicine.",
            "The box says to take it with food.",
            "I'll set a reminder on my phone.",
            "The bandage should stay dry today.",
            "I can shower if I cover it.",
            "The follow-up is in ten days.",
            "Please call if the pain gets worse.",
            "I feel well enough to walk home.",
            "The hardware shop cuts keys while you wait.",
            "I need two copies of this house key.",
            "The new key sticks in the lock.",
            "A little graphite should help.",
            "The bulb has blown in the hallway.",
            "I bought the same warm white bulb.",
            "The switch sparks, so I won't use it.",
            "I'll ask an electrician to look at it.",
            "The smoke alarm chirps when the battery is low.",
            "I replaced the battery this morning.",
            "Test the alarm once a month.",
            "The recycling is collected on Thursday morning.",
            "Please flatten the boxes before then.",
            "Glass goes in the black box.",
            "Food waste goes in the small caddy.",
            "The caddy liners are under the sink.",
            "I'll take the bulky lamp to the recycling center.",
            "They accept batteries at the supermarket desk.",
            "Keep the receipt for the repair.",
            "The warranty is still valid.",
            "The serial number is on the bottom.",
            "I registered the product online.",
            "They will send a replacement, not a refund.",
            "The courier needs a signature.",
            "I'll be home after half past five.",
            "If I miss them, the parcel goes to the corner shop.",
            "The shop holds parcels for a week.",
            "Bring identification when you collect it.",
            "The notice was in the mailbox.",
            "Our building meeting is on the first Monday.",
            "I'll raise the broken light by the stairs.",
            "Please don't block the fire exit with bicycles.",
            "The bike room code changed last week.",
            "I wrote the new code in my notebook.",
            "Guests can use the visitor spaces at the back.",
            "The spaces are free after six.",
            "Please don't leave the gate propped open.",
            "The gate closes by itself if you let it.",
            "Thank you for watering the plants while I was away.",
        ]),
    ]
    for group, kind, lines in fillers:
        for line in lines:
            if len(phrases) >= 1000:
                break
            add_phrase(group, kind, line)

    if len(phrases) < 1000:
        raise SystemExit(f"only {len(phrases)} new lines")
    phrases = phrases[:1000]
    for index, row in enumerate(phrases, start=1):
        row["id"] = f"dlg-{index:04d}"

    (COURSE / "expansion.json").write_text(json.dumps(chosen, ensure_ascii=False, separators=(",", ":")))
    (COURSE / "dialogues.json").write_text(json.dumps(phrases, ensure_ascii=False, separators=(",", ":")))
    from collections import Counter
    print("words", len(chosen), Counter(row["level"] for row in chosen))
    print("word groups", Counter(row["group"] for row in chosen))
    print("lines", len(phrases), Counter(row["group"] for row in phrases))
    print("dialogue", sum(1 for row in phrases if row["kind"] == "dialogue"), "phrase", sum(1 for row in phrases if row["kind"] == "phrase"))


if __name__ == "__main__":
    main()
