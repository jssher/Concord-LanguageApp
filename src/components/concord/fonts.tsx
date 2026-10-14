import { useEffect } from "react";

const FACE: Record<string, string> = {
  el: "Noto Sans Greek:wght@500",
  grc: "Noto Sans Greek:wght@500",
  egy: "Noto Sans Egyptian Hieroglyphs",
  ja: "Noto Sans JP:wght@500",
  ko: "Noto Sans KR:wght@500",
  zh: "Noto Sans SC:wght@500",
  yue: "Noto Sans HK:wght@500",
  ar: "Noto Sans Arabic:wght@500",
  fa: "Noto Sans Arabic:wght@500",
  ur: "Noto Nastaliq Urdu:wght@400",
  he: "Noto Sans Hebrew:wght@500",
  am: "Noto Sans Ethiopic:wght@500",
  hi: "Noto Sans Devanagari:wght@500",
  mr: "Noto Sans Devanagari:wght@500",
  bn: "Noto Sans Bengali:wght@500",
  gu: "Noto Sans Gujarati:wght@500",
  te: "Noto Sans Telugu:wght@500",
  ta: "Noto Sans Tamil:wght@500",
  ml: "Noto Sans Malayalam:wght@500",
  th: "Noto Sans Thai:wght@500",
  hy: "Noto Sans Armenian:wght@500",
  ka: "Noto Sans Georgian:wght@500",
  arc: "Noto Sans Syriac:wght@400",
  isv: "Noto Sans Glagolitic:wght@400",
  ber: "Noto Sans Tifinagh:wght@400",
};

/** Loads typefaces only for the languages currently chosen. */
export function ScriptFonts({ ids }: { ids: string[] }) {
  const key = [...new Set(ids.map((id) => FACE[id]).filter(Boolean))].sort().join("|");
  useEffect(() => {
    if (!key) return;
    const families = key.split("|").map((face) => `family=${face.replace(/ /g, "+")}`);
    const href = `https://fonts.googleapis.com/css2?${families.join("&")}&display=swap`;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
    return () => link.remove();
  }, [key]);
  return null;
}
