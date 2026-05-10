"use client";

import { Anchor, GitBranch, Lock, Sparkles } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { useT } from "@/lib/lang";

const ICONS = [Anchor, GitBranch, Lock, Sparkles];

export function PillarsSection() {
  const t = useT();
  const pillars = [
    {
      title: t("China Sourcing Authority", "中国供应链权威"),
      description: t(
        "Curated supplier access in Guangzhou, Shenzhen, and Yiwu. MOQ aggregation, quote engineering, and quality control before product enters our network.",
        "在广州、深圳、义乌建立筛选过的供应商资源。从起订量整合、报价工程到出厂前质量把控,全部由 RSN 操盘后再进入网络。"
      ),
    },
    {
      title: t("Cross-Border Logistics", "跨境物流基础设施"),
      description: t(
        "Owned cross-border lanes, customs sequencing, and warehouse coordination across Nepal entry points and India interchange hubs.",
        "自有跨境通路、自营清关节奏,以及尼泊尔口岸与印度中转仓的统一调度。"
      ),
    },
    {
      title: t("Members-Only Wholesale", "会员制批发"),
      description: t(
        "Tiered membership with controlled catalog access, governed pricing, credit lines, and operations-led account management.",
        "分级会员体系,提供受控的商品访问、统一定价、专属信用额度,以及由运营牵头的客户管理。"
      ),
    },
    {
      title: t("AI Operations Layer", "AI 智能运营层"),
      description: t(
        "Demand forecasting, supplier risk scoring, replenishment intelligence, and fulfilment routing — embedded across the operating stack.",
        "需求预测、供应商风险评分、智能补货与履约调度等能力嵌入整个运营体系。"
      ),
    },
  ];

  return (
    <section className="rsn-section">
      <div className="rsn-shell">
        <SectionHeader
          eyebrow={t("Positioning", "战略定位")}
          title={
            <>
              {t("Four operating disciplines.", "四个运营支柱,")}
              <br />
              <em style={{ color: "var(--rsn-gold)", fontStyle: "italic" }}>
                {t("One institutional layer.", "一套机构级体系。")}
              </em>
            </>
          }
          description={t(
            "RSN Club is built on owned sourcing authority, controlled cross-border logistics, governed wholesale access, and an AI operations layer — engineered to operate as one institution rather than four disconnected services.",
            "RSN Club 建立在自有的供应链权威、可控的跨境物流、受治理的批发渠道与 AI 运营层之上 —— 作为一家完整机构运作,而非四项相互割裂的服务。"
          )}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 1,
            background: "var(--rsn-border)",
            border: "1px solid var(--rsn-border)",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          {pillars.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <article
                key={p.title}
                style={{
                  background: "var(--rsn-bg)",
                  padding: "36px 32px 40px",
                  position: "relative",
                  transition: "background 0.3s ease",
                  cursor: "default",
                }}
                className="rsn-pillar"
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    border: "1px solid var(--rsn-border-2)",
                    borderRadius: 2,
                    display: "grid",
                    placeItems: "center",
                    color: "var(--rsn-gold)",
                    marginBottom: 32,
                  }}
                >
                  <Icon size={16} strokeWidth={1.4} />
                </div>
                <div
                  className="rsn-mono"
                  style={{
                    fontSize: 11,
                    color: "var(--rsn-muted)",
                    marginBottom: 14,
                    letterSpacing: "0.16em",
                  }}
                >
                  0{i + 1} —
                </div>
                <h3
                  className="rsn-serif"
                  style={{
                    fontSize: 26,
                    lineHeight: 1.15,
                    marginBottom: 16,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--rsn-text-2)",
                  }}
                >
                  {p.description}
                </p>
              </article>
            );
          })}
        </div>

        <style>{`.rsn-pillar:hover { background: var(--rsn-surface) !important; }`}</style>
      </div>
    </section>
  );
}
