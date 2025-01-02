import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { StockAnalytics } from "../(components)/StockAnalytics";

export default async function Analytics() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  return <StockAnalytics />;
}
