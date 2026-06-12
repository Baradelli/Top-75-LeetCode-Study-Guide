import Link from "next/link";
import { notFound } from "next/navigation";
import { getLessons, SECTIONS } from "@/lib/sections";
import { sectionExamSlugs, sectionLessonSlugs } from "@/lib/course";
import { isLocale, t } from "@/lib/i18n";
import SectionProgress from "@/components/SectionProgress";
import CourseProgressBanner from "@/components/CourseProgressBanner";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const strings = t(locale);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">
        {strings.courseTitle}
      </h1>
      <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
        {strings.courseSubtitle}
      </p>

      <CourseProgressBanner locale={locale} />

      <h2 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
        {strings.sections}
      </h2>
      <ol className="grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((section, index) => {
          const available = section.status === "available";
          const card = (
            <div
              className={`h-full rounded-xl border p-5 transition ${
                available
                  ? "border-zinc-200 hover:border-emerald-500 hover:shadow-md dark:border-zinc-800 dark:hover:border-emerald-500"
                  : "border-zinc-200 opacity-60 dark:border-zinc-800"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-zinc-400">
                  {String(index).padStart(2, "0")}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    available
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
                      : "bg-zinc-100 text-zinc-500 dark:bg-zinc-900"
                  }`}
                >
                  {available ? strings.available : strings.soon}
                </span>
              </div>
              <h3 className="mt-2 text-lg font-semibold">{section.title}</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {section.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                {section.patterns.map((pattern) => (
                  <span
                    key={pattern}
                    className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
                  >
                    {pattern}
                  </span>
                ))}
              </div>
              {available && getLessons(section.slug).length > 0 && (
                <SectionProgress
                  locale={locale}
                  section={section.slug}
                  lessonSlugs={sectionLessonSlugs(section.slug)}
                  examSlugs={sectionExamSlugs(section.slug)}
                />
              )}
            </div>
          );
          return (
            <li key={section.slug}>
              {available ? (
                <Link href={`/${locale}/${section.slug}`} className="block h-full">
                  {card}
                </Link>
              ) : (
                card
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
