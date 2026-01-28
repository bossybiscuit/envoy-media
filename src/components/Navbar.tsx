import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./Button";

const SPIRO_ORDER_URL =
  "https://portal.spiro.media/order/envoy/envoy-media-new-order-page";

const navLinks = [
  { label: "Services", section: "services" },
  { label: "Work", section: "portfolio" },
  { label: "Packages", section: "packages" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
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
            ? "border-b border-surface-dark/50 bg-navy-deep/95 shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-lg"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <button
              onClick={scrollToTop}
              className="transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(107,169,219,0.4)]"
            >
              <img
                src="/images/nav-logo.png"
                alt="Envoy Media"
                className="h-12 w-auto"
              />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden items-center md:flex">
              {navLinks.map((link, i) => (
                <div key={link.section} className="flex items-center">
                  {i > 0 && (
                    <span className="mx-4 h-1 w-1 rounded-full bg-blue-coastal/30" />
                  )}
                  <button
                    onClick={() => scrollToSection(link.section)}
                    className="nav-link font-sans text-sm font-medium text-text-light/80 transition-colors hover:text-blue-coastal"
                  >
                    {link.label}
                  </button>
                </div>
              ))}

              <div className="ml-8 flex items-center gap-3">
                <Button
                  onClick={() => (window.location.href = "#")}
                  variant="outline"
                  size="default"
                  className="font-semibold"
                >
                  Client Portal
                </Button>

                <a
                  href={SPIRO_ORDER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="default" className="font-semibold">
                    Book a Shoot
                  </Button>
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-text-light transition-colors hover:text-blue-coastal"
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
          <div
            className="absolute inset-0 bg-navy-deep/95 backdrop-blur-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative flex h-full flex-col items-center justify-center space-y-8 px-6">
            {navLinks.map((link) => (
              <button
                key={link.section}
                onClick={() => scrollToSection(link.section)}
                className="nav-link font-sans text-2xl font-medium text-text-light transition-colors hover:text-blue-coastal"
              >
                {link.label}
              </button>
            ))}

            <div className="pt-8 flex flex-col gap-4 w-full max-w-xs">
              <Button
                onClick={() => {
                  window.location.href = "#";
                  setIsMobileMenuOpen(false);
                }}
                variant="outline"
                size="xl"
                className="font-semibold w-full"
              >
                Client Portal
              </Button>
              <a
                href={SPIRO_ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  onClick={() => setIsMobileMenuOpen(false)}
                  size="xl"
                  className="font-semibold w-full"
                >
                  Book a Shoot
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
