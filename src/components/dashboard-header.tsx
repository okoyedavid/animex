"use client";

import { Suspense } from "react";

import Logo from "@/components/Logo";
import NavAuth from "@/components/navigation/nav-auth";
import NavMenu from "@/components/navigation/nav-menu";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardHeader() {
  return (
    <header className="fixed top-0 z-30 h-20 w-full border-b border-border bg-popover/95 shadow-cinema backdrop-blur-xl">
      <div className="flex h-full items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="ml-3 md:hidden" />
          <Logo />
        </div>

        <Suspense fallback={null}>
          <NavMenu />
        </Suspense>

        <div className="flex items-center">
          <NavAuth />
          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
