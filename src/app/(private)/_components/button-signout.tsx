"use client";

import { LogOut } from "lucide-react";

import { signout } from "@/actions/signout";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const ButtonSignOut = () => {
  const handleSignOut = async () => {
    await signout();
  };

  return (
    <DropdownMenuItem onClick={handleSignOut}>
      <LogOut />
      Sair
    </DropdownMenuItem>
  );
};

export default ButtonSignOut;
