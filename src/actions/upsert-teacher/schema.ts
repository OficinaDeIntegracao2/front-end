import { z } from "zod";

export const upsertTeacherSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().min(1, { message: "Email é obrigatório" }).email({
    message: "Email inválido",
  }),
  password: z.string().min(1, { message: "Senha é obrigatória" }),
});
