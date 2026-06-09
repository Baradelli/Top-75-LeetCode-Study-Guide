# Invert Binary Tree

Problem link:
https://leetcode.com/problems/invert-binary-tree/

## The problem

We receive the root of a binary tree.

We need to invert the tree and return its root.

Inverting the tree means swapping the left side and the right side of every node.

## How the solution works

The solution uses recursion.

If the root is `null`, we return `null`.

Otherwise, we swap the left and right children of the current node.

Then we repeat the same process for both children.

In the end, the same root points to the inverted tree.

## Quick example

If:

```js
root = [2, 1, 3]
```

After inversion, the left child becomes the right child and the right child becomes the left child.

The result is:

```js
[2, 3, 1]
```

## Results for the examples

### Example 1

```js
root = [4, 2, 7, 1, 3, 6, 9]
result = [4, 7, 2, 9, 6, 3, 1]
```

### Example 2

```js
root = [2, 1, 3]
result = [2, 3, 1]
```

### Example 3

```js
root = []
result = []
```

## Complexity

- Time: `O(n)`
- Space: `O(h)`

Where `n` is the number of nodes in the tree and `h` is the tree height.

## Summary

This solution visits each node once and swaps its children, creating the mirrored version of the tree.
