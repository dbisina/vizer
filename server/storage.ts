import { type User, type InsertUser, type Visa, type InsertVisa, type Document, type InsertDocument, type Advisory, type InsertAdvisory } from "@shared/schema";
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
  
  getDocument(id: string): Promise<Document | undefined>;
  getUserDocuments(userId: string): Promise<Document[]>;
  createDocument(doc: InsertDocument): Promise<Document>;
  
  getAdvisory(id: string): Promise<Advisory | undefined>;
  getUserAdvisories(userId: string): Promise<Advisory[]>;
  createAdvisory(advisory: InsertAdvisory): Promise<Advisory>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private visas: Map<string, Visa>;
  private documents: Map<string, Document>;
  private advisories: Map<string, Advisory>;

  constructor() {
    this.users = new Map();
    this.visas = new Map();
    this.documents = new Map();
    this.advisories = new Map();
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
        description: "Study permit for international students pursuing higher education",
        requirements: ["Valid passport", "Letter of acceptance", "Proof of funds", "Medical exam", "Police certificate"],
        processingTimeMin: 4,
        processingTimeMax: 12,
        cost: 150 as any,
        approvalRate: 85 as any,
        educationRequirements: {
          languageTests: ["IELTS", "TOEFL", "CAEL", "TOEIC"],
          minimumScores: { IELTS: 6, TOEFL: 90 },
          universityRanking: "No minimum ranking",
          transcriptRequired: true,
        },
        applicationUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html",
      },
      {
        country: "Canada",
        visaType: "Work",
        description: "Work permit for employment opportunities",
        requirements: ["Job offer letter", "Valid passport", "Work permit document", "Medical exam", "Police certificate"],
        processingTimeMin: 2,
        processingTimeMax: 8,
        cost: 155 as any,
        approvalRate: 90 as any,
        applicationUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada.html",
      },
      // Germany
      {
        country: "Germany",
        visaType: "Student",
        description: "Student visa for studying in German universities",
        requirements: ["University admission", "Proof of funds (€12,000/year)", "Health insurance", "Valid passport", "German language test"],
        processingTimeMin: 2,
        processingTimeMax: 6,
        cost: 75 as any,
        approvalRate: 88 as any,
        educationRequirements: {
          languageTests: ["TestDAF", "DSH", "TELC C1"],
          minimumScores: { TestDAF: 3 },
          universityRanking: "No minimum ranking",
          transcriptRequired: true,
        },
        applicationUrl: "https://www.daad.de/en/",
      },
      // UK
      {
        country: "United Kingdom",
        visaType: "Student",
        description: "Student visa (Tier 4) for higher education",
        requirements: ["Confirmation of Acceptance for Studies", "Proof of funds", "Valid passport", "English language test", "Police certificate"],
        processingTimeMin: 3,
        processingTimeMax: 8,
        cost: 719 as any,
        approvalRate: 82 as any,
        educationRequirements: {
          languageTests: ["IELTS", "TOEFL", "Duolingo"],
          minimumScores: { IELTS: 6.5 },
          universityRanking: "No minimum ranking",
          transcriptRequired: true,
        },
        applicationUrl: "https://www.gov.uk/student-visa",
      },
      // USA
      {
        country: "United States",
        visaType: "Student",
        description: "F-1 Student Visa for higher education and training",
        requirements: ["DS-160 form", "Valid passport", "I-20 form", "Proof of funds", "Interview"],
        processingTimeMin: 2,
        processingTimeMax: 4,
        cost: 160 as any,
        approvalRate: 75 as any,
        educationRequirements: {
          languageTests: ["TOEFL", "IELTS", "Duolingo"],
          minimumScores: { TOEFL: 80 },
          universityRanking: "No minimum ranking",
          transcriptRequired: true,
        },
        applicationUrl: "https://travel.state.gov/content/travel/en/us-visas/student.html",
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
        educationRequirements: {
          languageTests: ["IELTS", "TOEFL", "PTE"],
          minimumScores: { IELTS: 6 },
          universityRanking: "No minimum ranking",
          transcriptRequired: true,
        },
        applicationUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500",
      },
    ];

    for (const visa of visasData) {
      await this.createVisa(visa as InsertVisa);
    }
  }

  async getDocument(id: string): Promise<Document | undefined> {
    return this.documents.get(id);
  }

  async getUserDocuments(userId: string): Promise<Document[]> {
    return Array.from(this.documents.values()).filter(
      doc => doc.userId === userId
    );
  }

  async createDocument(doc: InsertDocument): Promise<Document> {
    const id = randomUUID();
    const newDoc: Document = { ...doc, id } as Document;
    this.documents.set(id, newDoc);
    return newDoc;
  }

  async getAdvisory(id: string): Promise<Advisory | undefined> {
    return this.advisories.get(id);
  }

  async getUserAdvisories(userId: string): Promise<Advisory[]> {
    return Array.from(this.advisories.values()).filter(
      advisory => advisory.userId === userId
    );
  }

  async createAdvisory(advisory: InsertAdvisory): Promise<Advisory> {
    const id = randomUUID();
    const newAdvisory: Advisory = { ...advisory, id } as Advisory;
    this.advisories.set(id, newAdvisory);
    return newAdvisory;
  }
}

export const storage = new MemStorage();
storage.seedVisas().catch(console.error);
