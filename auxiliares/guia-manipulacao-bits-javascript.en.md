# Practical Guide to Bit Manipulation in JavaScript

This guide exists to support the bit manipulation problems in this repository.

Bit manipulation is not something we usually use every day in common applications, so it is normal for it to feel strange at first.
Because of that, the goal here is not only to explain isolated operators, but to show:

- what each operator does
- which problem in this project uses it
- how to practice with the examples that already exist in folders `11` through `15`

## How this guide connects to the project

If you want to study bits together with real code from the repository, these are the best places to start:

- [11-sum-of-two-integers/README.en.md](../11-sum-of-two-integers/README.en.md): uses `^`, `&`, and `<<`
- [12-number-of-1-bits/README.en.md](../12-number-of-1-bits/README.en.md): uses `& 1` and `>>>`
- [13-counting-bits/README.en.md](../13-counting-bits/README.en.md): uses `>>` and `& 1`
- [14-missing-number/README.en.md](../14-missing-number/README.en.md): compares a simple solution and an `XOR` solution
- [15-reverse-bits/README.en.md](../15-reverse-bits/README.en.md): uses `>>>`, `<<`, and `|`

If the idea is to study in a good progression, this is a useful order:

1. `12-number-of-1-bits`
2. `13-counting-bits`
3. `14-missing-number`
4. `11-sum-of-two-integers`
5. `15-reverse-bits`

## First: decimal vs binary

When you write:

```js
const n = 11;
```

that value is in decimal.

In binary, `11` is:

```txt
1011
```

If you want to write a binary value directly in JavaScript:

```js
const n = 0b1011;
console.log(n); // 11
```

## The most important JavaScript detail

In JavaScript, bitwise operators work with 32-bit integers.

That creates two especially important rules:

1. `>>` preserves the sign
2. `>>>` shifts and fills with zero

In practice:

- when the problem treats a number as an unsigned 32-bit integer, `>>>` is usually the safer choice
- when you only want to divide a positive number by 2 or remove the last bit, `>>` often works well

You can see that difference mainly in these problems:

- [12-number-of-1-bits/README.en.md](../12-number-of-1-bits/README.en.md)
- [15-reverse-bits/README.en.md](../15-reverse-bits/README.en.md)

## Operators that appear the most in these exercises

### `&` - bitwise AND

`&` returns `1` only when both bits are `1`.

Table:

```txt
0 & 0 = 0
0 & 1 = 0
1 & 0 = 0
1 & 1 = 1
```

Example:

```js
5 & 3
```

Visually:

```txt
5 = 101
3 = 011

  101
& 011
-----
  001
```

Result:

```txt
1
```

### Where this appears in the project

- `11-sum-of-two-integers`: `a & b` finds where carry exists
- `12-number-of-1-bits`: `n & 1` reads the last bit
- `13-counting-bits`: `i & 1` checks whether the last bit is `1`

## `& 1` - look at the last bit

This is one of the most important patterns of all:

```js
n & 1
```

It looks only at the last bit of the number.

- if the result is `1`, the number ends in `1`
- if the result is `0`, the number ends in `0`

Example:

```txt
5 = 101
1 = 001

  101
& 001
-----
  001
```

Result:

```txt
1
```

With `4`:

```txt
4 = 100
1 = 001

  100
& 001
-----
  000
```

Result:

```txt
0
```

### Where to practice this in the project

The best problem to fix this idea is:

- [12-number-of-1-bits/README.en.md](../12-number-of-1-bits/README.en.md)

After that, it is worth continuing with:

- [13-counting-bits/README.en.md](../13-counting-bits/README.en.md)

## `|` - bitwise OR

`|` returns `1` if at least one of the bits is `1`.

Table:

```txt
0 | 0 = 0
0 | 1 = 1
1 | 0 = 1
1 | 1 = 1
```

Example:

```txt
5 = 101
3 = 011

  101
| 011
-----
  111
```

Result:

```txt
7
```

### Where this appears in the project

The clearest example is in:

- [15-reverse-bits/README.en.md](../15-reverse-bits/README.en.md)

There we use:

```js
res = res | (bit << (31 - i));
```

The role of `|` there is:

- keep the bits that are already set in `res`
- also turn on the new bit in the correct position

Without that `|`, the result would be overwritten on each step.

## `^` - bitwise XOR

`XOR` returns `1` when the bits are different.

Table:

```txt
0 ^ 0 = 0
0 ^ 1 = 1
1 ^ 0 = 1
1 ^ 1 = 0
```

Example:

```txt
5 = 101
3 = 011

  101
^ 011
-----
  110
```

Result:

```txt
6
```

### Important properties

```txt
x ^ x = 0
x ^ 0 = x
```

That makes `XOR` very useful for:

- canceling equal pairs
- finding a missing number
- building addition without carry

### Where this appears in the project

- [11-sum-of-two-integers/README.en.md](../11-sum-of-two-integers/README.en.md)
- [14-missing-number/README.en.md](../14-missing-number/README.en.md)

