# Reorder List

Problem link:
https://leetcode.com/problems/reorder-list/

## The problem

We receive the `head` of a linked list.

We need to reorder the nodes in this pattern:

```text
L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2
```

We cannot change node values, only the pointers.

## How the solution works

The solution has three steps.

First we find the middle of the list using two pointers.

Then we reverse the second half.

Finally, we merge the two halves by alternating:

- one node from the first half
- one node from the reversed second half

This builds the required order without creating a new list.

## Quick example

If:

```js
head = [1, 2, 3, 4, 5]
```

The new order becomes:

```js
[1, 5, 2, 4, 3]
```

## Results for the examples

### Example 1

```js
head = [1, 2, 3, 4]
result = [1, 4, 2, 3]
```

### Example 2

```js
head = [1, 2, 3, 4, 5]
result = [1, 5, 2, 4, 3]
```

### Example 3

```js
head = [1, 2]
result = [1, 2]
```

## Complexity

- Time: `O(n)`
- Space: `O(1)`

## Summary

This solution splits the list into two parts, reverses the second half, and then alternates nodes from both sides. That lets us reorder the list in place.
