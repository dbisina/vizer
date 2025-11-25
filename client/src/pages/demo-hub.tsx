import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Globe,
  LogIn,
  Wand2,
  BarChart3,
  Zap,
  Home,
  ArrowRight,
} from "lucide-react";

const sections = [
  {
    id: "landing",
    title: "Landing Page",
    description: "Hero section with features, testimonials, pricing & CTA",
    icon: Home,
    path: "/",
  },
  {
    id: "auth",
    title: "Login & Sign Up",
    description: "Beautiful auth pages with image slider and dual modes",
    icon: LogIn,
    path: "/auth",
  },
  {
    id: "wizard",
    title: "Visa Wizard",
    description: "Interactive 5-step wizard with real visa recommendations",
    icon: Wand2,
    path: "/wizard",
  },
  {
    id: "dashboard",
    title: "Application Dashboard",
    description: "Track visas, documents, timeline & application progress",
    icon: BarChart3,
    path: "/dashboard",
  },
  {
    id: "ai-demo",
    title: "AI Features Demo",
    description: "AI-powered document generation & visa analysis",
    icon: Zap,
    path: "/ai-demo",
  },
];

export default function DemoHub() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">VisaHub Preview</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Explore all features of the complete visa application platform
          </p>
        </div>

        {/* Demo Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <Card
                key={section.id}
                className="hover-elevate cursor-pointer transition-all group"
                onClick={() => setLocation(section.path)}
                data-testid={`card-demo-${section.id}`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <CardTitle className="text-lg mb-2">
                      {section.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                  <Button
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLocation(section.path);
                    }}
                    data-testid={`button-demo-${section.id}`}
                  >
                    Explore
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-3">✨ Key Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ 50+ countries with detailed visa requirements</li>
              <li>✓ AI-powered visa recommendations</li>
              <li>✓ Interactive multi-step application wizard</li>
              <li>✓ Real-time application tracking</li>
              <li>✓ Document management system</li>
              <li>✓ Processing timeline visualization</li>
            </ul>
          </Card>
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-3">🎨 Design Highlights</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Material Design + Stripe aesthetic</li>
              <li>✓ Smooth animations with Framer Motion</li>
              <li>✓ Fully responsive mobile design</li>
              <li>✓ Dark mode support</li>
              <li>✓ Image slider auth experience</li>
              <li>✓ Glassmorphism & modern effects</li>
            </ul>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center pt-8">
          <p className="text-muted-foreground mb-4">
            Ready to launch? Each section is fully functional and interactive.
          </p>
          <Button
            size="lg"
            onClick={() => setLocation("/")}
            data-testid="button-back-to-landing"
          >
            Back to Landing Page
          </Button>
        </div>
      </div>
    </div>
  );
}
