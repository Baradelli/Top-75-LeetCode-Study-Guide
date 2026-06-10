# Lowest Common Ancestor of a Binary Search Tree

Problem link:
https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/

## The problem

We receive the root of a binary search tree and two nodes: `p` and `q`.

We need to find the lowest common ancestor of those two nodes.

A node can also be a descendant of itself.

## How the solution works

The solution uses the BST property.

If `p` and `q` are greater than the current node, both are in the right subtree.

If `p` and `q` are smaller than the current node, both are in the left subtree.

When they are on different sides, or when the current node is one of them, we found the lowest common ancestor.

## Quick example

If:

```js
root = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]
p = 2
q = 8
```

Node `2` is to the left of `6`, and node `8` is to the right.

So the lowest common ancestor is:

```js
6
```

## Results for the examples

### Example 1

```js
root = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]
p = 2
q = 8
result = 6
```

### Example 2

```js
root = [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]
p = 2
q = 4
result = 2
```

### Example 3

```js
root = [2, 1]
p = 2
q = 1
result = 2
```

## Complexity

- Time: `O(h)`
- Space: `O(1)`

Where `h` is the tree height.

## Summary

This solution walks through the BST until it finds the point where `p` and `q` are no longer on the same side.
