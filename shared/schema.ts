import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, json, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const visas = pgTable("visas", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  country: text("country").notNull(),
  visaType: text("visa_type").notNull(),
  description: text("description"),
  requirements: json("requirements").$type<string[]>().notNull(),
  processingTimeMin: integer("processing_time_min"),
  processingTimeMax: integer("processing_time_max"),
  cost: decimal("cost", { precision: 10, scale: 2 }),
  approvalRate: decimal("approval_rate", { precision: 5, scale: 2 }),
});

export const applications = pgTable("applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  visaId: varchar("visa_id").notNull(),
  status: text("status").notNull().default("draft"),
  formData: json("form_data").$type<Record<string, unknown>>(),
  documents: json("documents").$type<string[]>(),
  submittedAt: text("submitted_at"),
  approvedAt: text("approved_at"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertVisaSchema = createInsertSchema(visas).omit({
  id: true,
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertVisa = z.infer<typeof insertVisaSchema>;
export type Visa = typeof visas.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;
