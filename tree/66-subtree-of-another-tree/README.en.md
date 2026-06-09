# Subtree of Another Tree

Problem link:
https://leetcode.com/problems/subtree-of-another-tree/

## The problem

We receive the roots of two binary trees: `root` and `subRoot`.

We need to check if `subRoot` appears inside `root` as a subtree.

A subtree must have the same structure and the same values starting from some node in `root`.

## How the solution works

The solution uses recursion.

First, we compare whether the current tree is exactly the same as `subRoot`.

For that, we use a helper function similar to the Same Tree problem.

If they are equal, we return `true`.

If they are not equal, we try to find `subRoot` in the left child or the right child of `root`.

## Quick example

If:

```js
root = [3, 4, 5, 1, 2]
subRoot = [4, 1, 2]
```

The `subRoot` tree appears inside `root` starting at node `4`.

The result is:

```js
true
```

## Results for the examples

### Example 1

```js
root = [3, 4, 5, 1, 2]
subRoot = [4, 1, 2]
result = true
```

### Example 2

```js
root = [3, 4, 5, 1, 2, null, null, null, null, 0]
subRoot = [4, 1, 2]
result = false
```

### Example 3

```js
root = [1, 1]
subRoot = [1]
result = true
```

## Complexity

- Time: `O(n * m)`
- Space: `O(h)`

Where `n` is the number of nodes in `root`, `m` is the number of nodes in `subRoot`, and `h` is the tree height.

## Summary

This solution traverses `root` and, at each node, checks whether the tree starting there is equal to `subRoot`.
