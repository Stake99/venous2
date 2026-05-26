import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Venous Lounge — Dr Sesing Surgery & Aesthetics",
  description:
    "Expert vein treatment and general surgical care in Bloemfontein. All major medical aids accepted.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="relative overflow-x-clip">
        <ScrollProgress />
        <CursorGlow />
        <Navigation />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
