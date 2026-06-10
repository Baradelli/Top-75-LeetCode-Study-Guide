# Validate Binary Search Tree

Problem link:
https://leetcode.com/problems/validate-binary-search-tree/

## The problem

We receive the root of a binary tree.

We need to check if it is a valid binary search tree.

In a valid BST, every value in the left subtree must be smaller than the current node, and every value in the right subtree must be greater.

This rule must also be true for every subtree.

## How the solution works

The solution uses recursion with limits.

For each node, we keep the smallest and largest value it can have.

At the beginning, the root can be between `-Infinity` and `Infinity`.

When we go left, the maximum value becomes the current node's value.

When we go right, the minimum value becomes the current node's value.

If any node is outside those limits, the tree is not a valid BST.

## Quick example

If:

```js
root = [2, 1, 3]
```

The value `1` is to the left of `2`, and the value `3` is to the right of `2`.

The result is:

```js
true
```

## Results for the examples

### Example 1

```js
root = [2, 1, 3]
result = true
```

### Example 2

```js
root = [5, 1, 4, null, null, 3, 6]
result = false
```

### Example 3

```js
root = [5, 4, 6, null, null, 3, 7]
result = false
```

## Complexity

- Time: `O(n)`
- Space: `O(h)`

Where `n` is the number of nodes in the tree and `h` is the tree height.

## Summary

This solution traverses the tree and checks whether each node respects the allowed limits for its position.
