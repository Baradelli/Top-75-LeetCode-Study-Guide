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

### Why does `a ^ b` help?

The `XOR` operator compares the bits of `a` and `b`.

- `0 ^ 0 = 0`
- `0 ^ 1 = 1`
- `1 ^ 0 = 1`
- `1 ^ 1 = 0`

This is very similar to binary addition when we ignore the carry.

Example:

```js
0 + 0 = 0
0 + 1 = 1
1 + 0 = 1
1 + 1 = 0 // the carry is missing here
```

So `a ^ b` gives us the partial sum.

### Why does `(a & b) << 1` compute the carry?

The `AND` operator returns `1` only when both bits are `1`.

- `0 & 0 = 0`
- `0 & 1 = 0`
- `1 & 0 = 0`
- `1 & 1 = 1`

In binary addition, that is exactly when a carry is created.

But that carry does not stay in the current position. It must move to the next column.
That is why we use `<< 1`, which shifts the carry one position to the left.

## Step-by-step example

If `a = 2` and `b = 3`, in binary we have:

```js
a = 0010
b = 0011
```

Let us follow each loop iteration:

### Initial state

```js
a = 0010
b = 0011
```

### Step 1

First we compute the carry:

```js
a & b = 0010 & 0011 = 0010
carry = 0010 << 1 = 0100
```

Now we compute the partial sum:

```js
a ^ b = 0010 ^ 0011 = 0001
```

Then we update the variables:

```js
a = 0001
b = 0100
```

Interpretation:

- `a` stores the sum without carry
- `b` stores the carry that still needs to be added

### Step 2

We compute the new carry:

```js
a & b = 0001 & 0100 = 0000
carry = 0000 << 1 = 0000
```

We compute the new partial sum:

```js
a ^ b = 0001 ^ 0100 = 0101
```

Updating again:

```js
a = 0101
b = 0000
```

Now `b` is `0`, so there is no carry left.
The loop stops.

Final result:

```js
0101 = 5
```

### What really happened?

In the first round:

- `XOR` built the partial sum
- `AND` found where two `1` bits collided
- `<< 1` moved that carry to the next position

In the second round:

- we added the partial sum and the carry
- since no new carry appeared, we were done

That is the core idea of the algorithm: repeat "sum without carry" + "carry" until only the final answer remains.

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
