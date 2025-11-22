import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    location: "Singapore → Canada",
    initials: "SC",
    quote: "VisaHub made my work visa process so smooth. The auto-fill feature saved me hours of form filling, and the timeline kept me on track throughout.",
    rating: 5
  },
  {
    name: "Marcus Rodriguez",
    role: "Digital Nomad",
    location: "Spain → Portugal",
    initials: "MR",
    quote: "As someone who moves countries frequently, VisaHub is a game-changer. The country comparison tool helped me make informed decisions about my next destination.",
    rating: 5
  },
  {
    name: "Priya Patel",
    role: "Student",
    location: "India → UK",
    initials: "PP",
    quote: "The expert review feature caught mistakes in my application that I would have missed. Got approved on the first try! Highly recommended for students.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">Loved by Global Travelers</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands who've simplified their visa journey with VisaHub
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} data-testid={`card-testimonial-${index}`}>
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
