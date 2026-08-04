import type { Metadata, Viewport } from "next";
import { fontClassName } from "@/lib/fonts";
import "../globals.css";

const title = "Lantr 往届学生作品展 · 三个已经上线的 AI 项目";
const description =
  "三个由 Lantr 往届学生完成并上线的真实项目：AI 投资研究助手、户外活动安排助手和创作者内容工作台。课程结束后，Lantr 继续托管这些作品，访客可以直接在线体验。";

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
    siteName: "Lantr 往届学生作品展",
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
