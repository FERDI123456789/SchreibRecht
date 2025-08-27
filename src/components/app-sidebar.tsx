"use client"

import * as React from "react"
import {
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  SquarePen,
} from "lucide-react"

import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ClerkProvider } from "@clerk/clerk-react"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  projects: [
    {
      name: "Übungen",
      url: "/schubfach/uebungen",
      icon: Frame,
    },
    {
      name: "Shop",
      url: "/schubfach/uebungen",
      icon: PieChart,
    },
    {
      name: "Einstelugen",
      url: "#",
      icon: Map,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
  <ClerkProvider publishableKey={import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY!}>
    <Sidebar className="" collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="bg-white rounded-lg shadow-sm" size="lg" asChild>
              <a href="#">
                <div className=" text-sidebar-primary-foreground flex aspect-square size-8 items-center rounded-lg justify-center">
                  <Command className="size-4 text-black" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">SchreibRecht</span>
                  <span className="truncate text-xs">Normal</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  </ClerkProvider>
  )
}