## `<<` - left shift

`<<` shifts bits to the left.

Example:

```js
5 << 1 // 10
5 << 2 // 20
```

Visually:

```txt
101 << 1 = 1010
101 << 2 = 10100
```

For positive numbers, think of it like:

```txt
n << 1 looks like n * 2
n << 2 looks like n * 4
```

### Where this appears in the project

- `11-sum-of-two-integers`: `(a & b) << 1`
- `15-reverse-bits`: `bit << (31 - i)`

In both cases, `<<` is not mainly being used as “multiply by 2”.
It is being used to move a bit to another position.

## `>>` - right shift preserving sign

`>>` shifts bits to the right while preserving the sign.

Example:

```js
13 >> 1 // 6
13 >> 2 // 3
```

Visually:

```txt
1101 >> 1 = 0110
1101 >> 2 = 0011
```

For positive numbers:

```txt
n >> 1 looks like Math.floor(n / 2)
n >> 2 looks like Math.floor(n / 4)
```

### Where this appears in the project

The best place to see this idea in action is:

- [13-counting-bits/README.en.md](../13-counting-bits/README.en.md)

There we use:

```js
res[i] = res[i >> 1] + (i & 1);
```

That means:

- `i >> 1` removes the last bit
- `i & 1` tells us whether that last bit was `0` or `1`

## `>>>` - unsigned right shift

`>>>` also shifts to the right, but always fills the left side with `0`.

That difference matters a lot in problems involving unsigned 32-bit numbers.

Conceptual comparison:

```txt
>>  preserves the sign
>>> fills with zero
```

### Where this appears in the project

- [12-number-of-1-bits/README.en.md](../12-number-of-1-bits/README.en.md)
- [15-reverse-bits/README.en.md](../15-reverse-bits/README.en.md)

In `reverseBits`, for example, this matters so each bit is read as part of an unsigned integer:

```js
const bit = (n >>> i) & 1;
return res >>> 0;
```

## `~` - bitwise NOT

`~` flips all bits.

But in JavaScript, it usually feels confusing because it works with signed 32-bit integers.

Example:

```js
~5 // -6
```

Practical rule:

```txt
~x = -(x + 1)
```

This operator does not appear directly in the problems already organized here, so for now it is less important in this repository.

## How to use the project itself to study bits

If you really want to retain this topic, the best path is to study theory and code together.

### Step 1: understand the last bit

Use:

- [12-number-of-1-bits/README.en.md](../12-number-of-1-bits/README.en.md)
- [12-number-of-1-bits/number-of-1-bits.js](../12-number-of-1-bits/number-of-1-bits.js)

Goal:

- understand `n & 1`
- understand right shifting
- notice how we count set bits

### Step 2: reuse the same idea in dynamic programming

Use:

- [13-counting-bits/README.en.md](../13-counting-bits/README.en.md)
- [13-counting-bits/counting-bits.js](../13-counting-bits/counting-bits.js)

Goal:

- see `>>` and `& 1` working together
- understand how one answer depends on another

### Step 3: practice canceling with XOR

Use:

- [14-missing-number/README.en.md](../14-missing-number/README.en.md)
- [14-missing-number/missing-number.js](../14-missing-number/missing-number.js)

Goal:

- visualize `x ^ x = 0`
- understand why repeated numbers cancel out
- compare a simple solution with a bitwise solution

### Step 4: understand real binary addition

Use:

- [11-sum-of-two-integers/README.en.md](../11-sum-of-two-integers/README.en.md)
- [11-sum-of-two-integers/sum-of-two-integers.js](../11-sum-of-two-integers/sum-of-two-integers.js)

Goal:

- see `^` as addition without carry
- see `&` as carry detection
- see `<<` moving carry to the next position

### Step 5: place bits in exact positions

Use:

- [15-reverse-bits/README.en.md](../15-reverse-bits/README.en.md)
- [15-reverse-bits/reverse-bits.js](../15-reverse-bits/reverse-bits.js)

Goal:

- understand reading bits with `>>>`
- understand building the result with `|`
- understand shifting into exact positions with `<<`

## What to review before an interview

If you forget everything and want a quick refresh, remember these points:

- `n & 1` looks at the last bit
- `n >> 1` or `n >>> 1` moves bits to the right
- `x ^ x = 0`
- `x ^ 0 = x`
- `(a & b) << 1` usually represents carry
- `res = res | (...)` usually means “turn on a bit without losing the previous ones”
- in JavaScript, `>>>` is often safer in unsigned 32-bit problems

## Final summary

Bit manipulation feels strange because it is not part of the routine in most everyday projects.
But once you connect each operator to a concrete problem, it starts making much more sense.

In this repository, problems `11` through `15` already form a very useful mini learning path for that:

- `11` shows binary addition
- `12` shows bit reading
- `13` shows reuse of binary patterns
- `14` shows cancellation with XOR
- `15` shows rebuilding bits in reversed positions

If you study this guide together with those exercises, the subject is much less likely to feel like “magic”.
