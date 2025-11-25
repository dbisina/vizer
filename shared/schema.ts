import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, json, boolean, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  country: text("country"),
  phone: text("phone"),
  profileImage: text("profile_image"),
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
  educationRequirements: json("education_requirements").$type<{
    languageTests: string[];
    minimumScores: Record<string, number>;
    universityRanking: string;
    transcriptRequired: boolean;
  }>(),
  applicationUrl: text("application_url"),
});

export const documents = pgTable("documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  visaId: varchar("visa_id").notNull(),
  type: text("type").notNull(), // "coverLetter", "sponsorshipLetter", "supportLetter", "formsGuide"
  content: text("content").notNull(),
  generatedAt: text("generated_at").notNull(),
  visaRecommendation: json("visa_recommendation").$type<any>(),
});

export const advisoryResponses = pgTable("advisory_responses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  userCountry: text("user_country").notNull(),
  destinationCountry: text("destination_country").notNull(),
  visaType: text("visa_type").notNull(),
  purpose: text("purpose").notNull(),
  educationDetails: json("education_details").$type<{
    school?: string;
    program?: string;
    level?: string;
    languageTestTaken?: string;
    testScore?: string;
  }>(),
  personalInfo: json("personal_info").$type<Record<string, any>>(),
  aiRecommendation: text("ai_recommendation"),
  recommendedVisa: varchar("recommended_visa"),
  createdAt: text("created_at").notNull(),
});

export const travelAgents = pgTable("travel_agents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  specialties: json("specialties").$type<string[]>().notNull(), // e.g., ["Student Visas", "Work Visas"]
  countries: json("countries").$type<string[]>().notNull(), // e.g., ["Canada", "USA", "UK"]
  rating: decimal("rating", { precision: 3, scale: 2 }).notNull(), // 0.00 to 5.00
  reviewCount: integer("review_count").default(0),
  responseTime: text("response_time"), // e.g., "2 hours", "24 hours"
  priceRange: text("price_range"), // e.g., "$500-$2000"
  website: text("website"),
  email: text("email"),
  phone: text("phone"),
  yearsExperience: integer("years_experience"),
  successRate: decimal("success_rate", { precision: 5, scale: 2 }), // 0-100%
  languages: json("languages").$type<string[]>(), // e.g., ["English", "French", "Mandarin"]
  certifications: json("certifications").$type<string[]>(), // e.g., ["ICCRC", "RCIC"]
  image: text("image"), // Profile image URL
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const updateUserSchema = createInsertSchema(users).pick({
  email: true,
  firstName: true,
  lastName: true,
  country: true,
  phone: true,
  profileImage: true,
}).partial();

export const insertVisaSchema = createInsertSchema(visas).omit({
  id: true,
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
});

export const insertAdvisorySchema = createInsertSchema(advisoryResponses).omit({
  id: true,
});

export const insertTravelAgentSchema = createInsertSchema(travelAgents).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertVisa = z.infer<typeof insertVisaSchema>;
export type Visa = typeof visas.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Document = typeof documents.$inferSelect;
export type InsertAdvisory = z.infer<typeof insertAdvisorySchema>;
export type Advisory = typeof advisoryResponses.$inferSelect;
export type InsertTravelAgent = z.infer<typeof insertTravelAgentSchema>;
export type TravelAgent = typeof travelAgents.$inferSelect;
