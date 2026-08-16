import type { Metadata, Viewport } from "next";
import { fontClassName } from "@/lib/fonts";
import "../globals.css";

const title = "兰图 Builder 作品｜三件正式上线的 AI 产品";
const description =
  "亲自体验三件由兰图 Builders 主导并正式上线的 AI 产品，以真实作品检验判断力、技术能力与执行力。";

export const metadata: Metadata = {
  metadataBase: new URL("https://lantr.site"),
  title,
  description,
  alternates: {
    canonical: "/",
    languages: { "zh-CN": "/", en: "/en" },
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/",
    siteName: "兰图 Builder 作品",
    locale: "zh_CN",
  },
};

export const viewport: Viewport = {
  themeColor: "#171511",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className={fontClassName}>
      <body suppressHydrationWarning className="min-h-full bg-bg text-ink">
        {children}
      </body>
    </html>
  );
}
