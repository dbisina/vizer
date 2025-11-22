import { Card, CardContent } from "@/components/ui/card";
import { Wand2, FileText, BarChart3, Users, Globe, Shield } from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "AI-Powered Visa Wizard",
    description: "Answer simple questions and let our AI determine your visa category, requirements, and eligibility instantly."
  },
  {
    icon: FileText,
    title: "Auto-Fill Documents",
    description: "Automatically populate complex government forms like DS-160, Schengen applications, and work permits."
  },
  {
    icon: BarChart3,
    title: "Real-Time Tracking",
    description: "Monitor your application status with visual timelines, deadline reminders, and progress indicators."
  },
  {
    icon: Users,
    title: "Expert Review",
    description: "Get professional immigration consultants to review your application before submission."
  },
  {
    icon: Globe,
    title: "195+ Countries",
    description: "Comprehensive coverage of visa requirements, processing times, and embassy locations worldwide."
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Bank-level encryption for your documents and personal information with SOC-2 compliance."
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything You Need for Global Mobility</h2>
          <p className="text-xl text-muted-foreground">
            From visa applications to tax filings, we've got you covered with intelligent automation and expert guidance.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="hover-elevate transition-all duration-200"
              data-testid={`card-feature-${index}`}
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
