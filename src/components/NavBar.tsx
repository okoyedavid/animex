"use client";
import Logo from "./Logo";

import NavAuth from "./navigation/nav-auth";
import NavMenu from "./navigation/nav-menu";

function NavBar() {
  return (
    <header className="fixed top-0 z-30 h-20 w-full">
      <div className="flex flex-col gap-4 border-b-2 border-primary/30 bg-popover shadow-cinema backdrop-blur-xl  lg:flex-row lg:justify-between">
        <Logo />
        <NavMenu />
        <NavAuth />
      </div>
    </header>
  );
}

export default NavBar;
