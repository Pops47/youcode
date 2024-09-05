import LogoutButton from "@/components/features/auth/LogoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";

export default async function AcountPage() {
  const session = await getAuthSession();
  if (!session) {
    throw new Error("Session not found");
  }
  const user = session.user;
  return (
    <Card className="px-4 sm:px-6 md:px-8 max-w-xl mx-auto my-12">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarFallback>{user.name?.[0]}</AvatarFallback>
          {user.image && <AvatarImage src={user.image} alt="user avatar" />}
        </Avatar>
        <div className="flex flex-col gap-2">
          <CardTitle>{user.email}</CardTitle>
          <CardDescription>{user.name}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Link
          href="/account/settings"
          className={`${buttonVariants({ variant: "outline" })} py-6`}
        >
          Settings
        </Link>
        <Link
          href="/admin"
          className={`${buttonVariants({ variant: "outline" })} py-6`}
        >
          Admin
        </Link>
      </CardContent>
      <CardFooter className="flex justify-end">
        <LogoutButton />
      </CardFooter>
    </Card>
  );
}
