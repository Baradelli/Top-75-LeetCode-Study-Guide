import type { SectionEn } from "../content-en";

// EN translation of the "binary" section.
export const binaryEn: SectionEn = {
  title: "Binary",
  description:
    "Binary search as a natural continuation of arrays; bits as an independent module.",
  patterns: ["Binary search", "Rotated array", "XOR", "Shifts and masks"],
  lessons: {
    "01-introducao": {
      title: "Recognizing binary search and bits",
      description:
        "The section's two themes, when each one shows up, and why O(log n) is so powerful.",
    },
    "02-busca-binaria": {
      title: "Pattern 1: Binary Search",
      description:
        "Cutting the search space in half at each step — the essence of O(log n).",
    },
    "03-busca-binaria-girada": {
      title: "Pattern 2: Modified binary search (rotated array)",
      description:
        "When the array has been rotated: decide which half is sorted and keep cutting.",
    },
    "04-bits-fundamentos": {
      title: "Pattern 3: Bit fundamentals",
      description:
        "Thinking in binary: AND, OR, XOR, NOT, shifts and masks.",
    },
    "05-bits-xor": {
      title: "Pattern 4: The power of XOR",
      description:
        "The a^a=0 property that makes pairs cancel out and reveals what's left.",
    },
    "06-bits-tecnicas": {
      title: "Pattern 5: Bit techniques",
      description:
        "Reusing counts (counting bits), reversing bits and summing without the + operator.",
    },
    "07-sintese": {
      title: "Synthesis: which pattern to use?",
      description:
        "The Binary section's decision tree and the overall quiz before the final exam.",
    },
  },
  challenges: {
    "binary-search": {
      title: "Binary Search",
      statement: `Given an array \`nums\` **sorted in ascending order** and a \`target\`, return the **index** of \`target\`. If it doesn't exist, return \`-1\`. O(log n) is expected.

Example: \`nums = [-1, 0, 3, 5, 9, 12]\`, \`target = 9\` → \`4\`. \`target = 2\` → \`-1\`.`,
      hint: "Since the array is sorted, look at the MIDDLE element: if it's the target, you found it; if it's smaller, the target can only be in the right half; if it's larger, in the left. At each step you discard HALF — hence the O(log n).",
      solutionIdea:
        "Compare with the middle and discard half at each step. O(log n) time, O(1) space.",
    },
    "search-rotated": {
      title: "Search in Rotated Sorted Array",
      statement: `A sorted array was **rotated** at some unknown pivot (e.g., \`[0,1,2,4,5,6,7]\` became \`[4,5,6,7,0,1,2]\`). Given \`nums\` and \`target\`, return the index of \`target\` or \`-1\`. O(log n) is expected.

Example: \`nums = [4,5,6,7,0,1,2]\`, \`target = 0\` → \`4\`.`,
      hint: "At the middle, at least ONE of the halves is sorted. Figure out which (compare nums[left] with nums[mid]). If the target fits in the sorted range, go there; otherwise, go to the other half. It's still O(log n).",
      solutionIdea:
        "One half is always sorted; decide which one the target fits in and discard the other. O(log n).",
    },
    "hamming-weight": {
      title: "Number of 1 Bits",
      statement: `Given a non-negative integer \`n\`, count how many **1 bits** there are in its binary representation (the "Hamming weight").

Example: \`n = 11\` (binary \`1011\`) → \`3\`. \`n = 128\` (binary \`10000000\`) → \`1\`.`,
      hint: "You can look at the last bit with (n & 1) and shift n to the right. A smarter trick: n & (n-1) clears exactly the rightmost 1 bit — count how many times you can do this until n becomes 0.",
      solutionIdea:
        "n & (n-1) zeroes the rightmost 1 bit; the number of repetitions until n=0 is the number of 1 bits.",
    },
    "missing-number": {
      title: "Missing Number",
      statement: `Given an array \`nums\` with \`n\` distinct numbers taken from \`0..n\`, **one** number is missing. Find it. Try to do it in O(n) time and O(1) extra space.

Example: \`nums = [3, 0, 1]\` (should have 0,1,2,3) → \`2\` is missing.`,
      hint: "The sum of 0..n minus the sum of the array gives the missing one (O(1) space). Or, with no overflow risk, use XOR: a^a=0, so XOR'ing all the indices 0..n with all the values cancels the pairs and leaves the missing one.",
      solutionIdea:
        "XOR all the indices 0..n and all the values: pairs cancel out (a^a=0), the missing one remains. O(n), O(1).",
    },
    "counting-bits": {
      title: "Counting Bits",
      statement: `Given an integer \`n\`, return an array \`ans\` of length \`n+1\` where \`ans[i]\` is the number of 1 bits of \`i\`, for every \`i\` from \`0\` to \`n\`. Try to do it in O(n).

Example: \`n = 5\` → \`[0, 1, 1, 2, 1, 2]\` (0,1,10,11,100,101).`,
      hint: "Counting bit by bit for each number is O(n log n). For O(n), reuse previous answers: i has the same bits as i>>1 (i without its last bit), PLUS the last bit (i & 1). That is: ans[i] = ans[i >> 1] + (i & 1).",
      solutionIdea:
        "DP over bits: ans[i] = ans[i>>1] + (i&1). Each answer reuses one already computed. O(n).",
    },
  },
  exams: {
    "single-number": {
      title: "Single Number",
      statement: `In an array \`nums\`, **every** element appears twice, except one, which appears once. Find that single one. Try to do it in O(n) time and O(1) extra space.

Example: \`nums = [4, 1, 2, 1, 2]\` → \`4\`.`,
      hint: "XOR is the key: a ^ a = 0 and a ^ 0 = a. XOR all the elements — the pairs cancel out and exactly the lone number remains. O(n) time, O(1) space.",
    },
    "search-range": {
      title: "Find First and Last Position of Element in Sorted Array",
      statement: `Given a **sorted** array \`nums\` (with duplicates) and a \`target\`, return \`[first, last]\` index where \`target\` appears, or \`[-1, -1]\` if it doesn't exist. O(log n) is expected.

Example: \`nums = [5,7,7,8,8,10]\`, \`target = 8\` → \`[3, 4]\`.`,
      hint: "Do TWO binary searches: one that, upon finding the target, keeps going LEFT (finds the first), and another that keeps going RIGHT (finds the last). Each is O(log n).",
    },
    "koko-bananas": {
      title: "Koko Eating Bananas",
      statement: `Koko has piles of bananas (\`piles[i]\`) and \`h\` hours. At a speed \`k\` (bananas/hour), each hour she picks a pile and eats up to \`k\` of it (if the pile has fewer, she eats it all and rests for the rest of the hour). Return the **smallest** \`k\` that lets her eat all the bananas in \`h\` hours.

Example: \`piles = [3, 6, 7, 11]\`, \`h = 8\` → \`4\`.`,
      hint: "Binary search on the ANSWER SPACE: the speed k goes from 1 to max(piles). For a candidate k, you can check in O(n) whether Koko finishes in h hours (sum ceil(pile/k)). The bigger k, the fewer hours — so search for the smallest k that fits in h. O(n log(max)).",
    },
  },
};
