# House Robber II

Problem link:
https://leetcode.com/problems/house-robber-ii/

## The problem

Given an array `nums`, where each value represents the money in a house, we need to find the maximum amount that can be robbed.

The difference here is that the houses are arranged in a circle.

This means:

- the first house is adjacent to the last one
- we cannot rob both of them

## How the solution works

This solution reuses the idea from the previous problem.

If the houses are in a circle, then there are only two possible cases:

1. ignore the first house and solve the rest
2. ignore the last house and solve the rest

Then we take the larger result between those two cases.

To solve each linear case, we use the same logic as `House Robber`:

```js
const currentBest = Math.max(num + rob1, rob2);
```

Where:

- `rob1` stores the best value up to two houses before
- `rob2` stores the best value up to the previous house

We also handle separately the case where there is only one house.

## Quick example

If:

```js
nums = [2, 3, 2]
```

We cannot rob the first and last houses together, because they are adjacent.

So the best choice is:

```js
3
```

Result:

```js
3
```

## Results for the examples

### Example 1

```js
nums = [2, 3, 2]
result = 3
```

### Example 2

```js
nums = [1, 2, 3, 1]
result = 4
```

### Example 3

```js
nums = [1, 2, 3]
result = 3
```

## Complexity

- Time: `O(n)`
- Space: `O(1)`

## Summary

This solution turns the circular problem into two linear problems. After that, we can apply the same simple logic from `House Robber`.
