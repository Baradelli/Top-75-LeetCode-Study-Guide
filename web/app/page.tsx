"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  isLocale,
  LOCALE_STORAGE_KEY,
  negotiateLocale,
  type Locale,
} from "@/lib/i18n";

/**
 * A raiz "/" não tem conteúdo próprio: decide o idioma no navegador e
 * redireciona para "/pt" ou "/en". O app é estático, então a escolha é feita no
 * cliente (sem middleware), o que mantém o deploy compatível com qualquer host.
 *
 * Prioridade: idioma já escolhido antes (localStorage) > idioma do dispositivo
 * (português → PT, qualquer outro → EN).
 */
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    let target: Locale | null = null;

    try {
      const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      if (saved && isLocale(saved)) target = saved;
    } catch {
      // localStorage indisponível (ex.: modo privado restrito): usa o idioma do dispositivo.
    }

    if (!target) {
      const languages = navigator.languages?.length
        ? navigator.languages
        : [navigator.language];
      target = negotiateLocale(languages);
    }

    router.replace(`/${target}`);
  }, [router]);

  return null;
}
