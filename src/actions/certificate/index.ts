"use server";

import { z } from "zod";

import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";

export const certificate = actionClient
  .schema(
    z.object({
      subjectId: z.string().min(1, { message: "subjectId is required" }),
      studentId: z.string().min(1, { message: "stundentId is required" }),
    }),
  )
  .action(async ({ parsedInput }) => {
    try {
      const session = await auth();

      const response = await fetch(
        `${process.env.URL_API}api/professors/${session?.user.id}/subjects/${parsedInput.subjectId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
          body: JSON.stringify({
            studentId: parsedInput.studentId,
          }),
        },
      );

      return { success: false, message: "Erro ao adicionar hora." };
    } catch (err) {
      console.log(err);
      return { success: false, message: "Erro ao gerar certificado." };
    }
  });
