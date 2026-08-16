import { Geist, Geist_Mono, Vollkorn } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const displaySerif = Vollkorn({
  variable: "--font-display-serif",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

/** Class string applied to <html> in both locale root layouts. */
export const fontClassName = `${geistSans.variable} ${displaySerif.variable} ${geistMono.variable} antialiased`;
