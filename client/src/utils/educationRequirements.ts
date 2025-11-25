// Country-specific education requirements and language tests
export const educationRequirementsByCountry: Record<string, {
  languageTests: Array<{ name: string; minScore: string }>;
  degreeLevel?: string;
  avgTuition?: string;
  topSchools?: string[];
}> = {
  Canada: {
    languageTests: [
      { name: "IELTS", minScore: "6.0-6.5" },
      { name: "TOEFL", minScore: "80-100" },
      { name: "CAEL", minScore: "50+" },
      { name: "Duolingo", minScore: "110+" }
    ],
    degreeLevel: "All levels (Diploma to PhD)",
    avgTuition: "$15,000-$35,000/year",
    topSchools: ["University of Toronto", "University of British Columbia", "McGill University", "McMaster University"]
  },
  "United States": {
    languageTests: [
      { name: "TOEFL", minScore: "80-100" },
      { name: "IELTS", minScore: "6.5-7.0" },
      { name: "Duolingo", minScore: "120+" }
    ],
    degreeLevel: "All levels (Associate to PhD)",
    avgTuition: "$25,000-$60,000/year",
    topSchools: ["Harvard University", "MIT", "Stanford University", "Yale University"]
  },
  "United Kingdom": {
    languageTests: [
      { name: "IELTS", minScore: "6.5-7.0" },
      { name: "TOEFL", minScore: "100+" },
      { name: "Duolingo", minScore: "120+" }
    ],
    degreeLevel: "All levels (Foundation to PhD)",
    avgTuition: "£15,000-£40,000/year",
    topSchools: ["University of Oxford", "University of Cambridge", "LSE", "UCL"]
  },
  Germany: {
    languageTests: [
      { name: "TestDAF", minScore: "3/4" },
      { name: "DSH", minScore: "Level 2-3" },
      { name: "TELC C1", minScore: "Pass" }
    ],
    degreeLevel: "All levels (Bachelor to PhD)",
    avgTuition: "€100-€500/semester",
    topSchools: ["Heidelberg University", "Technical University Munich", "Humboldt University"]
  },
  Australia: {
    languageTests: [
      { name: "IELTS", minScore: "6.0-7.0" },
      { name: "TOEFL", minScore: "80-100" },
      { name: "PTE", minScore: "58-72" }
    ],
    degreeLevel: "All levels (Certificate to PhD)",
    avgTuition: "AUD $15,000-$40,000/year",
    topSchools: ["University of Melbourne", "University of Sydney", "ANU", "UNSW Sydney"]
  }
};

export const languageTestInfo: Record<string, {
  fullName: string;
  prepTime: string;
  validity: string;
  examFee: string;
  description: string;
}> = {
  IELTS: {
    fullName: "International English Language Testing System",
    prepTime: "1-3 months typical",
    validity: "2 years",
    examFee: "$250-$400",
    description: "British and Commonwealth universities often prefer IELTS. Available in Academic and General Training modules."
  },
  TOEFL: {
    fullName: "Test of English as a Foreign Language",
    prepTime: "2-4 months typical",
    validity: "2 years",
    examFee: "$200-$300",
    description: "Widely accepted in North America. Available as iBT (Internet-Based Test). Includes speaking component."
  },
  CAEL: {
    fullName: "Canadian Academic English Language Assessment",
    prepTime: "1-2 months typical",
    validity: "2 years",
    examFee: "$300-$400",
    description: "Canadian institutions prefer this. Task-based assessment with real academic scenarios."
  },
  Duolingo: {
    fullName: "Duolingo English Test",
    prepTime: "2-6 weeks",
    validity: "2 years",
    examFee: "$49",
    description: "Affordable and convenient. Quick 1-hour online exam with results in 48 hours. Accepted by most universities."
  },
  TestDAF: {
    fullName: "Test Deutsch als Fremdsprache",
    prepTime: "3-6 months",
    validity: "Permanently",
    examFee: "€235",
    description: "German language test required for German universities. Available worldwide."
  },
  DSH: {
    fullName: "Deutschsprachige Hochschule",
    prepTime: "3-6 months",
    validity: "Permanently",
    examFee: "€100-€200",
    description: "German language test for university entrance. Taken at the university itself."
  },
  PTE: {
    fullName: "Pearson Test of English",
    prepTime: "2-4 weeks",
    validity: "3 years",
    examFee: "$165",
    description: "Fast AI-scored test with quick results. Accepted by Australian universities."
  }
};

export function getEducationRequirements(country: string) {
  return educationRequirementsByCountry[country] || null;
}

export function getLanguageTestInfo(testName: string) {
  return languageTestInfo[testName] || null;
}

export function formatRequirements(country: string): string {
  const reqs = getEducationRequirements(country);
  if (!reqs) return "No specific requirements found.";
  
  const lines = [
    `**${country} Education Requirements**`,
    ``,
    `**Degree Levels:** ${reqs.degreeLevel || "Multiple"}`,
    `**Average Tuition:** ${reqs.avgTuition || "Varies"}`,
    ``,
    `**Language Tests Accepted:**`,
    ...reqs.languageTests.map(t => `- ${t.name}: ${t.minScore}`),
    ``,
    `**Top Universities:**`,
    ...reqs.topSchools?.map(s => `- ${s}`) || [],
  ];
  
  return lines.join('\n');
}
