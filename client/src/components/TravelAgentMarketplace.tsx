import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Clock, DollarSign, Globe, Mail, Phone, Award } from "lucide-react";
import AnimatedLoadingSkeleton from "@/components/ui/animated-loading-skeleton";
import { ProfileCard } from "@/components/ui/profile-card";
import { AgentDetailModal } from "@/components/AgentDetailModal";
import type { TravelAgent } from "@shared/schema";

const countries = ["Canada", "United States", "United Kingdom", "Germany", "Australia", "France", "Netherlands"];
const specialties = ["Student Visas", "Work Visas", "Family Sponsorship", "Immigration Planning"];

export default function TravelAgentMarketplace() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<TravelAgent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: agents = [], isLoading } = useQuery<TravelAgent[]>({
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

        {/* Loading State */}
        {isLoading ? (
          <AnimatedLoadingSkeleton />
        ) : (
          <>
            {/* Results Count */}
            <div className="text-muted-foreground">
              Showing {filteredAgents.length} of {agents.length} agents
            </div>

            {/* Agents Grid */}
            {filteredAgents.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-8">
                {filteredAgents.map(agent => (
                  <ProfileCard
                    key={agent.id}
                    name={agent.name}
                    description={agent.description || ""}
                    image={agent.image || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop&auto=format&q=80"}
                    isVerified={true}
                    rating={agent.rating ? Number(agent.rating) : 4.5}
                    responseTime={agent.responseTime || "1-2 days"}
                    priceRange={agent.priceRange || "$500-$2000"}
                    successRate={agent.successRate ? Number(agent.successRate) : 85}
                    yearsExperience={agent.yearsExperience}
                    onClick={() => {
                      setSelectedAgent(agent);
                      setIsModalOpen(true);
                    }}
                  />
                ))}
              </div>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground mb-4">No agents match your search criteria</p>
              <Button
                onClick={() => {
                  setSelectedCountry("");
                  setSelectedSpecialty("");
                  setMinRating(0);
                  setSearchQuery("");
                }}
                data-testid="button-reset-filters"
              >
                Reset Filters
              </Button>
            </Card>
          )}
          </>
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

        {/* Agent Detail Modal */}
        <AgentDetailModal 
          agent={selectedAgent} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </div>
    </div>
  );
}
