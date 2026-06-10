"use client";

import { useEffect } from "react";
import { loadPyodideSingleton } from "@/lib/pyodide";

/**
 * Pré-carrega o Pyodide em background assim que o site abre, para que a
 * primeira execução de Python nas aulas seja instantânea.
 */
export default function PyodideWarmup() {
  useEffect(() => {
    loadPyodideSingleton().catch(() => {
      // Sem rede agora: o loader permite nova tentativa quando a aula pedir.
    });
  }, []);
  return null;
}
