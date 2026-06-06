import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Mono, Syne } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const syne = Syne({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "AutoElevate — Luxury Automotive Digital Agency",
  description:
    "We build digital power for luxury automotive brands. Strategy, design, development, and conversion systems for premium auto studios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${syne.variable} ${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
