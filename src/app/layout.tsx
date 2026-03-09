import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "YKJ Gallery",
    template: "%s | YKJ Gallery",
  },
  description:
    "YKJ Gallery — Contemporary art by Young K Jang. Modern-abstract paintings inspired by people, nature, and the world around us. Seattle, WA.",
  keywords: [
    "art gallery",
    "contemporary art",
    "Young K Jang",
    "modern abstract",
    "paintings",
    "Seattle art",
  ],
  openGraph: {
    title: "YKJ Gallery",
    description: "Contemporary art by Young K Jang",
    url: "https://www.ykjgallery.com",
    siteName: "YKJ Gallery",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
