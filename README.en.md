# Study Guide - Top 75 LeetCode

This repository is organized to help you study the **Top 75 LeetCode Questions** in a simple and consistent way.

The goal is to make each problem easy to:

- understand
- run
- review later
- compare in Portuguese and English

## How it is organized

Problems are now organized by type.

Example:

```text
array/
  1-two-sum/
    two-sum.js
    README.pt.md
    README.en.md

linked-list/
  40-reverse-linked-list/
    reverse-linked-list.js
    README.pt.md
    README.en.md

matrix/
  46-set-matrix-zeroes/
    set-matrix-zeroes.js
    README.pt.md
    README.en.md

string/
  50-longest-substring-without-repeating-characters/
    longest-substring-without-repeating-characters.js
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
node array/1-two-sum/two-sum.js
node linked-list/45-reorder-list/reorder-list.js
```

## Extra material

For bit manipulation problems, there are complementary guides connected to the project examples:

- [Bit Manipulation Guide in English](./auxiliares/guia-manipulacao-bits-javascript.en.md)
- [Guia Prático de Manipulação de Bits em JavaScript](./auxiliares/guia-manipulacao-bits-javascript.pt.md)

This is useful because bit manipulation is not something we normally use every day, so having a focused reference connected to the exercises helps a lot with review.

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

### Array

1. [Two Sum](./array/1-two-sum/README.en.md)
2. [Best Time to Buy and Sell Stock](./array/2-best-time-to-buy-and-sell-stock/README.en.md)
3. [Contains Duplicate](./array/3-contains-duplicate/README.en.md)
4. [Product of Array Except Self](./array/4-product-of-array-except-self/README.en.md)
5. [Maximum Subarray](./array/5-maximum-subarray/README.en.md)
6. [Maximum Product Subarray](./array/6-maximum-product-subarray/README.en.md)
9. [3Sum](./array/9-three-sum/README.en.md)
10. [Container With Most Water](./array/10-container-with-most-water/README.en.md)

### Binary

7. [Find Minimum in Rotated Sorted Array](./binary/7-find-minimum-in-rotated-sorted-array/README.en.md)
8. [Search in Rotated Sorted Array](./binary/8-search-in-rotated-sorted-array/README.en.md)
11. [Sum of Two Integers](./binary/11-sum-of-two-integers/README.en.md)
12. [Number of 1 Bits](./binary/12-number-of-1-bits/README.en.md)
13. [Counting Bits](./binary/13-counting-bits/README.en.md)
14. [Missing Number](./binary/14-missing-number/README.en.md)
15. [Reverse Bits](./binary/15-reverse-bits/README.en.md)

### Dynamic Programming

16. [Climbing Stairs](./dynamic-programming/16-climb-stairs/README.en.md)
17. [Coin Change](./dynamic-programming/17-coin-change/README.en.md)
18. [Longest Increasing Subsequence](./dynamic-programming/18-longest-increasing-subsequence/README.en.md)
19. [Longest Common Subsequence](./dynamic-programming/19-longest-common-subsequence/README.en.md)
20. [Word Break](./dynamic-programming/20-word-break/README.en.md)
21. [Combination Sum IV](./dynamic-programming/21-combination-sum-4/README.en.md)
22. [House Robber](./dynamic-programming/22-house-robber/README.en.md)
23. [House Robber II](./dynamic-programming/23-house-robber-2/README.en.md)
24. [Decode Ways](./dynamic-programming/24-decode-ways/README.en.md)
25. [Unique Paths](./dynamic-programming/25-unique-paths/README.en.md)
26. [Jump Game](./dynamic-programming/26-jump-game/README.en.md)

### Graph

27. [Clone Graph](./graph/27-clone-graph/README.en.md)
28. [Course Schedule](./graph/28-course-schedule/README.en.md)
29. [Pacific Atlantic Water Flow](./graph/29-pacific-atlantic-water-flow/README.en.md)
30. [Number of Islands](./graph/30-number-of-islands/README.en.md)
31. [Longest Consecutive Sequence](./graph/31-longest-consecutive-sequence/README.en.md)
32. [Alien Dictionary](./graph/32-alien-dictionary/README.en.md)
33. [Graph Valid Tree](./graph/33-graph-valid-tree/README.en.md)
34. [Number of Connected Components in an Undirected Graph](./graph/34-number-of-connected-components-ai-an-undirected-graph/README.en.md)

### Interval

35. [Insert Interval](./interval/35-insert-interval/README.en.md)
36. [Merge Intervals](./interval/36-merge-intervals/README.en.md)
37. [Non-overlapping Intervals](./interval/37-non-overlapping-intervals/README.en.md)
38. [Meeting Rooms](./interval/38-meeting-rooms/README.en.md)
39. [Meeting Rooms II](./interval/39-meeting-rooms-2/README.en.md)

### Linked List

40. [Reverse Linked List](./linked-list/40-reverse-linked-list/README.en.md)
41. [Linked List Cycle](./linked-list/41-linked-list-cycle/README.en.md)
42. [Merge Two Sorted Lists](./linked-list/42-merge-two-sorted-lists/README.en.md)
43. [Merge k Sorted Lists](./linked-list/43-merge-k-sorted-lists/README.en.md)
44. [Remove Nth Node From End of List](./linked-list/44-remove-nth-node-from-end-of-list/README.en.md)
45. [Reorder List](./linked-list/45-reorder-list/README.en.md)

### Matrix

46. [Set Matrix Zeroes](./matrix/46-set-matrix-zeroes/README.en.md)
47. [Spiral Matrix](./matrix/47-spiral-matrix/README.en.md)
48. [Rotate Image](./matrix/48-rotate-image/README.en.md)
49. [Word Search](./matrix/49-word-search/README.en.md)

### String

50. [Longest Substring Without Repeating Characters](./string/50-longest-substring-without-repeating-characters/README.en.md)
51. [Longest Repeating Character Replacement](./string/51-longest-repeating-character-replacement/README.en.md)
52. [Minimum Window Substring](./string/52-minimum-window-substring/README.en.md)
53. [Valid Anagram](./string/53-valid-anagram/README.en.md)
54. [Group Anagrams](./string/54-group-anagrams/README.en.md)

## Pattern for the next ones

For each new problem in the Top 75 list, the idea is to follow the same pattern:

1. Identify the correct problem type
2. Create the problem folder inside that type folder
3. Add the `.js` file with the solution
4. Add runnable examples
5. Show in the terminal whether it passed or failed
6. Create `README.pt.md`
7. Create `README.en.md`

This way your material stays consistent, easy to review, and ready to grow as you study more problems.
