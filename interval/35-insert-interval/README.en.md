# Insert Interval

Problem link:
https://leetcode.com/problems/insert-interval/

## The problem

We receive an `intervals` array with intervals that are already sorted and do not overlap.

We also receive a new interval:

```js
newInterval
```

We need to insert this new interval in the correct position.

If it overlaps with existing intervals, we must merge everything into a single interval.

## How the solution works

The solution goes through the intervals once.

There are three cases:

- the new interval ends before the current interval
- the new interval starts after the current interval
- the two intervals overlap

When overlap exists, the solution updates `newInterval` with the new boundaries:

```js
newInterval = [
  Math.min(newInterval[0], intervals[index][0]),
  Math.max(newInterval[1], intervals[index][1]),
];
```

This makes the interval grow while needed.

When we find the first position where it should be inserted without overlap, we add it to the result and finish.

## Quick example

If:

```js
intervals = [[1, 3], [6, 9]]
newInterval = [2, 5]
```

The new interval merges with `[1, 3]` and becomes:

```js
[1, 5]
```

So the final result is:

```js
[[1, 5], [6, 9]]
```

## Results for the examples

### Example 1

```js
intervals = [[1, 3], [6, 9]]
newInterval = [2, 5]
result = [[1, 5], [6, 9]]
```

### Example 2

```js
intervals = [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]]
newInterval = [4, 8]
result = [[1, 2], [3, 10], [12, 16]]
```

### Example 3

```js
intervals = [[1, 5]]
newInterval = [6, 8]
result = [[1, 5], [6, 8]]
```

## Complexity

- Time: `O(n)`
- Space: `O(n)`

## Summary

This solution scans the intervals in order, adds the ones that stay fully before the new interval, merges the overlapping ones, and then builds the final sorted result.
