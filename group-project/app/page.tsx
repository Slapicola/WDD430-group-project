import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-white border-b border-[var(--color-border)]">
        <div className="container-default py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Discover Handcrafted Excellence
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-[var(--color-muted)] mb-8">
            Explore unique, artisan-made products crafted with passion and
            purpose. Support local creators and embrace sustainable shopping.
          </p>

          <div className="flex justify-center gap-4">
            <a href="/products" className="btn-primary">
              Browse Products
            </a>
            <a href="/register" className="btn-outline">
              Become a Seller
            </a>
          </div>
        </div>
      </section>

      {/* Featured Section Placeholder */}
      <section className="container-default py-16">
        <h2 className="text-2xl font-semibold mb-8">Featured Creations</h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="card p-4">
              <Image
                src="/images/clay-pot.jpg"
                alt="Sample handcrafted product"
                width={400}
                height={300}
                className="rounded-lg mb-4"
              />
              <h3 className="font-medium mb-2">Artisan Product</h3>
              <p className="text-sm text-[var(--color-muted)] mb-2">
                Beautifully handcrafted item made with care.
              </p>
              <p className="font-semibold">$49.99</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
