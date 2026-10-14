import { useEffect, useState } from "react";

/** Real photographs. A card picks one at random each time that picture opens. */
const VARIANTS: Record<string, number> = {
  woman: 4,
  man: 4,
};

function pick(src: string) {
  const count = VARIANTS[src];
  if (!count) return src;
  return `${src}-${1 + Math.floor(Math.random() * count)}`;
}

export function Plate({ src, alt }: { src: string; alt: string }) {
  const [file, setFile] = useState(() => pick(src));
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setFile(pick(src));
    setFailed(false);
  }, [src]);
  if (failed) {
    return (
      <div className="grid h-full w-full place-items-center bg-chip px-6 text-center">
        <p className="font-display text-3xl text-muted">{alt}</p>
      </div>
    );
  }
  return (
    <img
      src={`/cards/${file}.jpg?v=4`}
      alt={alt}
      decoding="async"
      fetchPriority="high"
      className="h-full w-full object-contain"
      onError={() => {
        if (file !== src) setFile(src);
        else setFailed(true);
      }}
    />
  );
}
