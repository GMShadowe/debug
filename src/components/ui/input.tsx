import { Input as InputPrimitive } from "@base-ui/react/input";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      className={cn(
        "h-9 w-full min-w-0 rounded-md border border-input bg-background px-3 text-[13px] outline-none transition-[color,box-shadow,border-color] duration-150 file:inline-flex file:h-6 file:border-0 file:bg-transparent file:font-medium file:text-[13px] file:text-foreground placeholder:text-ink-tertiary focus-visible:border-hairline-strong focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 md:text-[13px]",
        className
      )}
      data-slot="input"
      type={type}
      {...props}
    />
  );
}

export { Input };
