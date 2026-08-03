"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

const PROJECTS = [
  {
    name: "AI Stock Analyst",
    href: "https://analyst.lantr.site",
    live: true,
    blurb:
      "A personal AI portfolio manager on a paper-trading account. Describe how you invest in plain English — it researches the live market, proposes safeguard-checked trades you approve with one click, and runs standing missions on a schedule.",
    tags: ["Alpaca paper trading", "LangChain agent", "Risk engine"],
  },
  {
    name: "AirAware",
    href: "https://airaware.lantr.site",
    live: true,
    blurb:
      "An environmental-health advisor that plans your week around UV, heat, air quality, and pollen. It reads real forecasts, scores every activity window with cited health bands, and re-plans when conditions change.",
    tags: ["Open-Meteo", "Health-band engine", "Daily briefings"],
  },
  {
    name: "PostPilot",
    href: "https://postpilot.lantr.site",
    live: true,
    blurb:
      "A growth lead for creators. It builds a versioned brand book from your voice, drafts posts through an editorial engine with cited rules, and runs campaigns while you're away.",
    tags: ["Editorial engine", "Brand book", "Campaigns"],
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user.email ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setUser(s?.user.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

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

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-14">
      <header className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-xl bg-scene">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lantr_mark.png" alt="Lantr" className="size-5" />
        </span>
        <div>
          <div className="text-lg font-semibold tracking-tight">Lantr</div>
          <div className="text-xs text-faint">Project demos</div>
        </div>
        <a
          href="https://lantr.ai"
          className="ml-auto text-sm text-muted hover:text-fg"
        >
          lantr.ai →
        </a>
      </header>

      <section className="mt-14 max-w-2xl">
        <h1 className="font-display text-5xl font-semibold tracking-tight">
          Real AI products, built the way our students build them.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Every project here started from zero and shipped milestone by
          milestone — the same track Lantr students follow. Sign in once and
          you&apos;re signed in across all of them. Everything runs on
          simulated data: no real money, nothing at stake, play freely.
        </p>
      </section>

      <section className="mt-10">
        {user ? (
          <div className="flex flex-wrap items-center gap-3 card px-5 py-4">
            <span aria-hidden className="size-2 rounded-full bg-accent" />
            <span className="text-sm">
              Signed in as <strong>{user}</strong> — open any project below,
              you&apos;re already signed in there too.
            </span>
            <button
              onClick={() => supabase.auth.signOut()}
              className="ml-auto text-sm text-faint hover:text-fg"
            >
              Sign out
            </button>
          </div>
        ) : (
          <form
            onSubmit={submit}
            className="flex flex-wrap items-end gap-3 card px-5 py-4"
          >
            <div className="flex min-w-40 flex-1 flex-col gap-1">
              <label className="text-xs font-medium text-faint" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-lg border border-line-strong bg-surface-2 px-3.5 py-2.5 text-sm outline-none placeholder:text-faint focus:border-accent"
              />
            </div>
            <div className="flex min-w-40 flex-1 flex-col gap-1">
              <label className="text-xs font-medium text-faint" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="6+ characters"
                className="rounded-lg border border-line-strong bg-surface-2 px-3.5 py-2.5 text-sm outline-none placeholder:text-faint focus:border-accent"
              />
            </div>
            <button type="submit" disabled={busy} className="btn-primary px-5 py-2.5 text-sm">
              {busy ? "One moment…" : mode === "signup" ? "Create account" : "Sign in"}
            </button>
            <button
              type="button"
              onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
              className="text-xs text-faint hover:text-fg"
            >
              {mode === "signup" ? "Have an account? Sign in" : "New here? Create account"}
            </button>
            {error && <p className="w-full text-xs text-amber">{error}</p>}
          </form>
        )}
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {PROJECTS.map((p) => (
          <div key={p.name} className="card flex flex-col p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold tracking-tight">{p.name}</h2>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  p.live ? "bg-accent-wash text-accent-ink" : "bg-surface-2 text-faint"
                }`}
              >
                {p.live ? "Live" : "Soon"}
              </span>
            </div>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.blurb}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full border border-line px-2 py-0.5 text-[10px] text-faint">
                  {t}
                </span>
              ))}
            </div>
            {p.href ? (
              <a href={p.href} className="btn-primary mt-4 px-4 py-2.5 text-sm">
                Open {p.name}
              </a>
            ) : (
              <span className="mt-4 inline-flex items-center justify-center rounded-full border border-line px-4 py-2.5 text-sm text-faint">
                In the workshop
              </span>
            )}
          </div>
        ))}
      </section>

      <footer className="mt-12 text-xs leading-relaxed text-faint">
        All demos run on simulated or public data — paper trading only, no real
        money, general guidance not financial or medical advice. Built with the
        Lantr AI Agent Builder track: Next.js on Vercel, Python agents on
        Railway, Supabase, and live market &amp; environmental APIs.
      </footer>
    </main>
  );
}
