# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A study guide for the **Top 75 LeetCode Questions**, solved in plain JavaScript with no dependencies, no package.json, and no test framework. Each solution file is self-contained and self-verifying.

**`AGENTS.md` is the authoritative conventions document for this repo (written in Portuguese). Read it before adding or changing a problem.** The summary below covers the essentials.

## Running code

Each solution runs directly with Node and prints its own pass/fail output (green = correct, red = wrong):

```bash
node array/1-two-sum/two-sum.js
```

There is no build, lint, or test-runner step.

## Structure and conventions

Problems are grouped by type (`array`, `binary`, `dynamic-programming`, `graph`, `heap`, `interval`, `linked-list`, `matrix`, `string`, `tree`), each in a numbered folder:

```text
tipo/
  numero-nome-do-problema/
    nome-do-problema.js
    README.pt.md
    README.en.md
```

Numbering is sequential across the whole repo (1–75), not per-type.

Each `.js` file follows the same pattern (see `array/1-two-sum/two-sum.js` as the reference):

1. The solution function
2. ANSI color constants (`GREEN`, `RED`, `RESET`)
3. An `examples` array with inputs and `expected` values
4. A `forEach` loop comparing result vs. expected with colored CORRECT/WRONG output
5. `module.exports` of the solution function at the end

Each problem has paired `README.pt.md` / `README.en.md` files with mirrored content and fixed section structure (problem link, "O problema"/"The problem", how the solution works, quick example, results, complexity, summary).

## When adding a problem

Follow the flow in AGENTS.md: copy the style of existing problems, then update the three root files — `README.pt.md` and `README.en.md` (add the problem to the lists), and `README.md` (update the total problem count). Validate by running the new file with `node`. Commit messages follow the pattern `numero-nome-do-problema` (e.g. `75-find-median-from-data-stream`).

## Style rules (from AGENTS.md)

- Keep code simple and didactic, with clear variable names
- Preserve existing solution functions' names, signatures, and core logic unless change is necessary
- READMEs should be short, simple, and direct; PT and EN versions must stay equivalent
- When in doubt between two styles, match the existing files
