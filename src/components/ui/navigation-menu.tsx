"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";

import { cn } from "@/lib/utils";

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean;
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        [
          "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        ].join(" "),
        className,
      )}
      {...props}
    >
      {children}

      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        [
          "group flex flex-1 items-center justify-center gap-1.5",
          "rounded-[calc(var(--radius)+4px)]",

          "bg-surface/80",
          "backdrop-blur-md",
          "p-1.5",
        ].join(" "),
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  );
}

const navigationMenuTriggerStyle = cva(
  [
    "group inline-flex h-10 items-center justify-center gap-1",
    "rounded-[calc(var(--radius)-2px)]",
    "px-4 py-2",
    "text-sm font-medium",
    "text-foreground",

    "transition-all duration-200",
    "outline-none",

    "bg-transparent",

    "hover:bg-accent",
    "hover:text-accent-foreground",

    "focus-visible:ring-4",
    "focus-visible:ring-ring/20",
    "focus-visible:border-ring",

    "disabled:pointer-events-none disabled:opacity-50",

    "data-[state=open]:bg-primary/10",
    "data-[state=open]:text-primary",
    "data-[state=open]:shadow-[0_4px_14px_oklch(0.72_0.19_50_/_0.14)]",
  ].join(" "),
);

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), className)}
      {...props}
    >
      {children}

      <ChevronDownIcon
        className={cn(
          [
            "relative top-px size-3.5 shrink-0",
            "text-muted-foreground",
            "transition-transform duration-300",

            "group-data-[state=open]:rotate-180",
            "group-data-[state=open]:text-primary",
          ].join(" "),
        )}
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        [
          "top-0 left-0 w-full p-2 md:absolute md:w-auto",

          "data-[motion^=from-]:animate-in",
          "data-[motion^=to-]:animate-out",

          "data-[motion^=from-]:fade-in-0",
          "data-[motion^=to-]:fade-out-0",

          "data-[motion=from-end]:slide-in-from-right-10",
          "data-[motion=from-start]:slide-in-from-left-10",

          "data-[motion=to-end]:slide-out-to-right-10",
          "data-[motion=to-start]:slide-out-to-left-10",

          "duration-200",

          // Non viewport mode
          "group-data-[viewport=false]/navigation-menu:top-full",
          "group-data-[viewport=false]/navigation-menu:mt-2",

          "group-data-[viewport=false]/navigation-menu:overflow-hidden",
          "group-data-[viewport=false]/navigation-menu:rounded-[calc(var(--radius)+2px)]",

          "group-data-[viewport=false]/navigation-menu:border",
          "group-data-[viewport=false]/navigation-menu:border-border",

          "group-data-[viewport=false]/navigation-menu:bg-popover/95",
          "group-data-[viewport=false]/navigation-menu:text-popover-foreground",

          "group-data-[viewport=false]/navigation-menu:backdrop-blur-xl",

          "group-data-[viewport=false]/navigation-menu:shadow-[0_20px_60px_rgba(0,0,0,0.08)]",

          "group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95",
          "group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95",

          "**:data-[slot=navigation-menu-link]:focus:ring-0",
          "**:data-[slot=navigation-menu-link]:focus:outline-none",
        ].join(" "),
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div
      className={cn("absolute top-full left-0 z-50 flex w-full justify-center")}
    >
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          [
            "relative mt-3",
            "overflow-hidden",

            "origin-top-center",

            "h-[var(--radix-navigation-menu-viewport-height)]",
            "w-full md:w-[var(--radix-navigation-menu-viewport-width)]",

            "rounded-[calc(var(--radius)+4px)]",

            "bg-popover/95",
            "text-popover-foreground",

            "backdrop-blur-xl",

            "shadow-[0_24px_70px_rgba(0,0,0,0.10)]",

            "data-[state=open]:animate-in",
            "data-[state=closed]:animate-out",

            "data-[state=open]:zoom-in-95",
            "data-[state=closed]:zoom-out-95",

            "duration-200",
          ].join(" "),
          className,
        )}
        {...props}
      />
    </div>
  );
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        [
          "flex flex-col gap-1.5",
          "rounded-[calc(var(--radius)-4px)]",
          "p-3",

          "text-sm text-foreground",

          "transition-all duration-200",
          "outline-none",

          "hover:bg-accent",
          "hover:text-accent-foreground",

          "focus-visible:ring-4",
          "focus-visible:ring-ring/20",

          "data-[active=true]:bg-primary/10",
          "data-[active=true]:text-primary",

          "[&_svg:not([class*='size-'])]:size-4",
          "[&_svg:not([class*='text-'])]:text-muted-foreground",
        ].join(" "),
        className,
      )}
      {...props}
    />
  );
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        [
          "top-full z-[1] flex h-3 items-end justify-center overflow-hidden",

          "data-[state=visible]:animate-in",
          "data-[state=hidden]:animate-out",

          "data-[state=visible]:fade-in-0",
          "data-[state=hidden]:fade-out-0",

          "duration-200",
        ].join(" "),
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          [
            "relative top-[60%]",
            "size-3 rotate-45",

            "rounded-[2px]",

            "border-l border-t border-border",

            "bg-popover",
            "shadow-sm",
          ].join(" "),
        )}
      />
    </NavigationMenuPrimitive.Indicator>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};
