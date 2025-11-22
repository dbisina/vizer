import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle } from "lucide-react";

const steps = [
  { id: 1, title: "Destination", description: "Where are you going?" },
  { id: 2, title: "Purpose", description: "Why are you traveling?" },
  { id: 3, title: "Duration", description: "How long will you stay?" },
  { id: 4, title: "Profile", description: "Tell us about yourself" },
  { id: 5, title: "Review", description: "Confirm your details" }
];

export default function VisaWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: "",
    purpose: "",
    duration: "",
    nationality: "",
    fullName: ""
  });

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    console.log('Next step triggered', { currentStep, formData });
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    console.log('Back step triggered', { currentStep });
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep > step.id 
                      ? 'bg-primary text-primary-foreground' 
                      : currentStep === step.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                  </div>
                  <div className="text-center hidden sm:block">
                    <div className="text-xs font-medium">{step.title}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 ${currentStep > step.id ? 'bg-primary' : 'bg-muted'}`} />
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
                    onValueChange={(value) => setFormData({...formData, destination: value})}
                  >
                    <SelectTrigger id="destination" data-testid="select-destination">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="usa">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="germany">Germany</SelectItem>
                      <SelectItem value="australia">Australia</SelectItem>
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
                  onValueChange={(value) => setFormData({...formData, purpose: value})}
                  data-testid="radio-purpose"
                >
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover-elevate cursor-pointer">
                    <RadioGroupItem value="tourism" id="tourism" />
                    <Label htmlFor="tourism" className="flex-1 cursor-pointer">
                      Tourism / Vacation
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover-elevate cursor-pointer">
                    <RadioGroupItem value="work" id="work" />
                    <Label htmlFor="work" className="flex-1 cursor-pointer">
                      Work / Employment
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover-elevate cursor-pointer">
                    <RadioGroupItem value="study" id="study" />
                    <Label htmlFor="study" className="flex-1 cursor-pointer">
                      Study / Education
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover-elevate cursor-pointer">
                    <RadioGroupItem value="business" id="business" />
                    <Label htmlFor="business" className="flex-1 cursor-pointer">
                      Business / Conference
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="duration">Intended Stay Duration</Label>
                  <Select 
                    value={formData.duration}
                    onValueChange={(value) => setFormData({...formData, duration: value})}
                  >
                    <SelectTrigger id="duration" data-testid="select-duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-30">1-30 days</SelectItem>
                      <SelectItem value="31-90">31-90 days</SelectItem>
                      <SelectItem value="91-180">91-180 days</SelectItem>
                      <SelectItem value="181-365">181-365 days</SelectItem>
                      <SelectItem value="365+">More than 1 year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nationality">Nationality</Label>
                  <Select 
                    value={formData.nationality}
                    onValueChange={(value) => setFormData({...formData, nationality: value})}
                  >
                    <SelectTrigger id="nationality" data-testid="select-nationality">
                      <SelectValue placeholder="Select your nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="china">China</SelectItem>
                      <SelectItem value="brazil">Brazil</SelectItem>
                      <SelectItem value="mexico">Mexico</SelectItem>
                      <SelectItem value="philippines">Philippines</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="fullName">Full Name (as on passport)</Label>
                  <Input 
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    placeholder="Enter your full name"
                    data-testid="input-full-name"
                  />
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Destination:</span>
                    <span className="font-medium capitalize">{formData.destination || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Purpose:</span>
                    <span className="font-medium capitalize">{formData.purpose || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{formData.duration || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nationality:</span>
                    <span className="font-medium capitalize">{formData.nationality || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Full Name:</span>
                    <span className="font-medium">{formData.fullName || 'Not entered'}</span>
                  </div>
                </div>
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-primary mb-1">You're all set!</div>
                      <p className="text-sm text-muted-foreground">
                        Based on your information, we'll generate a personalized visa checklist and help you auto-fill the required forms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handleBack}
              disabled={currentStep === 1}
              data-testid="button-wizard-back"
            >
              Back
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" data-testid="button-wizard-save">
                Save & Exit
              </Button>
              <Button 
                onClick={handleNext}
                data-testid="button-wizard-next"
              >
                {currentStep === steps.length ? 'Generate Checklist' : 'Continue'}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
