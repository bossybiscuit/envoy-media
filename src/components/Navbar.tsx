import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./Button";

interface NavbarProps {
  onOpenModal: () => void;
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-envoy-dark-surface/20 bg-envoy-navy/95 shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <button
              onClick={scrollToTop}
              className="font-serif text-2xl font-bold text-white transition-colors hover:text-envoy-blue"
            >
              <img
                src="/images/nav-logo.png"
                alt="Envoy Media"
                className="h-12 w-auto"
              />
            </button>

            {/* Desktop Navigation Links & CTA */}
            <div className="hidden items-center space-x-8 md:flex">
              <button
                onClick={() => scrollToSection("services")}
                className="font-sans text-envoy-text transition-colors hover:text-envoy-blue"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("portfolio")}
                className="font-sans text-envoy-text transition-colors hover:text-envoy-blue"
              >
                Work
              </button>
              <button
                onClick={() => scrollToSection("packages")}
                className="font-sans text-envoy-text transition-colors hover:text-envoy-blue"
              >
                Packages
              </button>

              {/* <button
                onClick={() => scrollToSection("testimonials")}
                className="font-sans text-envoy-text transition-colors hover:text-envoy-green"
              >
                Testimonials
              </button> */}

              {/* Client Portal Button */}
              <Button
                onClick={() => window.location.href = "#"}
                variant="outline"
                size="default"
                className="font-semibold"
              >
                Client Portal
              </Button>

              {/* CTA Button */}
              <Button
                onClick={onOpenModal}
                size="default"
                className="font-semibold"
              >
                Book a Shoot
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-envoy-text transition-colors hover:text-envoy-blue"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-envoy-navy/95 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Content */}
          <div className="relative flex h-full flex-col items-center justify-center space-y-8 px-6">
            <button
              onClick={() => scrollToSection("services")}
              className="font-sans text-2xl text-envoy-text transition-colors hover:text-envoy-blue"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="font-sans text-2xl text-envoy-text transition-colors hover:text-envoy-blue"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection("packages")}
              className="font-sans text-2xl text-envoy-text transition-colors hover:text-envoy-blue"
            >
              Packages
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="font-sans text-2xl text-envoy-text transition-colors hover:text-envoy-blue"
            >
              Testimonials
            </button>

            {/* Mobile CTA Buttons */}
            <div className="pt-8 flex flex-col gap-4">
              <Button
                onClick={() => {
                  window.location.href = "#";
                  setIsMobileMenuOpen(false);
                }}
                variant="outline"
                size="xl"
                className="font-semibold"
              >
                Client Portal
              </Button>
              <Button
                onClick={() => {
                  onOpenModal();
                  setIsMobileMenuOpen(false);
                }}
                size="xl"
                className="font-semibold"
              >
                Book a Shoot
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
