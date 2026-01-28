import { Button } from "./Button";
import { ArrowRight } from "lucide-react";
import {
  FloatingShapes,
  CornerAccents,
  useScrollAnimation,
} from "./Decorative";

const SPIRO_ORDER_URL =
  "https://portal.spiro.media/order/envoy/envoy-media-new-order-page";

export default function FinalCTA() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative overflow-hidden border-t border-surface-dark bg-gradient-to-b from-surface-dark via-navy-deep to-navy-deep py-20 md:py-24">
      <FloatingShapes variant="cta" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div
          ref={ref}
          className={`relative mx-auto max-w-4xl rounded-2xl border border-surface-dark bg-navy-deep/80 p-12 md:p-16 text-center backdrop-blur-sm ${
            isVisible ? "scroll-visible" : "scroll-hidden"
          }`}
        >
          <CornerAccents />

          <h2 className="text-4xl font-bold text-text-light tracking-tight lg:text-5xl">
            Ready to Showcase <br />
            <span className="text-gradient">Your Property?</span>
          </h2>

          <p className="mt-6 text-lg text-gray-muted sm:text-xl">
            Let's create stunning visuals that help your listing stand out and
            attract qualified buyers.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <a
              href={SPIRO_ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="xl" className="group">
                Book a Shoot
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </a>
            <Button
              size="xl"
              variant="outline"
              onClick={() =>
                document
                  .getElementById("portfolio")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Our Work
            </Button>
          </div>

          {/* Trust Signals */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-gray-muted">
            <div className="flex items-center gap-2">
              <span className="text-blue-coastal">&#10003;</span>
              <span>Matterport Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-coastal">&#10003;</span>
              <span>Zillow 3D Trained</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-coastal">&#10003;</span>
              <span>Fully Insured</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
