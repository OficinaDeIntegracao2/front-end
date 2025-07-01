"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";

import { upsertHoursSchema } from "./schema";

export const upsertHours = actionClient
  .schema(upsertHoursSchema)
  .action(async ({ parsedInput }) => {
    try {
      const session = await auth();

      const response = await fetch(
        `${process.env.URL_API}api/subjects/${parsedInput.subjectId}/hour-logs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
          body: JSON.stringify({
            email: parsedInput.email,
            attendedAt: parsedInput.attendedAt,
          }),
        },
      );

      console.log(await response.json());

      if (response.status === 201) {
        revalidatePath("/subjects/[slug]");
        return { success: true };
      }

      return { success: false, message: "Erro ao adicionar hora." };
    } catch (err) {
      console.log(err);
      return { success: false, message: "Erro ao adicionar hora." };
    }
  });
