# Spiral Matrix

Problem link:
https://leetcode.com/problems/spiral-matrix/

## The problem

We receive an `m x n` matrix.

We need to return all elements in spiral order.

That means visiting:

- the top row from left to right
- the right column from top to bottom
- the bottom row from right to left
- the left column from bottom to top

And repeating that process until the whole matrix is visited.

## How the solution works

The solution tracks four boundaries:

- `top`
- `bottom`
- `left`
- `right`

These boundaries represent the current spiral layer.

In each loop:

- we scan the top row
- we scan the right column
- if there is still a remaining row, we scan the bottom row
- if there is still a remaining column, we scan the left column

Then we move the boundaries inward to process the next layer.

## Quick example

If:

```js
matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]
```

The result should be:

```js
[1, 2, 3, 6, 9, 8, 7, 4, 5]
```

## Results for the examples

### Example 1

```js
matrix = [[1,2,3],[4,5,6],[7,8,9]]
result = [1,2,3,6,9,8,7,4,5]
```

### Example 2

```js
matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
result = [1,2,3,4,8,12,11,10,9,5,6,7]
```

### Example 3

```js
matrix = [[1],[2],[3],[4]]
result = [1,2,3,4]
```

## Complexity

- Time: `O(m * n)`
- Space: `O(1)` extra, not counting the output array

## Summary

This solution walks through the matrix layer by layer, always adjusting the four boundaries of the unvisited region. That gives us the spiral order in a simple and direct way.
