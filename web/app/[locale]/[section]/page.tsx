import Link from "next/link";
import { notFound } from "next/navigation";
import { getLessons, getSection, SECTIONS } from "@/lib/sections";
import { getExam } from "@/lib/exams";
import { isLocale, LOCALES, t } from "@/lib/i18n";

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

  return (
    <div>
      <Link
        href={`/${locale}`}
        className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        {strings.backToSections}
      </Link>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">
        {section.title}
      </h1>
      <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
        {section.description}
      </p>

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
                className="block rounded-xl border border-zinc-200 p-4 transition hover:border-emerald-500 hover:shadow-md dark:border-zinc-800 dark:hover:border-emerald-500"
              >
                <span className="font-mono text-xs text-zinc-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 font-semibold">{lesson.title}</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {lesson.description}
                </p>
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
            🏁 PROVA FINAL
          </span>
          <h3 className="mt-1 font-semibold">
            1 fácil + 1 médio + 1 difícil — problemas inéditos
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Com casos de teste ocultos, como no LeetCode de verdade. É aqui que
            você confirma que sai da seção resolvendo qualquer problema do tema.
          </p>
        </Link>
      )}
    </div>
  );
}
