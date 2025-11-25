import { Button } from "@/components/ui/button";

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
            data-testid="button-cta-start-free"
          >
            Start Free Account
          </Button>
          <Button 
            variant="outline"
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
