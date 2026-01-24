import { Button } from "./Button";
import { MapPin } from "lucide-react";

// Spiro order page URL
const SPIRO_ORDER_URL =
  "https://portal.spiro.media/order/envoy/envoy-media-new-order-page";

interface HeroProps {
  // onOpenModal prop no longer needed - linking directly to Spiro
}

export default function Hero({}: HeroProps) {
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
        >
          <source src="/public/videos/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-envoy-navy/70" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="w-full text-center md:text-left">
            {/* Location Badge */}
            <div className="mb-6 flex justify-center md:justify-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                <MapPin className="h-4 w-4 text-envoy-text" />
                <span className="font-sans text-sm font-medium text-envoy-text">
                  Tampa, FL
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-bold leading-tight text-envoy-text sm:text-5xl md:text-6xl lg:text-7xl">
              Capture Every <br></br>Buyer's Attention.
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-lg text-envoy-muted sm:text-xl md:text-xl md:max-w-2xl">
              High-quality real estate photo, video, Matterport and Zillow 3D
              tours for Tampa Bay agents that help listings stand out online.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6">
              <a href={SPIRO_ORDER_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="xl" className="w-full">
                  Book a Shoot
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
        <svg
          className="h-6 w-6 text-envoy-muted"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}
