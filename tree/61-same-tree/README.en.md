# Same Tree

Problem link:
https://leetcode.com/problems/same-tree/

## The problem

We receive the roots of two binary trees: `p` and `q`.

We need to check if both trees are the same.

Two trees are the same when they have the same structure and the same values in the same places.

## How the solution works

The solution uses recursion.

If both nodes are `null`, they are the same.

If only one of them is `null`, the trees are different.

If both nodes exist, we compare their values.

When the values are equal, we repeat the same comparison for the left side and the right side.

## Quick example

If:

```js
p = [1, 2, 3]
q = [1, 2, 3]
```

Both trees have the same structure and the same values.

The result is:

```js
true
```

## Results for the examples

### Example 1

```js
p = [1, 2, 3]
q = [1, 2, 3]
result = true
```

### Example 2

```js
p = [1, 2]
q = [1, null, 2]
result = false
```

### Example 3

```js
p = [1, 2, 1]
q = [1, 1, 2]
result = false
```

## Complexity

- Time: `O(n)`
- Space: `O(h)`

Where `n` is the number of visited nodes and `h` is the tree height.

## Summary

This solution compares both trees at the same time, node by node, making sure structure and values are equal.
