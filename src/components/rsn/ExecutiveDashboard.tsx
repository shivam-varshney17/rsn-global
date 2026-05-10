"use client";

import Link from "next/link";
import { ArrowUpRight, AlertTriangle, CircleCheck, Info, Bell } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { useT } from "@/lib/lang";
import {
  AreaLineChart,
  MultiLineChart,
  BarRows,
} from "./Charts";
import {
  executiveMetrics,
  revenueSeries,
  memberGrowth,
  demandTrend,
  regionHeatmap,
  shipments,
  orders,
  suppliers,
  aiInsights,
  operationalAlerts,
} from "@/data/rsn";

export function ExecutiveDashboard({ onOpenDrawer }: { onOpenDrawer: () => void }) {
  const t = useT();
  return (
    <section className="rsn-section" id="operations" style={{ background: "var(--rsn-bg-2)" }}>
      <div className="rsn-shell">
        <SectionHeader
          eyebrow={t("Executive Visibility", "高层视图")}
          title={
            <>
              {t("The operating console", "机构的")}
              <br />
              <em style={{ color: "var(--rsn-gold)", fontStyle: "italic" }}>
                {t("of the institution.", "管理驾驶舱。")}
              </em>
            </>
          }
          description={t(
            "A private executive room rendered as a dashboard. Sourcing, logistics, members, and AI intelligence — surfaced as one operating picture.",
            "以仪表盘呈现的私享决策室。供应链、物流、会员、AI 智能 —— 整合为同一张运营全景图。"
          )}
        />

        <div
          style={{
            border: "1px solid var(--rsn-border)",
            borderRadius: 6,
            background: "var(--rsn-surface)",
            overflow: "hidden",
            boxShadow: "0 40px 90px -36px rgba(20, 20, 20, 0.18)",
          }}
        >
          {/* console chrome */}
          <div
            style={{
              padding: "14px 22px",
              borderBottom: "1px solid var(--rsn-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "var(--rsn-bg-2)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div className="rsn-pulse" style={{ color: "#1B4332" }} />
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--rsn-text-2)",
                }}
              >
                {t("RSN OPERATING CONSOLE · Live", "RSN 管理驾驶舱 · 实时")}
              </span>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span
                className="rsn-mono"
                style={{ fontSize: 11, color: "var(--rsn-muted)" }}
              >
                NPL · KTM · 2026-05-10 · 14:24
              </span>
              <Link
                href="/portal"
                style={{
                  border: "1px solid var(--rsn-border-2)",
                  background: "transparent",
                  color: "var(--rsn-text-2)",
                  padding: "6px 12px",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  borderRadius: 2,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {t("Open Member Portal", "进入会员系统")} <ArrowUpRight size={11} />
              </Link>
              <button
                onClick={onOpenDrawer}
                style={{
                  border: "1px solid var(--rsn-border-2)",
                  background: "transparent",
                  color: "var(--rsn-text-2)",
                  padding: "6px 12px",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  borderRadius: 2,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {t("Members", "会员")}
              </button>
            </div>
          </div>

          {/* metric strip */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              borderBottom: "1px solid var(--rsn-border)",
            }}
            className="rsn-metric-strip"
          >
            {executiveMetrics.slice(0, 4).map((m, i) => (
              <MetricCell key={m.label} m={m} borderRight={i < 3} />
            ))}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              borderBottom: "1px solid var(--rsn-border)",
            }}
            className="rsn-metric-strip"
          >
            {executiveMetrics.slice(4, 8).map((m, i) => (
              <MetricCell key={m.label} m={m} borderRight={i < 3} />
            ))}
          </div>

          {/* main grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
              borderBottom: "1px solid var(--rsn-border)",
            }}
            className="rsn-dash-row-1"
          >
            {/* revenue chart */}
            <div
              style={{
                padding: 28,
                borderRight: "1px solid var(--rsn-border)",
              }}
            >
              <PanelHeader
                title={t("Revenue & GMV", "营收 & GMV")}
                subtitle={t("Trailing 11 months · USD millions", "近 11 个月 · 美元 · 百万")}
                tag={t("Healthy", "运行良好")}
              />
              <AreaLineChart
                data={revenueSeries}
                primaryKey="revenue"
                secondaryKey="gmv"
                primaryColor="#8A6B2E"
                secondaryColor="#4A4A4A"
                yLabel={(v) => `$${v.toFixed(1)}M`}
                height={240}
              />
              <div
                style={{
                  display: "flex",
                  gap: 24,
                  marginTop: 14,
                  fontSize: 11,
                  color: "var(--rsn-text-2)",
                  letterSpacing: "0.06em",
                }}
              >
                <span>
                  <span
                    style={{
                      display: "inline-block",
                      width: 14,
                      height: 1,
                      background: "#8A6B2E",
                      marginRight: 8,
                      verticalAlign: "middle",
                    }}
                  />
                  Revenue
                </span>
                <span>
                  <span
                    style={{
                      display: "inline-block",
                      width: 14,
                      borderTop: "1px dashed #4A4A4A",
                      marginRight: 8,
                      verticalAlign: "middle",
                    }}
                  />
                  GMV
                </span>
              </div>
            </div>

            {/* AI briefing */}
            <div style={{ padding: 28 }}>
              <PanelHeader title={t("AI Briefing", "AI 简报")} subtitle={t("Demand intelligence · 30-day window", "需求情报 · 30 天窗口")} tag={t("3 actions", "3 项建议")} />
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {aiInsights.map((ins) => (
                  <div
                    key={ins.category}
                    style={{
                      borderTop: "1px dashed var(--rsn-border)",
                      paddingTop: 14,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                      }}
                    >
                      <span style={{ fontSize: 13, color: "var(--rsn-text)" }}>
                        {ins.category}
                      </span>
                      <span
                        className="rsn-mono"
                        style={{
                          fontSize: 11,
                          color: "var(--rsn-gold)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {ins.growthPrediction}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--rsn-muted)",
                        marginTop: 4,
                        lineHeight: 1.5,
                      }}
                    >
                      {ins.recommendedAction}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: 6,
                        marginTop: 8,
                        flexWrap: "wrap",
                      }}
                    >
                      <span className="rsn-chip">{ins.region}</span>
                      <span
                        className={`rsn-chip ${
                          ins.supplyRisk === "Low"
                            ? "rsn-chip-emerald"
                            : ins.supplyRisk === "Elevated"
                            ? "rsn-chip-red"
                            : "rsn-chip-gold"
                        }`}
                      >
                        Risk · {ins.supplyRisk}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* row 2: demand + region heatmap + member growth */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1fr)",
              borderBottom: "1px solid var(--rsn-border)",
            }}
            className="rsn-dash-row-2"
          >
            <div
              style={{
                padding: 28,
                borderRight: "1px solid var(--rsn-border)",
              }}
            >
              <PanelHeader title={t("Demand Trend by Category", "品类需求趋势")} subtitle={t("Indexed score · 12 weeks", "指数化评分 · 12 周")} tag={t("+22% beauty", "美妆 +22%")} />
              <MultiLineChart
                data={demandTrend}
                series={[
                  { key: "mobile", color: "#8A6B2E", label: "Mobile" },
                  { key: "beauty", color: "#1B4332", label: "Beauty" },
                  { key: "home", color: "#3A5A85", label: "Home" },
                  { key: "apparel", color: "#5C5C5C", label: "Apparel" },
                ]}
                height={220}
              />
              <div
                style={{
                  display: "flex",
                  gap: 18,
                  marginTop: 12,
                  fontSize: 11,
                  color: "var(--rsn-text-2)",
                  flexWrap: "wrap",
                }}
              >
                {[
                  { c: "#8A6B2E", l: "Mobile" },
                  { c: "#1B4332", l: "Beauty" },
                  { c: "#3A5A85", l: "Home" },
                  { c: "#5C5C5C", l: "Apparel" },
                ].map((s) => (
                  <span key={s.l}>
                    <span
                      style={{
                        display: "inline-block",
                        width: 10,
                        height: 1,
                        background: s.c,
                        marginRight: 8,
                        verticalAlign: "middle",
                      }}
                    />
                    {s.l}
                  </span>
                ))}
              </div>
            </div>

            <div
              style={{
                padding: 28,
                borderRight: "1px solid var(--rsn-border)",
              }}
            >
              <PanelHeader title={t("Regional Load", "区域需求负载")} subtitle={t("Active demand index", "实时需求指数")} tag={t("South Asia", "南亚")} />
              <BarRows rows={regionHeatmap.map((r) => ({ label: r.region, value: r.load }))} />
            </div>

            <div style={{ padding: 28 }}>
              <PanelHeader title={t("Member Growth", "会员增长")} subtitle={t("Active wholesale members", "活跃批发会员")} tag="+9.1%" />
              <AreaLineChart
                data={memberGrowth}
                primaryKey="count"
                primaryColor="#1B4332"
                yLabel={(v) => Math.round(v).toString()}
                height={200}
              />
            </div>
          </div>

          {/* row 3: orders feed + supplier table + alerts */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1.2fr) minmax(0, 1fr)",
            }}
            className="rsn-dash-row-3"
          >
            {/* recent orders */}
            <div
              style={{
                borderRight: "1px solid var(--rsn-border)",
                padding: "28px 0 0",
              }}
            >
              <div style={{ padding: "0 28px" }}>
                <PanelHeader title={t("Recent Orders", "近期订单")} subtitle={t("Live fulfillment activity", "实时履约动态")} tag={t("6 active", "6 项进行中")} />
              </div>
              <table className="rsn-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Member</th>
                    <th>Value</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="rsn-tabular">
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td className="rsn-mono" style={{ color: "var(--rsn-gold)" }}>
                        {o.id}
                      </td>
                      <td>{o.member}</td>
                      <td>${o.value.toLocaleString("en-US")}</td>
                      <td>
                        <span
                          className={`rsn-chip ${
                            o.status === "Delivered" || o.status === "Reconciled"
                              ? "rsn-chip-emerald"
                              : o.status === "Confirmed"
                              ? ""
                              : "rsn-chip-gold"
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* supplier performance */}
            <div
              style={{
                borderRight: "1px solid var(--rsn-border)",
                padding: "28px 0 0",
              }}
            >
              <div style={{ padding: "0 28px" }}>
                <PanelHeader title={t("Supplier Performance", "供应商表现")} subtitle={t("Verified network · top 6", "已认证网络 · 前 6 名")} tag={t("Avg 94%", "均值 94%")} />
              </div>
              <table className="rsn-table">
                <thead>
                  <tr>
                    <th>Supplier</th>
                    <th>Region</th>
                    <th>Lead</th>
                    <th>Quality</th>
                  </tr>
                </thead>
                <tbody className="rsn-tabular">
                  {suppliers.map((s) => (
                    <tr key={s.id}>
                      <td>
                        <div style={{ color: "var(--rsn-text)" }}>{s.name}</div>
                        <div style={{ fontSize: 11, color: "var(--rsn-muted)" }}>
                          {s.category}
                        </div>
                      </td>
                      <td style={{ color: "var(--rsn-text-2)" }}>{s.region}</td>
                      <td>{s.leadTimeDays}d</td>
                      <td>
                        <span
                          className={`rsn-chip ${
                            s.qualityScore >= 95 ? "rsn-chip-emerald" : "rsn-chip-gold"
                          }`}
                        >
                          {s.qualityScore}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* alerts */}
            <div style={{ padding: 28 }}>
              <PanelHeader title={t("Operational Alerts", "运营提醒")} subtitle={t("Live priorities", "当前优先事项")} tag="4" />
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {operationalAlerts.map((a, i) => {
                  const Icon =
                    a.level === "warning"
                      ? AlertTriangle
                      : a.level === "success"
                      ? CircleCheck
                      : a.level === "info"
                      ? Info
                      : Bell;
                  const color =
                    a.level === "warning"
                      ? "#A1372B"
                      : a.level === "success"
                      ? "#1B4332"
                      : "var(--rsn-gold)";
                  return (
                    <div
                      key={i}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "auto 1fr",
                        gap: 12,
                        paddingTop: i === 0 ? 0 : 14,
                        borderTop: i === 0 ? "none" : "1px dashed var(--rsn-border)",
                      }}
                    >
                      <div style={{ paddingTop: 2 }}>
                        <Icon size={14} color={color} strokeWidth={1.6} />
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 13,
                            color: "var(--rsn-text)",
                            marginBottom: 4,
                          }}
                        >
                          {translateAlert(a.title, t)}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "var(--rsn-muted)",
                            lineHeight: 1.5,
                          }}
                        >
                          {translateAlert(a.detail, t)} · {translateRegion(a.region, t)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* shipment route footer */}
          <div
            style={{
              padding: 28,
              background: "var(--rsn-bg-2)",
              borderTop: "1px solid var(--rsn-border)",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
              gap: 36,
              alignItems: "center",
            }}
            className="rsn-route-row"
          >
            <RouteVisualization />
            <div>
              <PanelHeader title={t("Cross-Border Shipments", "跨境在途")} subtitle={t("Active lanes & customs stage", "在用通路与清关节点")} tag={t("11 routes", "11 条通路")} />
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {shipments.slice(0, 4).map((s) => (
                  <div
                    key={s.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr auto",
                      gap: 14,
                      alignItems: "center",
                      padding: "12px 16px",
                      border: "1px solid var(--rsn-border)",
                      borderRadius: 2,
                      background: "var(--rsn-surface)",
                    }}
                  >
                    <span
                      className="rsn-mono"
                      style={{
                        fontSize: 11,
                        color: "var(--rsn-muted)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {s.id}
                    </span>
                    <div>
                      <div style={{ fontSize: 13, color: "var(--rsn-text)" }}>
                        {s.route}
                      </div>
                      <div
                        style={{ fontSize: 11, color: "var(--rsn-muted)", marginTop: 2 }}
                      >
                        ETA {s.expectedDelivery} · {s.customsStage}
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
          </div>
        </div>

        <style>{`
          @media (max-width: 1100px) {
            .rsn-dash-row-1, .rsn-dash-row-2, .rsn-dash-row-3, .rsn-route-row {
              grid-template-columns: 1fr !important;
            }
            .rsn-dash-row-1 > div, .rsn-dash-row-2 > div, .rsn-dash-row-3 > div {
              border-right: none !important;
              border-bottom: 1px solid var(--rsn-border);
            }
            .rsn-metric-strip { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

const ALERT_DICT: Record<string, string> = {
  "AI demand spike — Mobile Accessories": "AI 需求激增 —— 手机配件",
  "Pre-positioning recommended within 72 hours.": "建议 72 小时内完成前置备货。",
  "Customs delay — SHP-9863": "清关延误 —— SHP-9863",
  "Documentation review at Birgunj ICP.": "比尔根杰口岸单据复核中。",
  "New founding member application": "新增创始会员申请",
  "Ascent Wholesale — Delhi NCR.": "Ascent Wholesale —— 德里 NCR。",
  "Route optimisation deployed": "通路优化已上线",
  "Yiwu → Kathmandu lead time −14%.": "义乌至加德满都通路时长缩短 14%。",
};

const REGION_DICT: Record<string, string> = {
  Kathmandu: "加德满都",
  Lalitpur: "拉利特普尔",
  Bhaktapur: "巴克塔普尔",
  Pokhara: "博卡拉",
  Birgunj: "比尔根杰",
  "Delhi NCR": "德里 NCR",
  Chennai: "金奈",
  Kolkata: "加尔各答",
  "Cross-Border": "跨境",
  "South Asia": "南亚",
  Nepal: "尼泊尔",
  "Nepal + Delhi NCR": "尼泊尔 + 德里 NCR",
};

function translateAlert(s: string, t: (en: string, zh: string) => string) {
  return t(s, ALERT_DICT[s] ?? s);
}

function translateRegion(s: string, t: (en: string, zh: string) => string) {
  return t(s, REGION_DICT[s] ?? s);
}

const METRIC_DICT: Record<string, string> = {
  "Monthly Revenue": "月度营收",
  "Gross Merchandise Value": "GMV(商品交易总额)",
  "Active Members": "活跃会员",
  "Repeat Purchase Rate": "复购率",
  "Stock Accuracy": "库存准确率",
  "On-Time Delivery": "准时交付率",
  "Quote Conversion": "报价转化率",
  "Supplier Reliability": "供应商可靠度",
};

function MetricCell({
  m,
  borderRight,
}: {
  m: { label: string; value: string; delta: string; positive: boolean };
  borderRight: boolean;
}) {
  const t = useT();
  return (
    <div
      style={{
        padding: "22px 24px",
        borderRight: borderRight ? "1px solid var(--rsn-border)" : "none",
      }}
    >
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--rsn-muted)",
          marginBottom: 12,
        }}
      >
        {t(m.label, METRIC_DICT[m.label] ?? m.label)}
      </div>
      <div
        className="rsn-serif rsn-tabular"
        style={{ fontSize: 30, lineHeight: 1, marginBottom: 8 }}
      >
        {m.value}
      </div>
      <div
        className="rsn-mono"
        style={{
          fontSize: 11,
          color: m.positive ? "#1B4332" : "#A1372B",
          letterSpacing: "0.04em",
        }}
      >
        {m.delta}
      </div>
    </div>
  );
}

