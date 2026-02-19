"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  const role = session?.user?.role;

  return (
    <header className="bg-white border-b border-[var(--color-border)]">
      <nav className="container-default flex items-center justify-between py-4">
        <Link
          href="/"
          className="text-xl font-bold text-[var(--color-primary)]"
        >
          Handcrafted Haven
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {/* ALWAYS AVAILABLE */}
          <Link href="/products" className="hover:text-[var(--color-primary)]">
            Browse Products
          </Link>

          {/* NOT AUTHENTICATED */}
          {!session && (
            <>
              <Link
                href="/sellers"
                className="hover:text-[var(--color-primary)]"
              >
                Sellers
              </Link>

              <Link href="/login" className="hover:text-[var(--color-primary)]">
                Get Started
              </Link>
            </>
          )}

          {/* BUYER NAVIGATION */}
          {role === "user" && (
            <>
              <Link
                href="/dashboard/buyer"
                className="hover:text-[var(--color-primary)]"
              >
                My Account
              </Link>

              <Link
                href="/become-seller"
                className="hover:text-[var(--color-primary)]"
              >
                Become a Seller
              </Link>
            </>
          )}

          {/* SELLER NAVIGATION */}
          {role === "seller" && (
            <>
              <Link
                href="/dashboard/seller"
                className="hover:text-[var(--color-primary)]"
              >
                My Products
              </Link>

              <Link
                href="/dashboard/seller/new"
                className="hover:text-[var(--color-primary)]"
              >
                Add Product
              </Link>
            </>
          )}

          {/* LOGOUT */}
          {session && (
            <button
              onClick={() => signOut()}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
