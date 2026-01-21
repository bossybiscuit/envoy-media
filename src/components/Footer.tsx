import { MapPin, Mail, Phone } from "lucide-react";

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
    <footer className="border-t border-envoy-blue/20 bg-envoy-navy">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-2xl font-bold text-envoy-text">
              Envoy Media
            </h3>
            <p className="mb-6 text-envoy-muted leading-relaxed">
              Professional real estate photography and videography serving the
              Tampa Bay area.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:envoymediaco@gmail.com"
                className="flex items-center gap-3 text-envoy-muted transition-colors hover:text-envoy-blue"
              >
                <Mail className="h-5 w-5" />
                <span>envoymediaco@gmail.com</span>
              </a>
              <a
                href="tel:+18135551234"
                className="flex items-center gap-3 text-envoy-muted transition-colors hover:text-envoy-blue"
              >
                <Phone className="h-5 w-5" />
                <span>(813)-753-8172</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-envoy-text">
              Services
            </h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-envoy-muted transition-colors hover:text-envoy-blue"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold text-envoy-text">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-envoy-muted transition-colors hover:text-envoy-blue"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("portfolio")}
                  className="text-envoy-muted transition-colors hover:text-envoy-blue"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("packages")}
                  className="text-envoy-muted transition-colors hover:text-envoy-blue"
                >
                  Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("quote")}
                  className="text-envoy-muted transition-colors hover:text-envoy-blue"
                >
                  Get a Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-envoy-text">
              <MapPin className="h-5 w-5 text-envoy-blue" />
              Service Areas
            </h4>
            <ul className="space-y-2">
              {serviceAreas.map((area, index) => (
                <li key={index} className="text-envoy-muted">
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-envoy-blue/10 py-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-envoy-muted sm:flex-row">
            <p>&copy; {currentYear} Envoy Media. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-envoy-blue">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-envoy-blue">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
