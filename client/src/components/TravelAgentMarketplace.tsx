import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Clock, DollarSign, Globe, Mail, Phone, Award } from "lucide-react";
import type { TravelAgent } from "@shared/schema";

const countries = ["Canada", "United States", "United Kingdom", "Germany", "Australia", "France", "Netherlands"];
const specialties = ["Student Visas", "Work Visas", "Family Sponsorship", "Immigration Planning"];

export default function TravelAgentMarketplace() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: agents = [] } = useQuery<TravelAgent[]>({
    queryKey: ["/api/travel-agents"],
  });

  const filteredAgents = agents.filter(agent => {
    if (selectedCountry && !agent.countries.includes(selectedCountry)) return false;
    if (selectedSpecialty && !agent.specialties.includes(selectedSpecialty)) return false;
    if (minRating && Number(agent.rating) < minRating) return false;
    if (searchQuery && !agent.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold">Travel Agent Marketplace</h1>
          <p className="text-lg text-muted-foreground">
            Find verified immigration specialists to help with your visa application
          </p>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Search Agents</label>
              <Input
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-agents"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Country</label>
              <Select value={selectedCountry || "all"} onValueChange={(v) => setSelectedCountry(v === "all" ? "" : v)}>
                <SelectTrigger data-testid="select-country">
                  <SelectValue placeholder="All countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All countries</SelectItem>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Specialty</label>
              <Select value={selectedSpecialty || "all"} onValueChange={(v) => setSelectedSpecialty(v === "all" ? "" : v)}>
                <SelectTrigger data-testid="select-specialty">
                  <SelectValue placeholder="All specialties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All specialties</SelectItem>
                  {specialties.map(specialty => (
                    <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Minimum Rating</label>
              <Select value={minRating.toString()} onValueChange={(v) => setMinRating(Number(v))}>
                <SelectTrigger data-testid="select-rating">
                  <SelectValue placeholder="Any rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any rating</SelectItem>
                  <SelectItem value="4">4+ stars</SelectItem>
                  <SelectItem value="4.5">4.5+ stars</SelectItem>
                  <SelectItem value="4.8">4.8+ stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Results Count */}
        <div className="text-muted-foreground">
          Showing {filteredAgents.length} of {agents.length} agents
        </div>

        {/* Agents Grid */}
        {filteredAgents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map(agent => (
              <Card key={agent.id} className="hover-elevate transition-all flex flex-col overflow-hidden">
                {/* Header with Image */}
                <div className="h-32 bg-gradient-to-r from-primary to-primary/60 flex items-center justify-center">
                  {agent.image && (
                    <img 
                      src={agent.image} 
                      alt={agent.name}
                      className="w-20 h-20 rounded-full border-4 border-white"
                    />
                  )}
                </div>

                <CardHeader className="pb-3">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{agent.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">({agent.reviewCount} reviews)</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  {/* Description */}
                  <p className="text-sm text-muted-foreground">{agent.description}</p>

                  {/* Specialties */}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Specialties</p>
                    <div className="flex flex-wrap gap-1">
                      {agent.specialties.slice(0, 3).map(spec => (
                        <Badge key={spec} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Countries */}
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">{agent.countries.join(", ")}</span>
                  </div>

                  {/* Key Info */}
                  <div className="grid grid-cols-2 gap-2 text-sm border-t pt-3">
                    <div>
                      <div className="text-xs text-muted-foreground">Response Time</div>
                      <div className="flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3" />
                        {agent.responseTime}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Price Range</div>
                      <div className="flex items-center gap-1 font-medium">
                        <DollarSign className="w-3 h-3" />
                        {agent.priceRange}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Experience</div>
                      <div className="font-medium">{agent.yearsExperience}+ years</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Success Rate</div>
                      <div className="font-medium">{agent.successRate}%</div>
                    </div>
                  </div>

                  {/* Certifications & Languages */}
                  <div className="border-t pt-3 space-y-2">
                    {agent.certifications && agent.certifications.length > 0 && (
                      <div className="flex items-center gap-2 text-xs">
                        <Award className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{agent.certifications.join(", ")}</span>
                      </div>
                    )}
                    {agent.languages && agent.languages.length > 0 && (
                      <div className="flex items-center gap-2 text-xs">
                        <Globe className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{agent.languages.join(", ")}</span>
                      </div>
                    )}
                  </div>
                </CardContent>

                {/* Footer with CTA */}
                <div className="border-t p-4 space-y-2">
                  <AnimatedButton className="w-full justify-center" accentColor="bg-primary" data-testid={`button-contact-${agent.id}`}>
                    Contact Agent
                  </AnimatedButton>
                  <div className="flex gap-2 text-xs">
                    {agent.email && (
                      <a 
                        href={`mailto:${agent.email}`} 
                        data-testid={`button-email-${agent.id}`}
                        className="flex-1"
                      >
                        <AnimatedButton
                          className="flex-1 text-xs px-2 py-1.5 justify-center"
                          accentColor="bg-primary"
                        >
                          <Mail className="w-3 h-3 mr-1" />
                          Email
                        </AnimatedButton>
                      </a>
                    )}
                    {agent.phone && (
                      <a 
                        href={`tel:${agent.phone}`} 
                        data-testid={`button-call-${agent.id}`}
                        className="flex-1"
                      >
                        <AnimatedButton
                          className="flex-1 text-xs px-2 py-1.5 justify-center"
                          accentColor="bg-primary"
                        >
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </AnimatedButton>
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No agents match your search criteria</p>
            <AnimatedButton
              onClick={() => {
                setSelectedCountry("");
                setSelectedSpecialty("");
                setMinRating(0);
                setSearchQuery("");
              }}
              data-testid="button-reset-filters"
              accentColor="bg-primary"
            >
              Reset Filters
            </AnimatedButton>
          </Card>
        )}

        {/* Info Card */}
        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="font-semibold mb-3">About Our Agents</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div>
              <div className="font-medium mb-1">Verified Professionals</div>
              <p>All agents are certified and licensed immigration consultants</p>
            </div>
            <div>
              <div className="font-medium mb-1">High Success Rates</div>
              <p>Our agents maintain success rates above 85% on average</p>
            </div>
            <div>
              <div className="font-medium mb-1">Customer Support</div>
              <p>Real-time response and guidance throughout your application</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
