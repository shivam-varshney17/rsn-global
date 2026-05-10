"use client";

import { SectionHeader } from "./SectionHeader";
import { useT } from "@/lib/lang";

export function ArchitectureSection() {
  const t = useT();
  const layers = [
    {
      layer: t("China Sourcing Layer", "中国供应链层"),
      nodes: [
        t("Supplier Portal", "供应商门户"),
        t("MOQ Aggregation", "起订量整合"),
        t("Quote Engine", "报价引擎"),
        t("Quality Control", "质量把控"),
      ],
      note: t("Guangzhou · Shenzhen · Yiwu", "广州 · 深圳 · 义乌"),
    },
    {
      layer: t("RSN Platform Core", "RSN 平台核心"),
      nodes: [
        t("Inventory", "库存"),
        t("Logistics", "物流"),
        t("Membership", "会员"),
        t("AI Intelligence", "AI 智能"),
      ],
      note: t("Operating system of the institution", "机构级的运营操作系统"),
    },
    {
      layer: t("South Asia Buyers", "南亚买家网络"),
      nodes: [
        t("Retailers", "零售商"),
        t("TikTok Sellers", "TikTok 卖家"),
        t("Daraz Sellers", "Daraz 卖家"),
        t("Bulk Buyers", "大宗买家"),
      ],
      note: t("Nepal pilot · India expansion", "尼泊尔首发 · 印度拓展"),
    },
  ];

  return (
    <section className="rsn-section" id="platform">
      <div className="rsn-shell">
        <SectionHeader
          eyebrow={t("Platform Architecture", "平台架构")}
          title={
            <>
              {t("An operating stack —", "这是一套运营体系 ——")}
              <br />
              <em style={{ color: "var(--rsn-gold)", fontStyle: "italic" }}>
                {t("not a marketplace.", "并非另一个交易平台。")}
              </em>
            </>
          }
          description={t(
            "Every layer is owned, governed, and instrumented. Sourcing authority feeds the platform core, which serves a controlled buyer network — under one operational standard.",
            "每一层都由 RSN 自有、自管、并具备数据可视。中国供应链权威支撑平台核心,平台核心服务受控的买家网络,所有节点遵循统一运营标准。"
          )}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {layers.map((layer, idx) => (
            <div key={layer.layer} style={{ position: "relative" }}>
              {idx < layers.length - 1 && (
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "100%",
                    width: 1,
                    height: 20,
                    background: "var(--rsn-border-2)",
                  }}
                />
              )}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "260px 1fr",
                  gap: 24,
                  alignItems: "stretch",
                  border: "1px solid var(--rsn-border)",
                  borderRadius: 4,
                  background: "var(--rsn-surface)",
                  overflow: "hidden",
                }}
                className="rsn-arch-row"
              >
                <div
                  style={{
                    padding: "28px",
                    borderRight: "1px solid var(--rsn-border)",
                    background: "var(--rsn-bg-2)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      className="rsn-mono"
                      style={{
                        fontSize: 11,
                        color: "var(--rsn-gold)",
                        letterSpacing: "0.18em",
                        marginBottom: 14,
                      }}
                    >
                      L{idx + 1} //
                    </div>
                    <h3
                      className="rsn-serif"
                      style={{
                        fontSize: 24,
                        lineHeight: 1.1,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {layer.layer}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--rsn-muted)",
                      marginTop: 28,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {layer.note}
                  </p>
                </div>

                <div
                  style={{
                    padding: "28px",
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 14,
                  }}
                  className="rsn-arch-nodes"
                >
                  {layer.nodes.map((node, ni) => (
                    <div
                      key={node}
                      style={{
                        border: "1px solid var(--rsn-border-2)",
                        background: "var(--rsn-bg)",
                        padding: "20px 18px",
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                        position: "relative",
                        transition: "border-color 0.3s ease, background 0.3s ease",
                      }}
                      className="rsn-arch-node"
                    >
                      <div
                        className="rsn-mono"
                        style={{
                          fontSize: 10,
                          color: "var(--rsn-muted)",
                          letterSpacing: "0.18em",
                        }}
                      >
                        ·{String(ni + 1).padStart(2, "0")}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          color: "var(--rsn-text)",
                          letterSpacing: "-0.005em",
                        }}
                      >
                        {node}
                      </div>
                      <div
                        style={{
                          width: 24,
                          height: 1,
                          background: "var(--rsn-gold)",
                          opacity: 0.5,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .rsn-arch-node:hover { border-color: rgba(201,168,97,0.4) !important; background: var(--rsn-surface-2) !important; }
        @media (max-width: 880px) {
          .rsn-arch-row { grid-template-columns: 1fr !important; }
          .rsn-arch-row > div:first-child { border-right: none !important; border-bottom: 1px solid var(--rsn-border); }
          .rsn-arch-nodes { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
