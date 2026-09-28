import { z } from "zod";

const base = {
  id: z.string().min(1),
  prompt: z.string().min(1),
  explanation: z.string().min(1),
  domain: z.string().min(1),
};

export const singleQuestion = z.object({
  ...base,
  type: z.literal("single"),
  options: z.array(z.string()).min(2),
  correct: z.number().int().nonnegative(),
});

export const multiQuestion = z.object({
  ...base,
  type: z.literal("multi"),
  options: z.array(z.string()).min(2),
  correct: z.array(z.number().int().nonnegative()).min(1),
});

export const orderQuestion = z.object({
  ...base,
  type: z.literal("order"),
  items: z.array(z.string()).min(2),
  correctOrder: z.array(z.number().int().nonnegative()).min(2),
});

export const matchQuestion = z.object({
  ...base,
  type: z.literal("match"),
  left: z.array(z.string()).min(2),
  right: z.array(z.string()).min(2),
  correctPairs: z.array(z.tuple([z.number().int().nonnegative(), z.number().int().nonnegative()])).min(2),
});

export const predictQuestion = z.object({
  ...base,
  type: z.literal("predict"),
  code: z.string().min(1),
  language: z.string().min(1),
  options: z.array(z.string()).min(2),
  correct: z.number().int().nonnegative(),
});

export const shortQuestion = z.object({
  ...base,
  type: z.literal("short"),
  rubric: z.array(z.object({ criterion: z.string().min(1), points: z.number().positive() })).min(1),
});

export const quizQuestion = z.discriminatedUnion("type", [
  singleQuestion,
  multiQuestion,
  orderQuestion,
  matchQuestion,
  predictQuestion,
  shortQuestion,
]);

export const quiz = z.object({
  passThreshold: z.number().min(0).max(1).default(0.75),
  questions: z.array(quizQuestion).min(1),
});

export type Quiz = z.infer<typeof quiz>;
export type QuizQuestion = z.infer<typeof quizQuestion>;
