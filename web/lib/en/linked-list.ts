import type { SectionEn } from "../content-en";

export const linkedListEn: SectionEn = {
  title: "Linked List",
  description:
    "First contact with chained structures and pointer manipulation.",
  patterns: [
    "Slow/fast",
    "In-place reversal",
    "Dummy node",
    "Cycle (Floyd)",
  ],
  lessons: {
    "01-introducao": {
      title: "Recognizing linked list problems",
      description:
        "What a linked list is, the ListNode node, and why pointers change the way you think.",
    },
    "02-dummy-node": {
      title: "Pattern 1: Dummy node and two pointers",
      description:
        "The sentinel node that simplifies edge cases and the trick of the fixed gap between pointers.",
    },
    "03-reversao": {
      title: "Pattern 2: In-place reversal",
      description:
        "Reversing a list's pointers with three variables and O(1) space.",
    },
    "04-lento-rapido": {
      title: "Pattern 3: Slow and fast pointers",
      description:
        "Two pointers at different speeds: the middle of the list and cycle detection (Floyd).",
    },
    "05-merge": {
      title: "Pattern 4: Merging sorted lists",
      description:
        "Stitching two sorted lists into one, guided by a dummy node.",
    },
    "06-combinando": {
      title: "Pattern 5: Combining the patterns",
      description:
        "Hard problems (like reordering the list) that fit together middle + reversal + merge.",
    },
    "07-sintese": {
      title: "Synthesis: which pattern to use?",
      description:
        "The Linked List section's decision tree and the general quiz before the final exam.",
    },
  },
  challenges: {
    "reverse-list": {
      title: "Reverse Linked List",
      statement: `Reverse a linked list and return the new head. The list is \`head = ListNode\` (each node has \`.val\` and \`.next\`; the last one points to \`None\`/\`null\`).

Example: \`1 → 2 → 3 → 4 → 5\` becomes \`5 → 4 → 3 → 2 → 1\`.

(For testing, we pass the list as an array and compare the result as an array.)`,
      hint: "You need three pointers: prev (starts at None), curr (starts at the head), and a temporary for the next one. At each step: save curr.next, do curr.next = prev, and advance prev and curr. At the end, prev is the new head.",
      solutionIdea:
        "Three pointers (prev, curr, next) repointing each node backward. One pass, O(n) time, O(1) space.",
    },
    "middle-of-list": {
      title: "Middle of the Linked List",
      statement: `Return the **middle** node of a linked list (from it to the end). If there are two middle nodes, return the **second**.

Example: \`1 → 2 → 3 → 4 → 5\` → middle is \`3\` (returns \`3 → 4 → 5\`). \`1 → 2 → 3 → 4 → 5 → 6\` → returns \`4 → 5 → 6\`.`,
      hint: "You can count the size and walk halfway — two passes. More elegant (one pass): two pointers, slow (1 step) and fast (2 steps). When fast reaches the end, slow is at the middle.",
      solutionIdea:
        "Slow/fast pointers: fast moves twice as fast, so slow stops at the middle when fast runs out. One pass, O(n)/O(1).",
    },
    "merge-two-lists": {
      title: "Merge Two Sorted Lists",
      statement: `Given two **sorted** linked lists \`l1\` and \`l2\`, merge them into a single sorted list and return the head.

Example: \`1 → 2 → 4\` and \`1 → 3 → 4\` → \`1 → 1 → 2 → 3 → 4 → 4\`.`,
      hint: "Use a 'dummy' (sentinel) node for the head of the result, and a 'tail' pointer that stitches as it goes. At each step, link the tail to the smaller of l1 and l2 and advance that side. At the end, append what is left.",
      solutionIdea:
        "Dummy node + tail pointer stitching the smaller one each time. O(n+m), O(1) extra space.",
    },
    "remove-nth-from-end": {
      title: "Remove Nth Node From End of List",
      statement: `Remove the **n-th node from the end** of the list and return the head. Try to do it in a **single pass**.

Example: \`1 → 2 → 3 → 4 → 5\`, \`n = 2\` → removes the \`4\` → \`1 → 2 → 3 → 5\`.`,
      hint: "Two pointers with a fixed gap of n nodes between them. Advance the 'fast' n steps first; then move 'fast' and 'slow' together until fast reaches the end — slow stops right BEFORE the node to remove. A dummy node before the head avoids treating the removal of the head as a special case.",
      solutionIdea:
        "Two pointers with a gap of n + dummy node. fast reaches the end and slow stops before the target. One pass, O(n)/O(1).",
    },
    "reorder-list": {
      title: "Reorder List",
      statement: `Reorder the list \`L0 → L1 → ... → Ln-1 → Ln\` into \`L0 → Ln → L1 → Ln-1 → L2 → ...\` (interleaving from the start and the end), **in place**. Return the head.

Example: \`1 → 2 → 3 → 4\` → \`1 → 4 → 2 → 3\`. \`1 → 2 → 3 → 4 → 5\` → \`1 → 5 → 2 → 4 → 3\`.`,
      hint: "This is a combo of three patterns: (1) find the MIDDLE with slow/fast; (2) REVERSE the second half; (3) INTERLEAVE the two halves. You have already practiced each piece in the previous lessons.",
      solutionIdea:
        "Three known patterns in sequence: middle (slow/fast) + reverse the 2nd half + interleave. O(n)/O(1).",
    },
  },
  exams: {
    "remove-duplicates-sorted": {
      title: "Remove Duplicates from Sorted List",
      statement: `Given the head of a **sorted** linked list, remove the nodes with duplicate values, leaving each value only once. Return the list.

Example: \`1 → 1 → 2 → 3 → 3\` → \`1 → 2 → 3\`.`,
      hint: "Since the list is sorted, duplicates are neighbors. Traverse with one pointer: if the current node has the same value as the next, skip the next (cur.next = cur.next.next); otherwise, advance. O(n), O(1).",
    },
    "odd-even-list": {
      title: "Odd Even Linked List",
      statement: `Regroup the list so that all nodes in **odd** positions (1st, 3rd, 5th...) come first, followed by those in **even** positions — keeping the relative order of each group. Do it in O(1) space. Return the list.

Example: \`1 → 2 → 3 → 4 → 5\` → \`1 → 3 → 5 → 2 → 4\`.`,
      hint: "Keep two 'threads': one stitching the odd nodes and another the even ones, preserving the head of the even thread (even_head). Advance each one jumping two at a time. At the end, link the tail of the odds to the head of the evens.",
    },
    "reverse-k-group": {
      title: "Reverse Nodes in k-Group",
      statement: `Reverse the nodes of the list in **groups of k**. If the last group has fewer than k nodes, leave it as is. Return the list.

Example: \`1 → 2 → 3 → 4 → 5\`, \`k = 2\` → \`2 → 1 → 4 → 3 → 5\`. With \`k = 3\` → \`3 → 2 → 1 → 4 → 5\`.`,
      hint: "Combine in-place reversal with a group check: first verify that there are k nodes ahead (otherwise, stop and leave it as is). Reverse the k nodes and recursively connect to the result of the rest of the list. Reversing each node is the same as in the reversal lesson.",
    },
  },
};
