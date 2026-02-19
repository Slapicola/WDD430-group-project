"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <form action={handleSubmit} className="container-default py-12 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <input name="email" placeholder="Email" className="input mb-4 w-full" />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="input mb-4 w-full"
      />

      <button className="btn-primary w-full">Login</button>
      <div className="mt-6 text-center text-sm text-gray-600">
        <span>New here? </span>
        <a
          href="/register"
          className="font-semibold text-[var(--color-primary)] hover:underline"
        >
          Create an account
        </a>
      </div>
    </form>
  );
}
