"use client";

import { ArrowUpRight, Activity, Globe, Layers, Users } from "lucide-react";
import { AreaLineChart, Sparkline } from "./Charts";
import { heroDashboardMetrics, revenueSeries, shipments } from "@/data/rsn";
import { useT } from "@/lib/lang";

export function Hero({
  onApply,
  onOverview,
}: {
  onApply: () => void;
  onOverview: () => void;
}) {
  const t = useT();
  const sparkValues = revenueSeries.map((d) => d.revenue);

  return (
    <section id="top" style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid var(--rsn-border)" }}>
      {/* ambient glows */}
      <div
        className="rsn-glow"
        style={{
          width: 520,
          height: 520,
          top: -180,
          left: -120,
          background: "radial-gradient(circle, rgba(181, 139, 58, 0.18), transparent 60%)",
        }}
      />
      <div
        className="rsn-glow"
        style={{
          width: 620,
          height: 620,
          bottom: -260,
          right: -200,
          background: "radial-gradient(circle, rgba(27, 67, 50, 0.10), transparent 60%)",
          opacity: 0.6,
        }}
      />
      <div className="rsn-grid-lines" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />

      <div className="rsn-shell rsn-hero-shell" style={{ position: "relative", padding: "120px 32px 100px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)",
            gap: 80,
            alignItems: "center",
          }}
          className="rsn-hero-grid"
        >
          {/* LEFT — narrative */}
          <div className="rsn-reveal">
            <div className="rsn-eyebrow">
              {t("Private Wholesale Institution · South Asia", "私享会员制批发平台 · 南亚区域")}
            </div>

            <h1
              className="rsn-serif"
              style={{
                fontSize: "clamp(46px, 5.8vw, 82px)",
                lineHeight: 1.0,
                letterSpacing: "-0.04em",
                marginTop: 22,
                marginBottom: 28,
                fontWeight: 300,
              }}
            >
              {t("The private wholesale", "为南亚区域而建的")}
              <br />
              <span style={{ fontStyle: "italic", color: "var(--rsn-gold)" }}>
                {t("infrastructure", "私享")}
              </span>
              <span style={{ color: "var(--rsn-text-2)" }}>
                {t(" layer", "批发基础设施")}
              </span>
              <br />
              {t("for South Asia.", "数字化运营层。")}
            </h1>

            <p
              style={{
                fontSize: 17,
                lineHeight: 1.6,
                color: "var(--rsn-text-2)",
                maxWidth: 560,
                marginBottom: 40,
              }}
            >
              {t(
                "RSN Club combines China sourcing authority, controlled cross-border logistics, AI-powered operations, and a members-only commerce layer into one institutional wholesale platform.",
                "RSN Club 将中国供应链资源、可控的跨境物流基础设施、AI智能运营层与会员制批发平台整合为同一套机构级数字化运营体系。"
              )}
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="rsn-btn rsn-btn-primary" onClick={onApply}>
                {t("Apply for Membership", "申请会员资格")} <ArrowUpRight size={14} />
              </button>
              <button
                className="rsn-btn rsn-btn-ghost rsn-hero-cta-secondary"
                onClick={onOverview}
              >
                {t("View Platform Overview", "了解平台架构")}
              </button>
            </div>

            {/* trust strip */}
            <div
              style={{
                marginTop: 56,
                paddingTop: 28,
                borderTop: "1px solid var(--rsn-border)",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 24,
              }}
            >
              {[
                {
                  k: t("Sourcing nodes", "供应链节点"),
                  v: t("Guangzhou · Shenzhen · Yiwu", "广州 · 深圳 · 义乌"),
                },
                {
                  k: t("Operating regions", "运营区域"),
                  v: t("Nepal pilot · India phased", "尼泊尔首发 · 印度分阶段"),
                },
                {
                  k: t("Governance", "治理模式"),
                  v: t("Members-only · Tiered access", "会员制 · 分级权益"),
                },
              ].map((it) => (
                <div key={it.k}>
                  <div
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--rsn-muted)",
                      marginBottom: 6,
                    }}
                  >
                    {it.k}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--rsn-text)" }}>{it.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — dashboard card */}
          <div className="rsn-reveal" style={{ animationDelay: "120ms" }}>
            <HeroDashboardCard sparkValues={sparkValues} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .rsn-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
          }
        }
      `}</style>
    </section>
  );
}

function HeroDashboardCard({ sparkValues }: { sparkValues: number[] }) {
  const t = useT();
  const labelMap: Record<string, string> = {
    "Active Members": "活跃会员",
    "Orders Processed": "已处理订单",
    "Supplier Network": "供应商网络",
    "Cross-Border Routes": "跨境通路",
  };
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #FAFAF7 100%)",
        border: "1px solid var(--rsn-border)",
        borderRadius: 6,
        boxShadow:
          "0 40px 90px -32px rgba(20, 20, 20, 0.18), 0 0 0 1px rgba(138, 107, 46, 0.04)",
        overflow: "hidden",
      }}
    >
      {/* card header */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--rsn-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="rsn-pulse" style={{ color: "#1B4332" }} />
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--rsn-text-2)",
            }}
          >
            {t("Live · Operating Console", "实时 · 管理驾驶舱")}
          </span>
        </div>
        <span
          className="rsn-mono"
          style={{ fontSize: 11, color: "var(--rsn-muted)" }}
        >
          v 4.2.0
        </span>
      </div>

      {/* metric grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          borderBottom: "1px solid var(--rsn-border)",
        }}
      >
        {heroDashboardMetrics.map((m, i) => {
          const Icon = [Users, Activity, Layers, Globe][i];
          return (
            <div
              key={m.label}
              style={{
                padding: "20px 22px",
                borderRight: i % 2 === 0 ? "1px solid var(--rsn-border)" : "none",
                borderBottom: i < 2 ? "1px solid var(--rsn-border)" : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <Icon size={14} color="var(--rsn-muted)" />
                <span
                  className="rsn-mono"
                  style={{ fontSize: 10, color: "#1B4332", letterSpacing: "0.04em" }}
                >
                  {m.delta}
                </span>
              </div>
              <div
                className="rsn-serif rsn-tabular"
                style={{ fontSize: 30, lineHeight: 1, marginBottom: 6, color: "var(--rsn-text)" }}
              >
                {m.value}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--rsn-muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {t(m.label, labelMap[m.label] ?? m.label)}
              </div>
            </div>
          );
        })}
      </div>

      {/* revenue chart */}
      <div style={{ padding: "20px 22px 16px", borderBottom: "1px solid var(--rsn-border)" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 6,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--rsn-muted)",
                marginBottom: 6,
              }}
            >
              {t("Monthly Revenue · USD millions", "月度营收 · 美元 · 百万")}
            </div>
            <div className="rsn-serif rsn-tabular" style={{ fontSize: 28, lineHeight: 1 }}>
              $4.82M
            </div>
          </div>
          <Sparkline values={sparkValues} color="#8A6B2E" width={120} height={36} />
        </div>
      </div>

      {/* AI demand */}
      <div
        style={{
          padding: "16px 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--rsn-border)",
          background: "rgba(201,168,97,0.04)",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--rsn-gold)",
              marginBottom: 4,
            }}
          >
            {t("AI Demand Forecast", "AI 需求预测")}
          </div>
          <div style={{ fontSize: 13, color: "var(--rsn-text)" }}>
            {t(
              "Mobile Accessories · +18% next 30 days",
              "手机配件类 · 未来 30 天 +18%"
            )}
          </div>
        </div>
        <span className="rsn-chip rsn-chip-gold">
          {t("Confidence 0.94", "置信度 0.94")}
        </span>
      </div>

      {/* shipment activity */}
      <div style={{ padding: "12px 22px 16px" }}>
        <div
          style={{
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--rsn-muted)",
            margin: "8px 0 12px",
          }}
        >
          {t("Shipment Activity", "在途货物")}
        </div>
        {shipments.slice(0, 3).map((s) => (
          <div
            key={s.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 12,
              alignItems: "center",
              padding: "10px 0",
              borderTop: "1px dashed var(--rsn-border)",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--rsn-text)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {s.id} · {s.route}
              </div>
              <div style={{ fontSize: 11, color: "var(--rsn-muted)", marginTop: 2 }}>
                {t("ETA", "预计")} {s.expectedDelivery} · {s.customsStage}
              </div>
            </div>
            <span
              className={`rsn-chip ${
                s.status === "Delivered" || s.status === "Cleared"
                  ? "rsn-chip-emerald"
                  : s.status === "On Hold"
                  ? "rsn-chip-red"
                  : "rsn-chip-gold"
              }`}
            >
              {s.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
