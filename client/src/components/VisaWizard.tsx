import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Visa } from "@shared/schema";

const steps = [
  { id: 1, title: "Destination", description: "Where are you going?" },
  { id: 2, title: "Purpose", description: "Why are you traveling?" },
  { id: 3, title: "Duration", description: "How long will you stay?" },
  { id: 4, title: "Profile", description: "Tell us about yourself" },
  { id: 5, title: "Review", description: "Confirm your details" }
];

const countries = ["Canada", "United States", "United Kingdom", "Germany", "Australia"];
const purposes = ["Tourism", "Work", "Study", "Business", "Visit Family"];

export default function VisaWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [recommendedVisas, setRecommendedVisas] = useState<Visa[]>([]);
  const [formData, setFormData] = useState({
    destination: "",
    purpose: "",
    duration: "",
    nationality: "",
    fullName: ""
  });

  const { data: allVisas = [] } = useQuery<Visa[]>({
    queryKey: ["/api/visas"],
  });

  const progress = (currentStep / steps.length) * 100;

  const handleNext = async () => {
    if (currentStep === 1 && formData.destination) {
      const visas = (allVisas as Visa[]).filter((v: Visa) => 
        v.country.toLowerCase() === formData.destination.toLowerCase()
      );
      setRecommendedVisas(visas);
    }
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
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
        return !!formData.destination;
      case 2:
        return !!formData.purpose;
      case 3:
        return !!formData.duration;
      case 4:
        return !!formData.fullName && !!formData.nationality;
      case 5:
        return true;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="max-w-4xl mx-auto px-6">
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

        <Card className="max-w-2xl mx-auto">
          <CardHeader className="space-y-2">
            <h2 className="text-2xl font-bold">{steps[currentStep - 1].title}</h2>
            <p className="text-muted-foreground">{steps[currentStep - 1].description}</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="destination">Destination Country</Label>
                  <Select
                    value={formData.destination}
                    onValueChange={(value) =>
                      setFormData({ ...formData, destination: value })
                    }
                  >
                    <SelectTrigger
                      id="destination"
                      data-testid="select-destination"
                    >
                      <SelectValue placeholder="Select a country" />
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
                <Label>Purpose of Travel</Label>
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

            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="duration">Duration (in months)</Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="e.g., 6"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    data-testid="input-duration"
                  />
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    data-testid="input-fullname"
                  />
                </div>
                <div>
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    placeholder="e.g., Canadian"
                    value={formData.nationality}
                    onChange={(e) =>
                      setFormData({ ...formData, nationality: e.target.value })
                    }
                    data-testid="input-nationality"
                  />
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-lg space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Destination</div>
                    <div className="font-semibold">{formData.destination}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Purpose</div>
                    <div className="font-semibold">{formData.purpose}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Duration</div>
                    <div className="font-semibold">{formData.duration} months</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Name</div>
                    <div className="font-semibold">{formData.fullName}</div>
                  </div>
                </div>

                {recommendedVisas.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold">Recommended Visas</h3>
                    {recommendedVisas.map((visa) => (
                      <Card key={visa.id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-semibold">{visa.visaType}</div>
                            <p className="text-sm text-muted-foreground">
                              {visa.description}
                            </p>
                            <div className="mt-2 flex gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Processing:</span>{" "}
                                {visa.processingTimeMin}-{visa.processingTimeMax} weeks
                              </div>
                              <div>
                                <span className="text-muted-foreground">Cost:</span> ${visa.cost}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">
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
                onClick={() => {
                  // Handle final submission
                  console.log("Application submitted", formData);
                }}
                data-testid="button-submit"
              >
                Start Application
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
