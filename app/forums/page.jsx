import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { ForumLayout } from "../(components)/ForumLayout";

export default async function Portfolio() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  return <ForumLayout />;
}
