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
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { navigationItems } from "./nav-menu";

export function MobileNav() {
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
      </SheetContent>
    </Sheet>
  );
}
