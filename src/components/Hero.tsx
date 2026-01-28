import { Button } from "./Button";
import { MapPin, ArrowRight } from "lucide-react";
import { FloatingShapes } from "./Decorative";

const SPIRO_ORDER_URL =
  "https://portal.spiro.media/order/envoy/envoy-media-new-order-page";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-20">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          src="/videos/hero-video-bw.mp4"
        >
          Your browser does not support the video tag.
        </video>
        {/* Blue-tinted overlay for B&W video */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep/85 via-navy-deep/75 to-blue-coastal/20" />
      </div>

      {/* Decorative Elements */}
      <FloatingShapes variant="hero" />

      {/* Corner Accents */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute top-28 left-8 w-16 h-16 border-t-2 border-l-2 border-blue-coastal/20 hidden lg:block" />
        <div className="absolute bottom-16 right-8 w-16 h-16 border-b-2 border-r-2 border-blue-coastal/20 hidden lg:block" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="w-full text-center md:text-left">
            {/* Location Badge */}
            <div className="mb-6 flex justify-center md:justify-start animate-fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-coastal/30 bg-blue-coastal/10 px-4 py-2 backdrop-blur-sm">
                <MapPin className="h-4 w-4 text-blue-coastal" />
                <span className="font-sans text-sm font-medium text-text-light">
                  Tampa, FL
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-text-light sm:text-6xl lg:text-7xl animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Capture Every <br />
              <span className="text-gradient">Buyer's Attention.</span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-lg text-gray-muted sm:text-xl md:max-w-2xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
              High-quality real estate photo, video, Matterport and Zillow 3D
              tours for Tampa Bay agents that help listings stand out online.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <a
                href={SPIRO_ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button size="xl" className="w-full group">
                  Book a Shoot
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </a>
              <Button
                size="xl"
                variant="outline"
                onClick={() => scrollToSection("portfolio")}
                className="w-full sm:w-auto"
              >
                View Work
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-sans font-medium text-gray-muted/60 tracking-widest uppercase">
            Scroll
          </span>
          <svg
            className="h-5 w-5 text-blue-coastal/60"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
