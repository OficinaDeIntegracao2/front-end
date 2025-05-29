import { Toaster } from "sonner";

import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";

import AddTeacherButton from "./_components/add-teacher-button";

const TeachersPage = () => {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Professores</PageTitle>
          <PageDescription>Gerencie os professores.</PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddTeacherButton />
        </PageActions>
      </PageHeader>
      <PageContent>
        <h1>Professores</h1>
      </PageContent>
      <Toaster richColors />
    </PageContainer>
  );
};

export default TeachersPage;
