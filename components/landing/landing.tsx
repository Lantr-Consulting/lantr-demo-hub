"use client";

/* The lantr.site landing — FORGE, structured like lantr.ai's page:
   fixed nav, column-ruled sections, Fraunces display headings, one
   dark scene band. Locale is route-based (中文 at "/", EN at "/en"),
   exactly like the main lantr.ai site. */

import { useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { persistLang, Reveal, Words, type Lang } from "@/components/landing/kit";

/* ── structural primitives (mirroring frontend/components/ui/section.tsx) ── */

function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

function Section({
  id,
  children,
  className = "",
  gutters = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  gutters?: boolean;
}) {
  return (
    <section id={id} className={`relative py-16 sm:py-24 ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-6xl -translate-x-1/2 lg:block"
        style={{
          borderLeft: "1px solid var(--rule)",
          borderRight: "1px solid var(--rule)",
        }}
      >
        {gutters ? (
          <>
            <span
              className="hatch absolute inset-y-0 right-full"
              style={{
                width: "max(0px, calc((100vw - 72rem) / 2 - 2.5rem))",
                borderLeft: "1px solid var(--rule)",
              }}
            />
            <span
              className="hatch absolute inset-y-0 left-full"
              style={{
                width: "max(0px, calc((100vw - 72rem) / 2 - 2.5rem))",
                borderRight: "1px solid var(--rule)",
              }}
            />
          </>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center rounded-full border border-line-strong bg-surface px-3.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
      {children}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
}) {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <Reveal className={`flex max-w-2xl flex-col gap-5 ${alignment}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-balance font-display text-[2.1rem] font-normal leading-[1.08] tracking-[-0.01em] text-fg sm:text-[2.9rem]">
        {title}
      </h2>
      {lead ? (
        <p className="text-pretty text-[15px] leading-relaxed text-muted sm:text-base">
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}

/* A real product still in a minimal browser frame. */
function Shot({
  src,
  domain,
  alt,
  className = "",
}: {
  src: string;
  domain: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line-strong bg-surface shadow-lift ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-line bg-surface-2 px-3.5 py-2">
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="ml-2 font-mono text-[10px] text-faint">{domain}</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="block w-full" loading="lazy" />
    </div>
  );
}

/* ── copy ── */

const COPY = {
  en: {
    nav: { projects: "Projects", how: "How they're built", switch: "中文", switchHref: "/", cta: "Create an account" },
    badge: "Three live products · One account · All simulated",
    h1: "Real AI products, built the way our students build them.",
    subLead: "Every demo here started from zero and shipped ",
    subEm: "milestone by milestone",
    subRest:
      " — first ship, design, brain, hands, memory, autonomy — on the same track Lantr students follow with their mentors.",
    trust: [
      "Sign in once — it works across every demo",
      "Simulated & public data — nothing at stake",
      "All source code public on GitHub",
    ],
    shotsAlt: ["The AI Stock Analyst dashboard", "The AirAware Today screen", "The PostPilot Today screen"],
    stats: [
      ["3", "live products"],
      ["14", "course modules"],
      ["30+", "public milestone tags"],
      ["$0", "real money at stake"],
    ],
    accountEyebrow: "One account · every demo",
    accountTitle: "Create an account, then wander.",
    accountLead:
      "Your session lives on a shared lantr.site cookie — sign in here once and every product below already knows you.",
    accountSignedIn: (email: string) =>
      `Signed in as ${email} — open any project, you're already signed in there too.`,
    signOut: "Sign out",
    email: "Email",
    password: "Password",
    passwordHint: "6+ characters",
    create: "Create account",
    signIn: "Sign in",
    busy: "One moment…",
    haveAccount: "Have an account? Sign in",
    newHere: "New here? Create account",
    open: "Open",
    projectsEyebrow: "The projects",
    projectsTitle: "Three directions, one method.",
    projectsLead:
      "Lantr students build a project aimed at their intended major. These are the flagship samples for each direction — every one a real, working product you can sign into right now.",
    majorsLabel: "For students heading into",
    howEyebrow: "How they're built",
    howTitle: "One track. Fourteen modules. A shipped product.",
    howBody:
      "Each sample was built one milestone per session — exactly the pace and order a Lantr student follows with their mentor: first ship, design pass, the brain, the hands, memory & accounts, then autonomy. Every milestone is a public git tag you can check out and run.",
    howLink: "See the program at lantr.ai",
    githubLink: "Browse the source on GitHub",
    ctaTitle: "Sign in once. Wander all three.",
    ctaBody:
      "Simulated money, real forecasts, your own AI growth lead — nothing at stake, everything to poke at.",
    ctaButton: "Create your account",
    tagline: "Real products, built the student way.",
    footer:
      "All demos run on simulated or public data — paper trading only, no real money, general guidance not financial or medical advice. Built with the Lantr AI Agent Builder track: Next.js on Vercel, Python agents on Railway, Supabase, and live market & environmental APIs.",
    projects: [
      {
        name: "AI Stock Analyst",
        href: "https://analyst.lantr.site",
        domain: "analyst.lantr.site",
        shot: "/shots/analyst.jpg",
        tagline: "Your personal AI portfolio manager",
        track: "01 · Finance & quant track",
        blurb:
          "Describe how you invest in plain English. It researches the live market, proposes safeguard-checked trades you approve with one click, and runs standing missions on a schedule — on a paper-trading account.",
        bullets: [
          "Plain-English strategy becomes a working investor profile",
          "A deterministic risk engine checks every order",
          "Automations research and report while you're away",
        ],
        majors: "Finance & Economics · CS & AI · Data Science",
      },
      {
        name: "AirAware",
        href: "https://airaware.lantr.site",
        domain: "airaware.lantr.site",
        shot: "/shots/airaware.jpg",
        tagline: "An environmental-health planner for your real week",
        track: "02 · Health & environment track",
        blurb:
          "It reads real forecasts — UV, heat, air quality, pollen — against your actual schedule, scores every outdoor window with cited WHO/EPA/NWS health bands, and re-plans when conditions change.",
        bullets: [
          "Cited health bands, enforced in code — not vibes",
          "Accepting a plan re-checks the latest forecast",
          "Briefings on schedule, alerts when bands are crossed",
        ],
        majors: "Public Health · Environmental Science · CS & AI",
      },
      {
        name: "PostPilot",
        href: "https://postpilot.lantr.site",
        domain: "postpilot.lantr.site",
        shot: "/shots/postpilot.jpg",
        tagline: "An AI growth lead for your personal IP",
        track: "03 · Marketing & media track",
        blurb:
          "It learns your story into a versioned brand book, mines your raw materials into citable atoms, and drafts posts through an editorial engine with cited rules. You approve, you export, you press publish.",
        bullets: [
          "Drafts cite your own materials — never invented stories",
          "FTC disclosure & platform rules enforced in code",
          "Campaigns run while you're away, ready for review",
        ],
        majors: "Marketing · Business · Media · CS & AI",
      },
    ],
  },
  zh: {
    nav: { projects: "项目", how: "构建方式", switch: "EN", switchHref: "/en", cta: "创建账户" },
    badge: "三个在线产品 · 一个账户 · 全部模拟数据",
    h1: "真实上线的 AI 产品，学员同款构建路径。",
    subLead: "这里的每个演示都从零开始，",
    subEm: "按里程碑逐步上线",
    subRest:
      "——首次发布、设计、大脑、双手、记忆、自主运行——与 Lantr 学员在导师带领下走的路径完全相同。",
    trust: [
      "登录一次，通行所有演示",
      "仅模拟与公开数据 — 毫无风险",
      "全部源码公开在 GitHub",
    ],
    shotsAlt: ["AI Stock Analyst 仪表盘", "AirAware 今日页面", "PostPilot 今日页面"],
    stats: [
      ["3", "个在线产品"],
      ["14", "个课程模块"],
      ["30+", "个公开里程碑 tag"],
      ["$0", "真实资金风险"],
    ],
    accountEyebrow: "一个账户 · 全部演示",
    accountTitle: "创建一个账户，然后随便逛。",
    accountLead:
      "你的登录状态保存在共享的 lantr.site Cookie 上——在这里登录一次，下面每个产品都已经认识你。",
    accountSignedIn: (email: string) =>
      `已登录：${email} — 打开任意项目，无需再次登录。`,
    signOut: "退出登录",
    email: "邮箱",
    password: "密码",
    passwordHint: "至少 6 位",
    create: "创建账户",
    signIn: "登录",
    busy: "请稍候…",
    haveAccount: "已有账户？登录",
    newHere: "新用户？创建账户",
    open: "打开",
    projectsEyebrow: "三个项目",
    projectsTitle: "三个方向，同一种方法。",
    projectsLead:
      "Lantr 学员会围绕自己的目标专业打造项目。这三个是各方向的旗舰示范——每一个都是现在就能登录使用的真实产品。",
    majorsLabel: "适合目标专业",
    howEyebrow: "构建方式",
    howTitle: "一条路径，十四个模块，一个上线的产品。",
    howBody:
      "每个示范项目都是每次课程推进一个里程碑——与 Lantr 学员和导师的节奏、顺序完全一致：首次上线、设计打磨、大脑、双手、记忆与账户，最后是自主运行。每个里程碑都是可检出运行的公开 git tag。",
    howLink: "在 lantr.ai 了解课程",
    githubLink: "在 GitHub 浏览源码",
    ctaTitle: "登录一次，畅游三个产品。",
    ctaBody: "模拟资金、真实天气、你自己的 AI 增长负责人——零风险，尽情探索。",
    ctaButton: "创建你的账户",
    tagline: "真实的产品，学员的方法。",
    footer:
      "所有演示均运行在模拟或公开数据上——仅模拟盘交易，不涉及真实资金；一般性建议，不构成投资或医疗建议。基于 Lantr AI Agent Builder 课程构建：Next.js（Vercel）、Python 智能体（Railway）、Supabase，以及实时行情与环境数据 API。",
    projects: [
      {
        name: "AI Stock Analyst",
        href: "https://analyst.lantr.site",
        domain: "analyst.lantr.site",
        shot: "/shots/analyst.jpg",
        tagline: "你的专属 AI 投资组合经理",
        track: "01 · 金融与量化方向",
        blurb:
          "用一句话描述你的投资风格。它研究实时行情，提出经风控检查的交易建议，你一键批准；还能按计划执行常设任务——一切都在模拟账户中进行。",
        bullets: [
          "一句话策略，变成真正执行的投资档案",
          "确定性风控引擎检查每一笔订单",
          "你不在时，自动化任务照常研究与汇报",
        ],
        majors: "金融与经济 · 计算机与AI · 数据科学",
      },
      {
        name: "AirAware",
        href: "https://airaware.lantr.site",
        domain: "airaware.lantr.site",
        shot: "/shots/airaware.jpg",
        tagline: "为你的真实一周而生的环境健康规划师",
        track: "02 · 健康与环境方向",
        blurb:
          "它对照你的真实日程阅读真实天气预报——紫外线、高温、空气质量、花粉——用 WHO/EPA/NWS 的健康标准为每个户外时段打分，条件变化时自动重新规划。",
        bullets: [
          "健康标准写进代码，逐条可溯源",
          "接受计划时会重新核对最新预报",
          "定时简报，指标越线即刻提醒",
        ],
        majors: "公共卫生 · 环境科学 · 计算机与AI",
      },
      {
        name: "PostPilot",
        href: "https://postpilot.lantr.site",
        domain: "postpilot.lantr.site",
        shot: "/shots/postpilot.jpg",
        tagline: "你个人 IP 的 AI 增长负责人",
        track: "03 · 营销与媒体方向",
        blurb:
          "它把你的故事学习成一本带版本管理的品牌手册，把你的原始素材挖掘成可引用的素材卡，再经由规则明确的编辑引擎起草内容。你审核、你导出、发布权在你。",
        bullets: [
          "草稿必须引用你的真实素材，绝不编造故事",
          "FTC 披露与平台规则由代码强制执行",
          "你不在时，营销活动照常运转，等你审核",
        ],
        majors: "市场营销 · 商科 · 传媒 · 计算机与AI",
      },
    ],
  },
} as const;

/* ── the page ── */

export function Landing({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    /* Seed the family-wide language cookie from the route the visitor
       chose, without clobbering an explicit earlier choice. */
    try {
      if (!document.cookie.includes("lantr-lang=")) persistLang(lang);
    } catch {}
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user.email ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setUser(s?.user.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, [lang]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    const creds = { email: email.trim(), password };
    const { error } =
      mode === "signup"
        ? await supabase.auth.signUp(creds)
        : await supabase.auth.signInWithPassword(creds);
    if (error) setError(error.message);
    setBusy(false);
  }

  const otherLang: Lang = lang === "zh" ? "en" : "zh";

  return (
    <div className="min-h-screen bg-bg text-ink">
      {/* ── nav (fixed, like lantr.ai) ─────────────────── */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`border-b border-line transition-all duration-300 ${
            scrolled ? "bg-bg/85 backdrop-blur-xl" : "bg-bg"
          }`}
        >
          <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
            <a href={lang === "zh" ? "/" : "/en"} className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-gold">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/lantr_mark.png" alt="Lantr" className="size-4.5" />
              </span>
              <span className="leading-tight">
                <span className="block text-[15px] font-semibold tracking-tight text-fg">
                  {lang === "zh" ? "蓝图 Lantr" : "Lantr"}
                </span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                  Project demos
                </span>
              </span>
            </a>

            <div className="hidden items-center gap-1 md:flex">
              <a
                href="#projects"
                className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-fg"
              >
                {c.nav.projects}
              </a>
              <a
                href="#how"
                className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-fg"
              >
                {c.nav.how}
              </a>
              <a
                href="https://lantr.ai"
                className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-fg"
              >
                lantr.ai ↗
              </a>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={c.nav.switchHref}
                onClick={() => persistLang(otherLang)}
                className="rounded-lg px-2.5 py-2 font-mono text-[12px] font-medium text-muted transition-colors hover:text-fg"
              >
                {c.nav.switch}
              </a>
              <a
                href="#account"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-accent px-4 text-sm font-medium text-white shadow-[0_1px_2px_rgba(30,28,23,0.25)] transition-all hover:-translate-y-px hover:bg-accent-ink"
              >
                {c.nav.cta}
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* ── hero ───────────────────────────────────────── */}
      <Section gutters className="overflow-hidden pt-32 sm:pt-40">
        <Container className="text-center">
          <Reveal>
            <Eyebrow>
              <span aria-hidden className="mr-2 size-1.5 rounded-full bg-accent" />
              {c.badge}
            </Eyebrow>
          </Reveal>
          <h1 className="mx-auto mt-7 max-w-3xl text-balance font-display text-[2.5rem] font-normal leading-[1.07] tracking-[-0.015em] text-fg sm:text-[3.8rem]">
            <Words text={c.h1} delay={120} />
          </h1>
          <Reveal delay={220}>
            <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {c.subLead}
              <em className="font-display italic text-ink">{c.subEm}</em>
              {c.subRest}
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[13px] text-muted">
              {c.trust.map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          {/* real product stills, fanned */}
          <div className="relative mx-auto mt-14 grid max-w-5xl gap-5 lg:grid-cols-3 lg:gap-0">
            {c.projects.map((p, i) => (
              <Reveal
                key={p.domain}
                delay={400 + i * 130}
                className={
                  i === 0
                    ? "relative lg:translate-x-4 lg:translate-y-5 lg:-rotate-2"
                    : i === 1
                      ? "relative z-10 lg:scale-[1.04]"
                      : "relative lg:-translate-x-4 lg:translate-y-5 lg:rotate-2"
                }
              >
                <a
                  href={p.href}
                  className="block transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] hover:-translate-y-2 hover:rotate-0"
                >
                  <Shot src={p.shot} domain={p.domain} alt={c.shotsAlt[i]} />
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── stats strip ────────────────────────────────── */}
      <Section className="border-t border-line py-10 sm:py-12">
        <Container>
          <Reveal>
            <dl className="grid grid-cols-2 gap-y-8 md:grid-cols-4">
              {c.stats.map(([n, label]) => (
                <div key={label} className="flex flex-col items-center gap-1 text-center">
                  <dd className="font-display text-4xl text-fg">{n}</dd>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    {label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      {/* ── account ────────────────────────────────────── */}
      <Section id="account" gutters className="border-t border-line bg-bg-2 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow={c.accountEyebrow}
            title={c.accountTitle}
            lead={c.accountLead}
          />
          <Reveal delay={140} className="mx-auto mt-8 max-w-2xl">
            <div className="card-soft rounded-2xl p-5 sm:p-6">
              {user ? (
                <div className="flex flex-wrap items-center gap-3">
                  <span aria-hidden className="size-2 rounded-full bg-accent" />
                  <span className="flex-1 text-sm text-ink">{c.accountSignedIn(user)}</span>
                  <button
                    onClick={() => supabase.auth.signOut()}
                    className="text-sm text-faint transition-colors hover:text-fg"
                  >
                    {c.signOut}
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="flex flex-wrap items-end gap-3">
                  <div className="flex min-w-44 flex-1 flex-col gap-1.5">
                    <label
                      className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-faint"
                      htmlFor="email"
                    >
                      {c.email}
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="rounded-xl border border-line-strong bg-surface px-3.5 py-2.5 text-sm outline-none placeholder:text-faint focus:border-accent"
                    />
                  </div>
                  <div className="flex min-w-44 flex-1 flex-col gap-1.5">
                    <label
                      className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-faint"
                      htmlFor="password"
                    >
                      {c.password}
                    </label>
                    <input
                      id="password"
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={c.passwordHint}
                      className="rounded-xl border border-line-strong bg-surface px-3.5 py-2.5 text-sm outline-none placeholder:text-faint focus:border-accent"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={busy}
                    className="inline-flex h-[42px] items-center justify-center rounded-full bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent-ink disabled:opacity-50"
                  >
                    {busy ? c.busy : mode === "signup" ? c.create : c.signIn}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
                    className="w-full text-left text-xs text-faint transition-colors hover:text-fg sm:w-auto"
                  >
                    {mode === "signup" ? c.haveAccount : c.newHere}
                  </button>
                  {error && <p className="w-full text-xs text-amber">{error}</p>}
                </form>
              )}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ── projects ───────────────────────────────────── */}
      <Section id="projects" className="border-t border-line">
        <Container>
          <SectionHeading
            eyebrow={c.projectsEyebrow}
            title={c.projectsTitle}
            lead={c.projectsLead}
          />
          <div className="mt-12 space-y-16 sm:space-y-20">
            {c.projects.map((p, i) => (
              <Reveal key={p.name} delay={60}>
                <div
                  className={`grid items-center gap-8 lg:grid-cols-[1fr_1.25fr] lg:gap-12 ${
                    i % 2 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div>
                    <div className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
                      {p.track}
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-fg">
                      {p.name}
                    </h3>
                    <div className="mt-1 font-display text-[16px] italic text-ink">
                      {p.tagline}
                    </div>
                    <p className="mt-4 text-[15px] leading-relaxed text-muted">{p.blurb}</p>
                    <ul className="mt-5 space-y-2.5">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-sm leading-snug text-ink">
                          <svg
                            viewBox="0 0 12 12"
                            className="mt-0.5 size-3.5 shrink-0 text-accent"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden
                          >
                            <path d="M2 6.5 4.5 9 10 3.5" />
                          </svg>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 border-t border-line pt-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                        {c.majorsLabel}
                      </span>
                      <div className="mt-1 text-[13px] text-muted">{p.majors}</div>
                    </div>
                    <a
                      href={p.href}
                      className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-white shadow-[0_1px_2px_rgba(30,28,23,0.25)] transition-all hover:-translate-y-px hover:bg-accent-ink"
                    >
                      {c.open} {p.name} →
                    </a>
                  </div>
                  <a
                    href={p.href}
                    className="hover-lift block rounded-xl"
                    aria-label={p.name}
                  >
                    <Shot src={p.shot} domain={p.domain} alt={c.shotsAlt[i]} />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── how they're built ──────────────────────────── */}
      <Section id="how" gutters className="border-t border-line bg-bg-2">
        <Container>
          <div className="card-soft rounded-2xl p-7 sm:p-10">
            <Reveal>
              <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                <div className="max-w-xl">
                  <Eyebrow>{c.howEyebrow}</Eyebrow>
                  <h2 className="mt-4 font-display text-2xl font-normal tracking-tight text-fg sm:text-3xl">
                    {c.howTitle}
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{c.howBody}</p>
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                    <a
                      href="https://lantr.ai"
                      className="text-sm font-medium text-accent hover:text-accent-ink"
                    >
                      {c.howLink} →
                    </a>
                    <a
                      href="https://github.com/Lantr-Consulting"
                      className="text-sm font-medium text-accent hover:text-accent-ink"
                    >
                      {c.githubLink} →
                    </a>
                  </div>
                </div>
                <div className="flex max-w-sm flex-wrap gap-1.5">
                  {[
                    "Next.js",
                    "Tailwind",
                    "FastAPI",
                    "LangChain",
                    "DeepSeek",
                    "Supabase",
                    "Railway",
                    "Vercel",
                    "Alpaca Paper API",
                    "Open-Meteo",
                    "Bluesky API",
                  ].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line-strong px-3 py-1 font-mono text-[11px] text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── final CTA + footer (the dark scene) ────────── */}
      <div className="scene-dark">
        <Section className="bg-grid mask-radial pb-0 pt-20 sm:pb-0 sm:pt-24">
          <Container className="text-center">
            <Reveal>
              <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-normal tracking-tight text-fg sm:text-4xl">
                {c.ctaTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
                {c.ctaBody}
              </p>
            </Reveal>
            <Reveal delay={140}>
              <div className="mb-4 mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#account"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-[15px] font-medium text-[#10202a] transition-all hover:-translate-y-px hover:bg-accent-ink"
                >
                  {c.ctaButton} →
                </a>
                <a
                  href="https://lantr.ai"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line-strong px-6 text-[15px] font-medium text-fg transition-colors hover:bg-surface"
                >
                  lantr.ai ↗
                </a>
              </div>
            </Reveal>
          </Container>
        </Section>
        <footer className="border-t border-line pb-8 pt-12">
          <Container>
            <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-gold">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/lantr_mark.png" alt="Lantr" className="size-4.5" />
                  </span>
                  <span className="text-[15px] font-semibold tracking-tight text-fg">
                    {lang === "zh" ? "蓝图 Lantr" : "Lantr"}
                  </span>
                </div>
                <p className="mt-3 max-w-xs font-display text-lg italic leading-snug text-muted">
                  {c.tagline}
                </p>
              </div>
              <nav
                aria-label="Footer"
                className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted"
              >
                {c.projects.map((p) => (
                  <a key={p.name} href={p.href} className="transition-colors hover:text-fg">
                    {p.name}
                  </a>
                ))}
                <a href="https://lantr.ai" className="transition-colors hover:text-fg">
                  lantr.ai
                </a>
                <a
                  href="https://github.com/Lantr-Consulting"
                  className="transition-colors hover:text-fg"
                >
                  GitHub
                </a>
              </nav>
            </div>
            <div className="mt-10 border-t border-line pt-6">
              <p className="text-xs leading-relaxed text-faint">{c.footer}</p>
            </div>
          </Container>
        </footer>
      </div>
    </div>
  );
}
