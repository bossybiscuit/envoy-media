import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Packages from "./components/Packages";
import WhyChooseUs from "./components/WhyChooseUs";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import { NoiseOverlay } from "./components/Decorative";
// Quote modal temporarily disabled - linking to Spiro order page
// import QuoteModal from "./components/QuoteModal";

function App() {
  return (
    <div className="min-h-screen bg-navy-deep">
      <NoiseOverlay />
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Packages />
      <WhyChooseUs />
      <FinalCTA />
      <Footer />
    </div>
  );
}

export default App;
