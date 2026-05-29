# Maximum Depth of Binary Tree

Problem link:
https://leetcode.com/problems/maximum-depth-of-binary-tree/

## The problem

We receive the root of a binary tree.

We need to return the maximum depth of that tree.

The maximum depth is the number of nodes in the longest path from the root to a leaf.

## How the solution works

The solution uses breadth-first search.

If the root is `null`, the depth is `0`.

Otherwise, we put the root in a queue and visit the tree level by level.

After finishing each level, we increase the depth counter.

When the queue becomes empty, the counter represents the maximum depth.

## Quick example

If:

```js
root = [3, 9, 20, null, null, 15, 7]
```

The deepest path has 3 nodes:

```js
3 -> 20 -> 15
```

The result is:

```js
3
```

## Results for the examples

### Example 1

```js
root = [3, 9, 20, null, null, 15, 7]
result = 3
```

### Example 2

```js
root = [1, null, 2]
result = 2
```

### Example 3

```js
root = []
result = 0
```

## Complexity

- Time: `O(n)`
- Space: `O(w)`

Where `n` is the number of nodes and `w` is the maximum width of the tree.

## Summary

This solution visits the tree level by level and counts how many levels exist until the end.
