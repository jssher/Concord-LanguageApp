import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/concord/shell";

export const Route = createFileRoute("/credits")({ component: CreditsPage });

const SOURCES = [
  {
    title: "Stroke outlines",
    body: "Copyright © 1999 Arphic Technology Co., Ltd. Copyright © 2016 Shaunak Kishore, Make Me a Hanzi. The outlines may be used freely, including commercially, under the Arphic Public License, as long as this notice stays with them. The animation that draws them is original and needs no credit.",
    href: "http://ftp.gnu.org/non-gnu/chinese-fonts-truetype/LICENSE",
    link: "Arphic Public License",
  },
  {
    title: "Character dictionary",
    body: "Radicals and some short meanings come from Make Me a Hanzi dictionary.txt, derived from Unihan and CJKlib. That file is under the GNU Lesser General Public License, version 3 or later.",
    href: "https://www.gnu.org/licenses/lgpl-3.0.html",
    link: "LGPL-3.0",
  },
  {
    title: "Mandarin list and readings",
    body: "The general-use character list and many Mandarin readings come from the general_standard_chinese project, under the Apache License 2.0.",
    href: "https://github.com/ben-hua/general_standard_chinese",
    link: "general_standard_chinese",
  },
  {
    title: "Cantonese readings",
    body: "Jyutping readings come from the Linguistic Society of Hong Kong pronunciation list, under Creative Commons Attribution 4.0.",
    href: "https://github.com/lshk-org/jyutping-table",
    link: "Jyutping table",
  },
  {
    title: "Japanese kanji",
    body: "Kanji readings and meanings come from KANJIDIC by the Electronic Dictionary Research and Development Group, under Creative Commons Attribution-ShareAlike 4.0. The JSON arrangement is from kanji-data by David Luz Gouveia, under the MIT License.",
    href: "https://www.edrdg.org/wiki/index.php/KANJIDIC_Project",
    link: "KANJIDIC",
  },
  {
    title: "Alphabet order",
    body: "The long Chinese and Japanese lists are ordered with frequency counts from FrequencyWords by Hermit Dave. Those lists are under Creative Commons Attribution-ShareAlike 4.0. The lists themselves are not shown.",
    href: "https://github.com/hermitdave/FrequencyWords",
    link: "FrequencyWords",
  },
];

function CreditsPage() {
  return (
    <Shell>
      <div className="mx-auto max-w-3xl px-4 py-8 md:px-6">
        <h1 className="font-display text-4xl">Credits</h1>
        <p className="mt-3 text-muted">
          These sources ask to be named. The pictures, the sentences, the Signal font, and the stroke animation do not.
        </p>
        <ul className="mt-8 grid gap-6">
          {SOURCES.map((source) => (
            <li key={source.title}>
              <h2 className="text-xl">{source.title}</h2>
              <p className="mt-1 text-muted">{source.body}</p>
              <a href={source.href} className="mt-1 inline-block text-accent" target="_blank" rel="noreferrer">
                {source.link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}
