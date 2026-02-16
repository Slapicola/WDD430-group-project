import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function SellerDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  if (session.user.role !== "seller") {
    redirect("/dashboard");
  }

  return (
    <div className="container-default py-12">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-2">Manage Products</h2>
          <p className="text-[var(--color-muted)]">
            Add, edit, and remove your handcrafted items.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-2">Profile Settings</h2>
          <p className="text-[var(--color-muted)]">
            Update your bio and store information.
          </p>
        </div>
      </div>
    </div>
  );
}
