# Study Guide - Top 75 LeetCode

This repository is organized to help you study the **Top 75 LeetCode Questions** in a simple and consistent way.

The goal is to make each problem easy to:

- understand
- run
- review later
- compare in Portuguese and English

## How it is organized

Each problem stays inside its own folder.

Example:

```text
1-two-sum/
  two-sum.js
  README.pt.md
  README.en.md

2-best-time-to-buy-and-sell-stock/
  best-time-to-buy-and-sell-stock.js
  README.pt.md
  README.en.md
```

## What exists in each folder

### `.js` file

The JavaScript file contains:

- the solution function
- problem examples
- comparison between result and expected value
- colored terminal output

### `README.pt.md`

Explains the problem in Portuguese in a simple and brief way, including:

- official LeetCode link
- summary of the idea
- quick example
- example results
- complexity

### `README.en.md`

Brings the same explanation in English, which is useful for getting used to the platform's technical vocabulary.

## How to run

Go to the project folder and run the problem file with `node`.

Example:

```bash
node 1-two-sum/two-sum.js
node 2-best-time-to-buy-and-sell-stock/best-time-to-buy-and-sell-stock.js
```

## How to read the result

When you run a file:

- `green` means the result is correct
- `red` means the result is different from the expected one

This helps you quickly validate whether the solution is working.

## Best way to study

A simple way to use this material:

1. Read the problem on LeetCode
2. Try to solve it by yourself
3. Compare with the solution in the `.js` file
4. Read `README.pt.md` to reinforce the core idea
5. Read `README.en.md` to practice technical English
6. Run the file to see the examples working

## Goal of this structure

The focus is not only to store code.

The focus is to turn each exercise into a quick review resource, so later you can glance at it and remember:

- what the problem was
- what logic was used
- what the complexity is
- how to recognize this pattern in interviews

## Problems already organized

1. [Two Sum](./1-two-sum/README.en.md)
2. [Best Time to Buy and Sell Stock](./2-best-time-to-buy-and-sell-stock/README.en.md)
3. [Contains Duplicate](./3-contains-duplicate/README.en.md)
4. [Product of Array Except Self](./4-product-of-array-except-self/README.en.md)
5. [Maximum Subarray](./5-maximum-subarray/README.en.md)
6. [Maximum Product Subarray](./6-maximum-product-subarray/README.en.md)
7. [Find Minimum in Rotated Sorted Array](./7-find-minimum-in-rotated-sorted-array/README.en.md)
8. [Search in Rotated Sorted Array](./8-search-in-rotated-sorted-array/README.en.md)
9. [3Sum](./9-three-sum/README.en.md)
10. [Container With Most Water](./10-container-with-most-water/README.en.md)
11. [Sum of Two Integers](./11-sum-of-two-integers/README.en.md)
12. [Number of 1 Bits](./12-number-of-1-bits/README.en.md)

## Pattern for the next ones

For each new problem in the Top 75 list, the idea is to follow the same pattern:

1. Create a folder with the problem name
2. Add the `.js` file with the solution
3. Add runnable examples
4. Show in the terminal whether it passed or failed
5. Create `README.pt.md`
6. Create `README.en.md`

This way your material stays consistent, easy to review, and ready to grow as you study more problems.
