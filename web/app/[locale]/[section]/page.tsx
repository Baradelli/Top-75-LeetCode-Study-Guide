import Link from "next/link";
import { notFound } from "next/navigation";
import { getLessons, getSection, SECTIONS } from "@/lib/sections";
import { getExam } from "@/lib/exams";
import { sectionExamSlugs, sectionLessonSlugs } from "@/lib/course";
import { CONTENT_EN, pick } from "@/lib/content-en";
import { isLocale, LOCALES, t } from "@/lib/i18n";
import LessonStatus from "@/components/LessonStatus";
import SectionProgress from "@/components/SectionProgress";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    SECTIONS.map((section) => ({ locale, section: section.slug })),
  );
}

export const dynamicParams = false;

export default async function SectionPage({
  params,
}: {
  params: Promise<{ locale: string; section: string }>;
}) {
  const { locale, section: sectionSlug } = await params;
  if (!isLocale(locale)) notFound();
  const section = getSection(sectionSlug);
  if (!section) notFound();
  const strings = t(locale);
  const lessons = getLessons(sectionSlug);
  const exam = getExam(sectionSlug);
  const en = CONTENT_EN[sectionSlug];

  return (
    <div>
      <Link
        href={`/${locale}`}
        className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        {strings.backToSections}
      </Link>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">
        {pick(locale, section.title, en?.title)}
      </h1>
      <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
        {pick(locale, section.description, en?.description)}
      </p>

      {lessons.length > 0 && (
        <div className="mt-4 max-w-md">
          <SectionProgress
            locale={locale}
            section={sectionSlug}
            lessonSlugs={sectionLessonSlugs(sectionSlug)}
            examSlugs={sectionExamSlugs(sectionSlug)}
          />
        </div>
      )}

      <h2 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
        {strings.lessons}
      </h2>
      {lessons.length === 0 ? (
        <p className="text-zinc-500">{strings.noLessons}</p>
      ) : (
        <ol className="space-y-3">
          {lessons.map((lesson, index) => (
            <li key={lesson.slug}>
              <Link
                href={`/${locale}/${sectionSlug}/${lesson.slug}`}
                className="flex items-start gap-3 rounded-xl border border-zinc-200 p-4 transition hover:border-emerald-500 hover:shadow-md dark:border-zinc-800 dark:hover:border-emerald-500"
              >
                <span className="mt-0.5">
                  <LessonStatus section={sectionSlug} lesson={lesson.slug} />
                </span>
                <span className="min-w-0">
                  <span className="font-mono text-xs text-zinc-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 font-semibold">
                    {pick(locale, lesson.title, en?.lessons?.[lesson.slug]?.title)}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {pick(
                      locale,
                      lesson.description,
                      en?.lessons?.[lesson.slug]?.description,
                    )}
                  </p>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}

      {exam && (
        <Link
          href={`/${locale}/${sectionSlug}/prova`}
          className="mt-6 block rounded-xl border-2 border-dashed border-amber-400 p-4 transition hover:border-amber-500 hover:shadow-md dark:border-amber-700"
        >
          <span className="font-mono text-xs text-amber-600 dark:text-amber-400">
            {strings.examBadge}
          </span>
          <h3 className="mt-1 font-semibold">{strings.examCardTitle}</h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {strings.examCardDesc}
          </p>
        </Link>
      )}
    </div>
  );
}
