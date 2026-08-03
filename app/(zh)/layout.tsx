import type { Metadata, Viewport } from "next";
import { fontClassName } from "@/lib/fonts";
import "../globals.css";

const title = "蓝图 Lantr · 项目演示 — 三个真实上线的学员同款 AI 产品";
const description =
  "AI 股票分析师、环境健康规划师、创作者增长负责人——三个从零开始、按里程碑上线的真实 AI 产品，与 Lantr 学员的构建路径完全一致。一个账户通行全部演示，全部模拟数据，源码公开。";

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
    siteName: "蓝图 Lantr · 项目演示",
    locale: "zh_CN",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf9f6",
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
