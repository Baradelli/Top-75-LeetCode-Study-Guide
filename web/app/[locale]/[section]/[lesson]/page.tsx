import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { getLessons, getSection, LESSONS } from "@/lib/sections";
import { getExam } from "@/lib/exams";
import { DEFAULT_LOCALE, isLocale, LOCALES, t } from "@/lib/i18n";
import LessonCompleteButton from "@/components/LessonCompleteButton";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    Object.entries(LESSONS).flatMap(([section, lessons]) =>
      lessons.map((lesson) => ({ locale, section, lesson: lesson.slug })),
    ),
  );
}

export const dynamicParams = false;

/**
 * Carrega o MDX da aula no idioma pedido; enquanto a tradução EN não existe,
 * cai no conteúdo em PT (decisão do PLAN.md: PT primeiro, EN depois).
 */
async function loadLessonContent(
  locale: string,
  section: string,
  lesson: string,
): Promise<ComponentType | null> {
  try {
    const mod = await import(`@/content/${locale}/${section}/${lesson}.mdx`);
    return mod.default;
  } catch {
    if (locale === DEFAULT_LOCALE) return null;
    try {
      const fallback = await import(
        `@/content/${DEFAULT_LOCALE}/${section}/${lesson}.mdx`
      );
      return fallback.default;
    } catch {
      return null;
    }
  }
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ locale: string; section: string; lesson: string }>;
}) {
  const { locale, section: sectionSlug, lesson: lessonSlug } = await params;
  if (!isLocale(locale)) notFound();
  const section = getSection(sectionSlug);
  const lessons = getLessons(sectionSlug);
  const lessonIndex = lessons.findIndex((l) => l.slug === lessonSlug);
  const lesson = lessons[lessonIndex];
  if (!section || !lesson) notFound();

  const Content = await loadLessonContent(locale, sectionSlug, lessonSlug);
  if (!Content) notFound();

  const strings = t(locale);

  // Navegação: aula anterior, próxima aula e — na última aula — a prova final.
  const prev = lessonIndex > 0 ? lessons[lessonIndex - 1] : null;
  const next =
    lessonIndex < lessons.length - 1 ? lessons[lessonIndex + 1] : null;
  const isLast = lessonIndex === lessons.length - 1;
  const hasExam = Boolean(getExam(sectionSlug));

  const base = `/${locale}/${sectionSlug}`;

  return (
    <article>
      <Link
        href={base}
        className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        {strings.backToSection}
      </Link>

      <div className="lesson-content mt-4">
        <Content />
      </div>

      <div className="mt-10 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <LessonCompleteButton
          locale={locale}
          section={sectionSlug}
          lesson={lessonSlug}
        />
      </div>

      <nav className="mt-8 flex flex-col gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:items-stretch dark:border-zinc-800">
        {prev ? (
          <Link
            href={`${base}/${prev.slug}`}
            className="group flex flex-1 flex-col rounded-xl border border-zinc-200 p-4 transition hover:border-emerald-500 dark:border-zinc-800 dark:hover:border-emerald-500"
          >
            <span className="text-xs text-zinc-500">← {strings.prevLesson}</span>
            <span className="mt-1 font-medium group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div className="hidden flex-1 sm:block" />
        )}

        {next ? (
          <Link
            href={`${base}/${next.slug}`}
            className="group flex flex-1 flex-col rounded-xl border border-zinc-200 p-4 text-right transition hover:border-emerald-500 dark:border-zinc-800 dark:hover:border-emerald-500"
          >
            <span className="text-xs text-zinc-500">{strings.nextLesson} →</span>
            <span className="mt-1 font-medium group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
              {next.title}
            </span>
          </Link>
        ) : isLast && hasExam ? (
          <Link
            href={`${base}/prova`}
            className="group flex flex-1 flex-col rounded-xl border-2 border-dashed border-amber-400 p-4 text-right transition hover:border-amber-500 dark:border-amber-700"
          >
            <span className="text-xs text-amber-600 dark:text-amber-400">
              🏁 {strings.goToExam} →
            </span>
            <span className="mt-1 font-medium group-hover:text-amber-600 dark:group-hover:text-amber-400">
              {section.title}
            </span>
          </Link>
        ) : (
          <div className="hidden flex-1 sm:block" />
        )}
      </nav>

      <div className="mt-4 text-center">
        <Link
          href={base}
          className="text-sm text-zinc-500 underline-offset-4 hover:text-zinc-900 hover:underline dark:hover:text-zinc-100"
        >
          {strings.allLessons}
        </Link>
      </div>
    </article>
  );
}
