import { useState } from "react";
import { Button } from "./Button";
import { Mail, Phone, MapPin, Home } from "lucide-react";

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyAddress: "",
    propertyType: "",
    services: [] as string[],
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const services = [
    "Photography",
    "Videography",
    "3D Virtual Tour",
    "Twilight Photos",
    "Agent Walkthrough",
  ];

  return (
    <section id="quote" className="bg-envoy-charcoal py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-envoy-text sm:text-5xl md:text-6xl">
              Get a Quote
            </h2>
            <p className="mt-4 text-lg text-envoy-text-muted sm:text-xl">
              Tell us about your property and we'll provide a custom quote
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-envoy-text"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-md border border-envoy-green/30 bg-envoy-charcoal px-4 py-3 text-envoy-text placeholder-envoy-text-muted transition-colors focus:border-envoy-green focus:outline-none focus:ring-2 focus:ring-envoy-green/20"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-envoy-text"
                >
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-envoy-text-muted" />
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-md border border-envoy-green/30 bg-envoy-charcoal py-3 pl-11 pr-4 text-envoy-text placeholder-envoy-text-muted transition-colors focus:border-envoy-green focus:outline-none focus:ring-2 focus:ring-envoy-green/20"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-envoy-text"
                >
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-envoy-text-muted" />
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full rounded-md border border-envoy-green/30 bg-envoy-charcoal py-3 pl-11 pr-4 text-envoy-text placeholder-envoy-text-muted transition-colors focus:border-envoy-green focus:outline-none focus:ring-2 focus:ring-envoy-green/20"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label
                  htmlFor="propertyType"
                  className="mb-2 block text-sm font-medium text-envoy-text"
                >
                  Property Type *
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-envoy-text-muted" />
                  <select
                    id="propertyType"
                    required
                    value={formData.propertyType}
                    onChange={(e) =>
                      setFormData({ ...formData, propertyType: e.target.value })
                    }
                    className="w-full appearance-none rounded-md border border-envoy-green/30 bg-envoy-charcoal py-3 pl-11 pr-4 text-envoy-text transition-colors focus:border-envoy-green focus:outline-none focus:ring-2 focus:ring-envoy-green/20"
                  >
                    <option value="">Select property type</option>
                    <option value="single-family">Single Family Home</option>
                    <option value="condo">Condo/Townhouse</option>
                    <option value="luxury">Luxury Estate</option>
                    <option value="commercial">Commercial Property</option>
                    <option value="vacation-rental">Vacation Rental</option>
                    <option value="land">Land/Lot</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Property Address */}
            <div>
              <label
                htmlFor="propertyAddress"
                className="mb-2 block text-sm font-medium text-envoy-text"
              >
                Property Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-4 h-5 w-5 text-envoy-text-muted" />
                <input
                  type="text"
                  id="propertyAddress"
                  required
                  value={formData.propertyAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      propertyAddress: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-envoy-green/30 bg-envoy-charcoal py-3 pl-11 pr-4 text-envoy-text placeholder-envoy-text-muted transition-colors focus:border-envoy-green focus:outline-none focus:ring-2 focus:ring-envoy-green/20"
                  placeholder="123 Main St, Tampa, FL 33602"
                />
              </div>
            </div>

            {/* Services Needed */}
            <div>
              <label className="mb-3 block text-sm font-medium text-envoy-text">
                Services Needed *
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {services.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => handleServiceToggle(service)}
                    className={`rounded-md border px-4 py-2.5 text-sm font-medium transition-all ${
                      formData.services.includes(service)
                        ? "border-envoy-green bg-envoy-green text-white"
                        : "border-envoy-green/30 bg-envoy-charcoal text-envoy-text hover:border-envoy-green/50"
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-envoy-text"
              >
                Additional Details (Optional)
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full rounded-md border border-envoy-green/30 bg-envoy-charcoal px-4 py-3 text-envoy-text placeholder-envoy-text-muted transition-colors focus:border-envoy-green focus:outline-none focus:ring-2 focus:ring-envoy-green/20"
                placeholder="Any specific requirements or questions?"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                type="submit"
                size="xl"
                className="w-full sm:w-auto sm:px-16"
              >
                Request Quote
              </Button>
              <p className="mt-4 text-sm text-envoy-text-muted">
                We'll get back to you within 24 hours
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
