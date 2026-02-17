import dbConnect from "@/lib/mongodb";
import Item from "@/models/Item";

export async function GET() {
  try {
    await dbConnect();

    const count = await Item.countDocuments();
    if (count > 0) {
      return Response.json({ message: "Items already exist, skipping seed." });
    }

    await Item.insertMany([
      {
        creatorName: "Alex Rivera",
        imageUrl: "https://picsum.photos/seed/handcrafted1/800/600",
        description: "Hand-carved wooden bowl finished with natural oil.",
        price: 45,
      },
      {
        creatorName: "Jordan Lee",
        imageUrl: "https://picsum.photos/seed/handcrafted2/800/600",
        description: "Woven wall hanging with warm neutral tones.",
        price: 65,
      },
      {
        creatorName: "Sam Patel",
        imageUrl: "https://picsum.photos/seed/handcrafted3/800/600",
        description: "Ceramic mug set with a speckled glaze.",
        price: 30,
      },
    ]);

    return Response.json({ message: "Seeded items successfully." });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
