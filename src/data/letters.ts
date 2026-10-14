export type LetterItem = {
  glyph: string;
  name: string;
  sound: string;
  word: string;
  gloss: string;
  reading?: string;
  radical?: string;
  traditional?: string;
  simplified?: string;
  note?: string;
  section?: string;
};

export type LetterGroup = { id: string; name: string; items: LetterItem[] };

export type LetterChart = { note: string; groups: LetterGroup[] };

let pending: Promise<Record<string, LetterChart>> | null = null;

export function loadAlphabets(): Promise<Record<string, LetterChart>> {
  if (!pending) {
    pending = fetch("/letters/alphabets.json")
      .then((response) => {
        if (!response.ok) throw new Error("letters");
        return response.json() as Promise<Record<string, LetterChart>>;
      })
      .catch((error) => {
        pending = null;
        throw error;
      });
  }
  return pending;
}
