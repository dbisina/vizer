import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAdvisorySchema, insertDocumentSchema } from "@shared/schema";

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

  // Advisory endpoints
  app.post("/api/advisory", async (req, res) => {
    try {
      const parsed = insertAdvisorySchema.parse(req.body);
      const advisory = await storage.createAdvisory(parsed);
      res.status(201).json(advisory);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/advisory/:userId", async (req, res) => {
    try {
      const advisories = await storage.getUserAdvisories(req.params.userId);
      res.json(advisories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch advisories" });
    }
  });

  // Document endpoints (for generated PDFs, cover letters, etc.)
  app.post("/api/documents", async (req, res) => {
    try {
      const parsed = insertDocumentSchema.parse(req.body);
      const document = await storage.createDocument(parsed);
      res.status(201).json(document);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/documents/:userId", async (req, res) => {
    try {
      const documents = await storage.getUserDocuments(req.params.userId);
      res.json(documents);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch documents" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
