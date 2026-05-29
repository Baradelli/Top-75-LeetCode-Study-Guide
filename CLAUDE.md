# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This repo is a study collection of **Top 75 LeetCode** problems in JavaScript. There is no build system, package manager, or test framework — each problem is a standalone Node script.

See `AGENTS.md` for the full authoring spec; it is authoritative. Notes below are the highlights.

## Running a solution

```bash
node <type>/<n>-<problem-name>/<problem-name>.js
```

Each `.js` file runs its own examples and prints `CORRECT`/`WRONG` lines in green/red using ANSI codes. There is no test runner — "running the tests" means executing the file with `node` and reading the output.

## Repository structure

Problems live under a type folder: `array/`, `binary/`, `dynamic-programming/`, `graph/`, `interval/`, `linked-list/`, `matrix/`, `string/`. Each problem folder contains exactly three files:

```
<type>/<n>-<problem-name>/
  <problem-name>.js     # solution + inline examples + module.exports
  README.pt.md          # Portuguese explanation
  README.en.md          # English explanation (mirrors pt)
```

The numeric prefix `<n>` is a global, monotonically increasing index across all types (currently up to 57). When adding a new problem, use the next available number — do not restart per type.

## Solution file conventions

Every `<problem-name>.js` follows the same shape, established by existing files (e.g. `array/1-two-sum/two-sum.js`):

1. The named solution function at the top.
2. ANSI color constants `GREEN`, `RED`, `RESET`.
3. An `examples` array of `{ ...inputs, expected }` objects.
4. A `forEach` loop that runs each example, compares to `expected`, and logs a colored `CORRECT`/`WRONG` line.
5. `module.exports = <functionName>;` at the bottom.

When editing an existing problem, preserve the solution function's name, signature, and core logic unless explicitly asked to change them. Match the style of nearby files rather than inventing a new one.

## When adding a new problem

Per `AGENTS.md`, the full flow is:

1. Create `<type>/<n>-<problem-name>/<problem-name>.js` matching the conventions above.
2. Create `README.pt.md` with sections: O problema, Como a solução funciona, Exemplo rápido, Resultado dos exemplos, Complexidade, Resumo (plus title + LeetCode link).
3. Create `README.en.md` mirroring the pt version: The problem, How the solution works, Quick example, Results for the examples, Complexity, Summary.
4. Update the root `README.pt.md` and `README.en.md` — add the problem under its type section, keep numbering and item format consistent.
5. Update the root `README.md` — bump the "N organized problems" count if present.
6. Run the file with `node` to confirm the examples pass.
