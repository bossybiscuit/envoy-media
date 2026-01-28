import { MapPin, Mail, Phone } from "lucide-react";
import { DottedGrid } from "./Decorative";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const serviceAreas = [
    "Tampa",
    "St. Petersburg",
    "Clearwater",
    "Brandon",
    "Wesley Chapel",
    "Sarasota",
  ];

  const services = [
    "Real Estate Photography",
    "Real Estate Videography",
    "3D Virtual Tours",
    "Agent Walkthroughs",
    "Vacation Rental Media",
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-surface-dark bg-navy-deep">
      <DottedGrid />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-2xl font-bold text-text-light">
              Envoy Media
            </h3>
            <p className="mb-6 text-gray-muted leading-relaxed">
              Professional real estate photography and videography serving the
              Tampa Bay area.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:envoymediaco@gmail.com"
                className="flex items-center gap-3 text-gray-muted transition-colors hover:text-blue-coastal"
              >
                <Mail className="h-5 w-5" />
                <span>envoymediaco@gmail.com</span>
              </a>
              <a
                href="tel:+18137538172"
                className="flex items-center gap-3 text-gray-muted transition-colors hover:text-blue-coastal"
              >
                <Phone className="h-5 w-5" />
                <span>(813)-753-8172</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-text-light">
              Services
            </h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-gray-muted transition-colors hover:text-blue-coastal"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-text-light">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Services", section: "services" },
                { label: "Portfolio", section: "portfolio" },
                { label: "Packages", section: "packages" },
              ].map((link) => (
                <li key={link.section}>
                  <button
                    onClick={() => scrollToSection(link.section)}
                    className="text-gray-muted transition-colors hover:text-blue-coastal"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-text-light">
              <MapPin className="h-5 w-5 text-blue-coastal" />
              Service Areas
            </h4>
            <ul className="space-y-2">
              {serviceAreas.map((area, index) => (
                <li key={index} className="text-gray-muted">
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-coastal/20 to-transparent" />
        </div>

        {/* Bottom Bar */}
        <div className="py-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-muted sm:flex-row">
            <p>&copy; {currentYear} Envoy Media. All rights reserved.</p>
            <div className="flex gap-6">
              <a
                href="#"
                className="transition-colors hover:text-blue-coastal"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="transition-colors hover:text-blue-coastal"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
