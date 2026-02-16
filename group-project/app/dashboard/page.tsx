import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container-default py-12">
      <h1 className="text-3xl font-bold">
        Welcome, {session.user?.name}
      </h1>
    </div>
  );
}
