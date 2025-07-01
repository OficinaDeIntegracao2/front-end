"use server";

import { auth } from "@/lib/auth";

export const getusers = async (role: string) => {
  const session = await auth();

  const response = await fetch(`${process.env.URL_API}api/users/${role}`, {
    headers: {
      Authorization: `Bearer ${session?.user.token}`,
    },
  });

  const data = await response.json();
  return data;
};
