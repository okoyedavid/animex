import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import * as Slot from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    // Base
    "group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap",
    "font-medium text-sm transition-all duration-200",
    "outline-none select-none",
    "rounded-[calc(var(--radius)-2px)]",
    "border border-transparent",
    "shadow-[0_1px_2px_rgba(0,0,0,0.04)]",

    // Interaction
    "focus-visible:ring-4 focus-visible:ring-ring/20",
    "focus-visible:border-ring",
    "active:scale-[0.985]",
    "disabled:pointer-events-none disabled:opacity-50",

    // Invalid state
    "aria-invalid:border-destructive",
    "aria-invalid:ring-4 aria-invalid:ring-destructive/20",

    // SVG handling
    "[&_svg]:pointer-events-none",
    "[&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-primary-foreground",
          "border-transparent",
          "shadow-[0_6px_18px_oklch(0.72_0.19_50_/_0.22)]",

          "hover:brightness-[1.03]",
          "hover:shadow-[0_10px_24px_oklch(0.72_0.19_50_/_0.32)]",

          "active:shadow-[0_4px_12px_oklch(0.72_0.19_50_/_0.2)]",
        ].join(" "),

        secondary: [
          "bg-secondary text-secondary-foreground",
          "border-border",

          "hover:bg-accent",
          "hover:text-accent-foreground",

          "active:bg-muted",
        ].join(" "),

        outline: [
          "bg-surface text-foreground",
          "border-border",

          "hover:bg-surface-strong",
          "hover:border-soft-border",

          "active:bg-surface-muted",
        ].join(" "),

        ghost: [
          "bg-transparent text-foreground",

          "hover:bg-accent",
          "hover:text-accent-foreground",

          "active:bg-muted",
        ].join(" "),

        destructive: [
          "bg-destructive text-destructive-foreground",
          "shadow-[0_6px_18px_oklch(0.62_0.23_28_/_0.22)]",

          "hover:brightness-110",
          "hover:shadow-[0_10px_24px_oklch(0.62_0.23_28_/_0.28)]",
        ].join(" "),

        link: [
          "bg-transparent shadow-none",
          "text-primary underline-offset-4",

          "hover:underline",
          "hover:text-primary/90",
        ].join(" "),
      },

      size: {
        default:
          "h-10 px-4 gap-2 has-data-[icon=inline-start]:pl-3 has-data-[icon=inline-end]:pr-3",

        xs: [
          "h-7 px-2.5 gap-1",
          "text-xs rounded-[calc(var(--radius)-6px)]",
          "[&_svg:not([class*='size-'])]:size-3",
        ].join(" "),

        sm: [
          "h-8 px-3 gap-1.5",
          "text-sm rounded-[calc(var(--radius)-5px)]",
          "[&_svg:not([class*='size-'])]:size-3.5",
        ].join(" "),

        lg: ["h-11 px-5 gap-2", "text-base rounded-[calc(var(--radius))]"].join(
          " ",
        ),

        icon: "size-10",

        "icon-xs":
          "size-7 rounded-[calc(var(--radius)-6px)] [&_svg:not([class*='size-'])]:size-3",

        "icon-sm":
          "size-8 rounded-[calc(var(--radius)-5px)] [&_svg:not([class*='size-'])]:size-3.5",

        "icon-lg":
          "size-11 rounded-[calc(var(--radius))] [&_svg:not([class*='size-'])]:size-5",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
