import { db } from "@/app/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { createOrder } from "@/app/lib/actions";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const result = await db.query("SELECT * FROM products WHERE id = $1", [
    params.id,
  ]);

  const product = result.rows[0];

  if (!product) return notFound();

  const session = await getServerSession(authOptions);

  return (
    <div className="container-default py-12 max-w-4xl">
      <div className="grid md:grid-cols-2 gap-10">
        {product.image && (
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={500}
            className="rounded-xl object-cover"
          />
        )}

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

          <p className="text-2xl font-semibold text-[var(--color-primary)] mb-6">
            ${product.price}
          </p>

          <p className="text-gray-600 mb-8">{product.description}</p>

          {/* Role-based Purchase Logic */}
          {session && session.user.role === "user" ? (
            <form action={createOrder.bind(null, product.id)}>
              <button type="submit" className="btn-primary w-full">
                Add to Cart
              </button>
            </form>
          ) : session && session.user.role === "seller" ? (
            <p className="text-sm text-gray-500">
              Sellers cannot purchase products.
            </p>
          ) : (
            <p className="text-sm text-gray-500">Please login to purchase</p>
          )}
        </div>
      </div>
    </div>
  );
}
