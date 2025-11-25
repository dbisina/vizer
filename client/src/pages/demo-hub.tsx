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
  Users,
} from "lucide-react";
import { GetStartedButton } from "@/components/ui/get-started-button";

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
    title: "Visa Advisor",
    description: "AI-powered Q&A to find your perfect visa match",
    icon: Wand2,
    path: "/wizard",
  },
  {
    id: "dashboard",
    title: "My Documents",
    description: "Download AI-generated cover letters, sponsorship letters & form guides",
    icon: BarChart3,
    path: "/dashboard",
  },
  {
    id: "marketplace",
    title: "Travel Agent Marketplace",
    description: "Find verified immigration consultants by country & rating",
    icon: Users,
    path: "/marketplace",
  },
  {
    id: "ai-demo",
    title: "AI Features Demo",
    description: "AI-powered document generation & form guidance",
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
            <h1 className="text-4xl font-bold">VisaHub - AI Visa Advisor</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Get personalized visa guidance, AI-generated documents & find expert agents
          </p>
        </div>

        {/* Demo Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Card
                key={section.id}
                className="hover-elevate cursor-pointer transition-all"
                onClick={() => setLocation(section.path)}
                data-testid={`card-${section.id}`}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                  <div data-testid={`button-explore-${section.id}`} className="w-full">
                    <GetStartedButton 
                      text="Explore"
                      onClick={() => setLocation(section.path)}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-3">✨ How VisaHub Works</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Answer questions about your background & goals</li>
              <li>✓ AI analyzes & recommends perfect visa matches</li>
              <li>✓ AI generates personalized cover letters</li>
              <li>✓ AI creates sponsorship & support letters</li>
              <li>✓ Step-by-step form guidance with explanations</li>
              <li>✓ Direct links to official application portals</li>
            </ul>
          </Card>
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-3">🎯 What We Offer</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ 50+ countries with detailed visa requirements</li>
              <li>✓ Smart education visa matching (with school lookup)</li>
              <li>✓ Country-specific language test requirements</li>
              <li>✓ Verified travel agent marketplace</li>
              <li>✓ AI-powered document generation</li>
              <li>✓ Apply to official portals with confidence</li>
            </ul>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center pt-8">
          <p className="text-muted-foreground mb-4">
            Ready to start your visa journey?
          </p>
          <div data-testid="button-start-advisor">
            <GetStartedButton
              text="Start Visa Advisor"
              onClick={() => setLocation("/wizard")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
