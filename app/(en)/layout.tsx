import type { Metadata, Viewport } from "next";
import { fontClassName } from "@/lib/fonts";
import "../globals.css";

const title = "Lantr Builder Work | Live AI Products";
const description =
  "Three live AI products built and shipped by Lantr Builders. Open the demos, use the features, and see how each one was made.";

export const metadata: Metadata = {
  metadataBase: new URL("https://lantr.site"),
  title,
  description,
  alternates: {
    canonical: "/en",
    languages: { "zh-CN": "/", en: "/en" },
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/en",
    siteName: "Lantr Builder Work",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#171511",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontClassName}>
      <body suppressHydrationWarning className="min-h-full bg-bg text-ink">
        {children}
      </body>
    </html>
  );
}
