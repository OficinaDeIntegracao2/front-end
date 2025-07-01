import { z } from "zod";

export const upsertStudentSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório." }),
  email: z
    .string()
    .min(1, { message: "Email é obrigatório." })
    .email({ message: "Email inválido." }),
  subjectId: z.string().optional(),
});
