# Counting Bits

Problem link:
https://leetcode.com/problems/counting-bits/

## The problem

Given an integer `n`, we need to return an array `ans` of length `n + 1`.

For each position `i`, the value `ans[i]` must be the number of `1` bits in the binary representation of `i`.

## How the solution works

The main idea is to reuse results we have already computed.

Instead of counting the bits of every number from scratch, we use this relation:

```js
res[i] = res[i >> 1] + (i & 1)
```

This works because:

1. `i >> 1` removes the last bit of `i`
2. `res[i >> 1]` already stores how many `1` bits exist in that smaller value
3. `i & 1` tells us whether the last bit of `i` is `0` or `1`
4. we add those two pieces of information

### Why does `i >> 1` help?

Shifting a number one position to the right in binary is the same as removing its last bit.

Example:

```js
13 = 1101
13 >> 1 = 110 = 6
```

So:

- `13` contains the bits of `6`
- plus the last bit that was removed

### Why does `i & 1` help?

The value `1` in binary is:

```js
0001
```

When we do `i & 1`, we inspect only the last bit of `i`.

- if the result is `1`, the number ends with `1`
- if the result is `0`, the number ends with `0`

This tells us exactly whether we need to add one more set bit to the previous result.

## Step-by-step example

If `n = 5`, we need to build:

```js
res[0] through res[5]
```

### Initial state

We start with:

```js
res[0] = 0
```

Because the number `0` in binary is:

```js
0
```

and it has no `1` bits.

### Step 1: i = 1

```js
1 = 0001
1 >> 1 = 0
1 & 1 = 1
```

So:

```js
res[1] = res[0] + 1 = 0 + 1 = 1
```

Now:

```js
res = [0, 1]
```

### Step 2: i = 2

```js
2 = 0010
2 >> 1 = 1
2 & 1 = 0
```

So:

```js
res[2] = res[1] + 0 = 1 + 0 = 1
```

Now:

```js
res = [0, 1, 1]
```

### Step 3: i = 3

```js
3 = 0011
3 >> 1 = 1
3 & 1 = 1
```

So:

```js
res[3] = res[1] + 1 = 1 + 1 = 2
```

Now:

```js
res = [0, 1, 1, 2]
```

### Step 4: i = 4

```js
4 = 0100
4 >> 1 = 2
4 & 1 = 0
```

So:

```js
res[4] = res[2] + 0 = 1 + 0 = 1
```

Now:

```js
res = [0, 1, 1, 2, 1]
```

### Step 5: i = 5

```js
5 = 0101
5 >> 1 = 2
5 & 1 = 1
```

So:

```js
res[5] = res[2] + 1 = 1 + 1 = 2
```

Final result:

```js
[0, 1, 1, 2, 1, 2]
```

## Results for the examples

### Example 1

```js
n = 2
result = [0, 1, 1]
```

### Example 2

```js
n = 5
result = [0, 1, 1, 2, 1, 2]
```

### Example 3

```js
n = 8
result = [0, 1, 1, 2, 1, 2, 2, 3, 1]
```

## Complexity

- Time: `O(n)`
- Space: `O(n)`

## Summary

This solution is efficient because it uses simple dynamic programming: each answer reuses the value of a smaller number that has already been computed.
