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
    title: 'Professional & Insured',
    description: 'Fully insured with professional liability coverage and top-tier equipment for peace of mind on every shoot.',
  },
  {
    icon: Sparkles,
    title: 'Attention to Detail',
    description: 'We capture the unique character of each property with careful composition and thoughtful editing.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="border-t border-white/5 bg-envoy-navy py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-envoy-text sm:text-5xl md:text-6xl">
            Why Choose Envoy Media
          </h2>
          <p className="mt-4 text-lg text-envoy-muted sm:text-xl">
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
                <div className="flex h-full flex-col rounded-lg border border-envoy-blue/20 bg-envoy-navy p-8 transition-all duration-300 hover:border-envoy-blue/40 hover:shadow-lg hover:shadow-envoy-blue/5">
                  {/* Icon + Title (inline) */}
                  <div className="mb-4 flex items-center gap-4">
                    <div className="inline-flex rounded-lg bg-envoy-blue/10 p-3 text-envoy-blue transition-colors duration-300 group-hover:bg-envoy-blue/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-envoy-text">
                      {reason.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-envoy-muted leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Service Areas */}
        <div className="mt-16 rounded-lg border border-envoy-blue/20 bg-envoy-blue/5 p-8 text-center">
          <h3 className="mb-4 text-2xl font-semibold text-envoy-text">
            Serving the Greater Tampa Bay Area
          </h3>
          <p className="text-lg text-envoy-muted">
            Tampa • St. Petersburg • Clearwater • Brandon • Wesley Chapel • Sarasota
          </p>
        </div>
      </div>
    </section>
  )
}
