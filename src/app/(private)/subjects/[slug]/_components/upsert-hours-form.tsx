"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { upsertHours } from "@/actions/upsert-hours";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface UpsertHoursForm {
  email: string;
  subjectId: string;
  onSuccess?: () => void;
  open: boolean;
}

const formSchema = z.object({
  attendedAt: z.date({ required_error: "Data é obrigatória!" }),
});

const UpsertHoursForm = ({ email, subjectId, open }: UpsertHoursForm) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const upsertHoursAction = useAction(upsertHours, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        form.reset({
          attendedAt: undefined,
        });
        toast.success("Hora lançada!");
        return;
      }
      return toast.error(data?.message);
    },
    onError: () => {
      toast.error("Erro ao adicionar hora!");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    upsertHoursAction.execute({
      ...values,
      email: email,
      subjectId: subjectId,
    });
  };

  useEffect(() => {
    if (open) {
      form.reset({
        attendedAt: undefined,
      });
    }
  }, [open, form]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Lançar Hora</DialogTitle>
        <DialogDescription>Lançar hora para aluno</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="attendedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy", { locale: ptBR })
                        ) : (
                          <span>Selecione...</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      locale={ptBR}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertHoursForm;
