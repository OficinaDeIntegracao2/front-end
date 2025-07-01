"use client";

import { BadgeCheck, CheckSquare, MoreVerticalIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Enrollments } from "./table-columns-enrollments";
import UpsertHoursForm from "./upsert-hours-form";

interface EnrollmentProps {
  enrollment: Enrollments;
}

const EnrollmentsTableActions = ({ enrollment }: EnrollmentProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handlePresenca = () => {
    setIsOpen(true);
  };

  const handleCertificado = () => {};

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <MoreVerticalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handlePresenca}>
            <CheckSquare />
            Lançar Presença
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCertificado}>
            <BadgeCheck />
            Gerar Certificado
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpsertHoursForm
        email={enrollment.email}
        subjectId={enrollment.subjectId}
        open={isOpen}
      />
    </Dialog>
  );
};

export default EnrollmentsTableActions;
