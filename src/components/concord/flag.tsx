const FLAGS: Record<string, string> = {
  en: "🇺🇸",
  de: "🇩🇪",
  nl: "🇳🇱",
  da: "🇩🇰",
  is: "🇮🇸",
  gsw: "🇨🇭",
  es: "🇪🇸",
  fr: "🇫🇷",
  pt: "🇧🇷",
  it: "🇮🇹",
  ro: "🇷🇴",
  ga: "🇮🇪",
  cy: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
  ru: "🇷🇺",
  uk: "🇺🇦",
  hr: "🇭🇷",
  sl: "🇸🇮",
  mk: "🇲🇰",
  bg: "🇧🇬",
  pl: "🇵🇱",
  cs: "🇨🇿",
  sk: "🇸🇰",
  sr: "🇷🇸",
  sq: "🇦🇱",
  ka: "🇬🇪",
  el: "🇬🇷",
  tr: "🇹🇷",
  zh: "🇨🇳",
  yue: "🇭🇰",
  ja: "🇯🇵",
  ko: "🇰🇷",
  hi: "🇮🇳",
  mr: "🇮🇳",
  bn: "🇧🇩",
  gu: "🇮🇳",
  ur: "🇵🇰",
  te: "🇮🇳",
  ta: "🇮🇳",
  ml: "🇮🇳",
  fa: "🇮🇷",
  ar: "🇸🇦",
  ber: "🇲🇦",
  he: "🇮🇱",
  am: "🇪🇹",
  hy: "🇦🇲",
  sw: "🇰🇪",
  ln: "🇨🇩",
  ig: "🇳🇬",
  yo: "🇳🇬",
  ha: "🇳🇬",
  ff: "🇸🇳",
  so: "🇸🇴",
  tl: "🇵🇭",
  th: "🇹🇭",
  vi: "🇻🇳",
  id: "🇮🇩",
  mg: "🇲🇬",
  qu: "🇵🇪",
  gn: "🇵🇾",
};

export function Flag({ id, className = "" }: { id: string; className?: string }) {
  if (id === "eo") return <Esperanto className={className} />;
  if (id === "isv") return <Interslavic className={className} />;
  if (id === "arc") return <Aramaic className={className} />;
  if (id === "la") return <Latin className={className} />;
  if (id === "grc") return <AncientGreek className={className} />;
  if (id === "egy") return <Egyptian className={className} />;
  if (id === "haw") return <Hawaiian className={className} />;
  if (id === "eu") return <Basque className={className} />;
  if (id === "tok") return <TokiPona className={className} />;
  if (id === "aur") return <Aurali className={className} />;
  if (id === "sig") return <Signal className={className} />;
  return (
    <span className={`inline-block text-[1.05rem] leading-none ${className}`} aria-hidden>
      {FLAGS[id] ?? "🏳️"}
    </span>
  );
}

function Signal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={`inline-block h-3.5 w-5 rounded-[2px] ${className}`} aria-hidden>
      <rect width="20" height="14" fill="var(--color-ink)" />
      <path d="M2 10.5c1.4-3 2.6-3 4 0s2.6 3 4 0 2.6-3 4 0 2.4 3 4 0" fill="none" stroke="var(--color-moss)" strokeWidth="1.2" />
      <circle cx="6" cy="4.2" r="1" fill="var(--color-paper)" />
      <circle cx="14" cy="4.2" r="1" fill="var(--color-accent)" />
    </svg>
  );
}

function Esperanto({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={`inline-block h-3.5 w-5 rounded-[2px] ${className}`} aria-hidden>
      <rect width="20" height="14" fill="#0b7a3b" />
      <rect width="8" height="14" fill="#fff" />
      <polygon points="4,2.2 4.7,4.3 6.9,4.3 5.1,5.6 5.8,7.8 4,6.5 2.2,7.8 2.9,5.6 1.1,4.3 3.3,4.3" fill="#0b7a3b" />
    </svg>
  );
}

function Interslavic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={`inline-block h-3.5 w-5 rounded-[2px] ${className}`} aria-hidden>
      <path d="M0 0L10 7 20 0" fill="#002288" />
      <path d="M0 14L10 7 20 14" fill="#dd2233" />
      <path d="M0 0V14L10 7" fill="#ffdd00" />
      <path d="M20 14L10 7 20 0" fill="#fff" />
    </svg>
  );
}

