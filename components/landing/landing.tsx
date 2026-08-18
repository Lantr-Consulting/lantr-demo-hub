"use client";

import Image from "next/image";
import { useEffect, type CSSProperties, type ReactNode } from "react";
import { ColumnRules, persistLang, Reveal, Words, type Lang } from "@/components/landing/kit";

type Project = {
  number: string;
  name: string;
  chineseName: string;
  href: string;
  domain: string;
  shot: string;
  alt: string;
  field: string;
  question: string;
  summary: string;
  bullets: readonly string[];
  note: string;
  tint: string;
};

function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`relative mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

function SectionFrame({ children, id, className = "", gutters = false }: { children: ReactNode; id?: string; className?: string; gutters?: boolean }) {
  return (
    <section id={id} className={`relative ${className}`}>
      <ColumnRules gutters={gutters} />
      {children}
    </section>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={`size-4 ${className}`}>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={`size-4 ${className}`}>
      <path d="M5 11 11 5M6 5h5v5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden className="size-3.5">
      <rect x="2.75" y="4.25" width="14.5" height="11.5" />
      <path d="m3.5 5.25 6.5 5 6.5-5" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className="size-3.5">
      <circle cx="10" cy="10" r="7.25" />
      <path d="M2.75 10h14.5M10 2.75c2 2.1 3 4.5 3 7.25s-1 5.15-3 7.25c-2-2.1-3-4.5-3-7.25s1-5.15 3-7.25Z" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="mt-0.5 size-4 shrink-0">
      <path d="m3 8 3 3 7-7" />
    </svg>
  );
}

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span className={`inline-flex w-fit border px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] ${dark ? "border-white/25 bg-transparent text-white/65" : "border-line-strong bg-surface text-muted"}`}>
      {children}
    </span>
  );
}

function Logo({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  return (
    <a href={lang === "zh" ? "https://lantr.ai" : "https://lantr.ai/en"} className="group inline-flex items-center gap-3" aria-label={lang === "zh" ? "返回兰图官网" : "Return to Lantr"}>
      <Image src="/lantr_mark.png" alt="" width={48} height={48} className={`${compact ? "size-7" : "size-11"} brightness-0 invert transition-transform duration-300 group-hover:-rotate-6`} />
      <span>
        <span className={`${compact ? "text-lg" : "text-[1.65rem]"} block font-display font-medium leading-none text-white`}>{lang === "zh" ? "兰图" : "Lantr"}</span>
        {!compact ? <span className="mt-1.5 block font-mono text-[8px] uppercase tracking-[0.16em] text-white/42">Builder work</span> : null}
      </span>
    </a>
  );
}

function ProjectShot({ project, eager = false, compact = false }: { project: Project; eager?: boolean; compact?: boolean }) {
  return (
    <div className="browser-shot overflow-hidden border border-black/18 bg-white">
      <div className={`${compact ? "h-7" : "h-9"} flex items-center border-b border-black/10 bg-[#f6f4ef] px-3.5`}>
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-1.5 rounded-full bg-black/20" />
          <span className="size-1.5 rounded-full bg-black/20" />
          <span className="size-1.5 rounded-full bg-black/20" />
        </div>
        <span className="mx-auto -translate-x-4 font-mono text-[8px] tracking-[0.09em] text-black/45 sm:text-[9px]">{project.domain}</span>
      </div>
      <Image src={project.shot} alt={project.alt} width={1456} height={825} priority={eager} className="block h-auto w-full" sizes="(min-width: 1024px) 55vw, 100vw" />
    </div>
  );
}

