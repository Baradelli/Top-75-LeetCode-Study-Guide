# Reverse Bits

Problem link:
https://leetcode.com/problems/reverse-bits/

## The problem

Given a 32-bit integer, we need to reverse the order of its bits and return the new value.

This means:

- the first bit becomes the last one
- the second becomes the second-to-last
- and so on

## How the solution works

The solution scans all 32 bits of `n` and builds a new number called `res`.

The idea is:

1. read one bit from `n`
2. find the reversed position where it should go
3. set that bit inside `res`

In the code, we do this with:

```js
const bit = (n >>> i) & 1;
res = res | (bit << (31 - i));
```

## Why does `n >>> i` work?

The `>>>` operator shifts bits to the right without keeping the sign bit.

That matters here because the problem treats `n` as an unsigned 32-bit value.

When we do:

```js
n >>> i
```

we move the bit at position `i` to the end of the number.

After that:

```js
& 1
```

keeps only that last bit.

So:

```js
(n >>> i) & 1
```

gives us exactly the bit that was originally at position `i`.

## Why does `bit << (31 - i)` work?

If we read a bit from position `i`, it must be placed in the reversed position:

```js
31 - i
```

Examples:

- a bit from position `0` goes to position `31`
- a bit from position `1` goes to position `30`
- a bit from position `31` goes to position `0`

So:

```js
bit << (31 - i)
```

moves the bit into the correct place inside the result.

## Step-by-step example

Let us use a small example to visualize the idea more easily.

Imagine this number in 8 bits:

```js
00000101
```

After reversing its bits, we want:

```js
10100000
```

In the real problem we do this with 32 bits, but the logic is exactly the same.

### Initial state

```js
n   = 00000101
res = 00000000
```

### Step 1: i = 0

We read the bit at position `0`:

```js
bit = (n >>> 0) & 1 = 1
```

That bit must go to the reversed position:

```js
7 - 0 = 7
```

So:

```js
res = res | (1 << 7)
res = 10000000
```

### Step 2: i = 1

We read the bit at position `1`:

```js
bit = (n >>> 1) & 1 = 0
```

Since it is `0`, nothing changes:

```js
res = 10000000
```

### Step 3: i = 2

We read the bit at position `2`:

```js
bit = (n >>> 2) & 1 = 1
```

The reversed position is:

```js
7 - 2 = 5
```

So:

```js
res = res | (1 << 5)
res = 10100000
```

### Remaining steps

All the other bits are `0`, so the result stays:

```js
10100000
```

That is the number with reversed bits.

## Results for the examples

### Example 1

```js
n = 43261596
result = 964176192
```

### Example 2

```js
n = 2147483644
result = 1073741822
```

### Example 3

```js
n = 1
result = 2147483648
```

## Complexity

- Time: `O(1)`
- Space: `O(1)`

Note:
The loop always runs 32 times, so the cost is constant.

## Summary

This solution is efficient because it reads each bit once and places it directly into the reversed position of the final number.
