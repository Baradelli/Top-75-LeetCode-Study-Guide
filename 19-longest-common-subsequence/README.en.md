# Longest Common Subsequence

Problem link:
https://leetcode.com/problems/longest-common-subsequence/

## The problem

Given two strings `text1` and `text2`, we need to find the length of their longest common subsequence.

A subsequence means we can remove characters without changing the order of the remaining ones.

## How the solution works

This solution uses dynamic programming with a `dp` table.

Each position:

```js
dp[i][j]
```

stores the length of the best common subsequence between:

- the part of `text1` that starts at `i`
- the part of `text2` that starts at `j`

We fill the table from the end toward the beginning.

If the characters are equal:

```js
dp[i][j] = 1 + dp[i + 1][j + 1]
```

If they are different:

```js
dp[i][j] = Math.max(dp[i][j + 1], dp[i + 1][j])
```

This way, at each step, we use smaller answers that were already computed.

## Quick example

If:

```js
text1 = "abcde"
text2 = "ace"
```

The longest common subsequence is:

```js
"ace"
```

Its length is:

```js
3
```

## Results for the examples

### Example 1

```js
text1 = "abcde"
text2 = "ace"
result = 3
```

### Example 2

```js
text1 = "abc"
text2 = "abc"
result = 3
```

### Example 3

```js
text1 = "abc"
text2 = "def"
result = 0
```

## Complexity

- Time: `O(m * n)`
- Space: `O(m * n)`

Where:

- `m` is the length of `text1`
- `n` is the length of `text2`

## Summary

This solution compares the two strings in smaller parts and stores the best results in a table. That avoids recalculating the same subproblem many times.
