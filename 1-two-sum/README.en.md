# Two Sum

Problem link:
https://leetcode.com/problems/two-sum

## The problem

Given an array `nums` and a `target` value, we need to find the indices of two numbers whose sum is equal to `target`.

## How the solution works

We use a `Map` to store:

- the number we have already seen
- the index of that number

While looping through the array:

1. We calculate the value needed to reach the `target`
2. We check whether that value was already seen
3. If it was, we return the two indices
4. If not, we save the current number in the `Map`

## Quick example

If `nums = [3, 2, 4]` and `target = 6`:

- at index `0`, the number is `3` and we need `3`
- at index `1`, the number is `2` and we need `4`
- at index `2`, the number is `4` and we need `2`

Since `2` was already stored, the answer is `[1, 2]`.

## Results for the 3 examples

### Example 1

```js
nums = [2, 7, 11, 15]
target = 9
result = [0, 1]
```

### Example 2

```js
nums = [3, 2, 4]
target = 6
result = [1, 2]
```

### Example 3

```js
nums = [3, 3]
target = 6
result = [0, 1]
```

## Complexity

- Time: `O(n)`
- Space: `O(n)`

## Summary

This solution is efficient because it scans the array only once and uses a `Map` to quickly find the complementary value.
