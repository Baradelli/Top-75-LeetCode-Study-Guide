# Jump Game

Problem link:
https://leetcode.com/problems/jump-game/

## The problem

Given an array `nums`, we start at index `0`.

Each value in the array tells us the maximum jump length we can make from that position.

We need to determine whether it is possible to reach the last index.

## How the solution works

This solution uses a greedy strategy.

Instead of trying every jump, we start from the end of the array and move the goal backward.

We create a variable:

```js
goal
```

It stores the position that we need to be able to reach.

If an index `i` can reach `goal`, then the new goal becomes `i`:

```js
if (i + nums[i] >= goal) {
  goal = i;
}
```

In the end, if the goal moved all the way back to index `0`, then the answer is `true`.

## Quick example

If:

```js
nums = [2, 3, 1, 1, 4]
```

From index `0`, we can reach index `1`.

From index `1`, we can jump to the end.

Result:

```js
true
```

## Results for the examples

### Example 1

```js
nums = [2, 3, 1, 1, 4]
result = true
```

### Example 2

```js
nums = [3, 2, 1, 0, 4]
result = false
```

### Example 3

```js
nums = [2, 0, 0]
result = true
```

## Complexity

- Time: `O(n)`
- Space: `O(1)`

## Summary

This solution scans the array once from right to left. Whenever a position can reach the current goal, it becomes the new goal.
