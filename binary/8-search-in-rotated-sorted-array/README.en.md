# Search in Rotated Sorted Array

Problem link:
https://leetcode.com/problems/search-in-rotated-sorted-array/

## The problem

Given a sorted array that has been rotated and a `target` value, we need to return the index of that value.

If the value does not exist, we return `-1`.

## How the solution works

Since the array was rotated, it is not fully sorted from beginning to end.
Even so, at each step of binary search, one of the two halves is still sorted.

The idea is:

1. Find the middle
2. Check whether we found the `target`
3. Determine which half is sorted
4. Decide whether the `target` is inside that half
5. Discard the other half

This lets us remove half of the array at each step.

## Quick example

If `nums = [4, 5, 6, 7, 0, 1, 2]` and `target = 0`:

- the middle helps identify which side is sorted
- the value `0` is inside the rotated part
- we continue searching until we find index `4`

## Results for the examples

### Example 1

```js
nums = [4, 5, 6, 7, 0, 1, 2]
target = 0
result = 4
```

### Example 2

```js
nums = [4, 5, 6, 7, 0, 1, 2]
target = 3
result = -1
```

### Example 3

```js
nums = [1]
target = 0
result = -1
```

## Complexity

- Time: `O(log n)`
- Space: `O(1)`

## Summary

This solution is efficient because it uses binary search and takes advantage of the fact that one half of the rotated array is always sorted.
