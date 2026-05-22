# Meeting Rooms II

Problem link:
https://leetcode.com/problems/meeting-rooms-ii/

## The problem

We receive an `intervals` array with the start and end time of meetings.

We need to find the minimum number of rooms required to schedule all meetings without conflicts.

If one meeting ends exactly when another starts, the same room can be reused.

## How the solution works

The solution separates all start times and all end times.

Then it sorts both lists.

We use two pointers:

- one for starts
- one for ends

When the next start happens before the next end, we need one more room.

When a meeting has already ended, we free one room by moving the end pointer.

During the process, we keep the highest number of rooms used at the same time.

## Quick example

If:

```js
intervals = [[0, 40], [5, 10], [15, 20]]
```

While the meeting `[0, 40]` is still happening, the meeting `[5, 10]` starts.

So we already need 2 rooms.

After that, no moment requires more than that.

Result:

```js
2
```

## Results for the examples

### Example 1

```js
intervals = [[0, 40], [5, 10], [15, 20]]
result = 2
```

### Example 2

```js
intervals = [[4, 9]]
result = 1
```

### Example 3

```js
intervals = [[0, 8], [8, 10], [9, 12]]
result = 2
```

## Complexity

- Time: `O(n log n)` because of sorting
- Space: `O(n)` to store the start and end times

## Summary

This solution sorts start times and end times separately and simulates how many rooms are occupied at each moment. The highest value reached is the answer.
