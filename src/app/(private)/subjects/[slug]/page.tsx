import {
  PageActions,
  PageContainer,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { auth } from "@/lib/auth";

import BackButton from "./_components/back-button";
import StudentLinkButton from "./_components/student-link-button";
import VolunteerLinkButton from "./_components/volunteer-link-button";

interface SubjectDetailProps {
  params: {
    slug: string;
  };
}

const SubjectDetailsPage = async ({ params: { slug } }: SubjectDetailProps) => {
  const session = await auth();

  const response = await fetch(
    `${process.env.URL_API}api/professors/${session?.user.id}/subjects/${slug}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.token}`,
      },
    },
  );

  const data = await response.json();

  console.log(data);

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <BackButton />
          <PageTitle>Detalhe da Matéria</PageTitle>
          <PageDescription>Detalhe da Matéria</PageDescription>
        </PageHeaderContent>
        <PageActions>
          <VolunteerLinkButton />
          <StudentLinkButton subjectId={slug} />
        </PageActions>
      </PageHeader>
    </PageContainer>
  );
};

export default SubjectDetailsPage;