function Aramaic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={`inline-block h-3.5 w-5 rounded-[2px] ${className}`} aria-hidden>
      <rect width="20" height="14" fill="#1e3a5f" />
      <rect x="3" y="2" width="14" height="10" rx="1" fill="#f4e2b8" />
      <path d="M6 5.2h8M6 7h6.5M6 8.8h7" stroke="#1e3a5f" strokeWidth="1" />
    </svg>
  );
}

function AncientGreek({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={`inline-block h-3.5 w-5 rounded-[2px] ${className}`} aria-hidden>
      <rect width="20" height="14" fill="#c45c26" />
      <path d="M4 11V3h5.2c1.7 0 2.7.9 2.7 2.2 0 1-.6 1.7-1.5 2 .9.2 1.6 1.1 1.6 2.2 0 1.5-1.2 2.4-3 2.4H4z" fill="#1c1915" />
      <path d="M6.2 4.5h2.6c.7 0 1.1.3 1.1.9s-.4.9-1.1.9H6.2V4.5zm0 3h3c.8 0 1.2.4 1.2 1s-.5 1-1.3 1H6.2v-2z" fill="#c45c26" />
    </svg>
  );
}

function Egyptian({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={`inline-block h-3.5 w-5 rounded-[2px] ${className}`} aria-hidden>
      <rect width="20" height="14" fill="#1e3a5f" />
      <circle cx="10" cy="7" r="2.3" fill="#e4c36a" />
      <path d="M10 2.2v1.3M10 10.5v1.3M4.6 7H3.3M16.7 7H15.4M5.6 4.2l.9.9M13.5 8.9l.9.9M14.4 4.2l-.9.9M6.5 8.9l-.9.9" stroke="#e4c36a" strokeWidth="0.7" />
    </svg>
  );
}

function Latin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={`inline-block h-3.5 w-5 rounded-[2px] ${className}`} aria-hidden>
      <rect width="20" height="14" fill="#7a1c2e" />
      <rect x="1.3" y="1.3" width="17.4" height="11.4" fill="none" stroke="#e4c36a" strokeWidth="1.1" />
      <circle cx="10" cy="7" r="2" fill="none" stroke="#e4c36a" strokeWidth="1" />
    </svg>
  );
}

function Hawaiian({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={`inline-block h-3.5 w-5 rounded-[2px] ${className}`} aria-hidden>
      <rect width="20" height="1.75" fill="#fff" />
      <rect y="1.75" width="20" height="1.75" fill="#c8102e" />
      <rect y="3.5" width="20" height="1.75" fill="#012169" />
      <rect y="5.25" width="20" height="1.75" fill="#fff" />
      <rect y="7" width="20" height="1.75" fill="#c8102e" />
      <rect y="8.75" width="20" height="1.75" fill="#012169" />
      <rect y="10.5" width="20" height="1.75" fill="#fff" />
      <rect y="12.25" width="20" height="1.75" fill="#c8102e" />
      <rect width="8" height="7" fill="#012169" />
    </svg>
  );
}

function Basque({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={`inline-block h-3.5 w-5 rounded-[2px] ${className}`} aria-hidden>
      <rect width="20" height="14" fill="#d22630" />
      <path d="M0 0L20 14M20 0L0 14" stroke="#009b48" strokeWidth="3.4" />
      <path d="M10 0v14M0 7h20" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}

function TokiPona({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={`inline-block h-3.5 w-5 rounded-[2px] ${className}`} aria-hidden>
      <rect width="20" height="14" fill="#1f7a4d" />
      <circle cx="10" cy="7" r="3.1" fill="#fff" />
    </svg>
  );
}

function Aurali({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={`inline-block h-3.5 w-5 rounded-[2px] ${className}`} aria-hidden>
      <rect width="20" height="14" fill="var(--color-moss)" />
      <path d="M0 9.6c2.4-2.2 4.4-2.2 6.6 0s4.2 2.2 6.6 0 4-2.2 6.8 0V14H0z" fill="var(--color-paper)" />
      <circle cx="14.4" cy="4" r="1.55" fill="var(--color-accent)" />
    </svg>
  );
}
