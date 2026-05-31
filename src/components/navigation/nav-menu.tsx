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

export const navigationItems = [
  {
    title: "Anime",
    href: "/anime",
    type: "dropdown",
    children: [
      { label: "Popular Anime", href: "/anime/popular" },
      { label: "Top Rated", href: "/anime/top-rated" },
      { label: "Seasonal", href: "/anime/seasonal" },
      { label: "Genres", href: "/anime/genres" },
    ],
  },
  {
    title: "Reviews",
    href: "/reviews",
    type: "dropdown",
    children: [
      { label: "Latest Reviews", href: "/reviews/latest" },
      { label: "Top Critics", href: "/reviews/top" },
      { label: "User Reviews", href: "/reviews/user" },
    ],
  },
  {
    title: "Watchlist",
    href: "/watchlist",
    type: "link",
  },
];

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

  return (
    <div className="flex gap-3  px-4 py-4 sm:px-6">
      <NavigationMenu className="hidden lg:block">
        <NavigationMenuList className="flex gap-6">
          {navigationItems.map((item) => (
            <NavigationMenuItem key={item.title}>
              {item.type === "dropdown" ? (
                <>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    {item.title}
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <div className="w-[220px] p-2 space-y-1">
                      {item.children?.map((child) => (
                        <NavigationMenuLink asChild key={child.href}>
                          <Link
                            href={child.href}
                            className={cn(
                              "block rounded-md px-3 py-2 text-sm hover:bg-muted transition",
                            )}
                          >
                            {child.label}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className="text-sm font-medium hover:text-primary"
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
