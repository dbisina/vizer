import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, HelpCircle } from "lucide-react";

export interface FormGuideItem {
  section: string;
  field: string;
  label: string;
  placeholder: string;
  explanation: string;
  example: string;
  tips: string[];
}

interface FormGuideProps {
  visaType: string;
  country: string;
  fields?: FormGuideItem[];
}

const defaultFields: FormGuideItem[] = [
  {
    section: "Personal Information",
    field: "fullName",
    label: "Full Name",
    placeholder: "As shown on your passport",
    explanation: "Your full legal name exactly as it appears on your passport. If you have multiple names, include all of them.",
    example: "John Michael Smith",
    tips: [
      "Must match your passport exactly",
      "Include middle names if applicable",
      "Use capital letters for first and last names"
    ]
  },
  {
    section: "Personal Information",
    field: "dateOfBirth",
    label: "Date of Birth",
    placeholder: "DD/MM/YYYY",
    explanation: "Your date of birth in the format shown. This will be verified against your passport and birth certificate.",
    example: "15/03/1995",
    tips: [
      "Use DD/MM/YYYY format",
      "Must match official documents",
      "Cannot be in the future"
    ]
  },
  {
    section: "Education",
    field: "institution",
    label: "Educational Institution",
    placeholder: "Name of school/university",
    explanation: "The name of the school or university where you will be studying. This is the institution that issued your acceptance letter.",
    example: "University of Toronto",
    tips: [
      "Use the official name from your acceptance letter",
      "Include location if part of official name",
      "Must match your letter of acceptance"
    ]
  },
  {
    section: "Education",
    field: "programName",
    label: "Program/Course Name",
    placeholder: "e.g., Bachelor of Science in Computer Science",
    explanation: "The exact name of your program or course as shown in your acceptance letter. This helps verify you're eligible for a student visa.",
    example: "Master of Computer Science",
    tips: [
      "Copy exactly from acceptance letter",
      "Include degree level (Bachelor, Master, PhD)",
      "Be specific about specialization if listed"
    ]
  },
  {
    section: "Financial",
    field: "fundsSource",
    label: "Source of Funds",
    placeholder: "e.g., Personal savings, Parents, Scholarship",
    explanation: "Where you will get the money for tuition and living expenses. Immigration needs assurance that you can support yourself financially.",
    example: "Parents + Personal savings",
    tips: [
      "Be specific about who is funding you",
      "If multiple sources, list all of them",
      "Prepare documents to prove these funds exist"
    ]
  }
];

export default function FormGuide({ visaType, country, fields = defaultFields }: FormGuideProps) {
  const sections = Array.from(new Set(fields.map(f => f.section)));

  return (
    <div className="space-y-6">
      <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg flex gap-3">
        <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium mb-1">Form Filling Guide</p>
          <p className="text-muted-foreground">
            Each section explains what information you need to provide and why. Click on any field to see examples and tips.
          </p>
        </div>
      </div>

      <Tabs defaultValue={sections[0]} className="w-full">
        <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${Math.min(sections.length, 4)}, 1fr)` }}>
          {sections.map(section => (
            <TabsTrigger key={section} value={section} className="text-xs sm:text-sm">
              {section}
            </TabsTrigger>
          ))}
        </TabsList>

        {sections.map(section => (
          <TabsContent key={section} value={section} className="space-y-4">
            {fields
              .filter(f => f.section === section)
              .map((field, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-primary" />
                      {field.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Explanation */}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">What is this?</p>
                      <p className="text-sm">{field.explanation}</p>
                    </div>

                    {/* Example */}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Example</p>
                      <div className="bg-muted p-3 rounded text-sm font-mono">
                        {field.example}
                      </div>
                    </div>

                    {/* Tips */}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Tips & Important Notes</p>
                      <ul className="space-y-1">
                        {field.tips.map((tip, tipIdx) => (
                          <li key={tipIdx} className="text-sm flex gap-2">
                            <span className="text-primary font-bold">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        ))}
      </Tabs>

      {/* General Tips */}
      <Card className="bg-muted/30 border-0">
        <CardHeader>
          <CardTitle className="text-base">General Tips for All Forms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>✓ Fill all required fields - missing information can delay or reject your application</p>
          <p>✓ Double-check for spelling and grammar errors</p>
          <p>✓ Use the exact names from official documents (passport, acceptance letter, etc.)</p>
          <p>✓ Save your progress regularly</p>
          <p>✓ If unsure about a field, refer to the official application instructions or contact the visa center</p>
        </CardContent>
      </Card>
    </div>
  );
}
