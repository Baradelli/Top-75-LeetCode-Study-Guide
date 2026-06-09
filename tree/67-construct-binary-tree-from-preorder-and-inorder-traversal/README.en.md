# Construct Binary Tree from Preorder and Inorder Traversal

Problem link:
https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

## The problem

We receive two arrays: `preorder` and `inorder`.

They represent the traversals of the same binary tree.

We need to rebuild the original tree and return its root.

## How the solution works

The solution uses recursion.

In `preorder` traversal, the first value is always the root of the current tree.

Then we find that root inside `inorder`.

Everything to the left of the root in `inorder` belongs to the left subtree.

Everything to the right belongs to the right subtree.

With those pieces, we repeat the process to build the left and right children.

## Quick example

If:

```js
preorder = [3, 9, 20, 15, 7]
inorder = [9, 3, 15, 20, 7]
```

The root is `3` because it is the first value in `preorder`.

In `inorder`, `9` is to the left of `3`, and `15, 20, 7` are to the right.

The result is:

```js
[3, 9, 20, null, null, 15, 7]
```

## Results for the examples

### Example 1

```js
preorder = [3, 9, 20, 15, 7]
inorder = [9, 3, 15, 20, 7]
result = [3, 9, 20, null, null, 15, 7]
```

### Example 2

```js
preorder = [-1]
inorder = [-1]
result = [-1]
```

### Example 3

```js
preorder = [1, 2]
inorder = [2, 1]
result = [1, 2]
```

## Complexity

- Time: `O(n²)`
- Space: `O(n)`

Where `n` is the number of nodes in the tree.

## Summary

This solution uses the first value in `preorder` as the root and splits `inorder` to recursively rebuild the subtrees.
