import { useEffect, useState } from "react";

/** Numbered files are a random mix. Region files follow the language being studied. */
const VARIANTS: Record<string, number> = {
  woman: 6,
  man: 6,
  child: 4,
  friend: 4,
  family: 4,
  self: 20,
};

const PEOPLE = new Set(["woman", "man", "child", "family"]);

/** Where that language is most often spoken, one everyday portrait. */
const REGION: Record<string, string> = {
  en: "weu", de: "weu", gsw: "weu", "gsw-be": "weu", nl: "weu", da: "weu", is: "weu", ga: "weu", cy: "weu", fr: "weu", eu: "weu", rm: "weu",
  es: "seu", it: "seu", el: "seu", ro: "seu", sq: "seu", grc: "seu", la: "seu",
  ru: "eeu", uk: "eeu", pl: "eeu", cs: "eeu", sk: "eeu", hr: "eeu", sr: "eeu", bg: "eeu", sl: "eeu", mk: "eeu", hy: "eeu", ka: "eeu",
  pt: "bra",
  ar: "mena", fa: "mena", he: "mena", tr: "mena", ber: "mena", arc: "mena",
  hi: "sas", ur: "sas", bn: "sas", mr: "sas", gu: "sas",
  ta: "dra", te: "dra", ml: "dra",
  ja: "ja",
  zh: "zh", yue: "zh",
  ko: "ko",
  yo: "waf", ig: "waf", ha: "waf", ff: "waf",
  sw: "eaf", am: "eaf", so: "eaf", ln: "eaf",
};

function mix(src: string) {
  const count = VARIANTS[src];
  if (!count) return src;
  return `${src}-${1 + Math.floor(Math.random() * count)}`;
}

function pick(src: string, lang?: string) {
  const region = lang ? REGION[lang] : undefined;
  if (region && PEOPLE.has(src)) return `${src}-${region}`;
  return mix(src);
}

export function Plate({ src, alt, lang }: { src: string; alt: string; lang?: string }) {
  const [file, setFile] = useState(src);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setFile(pick(src, lang));
    setFailed(false);
  }, [src, lang]);
  if (failed) {
    return (
      <div className="grid h-full w-full place-items-center bg-chip px-6 text-center">
        <p className="font-display text-3xl text-muted">{alt}</p>
      </div>
    );
  }
  return (
    <img
      src={`/cards/${file}.jpg?v=10`}
      alt={alt}
      decoding="async"
      fetchPriority="high"
      className="h-full w-full object-contain"
      onError={() => {
        if (file !== src && !file.startsWith(`${src}-`)) {
          setFailed(true);
          return;
        }
        if (file.includes("-") && file !== src) setFile(src);
        else setFailed(true);
      }}
    />
  );
}
