"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { members } from "@/data/rsn";
import { Sparkline } from "./Charts";
import { useT } from "@/lib/lang";
import { CITY, MEMBER_TYPE, MEMBER_TIER, tr } from "@/lib/translations";

export function DashboardDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useT();
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="rsn-overlay" onClick={onClose} />
      <aside className="rsn-drawer" role="complementary">
        <div
          style={{
            padding: "20px 28px",
            borderBottom: "1px solid var(--rsn-border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "var(--rsn-surface)",
            position: "sticky",
            top: 0,
          }}
        >
          <div>
            <div
              className="rsn-mono"
              style={{
                fontSize: 10,
                color: "var(--rsn-gold)",
                letterSpacing: "0.22em",
                marginBottom: 6,
              }}
            >
              {t("ADMIN PREVIEW · MEMBERS", "管理预览 · 会员")}
            </div>
            <div className="rsn-serif" style={{ fontSize: 20 }}>
              {t("Member Directory", "会员名册")}
            </div>
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
            style={{
              background: "transparent",
              border: "1px solid var(--rsn-border-2)",
              color: "var(--rsn-text-2)",
              width: 34,
              height: 34,
              borderRadius: 2,
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
            }}
          >
            <X size={14} />
          </button>
        </div>

        <div style={{ padding: "20px 28px" }}>
          {/* summary */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1,
              border: "1px solid var(--rsn-border)",
              background: "var(--rsn-border)",
              borderRadius: 2,
              marginBottom: 24,
            }}
          >
            {[
              { k: t("Active", "活跃"), v: "1,284" },
              { k: t("Pending", "待审核"), v: "12" },
              { k: t("GMV / member", "人均 GMV"), v: "$8,940" },
              { k: t("Renewal Rate", "续费率"), v: "94%" },
            ].map((m) => (
              <div
                key={m.k}
                style={{
                  background: "var(--rsn-bg)",
                  padding: "16px 18px",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--rsn-muted)",
                    marginBottom: 6,
                  }}
                >
                  {m.k}
                </div>
                <div
                  className="rsn-serif rsn-tabular"
                  style={{ fontSize: 22, lineHeight: 1 }}
                >
                  {m.v}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {members.map((m) => (
              <article
                key={m.id}
                style={{
                  border: "1px solid var(--rsn-border)",
                  background: "var(--rsn-surface)",
                  padding: "16px 18px",
                  borderRadius: 2,
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 14,
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                      marginBottom: 4,
                    }}
                  >
                    <span
                      className="rsn-mono"
                      style={{ fontSize: 11, color: "var(--rsn-muted)" }}
                    >
                      {m.id}
                    </span>
                    <span style={{ fontSize: 14, color: "var(--rsn-text)" }}>
                      {m.name}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--rsn-muted)",
                      display: "flex",
                      gap: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    <span>{tr(m.city, CITY, t)}</span>
                    <span>·</span>
                    <span>{tr(m.type, MEMBER_TYPE, t)}</span>
                    <span>·</span>
                    <span>{t("Owner", "客户经理")} {m.accountOwner}</span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <span
                    className={`rsn-chip ${
                      m.tier === "Founding" || m.tier === "Platinum"
                        ? "rsn-chip-gold"
                        : m.status === "Active"
                        ? "rsn-chip-emerald"
                        : ""
                    }`}
                  >
                    {tr(m.tier, MEMBER_TIER, t)}
                  </span>
                  <span
                    className="rsn-mono rsn-tabular"
                    style={{ fontSize: 11, color: "var(--rsn-text-2)" }}
                  >
                    ${m.totalSpend.toLocaleString("en-US")}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div
            style={{
              marginTop: 24,
              padding: 18,
              border: "1px dashed var(--rsn-border)",
              borderRadius: 2,
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--rsn-muted)",
                marginBottom: 12,
              }}
            >
              {t("90-day spend trajectory", "近 90 天采购趋势")}
            </div>
            <Sparkline
              values={[31, 42, 38, 56, 62, 71, 68, 79, 88, 92, 96, 104]}
              width={460}
              height={56}
              color="#8A6B2E"
            />
          </div>
        </div>
      </aside>
    </>
  );
}
