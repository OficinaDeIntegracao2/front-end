"use client";

import { Book, GraduationCap, Users } from "lucide-react";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
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
  {
    title: "Matéria",
    url: "/subjects",
    icon: Book,
  },
];

const LinksMenu = () => {
  return items.map((item) => (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild>
        <a href={item.url}>
          <item.icon />
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ));
};

export default LinksMenu;
