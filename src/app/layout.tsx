import type { Metadata } from "next";
import { Inter, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { FloatingCallButton } from "@/components/layout/FloatingCallButton";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SERVICES } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jamesbondcleaning.au"),
  title: {
    default: "James Bond Cleaning | Trusted Bond Cleaning on the Gold Coast",
    template: "%s | James Bond Cleaning",
  },
  description:
    "Professional end-of-lease cleaning on the Gold Coast that helps you secure your full bond refund. Reliable, detail-oriented, and real estate-approved.",
  keywords: [
    "James Bond Cleaning",
    "Bond Cleaning Gold Coast",
    "End of Lease Cleaning Gold Coast",
    "Exit Cleaning Gold Coast",
    "Carpet Cleaning Gold Coast",
    "Deep Cleaning Gold Coast",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://jamesbondcleaning.au",
    title: "James Bond Cleaning | Trusted Bond Cleaning on the Gold Coast",
    description:
      "Professional end-of-lease cleaning on the Gold Coast that helps you secure your full bond refund. Reliable, detail-oriented, and real estate-approved.",
    siteName: "James Bond Cleaning",
    images: [
      {
        url: "/logos/JBC-logo-JB-with-full-name-noBG.png",
        width: 1200,
        height: 630,
        alt: "James Bond Cleaning Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "James Bond Cleaning | Trusted Bond Cleaning on the Gold Coast",
    description:
      "Professional end-of-lease cleaning on the Gold Coast that helps you secure your full bond refund.",
    images: ["/logos/JBC-logo-JB-with-full-name-noBG.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          outfit.variable,
          playfair.variable,
        )}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingCallButton />
        <Toaster />
        <Analytics />
        <GoogleAnalytics gaId="G-FLZ538CG8H" />
      </body>
    </html>
  );
}
