import {
  Award,
  MapPin,
  GraduationCap,
  Clock,
  Shield,
  Sparkles,
} from "lucide-react";
import {
  FloatingShapes,
  IconWatermark,
  SectionDivider,
  useScrollAnimation,
} from "./Decorative";

const reasons = [
  {
    icon: MapPin,
    title: "Tampa Bay Experts",
    description:
      "Deep local knowledge of Tampa Bay neighborhoods and what makes properties stand out in this market.",
  },
  {
    icon: GraduationCap,
    title: "Certified & Trained",
    description:
      "Matterport certified and Zillow 3D trained. We stay current with the latest real estate media technology.",
  },
  {
    icon: Award,
    title: "Professional Quality",
    description:
      "High-end equipment and professional editing ensure every property looks its absolute best.",
  },
  {
    icon: Clock,
    title: "Reliable Service",
    description:
      "Consistent, dependable service you can count on. We understand the importance of your listing timeline.",
  },
  {
    icon: Shield,
    title: "Professional & Insured",
    description:
      "Fully insured with professional liability coverage and top-tier equipment for peace of mind on every shoot.",
  },
  {
    icon: Sparkles,
    title: "Attention to Detail",
    description:
      "We capture the unique character of each property with careful composition and thoughtful editing.",
  },
];

export default function WhyChooseUs() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative overflow-hidden border-t border-surface-dark bg-navy-deep py-20 md:py-24">
      <FloatingShapes />
      <IconWatermark icon={0} position="top-left" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div
          ref={ref}
          className={`mb-4 text-center ${isVisible ? "scroll-visible" : "scroll-hidden"}`}
        >
          <h2 className="text-4xl font-bold text-text-light tracking-tight lg:text-5xl">
            Why Choose Envoy Media
          </h2>
          <p className="mt-4 text-lg text-gray-muted sm:text-xl">
            Professional real estate media backed by experience and expertise
          </p>
        </div>

        <SectionDivider />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className={`group ${isVisible ? "scroll-visible" : "scroll-hidden"}`}
                style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
              >
                <div className="flex h-full flex-col rounded-lg border border-surface-dark bg-navy-deep p-8 card-glow transition-all duration-300 hover:scale-[1.02]">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="inline-flex rounded-xl bg-gradient-to-br from-blue-coastal/20 to-blue-coastal/5 p-3 text-blue-coastal transition-all duration-300 group-hover:from-blue-coastal/30 group-hover:to-blue-coastal/10 group-hover:shadow-lg group-hover:shadow-blue-coastal/10">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-text-light">
                      {reason.title}
                    </h3>
                  </div>
                  <p className="text-gray-muted leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Service Areas */}
        <div className="mt-16 rounded-lg border border-blue-coastal/20 bg-gradient-to-r from-blue-coastal/10 via-blue-coastal/5 to-transparent p-8 text-center">
          <h3 className="mb-4 text-2xl font-semibold text-text-light">
            Serving the Greater Tampa Bay Area
          </h3>
          <p className="text-lg text-gray-muted">
            Tampa &bull; St. Petersburg &bull; Clearwater &bull; Brandon &bull;
            Wesley Chapel &bull; Sarasota
          </p>
        </div>
      </div>
    </section>
  );
}
