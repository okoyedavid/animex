"use client";

import { getUser } from "@/api/auth";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { LayoutDashboard, Menu, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { navigationItems } from "./nav-menu";

export function MobileNav() {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  const user = data?.data;
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "AX";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="border-none bg-transparent shadow-none"
          aria-label="Open navigation menu"
          title="Open navigation menu"
        >
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex h-full w-[min(320px,calc(100vw-24px))] flex-col p-0">
        <div className="relative flex min-h-25 w-full items-center justify-between gap-4">
          <div className="absolute inset-0 z-[1] h-full w-full bg-black/80"></div>
          <Image
            src={"/download3.jpeg"}
            alt=""
            fill
            className="object-cover"
          />{" "}
          <SheetClose asChild>
            <Link
              href="/"
              className="font-display relative z-[2] mx-auto w-24 text-center text-2xl font-semibold tracking-[0.18em] text-white transition"
            >
              Animex
            </Link>
          </SheetClose>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          {user ? (
            <div className="mb-3 space-y-1 border-b pb-3">
              <SheetClose asChild>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium hover:bg-muted"
                >
                  <LayoutDashboard className="size-4" />
                  Dashboard
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium hover:bg-muted"
                >
                  <Settings className="size-4" />
                  Account settings
                </Link>
              </SheetClose>
            </div>
          ) : null}

          <Accordion type="multiple" className="w-full">
            {navigationItems.map((item) => (
              <div key={item.title}>
                {item.type === "dropdown" ? (
                  <AccordionItem value={item.title}>
                    <AccordionTrigger className="text-sm font-medium">
                      {item.title}
                    </AccordionTrigger>

                    <AccordionContent>
                      <div className="flex flex-col gap-1 pl-2">
                        {item.children?.map((child) => (
                          <SheetClose asChild key={child.href}>
                            <Link
                              href={child.href}
                              className="rounded-md px-3 py-2 text-sm hover:bg-muted"
                            >
                              {child.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ) : (
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      className="block rounded-md px-3 py-3 text-sm font-medium hover:bg-muted"
                    >
                      {item.title}
                    </Link>
                  </SheetClose>
                )}
              </div>
            ))}
          </Accordion>
        </div>

        {/* Footer */}
        {isLoading ? (
          <div className="flex items-center gap-3 border-t p-4">
            <div className="size-11 animate-pulse rounded-full bg-muted" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-4 w-28 animate-pulse rounded bg-muted" />
              <div className="h-3 w-40 max-w-full animate-pulse rounded bg-muted" />
            </div>
          </div>
        ) : user ? (
          <SheetClose asChild>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 border-t p-4 transition-colors hover:bg-muted"
            >
              <Avatar className="size-11 rounded-md">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-md">{initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-sm font-semibold">{user.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>
              <Settings className="size-4 shrink-0 text-muted-foreground" />
            </Link>
          </SheetClose>
        ) : (
          <div className="grid grid-cols-2 gap-2 border-t p-4">
            <SheetClose asChild>
              <Link
                href="/signup"
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "w-full px-2 text-center",
                )}
              >
                Create account
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/signin"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-full px-2 text-center",
                )}
              >
                Sign in
              </Link>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
