"use client";

import { seedProductItems } from "@/app/lib/data";
import Image from "next/image";

export default function ItemCardWrapper() {
  return (
    <>
      <div className="product-grid">
        {seedProductItems.map((product, index) => {
          return (
            <Card
              key={index}
              image={product.imageUrl}
              product_name={product.productName}
              seller={product.creatorName}
              description={product.description}
              price={product.price}
            />
          );
        })}
      </div>
    </>
  );
}

export function Card({
  image,
  product_name,
  seller,
  description,
  price,
}: {
  image: string;
  product_name: string;
  seller: string;
  description: string;
  price: number;
}) {
  return (
    <div className="product-card p-5">
      <Image src={image} width={300} height={100} alt="Placeholder Image" />
      <h2>{product_name}</h2>
      <h2>Creator: {seller}</h2>
      <p> Item Description: {description}</p>
      <p> Price: ${price}</p>
    </div>
    
  );
}
