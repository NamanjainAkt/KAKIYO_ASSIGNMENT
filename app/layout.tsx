import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Navbar } from "@/components/ui/navbar";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kakiyo AI | Smart Prospecting",
  description: "AI-powered resume analysis and outreach generator",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FBFBFA] text-[#1C1C1A] selection:bg-[#D97706] selection:text-white">
        <Navbar session={session} />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
