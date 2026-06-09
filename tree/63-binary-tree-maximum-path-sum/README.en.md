# Binary Tree Maximum Path Sum

Problem link:
https://leetcode.com/problems/binary-tree-maximum-path-sum/

## The problem

We receive the root of a binary tree.

We need to return the maximum possible sum of a non-empty path.

A path can start and end at any node, but it cannot visit the same node more than once.

## How the solution works

The solution uses depth-first search with recursion.

For each node, we calculate the best sum that can continue upward to the parent.

If one side of the tree has a negative sum, we ignore that side by using `0`.

We also test the best sum that passes through the current node using:

```js
root.val + leftMax + rightMax
```

This sum can use both sides because it represents a full path through the current node.

The value returned to the parent uses only one side because a path that continues upward cannot split.

## Quick example

If:

```js
root = [1, 2, 3]
```

The best path is:

```js
2 -> 1 -> 3
```

The result is:

```js
6
```

## Results for the examples

### Example 1

```js
root = [1, 2, 3]
result = 6
```

### Example 2

```js
root = [-10, 9, 20, null, null, 15, 7]
result = 42
```

### Example 3

```js
root = [-3]
result = -3
```

## Complexity

- Time: `O(n)`
- Space: `O(h)`

Where `n` is the number of nodes in the tree and `h` is the tree height.

## Summary

This solution visits each node once and keeps the best global sum found during recursion.
