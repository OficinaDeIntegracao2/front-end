"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, LockKeyholeOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { z } from "zod";

import { authenticate } from "@/actions/authentication";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email inválido" }),
  password: z.string().min(1, { message: "Senha é obrigatória" }),
});

const AuthenticationPage = () => {
  const [seePassword, setSeePassword] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const authenticationAction = useAction(authenticate, {
    onSuccess: () => {
      router.push("/");
    },
    onError: () => {
      toast.error("Erro ao fazer login!");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    authenticationAction.execute(values);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
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
                      <div className="relative flex items-center">
                        <Input
                          {...field}
                          type={seePassword ? "text" : "password"}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          className="absolute left-[85%] hover:bg-transparent lg:left-[88%]"
                          onClick={() => setSeePassword(!seePassword)}
                        >
                          {seePassword ? <LockKeyholeOpen /> : <LockKeyhole />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={authenticationAction.isPending}
              >
                {authenticationAction.isPending ? "Entrando ..." : "Entrar"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Toaster richColors />
    </div>
  );
};

export default AuthenticationPage;
