# Merge Intervals

Problem link:
https://leetcode.com/problems/merge-intervals/

## The problem

We receive an `intervals` array with several intervals.

Some of these intervals may overlap.

We need to merge intervals that touch or overlap and return only the final non-overlapping intervals.

## How the solution works

The solution first sorts the intervals by their starting value.

This is important because after sorting, we only need to compare each interval with the last interval already placed in the answer.

We create an array:

```js
mergedIntervals
```

It starts with the first interval.

Then, for each next interval:

- if its start is less than or equal to the end of the last saved interval, there is overlap
- then we update the end of the last interval with the larger value
- if there is no overlap, we add a new interval to the answer

## Quick example

If:

```js
intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
```

The first two intervals overlap:

```js
[1, 3] and [2, 6]
```

So they become:

```js
[1, 6]
```

Final result:

```js
[[1, 6], [8, 10], [15, 18]]
```

## Results for the examples

### Example 1

```js
intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
result = [[1, 6], [8, 10], [15, 18]]
```

### Example 2

```js
intervals = [[1, 4], [4, 5]]
result = [[1, 5]]
```

### Example 3

```js
intervals = [[4, 7], [1, 4]]
result = [[1, 7]]
```

## Complexity

- Time: `O(n log n)`
- Space: `O(n)`

The main cost comes from sorting the intervals.

## Summary

This solution sorts the intervals and then scans the list once, merging the overlapping ones and keeping only the final blocks.
