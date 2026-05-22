# Linked List Cycle

Problem link:
https://leetcode.com/problems/linked-list-cycle/

## The problem

We receive the `head` of a linked list.

We need to determine whether there is a cycle in it.

This happens when, by following the `next` pointers, we eventually reach a node that was already visited.

## How the solution works

The solution uses two pointers:

- `slow`, which moves 1 step at a time
- `fast`, which moves 2 steps at a time

If the list has a cycle, the two pointers will eventually meet.

If `fast` reaches the end of the list, then there is no cycle.

This technique is known as Floyd's Cycle Detection.

## Quick example

If:

```js
head = [3, 2, 0, -4]
pos = 1
```

This means the last node points back to the node at index `1`.

So the list loops forever and the result is:

```js
true
```

## Results for the examples

### Example 1

```js
head = [3, 2, 0, -4]
pos = 1
result = true
```

### Example 2

```js
head = [1, 2]
pos = 0
result = true
```

### Example 3

```js
head = [1]
pos = -1
result = false
```

## Complexity

- Time: `O(n)`
- Space: `O(1)`

## Summary

This solution uses two pointers moving at different speeds. If they meet, there is a cycle. If the fast pointer reaches the end, there is no cycle.