function PanelHeader({
  title,
  subtitle,
  tag,
}: {
  title: string;
  subtitle: string;
  tag?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 22,
      }}
    >
      <div>
        <div style={{ fontSize: 14, color: "var(--rsn-text)", marginBottom: 4 }}>
          {title}
        </div>
        <div
          style={{
            fontSize: 11,
            color: "var(--rsn-muted)",
            letterSpacing: "0.06em",
          }}
        >
          {subtitle}
        </div>
      </div>
      {tag && <span className="rsn-chip">{tag}</span>}
    </div>
  );
}

/** Simplified route diagram — China origins → Nepal/India destinations */
function RouteVisualization() {
  const origins = [
    { x: 60, y: 60, label: "Guangzhou" },
    { x: 60, y: 120, label: "Shenzhen" },
    { x: 60, y: 180, label: "Yiwu" },
  ];
  const dests = [
    { x: 360, y: 50, label: "Kathmandu" },
    { x: 360, y: 100, label: "Pokhara" },
    { x: 360, y: 150, label: "Birgunj" },
    { x: 360, y: 200, label: "Delhi NCR" },
  ];

  return (
    <div
      style={{
        border: "1px solid var(--rsn-border)",
        borderRadius: 2,
        padding: 18,
        background: "var(--rsn-surface)",
      }}
    >
      <div
        className="rsn-mono"
        style={{
          fontSize: 11,
          color: "var(--rsn-gold)",
          letterSpacing: "0.18em",
          marginBottom: 14,
        }}
      >
        ROUTE TOPOLOGY
      </div>
      <svg viewBox="0 0 420 240" width="100%" height="auto">
        <defs>
          <linearGradient id="rsn-route" x1="0" x2="1">
            <stop offset="0%" stopColor="#8A6B2E" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#8A6B2E" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8A6B2E" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {origins.map((o) =>
          dests.map((d) => (
            <path
              key={`${o.label}-${d.label}`}
              d={`M ${o.x} ${o.y} C ${(o.x + d.x) / 2} ${o.y}, ${
                (o.x + d.x) / 2
              } ${d.y}, ${d.x} ${d.y}`}
              stroke="url(#rsn-route)"
              strokeWidth="0.8"
              fill="none"
              opacity="0.7"
            />
          ))
        )}
        {origins.map((o) => (
          <g key={o.label}>
            <circle cx={o.x} cy={o.y} r="4" fill="#8A6B2E" />
            <circle cx={o.x} cy={o.y} r="9" fill="none" stroke="#8A6B2E" strokeOpacity="0.3" />
            <text
              x={o.x - 12}
              y={o.y + 3}
              fontSize="10"
              fill="#4A4A4A"
              textAnchor="end"
              fontFamily="ui-monospace, monospace"
            >
              {o.label}
            </text>
          </g>
        ))}
        {dests.map((d) => (
          <g key={d.label}>
            <circle cx={d.x} cy={d.y} r="4" fill="#1B4332" />
            <circle cx={d.x} cy={d.y} r="9" fill="none" stroke="#1B4332" strokeOpacity="0.3" />
            <text
              x={d.x + 12}
              y={d.y + 3}
              fontSize="10"
              fill="#4A4A4A"
              fontFamily="ui-monospace, monospace"
            >
              {d.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
