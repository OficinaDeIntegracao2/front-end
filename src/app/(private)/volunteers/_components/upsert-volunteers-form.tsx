"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { upsertVolunteers } from "@/actions/upsert-volunteers";
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
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().min(1, { message: "Email é obrigatório" }).email({
    message: "Email inválido",
  }),
  password: z.string().min(1, { message: "Senha é obrigatória" }),
});

interface UpsertVolunteersFormProps {
  onSuccess?: () => void;
}

const UpsertVolunteersForm = ({ onSuccess }: UpsertVolunteersFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const upsertVolunteersAction = useAction(upsertVolunteers, {
    onSuccess: ({ data }) => {
      if (data?.status === 400) {
        toast.warning("Email já cadastrado!");
        return;
      }
      toast.success("Aluno voluntário criado com sucesso!");
      onSuccess?.();
    },
    onError: () => {
      toast.error("Erro ao criar aluno voluntário!");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    upsertVolunteersAction.execute(values);
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" disabled={upsertVolunteersAction.isExecuting}>
            {upsertVolunteersAction.isExecuting
              ? "Adicionando..."
              : "Adicionar"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UpsertVolunteersForm;
