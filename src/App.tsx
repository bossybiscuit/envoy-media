// import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Packages from "./components/Packages";
import WhyChooseUs from "./components/WhyChooseUs";
// import Testimonials from "./components/Testimonials";
// import QuoteForm from "./components/QuoteForm";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
// Quote modal temporarily disabled - linking to Spiro order page
// import QuoteModal from "./components/QuoteModal";

// Feature flag to enable/disable quote modal
// const SHOW_QUOTE_MODAL = false;

function App() {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Packages />
      <WhyChooseUs />
      {/* <Testimonials /> */}
      {/* <QuoteForm /> */}
      <FinalCTA />
      <Footer />
      {/* Quote modal temporarily disabled - all CTAs now link to Spiro order page */}
      {/* {SHOW_QUOTE_MODAL && <QuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />} */}
    </div>
  );
}

export default App;
