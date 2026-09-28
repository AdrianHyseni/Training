import { z } from "zod";

export const exercise = z.object({
  id: z.string().min(1),
  prompt: z.string().min(1),
  modelAnswer: z.string().min(1),
  rubric: z.array(z.object({ criterion: z.string().min(1), points: z.number().positive() })).min(1),
});

export const exercisesFile = z.object({
  exercises: z.array(exercise).min(1),
});

export type Exercise = z.infer<typeof exercise>;
