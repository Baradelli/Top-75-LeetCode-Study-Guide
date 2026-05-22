# Remove Nth Node From End of List

Problem link:
https://leetcode.com/problems/remove-nth-node-from-end-of-list/

## The problem

We receive the `head` of a linked list and a number `n`.

We need to remove the `n`th node from the end of the list.

At the end, we return the new head of the list.

## How the solution works

The solution uses two pointers:

- `right`
- `left`

We also use an auxiliary `dummy` node that points to the start of the list.

First we move `right` forward by `n` positions.

Then we move `left` and `right` together until `right` reaches the end.

At that moment, `left.next` is exactly the node that must be removed.

So we do:

```js
left.next = left.next.next
```

This skips the removed node.

## Quick example

If:

```js
head = [1, 2, 3, 4, 5]
n = 2
```

The second node from the end is `4`.

After removing it, the result is:

```js
[1, 2, 3, 5]
```

## Results for the examples

### Example 1

```js
head = [1, 2, 3, 4, 5]
n = 2
result = [1, 2, 3, 5]
```

### Example 2

```js
head = [1]
n = 1
result = []
```

### Example 3

```js
head = [1, 2]
n = 1
result = [1]
```

## Complexity

- Time: `O(n)`
- Space: `O(1)`

## Summary

This solution uses two pointers with a fixed distance between them. That makes it possible to find the node to remove without first counting the full length of the list.
