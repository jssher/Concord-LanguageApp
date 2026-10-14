const BLOCKED = new Set([
  "fuck", "fucker", "fucking", "fucked", "fck", "fuk", "fuq", "motherfucker",
  "shit", "shithead", "shitty", "sht", "bullshit",
  "bitch", "bitches", "btch",
  "cunt", "asshole", "arsehole", "ass", "bastard",
  "dickhead", "cocksucker", "piss", "slut", "whore", "whorehouse",
  "porn", "nude", "nudes", "xxx",
  "nigger", "nigga", "niga", "fag", "faggot", "faget", "dyke", "tranny",
  "retard", "retarded", "kike", "spic", "chink", "gook", "wetback", "paki",
  "raghead", "towelhead", "nazi", "hitler", "rape", "rapist", "raping", "raper",
]);

const EMBEDDED = ["nigger", "nigga", "faggot", "hitler"];

const RESERVED = new Set([
  "admin", "concord", "support", "moderator", "grok", "official", "system",
  "league", "staff", "help", "root", "team",
]);

export type Parsed = { ok: true; value: string } | { ok: false; error: string };

function fold(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/0/g, "o")
    .replace(/1/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/5/g, "s")
    .replace(/7/g, "t")
    .replace(/@/g, "a")
    .replace(/\$/g, "s");
}

function tokens(input: string): string[] {
  return fold(input).split(/[^a-z]+/).filter(Boolean);
}

function disrespectful(input: string): boolean {
  const parts = tokens(input);
  const joined = parts.join("");
  if (EMBEDDED.some((word) => joined.includes(word))) return true;
  return parts.some((part) => BLOCKED.has(part));
}

function latinShape(word: string): boolean {
  const plain = word.normalize("NFKD").replace(/\p{M}/gu, "");
  if (/[^\p{L}'’.-]/u.test(plain)) return false;
  const latin = plain.replace(/[^A-Za-z]/g, "");
  if (!latin) return true;
  if (latin.length >= 4 && !/[aeiouy]/i.test(latin)) return false;
  if (/(.)\1{3,}/i.test(latin)) return false;
  return true;
}

export function parseName(raw: string): Parsed {
  const name = raw.trim().replace(/\s+/g, " ");
  if (name.length < 2 || name.length > 40) {
    return { ok: false, error: "Use a name of at least two letters." };
  }
  if (!/^[\p{L}][\p{L}'’.-]{0,19}(?: [\p{L}][\p{L}'’.-]{0,19}){0,3}$/u.test(name) || !/[\p{L}]$/u.test(name)) {
    return { ok: false, error: "Use a name people can read: letters, spaces, apostrophes, and hyphens." };
  }
  const words = name.split(" ");
  if (words.some((word) => !latinShape(word))) {
    return { ok: false, error: "Use a name people can read: letters, spaces, apostrophes, and hyphens." };
  }
  if (disrespectful(name)) return { ok: false, error: "Choose a respectful name." };
  return { ok: true, value: name };
}

export function parseHandle(raw: string): Parsed {
  const handle = raw.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z-]/g, "");
  if (!/^[a-z](?:[a-z]|-(?!-))*[a-z]$/.test(handle) || handle.length < 3 || handle.length > 24) {
    return { ok: false, error: "Use a short link in Latin letters, like mina-okonkwo." };
  }
  if (!/[aeiouy]/.test(handle)) {
    return { ok: false, error: "Use a short link in Latin letters, like mina-okonkwo." };
  }
  if (RESERVED.has(handle)) return { ok: false, error: "That link is reserved." };
  if (disrespectful(handle)) return { ok: false, error: "Choose a respectful link." };
  return { ok: true, value: handle };
}

export function suggestHandle(name: string): string {
  const latin = name.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase();
  const slug = latin.replace(/[^a-z]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 24).replace(/-+$/g, "");
  const parsed = parseHandle(slug);
  return parsed.ok ? parsed.value : "";
}
