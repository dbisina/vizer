import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, FileText, Calendar, AlertCircle, ArrowRight } from "lucide-react";

const mockApplications = [
  {
    id: "1",
    destination: "Canada",
    visaType: "Student Visa",
    status: "in-review",
    submittedAt: "2024-11-15",
    progress: 75,
    documents: {
      total: 8,
      submitted: 6,
    },
    timeline: [
      { step: "Application Submitted", date: "2024-11-15", completed: true },
      { step: "Initial Review", date: "2024-11-20", completed: true },
      { step: "Document Verification", date: "2024-11-25", completed: false },
      { step: "Interview", date: "2024-12-10", completed: false },
      { step: "Decision", date: "2024-12-20", completed: false },
    ],
    estimatedDays: 45,
  },
];

export default function Dashboard() {
  const application = mockApplications[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-status-online/10 text-status-online border-status-online/20";
      case "in-review":
        return "bg-primary/10 text-primary border-primary/20";
      case "rejected":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Application Dashboard</h1>
          <p className="text-muted-foreground">Track your visa applications and manage documents</p>
        </div>

        {/* Active Application */}
        {application && (
          <div className="grid gap-6">
            {/* Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">
                      {application.destination} - {application.visaType}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Submitted on {new Date(application.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={`${getStatusColor(application.status)} border`}>
                    {application.status === "in-review" ? "Under Review" : "Approved"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm font-semibold">{application.progress}%</span>
                  </div>
                  <Progress value={application.progress} className="h-3" />
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4 bg-background">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Documents</p>
                        <p className="text-lg font-semibold">
                          {application.documents.submitted}/{application.documents.total}
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-background">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-chart-2/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-chart-2" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Est. Decision</p>
                        <p className="text-lg font-semibold">{application.estimatedDays} days</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-background">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-status-online/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-status-online" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Status</p>
                        <p className="text-lg font-semibold">In Review</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Passport", status: "submitted" },
                    { name: "Letter of Acceptance", status: "submitted" },
                    { name: "Proof of Funds", status: "submitted" },
                    { name: "Medical Exam", status: "submitted" },
                    { name: "Police Certificate", status: "submitted" },
                    { name: "Study Plan", status: "submitted" },
                    { name: "English Language Test", status: "pending" },
                    { name: "Health Insurance", status: "pending" },
                  ].map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border bg-background"
                    >
                      <div className="flex items-center gap-3">
                        {doc.status === "submitted" ? (
                          <CheckCircle2 className="w-5 h-5 text-status-online" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-chart-1" />
                        )}
                        <span className="text-sm font-medium">{doc.name}</span>
                      </div>
                      <Badge
                        variant={
                          doc.status === "submitted" ? "secondary" : "outline"
                        }
                      >
                        {doc.status === "submitted" ? "Submitted" : "Pending"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Application Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {application.timeline.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="relative">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                            item.completed
                              ? "bg-status-online text-white"
                              : "bg-muted text-muted-foreground border border-border"
                          }`}
                        >
                          {item.completed ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            index + 1
                          )}
                        </div>
                        {index < application.timeline.length - 1 && (
                          <div
                            className={`absolute left-4 top-8 w-0.5 h-12 ${
                              item.completed ? "bg-status-online" : "bg-muted"
                            }`}
                          />
                        )}
                      </div>
                      <div className="pb-6">
                        <p className="font-medium text-sm">{item.step}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="outline">Download Documents</Button>
              <Button>
                Update Application
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* No Applications */}
        {!application && (
          <Card className="p-12 text-center">
            <div className="space-y-4">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-semibold">No Active Applications</h3>
                <p className="text-muted-foreground text-sm">
                  Start your first visa application to get tracking
                </p>
              </div>
              <Button>Start New Application</Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
