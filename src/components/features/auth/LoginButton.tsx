"use client";
import { Button } from "@/components/ui/button";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginButton() {
  const mutation = useMutation({ mutationFn: async () => signIn("github") });
  return (
    <Button
      variant="outline"
      disabled={mutation.isPending}
      onClick={() => mutation.mutate()}
    >
      {mutation.isPending ? (
        <Loader className="mr-2" size={12} />
      ) : (
        <SiGithub className="mr-4" />
      )}
      Se connecter avec GitHub
    </Button>
  );
}
