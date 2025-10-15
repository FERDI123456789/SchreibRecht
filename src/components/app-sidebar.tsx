"use client";

import * as React from "react";
import {
  Command,
  Frame,
  LifeBuoy,
  Send,
  ShoppingBag,
  Home,
  Settings,
} from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
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
import { currentView } from "@/stores/viewStore";
import { ClerkProvider } from "@clerk/clerk-react";
import { useStore } from "@nanostores/react";

// ✅ Make this type match your store exactly
type ViewName = "home" | "uebungen" | "shop" | "einstelugen";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  projects: [
    {
      name: "Home",
      path: "/schubfach/home",
      icon: Home,
      view: "home" as ViewName,
    },
    {
      name: "Übungen",
      path: "/schubfach/uebungen",
      icon: Frame,
      view: "uebungen" as ViewName,
    },
    {
      name: "Shop",
      path: "/schubfach/shop",
      icon: ShoppingBag,
      view: "shop" as ViewName,
    },
    {
      name: "Einstelugen",
      path: "/schubfach/einstelugen",
      icon: Settings,
      view: "einstelugen" as ViewName,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      path: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      path: "#",
      icon: Send,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const view = useStore(currentView); // ✅ subscribe to changes

  React.useEffect(() => {
    console.log("Current view changed:", view);
  }, [view]); // ✅ runs every time view changes

  const handleNavClick = (viewName: ViewName) => {
    currentView.set(viewName);
  };

  const modifiedProjects = data.projects.map((project) => ({
    ...project,
    onClick: () => handleNavClick(project.view),
  }));

  return (
    <ClerkProvider
      publishableKey={import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <Sidebar className="" collapsible="icon" variant="inset" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="bg-white rounded-lg shadow-sm"
                size="lg"
                asChild
              >
                <a href="#">
                  <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center rounded-lg justify-center">
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
          <NavProjects projects={modifiedProjects} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
      </Sidebar>
    </ClerkProvider>
  );
}
