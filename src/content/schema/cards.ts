import { z } from "zod";

export const flashcard = z.object({
  id: z.string().min(1),
  front: z.string().min(1),
  back: z.string().min(1),
});

export const cardsFile = z.object({
  cards: z.array(flashcard).min(1),
});

export type Flashcard = z.infer<typeof flashcard>;
