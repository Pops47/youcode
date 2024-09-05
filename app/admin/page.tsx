import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";

export default async function AdminPage() {
  const session = await getAuthSession();
  if (!session) {
    throw new Error("Session not found");
  }
  return (
    <Card className="max-w-xl mx-auto my-12 p-4 flex flex-col gap-4">
      <CardTitle>Admin Dashboard</CardTitle>
      <CardContent>
        <Link
          className={buttonVariants({ variant: "outline" })}
          href="/admin/courses"
        >
          My courses
        </Link>
      </CardContent>
    </Card>
  );
}
