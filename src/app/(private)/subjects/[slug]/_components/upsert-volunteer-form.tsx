"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { upsertVincVolunteer } from "@/actions/upsert-vinc-volunteer";
import { Volunteer } from "@/app/(private)/volunteers/_components/table-columns";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  volunteer: z.string().min(1, { message: "Selecione um volutário!" }),
});

interface VolunteerProps {
  volunteers: Volunteer[];
  subjectId: string;
}

const UpsertVolunteerForm = ({ volunteers, subjectId }: VolunteerProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      volunteer: "",
    },
  });

  const upsertVincVolunteerAction = useAction(upsertVincVolunteer, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.success("Voluntário vinculado com sucesso!");
        return;
      }
      toast.error(data?.message);
    },
    onError: () => {
      toast.error("Erro ao vincular voluntário!");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    upsertVincVolunteerAction.execute({
      ...values,
      subjectId: subjectId,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="volunteer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voluntário</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Voluntário..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {volunteers.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button
            type="submit"
            disabled={upsertVincVolunteerAction.isExecuting}
          >
            Salvar
            {upsertVincVolunteerAction.isExecuting ? (
              <LoaderCircle className="animate-spin" />
            ) : null}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default UpsertVolunteerForm;
