"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import UpsertSubjectForm from "./upsert-subject-form";

const AddSubjectButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Adicionar Matéria
        </Button>
      </DialogTrigger>
      <UpsertSubjectForm onSuccess={() => setIsOpen(false)} />
    </Dialog>
  );
};

export default AddSubjectButton;
