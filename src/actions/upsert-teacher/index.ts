"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";

import { upsertTeacherSchema } from "./schema";

export const upsertTeacher = actionClient
  .schema(upsertTeacherSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth();

    const response = await fetch(`${process.env.URL_API}api/users/professors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.token}`,
      },
      body: JSON.stringify(parsedInput),
    });

    if (response.status === 400) {
      return { status: 400, error: "email_found" };
    }

    revalidatePath("/teachers");
  });
