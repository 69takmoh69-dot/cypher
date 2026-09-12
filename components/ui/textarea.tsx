import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-24 w-full rounded border border-surface-border bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-signal/60",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
