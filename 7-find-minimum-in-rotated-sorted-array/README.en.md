# Find Minimum in Rotated Sorted Array

Problem link:
https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/

## The problem

Given a sorted array that has been rotated, we need to find its minimum value.

The array was originally increasing, but it was shifted some positions.

## How the solution works

Since the array still contains sorted portions, we can use binary search.

The idea is:

1. Check whether the current range is already fully sorted
2. If it is, the minimum is at the left edge
3. If it is not, we inspect the middle
4. Based on the middle value, we decide whether the minimum is on the left or on the right

This lets us discard half of the array at each step.

## Quick example

If `nums = [3, 4, 5, 1, 2]`:

- the array is not fully sorted
- the minimum is inside the rotated part
- using binary search, we reach the value `1`

## Results for the examples

### Example 1

```js
nums = [3, 4, 5, 1, 2]
result = 1
```

### Example 2

```js
nums = [4, 5, 6, 7, 0, 1, 2]
result = 0
```

### Example 3

```js
nums = [11, 13, 15, 17]
result = 11
```

## Complexity

- Time: `O(log n)`
- Space: `O(1)`

## Summary

This solution is efficient because it uses binary search to find the minimum value without scanning the entire array.
