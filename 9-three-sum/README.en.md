# 3Sum

Problem link:
https://leetcode.com/problems/3sum/

## The problem

Given an array `nums`, we need to find all unique triplets whose sum is equal to `0`.

The answer cannot contain duplicate triplets.

## How the solution works

The solution does this in two steps:

1. Sort the array
2. For each position, use two pointers to search for the other two numbers

After sorting:

- we fix one number at `i`
- we use `l` on the left and `r` on the right
- if the sum is greater than `0`, we decrease `r`
- if the sum is smaller than `0`, we increase `l`
- if the sum is `0`, we save the triplet

We also skip repeated values to avoid duplicates.

## Quick example

If `nums = [-1, 0, 1, 2, -1, -4]`, after sorting we get:

```js
[-4, -1, -1, 0, 1, 2]
```

The valid triplets are:

```js
[[-1, -1, 2], [-1, 0, 1]]
```

## Results for the examples

### Example 1

```js
nums = [-1, 0, 1, 2, -1, -4]
result = [[-1, -1, 2], [-1, 0, 1]]
```

### Example 2

```js
nums = [0, 1, 1]
result = []
```

### Example 3

```js
nums = [0, 0, 0]
result = [[0, 0, 0]]
```

## Complexity

- Time: `O(n^2)`
- Extra space: `O(1)`

Note:
If you count the output itself, the total space depends on how many triplets are found.

## Summary

This solution is efficient because it sorts the array once and then uses two pointers to find triplets without repeating combinations.
