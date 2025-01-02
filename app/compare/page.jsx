import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { CompareMain } from "../(components)/CompareMain";

export default async function Compare() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  return <CompareMain />;
}
