// Do something with grids?
//Cant really do anything until database is set up but I could possibly write the code still?
import Image from "next/image";

export default async function ItemCardWrapper() {
  return (
    <Card
      image="/image-placeholder.jpg"
      product_name="A Product Name"
      description="This is an item description"
      price={10.0}
    />
  );
}

export function Card({
  image,
  product_name,
  description,
  price,
}: {
  image: string;
  product_name: string;
  description: string;
  price: number;
}) {
  return (
    <div>
      <Image src={image} width={300} height={100} alt="Placeholder Image" />
      <h2>{product_name}</h2>
      <p> Item Description: {description}</p>
      <p> Price: ${price}</p>
    </div>
  );
}

// export async function ItemGrid() {
//   return (

//   );
// }
