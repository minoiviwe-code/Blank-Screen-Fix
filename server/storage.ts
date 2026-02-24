import { users, pools, contributions, type InsertUser, type InsertPool, type InsertContribution } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export function setupSession(app: any) {
  app.use(
    session({
      store: new PostgresSessionStore({ pool, createTableIfMissing: true }),
      secret: process.env.SESSION_SECRET || "ubuntu_pools_secret",
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    })
  );
}

export interface IStorage {
  getUser(id: number): Promise<typeof users.$inferSelect | undefined>;
  getUserByUsername(username: string): Promise<typeof users.$inferSelect | undefined>;
  createUser(user: InsertUser): Promise<typeof users.$inferSelect>;
  
  getPools(): Promise<typeof pools.$inferSelect[]>;
  getPool(id: number): Promise<typeof pools.$inferSelect | undefined>;
  createPool(pool: InsertPool): Promise<typeof pools.$inferSelect>;
  
  getContributions(poolId: number): Promise<typeof contributions.$inferSelect[]>;
  createContribution(contribution: InsertContribution): Promise<typeof contributions.$inferSelect>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getPools() {
    return await db.select().from(pools);
  }

  async getPool(id: number) {
    const [pool] = await db.select().from(pools).where(eq(pools.id, id));
    return pool;
  }

  async createPool(insertPool: InsertPool) {
    const [pool] = await db.insert(pools).values(insertPool).returning();
    return pool;
  }

  async getContributions(poolId: number) {
    return await db.select().from(contributions).where(eq(contributions.poolId, poolId));
  }

  async createContribution(insertContribution: InsertContribution) {
    const [contribution] = await db.insert(contributions).values(insertContribution).returning();
    return contribution;
  }
}

export const storage = new DatabaseStorage();
