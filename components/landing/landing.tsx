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
    brand: "往届学生作品",
    nav: { projects: "作品", process: "完成过程", account: "在线体验" },
    switch: "EN",
    switchHref: "/en",
    navCta: "看作品",
    eyebrow: "Lantr 往届学生作品展",
    h1: "不是作业展示，是学生真正做出来的产品。",
    heroBody:
      "下面三个项目都出自 Lantr 往届学生。它们从一个真实问题开始，在课程中一步步做成完整产品；课程结束后，我们继续把它们托管在 lantr.site，供你亲手体验。",
    heroPrimary: "看看他们做了什么",
    heroSecondary: "了解 Lantr",
    proof: ["往届学生原创", "已经上线运行", "Lantr 持续托管"],
    collageLabel: "往届学生作品 / 01—03",
    bridgeBig: "三份作品，三种完全不同的出发点。",
    bridgeSmall: "不是统一命题，也不是照着模板复刻。每位学生都从自己的兴趣和专业方向出发，选一个真正想解决的问题，再把它做成完整产品。",
    projectsEyebrow: "精选往届学生作品 / 01—03",
    projectsTitle: "先看问题，再看学生怎么把它做成产品。",
    projectsLead:
      "每个项目都提供无需注册的专属演示。系统会为你单独准备示例数据，AI 功能真实运行，所有修改互不干扰。",
    creditNote:
      "项目作者信息仅在获得学生本人授权后公开；本页不会使用虚构姓名、届次或经历。",
    builtLabel: "学生完成的核心部分",
    hosted: "往届学生作品 · 课程结束后由 Lantr 继续托管",
    live: "已上线 · lantr.site",
    open: "开始互动体验",
    processEyebrow: "从课堂到上线",
    processTitle: "从一个问题，到一件能用的作品。",
    processLead:
      "我们不会直接给学生一个标准答案。导师会陪他们先确定用户和使用场景，把问题拆成能完成的小步骤：先上线第一版，再逐步加入 AI、数据、交互和必要的安全规则。",
    phases: [
      ["01", "找到真问题", "从兴趣、专业方向或亲身经历出发，先说清楚产品究竟要帮谁。"],
      ["02", "先上线第一版", "不等所有功能都做完，先发布一个能打开、能操作的版本。"],
      ["03", "把功能做完整", "接入实际会用到的数据和 AI，同时把风险检查、来源说明和人工确认做进产品。"],
      ["04", "继续试，继续改", "根据实际使用时遇到的问题调整流程，直到作品不只适合展示，也真的可以体验。"],
    ],
    accountEyebrow: "在线体验",
    accountTitle: "不妨亲自打开看看。",
    accountLead:
      "不用注册，也不用记演示账号。选择一个项目后，系统会立即创建只有你能看到的临时工作区；之后打开另外两个项目也可以继续使用。",
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
    finalTitle: "下一件上线的作品，也可以从一个好问题开始。",
    finalBody: "去 lantr.ai 看看学生如何在导师陪伴下，把自己的想法一步步做成产品。",
    finalCta: "了解 Lantr 课程",
    backToWork: "再看一遍学生作品",
    tagline: "把想法做出来，也把它真正上线。",
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
        question: "能不能让 AI 做研究，同时把每一次交易决定留给人？",
        summary:
          "学生把实时行情、投资偏好和模拟交易连成了一套完整流程。AI 可以整理研究结果并提出交易建议，但每笔订单都要先经过风险检查，再由用户确认。",
        bullets: ["用自己的话说明投资偏好和风险要求", "查看实时行情，整理研究结果和交易建议", "每笔模拟订单都要经过风险检查和用户确认"],
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
        question: "天气数据很多，怎样才能真的帮人安排好今天？",
        summary:
          "学生把紫外线、高温、空气质量和花粉预报放进个人日程里。产品会逐段判断户外活动是否合适，并在条件变化时重新给出安排。",
        bullets: ["接入公开的天气与空气质量数据", "把公共健康标准写成可以逐项检查的规则", "根据个人日程安排活动，预报变化后及时更新"],
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
        question: "AI 能帮创作者写内容，但怎样才能不替人编故事？",
        summary:
          "学生让产品先整理创作者自己的访谈、笔记和旧内容，再从真实材料中找选题、写初稿。每篇内容都会注明用了哪些材料，最后仍由创作者审核和发布。",
        bullets: ["把访谈、笔记和旧内容整理成可查找的材料", "为不同平台准备初稿，并在发布前逐项检查", "内容由用户审核，产品只导出、不会自动发布"],
        note: "草稿由用户审核，产品不会自动发布",
        color: "#7b79ff",
        wash: "#e8e6ff",
      },
    ],
  },
  en: {
    brand: "Past student work",
    nav: { projects: "Work", process: "How it was built", account: "Try it" },
    switch: "中文",
    switchHref: "/",
    navCta: "View the work",
    eyebrow: "Lantr Student Showcase · Past student projects",
    h1: "Not class exercises. Products our students actually shipped.",
    heroBody:
      "These three projects were created by past Lantr students. Each began with a real question and grew into a complete product during the program. We continue to host them on lantr.site so you can experience the work for yourself.",
    heroPrimary: "See what they built",
    heroSecondary: "About Lantr",
    proof: ["Original student work", "Live and working", "Hosted by Lantr"],
    collageLabel: "PAST STUDENT WORK / 01—03",
    bridgeBig: "Three projects. Three very different starting points.",
    bridgeSmall: "No shared prompt and no template to trace. Students began with their own interests and intended fields, then took the problem—and the product—all the way.",
    projectsEyebrow: "Selected student work / 01—03",
    projectsTitle: "Start with the question. Then see how each student made it real.",
    projectsLead:
      "Every project has an instant private demo. The AI features are live, while isolated sample data keeps each visitor's experience separate.",
    creditNote:
      "Student names and cohort details are published only with the creator’s permission; this page does not invent attribution.",
    builtLabel: "What the student built",
    hosted: "Past student project · hosted by Lantr",
    live: "Live on lantr.site",
    open: "Try the interactive demo",
    processEyebrow: "From class to launch",
    processTitle: "From one good question to a product people can use.",
    processLead:
      "Mentors do not hand students a standard answer. They help break the problem down: define the user, ship early, then add AI, data, interaction, and safeguards one working layer at a time.",
    phases: [
      ["01", "Find the real problem", "Begin with an interest, intended field, or lived experience—and get specific about who the product helps."],
      ["02", "Ship early", "Do not wait for a perfect final reveal. Put a small, usable first version online."],
      ["03", "Make the ability real", "Connect live data and AI, while building risk checks, citations, and human approval into the product."],
      ["04", "Use it, then refine it", "Follow the friction in real use and keep adjusting until the work holds up beyond a presentation."],
    ],
    accountEyebrow: "Try the work",
    accountTitle: "Do more than look at screenshots.",
    accountLead:
      "No signup and no shared password. Choose a project and we’ll create a private temporary workspace instantly; the same session carries into the other demos.",
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
    finalTitle: "The next shipped product can start with one good question.",
    finalBody: "Visit lantr.ai to see how students work with a mentor to turn an idea into a product, one working step at a time.",
    finalCta: "Explore the Lantr program",
    backToWork: "Return to student work",
    tagline: "Make the idea real. Put it in the world.",
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
        question: "Can AI do the research while leaving every trading decision to a person?",
        summary:
          "The student connected live market research, investor preferences, and paper trading into one product. AI can propose an evidence-backed trade, but a rules-based risk check and the user both stand between a proposal and an order.",
        bullets: ["Turn plain-language preferences into risk boundaries", "Research live markets and prepare trade proposals", "Require deterministic checks and human approval before paper orders"],
        note: "Simulated funds only—no real trading",
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
        question: "There is plenty of weather data. How can it actually help someone plan today?",
        summary:
          "The student placed UV, heat, air quality, and pollen forecasts inside a personal schedule. The product checks each outdoor window and revises the plan when conditions change.",
        bullets: ["Connect public weather and air-quality data", "Turn public-health bands into testable rules", "Build a personal plan and recalculate it when forecasts change"],
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
        question: "AI can help creators write. How do you keep it from inventing their story?",
        summary:
          "The student designed the product to learn from a creator’s own interviews, notes, and past posts before it develops ideas or drafts. Sources remain visible, and the creator keeps final review and publishing control.",
        bullets: ["Turn source material into traceable content atoms", "Create platform-specific drafts and check editorial rules", "Keep human review; export content without auto-publishing"],
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
                <h1 className="mt-7 max-w-3xl text-balance font-display text-[3.15rem] font-semibold leading-[0.98] tracking-[-0.045em] text-fg sm:text-[4.65rem] lg:text-[5.35rem]">
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
                <h2 className="max-w-3xl text-balance font-display text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.04em] text-fg sm:text-[4rem]">
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
                <h2 className="mt-5 text-balance font-display text-[2.7rem] font-semibold leading-[1.04] tracking-[-0.04em] text-fg sm:text-[4.2rem]">
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
                <h2 className="mt-5 max-w-xl text-balance font-display text-[2.8rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[4.4rem]">
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
              <h2 className="mx-auto max-w-4xl text-balance font-display text-[2.7rem] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-[4.6rem]">
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
