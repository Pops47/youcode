import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function CoursesPage() {
  const session = await getAuthSession();
  if (!session) {
    throw new Error("Session not found");
  }
  const courses = await prisma.course.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <Card className="max-w-xl mx-auto my-12 p-4 flex flex-col gap-4">
      <CardTitle>My courses</CardTitle>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Course title</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">
                <Avatar>
                  <AvatarImage src={course.image ?? undefined} />
                  <AvatarFallback>{course.title.slice(0, 1)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>
                <Link href={`/admin/courses/${course.id}`}>{course.title}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
