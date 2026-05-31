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

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { navigationItems } from "./nav-menu";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          className="bg-none shadow-none rounded-md border-none"
        >
          Menu
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[320px] p-0 flex flex-col h-full">
        <div className="flex items-center relative justify-between  min-h-25 gap-4 w-full max-h-[250px]">
          <div className="bg-black/80 absolute h-full w-full  z-2 inset-0 "></div>
          <Image
            src={"/download3.jpeg"}
            alt={"Profile"}
            fill
            className="object-cover"
          />{" "}
          <Link
            href="/"
            className={`font-display z-3 mx-auto w-20 text-2xl text-center font-semibold tracking-[0.18em] transition text-white`}
          >
            Animex
          </Link>
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
                          <Link
                            key={child.href}
                            href={child.href}
                            className="rounded-md px-3 py-2 text-sm hover:bg-muted"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-3 py-3 text-sm font-medium hover:bg-muted rounded-md"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </Accordion>
        </div>

        {/* Footer */}
        <div className="border-t p-4">
          <SheetClose asChild>
            <Button className="w-full" variant="outline">
              Close
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
