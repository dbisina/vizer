import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        url?: string;
      };
    }
  }
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary/5 via-background to-primary/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              Trusted by 50,000+ global travelers
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Your Global Visa Journey, <span className="text-primary">Simplified</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Navigate visa applications, tax filings, and permits with AI-powered automation. 
              Get approved faster with expert-guided workflows and real-time tracking.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="group"
                data-testid="button-get-started"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                data-testid="button-see-how-it-works"
              >
                See How It Works
              </Button>
            </div>
            
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-primary">195+</div>
                <div className="text-sm text-muted-foreground">Countries Covered</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="relative w-full h-[600px] rounded-2xl overflow-hidden">
              <spline-viewer 
                url="https://prod.spline.design/6PWvJDCpuksvrIzT/scene.splinecode"
                className="w-full h-full"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card border border-card-border rounded-xl p-4 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Application Approved!</div>
                  <div className="text-sm text-muted-foreground">Student Visa - Canada</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
