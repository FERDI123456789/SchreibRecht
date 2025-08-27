"use client"

import {
  type LucideIcon,
} from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {projects.map((item) => (
            <div>
                <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild size="sm">
                        <a href={item.url}>
                        <item.icon />
                        <span className="text-sm">{item.name}</span>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </div>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
