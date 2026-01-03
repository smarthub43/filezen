import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script"; // Import for the JSON-LD trick
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

// SEO Optimization: Expanded keywords and title template
export const metadata: Metadata = {
  title: {
    default: "FileZen - Free Online Image Converter (PNG, JPG, WEBP)",
    template: "%s | FileZen"
  },
  description: "Convert images securely in your browser. 100% Offline, no server uploads. Supports PNG to JPG, WebP to PNG, and more.",
  keywords: ["image converter", "png to jpg", "webp converter", "offline converter", "privacy tool"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <Navbar />
        {children}
        <Footer />
        
        {/* SEO TRICK: JSON-LD Schema to tell Google this is a "Software Application" */}
        <Script id="schema-software" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "FileZen",
              "url": "https://filezen-tool.vercel.app",
              "description": "Free, secure, and offline file converter tool. Convert PNG, JPG, WebP, and BMP instantly in your browser.",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": "Offline conversion, Privacy-focused, No file limits"
            }
          `}
        </Script>
      </body>
    </html>
  );
}