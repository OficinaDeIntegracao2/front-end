"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";

export const upsertVincVolunteer = actionClient
  .schema(
    z.object({
      volunteer: z.string().min(1, { message: "volunterr is required" }),
      subjectId: z.string().min(1, { message: "subjectId is required" }),
    }),
  )
  .action(async ({ parsedInput }) => {
    try {
      const session = await auth();

      const response = await fetch(
        `${process.env.URL_API}api/professors/${session?.user.id}/subjects/${parsedInput.subjectId}/participants/volunteers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
          body: JSON.stringify({
            volunteerId: parsedInput.volunteer,
          }),
        },
      );

      if (response.status === 201) {
        revalidatePath("/subjects/[slug]");
        return { success: true };
      }

      return { success: false, message: "Erro ao vincular voluntário." };
    } catch (err) {
      console.log(err);
      return { success: false, message: "Erro ao vincular voluntário." };
    }
  });
