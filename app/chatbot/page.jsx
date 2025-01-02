import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Chat from "../(components)/Chat";

export default async function Compare() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  return <Chat />;
}
