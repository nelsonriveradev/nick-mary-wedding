import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/myComponents/NavBar";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/myComponents/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nick & Mariel Wedding App",
  description:
    "Share your photos with us, we are glad that you are part of our wedding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <Navbar />
        </header>
        <Toaster position="top-right" richColors />
        {children}
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
