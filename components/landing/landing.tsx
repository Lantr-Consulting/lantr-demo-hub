"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { persistLang, Reveal, Words, type Lang } from "@/components/landing/kit";

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
  color: string;
  wash: string;
};

function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`size-4 ${className}`}
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function Check() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="mt-0.5 size-4 shrink-0"
    >
      <path d="m3 8 3 3 7-7" />
    </svg>
  );
}

function ProjectShot({
  project,
  eager = false,
}: {
  project: Project;
  eager?: boolean;
}) {
  return (
    <div className="browser-shot overflow-hidden rounded-[18px] border border-black/15 bg-white">
      <div className="flex h-9 items-center border-b border-black/10 bg-[#f5f3ed] px-3.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-black/15" />
          <span className="size-2 rounded-full bg-black/15" />
          <span className="size-2 rounded-full bg-black/15" />
        </div>
        <span className="mx-auto -translate-x-4 font-mono text-[9px] tracking-[0.08em] text-black/45 sm:text-[10px]">
          {project.domain}
        </span>
      </div>
      <Image
        src={project.shot}
        alt={project.alt}
        width={1456}
        height={825}
        priority={eager}
        className="block h-auto w-full"
        sizes="(min-width: 1024px) 54vw, 100vw"
      />
    </div>
  );
}

