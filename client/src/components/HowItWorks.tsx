import { Timeline } from "@/components/ui/timeline";
import { Search, FileText, Sparkles, Send, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function HowItWorks() {
  const data = [
    {
      title: "Step 1",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Search className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Answer Simple Questions</h3>
          </div>
          <p className="text-muted-foreground text-base mb-8">
            Tell us about your travel plans, destination, and purpose. Our AI-powered wizard 
            will analyze your requirements and recommend the perfect visa type for your journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 space-y-3">
              <Badge variant="outline" className="w-fit">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered
              </Badge>
              <p className="text-sm text-muted-foreground">
                Smart recommendations based on 195+ countries and thousands of visa types
              </p>
            </Card>
            <Card className="p-4 space-y-3">
              <Badge variant="outline" className="w-fit">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Instant Results
              </Badge>
              <p className="text-sm text-muted-foreground">
                Get visa requirements, costs, and processing times in seconds
              </p>
            </Card>
          </div>
        </div>
      ),
    },
    {
      title: "Step 2",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-chart-2/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-chart-2" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Auto-Fill Forms</h3>
          </div>
          <p className="text-muted-foreground text-base mb-8">
            Skip the tedious paperwork. Our intelligent system automatically fills out 
            complex visa forms like DS-160, Schengen applications, and more using your profile data.
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-status-online mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Pre-filled Applications</p>
                <p className="text-sm text-muted-foreground">
                  All forms populated with your saved information
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-status-online mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Error Detection</p>
                <p className="text-sm text-muted-foreground">
                  AI catches mistakes before submission
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-status-online mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Document Validation</p>
                <p className="text-sm text-muted-foreground">
                  Ensure all required documents are properly formatted
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Step 3",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-chart-3/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-chart-3" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Expert Review</h3>
          </div>
          <p className="text-muted-foreground text-base mb-8">
            Immigration experts review your application to ensure 100% accuracy. 
            We catch errors, optimize responses, and maximize your approval chances.
          </p>
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2">98% Success Rate</p>
                <p className="text-sm text-muted-foreground">
                  Our expert reviewers have helped thousands of applicants get approved. 
                  With personalized feedback and optimization tips, we ensure your application 
                  stands out for all the right reasons.
                </p>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      title: "Step 4",
      content: (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-chart-4/10 flex items-center justify-center">
              <Send className="w-6 h-6 text-chart-4" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Submit & Track</h3>
          </div>
          <p className="text-muted-foreground text-base mb-8">
            Submit your application with confidence. Track every step with real-time updates, 
            from submission to approval, all in one centralized dashboard.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <p className="text-sm text-muted-foreground">Real-time tracking</p>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-3xl font-bold text-primary mb-2">15 min</div>
              <p className="text-sm text-muted-foreground">Average response</p>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <p className="text-sm text-muted-foreground">Transparency</p>
            </Card>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How <span className="text-primary">VisaHub</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From initial consultation to approval, we guide you through every step 
            of your visa journey with AI-powered automation and expert support.
          </p>
        </div>
      </div>
      <Timeline data={data} />
    </section>
  );
}
