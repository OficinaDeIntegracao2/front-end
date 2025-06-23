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

import AddSubjectButton from "./_components/add-subject-button";
import { columns } from "./_components/table-columns";

const SubjectsPage = async () => {
  const session = await auth();

  const response = await fetch(
    `${process.env.URL_API}api/professors/${session?.user.id}/subjects`,
    {
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
      },
    },
  );

  const data = await response.json();

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Matérias</PageTitle>
          <PageDescription>Gerencie as Matérias.</PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddSubjectButton />
        </PageActions>
      </PageHeader>
      <PageContent>
        <DataTable data={data.subjects} columns={columns} />
      </PageContent>
      <Toaster richColors />
    </PageContainer>
  );
};

export default SubjectsPage;
