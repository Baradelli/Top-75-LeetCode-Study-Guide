# Reverse Linked List

Problem link:
https://leetcode.com/problems/reverse-linked-list/

## The problem

We receive the `head` of a singly linked list.

We need to reverse the direction of the pointers so the list becomes reversed.

At the end, we must return the new head of the list.

## How the solution works

The solution walks through the list once.

At each step, it stores the next node, reverses the current pointer, and moves forward.

We use three references:

- `previous`
- `current`
- `nextNode`

The key line is:

```js
current.next = previous
```

It makes the current node point backward.

When the loop finishes, `previous` becomes the new head of the reversed list.

## Quick example

If:

```js
head = [1, 2, 3, 4, 5]
```

After reversing, the order becomes:

```js
[5, 4, 3, 2, 1]
```

## Results for the examples

### Example 1

```js
head = [1, 2, 3, 4, 5]
result = [5, 4, 3, 2, 1]
```

### Example 2

```js
head = [1, 2]
result = [2, 1]
```

### Example 3

```js
head = []
result = []
```

## Complexity

- Time: `O(n)`
- Space: `O(1)`

## Summary

This solution reverses the linked list in place by changing one pointer at a time. It is linear and uses constant space.
