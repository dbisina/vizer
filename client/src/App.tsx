import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "@/pages/landing";
import WizardPage from "@/pages/wizard";
import DashboardPage from "@/pages/dashboard";
import AIDemoPage from "@/pages/ai-demo";
import AuthPage from "@/pages/auth";
import MarketplacePage from "@/pages/marketplace";
import ProfilePage from "@/pages/profile";
import DemoHub from "@/pages/demo-hub";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/demo" component={DemoHub} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/wizard" component={WizardPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/marketplace" component={MarketplacePage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/ai-demo" component={AIDemoPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
