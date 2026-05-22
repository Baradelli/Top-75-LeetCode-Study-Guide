# Meeting Rooms

Problem link:
https://leetcode.com/problems/meeting-rooms/

## The problem

We receive an `intervals` array with the start and end time of each meeting.

We need to determine if one person can attend all meetings without conflicts.

If one meeting ends exactly when the next one starts, that is not considered an overlap.

## How the solution works

The solution first sorts the intervals by start time.

Then it compares each meeting with the previous one.

If the end of the previous meeting is greater than the start of the current meeting, there is a conflict and the answer is `false`.

If no overlap is found, the answer is `true`.

## Quick example

If:

```js
intervals = [[0, 30], [5, 10], [15, 20]]
```

After sorting, we can already see that `[0, 30]` overlaps the beginning of `[5, 10]`.

So the result is:

```js
false
```

## Results for the examples

### Example 1

```js
intervals = [[0, 30], [5, 10], [15, 20]]
result = false
```

### Example 2

```js
intervals = [[5, 8], [9, 15]]
result = true
```

### Example 3

```js
intervals = [[0, 8], [8, 10], [12, 14]]
result = true
```

## Complexity

- Time: `O(n log n)` because of sorting
- Space: `O(1)` if we ignore the internal sorting cost

## Summary

This solution sorts the meetings and checks whether any meeting starts before the previous one ends. If that happens, there is a conflict; otherwise, all meetings can be attended.
