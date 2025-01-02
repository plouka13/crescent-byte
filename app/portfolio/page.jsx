import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { UserPortfolio } from "../(components)/UserPortfolio";

export default async function Portfolio() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  return <UserPortfolio />;
}
