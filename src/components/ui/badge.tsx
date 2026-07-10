import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap rounded-md border border-transparent px-2 font-medium text-[11px] transition-all focus-visible:ring-2 focus-visible:ring-ring has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground [a]:hover:bg-primary-hover",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive [a]:hover:bg-destructive/20",
        ghost: "text-ink-subtle hover:bg-accent hover:text-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
        outline:
          "border-hairline-strong text-ink-muted [a]:hover:border-foreground/40 [a]:hover:text-foreground",
        secondary: "bg-accent text-ink-muted [a]:hover:text-foreground",
      },
    },
  }
);

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  });
}

export { Badge, badgeVariants };
