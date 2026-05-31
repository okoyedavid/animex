"use client";
import { getUser } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

export default function NavAuth() {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  if (isLoading) {
    return (
      <div className="hidden lg:flex lg:items-center px-4 py-4 sm:px-6 lg:gap-3">
        <div className="h-9 w-9 animate-pulse rounded-sm bg-white/10" />
        <div className="h-4 w-24 animate-pulse rounded-sm bg-white/10" />
      </div>
    );
  }

  if (isSuccess && data.data) {
    const user = {
      ...data?.data,
      profilePhoto: data.data.avatar || "/default-profile.jpeg",
    };
    return (
      <div className="hidden lg:flex lg:items-center px-4 py-4 sm:px-6 lg:gap-3">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-2.5 rounded-sm border border-white/10 px-3 py-1.5 text-sm transition hover:border-white/25 hover:bg-white/5"
        >
          <span className="max-w-30 truncate font-bold text-lg">
            {`${user.name.charAt(0).toUpperCase()}${user.name.slice(1)} `}
          </span>
          <div className="relative h-12 w-12 overflow-hidden rounded-sm ring-2 shadow-sm ring-primary/20">
            <Image
              src={user.profilePhoto}
              alt={user.name ?? "Profile"}
              fill
              className="object-cover"
            />
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex lg:items-center px-4 py-4 sm:px-6 lg:gap-3">
      <Link href="/signup">
        <Button variant="secondary" size="lg">
          Create account
        </Button>
      </Link>
      <Link href="/signin">
        <Button variant="ghost" size="lg">
          Sign in
        </Button>
      </Link>
    </div>
  );
}
