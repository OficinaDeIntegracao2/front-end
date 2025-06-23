import Image from "next/image";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
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
import { auth } from "@/lib/auth";

import ButtonSignOut from "./button-signout";
import LinksMenu from "./links-menu";

const AppSidebar = async () => {
  const session = await auth();

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
              <LinksMenu />
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
                  <AvatarFallback>
                    {session?.user?.name?.[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p>{session?.user?.name}</p>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <ButtonSignOut />
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
