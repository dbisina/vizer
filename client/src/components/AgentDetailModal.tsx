import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, DollarSign, TrendingUp, Award, Globe, Mail, Phone, MapPin } from "lucide-react";
import type { TravelAgent } from "@shared/schema";

interface AgentDetailModalProps {
  agent: TravelAgent | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AgentDetailModal({ agent, isOpen, onClose }: AgentDetailModalProps) {
  if (!agent) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {agent.image && (
                <img 
                  src={agent.image} 
                  alt={agent.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div>
                <DialogTitle className="text-2xl">{agent.name}</DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{agent.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({agent.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
          </div>
          <DialogDescription>{agent.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Key Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Response Time</span>
              </div>
              <p className="text-lg font-semibold">{agent.responseTime}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <DollarSign className="w-4 h-4" />
                <span>Price Range</span>
              </div>
              <p className="text-lg font-semibold">{agent.priceRange}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                <span>Success Rate</span>
              </div>
              <p className="text-lg font-semibold">{agent.successRate}%</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="w-4 h-4" />
                <span>Experience</span>
              </div>
              <p className="text-lg font-semibold">{agent.yearsExperience}+ years</p>
            </div>
          </div>

          {/* Specialties */}
          <div>
            <h3 className="font-semibold mb-2">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {agent.specialties.map(spec => (
                <Badge key={spec} variant="secondary">{spec}</Badge>
              ))}
            </div>
          </div>

          {/* Countries */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4" />
              <h3 className="font-semibold">Countries Served</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {agent.countries.map(country => (
                <Badge key={country} variant="outline">{country}</Badge>
              ))}
            </div>
          </div>

          {/* Certifications */}
          {agent.certifications && agent.certifications.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4" />
                <h3 className="font-semibold">Certifications</h3>
              </div>
              <ul className="list-disc list-inside space-y-1">
                {agent.certifications.map(cert => (
                  <li key={cert} className="text-sm text-muted-foreground">{cert}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {agent.languages && agent.languages.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4" />
                <h3 className="font-semibold">Languages</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {agent.languages.map(lang => (
                  <Badge key={lang}>{lang}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="flex gap-2 pt-4 border-t">
            {agent.email && (
              <a href={`mailto:${agent.email}`} className="flex-1">
                <Button variant="outline" className="w-full" data-testid={`button-email-${agent.id}`}>
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </a>
            )}
            {agent.phone && (
              <a href={`tel:${agent.phone}`} className="flex-1">
                <Button variant="outline" className="w-full" data-testid={`button-call-${agent.id}`}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              </a>
            )}
            {agent.website && (
              <a href={agent.website} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full" data-testid={`button-website-${agent.id}`}>
                  Visit Website
                </Button>
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