const COPY = {
  zh: {
    brand: "Builder 在线作品集",
    announcement: "这里展示的是兰图 Builder 已上线的真实作品。了解完整创造者体系",
    nav: { projects: "Builder 作品", process: "兰图标准", experience: "亲自体验" },
    switch: "EN",
    switchHref: "/en",
    mainHref: "https://lantr.ai/work",
    homeHref: "https://lantr.ai",
    navCta: "返回兰图",
    eyebrow: "兰图 Builder 作品 · Lantr.site",
    h1: "让作品，\n为创造力作证。",
    heroBody: "每件产品都由 Builder 从真实问题出发，在兰图的工程与产品标准下完成设计、构建、检验与上线。作品能被使用，系统能被解释，关键判断有据可查。",
    heroPrimary: "亲自体验作品",
    heroSecondary: "了解兰图 Builder 标准",
    proof: [["03", "正式上线的产品"], ["03", "不同专业方向"], ["100%", "关键判断可解释"]],
    heroIndex: "精选作品 / 01–03",
    bridgeBig: "真正的能力，留得下作品。",
    bridgeSmall: "金融、环境健康、内容创作，三个方向各不相同。每位 Builder 都把专业兴趣变成了一件可以使用、可以解释、也可以继续精进的产品。",
    projectsEyebrow: "Selected Builder work / 01–03",
    projectsTitle: "三件正式上线的作品，三种面向未来的创造力。",
    projectsLead: "每件作品都开放独立互动演示。你可以直接进入产品，查看功能如何运行，也可以检验 Builder 在数据、风控与用户责任上的判断。",
    creditNote: "只有得到 Builder 本人同意，我们才会公开姓名和届次；其余作品保留匿名。",
    hosted: "兰图 Builder 作品 · 持续在线",
    builtLabel: "作品所体现的核心能力",
    live: "LIVE · LANTR.SITE",
    open: "打开互动演示",
    processEyebrow: "兰图创造标准",
    processTitle: "从一个真实问题，到一件经得起检验的产品。",
    processLead: "兰图以一线工程和产品标准推进每一个项目。Builder 对关键决定负责，导师提供专业评审，最终成果必须能够运行、能够说明，也能够面对真实反馈。",
    phases: [
      ["01", "找到值得解决的问题", "从 Builder 的专业兴趣与真实经历出发，明确用户、场景和判断成果的标准。"],
      ["02", "建立产品与技术底座", "完成核心工作流、数据结构与 AI 能力，让第一版尽早进入可用状态。"],
      ["03", "用证据推动精进", "观察用户行为，核实模型输出，把来源、边界和人工确认写进系统。"],
      ["04", "正式上线并从容答辩", "完成可靠性与体验打磨，让 Builder 能够准确说明架构、取舍与每个关键决定。"],
    ],
    processLink: "查看完整 Builder 体系",
    accountEyebrow: "在线体验",
    accountTitle: "现在，亲自打开它们。",
    accountLead: "三个项目都提供独立演示环境。无需共享账号；示例数据彼此隔离，涉及交易、发布和外部通知的动作均为模拟。",
    accountNote: "演示使用模拟或公开数据，并会自动清理临时记录。",
    finalTitle: "下一件值得被看见的作品，也可以从这里开始。",
    finalBody: "了解兰图如何与下一代一起，把专业兴趣、原创判断与 AI 技术变成一件真正上线的作品。",
    finalCta: "进入兰图",
    backToWork: "继续看作品",
    tagline: "以真实作品，证明创造力。",
    footer: "本页展示由兰图 Builders 完成并正式上线的项目。项目完成后，兰图继续托管这些作品，供访客体验。AI Stock Analyst 只进行模拟交易，不构成投资建议；AirAware 只供日常参考，不代替医疗建议；PostPilot 不会自动替用户发布内容。",
    projects: [
      {
        number: "01", name: "AI Stock Analyst", chineseName: "美股研究与模拟交易助手", href: "https://analyst.lantr.site/demo", domain: "analyst.lantr.site", shot: "/shots/analyst.jpg", alt: "Builder 项目 AI Stock Analyst 的投资组合页面", field: "金融 × 人工智能", question: "怎样让 AI 形成有证据、受风控约束，并最终由用户负责的投资判断？", summary: "Builder 构建了一套贯穿实时研究、投资偏好、风险审查与模拟执行的完整系统。每项建议都有数据依据，经过规则检验，并由用户保留最终决定权。", bullets: ["将自然语言偏好转化为明确风险边界", "结合实时行情形成有依据的研究建议", "以代码检查每笔模拟订单并要求用户确认"], note: "使用模拟资金，不涉及真实交易", tint: "#e7eef0",
      },
      {
        number: "02", name: "AirAware", chineseName: "户外活动安排助手", href: "https://airaware.lantr.site/demo", domain: "airaware.lantr.site", shot: "/shots/airaware.jpg", alt: "Builder 项目 AirAware 的今日环境规划页面", field: "环境健康 × 数据", question: "如何把分散的环境数据，转化为可信赖的个人行动建议？", summary: "Builder 将紫外线、高温、空气质量与花粉预报统一纳入个人日程。系统逐段评估户外活动条件，并在环境变化后自动重新计算建议。", bullets: ["整合公开天气、空气质量与花粉数据", "将公共健康标准转化为可验证规则", "结合个人日程生成并动态更新行动方案"], note: "基于公开环境数据，不代替医疗建议", tint: "#e8f0f2",
      },
      {
        number: "03", name: "PostPilot", chineseName: "创作者内容工作台", href: "https://postpilot.lantr.site/demo", domain: "postpilot.lantr.site", shot: "/shots/postpilot.jpg", alt: "Builder 项目 PostPilot 的内容工作台页面", field: "内容创作 × 人工智能", question: "怎样让 AI 提升内容生产力，同时守住来源、质量与发布责任？", summary: "Builder 设计了一套以创作者原始材料为依据的内容工作流。系统先组织访谈、笔记与历史内容，再生成选题和初稿，同时保留来源与人工审核。", bullets: ["将访谈、笔记与历史内容整理为可追溯资料", "为不同平台生成初稿并执行编辑规则检查", "所有内容由用户审核，系统只负责导出"], note: "草稿由用户审核，产品不会自动发布", tint: "#ecebea",
      },
    ],
  },
  en: {
    brand: "Live Builder portfolio",
    announcement: "Explore live products built by Lantr Builders, and the system behind them",
    nav: { projects: "Builder Work", process: "The Lantr Standard", experience: "Try the Demos" },
    switch: "中文",
    switchHref: "/",
    mainHref: "https://lantr.ai/en/work",
    homeHref: "https://lantr.ai/en",
    navCta: "Return to Lantr",
    eyebrow: "Lantr Builder work · Lantr.site",
    h1: "Let the work\nspeak for itself.",
    heroBody: "Every product here was designed, built, and shipped by a Lantr Builder, working with our engineers and held to the same review process. All three are live. Open one, look around, and judge the work for yourself.",
    heroPrimary: "Try the products",
    heroSecondary: "About the Builder program",
    proof: [["03", "live products"], ["03", "fields represented"], ["100%", "of key decisions explained"]],
    heroIndex: "Selected work / 01–03",
    bridgeBig: "The strongest evidence is a product that works.",
    bridgeSmall: "Finance, environmental health, and content creation. Each Builder started from a field they knew and built something people can use: a research assistant, a day planner, a writing workspace.",
    projectsEyebrow: "Selected Builder work / 01–03",
    projectsTitle: "Three live products. Three distinct ways to build with AI.",
    projectsLead: "Every project has a live demo. Click through, use the features, and see how each Builder handled data, safeguards, and who makes the final call.",
    creditNote: "Names and cohort details appear only with the Builder’s permission; otherwise, the work remains anonymous.",
    hosted: "Built at Lantr · live on lantr.site",
    builtLabel: "Under the hood",
    live: "LIVE · LANTR.SITE",
    open: "Open the live demo",
    processEyebrow: "The Lantr Builder Standard",
    processTitle: "From a first idea to a public launch.",
    processLead: "Builders make the key decisions themselves. Mentors review the work the way they'd review a colleague's, and nothing launches until it runs reliably and the Builder can explain how it works.",
    phases: [
      ["01", "Choose a problem worth solving", "Start with something the Builder already cares about. Define who it's for, when they'll use it, and what a win looks like."],
      ["02", "Build the foundation", "Build the core workflow, data model, and AI features, then get a usable version in front of people early."],
      ["03", "Improve through evidence", "Watch how people use it. Verify what the model says. Build sources, limits, and human approval into the product itself."],
      ["04", "Ship it and stand behind it", "Polish until it's reliable. Then the Builder walks anyone through the architecture, the tradeoffs, and every call they made."],
    ],
    processLink: "Explore the full Builder program",
    accountEyebrow: "Live demos",
    accountTitle: "Try the products for yourself.",
    accountLead: "Each demo runs in its own environment with sample data, no sign-up needed. Trades, posts, and notifications are all simulated.",
    accountNote: "Demos run on simulated or public data and clear temporary records automatically.",
    finalTitle: "The next project will start the same way.",
    finalBody: "With a problem a student cares about, and the support to build it properly. See how the Builder program works at lantr.ai.",
    finalCta: "Visit Lantr",
    backToWork: "Keep exploring",
    tagline: "Real work is the proof.",
    footer: "This page features projects completed and launched by Lantr Builders. Lantr keeps each product online after the program ends so anyone can try it. AI Stock Analyst is paper trading only and is not financial advice. AirAware offers general guidance, not medical advice. PostPilot never publishes anything automatically.",
    projects: [
      {
        number: "01", name: "AI Stock Analyst", chineseName: "AI investment research assistant", href: "https://analyst.lantr.site/demo", domain: "analyst.lantr.site", shot: "/shots/analyst.jpg", alt: "Portfolio screen from the Builder project AI Stock Analyst", field: "Finance × artificial intelligence", question: "Can AI make a smart investment case and still leave the final call to you?", summary: "AI Stock Analyst runs the full loop: live research, your risk preferences, automated checks, simulated trades. Every recommendation shows its data and waits for your approval.", bullets: ["Turns your plain-English preferences into hard risk limits", "Backs every pick with live market data and sources", "Checks each paper trade against your rules, then asks you to confirm"], note: "Paper trading only; no real money is involved", tint: "#e7eef0",
      },
      {
        number: "02", name: "AirAware", chineseName: "Environmental health planner", href: "https://airaware.lantr.site/demo", domain: "airaware.lantr.site", shot: "/shots/airaware.jpg", alt: "Today screen from the Builder project AirAware", field: "Environmental health × data", question: "Four forecasts say four different things. So when should you go outside?", summary: "AirAware reads UV, heat, air quality, and pollen against your schedule. It scores every block of outdoor time in your day and quietly re-plans when conditions shift.", bullets: ["Pulls public weather, air-quality, and pollen data", "Turns public-health guidance into rules it can test", "Plans around your calendar and updates as forecasts change"], note: "General environmental guidance, not medical advice", tint: "#e8f0f2",
      },
      {
        number: "03", name: "PostPilot", chineseName: "Creator content workspace", href: "https://postpilot.lantr.site/demo", domain: "postpilot.lantr.site", shot: "/shots/postpilot.jpg", alt: "Content workspace from the Builder project PostPilot", field: "Content creation × artificial intelligence", question: "Can AI make you a faster creator without making you a generic one?", summary: "PostPilot starts with your material: interviews, notes, past work. It organizes everything first, then drafts in your voice, with every idea traceable to its source. Nothing publishes without your sign-off.", bullets: ["Builds a searchable library from your interviews, notes, and past work", "Drafts for each platform and applies your editorial rules", "Leaves review, approval, and publishing in your hands"], note: "Every draft is user-reviewed; nothing publishes automatically", tint: "#ecebea",
      },
    ],
  },
} as const;

