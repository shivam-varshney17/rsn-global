"use client";

import { SectionHeader } from "./SectionHeader";
import { useT } from "@/lib/lang";

export function TimelineSection() {
  const t = useT();
  const phases = [
    {
      phase: t("Phase 01", "阶段 01"),
      title: t("Strategic Blueprint", "战略蓝图"),
      description: t(
        "Platform architecture, sourcing partnerships, and operating governance defined in collaboration with anchor partners.",
        "与基石合作伙伴共同确定平台架构、供应链合作与运营治理结构。"
      ),
      outcome: t(
        "Foundational design ratified · Supplier mandates secured",
        "基础架构定稿 · 供应链合作达成"
      ),
      status: t("Complete", "已完成"),
      key: "Complete",
    },
    {
      phase: t("Phase 02", "阶段 02"),
      title: t("Nepal Pilot", "尼泊尔试点"),
      description: t(
        "Controlled member cohort, single-region operations, and live AI feedback loop across Kathmandu valley.",
        "可控的会员组群、单区域运营,并在加德满都谷地落地 AI 实时反馈机制。"
      ),
      outcome: t(
        "1,200+ members onboarded · 96.2% on-time delivery",
        "1,200+ 会员入驻 · 96.2% 准时送达"
      ),
      status: t("Active", "进行中"),
      key: "Active",
    },
    {
      phase: t("Phase 03", "阶段 03"),
      title: t("Nepal Scale", "尼泊尔扩张"),
      description: t(
        "Regional DCs across Pokhara, Birgunj, and Biratnagar. Tiered membership at full operating cadence.",
        "在博卡拉、比尔根杰、比拉特讷格尔布局区域配送中心,会员体系全面进入运营节奏。"
      ),
      outcome: t("Target: $60M GMV · 4,000 members", "目标:6,000 万美元 GMV · 4,000 会员"),
      status: t("Planned", "规划中"),
      key: "Planned",
    },
    {
      phase: t("Phase 04", "阶段 04"),
      title: t("India Expansion", "印度市场拓展"),
      description: t(
        "Sequenced entry through Delhi NCR, Chennai, and Kolkata. Cross-border lanes governed under RSN operating standards.",
        "按顺序进入德里 NCR、金奈、加尔各答,跨境通路统一遵循 RSN 运营标准。"
      ),
      outcome: t(
        "Target: $240M GMV · institutional partners",
        "目标:2.4 亿美元 GMV · 机构级合作伙伴"
      ),
      status: t("Planned", "规划中"),
      key: "Planned",
    },
  ];

  return (
    <section className="rsn-section" id="rollout">
      <div className="rsn-shell">
        <SectionHeader
          eyebrow={t("Strategic Rollout", "战略推进路径")}
          title={
            <>
              {t("Calibrated, sequenced,", "经过校准、有序推进,")}
              <br />
              <em style={{ color: "var(--rsn-gold)", fontStyle: "italic" }}>
                {t("not improvised.", "并非临时应对。")}
              </em>
            </>
          }
          description={t(
            "A platform of this scale is engineered in phases. Each phase is a closed operating cycle with measurable outcomes before the next one begins.",
            "这种规模的平台必须分阶段构建。每个阶段都是一个闭环运营周期,在交付可衡量的成果后,再进入下一阶段。"
          )}
        />

        <div style={{ position: "relative", paddingTop: 18 }}>
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 22,
              left: "8%",
              right: "8%",
              height: 1,
              background: "var(--rsn-border)",
            }}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 24,
              position: "relative",
            }}
            className="rsn-timeline-grid"
          >
            {phases.map((p) => (
              <article
                key={p.phase}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: 50,
                  position: "relative",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: 14,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "var(--rsn-bg)",
                    border: `1.5px solid ${
                      p.key === "Complete"
                        ? "#1B4332"
                        : p.key === "Active"
                        ? "var(--rsn-gold)"
                        : "var(--rsn-border-2)"
                    }`,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {p.key === "Active" && (
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        background: "var(--rsn-gold)",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                  {p.key === "Complete" && (
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        background: "#1B4332",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </span>

                <div
                  className="rsn-card"
                  style={{
                    padding: 24,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      className="rsn-mono"
                      style={{
                        fontSize: 11,
                        color: "var(--rsn-muted)",
                        letterSpacing: "0.18em",
                      }}
                    >
                      {p.phase}
                    </span>
                    <span
                      className={`rsn-chip ${
                        p.key === "Complete"
                          ? "rsn-chip-emerald"
                          : p.key === "Active"
                          ? "rsn-chip-gold"
                          : ""
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <h3
                    className="rsn-serif"
                    style={{
                      fontSize: 22,
                      lineHeight: 1.15,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: "var(--rsn-text-2)",
                    }}
                  >
                    {p.description}
                  </p>
                  <div
                    style={{
                      marginTop: "auto",
                      paddingTop: 14,
                      borderTop: "1px dashed var(--rsn-border)",
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
                      {t("Outcome", "成果")}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--rsn-text)" }}>
                      {p.outcome}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 1024px) {
            .rsn-timeline-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 640px) {
            .rsn-timeline-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
