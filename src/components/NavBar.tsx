"use client";
import Logo from "./Logo";
import { MobileNav } from "./navigation/mobile-nav";

import NavAuth from "./navigation/nav-auth";
import NavMenu from "./navigation/nav-menu";

function NavBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 h-20 border-b border-border bg-popover/95 shadow-cinema backdrop-blur-xl">
      <div className="flex h-full min-w-0 items-stretch">
        <Logo />
        <NavMenu />
        <NavAuth />
        <div className="flex shrink-0 items-center pr-2 sm:pr-4 xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

export default NavBar;
