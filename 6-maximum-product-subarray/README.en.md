# Maximum Product Subarray

Problem link:
https://leetcode.com/problems/maximum-product-subarray/

## The problem

Given an array `nums`, we need to find the largest possible product of a contiguous subarray.

Contiguous subarray means a sequence of neighboring elements inside the array.

## How the solution works

In this problem, it is not enough to track only the current maximum product.

That happens because:

- a negative number can turn a very small value into a very large one
- a maximum product can become a minimum
- a minimum product can become a maximum

So the solution keeps:

- `max`: the largest product ending at the current position
- `min`: the smallest product ending at the current position
- `result`: the best answer found so far

When the current number is negative, we swap `max` and `min` because the sign will flip.

## Quick example

If `nums = [2, 3, -2, 4]`:

- `2 * 3 = 6`
- when `-2` appears, the product sign changes
- in the end, the best subarray is still `[2, 3]`

Result:

```js
6
```

## Results for the examples

### Example 1

```js
nums = [2, 3, -2, 4]
result = 6
```

### Example 2

```js
nums = [-2, 0, -1]
result = 0
```

### Example 3

```js
nums = [-2, 3, -4]
result = 24
```

## Complexity

- Time: `O(n)`
- Space: `O(1)`

## Summary

This solution is efficient because it scans the array once and tracks both the current maximum and current minimum product at the same time.
