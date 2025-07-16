import "@/styles/global.css"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
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
      <main className="p-1">
        <div className="hover:bg-sidebar-border rounded-md fixed">
          <SidebarTrigger />
        </div>
      </main>
      <div className="w-full">{children}</div>
    </SidebarProvider>
  )
}
