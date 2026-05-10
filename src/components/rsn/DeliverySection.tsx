"use client";

import { Truck } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { useT } from "@/lib/lang";

export function DeliverySection() {
  const t = useT();
  const tiers = [
    {
      tier: t("Same-Day Inventory", "当日履约"),
      promise: t(
        "Order before 11:00 — delivered same business day across the Kathmandu valley.",
        "上午 11 时前下单 —— 当天送达加德满都谷地全境。"
      ),
      requirement: t(
        "Held stock, member-priority allocation, dedicated last-mile lane.",
        "前置库存、会员优先分货、独立末端配送通路。"
      ),
      example: t(
        "TikTok seller restocking a viral SKU before evening sales window.",
        "TikTok 卖家在傍晚直播前完成爆款 SKU 补货。"
      ),
      badge: t("Tier 01", "层级 01"),
      label: t("Live", "已运营"),
    },
    {
      tier: t("Regional Warehouse Layer", "区域仓配层"),
      promise: t(
        "48–72 hour fulfilment to Pokhara, Birgunj, Bhaktapur, and Lalitpur.",
        "48–72 小时内覆盖博卡拉、比尔根杰、巴克塔普尔与拉利特普尔。"
      ),
      requirement: t(
        "Multi-node DC network, replenishment intelligence, route consolidation.",
        "多节点配送中心网络、智能补货、运路整合。"
      ),
      example: t(
        "Regional wholesaler covering three districts in a weekly cycle.",
        "区域批发商以一周为节奏覆盖三个地区。"
      ),
      badge: t("Tier 02", "层级 02"),
      label: t("Scaling", "扩张中"),
    },
    {
      tier: t("China Supply Pipeline", "中国供应通路"),
      promise: t(
        "12–22 day landed delivery from Guangzhou, Shenzhen, and Yiwu.",
        "广州、深圳、义乌 12–22 天到岸交付。"
      ),
      requirement: t(
        "Qualified suppliers, owned customs lanes, pre-cleared documentation.",
        "受认证的供应商、自有清关通路、提前预审单据。"
      ),
      example: t(
        "Bulk buyer placing an MOQ-aggregated container on a fixed sailing.",
        "大宗买家在固定航次上完成起订量整合的整柜下单。"
      ),
      badge: t("Tier 03", "层级 03"),
      label: t("Operational", "运营中"),
    },
  ];

  const metrics = [
    { label: t("Avg Delivery Time", "平均交付时长"), value: "2.4 days" },
    { label: t("Warehouse Accuracy", "仓库准确率"), value: "98.6%" },
    { label: t("Route Reliability", "通路稳定度"), value: "96.2%" },
    { label: t("Order Fill Rate", "订单履约率"), value: "97.8%" },
  ];

  return (
    <section className="rsn-section" id="delivery" style={{ background: "var(--rsn-bg-2)" }}>
      <div className="rsn-shell">
        <SectionHeader
          eyebrow={t("Delivery Infrastructure", "履约基础设施")}
          title={
            <>
              {t("Three tiers, one", "三层架构,")}
              <br />
              <em style={{ color: "var(--rsn-gold)", fontStyle: "italic" }}>
                {t("fulfilment standard.", "同一履约标准。")}
              </em>
            </>
          }
          description={t(
            "Same-day inventory in the Kathmandu valley, regional warehouses across Nepal, and a controlled China supply pipeline — operated under a single fulfilment discipline.",
            "加德满都谷地的当日履约、覆盖尼泊尔的区域仓配,以及可控的中国供应通路 —— 全部在同一履约标准下运营。"
          )}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
            gap: 36,
            alignItems: "start",
          }}
          className="rsn-delivery-grid"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {tiers.map((ti, i) => (
              <article
                key={ti.tier}
                className="rsn-card"
                style={{ padding: 32, position: "relative" }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr auto",
                    gap: 24,
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      border: "1px solid var(--rsn-border-2)",
                      borderRadius: 2,
                      display: "grid",
                      placeItems: "center",
                      color: "var(--rsn-gold)",
                    }}
                  >
                    <Truck size={18} strokeWidth={1.4} />
                  </div>

                  <div>
                    <div
                      className="rsn-mono"
                      style={{
                        fontSize: 11,
                        color: "var(--rsn-muted)",
                        letterSpacing: "0.18em",
                        marginBottom: 10,
                      }}
                    >
                      {ti.badge}
                    </div>
                    <h3
                      className="rsn-serif"
                      style={{
                        fontSize: 26,
                        lineHeight: 1.1,
                        marginBottom: 12,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {ti.tier}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: "var(--rsn-text-2)",
                        marginBottom: 18,
                      }}
                    >
                      {ti.promise}
                    </p>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 24,
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
                          {t("Operational requirement", "运营条件")}
                        </div>
                        <div style={{ fontSize: 13, color: "var(--rsn-text)" }}>
                          {ti.requirement}
                        </div>
                      </div>
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
                          {t("Use case", "适用场景")}
                        </div>
                        <div style={{ fontSize: 13, color: "var(--rsn-text)" }}>
                          {ti.example}
                        </div>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`rsn-chip ${
                      i === 0 ? "rsn-chip-emerald" : i === 1 ? "rsn-chip-gold" : ""
                    }`}
                  >
                    {ti.label}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <aside
            className="rsn-card"
            style={{
              padding: 28,
              position: "sticky",
              top: 96,
              background: "var(--rsn-surface)",
            }}
          >
            <div
              className="rsn-mono"
              style={{
                fontSize: 11,
                color: "var(--rsn-gold)",
                letterSpacing: "0.18em",
                marginBottom: 18,
              }}
            >
              {t("FULFILMENT METRICS", "履约指标")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {metrics.map((m) => (
                <div
                  key={m.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    paddingBottom: 18,
                    borderBottom: "1px dashed var(--rsn-border)",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--rsn-text-2)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {m.label}
                  </span>
                  <span
                    className="rsn-serif rsn-tabular"
                    style={{ fontSize: 22, color: "var(--rsn-text)" }}
                  >
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 24,
                padding: 16,
                border: "1px solid rgba(201,168,97,0.25)",
                background: "var(--rsn-gold-soft)",
                borderRadius: 2,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--rsn-gold)",
                  marginBottom: 8,
                }}
              >
                {t("Operating Standard", "运营标准")}
              </div>
              <div
                style={{ fontSize: 13, color: "var(--rsn-text)", lineHeight: 1.5 }}
              >
                {t(
                  "Members are governed by a single delivery promise across all tiers. Performance is published monthly to the institution.",
                  "所有层级遵循同一交付承诺,履约表现按月对全体会员公开发布。"
                )}
              </div>
            </div>
          </aside>
        </div>
        <style>{`
          @media (max-width: 1024px) {
            .rsn-delivery-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
