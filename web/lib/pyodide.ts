/**
 * Loader singleton do Pyodide (Python em WebAssembly), carregado do CDN.
 * O download (~10 MB) acontece uma única vez e em background; chamadas
 * subsequentes reutilizam a mesma instância.
 */
const PYODIDE_VERSION = "0.28.3";
const PYODIDE_CDN = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

export interface PyodideLike {
  runPython(code: string): unknown;
  globals: { get(name: string): unknown };
}

declare global {
  interface Window {
    loadPyodide?: (options: { indexURL: string }) => Promise<PyodideLike>;
  }
}

let pyodidePromise: Promise<PyodideLike> | null = null;

function injectScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Falha ao carregar ${src}`));
    document.head.appendChild(script);
  });
}

export function loadPyodideSingleton(): Promise<PyodideLike> {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      await injectScript(`${PYODIDE_CDN}pyodide.js`);
      if (!window.loadPyodide) {
        throw new Error("Pyodide não disponível após carregar o script");
      }
      return window.loadPyodide({ indexURL: PYODIDE_CDN });
    })();
    pyodidePromise.catch(() => {
      // Permite nova tentativa se o carregamento falhar (ex.: sem rede).
      pyodidePromise = null;
    });
  }
  return pyodidePromise;
}

export function isPyodideLoading(): boolean {
  return pyodidePromise !== null;
}
