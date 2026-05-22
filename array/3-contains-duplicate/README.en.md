# Contains Duplicate

Problem link:
https://leetcode.com/problems/contains-duplicate/

## The problem

Given an array `nums`, we need to check whether any value appears more than once.

If at least one duplicate exists, we return `true`.
If all values are different, we return `false`.

## How the solution works

The solution uses a `Set` to store the numbers that have already appeared.

While iterating through the array:

1. We check whether the current number is already in the `Set`
2. If it is, we return `true`
3. If it is not, we add it to the `Set`
4. If the loop ends, we return `false`

## Quick example

If `nums = [1, 2, 3, 1]`:

- we see `1` and store it
- we see `2` and store it
- we see `3` and store it
- we see `1` again

Since `1` was already in the `Set`, the answer is `true`.

## Results for the examples

### Example 1

```js
nums = [1, 2, 3, 1]
result = true
```

### Example 2

```js
nums = [1, 2, 3, 4]
result = false
```

### Example 3

```js
nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]
result = true
```

## Honorable mention

This version is also valid:

```js
var containsDuplicate = function(nums) {
    return new Set(nums).size !== nums.length;
};
```

It is correct and perfectly acceptable.

However, your solution has a nice advantage: it can return early.
That means as soon as it finds a duplicate, it immediately returns `true` without processing the rest of the array.

The `new Set(nums).size !== nums.length` version has to build the full `Set` first and only then compare sizes.

## Complexity

- Time: `O(n)`
- Space: `O(n)`

## Summary

This solution is simple, efficient, and interview-friendly because it uses a `Set` and can stop early when it finds a duplicate.
