import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@shadcn/lib/utils";
import { twMerge } from "tailwind-merge";
interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;
  variant?: "primary" | "orange";
}
type Variant = "primary" | "orange";

const variants: Record<Variant, string> = {
  primary: "bg-primary",
  orange: "bg-orange"
};

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, variant = "primary", ...props }, ref) => {
  const baseClass =
    "h-full w-full flex-1 transition-all rounded-full bg-secondary";
  const variantClass = twMerge(baseClass, variants[variant]);
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(variantClass, className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1  transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
