import type { Entry, LangPack } from "./types";

const CYR: [string, string][] = [
  ["Ć", "Ц"],
  ["ć", "ц"],
  ["Đ", "Дж"],
  ["đ", "дж"],
  ["Ń", "Н"],
  ["ń", "н"],
  ["ȯ", "о"],
  ["ų", "у"],
  ["ę", "е"],
  ["Ė", "Е"],
  ["ė", "е"],
  ["Dž", "Дж"],
  ["DŽ", "ДЖ"],
  ["dž", "дж"],
  ["Lj", "Љ"],
  ["LJ", "Љ"],
  ["lj", "љ"],
  ["Nj", "Њ"],
  ["NJ", "Њ"],
  ["nj", "њ"],
  ["Č", "Ч"],
  ["č", "ч"],
  ["Š", "Ш"],
  ["š", "ш"],
  ["Ž", "Ж"],
  ["ž", "ж"],
  ["Ě", "Є"],
  ["ě", "є"],
  ["A", "А"],
  ["a", "а"],
  ["B", "Б"],
  ["b", "б"],
  ["C", "Ц"],
  ["c", "ц"],
  ["D", "Д"],
  ["d", "д"],
  ["E", "Е"],
  ["e", "е"],
  ["F", "Ф"],
  ["f", "ф"],
  ["G", "Г"],
  ["g", "г"],
  ["H", "Х"],
  ["h", "х"],
  ["I", "И"],
  ["i", "и"],
  ["J", "Ј"],
  ["j", "ј"],
  ["K", "К"],
  ["k", "к"],
  ["L", "Л"],
  ["l", "л"],
  ["M", "М"],
  ["m", "м"],
  ["N", "Н"],
  ["n", "н"],
  ["O", "О"],
  ["o", "о"],
  ["P", "П"],
  ["p", "п"],
  ["R", "Р"],
  ["r", "р"],
  ["S", "С"],
  ["s", "с"],
  ["T", "Т"],
  ["t", "т"],
  ["U", "У"],
  ["u", "у"],
  ["V", "В"],
  ["v", "в"],
  ["Y", "Ы"],
  ["y", "ы"],
  ["Z", "З"],
  ["z", "з"],
];

const GLAG: [string, string][] = [
  ["Дж", "ⰄⰆ"],
  ["дж", "ⰴⰶ"],
  ["Љ", "ⰎⰉ"],
  ["љ", "ⰾⰹ"],
  ["Њ", "ⰐⰉ"],
  ["њ", "ⱀⰹ"],
  ["Ы", "ⰟⰋ"],
  ["ы", "ⱏⰻ"],
  ["А", "Ⰰ"],
  ["а", "ⰰ"],
  ["Б", "Ⰱ"],
  ["б", "ⰱ"],
  ["В", "Ⰲ"],
  ["в", "ⰲ"],
  ["Г", "Ⰳ"],
  ["г", "ⰳ"],
  ["Д", "Ⰴ"],
  ["д", "ⰴ"],
  ["Е", "Ⰵ"],
  ["е", "ⰵ"],
  ["Є", "Ⱑ"],
  ["є", "ⱑ"],
  ["Ж", "Ⰶ"],
  ["ж", "ⰶ"],
  ["З", "Ⰸ"],
  ["з", "ⰸ"],
  ["И", "Ⰻ"],
  ["и", "ⰻ"],
  ["Ј", "Ⰹ"],
  ["ј", "ⰹ"],
  ["К", "Ⰽ"],
  ["к", "ⰽ"],
  ["Л", "Ⰾ"],
  ["л", "ⰾ"],
  ["М", "Ⰿ"],
  ["м", "ⰿ"],
  ["Н", "Ⱀ"],
  ["н", "ⱀ"],
  ["О", "Ⱁ"],
  ["о", "ⱁ"],
  ["П", "Ⱂ"],
  ["п", "ⱂ"],
  ["Р", "Ⱃ"],
  ["р", "ⱃ"],
  ["С", "Ⱄ"],
  ["с", "ⱄ"],
  ["Т", "Ⱅ"],
  ["т", "ⱅ"],
  ["У", "Ⱆ"],
  ["у", "ⱆ"],
  ["Ф", "Ⱇ"],
  ["ф", "ⱇ"],
  ["Х", "Ⱈ"],
  ["х", "ⱈ"],
  ["Ц", "Ⱌ"],
  ["ц", "ⱌ"],
  ["Ч", "Ⱍ"],
  ["ч", "ⱍ"],
  ["Ш", "Ⱎ"],
  ["ш", "ⱎ"],
];

function apply(map: [string, string][], input: string): string {
  let i = 0;
  let out = "";
  while (i < input.length) {
    let matched = false;
    for (const [from, to] of map) {
      if (input.startsWith(from, i)) {
        out += to;
        i += from.length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      out += input[i];
      i += 1;
    }
  }
  return out;
}

export function toCyrillic(input: string): string {
  return apply(CYR, input);
}

export function toGlagolitic(input: string): string {
  return apply(GLAG, toCyrillic(input));
}

function mapEntry(entry: Entry, fn: (s: string) => string): Entry {
  const next: Entry = { word: fn(entry.word), sentence: fn(entry.sentence) };
  if (entry.article) next.article = fn(entry.article);
  if (entry.gender) next.gender = entry.gender;
  if (entry.plural) next.plural = fn(entry.plural);
  if (entry.feminine) next.feminine = fn(entry.feminine);
  if (entry.masculine) next.masculine = fn(entry.masculine);
  if (entry.neuter) next.neuter = fn(entry.neuter);
  if (entry.reading) next.reading = entry.reading;
  if (entry.note) next.note = entry.note;
  return next;
}

export function scriptPack(pack: LangPack, fn: (s: string) => string): LangPack {
  const entries: Record<string, Entry> = {};
  for (const [id, entry] of Object.entries(pack.entries)) entries[id] = mapEntry(entry, fn);
  const lines: Record<string, string> = {};
  for (const [id, line] of Object.entries(pack.lines)) lines[id] = fn(line);
  return { entries, lines };
}
