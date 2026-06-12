import type { SectionEn } from "../content-en";

export const dynamicProgrammingEn: SectionEn = {
  title: "Dynamic Programming",
  description:
    "The hardest type: memoization is born from mastered recursion. Closes the course.",
  patterns: [
    "Memoization vs tabulation",
    "1D DP",
    "Include/exclude",
    "DP on strings",
  ],
  lessons: {
    "01-introducao": {
      title: "Recognizing DP problems",
      description:
        "Overlapping subproblems, memoization vs tabulation, and the states × cost complexity.",
    },
    "02-1d-dp": {
      title: "Pattern 1: 1D DP (the recurrence)",
      description:
        "Building an answer from the previous ones — climbing stairs and the foundation of everything.",
    },
    "03-decisao": {
      title: "Pattern 2: Include or exclude",
      description:
        "At each item, decide to take or skip — house robber and the boundary between greedy and DP.",
    },
    "04-knapsack": {
      title: "Pattern 3: Knapsack (coin change)",
      description:
        "Composing a target from reusable items — coin change and the unbounded knapsack.",
    },
    "05-grid-dp": {
      title: "Pattern 4: Grid DP",
      description:
        "Filling a 2D table where each cell depends on its neighbors — unique paths.",
    },
    "06-sequencias": {
      title: "Pattern 5: DP on sequences and strings",
      description:
        "Comparing two sequences in a 2D table — LCS, and the family of string DP.",
    },
    "07-sintese": {
      title: "Synthesis: which pattern to use?",
      description:
        "The section's (and course's) decision tree and the general quiz before the final exam.",
    },
  },
  challenges: {
    "climb-stairs": {
      title: "Climbing Stairs",
      statement: `You climb a staircase of \`n\` steps, taking **1 or 2** steps at a time. In how many distinct ways can you reach the top?

Example: \`n = 3\` → \`3\` (1+1+1, 1+2, 2+1).`,
      hint: "To reach step i, you came from step i-1 (a step of 1) or from i-2 (a step of 2). So ways(i) = ways(i-1) + ways(i-2) — it's Fibonacci! Start from the base cases (steps 0 and 1) and build up.",
      solutionIdea:
        "ways(i) = ways(i-1) + ways(i-2) (Fibonacci). Keeping only the last two: O(n) time, O(1) space.",
    },
    "house-robber": {
      title: "House Robber",
      statement: `Houses in a row, each with a value in \`nums\`. You cannot rob **two adjacent houses**. Return the **maximum** you can rob.

Example: \`[2,7,9,3,1]\` → \`12\` (rob houses 2, 9, and 1 → 2+9+1).`,
      hint: "At each house, DECIDE: rob it (value + best up to house i-2, since you can't take the adjacent one) or skip it (best up to i-1). dp[i] = max(dp[i-1], nums[i] + dp[i-2]). It's the 'include or exclude' pattern.",
      solutionIdea:
        "Include/exclude: dp[i] = max(dp[i-1], nums[i] + dp[i-2]). Two accumulators → O(n) time, O(1) space.",
    },
    "coin-change": {
      title: "Coin Change",
      statement: `Given coins of values \`coins\` (an unlimited supply of each) and an \`amount\`, return the **fewest number of coins** that sum to exactly \`amount\`, or \`-1\` if it is impossible.

Example: \`coins = [1,2,5]\`, \`amount = 11\` → \`3\` (5+5+1).`,
      hint: "dp[a] = fewest coins to form the value a. For each value a from 1 to amount, try each coin m ≤ a: dp[a] = min(dp[a], dp[a - m] + 1). Since each coin is unlimited, this is the 'unbounded knapsack'. Initialize dp with an 'infinity' value.",
      solutionIdea:
        "Unbounded knapsack: dp[a] = min over coins of dp[a-m]+1. O(amount × coins) time, O(amount) space.",
    },
    "unique-paths": {
      title: "Unique Paths",
      statement: `A robot is in the top-left corner of an \`m × n\` grid and wants to reach the bottom-right corner, moving only **down** or **right**. How many distinct paths are there?

Example: \`m = 3\`, \`n = 7\` → \`28\`.`,
      hint: "Grid DP: dp[r][c] = paths to cell (r,c). The first row and first column have 1 path each (you can only come in a straight line). For the rest: dp[r][c] = dp[r-1][c] + dp[r][c-1] (came from above or from the left).",
      solutionIdea:
        "2D DP: dp[r][c] = dp[r-1][c] + dp[r][c-1], with borders = 1. O(m·n) time, O(m·n) space.",
    },
    "longest-common-subsequence": {
      title: "Longest Common Subsequence",
      statement: `Given two strings \`text1\` and \`text2\`, return the length of the **longest common subsequence** (characters in the same order, not necessarily contiguous).

Example: \`"abcde"\` and \`"ace"\` → \`3\` (the subsequence "ace").`,
      hint: "2D DP: dp[i][j] = LCS of the first i chars of text1 and j of text2. If text1[i-1] == text2[j-1], the characters match: dp[i][j] = dp[i-1][j-1] + 1. Otherwise, skip one of the two: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).",
      solutionIdea:
        "2D string DP: match → diagonal+1; otherwise → max(above, left). O(m·n) time and space.",
    },
  },
  exams: {
    "min-cost-climbing-stairs": {
      title: "Min Cost Climbing Stairs",
      statement: `Each step \`i\` has a cost \`cost[i]\`. You can climb 1 or 2 steps at a time, and start from step 0 or step 1. Return the **minimum cost** to reach the top (beyond the last step).

Example: \`[10,15,20]\` → \`15\` (start at step 1, pay 15, and climb 2 to the top).`,
      hint: "A variant of Climbing Stairs with cost. dp[i] = minimum cost to REACH step i = cost[i] + min(dp[i-1], dp[i-2]). The top is a position beyond the last step: the answer is min(dp[n-1], dp[n-2]). Keeping two values is enough (O(1) space).",
    },
    "partition-equal-subset-sum": {
      title: "Partition Equal Subset Sum",
      statement: `Given an array \`nums\` of positive integers, return \`true\` if it can be **split into two subsets with equal sum**.

Example: \`[1,5,11,5]\` → \`true\` (\`[1,5,5]\` and \`[11]\`, both sum to 11).`,
      hint: "If the total sum is odd, it's impossible. Otherwise, the problem becomes: 'is there a subset that sums to total/2?' — a boolean 0/1 knapsack. dp[v] = can we form the sum v? For each number, iterate the sums from high to low (each number used once) setting dp[v] = dp[v] or dp[v - num].",
    },
    "edit-distance": {
      title: "Edit Distance",
      statement: `Given two words \`word1\` and \`word2\`, return the **minimum number of operations** (insert, remove, or replace a character) to transform one into the other.

Example: \`"horse"\` → \`"ros"\` → \`3\` (remove 'h', replace 'r'→'r'… in practice: rose, ros... 3 operations).`,
      hint: "2D DP: dp[i][j] = operations to transform the first i chars of word1 into the first j of word2. If the characters match, dp[i][j] = dp[i-1][j-1]. Otherwise, 1 + min of: replace (dp[i-1][j-1]), remove (dp[i-1][j]), insert (dp[i][j-1]). The borders: transforming to/from an empty string costs the length.",
    },
  },
};
