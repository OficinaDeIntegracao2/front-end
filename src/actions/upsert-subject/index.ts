"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";

import { upsertSubjectSchema } from "./schema";

export const upsertSubject = actionClient
  .schema(upsertSubjectSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth();

    if (!parsedInput.subjectId) {
      const response = await fetch(
        `${process.env.URL_API}api/professors/${session?.user.id}/subjects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
          body: JSON.stringify({
            name: parsedInput.name,
            description: parsedInput.description,
            weekdays: parsedInput.weekdays.join(","),
            startTime: parsedInput.startTime,
            endTime: parsedInput.endTime,
            durationWeeks: parsedInput.durationWeeks,
          }),
        },
      );

      if (response.status === 201) {
        revalidatePath("/subjects");
        return { success: true, edit: false };
      }

      return {
        success: false,
        message: "Algo de errado ou a matéria ja existe",
      };
    }

    if (parsedInput.subjectId) {
      const response = await fetch(
        `${process.env.URL_API}api/professors/${session?.user.id}/subjects/${parsedInput.subjectId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
          body: JSON.stringify({
            name: parsedInput.name,
            description: parsedInput.description,
            weekdays: parsedInput.weekdays.join(","),
            startTime: parsedInput.startTime,
            endTime: parsedInput.endTime,
            durationWeeks: parsedInput.durationWeeks,
          }),
        },
      );

      if (response.status === 200) {
        revalidatePath("/subjects");
        return { success: true, edit: true };
      }
      return { success: false, edit: true };
    }
  });
