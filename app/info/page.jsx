import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { GettingStarted } from "../(components)/GettingStarted";

export default async function Info() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  return <GettingStarted />;
}
