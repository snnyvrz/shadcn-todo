import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const progressVariants = cva(
  "relative h-2 w-full overflow-hidden rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary/20",
        success: "bg-success/20",
        error: "bg-error/20",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

const indicatorVariant = cva("h-full w-full flex-1 transition-all", {
  variants: {
    variant: {
      default: "bg-primary",
      success: "bg-success",
      error: "bg-error",
    },
  },
  defaultVariants: { variant: "default" },
});

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> &
    VariantProps<typeof progressVariants>
>(({ className, value, variant, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(progressVariants({ variant }), className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(indicatorVariant({ variant }))}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
