# Merge k Sorted Lists

Problem link:
https://leetcode.com/problems/merge-k-sorted-lists/

## The problem

We receive a `lists` array containing multiple already sorted linked lists.

We need to merge all of them into a single sorted linked list.

## How the solution works

The solution merges lists in pairs.

While there is more than one list, we go through the array two at a time:

- merge list `0` with `1`
- then `2` with `3`
- and so on

Each pair is merged using the same idea from the problem of merging two sorted lists.

After that, we build a new array with the merged lists.

We repeat the process until only one list remains.

## Quick example

If:

```js
lists = [[1, 4, 5], [1, 3, 4], [2, 6]]
```

We first merge the lists in pairs.

At the end, all values are in sorted order:

```js
[1, 1, 2, 3, 4, 4, 5, 6]
```

## Results for the examples

### Example 1

```js
lists = [[1, 4, 5], [1, 3, 4], [2, 6]]
result = [1, 1, 2, 3, 4, 4, 5, 6]
```

### Example 2

```js
lists = []
result = []
```

### Example 3

```js
lists = [[]]
result = []
```

## Complexity

- Time: `O(n log k)`
- Space: `O(1)` extra, not counting the input structure

`n` is the total number of nodes and `k` is the number of lists.

## Summary

This solution reduces the problem step by step by merging lists in pairs until only one remains. It reuses the sorted merge logic and avoids merging everything at once.
