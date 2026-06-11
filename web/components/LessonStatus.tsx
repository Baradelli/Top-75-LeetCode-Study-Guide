"use client";

import { isLessonDone, useProgress } from "@/lib/progress";

/**
 * Marca de status de uma aula (✓ concluída / ○ pendente), usada na lista de
 * aulas da página da seção. Lê o progresso do localStorage; no servidor e no
 * primeiro render mostra o estado pendente (evita mismatch de hidratação).
 */
export default function LessonStatus({
  section,
  lesson,
}: {
  section: string;
  lesson: string;
}) {
  const progress = useProgress();
  const done = isLessonDone(progress, section, lesson);

  return (
    <span
      aria-label={done ? "Concluída" : "Pendente"}
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs ${
        done
          ? "border-emerald-500 bg-emerald-500 text-white"
          : "border-zinc-300 text-transparent dark:border-zinc-700"
      }`}
    >
      ✓
    </span>
  );
}
