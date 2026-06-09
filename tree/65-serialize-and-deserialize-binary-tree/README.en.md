# Serialize and Deserialize Binary Tree

Problem link:
https://leetcode.com/problems/serialize-and-deserialize-binary-tree/

## The problem

We receive the root of a binary tree.

We need to create two functions:

- `serialize`, which turns the tree into a string
- `deserialize`, which turns that string back into the original tree

The tree structure must be preserved.

## How the solution works

The solution uses preorder traversal.

During serialization, we visit the current node, then the left child, then the right child.

When we find a `null` node, we store `N` in the string.

This marker is important because it lets us rebuild the exact tree structure.

During deserialization, we read the values in the same order and recreate each node recursively.

## Quick example

If:

```js
root = [1, 2, 3, null, null, 4, 5]
```

The tree can become a string like:

```js
"1,2,N,N,3,4,N,N,5,N,N"
```

After deserializing that string, we get back:

```js
[1, 2, 3, null, null, 4, 5]
```

## Results for the examples

### Example 1

```js
root = [1, 2, 3, null, null, 4, 5]
result = [1, 2, 3, null, null, 4, 5]
```

### Example 2

```js
root = []
result = []
```

### Example 3

```js
root = [1, -2, 3]
result = [1, -2, 3]
```

## Complexity

- Time: `O(n)`
- Space: `O(n)`

Where `n` is the number of nodes in the tree.

## Summary

This solution stores the tree in preorder using `N` for empty nodes, which lets us rebuild the same structure later.
