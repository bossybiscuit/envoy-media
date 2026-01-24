import { Button } from './Button'

// Spiro order page URL
const SPIRO_ORDER_URL = 'https://portal.spiro.media/order/envoy/envoy-media-new-order-page'

interface FinalCTAProps {
  // onOpenModal prop no longer needed - linking directly to Spiro
}

export default function FinalCTA({}: FinalCTAProps) {

  return (
    <section className="border-t border-white/5 bg-envoy-navy py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          {/* Heading */}
          <h2 className="text-4xl font-bold text-envoy-text sm:text-5xl md:text-6xl">
            Ready to Showcase Your Property?
          </h2>

          {/* Subheading */}
          <p className="mt-6 text-lg text-envoy-muted sm:text-xl">
            Let's create stunning visuals that help your listing stand out and attract qualified buyers.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <a href={SPIRO_ORDER_URL} target="_blank" rel="noopener noreferrer">
              <Button size="xl">
                Book a Shoot
              </Button>
            </a>
            <Button size="xl" variant="outline" onClick={() => window.location.href = '#portfolio'}>
              View Our Work
            </Button>
          </div>

          {/* Trust Signals */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-envoy-muted">
            <div className="flex items-center gap-2">
              <span className="text-envoy-blue">✓</span>
              <span>Matterport Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-envoy-blue">✓</span>
              <span>Zillow 3D Trained</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-envoy-blue">✓</span>
              <span>Fully Insured</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
