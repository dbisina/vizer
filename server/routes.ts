import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertApplicationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Visa endpoints
  app.get("/api/visas", async (req, res) => {
    try {
      const visas = await storage.listVisas();
      res.json(visas);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch visas" });
    }
  });

  app.get("/api/visas/search", async (req, res) => {
    try {
      const { country, visaType } = req.query;
      if (!country || typeof country !== "string") {
        return res.status(400).json({ error: "Country parameter required" });
      }
      const visas = await storage.searchVisas(country, visaType as string | undefined);
      res.json(visas);
    } catch (error) {
      res.status(500).json({ error: "Search failed" });
    }
  });

  app.get("/api/visas/:id", async (req, res) => {
    try {
      const visa = await storage.getVisa(req.params.id);
      if (!visa) {
        return res.status(404).json({ error: "Visa not found" });
      }
      res.json(visa);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch visa" });
    }
  });

  // Application endpoints
  app.get("/api/applications/:userId", async (req, res) => {
    try {
      const applications = await storage.getUserApplications(req.params.userId);
      res.json(applications);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  });

  app.post("/api/applications", async (req, res) => {
    try {
      const parsed = insertApplicationSchema.parse(req.body);
      const application = await storage.createApplication(parsed);
      res.status(201).json(application);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/applications/:id", async (req, res) => {
    try {
      const updated = await storage.updateApplication(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Application not found" });
      }
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
