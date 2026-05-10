"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useT, LangToggle } from "@/lib/lang";

export function Navbar({ onApply }: { onApply: () => void }) {
  const t = useT();
  return (
    <header className="rsn-nav">
      <div className="rsn-shell rsn-nav-row">
        <a href="#top" className="rsn-logo">
          <span className="rsn-logo-mark">R</span>
          <span>RSN Club</span>
        </a>
        <nav className="rsn-nav-links">
          <a className="rsn-nav-link" href="#platform">{t("Platform", "平台")}</a>
          <a className="rsn-nav-link" href="#delivery">{t("Delivery", "履约")}</a>
          <a className="rsn-nav-link" href="#membership">{t("Membership", "会员")}</a>
          <a className="rsn-nav-link" href="#operations">{t("Operations", "运营")}</a>
          <a className="rsn-nav-link" href="#rollout">{t("Rollout", "推进路径")}</a>
        </nav>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <LangToggle />
          <Link
            href="/portal"
            className="rsn-btn rsn-btn-ghost"
            style={{ textDecoration: "none" }}
          >
            <span className="nav-btn-long">{t("Member Portal", "会员入口")}</span>
            <span className="nav-btn-short">{t("Portal", "入口")}</span>
            <ArrowUpRight size={12} />
          </Link>
          <button className="rsn-btn rsn-btn-primary" onClick={onApply}>
            <span className="nav-btn-long">{t("Apply for Membership", "申请会员资格")}</span>
            <span className="nav-btn-short">{t("Apply", "申请")}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
