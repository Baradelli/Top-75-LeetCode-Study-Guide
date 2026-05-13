# Climbing Stairs

Problem link:
https://leetcode.com/problems/climbing-stairs/

## The problem

You are climbing a staircase with `n` steps.

At each move, you can climb:

- `1` step
- `2` steps

We need to find how many distinct ways there are to reach the top.

## How the solution works

This solution notices that, to reach the current step, there are only two possible previous positions:

- the previous step
- two steps before

So the number of ways for the current step is the sum of those two previous counts.

In the code, we store only the last two values:

```js
oneStepAhead = oneStepAhead + twoStepsAhead;
twoStepsAhead = currentWays;
```

This avoids creating an array and keeps the solution simple.

## Quick example

If:

```js
n = 3
```

The possible ways are:

1. `1 + 1 + 1`
2. `1 + 2`
3. `2 + 1`

Result:

```js
3
```

## Results for the examples

### Example 1

```js
n = 2
result = 2
```

### Example 2

```js
n = 3
result = 3
```

### Example 3

```js
n = 5
result = 8
```

## Complexity

- Time: `O(n)`
- Space: `O(1)`

## Summary

This problem follows the same idea as the Fibonacci sequence: each answer depends on the two previous ones. The solution is efficient because it stores only what is necessary.
