import { z } from "zod";

export const glossaryTerm = z.object({
  term: z.string().min(1),
  definition: z.string().min(1),
});

export const glossaryFile = z.object({
  terms: z.array(glossaryTerm).min(1),
});

export type GlossaryTerm = z.infer<typeof glossaryTerm>;
