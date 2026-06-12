import type { SectionEn } from "../content-en";

export const heapEn: SectionEn = {
  title: "Heap",
  description:
    "A tree on the inside; revisits earlier problems with the new tool.",
  patterns: ["Min/max heap", "Top-K", "Two heaps"],
  lessons: {
    "01-introducao": {
      title: "Recognizing heap problems",
      description:
        "What a heap is, the heap property, push/pop in O(log n), and when it is the tool.",
    },
    "02-top-k": {
      title: "Pattern 1: Top-K with a heap of size K",
      description:
        "Keeping only the K best in a fixed-size heap — the k-th largest in O(n log k).",
    },
    "03-k-way": {
      title: "Pattern 2: Merging K sources (k-way merge)",
      description:
        "The heap always picks the next smallest among K lists — merge k revisited.",
    },
    "04-two-heaps": {
      title: "Pattern 3: Two heaps (median of a stream)",
      description:
        "Splitting the data into two balanced halves to find the median in O(log n).",
    },
    "05-sintese": {
      title: "Synthesis: which pattern to use?",
      description:
        "The Heap section's decision tree and the general quiz before the final exam.",
    },
  },
  challenges: {
    "kth-largest": {
      title: "Kth Largest Element in an Array",
      statement: `Return the **k-th LARGEST** element of \`nums\` (the k-th in decreasing order, counting repetitions).

Example: \`nums = [3,2,1,5,6,4]\`, \`k = 2\` → \`5\`.

(In Python there is \`heapq\`; in JS, the solution includes a small heap class, since the language has no native one.)`,
      hint: "Keep a MIN-heap of size k with the largest seen: push each number and, if the heap exceeds k, remove the smallest (the top). At the end, the top of the heap is the k-th largest. O(n log k).",
      solutionIdea:
        "Min-heap of size k with the k largest seen; the top is the k-th largest. O(n log k) time, O(k) space.",
    },
    "merge-k-sorted": {
      title: "Merge k Sorted Lists",
      statement: `Given \`k\` **sorted** lists (here, as arrays), merge them all into a **single sorted list** and return it.

Example: \`[[1,4,5],[1,3,4],[2,6]]\` → \`[1,1,2,3,4,4,5,6]\`.

(This is the "merge k" you saw in the Linked List section — now with the right tool: the heap.)`,
      hint: "The next smallest of the result is always the head of one of the lists. Keep a MIN-heap with the head of each list (storing which list and position it came from); remove the smallest, add it to the result, and push the next one from that same list. O(N log k).",
      solutionIdea:
        "Min-heap with the head of each list; remove the smallest and refill the next one from that list. O(N log k), where N = total number of elements.",
    },
    "running-median": {
      title: "Find Median from Data Stream",
      statement: `The numbers arrive one at a time (a stream). Return the list of **medians** after each number inserted. (The median of an even number of elements is the average of the two central ones.)

Example: \`[1, 2, 3]\` → \`[1, 1.5, 2]\`. \`[5, 15, 1, 3]\` → \`[5, 10.0, 5, 4.0]\`.`,
      hint: "Use TWO heaps: a MAX-heap with the smaller half and a MIN-heap with the larger half, keeping the sizes balanced. The median is the top of the max-heap (odd sizes) or the average of the two tops (even). Each insertion is O(log n).",
      solutionIdea:
        "Two balanced heaps (max-heap of the smaller half, min-heap of the larger one); the median comes from the tops. Insertion O(log n).",
    },
  },
  exams: {
    "last-stone-weight": {
      title: "Last Stone Weight",
      statement: `Each turn, take the **two heaviest stones** \`x ≤ y\` and smash them: if \`x == y\`, both vanish; otherwise, one of weight \`y - x\` remains. Repeat until at most one is left. Return the weight of the last stone (or \`0\`).

Example: \`[2,7,4,1,8,1]\` → \`1\`.`,
      hint: "You repeatedly need the two LARGEST stones → a max-heap. Each turn, remove the two largest, and return the difference (if non-zero). At the end, the top (or 0) is the answer. In Python, use heapq with negated values to simulate the max-heap.",
    },
    "connect-sticks": {
      title: "Minimum Cost to Connect Sticks",
      statement: `Connecting two sticks of sizes \`a\` and \`b\` costs \`a + b\` and produces a stick of size \`a + b\`. Connect them all into one, with **minimum total cost**, and return that cost.

Example: \`[2,4,3]\` → \`14\` (2+3=5, then 5+4=9; total 5+9=14).`,
      hint: "Greedy strategy with a MIN-heap: always connect the two SMALLEST available sticks (the smallest ones are summed more often, so it is best to join them early). Add up the cost of each join and return the combined stick to the heap. It is Huffman's algorithm.",
    },
    "kth-smallest-matrix": {
      title: "Kth Smallest Element in a Sorted Matrix",
      statement: `Given an \`n × n\` matrix in which **each row and each column are sorted** increasingly, return the **k-th SMALLEST** element (in global order).

Example: \`[[1,5,9],[10,11,13],[12,13,15]]\`, \`k = 8\` → \`13\`.`,
      hint: "It is a disguised k-way merge: start with the top-left corner in a MIN-heap; remove k times, and on each removal push the neighbors to the right and below (marking visited ones so as not to repeat). The k-th removed is the answer. O(k log k).",
    },
  },
};
