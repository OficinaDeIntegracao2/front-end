"use server";

import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";

import { upsertSubjectSchema } from "./schema";

export const upsertSubject = actionClient
  .schema(upsertSubjectSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth();

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
      return { success: true };
    }

    return { success: false, message: "Algo de errado ou a matéria ja existe" };
  });
