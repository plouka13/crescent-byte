import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { PlanDetails } from "../(components)/PlanDetails";

export default async function Subscription() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  return <PlanDetails />;
}
