"use server";

import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";

import { upsertStudentSchema } from "./schema";

export const upsertStudent = actionClient
  .schema(upsertStudentSchema)
  .action(async ({ parsedInput }) => {
    try {
      const session = await auth();

      const response = await fetch(
        `${process.env.URL_API}api/professors/${session?.user.id}/subjects/${parsedInput.subjectId}/participants/students`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
          body: JSON.stringify({
            name: parsedInput.name,
            email: parsedInput.email,
          }),
        },
      );

      if (response.status === 201) {
        return { success: true };
      }

      return { success: false, message: "Erro ao vincular estudante." };
    } catch (err) {
      console.log(err);
      return { success: false, message: "Erro ao vincular estudante." };
    }
  });
