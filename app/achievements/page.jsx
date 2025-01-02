import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { StockAnalytics } from "../(components)/StockAnalytics";
import { AchievementBoard } from "../(components)/AchievementBoard";

export default async function Achievements() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  return <AchievementBoard />;
}
