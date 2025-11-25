import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Trash2, Plus } from "lucide-react";

const mockDocuments = [
  {
    id: "1",
    type: "Cover Letter",
    visaType: "Canada - Student Visa",
    generatedAt: "2024-11-25",
    status: "ready",
  },
  {
    id: "2",
    type: "Sponsorship Letter",
    visaType: "Canada - Student Visa",
    generatedAt: "2024-11-25",
    status: "ready",
  },
  {
    id: "3",
    type: "Form Guide (DS-160)",
    visaType: "USA - Student Visa",
    generatedAt: "2024-11-20",
    status: "ready",
  },
  {
    id: "4",
    type: "Support Letter",
    visaType: "Germany - Student Visa",
    generatedAt: "2024-11-18",
    status: "ready",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Documents</h1>
            <p className="text-muted-foreground">
              Download AI-generated documents for your visa applications
            </p>
          </div>
          <AnimatedButton data-testid="button-new-advisor" accentColor="bg-primary">
            <Plus className="w-4 h-4 mr-2" />
            New Application
          </AnimatedButton>
        </div>

        {/* Documents Grid */}
        {mockDocuments.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {mockDocuments.map((doc) => (
              <Card key={doc.id} className="hover-elevate transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{doc.type}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">
                        {doc.visaType}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-status-online/10 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-status-online" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    Generated on {new Date(doc.generatedAt).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    <AnimatedButton
                      className="flex-1 text-xs px-2 py-1.5 justify-center"
                      data-testid={`button-preview-${doc.id}`}
                      accentColor="bg-primary"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Preview
                    </AnimatedButton>
                    <AnimatedButton
                      className="flex-1 text-xs px-2 py-1.5 justify-center"
                      data-testid={`button-download-${doc.id}`}
                      accentColor="bg-primary"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </AnimatedButton>
                    <Button
                      size="sm"
                      variant="ghost"
                      data-testid={`button-delete-${doc.id}`}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="space-y-4">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-semibold">No Documents Yet</h3>
                <p className="text-muted-foreground text-sm">
                  Run the Visa Advisor to generate personalized documents
                </p>
              </div>
              <AnimatedButton data-testid="button-start-advisor" accentColor="bg-primary">
                Start Visa Advisor
              </AnimatedButton>
            </div>
          </Card>
        )}

        {/* Info Card */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="font-semibold mb-3">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-medium mb-1">1. Answer Questions</div>
              <p className="text-muted-foreground text-xs">
                Tell us about your background and goals
              </p>
            </div>
            <div>
              <div className="font-medium mb-1">2. Get Recommendations</div>
              <p className="text-muted-foreground text-xs">
                AI matches you with the best visa options
              </p>
            </div>
            <div>
              <div className="font-medium mb-1">3. Download Documents</div>
              <p className="text-muted-foreground text-xs">
                Get personalized letters and form guidance
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
