import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next"; // Built-in Vercel tracking
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

// 1. Optimized SEO Metadata
export const metadata: Metadata = {
  title: {
    default: "FileZen - Free Online Image Converter (PNG, JPG, WEBP, BMP)",
    template: "%s | FileZen"
  },
  description: "Convert images securely in your browser. 100% Offline, no server uploads. Safe and fast conversion for PNG, JPG, WebP, and BMP.",
  keywords: ["image converter", "png to jpg", "webp converter", "offline converter", "privacy tool"],
  
  // 2. Google Search Console Verification
  // Replace 'YOUR_CODE_HERE' with the code Google gives you
  verification: {
    google: "YOUR_CODE_HERE", 
  },
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
        <main>{children}</main>
        <Footer />
        
        {/* 3. Vercel Analytics Tracker */}
        <Analytics />

        {/* 4. JSON-LD Schema (Software Identity) */}
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