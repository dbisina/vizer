import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Sparkles, FileText, ArrowRight, ExternalLink } from "lucide-react";
import type { Visa } from "@shared/schema";

const steps = [
  { id: 1, title: "Your Profile", description: "Where are you from?" },
  { id: 2, title: "Destination", description: "Where do you want to go?" },
  { id: 3, title: "Purpose", description: "What's your goal?" },
  { id: 4, title: "Education Details", description: "Tell us about your education (if applicable)" },
  { id: 5, title: "AI Analysis", description: "Let's find your perfect visa match" }
];

const countries = ["Canada", "United States", "United Kingdom", "Germany", "Australia"];
const purposes = ["Work", "Study", "Tourism", "Business"];
const educationLevels = ["Bachelor's Degree", "Master's Degree", "PhD", "Diploma", "Not Applicable"];

export default function VisaAdvisor() {
  const [currentStep, setCurrentStep] = useState(1);
  const [recommendedVisas, setRecommendedVisas] = useState<Visa[]>([]);
  const [showGeneration, setShowGeneration] = useState(false);
  
  const [formData, setFormData] = useState({
    yourCountry: "",
    destination: "",
    purpose: "",
    educationLevel: "",
    school: "",
    testScore: "",
    fullName: ""
  });

  const { data: allVisas = [] } = useQuery<Visa[]>({
    queryKey: ["/api/visas"],
  });

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep === 2 && formData.destination) {
      const visas = (allVisas as Visa[]).filter((v: Visa) => 
        v.country.toLowerCase() === formData.destination.toLowerCase()
      );
      setRecommendedVisas(visas);
    }
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps.length) {
      setShowGeneration(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return !!formData.yourCountry;
      case 2:
        return !!formData.destination;
      case 3:
        return !!formData.purpose;
      case 4:
        return true; // Optional
      case 5:
        return true;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {!showGeneration ? (
          <>
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                          currentStep > step.id
                            ? "bg-primary text-primary-foreground"
                            : currentStep === step.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {currentStep > step.id ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          step.id
                        )}
                      </div>
                      <div className="text-center hidden sm:block">
                        <div className="text-xs font-medium">{step.title}</div>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`flex-1 h-1 mx-2 ${
                          currentStep > step.id ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Form */}
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="space-y-2">
                <h2 className="text-2xl font-bold">{steps[currentStep - 1].title}</h2>
                <p className="text-muted-foreground">{steps[currentStep - 1].description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="yourCountry">Your Country</Label>
                      <Select
                        value={formData.yourCountry}
                        onValueChange={(value) =>
                          setFormData({ ...formData, yourCountry: value })
                        }
                      >
                        <SelectTrigger id="yourCountry" data-testid="select-your-country">
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="destination">Destination Country</Label>
                      <Select
                        value={formData.destination}
                        onValueChange={(value) =>
                          setFormData({ ...formData, destination: value })
                        }
                      >
                        <SelectTrigger id="destination" data-testid="select-destination">
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <Label>What's your primary goal?</Label>
                    <RadioGroup
                      value={formData.purpose}
                      onValueChange={(value) =>
                        setFormData({ ...formData, purpose: value })
                      }
                      data-testid="radio-purpose"
                    >
                      {purposes.map((purpose) => (
                        <div
                          key={purpose}
                          className="flex items-center space-x-2 p-4 border rounded-lg hover-elevate cursor-pointer"
                        >
                          <RadioGroupItem value={purpose} id={purpose} />
                          <Label htmlFor={purpose} className="flex-1 cursor-pointer">
                            {purpose}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-4">
                    {formData.purpose === "Study" && (
                      <>
                        <div>
                          <Label htmlFor="educationLevel">Education Level</Label>
                          <Select
                            value={formData.educationLevel}
                            onValueChange={(value) =>
                              setFormData({ ...formData, educationLevel: value })
                            }
                          >
                            <SelectTrigger id="educationLevel">
                              <SelectValue placeholder="Select your education level" />
                            </SelectTrigger>
                            <SelectContent>
                              {educationLevels.map((level) => (
                                <SelectItem key={level} value={level}>
                                  {level}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="school">School/University Name</Label>
                          <Input
                            id="school"
                            placeholder="e.g., University of Toronto"
                            value={formData.school}
                            onChange={(e) =>
                              setFormData({ ...formData, school: e.target.value })
                            }
                            data-testid="input-school"
                          />
                        </div>
                        <div>
                          <Label htmlFor="testScore">Language Test Score (Optional)</Label>
                          <Input
                            id="testScore"
                            placeholder="e.g., IELTS: 7.5"
                            value={formData.testScore}
                            onChange={(e) =>
                              setFormData({ ...formData, testScore: e.target.value })
                            }
                            data-testid="input-test-score"
                          />
                        </div>
                      </>
                    )}
                    {formData.purpose !== "Study" && (
                      <p className="text-muted-foreground">
                        We'll gather more information about your background in the next steps.
                      </p>
                    )}
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg space-y-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold">Your AI Analysis</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Based on your profile, we've identified the perfect visa options for you. Our AI will:
                      </p>
                      <ul className="text-sm space-y-2 ml-4">
                        <li>✓ Generate personalized cover letters</li>
                        <li>✓ Create sponsorship letters tailored to your case</li>
                        <li>✓ Provide form-filling guidance with step-by-step explanations</li>
                        <li>✓ Direct you to official application portals with direct links</li>
                      </ul>
                    </div>

                    {recommendedVisas.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg">Recommended Visas</h3>
                        {recommendedVisas.map((visa) => (
                          <Card key={visa.id} className="p-4 hover-elevate">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="font-semibold text-lg">{visa.visaType}</div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {visa.description}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Processing:</span>{" "}
                                    <span className="font-medium">{visa.processingTimeMin}-{visa.processingTimeMax} weeks</span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Cost:</span>{" "}
                                    <span className="font-medium">${visa.cost}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-3xl font-bold text-primary">
                                  {visa.approvalRate}%
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  approval rate
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  data-testid="button-back"
                >
                  Back
                </Button>
                {currentStep < steps.length ? (
                  <Button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    data-testid="button-next"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    data-testid="button-get-documents"
                  >
                    Get My Documents
                    <Sparkles className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          </>
        ) : (
          /* Document Generation Page */
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-8 h-8 text-primary" />
                <h1 className="text-3xl font-bold">Your Documents Ready</h1>
              </div>
              <p className="text-muted-foreground">
                AI-generated documents tailored to your visa application
              </p>
            </div>

            <div className="grid gap-4">
              {[
                { type: "Cover Letter", icon: FileText, desc: "Personalized for your visa type" },
                { type: "Sponsorship Letter", icon: FileText, desc: "Based on your profile" },
                { type: "Support Letters", icon: FileText, desc: "Professional recommendations" },
                { type: "Form Guide", icon: FileText, desc: "Step-by-step filling instructions" }
              ].map((doc, idx) => (
                <Card key={idx} className="p-4 hover-elevate cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <doc.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">{doc.type}</div>
                        <p className="text-xs text-muted-foreground">{doc.desc}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" data-testid={`button-download-${idx}`}>
                      Download
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="space-y-4">
                <h3 className="font-semibold">Ready to Apply?</h3>
                <p className="text-sm text-muted-foreground">
                  All documents are prepared. Next, we'll guide you through form-filling with AI-powered explanations for each section.
                </p>
                {recommendedVisas[0] && (
                  <Button className="w-full" data-testid="button-go-to-portal">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Go to Official Application Portal
                  </Button>
                )}
              </div>
            </Card>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowGeneration(false)}
                data-testid="button-back-to-advisor"
              >
                Back to Advisor
              </Button>
              <Button
                onClick={() => window.location.href = "/"}
                variant="ghost"
                data-testid="button-home"
              >
                Home
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
