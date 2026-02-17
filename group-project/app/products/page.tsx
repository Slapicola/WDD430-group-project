import Image from "next/image";
import Search from "../ui/search";
import ItemCardWrapper from "../ui/product-card";

export default function ProductPage() {
  return (
    <>
      <section>
        {/* Search Bar */}
        <Search placeholder="Search for a Creation..." />
      </section>

      {/* Item display */}
      <section>
        <ItemCardWrapper />
      </section>
    </>
  );
}
