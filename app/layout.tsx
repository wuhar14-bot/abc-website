import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "AnythingButClimbing — ABC",
  description: "Premium climbing chalk bags and streetwear. Meet Chalkemon.",
  openGraph: {
    title: "AnythingButClimbing",
    description: "Premium climbing chalk bags and streetwear.",
    url: "https://anythingbutclimbing.com",
    siteName: "ABC",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
