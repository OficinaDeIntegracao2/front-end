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
import { auth } from "@/lib/auth";

import AddTeacherButton from "./_components/add-teacher-button";
import { columns } from "./_components/table-columns";

const TeachersPage = async () => {
  const session = await auth();

  const response = await fetch(`${process.env.URL_API}api/users/professors`, {
    headers: {
      Authorization: `Bearer ${session?.user.token}`,
    },
  });

  const data = await response.json();

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
