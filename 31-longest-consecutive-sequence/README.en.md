# Longest Consecutive Sequence

Problem link:
https://leetcode.com/problems/longest-consecutive-sequence/

## The problem

We receive an unsorted array `nums`.

We need to find the length of the longest sequence of consecutive numbers.

The numbers in the sequence do not need to be next to each other in the original array.

## How the solution works

The solution puts all numbers into a `Set`.

This allows fast checks to see whether a number exists.

Then it only starts counting a sequence when it finds the beginning of that sequence:

```js
if (!numSet.has(n - 1)) {
```

If `n - 1` does not exist, then `n` is the first number of that sequence.

From there, it keeps moving forward while the next consecutive values exist in the set.

## Quick example

If:

```js
nums = [100, 4, 200, 1, 3, 2]
```

The longest consecutive sequence is:

```js
[1, 2, 3, 4]
```

So the result is:

```js
4
```

## Results for the examples

### Example 1

```js
nums = [100, 4, 200, 1, 3, 2]
result = 4
```

### Example 2

```js
nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
result = 9
```

### Example 3

```js
nums = [1, 0, 1, 2]
result = 3
```

## Complexity

- Time: `O(n)`
- Space: `O(n)`

## Summary

This solution uses a `Set` to quickly find the start of each sequence. Then it counts the length only from those starting points, avoiding repeated work.
