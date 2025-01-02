import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Leaderboard } from "../(components)/Leaderboard";

export default async function Ranking() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  return <Leaderboard />;
}
