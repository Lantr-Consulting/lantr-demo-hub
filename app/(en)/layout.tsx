import type { Metadata, Viewport } from "next";
import { fontClassName } from "@/lib/fonts";
import "../globals.css";

const title = "Lantr Builder Work | Live AI Products";
const description =
  "Try three live AI products designed, built, and launched by Lantr Builders — working software you can use, question, and trace decision by decision.";

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
