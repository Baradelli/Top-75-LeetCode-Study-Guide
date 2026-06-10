import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { getLessons, getSection, LESSONS } from "@/lib/sections";
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
  const lesson = getLessons(sectionSlug).find((l) => l.slug === lessonSlug);
  if (!section || !lesson) notFound();

  const Content = await loadLessonContent(locale, sectionSlug, lessonSlug);
  if (!Content) notFound();

  const strings = t(locale);

  return (
    <article>
      <Link
        href={`/${locale}/${sectionSlug}`}
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
    </article>
  );
}
