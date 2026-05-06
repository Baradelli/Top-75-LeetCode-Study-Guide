# Maximum Subarray

Problem link:
https://leetcode.com/problems/maximum-subarray/

## The problem

Given an array `nums`, we need to find the largest possible sum of a contiguous subarray.

Contiguous subarray means a sequence of neighboring elements inside the array.

## How the solution works

This solution uses Kadane's algorithm.

The idea is simple:

- `currentSum` stores the best sum ending at the current position
- `maxSum` stores the best sum found in the entire array

At each step, we choose between:

1. starting a new subarray at the current number
2. continuing the previous subarray by adding the current number

Then we update the best value found so far.

## Quick example

If `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]`:

The best segment is:

```js
[4, -1, 2, 1]
```

Its sum is:

```js
6
```

## Results for the examples

### Example 1

```js
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
result = 6
```

### Example 2

```js
nums = [1]
result = 1
```

### Example 3

```js
nums = [5, 4, -1, 7, 8]
result = 23
```

## Complexity

- Time: `O(n)`
- Space: `O(1)`

## Summary

This solution is efficient because it scans the array only once and decides at each position whether it is better to restart the sum or continue the current segment.
