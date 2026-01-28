import { useEffect, useRef, useState } from "react";
import { Home, Building2, Key, MapPin } from "lucide-react";

// ─── Scroll Animation Hook ───────────────────────────────────────────────────
export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// ─── Floating Geometric Shapes ───────────────────────────────────────────────
export function FloatingShapes({ variant = "default" }: { variant?: "default" | "hero" | "cta" }) {
  const shapes = variant === "hero" ? (
    <>
      <div className="absolute -top-20 -right-20 h-[400px] w-[400px] rounded-full bg-blue-coastal/5 blur-3xl" />
      <div className="absolute top-1/3 -left-32 h-[300px] w-[300px] rounded-full bg-blue-coastal/8 blur-3xl" />
      <div className="absolute bottom-20 right-1/4 h-[200px] w-[200px] rotate-45 bg-blue-coastal/5 blur-2xl" />
    </>
  ) : variant === "cta" ? (
    <>
      <div className="absolute -top-32 left-1/4 h-[350px] w-[350px] rounded-full bg-blue-coastal/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-blue-coastal/8 blur-3xl" />
    </>
  ) : (
    <>
      <div className="absolute -top-16 -right-16 h-[250px] w-[250px] rounded-full bg-blue-coastal/5 blur-3xl" />
      <div className="absolute bottom-0 -left-16 h-[200px] w-[200px] rounded-full bg-blue-coastal/5 blur-3xl" />
    </>
  );

  return <div className="pointer-events-none absolute inset-0 overflow-hidden">{shapes}</div>;
}

// ─── Icon Watermarks ─────────────────────────────────────────────────────────
const watermarkIcons = [Home, Building2, Key, MapPin];

export function IconWatermark({ icon = 0, position = "top-right" }: { icon?: number; position?: string }) {
  const Icon = watermarkIcons[icon % watermarkIcons.length];
  const posClasses: Record<string, string> = {
    "top-right": "top-10 right-10",
    "top-left": "top-10 left-10",
    "bottom-right": "bottom-10 right-10",
    "bottom-left": "bottom-10 left-10",
    "center-right": "top-1/2 -translate-y-1/2 right-10",
    "center-left": "top-1/2 -translate-y-1/2 left-10",
  };

  return (
    <div className={`pointer-events-none absolute ${posClasses[position] || posClasses["top-right"]} opacity-[0.03]`}>
      <Icon className="h-48 w-48 text-blue-coastal md:h-64 md:w-64" strokeWidth={0.5} />
    </div>
  );
}

// ─── Dotted Grid Pattern ─────────────────────────────────────────────────────
export function DottedGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: "radial-gradient(circle, #6BA9DB 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }}
    />
  );
}

// ─── Corner Accents ──────────────────────────────────────────────────────────
export function CornerAccents() {
  const corner = "absolute w-8 h-8 border-blue-coastal/30";
  return (
    <>
      <div className={`${corner} top-4 left-4 border-t-2 border-l-2`} />
      <div className={`${corner} top-4 right-4 border-t-2 border-r-2`} />
      <div className={`${corner} bottom-4 left-4 border-b-2 border-l-2`} />
      <div className={`${corner} bottom-4 right-4 border-b-2 border-r-2`} />
    </>
  );
}

// ─── Section Divider ─────────────────────────────────────────────────────────
export function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-coastal/30" />
      <div className="h-1.5 w-1.5 rounded-full bg-blue-coastal/40" />
      <div className="h-px w-24 bg-blue-coastal/30" />
      <div className="h-1.5 w-1.5 rounded-full bg-blue-coastal/40" />
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-coastal/30" />
    </div>
  );
}

// ─── Noise Overlay ───────────────────────────────────────────────────────────
export function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.025]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
      }}
    />
  );
}
