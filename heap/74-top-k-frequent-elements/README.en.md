# Top K Frequent Elements

Problem link:
https://leetcode.com/problems/top-k-frequent-elements/

## The problem

We receive an array of numbers `nums` and a number `k`.

We need to return the `k` most frequent numbers in the array.

The answer can be in any order.

## How the solution works

The solution counts how many times each number appears.

Then we turn that count into a list of pairs: number and frequency.

We sort that list by frequency, from highest to lowest.

Finally, we take the first `k` numbers.

## Quick example

If:

```js
nums = [1, 1, 1, 2, 2, 3]
k = 2
```

The frequencies are:

```js
1 -> 3 times
2 -> 2 times
3 -> 1 time
```

The result is:

```js
[1, 2]
```

## Results for the examples

### Example 1

```js
nums = [1, 1, 1, 2, 2, 3]
k = 2
result = [1, 2]
```

### Example 2

```js
nums = [1]
k = 1
result = [1]
```

### Example 3

```js
nums = [1, 2, 1, 2, 1, 2, 3, 1, 3, 2]
k = 2
result = [1, 2]
```

## Complexity

- Time: `O(n log n)`
- Space: `O(n)`

Where `n` is the number of values in `nums`.

## Summary

This solution counts frequencies, sorts by the most frequent values, and returns the first `k`.
