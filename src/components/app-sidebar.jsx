'use client'

import { Book, Settings, Briefcase, Award, Bell, Users, Compass, BarChart, Pen, Home } from "lucide-react"
import "@/styles/global.css"
import { ChevronDown } from 'lucide-react';
import { useStore } from '@nanostores/react'
import { $userStore } from '@clerk/astro/client'
import { ClerkProvider, UserButton } from "@clerk/clerk-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  
} from "@/components/ui/sidebar"

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  
} from "@/components/ui/dropdown-menu"

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"

const ProfilIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
	<g fill="#080808" fill-rule="evenodd" clip-rule="evenodd">
		<path d="M8.25 9a3.75 3.75 0 1 1 7.5 0a3.75 3.75 0 0 1-7.5 0M12 6.75a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5" />
		<path d="M1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12S17.937 22.75 12 22.75S1.25 17.937 1.25 12M12 2.75a9.25 9.25 0 0 0-6.558 15.773c.18-.973.535-1.89 1.246-2.628C7.753 14.791 9.454 14.25 12 14.25s4.247.541 5.311 1.645c.712.738 1.066 1.656 1.247 2.629A9.25 9.25 0 0 0 12 2.75m5.194 16.905c-.102-1.212-.365-2.1-.962-2.719c-.65-.673-1.853-1.186-4.232-1.186s-3.582.513-4.232 1.186c-.597.62-.86 1.507-.962 2.72A9.2 9.2 0 0 0 12 21.25a9.2 9.2 0 0 0 5.194-1.595" />
	</g>
</svg>
);

const ShopIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
	<path fill="#080808" fill-rule="evenodd" d="M7.307 1.25c-.801 0-1.35 0-1.84.133a3.75 3.75 0 0 0-2.36 1.936c-.227.452-.334.991-.491 1.777l-.62 3.098a3.79 3.79 0 0 0 .754 3.117v2.745c0 1.838 0 3.294.153 4.433c.158 1.172.49 2.121 1.238 2.87c.748.748 1.697 1.08 2.87 1.238c1.139.153 2.595.153 4.432.153h1.113c1.838 0 3.294 0 4.433-.153c1.172-.158 2.121-.49 2.87-1.238c.748-.749 1.08-1.698 1.238-2.87c.153-1.14.153-2.595.153-4.433v-2.744a3.79 3.79 0 0 0 .753-3.118l-.62-3.098c-.156-.786-.264-1.325-.49-1.777a3.75 3.75 0 0 0-2.361-1.936c-.489-.133-1.038-.133-1.84-.133zm10.961 11.5a3.8 3.8 0 0 0 1.482-.298V14c0 1.907-.002 3.262-.14 4.29c-.135 1.005-.389 1.585-.812 2.008s-1.003.677-2.01.812a16 16 0 0 1-1.538.114v-2.756c0-.44 0-.82-.028-1.13c-.03-.33-.096-.656-.274-.963a2.25 2.25 0 0 0-.823-.824c-.307-.177-.633-.243-.963-.273c-.31-.028-.69-.028-1.13-.028h-.065c-.44 0-.819 0-1.13.028c-.33.03-.655.096-.962.273a2.25 2.25 0 0 0-.824.824c-.177.307-.243.633-.273.962c-.028.312-.028.691-.028 1.13v2.757a16 16 0 0 1-1.54-.114c-1.005-.135-1.585-.389-2.008-.812s-.677-1.003-.812-2.009c-.139-1.027-.14-2.382-.14-4.289v-1.548a3.81 3.81 0 0 0 4.588-1.306A3.9 3.9 0 0 0 12 12.75a3.9 3.9 0 0 0 3.162-1.604a3.8 3.8 0 0 0 3.106 1.604m-8.018 8.498q.582.002 1.25.002h1q.668 0 1.25-.002V18.5c0-.481-.001-.792-.022-1.027c-.02-.225-.055-.307-.079-.348a.75.75 0 0 0-.274-.274c-.041-.024-.123-.058-.348-.079A13 13 0 0 0 12 16.75c-.481 0-.792 0-1.027.022c-.226.02-.307.055-.348.079a.75.75 0 0 0-.275.274c-.023.04-.058.123-.078.348c-.021.235-.022.546-.022 1.027zM8.67 2.75H7.418c-.954 0-1.285.007-1.553.08a2.25 2.25 0 0 0-1.416 1.161c-.125.249-.196.571-.383 1.507l-.598 2.99a2.31 2.31 0 1 0 4.562.683l.069-.686l.004-.042zm.921 5.875l.588-5.875h3.642l.584 5.842a2.417 2.417 0 1 1-4.814.033m8.544-5.795c-.268-.073-.599-.08-1.553-.08h-1.254l.643 6.42a2.309 2.309 0 1 0 4.561-.682l-.597-2.99c-.188-.936-.259-1.258-.383-1.507a2.25 2.25 0 0 0-1.417-1.161" clip-rule="evenodd" />
