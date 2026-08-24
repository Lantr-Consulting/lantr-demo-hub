"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
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
        <span className={`${compact ? "text-lg" : "text-[1.65rem]"} block font-display font-medium leading-none text-white`}>{lang === "zh" ? "兰图 Lantr" : "Lantr"}</span>
        {!compact ? <span className="mt-1.5 block font-mono text-[8px] uppercase tracking-[0.16em] text-white/42">{lang === "zh" ? "Builder 作品" : "Builder work"}</span> : null}
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

/* The 21st.dev "Project Showcase" idiom (jatin-yadav05): a hairline
   list of the live projects whose screenshot trails the cursor as a
   floating preview, lerp-smoothed on rAF. Adapted dependency-free for
   the kit; below lg each row carries a static shot instead of hover. */
function ShowcaseList({ projects, copy }: { projects: readonly Project[]; copy: (typeof COPY)[Lang] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [smooth, setSmooth] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const lerp = (a: number, b: number, f: number) => a + (b - a) * f;
    const tick = () => {
      setSmooth((prev) => ({ x: lerp(prev.x, target.current.x, 0.16), y: lerp(prev.y, target.current.y, 0.16) }));
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const onMove = (event: ReactMouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    target.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  return (
    <div ref={containerRef} onMouseMove={onMove} className="relative">
      {/* cursor-trailing preview — desktop only */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-30 hidden w-[350px] lg:block"
        style={{
          transform: `translate3d(${smooth.x + 30}px, ${smooth.y - 130}px, 0)`,
          opacity: hovered !== null ? 1 : 0,
          scale: hovered !== null ? "1" : "0.92",
          transition: "opacity 0.3s var(--lp-ease), scale 0.3s var(--lp-ease)",
        }}
      >
        <div className="relative shadow-lift">
          {projects.map((project, index) => (
            <div
              key={project.number}
              className={index === 0 ? "" : "absolute inset-0"}
              style={{ opacity: hovered === index ? 1 : 0, transition: "opacity 0.25s var(--lp-ease)" }}
            >
              <ProjectShot project={project} compact />
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-line-strong">
        {projects.map((project, index) => (
          <a
            key={project.number}
            href={project.href}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className="group relative block border-b border-line-strong"
          >
            <div className="grid grid-cols-[2.6rem_1fr_auto] items-center gap-4 py-6 sm:grid-cols-[3.4rem_1.15fr_0.85fr_auto] sm:gap-6 sm:py-7">
              <span className="font-display text-[1.5rem] leading-none text-accent-ink sm:text-[1.85rem]">{project.number}</span>
              <span className="min-w-0">
                <span className="relative inline-block font-display text-[1.45rem] font-normal leading-tight text-fg sm:text-[1.75rem]">
                  {project.name}
                  <span aria-hidden className="absolute -bottom-0.5 left-0 h-px w-0 bg-fg transition-all duration-300 ease-out group-hover:w-full" />
                </span>
                <span className="mt-1 block text-[12px] leading-snug text-muted">{project.chineseName}</span>
              </span>
              <span className="hidden text-[11px] font-semibold uppercase tracking-[0.12em] text-muted sm:block">{project.field}</span>
              <span className="flex items-center gap-4">
                <span className="hidden font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-accent-ink md:block">{copy.live}</span>
                <span className="grid size-10 place-content-center border border-line-strong text-fg transition-colors duration-300 group-hover:bg-scene group-hover:text-white">
                  <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </span>
            </div>
            <div className="pb-6 lg:hidden">
              <ProjectShot project={project} compact />
            </div>
          </a>
        ))}
      </div>
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
    mainHref: "https://lantr.ai/#work",
    homeHref: "https://lantr.ai",
    navCta: "返回兰图",
    eyebrow: "兰图 Builder 作品 · Lantr.site",
    h1: "让作品，\n为创造力作证。",
    heroBody: "每件产品均由 Builder 从真实问题出发，在兰图的工程与产品标准下完成设计、构建、检验与正式上线。作品可被使用，系统可被解释，关键判断有据可查。",
    heroPrimary: "亲自体验作品",
    heroSecondary: "了解兰图 Builder 标准",
    proof: [["3 件", "正式上线的产品"], ["3 个", "不同专业方向"], ["100%", "关键判断可解释"]],
    heroIndex: "精选作品 / 01–03",
    bridgeBig: "真正的能力，留得下作品。",
    bridgeSmall: "金融、环境健康、内容创作，三个方向各不相同。每位 Builder 都将自己的专业兴趣转化为一件可使用、可解释、可持续精进的产品。",
    projectsEyebrow: "精选 Builder 作品 / 01–03",
    projectsTitle: "三件正式上线的作品，三种面向未来的创造力。",
    projectsLead: "每件作品均开放独立互动演示。您可以直接进入产品体验功能运行，也可以检验 Builder 在数据、风控与用户责任方面的判断。",
    creditNote: "仅当获得 Builder 本人同意时，我们才会公开姓名与届次；其余作品保留匿名。",
    hosted: "兰图 Builder 作品 · 持续在线",
    builtLabel: "作品所体现的核心能力",
    questionLabel: "核心问题：",
    demoTag: "体验演示",
    live: "LIVE · LANTR.SITE",
    open: "打开互动演示",
    processEyebrow: "兰图创造标准",
    processTitle: "从一个真实问题，到一件经得起检验的产品。",
    processLead: "兰图以一线工程和产品标准推进每一个项目。Builder 对关键决定负责，导师提供专业评审。最终成果必须能够运行、能够被说明、能够面对真实反馈。",
    phases: [
      ["01", "找到值得解决的问题", "从 Builder 的专业兴趣与真实经历出发，明确用户、使用场景以及判断成果的标准。"],
      ["02", "建立产品与技术底座", "完成核心工作流、数据结构与 AI 能力，让第一版产品尽早进入可用状态。"],
      ["03", "用证据推动精进", "观察用户行为，核实模型输出质量，将数据来源、边界条件和人工确认节点写入系统。"],
      ["04", "正式上线并从容答辩", "完成可靠性与体验打磨，使 Builder 能够准确阐述架构设计、取舍考量与每一个关键决定。"],
    ],
    processLink: "查看完整 Builder 体系",
    accountEyebrow: "在线体验",
    accountTitle: "现在，亲自打开它们。",
    accountLead: "三个项目均提供独立演示环境。无需共享账号；示例数据彼此隔离，涉及交易、发布和外部通知的操作均为模拟。",
    accountNote: "演示使用模拟或公开数据，临时记录将自动清理。",
    finalTitle: "下一件值得被看见的作品，也可以从这里开始。",
    finalBody: "了解兰图如何与下一代一起，将专业兴趣、原创判断与 AI 技术转化为一件真正上线的作品。",
    finalCta: "进入兰图",
    backToWork: "继续浏览作品",
    tagline: "以真实作品，证明创造力。",
    footer: "本页展示由兰图 Builder 完成并正式上线的项目。项目完成后，兰图继续托管这些作品供访客体验。AI Stock Analyst 仅进行模拟交易，不构成投资建议；AirAware 仅供日常参考，不代替医疗建议；PostPilot 不会自动替用户发布内容。",
    projects: [
      {
        number: "01", name: "AI Stock Analyst", chineseName: "美股研究与模拟交易助手", href: "https://analyst.lantr.site/demo", domain: "analyst.lantr.site", shot: "/shots/analyst.jpg", alt: "AI Stock Analyst 投资组合页面", field: "金融 × 人工智能", question: "怎样让 AI 形成有证据支撑、受风控约束、且最终由用户负责的投资判断？", summary: "Builder 构建了一套贯穿实时研究、投资偏好、风险审查与模拟执行的完整系统。每项建议均有数据依据，经过规则检验，并由用户保留最终决定权。", bullets: ["将自然语言偏好转化为明确风险边界", "结合实时行情形成有依据的研究建议", "以代码检查每笔模拟订单并要求用户确认"], note: "使用模拟资金，不涉及真实交易", tint: "#e7eef0",
      },
      {
        number: "02", name: "AirAware", chineseName: "户外活动安排助手", href: "https://airaware.lantr.site/demo", domain: "airaware.lantr.site", shot: "/shots/airaware.jpg", alt: "AirAware 今日环境规划页面", field: "环境健康 × 数据", question: "如何将分散的环境数据，转化为可信赖的个人行动建议？", summary: "Builder 将紫外线、高温、空气质量与花粉预报统一纳入个人日程。系统逐段评估户外活动条件，并在环境变化后自动重新计算建议。", bullets: ["整合公开天气、空气质量与花粉数据", "将公共健康标准转化为可验证规则", "结合个人日程生成并动态更新行动方案"], note: "基于公开环境数据，不代替医疗建议", tint: "#e8f0f2",
      },
      {
        number: "03", name: "PostPilot", chineseName: "创作者内容工作台", href: "https://postpilot.lantr.site/demo", domain: "postpilot.lantr.site", shot: "/shots/postpilot.jpg", alt: "PostPilot 内容工作台页面", field: "内容创作 × 人工智能", question: "怎样让 AI 提升内容生产力，同时守住来源、质量与发布责任？", summary: "Builder 设计了一套以创作者原始材料为依据的内容工作流。系统先组织访谈、笔记与历史内容，再生成选题与初稿，同时保留来源与人工审核节点。", bullets: ["将访谈、笔记与历史内容整理为可追溯资料", "为不同平台生成初稿并执行编辑规则检查", "所有内容由用户审核，系统仅负责导出"], note: "草稿由用户审核，产品不会自动发布", tint: "#ecebea",
      },
    ],
  },
  en: {
    brand: "Live Builder portfolio",
    announcement: "Explore live products built by Lantr Builders, and the system behind them",
    nav: { projects: "Builder Work", process: "The Lantr Standard", experience: "Demos" },
    switch: "中文",
    switchHref: "/",
    mainHref: "https://lantr.ai/en#work",
    homeHref: "https://lantr.ai/en",
    navCta: "Return to Lantr",
    eyebrow: "Lantr Builder work · Lantr.site",
    h1: "Projects by\nLantr Builders",
    heroBody: "Three AI products designed, built, and launched by students in the Lantr Builder program.",
    heroPrimary: "See the projects",
    heroSecondary: "About the Builder program",
    proof: [["03", "live products"], ["03", "fields represented"], ["04", "phases from idea to launch"]],
    heroIndex: "Selected work / 01–03",
    bridgeBig: "Three Builders. Three fields. Three working products.",
    bridgeSmall: "Each Builder started from a field they knew: finance, environmental health, content creation. What follows is the product each of them designed, built, and launched.",
    projectsEyebrow: "Selected Builder work / 01–03",
    projectsTitle: "The projects",
    projectsLead: "",
    creditNote: "Names and cohort details appear only with the Builder’s permission; otherwise, the work remains anonymous.",
    hosted: "Built at Lantr · live on lantr.site",
    questionLabel: "",
    demoTag: "Open demo",
    builtLabel: "Under the hood",
    live: "LIVE · LANTR.SITE",
    open: "Open the demo",
    processEyebrow: "The Lantr Builder Standard",
    processTitle: "How each project was built",
    processLead: "Each Builder works through these four phases, with a Lantr engineer as mentor and reviewer.",
    phases: [
      ["01", "Choose a problem worth solving", "Start with something the Builder already cares about. Define who it's for, when they'll use it, and what a win looks like."],
      ["02", "Build the foundation", "Build the core workflow, data model, and AI features, then get a usable version in front of people early."],
      ["03", "Improve through evidence", "Watch how people use it. Verify what the model says. Build sources, limits, and human approval into the product itself."],
      ["04", "Ship it and stand behind it", "Polish until it's reliable. Then the Builder walks anyone through the architecture, the tradeoffs, and every call they made."],
    ],
    processLink: "Explore the full Builder program",
    accountEyebrow: "Live demos",
    accountTitle: "The demos are open.",
    accountLead: "Each demo runs in its own environment with sample data, no sign-up needed. Trades, posts, and notifications are all simulated.",
    accountNote: "Demos run on simulated or public data and clear temporary records automatically.",
    finalTitle: "Want to build something like this?",
    finalBody: "The Builder program is open to students. See how it works at lantr.ai.",
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
                <a href={copy.switchHref} onClick={() => persistLang(otherLang)} className="inline-flex items-center gap-2.5 border-l border-white/20 px-5 text-[11px] font-semibold text-white hover:bg-white/8"><GlobeIcon />{copy.switch}</a>
              </div>
            </div>
          </div>
          <div className="col-start-2 row-start-2 border-b border-white/10 bg-scene">
            <nav className="flex h-16 items-center justify-between pl-5" aria-label="Primary">
              <div className="flex h-full items-center">
                <a href="#projects" className="flex h-full items-center border-b-2 border-[#8fc3d1] px-4 text-[12.5px] font-medium text-white">{copy.nav.projects}</a>
                <a href="#process" className="flex h-full items-center border-b-2 border-transparent px-4 text-[12.5px] font-medium text-white/68 hover:text-white">{copy.nav.process}</a>
                {lang === "zh" ? <a href="#experience" className="flex h-full items-center border-b-2 border-transparent px-4 text-[12.5px] font-medium text-white/68 hover:text-white">{copy.nav.experience}</a> : null}
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

/* The 21st.dev "Section With Mockup" idiom (aghasisahakyan1): an open
   two-column row — text beside a large mockup layered over an offset
   backdrop panel — alternating direction per case. No boxes; the
   screenshot fills its column. Motion entrances become kit Reveals. */
function ProjectCase({ project, copy, reverse }: { project: Project; copy: (typeof COPY)[Lang]; reverse: boolean }) {
  return (
    <Reveal>
      <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className={reverse ? "lg:order-2" : ""}>
          <div className="flex items-baseline gap-4">
            <span className="font-display text-[2.4rem] leading-none text-line-strong">{project.number}</span>
            <div>
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-ink">{project.name}</div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.11em] text-muted">{project.field}</div>
            </div>
          </div>
          <h3 className="mt-6 max-w-md text-balance font-display text-[2rem] font-normal leading-[1.1] text-fg sm:text-[2.5rem]">{project.chineseName}</h3>
          {copy.questionLabel ? (
            <p className="mt-4 max-w-lg text-[14px] leading-[1.7]">
              <strong className="mr-1 font-semibold text-fg">{copy.questionLabel}</strong>
              <span className="font-display text-[1.02rem] italic text-accent-ink">{project.question}</span>
            </p>
          ) : (
            <p className="mt-4 max-w-lg font-display text-[1.05rem] italic leading-[1.5] text-accent-ink">“{project.question}”</p>
          )}
          <p className="mt-5 max-w-lg text-[14.5px] leading-[1.9] text-muted">{project.summary}</p>
          <ul className="mt-7 space-y-2.5">
            {project.bullets.map((bullet) => <li key={bullet} className="flex gap-3 text-[13.5px] leading-6 text-fg"><span className="text-accent-ink"><Check /></span>{bullet}</li>)}
          </ul>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <a href={project.href} className="group inline-flex h-12 items-center justify-center gap-2 bg-scene px-6 text-[13px] font-semibold text-white hover:bg-accent-ink">{copy.open}<Arrow className="transition-transform group-hover:translate-x-0.5" /></a>
            <p className="max-w-56 text-[10.5px] leading-5 text-faint">{project.note}</p>
          </div>
        </div>

        <a
          href={project.href}
          aria-label={`${copy.open}: ${project.name}`}
          className={`group relative block ${reverse ? "lg:order-1" : ""}`}
        >
          {/* offset backdrop panel, the fetched component's depth layer */}
          <div
            aria-hidden
            className={`absolute -top-6 bottom-[-1.5rem] hidden w-[86%] border border-line sm:block ${reverse ? "-left-5" : "-right-5"}`}
            style={{ background: project.tint }}
          />
          <div className="relative transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
            <ProjectShot project={project} />
            <span className="absolute right-3 top-12 border border-black/12 bg-white/85 px-2.5 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.15em] text-black/55">{copy.live}</span>
          </div>
        </a>
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
        <SectionFrame gutters className={`border-b border-line bg-bg ${lang === "zh" ? "py-16 sm:py-24 lg:py-28" : "py-12 sm:py-14 lg:py-16"}`}>
          <Container>
            <div className="grid gap-9 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-20">
              <div>
                <Reveal>
                  <Eyebrow>{c.eyebrow}</Eyebrow>
                </Reveal>
                <h1 className={`mt-8 whitespace-pre-line text-balance font-display font-normal tracking-[-0.015em] text-fg ${lang === "en" ? "text-[3.1rem] leading-[0.96] sm:text-[4.15rem] lg:text-[4.8rem]" : "text-[3.25rem] leading-[0.98] sm:text-[4.8rem] lg:text-[5.55rem]"}`}><Words text={c.h1} delay={80} /></h1>
              </div>
              <Reveal delay={180}>
                <p className="max-w-2xl text-pretty text-[15px] leading-[1.9] text-muted sm:text-[16px]">{c.heroBody}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#projects" className="group inline-flex h-12 items-center gap-2 bg-accent px-5 text-[13px] font-semibold text-white hover:bg-accent-ink">{c.heroPrimary}<Arrow className="transition-transform group-hover:translate-x-0.5" /></a>
                  <a href={c.mainHref} className="inline-flex h-12 items-center gap-2 border border-line-strong bg-surface px-5 text-[13px] font-semibold text-fg hover:border-fg/45">{c.heroSecondary}<ArrowUpRight /></a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={260} className="mt-14 sm:mt-18">
              <div className="mb-4 flex items-center justify-between font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted"><span>{c.heroIndex}</span><span>lantr.site</span></div>
              <ShowcaseList projects={projects} copy={c} />
            </Reveal>

            <div className="mt-8 grid border-b border-line-strong sm:grid-cols-3">
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

        {lang === "zh" ? (
          <SectionFrame className="border-b border-white/10 bg-scene py-10 text-white [--lp-rule:rgba(255,255,255,0.07)]">
            <Container>
              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20">
                <Reveal><h2 className="max-w-xl font-display text-[2.35rem] font-normal leading-[1.08] sm:text-[3.1rem]">{c.bridgeBig}</h2></Reveal>
                <Reveal delay={80}><p className="max-w-2xl text-[15px] leading-[1.85] text-white/62 sm:text-[16px]">{c.bridgeSmall}</p></Reveal>
              </div>
            </Container>
          </SectionFrame>
        ) : null}

        <SectionFrame id="projects" gutters className={`scroll-mt-24 bg-bg ${lang === "zh" ? "py-20 sm:py-28" : "py-12 sm:py-16"}`}>
          <Container>
            {lang === "zh" ? (
              <Reveal className="grid gap-7 lg:grid-cols-[0.62fr_1.38fr] lg:items-end lg:gap-20">
                <Eyebrow>{c.projectsEyebrow}</Eyebrow>
                <div>
                  <h2 className="max-w-4xl text-balance font-display text-[2.45rem] font-normal leading-[1.06] text-fg sm:text-[3.6rem]">{c.projectsTitle}</h2>
                  {c.projectsLead ? <p className="mt-5 max-w-2xl text-[14px] leading-[1.85] text-muted">{c.projectsLead}</p> : null}
                  <p className="mt-3 max-w-2xl text-[10.5px] leading-5 text-faint">{c.creditNote}</p>
                </div>
              </Reveal>
            ) : null}
            <div className={`space-y-20 sm:space-y-28 ${lang === "zh" ? "mt-14 sm:mt-20" : ""}`}>
              {projects.map((project, index) => <ProjectCase key={project.number} project={project} copy={c} reverse={index % 2 === 1} />)}
            </div>
            {lang === "en" ? <p className="mt-6 max-w-3xl font-mono text-[9px] leading-5 tracking-[0.04em] text-muted">{c.accountLead} {c.creditNote}</p> : null}
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

        {/* Slim demo-access band — the reassurance copy plus three plain
            links. The projects are already shown twice above (hero index,
            case rows), so nothing is re-showcased here. */}
        {lang === "zh" ? <SectionFrame id="experience" gutters className="scroll-mt-24 bg-accent-wash py-14 sm:py-18">
          <Container>
            <Reveal className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-20">
              <div>
                <Eyebrow>{c.accountEyebrow}</Eyebrow>
                <h2 className="mt-5 font-display text-[1.9rem] font-normal leading-[1.1] text-fg sm:text-[2.4rem]">{c.accountTitle}</h2>
                <p className="mt-4 max-w-xl text-[14px] leading-[1.85] text-muted">{c.accountLead}</p>
                <p className="mt-3 font-mono text-[9px] leading-5 tracking-[0.04em] text-faint">{c.accountNote}</p>
              </div>
              <div className="border-t border-line-strong">
                {projects.map((project) => (
                  <a key={project.number} href={project.href} className="group grid grid-cols-[2.4rem_1fr_auto_auto] items-center gap-4 border-b border-line-strong py-4">
                    <span className="font-display text-lg text-accent-ink">{project.number}</span>
                    <span className="text-[13.5px] font-semibold text-fg transition-colors group-hover:text-accent-ink">{project.name}</span>
                    <span className="text-[11px] text-muted transition-colors group-hover:text-accent-ink">{c.demoTag}</span>
                    <ArrowUpRight className="size-3.5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
            </Reveal>
          </Container>
        </SectionFrame> : null}

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
