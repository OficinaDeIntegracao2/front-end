"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/lib/auth";

export const authenticate = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, message: "Email ou senha incorretos." };
    }
    return {
      success: false,
      message: "Algum erro aconteceu! Tente novamente",
    };
  }
};
