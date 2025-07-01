import { z } from "zod";

export const upsertHoursSchema = z.object({
  attendedAt: z.date({ required_error: "attendedAt is required" }),
  email: z.string().min(1, { message: "email is required" }),
  subjectId: z.string().min(1, { message: "subjectId is required" }),
});
