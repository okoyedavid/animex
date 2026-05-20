"use client";
import { Command, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useKey } from "../../hooks/useKey";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

export default function NavMenu() {
  const search = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(currentQuery);

  useEffect(() => {
    setQuery(currentQuery);
  }, [currentQuery]);

  useKey("Enter", () => {
    if (document.activeElement === search.current) return;
    search.current?.focus();
  });

  useEffect(() => {
    if (pathname === "/search") {
      search.current?.focus();
    }
  }, [pathname]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      router.push("/search");
      return;
    }

    const params = new URLSearchParams();
    params.set("q", normalizedQuery);
    router.push(`/search?${params.toString()}`);
  };
  const navigationItems = [
    { title: "Anime", href: "/anime", hasDropdown: true },
    { title: "Reviews", href: "/reviews", hasDropdown: true },
    { title: "Watchlist", href: "/watchlist", hasDropdown: false },
  ];
  return (
    <div className="flex gap-3  px-4 py-4 sm:px-6">
      <NavigationMenu>
        <NavigationMenuList className="flex space-x-6">
          {navigationItems.map((item) => (
            <NavigationMenuItem key={item.title}>
              {item.hasDropdown ? (
                <>
                  <NavigationMenuTrigger
                    className={cn("text-sm font-medium transition-colors")}
                  >
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {/* <ShopDropDown type={item.title} /> */}
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink asChild>
                  <Link
                    className={cn(
                      "block select-none rounded-md px-3 py-2 text-sm font-medium leading-none no-underline outline-none transition-colors",
                    )}
                    href={item.href}
                  >
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <form className="relative" onSubmit={handleSubmit}>
        <Search
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
          size={18}
        />
        <Input
          className="min-h-14 w-full rounded-2xl pl-11 pr-28"
          type="text"
          placeholder="Search anime, studios, or a vibe"
          aria-describedby="searchBar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={search}
        />
        <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2 rounded-sm border border-white/10 bg-surface-strong px-3 py-1 text-xs">
          <Command size={14} />
          <span>Enter</span>
        </div>
      </form>
    </div>
  );
}
