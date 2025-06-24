"use server";

import { auth } from "@/lib/auth";

export const detailSubject = async (subjectId: string) => {
  const session = await auth();

  const response = await fetch(
    `${process.env.URL_API}api/professors/${session?.user.id}/subjects/${subjectId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.token}`,
      },
    },
  );

  return await response.json();
};
