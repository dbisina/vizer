import Navigation from "@/components/Navigation";
import VisaAdvisor from "@/components/VisaAdvisor";
import Footer from "@/components/Footer";

export default function WizardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <VisaAdvisor />
      <Footer />
    </div>
  );
}
