import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage, setupSession } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  setupSession(app);

  app.post(api.auth.register.path, async (req, res) => {
    try {
      const input = api.auth.register.input.parse(req.body);
      const existingUser = await storage.getUserByUsername(input.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const user = await storage.createUser(input);
      (req.session as any).userId = user.id;
      res.status(201).json(user);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.auth.login.path, async (req, res) => {
    try {
      const input = api.auth.login.input.parse(req.body);
      const user = await storage.getUserByUsername(input.username);
      if (!user || user.password !== input.password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      (req.session as any).userId = user.id;
      res.status(200).json(user);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(401).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.auth.logout.path, (req, res) => {
    req.session.destroy(() => {
      res.status(200).json({});
    });
  });

  app.get(api.auth.me.path, async (req, res) => {
    const userId = (req.session as any).userId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.status(200).json(user);
  });

  app.get(api.pools.list.path, async (req, res) => {
    const pools = await storage.getPools();
    res.status(200).json(pools);
  });

  app.get(api.pools.get.path, async (req, res) => {
    const pool = await storage.getPool(Number(req.params.id));
    if (!pool) {
      return res.status(404).json({ message: "Pool not found" });
    }
    res.status(200).json(pool);
  });

  app.post(api.pools.create.path, async (req, res) => {
    try {
      const userId = (req.session as any).userId;
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      const bodySchema = api.pools.create.input.extend({
        targetAmount: z.coerce.string(),
      });
      const input = bodySchema.parse(req.body);
      const pool = await storage.createPool({ ...input, creatorId: userId });
      res.status(201).json(pool);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.contributions.list.path, async (req, res) => {
    const contributions = await storage.getContributions(Number(req.params.poolId));
    res.status(200).json(contributions);
  });

  app.post(api.contributions.create.path, async (req, res) => {
    try {
      const userId = (req.session as any).userId;
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      const bodySchema = api.contributions.create.input.extend({
        amount: z.coerce.string(),
        poolId: z.coerce.number(),
      });
      const input = bodySchema.parse(req.body);
      const contribution = await storage.createContribution({ ...input, userId });
      res.status(201).json(contribution);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
