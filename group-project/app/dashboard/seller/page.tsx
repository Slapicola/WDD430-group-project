import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";
import { db } from "@/app/lib/db";
import Link from "next/link";
import { deleteProduct } from "@/app/lib/actions";

export default async function SellerDashboard() {
  const session = await getServerSession(authOptions);

  // Protect route
  if (!session) redirect("/login");

  // Redirect buyers away from seller dashboard
  if (session.user.role === "user") {
    redirect("/dashboard/buyer");
  }

  const result = await db.query(
    "SELECT * FROM products WHERE seller_id = $1 ORDER BY created_at DESC",
    [session.user.id],
  );

  const products = result.rows;

  return (
    <div className="container-default py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>

        <Link href="/dashboard/seller/new" className="btn-primary">
          + Add Product
        </Link>
      </div>

      {products.length === 0 && (
        <div className="card p-6 text-center text-gray-500">
          You haven’t added any products yet.
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {products.map((product) => (
          <div key={product.id} className="card p-5">
            <h3 className="font-semibold text-lg">{product.title}</h3>

            <p className="text-sm text-gray-500">${product.price}</p>

            <p className="mt-3 text-sm line-clamp-3">{product.description}</p>

            <div className="mt-4 flex gap-4">
              <Link
                href={`/dashboard/seller/${product.id}/edit`}
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </Link>

              <form action={deleteProduct.bind(null, product.id)}>
                <button
                  type="submit"
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
