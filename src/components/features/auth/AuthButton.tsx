import { getAuthSession } from "@/lib/auth";
import LoggedInButton from "./LoggedInButton";
import LoginButton from "./LoginButton";

export default async function AuthButton() {
  const session = await getAuthSession();
  const user = session?.user;

  if (user) {
    return <LoggedInButton user={user} />;
  }
  return <LoginButton />;
}
