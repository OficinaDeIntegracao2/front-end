import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import AppSidebar from "./_components/app-sidebar";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider open>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
