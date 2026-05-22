# Longest Increasing Subsequence

Problem link:
https://leetcode.com/problems/longest-increasing-subsequence/

## The problem

Given an array `nums`, we need to find the length of the longest strictly increasing subsequence.

A subsequence means we can pick some elements in the same order they appear, without requiring them to be adjacent.

## How the solution works

This solution uses dynamic programming.

We create an array `dp` where:

```js
dp[i]
```

stores the length of the longest increasing subsequence that ends at position `i`.

Each position starts with value `1`, because any single number already forms a subsequence of length `1`.

Then, for each `nums[i]`, we look at all previous elements:

```js
if (nums[i] > nums[j]) {
  dp[i] = Math.max(dp[i], dp[j] + 1);
}
```

If `nums[i]` is greater than `nums[j]`, then it can extend the subsequence that ended at `j`.

## Quick example

If:

```js
nums = [0, 1, 0, 3, 2, 3]
```

One of the longest increasing subsequences is:

```js
[0, 1, 2, 3]
```

Its length is:

```js
4
```

## Results for the examples

### Example 1

```js
nums = [10, 9, 2, 5, 3, 7, 101, 18]
result = 4
```

### Example 2

```js
nums = [0, 1, 0, 3, 2, 3]
result = 4
```

### Example 3

```js
nums = [7, 7, 7, 7, 7, 7, 7]
result = 1
```

## Complexity

- Time: `O(n²)`
- Space: `O(n)`

## Summary

This solution checks, for each position, the best increasing subsequence that can end there. In the end, the largest value in `dp` is the answer.