function Header({ lang, copy }: { lang: Lang; copy: (typeof COPY)[Lang] }) {
  const otherLang: Lang = lang === "zh" ? "en" : "zh";
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="hidden grid-cols-[clamp(230px,17vw,275px)_1fr] grid-rows-[32px_64px] shadow-[0_10px_30px_-18px_rgba(0,0,0,.65)] xl:grid">
          <div className="row-span-2 flex items-center border-r border-white/10 bg-[#0d0c0a] px-9"><Logo lang={lang} /></div>
          <div className="col-start-2 row-start-1 bg-accent text-white">
            <div className="flex h-8 items-center justify-between gap-8 px-7">
              <a href={copy.mainHref} className="group inline-flex items-center gap-2 text-[11px] font-medium text-white/90 hover:text-white">{copy.announcement}<Arrow className="size-3 transition-transform group-hover:translate-x-0.5" /></a>
              <div className="flex h-8 shrink-0 items-stretch">
                <a href="mailto:team@lantr.ai" className="inline-flex items-center gap-2.5 border-l border-white/20 px-5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/82 hover:bg-white/8 hover:text-white"><MailIcon />team@lantr.ai</a>
                <a href={copy.switchHref} onClick={() => persistLang(otherLang)} className="inline-flex items-center gap-2.5 border-l border-white/20 px-5 text-[11px] font-semibold text-white hover:bg-white/8"><GlobeIcon />{copy.switch}<span className="text-white/55">⌄</span></a>
              </div>
            </div>
          </div>
          <div className="col-start-2 row-start-2 border-b border-white/10 bg-scene">
            <nav className="flex h-16 items-center justify-between pl-5" aria-label="Primary">
              <div className="flex h-full items-center">
                <a href="#projects" className="flex h-full items-center border-b-2 border-[#8fc3d1] px-4 text-[12.5px] font-medium text-white">{copy.nav.projects}</a>
                <a href="#process" className="flex h-full items-center border-b-2 border-transparent px-4 text-[12.5px] font-medium text-white/68 hover:text-white">{copy.nav.process}</a>
                <a href="#experience" className="flex h-full items-center border-b-2 border-transparent px-4 text-[12.5px] font-medium text-white/68 hover:text-white">{copy.nav.experience}</a>
              </div>
              <a href={copy.homeHref} className="inline-flex h-16 min-w-[174px] items-center justify-center gap-2 bg-[#a9c8d1] px-6 text-[12px] font-semibold text-scene hover:bg-white">{copy.navCta}<Arrow className="size-3.5" /></a>
            </nav>
          </div>
        </div>

        <div className="border-b border-white/10 bg-scene xl:hidden">
          <nav className="flex h-16 items-center justify-between gap-4 px-5 sm:px-8" aria-label="Mobile primary">
            <Logo lang={lang} compact />
            <div className="flex items-center gap-1">
              <a href={copy.switchHref} onClick={() => persistLang(otherLang)} className="inline-flex h-10 items-center gap-2 px-3 font-mono text-[10px] font-medium text-white/70"><GlobeIcon />{copy.switch}</a>
              <a href={copy.homeHref} className="inline-flex h-10 items-center gap-2 border border-white/25 px-3 text-[11px] font-semibold text-white">{copy.navCta}<Arrow className="size-3" /></a>
            </div>
          </nav>
        </div>
      </header>
      <div aria-hidden className="h-16 xl:h-24" />
    </>
  );
}

