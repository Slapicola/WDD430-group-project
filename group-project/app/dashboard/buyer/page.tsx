import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";
import { db } from "@/app/lib/db";

export default async function BuyerDashboard() {
  const session = await getServerSession(authOptions);

  // ✅ First: Protect route
  if (!session) redirect("/login");

  // If seller tries to access buyer dashboard, redirect properly
  if (session.user.role === "seller") {
    redirect("/dashboard/seller");
  }

  // ✅ Now safe to query
  const result = await db.query(
    `SELECT products.*
     FROM orders
     JOIN products ON products.id = orders.product_id
     WHERE orders.buyer_id = $1
     ORDER BY orders.created_at DESC`,
    [session.user.id],
  );

  const orders = result.rows;

  return (
    <div className="container-default py-12">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      <div className="card p-6 mb-10">
        <p>
          <strong>Name:</strong> {session.user.name}
        </p>
        <p>
          <strong>Email:</strong> {session.user.email}
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

      {orders.length === 0 && (
        <div className="card p-6 text-gray-500">
          You haven't purchased anything yet.
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {orders.map((product) => (
          <div key={product.id} className="card p-5">
            <h3 className="font-semibold text-lg">{product.title}</h3>
            <p className="text-sm text-gray-500">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
