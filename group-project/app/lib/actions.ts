"use server";

import bcrypt from "bcryptjs";
import { db } from "./db";
import { z } from "zod";
import { redirect } from "next/navigation";

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

  if (!parsed.success) {
    return; // just exit
  }

  const hashed = await bcrypt.hash(parsed.data.password, 10);

  await db.query(
    "INSERT INTO users (name, email, password) VALUES ($1,$2,$3)",
    [parsed.data.name, parsed.data.email, hashed],
  );

  redirect("/login");
}
