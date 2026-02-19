import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function DashboardRouter() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  if (session.user.role === "seller") {
    redirect("/dashboard/seller");
  }

  redirect("/dashboard/buyer");
}
