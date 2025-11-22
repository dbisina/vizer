import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Answer Quick Questions",
    description: "Tell us about your destination, purpose, and travel dates through our intuitive wizard."
  },
  {
    number: "02",
    title: "Get Your Requirements",
    description: "Receive a personalized checklist of documents, forms, and fees based on your profile."
  },
  {
    number: "03",
    title: "Auto-Fill & Upload",
    description: "Let AI complete your forms and upload your documents with quality validation."
  },
  {
    number: "04",
    title: "Track & Submit",
    description: "Monitor progress in real-time and submit when ready with expert review if needed."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">How VisaHub Works</h2>
          <p className="text-xl text-muted-foreground">
            Four simple steps to your visa approval
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative" data-testid={`step-${index}`}>
              <div className="space-y-4">
                <div className="text-6xl font-bold text-primary/20">{step.number}</div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-4 text-primary/30">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
