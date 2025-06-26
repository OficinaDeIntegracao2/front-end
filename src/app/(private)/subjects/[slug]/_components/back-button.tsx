"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/subjects");
  };

  return (
    <Button onClick={handleBack}>
      <ArrowLeft />
      Voltar
    </Button>
  );
};

export default BackButton;
