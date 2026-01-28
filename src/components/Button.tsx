import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-coastal focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep disabled:pointer-events-none disabled:opacity-50 font-sans active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-coastal to-blue-coastal-hover text-white shadow-lg shadow-blue-coastal/30 hover:shadow-xl hover:shadow-blue-coastal/40 hover:scale-105 hover:brightness-110",
        outline:
          "border-2 border-blue-coastal text-blue-coastal bg-transparent hover:bg-blue-coastal/10 hover:scale-105",
        ghost: "hover:bg-blue-coastal/10 hover:text-blue-coastal",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8 text-base",
        xl: "h-14 rounded-md px-10 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
