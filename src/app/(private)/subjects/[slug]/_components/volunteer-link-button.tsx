"use client";

import { HelpingHand } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

const VolunteerLinkButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <HelpingHand />
          Vincular Voluntário
        </Button>
      </DialogTrigger>
    </Dialog>
  );
};

export default VolunteerLinkButton;
