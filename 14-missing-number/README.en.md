# Missing Number

Problem link:
https://leetcode.com/problems/missing-number/

## The problem

Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, we need to find which number is missing.

This means the array should contain every value from `0` to `n`, but one of them does not appear.

## How the main solution works

The main solution uses sums, because it is the most straightforward one to understand.

The idea is:

1. compute the sum that should exist from `0` to `n`
2. compute the sum of the values that are actually in the array
3. subtract one from the other

Expected sum formula:

```js
n * (n + 1) / 2
```

So:

```js
missingNumber = expectedSum - actualSum
```

### Step-by-step example for the main solution

If:

```js
nums = [3, 0, 1]
```

The array length is `3`, so the numbers should be:

```js
0, 1, 2, 3
```

### Step 1

We compute the expected sum:

```js
3 * (3 + 1) / 2 = 6
```

### Step 2

We compute the actual sum of the array:

```js
3 + 0 + 1 = 4
```

### Step 3

We take the difference:

```js
6 - 4 = 2
```

Result:

```js
2
```

## Alternative solution with XOR

Since this problem appears in the binary section, it is also worth learning the `XOR` version.

The idea is to use this property:

```js
a ^ a = 0
0 ^ a = a
```

This means that if we apply `XOR` to all indices and all array values, the numbers that appear on both sides cancel each other out.
In the end, only the missing number remains.

### Why does this work?

Imagine that we want every number from `0` to `n`.

If we apply `XOR` to everything:

- `0 ^ 0` cancels out
- `1 ^ 1` cancels out
- `2 ^ 2` cancels out
- ...

Since the missing number does not find its pair, it is the one left at the end.

## Step-by-step XOR example

Using:

```js
nums = [3, 0, 1]
```

We start with:

```js
xor = nums.length = 3
```

We do this because the loop will visit indices `0`, `1`, and `2`, and we still need to include the value `3`.

### Step 1: i = 0

```js
xor = 3
xor ^= 0
xor = 3
xor ^= 3
xor = 0
```

### Step 2: i = 1

```js
xor = 0
xor ^= 1
xor = 1
xor ^= 0
xor = 1
```

### Step 3: i = 2

```js
xor = 1
xor ^= 2
xor = 3
xor ^= 1
xor = 2
```

Final result:

```js
2
```

That `2` is exactly the missing number.

## Comparison between the two

- The sum solution is easier to understand and great for quick review
- The XOR solution is very useful for practicing bit reasoning
- Both solve the problem in linear time

## Results for the examples

### Example 1

```js
nums = [3, 0, 1]
result = 2
```

### Example 2

```js
nums = [0, 1]
result = 2
```

### Example 3

```js
nums = [9, 6, 4, 2, 3, 5, 7, 0, 1]
result = 8
```

## Complexity

### Sum solution

- Time: `O(n)`
- Space: `O(1)`

### XOR solution

- Time: `O(n)`
- Space: `O(1)`

## Summary

In this problem, the sum version is the easiest one to understand, while the XOR version is a great alternative for practicing bit manipulation.
