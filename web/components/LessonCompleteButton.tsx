"use client";

import { useLessonComplete } from "@/lib/progress";
import { t, type Locale } from "@/lib/i18n";

export default function LessonCompleteButton({
  locale,
  section,
  lesson,
}: {
  locale: Locale;
  section: string;
  lesson: string;
}) {
  const { isComplete, setComplete } = useLessonComplete(section, lesson);
  const strings = t(locale);

  return (
    <button
      onClick={() => setComplete(!isComplete)}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
        isComplete
          ? "bg-emerald-600 text-white hover:bg-emerald-500"
          : "border border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
      }`}
    >
      {isComplete ? strings.completed : strings.markComplete}
    </button>
  );
}
