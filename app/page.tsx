"use client";

/* lantr.site — the demo hub. FORGE design language, bilingual EN/中文.
   One sign-in (shared .lantr.site cookie session) opens all three demos. */

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  ColumnRules,
  LangToggle,
  persistLang,
  readLang,
  Reveal,
  Words,
  type Lang,
} from "@/components/landing/kit";

const COPY = {
  en: {
    navProjects: "Projects",
    navHow: "How they're built",
    badge: "Three live products · One account · All simulated",
    h1: "Real AI products, built the way our students build them.",
    subLead: "Every demo here started from zero and shipped ",
    subEm: "milestone by milestone",
    subRest:
      " — first ship, design, brain, hands, memory, autonomy — on the same track Lantr students follow. Create one account and wander through all of them.",
    trust: [
      "Sign in once — it works across every demo",
      "Simulated & public data only — nothing at stake",
      "All source code public on GitHub",
    ],
    accountSignedIn: (email: string) =>
      `Signed in as ${email} — open any project below, you're already signed in there too.`,
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
    live: "Live",
    projectsKicker: "The projects",
    projectsTitle: "Three directions, one method.",
    projectsBody:
      "Lantr students build a project aimed at their intended major. These are the flagship samples for each direction — every one a real, working product.",
    howKicker: "How they're built",
    howTitle: "One track. Fourteen modules. A shipped product.",
    howBody:
      "Each sample was built one milestone per session — exactly the pace and order a Lantr student follows with their mentor: first ship, design pass, the brain, the hands, memory & accounts, then autonomy. Every milestone is a public git tag you can check out and run.",
    howLink: "See the program at lantr.ai",
    githubLink: "Browse the source on GitHub",
    ctaTitle: "Sign in once. Wander all three.",
    ctaBody:
      "Simulated money, real forecasts, your own AI growth lead — nothing at stake, everything to poke at.",
    ctaButton: "Create your account",
    footer:
      "All demos run on simulated or public data — paper trading only, no real money, general guidance not financial or medical advice. Built with the Lantr AI Agent Builder track: Next.js on Vercel, Python agents on Railway, Supabase, and live market & environmental APIs.",
    projects: [
      {
        name: "AI Stock Analyst",
        href: "https://analyst.lantr.site",
        tagline: "Your personal AI portfolio manager",
        track: "Finance & quant track",
        blurb:
          "Describe how you invest in plain English. It researches the live market, proposes safeguard-checked trades you approve with one click, and runs standing missions on a schedule — on a $100k paper-trading account.",
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
        tagline: "An environmental-health planner for your real week",
        track: "Health & environment track",
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
        tagline: "An AI growth lead for your personal IP",
        track: "Marketing & media track",
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
    navProjects: "项目",
    navHow: "构建方式",
    badge: "三个在线产品 · 一个账户 · 全部模拟数据",
    h1: "真实上线的 AI 产品，和我们学员的构建方式一模一样。",
    subLead: "这里的每个演示都从零开始，",
    subEm: "按里程碑逐步上线",
    subRest:
      "——首次发布、设计、大脑、双手、记忆、自主运行——与 Lantr 学员遵循完全相同的路径。创建一个账户，即可畅游全部项目。",
    trust: [
      "登录一次，通行所有演示",
      "仅模拟与公开数据 — 毫无风险",
      "全部源码公开在 GitHub",
    ],
    accountSignedIn: (email: string) =>
      `已登录：${email} — 打开下方任意项目，无需再次登录。`,
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
    live: "在线",
    projectsKicker: "三个项目",
    projectsTitle: "三个方向，同一种方法。",
    projectsBody:
      "Lantr 学员会围绕自己的目标专业打造项目。这三个是各方向的旗舰示范——每一个都是真实可用的产品。",
    howKicker: "构建方式",
    howTitle: "一条路径，十四个模块，一个上线的产品。",
    howBody:
      "每个示范项目都是每次课程推进一个里程碑——与 Lantr 学员和导师的节奏、顺序完全一致：首次上线、设计打磨、大脑、双手、记忆与账户，最后是自主运行。每个里程碑都是可检出运行的公开 git tag。",
    howLink: "在 lantr.ai 了解课程",
    githubLink: "在 GitHub 浏览源码",
    ctaTitle: "登录一次，畅游三个产品。",
    ctaBody: "模拟资金、真实天气、你自己的 AI 增长负责人——零风险，尽情探索。",
    ctaButton: "创建你的账户",
    footer:
      "所有演示均运行在模拟或公开数据上——仅模拟盘交易，不涉及真实资金；一般性建议，不构成投资或医疗建议。基于 Lantr AI Agent Builder 课程构建：Next.js（Vercel）、Python 智能体（Railway）、Supabase，以及实时行情与环境数据 API。",
    projects: [
      {
        name: "AI Stock Analyst",
        href: "https://analyst.lantr.site",
        tagline: "你的专属 AI 投资组合经理",
        track: "金融与量化方向",
        blurb:
          "用一句话描述你的投资风格。它研究实时行情，提出经风控检查的交易建议，你一键批准；还能按计划执行常设任务——一切都在 10 万美元模拟账户中进行。",
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
        tagline: "为你的真实一周而生的环境健康规划师",
        track: "健康与环境方向",
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
        tagline: "你个人 IP 的 AI 增长负责人",
        track: "营销与媒体方向",
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

/* Miniature product vignettes — each card opens with a strip of the
   product's own visual language. */
function AnalystVignette() {
  return (
    <div className="flex h-24 items-end gap-3 overflow-hidden rounded-t-2xl bg-[#0b0b0b] px-5 pb-0">
      <div className="flex-1 pb-4">
        <div className="lp-mono text-[9px] uppercase tracking-[0.14em] text-[#7d7d78]">
          Portfolio · paper
        </div>
        <div className="mt-1 text-xl font-semibold tracking-tight text-[#f5f5f3]">
          $103,204.55
        </div>
        <div className="text-[11px] font-medium text-[#00c805]">+3.2% all time</div>
      </div>
      <svg viewBox="0 0 160 64" className="h-16 w-40" preserveAspectRatio="none" aria-hidden>
        <path
          d="M0,50 C20,46 35,52 55,42 S90,30 110,32 S140,16 160,12 L160,64 L0,64 Z"
          fill="#00c80522"
        />
        <path
          d="M0,50 C20,46 35,52 55,42 S90,30 110,32 S140,16 160,12"
          fill="none"
          stroke="#00c805"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

function AirAwareVignette() {
  return (
    <div className="relative h-24 overflow-hidden rounded-t-2xl bg-[#0d1420] px-5 pt-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 80% -10%, #4cc3ff2e 0%, transparent 60%)",
        }}
      />
      <div className="lp-mono relative text-[9px] uppercase tracking-[0.14em] text-[#7f95ad]">
        Today · feels like
      </div>
      <svg
        viewBox="0 0 300 44"
        className="relative mt-1 h-11 w-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,36 C40,34 70,20 110,14 S190,8 230,16 S280,32 300,34 L300,44 L0,44 Z"
          fill="#4cc3ff26"
        />
        <path
          d="M0,36 C40,34 70,20 110,14 S190,8 230,16 S280,32 300,34"
          fill="none"
          stroke="#4cc3ff"
          strokeWidth="2"
        />
        <line x1="150" y1="4" x2="150" y2="44" stroke="#ffffff2e" strokeWidth="1" strokeDasharray="3 3" />
      </svg>
      <div className="relative mt-1.5 flex gap-1.5">
        {[
          ["UV 8", "#fab21933"],
          ["AQI 62", "#fab21933"],
          ["Pollen 6.7", "#ec835a33"],
        ].map(([t, bg]) => (
          <span
            key={t}
            className="lp-mono rounded-full px-2 py-0.5 text-[9px] text-[#cfe6f7]"
            style={{ background: bg }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function PostPilotVignette() {
  return (
    <div
      className="relative h-24 overflow-hidden rounded-t-2xl bg-[#f6f4ef] px-5 pt-4"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, transparent 0, transparent 17px, #3a55d914 18px)",
      }}
    >
      <div className="lp-mono text-[9px] uppercase tracking-[0.14em] text-[#8b877c]">
        Atom #14 · story
      </div>
      <p
        className="mt-1 text-[13px] italic leading-snug text-[#2c2a24]"
        style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
      >
        “The day I benched 315 after my back injury, I cried in my car…”
      </p>
      <div className="mt-1.5 flex gap-1.5">
        {["story", "comeback", "vulnerability"].map((t) => (
          <span
            key={t}
            className="lp-mono rounded-full bg-[#3a55d915] px-2 py-0.5 text-[9px] text-[#3a55d9]"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

const VIGNETTES = [AnalystVignette, AirAwareVignette, PostPilotVignette];

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    setLang(readLang());
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user.email ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setUser(s?.user.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  function switchLang(l: Lang) {
    setLang(l);
    persistLang(l);
  }

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

  const c = COPY[lang];

  return (
    <div className="forge min-h-screen">
      {/* ── nav ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-[var(--lp-line)] bg-[color-mix(in_oklab,var(--lp-bg)_86%,transparent)] backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-5 px-5 sm:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-[var(--lp-gold)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/lantr_mark.png" alt="Lantr" className="size-4.5" />
            </span>
            <span className="leading-tight">
              <span className="block text-[15px] font-semibold tracking-tight text-[var(--lp-fg)]">
                Lantr
              </span>
              <span className="lp-mono block text-[10px] uppercase tracking-[0.14em] text-[var(--lp-faint)]">
                Project demos
              </span>
            </span>
          </div>
          <nav className="ml-4 hidden items-center gap-5 text-sm text-[var(--lp-muted)] md:flex">
            <a href="#projects" className="transition-colors hover:text-[var(--lp-fg)]">
              {c.navProjects}
            </a>
            <a href="#how" className="transition-colors hover:text-[var(--lp-fg)]">
              {c.navHow}
            </a>
            <a href="https://lantr.ai" className="transition-colors hover:text-[var(--lp-fg)]">
              lantr.ai ↗
            </a>
          </nav>
          <div className="ml-auto flex items-center gap-2.5">
            <LangToggle lang={lang} onChange={switchLang} />
            <a href="#account" className="lp-btn h-9 px-4 text-[13px]">
              {user ? c.open : mode === "signup" ? c.create : c.signIn}
            </a>
          </div>
        </div>
      </header>

      {/* ── hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <ColumnRules />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 pt-16 text-center sm:px-8 sm:pt-24">
          <Reveal>
            <span className="lp-mono inline-flex items-center gap-2 rounded-full border border-[var(--lp-line-strong)] bg-[var(--lp-surface)] px-4 py-2 text-[11px] font-medium text-[var(--lp-muted)]">
              <span aria-hidden className="size-1.5 rounded-full bg-[var(--lp-accent)]" />
              {c.badge}
            </span>
          </Reveal>
          <h1 className="lp-display mx-auto mt-7 max-w-3xl text-balance text-[2.4rem] font-normal leading-[1.08] tracking-[-0.015em] text-[var(--lp-fg)] sm:text-[3.6rem]">
            <Words text={c.h1} delay={120} />
          </h1>
          <Reveal delay={220}>
            <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-[var(--lp-muted)] sm:text-lg">
              {c.subLead}
              <em className="lp-display italic text-[var(--lp-ink)]">{c.subEm}</em>
              {c.subRest}
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[13px] text-[var(--lp-muted)]">
              {c.trust.map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <span aria-hidden className="h-1 w-1 rounded-full bg-[var(--lp-accent)]" />
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          {/* account card */}
          <Reveal delay={420} className="mx-auto mt-10 max-w-2xl">
            <div id="account" className="lp-card rounded-2xl p-5 text-left sm:p-6">
              {user ? (
                <div className="flex flex-wrap items-center gap-3">
                  <span aria-hidden className="size-2 rounded-full bg-[var(--lp-accent)]" />
                  <span className="flex-1 text-sm text-[var(--lp-ink)]">
                    {c.accountSignedIn(user)}
                  </span>
                  <button
                    onClick={() => supabase.auth.signOut()}
                    className="text-sm text-[var(--lp-faint)] transition-colors hover:text-[var(--lp-fg)]"
                  >
                    {c.signOut}
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="flex flex-wrap items-end gap-3">
                  <div className="flex min-w-44 flex-1 flex-col gap-1.5">
                    <label
                      className="lp-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--lp-faint)]"
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
                      className="rounded-xl border border-[var(--lp-line-strong)] bg-[var(--lp-surface2)] px-3.5 py-2.5 text-sm outline-none placeholder:text-[var(--lp-faint)] focus:border-[var(--lp-accent)]"
                    />
                  </div>
                  <div className="flex min-w-44 flex-1 flex-col gap-1.5">
                    <label
                      className="lp-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--lp-faint)]"
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
                      className="rounded-xl border border-[var(--lp-line-strong)] bg-[var(--lp-surface2)] px-3.5 py-2.5 text-sm outline-none placeholder:text-[var(--lp-faint)] focus:border-[var(--lp-accent)]"
                    />
                  </div>
                  <button type="submit" disabled={busy} className="lp-btn h-[42px] px-5 text-sm">
                    {busy ? c.busy : mode === "signup" ? c.create : c.signIn}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
                    className="w-full text-left text-xs text-[var(--lp-faint)] transition-colors hover:text-[var(--lp-fg)] sm:w-auto"
                  >
                    {mode === "signup" ? c.haveAccount : c.newHere}
                  </button>
                  {error && (
                    <p className="w-full text-xs text-[var(--lp-amber)]">{error}</p>
                  )}
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── projects ─────────────────────────────────────── */}
      <section id="projects" className="border-t border-[var(--lp-line)] bg-[var(--lp-bg2)]">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
          <Reveal>
            <div className="lp-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--lp-accent)]">
              {c.projectsKicker}
            </div>
            <h2 className="lp-display mt-3 text-3xl font-normal tracking-tight text-[var(--lp-fg)] sm:text-4xl">
              {c.projectsTitle}
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--lp-muted)]">
              {c.projectsBody}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {c.projects.map((p, i) => {
              const Vignette = VIGNETTES[i];
              return (
                <Reveal key={p.name} delay={i * 110}>
                  <div className="lp-card lp-lift flex h-full flex-col overflow-hidden rounded-2xl">
                    <Vignette />
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-lg font-semibold tracking-tight text-[var(--lp-fg)]">
                          {p.name}
                        </h3>
                        <span className="lp-mono flex items-center gap-1.5 rounded-full bg-[var(--lp-accent-wash)] px-2.5 py-1 text-[10px] font-semibold text-[var(--lp-accent-ink)]">
                          <span aria-hidden className="size-1 rounded-full bg-[var(--lp-accent)]" />
                          {c.live}
                        </span>
                      </div>
                      <div className="lp-display mt-1 text-[14px] italic text-[var(--lp-ink)]">
                        {p.tagline}
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--lp-muted)]">
                        {p.blurb}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {p.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2 text-[13px] leading-snug text-[var(--lp-ink)]"
                          >
                            <svg
                              viewBox="0 0 12 12"
                              className="mt-0.5 size-3 shrink-0 text-[var(--lp-accent)]"
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
                      <div className="mt-4 border-t border-[var(--lp-line)] pt-3">
                        <div className="lp-mono text-[10px] uppercase tracking-[0.14em] text-[var(--lp-faint)]">
                          {p.track}
                        </div>
                        <div className="mt-1 text-[12px] text-[var(--lp-muted)]">{p.majors}</div>
                      </div>
                      <a href={p.href} className="lp-btn mt-5 h-11 px-5 text-sm">
                        {c.open} {p.name} →
                      </a>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── how they're built ────────────────────────────── */}
      <section id="how" className="border-t border-[var(--lp-line)]">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
          <Reveal>
            <div className="lp-card rounded-2xl p-7 sm:p-10">
              <div className="lp-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--lp-accent)]">
                {c.howKicker}
              </div>
              <div className="mt-3 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                <div className="max-w-xl">
                  <h2 className="lp-display text-2xl font-normal tracking-tight text-[var(--lp-fg)] sm:text-3xl">
                    {c.howTitle}
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--lp-muted)]">
                    {c.howBody}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                    <a
                      href="https://lantr.ai"
                      className="text-sm font-medium text-[var(--lp-accent)] hover:text-[var(--lp-accent-ink)]"
                    >
                      {c.howLink} →
                    </a>
                    <a
                      href="https://github.com/Lantr-Consulting"
                      className="text-sm font-medium text-[var(--lp-accent)] hover:text-[var(--lp-accent-ink)]"
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
                      className="lp-mono rounded-full border border-[var(--lp-line-strong)] px-3 py-1 text-[11px] text-[var(--lp-muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── final CTA + footer (dark band) ───────────────── */}
      <section className="lp-scene">
        <div className="mx-auto w-full max-w-6xl px-5 pb-10 pt-20 sm:px-8">
          <div className="text-center">
            <Reveal>
              <h2 className="lp-display mx-auto max-w-2xl text-balance text-3xl font-normal tracking-tight text-[var(--lp-fg)] sm:text-4xl">
                {c.ctaTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--lp-muted)]">
                {c.ctaBody}
              </p>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href="#account" className="lp-btn h-12 px-6 text-[15px]">
                  {c.ctaButton} →
                </a>
                <a
                  href="https://lantr.ai"
                  className="lp-btn-ghost h-12 border-[var(--lp-line-strong)] bg-transparent px-6 text-[15px] text-[var(--lp-fg)]"
                >
                  lantr.ai ↗
                </a>
              </div>
            </Reveal>
          </div>
          <footer className="mt-16 border-t border-[var(--lp-line)] pt-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row">
              <div className="flex items-center gap-2.5">
                <span className="flex size-7 items-center justify-center rounded-lg bg-[var(--lp-gold)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/lantr_mark.png" alt="Lantr" className="size-4" />
                </span>
                <span className="text-sm font-semibold text-[var(--lp-fg)]">
                  Lantr · Project demos
                </span>
              </div>
              <p className="max-w-2xl text-[12px] leading-relaxed text-[var(--lp-faint)]">
                {c.footer}
              </p>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
