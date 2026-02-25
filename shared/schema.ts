import { pgTable, text, serial, integer, boolean, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isKycVerified: boolean("is_kyc_verified").default(false),
  ubuntuScore: integer("ubuntu_score").default(100),
  createdAt: timestamp("created_at").defaultNow(),
});

export const pools = pgTable("pools", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  targetAmount: numeric("target_amount").notNull(),
  currency: text("currency").notNull().default("USD"),
  creatorId: integer("creator_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contributions = pgTable("contributions", {
  id: serial("id").primaryKey(),
  poolId: integer("pool_id").notNull(),
  userId: integer("user_id").notNull(),
  amount: numeric("amount").notNull(),
  status: text("status").notNull().default("pending"), // pending, completed
  createdAt: timestamp("created_at").defaultNow(),
});

// === BASE SCHEMAS ===
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true, isKycVerified: true, ubuntuScore: true });
export const insertPoolSchema = createInsertSchema(pools).omit({ id: true, createdAt: true, creatorId: true });
export const insertPoolWithCreatorSchema = insertPoolSchema.extend({
  creatorId: z.number().int().positive(),
});
export const insertContributionSchema = createInsertSchema(contributions).omit({ id: true, createdAt: true, status: true });

// === EXPLICIT API CONTRACT TYPES ===
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Pool = typeof pools.$inferSelect;
export type InsertPool = z.infer<typeof insertPoolSchema>;
export type InsertPoolWithCreator = z.infer<typeof insertPoolWithCreatorSchema>;

export type Contribution = typeof contributions.$inferSelect;
export type InsertContribution = z.infer<typeof insertContributionSchema>;

export type CreatePoolRequest = InsertPool;
export type UpdatePoolRequest = Partial<InsertPool>;
export type PoolResponse = Pool;

export type CreateContributionRequest = InsertContribution;
export type ContributionResponse = Contribution;
