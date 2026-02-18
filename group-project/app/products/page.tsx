import ProductFilter from "../ui/search";

export default async function ProductPage() {
  return (
    <>
      <div className="container-default"></div>
      <section className="text-center">
        {/* Filters with display*/}
        <ProductFilter/>
      </section>
    </>
)
}



