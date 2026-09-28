import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

/**
 * M0 placeholder schema. Real content, progress, and auth tables land in M1/M2
 * as content:sync and Auth.js are wired up.
 */
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("learner"), // learner | author | admin
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
