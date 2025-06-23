import { Toaster } from "sonner";

import { DataTable } from "@/components/ui/data-table";
import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";

import AddTeacherButton from "../teachers/_components/add-teacher-button";

const SubjectsPage = () => {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Matérias</PageTitle>
          <PageDescription>Gerencie as Matérias.</PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddTeacherButton />
        </PageActions>
      </PageHeader>
      <PageContent></PageContent>
      <Toaster richColors />
    </PageContainer>
  );
};

export default SubjectsPage;
