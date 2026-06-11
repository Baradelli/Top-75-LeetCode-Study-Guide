import { notFound } from "next/navigation";
import { isLocale, LOCALES } from "@/lib/i18n";
import ProfileView from "@/components/ProfileView";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ProfileView locale={locale} />;
}
