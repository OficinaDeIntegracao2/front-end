import { cookies } from "next/headers";
import { Toaster } from "sonner";

import { DataTable } from "@/components/ui/data-table";
import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-container";

import AddVolunteersButton from "./_components/add-volunteers-button";
import { columns } from "./_components/table-columns";

const VolunteersPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const response = await fetch("http://localhost:8080/api/users/volunteers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Voluntários</PageTitle>
          <PageDescription>Gerencie os voluntários.</PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddVolunteersButton />
        </PageActions>
      </PageHeader>
      <PageContent>
        <DataTable columns={columns} data={data.users} />
      </PageContent>
      <Toaster richColors />
    </PageContainer>
  );
};

export default VolunteersPage;
