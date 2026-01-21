import { Check } from 'lucide-react'
import { Button } from './Button'

interface PackagesProps {
  onOpenModal: () => void
}

interface Package {
  name: string
  description: string
  features: string[]
  recommended?: boolean
  cta: string
}

const packages: Package[] = [
  {
    name: 'Essential',
    description: 'Perfect for smaller properties and condos',
    features: [
      'Professional HDR photography',
      'Up to 25 edited photos',
      'Online gallery delivery',
      'MLS-ready images',
      'Basic property highlights',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Professional',
    description: 'Our most popular package for residential listings',
    features: [
      'Everything in Essential',
      'Property video walkthrough',
      'Twilight photography',
      'Social media sized images',
      'Express delivery available',
      'Floor plan (optional add-on)',
    ],
    recommended: true,
    cta: 'Most Popular',
  },
  {
    name: 'Premium',
    description: 'Complete media package for luxury properties',
    features: [
      'Everything in Professional',
      'Matterport 3D virtual tour',
      'Cinematic video production',
      'Agent walkthrough video',
      'Advanced photo editing',
      'Branded marketing materials',
      'Priority scheduling',
    ],
    cta: 'Go Premium',
  },
]

export default function Packages({ onOpenModal }: PackagesProps) {

  return (
    <section id="packages" className="border-t border-white/5 bg-envoy-dark-surface py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-envoy-text sm:text-5xl md:text-6xl">
            Packages
          </h2>
          <p className="mt-4 text-lg text-envoy-muted sm:text-xl">
            Choose the perfect media package for your property
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative flex flex-col rounded-lg border p-8 ${
                pkg.recommended
                  ? 'border-envoy-blue bg-envoy-blue/5 shadow-xl shadow-envoy-blue/10'
                  : 'border-envoy-blue/20 bg-envoy-navy'
              }`}
            >
              {/* Recommended Badge */}
              {pkg.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-envoy-blue px-4 py-1 text-sm font-semibold text-white shadow-lg">
                    Recommended
                  </span>
                </div>
              )}

              {/* Package Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-envoy-text">
                  {pkg.name}
                </h3>
                <p className="mt-2 text-envoy-muted">{pkg.description}</p>
              </div>

              {/* Features List */}
              <ul className="mb-8 flex-grow space-y-3">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-envoy-blue" />
                    <span className="text-envoy-text">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                onClick={onOpenModal}
                variant={pkg.recommended ? 'default' : 'outline'}
                size="lg"
                className="w-full"
              >
                {pkg.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-envoy-muted">
            All packages include professional editing and fast turnaround.{' '}
            <button
              onClick={onOpenModal}
              className="font-medium text-envoy-blue transition-colors hover:text-envoy-blue-hover"
            >
              Contact us
            </button>{' '}
            for custom packages and pricing.
          </p>
        </div>
      </div>
    </section>
  )
}
