# Combination Sum IV

Problem link:
https://leetcode.com/problems/combination-sum-iv/

## The problem

Given an array `nums` with distinct numbers and an integer `target`, we need to find how many different sequences add up exactly to that value.

Here, order matters.

This means:

- `[1, 2, 1]` counts
- `[2, 1, 1]` also counts as a different way

## How the solution works

This solution uses dynamic programming.

We create a structure `dp` where:

```js
dp[total]
```

stores how many ways exist to build the value `total`.

We start with:

```js
dp[0] = 1
```

because there is exactly one way to form `0`: choose nothing.

Then we compute values from `1` up to `target`.

For each total, we test every number:

```js
dp[total] += dp[total - num] || 0;
```

If `total - num` already had some valid ways, then we can add `num` to the end of each of them.

## Quick example

If:

```js
nums = [1, 2, 3]
target = 4
```

The possible sequences are:

```js
[1, 1, 1, 1]
[1, 1, 2]
[1, 2, 1]
[1, 3]
[2, 1, 1]
[2, 2]
[3, 1]
```

Result:

```js
7
```

## Results for the examples

### Example 1

```js
nums = [1, 2, 3]
target = 4
result = 7
```

### Example 2

```js
nums = [9]
target = 3
result = 0
```

### Example 3

```js
nums = [2, 4, 6]
target = 8
result = 7
```

## Complexity

- Time: `O(target * numberOfNums)`
- Space: `O(target)`

## Summary

This solution builds the answer from the smallest total up to the largest one. For each value, it adds how many valid sequences already existed for previous totals.
