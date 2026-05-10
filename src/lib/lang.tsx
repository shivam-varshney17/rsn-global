"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "zh";

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const LangContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  toggle: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("rsn-lang") as Lang | null;
      if (saved === "en" || saved === "zh") setLang(saved);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("rsn-lang", lang);
      document.documentElement.lang = lang === "zh" ? "zh-Hans" : "en";
    } catch {}
  }, [lang]);

  return (
    <LangContext.Provider
      value={{
        lang,
        setLang,
        toggle: () => setLang((l) => (l === "en" ? "zh" : "en")),
      }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

/**
 * Returns `t(en, zh)` — pick the right string for the current language.
 * Fast to apply inline, no key dictionary needed.
 */
export function useT() {
  const { lang } = useLang();
  return (en: string, zh: string) => (lang === "zh" ? zh : en);
}

export function LangToggle({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  const { lang, toggle } = useLang();
  const isZh = lang === "zh";
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isZh ? "English" : "Chinese"}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0,
        padding: "5px 4px",
        border: `1px solid ${variant === "dark" ? "var(--rsn-border)" : "var(--rsn-border)"}`,
        background: variant === "dark" ? "var(--rsn-surface)" : "var(--rsn-bg)",
        borderRadius: 2,
        fontFamily: "inherit",
        cursor: "pointer",
        fontSize: 11,
        letterSpacing: "0.06em",
      }}
    >
      <span
        style={{
          padding: "3px 9px",
          background: !isZh ? "var(--rsn-text)" : "transparent",
          color: !isZh ? "var(--rsn-bg)" : "var(--rsn-text-2)",
          borderRadius: 1,
          transition: "all 0.15s ease",
        }}
      >
        EN
      </span>
      <span
        style={{
          padding: "3px 9px",
          background: isZh ? "var(--rsn-text)" : "transparent",
          color: isZh ? "var(--rsn-bg)" : "var(--rsn-text-2)",
          borderRadius: 1,
          fontFamily: "Helvetica Neue, Helvetica, 'PingFang SC', 'Microsoft YaHei', sans-serif",
          transition: "all 0.15s ease",
        }}
      >
        中文
      </span>
    </button>
  );
}
