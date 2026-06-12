import type { SectionEn } from "../content-en";

// EN translation of the "string" section.
export const stringEn: SectionEn = {
  title: "String",
  description:
    "Consolidates two pointers and sliding window in another context; introduces the stack.",
  patterns: [
    "Sliding window with frequency",
    "Anagrams",
    "Stack",
    "Expand from the center",
  ],
  lessons: {
    "01-introducao": {
      title: "Recognizing string problems",
      description:
        "Strings are arrays of characters: what carries over from Array and what's new in this section.",
    },
    "02-frequencia-anagramas": {
      title: "Pattern 1: Character counting (anagrams)",
      description:
        "The frequency signature that identifies and groups strings — anagrams in O(n).",
    },
    "03-sliding-window": {
      title: "Pattern 2: Sliding Window with frequency",
      description:
        "The Array's sliding window, now with a count map as its state.",
    },
    "04-palindromos": {
      title: "Pattern 3: Two Pointers and expand from the center",
      description:
        "Checking palindromes with two pointers and finding them by growing from the center.",
    },
    "05-pilha": {
      title: "Pattern 4: Stack",
      description:
        "The LIFO structure that matches openings and closings and resolves what's “most nested” first.",
    },
    "06-codificacao": {
      title: "Pattern 5: Encoding and design",
      description:
        "Serialize and deserialize data into a string without ambiguity — the length-prefix pattern.",
    },
    "07-sintese": {
      title: "Synthesis: which pattern to use?",
      description:
        "The String section's decision tree and the overall quiz before the final exam.",
    },
  },
  challenges: {
    "valid-anagram": {
      title: "Valid Anagram",
      statement: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an **anagram** of \`s\` (the same characters, in any order).

Example: \`s = "listen"\`, \`t = "silent"\` → \`true\`. \`s = "rat"\`, \`t = "car"\` → \`false\`.`,
      hint: "The order doesn't matter, only how many times each character appears. What if you compared the character counts of the two strings? (Or: +1 for each char of s, −1 for each char of t — everything has to zero out.)",
      solutionIdea:
        "Compare the frequency signature: +1 per char of s, −1 per char of t. Everything zeroes out ⇒ anagram. O(n), O(1) on a fixed alphabet.",
    },
    "longest-substring": {
      title: "Longest Substring Without Repeating Characters",
      statement: `Given a string \`s\`, return the **length** of the longest (contiguous) substring **without repeating characters**.

Example: \`s = "abcabcbb"\` → \`3\` (the substring "abc"). \`s = "bbbbb"\` → \`1\`.`,
      hint: "Testing every substring is O(n²). It's a contiguous substring under a condition (no repeats) → sliding window: expand to the right; if the new char is already in the window, shrink from the left until you remove the repeat.",
      solutionIdea:
        "Sliding window with the window's set of chars as the state; each char enters and leaves at most once. O(n).",
    },
    "valid-palindrome": {
      title: "Valid Palindrome",
      statement: `Given a string \`s\`, return \`true\` if it is a **palindrome**, considering only letters and digits and **ignoring case**.

Example: \`"A man, a plan, a canal: Panama"\` → \`true\`. \`"race a car"\` → \`false\`.`,
      hint: "A palindrome is symmetric: the start mirrors the end. Two pointers, one at each end, moving toward the center — skipping anything that isn't a letter/digit. Can you do it without creating a 'cleaned' copy of the string?",
      solutionIdea:
        "Two pointers from the ends, skipping irrelevant chars in place. O(n) time, O(1) space (no copy).",
    },
    "valid-parentheses": {
      title: "Valid Parentheses",
      statement: `Given a string \`s\` with only \`()[]{}\`, return \`true\` if the parentheses are **correctly balanced** (each opening closes with the right type, in the right order).

Example: \`"()[]{}"\` → \`true\`. \`"(]"\` → \`false\`. \`"([)]"\` → \`false\`.`,
      hint: "Each closing must match the MOST RECENT opening still open. 'Most recent' = the top of a stack: push openings; on each closing, pop and check. At the end, the stack must be empty.",
      solutionIdea:
        "Stack (LIFO): push openings, match each closing with the top, require an empty stack at the end. O(n) time, O(n) space.",
    },
    "encode-decode": {
      title: "Encode and Decode Strings",
      statement: `Implement \`round_trip(strs)\` that **encodes** a list of strings into a single string and then **decodes** it back, returning the original list — working for **any** content (including strings with \`#\`, numbers, or empty ones).

Example: \`["abc", "de"]\` → (encodes and decodes) → \`["abc", "de"]\`. Trap to watch for: \`["a#2#b", "c"]\` has to come back intact.`,
      hint: "A separator (comma, #) is ambiguous: the data may contain it. Instead of marking where each piece ENDS, mark how long it IS: '<length>#<content>'. When decoding, read the number and grab exactly that many characters.",
      solutionIdea:
        "Length-prefix: <length>#<content>. The decoder counts characters instead of searching for separators, so no content is ambiguous. O(n).",
    },
  },
  exams: {
    "first-unique-character": {
      title: "First Unique Character in a String",
      statement: `Given a string \`s\`, return the **index of the first character that does not repeat**. If there is none, return \`-1\`.

Example: \`s = "leetcode"\` → \`0\` (the 'l' is the first one that appears exactly once). \`s = "aabb"\` → \`-1\`.`,
      hint: "Two passes: in the first, count the frequency of each character (hash map); in the second, walk the string and return the index of the first one with a count of 1. O(n) time, O(1) space (at most 26 letters).",
    },
    "find-all-anagrams": {
      title: "Find All Anagrams in a String",
      statement: `Given two strings \`s\` and \`p\`, return a list of the **starting indices** of all anagrams of \`p\` within \`s\` (in increasing order).

Example: \`s = "cbaebabacd"\`, \`p = "abc"\` → \`[0, 6]\` (the slices "cba" and "bac" are anagrams of "abc").`,
      hint: "Combine the section's two patterns: a sliding window of size len(p) carrying a frequency map as its state. At each step one char enters and one leaves; when the window's frequency matches p's, record the index. O(n).",
    },
    "longest-valid-parentheses": {
      title: "Longest Valid Parentheses",
      statement: `Given a string \`s\` containing only \`(\` and \`)\`, return the **length of the longest substring of valid parentheses** (correctly closed).

Example: \`s = ")()())"\` → \`4\` (the substring "()()"). \`s = "(()"\` → \`2\`.`,
      hint: "A stack of indices, initialized with -1 as an “anchor”. Push the position of each '('; on each ')', pop and measure the distance to the new top (the last unmatched index). When the stack empties, push the current ')' as a new anchor.",
    },
  },
};
