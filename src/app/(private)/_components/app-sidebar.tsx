import { GraduationCap, Users } from "lucide-react";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Professor",
    url: "/teachers",
    icon: GraduationCap,
  },
  {
    title: "Aluno Voluntário",
    url: "/volunteers",
    icon: Users,
  },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center gap-2">
        <Image src="/icon-programns.png" alt="ELLP" width={40} height={40} />
        <h1 className="text-2xl font-bold">ELLP</h1>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
