"use server";

import bcrypt from "bcryptjs";
import { db } from "./db";
import { z } from "zod";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";

/* =========================
   REGISTER USER (BUYER DEFAULT)
========================= */

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function registerUser(formData: FormData): Promise<void> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) return;

  const hashed = await bcrypt.hash(parsed.data.password, 10);

  // Default role = user (buyer)
  await db.query(
    "INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4)",
    [parsed.data.name, parsed.data.email, hashed, "user"],
  );

  redirect("/login");
}

/* =========================
   ROLE UPGRADE: BECOME SELLER
========================= */

export async function becomeSeller(): Promise<void> {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  if (session.user.role === "seller") {
    redirect("/dashboard/seller");
  }

  await db.query("UPDATE users SET role = 'seller' WHERE id = $1", [
    session.user.id,
  ]);

  redirect("/dashboard/seller");
}

/* =========================
   CREATE PRODUCT (SELLER ONLY)
========================= */

const productSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.coerce.number().positive(),
  category: z.string().optional(),
  image: z.string().url().optional().or(z.literal("")),
});

export async function createProduct(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if (session.user.role !== "seller") redirect("/");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const category = formData.get("category") as string;

  const file = formData.get("image") as File;

  let imageBase64: string | null = null;

  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer());
    imageBase64 = `data:${file.type};base64,${buffer.toString("base64")}`;
  }

  await db.query(
    `INSERT INTO products
     (title, description, price, category, image, seller_id)
     VALUES ($1,$2,$3,$4,$5,$6)`,
    [
      title,
      description,
      parseFloat(price),
      category,
      imageBase64,
      session.user.id,
    ],
  );

  redirect("/dashboard/seller");
}

/* =========================
   DELETE PRODUCT (SELLER OWNERSHIP CHECK)
========================= */

export async function deleteProduct(productId: string): Promise<void> {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if (session.user.role !== "seller") redirect("/dashboard");

  const result = await db.query(
    "SELECT seller_id FROM products WHERE id = $1",
    [productId],
  );

  const product = result.rows[0];

  if (!product || product.seller_id !== session.user.id) {
    redirect("/dashboard/seller");
  }

  await db.query("DELETE FROM products WHERE id = $1", [productId]);

  redirect("/dashboard/seller");
}

/* =========================
   UPDATE PRODUCT (SELLER ONLY)
========================= */

export async function updateProduct(formData: FormData): Promise<void> {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if (session.user.role !== "seller") redirect("/dashboard");

  const id = formData.get("id") as string;

  const parsed = productSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    category: formData.get("category"),
    image: formData.get("image"),
  });

  if (!parsed.success) return;

  const result = await db.query(
    "SELECT seller_id FROM products WHERE id = $1",
    [id],
  );

  const product = result.rows[0];

  if (!product || product.seller_id !== session.user.id) {
    redirect("/dashboard/seller");
  }

  await db.query(
    `UPDATE products
     SET title = $1,
         description = $2,
         price = $3,
         category = $4,
         image = $5
     WHERE id = $6`,
    [
      parsed.data.title,
      parsed.data.description,
      parsed.data.price,
      parsed.data.category || null,
      parsed.data.image || null,
      id,
    ],
  );

  redirect("/dashboard/seller");
}

/* =========================
  CREATE ORDER ACTION (BUYER ONLY)
========================= */

export async function createOrder(productId: string): Promise<void> {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  await db.query("INSERT INTO orders (buyer_id, product_id) VALUES ($1,$2)", [
    session.user.id,
    productId,
  ]);

  redirect("/dashboard/buyer");
}
