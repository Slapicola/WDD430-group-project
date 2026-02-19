import { createProduct } from "@/app/lib/actions";

export default function NewProductPage() {
  return (
    <div className="container-default py-12">
      <div className="max-w-lg mx-auto card p-8">
        <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

        <form
          action={createProduct}
          className="space-y-5"
          encType="multipart/form-data"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input name="title" className="input w-full" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea name="description" className="input w-full" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              name="price"
              type="number"
              step="0.01"
              className="input w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Product Image
            </label>
            <input
              name="image"
              type="file"
              accept="image/*"
              className="input w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input name="category" className="input w-full" />
          </div>

          <button type="submit" className="btn-primary w-full">
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}
