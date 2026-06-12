import type { SectionEn } from "../content-en";

// EN translation of the "fundamentos" section.
export const fundamentosEn: SectionEn = {
  title: "Fundamentals: Big-O",
  description:
    "Before any pattern: how to measure and justify the efficiency of any code.",
  patterns: ["Growth classes", "Analysis rules", "Space complexity"],
  lessons: {
    "01-o-que-e-big-o": {
      title: "What Is Big-O Notation",
      description:
        "Why we count steps instead of seconds, and the growth classes you'll see in every problem.",
    },
    "02-como-analisar": {
      title: "How to Analyze the Complexity of Any Code",
      description:
        "The four practical rules to look at code and tell — with justification — what its Big-O is.",
    },
    "03-espaco-e-quiz": {
      title: "Space Complexity + Section Quiz",
      description:
        "The memory cost of solutions and the quiz that wraps up the fundamentals.",
    },
  },
};
