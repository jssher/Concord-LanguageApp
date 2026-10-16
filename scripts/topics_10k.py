#!/usr/bin/env python3
"""Gather themed picture words, preferring course lemmas, and list words that must be added."""

from __future__ import annotations

import json
import os
import re
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path("/workspace")

# Specific topics first so generic ones do not steal their words.
TOPICS: list[tuple[str, str, str]] = [
    ("The skeleton", "The body", "individual human bones a student can point at, such as skull, rib, femur, not the word bone alone repeated"),
    ("Muscles", "The body", "named muscles and muscle groups a chart would label, such as biceps, calf, diaphragm"),
    ("Internal organs", "The body", "internal organs in place on a chart, such as heart, lung, liver, kidney"),
    ("Blood and the heart", "The body", "parts of the circulatory system: heart chambers, artery, vein, blood cells"),
    ("Breathing", "The body", "parts of the respiratory system: lung, trachea, bronchus, diaphragm"),
    ("Digestion", "The body", "parts of the digestive system from mouth to intestine"),
    ("Nerves and the brain", "The body", "parts of the nervous system: brain, spinal cord, nerve, neuron"),
    ("The face", "The body", "facial features: eye, nose, cheek, chin, eyebrow"),
    ("Hands and feet", "The body", "parts of the hand and the foot: thumb, palm, heel, toenail"),
    ("Skin, hair, and nails", "The body", "skin, hair, and nails and what grows on them"),
    ("The five senses", "The body", "the sense organs and what they sense, drawable objects"),
    ("Life stages", "People", "people at different ages: baby, toddler, teenager, adult, elder"),
    ("The family", "People", "family members with distinct roles: mother, father, aunt, cousin, twin"),
    ("Daily routines", "People", "one person doing a daily action: waking, brushing teeth, commuting"),
    ("Gestures", "People", "a person making one clear gesture: wave, nod, point, shrug"),
    ("Feelings", "People", "faces with clearly different emotions: joy, anger, fear, surprise, disgust"),
    ("Medical jobs", "Work", "healthcare workers you can tell apart by uniform or tool"),
    ("Building jobs", "Work", "construction trades, one worker each"),
    ("Food jobs", "Work", "people who cook, serve, or sell food"),
    ("Travel jobs", "Work", "pilots, sailors, drivers, and guides"),
    ("School jobs", "Work", "teachers, librarians, and other school workers"),
    ("Safety jobs", "Work", "police, firefighters, and rescue workers, no weapons close up"),
    ("Law jobs", "Work", "a judge, a lawyer, a clerk in a courtroom, objects not violence"),
    ("Farm jobs", "Work", "people who work on a farm or with animals"),
    ("Office jobs", "Work", "office workers and what makes their job visible"),
    ("Shop jobs", "Work", "people who sell or mend things in a shop"),
    ("Art jobs", "Work", "artists, musicians, actors, and designers at work"),
    ("Science jobs", "Work", "scientists and researchers with their tools"),
    ("City jobs", "Work", "people who keep a city running: mail, trash, buses"),
    ("Hospital ward", "Health", "objects in a hospital bedroom, not gore"),
    ("The operating room", "Health", "operating-room equipment, masks, lights, table, no blood"),
    ("The doctor's office", "Health", "objects in a doctor's consulting room"),
    ("The pharmacy counter", "Health", "pharmacy objects: bottle, label, scale, ointment, no illegal drugs"),
    ("Medical instruments", "Health", "handheld medical tools a student can name"),
    ("Symptoms", "Health", "visible signs of illness a drawing can show, such as a thermometer or a rash, no gore"),
    ("First aid", "Health", "first-aid objects and a simple bandage"),
    ("The dentist's chair", "Health", "dental tools and parts of a tooth"),
    ("Eye care", "Health", "glasses, an eye chart, and parts of the eye"),
    ("Men's clothes", "Clothes", "clothing typically drawn on a man"),
    ("Women's clothes", "Clothes", "clothing typically drawn on a woman"),
    ("Children's clothes", "Clothes", "clothes and shoes for a child"),
    ("Underwear and nightwear", "Clothes", "sleepwear and underwear drawn modestly"),
    ("Outerwear", "Clothes", "coats, rain clothes, and cold-weather layers"),
    ("Sportswear", "Clothes", "clothes worn for sport"),
    ("Workwear", "Clothes", "uniforms, helmets, aprons, and boots for work"),
    ("Shoes", "Clothes", "different kinds of footwear"),
    ("Jewelry and watches", "Clothes", "jewelry, watches, and small ornaments"),
    ("Hats, scarves, and gloves", "Clothes", "hats, scarves, gloves, and belts"),
    ("Bags and luggage", "Clothes", "bags, suitcases, and wallets"),
    ("Traditional dress", "Clothes", "traditional garments from different cultures, one garment each"),
    ("Fabrics and sewing", "Clothes", "cloth types and sewing tools"),
    ("House exterior", "Home", "the outside of a house: roof, chimney, door, window"),
    ("The living room", "Home", "furniture and objects in a living room"),
    ("The dining room", "Home", "a dining table and what is set on it"),
    ("The kitchen", "Home", "kitchen furniture and large appliances"),
    ("The bedroom", "Home", "bedroom furniture"),
    ("The bathroom", "Home", "bathroom fixtures and toiletries"),
    ("The children's room", "Home", "toys and furniture in a child's bedroom"),
    ("The home office", "Home", "a desk at home and the things on it"),
    ("The laundry room", "Home", "washing, drying, and ironing"),
    ("The garage", "Home", "a home garage and stored objects"),
    ("The garden", "Home", "a home garden, plants, and garden tools"),
    ("An apartment building", "Home", "parts of an apartment building: stairs, lift, balcony, mailbox"),
    ("Furniture details", "Home", "parts of furniture: leg, drawer, cushion, hinge"),
    ("Household appliances", "Home", "electrical appliances used at home"),
    ("Home security", "Home", "locks, alarms, keys, and a smoke alarm"),
    ("Fruit", "Food", "different fruits, one fruit each"),
    ("Vegetables", "Food", "different vegetables"),
    ("Herbs and spices", "Food", "herbs and spices a cook can see"),
    ("Meat and poultry", "Food", "cuts of meat and poultry on a counter"),
    ("Fish and seafood", "Food", "fish and shellfish"),
    ("Dairy and eggs", "Food", "milk, cheese, butter, yogurt, and eggs"),
    ("Bread and bakery", "Food", "breads, cakes, and bakery tools"),
    ("Grains and pasta", "Food", "grains, rice, and pasta shapes"),
    ("Snacks and sweets", "Food", "snacks, candy, and desserts"),
    ("Drinks", "Food", "drinks in glasses, cups, or bottles"),
    ("Kitchen utensils", "Food", "hand tools used for cooking"),
    ("Cooking equipment", "Food", "pots, pans, and machines used to cook"),
    ("Cooking methods", "Food", "food being boiled, fried, baked, grilled, or steamed"),
    ("The table setting", "Food", "plates, glasses, and cutlery on a table"),
    ("The restaurant", "Food", "a restaurant or café and its objects"),
    ("Food packaging", "Food", "boxes, jars, cans, and labels for food"),
    ("The street", "City", "objects on a city street"),
    ("Traffic", "City", "roads, lanes, lights, and crossings"),
    ("Kinds of buildings", "City", "different building types"),
    ("Shops", "City", "different kinds of shops"),
    ("The market", "City", "a market stall and what is sold"),
    ("The park", "City", "a city park and playground equipment"),
    ("Public services", "City", "library, post office, hospital, and town hall as buildings"),
    ("Street signs", "City", "common road and street signs as symbols, no words on the sign"),
    ("Transit stops", "City", "bus stops, platforms, and ticket machines"),
    ("City infrastructure", "City", "bridges, tunnels, pipes, lamps, and drains"),
    ("Waste and recycling", "City", "bins, recycling, and a garbage truck"),
    ("The car outside", "Travel", "the outside parts of a car"),
    ("The car inside", "Travel", "the inside of a car"),
    ("The engine", "Travel", "car engine parts"),
    ("Bicycles and motorcycles", "Travel", "bicycles, motorcycles, and their parts"),
    ("Bus and tram", "Travel", "buses, trams, and their parts"),
    ("The railway", "Travel", "trains, tracks, and stations"),
    ("The airplane", "Travel", "an airplane and airport objects"),
    ("The ship", "Travel", "ships, boats, and harbor objects"),
    ("Road vehicles", "Travel", "different vehicles that use a road"),
    ("Maps and navigation", "Travel", "maps, a compass, and navigation tools"),
    ("Farm animals", "Animals", "animals that live on a farm"),
    ("Pets", "Animals", "pets and the things they use"),
    ("Wild mammals", "Animals", "wild mammals, one species each"),
    ("Birds", "Animals", "different birds"),
    ("Reptiles and amphibians", "Animals", "reptiles and amphibians"),
    ("Insects", "Animals", "insects and spiders"),
    ("Sea creatures", "Animals", "animals that live in the sea"),
    ("Prehistoric animals", "Animals", "dinosaurs and other extinct animals"),
    ("Animal bodies", "Animals", "parts of an animal: paw, tail, horn, beak"),
    ("Animal homes", "Animals", "nests, burrows, hives, and dens"),
    ("Trees and leaves", "Nature", "trees and leaf shapes"),
    ("Flowers", "Nature", "different flowers"),
    ("Garden plants", "Nature", "plants grown in a garden"),
    ("The forest", "Nature", "a forest and what lives in it"),
    ("Desert and jungle", "Nature", "desert and jungle plants and land"),
    ("Mountains", "Nature", "mountain landscapes and features"),
    ("Rivers and oceans", "Nature", "rivers, lakes, and the sea"),
    ("Parts of a plant", "Nature", "root, stem, leaf, flower, seed"),
    ("Seeds and growth", "Nature", "a seed sprouting into a plant"),
    ("Biomes", "Nature", "different biomes as landscapes"),
    ("Landforms", "Nature", "landforms: valley, cliff, island, cave"),
    ("Weather", "Nature", "weather you can see"),
    ("Seasons", "Nature", "the four seasons and their signs"),
    ("Natural disasters", "Nature", "storms, floods, and quakes shown safely"),
    ("The solar system", "Space", "the sun, planets, and moons"),
    ("Stars and galaxies", "Space", "stars, constellations, and a telescope"),
    ("Earth's layers", "Space", "layers of the Earth and a volcano"),
    ("Geography tools", "Space", "globes, maps, and measuring tools"),
    ("The office", "Work", "objects on an office desk"),
    ("The construction site", "Work", "tools and machines on a building site"),
    ("The farm", "Work", "farm buildings, fields, and machines"),
    ("The classroom", "Study", "objects in a classroom"),
    ("School subjects", "Study", "objects that stand for school subjects"),
    ("The science lab", "Study", "laboratory glass and tools"),
    ("The art room", "Study", "art supplies in a school"),
    ("The gymnasium", "Study", "a school gym and its equipment"),
    ("The library", "Study", "a library and its objects"),
    ("The schoolyard", "Study", "a school playground"),
    ("Team sports", "Leisure", "equipment for team ball sports"),
    ("Individual sports", "Leisure", "equipment for sports done alone"),
    ("The gym", "Leisure", "fitness machines and weights"),
    ("Water sports", "Leisure", "swimming, rowing, and surfing gear"),
    ("Winter sports", "Leisure", "skiing, skating, and snow gear"),
    ("Board games", "Leisure", "board games and their pieces"),
    ("Hiking and camping", "Leisure", "camping and hiking gear"),
    ("Fishing", "Leisure", "fishing tackle"),
    ("Photography", "Leisure", "cameras and photo gear"),
    ("Painting and drawing", "Leisure", "paint, pencils, and paper"),
    ("Making music", "Leisure", "musical instruments"),
    ("Sewing and knitting", "Leisure", "needles, yarn, and cloth"),
    ("Dance and theater", "Leisure", "dance and stage objects"),
    ("Computer parts", "Technology", "parts of a computer you can see"),
    ("Electronics", "Technology", "electronic parts and gadgets"),
    ("Energy", "Technology", "ways of making power: solar panel, wind turbine, battery"),
    ("The workshop", "Making", "hand tools and a workbench"),
    ("Building materials", "Making", "wood, brick, glass, and metal stock"),
    ("Electrical and plumbing", "Making", "wires, pipes, and fittings"),
    ("The hotel room", "Travel", "objects in a hotel room"),
    ("The airport terminal", "Travel", "an airport terminal"),
    ("The beach", "Travel", "a beach and what people bring"),
    ("Sightseeing", "Travel", "famous kinds of landmarks, not a brand name"),
    ("Travel documents", "Travel", "passport, ticket, map, and luggage tags"),
    ("Colors", "Study", "single colored objects, one color each, no written words"),
    ("Shapes", "Study", "simple geometric shapes as solid objects"),
    ("Numbers and measures", "Study", "rulers, clocks, scales, and measuring cups"),
    ("Time and the calendar", "Study", "clocks, calendars, and parts of the day"),
    ("Cleaning supplies", "Home", "things used to clean a house"),
    ("Safety equipment", "Work", "helmets, vests, extinguishers, and warning objects"),
    ("Religious places", "Holidays", "places of worship and religious objects, respectful and simple"),
    ("Festivals", "Holidays", "objects used at festivals and holidays"),
    ("Stories and myths", "Holidays", "storybook figures and objects, not horror"),
    ("The courtroom", "Work", "a courtroom and its furniture"),
    ("Space travel", "Space", "a rocket, a suit, and space tools"),
    ("Factory machines", "Work", "machines in a factory"),
    ("The stable", "Animals", "a stable, tack, and horse care"),
    ("The aquarium", "Animals", "an aquarium and its equipment"),
    ("The zoo", "Animals", "zoo enclosures and signs without words"),
    ("Birdwatching", "Leisure", "binoculars, a field guide, and birds"),
    ("Stargazing", "Space", "a telescope, a star chart, and the night sky"),
    ("Model building", "Leisure", "a model kit and small tools"),
    ("Video games", "Leisure", "a controller, a console, and a screen, no logos"),
    ("Collecting", "Leisure", "stamps, coins, and a display case"),
    ("Reading and writing", "Study", "books, pens, and a notebook"),
    ("The bakery counter", "Food", "pastries and breads on display"),
    ("The butcher", "Food", "a butcher's counter"),
    ("The greengrocer", "Food", "a vegetable stall"),
    ("Breakfast", "Food", "a breakfast table"),
    ("A picnic", "Leisure", "a picnic on a blanket"),
    ("The playground", "City", "playground equipment"),
    ("The harbour", "Travel", "a harbour and boats"),
    ("The countryside", "Nature", "a village landscape"),
    ("The arctic", "Nature", "ice, snow, and arctic animals"),
    ("The coral reef", "Nature", "a reef and its animals"),
    ("The night sky", "Space", "moon, stars, and clouds at night"),
    ("Baby care", "People", "objects used to care for a baby"),
    ("The nursery", "Home", "a baby's room"),
    ("Grooming", "The body", "brush, comb, razor, and a mirror"),
    ("The salon", "Work", "a hair salon"),
    ("The post office", "City", "mail, stamps, and parcels"),
    ("The bank", "City", "a bank counter, coins, and a card, no logos"),
    ("Money", "Work", "coins, notes, and a wallet"),
    ("The workshop bench", "Making", "measuring and cutting tools"),
    ("Painting a room", "Home", "paint, rollers, and a ladder"),
    ("Houseplants", "Nature", "plants kept indoors"),
    ("The tool board", "Making", "tools hanging on a board"),
    ("The music room", "Leisure", "a room of instruments"),
    ("The orchestra", "Leisure", "orchestral instruments"),
    ("Folk instruments", "Leisure", "traditional instruments from around the world"),
    ("Stage costumes", "Leisure", "costumes and masks for a play"),
    ("The darkroom", "Leisure", "photo printing tools"),
    ("The laboratory bench", "Study", "chemistry glassware"),
    ("Physics tools", "Study", "magnets, prisms, and pendulums"),
    ("The weather station", "Nature", "instruments that measure weather"),
    ("The map table", "Travel", "maps, a globe, and pins"),
    ("Camping meals", "Leisure", "food cooked outdoors"),
    ("The bicycle shop", "Travel", "bicycle parts on a bench"),
    ("The train carriage", "Travel", "inside a train"),
    ("The cockpit", "Travel", "an airplane cockpit"),
    ("The ship's deck", "Travel", "the deck of a ship"),
    ("Road work", "City", "cones, barriers, and a road roller"),
    ("The fire station", "Work", "a fire station and its equipment, no disaster victims"),
    ("The police station", "Work", "a police desk, a badge, and a radio, no violence"),
    ("The vet's clinic", "Animals", "a veterinarian's tools"),
    ("The beehive", "Nature", "bees and a hive"),
    ("The orchard", "Nature", "fruit trees in an orchard"),
    ("The vegetable bed", "Nature", "a vegetable garden"),
    ("The pond", "Nature", "a pond and its life"),
    ("The cave", "Nature", "a cave and rock formations"),
    ("The volcano", "Nature", "a volcano and lava"),
    ("The glacier", "Nature", "a glacier and ice"),
    ("The island", "Nature", "an island coast"),
    ("The desert camp", "Nature", "a desert camp"),
    ("The rainforest", "Nature", "rainforest plants and animals"),
    ("The savanna", "Nature", "savanna animals and grass"),
    ("Winter clothes", "Clothes", "clothes for snow"),
    ("Summer clothes", "Clothes", "clothes for hot weather"),
    ("The closet", "Home", "a closet and hangers"),
    ("The pantry", "Food", "jars and dry food on shelves"),
    ("The fridge", "Food", "food inside a refrigerator"),
    ("The oven", "Food", "an oven and baking trays"),
    ("The sink", "Home", "a kitchen sink and what is beside it"),
    ("Tableware", "Food", "bowls, cups, and serving dishes"),
    ("Spices on the rack", "Food", "spice jars"),
    ("The tea table", "Food", "tea and coffee things"),
    ("The birthday table", "Holidays", "a birthday party table"),
    ("The wedding", "Holidays", "a wedding and its objects"),
    ("New year", "Holidays", "new year objects"),
    ("A parade", "Holidays", "a parade"),
    ("The museum", "City", "a museum hall"),
    ("The theater", "City", "a theater and seats"),
    ("The stadium", "City", "a stadium"),
    ("The swimming pool", "Leisure", "a swimming pool"),
    ("The tennis court", "Leisure", "a tennis court"),
    ("The football pitch", "Leisure", "a football field"),
    ("The running track", "Leisure", "a running track"),
    ("The climbing wall", "Leisure", "a climbing wall"),
    ("The skate park", "Leisure", "a skate park"),
    ("The campsite", "Leisure", "a campsite"),
    ("The trail", "Leisure", "a hiking trail"),
    ("The dock", "Travel", "a small dock"),
    ("The bus station", "Travel", "a bus station"),
    ("The subway", "Travel", "a subway station"),
    ("The taxi stand", "Travel", "taxis and a stand"),
    ("The petrol station", "Travel", "a fuel station"),
    ("The car wash", "Travel", "washing a car"),
    ("Traffic signs", "City", "traffic sign shapes with no writing"),
    ("The crosswalk", "City", "a pedestrian crossing"),
    ("The bridge", "City", "kinds of bridges"),
    ("The tower", "City", "towers and tall buildings"),
    ("The castle", "City", "parts of a castle"),
    ("The temple", "Holidays", "a temple courtyard"),
    ("The church", "Holidays", "a church interior"),
    ("The mosque", "Holidays", "a mosque courtyard"),
    ("The shrine", "Holidays", "a small shrine"),
    ("Festival food", "Holidays", "festival snacks"),
    ("Masks and costumes", "Holidays", "festival masks"),
    ("Lanterns", "Holidays", "lanterns and lights"),
    ("Gifts", "Holidays", "wrapped gifts"),
    ("The toy box", "Home", "toys"),
    ("The bookshelf", "Home", "books on a shelf"),
    ("The window", "Home", "a window and curtains"),
    ("The front door", "Home", "a front door and a mat"),
    ("The staircase", "Home", "stairs and a railing"),
    ("The basement", "Home", "a basement and storage"),
    ("The attic", "Home", "an attic"),
    ("The shed", "Home", "a garden shed"),
    ("The fence", "Home", "fences and gates"),
    ("The driveway", "Home", "a driveway and a garage door"),
    ("Houseplants on the sill", "Home", "pots on a windowsill"),
    ("The bird feeder", "Nature", "a bird feeder and birds"),
    ("The compost", "Nature", "a compost pile"),
    ("The greenhouse", "Nature", "inside a greenhouse"),
    ("The tool shed", "Making", "garden tools in a shed"),
    ("Painting supplies", "Leisure", "paints and brushes"),
    ("Clay and pottery", "Leisure", "clay, a wheel, and pots"),
    ("Wood carving", "Making", "carving tools and a block of wood"),
    ("Metalwork", "Making", "a vice, a file, and metal"),
    ("The sewing box", "Leisure", "a sewing box"),
    ("Knitting", "Leisure", "knitting needles and yarn"),
    ("The printer", "Technology", "a printer and paper"),
    ("The keyboard", "Technology", "a keyboard, a mouse, and a screen"),
    ("Cables and plugs", "Technology", "cables, plugs, and a charger"),
    ("Batteries and power", "Technology", "batteries, a plug, and a switch"),
    ("The robot arm", "Technology", "a simple robot and sensors"),
    ("The microscope", "Study", "a microscope and slides"),
    ("The telescope", "Space", "telescopes and a tripod"),
    ("Measuring tools", "Making", "rulers, calipers, and levels"),
    ("Fasteners", "Making", "nails, screws, bolts, and nuts"),
    ("The paint shop", "Making", "cans of paint and brushes"),
    ("The hardware store", "City", "shelves in a hardware store"),
    ("The bookshop", "City", "a bookshop"),
    ("The clothes shop", "City", "a clothes shop"),
    ("The shoe shop", "City", "a shoe shop"),
    ("The flower shop", "City", "a flower shop"),
    ("The bakery shop", "City", "a bakery shopfront"),
    ("The cafe", "Food", "a café counter"),
    ("The supermarket aisle", "Food", "a supermarket shelf"),
    ("The checkout", "City", "a checkout counter"),
    ("The kitchen garden", "Nature", "herbs in pots"),
    ("Dairy farm", "Animals", "cows, milk, and a barn"),
    ("The chicken coop", "Animals", "chickens and a coop"),
    ("The sheep pen", "Animals", "sheep and a pen"),
    ("The pigsty", "Animals", "pigs and a sty"),
    ("The fish farm", "Animals", "fish tanks on a farm"),
    ("The horse", "Animals", "a horse and its tack"),
    ("The dog", "Animals", "a dog and its things"),
    ("The cat", "Animals", "a cat and its things"),
    ("Small pets", "Animals", "hamsters, rabbits, and cages"),
    ("The aquarium tank", "Animals", "fish in a tank"),
    ("The birdcage", "Animals", "a pet bird and a cage"),
    ("Wild cats", "Animals", "wild cats"),
    ("Hoofed animals", "Animals", "deer, goats, and cattle in the wild"),
    ("Primates", "Animals", "monkeys and apes"),
    ("Rodents", "Animals", "mice, squirrels, and beavers"),
    ("Bears", "Animals", "kinds of bears"),
    ("Sea mammals", "Animals", "whales, dolphins, and seals"),
    ("Sharks and rays", "Animals", "sharks and rays"),
    ("Crabs and shells", "Animals", "crabs, shells, and snails"),
    ("Tropical fish", "Animals", "colorful reef fish"),
    ("Water birds", "Animals", "birds that live by water"),
    ("Birds of prey", "Animals", "eagles, owls, and falcons"),
    ("Garden birds", "Animals", "small birds in a garden"),
    ("Farm birds", "Animals", "chickens, ducks, and geese"),
    ("Night birds", "Animals", "owls and night birds"),
    ("Snakes", "Animals", "snakes in a safe educational drawing"),
    ("Lizards", "Animals", "lizards"),
    ("Frogs and toads", "Animals", "frogs and toads"),
    ("Turtles", "Animals", "turtles and tortoises"),
    ("Butterflies", "Animals", "butterflies and moths"),
    ("Bees and wasps", "Animals", "bees, wasps, and ants"),
    ("Beetles", "Animals", "beetles"),
    ("Spiders", "Animals", "spiders and webs"),
    ("Pond insects", "Animals", "insects at a pond"),
    ("Dinosaurs", "Animals", "different dinosaurs"),
    ("Fossils", "Nature", "fossils and a pick"),
    ("Rocks and minerals", "Nature", "rocks, crystals, and gems"),
    ("Soil and sand", "Nature", "soil, sand, clay, and pebbles"),
    ("Clouds", "Nature", "kinds of clouds"),
    ("Storms", "Nature", "storms seen from a safe distance"),
    ("The sun and shade", "Nature", "sun, shade, and a sundial"),
    ("Rain", "Nature", "rain, puddles, and an umbrella"),
    ("Snow and ice", "Nature", "snow, ice, and icicles"),
    ("Wind", "Nature", "wind and things it moves"),
    ("Spring", "Nature", "spring flowers and rain"),
    ("Summer", "Nature", "a summer day"),
    ("Autumn", "Nature", "autumn leaves"),
    ("Winter", "Nature", "a winter landscape"),
    ("The moon", "Space", "phases of the moon as drawings"),
    ("The planets", "Space", "planets as colored spheres"),
    ("A rocket launch", "Space", "a rocket and a launch pad"),
    ("An astronaut", "Space", "an astronaut and a suit"),
    ("The classroom board", "Study", "a board, chalk, and maps"),
    ("Math tools", "Study", "a ruler, a compass, and shapes"),
    ("The alphabet desk", "Study", "pens, letters as blocks, and paper"),
    ("The music class", "Study", "school music instruments"),
    ("The sports lesson", "Study", "school sports equipment"),
    ("The lunchroom", "Study", "a school cafeteria"),
    ("The school bus", "Study", "a school bus"),
    ("The locker", "Study", "a school locker"),
    ("Homework", "Study", "a desk with homework"),
    ("The experiment", "Study", "a simple science experiment set up"),
    ("The globe", "Study", "a globe and continents as a map object"),
    ("The first-aid kit", "Health", "a first-aid kit opened"),
    ("The waiting room", "Health", "a clinic waiting room"),
    ("The eye chart", "Health", "an eye exam, no readable letters"),
    ("The hearing test", "Health", "headphones and an ear"),
    ("The plaster cast", "Health", "a cast, a sling, and crutches"),
    ("The medicine cabinet", "Health", "a bathroom cabinet with soap, plasters, and bottles"),
    ("The ambulance", "Health", "an ambulance and a stretcher"),
    ("The nurse's station", "Health", "a nurse's desk"),
    ("The x-ray", "Health", "an x-ray light box and a bone picture"),
    ("The wheelchair", "Health", "a wheelchair and a ramp"),
    ("Baby animals", "Animals", "young animals"),
    ("Animal tracks", "Animals", "footprints and a trail"),
    ("The nest", "Animals", "birds' nests and eggs"),
    ("The burrow", "Animals", "a burrow and a rabbit"),
    ("The coral", "Nature", "coral shapes"),
    ("Seaweed and shells", "Nature", "seaweed and shells on sand"),
    ("The lighthouse", "Travel", "a lighthouse and rocks"),
    ("The windmill", "Nature", "a windmill"),
    ("The dam", "Nature", "a dam and a reservoir"),
    ("The waterfall", "Nature", "a waterfall"),
    ("The canyon", "Nature", "a canyon"),
    ("The dune", "Nature", "sand dunes"),
    ("The meadow", "Nature", "a meadow of flowers"),
    ("The hedge", "Nature", "a hedge and a gate"),
    ("The vineyard", "Nature", "grape vines"),
    ("The rice field", "Nature", "a rice field"),
    ("The wheat field", "Nature", "a wheat field"),
    ("Harvest", "Nature", "harvest baskets and tools"),
    ("The mill", "Work", "a mill and grain"),
    ("The well", "Nature", "a well and a bucket"),
    ("The campfire", "Leisure", "a campfire and seating"),
    ("The tent", "Leisure", "a tent and pegs"),
    ("The backpack", "Travel", "an open backpack"),
    ("The suitcase", "Travel", "a packed suitcase"),
    ("The passport desk", "Travel", "a passport and a boarding pass"),
    ("The hotel lobby", "Travel", "a hotel lobby"),
    ("The buffet", "Food", "a buffet table"),
    ("Street food", "Food", "street-food stalls"),
    ("The ice cream shop", "Food", "ice cream and toppings"),
    ("The juice bar", "Food", "fruit juice and blenders"),
    ("The picnic basket", "Food", "a picnic basket"),
    ("The lunch box", "Food", "a lunch box"),
    ("The spice market", "Food", "a spice market"),
    ("The fish market", "Food", "a fish market"),
    ("The cheese counter", "Food", "cheeses"),
    ("The candy shop", "Food", "candy in jars"),
    ("The noodle bowl", "Food", "noodle dishes"),
    ("The soup pot", "Food", "soups"),
    ("The salad bowl", "Food", "salads"),
    ("The grill", "Food", "a grill and skewers"),
    ("The baking tray", "Food", "cookies on a tray"),
    ("The teapot", "Food", "tea things"),
    ("The coffee pot", "Food", "coffee things"),
]

