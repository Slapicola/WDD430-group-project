import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "./ui/components/header";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: {
    default: "Handcrafted Haven",
    template: "%s | Handcrafted Haven",
  },
  description:
    "A curated marketplace connecting artisans with conscious consumers seeking unique handcrafted treasures.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="font-sans">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-grow">{children}</main>

            <footer className="mt-16 border-t py-6 text-center text-sm text-gray-500">
              <p>© {new Date().getFullYear()} Handcrafted Haven</p>
              <p className="mt-1 font-medium">Developed by Team 2 - WDD430</p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
