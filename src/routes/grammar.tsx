import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GrammarCourseScreen } from "@/components/concord/grammar-course";
import { Shell } from "@/components/concord/shell";
import { grammarCourse } from "@/data/grammar-guide";
import { LANG_BY_ID } from "@/data/languages";
import { useConcord } from "@/lib/concord-store";

export const Route = createFileRoute("/grammar")({ component: GrammarPage });

function GrammarPage() {
  const focus = useConcord((s) => s.focus);
  const [langId, setLangId] = useState(focus || "en");
  const lang = LANG_BY_ID.get(langId) ?? LANG_BY_ID.get("en");
  if (!lang) return null;
  return (
    <Shell>
      <GrammarCourseScreen lang={lang} course={grammarCourse(lang.id)} onLanguage={setLangId} />
    </Shell>
  );
}
