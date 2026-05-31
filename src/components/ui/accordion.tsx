"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { cn } from "@/lib/utils";

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col gap-3", className)}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        [
          "overflow-hidden rounded-[calc(var(--radius)+2px)]",
          "border border-border",
          "bg-surface",
          "transition-all duration-200",

          "hover:border-soft-border",
          "hover:bg-surface-strong",

          "data-[state=open]:bg-card",
          "data-[state=open]:shadow-[0_8px_24px_rgba(0,0,0,0.04)]",
        ].join(" "),
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          [
            "group/accordion-trigger flex w-full items-center justify-between",
            "gap-4 px-4 py-4",
            "text-left text-sm font-medium text-foreground",

            "outline-none transition-all duration-200",

            "focus-visible:ring-4",
            "focus-visible:ring-ring/20",
            "focus-visible:border-ring",

            "disabled:pointer-events-none disabled:opacity-50",

            "[&_svg]:shrink-0",
            "[&_svg]:transition-transform",
            "[&_svg]:duration-300",

            "data-[state=open]:text-primary",
          ].join(" "),
          className,
        )}
        {...props}
      >
        <span className="flex-1">{children}</span>

        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          className={cn(
            "size-4 text-muted-foreground",
            "group-data-[state=open]/accordion-trigger:rotate-180",
            "group-data-[state=open]/accordion-trigger:text-primary",
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        [
          "overflow-hidden",
          "text-sm text-muted-foreground",

          "data-[state=open]:animate-accordion-down",
          "data-[state=closed]:animate-accordion-up",
        ].join(" "),
      )}
      {...props}
    >
      <div
        className={cn(
          [
            "px-4 pb-4 pt-0",
            "leading-6",

            "[&_p:not(:last-child)]:mb-4",
            "[&_a]:font-medium",
            "[&_a]:text-primary",
            "[&_a]:underline-offset-4",
            "[&_a]:transition-colors",
            "[&_a:hover]:text-primary/80",
            "[&_a:hover]:underline",
          ].join(" "),
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
