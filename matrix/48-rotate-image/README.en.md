# Rotate Image

Problem link:
https://leetcode.com/problems/rotate-image/

## The problem

We receive an `n x n` square matrix that represents an image.

We need to rotate that image `90` degrees clockwise.

The rotation must be done in place, without creating another `n x n` matrix.

## How the solution works

The solution processes the matrix layer by layer, from the outermost layer to the innermost one.

In each layer, we rotate four positions at a time:

- top left
- bottom left
- bottom right
- top right

We temporarily store one value and move the other three into their new positions.

That lets each group of four elements rotate without needing a full auxiliary matrix.

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
[
  [7, 4, 1],
  [8, 5, 2],
  [9, 6, 3],
]
```

## Results for the examples

### Example 1

```js
matrix = [[1,2,3],[4,5,6],[7,8,9]]
result = [[7,4,1],[8,5,2],[9,6,3]]
```

### Example 2

```js
matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
result = [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
```

### Example 3

```js
matrix = [[1,2],[3,4]]
result = [[3,1],[4,2]]
```

## Complexity

- Time: `O(n * n)`
- Space: `O(1)`

## Summary

This solution rotates the image layer by layer, swapping groups of four positions at a time. That makes the in-place rotation efficient and avoids using another full matrix.
