import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
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
      <link rel="icon" href="/images/favicon.svg" />
      {/* Description no longer than 155 characters */}
      <meta
          name="description"
          content="Abstraction Wallet"
      />
      {/* Product Name */}
      <meta
          name="product-name"
          content="Abstraction Wallet"
      />
      {/* Twitter Card data */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@ui8" />
      <meta
          name="twitter:title"
          content="Abstraction Wallet"
      />
      <meta
          name="twitter:description"
          content="Your crypto gateway to the future"
      />
      <meta name="twitter:creator" content="@ui8" />
      {/* Twitter Summary card images must be at least 120x120px */}
      <meta
          name="twitter:image"
          content="/images/opengraph/og_twitter.png"
      />
      {/* Open Graph data for Facebook */}
      <meta
          property="og:title"
          content="Abstraction Wallet"
      />
      <meta property="og:type" content="Article" />
      <meta
          property="og:url"
          content="https://abstraction.world"
      />
      <meta
          property="og:image"
          content="/images/opengraph/og_article.png"
      />
      <meta
          property="og:description"
          content="Your crypto gateway to the future"
      />
      <meta
          property="og:site_name"
          content="Abstraction Wallet"
      />
      <meta property="fb:admins" content="132951670226590" />
      {/* Open Graph data for LinkedIn */}
      <meta
          property="og:title"
          content="Abstraction Wallet"
      />
      <meta
          property="og:url"
          content="https://abstraction.world"
      />
      <meta
          property="og:image"
          content="/images/opengraph/og_linkedin.png"
      />
      <meta
          property="og:description"
          content="Your crypto gateway to the future"
      />
      {/* Open Graph data for Pinterest */}
      <meta
          property="og:title"
          content="Abstraction Wallet"
      />
      <meta
          property="og:url"
          content="https://abstraction.world"
      />
      <meta
          property="og:image"
          content="/images/opengraph/og_printest.png"
      />
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