const COPY = {
  zh: {
    brand: "学员成果",
    nav: { projects: "真实作品", process: "培养标准", account: "在线体验" },
    switch: "EN",
    switchHref: "/en",
    navCta: "查看真实作品",
    eyebrow: "蓝图学员真实成果 · 已上线 AI 产品",
    h1: "让真正出色的作品，为学生的能力作证。",
    heroBody:
      "每件作品都从学生自己的专业兴趣出发，并在蓝图一线工程与产品标准下完成设计、开发、测试和上线。它们真实可用、由学生本人掌握，也是判断力、技术能力与执行力最有说服力的证明，帮助学生在 AI 时代从同领域人才中脱颖而出。",
    heroPrimary: "亲自体验学生作品",
    heroSecondary: "了解蓝图培养体系",
    proof: ["学生本人主导", "真实产品上线", "能力有据可见"],
    collageLabel: "蓝图学员成果 / 01–03",
    bridgeBig: "真正的能力，经得起使用，也经得起追问。",
    bridgeSmall: "金融、环境健康、内容创作，三个方向各不相同。共同之处在于，每位学生都把专业兴趣转化为一件可以展示、可以解释、可以持续精进的真实产品。",
    projectsEyebrow: "精选学员成果 / 01–03",
    projectsTitle: "三件作品，三种在 AI 时代脱颖而出的能力。",
    projectsLead:
      "每件作品都开放专属互动演示。AI 功能真实运行，系统会为每位访客建立独立示例数据，让产品实力与学生判断一目了然。",
    creditNote:
      "只有得到学生本人同意，我们才会公开姓名和届次；其余作品保留匿名。",
    builtLabel: "学生独立掌握的核心能力",
    hosted: "蓝图学员真实作品 · 持续在线",
    live: "正式上线 · lantr.site",
    open: "亲自体验作品",
    processEyebrow: "从专业兴趣到正式上线",
    processTitle: "严谨标准，成就出类拔萃的作品。",
    processLead:
      "蓝图以真实产品标准管理每一个项目。从问题定义、技术架构到用户检验与正式上线，每一步都有明确要求。学生亲自完成关键判断，并能够清楚解释产品背后的系统、证据与取舍。",
    phases: [
      ["01", "选定值得解决的问题", "从专业兴趣、真实经历与未来方向出发，明确用户、需求与衡量成果的标准。"],
      ["02", "建立产品与技术底座", "完成核心工作流、数据结构与 AI 能力，让第一版尽早进入真实使用。"],
      ["03", "接受用户与证据检验", "观察真实行为，核实模型输出，并把来源、风控与人工确认写进系统。"],
      ["04", "精益求精，正式上线", "根据证据持续改进体验与可靠性，最终交付一件学生本人能够完整解释的作品。"],
    ],
    accountEyebrow: "在线体验",
    accountTitle: "亲自体验，作品实力一目了然。",
    accountLead:
      "选择任意项目，系统会立即创建独立临时工作区。无需共享账号，三个项目可以连续体验，所有操作彼此隔离。",
    accountSignedIn: (email: string) => `已登录 ${email}。现在可以直接进入任意作品。`,
    signOut: "退出登录",
    email: "邮箱",
    password: "密码",
    passwordHint: "至少 6 位",
    create: "开始专属演示",
    signIn: "登录",
    busy: "请稍候…",
    haveAccount: "已经有账户？直接登录",
    newHere: "第一次来？创建账户",
    accountNote: "工作区会在 24 小时后自动清除。每位访客都有独立数据；模拟交易、自动发布和外部通知都不会真正执行。",
    finalTitle: "让下一件出类拔萃的作品，写上你的名字。",
    finalBody: "了解蓝图如何以一线 AI 工程与产品标准，帮助学生把专业兴趣转化为真正上线、足以脱颖而出的成果。",
    finalCta: "了解蓝图培养体系",
    backToWork: "继续体验学生作品",
    tagline: "以真实作品，证明出色能力。",
    footer:
      "本页展示 Lantr 往届学生完成的项目。课程结束后，Lantr 继续托管这些作品，供访客体验。演示使用模拟或公开数据；AI Stock Analyst 只进行模拟交易，不构成投资建议；AirAware 的内容只供日常参考，不代替医疗建议；PostPilot 不会自动替用户发布内容。",
    projects: [
      {
        number: "01",
        name: "AI Stock Analyst",
        chineseName: "美股研究与模拟交易助手",
        href: "https://analyst.lantr.site/demo",
        domain: "analyst.lantr.site",
        shot: "/shots/analyst.jpg",
        alt: "往届学生项目 AI Stock Analyst 的投资组合页面",
        field: "金融 × 人工智能",
        question: "怎样让 AI 形成有证据、受风控约束，并最终由用户负责的投资判断？",
        summary:
          "学生构建了一套贯穿实时研究、投资偏好、风险审查与模拟执行的完整系统。每项建议都有数据依据，经过规则检验，并由用户保留最终决定权。",
        bullets: ["将自然语言偏好转化为明确风险边界", "结合实时行情形成有依据的研究与建议", "以代码检查每笔模拟订单并要求用户确认"],
        note: "使用模拟资金，不涉及真实交易",
        color: "#c9f04a",
        wash: "#edf5cf",
      },
      {
        number: "02",
        name: "AirAware",
        chineseName: "户外活动安排助手",
        href: "https://airaware.lantr.site/demo",
        domain: "airaware.lantr.site",
        shot: "/shots/airaware.jpg",
        alt: "往届学生项目 AirAware 的今日环境规划页面",
        field: "环境与健康 × 数据",
        question: "如何把分散的环境数据，转化为可信赖的个人行动建议？",
        summary:
          "学生将紫外线、高温、空气质量与花粉预报统一纳入个人日程。系统逐段评估户外活动条件，并在环境变化后自动重新计算建议。",
        bullets: ["整合公开天气、空气质量与花粉数据", "将公共健康标准转化为可验证规则", "结合个人日程生成并动态更新行动方案"],
        note: "内容根据公开环境数据生成，不代替医疗建议",
        color: "#52c8ff",
        wash: "#dff4ff",
      },
      {
        number: "03",
        name: "PostPilot",
        chineseName: "创作者内容工作台",
        href: "https://postpilot.lantr.site/demo",
        domain: "postpilot.lantr.site",
        shot: "/shots/postpilot.jpg",
        alt: "往届学生项目 PostPilot 的内容工作台页面",
        field: "内容创作 × 人工智能",
        question: "怎样让 AI 提升内容生产力，同时守住来源、质量与发布责任？",
        summary:
          "学生设计了一套以创作者原始材料为依据的内容工作流。系统先组织访谈、笔记与历史内容，再生成选题和初稿，同时保留来源与人工审核。",
        bullets: ["将访谈、笔记与历史内容整理为可追溯资料", "为不同平台生成初稿并执行编辑规则检查", "所有内容由用户审核，系统只负责导出"],
        note: "草稿由用户审核，产品不会自动发布",
        color: "#7b79ff",
        wash: "#e8e6ff",
      },
    ],
  },
  en: {
    brand: "Student outcomes",
    nav: { projects: "Live work", process: "Our standard", account: "Try it" },
    switch: "中文",
    switchHref: "/",
    navCta: "Explore the work",
    eyebrow: "Lantr student outcomes · Live AI products",
    h1: "Exceptional work makes talent impossible to overlook.",
    heroBody:
      "Each product began with a student’s domain interest and was developed under Lantr’s frontline engineering and product standards. The result is live, student-owned evidence of judgment, technical command, and follow-through. These are the qualities that help exceptional talent stand out in the AI era.",
    heroPrimary: "Experience the products",
    heroSecondary: "Explore the Lantr system",
    proof: ["Led by the student", "Launched for real use", "Ability made visible"],
    collageLabel: "LANTR STUDENT OUTCOMES / 01–03",
    bridgeBig: "Serious ability stands up to use and scrutiny.",
    bridgeSmall: "Finance, environmental health, and content creation demand different knowledge. Each student turned that knowledge into a product they can demonstrate, defend, and continue to improve.",
    projectsEyebrow: "Selected student outcomes / 01–03",
    projectsTitle: "Three products. Three ways exceptional talent stands out.",
    projectsLead:
      "Every product includes a private interactive demo with live AI features and isolated sample data. Open the work and examine the product decisions for yourself.",
    creditNote:
      "We publish names and cohort details only when the student has agreed; otherwise, the work stays anonymous.",
    builtLabel: "Capabilities demonstrated by the student",
    hosted: "Lantr student work · kept live",
    live: "Launched on lantr.site",
    open: "Experience the product",
    processEyebrow: "From domain interest to launch",
    processTitle: "Exacting standards produce exceptional work.",
    processLead:
      "Lantr manages every project against real product standards. From problem definition and technical architecture to user evidence and launch, each stage has clear requirements. Students own the consequential decisions and learn to defend the system, evidence, and tradeoffs behind their work.",
    phases: [
      ["01", "Choose a consequential problem", "Start from domain interest, lived experience, and future direction. Define the user, need, and standard for success."],
      ["02", "Establish the product and technical foundation", "Build the core workflow, data model, and AI capability, then put the first version into real use."],
      ["03", "Submit the work to evidence", "Observe user behavior, verify model output, and engineer the sources, safeguards, and approval steps the product requires."],
      ["04", "Refine and launch", "Improve reliability and experience against evidence, then deliver a product the student can explain with precision and confidence."],
    ],
    accountEyebrow: "Try the work",
    accountTitle: "Experience the quality for yourself.",
    accountLead:
      "Choose any product and receive an isolated temporary workspace immediately. The same private session carries across all three demos.",
    accountSignedIn: (email: string) => `Signed in as ${email}. You can now open any project directly.`,
    signOut: "Sign out",
    email: "Email",
    password: "Password",
    passwordHint: "6+ characters",
    create: "Start a private demo",
    signIn: "Sign in",
    busy: "One moment…",
    haveAccount: "Already have an account? Sign in",
    newHere: "First visit? Create an account",
    accountNote: "The workspace clears after 24 hours. Every visitor has isolated data; trading, publishing, and external notifications remain simulated.",
    finalTitle: "Build work that makes your ability impossible to overlook.",
    finalBody: "Discover how Lantr’s frontline AI engineering and product standards help students turn domain interests into launched work that stands apart.",
    finalCta: "Explore the Lantr system",
    backToWork: "Continue exploring student work",
    tagline: "Let the work prove the ability.",
    footer:
      "This page features projects completed by past Lantr students and kept online by Lantr for visitors to explore. Demos use simulated or public data. AI Stock Analyst is paper trading only and is not financial advice. AirAware provides general information, not medical advice. PostPilot never publishes automatically.",
    projects: [
      {
        number: "01",
        name: "AI Stock Analyst",
        chineseName: "AI investment research assistant",
        href: "https://analyst.lantr.site/demo",
        domain: "analyst.lantr.site",
        shot: "/shots/analyst.jpg",
        alt: "Portfolio screen from the past student project AI Stock Analyst",
        field: "Finance × artificial intelligence",
        question: "How can AI form evidence-backed investment judgments within clear risk controls and human accountability?",
        summary:
          "The student built an end-to-end system connecting live market research, investor preferences, risk review, and simulated execution. Every proposal carries evidence, passes coded rules, and leaves the final decision with the user.",
        bullets: ["Translate natural-language preferences into explicit risk limits", "Use live market data to form evidence-backed research and proposals", "Check every paper order in code and require user approval"],
        note: "Simulated funds only, with no real trading",
        color: "#c9f04a",
        wash: "#edf5cf",
      },
      {
        number: "02",
        name: "AirAware",
        chineseName: "Environmental health planner",
        href: "https://airaware.lantr.site/demo",
        domain: "airaware.lantr.site",
        shot: "/shots/airaware.jpg",
        alt: "Today screen from the past student project AirAware",
        field: "Environmental health × data",
        question: "How can fragmented environmental data become trustworthy personal guidance?",
        summary:
          "The student brought UV, heat, air quality, and pollen forecasts into one personal schedule. The system evaluates each outdoor window and recalculates its guidance when conditions change.",
        bullets: ["Integrate public weather, air-quality, and pollen data", "Translate public-health standards into testable rules", "Generate a personal plan and update it as forecasts change"],
        note: "General environmental-health information, not medical advice",
        color: "#52c8ff",
        wash: "#dff4ff",
      },
      {
        number: "03",
        name: "PostPilot",
        chineseName: "Creator content workspace",
        href: "https://postpilot.lantr.site/demo",
        domain: "postpilot.lantr.site",
        shot: "/shots/postpilot.jpg",
        alt: "Content workspace from the past student project PostPilot",
        field: "Content creation × artificial intelligence",
        question: "How can AI increase creative output while preserving sources, quality, and publishing responsibility?",
        summary:
          "The student designed an editorial system grounded in the creator’s original material. It organizes interviews, notes, and past work before generating ideas and drafts, while preserving source visibility and human review.",
        bullets: ["Organize interviews, notes, and past work into traceable sources", "Create channel-specific drafts and apply editorial checks", "Keep every draft under user review and export control"],
        note: "Users review every draft; the product never auto-publishes",
        color: "#7b79ff",
        wash: "#e8e6ff",
      },
    ],
  },
} as const;

