"use client";

import { GraduationCap } from "lucide-react";
import { useState } from "react";
import { Toaster } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import UpsertStudentForm from "./upsert-student-form";

interface StudentLinkButtonProps {
  subjectId: string;
}

const StudentLinkButton = ({ subjectId }: StudentLinkButtonProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <GraduationCap />
          Vincular Estudante
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vincular Estudante</DialogTitle>
          <DialogDescription>Vincular estudante a matéria</DialogDescription>
        </DialogHeader>
        <UpsertStudentForm subjectId={subjectId} />
      </DialogContent>
      <Toaster richColors />
    </Dialog>
  );
};

export default StudentLinkButton;
