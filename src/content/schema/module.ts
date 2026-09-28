import { z } from "zod";

export const moduleLevel = z.enum(["foundation", "practitioner", "advanced", "architect"]);

export const verifyItem = z.object({
  claim: z.string().min(1),
  sourceUrl: z.string().url(),
});

export const moduleMeta = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  line: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  level: moduleLevel,
  estimatedMinutes: z.number().int().positive(),
  prerequisites: z.array(z.string()).default([]),
  related: z.array(z.string()).default([]),
  certifications: z.array(z.string()).default([]),
  // js-yaml parses unquoted YYYY-MM-DD as a Date (YAML 1.1 timestamp type),
  // so accept either and normalize to an ISO date string.
  lastReviewed: z
    .union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/), z.date()])
    .transform((v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v)),
  verify: z.array(verifyItem).default([]),
});

export type ModuleMeta = z.infer<typeof moduleMeta>;
export type VerifyItem = z.infer<typeof verifyItem>;
