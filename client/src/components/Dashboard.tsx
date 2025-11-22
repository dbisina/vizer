import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Upload, 
  Download,
  Calendar,
  TrendingUp,
  Circle
} from "lucide-react";

const applications = [
  {
    id: 1,
    country: "Canada",
    type: "Work Visa",
    status: "in_progress",
    progress: 65,
    deadline: "15 days left",
    nextAction: "Upload Employment Letter"
  },
  {
    id: 2,
    country: "Germany",
    type: "Student Visa",
    status: "pending_review",
    progress: 85,
    deadline: "8 days left",
    nextAction: "Expert Review Requested"
  }
];

const documents = [
  { name: "Passport Copy", status: "uploaded", date: "2 days ago" },
  { name: "Proof of Funds", status: "uploaded", date: "3 days ago" },
  { name: "Employment Letter", status: "missing", date: null },
  { name: "Travel Insurance", status: "rejected", date: "5 days ago" }
];

const timeline = [
  { 
    title: "Application Started", 
    date: "Jan 15, 2025", 
    status: "completed",
    description: "Visa wizard completed"
  },
  { 
    title: "Documents Uploaded", 
    date: "Jan 18, 2025", 
    status: "completed",
    description: "3 of 4 documents verified"
  },
  { 
    title: "Form Auto-Filled", 
    date: "Jan 20, 2025", 
    status: "completed",
    description: "DS-160 form generated"
  },
  { 
    title: "Expert Review", 
    date: "Pending", 
    status: "current",
    description: "Awaiting expert feedback"
  },
  { 
    title: "Submit Application", 
    date: "Upcoming", 
    status: "upcoming",
    description: "Final submission to embassy"
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah!</h1>
          <p className="text-muted-foreground">Track and manage your visa applications</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <div className="text-3xl font-bold">2</div>
              <div className="text-sm text-muted-foreground">Active Applications</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-chart-2/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-chart-2" />
                </div>
              </div>
              <div className="text-3xl font-bold">8 days</div>
              <div className="text-sm text-muted-foreground">Next Deadline</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-status-online/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-status-online" />
                </div>
              </div>
              <div className="text-3xl font-bold">75%</div>
              <div className="text-sm text-muted-foreground">Overall Progress</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Applications</h2>
              <div className="space-y-4">
                {applications.map((app) => (
                  <Card key={app.id} className="hover-elevate transition-all" data-testid={`card-application-${app.id}`}>
                    <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{app.country} - {app.type}</h3>
                          <Badge variant={app.status === 'in_progress' ? 'default' : 'secondary'}>
                            {app.status === 'in_progress' ? 'In Progress' : 'Pending Review'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {app.deadline}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" data-testid={`button-view-app-${app.id}`}>
                        View Details
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{app.progress}%</span>
                      </div>
                      <Progress value={app.progress} />
                      <div className="pt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <AlertCircle className="w-4 h-4 text-primary" />
                          <span className="font-medium">Next: {app.nextAction}</span>
                        </div>
                        <Button size="sm" data-testid={`button-next-action-${app.id}`}>
                          Take Action
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Document Checklist</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {documents.map((doc, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-3 rounded-lg border border-border hover-elevate"
                        data-testid={`doc-${index}`}
                      >
                        <div className="flex items-center gap-3">
                          {doc.status === 'uploaded' && <CheckCircle className="w-5 h-5 text-status-online" />}
                          {doc.status === 'missing' && <AlertCircle className="w-5 h-5 text-status-away" />}
                          {doc.status === 'rejected' && <AlertCircle className="w-5 h-5 text-status-busy" />}
                          <div>
                            <div className="font-medium">{doc.name}</div>
                            {doc.date && (
                              <div className="text-xs text-muted-foreground">
                                {doc.status === 'uploaded' ? 'Uploaded' : 'Rejected'} {doc.date}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {doc.status === 'uploaded' && (
                            <Button size="sm" variant="ghost" data-testid={`button-download-${index}`}>
                              <Download className="w-4 h-4" />
                            </Button>
                          )}
                          {(doc.status === 'missing' || doc.status === 'rejected') && (
                            <Button size="sm" data-testid={`button-upload-${index}`}>
                              <Upload className="w-4 h-4 mr-2" />
                              Upload
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Application Timeline</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {timeline.map((event, index) => (
                    <div key={index} className="relative flex gap-4" data-testid={`timeline-${index}`}>
                      {index < timeline.length - 1 && (
                        <div className="absolute left-5 top-12 w-0.5 h-full bg-border" />
                      )}
                      <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center ${
                        event.status === 'completed' 
                          ? 'bg-primary text-primary-foreground' 
                          : event.status === 'current'
                          ? 'bg-primary/20 border-2 border-primary'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {event.status === 'completed' && <CheckCircle className="w-5 h-5" />}
                        {event.status === 'current' && <Clock className="w-5 h-5 text-primary" />}
                        {event.status === 'upcoming' && <Circle className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="font-semibold">{event.title}</div>
                        <div className="text-sm text-muted-foreground">{event.date}</div>
                        <div className="text-sm text-muted-foreground mt-1">{event.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
