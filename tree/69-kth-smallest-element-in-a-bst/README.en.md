# Kth Smallest Element in a BST

Problem link:
https://leetcode.com/problems/kth-smallest-element-in-a-bst/

## The problem

We receive the root of a binary search tree and a number `k`.

We need to return the kth smallest value in the tree.

`k` starts at `1`, so `k = 1` means the smallest value.

## How the solution works

The solution uses the BST property.

In a binary search tree, an inorder traversal visits values in increasing order.

So we traverse the tree in this order: left, current node, right.

Each time we visit a node, we decrease `k`.

When `k` reaches `0`, we found the kth smallest value.

## Quick example

If:

```js
root = [3, 1, 4, null, 2]
k = 1
```

The inorder traversal gives the values:

```js
[1, 2, 3, 4]
```

The first smallest value is:

```js
1
```

## Results for the examples

### Example 1

```js
root = [3, 1, 4, null, 2]
k = 1
result = 1
```

### Example 2

```js
root = [5, 3, 6, 2, 4, null, null, 1]
k = 3
result = 3
```

### Example 3

```js
root = [2, 1]
k = 2
result = 2
```

## Complexity

- Time: `O(h + k)`
- Space: `O(h)`

Where `h` is the tree height.

## Summary

This solution uses an iterative inorder traversal and stops as soon as it finds the kth smallest value.
