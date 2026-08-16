"use client";

/* Shared building blocks for the FORGE marketing landing.
   Dependency-free: reveals via IntersectionObserver + CSS,
   language persisted on a .lantr.site cookie so every demo
   in the family opens in the language you last chose. */

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export type Lang = "en" | "zh";

const LANG_KEY = "lantr-lang";

export function readLang(): Lang {
  try {
    const m = document.cookie.match(/(?:^|; )lantr-lang=(en|zh)/);
    if (m) return m[1] as Lang;
    const s = localStorage.getItem(LANG_KEY);
    if (s === "en" || s === "zh") return s;
    if (navigator.language?.toLowerCase().startsWith("zh")) return "zh";
  } catch {}
  return "en";
}

export function persistLang(lang: Lang) {
  try {
    localStorage.setItem(LANG_KEY, lang);
    const domain = location.hostname.endsWith("lantr.site")
      ? "; Domain=.lantr.site"
      : "";
    document.cookie = `${LANG_KEY}=${lang}${domain}; Path=/; Max-Age=${365 * 86400}; SameSite=Lax`;
  } catch {}
}

/** Compact two-tab language switch. */
export function LangToggle({
  lang,
  onChange,
}: {
  lang: Lang;
  onChange: (l: Lang) => void;
}) {
  return (
    <div className="inline-flex border border-line-strong bg-surface p-0.5 font-mono text-[11px] font-medium">
      {(["en", "zh"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className={`px-2.5 py-1 transition-colors ${
            l === lang
              ? "bg-fg text-bg"
              : "text-muted hover:text-fg"
          }`}
          aria-pressed={l === lang}
        >
          {l === "zh" ? "中文" : "EN"}
        </button>
      ))}
    </div>
  );
}

/** Scroll-in reveal with a soft ease + blur. */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`lp-reveal ${inView ? "lp-in" : ""} ${className}`}
      style={{ "--lp-d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/** Word-by-word cascade for display headlines.
    Chinese (no spaces) cascades character by character. */
export function Words({ text, delay = 0 }: { text: string; delay?: number }) {
  let partIndex = 0;
  const lines = text.split("\n");

  return (
    <span aria-label={text}>
      {lines.map((line, lineIndex) => {
        const hasSpaces = line.includes(" ");
        const parts = hasSpaces ? line.split(" ") : Array.from(line);
        const step = hasSpaces ? 55 : 28;

        return (
          <span key={`${lineIndex}-${line}`} className={lines.length > 1 ? "block" : undefined} aria-hidden>
            {parts.map((part, index) => {
              const currentIndex = partIndex++;
              return (
                <span key={`${index}-${part}`}>
                  <span
                    className="lp-word"
                    style={{ "--lp-d": `${delay + currentIndex * step}ms` } as CSSProperties}
                  >
                    {part}
                  </span>
                  {hasSpaces && index < parts.length - 1 ? " " : ""}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

/** Structural column rules + hatched margins (the FORGE hero frame). */
export function ColumnRules({ gutters = false }: { gutters?: boolean } = {}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-6xl -translate-x-1/2 lg:block"
      style={{
        borderLeft: "1px solid var(--lp-rule)",
        borderRight: "1px solid var(--lp-rule)",
      }}
    >
      {gutters ? (
        <>
          <span
            className="lp-hatch absolute inset-y-0 right-full"
            style={{
              width: "max(0px, calc((100vw - 72rem) / 2 - 2.5rem))",
              borderLeft: "1px solid var(--lp-rule)",
            }}
          />
          <span
            className="lp-hatch absolute inset-y-0 left-full"
            style={{
              width: "max(0px, calc((100vw - 72rem) / 2 - 2.5rem))",
              borderRight: "1px solid var(--lp-rule)",
            }}
          />
        </>
      ) : null}
    </div>
  );
}
