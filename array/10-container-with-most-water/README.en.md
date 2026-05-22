# Container With Most Water

Problem link:
https://leetcode.com/problems/container-with-most-water/

## The problem

Given an array `height`, each position represents the height of a vertical line.

We need to choose two lines that, together with the horizontal axis, form a container that can store the maximum amount of water.

## How the solution works

The solution uses two pointers:

1. One at the start of the array
2. One at the end of the array

At each step:

- we calculate the width between the pointers
- we use the smaller height between the two sides
- we calculate the area formed
- we keep the largest area found

After that, we move the pointer with the smaller height.

We do this because the shorter line is the one limiting the stored water. So to try to improve the area, we need to search for a taller line on that side.

## Quick example

If `height = [1, 8, 6, 2, 5, 4, 8, 3, 7]`:

- we start with the first and the last line
- we calculate the possible area between them
- we keep moving the pointer on the shorter side
- in the best case, we find area `49`

## Results for the examples

### Example 1

```js
height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
result = 49
```

### Example 2

```js
height = [1, 1]
result = 1
```

### Example 3

```js
height = [4, 3, 2, 1, 4]
result = 16
```

## Complexity

- Time: `O(n)`
- Space: `O(1)`

## Summary

This solution is efficient because it scans the array in a single pass with two pointers, without testing every possible combination.
