import {
  Camera,
  Video,
  Box,
  UserCircle,
  Home,
  Building2,
} from "lucide-react";
import {
  FloatingShapes,
  DottedGrid,
  IconWatermark,
  SectionDivider,
  useScrollAnimation,
} from "./Decorative";

const services = [
  {
    icon: Camera,
    title: "Real Estate Photography",
    description:
      "Professional HDR photography that showcases your property in the best light. Every angle carefully composed to highlight your listing's strengths.",
  },
  {
    icon: Video,
    title: "Real Estate Videography",
    description:
      "Cinematic property tours that engage buyers and generate more interest. Professionally edited videos that tell your property's story.",
  },
  {
    icon: Box,
    title: "3D Virtual Tours",
    description:
      "Immersive Matterport and Zillow 3D tours that let buyers explore properties remotely. Certified and trained in the latest virtual tour technology.",
  },
  {
    icon: UserCircle,
    title: "Agent Walkthrough Videos",
    description:
      "Personalized video tours with you guiding potential buyers through the property. Build connection and trust before the showing.",
  },
  {
    icon: Home,
    title: "Vacation Rental Media",
    description:
      "Specialized photography and video for short-term rentals. Content optimized for Airbnb, VRBO, and vacation rental platforms.",
  },
  {
    icon: Building2,
    title: "Commercial Listings",
    description:
      "Professional photography and videography for commercial properties, retail spaces, and office buildings that showcase business potential.",
  },
];

export default function Services() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="services"
      className="relative overflow-hidden border-t border-surface-dark bg-surface-dark py-20 md:py-24"
    >
      <DottedGrid />
      <FloatingShapes />
      <IconWatermark icon={1} position="top-right" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div
          ref={ref}
          className={`mb-4 text-center ${isVisible ? "scroll-visible" : "scroll-hidden"}`}
        >
          <h2 className="text-4xl font-bold text-text-light tracking-tight lg:text-5xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-gray-muted sm:text-xl">
            Comprehensive media solutions for Tampa Bay real estate
            professionals
          </p>
        </div>

        <SectionDivider />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-lg border border-surface-dark bg-navy-deep p-8 card-glow transition-all duration-300 hover:scale-[1.02] ${
                  isVisible ? "scroll-visible" : "scroll-hidden"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                }}
              >
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-blue-coastal/10 transition-colors duration-300 group-hover:border-blue-coastal/30" />

                <div className="mb-4 flex items-center gap-4">
                  <div className="inline-flex rounded-xl bg-gradient-to-br from-blue-coastal/20 to-blue-coastal/5 p-3 text-blue-coastal transition-all duration-300 group-hover:from-blue-coastal/30 group-hover:to-blue-coastal/10 group-hover:shadow-lg group-hover:shadow-blue-coastal/10">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-light">
                    {service.title}
                  </h3>
                </div>

                <p className="text-gray-muted leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
