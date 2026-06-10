# Find Median from Data Stream

Problem link:
https://leetcode.com/problems/find-median-from-data-stream/

## The problem

We need to create a structure that receives numbers one by one.

After each insertion, it must be able to return the median of all numbers received so far.

If the number of values is even, the median is the average of the two middle values.

## How the solution works

The solution uses two heaps.

The `small` heap stores the smaller half of the numbers and works as a max heap.

The `large` heap stores the larger half of the numbers and works as a min heap.

After inserting a number, we rebalance the heaps so their size difference is at most `1`.

If one heap has more elements, its root is the median.

If both heaps have the same size, the median is the average of both roots.

## Quick example

If we insert:

```js
1
2
3
```

After `1` and `2`, the median is:

```js
1.5
```

After inserting `3`, the median is:

```js
2
```

## Results for the examples

### Example 1

```js
operations = ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
values = [[], [1], [2], [], [3], []]
result = [null, null, null, 1.5, null, 2]
```

### Example 2

```js
operations = ["MedianFinder", "addNum", "findMedian", "addNum", "findMedian"]
values = [[], [5], [], [10], []]
result = [null, null, 5, null, 7.5]
```

### Example 3

```js
operations = ["MedianFinder", "addNum", "addNum", "addNum", "findMedian"]
values = [[], [3], [1], [2], []]
result = [null, null, null, null, 2]
```

## Complexity

- Time to add: `O(log n)`
- Time to find the median: `O(1)`
- Space: `O(n)`

Where `n` is the number of added values.

## Summary

This solution keeps two balanced halves with heaps to access the median quickly.
