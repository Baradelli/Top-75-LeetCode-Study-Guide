# Non-overlapping Intervals

Problem link:
https://leetcode.com/problems/non-overlapping-intervals/

## The problem

We receive an `intervals` array with several intervals.

We need to find the minimum number of intervals that must be removed so the rest become non-overlapping.

Intervals that only touch, like `[1, 2]` and `[2, 3]`, are valid and do not count as overlapping.

## How the solution works

The solution uses a greedy strategy.

First we sort the intervals by their start value.

Then we scan the list comparing each interval with the previous one we decided to keep.

We store:

```js
previousEnd
```

This value represents the end of the last interval that remains valid.

If the current interval starts after or exactly at `previousEnd`, there is no conflict.

If overlap exists, we need to remove one of the two intervals.

To maximize the chance of fitting more intervals later, we keep the one that ends first:

```js
previousEnd = Math.min(previousEnd, currentEnd);
```

And we increase the removal count.

## Quick example

If:

```js
intervals = [[1, 2], [2, 3], [3, 4], [1, 3]]
```

The interval `[1, 3]` gets in the way of the others.

If we remove only it, the rest becomes non-overlapping:

```js
[[1, 2], [2, 3], [3, 4]]
```

So the result is:

```js
1
```

## Results for the examples

### Example 1

```js
intervals = [[1, 2], [2, 3], [3, 4], [1, 3]]
result = 1
```

### Example 2

```js
intervals = [[1, 2], [1, 2], [1, 2]]
result = 2
```

### Example 3

```js
intervals = [[1, 2], [2, 3]]
result = 0
```

## Complexity

- Time: `O(n log n)`
- Space: `O(1)` extra

The main cost comes from sorting.

## Summary

This solution sorts the intervals and uses a greedy choice: when there is a conflict, it keeps the interval that finishes first. This helps minimize the number of removals.
