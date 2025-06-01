import { cookies } from "next/headers";
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

import AddTeacherButton from "./_components/add-teacher-button";
import { columns } from "./_components/table-columns";

const TeachersPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const response = await fetch("http://localhost:8080/api/users/professors", {
    headers: {
      Authorization: `Bearer ${token}`,
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
        <DataTable columns={columns} data={data.users} />
      </PageContent>
      <Toaster richColors />
    </PageContainer>
  );
};

export default TeachersPage;
