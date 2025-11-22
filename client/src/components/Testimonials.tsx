import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "VisaHub saved me weeks of paperwork! The AI wizard understood my situation perfectly and recommended the right visa type. Everything was auto-filled correctly.",
    name: "Sarah Chen",
    designation: "Student Visa, Canada",
    src:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    quote:
      "I was moving to Europe for work and was terrified of the visa process. VisaHub handled everything beautifully. The timeline tracking kept me calm and informed throughout.",
    name: "Michael Rodriguez",
    designation: "Work Visa, Germany",
    src:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    quote:
      "The expert review team caught errors in my application that I would have missed. Their attention to detail and professional guidance made all the difference in my approval.",
    name: "Priya Patel",
    designation: "Business Visa, UK",
    src:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
  {
    quote:
      "I applied for visas to 3 different countries using VisaHub and got approved for all of them. The platform is intuitive, comprehensive, and genuinely helpful.",
    name: "James Thompson",
    designation: "Tourist Visas, Multiple Countries",
    src:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
  {
    quote:
      "As an immigration consultant, I recommend VisaHub to all my international clients. It reduces my workload significantly and clients love the transparency and tracking.",
    name: "Dr. Elena Vasquez",
    designation: "Immigration Consultant",
    src:
      "https://images.unsplash.com/photo-1507876466836-bc7e7397fe0f?w=400&h=400&fit=crop",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-primary text-primary" />
            ))}
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Loved by <span className="text-primary">10,000+</span> Visa Applicants
          </h2>
          <p className="text-xl text-muted-foreground">
            Real stories from travelers who successfully navigated their visa journey with VisaHub
          </p>
        </div>

        <CircularTestimonials
          testimonials={testimonials}
          autoplay={true}
          colors={{
            name: "hsl(var(--foreground))",
            designation: "hsl(var(--muted-foreground))",
            testimony: "hsl(var(--muted-foreground))",
            arrowBackground: "hsl(var(--primary))",
            arrowForeground: "hsl(var(--primary-foreground))",
            arrowHoverBackground: "hsl(var(--primary) / 0.8)",
          }}
          fontSizes={{
            name: "1.5rem",
            designation: "0.875rem",
            quote: "1.125rem",
          }}
        />
      </div>
    </section>
  );
}
