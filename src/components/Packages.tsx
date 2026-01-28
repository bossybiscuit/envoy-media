import { Check, Zap, Calendar, Ruler, ArrowRight } from "lucide-react";
import { Button } from "./Button";
import {
  FloatingShapes,
  DottedGrid,
  IconWatermark,
  SectionDivider,
  useScrollAnimation,
} from "./Decorative";

const SPIRO_ORDER_URL =
  "https://portal.spiro.media/order/envoy/envoy-media-new-order-page";

interface Package {
  name: string;
  subtitle: string;
  features: string[];
  mostPopular?: boolean;
  note?: string;
}

interface AddOn {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  comingSoon?: boolean;
}

const mainPackages: Package[] = [
  {
    name: "Essential Package",
    subtitle: "Perfect for smaller properties and budget-conscious listings",
    features: [
      "Professional Photography (interior & exterior)",
      "Complete property coverage",
      "Zillow 3D Tour",
    ],
  },
  {
    name: "Professional Package",
    subtitle: "Complete marketing suite for standard listings",
    features: [
      "Professional Photography (interior & exterior)",
      "Complete property coverage",
      "Cinematic Property Walkthrough Video",
      "Zillow 3D Tour",
    ],
    mostPopular: true,
  },
  {
    name: "Elite Package",
    subtitle: "Premium marketing for luxury listings",
    features: [
      "Professional Photography (interior & exterior)",
      "Complete property coverage",
      "Cinematic Property Walkthrough Video",
      "Agent-Guided Walkthrough Video",
      "Matterport 3D Tour",
      "Twilight/Dusk Photography (weather permitting)",
    ],
  },
];

const specialtyPackages: Package[] = [
  {
    name: "Vacation Rental Package",
    subtitle: "Optimized for short-term rental marketing",
    features: [
      "Professional Photography (interior & exterior)",
      "Complete property + amenity coverage",
      "Lifestyle & detail shots",
      "Zillow 3D Tour",
    ],
  },
  {
    name: "Commercial Package",
    subtitle: "Custom pricing based on property size",
    features: [
      "Professional Photography (interior & exterior)",
      "Complete building coverage",
      "Zillow 3D Tour",
      "Pricing varies by square footage",
    ],
    note: "Contact us for a custom quote",
  },
];

const addOns: AddOn[] = [
  { icon: Zap, name: "Express Delivery (24-hour turnaround)" },
  { icon: Calendar, name: "Priority Scheduling" },
  { icon: Ruler, name: "Floor Plans" },
];

export default function Packages() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="packages"
      className="relative overflow-hidden border-t border-surface-dark bg-surface-dark py-20 md:py-24"
    >
      <DottedGrid />
      <FloatingShapes />
      <IconWatermark icon={3} position="center-left" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div
          ref={ref}
          className={`mb-4 text-center ${isVisible ? "scroll-visible" : "scroll-hidden"}`}
        >
          <h2 className="text-4xl font-bold text-text-light tracking-tight lg:text-5xl">
            Packages
          </h2>
          <p className="mt-4 text-lg text-gray-muted sm:text-xl">
            Choose the perfect media package for your property
          </p>
        </div>

        <SectionDivider />

        {/* Main Packages */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {mainPackages.map((pkg, index) => (
            <div
              key={index}
              className={`group relative flex flex-col rounded-lg border p-8 card-glow transition-all duration-300 hover:scale-[1.02] ${
                pkg.mostPopular
                  ? "border-blue-coastal/50 bg-gradient-to-b from-blue-coastal/10 to-navy-deep shadow-xl shadow-blue-coastal/10"
                  : "border-surface-dark bg-navy-deep"
              } ${isVisible ? "scroll-visible" : "scroll-hidden"}`}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
            >
              {/* Most Popular Badge */}
              {pkg.mostPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-gradient-to-r from-blue-coastal to-blue-coastal-hover px-4 py-1 text-xs font-semibold text-white shadow-lg shadow-blue-coastal/30 whitespace-nowrap">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Decorative corners on featured card */}
              {pkg.mostPopular && (
                <>
                  <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-blue-coastal/30" />
                  <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-blue-coastal/30" />
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-blue-coastal/30" />
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-blue-coastal/30" />
                </>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-text-light">
                  {pkg.name}
                </h3>
                <p className="mt-2 text-sm text-gray-muted">{pkg.subtitle}</p>
              </div>

              <ul className="mb-8 flex-grow space-y-3">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-coastal/20">
                      <Check className="h-3 w-3 text-blue-coastal" />
                    </div>
                    <span className="text-text-light text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={SPIRO_ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant={pkg.mostPopular ? "default" : "outline"}
                  size="lg"
                  className="w-full group"
                >
                  Book a Shoot
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </a>
            </div>
          ))}
        </div>

        {/* Specialty Packages */}
        <div className="grid gap-8 md:grid-cols-2 lg:max-w-4xl lg:mx-auto mb-16">
          {specialtyPackages.map((pkg, index) => (
            <div
              key={index}
              className="group relative flex flex-col rounded-lg border border-surface-dark bg-navy-deep p-8 card-glow transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-text-light">
                  {pkg.name}
                </h3>
                <p className="mt-2 text-sm text-gray-muted">{pkg.subtitle}</p>
              </div>

              <ul className="mb-8 flex-grow space-y-3">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-coastal/20">
                      <Check className="h-3 w-3 text-blue-coastal" />
                    </div>
                    <span className="text-text-light text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {pkg.note && (
                <p className="mb-4 text-sm text-blue-coastal italic">
                  {pkg.note}
                </p>
              )}

              <a
                href={SPIRO_ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="w-full">
                  Book a Shoot
                </Button>
              </a>
            </div>
          ))}
        </div>

        {/* Add-Ons Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-text-light lg:text-4xl">
              Add-On Services
            </h3>
            <p className="mt-3 text-lg text-gray-muted">
              Enhance any package with these premium options
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {addOns.map((addOn, index) => {
              const Icon = addOn.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-lg border border-surface-dark bg-navy-deep p-6 card-glow transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-blue-coastal/20 to-blue-coastal/5 p-3">
                    <Icon className="h-6 w-6 text-blue-coastal" />
                  </div>
                  <div className="flex-1">
                    <p className="text-text-light font-medium">{addOn.name}</p>
                    {addOn.comingSoon && (
                      <span className="text-xs text-gray-muted italic">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-muted">
            Need something custom?{" "}
            <a
              href={SPIRO_ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-coastal transition-colors hover:text-blue-coastal-hover"
            >
              Contact us
            </a>{" "}
            for tailored packages and pricing.
          </p>
        </div>
      </div>
    </section>
  );
}
