import { Button } from "@/components/ui/button";
import { Globe, Bell, User } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <nav className={`sticky top-0 z-50 transition-all ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">VisaHub</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
                Pricing
              </a>
              <a href="#countries" className="text-sm font-medium hover:text-primary transition-colors">
                Countries
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button size="icon" variant="ghost" data-testid="button-notifications">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" data-testid="button-login">
              Log In
            </Button>
            <Button data-testid="button-signup">
              Sign Up Free
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