function ProjectCase({ project, copy, reverse }: { project: Project; copy: (typeof COPY)[Lang]; reverse: boolean }) {
  const style = { "--project-tint": project.tint } as CSSProperties;
  return (
    <Reveal>
      <article style={style} className="overflow-hidden border border-line-strong bg-surface shadow-card">
        <div className="grid lg:grid-cols-[0.84fr_1.16fr]">
          <div className={`flex flex-col p-6 sm:p-9 lg:p-11 ${reverse ? "lg:order-2" : ""}`}>
            <div className="flex items-start justify-between gap-6 border-b border-line-strong pb-5">
              <div>
                <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.17em] text-accent-ink">{copy.hosted}</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.11em] text-fg">{project.field}</div>
              </div>
              <span className="project-number font-display text-5xl leading-none sm:text-6xl">{project.number}</span>
            </div>
            <div className="mt-8">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">{project.name}</div>
              <h3 className="mt-2 font-display text-[2rem] font-normal leading-[1.08] text-fg sm:text-[2.4rem]">{project.chineseName}</h3>
              <p className="mt-6 text-balance font-display text-[1.4rem] font-normal leading-[1.22] text-fg sm:text-[1.62rem]">“{project.question}”</p>
              <p className="mt-5 text-[14px] leading-[1.85] text-muted">{project.summary}</p>
            </div>
            <div className="mt-7 border-t border-line-strong pt-6">
              <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.17em] text-muted">{copy.builtLabel}</div>
              <ul className="mt-4 space-y-3">
                {project.bullets.map((bullet) => <li key={bullet} className="flex gap-3 text-[13px] leading-6 text-fg"><span className="text-accent-ink"><Check /></span>{bullet}</li>)}
              </ul>
            </div>
            <div className="mt-auto flex flex-col items-start gap-4 pt-8 sm:flex-row sm:items-end sm:justify-between">
              <a href={project.href} className="group inline-flex h-12 items-center justify-center gap-2 bg-scene px-5 text-[13px] font-semibold text-white hover:bg-accent-ink">{copy.open}<Arrow className="transition-transform group-hover:translate-x-0.5" /></a>
              <p className="max-w-52 text-[10.5px] leading-5 text-muted sm:text-right">{project.note}</p>
            </div>
          </div>
          <a href={project.href} aria-label={`${copy.open}: ${project.name}`} className={`project-visual group relative flex min-h-[360px] items-center border-t border-line-strong p-5 sm:p-9 lg:min-h-full lg:border-t-0 lg:p-10 ${reverse ? "lg:order-1 lg:border-r" : "lg:border-l"}`}>
            <span className="absolute right-5 top-5 border border-black/12 bg-white/82 px-3 py-1.5 font-mono text-[8px] font-semibold uppercase tracking-[0.15em] text-black/55 sm:right-8 sm:top-8">{copy.live}</span>
            <div className="w-full transition-transform duration-500 ease-out group-hover:-translate-y-1"><ProjectShot project={project} /></div>
          </a>
        </div>
      </article>
    </Reveal>
  );
}

