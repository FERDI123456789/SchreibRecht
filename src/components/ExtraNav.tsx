"use client"

import * as React from "react"
import { Calendar, Home, Inbox, Search, Book, Settings, Briefcase, Award, Bell, Users, Compass, BarChart, Pen, Edit } from "lucide-react"
import { cn } from "@/lib/utils"
import "@/styles/global.css"
import FunnFact from "@/components/funn-fact"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string; icons: React.ElementType; }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
    icons: Bell, // Example icon
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description: "For sighted users to preview content available behind a link.",
    icons: Search,
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description: "Displays an indicator showing the completion progress of a task.",
    icons: BarChart,
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description: "A set of layered sections of content displayed one at a time.",
    icons: Book,
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description: "A popup that displays information related to an element when hovered.",
    icons: Compass,
  },
];

const small: { title: string; href: string; description: string; icons: React.ElementType; }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
    icons: Bell, // Example icon
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description: "For sighted users to preview content available behind a link.",
    icons: Search,
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description: "Displays an indicator showing the completion progress of a task.",
    icons: BarChart,
  },
];

export function ExtraNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent> 
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gray-100 p-6 no-underline outline-none hover:bg-black hover:text-white hover:shadow-md hover:shadow-black hover:-translate-y-1 focus:shadow-md focus:shadow-black focus:bg-black focus:text-white focus:-translate-y-1 active:translate-y-0 transition-all duration-200"
                    href="/"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className=' size-9 inline-block' viewBox="0 0 512 512">hover:border-primary hover:shadow-md hover:shadow-primary
                      <path fill="#3B9EFF" d="M246 18.844c-2.157.02-4.292.068-6.406.156c-73.28 3.064-120.385 46.286-139.406 94.094c-11.706 29.42-12.328 60.463-1.813 84.78c10.515 24.32 31.522 42.552 66.906 47.845c18.85 2.818 37.402 5.89 55.314 9.5c59.88-25.15 71.217-72.16 86.625-115.19c7.735-21.602 16.277-42.437 33.874-56.655c12.758-10.31 29.792-16.212 52.47-16.563c-28.51-20.475-62.022-35.544-99.095-43.093c-17.22-3.507-33.372-5.024-48.47-4.876zm147.47 66.53c-19.04.243-31.413 5.12-40.626 12.564c-12.818 10.356-20.528 27.42-28.03 48.374c-13.216 36.904-26.567 85.154-75.752 115.282c42.035 10.47 78.926 24.997 105.188 47.5c21.364 18.306 35.342 42.586 37.406 72.75c1.54 22.492-3.3 47.973-15.25 77.187C477.462 385.23 506.27 291.847 488.844 209.75c-9.833-46.322-34.647-89.155-70.344-122.5c-9.447-1.382-17.738-1.968-25.03-1.875zm-308.376 15.44c-20.48 6.425-42.002 17.384-64.28 33.655l-.002 359.155h230.875c11.166-23.298 19.82-46.743 26.188-69.97c-34.545-1.148-67.374-12.59-94.563-31.06c-48.912-33.232-80.487-89.767-72.25-149.22c-13.442-10.208-23.455-23.32-29.843-38.094c-12.89-29.806-11.65-65.73 1.624-99.093c.717-1.802 1.46-3.587 2.25-5.374zm144.656 27.124c23.412 0 42.406 18.968 42.406 42.374s-18.994 42.375-42.406 42.375s-42.375-18.968-42.375-42.375c0-23.406 18.963-42.375 42.375-42.375zM128.78 254.125c-3.5 48.926 23.382 94.734 65.032 123.03c44.693 30.365 105.29 39.94 162.657 9.658a146 146 0 0 1-17.376-3.907c-13.214-17.616-20.057-42.566-18.688-63.187a70 70 0 0 1 1.5-10.533c-5.35-3.108-11.05-6.05-17.094-8.812c-1.66 5.77-2.648 11.858-3.062 18.094c-1.14 17.168 2.01 35.7 9.188 52.592c-35.888-20.445-55.414-55.432-58.22-88.875c-27.608-7.465-58.322-13.202-90.187-17.968c-12.5-1.87-23.76-5.332-33.75-10.095z" />
                    </svg>
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components that you can copy and
                      paste into your apps. Accessible. Customizable. Open
                      Source.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {small.map((small) => (
                <ListItem
                  key={small.title}
                  title={small.title}
                  href={small.href}
                  Icon={small.icons}
                >
                  {small.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[70%] md:grid-cols-4 md:grid-rows-3 lg:w-[900px] ">
              <li className="row-span-3 col-span-2">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gray-100 p-6 no-underline outline-none hover:bg-black hover:text-white hover:shadow-md hover:shadow-black hover:-translate-y-1 focus:shadow-md focus:shadow-black focus:bg-black focus:text-white focus:-translate-y-1 active:translate-y-0 transition-all duration-200"
                    href="/"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className=' size-9 inline-block' viewBox="0 0 512 512">
	<path fill="#3B9EFF" d="M246 18.844c-2.157.02-4.292.068-6.406.156c-73.28 3.064-120.385 46.286-139.406 94.094c-11.706 29.42-12.328 60.463-1.813 84.78c10.515 24.32 31.522 42.552 66.906 47.845c18.85 2.818 37.402 5.89 55.314 9.5c59.88-25.15 71.217-72.16 86.625-115.19c7.735-21.602 16.277-42.437 33.874-56.655c12.758-10.31 29.792-16.212 52.47-16.563c-28.51-20.475-62.022-35.544-99.095-43.093c-17.22-3.507-33.372-5.024-48.47-4.876zm147.47 66.53c-19.04.243-31.413 5.12-40.626 12.564c-12.818 10.356-20.528 27.42-28.03 48.374c-13.216 36.904-26.567 85.154-75.752 115.282c42.035 10.47 78.926 24.997 105.188 47.5c21.364 18.306 35.342 42.586 37.406 72.75c1.54 22.492-3.3 47.973-15.25 77.187C477.462 385.23 506.27 291.847 488.844 209.75c-9.833-46.322-34.647-89.155-70.344-122.5c-9.447-1.382-17.738-1.968-25.03-1.875zm-308.376 15.44c-20.48 6.425-42.002 17.384-64.28 33.655l-.002 359.155h230.875c11.166-23.298 19.82-46.743 26.188-69.97c-34.545-1.148-67.374-12.59-94.563-31.06c-48.912-33.232-80.487-89.767-72.25-149.22c-13.442-10.208-23.455-23.32-29.843-38.094c-12.89-29.806-11.65-65.73 1.624-99.093c.717-1.802 1.46-3.587 2.25-5.374zm144.656 27.124c23.412 0 42.406 18.968 42.406 42.374s-18.994 42.375-42.406 42.375s-42.375-18.968-42.375-42.375c0-23.406 18.963-42.375 42.375-42.375zM128.78 254.125c-3.5 48.926 23.382 94.734 65.032 123.03c44.693 30.365 105.29 39.94 162.657 9.658a146 146 0 0 1-17.376-3.907c-13.214-17.616-20.057-42.566-18.688-63.187a70 70 0 0 1 1.5-10.533c-5.35-3.108-11.05-6.05-17.094-8.812c-1.66 5.77-2.648 11.858-3.062 18.094c-1.14 17.168 2.01 35.7 9.188 52.592c-35.888-20.445-55.414-55.432-58.22-88.875c-27.608-7.465-58.322-13.202-90.187-17.968c-12.5-1.87-23.76-5.332-33.75-10.095z" />
</svg>
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components that you can copy and
                      paste into your apps. Accessible. Customizable. Open
                      Source.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li className="row-span-3 col-span-2">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gray-100 p-6 no-underline outline-none hover:bg-black hover:text-white hover:shadow-md hover:shadow-black hover:-translate-y-1 focus:shadow-md focus:shadow-black focus:bg-black focus:text-white focus:-translate-y-1 active:translate-y-0 transition-all duration-200"
                    href="/"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className=' size-9 inline-block' viewBox="0 0 24 24">
	<path fill="#0ea5e9" d="M2 8v11.529S6.621 19.357 12 22c5.379-2.643 10-2.471 10-2.471V8s-5.454 0-10 2.471C7.454 8 2 8 2 8" />
	<circle cx="12" cy="5" r="3" fill="#0ea5e9" />
</svg>
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components that you can copy and
                      paste into your apps. Accessible. Customizable. Open
                      Source.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  Icon={component.icons}
                >
                  {component.description}
                </ListItem>
              ))}
              


            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, Icon, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 p-3 leading-none no-underline outline-none hover:bg-black hover:text-white hover:shadow-md hover:shadow-black hover:-translate-y-1 focus:shadow-md focus:shadow-black focus:bg-black focus:text-white focus:-translate-y-1 active:translate-y-0 rounded-md   transition-all duration-200",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none"><Icon className="size-4 inline-block mr-1"/> {title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
