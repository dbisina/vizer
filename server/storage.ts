import { type User, type InsertUser, type UpdateUser, type Visa, type InsertVisa, type Document, type InsertDocument, type Advisory, type InsertAdvisory, type TravelAgent, type InsertTravelAgent } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: UpdateUser): Promise<User>;
  
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
  
  getTravelAgent(id: string): Promise<TravelAgent | undefined>;
  listTravelAgents(): Promise<TravelAgent[]>;
  searchTravelAgents(filters: { country?: string; minRating?: number; specialty?: string }): Promise<TravelAgent[]>;
  createTravelAgent(agent: InsertTravelAgent): Promise<TravelAgent>;
  seedTravelAgents(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private visas: Map<string, Visa>;
  private documents: Map<string, Document>;
  private advisories: Map<string, Advisory>;
  private travelAgents: Map<string, TravelAgent>;

  constructor() {
    this.users = new Map();
    this.visas = new Map();
    this.documents = new Map();
    this.advisories = new Map();
    this.travelAgents = new Map();
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
    const user: User = { ...insertUser, id } as User;
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: UpdateUser): Promise<User> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
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

  async getTravelAgent(id: string): Promise<TravelAgent | undefined> {
    return this.travelAgents.get(id);
  }

  async listTravelAgents(): Promise<TravelAgent[]> {
    return Array.from(this.travelAgents.values());
  }

  async searchTravelAgents(filters: { country?: string; minRating?: number; specialty?: string }): Promise<TravelAgent[]> {
    return Array.from(this.travelAgents.values()).filter(agent => {
      if (filters.country && !agent.countries.some(c => c.toLowerCase().includes(filters.country!.toLowerCase()))) {
        return false;
      }
      if (filters.minRating && Number(agent.rating) < filters.minRating) {
        return false;
      }
      if (filters.specialty && !agent.specialties.some(s => s.toLowerCase().includes(filters.specialty!.toLowerCase()))) {
        return false;
      }
      return true;
    });
  }

  async createTravelAgent(agent: InsertTravelAgent): Promise<TravelAgent> {
    const id = randomUUID();
    const newAgent: TravelAgent = { ...agent, id } as TravelAgent;
    this.travelAgents.set(id, newAgent);
    return newAgent;
  }

  async seedTravelAgents(): Promise<void> {
    const agentsData: Array<Omit<InsertTravelAgent, 'id'>> = [
      {
        name: "Global Visa Experts",
        description: "Specializing in student and work visas with 15+ years of experience",
        specialties: ["Student Visas", "Work Visas", "Family Sponsorship"],
        countries: ["Canada", "USA", "UK", "Australia"],
        rating: 4.8 as any,
        reviewCount: 342,
        responseTime: "2 hours",
        priceRange: "$800-$2000",
        website: "https://example.com/global-visa",
        email: "info@globalvisa.com",
        phone: "+1-888-123-4567",
        yearsExperience: 15,
        successRate: 96 as any,
        languages: ["English", "French", "Spanish", "Mandarin"],
        certifications: ["ICCRC", "RCIC"],
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=agent1",
        createdAt: new Date().toISOString(),
      },
      {
        name: "Canadian Dream Immigration",
        description: "Expert in Canadian student and work permits",
        specialties: ["Student Visas", "Work Visas", "Immigration Planning"],
        countries: ["Canada"],
        rating: 4.9 as any,
        reviewCount: 567,
        responseTime: "1 hour",
        priceRange: "$600-$1500",
        website: "https://example.com/canadian-dream",
        email: "help@canadiandream.ca",
        phone: "+1-416-555-1234",
        yearsExperience: 18,
        successRate: 98 as any,
        languages: ["English", "French"],
        certifications: ["ICCRC", "RCIC"],
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=agent2",
        createdAt: new Date().toISOString(),
      },
      {
        name: "UK University Plus",
        description: "Specialized in UK education visas and university applications",
        specialties: ["Student Visas", "University Admissions", "Tier 4 Sponsorship"],
        countries: ["United Kingdom"],
        rating: 4.7 as any,
        reviewCount: 289,
        responseTime: "3 hours",
        priceRange: "$700-$1800",
        website: "https://example.com/uk-plus",
        email: "support@ukplus.co.uk",
        phone: "+44-20-1234-5678",
        yearsExperience: 12,
        successRate: 94 as any,
        languages: ["English"],
        certifications: ["ICCRC"],
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=agent3",
        createdAt: new Date().toISOString(),
      },
      {
        name: "Australia Visa Consultants",
        description: "Experts in Australian student and skilled migration visas",
        specialties: ["Student Visas", "Skilled Migration", "Work Visas"],
        countries: ["Australia"],
        rating: 4.6 as any,
        reviewCount: 421,
        responseTime: "4 hours",
        priceRange: "$500-$1200",
        website: "https://example.com/aus-visa",
        email: "hello@ausvisa.com.au",
        phone: "+61-2-9123-4567",
        yearsExperience: 10,
        successRate: 92 as any,
        languages: ["English", "Mandarin", "Hindi"],
        certifications: ["ICCRC"],
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=agent4",
        createdAt: new Date().toISOString(),
      },
      {
        name: "USA Visa Professionals",
        description: "F-1 student visas and H-1B work visa specialists",
        specialties: ["Student Visas", "Work Visas", "Visa Interviews"],
        countries: ["United States"],
        rating: 4.5 as any,
        reviewCount: 198,
        responseTime: "2 hours",
        priceRange: "$900-$2500",
        website: "https://example.com/usa-visas",
        email: "team@usavisa.com",
        phone: "+1-212-555-9999",
        yearsExperience: 14,
        successRate: 91 as any,
        languages: ["English", "Spanish"],
        certifications: ["ICCRC"],
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=agent5",
        createdAt: new Date().toISOString(),
      },
      {
        name: "Europe Study Visas",
        description: "Specializing in German, French, and European student visas",
        specialties: ["Student Visas", "Schengen Visas", "Language Programs"],
        countries: ["Germany", "France", "Netherlands", "Spain"],
        rating: 4.4 as any,
        reviewCount: 156,
        responseTime: "5 hours",
        priceRange: "$400-$1000",
        website: "https://example.com/europe-study",
        email: "info@europestudy.eu",
        phone: "+49-30-1234567",
        yearsExperience: 8,
        successRate: 89 as any,
        languages: ["English", "German", "French"],
        certifications: ["ICCRC"],
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=agent6",
        createdAt: new Date().toISOString(),
      },
    ];

    for (const agent of agentsData) {
      await this.createTravelAgent(agent as InsertTravelAgent);
    }
  }
}

export const storage = new MemStorage();
storage.seedVisas().catch(console.error);
storage.seedTravelAgents().catch(console.error);
