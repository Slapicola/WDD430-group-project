import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";
import { becomeSeller } from "@/app/lib/actions";

export default async function BecomeSellerPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  if (session.user.role === "seller") {
    redirect("/dashboard/seller");
  }

  return (
    <div className="container-default py-16 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">Become a Seller</h1>

      <form action={becomeSeller}>
        <button type="submit" className="btn-primary w-full">
          Upgrade to Seller
        </button>
      </form>
    </div>
  );
}
