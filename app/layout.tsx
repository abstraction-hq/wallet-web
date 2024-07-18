import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "block",
  variable: "--font-inter",
});

const interDisplay = localFont({
  src: [
    {
      path: "./fonts/InterDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/InterDisplay-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-inter-display",
});

export const metadata: Metadata = {
  title: "Abstraction Wallet",
  description: "Your crypto gateway to the future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Description no longer than 155 characters */}
        <meta name="description" content="Abstraction Wallet" />
        {/* Product Name */}
        <meta name="product-name" content="Abstraction Wallet" />
        {/* Twitter Card data */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@ui8" />
        <meta name="twitter:title" content="Abstraction Wallet" />
        <meta
          name="twitter:description"
          content="Your crypto gateway to the future"
        />
        <meta name="twitter:creator" content="@abstraction-hq" />
        {/* Twitter Summary card images must be at least 120x120px */}
        <meta name="twitter:image" content="/images/logo-dark.svg" />
        {/* Open Graph data for Facebook */}
        <meta property="og:title" content="Abstraction Wallet" />
        <meta property="og:type" content="Article" />
        <meta property="og:url" content="https://wallet.abstraction.world" />
        <meta property="og:image" content="/images/logo-dark.svg" />
        <meta
          property="og:description"
          content="Your crypto gateway to the future"
        />
        <meta property="og:site_name" content="Abstraction Wallet" />
        {/* Open Graph data for LinkedIn */}
        <meta property="og:title" content="Abstraction Wallet" />
        <meta property="og:url" content="https://wallet.abstraction.world" />
        <meta property="og:image" content="/images/logo-dark.svg" />
        <meta
          property="og:description"
          content="Your crypto gateway to the future"
        />
        {/* Open Graph data for Pinterest */}
        <meta property="og:title" content="Abstraction Wallet" />
        <meta property="og:url" content="https://wallet.abstraction.world" />
        <meta property="og:image" content="/images/logo-dark.svg" />
        <meta
          property="og:description"
          content="Your crypto gateway to the future"
        />
      </head>
      <body
        className={`${inter.variable} ${interDisplay.variable} bg-theme-n-8 font-sans text-[0.9375rem] leading-[1.5rem] text-theme-primary antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