export function Landing({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const projects = c.projects as readonly Project[];

  useEffect(() => { persistLang(lang); }, [lang]);

  return (
    <div className="min-h-screen bg-bg text-ink">
      <Header lang={lang} copy={c} />
      <main>
        <SectionFrame gutters className="border-b border-line bg-bg py-16 sm:py-24 lg:py-28">
          <Container>
            <div className="grid gap-9 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
              <Reveal>
                <Eyebrow>{c.eyebrow}</Eyebrow>
                <div className="mt-10 hidden border-t border-line-strong lg:block">
                  {projects.map((project) => (
                    <a key={project.number} href={project.href} className="group grid grid-cols-[36px_1fr_auto] items-center gap-3 border-b border-line-strong py-4">
                      <span className="font-display text-lg text-accent-ink">{project.number}</span>
                      <span className="text-[12px] font-semibold text-fg">{project.name}</span>
                      <ArrowUpRight className="size-3.5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ))}
                </div>
              </Reveal>
              <div>
                <h1 className={`whitespace-pre-line text-balance font-display font-normal tracking-[-0.015em] text-fg ${lang === "en" ? "text-[3.1rem] leading-[0.96] sm:text-[4.15rem] lg:text-[4.8rem]" : "text-[3.25rem] leading-[0.98] sm:text-[4.8rem] lg:text-[5.55rem]"}`}><Words text={c.h1} delay={80} /></h1>
                <Reveal delay={180}>
                  <p className="mt-7 max-w-2xl text-pretty text-[15px] leading-[1.9] text-muted sm:text-[17px]">{c.heroBody}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href="#projects" className="group inline-flex h-12 items-center gap-2 bg-accent px-5 text-[13px] font-semibold text-white hover:bg-accent-ink">{c.heroPrimary}<Arrow className="transition-transform group-hover:translate-x-0.5" /></a>
                    <a href={c.mainHref} className="inline-flex h-12 items-center gap-2 border border-line-strong bg-surface px-5 text-[13px] font-semibold text-fg hover:border-fg/45">{c.heroSecondary}<ArrowUpRight /></a>
                  </div>
                </Reveal>
              </div>
            </div>

            <Reveal delay={260} className="mt-14 sm:mt-18">
              <div className="border border-line-strong bg-surface p-3 sm:p-5">
                <div className="mb-3 flex items-center justify-between border-b border-line pb-3 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted"><span>{c.heroIndex}</span><span>lantr.site</span></div>
                <div className="grid gap-3 lg:grid-cols-[1.16fr_0.84fr]">
                  <a href={projects[0].href} className="group relative bg-accent-wash p-3 sm:p-5">
                    <ProjectShot project={projects[0]} eager />
                    <span className="mt-3 flex items-center justify-between font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-accent-ink"><span>01 · {projects[0].name}</span><ArrowUpRight /></span>
                  </a>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    {projects.slice(1).map((project) => (
                      <a key={project.number} href={project.href} className="group grid items-center gap-4 bg-bg-2 p-3 sm:grid-cols-[0.62fr_0.38fr]">
                        <ProjectShot project={project} compact />
                        <span className="flex h-full flex-col justify-between gap-3 py-1">
                          <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-accent-ink">{project.number} · Live</span>
                          <strong className="text-[12px] leading-snug text-fg">{project.name}</strong>
                          <ArrowUpRight className="size-3.5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="mt-8 grid border-y border-line-strong sm:grid-cols-3">
              {c.proof.map(([value, label], index) => (
                <Reveal key={label} delay={300 + index * 60}>
                  <div className={`grid grid-cols-[72px_1fr] items-center gap-4 py-5 sm:block sm:px-6 ${index > 0 ? "border-t border-line-strong sm:border-l sm:border-t-0" : ""}`}>
                    <strong className="font-display text-[1.55rem] font-normal text-accent-ink">{value}</strong>
                    <span className="mt-1 block text-[11px] leading-5 text-muted">{label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </SectionFrame>

        <SectionFrame className="border-b border-white/10 bg-scene py-10 text-white [--lp-rule:rgba(255,255,255,0.07)]">
          <Container>
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20">
              <Reveal><h2 className="max-w-xl font-display text-[2.35rem] font-normal leading-[1.08] sm:text-[3.1rem]">{c.bridgeBig}</h2></Reveal>
              <Reveal delay={80}><p className="max-w-2xl text-[15px] leading-[1.85] text-white/62 sm:text-[16px]">{c.bridgeSmall}</p></Reveal>
            </div>
          </Container>
        </SectionFrame>

        <SectionFrame id="projects" gutters className="scroll-mt-24 bg-bg py-20 sm:py-28">
          <Container>
            <Reveal className="grid gap-7 lg:grid-cols-[0.62fr_1.38fr] lg:items-end lg:gap-20">
              <Eyebrow>{c.projectsEyebrow}</Eyebrow>
              <div>
                <h2 className="max-w-4xl text-balance font-display text-[2.45rem] font-normal leading-[1.06] text-fg sm:text-[3.6rem]">{c.projectsTitle}</h2>
                <p className="mt-5 max-w-2xl text-[14px] leading-[1.85] text-muted">{c.projectsLead}</p>
                <p className="mt-3 max-w-2xl text-[10.5px] leading-5 text-faint">{c.creditNote}</p>
              </div>
            </Reveal>
            <div className="mt-12 space-y-7 sm:mt-16 sm:space-y-10">
              {projects.map((project, index) => <ProjectCase key={project.number} project={project} copy={c} reverse={index % 2 === 1} />)}
            </div>
          </Container>
        </SectionFrame>

        <SectionFrame id="process" gutters className="scroll-mt-24 border-y border-white/10 bg-scene py-20 text-white [--lp-rule:rgba(255,255,255,0.07)] sm:py-28">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[0.76fr_1.24fr] lg:gap-20">
              <Reveal>
                <Eyebrow dark>{c.processEyebrow}</Eyebrow>
                <h2 className="mt-6 text-balance font-display text-[2.45rem] font-normal leading-[1.07] sm:text-[3.45rem]">{c.processTitle}</h2>
                <p className="mt-6 max-w-xl text-[14px] leading-[1.9] text-white/55">{c.processLead}</p>
                <a href={c.mainHref} className="group mt-8 inline-flex items-center gap-2 border-b border-white/35 pb-1 text-[12px] font-semibold text-white hover:border-[#8fc3d1] hover:text-[#8fc3d1]">{c.processLink}<ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
              </Reveal>
              <div className="border-t border-white/20">
                {c.phases.map(([number, title, body], index) => (
                  <Reveal key={number} delay={index * 60}>
                    <div className="grid grid-cols-[48px_1fr] gap-4 border-b border-white/16 py-6 sm:grid-cols-[58px_0.72fr_1fr] sm:gap-6 sm:py-8">
                      <div className="font-display text-2xl text-[#8fc3d1]">{number}</div>
                      <h3 className="text-[15px] font-semibold leading-snug text-white">{title}</h3>
                      <p className="col-start-2 text-[12px] leading-[1.8] text-white/50 sm:col-start-auto">{body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </SectionFrame>

        <SectionFrame id="experience" gutters className="scroll-mt-24 bg-accent-wash py-20 sm:py-28">
          <Container>
            <Reveal className="grid gap-7 lg:grid-cols-[0.62fr_1.38fr] lg:items-end lg:gap-20">
              <Eyebrow>{c.accountEyebrow}</Eyebrow>
              <div>
                <h2 className="font-display text-[2.5rem] font-normal leading-[1.06] text-fg sm:text-[3.7rem]">{c.accountTitle}</h2>
                <p className="mt-5 max-w-2xl text-[14px] leading-[1.85] text-muted">{c.accountLead}</p>
              </div>
            </Reveal>
            <div className="mt-12 grid border border-line-strong bg-surface lg:grid-cols-3">
              {projects.map((project, index) => (
                <Reveal key={project.name} delay={index * 70} className="h-full">
                  <a href={project.href} className={`group flex h-full min-h-56 flex-col p-6 sm:p-8 ${index > 0 ? "border-t border-line-strong lg:border-l lg:border-t-0" : ""}`}>
                    <span className="font-display text-2xl text-accent-ink">{project.number}</span>
                    <span className="mt-8 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-muted">{project.field}</span>
                    <strong className="mt-2 text-[17px] font-semibold text-fg">{project.name}</strong>
                    <span className="mt-auto flex items-center justify-between border-t border-line pt-4 text-[11px] font-semibold text-fg">{c.open}<ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                  </a>
                </Reveal>
              ))}
            </div>
            <p className="mt-4 font-mono text-[9px] leading-5 tracking-[0.04em] text-muted">{c.accountNote}</p>
          </Container>
        </SectionFrame>

        <SectionFrame className="border-t border-white/10 bg-scene py-20 text-white [--lp-rule:rgba(255,255,255,0.07)] sm:py-28">
          <Container>
            <Reveal className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-20">
              <div>
                <h2 className="max-w-4xl text-balance font-display text-[2.5rem] font-normal leading-[1.06] sm:text-[3.7rem]">{c.finalTitle}</h2>
                <p className="mt-6 max-w-2xl text-[14px] leading-[1.85] text-white/52">{c.finalBody}</p>
              </div>
              <div className="flex flex-col gap-3 lg:items-stretch">
                <a href={c.homeHref} className="group inline-flex h-13 items-center justify-between bg-[#a9c8d1] px-5 text-[12px] font-semibold text-scene hover:bg-white">{c.finalCta}<Arrow className="transition-transform group-hover:translate-x-0.5" /></a>
                <a href="#projects" className="inline-flex h-13 items-center justify-between border border-white/25 px-5 text-[12px] font-semibold text-white hover:bg-white/8">{c.backToWork}<Arrow /></a>
              </div>
            </Reveal>
          </Container>
        </SectionFrame>
      </main>

      <footer className="border-t border-white/10 bg-[#0d0c0a] pb-8 pt-10 text-white">
        <Container>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div><Logo lang={lang} compact /><p className="mt-3 font-display text-lg text-white/48">{c.tagline}</p></div>
            <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3 text-[12px] text-white/52">
              {projects.map((project) => <a key={project.name} href={project.href} className="hover:text-white">{project.name}</a>)}
              <a href={c.mainHref} className="hover:text-white">lantr.ai <span aria-hidden>↗</span></a>
              <a href="mailto:team@lantr.ai" className="hover:text-white">team@lantr.ai</a>
            </nav>
          </div>
          <p className="mt-10 border-t border-white/10 pt-6 text-[10px] leading-5 text-white/34">{c.footer}</p>
        </Container>
      </footer>
    </div>
  );
}
