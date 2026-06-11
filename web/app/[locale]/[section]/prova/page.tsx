import Link from "next/link";
import { notFound } from "next/navigation";
import { getSection } from "@/lib/sections";
import { getExam, EXAMS } from "@/lib/exams";
import { isLocale, LOCALES, t } from "@/lib/i18n";
import ExamJudge from "@/components/ExamJudge";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    Object.keys(EXAMS).map((section) => ({ locale, section })),
  );
}

export const dynamicParams = false;

export default async function ExamPage({
  params,
}: {
  params: Promise<{ locale: string; section: string }>;
}) {
  const { locale, section: sectionSlug } = await params;
  if (!isLocale(locale)) notFound();
  const section = getSection(sectionSlug);
  const exam = getExam(sectionSlug);
  if (!section || !exam) notFound();
  const strings = t(locale);

  return (
    <div>
      <Link
        href={`/${locale}/${sectionSlug}`}
        className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        {strings.backToSection}
      </Link>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">
        Prova final — {section.title}
      </h1>
      <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Três problemas <strong>inéditos</strong> (não vistos nas aulas) para
        testar se você sai desta seção resolvendo qualquer problema do tema:
        um fácil, um médio e um difícil. Alguns casos de teste são ocultos —
        como no LeetCode de verdade. Resolva em Python ou JavaScript.
      </p>

      {exam.map((problem) => (
        <ExamJudge key={problem.slug} section={sectionSlug} problem={problem} />
      ))}
    </div>
  );
}
