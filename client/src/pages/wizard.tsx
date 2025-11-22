import Navigation from "@/components/Navigation";
import VisaWizard from "@/components/VisaWizard";
import Footer from "@/components/Footer";

export default function WizardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <VisaWizard />
      <Footer />
    </div>
  );
}
