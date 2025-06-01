"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { actionClient } from "@/lib/safe-action";

import { upsertVolunteersSchema } from "./schema";

export const upsertVolunteers = actionClient
  .schema(upsertVolunteersSchema)
  .action(async ({ parsedInput }) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      throw new Error("Token not found");
    }

    const response = await fetch("http://localhost:8080/api/users/volunteers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(parsedInput),
    });

    if (response.status === 400) {
      return { status: 400, error: "email_found" };
    }

    revalidatePath("/volunteers");
  });
