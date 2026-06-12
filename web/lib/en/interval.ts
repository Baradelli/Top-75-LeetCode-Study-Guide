import type { SectionEn } from "../content-en";

// EN translation of the "interval" section.
export const intervalEn: SectionEn = {
  title: "Intervals",
  description:
    "Sorting + greedy reasoning — a breather before the recursion block.",
  patterns: ["Sort + scan", "Merge", "Overlap"],
  lessons: {
    "01-introducao": {
      title: "Recognizing interval problems",
      description:
        "What an interval is, the first move (sorting), and the overlap condition.",
    },
    "02-merge": {
      title: "Pattern 1: Sort and merge",
      description:
        "Sort by start and scan, merging intervals that overlap.",
    },
    "03-insert": {
      title: "Pattern 2: Insert into a sorted set",
      description:
        "Insert an interval into an already-sorted list in three phases: before, merge, after.",
    },
    "04-greedy": {
      title: "Pattern 3: Greedy on overlap",
      description:
        "Sort by end and keep the ones that fit — the greedy choice that maximizes the result.",
    },
    "05-varredura": {
      title: "Pattern 4: Event sweep (rooms)",
      description:
        "Count the maximum overlap by treating starts and ends as events in time.",
    },
    "06-sintese": {
      title: "Synthesis: which pattern to use?",
      description:
        "The decision tree of the Intervals section and the general quiz before the final exam.",
    },
  },
  challenges: {
    "merge-intervals": {
      title: "Merge Intervals",
      statement: `Given a list of intervals \`[start, end]\`, **merge** all the overlapping ones and return the resulting list (sorted by start).

Example: \`[[1,3],[2,6],[8,10],[15,18]]\` → \`[[1,6],[8,10],[15,18]]\` ([1,3] and [2,6] overlap → [1,6]).`,
      hint: "The first move is almost always to SORT by start. Then, as you scan, two intervals overlap when the current one's start is ≤ the end of the last one in the result — in that case, extend the end; otherwise, start a new block.",
      solutionIdea:
        "Sort by start and scan: overlaps (start ≤ end of the last) → extend; otherwise → new block. O(n log n) due to the sort.",
    },

    "insert-interval": {
      title: "Insert Interval",
      statement: `Given a list of intervals that is **sorted and non-overlapping** and a \`new\` interval, insert it (merging if necessary) keeping the list sorted and non-overlapping.

Example: \`intervals = [[1,3],[6,9]]\`, \`new = [2,5]\` → \`[[1,5],[6,9]]\`.`,
      hint: "Since it's already sorted, think in three phases: (1) copy the intervals that end BEFORE the new one starts; (2) merge into the new one all those that OVERLAP it (taking the min of the starts and the max of the ends); (3) add the merged new one and copy the rest.",
      solutionIdea:
        "Three phases over the already-sorted list: before / overlap (merge) / after. One pass, O(n).",
    },

    "erase-overlap-intervals": {
      title: "Non-overlapping Intervals",
      statement: `Given a list of intervals, return the **minimum number** of intervals to **remove** so that the remaining ones don't overlap.

Example: \`[[1,2],[2,3],[3,4],[1,3]]\` → \`1\` (removing [1,3] is enough).`,
      hint: "Greedy strategy: sort by END. Keep the ones that fit (start ≥ end of the last one kept) — that way you preserve the maximum number of intervals. Each interval that does NOT fit is a removal. (Keeping the one that finishes earliest leaves more room for the next ones.)",
      solutionIdea:
        "Greedy: sort by end and keep the ones that fit (start ≥ last end); the rest count as removals. Keeping the ones that finish early maximizes what's left. O(n log n).",
    },

    "min-meeting-rooms": {
      title: "Meeting Rooms II",
      statement: `Given a list of meetings \`[start, end]\`, return the **minimum number of rooms** needed to hold all of them (two meetings that overlap in time need different rooms).

Example: \`[[0,30],[5,10],[15,20]]\` → \`2\`.`,
      hint: "The number of rooms is the MAXIMUM overlap at an instant. Separate the starts and the ends into two sorted lists and do a two-pointer sweep: a start before the next end → +1 room; otherwise → a room was freed (-1). The peak is the answer. (A min-heap of the ends is the other classic approach.)",
      solutionIdea:
        "Event sweep: sorted starts and ends; a start before the next end → +1 room. The peak of simultaneous rooms is the answer. O(n log n).",
    },
  },
  exams: {
    "summary-ranges": {
      title: "Summary Ranges",
      statement: `Given a **sorted** array \`nums\` of unique integers, return the list of **ranges** that cover exactly the numbers, as strings. A lone number becomes \`"a"\`; a consecutive run becomes \`"a->b"\`.

Example: \`[0,1,2,4,5,7]\` → \`["0->2","4->5","7"]\`.`,
      hint: "Scan the array grouping consecutive runs: mark the start of each group and advance while the next is the previous + 1. When closing the group, format it as 'a' (if alone) or 'a->b'.",
    },
    "interval-intersections": {
      title: "Interval List Intersections",
      statement: `Given two lists of intervals \`A\` and \`B\`, **each sorted and internally non-overlapping**, return the list of **intersections** between them (also sorted).

Example: \`A = [[0,2],[5,10],[13,23],[24,25]]\`, \`B = [[1,5],[8,12],[15,24],[25,26]]\` → \`[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]\`.`,
      hint: "Two pointers, one in each list. The intersection of the current pair is [max(of the starts), min(of the ends)] — it only exists if max_start ≤ min_end. Then, advance the pointer of the interval that ENDS first (it can't intersect anything further ahead).",
    },
    "car-pooling": {
      title: "Car Pooling",
      statement: `A car with \`capacity\` seats drives a one-way route. Each trip is \`[passengers, from, to]\` (they board at \`from\`, get off at \`to\`). Return \`true\` if it's possible to make all the trips without ever exceeding the capacity.

Example: \`trips = [[2,1,5],[3,3,7]]\`, \`capacity = 4\` → \`false\` (in [3,5] there are 5 passengers); with \`capacity = 5\` → \`true\`.`,
      hint: "Event sweep (like the meeting rooms): each trip generates a +passengers event at 'from' and a -passengers event at 'to'. Sort the events by position, keep a running sum, and check whether at any point it exceeds the capacity.",
    },
  },
};
