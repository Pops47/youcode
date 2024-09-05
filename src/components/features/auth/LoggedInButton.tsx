"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { Loader, LogOut, User2 } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type LoggedInButtonProps = {
  user: Session["user"];
};

export default function LoggedInButton({ user }: LoggedInButtonProps) {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async () => signOut(),
  });
  return (
    <DropdownMenu>
      <AlertDialog>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="px-4 py-2">
            <Avatar className="w-6 h-6 mr-2">
              {user.image && (
                <AvatarImage src={`${user.image}`} alt="user avatar" />
              )}
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <span>{user.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <AlertDialogTrigger>
            <DropdownMenuItem className="w-40 cursor-pointer" asChild>
              <Link href="/account">
                <User2 className="mr-2 h-4 w-4" />
                My account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="w-40 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to logout ?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={mutation.isPending}
              onClick={() => mutation.mutate()}
            >
              {mutation.isPending ? (
                <Loader className="mr-2" size={12} />
              ) : (
                <LogOut className="mr-2" size={12} />
              )}
              LogOut
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenu>
  );
}
