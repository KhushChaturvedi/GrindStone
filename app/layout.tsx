import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-heading" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Grindstone",
  description: "Daily skill tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="font-[family-name:var(--font-body)]">
        <div className="flex min-h-screen bg-ink">
          <Sidebar />
          <main className="flex-1 flex justify-center px-10 py-16">
            <div className="w-full max-w-2xl">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}