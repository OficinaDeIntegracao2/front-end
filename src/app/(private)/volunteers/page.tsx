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
import { auth } from "@/lib/auth";

import AddVolunteersButton from "./_components/add-volunteers-button";
import { columns } from "./_components/table-columns";

const VolunteersPage = async () => {
  const session = await auth();

  const response = await fetch(`${process.env.URL_API}api/users/volunteers`, {
    headers: {
      Authorization: `Bearer ${session?.user.token}`,
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
