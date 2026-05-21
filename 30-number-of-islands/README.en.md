# Number of Islands

Problem link:
https://leetcode.com/problems/number-of-islands/

## The problem

We receive a matrix `grid` with `"1"` for land and `"0"` for water.

We need to count how many islands exist.

An island is formed by land cells connected horizontally or vertically.

## How the solution works

The solution scans the whole matrix.

When it finds a cell with `"1"`, it has found the start of a new island.

Then it uses DFS to visit the whole connected region and change those positions to `"0"`:

```js
grid[row][col] = "0";
```

This prevents the same island from being counted again.

## Quick example

If:

```js
grid = [
  ["1", "1", "0"],
  ["0", "1", "0"],
  ["0", "0", "1"],
];
```

There are two islands:

- the first one in the top-left area
- the second one in the bottom-right area

So the result is:

```js
2
```

## Results for the examples

### Example 1

```js
grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]
result = 1
```

### Example 2

```js
grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]
result = 3
```

### Example 3

```js
grid = [["1","0","1","0"],["0","1","0","1"],["1","0","1","0"]]
result = 6
```

## Complexity

- Time: `O(m * n)`
- Space: `O(m * n)` in the worst case because of recursion

## Summary

This solution counts a new island every time it finds a `"1"` that was not visited yet. Then it clears the whole connected region with DFS to avoid counting it again.
