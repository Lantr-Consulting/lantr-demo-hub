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

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit border border-line-strong bg-surface px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
      {children}
    </span>
  );
}

function Logo({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  return (
    <a href={lang === "zh" ? "https://lantr.ai/zh" : "https://lantr.ai"} className="group inline-flex items-center gap-3" aria-label={lang === "zh" ? "返回兰图官网" : "Return to Lantr"}>
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
              <ProjectShot project={project} eager={index === 0} compact />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}


const COPY = {
  zh: {
    announcement: "这里展示的是兰图 Builder 已上线的真实作品。了解完整创造者体系",
    navProjects: "Builder 作品",
    switch: "EN",
    switchHref: "/",
    mainHref: "https://lantr.ai/zh#work",
    homeHref: "https://lantr.ai/zh",
    navCta: "返回兰图",
    eyebrow: "兰图 Builder 作品 · Lantr.site",
    h1: "让作品，\n为创造力作证。",
    heroBody: "三件由兰图学生亲手完成、正式上线的 AI 产品。点开任何一件，直接体验。",
    heroIndex: "精选作品 / 01–03",
    live: "LIVE · LANTR.SITE",
    tagline: "以真实作品，证明创造力。",
    footer: "本页展示由兰图 Builder 完成并正式上线的项目。项目完成后，兰图继续托管这些作品供访客体验。演示使用模拟或公开数据。AI Stock Analyst 仅进行模拟交易，不构成投资建议；AirAware 仅供日常参考，不代替医疗建议；PostPilot 不会自动替用户发布内容。",
    projects: [
      { number: "01", name: "AI Stock Analyst", chineseName: "美股研究与模拟交易助手", href: "https://analyst.lantr.site/demo", domain: "analyst.lantr.site", shot: "/shots/analyst.jpg", alt: "AI Stock Analyst 投资组合页面", field: "金融 × 人工智能" },
      { number: "02", name: "AirAware", chineseName: "户外活动安排助手", href: "https://airaware.lantr.site/demo", domain: "airaware.lantr.site", shot: "/shots/airaware.jpg", alt: "AirAware 今日环境规划页面", field: "环境健康 × 数据" },
      { number: "03", name: "PostPilot", chineseName: "创作者内容工作台", href: "https://postpilot.lantr.site/demo", domain: "postpilot.lantr.site", shot: "/shots/postpilot.jpg", alt: "PostPilot 内容工作台页面", field: "内容创作 × 人工智能" },
    ],
  },
  en: {
    announcement: "Explore live products built by Lantr Builders, and the system behind them",
    navProjects: "Builder Work",
    switch: "中文",
    switchHref: "/zh",
    mainHref: "https://lantr.ai/#work",
    homeHref: "https://lantr.ai",
    navCta: "Return to Lantr",
    eyebrow: "Lantr Builder work · Lantr.site",
    h1: "Projects by\nLantr Builders",
    heroBody: "Three AI products designed, built, and launched by students in the Lantr Builder program. Open any of them and try it.",
    heroIndex: "Selected work / 01–03",
    live: "LIVE · LANTR.SITE",
    tagline: "Real work is the proof.",
    footer: "This page features projects completed and launched by Lantr Builders. Lantr keeps each product online after the program ends so anyone can try it. Demos run on simulated or public data. AI Stock Analyst is paper trading only and is not financial advice. AirAware offers general guidance, not medical advice. PostPilot never publishes anything automatically.",
    projects: [
      { number: "01", name: "AI Stock Analyst", chineseName: "AI investment research assistant", href: "https://analyst.lantr.site/demo", domain: "analyst.lantr.site", shot: "/shots/analyst.jpg", alt: "Portfolio screen from the Builder project AI Stock Analyst", field: "Finance × artificial intelligence" },
      { number: "02", name: "AirAware", chineseName: "Environmental health planner", href: "https://airaware.lantr.site/demo", domain: "airaware.lantr.site", shot: "/shots/airaware.jpg", alt: "Today screen from the Builder project AirAware", field: "Environmental health × data" },
      { number: "03", name: "PostPilot", chineseName: "Creator content workspace", href: "https://postpilot.lantr.site/demo", domain: "postpilot.lantr.site", shot: "/shots/postpilot.jpg", alt: "Content workspace from the Builder project PostPilot", field: "Content creation × artificial intelligence" },
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
                <a href="#projects" className="flex h-full items-center border-b-2 border-[#8fc3d1] px-4 text-[12.5px] font-medium text-white">{copy.navProjects}</a>
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

/* One page, one job: the hero introduces the work in a sentence, the
   hairline showcase list opens the live demos, the footer carries the
   disclaimers. Everything that re-explained the projects is gone. */
export function Landing({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const projects = c.projects as readonly Project[];

  useEffect(() => { persistLang(lang); }, [lang]);

  return (
    <div className="min-h-screen bg-bg text-ink">
      <Header lang={lang} copy={c} />
      <main>
        <SectionFrame id="projects" gutters className="scroll-mt-24 bg-bg py-16 sm:py-24 lg:py-28">
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
              </Reveal>
            </div>

            <Reveal delay={260} className="mt-14 sm:mt-18">
              <div className="mb-4 flex items-center justify-between font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted"><span>{c.heroIndex}</span><span>lantr.site</span></div>
              <ShowcaseList projects={projects} copy={c} />
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
