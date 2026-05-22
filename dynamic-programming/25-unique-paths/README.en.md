# Unique Paths

Problem link:
https://leetcode.com/problems/unique-paths/

## The problem

There is a robot on an `m x n` grid.

It starts in the top-left corner and wants to reach the bottom-right corner.

At each step, it can only:

- move right
- move down

We need to find how many different paths exist.

## How the solution works

This solution uses dynamic programming.

The idea is:

- the last row has only `1` possible path from each position
- the last column also has only `1` possible path

After that, each cell becomes:

```js
paths from the right + paths from below
```

In the code:

```js
newRow[j] = newRow[j + 1] + row[j];
```

We use only one previous row and one current row, so we do not need to store the entire grid.

## Quick example

If:

```js
m = 3
n = 2
```

The possible paths are:

1. right -> down -> down
2. down -> right -> down
3. down -> down -> right

Result:

```js
3
```

## Results for the examples

### Example 1

```js
m = 3
n = 7
result = 28
```

### Example 2

```js
m = 3
n = 2
result = 3
```

### Example 3

```js
m = 3
n = 3
result = 6
```

## Complexity

- Time: `O(m * n)`
- Space: `O(n)`

## Summary

This solution computes the paths from the end back to the start. Each position uses only the value to the right and the value below to determine its answer.
