import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingState from "@/components/LoadingState";
import { Sparkles, FileText, CheckCircle } from "lucide-react";

export default function AIProcessing() {
  const [stage, setStage] = useState<"idle" | "thinking" | "processing" | "saving" | "complete">("idle");

  const startProcess = () => {
    setStage("thinking");
    setTimeout(() => setStage("processing"), 3000);
    setTimeout(() => setStage("saving"), 6000);
    setTimeout(() => setStage("complete"), 9000);
  };

  const reset = () => setStage("idle");

  if (stage === "idle") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">AI-Powered Document Generation</h2>
            <p className="text-muted-foreground text-lg">
              Let our AI analyze your profile and automatically generate your visa application documents
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Smart Analysis</div>
                  <div className="text-sm text-muted-foreground">AI reviews your information to determine requirements</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Auto-Fill Forms</div>
                  <div className="text-sm text-muted-foreground">Complex government forms completed in seconds</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Secure Storage</div>
                  <div className="text-sm text-muted-foreground">Bank-level encryption for all your documents</div>
                </div>
              </div>
            </div>
            <Button 
              className="w-full justify-center text-base"
              onClick={startProcess}
              data-testid="button-start-ai-process"
             
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate My Documents
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (stage === "thinking") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <LoadingState type="thinking" message="Analyzing your visa requirements..." />
      </div>
    );
  }

  if (stage === "processing") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <LoadingState type="processing" message="Auto-filling your application forms..." />
      </div>
    );
  }

  if (stage === "saving") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <LoadingState type="saving" message="Securely saving your documents..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-status-online/10 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-status-online" />
          </div>
          <h2 className="text-3xl font-bold">Documents Generated Successfully!</h2>
          <p className="text-muted-foreground text-lg">
            Your visa application forms are ready for review
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <span className="font-medium">DS-160 Application Form</span>
              </div>
              <CheckCircle className="w-5 h-5 text-status-online" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <span className="font-medium">Cover Letter</span>
              </div>
              <CheckCircle className="w-5 h-5 text-status-online" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <span className="font-medium">Document Checklist</span>
              </div>
              <CheckCircle className="w-5 h-5 text-status-online" />
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="flex-1 justify-center" onClick={reset} data-testid="button-try-again">
              Try Again
            </Button>
            <Button className="flex-1 justify-center" data-testid="button-review-documents">
              Review Documents
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