function ProjectCase({
  project,
  copy,
  reverse,
}: {
  project: Project;
  copy: (typeof COPY)[Lang];
  reverse: boolean;
}) {
  const style = {
    "--project-color": project.color,
    "--project-wash": project.wash,
  } as CSSProperties;

  return (
    <Reveal>
      <article
        style={style}
        className="project-case overflow-hidden rounded-[26px] border border-black/10 bg-surface shadow-[0_18px_70px_-50px_rgba(19,18,16,0.55)]"
      >
        <div className="grid lg:grid-cols-[0.86fr_1.14fr]">
          <div
            className={`flex flex-col p-6 sm:p-9 lg:p-11 ${
              reverse ? "lg:order-2" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                  {copy.hosted}
                </div>
                <div className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-fg">
                  {project.field}
                </div>
              </div>
              <span className="project-number font-display text-5xl font-semibold leading-none text-fg sm:text-6xl">
                {project.number}
              </span>
            </div>

            <div className="mt-10">
              <div className="text-sm font-semibold text-muted">{project.name}</div>
              <h3 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-fg sm:text-3xl">
                {project.chineseName}
              </h3>
              <p className="mt-6 text-balance font-display text-[1.7rem] font-medium leading-[1.18] tracking-[-0.025em] text-fg sm:text-[2rem]">
                “{project.question}”
              </p>
              <p className="mt-5 text-[15px] leading-7 text-muted">{project.summary}</p>
            </div>

            <div className="mt-7 border-t border-black/10 pt-6">
              <div className="font-mono text-[10px] font-medium uppercase tracking-[0.17em] text-muted">
                {copy.builtLabel}
              </div>
              <ul className="mt-4 space-y-3">
                {project.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm leading-6 text-fg">
                    <span className="project-check flex size-5 shrink-0 items-center justify-center rounded-full">
                      <Check />
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-8">
              <a
                href={project.href}
                className="project-button inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-[#161613] transition-transform hover:-translate-y-0.5"
              >
                {copy.open}
                <Arrow />
              </a>
              <p className="max-w-52 text-right text-[11px] leading-5 text-muted">{project.note}</p>
            </div>
          </div>

          <a
            href={project.href}
            aria-label={`${copy.open}: ${project.name}`}
            className={`project-visual group relative flex min-h-[380px] items-center p-5 sm:p-9 lg:min-h-full lg:p-10 ${
              reverse ? "lg:order-1" : ""
            }`}
          >
            <span className="absolute right-5 top-5 rounded-full border border-black/10 bg-white/70 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.13em] text-black/60 backdrop-blur sm:right-8 sm:top-8">
              {copy.live}
            </span>
            <div className="w-full transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-[0.3deg]">
              <ProjectShot project={project} />
            </div>
          </a>
        </div>
      </article>
    </Reveal>
  );
}

export function Landing({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const projects = c.projects as readonly Project[];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    try {
      persistLang(lang);
    } catch {}
  }, [lang]);

  const otherLang: Lang = lang === "zh" ? "en" : "zh";

  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <nav
          className={`mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between rounded-2xl border px-3.5 transition-all duration-300 sm:px-5 ${
            scrolled
              ? "border-black/10 bg-[#f8f5ed]/90 shadow-[0_10px_40px_-28px_rgba(0,0,0,0.55)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <a href={lang === "zh" ? "/" : "/en"} className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-gold">
              <Image src="/lantr_mark.png" alt="Lantr" width={18} height={18} />
            </span>
            <span className="leading-tight">
              <span className="block text-[15px] font-bold tracking-[-0.02em] text-fg">Lantr</span>
              <span className="hidden font-mono text-[9px] uppercase tracking-[0.12em] text-muted sm:block">
                {c.brand}
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            <a href="#projects" className="rounded-full px-3.5 py-2 text-sm text-muted hover:bg-black/5 hover:text-fg">
              {c.nav.projects}
            </a>
            <a href="#process" className="rounded-full px-3.5 py-2 text-sm text-muted hover:bg-black/5 hover:text-fg">
              {c.nav.process}
            </a>
            <a href="#account" className="rounded-full px-3.5 py-2 text-sm text-muted hover:bg-black/5 hover:text-fg">
              {c.nav.account}
            </a>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <a
              href={c.switchHref}
              onClick={() => persistLang(otherLang)}
              className="rounded-full px-2.5 py-2 font-mono text-[11px] font-medium text-muted hover:bg-black/5 hover:text-fg"
            >
              {c.switch}
            </a>
            <a
              href="#projects"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-fg px-4 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
            >
              {c.navCta}
              <Arrow className="hidden sm:block" />
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="showcase-hero relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40 lg:min-h-[900px] lg:pb-32">
          <div aria-hidden className="hero-shape hero-shape-one" />
          <div aria-hidden className="hero-shape hero-shape-two" />
          <Container>
            <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
              <div className="relative z-10">
                <Reveal>
                  <span className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/60 px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.13em] text-muted backdrop-blur">
                    <span className="size-1.5 rounded-full bg-orange" />
                    {c.eyebrow}
                  </span>
                </Reveal>
                <h1 className="mt-7 max-w-3xl text-balance font-display text-[2.7rem] font-semibold leading-[1.02] tracking-[-0.035em] text-fg sm:text-[3.85rem] lg:text-[4.55rem]">
                  <Words text={c.h1} delay={100} />
                </h1>
                <Reveal delay={220}>
                  <p className="mt-7 max-w-xl text-pretty text-base leading-7 text-muted sm:text-[18px] sm:leading-8">
                    {c.heroBody}
                  </p>
                </Reveal>
                <Reveal delay={310}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href="#projects"
                      className="inline-flex h-12 items-center gap-2 rounded-full bg-orange px-5 text-sm font-semibold text-white shadow-[0_8px_24px_-14px_rgba(225,74,43,0.9)] transition-transform hover:-translate-y-0.5"
                    >
                      {c.heroPrimary}
                      <Arrow />
                    </a>
                    <a
                      href="https://lantr.ai"
                      className="inline-flex h-12 items-center gap-2 rounded-full border border-black/15 bg-white/50 px-5 text-sm font-semibold text-fg backdrop-blur transition-colors hover:bg-white"
                    >
                      {c.heroSecondary}
                      <span aria-hidden>↗</span>
                    </a>
                  </div>
                </Reveal>
                <Reveal delay={390}>
                  <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-black/10 pt-5">
                    {c.proof.map((item) => (
                      <span key={item} className="flex items-center gap-2 text-xs font-medium text-muted">
                        <span className="flex size-4 items-center justify-center rounded-full bg-fg text-[9px] text-bg">✓</span>
                        {item}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </div>

              <div className="relative mx-auto h-[510px] w-full max-w-[680px] sm:h-[620px] lg:h-[660px]">
                <div className="absolute right-0 top-0 font-mono text-[9px] uppercase tracking-[0.16em] text-muted [writing-mode:vertical-rl]">
                  {c.collageLabel}
                </div>
                {projects.map((project, index) => (
                  <Reveal
                    key={project.number}
                    delay={320 + index * 120}
                    className={`absolute w-[82%] sm:w-[76%] ${
                      index === 0
                        ? "left-0 top-6 -rotate-[4deg]"
                        : index === 1
                          ? "right-5 top-[30%] z-10 rotate-[3deg]"
                          : "bottom-0 left-8 z-20 -rotate-[1.5deg]"
                    }`}
                  >
                    <a href={project.href} className="group block">
                      <div
                        className="mb-2 flex items-end justify-between px-1"
                        style={{ color: project.color }}
                      >
                        <span className="rounded-full bg-fg px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white">
                          {project.number} / {project.name}
                        </span>
                      </div>
                      <div className="transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:rotate-0">
                        <ProjectShot project={project} eager={index === 0} />
                      </div>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="border-y border-black/15 bg-fg py-8 text-bg sm:py-10">
          <Container>
            <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr] sm:items-end sm:gap-12">
              <p className="text-balance font-display text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">
                {c.bridgeBig}
              </p>
              <p className="max-w-xl text-sm leading-6 text-white/60 sm:justify-self-end">{c.bridgeSmall}</p>
            </div>
          </Container>
        </section>

        <section id="projects" className="scroll-mt-24 py-20 sm:py-28">
          <Container>
            <Reveal className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div className="font-mono text-[10px] font-medium uppercase tracking-[0.17em] text-orange">
                {c.projectsEyebrow}
              </div>
              <div>
                <h2 className="max-w-3xl text-balance font-display text-[2.25rem] font-semibold leading-[1.07] tracking-[-0.03em] text-fg sm:text-[3.35rem]">
                  {c.projectsTitle}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-muted">{c.projectsLead}</p>
                <p className="mt-3 max-w-2xl text-xs leading-5 text-muted">{c.creditNote}</p>
              </div>
            </Reveal>

            <div className="mt-12 space-y-7 sm:mt-16 sm:space-y-10">
              {projects.map((project, index) => (
                <ProjectCase key={project.number} project={project} copy={c} reverse={index % 2 === 1} />
              ))}
            </div>
          </Container>
        </section>

        <section id="process" className="scroll-mt-24 border-y border-black/10 bg-[#e7e2d7] py-20 sm:py-28">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <Reveal>
                <div className="font-mono text-[10px] font-medium uppercase tracking-[0.17em] text-orange">
                  {c.processEyebrow}
                </div>
                <h2 className="mt-5 text-balance font-display text-[2.3rem] font-semibold leading-[1.07] tracking-[-0.03em] text-fg sm:text-[3.4rem]">
                  {c.processTitle}
                </h2>
                <p className="mt-6 max-w-xl text-base leading-7 text-muted">{c.processLead}</p>
                <a href="https://lantr.ai" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-fg underline decoration-orange decoration-2 underline-offset-4">
                  {c.heroSecondary}
                  <span aria-hidden>↗</span>
                </a>
              </Reveal>

              <div className="border-t border-black/15">
                {c.phases.map(([number, title, body], index) => (
                  <Reveal key={number} delay={index * 70}>
                    <div className="grid grid-cols-[48px_1fr] gap-4 border-b border-black/15 py-6 sm:grid-cols-[60px_0.55fr_1fr] sm:gap-6 sm:py-8">
                      <div className="font-display text-2xl font-semibold text-orange">{number}</div>
                      <h3 className="text-lg font-semibold tracking-[-0.02em] text-fg">{title}</h3>
                      <p className="col-start-2 text-sm leading-6 text-muted sm:col-start-auto">{body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section id="account" className="scroll-mt-24 bg-[#1826cc] py-20 text-white sm:py-28">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">
              <Reveal>
                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.17em] text-[#bfc8ff]">
                  {c.accountEyebrow}
                </span>
                <h2 className="mt-5 max-w-xl text-balance font-display text-[2.35rem] font-semibold leading-[1.06] tracking-[-0.03em] sm:text-[3.45rem]">
                  {c.accountTitle}
                </h2>
                <p className="mt-6 max-w-lg text-base leading-7 text-white/70">{c.accountLead}</p>
              </Reveal>

              <Reveal delay={100}>
                <div className="rounded-[26px] border border-white/20 bg-white p-5 text-fg shadow-[0_30px_80px_-45px_rgba(0,0,0,0.8)] sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-full bg-[#d9ff49] text-sm font-bold">✓</span>
                    <strong className="text-sm">{c.create}</strong>
                  </div>
                  <div className="mt-5 grid gap-2">
                    {projects.map((project) => (
                      <a key={project.name} href={project.href} className="flex h-12 items-center justify-between rounded-xl border border-black/10 bg-[#f8f6ef] px-4 text-sm font-semibold transition-colors hover:border-black/25 hover:bg-white">
                        {project.name}<Arrow />
                      </a>
                    ))}
                  </div>
                  <p className="mt-5 border-t border-black/10 pt-4 text-[11px] leading-5 text-muted">{c.accountNote}</p>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        <section className="bg-fg py-20 text-white sm:py-28">
          <Container className="text-center">
            <Reveal>
              <h2 className="mx-auto max-w-4xl text-balance font-display text-[2.35rem] font-semibold leading-[1.07] tracking-[-0.03em] sm:text-[3.65rem]">
                {c.finalTitle}
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/60">{c.finalBody}</p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <a href="https://lantr.ai" className="inline-flex h-12 items-center gap-2 rounded-full bg-[#d9ff49] px-5 text-sm font-semibold text-fg transition-transform hover:-translate-y-0.5">
                  {c.finalCta}
                  <Arrow />
                </a>
                <a href="#projects" className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 px-5 text-sm font-semibold text-white hover:bg-white/10">
                  {c.backToWork}
                </a>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-fg pb-8 pt-10 text-white">
        <Container>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-xl bg-gold">
                  <Image src="/lantr_mark.png" alt="Lantr" width={18} height={18} />
                </span>
                <span className="font-semibold">Lantr</span>
              </div>
              <p className="mt-3 font-display text-lg text-white/55">{c.tagline}</p>
            </div>
            <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/55">
              {projects.map((project) => (
                <a key={project.name} href={project.href} className="hover:text-white">
                  {project.name}
                </a>
              ))}
              <a href="https://lantr.ai" className="hover:text-white">lantr.ai ↗</a>
            </nav>
          </div>
          <p className="mt-10 border-t border-white/10 pt-6 text-[11px] leading-5 text-white/40">{c.footer}</p>
        </Container>
      </footer>
    </div>
  );
}
