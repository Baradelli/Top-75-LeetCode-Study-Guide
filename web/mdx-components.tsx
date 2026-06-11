import type { MDXComponents } from "mdx/types";
import CodeRunner from "@/components/CodeRunner";
import TraceDemo from "@/components/TraceDemo";
import Quiz from "@/components/Quiz";

/**
 * Componentes disponíveis dentro de qualquer aula MDX, além do mapeamento
 * de elementos HTML para o estilo do curso.
 */
export function useMDXComponents(): MDXComponents {
  return {
    CodeRunner,
    TraceDemo,
    Quiz,
    h1: ({ children }) => (
      <h1 className="mt-2 text-3xl font-bold tracking-tight">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 mb-3 text-xl font-semibold tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-2 text-lg font-semibold">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="my-3 leading-7 text-zinc-700 dark:text-zinc-300">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="my-3 list-disc space-y-1 pl-6 text-zinc-700 dark:text-zinc-300">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-3 list-decimal space-y-1 pl-6 text-zinc-700 dark:text-zinc-300">
        {children}
      </ol>
    ),
    code: ({ children }) => (
      <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm dark:bg-zinc-900">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="my-4 overflow-x-auto rounded-xl bg-zinc-950 p-4 font-mono text-sm text-zinc-200 [&_code]:bg-transparent [&_code]:p-0">
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-emerald-500 pl-4 text-zinc-600 italic dark:text-zinc-400">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="my-5 overflow-x-auto">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="border-b-2 border-zinc-300 dark:border-zinc-700">
        {children}
      </thead>
    ),
    th: ({ children }) => (
      <th className="px-3 py-2 text-left font-semibold text-zinc-900 dark:text-zinc-100">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-zinc-200 px-3 py-2 align-top text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
        {children}
      </td>
    ),
  };
}
