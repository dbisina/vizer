import Navigation from "@/components/Navigation";
import AIProcessing from "@/components/AIProcessing";
import Footer from "@/components/Footer";

export default function AIDemoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <AIProcessing />
      <Footer />
    </div>
  );
}
