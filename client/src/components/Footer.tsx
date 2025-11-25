import { Button } from "@/components/ui/button";
import { ParticleButton } from "@/components/ui/particle-button";
import { Input } from "@/components/ui/input";
import { Globe, Twitter, Linkedin, Github } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Countries", href: "#countries" },
    { label: "API", href: "#api" }
  ],
  company: [
    { label: "About", href: "#about" },
    { label: "Blog", href: "#blog" },
    { label: "Careers", href: "#careers" },
    { label: "Contact", href: "#contact" }
  ],
  resources: [
    { label: "Help Center", href: "#help" },
    { label: "Visa Guides", href: "#guides" },
    { label: "Community", href: "#community" },
    { label: "Status", href: "#status" }
  ],
  legal: [
    { label: "Privacy", href: "#privacy" },
    { label: "Terms", href: "#terms" },
    { label: "Security", href: "#security" },
    { label: "Compliance", href: "#compliance" }
  ]
};

export default function Footer() {
  return (
    <footer className="bg-card border-t border-card-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">VisaHub</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Simplifying global visa applications with AI-powered automation and expert guidance.
            </p>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" data-testid="button-social-twitter">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" data-testid="button-social-linkedin">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" data-testid="button-social-github">
                <Github className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 VisaHub. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <Input 
                type="email" 
                placeholder="Subscribe to newsletter" 
                className="w-64"
                data-testid="input-newsletter"
              />
              <ParticleButton data-testid="button-subscribe">Subscribe</ParticleButton>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
