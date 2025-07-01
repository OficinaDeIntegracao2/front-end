import { getusers } from "@/actions/get-users";
import { Card, CardContent } from "@/components/ui/card";
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

import BackButton from "./_components/back-button";
import StudentLinkButton from "./_components/student-link-button";
import { columns, Enrollments } from "./_components/table-columns-enrollments";
import { columnsVolunteer } from "./_components/table-columns-volunteers";
import VolunteerLinkButton from "./_components/volunteer-link-button";

interface SubjectDetailProps {
  params: {
    slug: string;
  };
}

const SubjectDetailsPage = async ({ params }: SubjectDetailProps) => {
  const session = await auth();

  const { slug } = await params;

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
  const volunteers = await getusers("volunteers");

  const enrollments = data.subject.enrollments.map(
    (enrollment: Enrollments) => ({
      ...enrollment,
      subjectId: slug,
    }),
  );

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <BackButton />
          <PageTitle>Detalhe da Matéria</PageTitle>
          <PageDescription>Detalhe da Matéria</PageDescription>
        </PageHeaderContent>
        <PageActions>
          <VolunteerLinkButton volunteers={volunteers.users} subjectId={slug} />
          <StudentLinkButton subjectId={slug} />
        </PageActions>
      </PageHeader>
      <PageContent>
        <div className="space-y-4">
          <div className="flex gap-5">
            <Card className="w-full">
              <CardContent>
                <p>
                  <strong>Nome: </strong>
                  {data.subject.name}
                </p>
                <p>
                  <strong>Descrição: </strong>
                  {data.subject.description}
                </p>
                <p>
                  <strong>Duração: </strong>
                  {data.subject.durationWeeks} Semanas
                </p>
                <p>
                  <strong>Total Horas: </strong>
                  {data.subject.totalHours} Horas
                </p>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardContent>
                <p>
                  <strong>Professor: </strong>
                  {data.subject.professor.name}
                </p>
                <p>
                  <strong>Dias: </strong>
                  {data.subject.weekdays}
                </p>
                <p>
                  <strong>Horário: </strong>
                  {data.subject.startTime} - {data.subject.endTime}
                </p>
              </CardContent>
            </Card>
          </div>
          <div>
            <h1 className="text-lg font-bold">Voluntários Vinculados</h1>
            <DataTable
              columns={columnsVolunteer}
              data={data.subject.volunteers}
            />
          </div>
          <div>
            <h1 className="text-lg font-bold">Estudantes Vinculados</h1>
            <DataTable columns={columns} data={enrollments} />
          </div>
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default SubjectDetailsPage;
