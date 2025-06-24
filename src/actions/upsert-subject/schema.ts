import { z } from "zod";

export const upsertSubjectSchema = z
  .object({
    name: z.string().min(1, { message: "Nome é obrigatório." }),
    description: z.string().min(1, { message: "Descrição é obrigatória." }),
    weekdays: z
      .array(z.string())
      .refine((value) => value.some((item) => item), {
        message: "Dia da semana é obrigatório.",
      }),
    startTime: z.string().min(1, { message: "Hora de início é obrigatória." }),
    endTime: z.string().min(1, { message: "Hora de término é obrigatória." }),
    durationWeeks: z.string().min(1, { message: "Duração é obrigatória." }),
    subjectId: z.string().optional(),
  })
  .refine(
    (data) => {
      return data.startTime < data.endTime;
    },
    {
      message:
        "O horário de início não pode ser anterior ao horário de término.",
    },
  );
