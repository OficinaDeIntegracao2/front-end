import { Toaster } from "sonner";

import { getusers } from "@/actions/get-users";
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

import AddTeacherButton from "./_components/add-teacher-button";
import { columns } from "./_components/table-columns";

const TeachersPage = async () => {
  const data = await getusers("professors");

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
        <DataTable
          columns={columns}
          data={typeof data.users === "string" ? [] : data.users}
        />
      </PageContent>
      <Toaster richColors />
    </PageContainer>
  );
};

export default TeachersPage;
