import "@/styles/global.css"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useStore } from '@nanostores/react'
import { $userStore } from '@clerk/astro/client'
import { useEffect, useState } from 'react';

export function Sidebar({ children }: { children: React.ReactNode }) {
  const currentUser = useStore($userStore)
  const [loading, setLoading] = useState(true); // Track loading state
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate an API call or data fetching
    const fetchData = async () => {
      setLoading(true);
      setLoadingProgress(0);

      // Simulate loading progress
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev < 100) return prev + 10; // Increment by 10% for demonstration
          clearInterval(interval);
          return prev;
        });
      }, 100); // Update every 100ms

      // Simulate a data fetching delay
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate 1 second loading time

      setLoading(false);
      clearInterval(interval);
    };

    fetchData();
  }, []);


  if (currentUser === null) {
    return <div>Not signed in</div>
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 md:hidden" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="w-full">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
