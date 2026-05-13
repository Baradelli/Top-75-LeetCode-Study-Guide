# House Robber

Problem link:
https://leetcode.com/problems/house-robber/

## The problem

Given an array `nums`, where each value represents the money in a house, we need to find the maximum amount that can be robbed.

The rule is:

- we cannot rob two adjacent houses

## How the solution works

This solution uses a dynamic programming idea, but without needing an extra array.

At each house, there are two options:

- rob the current house and add it to the best value from two houses before
- skip the current house and keep the previous best value

In the code:

```js
const currentBest = Math.max(num + rob1, rob2);
```

Where:

- `rob1` stores the best value up to two houses before
- `rob2` stores the best value up to the previous house

Then we update those values for the next iteration.

## Quick example

If:

```js
nums = [1, 2, 3, 1]
```

The best choice is to rob:

```js
1 + 3
```

Result:

```js
4
```

## Results for the examples

### Example 1

```js
nums = [1, 2, 3, 1]
result = 4
```

### Example 2

```js
nums = [2, 7, 9, 3, 1]
result = 12
```

### Example 3

```js
nums = [2, 1, 1, 2]
result = 4
```

## Complexity

- Time: `O(n)`
- Space: `O(1)`

## Summary

This solution scans the array once and, at each step, decides between robbing the current house or keeping the best answer already found.
