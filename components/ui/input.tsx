import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-10 w-full rounded border border-surface-border bg-surface px-3 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-signal/60",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
