# Coin Change

Problem link:
https://leetcode.com/problems/coin-change/

## The problem

Given an array `coins` with coin values and an integer `amount`, we need to find the minimum number of coins required to make that value.

If it is not possible to form the value, the answer must be `-1`.

## How the solution works

This solution uses dynamic programming.

The idea is to compute, for every value from `0` to `amount`, the minimum number of coins needed.

We create an array `dp` where:

```js
dp[a]
```

stores the best answer for value `a`.

We start with:

```js
dp[0] = 0
```

because zero coins are needed to form the value `0`.

Then, for each current value, we test every coin that fits:

```js
const candidate = dp[currentAmount - coin] + 1;
```

If that option is better, we update `dp`.

## Quick example

If:

```js
coins = [1, 2, 5]
amount = 11
```

One good way to think about it is:

- for `11`, we can try coin `5`
- then `6` remains
- for `6`, the best answer was already computed earlier

In the end, the best combination is:

```js
5 + 5 + 1
```

Result:

```js
3
```

## Results for the examples

### Example 1

```js
coins = [1, 2, 5]
amount = 11
result = 3
```

### Example 2

```js
coins = [2]
amount = 3
result = -1
```

### Example 3

```js
coins = [1]
amount = 0
result = 0
```

## Complexity

- Time: `O(amount * numberOfCoins)`
- Space: `O(amount)`

## Summary

This solution works well because it builds the answer from the smallest value up to the largest one. Instead of trying random combinations, it reuses results that were already computed.
