import DisplayCards from "@/components/ui/display-cards";
import { Wand2, FileText, BarChart3, Users, Globe, Shield } from "lucide-react";

const featureCards = [
  {
    icon: <Wand2 className="size-4 text-primary" />,
    title: "AI-Powered Wizard",
    description: "Smart visa recommendations",
    date: "Instant results",
    titleClassName: "text-primary",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <FileText className="size-4 text-primary" />,
    title: "Auto-Fill Forms",
    description: "DS-160, Schengen & more",
    date: "Save hours of work",
    titleClassName: "text-primary",
    className:
      "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <BarChart3 className="size-4 text-primary" />,
    title: "Real-Time Tracking",
    description: "Monitor application status",
    date: "24/7 updates",
    titleClassName: "text-primary",
    className:
      "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
  },
];

const additionalFeatureCards = [
  {
    icon: <Users className="size-4 text-primary" />,
    title: "Expert Review",
    description: "Professional consultants",
    date: "100% accuracy",
    titleClassName: "text-primary",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Globe className="size-4 text-primary" />,
    title: "195+ Countries",
    description: "Comprehensive coverage",
    date: "All visa types",
    titleClassName: "text-primary",
    className:
      "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Shield className="size-4 text-primary" />,
    title: "Secure & Private",
    description: "Bank-level encryption",
    date: "SOC-2 compliant",
    titleClassName: "text-primary",
    className:
      "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
  },
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
        
        <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <div className="flex justify-center">
            <DisplayCards cards={featureCards} />
          </div>
          <div className="flex justify-center">
            <DisplayCards cards={additionalFeatureCards} />
          </div>
        </div>
      </div>
    </section>
  );
}
