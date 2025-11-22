import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <h2 className="text-4xl lg:text-5xl font-bold">
          Ready to Start Your Visa Journey?
        </h2>
        <p className="text-xl text-primary-foreground/90">
          Join 50,000+ travelers who trust VisaHub for their global mobility needs. 
          Start your free account today—no credit card required.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            size="lg" 
            variant="secondary"
            className="group"
            data-testid="button-cta-start-free"
          >
            Start Free Account
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-md"
            data-testid="button-cta-schedule-demo"
          >
            Schedule a Demo
          </Button>
        </div>
        <p className="text-sm text-primary-foreground/70">
          Free forever • No credit card required • Cancel anytime
        </p>
      </div>
    </section>
  );
}
