# Set Matrix Zeroes

Problem link:
https://leetcode.com/problems/set-matrix-zeroes/

## The problem

We receive an `m x n` matrix.

If any element is `0`, we need to set its entire row and column to `0`.

The change must be done in place.

## How the solution works

The solution uses the first row and the first column as markers.

When we find a `0`, we mark:

- the first cell of the same row
- the first cell of the same column

Then we scan the rest of the matrix and set each position to `0` if its row or column was marked.

At the end, we handle the first row and the first column separately, because they are also part of the original matrix.

## Quick example

If:

```js
matrix = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
]
```

The result should be:

```js
[
  [1, 0, 1],
  [0, 0, 0],
  [1, 0, 1],
]
```

## Results for the examples

### Example 1

```js
matrix = [[1,1,1],[1,0,1],[1,1,1]]
result = [[1,0,1],[0,0,0],[1,0,1]]
```

### Example 2

```js
matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
result = [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
```

### Example 3

```js
matrix = [[1,2,3],[4,5,6],[7,8,0]]
result = [[1,2,0],[4,5,0],[0,0,0]]
```

## Complexity

- Time: `O(m * n)`
- Space: `O(1)`

## Summary

This solution uses the matrix itself to store markers for rows and columns that must become zero. That solves the problem without creating extra structures proportional to the matrix size.
