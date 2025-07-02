"use client";

import { HelpingHand } from "lucide-react";

import { Volunteer } from "@/app/(private)/volunteers/_components/table-columns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import UpsertVolunteerForm from "./upsert-volunteer-form";

interface VolunteerProps {
  volunteers: Volunteer[];
  subjectId: string;
}

const VolunteerLinkButton = ({ volunteers, subjectId }: VolunteerProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <HelpingHand />
          Vincular Voluntário
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vincular Voluntário</DialogTitle>
          <DialogDescription>Vincular voluntário a matéria</DialogDescription>
        </DialogHeader>
        <UpsertVolunteerForm volunteers={volunteers} subjectId={subjectId}/>
      </DialogContent>
    </Dialog>
  );
};

export default VolunteerLinkButton;
