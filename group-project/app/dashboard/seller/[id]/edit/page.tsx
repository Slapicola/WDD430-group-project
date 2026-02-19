import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";
import { updateProduct } from "@/app/lib/actions";

interface Props {
  params: { id: string };
}

export default async function EditProductPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "seller") {
    redirect("/login");
  }

  const result = await db.query("SELECT * FROM products WHERE id = $1", [
    params.id,
  ]);

  const product = result.rows[0];

  if (!product || product.seller_id !== session.user.id) {
    redirect("/dashboard/seller");
  }

  return (
    <div className="container-default py-12">
      <div className="max-w-lg mx-auto card p-8">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

        <form action={updateProduct} className="space-y-5">
          <input type="hidden" name="id" value={product.id} />

          <input
            name="title"
            defaultValue={product.title}
            className="input w-full"
          />

          <textarea
            name="description"
            defaultValue={product.description}
            className="input w-full"
          />

          <input
            name="price"
            type="number"
            defaultValue={product.price}
            className="input w-full"
          />

          <button type="submit" className="btn-primary w-full">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}
