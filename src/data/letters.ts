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

const charts = new Map<string, Promise<LetterChart>>();

/** One alphabet at a time. Chinese and Japanese stay out of the first load. */
export function loadAlphabet(id: string): Promise<LetterChart> {
  let pending = charts.get(id);
  if (!pending) {
    pending = fetch(`/letters/charts/${id}.json`)
      .then((response) => {
        if (!response.ok) throw new Error("letters");
        return response.json() as Promise<LetterChart>;
      })
      .catch((error) => {
        charts.delete(id);
        throw error;
      });
    charts.set(id, pending);
  }
  return pending;
}
