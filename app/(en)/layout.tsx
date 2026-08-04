import type { Metadata, Viewport } from "next";
import { fontClassName } from "@/lib/fonts";
import "../globals.css";

const title = "Lantr Past Student Showcase · Three Shipped AI Projects";
const description =
  "Explore three real products completed and shipped by past Lantr students: an AI investment research assistant, an environmental-health planner, and a creator content workspace.";

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
    siteName: "Lantr Past Student Showcase",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf9f6",
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
