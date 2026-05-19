import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LeadCapture from "./components/LeadCapture";
import Services from "./components/Services";
import SocialProof from "./components/SocialProof";
import Portfolio from "./components/Portfolio";
import Footer from "./components/Footer";
import FloatingElements from "./components/FloatingElements";
import VirtualAssistant from "./components/VirtualAssistant";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <Navbar />

      <main>
        <Hero />
        <LeadCapture />
        <Services />
        <SocialProof />
        <Portfolio />
      </main>

      <Footer />

      {/* Floating social sidebar */}
      <FloatingElements />

      {/* AI Virtual Assistant — replaces WhatsApp button */}
      <VirtualAssistant />
    </div>
  );
}