BANNED = {
    "drug", "drugs", "breast", "cancer", "nude", "naked", "penis", "vagina", "genital", "genitals",
    "porn", "suicide", "corpse", "gore", "blood", "murder", "gun", "rifle", "pistol", "bomb", "missile",
    "weapon", "weapons", "funeral", "coffin",
}


def chat(prompt: str) -> str:
    body = {
        "model": "grok-4-fast-non-reasoning",
        "temperature": 0.2,
        "messages": [{"role": "user", "content": prompt}],
    }
    req = urllib.request.Request(
        "https://api.x.ai/v1/chat/completions",
        data=json.dumps(body).encode(),
        headers={"Authorization": f"Bearer {os.environ['XAI_API_KEY']}", "Content-Type": "application/json"},
    )
    last = ""
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=90) as res:
                data = json.loads(res.read().decode())
            return data["choices"][0]["message"]["content"]
        except Exception as err:
            last = str(err)[:180]
            time.sleep(1 + attempt)
    raise RuntimeError(last)


def pictured_and_course() -> tuple[set[str], dict[str, str]]:
    import re as _re
    text = (ROOT / "src/data/pictures.ts").read_text().split("...PICTURE_SETS")[0]
    pictured = {w.strip().lower() for w in _re.findall(r'en:\s*"([^"]+)"', text)}
    sets = json.loads((ROOT / "src/data/picture-sets.ts").read_text().split("=", 1)[1].rsplit(";", 1)[0])
    for plate in sets:
        for word in plate["words"]:
            pictured.add(word.strip().lower())
    course: dict[str, str] = {}
    for level in ("a1", "a2", "b1", "b2"):
        for row in json.loads((ROOT / "public/course/ready" / f"{level}.json").read_text()):
            if row.get("kind") not in (None, "word"):
                continue
            en = str(row.get("en", "")).strip()
            if en:
                course.setdefault(en.lower(), en)
    return pictured, course