</svg>
);

// Menu items.
const schubfach = [
  {
    title: "Profil",
    url: "/schubfach/home",
    icon: ProfilIcon,
  },
  {
    title: "Übungen",
    url: "/schubfach/uebungen",
    icon: Book,
  },
  {
    title: "Shop",
    url: "/schubfach/shop",
    icon: ShopIcon,
  },
  {
    title: "Erfolge",
    url: "#",
    icon: Compass,
  },
]

// Menu items.
const items = [
  {
    title: "Rangliste",
    url: "#",
    icon: BarChart,
  },
  {
    title: "Freunde",
    url: "#",
    icon: Users,
  },
  {
    title: "Notificationen",
    url: "Bell",
    icon: Bell,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  const currentUser = useStore($userStore)

  if (currentUser === null) {
    return <div>Not signed in</div>
  }

  return (
    
    <Sidebar collapsible="icon" side="left" variant="sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dein Schubfach</SidebarGroupLabel>
          <SidebarGroupContent>
          <TooltipProvider delayDuration={100}> {/* Nur einmal um die gesamte Liste */}
            <SidebarMenu>
                {schubfach.map((item) => (
                      <SidebarMenuItem>
                        <SidebarMenuButton  asChild>
                          <a className="mx-auto" href={item.url}>
                            <item.icon className=""/>
                            <span className="text-md" >{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </TooltipProvider>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Allgemines</SidebarGroupLabel>
          <SidebarGroupContent>
          <TooltipProvider delayDuration={100}>
            <SidebarMenu>
              {items.map((item) => (
                <Tooltip key={item.title}>
                  <TooltipTrigger> 
                    {/* Tooltip nur anzeigen, wenn Sidebar collapsed ist */}
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <div className="mx-auto">
                          <item.icon className=""/>
                          <span className="text-md">{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </TooltipTrigger>
                  <TooltipContent className="group-data-[collapsible=icon]:flex hidden" side="right" align="center">
                    <span className="text-md">{item.title}</span>
                  </TooltipContent>
                </Tooltip>
              ))}
            </SidebarMenu>
          </TooltipProvider>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
              <SidebarMenuButton size="lg" className="relative flex items-center overflow-visible mx-auto">
                <ClerkProvider publishableKey="pk_test_Zml0LXNraW5rLTk2LmNsZXJrLmFjY291bnRzLmRldiQ" afterSignOutUrl="/">
                  <UserButton />
                </ClerkProvider>
                <div className="font-bold group-hover:text-blue-600 transition-all flex justify-between w-full">
                  <div className="text-center group-data-[collapsible=icon]:hidden">{currentUser?.username}</div>
                </div>
              
              </SidebarMenuButton>
                
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width] mb-1"
                >
                  <DropdownMenuItem>
                    <span>   
                          
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}