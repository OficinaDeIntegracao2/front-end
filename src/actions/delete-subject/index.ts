"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";

export const deleteSubject = actionClient
  .schema(
    z.object({
      id: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const session = await auth();

    const response = await fetch(
      `${process.env.URL_API}api/professors/${session?.user.id}/subjects/${parsedInput.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token}`,
        },
      },
    );

    revalidatePath("/subjects");

    if (response.status === 200) {
      return { success: true };
    }

    return { success: false };
  });