def clean_lines(text: str) -> list[str]:
    out = []
    for line in text.splitlines():
        line = re.sub(r"^[\d\.\)\-\*\s]+", "", line).strip().strip('"').strip("'")
        line = re.sub(r"\s+", " ", line)
        if not line or ":" in line or len(line) > 32:
            continue
        if not re.match(r"^[A-Za-z][A-Za-z' \-]*$", line):
            continue
        out.append(line)
    return out


def fetch(topic: tuple[str, str, str]) -> tuple[str, str, list[str]]:
    title, section, hint = topic
    prompt = (
        f"List 70 different concrete English headwords for a picture dictionary plate titled \"{title}\". "
        f"Theme: {hint}. "
        "Each headword is 1 to 3 words, a thing or a person a child can point at in a drawing. "
        "No sentences, no numbers, no brands, no abstract nouns, no duplicates. "
        "One headword per line."
    )
    return title, section, clean_lines(chat(prompt))


def main() -> None:
    pictured, course = pictured_and_course()
    print("pictured", len(pictured), "course", len(course), "topics", len(TOPICS), flush=True)
    results = []
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = [pool.submit(fetch, topic) for topic in TOPICS]
        done = 0
        for fut in as_completed(futures):
            results.append(fut.result())
            done += 1
            if done % 20 == 0:
                print("fetched", done, flush=True)
    order = {title: i for i, (title, _, _) in enumerate(TOPICS)}
    results.sort(key=lambda item: order[item[0]])
    used = set(pictured)
    plates = []
    new_words = []
    linked = []
    for title, section, words in results:
        picked = []
        for word in words:
            key = word.lower()
            if key in used or key in BANNED:
                continue
            if any(part in BANNED for part in key.split()):
                continue
            canonical = course.get(key, word.lower())
            picked.append(canonical)
            used.add(key)
            (linked if key in course else new_words).append(canonical)
            if len(picked) == 50:
                break
        # emit full plates of 25 only
        n = 0
        while len(picked) >= 25:
            chunk = picked[:25]
            picked = picked[25:]
            n += 1
            name = title if n == 1 else f"{title} {n}"
            plates.append({
                "title": name,
                "section": section,
                "words": chunk,
            })
    Path("/tmp/topic_plates.json").write_text(json.dumps(plates, ensure_ascii=False, indent=2))
    Path("/tmp/topic_new_words.json").write_text(json.dumps(sorted(set(new_words)), ensure_ascii=False, indent=2))
    print("plates", len(plates), "words", sum(len(p["words"]) for p in plates), "new", len(set(new_words)), "linked", len(linked))


if __name__ == "__main__":
    main()
