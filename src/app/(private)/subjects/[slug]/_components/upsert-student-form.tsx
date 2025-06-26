"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { upsertStudent } from "@/actions/upsert-student";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório." }),
  email: z
    .string()
    .min(1, { message: "Email é obrigatório." })
    .email({ message: "Email inválido." }),
});

interface UpsertStudentProps {
  subjectId: string;
}

const UpsertStudentForm = ({ subjectId }: UpsertStudentProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const upsertStudentAction = useAction(upsertStudent, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.success("Estudante vinculado com sucesso!");
        return;
      }
      toast.error(data?.message);
    },
    onError: () => {
      toast.error("Erro ao vincular estudante!");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    upsertStudentAction.execute({
      ...values,
      subjectId: subjectId,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={upsertStudentAction.isExecuting}>
            Salvar
            {upsertStudentAction.isExecuting ? (
              <LoaderCircle className="animate-spin" />
            ) : null}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UpsertStudentForm;
