"use client";
import Logo from "./Logo";
import { MobileNav } from "./navigation/mobile-nav";

import NavAuth from "./navigation/nav-auth";
import NavMenu from "./navigation/nav-menu";

function NavBar() {
  return (
    <header className="fixed top-0 z-30 h-20 w-full">
      <div className="flex gap-4 bg-popover shadow-cinema backdrop-blur-xl  justify-between lg:flex-row">
        <Logo />
        <NavMenu />
        <NavAuth />
        <div className="lg:hidden my-auto">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

export default NavBar;
