import { db } from "@/app/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function SellerStorePage({
  params,
}: {
  params: { id: string };
}) {
  // Get seller info
  const sellerResult = await db.query(
    "SELECT id, name FROM users WHERE id = $1 AND role = 'seller'",
    [params.id],
  );

  const seller = sellerResult.rows[0];

  if (!seller) return notFound();

  // Get seller products
  const productsResult = await db.query(
    "SELECT * FROM products WHERE seller_id = $1 ORDER BY created_at DESC",
    [params.id],
  );

  const products = productsResult.rows;

  return (
    <div className="container-default py-12">
      <h1 className="text-3xl font-bold mb-4">{seller.name}'s Store</h1>

      <p className="text-gray-500 mb-8">Browse products from this seller.</p>

      {products.length === 0 && (
        <p className="text-gray-500">This seller has no products yet.</p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="card p-5 hover:shadow-lg transition"
          >
            <h2 className="font-semibold text-lg">{product.title}</h2>
            <p className="text-sm text-gray-500">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
