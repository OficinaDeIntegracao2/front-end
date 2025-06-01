"use server";

import { cookies } from "next/headers";

import { actionClient } from "@/lib/safe-action";

import { authenticationSchema } from "./schema";

export const authenticate = actionClient
  .schema(authenticationSchema)
  .action(async ({ parsedInput }) => {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(parsedInput),
    });

    if (response.status === 400) {
      throw new Error("Usuário não encontrado!");
    }

    const data = await response.json();

    const cookieStore = await cookies();

    cookieStore.set("token", data.token);

    cookieStore.set("id", data.user.id);

    cookieStore.set("name", data.user.name);
  });
