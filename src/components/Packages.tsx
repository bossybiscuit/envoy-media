import { Check, Zap, Calendar, Film, Ruler, Plane } from 'lucide-react'
import { Button } from './Button'

interface PackagesProps {
  onOpenModal: () => void
}

interface Package {
  name: string
  subtitle: string
  features: string[]
  mostPopular?: boolean
  note?: string
}

interface AddOn {
  icon: any
  name: string
  comingSoon?: boolean
}

const mainPackages: Package[] = [
  {
    name: 'Essential Package',
    subtitle: 'Perfect for smaller properties and budget-conscious listings',
    features: [
      'Professional Photography (interior & exterior)',
      'Complete property coverage',
      'Zillow 3D Tour',
    ],
  },
  {
    name: 'Professional Package',
    subtitle: 'Complete marketing suite for standard listings',
    features: [
      'Professional Photography (interior & exterior)',
      'Complete property coverage',
      'Cinematic Property Walkthrough Video',
      'Zillow 3D Tour',
    ],
    mostPopular: true,
  },
  {
    name: 'Elite Package',
    subtitle: 'Premium marketing for luxury listings',
    features: [
      'Professional Photography (interior & exterior)',
      'Complete property coverage',
      'Cinematic Property Walkthrough Video',
      'Agent-Guided Walkthrough Video',
      'Matterport 3D Tour',
      'Twilight/Dusk Photography (weather permitting)',
    ],
  },
]

const specialtyPackages: Package[] = [
  {
    name: 'Vacation Rental Package',
    subtitle: 'Optimized for short-term rental marketing',
    features: [
      'Professional Photography (interior & exterior)',
      'Complete property + amenity coverage',
      'Lifestyle & detail shots',
      'Zillow 3D Tour',
    ],
  },
  {
    name: 'Commercial Package',
    subtitle: 'Custom pricing based on property size',
    features: [
      'Professional Photography (interior & exterior)',
      'Complete building coverage',
      'Zillow 3D Tour',
      'Pricing varies by square footage',
    ],
    note: 'Contact us for a custom quote',
  },
]

const addOns: AddOn[] = [
  { icon: Zap, name: 'Express Delivery (24-hour turnaround)' },
  { icon: Calendar, name: 'Priority Scheduling' },
  { icon: Film, name: 'Social Media Video Cut (30-60 sec)' },
  { icon: Ruler, name: 'Floor Plans' },
  { icon: Plane, name: 'Drone Photography/Video', comingSoon: true },
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

        {/* Main Packages - 3 columns on desktop */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {mainPackages.map((pkg, index) => (
            <div
              key={index}
              className={`relative flex flex-col rounded-lg border p-8 ${
                pkg.mostPopular
                  ? 'border-envoy-blue bg-envoy-blue/5 shadow-xl shadow-envoy-blue/10'
                  : 'border-envoy-blue/20 bg-envoy-navy'
              }`}
            >
              {/* Most Popular Badge */}
              {pkg.mostPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-envoy-blue px-4 py-1 text-sm font-semibold text-white shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Package Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-envoy-text">
                  {pkg.name}
                </h3>
                <p className="mt-2 text-sm text-envoy-muted">{pkg.subtitle}</p>
              </div>

              {/* Features List */}
              <ul className="mb-8 flex-grow space-y-3">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-envoy-blue" />
                    <span className="text-envoy-text text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                onClick={onOpenModal}
                variant={pkg.mostPopular ? 'default' : 'outline'}
                size="lg"
                className="w-full"
              >
                Book a Shoot
              </Button>
            </div>
          ))}
        </div>

        {/* Specialty Packages - 2 columns centered on desktop */}
        <div className="grid gap-8 md:grid-cols-2 lg:max-w-4xl lg:mx-auto mb-16">
          {specialtyPackages.map((pkg, index) => (
            <div
              key={index}
              className="relative flex flex-col rounded-lg border border-envoy-blue/20 bg-envoy-navy p-8"
            >
              {/* Package Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-envoy-text">
                  {pkg.name}
                </h3>
                <p className="mt-2 text-sm text-envoy-muted">{pkg.subtitle}</p>
              </div>

              {/* Features List */}
              <ul className="mb-8 flex-grow space-y-3">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-envoy-blue" />
                    <span className="text-envoy-text text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Note */}
              {pkg.note && (
                <p className="mb-4 text-sm text-envoy-blue italic">
                  {pkg.note}
                </p>
              )}

              {/* CTA Button */}
              <Button
                onClick={onOpenModal}
                variant="outline"
                size="lg"
                className="w-full"
              >
                Book a Shoot
              </Button>
            </div>
          ))}
        </div>

        {/* Add-Ons Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-envoy-text sm:text-4xl">
              Add-On Services
            </h3>
            <p className="mt-3 text-lg text-envoy-muted">
              Enhance any package with these premium options
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {addOns.map((addOn, index) => {
              const Icon = addOn.icon
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-lg border border-envoy-blue/20 bg-envoy-navy p-6 transition-all duration-300 hover:border-envoy-blue/40"
                >
                  <div className="flex-shrink-0 rounded-lg bg-envoy-blue/10 p-3">
                    <Icon className="h-6 w-6 text-envoy-blue" />
                  </div>
                  <div className="flex-1">
                    <p className="text-envoy-text font-medium">
                      {addOn.name}
                    </p>
                    {addOn.comingSoon && (
                      <span className="text-xs text-envoy-muted italic">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-envoy-muted">
            Need something custom?{' '}
            <button
              onClick={onOpenModal}
              className="font-medium text-envoy-blue transition-colors hover:text-envoy-blue-hover"
            >
              Contact us
            </button>{' '}
            for tailored packages and pricing.
          </p>
        </div>
      </div>
    </section>
  )
}
