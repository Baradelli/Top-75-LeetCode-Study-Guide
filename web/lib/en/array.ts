import type { SectionEn } from "../content-en";

// EN translation of the "array" section.
export const arrayEn: SectionEn = {
  title: "Array",
  description:
    "The foundation of everything: the patterns here reappear in almost every other section.",
  patterns: [
    "Hash map",
    "Two pointers",
    "Sliding window",
    "Prefix/suffix product",
    "Kadane",
  ],
  lessons: {
    "01-introducao": {
      title: "Recognizing array problems",
      description:
        "The general method for attacking any array problem and the map of the section's patterns.",
    },
    "02-hash-map": {
      title: "Pattern 1: Hash Map",
      description:
        "Trading space for time: the question “have I already seen what I'm looking for?” answered in O(1).",
    },
    "03-two-pointers": {
      title: "Pattern 2: Two Pointers",
      description:
        "Two indices that move intelligently to eliminate useless comparisons.",
    },
    "04-sliding-window": {
      title: "Pattern 3: Sliding Window",
      description:
        "Reuse the work from the previous window instead of recomputing from scratch.",
    },
    "05-prefix-product": {
      title: "Pattern 4: Prefix and Suffix",
      description:
        "Precompute running totals to answer any range in O(1).",
    },
    "06-kadane": {
      title: "Pattern 5: Kadane",
      description:
        "The local decision that solves the best subarray in a single pass.",
    },
    "07-sintese": {
      title: "Synthesis: which pattern to use?",
      description:
        "The section's decision tree and the general quiz before the final exam.",
    },
  },
  challenges: {
    "two-sum": {
      title: "Two Sum",
      statement: `Given an array \`nums\` and a number \`target\`, return the **indices** of two numbers that add up to \`target\`. There is exactly one answer.

Example: \`nums = [2, 7, 11, 15]\`, \`target = 9\` → \`[0, 1]\` (because 2 + 7 = 9).`,
      hint: "Brute force tests every pair (O(n²)). What are you redoing for each element? Searching for a value... what if you REMEMBERED the values you've already seen?",
      solutionIdea:
        "A hash map remembers each value seen; the search for the complement becomes O(1). One pass, O(n).",
    },
    "container-with-most-water": {
      title: "Container With Most Water",
      statement: `Each position is a wall of height \`heights[i]\`. Choose **two** walls that, together with the x-axis, form the container holding the most water. The water is limited by the **shorter** wall: \`area = (j - i) × min(heights[i], heights[j])\`.

Example: \`heights = [1, 8, 6, 2, 5, 4, 8, 3, 7]\` → \`49\`.`,
      hint: "Testing every pair is O(n²). Start with the farthest-apart walls (the ends). If one wall is the shorter one, does it make sense to keep it? Which pointer is worth moving?",
      solutionIdea:
        "Two pointers from the ends: at each step drop the shorter wall (keeping it can only make things worse). O(n), O(1) space.",
    },
    "best-time-stock": {
      title: "Best Time to Buy and Sell Stock",
      statement: `\`prices[i]\` is the price of a stock on day \`i\`. Choose a day to **buy** and a **later** day to **sell**, maximizing profit. If no profit is possible, return \`0\`.

Example: \`prices = [7, 1, 5, 3, 6, 4]\` → \`5\` (buy at 1, sell at 6).`,
      hint: "Every (buy, sell) pair is O(n²). Walk through the days once: to sell today for the largest profit, what is the only thing from the past you need to remember?",
      solutionIdea:
        "Carry the smallest price seen so far; the profit of selling today is price − minimum. One pass, O(n), O(1).",
    },
    "product-except-self": {
      title: "Product of Array Except Self",
      statement: `Return an array where \`answer[i]\` is the product of **all** elements except \`nums[i]\`. **Without using division**, in O(n).

Example: \`nums = [1, 2, 3, 4]\` → \`[24, 12, 8, 6]\`.`,
      hint: "Dividing the total product isn't allowed (and breaks with zeros). 'Everything except i' = (everything to the left of i) × (everything to the right of i). Can you do it in two passes?",
      solutionIdea:
        "Prefix (product to the left) in one pass, suffix (to the right) on the way back. O(n) time, O(1) extra space.",
    },
    kadane: {
      title: "Maximum Subarray",
      statement: `Find the **contiguous subarray** (at least one element) with the **largest sum** and return that sum. The array may contain negative numbers.

Example: \`nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]\` → \`6\` (the subarray \`[4, -1, 2, 1]\`).`,
      hint: "Testing every subarray is O(n²). Walk through it once carrying 'the best sum that ends here'. At each element, is it worth extending what came before, or starting over?",
      solutionIdea:
        "Kadane: at each position, extend (current + nums[i]) or restart (nums[i]). O(n), O(1).",
    },
  },
  exams: {
    "majority-element": {
      title: "Majority Element",
      statement: `Given an array \`nums\` of size n, return the **majority element** — the element that appears more than ⌊n/2⌋ times. You may assume it always exists in the array.

Example: \`nums = [2, 2, 1, 1, 1, 2, 2]\` → answer \`2\` (appears 4 times out of 7).`,
      hint: "A hash map of counts solves it in O(n). For O(1) space, look up the Boyer-Moore voting algorithm.",
    },
    "subarray-sum-equals-k": {
      title: "Subarray Sum Equals K",
      statement: `Given an array of integers \`nums\` (with positives and negatives) and an integer \`k\`, return **how many contiguous subarrays** sum to exactly \`k\`.

Example: \`nums = [1, 1, 1]\`, \`k = 2\` → answer \`2\` (the subarrays [1,1] starting at indices 0 and 1).

Note: with negative numbers, sliding window doesn't work — think prefix sums.`,
      hint: "Combine the prefix-sum pattern with the hash map from two-sum: how many times have I already seen the prefix sum (current_sum - k)?",
    },
    "trapping-rain-water": {
      title: "Trapping Rain Water",
      statement: `Given an array \`height\` representing an elevation map where each bar has width 1, compute **how much water** gets trapped between the bars after it rains.

Example: \`height = [0,1,0,2,1,0,1,3,2,1,2,1]\` → answer \`6\`.

The water above each position is limited by the smaller of the tallest bars to the left and to the right.`,
      hint: "O(n) space version: arrays of max-to-the-left and max-to-the-right. O(1) version: two pointers converging, always advancing the side with the shorter bar.",
    },
  },
};
