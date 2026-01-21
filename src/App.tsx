import { useState } from "react";
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
import QuoteModal from "./components/QuoteModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <Services />
      <Portfolio />
      <Packages onOpenModal={() => setIsModalOpen(true)} />
      <WhyChooseUs />
      {/* <Testimonials /> */}
      {/* <QuoteForm /> */}
      <FinalCTA onOpenModal={() => setIsModalOpen(true)} />
      <Footer />
      <QuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
