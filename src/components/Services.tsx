import { Camera, Video, Box, UserCircle, Home } from 'lucide-react'

const services = [
  {
    icon: Camera,
    title: 'Real Estate Photography',
    description: 'Professional HDR photography that showcases your property in the best light. Every angle carefully composed to highlight your listing\'s strengths.',
  },
  {
    icon: Video,
    title: 'Real Estate Videography',
    description: 'Cinematic property tours that engage buyers and generate more interest. Professionally edited videos that tell your property\'s story.',
  },
  {
    icon: Box,
    title: '3D Virtual Tours',
    description: 'Immersive Matterport and Zillow 3D tours that let buyers explore properties remotely. Certified and trained in the latest virtual tour technology.',
  },
  {
    icon: UserCircle,
    title: 'Agent Walkthrough Videos',
    description: 'Personalized video tours with you guiding potential buyers through the property. Build connection and trust before the showing.',
  },
  {
    icon: Home,
    title: 'Vacation Rental Media',
    description: 'Specialized photography and video for short-term rentals. Content optimized for Airbnb, VRBO, and vacation rental platforms.',
  },
]

export default function Services() {
  return (
    <section id="services" className="border-t border-white/5 bg-[#1a1d1c] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-envoy-text sm:text-5xl md:text-6xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-envoy-text-muted sm:text-xl">
            Comprehensive media solutions for Tampa Bay real estate professionals
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border border-envoy-green/20 bg-envoy-charcoal p-8 transition-all duration-300 hover:border-envoy-green/50 hover:shadow-lg hover:shadow-envoy-green/10"
              >
                {/* Icon */}
                <div className="mb-6 inline-flex rounded-lg bg-envoy-green/10 p-3 text-envoy-green transition-colors duration-300 group-hover:bg-envoy-green/20">
                  <Icon className="h-8 w-8" />
                </div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-semibold text-envoy-text">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-envoy-text-muted leading-relaxed">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
