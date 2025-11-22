import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <Dashboard />
      <Footer />
    </div>
  );
}
