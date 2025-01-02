import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { QuizLayout } from "../(components)/QuizLayout";

export default async function Quiz() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  return <QuizLayout />;
}
