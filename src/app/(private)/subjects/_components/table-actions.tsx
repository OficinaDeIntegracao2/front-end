"use client";

import { BookOpen, EditIcon, MoreVerticalIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import { deleteSubject } from "@/actions/delete-subject";
import { detailSubject } from "@/actions/detail-subject";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Subject } from "./table-columns";
import UpsertSubjectForm from "./upsert-subject-form";

interface SubjectAction {
  subject: Subject;
}

type Person = {
  id: string;
  name: string;
};

export type DetailSubject = {
  id: string;
  name: string;
  description: string;
  weekdays: string;
  startTime: string;
  endTime: string;
  durationWeeks: string;
  totalHours: number;
  professor: Person;
  volunteers: Person[];
  enrollments: Person[];
};

const SubjectTableActions = ({ subject }: SubjectAction) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [detail, setDetail] = useState<DetailSubject>();

  const router = useRouter();

  const deleteSubjectAction = useAction(deleteSubject, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.success("Matéria deletada com sucesso.");
        return;
      }
      toast.error("Erro ao deletar matéria.");
    },
    onError: () => {
      toast.error("Erro ai deletar matéria.");
    },
  });

  const handleDeleteSubject = () => {
    if (!subject) return;

    deleteSubjectAction.execute({ id: subject.id });
  };

  const handleEditSubject = async () => {
    const result = await detailSubject(subject.id);

    setDetail(result.subject);
    setIsOpen(true);
  };

  const handleDetail = () => {
    router.push(`/subjects/${subject.id}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVerticalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleDetail}>
            <BookOpen />
            Detalhe
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleEditSubject}>
            <EditIcon />
            Editar
          </DropdownMenuItem>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <TrashIcon />
                Excluir
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que deseja deletar essa matéria?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não pode ser revertida. Isso irá deletar a materia.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteSubject}>
                  Deletar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpsertSubjectForm
        onSuccess={() => setIsOpen(false)}
        isOpen={isOpen}
        subject={detail}
      />
    </Dialog>
  );
};

export default SubjectTableActions;
