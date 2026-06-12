"use client";

import { useEffect } from "react";
import { LOCALE_STORAGE_KEY, type Locale } from "@/lib/i18n";

/**
 * Guarda no localStorage o idioma que o aluno está vendo, para que a próxima
 * visita à raiz "/" abra direto nele — fazendo a escolha explícita (ex.: trocar
 * pelo seletor do cabeçalho) vencer o idioma do dispositivo.
 */
export default function RememberLocale({ locale }: { locale: Locale }) {
  useEffect(() => {
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // Sem localStorage: apenas não lembramos a escolha; nada quebra.
    }
  }, [locale]);
  return null;
}
