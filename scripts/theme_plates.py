#!/usr/bin/env python3
"""Replace grab-bag picture plates with themed 5 by 5 groups."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path("/workspace")
SETS = ROOT / "src/data/picture-sets.ts"
PICTURES = ROOT / "public/pictures"

# Plates that are one subject already. Title overrides where the old name said "More".
RENAME = {
    "set-food-more-1": ("Spices and nuts", "Food"),
    "set-food-more-2": ("The bakery", "Food"),
    "set-food-food-and-drink-1-1": ("Meals and drinks", "Food"),
    "set-food-food-and-drink-2-2": ("The pantry", "Food"),
    "set-food-food-out-1": ("Eating out", "Food"),
    "set-home-more-objects-1": ("Kitchen gadgets", "Home"),
    "set-home-more-1": ("Kitchen tools", "Home"),
    "set-home-more-2": ("The bedroom", "Home"),
    "set-home-home-objects-1": ("Around the house", "Home"),
    "set-home-home-life-1": ("Laundry", "Home"),
    "set-home-hobbies-1-1": ("Crafts", "Leisure"),
    "set-clothes-more-1": ("Parts of clothes", "Clothes"),
    "set-nature-birds-and-animals-1-1": ("Landforms", "Landscapes"),
    "set-nature-birds-and-animals-2-2": ("The shore", "Landscapes"),
    "set-nature-birds-and-animals-3-3": ("Herds", "Animals"),
    "set-nature-birds-and-animals-4-4": ("Bright birds", "Animals"),
    "set-nature-garden-2-2": ("The beehive", "Nature"),
    "set-nature-more-1": ("The yard", "Nature"),
    "set-nature-environment-2-2": ("Coast weather", "Landscapes"),
    "set-making-more-1": ("The loom", "Making"),
    "set-making-pictures-1-1": ("The camera", "Leisure"),
    "set-making-pictures-2-2": ("The darkroom", "Leisure"),
    "set-work-useful-jobs-1-1": ("Old trades", "Work"),
    "set-work-useful-jobs-2-2": ("Metal and leather", "Work"),
    "set-work-useful-jobs-3-3": ("Office work", "Work"),
}

DROP_PREFIXES = ("set-more-",)
DROP_IDS = {
    "set-home-more-3",
    "set-home-more-4",
    "set-home-more-5",
    "set-home-more-6",
    "set-home-technology-2-2",
    "set-home-hobbies-2-2",
    "set-making-arts-3-3",
    "set-making-culture-1-1",
    "set-making-more-2",
    "set-workshop-more-1",
    "set-the-body-more-1",
    "set-nature-environment-1-1",
    "set-nature-more-2",
    "set-nature-more-3",
    "set-sky-sky-and-weather-2-2",
}

# Each theme lists more than 25 candidates. The first 25 that exist in the course and are not already pictured are kept.
THEMES: list[tuple[str, str, list[str]]] = [
    ("Garden birds", "Animals", [
        "sparrow", "robin", "swallow", "magpie", "starling", "crow", "dove", "pigeon", "woodpecker", "cuckoo",
        "finch", "blackbird", "wren", "thrush", "lark", "nightingale", "jay", "oriole", "cardinal", "chickadee",
        "nuthatch", "warbler", "kingfisher", "stork", "swift", "blue tit", "goldfinch", "bullfinch", "skylark", "rook",
        "jackdaw", "raven", "waxwing", "crossbill", "siskin",
    ]),
    ("Water birds", "Animals", [
        "seagull", "pelican", "heron", "egret", "crane", "stork", "swan", "goose", "cormorant", "albatross",
        "puffin", "gannet", "tern", "gull", "mallard", "flamingo", "ibis", "spoonbill", "avocet", "oystercatcher",
        "kingfisher", "grebe", "loon", "coot", "moorhen", "bittern", "sandpiper", "plover", "curlew", "snipe",
        "shearwater", "petrel", "booby", "frigatebird", "anhinga",
    ]),
    ("Birds of prey", "Animals", [
        "eagle", "falcon", "buzzard", "condor", "vulture", "owl", "hawk", "kestrel", "harrier", "osprey",
        "kite", "merlin", "gyrfalcon", "barn owl", "snowy owl", "eagle owl", "sparrowhawk", "goshawk", "secretary bird", "caracara",
        "hobby", "peregrine", "red kite", "black kite", "harpy eagle", "lammergeier", "bearded vulture", "griffon", "saker", "lanner",
    ]),
    ("Tropical birds", "Animals", [
        "parrot", "macaw", "toucan", "lorikeet", "cockatoo", "cockatiel", "parakeet", "budgerigar", "hornbill", "turaco",
        "bird of paradise", "quetzal", "motmot", "trogon", "sunbird", "hummingbird", "kingfisher", "flamingo", "ibis", "pelican",
        "myna", "weaver", "lovebird", "conure", "lory", "kea", "kakapo", "cassowary", "toucanet", "aracari",
    ]),
    ("Jungle animals", "Animals", [
        "monkey", "gorilla", "chimpanzee", "orangutan", "lemur", "sloth", "jaguar", "tapir", "toucan", "parrot",
        "python", "frog", "butterfly", "ant", "tiger", "leopard", "panther", "okapi", "capybara", "anteater",
        "armadillo", "macaw", "tree frog", "poison frog", "howler monkey", "spider monkey", "gibbon", "mandrill", "bushbaby", "pangolin",
        "crocodile", "snake", "iguana", "chameleon", "gecko",
    ]),
    ("Forest animals", "Animals", [
        "deer", "fox", "owl", "squirrel", "rabbit", "badger", "hedgehog", "boar", "moose", "elk",
        "wolf", "bear", "lynx", "marten", "stoat", "weasel", "woodpecker", "owl", "hare", "roe deer",
        "red deer", "wild boar", "pine marten", "red squirrel", "chipmunk", "raccoon", "porcupine", "skunk", "opossum", "beaver",
        "otter", "mink", "wolverine", "cougar", "bobcat",
    ]),
    ("Ocean life", "Animals", [
        "whale", "dolphin", "shark", "octopus", "squid", "jellyfish", "starfish", "seahorse", "crab", "lobster",
        "oyster", "seal", "walrus", "turtle", "coral", "anemone", "urchin", "ray", "manta", "eel",
        "tuna", "salmon", "cod", "herring", "sardine", "anchovy", "swordfish", "marlin", "barracuda", "clownfish",
        "penguin", "otter", "narwhal", "orca", "manatee",
    ]),
    ("Desert and arctic", "Animals", [
        "camel", "fennec", "scorpion", "rattlesnake", "meerkat", "oryx", "addax", "jerboa", "roadrunner", "vulture",
        "polar bear", "penguin", "seal", "walrus", "reindeer", "caribou", "arctic fox", "snowy owl", "puffin", "narwhal",
        "beluga", "lemming", "musk ox", "moose", "yak", "llama", "alpaca", "ibex", "chamois", "snow leopard",
    ]),
    ("Mountains", "Landscapes", [
        "mountain", "peak", "summit", "ridge", "cliff", "valley", "glacier", "avalanche", "crevasse", "moraine",
        "cirque", "scree", "talus", "alpine", "foothill", "pass", "gorge", "canyon", "plateau", "volcano",
        "crater", "lava", "boulder", "waterfall", "stream", "pine", "eagle", "ibex", "goat", "cabin",
        "hut", "trail", "compass", "backpack", "map",
    ]),
    ("The desert", "Landscapes", [
        "desert", "dune", "oasis", "cactus", "sand", "rock", "mirage", "wadi", "mesa", "butte",
        "playa", "salt flat", "arroyo", "scorpion", "camel", "lizard", "snake", "palm", "well", "caravan",
        "nomad", "tent", "sun", "heat", "shade", "thorn", "pebble", "dust", "wind", "horizon",
    ]),
    ("Rivers and lakes", "Landscapes", [
        "river", "lake", "stream", "waterfall", "delta", "estuary", "tributary", "bank", "current", "rapids",
        "oxbow", "marsh", "swamp", "lagoon", "reed", "lily", "duck", "heron", "fish", "frog",
        "bridge", "dam", "lock", "ferry", "canoe", "paddle", "island", "shore", "pebble", "mud",
        "willow", "alder", "otter", "beaver", "kingfisher",
    ]),
    ("The coast", "Landscapes", [
        "beach", "coast", "tide", "wave", "cliff", "dune", "sand", "shell", "pebble", "rock pool",
        "lighthouse", "harbour", "pier", "buoy", "seagull", "crab", "seaweed", "driftwood", "cove", "bay",
        "headland", "spit", "lagoon", "salt marsh", "boardwalk", "lifeguard", "towel", "bucket", "spade", "surf",
        "sailing", "yacht", "dock", "anchor", "rope",
    ]),
    ("Caves and stone", "Landscapes", [
        "cave", "cavern", "stalactite", "stalagmite", "limestone", "granite", "basalt", "marble", "slate", "quartz",
        "crystal", "fossil", "gem", "pebble", "boulder", "cliff", "quarry", "mine", "tunnel", "arch",
        "hoodoo", "pumice", "obsidian", "flint", "chalk", "sandstone", "shale", "gypsum", "mica", "feldspar",
    ]),
    ("Forest plants", "Nature", [
        "oak", "pine", "birch", "willow", "fern", "moss", "mushroom", "ivy", "lichen", "acorn",
        "pinecone", "twig", "leaf", "branch", "root", "bark", "trunk", "canopy", "understory", "sapling",
        "beech", "maple", "cedar", "spruce", "fir", "ash", "elm", "holly", "hazel", "chestnut",
        "bluebell", "bramble", "nettle", "foxglove", "honeysuckle",
    ]),
    ("Jungle plants", "Nature", [
        "vine", "orchid", "fern", "palm", "bamboo", "banana", "cacao", "rubber tree", "mahogany", "teak",
        "banyan", "epiphyte", "bromeliad", "liana", "moss", "canopy", "understory", "heliconia", "ginger", "pepper",
        "vanilla", "coconut", "mango", "papaya", "breadfruit", "kapok", "strangler", "fig", "rattan", "pitcher plant",
    ]),
    ("Wildflowers", "Nature", [
        "daisy", "rose", "tulip", "sunflower", "poppy", "violet", "lily", "iris", "daffodil", "bluebell",
        "foxglove", "lavender", "buttercup", "clover", "dandelion", "primrose", "snowdrop", "crocus", "hyacinth", "peony",
        "camellia", "azalea", "lilac", "jasmine", "honeysuckle", "edelweiss", "gentian", "lupine", "hollyhock", "pansy",
        "marigold", "aster", "heather", "thistle", "cornflower",
    ]),
    ("Camping", "Leisure", [
        "tent", "sleeping bag", "campfire", "compass", "backpack", "map", "flashlight", "lantern", "kettle", "mug",
        "blanket", "mat", "peg", "guyline", "stove", "match", "rope", "knife", "canteen", "trail",
        "hammock", "tarp", "pillow", "cooler", "axe", "hatchet", "whistle", "first aid", "binoculars", "notebook",
    ]),
    ("Beach day", "Leisure", [
        "towel", "umbrella", "bucket", "spade", "shell", "sandcastle", "sunscreen", "sunglasses", "hat", "swimsuit",
        "flip-flop", "surfboard", "wave", "beach ball", "picnic", "ice cream", "cooler", "chair", "mat", "snorkel",
        "mask", "fins", "lifeguard", "flag", "pier", "lilo", "kite", "frisbee", "sandal", "sunhat",
    ]),
    ("Picnic and play", "Leisure", [
        "picnic", "blanket", "basket", "sandwich", "apple", "lemonade", "kite", "frisbee", "ball", "football",
        "soccer", "tennis", "volleyball", "badminton", "shuttlecock", "swing", "slide", "seesaw", "sandbox", "skipping rope",
        "dice", "chessboard", "pawn", "checker", "card", "domino", "puzzle", "balloon", "bubble", "whistle",
    ]),
    ("A birthday", "Holidays", [
        "birthday", "cake", "candle", "balloon", "gift", "present", "card", "ribbon", "bow", "party",
        "hat", "streamer", "confetti", "icing", "frosting", "sprinkles", "plate", "cup", "napkin", "table",
        "song", "wish", "guest", "invitation", "wrapper", "toy", "clown", "banner", "sparkler", "juice",
    ]),
    ("A wedding", "Holidays", [
        "wedding", "bride", "groom", "ring", "veil", "bouquet", "church", "aisle", "altar", "vows",
        "guest", "invitation", "cake", "champagne", "toast", "dress", "suit", "flower", "ribbon", "confetti",
        "photographer", "music", "dance", "table", "chair", "candle", "rose", "pearl", "tiara", "carriage",
    ]),
    ("Winter holiday", "Holidays", [
        "snow", "snowman", "snowflake", "icicle", "wreath", "ornament", "candle", "gift", "stocking", "fireplace",
        "holly", "ivy", "bell", "star", "angel", "reindeer", "sleigh", "mitten", "scarf", "coat",
        "cocoa", "biscuit", "pudding", "carol", "lantern", "pine", "fir", "bauble", "ribbon", "card",
    ]),
    ("A festival", "Holidays", [
        "festival", "parade", "mask", "costume", "fireworks", "lantern", "drum", "banner", "flag", "float",
        "crowd", "stage", "music", "dance", "food stall", "ticket", "balloon", "confetti", "sparkler", "torch",
        "garland", "wreath", "ribbon", "trumpet", "choir", "fair", "tent", "booth", "prize", "ribbon",
    ]),
    ("The airport", "Travel", [
        "airport", "plane", "runway", "terminal", "passport", "luggage", "suitcase", "boarding pass", "ticket", "pilot",
        "crew", "gate", "lounge", "security", "customs", "trolley", "backpack", "map", "departure board", "arrival",
        "window seat", "aisle seat", "overhead bin", "seat belt", "tray table", "neck pillow", "suitcase tag", "passport control", "baggage claim", "conveyor",
    ]),
    ("The station", "Travel", [
        "station", "train", "platform", "ticket", "ticket machine", "timetable", "carriage", "compartment", "berth", "seat",
        "conductor", "whistle", "signal", "track", "tunnel", "bridge", "subway", "tram", "bus", "bus stop",
        "map", "bench", "clock", "kiosk", "luggage", "backpack", "delay", "announcement", "barrier", "turnstile",
    ]),
    ("Shops", "Places", [
        "bakery", "butcher", "market", "supermarket", "bookshop", "pharmacy", "florist", "boutique", "greengrocer", "kiosk",
        "stall", "counter", "till", "trolley", "basket", "receipt", "price", "shelf", "window", "sign",
        "baker", "cashier", "shop assistant", "customer", "bag", "scale", "queue", "barcode", "label", "purse",
    ]),
    ("Civic places", "Places", [
        "hospital", "library", "museum", "town hall", "post office", "police station", "fire station", "school", "university", "courthouse",
        "park", "square", "bridge", "fountain", "statue", "monument", "cemetery", "playground", "zoo", "stadium",
        "theater", "cinema", "church", "mosque", "temple", "synagogue", "castle", "palace", "cathedral", "tower",
    ]),
    ("The neighbourhood", "Places", [
        "street", "sidewalk", "crosswalk", "traffic light", "streetlight", "bench", "bin", "mailbox", "fence", "gate",
        "driveway", "garage", "garden", "hedge", "tree", "lamp", "sign", "corner", "alley", "square",
        "bus stop", "kiosk", "cafe", "bakery", "pharmacy", "bookshop", "playground", "school", "library", "park",
    ]),
    ("Kitchen jobs", "Work", [
        "chef", "cook", "baker", "butcher", "waiter", "waitress", "bartender", "dishwasher", "sous chef", "pastry chef",
        "barista", "sommelier", "fishmonger", "greengrocer", "farmer", "miller", "brewer", "vintner", "cheesemaker", "saucier",
        "dishwasher", "porter", "host", "cashier", "apprentice",
    ]),
    ("Building trades", "Work", [
        "carpenter", "plumber", "electrician", "painter", "mason", "roofer", "glazier", "plasterer", "stonemason", "joiner",
        "welder", "bricklayer", "tiler", "scaffolder", "surveyor", "architect", "foreman", "labourer", "crane driver", "decorator",
        "cabinetmaker", "thatcher", "blacksmith", "locksmith", "glazier",
    ]),
    ("Care work", "Work", [
        "doctor", "nurse", "dentist", "vet", "midwife", "paramedic", "surgeon", "pharmacist", "optician", "therapist",
        "physiotherapist", "dietitian", "doula", "carer", "orderly", "receptionist", "surgeon", "radiologist", "pediatrician", "dermatologist",
        "cardiologist", "orthodontist", "optometrist", "speech therapist", "first aider",
    ]),
    ("Town jobs", "Work", [
        "teacher", "librarian", "postman", "firefighter", "police officer", "driver", "pilot", "sailor", "farmer", "mechanic",
        "shop assistant", "cashier", "cleaner", "gardener", "barber", "hairdresser", "tailor", "cobbler", "jeweller", "photographer",
        "journalist", "actor", "singer", "dancer", "musician", "writer", "artist", "guide", "lifeguard", "soldier",
    ]),
    ("The office", "Work", [
        "desk", "chair", "computer", "keyboard", "screen", "mouse", "printer", "scanner", "phone", "lamp",
        "folder", "stapler", "paper", "pen", "notebook", "calendar", "clock", "meeting", "whiteboard", "coffee",
        "filing cabinet", "inbox", "envelope", "stamp", "scissors", "ruler", "clipboard", "badge", "drawer", "bin",
    ]),
    ("Classroom things", "Study", [
        "blackboard", "chalk", "desk", "chair", "book", "pencil", "pen", "eraser", "ruler", "notebook",
        "globe", "map", "calculator", "dictionary", "scissors", "glue", "crayon", "marker", "paper", "folder",
        "backpack", "clock", "bell", "shelf", "computer", "projector", "screen", "whiteboard", "atlas", "compass",
    ]),
    ("The bathroom", "Home", [
        "toilet", "sink", "shower", "bath", "towel", "soap", "mirror", "tap", "toothbrush", "toothpaste",
        "comb", "brush", "shampoo", "razor", "sponge", "mat", "shelf", "cabinet", "plug", "drain",
        "scale", "hamper", "robe", "slipper", "curtain", "tile", "hook", "bin", "tissue", "lotion",
    ]),
    ("The nursery", "Home", [
        "baby", "cot", "cradle", "pram", "stroller", "bottle", "dummy", "rattle", "teddy", "blanket",
        "nappy", "bib", "high chair", "mobile", "toy", "block", "ball", "book", "sock", "mitten",
        "pacifier", "crib", "changing table", "monitor", "night light", "onesie", "bootie", "lullaby", "story", "milk",
    ]),
    ("Sewing", "Leisure", [
        "needle", "thread", "thimble", "scissors", "pin", "button", "zipper", "hem", "seam", "fabric",
        "pattern", "tape measure", "iron", "ironing board", "bobbin", "spool", "ribbon", "lace", "yarn", "knitting needle",
        "crochet hook", "wool", "cotton", "silk", "linen", "felt", "bead", "sequin", "elastic", "snap",
    ]),
    ("Painting", "Leisure", [
        "brush", "paint", "palette", "canvas", "easel", "pencil", "charcoal", "sketchbook", "eraser", "paper",
        "watercolour", "oil paint", "acrylic", "ink", "pen", "ruler", "frame", "smock", "jar", "rag",
        "sponge", "knife", "crayon", "pastel", "marker", "stencil", "varnish", "primer", "turpentine", "linseed",
    ]),
    ("Board games", "Leisure", [
        "dice", "chessboard", "pawn", "checker", "card", "domino", "board", "token", "counter", "timer",
        "score", "puzzle", "jigsaw", "marble", "jack", "spinner", "board game", "king", "queen", "knight",
        "bishop", "rook", "checkerboard", "backgammon", "draughts", "solitaire", "deck", "suit", "joker", "chip",
    ]),
    ("Ball sports", "Leisure", [
        "football", "soccer", "basketball", "tennis", "volleyball", "baseball", "rugby", "cricket", "golf", "hockey",
        "bat", "ball", "racket", "net", "goal", "goalpost", "whistle", "jersey", "boot", "glove",
        "helmet", "shin pad", "scoreboard", "stadium", "court", "pitch", "medal", "trophy", "bib", "cone",
    ]),
    ("Winter sports", "Leisure", [
        "ski", "skiing", "skate", "skating", "ice skating", "sled", "sledge", "snowboard", "pole", "goggles",
        "helmet", "glove", "mitten", "scarf", "boot", "ice", "snow", "slope", "lift", "rink",
        "puck", "stick", "hockey", "ice hockey", "toboggan", "snowshoe", "anorak", "thermal", "balaclava", "ski pass",
    ]),
    ("The playground", "Leisure", [
        "swing", "slide", "seesaw", "sandbox", "climbing frame", "roundabout", "bench", "fence", "gate", "tree",
        "ball", "kite", "bicycle", "scooter", "helmet", "skipping rope", "hopscotch", "marble", "chalk", "puddle",
        "friend", "teacher", "parent", "dog", "bird", "flower", "bench", "bin", "path", "shadow",
    ]),
    ("Savanna animals", "Animals", [
        "lion", "elephant", "giraffe", "zebra", "hippo", "rhinoceros", "cheetah", "hyena", "wildebeest", "antelope",
        "gazelle", "buffalo", "ostrich", "vulture", "meerkat", "warthog", "baboon", "leopard", "crocodile", "flamingo",
        "termite", "acacia", "baobab", "herd", "watering hole", "dust", "sunset", "grass", "horn", "mane",
    ]),
    ("Pets", "Animals", [
        "dog", "cat", "puppy", "kitten", "rabbit", "hamster", "guinea pig", "goldfish", "parrot", "canary",
        "budgerigar", "turtle", "horse", "pony", "collar", "leash", "bowl", "basket", "kennel", "cage",
        "toy", "bone", "lead", "brush", "vet", "paw", "tail", "whisker", "fur", "bark",
    ]),
    ("Reptiles", "Animals", [
        "snake", "lizard", "crocodile", "alligator", "turtle", "tortoise", "gecko", "iguana", "chameleon", "python",
        "cobra", "viper", "rattlesnake", "frog", "toad", "newt", "salamander", "tadpole", "dragonfly", "scale",
        "shell", "claw", "fang", "tongue", "egg", "swamp", "rock", "log", "pond", "mosquito",
    ]),
    ("The farmyard", "Work", [
        "farmer", "barn", "tractor", "field", "fence", "gate", "hay", "straw", "trough", "coop",
        "stable", "saddle", "bridle", "milk", "egg", "wheat", "corn", "scarecrow", "pitchfork", "wheelbarrow",
        "sheepdog", "rooster", "hen", "chick", "duckling", "foal", "calf", "piglet", "lamb", "beehive",
    ]),
    ("The workshop bench", "Work", [
        "hammer", "nail", "screw", "saw", "drill", "chisel", "plane", "clamp", "vise", "mallet",
        "awl", "rasp", "file", "sandpaper", "pencil", "ruler", "square", "level", "tape measure", "glue",
        "workbench", "pegboard", "hook", "apron", "goggles", "glove", "dust", "wood", "dowel", "brad",
    ]),
]


def themes() -> list[tuple[str, str, list[str]]]:
    ns: dict = {}
    exec((ROOT / "scripts/theme_groups.py").read_text(), ns)
    return list(ns["THEMES"])


def course_index() -> dict[str, str]:
    found: dict[str, str] = {}
    for level in ("a1", "a2", "b1", "b2"):
        for row in json.loads((ROOT / "public/course/ready" / f"{level}.json").read_text()):
            if row.get("kind") not in (None, "word"):
                continue
            en = str(row.get("en", "")).strip()
            if en:
                found.setdefault(en.lower(), en)
    return found


def base_words() -> set[str]:
    text = (ROOT / "src/data/pictures.ts").read_text()
    chunk = text.split("...PICTURE_SETS")[0]
    words = {w.strip().lower() for w in re.findall(r'en:\s*"([^"]+)"', chunk)}
    words |= {w.strip().lower() for w in re.findall(r'"([A-Za-z][^"]{0,40})"', chunk) if "." not in w}
    return words


def load_sets() -> list[dict]:
    text = SETS.read_text()
    return json.loads(text.split("=", 1)[1].rsplit(";", 1)[0])


def slug(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-") or "plate"


def kept_plates(current: list[dict]) -> list[dict]:
    out = []
    for plate in current:
        if plate["id"].startswith(DROP_PREFIXES) or plate["id"] in DROP_IDS:
            continue
        title, section = RENAME.get(plate["id"], (plate["title"], plate["section"]))
        out.append({**plate, "title": title, "section": section, "blurb": "Twenty-five things. Tap one."})
    return out


def build(report: bool = True) -> list[dict]:
    known = course_index()
    used = base_words()
    plates = kept_plates(load_sets())
    for plate in plates:
        for word in plate["words"]:
            used.add(word.lower())
    new = []
    for title, section, candidates in themes():
        picked = []
        missing = []
        seen = set()
        for word in candidates:
            key = word.lower()
            if key in seen or key in used:
                continue
            if key not in known:
                missing.append(word)
                continue
            seen.add(key)
            picked.append(known[key])
            if len(picked) == 25:
                break
        if report:
            print(f"{title}: {len(picked)}/25  skipped {len(missing)} unknown")
            if len(picked) < 25:
                print("   have:", ", ".join(picked))
        if len(picked) == 25:
            for word in picked:
                used.add(word.lower())
            new.append({
                "id": "set-" + slug(f"{section}-{title}"),
                "title": title,
                "section": section,
                "blurb": "Twenty-five things. Tap one.",
                "words": picked,
            })
    # unique ids
    seen = {plate["id"] for plate in plates}
    for plate in new:
        ident = plate["id"]
        n = 2
        while ident in seen:
            ident = f"{plate['id']}-{n}"
            n += 1
        plate["id"] = ident
        seen.add(ident)
    return plates + new


def write(plates: list[dict]) -> None:
    SETS.write_text(
        "/** Themed plates. Words were already in the course. */\n"
        "export const PICTURE_SETS: { id: string; title: string; section: string; blurb: string; words: string[] }[] = \n"
        + json.dumps(plates, ensure_ascii=False, indent=2)
        + ";\n"
    )


if __name__ == "__main__":
    plates = build(True)
    new = [p for p in plates if p["title"] in {t[0] for t in themes()}]
    print("kept+new", len(plates), "words", sum(len(p["words"]) for p in plates), "new themes", len(new), "new words", sum(len(p["words"]) for p in new))
