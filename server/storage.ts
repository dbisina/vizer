import { type User, type InsertUser, type Visa, type InsertVisa, type Application, type InsertApplication } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getVisa(id: string): Promise<Visa | undefined>;
  listVisas(): Promise<Visa[]>;
  searchVisas(country: string, visaType?: string): Promise<Visa[]>;
  createVisa(visa: InsertVisa): Promise<Visa>;
  seedVisas(): Promise<void>;
  
  getApplication(id: string): Promise<Application | undefined>;
  getUserApplications(userId: string): Promise<Application[]>;
  createApplication(app: InsertApplication): Promise<Application>;
  updateApplication(id: string, updates: Partial<InsertApplication>): Promise<Application | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private visas: Map<string, Visa>;
  private applications: Map<string, Application>;

  constructor() {
    this.users = new Map();
    this.visas = new Map();
    this.applications = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getVisa(id: string): Promise<Visa | undefined> {
    return this.visas.get(id);
  }

  async listVisas(): Promise<Visa[]> {
    return Array.from(this.visas.values());
  }

  async searchVisas(country: string, visaType?: string): Promise<Visa[]> {
    return Array.from(this.visas.values()).filter(visa => 
      visa.country.toLowerCase().includes(country.toLowerCase()) &&
      (!visaType || visa.visaType.toLowerCase().includes(visaType.toLowerCase()))
    );
  }

  async createVisa(visa: InsertVisa): Promise<Visa> {
    const id = randomUUID();
    const newVisa: Visa = { ...visa, id } as Visa;
    this.visas.set(id, newVisa);
    return newVisa;
  }

  async seedVisas(): Promise<void> {
    const visasData: Array<Omit<InsertVisa, 'id'>> = [
      // Canada
      {
        country: "Canada",
        visaType: "Student",
        description: "Study permit for international students",
        requirements: ["Valid passport", "Letter of acceptance", "Proof of funds", "Medical exam", "Police certificate"],
        processingTimeMin: 4,
        processingTimeMax: 12,
        cost: 150 as any,
        approvalRate: 85 as any,
      },
      {
        country: "Canada",
        visaType: "Work",
        description: "Work permit for employment",
        requirements: ["Job offer letter", "Valid passport", "Work permit document", "Medical exam", "Police certificate"],
        processingTimeMin: 2,
        processingTimeMax: 8,
        cost: 155 as any,
        approvalRate: 90 as any,
      },
      // Germany
      {
        country: "Germany",
        visaType: "Student",
        description: "Student visa for studying in German universities",
        requirements: ["University admission", "Proof of funds", "Health insurance", "Valid passport", "German language test"],
        processingTimeMin: 2,
        processingTimeMax: 6,
        cost: 75 as any,
        approvalRate: 88 as any,
      },
      // UK
      {
        country: "United Kingdom",
        visaType: "Student",
        description: "Student visa (Tier 4)",
        requirements: ["Confirmation of Acceptance for Studies", "Proof of funds", "Valid passport", "English language test", "Police certificate"],
        processingTimeMin: 3,
        processingTimeMax: 8,
        cost: 719 as any,
        approvalRate: 82 as any,
      },
      // USA
      {
        country: "United States",
        visaType: "Student",
        description: "F-1 Student Visa",
        requirements: ["DS-160 form", "Valid passport", "I-20 form", "Proof of funds", "Interview"],
        processingTimeMin: 2,
        processingTimeMax: 4,
        cost: 160 as any,
        approvalRate: 75 as any,
      },
      // Australia
      {
        country: "Australia",
        visaType: "Student",
        description: "Student visa for higher education",
        requirements: ["Confirmation of Enrolment", "Proof of funds", "Health insurance (OSHC)", "Valid passport", "Medical exam"],
        processingTimeMin: 1,
        processingTimeMax: 3,
        cost: 710 as any,
        approvalRate: 90 as any,
      },
    ];

    for (const visa of visasData) {
      await this.createVisa(visa as InsertVisa);
    }
  }

  async getApplication(id: string): Promise<Application | undefined> {
    return this.applications.get(id);
  }

  async getUserApplications(userId: string): Promise<Application[]> {
    return Array.from(this.applications.values()).filter(
      app => app.userId === userId
    );
  }

  async createApplication(app: InsertApplication): Promise<Application> {
    const id = randomUUID();
    const newApp: Application = { ...app, id } as Application;
    this.applications.set(id, newApp);
    return newApp;
  }

  async updateApplication(id: string, updates: Partial<InsertApplication>): Promise<Application | undefined> {
    const app = this.applications.get(id);
    if (!app) return undefined;
    const updated = { ...app, ...updates } as Application;
    this.applications.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
storage.seedVisas().catch(console.error);
