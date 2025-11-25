import { Badge } from "@/components/ui/badge";
import { CheckCircle, Globe, Users, Zap } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { AnimatedButton } from "@/components/ui/animated-button";
import heroImage from "@assets/generated_images/hero_section_professionals_working.png";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      
      <ContainerScroll
        titleComponent={
          <div className="space-y-8 px-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium backdrop-blur-sm border border-primary/20">
              <CheckCircle className="w-4 h-4" />
              Trusted by 50,000+ global travelers
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Your Global Visa Journey,{" "}
              <span className="text-primary bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Simplified
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Navigate visa applications, tax filings, and permits with AI-powered automation. 
              Get approved faster with expert-guided workflows and real-time tracking.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <AnimatedButton 
                data-testid="button-get-started"
                accentColor="bg-primary"
                className="text-base"
              >
                Get Started Free
              </AnimatedButton>
              <AnimatedButton 
                data-testid="button-see-how-it-works"
                accentColor="bg-primary"
                className="text-base"
              >
                See How It Works
              </AnimatedButton>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-8 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">195+</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-chart-2/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-chart-2" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-status-online/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-status-online" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <div className="relative w-full h-full">
          <img 
            src={heroImage}
            alt="VisaHub Dashboard - Track your visa applications"
            className="w-full h-full object-cover object-top rounded-2xl"
          />
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
            <Badge className="bg-primary/90 backdrop-blur-md text-primary-foreground px-4 py-2 text-sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Application Approved
            </Badge>
            <Badge className="bg-background/90 backdrop-blur-md text-foreground px-4 py-2 text-sm border border-border">
              <Zap className="w-4 h-4 mr-2 text-primary" />
              AI-Powered
            </Badge>
            <Badge className="bg-background/90 backdrop-blur-md text-foreground px-4 py-2 text-sm border border-border">
              <Globe className="w-4 h-4 mr-2 text-primary" />
              195+ Countries
            </Badge>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
