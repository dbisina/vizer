import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for exploring visa requirements",
    features: [
      "1 visa wizard session",
      "1 document upload",
      "Basic requirements info",
      "Email reminders",
      "Community support"
    ],
    cta: "Start Free",
    popular: false
  },
  {
    name: "Pro",
    price: "$15",
    period: "per month",
    description: "Ideal for frequent travelers",
    features: [
      "Unlimited visa wizards",
      "Auto-fill all forms",
      "Unlimited document uploads",
      "Document quality scanning",
      "Multi-country profiles",
      "PDF export",
      "Priority email support"
    ],
    cta: "Start Pro Trial",
    popular: true
  },
  {
    name: "Premium",
    price: "$49",
    period: "per month",
    description: "For serious global professionals",
    features: [
      "Everything in Pro",
      "1 expert review per month",
      "Fast-track support",
      "Tax residency guidance",
      "Risk of rejection score",
      "Application templates",
      "Phone support"
    ],
    cta: "Start Premium",
    popular: false
  },
  {
    name: "Business",
    price: "$299",
    period: "per month",
    description: "For companies hiring globally",
    features: [
      "Up to 20 employees/month",
      "Team dashboard",
      "Custom workflows",
      "Analytics & reporting",
      "Dedicated account manager",
      "API access",
      "SLA guarantee"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

export default function Pricing() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground">
            Choose the plan that fits your global mobility needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative flex flex-col ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
              data-testid={`card-plan-${plan.name.toLowerCase()}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className="space-y-4 pb-8">
                <div>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full justify-center"
                  data-testid={`button-${plan.name.toLowerCase()}-cta`}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <p className="text-center text-sm text-muted-foreground mt-12">
          All plans include bank-level encryption and SOC-2 compliance. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
