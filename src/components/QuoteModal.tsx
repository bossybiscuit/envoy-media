import { useState, useEffect } from "react";
import {
  X,
  Check,
  ChevronLeft,
  Home,
  Palmtree,
  Building2,
  FileQuestion,
  Camera,
  Video,
  Box,
  Film,
  Bed,
  Castle,
  Ruler,
  Clock,
  CalendarCheck,
  Loader2,
} from "lucide-react";
import { Button } from "./Button";
import emailjs from "@emailjs/browser";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  selectedPackage: string;
  propertyType: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  services: string[];
  propertySize: string;
  squareFootage: string;
  timeline: string;
  specificDate: string;
  specificTime: string;
  deadlineDate: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

const TOTAL_STEPS = 6;

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [formData, setFormData] = useState<FormData>({
    selectedPackage: "",
    propertyType: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    services: [],
    propertySize: "",
    squareFootage: "",
    timeline: "",
    specificDate: "",
    specificTime: "",
    deadlineDate: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("Op8YLSHEzAzYGVsPv");
  }, []);

  // Focus trap and ESC key handling
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const resetForm = () => {
    setStep(1);
    setFormData({
      selectedPackage: "",
      propertyType: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      services: [],
      propertySize: "",
      squareFootage: "",
      timeline: "",
      specificDate: "",
      specificTime: "",
      deadlineDate: "",
      name: "",
      email: "",
      phone: "",
      notes: "",
    });
    setValidationErrors({});
    setIsSubmitting(false);
    setSubmissionStatus("idle");
    setErrorMessage("");
  };

  // Package selection handler
  const handlePackageSelect = (packageName: string) => {
    const packageServices: Record<string, string[]> = {
      Essential: ["Real Estate Photography"],
      Professional: ["Real Estate Photography", "Real Estate Videography"],
      Premium: [
        "Real Estate Photography",
        "Real Estate Videography",
        "3D Tour (Matterport / Zillow 3D)",
        "Agent Walkthrough Video",
      ],
    };

    setFormData({
      ...formData,
      selectedPackage: packageName,
      services: packageServices[packageName] || [],
    });
    setTimeout(handleNext, 300);
  };

  const handleNext = () => {
    setDirection("forward");
    setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const handleBack = () => {
    setDirection("backward");
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handlePropertyType = (type: string) => {
    setFormData({ ...formData, propertyType: type });
  };

  const handleStep1Next = () => {
    // Validate property type and all address fields
    const errors: Record<string, string> = {};

    if (!formData.propertyType) {
      errors.propertyType = "Please select a property type";
    }

    if (!formData.streetAddress.trim()) {
      errors.streetAddress = "Please enter the street address";
    }

    if (!formData.city.trim()) {
      errors.city = "Please enter the city";
    }

    if (!formData.state) {
      errors.state = "Please select a state";
    }

    if (!formData.zipCode.trim()) {
      errors.zipCode = "Please enter the ZIP code";
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      errors.zipCode = "Please enter a valid ZIP code";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    handleNext();
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handlePropertySize = (size: string) => {
    setFormData({ ...formData, propertySize: size });
    // Only auto-advance if not Commercial (which requires square footage input)
    if (size !== "Commercial") {
      setTimeout(handleNext, 300);
    }
  };

  const handleTimeline = (timeline: string) => {
    setFormData({
      ...formData,
      timeline,
      specificDate: "",
      specificTime: "",
      deadlineDate: "",
    });
    if (timeline !== "Specific Date" && timeline !== "Flexible / Not urgent") {
      setTimeout(handleNext, 300);
    }
  };

  const handleStep4Next = () => {
    // Validate timeline, date, and time
    const errors: Record<string, string> = {};

    if (!formData.timeline) {
      errors.timeline = "Please select a timeline";
    }

    if (formData.timeline === "Specific Date") {
      if (!formData.specificDate) {
        errors.specificDate = "Please select a specific date";
      }
      if (!formData.specificTime) {
        errors.specificTime = "Please select a specific time";
      }
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    handleNext();
  };

  const validatePhone = (phone: string) => {
    // Basic phone validation - at least 10 digits
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 10;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone is required";
    } else if (!validatePhone(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Clear previous errors
    setValidationErrors({});
    setErrorMessage("");
    setIsSubmitting(true);
    setSubmissionStatus("idle");

    console.log("Quote Form Submitted:", formData);

    // Prepare email template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      selected_package: formData.selectedPackage || "Custom",
      property_type: formData.propertyType,
      street_address: formData.streetAddress,
      city: formData.city,
      state: formData.state,
      zip_code: formData.zipCode,
      services: formData.services.join(", "),
      property_size: formData.propertySize,
      square_footage: formData.squareFootage || "",
      timeline: formData.timeline,
      specific_date: formData.specificDate || "",
      specific_time: formData.specificTime || "",
      deadline_date: formData.deadlineDate || "",
      notes: formData.notes || "",
    };

    try {
      // Send notification email to business
      await emailjs.send("service_rq3n255", "template_xptmd5r", templateParams);

      // Send auto-reply to customer
      await emailjs.send("service_rq3n255", "template_3r2gzfb", templateParams);

      // Success - both emails sent
      setSubmissionStatus("success");
      setIsSubmitting(false);

      // Close modal after 3 seconds
      setTimeout(() => {
        resetForm();
        onClose();
      }, 3000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmissionStatus("error");
      setIsSubmitting(false);
      setErrorMessage(
        "Something went wrong. Please try again or email us directly at envoymediaco@gmail.com",
      );
    }
  };

  const canProceedFromStep1 =
    formData.propertyType &&
    formData.streetAddress.trim() &&
    formData.city.trim() &&
    formData.state &&
    formData.zipCode.trim();
  const canProceedFromStep2 = formData.services.length > 0;
  const canProceedFromStep4 =
    formData.timeline &&
    (formData.timeline !== "Specific Date" ||
      (formData.specificDate && formData.specificTime));

  const propertyTypes = [
    { label: "Residential", icon: Home },
    { label: "Vacation Rental", icon: Palmtree },
    { label: "Commercial", icon: Building2 },
    { label: "Other", icon: FileQuestion },
  ];

  const services = [
    { label: "Real Estate Photography", icon: Camera },
    { label: "Real Estate Videography", icon: Video },
    { label: "3D Tour (Matterport / Zillow 3D)", icon: Box },
    { label: "Agent Walkthrough Video", icon: Film },
    { label: "Vacation Rental Media", icon: Home },
  ];

  const propertySizes = [
    { label: "Studio/1 Bedroom", icon: Bed },
    { label: "2-3 Bedrooms", icon: Home },
    { label: "4-5 Bedrooms", icon: Home },
    { label: "6+ Bedrooms / Estate", icon: Castle },
    { label: "Commercial", icon: Ruler },
  ];

  const timelines = [
    { label: "Specific Date", icon: CalendarCheck },
    { label: "Flexible / Not urgent", icon: Clock },
  ];

  const usStates = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  const timeSlots = [
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
  ];

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split("T")[0];
  const threeMonthsFromNow = new Date(
    new Date().setMonth(new Date().getMonth() + 3),
  )
    .toISOString()
    .split("T")[0];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-envoy-navy/95 backdrop-blur-sm" />

      {/* Modal - Scrollable with max height */}
      <div className="relative w-full max-w-2xl my-8 animate-fade-in">
        <div className="rounded-xl border border-envoy-blue/30 bg-envoy-dark-surface shadow-2xl max-h-[90vh] flex flex-col">
          {/* Close Button - Sticky at top */}
          <button
            onClick={onClose}
            className="sticky top-0 right-4 z-50 ml-auto mr-4 mt-4 text-envoy-muted transition-colors hover:text-envoy-text"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Header with Progress Bar - Sticky */}
          <div className="px-8 pt-4 pb-6 bg-envoy-dark-surface sticky top-12 z-40">
            {/* Progress Bar */}
            <div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-envoy-blue transition-all duration-500 ease-out"
                  style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                />
              </div>
              <p className="mt-2 text-center text-sm text-envoy-muted">
                Step {step} of {TOTAL_STEPS}
              </p>
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="px-8 pt-12 pb-8 overflow-y-auto flex-1">
            <div className="relative">
              {/* Step 1: Package Selection */}
              {step === 1 && (
                <div
                  className={`animate-slide-${direction === "forward" ? "in-right" : "in-left"}`}
                >
                  <h2 className="mb-4 text-center font-serif text-2xl sm:text-3xl text-envoy-text">
                    Choose a Package
                  </h2>
                  <p className="mb-8 text-center text-envoy-muted">
                    Select a package to get started, or skip to customize your
                    services
                  </p>

                  {/* Package Cards - Full Width Rows */}
                  <div className="space-y-4">
                    {/* Essential Package */}
                    <button
                      onClick={() => handlePackageSelect("Essential Package")}
                      className={`group relative w-full rounded-lg border p-5 text-left transition-all duration-200 hover:shadow-lg hover:shadow-envoy-blue/20 ${
                        formData.selectedPackage === "Essential Package"
                          ? "border-envoy-blue bg-envoy-blue/10"
                          : "border-white/10 bg-envoy-navy hover:border-envoy-blue"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-envoy-text mb-1">
                            Essential Package
                          </h3>
                          <p className="text-xs text-envoy-muted mb-3">
                            Perfect for smaller properties and budget-conscious listings
                          </p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-envoy-text">
                            <span className="flex items-center gap-1.5">
                              <Check className="h-3 w-3 text-envoy-blue flex-shrink-0" />
                              Professional Photography
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Check className="h-3 w-3 text-envoy-blue flex-shrink-0" />
                              Complete property coverage
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Check className="h-3 w-3 text-envoy-blue flex-shrink-0" />
                              Zillow 3D Tour
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-center min-w-[60px]">
                          {formData.selectedPackage === "Essential Package" ? (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-envoy-blue">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          ) : (
                            <span className="text-xs font-medium text-envoy-blue group-hover:text-envoy-blue-hover">
                              Select
                            </span>
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Professional Package */}
                    <button
                      onClick={() => handlePackageSelect("Professional Package")}
                      className={`group relative w-full rounded-lg border p-5 text-left transition-all duration-200 hover:shadow-lg hover:shadow-envoy-blue/20 ${
                        formData.selectedPackage === "Professional Package"
                          ? "border-envoy-blue bg-envoy-blue/10"
                          : "border-envoy-blue/20 bg-envoy-blue/5 hover:border-envoy-blue"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-envoy-text">
                              Professional Package
                            </h3>
                            <span className="rounded-full bg-envoy-blue px-2 py-0.5 text-xs font-semibold text-white">
                              Most Popular
                            </span>
                          </div>
                          <p className="text-xs text-envoy-muted mb-3">
                            Complete marketing suite for standard listings
                          </p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-envoy-text">
                            <span className="flex items-center gap-1.5">
                              <Check className="h-3 w-3 text-envoy-blue flex-shrink-0" />
                              Professional Photography
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Check className="h-3 w-3 text-envoy-blue flex-shrink-0" />
                              Complete property coverage
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Check className="h-3 w-3 text-envoy-blue flex-shrink-0" />
                              Cinematic Walkthrough Video
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Check className="h-3 w-3 text-envoy-blue flex-shrink-0" />
                              Zillow 3D Tour
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-center min-w-[60px]">
                          {formData.selectedPackage === "Professional Package" ? (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-envoy-blue">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          ) : (
                            <span className="text-xs font-medium text-envoy-blue group-hover:text-envoy-blue-hover">
                              Select
                            </span>
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Elite Package */}
                    <button
                      onClick={() => handlePackageSelect("Elite Package")}
                      className={`group relative w-full rounded-lg border p-5 text-left transition-all duration-200 hover:shadow-lg hover:shadow-envoy-blue/20 ${
                        formData.selectedPackage === "Elite Package"
                          ? "border-envoy-blue bg-envoy-blue/10"
                          : "border-white/10 bg-envoy-navy hover:border-envoy-blue"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-envoy-text mb-1">
                            Elite Package
                          </h3>
                          <p className="text-xs text-envoy-muted mb-3">
                            Premium marketing for luxury listings
                          </p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-envoy-text">
                            <span className="flex items-center gap-1.5">
                              <Check className="h-3 w-3 text-envoy-blue flex-shrink-0" />
                              Professional Photography
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Check className="h-3 w-3 text-envoy-blue flex-shrink-0" />
                              Complete property coverage
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Check className="h-3 w-3 text-envoy-blue flex-shrink-0" />
                              Cinematic Walkthrough Video
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Check className="h-3 w-3 text-envoy-blue flex-shrink-0" />
                              Agent-Guided Walkthrough
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Check className="h-3 w-3 text-envoy-blue flex-shrink-0" />
                              Matterport 3D Tour
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Check className="h-3 w-3 text-envoy-blue flex-shrink-0" />
                              Twilight/Dusk Photography
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-center min-w-[60px]">
                          {formData.selectedPackage === "Elite Package" ? (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-envoy-blue">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          ) : (
                            <span className="text-xs font-medium text-envoy-blue group-hover:text-envoy-blue-hover">
                              Select
                            </span>
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Vacation Rental Package */}
                    <button
                      onClick={() => handlePackageSelect("Vacation Rental Package")}
                      className={`group relative w-full rounded-lg border p-5 text-left transition-all duration-200 hover:shadow-lg hover:shadow-envoy-blue/20 ${
                        formData.selectedPackage === "Vacation Rental Package"
                          ? "border-envoy-blue bg-envoy-blue/10"
                          : "border-white/10 bg-envoy-navy hover:border-envoy-blue"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-envoy-text mb-1">
                            Vacation Rental Package
                          </h3>
                          <p className="text-xs text-envoy-muted mb-3">
                            Optimized for short-term rental marketing
                          </p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-envoy-text">
                            <span className="flex items-center gap-1.5">
                              <Check className="h-3 w-3 text-envoy-blue flex-shrink-0" />
                              Professional Photography
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Check className="h-3 w-3 text-envoy-blue flex-shrink-0" />
                              Property + amenity coverage
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Check className="h-3 w-3 text-envoy-blue flex-shrink-0" />
                              Lifestyle & detail shots
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Check className="h-3 w-3 text-envoy-blue flex-shrink-0" />
                              Zillow 3D Tour
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-center min-w-[60px]">
                          {formData.selectedPackage === "Vacation Rental Package" ? (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-envoy-blue">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          ) : (
                            <span className="text-xs font-medium text-envoy-blue group-hover:text-envoy-blue-hover">
                              Select
                            </span>
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Commercial Package */}
                    <button
                      onClick={() => handlePackageSelect("Commercial Package")}
                      className={`group relative w-full rounded-lg border p-5 text-left transition-all duration-200 hover:shadow-lg hover:shadow-envoy-blue/20 ${
                        formData.selectedPackage === "Commercial Package"
                          ? "border-envoy-blue bg-envoy-blue/10"
                          : "border-white/10 bg-envoy-navy hover:border-envoy-blue"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-envoy-text mb-1">
                            Commercial Package
                          </h3>
                          <p className="text-xs text-envoy-muted mb-3">
                            Custom pricing based on property size
                          </p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-envoy-text mb-2">
                            <span className="flex items-center gap-1.5">
                              <Check className="h-3 w-3 text-envoy-blue flex-shrink-0" />
                              Professional Photography
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Check className="h-3 w-3 text-envoy-blue flex-shrink-0" />
                              Complete building coverage
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Check className="h-3 w-3 text-envoy-blue flex-shrink-0" />
                              Zillow 3D Tour
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Check className="h-3 w-3 text-envoy-blue flex-shrink-0" />
                              Pricing varies by sq ft
                            </span>
                          </div>
                          <p className="text-xs text-envoy-blue italic">
                            Contact us for a custom quote
                          </p>
                        </div>
                        <div className="flex items-center justify-center min-w-[60px]">
                          {formData.selectedPackage === "Commercial Package" ? (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-envoy-blue">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          ) : (
                            <span className="text-xs font-medium text-envoy-blue group-hover:text-envoy-blue-hover">
                              Select
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Skip Button - Separated at bottom */}
                  <div className="mt-8 border-t border-white/10 pt-4">
                    <button
                      onClick={handleNext}
                      className="text-sm text-envoy-muted transition-colors hover:text-envoy-blue"
                    >
                      Skip and select services manually
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Property Type + Address */}
              {step === 2 && (
                <div
                  className={`animate-slide-${direction === "forward" ? "in-right" : "in-left"}`}
                >
                  <h2 className="mb-6 text-center font-serif text-2xl sm:text-3xl text-envoy-text">
                    Property Details
                  </h2>

                  {/* Property Type - Compact */}
                  <div className="mb-8">
                    <label className="mb-3 block text-sm font-medium text-envoy-muted">
                      Property Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {propertyTypes.map(({ label, icon: Icon }) => (
                        <button
                          key={label}
                          onClick={() => handlePropertyType(label)}
                          className={`group flex items-center gap-2 rounded-md border px-4 py-2 text-sm transition-all duration-200 ${
                            formData.propertyType === label
                              ? "border-envoy-blue bg-envoy-blue/10 text-envoy-blue"
                              : "border-white/10 bg-envoy-navy text-envoy-text hover:border-envoy-blue/50"
                          }`}
                        >
                          <Icon className="h-4 w-4 flex-shrink-0" />
                          <span className="font-medium">{label}</span>
                        </button>
                      ))}
                    </div>
                    {validationErrors.propertyType && (
                      <p className="mt-2 text-sm text-red-400">
                        {validationErrors.propertyType}
                      </p>
                    )}
                  </div>

                  {/* Property Address Fields - Main Focus */}
                  <div className="rounded-lg border border-envoy-blue/30 bg-envoy-blue/5 p-6">
                    <h3 className="mb-4 text-lg font-semibold text-envoy-text">
                      Property Address
                    </h3>
                    <div className="space-y-4">
                      {/* Street Address */}
                      <div>
                        <label
                          htmlFor="streetAddress"
                          className="mb-2 block text-sm font-medium text-envoy-text"
                        >
                          Street Address *
                        </label>
                        <input
                          type="text"
                          id="streetAddress"
                          value={formData.streetAddress}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              streetAddress: e.target.value,
                            })
                          }
                          className="w-full rounded-md border border-white/20 bg-envoy-navy px-4 py-3 text-envoy-text placeholder-envoy-muted transition-colors focus:border-envoy-blue focus:outline-none focus:ring-2 focus:ring-envoy-blue/20"
                          placeholder="123 Main Street"
                        />
                        {validationErrors.streetAddress && (
                          <p className="mt-1 text-sm text-red-400">
                            {validationErrors.streetAddress}
                          </p>
                        )}
                      </div>

                      {/* City */}
                      <div>
                        <label
                          htmlFor="city"
                          className="mb-2 block text-sm font-medium text-envoy-text"
                        >
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          value={formData.city}
                          onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                          }
                          className="w-full rounded-md border border-white/20 bg-envoy-navy px-4 py-3 text-envoy-text placeholder-envoy-muted transition-colors focus:border-envoy-blue focus:outline-none focus:ring-2 focus:ring-envoy-blue/20"
                          placeholder="Tampa"
                        />
                        {validationErrors.city && (
                          <p className="mt-1 text-sm text-red-400">
                            {validationErrors.city}
                          </p>
                        )}
                      </div>

                      {/* State and ZIP Code */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="state"
                            className="mb-2 block text-sm font-medium text-envoy-text"
                          >
                            State *
                          </label>
                          <select
                            id="state"
                            value={formData.state}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                state: e.target.value,
                              })
                            }
                            className="w-full rounded-md border border-white/20 bg-envoy-navy px-4 py-3 text-envoy-text transition-colors focus:border-envoy-blue focus:outline-none focus:ring-2 focus:ring-envoy-blue/20"
                          >
                            <option value="">Select</option>
                            {usStates.map((state) => (
                              <option key={state} value={state}>
                                {state}
                              </option>
                            ))}
                          </select>
                          {validationErrors.state && (
                            <p className="mt-1 text-sm text-red-400">
                              {validationErrors.state}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="zipCode"
                            className="mb-2 block text-sm font-medium text-envoy-text"
                          >
                            ZIP Code *
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            value={formData.zipCode}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                zipCode: e.target.value,
                              })
                            }
                            className="w-full rounded-md border border-white/20 bg-envoy-navy px-4 py-3 text-envoy-text placeholder-envoy-muted transition-colors focus:border-envoy-blue focus:outline-none focus:ring-2 focus:ring-envoy-blue/20"
                            placeholder="33601"
                            maxLength={10}
                          />
                          {validationErrors.zipCode && (
                            <p className="mt-1 text-sm text-red-400">
                              {validationErrors.zipCode}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button
                      onClick={handleStep1Next}
                      disabled={!canProceedFromStep1}
                      className="w-full"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Services */}
              {step === 3 && (
                <div
                  className={`animate-slide-${direction === "forward" ? "in-right" : "in-left"}`}
                >
                  <h2 className="mb-8 text-center font-serif text-2xl sm:text-3xl text-envoy-text">
                    Which services do you need?
                  </h2>
                  <div className="space-y-3">
                    {services.map(({ label, icon: Icon }) => (
                      <button
                        key={label}
                        onClick={() => handleServiceToggle(label)}
                        className={`flex w-full items-center gap-3 rounded-lg border p-4 transition-all duration-200 ${
                          formData.services.includes(label)
                            ? "border-envoy-blue bg-envoy-blue text-white"
                            : "border-white/20 bg-envoy-navy text-envoy-text hover:border-envoy-blue/50"
                        }`}
                      >
                        <Icon
                          className={`h-6 w-6 flex-shrink-0 ${
                            formData.services.includes(label)
                              ? "text-white"
                              : "text-envoy-blue"
                          }`}
                        />
                        <span className="flex-1 text-left">{label}</span>
                        {formData.services.includes(label) && (
                          <Check className="h-5 w-5 flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-4">
                    <Button
                      onClick={handleBack}
                      variant="ghost"
                      className="flex items-center gap-2"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!canProceedFromStep2}
                      className="flex-1"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Property Size */}
              {step === 4 && (
                <div
                  className={`animate-slide-${direction === "forward" ? "in-right" : "in-left"}`}
                >
                  <h2 className="mb-8 text-center font-serif text-2xl sm:text-3xl text-envoy-text">
                    How large is the property?
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {propertySizes.map(({ label, icon: Icon }) => (
                      <button
                        key={label}
                        onClick={() => handlePropertySize(label)}
                        className={`group flex min-h-[80px] items-center gap-3 rounded-lg border p-6 text-left transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-envoy-blue/20 ${
                          formData.propertySize === label
                            ? "border-envoy-blue bg-envoy-blue/10"
                            : "border-white/10 bg-envoy-navy hover:border-envoy-blue"
                        }`}
                      >
                        <Icon className="h-6 w-6 flex-shrink-0 text-envoy-blue" />
                        <span className="text-lg font-medium text-envoy-text group-hover:text-envoy-blue">
                          {label}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Square Footage Input - Shows when Commercial is selected */}
                  {formData.propertySize === "Commercial" && (
                    <div className="mt-6 animate-slide-in-right">
                      <label
                        htmlFor="squareFootage"
                        className="mb-2 block text-sm font-medium text-envoy-text"
                      >
                        Approximate Square Feet *
                      </label>
                      <input
                        type="number"
                        id="squareFootage"
                        value={formData.squareFootage}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            squareFootage: e.target.value,
                          })
                        }
                        className="w-full rounded-md border border-white/20 bg-envoy-navy px-4 py-3 text-envoy-text placeholder-envoy-muted transition-colors focus:border-envoy-blue focus:outline-none focus:ring-2 focus:ring-envoy-blue/20"
                        placeholder="e.g., 5000"
                        min="0"
                      />
                      {validationErrors.squareFootage && (
                        <p className="mt-1 text-sm text-red-400">
                          {validationErrors.squareFootage}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="mt-6 flex items-center justify-between">
                    <Button
                      onClick={handleBack}
                      variant="ghost"
                      className="flex items-center gap-2"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Back
                    </Button>
                    {formData.propertySize === "Commercial" && (
                      <Button
                        onClick={handleNext}
                        disabled={
                          !formData.squareFootage ||
                          formData.squareFootage.trim() === ""
                        }
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Step 5: Timeline + Specific Date */}
              {step === 5 && (
                <div
                  className={`animate-slide-${direction === "forward" ? "in-right" : "in-left"}`}
                >
                  <h2 className="mb-8 text-center font-serif text-2xl sm:text-3xl text-envoy-text">
                    When do you need this completed?
                  </h2>
                  <div className="grid gap-4">
                    {timelines.map(({ label, icon: Icon }) => (
                      <button
                        key={label}
                        onClick={() => handleTimeline(label)}
                        className={`group flex min-h-[80px] items-center gap-3 rounded-lg border p-6 text-left transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-envoy-blue/20 ${
                          formData.timeline === label
                            ? "border-envoy-blue bg-envoy-blue/10"
                            : "border-white/10 bg-envoy-navy hover:border-envoy-blue"
                        }`}
                      >
                        <Icon className="h-6 w-6 flex-shrink-0 text-envoy-blue" />
                        <span className="text-lg font-medium text-envoy-text group-hover:text-envoy-blue">
                          {label}
                        </span>
                      </button>
                    ))}
                  </div>
                  {validationErrors.timeline && (
                    <p className="mt-2 text-sm text-red-400">
                      {validationErrors.timeline}
                    </p>
                  )}

                  {/* Date & Time Pickers - Shows when "Specific Date" is selected */}
                  {formData.timeline === "Specific Date" && (
                    <div className="mt-6 space-y-4 animate-slide-in-right">
                      {/* Date Picker */}
                      <div>
                        <label
                          htmlFor="specificDate"
                          className="mb-2 block text-sm font-medium text-envoy-text"
                        >
                          Select Date *
                        </label>
                        <input
                          type="date"
                          id="specificDate"
                          min={today}
                          value={formData.specificDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              specificDate: e.target.value,
                            })
                          }
                          className="w-full rounded-md border border-white/20 bg-envoy-navy px-4 py-3 text-envoy-text transition-colors focus:border-envoy-blue focus:outline-none focus:ring-2 focus:ring-envoy-blue/20"
                        />
                        {validationErrors.specificDate && (
                          <p className="mt-1 text-sm text-red-400">
                            {validationErrors.specificDate}
                          </p>
                        )}
                      </div>

                      {/* Time Picker */}
                      <div>
                        <label
                          htmlFor="specificTime"
                          className="mb-2 block text-sm font-medium text-envoy-text"
                        >
                          Select Time *
                        </label>
                        <select
                          id="specificTime"
                          value={formData.specificTime}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              specificTime: e.target.value,
                            })
                          }
                          className="w-full rounded-md border border-white/20 bg-envoy-navy px-4 py-3 text-envoy-text transition-colors focus:border-envoy-blue focus:outline-none focus:ring-2 focus:ring-envoy-blue/20"
                        >
                          <option value="">Select a time</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                        {validationErrors.specificTime && (
                          <p className="mt-1 text-sm text-red-400">
                            {validationErrors.specificTime}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Deadline Date Picker - Shows when "Flexible / Not urgent" is selected */}
                  {formData.timeline === "Flexible / Not urgent" && (
                    <div className="mt-6 space-y-4 animate-slide-in-right">
                      <div>
                        <label
                          htmlFor="deadlineDate"
                          className="mb-2 block text-sm font-medium text-envoy-text"
                        >
                          Preferred Completion Date (Optional)
                        </label>
                        <p className="mb-2 text-xs text-envoy-muted">
                          Let us know when you'd ideally like this completed
                        </p>
                        <input
                          type="date"
                          id="deadlineDate"
                          min={today}
                          max={threeMonthsFromNow}
                          value={formData.deadlineDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              deadlineDate: e.target.value,
                            })
                          }
                          className="w-full rounded-md border border-white/20 bg-envoy-navy px-4 py-3 text-envoy-text transition-colors focus:border-envoy-blue focus:outline-none focus:ring-2 focus:ring-envoy-blue/20"
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex gap-4">
                    <Button
                      onClick={handleBack}
                      variant="ghost"
                      className="flex items-center gap-2"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleStep4Next}
                      disabled={!canProceedFromStep4}
                      className="flex-1"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 6: Contact Info (Updated - removed property address, phone required) */}
              {step === 6 && (
                <div
                  className={`animate-slide-${direction === "forward" ? "in-right" : "in-left"}`}
                >
                  <h2 className="mb-8 text-center font-serif text-2xl sm:text-3xl text-envoy-text">
                    How can we reach you?
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-envoy-text"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full rounded-md border border-white/20 bg-envoy-navy px-4 py-3 text-envoy-text placeholder-envoy-muted transition-colors focus:border-envoy-blue focus:outline-none focus:ring-2 focus:ring-envoy-blue/20"
                        placeholder="John Doe"
                      />
                      {validationErrors.name && (
                        <p className="mt-1 text-sm text-red-400">
                          {validationErrors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-envoy-text"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full rounded-md border border-white/20 bg-envoy-navy px-4 py-3 text-envoy-text placeholder-envoy-muted transition-colors focus:border-envoy-blue focus:outline-none focus:ring-2 focus:ring-envoy-blue/20"
                        placeholder="john@example.com"
                      />
                      {validationErrors.email && (
                        <p className="mt-1 text-sm text-red-400">
                          {validationErrors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-envoy-text"
                      >
                        Phone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full rounded-md border border-white/20 bg-envoy-navy px-4 py-3 text-envoy-text placeholder-envoy-muted transition-colors focus:border-envoy-blue focus:outline-none focus:ring-2 focus:ring-envoy-blue/20"
                        placeholder="(555) 123-4567"
                      />
                      {validationErrors.phone && (
                        <p className="mt-1 text-sm text-red-400">
                          {validationErrors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="notes"
                        className="mb-2 block text-sm font-medium text-envoy-text"
                      >
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        id="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        className="w-full rounded-md border border-white/20 bg-envoy-navy px-4 py-3 text-envoy-text placeholder-envoy-muted transition-colors focus:border-envoy-blue focus:outline-none focus:ring-2 focus:ring-envoy-blue/20"
                        placeholder="Any specific requirements?"
                      />
                    </div>
                    {/* Success Message */}
                    {submissionStatus === "success" && (
                      <div className="rounded-lg bg-envoy-blue/10 border border-envoy-blue/30 p-4 text-center">
                        <p className="text-envoy-blue font-medium">
                          Thank you! We'll be in touch within 24 hours.
                        </p>
                      </div>
                    )}

                    {/* Error Message */}
                    {submissionStatus === "error" && (
                      <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-4 text-center">
                        <p className="text-red-400 text-sm">{errorMessage}</p>
                      </div>
                    )}

                    <div className="flex gap-4 pt-2">
                      <Button
                        type="button"
                        onClick={handleBack}
                        variant="ghost"
                        className="flex items-center gap-2"
                        disabled={isSubmitting}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Back
                      </Button>
                      <Button
                        type="submit"
                        size="lg"
                        className="flex-1"
                        disabled={
                          isSubmitting || submissionStatus === "success"
                        }
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Sending...
                          </>
                        ) : submissionStatus === "success" ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Sent!
                          </>
                        ) : (
                          "Submit Quote Request"
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
