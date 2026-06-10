import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, LOCALES, t } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const strings = t(locale);

  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href={`/${locale}`} className="font-semibold tracking-tight">
            {strings.courseTitle}
          </Link>
          <nav className="flex gap-2 text-sm">
            {LOCALES.map((code) => (
              <Link
                key={code}
                href={`/${code}`}
                className={`rounded px-2 py-1 uppercase ${
                  code === locale
                    ? "bg-zinc-200 font-semibold dark:bg-zinc-800"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                {code}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
        {children}
      </main>
      <footer className="border-t border-zinc-200 py-6 text-center text-xs text-zinc-500 dark:border-zinc-800">
        Top 75 LeetCode — curso interativo
      </footer>
    </div>
  );
}
