# Binary Tree Level Order Traversal

Problem link:
https://leetcode.com/problems/binary-tree-level-order-traversal/

## The problem

We receive the root of a binary tree.

We need to return the node values level by level, from left to right.

Each level must be placed inside a separate array.

## How the solution works

The solution uses depth-first search with recursion.

We start at the root with depth `0`.

When we visit a node, we put its value in the array for the current depth.

If an array for that depth does not exist yet, we create a new one.

Then we visit the left child and the right child with depth increased by `1`.

## Quick example

If:

```js
root = [3, 9, 20, null, null, 15, 7]
```

The levels are:

```js
[[3], [9, 20], [15, 7]]
```

The result is:

```js
[[3], [9, 20], [15, 7]]
```

## Results for the examples

### Example 1

```js
root = [3, 9, 20, null, null, 15, 7]
result = [[3], [9, 20], [15, 7]]
```

### Example 2

```js
root = [1]
result = [[1]]
```

### Example 3

```js
root = []
result = []
```

## Complexity

- Time: `O(n)`
- Space: `O(h)`

Where `n` is the number of nodes in the tree and `h` is the tree height used by the recursion stack.

## Summary

This solution traverses the tree and groups each value according to the node depth.
