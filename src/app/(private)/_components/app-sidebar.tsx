"use client";

import Cookies from "js-cookie";
import { GraduationCap, LogOut, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
  const [name, setName] = useState("");
  const router = useRouter();
  useEffect(() => {
    const cookieName = Cookies.get("name");
    if (cookieName) {
      setName(cookieName);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("name");
    Cookies.remove("id");
    router.push("/authentication");
  };

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
      <SidebarFooter>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <Avatar>
                  <AvatarFallback>{name[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <p>{name}</p>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
