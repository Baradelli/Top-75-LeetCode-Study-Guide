# Sum of Two Integers

Problem link:
https://leetcode.com/problems/sum-of-two-integers/

## The problem

Given two integers `a` and `b`, we need to return their sum.

The restriction is that we cannot use the `+` and `-` operators.

## How the solution works

The solution uses bit operations to simulate addition:

1. `a ^ b` computes the sum without the carry
2. `(a & b) << 1` computes the carry
3. we repeat the process until there is no carry left

While `b` is different from `0`:

- `a` stores the partial sum
- `b` stores the carry

When `b` becomes `0`, it means there is no carry left to add, so `a` is already the final answer.

## Quick example

If `a = 1` and `b = 2`:

- `1 ^ 2` gives the sum without carry
- `(1 & 2) << 1` gives the carry
- we repeat until the carry disappears

In the end, the result is `3`.

## Results for the examples

### Example 1

```js
a = 1
b = 2
result = 3
```

### Example 2

```js
a = 2
b = 3
result = 5
```

### Example 3

```js
a = -4
b = 7
result = 3
```

## Complexity

- Time: `O(1)`
- Space: `O(1)`

## Summary

This solution is efficient because it uses binary operations to reproduce integer addition without relying on the `+` and `-` operators.
