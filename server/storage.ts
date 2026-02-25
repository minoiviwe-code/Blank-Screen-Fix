import { users, pools, contributions, type InsertUser, type InsertPoolWithCreator, type InsertContribution } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;
const PostgresSessionStore = connectPg(session);

export function setupSession(app: any) {
  const sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret) {
    throw new Error("SESSION_SECRET environment variable is required");
  }
  
  const isProduction = process.env.NODE_ENV === "production";
  
  app.use(
    session({
      store: new PostgresSessionStore({ pool, createTableIfMissing: true }),
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: { 
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: isProduction,
        sameSite: "strict",
      },
    })
  );
}

export interface IStorage {
  getUser(id: number): Promise<typeof users.$inferSelect | undefined>;
  getUserByUsername(username: string): Promise<typeof users.$inferSelect | undefined>;
  createUser(user: InsertUser): Promise<typeof users.$inferSelect>;
  verifyPassword(password: string, hash: string): Promise<boolean>;
  
  getPools(): Promise<typeof pools.$inferSelect[]>;
  getPool(id: number): Promise<typeof pools.$inferSelect | undefined>;
  createPool(pool: InsertPoolWithCreator): Promise<typeof pools.$inferSelect>;
  
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
    const hashedPassword = await bcrypt.hash(insertUser.password, SALT_ROUNDS);
    const [user] = await db.insert(users).values({ ...insertUser, password: hashedPassword }).returning();
    return user;
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async getPools() {
    return await db.select().from(pools);
  }

  async getPool(id: number) {
    const [pool] = await db.select().from(pools).where(eq(pools.id, id));
    return pool;
  }

  async createPool(insertPool: InsertPoolWithCreator) {
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
