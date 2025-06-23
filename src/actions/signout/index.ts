"use server";

import { signOut } from "@/lib/auth";

export const signout = async () => {
  await signOut();
};
