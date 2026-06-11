"use client";

import {
  CircleHelp,
  Bookmark,
  Home,
  Layers3,
  LayoutDashboard,
  Search,
  Settings,
} from "lucide-react";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";

import { getUser } from "@/api/auth";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Watchlist",
      url: "/watchlist",
      icon: Bookmark,
    },
    {
      title: "Search",
      url: "/search",
      icon: Search,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ],

  navSecondary: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Get Help",
      url: "/dashboard/settings",
      icon: CircleHelp,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userResponse } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const user = {
    name: userResponse?.data?.name ?? "Animex User",
    email: userResponse?.data?.email ?? "signed-in account",
    avatar: userResponse?.data?.avatar ?? "/avatar.png",
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/dashboard">
                <Layers3 className="size-5!" />
                <span className="text-base font-semibold">Animex</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
