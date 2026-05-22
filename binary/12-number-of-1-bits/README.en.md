# Number of 1 Bits

Problem link:
https://leetcode.com/problems/number-of-1-bits/

## The problem

Given an unsigned integer `n`, we need to return how many `1` bits appear in its binary representation.

This is also called the Hamming weight.

## How the solution works

The solution scans the bits of the number from right to left:

1. it looks at the last bit with `n & 1`
2. it adds that value to the counter
3. it shifts the number one position to the right
4. it repeats until `n` becomes `0`

If the last bit is `1`, we add `1` to the counter.
If it is `0`, we add nothing.

### Why does `n & 1` work?

The number `1` in binary is:

```js
0001
```

When we do `n & 1`, we are checking only the last bit of `n`.

- if the last bit of `n` is `1`, the result will be `1`
- if the last bit of `n` is `0`, the result will be `0`

So this gives us a direct way to know whether the rightmost bit is set.

### Why do we use `n >>> 1`?

After checking the last bit, we do not need it anymore.
So we shift the number one position to the right.

Example:

```js
1011 >>> 1 = 0101
```

This makes the next bit become the new "last bit" for the next iteration.

## Step-by-step example

If `n = 11`, its binary form is:

```js
1011
```

Let us follow the algorithm step by step:

### Initial state

```js
n = 11
binary = 1011
count = 0
```

### Step 1

The last bit is:

```js
1011 & 0001 = 0001
```

So:

- we found a `1` bit
- `count` becomes `1`

Then we shift:

```js
1011 >>> 1 = 0101
```

Now:

```js
n = 5
count = 1
```

### Step 2

The last bit now is:

```js
0101 & 0001 = 0001
```

So:

- we found another `1` bit
- `count` becomes `2`

Then we shift:

```js
0101 >>> 1 = 0010
```

Now:

```js
n = 2
count = 2
```

### Step 3

The last bit now is:

```js
0010 & 0001 = 0000
```

So:

- this bit is `0`
- `count` stays `2`

Then we shift:

```js
0010 >>> 1 = 0001
```

Now:

```js
n = 1
count = 2
```

### Step 4

The last bit now is:

```js
0001 & 0001 = 0001
```

So:

- we found one more `1` bit
- `count` becomes `3`

Then we shift:

```js
0001 >>> 1 = 0000
```

Now:

```js
n = 0
count = 3
```

Since `n` is now `0`, the loop stops.

Final result:

```js
3
```

## Results for the examples

### Example 1

```js
n = 11
result = 3
```

### Example 2

```js
n = 128
result = 1
```

### Example 3

```js
n = 2147483645
result = 30
```

## Complexity

- Time: `O(1)`
- Space: `O(1)`

Note:
Since the problem works with a 32-bit integer, the number of iterations is bounded.

## Summary

This solution is efficient because it inspects the bits directly and counts how many `1` values appear in the binary representation of the number.
