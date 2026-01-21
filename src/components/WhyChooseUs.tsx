import { Award, MapPin, GraduationCap, Clock, Shield, Sparkles } from 'lucide-react'

const reasons = [
  {
    icon: MapPin,
    title: 'Tampa Bay Experts',
    description: 'Deep local knowledge of Tampa Bay neighborhoods and what makes properties stand out in this market.',
  },
  {
    icon: GraduationCap,
    title: 'Certified & Trained',
    description: 'Matterport certified and Zillow 3D trained. We stay current with the latest real estate media technology.',
  },
  {
    icon: Award,
    title: 'Professional Quality',
    description: 'High-end equipment and professional editing ensure every property looks its absolute best.',
  },
  {
    icon: Clock,
    title: 'Reliable Service',
    description: 'Consistent, dependable service you can count on. We understand the importance of your listing timeline.',
  },
  {
    icon: Shield,
    title: 'Fully Insured',
    description: 'Complete liability coverage and FAA-certified drone operations for your peace of mind.',
  },
  {
    icon: Sparkles,
    title: 'Attention to Detail',
    description: 'We capture the unique character of each property with careful composition and thoughtful editing.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="border-t border-white/5 bg-envoy-charcoal py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-envoy-text sm:text-5xl md:text-6xl">
            Why Choose Envoy Media
          </h2>
          <p className="mt-4 text-lg text-envoy-text-muted sm:text-xl">
            Professional real estate media backed by experience and expertise
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <div
                key={index}
                className="group relative"
              >
                {/* Card */}
                <div className="flex h-full flex-col items-start rounded-lg border border-envoy-green/20 bg-envoy-charcoal p-8 transition-all duration-300 hover:border-envoy-green/40 hover:shadow-lg hover:shadow-envoy-green/5">
                  {/* Icon */}
                  <div className="mb-6 rounded-lg bg-envoy-green/10 p-3 text-envoy-green transition-colors duration-300 group-hover:bg-envoy-green/20">
                    <Icon className="h-7 w-7" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-xl font-semibold text-envoy-text">
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p className="text-envoy-text-muted leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Service Areas */}
        <div className="mt-16 rounded-lg border border-envoy-green/20 bg-envoy-green/5 p-8 text-center">
          <h3 className="mb-4 text-2xl font-semibold text-envoy-text">
            Serving the Greater Tampa Bay Area
          </h3>
          <p className="text-lg text-envoy-text-muted">
            Tampa • St. Petersburg • Clearwater • Brandon • Wesley Chapel • Sarasota
          </p>
        </div>
      </div>
    </section>
  )
}
