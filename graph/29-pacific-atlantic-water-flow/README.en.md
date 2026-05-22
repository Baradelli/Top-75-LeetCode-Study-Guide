# Pacific Atlantic Water Flow

Problem link:
https://leetcode.com/problems/pacific-atlantic-water-flow/

## The problem

We receive a matrix `heights` where each position represents the height of a cell on the island.

Water can move up, down, left, and right, but it can only flow from one cell to another with lower or equal height.

We need to find all positions where water can reach both:

- the Pacific Ocean
- the Atlantic Ocean

## How the solution works

Instead of starting from each cell, the solution does the path in reverse.

It starts:

- from the Pacific borders
- from the Atlantic borders

Then it uses DFS to mark which cells each ocean can reach.

During this reverse search, we only move to cells with height greater than or equal to the previous one:

```js
if (heights[row][col] < previousHeight) {
  return;
}
```

At the end, the cells that appear in both sets are the answer.

## Quick example

If:

```js
heights = [[1]]
```

There is only one cell, and it touches both oceans.

So the result is:

```js
[[0, 0]]
```

## Results for the examples

### Example 1

```js
heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
result = [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
```

### Example 2

```js
heights = [[1]]
result = [[0,0]]
```

### Example 3

```js
heights = [[3,3,3],[3,1,3],[3,3,3]]
result = [[0,0],[0,1],[0,2],[1,0],[1,2],[2,0],[2,1],[2,2]]
```

## Complexity

- Time: `O(m * n)`
- Space: `O(m * n)`

## Summary

This solution performs two searches, one starting from the Pacific borders and another from the Atlantic borders. Then it keeps only the cells visited by both oceans.
