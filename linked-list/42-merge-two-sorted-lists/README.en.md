# Merge Two Sorted Lists

Problem link:
https://leetcode.com/problems/merge-two-sorted-lists/

## The problem

We receive two already sorted linked lists:

```js
list1
list2
```

We need to merge them into a single sorted linked list.

## How the solution works

The solution uses an auxiliary node called `dummy`.

We also use a `tail` pointer, which always points to the end of the list we are building.

While both lists still have nodes, we compare the current values:

- if `list1.val` is smaller, we attach that node
- otherwise, we attach the node from `list2`

Then we move forward in the chosen list and also move `tail`.

When one list ends, we just connect the rest of the other list.

## Quick example

If:

```js
list1 = [1, 2, 4]
list2 = [1, 3, 4]
```

We keep taking the smallest available value.

The final result is:

```js
[1, 1, 2, 3, 4, 4]
```

## Results for the examples

### Example 1

```js
list1 = [1, 2, 4]
list2 = [1, 3, 4]
result = [1, 1, 2, 3, 4, 4]
```

### Example 2

```js
list1 = []
list2 = []
result = []
```

### Example 3

```js
list1 = []
list2 = [0]
result = [0]
```

## Complexity

- Time: `O(n + m)`
- Space: `O(1)` extra

## Summary

This solution walks through both lists at the same time and builds the answer in sorted order. The `dummy` node helps simplify construction of the final list.
