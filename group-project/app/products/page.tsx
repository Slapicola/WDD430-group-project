import { db } from "@/app/lib/db";
import Link from "next/link";

export default async function ProductsPage() {
  const result = await db.query(
    "SELECT * FROM products ORDER BY created_at DESC",
  );

  const products = result.rows;

  return (
    <div className="container-default py-12">
      <h1 className="text-3xl font-bold mb-8">Browse Products</h1>

      {products.length === 0 && (
        <p className="text-gray-500">No products available yet.</p>
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
