"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

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
          <Link href="/products" className="hover:text-[var(--color-primary)]">
            Products
          </Link>

          <Link href="/sellers" className="hover:text-[var(--color-primary)]">
            Sellers
          </Link>

          {/* 👇 SHOW LOGIN IF NOT AUTHENTICATED */}
          {!session && (
            <Link href="/login" className="hover:text-[var(--color-primary)]">
              Login
            </Link>
          )}

          {/* 👇 SHOW ROLE LINKS IF AUTHENTICATED */}
          {session && (
            <>
              {session.user?.role === "seller" && (
                <Link
                  href="/dashboard/seller"
                  className="hover:text-[var(--color-primary)]"
                >
                  Seller Dashboard
                </Link>
              )}

              {session.user?.role === "user" && (
                <Link
                  href="/dashboard/buyer"
                  className="hover:text-[var(--color-primary)]"
                >
                  My Account
                </Link>
              )}

              <button
                onClick={() => signOut()}
                className="text-red-500 hover:underline"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
