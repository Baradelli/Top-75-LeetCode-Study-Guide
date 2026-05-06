# Product of Array Except Self

Problem link:
https://leetcode.com/problems/product-of-array-except-self/

## The problem

Given an array `nums`, we need to return a new array where each position contains the product of all other numbers except the current one.

## How the solution works

This solution does it without using division.

It scans the array in two passes:

1. From left to right, it stores the product of everything before the current index
2. From right to left, it multiplies by the product of everything after the current index

So each position receives:

- the product of the elements on the left
- multiplied by the product of the elements on the right

## Quick example

If `nums = [1, 2, 3, 4]`:

- for index `0`, the result is `2 * 3 * 4 = 24`
- for index `1`, the result is `1 * 3 * 4 = 12`
- for index `2`, the result is `1 * 2 * 4 = 8`
- for index `3`, the result is `1 * 2 * 3 = 6`

Final result:

```js
[24, 12, 8, 6]
```

## Results for the examples

### Example 1

```js
nums = [1, 2, 3, 4]
result = [24, 12, 8, 6]
```

### Example 2

```js
nums = [-1, 1, 0, -3, 3]
result = [0, 0, 9, 0, 0]
```

## Complexity

- Time: `O(n)`
- Extra space: `O(1)`

Note:
If you count the output array, the total space becomes `O(n)`.

## Summary

This solution is efficient because it scans the array twice and builds the answer using running products from the left and from the right.
