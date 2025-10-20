"use client";

import * as React from "react";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Book,
  Settings,
  Briefcase,
  Award,
  Bell,
  Users,
  Compass,
  BarChart,
  Pen,
  Edit,
  Moon,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useState, useRef, useEffect, useCallback } from "react";

// Debounce hook
function useDebounce(callback: Function, delay: number) {
  const timer = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: any[]) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
}

const components: {
  title: string;
  href: string;
  description: string;
  icons: React.ElementType;
}[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
    icons: Bell,
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
    icons: Search,
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task.",
    icons: BarChart,
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content displayed one at a time.",
    icons: Book,
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when hovered.",
    icons: Compass,
  },
];

const small: {
  title: string;
  href: string;
  description: string;
  icons: React.ElementType;
}[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
    icons: Bell,
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
    icons: Search,
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task.",
    icons: BarChart,
  },
];

const navItems = ["Getting started", "Components", "Documentation"];

export function ExtraNav() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lastPosition, setLastPosition] = useState<{
    left: number;
    width: number;
  } | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [hoverStyle, setHoverStyle] = useState({});

  // Debounced hover handlers
  const debouncedSetHoveredIndex = useDebounce(setHoveredIndex, 10);

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = itemRefs.current[hoveredIndex];
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement;
        // Only update lastPosition if it's a new position
        if (
          !lastPosition ||
          lastPosition.left !== offsetLeft ||
          lastPosition.width !== offsetWidth
        ) {
          setLastPosition({ left: offsetLeft, width: offsetWidth });
        }
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
          opacity: 1,
          transition: "all 200ms ease",
        });
      }
    } else if (lastPosition) {
      // Keep the last position but fade out
      setHoverStyle({
        left: `${lastPosition.left}px`,
        width: `${lastPosition.width}px`,
        opacity: 0,
        transition: "opacity 200ms ease",
      });
    }
  }, [hoveredIndex]);

  return (
    <div className="flex w-full items-center justify-center">
      <div className="relative w-full max-w-[1200px]">
        <NavigationMenu>
          <NavigationMenuList className="relative flex items-center space-x-[6px]">
            {/* Hover Highlight */}
            <div
              className="pointer-events-none absolute top-[2px] h-[30px] rounded-md border border-white/20 bg-white/10 shadow-lg backdrop-blur-md transition-all duration-300"
              style={hoverStyle}
            />

            {navItems.map((item, index) => (
              <NavigationMenuItem
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                onMouseEnter={() => debouncedSetHoveredIndex(index)}
                onMouseLeave={() => debouncedSetHoveredIndex(null)}
              >
                <NavigationMenuTrigger
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "relative z-10 h-[30px] px-3 py-2 text-black dark:text-[#ffffff99]",
                  )}
                >
                  <div className="flex h-full items-center justify-center whitespace-nowrap text-sm font-[var(--www-mattmannucci-me-geist-regular-font-family)] leading-5">
                    {item}
                  </div>
                </NavigationMenuTrigger>
                {item === "Getting started" && (
                  <NavigationMenuContent
                    onMouseEnter={() => debouncedSetHoveredIndex(index)}
                    onMouseLeave={() => debouncedSetHoveredIndex(null)}
                  >
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            href="#"
                            className="group relative z-10 flex h-full w-full flex-col justify-between overflow-hidden rounded-md bg-gray-100 p-6 no-underline outline-none transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-md"
                          >
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="inline-block size-9"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="#0ea5e9"
                                  d="M2 8v11.529S6.621 19.357 12 22c5.379-2.643 10-2.471 10-2.471V8s-5.454 0-10 2.471C7.454 8 2 8 2 8"
                                />
                                <circle cx="12" cy="5" r="3" fill="#0ea5e9" />
                              </svg>
                              <div className="mb-2 mt-4 text-lg font-medium">
                                shadcn/ui
                              </div>
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Beautifully designed components that you can copy
                              and paste into your apps. Accessible.
                              Customizable. Open Source.
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
                )}
                {item === "Components" && (
                  <NavigationMenuContent
                    onMouseEnter={() => debouncedSetHoveredIndex(index)}
                    onMouseLeave={() => debouncedSetHoveredIndex(null)}
                  >
                    <ul className="grid gap-3 p-4 md:w-[70%] md:grid-cols-4 md:grid-rows-3 lg:w-[900px]">
                      <li className="col-span-2 row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            href="#"
                            className="group relative z-10 flex h-full w-full flex-col justify-between overflow-hidden rounded-md bg-gray-100 p-6 no-underline outline-none transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-md"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="inline-block size-9"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="#0ea5e9"
                                d="M2 8v11.529S6.621 19.357 12 22c5.379-2.643 10-2.471 10-2.471V8s-5.454 0-10 2.471C7.454 8 2 8 2 8"
                              />
                              <circle cx="12" cy="5" r="3" fill="#0ea5e9" />
                            </svg>
                            <div className="mb-2 mt-4 text-lg font-medium">
                              shadcn/ui
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Beautifully designed components that you can copy
                              and paste into your apps. Accessible.
                              Customizable. Open Source.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li className="col-span-2 row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            href="#"
                            className="group relative z-10 flex h-full w-full flex-col justify-between overflow-hidden rounded-md bg-gray-100 p-6 no-underline outline-none transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-md"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="inline-block size-9"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="#0ea5e9"
                                d="M2 8v11.529S6.621 19.357 12 22c5.379-2.643 10-2.471 10-2.471V8s-5.454 0-10 2.471C7.454 8 2 8 2 8"
                              />
                              <circle cx="12" cy="5" r="3" fill="#0ea5e9" />
                            </svg>
                            <div className="mb-2 mt-4 text-lg font-medium">
                              shadcn/ui
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Beautifully designed components that you can copy
                              and paste into your apps. Accessible.
                              Customizable. Open Source.
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
                )}
                {item === "Documentation" && (
                  <NavigationMenuContent
                    onMouseEnter={() => debouncedSetHoveredIndex(index)}
                    onMouseLeave={() => debouncedSetHoveredIndex(null)}
                  >
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                      <ListItem title="Documentation" href="/docs" Icon={Book}>
                        Comprehensive guides and API references for using
                        shadcn/ui components.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { Icon?: React.ElementType }
>(({ className, title, Icon, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-md p-6 no-underline outline-none transition-all duration-200 hover:-translate-y-1 hover:shadow-md",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">
            {Icon && <Icon className="mr-1 inline-block size-4" />} {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
