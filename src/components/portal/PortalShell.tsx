"use client";

import { type ReactNode } from "react";
import {
  LayoutGrid,
  Package,
  Truck,
  FileText,
  User,
  Bell,
  Search,
  Headphones,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { currentMember } from "@/data/portal";
import { useT, LangToggle } from "@/lib/lang";

export type PortalTab =
  | "catalog"
  | "orders"
  | "shipments"
  | "quotes"
  | "account";

interface NavItem {
  id: PortalTab;
  labelEn: string;
  labelZh: string;
  icon: typeof LayoutGrid;
  count?: number;
}

const NAV_ITEMS: NavItem[] = [
  { id: "catalog", labelEn: "Catalog", labelZh: "商品目录", icon: LayoutGrid },
  { id: "orders", labelEn: "Orders", labelZh: "订单", icon: Package, count: 3 },
  { id: "shipments", labelEn: "Shipments", labelZh: "在途货物", icon: Truck, count: 4 },
  { id: "quotes", labelEn: "Quotes", labelZh: "询价", icon: FileText, count: 3 },
  { id: "account", labelEn: "Account", labelZh: "账户", icon: User },
];

export function PortalShell({
  tab,
  onTab,
  side,
  children,
}: {
  tab: PortalTab;
  onTab: (t: PortalTab) => void;
  side?: ReactNode;
  children: ReactNode;
}) {
  const t = useT();
  const credit = (currentMember.creditUsed / currentMember.creditLine) * 100;
  return (
    <div className={`portal-root ${side ? "" : "no-side"}`}>
      <header className="portal-header">
        {/* left: logo + member */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <Link
            href="/"
            className="rsn-logo"
            style={{ textDecoration: "none", color: "var(--rsn-text)" }}
          >
            <span className="rsn-logo-mark">R</span>
            <span style={{ fontSize: 14 }}>RSN Club</span>
          </Link>
          <span
            className="portal-subtitle"
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--rsn-muted)",
            }}
          >
            {t("Member Portal", "会员系统")}
          </span>
        </div>

        {/* center: search */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            border: "1px solid var(--rsn-border)",
            background: "var(--rsn-bg)",
            padding: "8px 12px",
            borderRadius: 2,
            width: 380,
          }}
          className="portal-search"
        >
          <Search size={14} color="var(--rsn-muted)" />
          <input
            placeholder={t("Search SKUs, suppliers, orders…", "搜索 SKU、供应商、订单…")}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: 13,
              color: "var(--rsn-text)",
              fontFamily: "inherit",
            }}
          />
          <span
            className="rsn-mono"
            style={{
              fontSize: 10,
              color: "var(--rsn-muted)",
              padding: "2px 6px",
              border: "1px solid var(--rsn-border)",
              borderRadius: 2,
            }}
          >
            ⌘K
          </span>
        </div>

        {/* right: lang toggle + member chip */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <LangToggle />
          <button
            aria-label="Notifications"
            className="portal-bell"
            style={{
              border: "1px solid var(--rsn-border)",
              background: "transparent",
              width: 34,
              height: 34,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              color: "var(--rsn-text-2)",
            }}
          >
            <Bell size={14} />
          </button>
          <div
            className="portal-member-chip"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "6px 12px",
              border: "1px solid var(--rsn-border)",
              borderRadius: 2,
              background: "var(--rsn-bg)",
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #d8c896, #8A6B2E)",
                display: "grid",
                placeItems: "center",
                color: "#0A0A0A",
                fontSize: 12,
                fontWeight: 500,
                flexShrink: 0,
              }}
            >
              PT
            </div>
            <div className="portal-member-name" style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
              <span style={{ fontSize: 12, color: "var(--rsn-text)" }}>
                {currentMember.name}
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: "var(--rsn-muted)",
                  letterSpacing: "0.06em",
                }}
              >
                {currentMember.id} · {t(currentMember.tier, currentMember.tier === "Gold" ? "金" : currentMember.tier)} · {currentMember.accountOwner}
              </span>
            </div>
          </div>
        </div>
      </header>

      <nav className="portal-nav">
        <div className="portal-nav-section">{t("Workspace", "工作区")}</div>
        {NAV_ITEMS.map((it) => {
          const Icon = it.icon;
          return (
            <button
              key={it.id}
              onClick={() => onTab(it.id)}
              className={`portal-nav-item ${tab === it.id ? "active" : ""}`}
            >
              <Icon size={15} strokeWidth={1.5} />
              <span>{t(it.labelEn, it.labelZh)}</span>
              {typeof it.count === "number" && (
                <span className="count">{it.count}</span>
              )}
            </button>
          );
        })}

        <div className="portal-nav-section">{t("Account", "账户")}</div>
        <div style={{ padding: "0 16px" }}>
          {/* credit line */}
          <div
            style={{
              padding: "14px 16px",
              border: "1px solid var(--rsn-border)",
              borderRadius: 2,
              background: "var(--rsn-bg)",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--rsn-muted)",
                marginBottom: 8,
              }}
            >
              <span>{t("Credit Line", "授信额度")}</span>
              <span>{credit.toFixed(0)}%</span>
            </div>
            <div
              style={{
                height: 4,
                background: "var(--rsn-bg-2)",
                borderRadius: 1,
                marginBottom: 10,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${credit}%`,
                  height: "100%",
                  background: "var(--rsn-gold)",
                }}
              />
            </div>
            <div
              className="rsn-tabular"
              style={{ fontSize: 12, color: "var(--rsn-text)" }}
            >
              ${currentMember.creditUsed.toLocaleString("en-US")}{" "}
              <span style={{ color: "var(--rsn-muted)" }}>
                {t("of", "/")} ${currentMember.creditLine.toLocaleString("en-US")}
              </span>
            </div>
          </div>

          <button
            style={{
              width: "100%",
              padding: "10px 14px",
              border: "1px solid var(--rsn-border)",
              background: "var(--rsn-bg)",
              borderRadius: 2,
              fontSize: 12,
              color: "var(--rsn-text)",
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Headphones size={13} strokeWidth={1.5} /> {t("Concierge", "专属服务")}
            </span>
            <ArrowUpRight size={12} />
          </button>
        </div>
      </nav>

      <main className="portal-main">{children}</main>
      {side && <aside className="portal-side">{side}</aside>}

      {/* mobile bottom tab nav */}
      <nav className="portal-mobile-nav" aria-label="Tabs">
        <div className="portal-mobile-nav-row">
          {NAV_ITEMS.map((it) => {
            const Icon = it.icon;
            const active = tab === it.id;
            return (
              <button
                key={it.id}
                onClick={() => onTab(it.id)}
                className={`portal-mobile-nav-item ${active ? "active" : ""}`}
              >
                <Icon size={18} strokeWidth={1.6} />
                <span>{t(it.labelEn, it.labelZh)}</span>
                {typeof it.count === "number" && (
                  <span className="badge">{it.count}</span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <style>{`
        @media (max-width: 1280px) {
          .portal-search { display: none; }
        }
        @media (max-width: 480px) {
          .portal-bell { display: none; }
        }
      `}</style>
    </div>
  );
}
