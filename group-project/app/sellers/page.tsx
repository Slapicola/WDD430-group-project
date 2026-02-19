import { db } from "@/app/lib/db";
import Link from "next/link";

export default async function SellersPage() {
  const result = await db.query(
    "SELECT id, name FROM users WHERE role = 'seller'",
  );

  const sellers = result.rows;

  return (
    <div className="container-default py-12">
      <h1 className="text-3xl font-bold mb-8">Our Sellers</h1>

      {sellers.length === 0 && (
        <p className="text-gray-500">No sellers available yet.</p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {sellers.map((seller) => (
          <Link
            key={seller.id}
            href={`/sellers/${seller.id}`}
            className="card p-6 hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold">{seller.name}</h2>
            <p className="text-sm text-gray-500 mt-2">View Store →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
