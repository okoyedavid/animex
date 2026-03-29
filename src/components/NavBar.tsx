"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bookmark, Command, Search } from "lucide-react";
import Logo from "../common/Logo";
import { useKey } from "../hooks/useKey";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function NavBar() {
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
    <header className="fixed top-0 z-30 w-full px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-surface/90 px-4 py-4 shadow-cinema backdrop-blur-xl sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Logo />
          </div>

          <Link
            href="/signin"
            className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-white/25 hover:bg-white/5 hover:text-white lg:hidden"
          >
            Sign in
          </Link>
        </div>

        <div className="flex flex-1 flex-col gap-3 lg:max-w-3xl">
          <form className="relative" onSubmit={handleSubmit}>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              className="min-h-14 w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-28 text-white outline-none transition placeholder:text-slate-400 focus:border-accent-soft focus:ring-4 focus:ring-accent/10"
              type="text"
              placeholder="Search anime, studios, or a vibe"
              aria-describedby="searchBar"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              ref={search}
            />
            <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2 rounded-full border border-white/10 bg-surface-strong px-3 py-1 text-xs text-slate-300">
              <Command size={14} />
              <span>Enter</span>
            </div>
          </form>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <Link
            href="/watchlist"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
          >
            <Bookmark size={16} />
            Watchlist
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
          >
            Create account
          </Link>
          <Link
            href="/signin"
            className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-accent-soft"
          >
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
