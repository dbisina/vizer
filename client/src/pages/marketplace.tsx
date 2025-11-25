import Navigation from "@/components/Navigation";
import TravelAgentMarketplace from "@/components/TravelAgentMarketplace";
import Footer from "@/components/Footer";

export default function MarketplacePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <TravelAgentMarketplace />
      <Footer />
    </div>
  );
}
