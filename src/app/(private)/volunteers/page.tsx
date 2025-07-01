import { Toaster } from "sonner";

import { getusers } from "@/actions/get-users";
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
  const data = await getusers("volunteers");

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
        <DataTable
          columns={columns}
          data={typeof data.users === "string" ? [] : data.users}
        />
      </PageContent>
      <Toaster richColors />
    </PageContainer>
  );
};

export default VolunteersPage;
