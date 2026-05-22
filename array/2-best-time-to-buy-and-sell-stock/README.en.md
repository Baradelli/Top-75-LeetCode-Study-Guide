# Best Time to Buy and Sell Stock

Problem link:
https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

## The problem

Given an array `prices`, where each value is the stock price on a given day, we need to find the maximum profit possible by buying on one day and selling on a later day.

## How the solution works

We scan the array only once while tracking:

- the lowest price seen so far
- the best profit found so far

At each position:

1. We check whether the current price is the new minimum
2. We calculate the profit if we sell on the current day
3. We update the best profit whenever it improves

## Quick example

If `prices = [7, 1, 5, 3, 6, 4]`:

- we start with the minimum price `7`
- then we find `1`, so it becomes the new minimum
- when we reach `6`, the profit is `6 - 1 = 5`

That is the best possible profit, so the answer is `5`.

## Results for the examples

### Example 1

```js
prices = [7, 1, 5, 3, 6, 4]
result = 5
```

### Example 2

```js
prices = [7, 6, 4, 3, 1]
result = 0
```

## Complexity

- Time: `O(n)`
- Space: `O(1)`

## Summary

This solution is efficient because it scans the array once and keeps track of the lowest price to quickly compute the best profit.
