import { Quote } from 'lucide-react'

interface Testimonial {
  quote: string
  author: string
  title: string
  location: string
}

const testimonials: Testimonial[] = [
  {
    quote: "The photos from Envoy Media helped my listing stand out immediately. My clients were thrilled with how their home looked online, and we had multiple offers within the first week.",
    author: "Sarah Mitchell",
    title: "Realtor",
    location: "Tampa, FL"
  },
  {
    quote: "I've worked with several photographers over the years, and Envoy Media consistently delivers quality work. The drone shots especially make a huge difference for waterfront properties.",
    author: "Michael Chen",
    title: "Broker Associate",
    location: "St. Petersburg, FL"
  },
  {
    quote: "Their 3D tours have become essential for my luxury listings. Buyers can walk through the property from anywhere, which has expanded my reach significantly.",
    author: "Jennifer Rodriguez",
    title: "Luxury Real Estate Specialist",
    location: "Clearwater, FL"
  },
  {
    quote: "Reliable, professional, and the images always showcase the property beautifully. I know I can count on them for every listing.",
    author: "David Thompson",
    title: "Realtor",
    location: "Brandon, FL"
  },
  {
    quote: "The attention to detail in their work is what sets them apart. Every photo is thoughtfully composed, and it shows in the final results.",
    author: "Amanda Lee",
    title: "Real Estate Agent",
    location: "Wesley Chapel, FL"
  },
  {
    quote: "Envoy Media understands the Tampa Bay market and knows how to capture what makes each neighborhood special. Great local expertise.",
    author: "Robert Martinez",
    title: "Broker",
    location: "Sarasota, FL"
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-envoy-charcoal py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-envoy-text sm:text-5xl md:text-6xl">
            What Agents Say
          </h2>
          <p className="mt-4 text-lg text-envoy-text-muted sm:text-xl">
            Trusted by Tampa Bay real estate professionals
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col rounded-lg border border-envoy-green/20 bg-envoy-charcoal p-8 transition-all duration-300 hover:border-envoy-green/40 hover:shadow-lg hover:shadow-envoy-green/5"
            >
              {/* Quote Icon */}
              <Quote className="mb-4 h-8 w-8 text-envoy-green/40" />

              {/* Quote */}
              <blockquote className="mb-6 flex-grow text-envoy-text leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author Info */}
              <div className="border-t border-envoy-green/10 pt-6">
                <p className="font-semibold text-envoy-text">
                  {testimonial.author}
                </p>
                <p className="text-sm text-envoy-text-muted">
                  {testimonial.title}
                </p>
                <p className="text-sm text-envoy-green">
                  {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
