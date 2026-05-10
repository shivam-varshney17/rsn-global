"use client";

import { ArrowUpRight } from "lucide-react";
import { useT } from "@/lib/lang";

export function CTASection({ onApply }: { onApply: () => void }) {
  const t = useT();
  return (
    <section className="rsn-section" style={{ position: "relative", overflow: "hidden", padding: "140px 0" }}>
      <div
        className="rsn-glow"
        style={{
          width: 700,
          height: 700,
          top: -260,
          right: -240,
          background: "radial-gradient(circle, rgba(181, 139, 58, 0.16), transparent 60%)",
        }}
      />
      <div
        className="rsn-glow"
        style={{
          width: 600,
          height: 600,
          bottom: -240,
          left: -200,
          background: "radial-gradient(circle, rgba(27, 67, 50, 0.10), transparent 60%)",
        }}
      />
      <div className="rsn-shell" style={{ position: "relative" }}>
        <div style={{ maxWidth: 920, margin: "0 auto", textAlign: "center" }}>
          <div className="rsn-eyebrow" style={{ justifyContent: "center" }}>
            {t("Strategic Access", "战略合作通道")}
          </div>
          <h2
            className="rsn-serif"
            style={{
              fontSize: "clamp(40px, 5.4vw, 72px)",
              lineHeight: 1.04,
              letterSpacing: "-0.022em",
              marginTop: 22,
              marginBottom: 28,
            }}
          >
            {t("Nepal-first. India-ready.", "尼泊尔首发,印度蓄势。")}
            <br />
            <em style={{ color: "var(--rsn-gold)", fontStyle: "italic" }}>
              {t(
                "Built for long-term regional scale.",
                "为南亚区域的长期扩张而构建。"
              )}
            </em>
          </h2>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: "var(--rsn-text-2)",
              maxWidth: 680,
              margin: "0 auto 44px",
            }}
          >
            {t(
              "A controlled wholesale institution for buyers, suppliers, and operators who need structure, trust, and execution.",
              "为需要结构、信任与执行力的买家、供应商与运营方,提供受治理的批发机构。"
            )}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="rsn-btn rsn-btn-primary" onClick={onApply}>
              {t("Request Strategic Access", "申请战略合作通道")}{" "}
              <ArrowUpRight size={14} />
            </button>
            <a
              className="rsn-btn rsn-btn-ghost"
              href="mailto:partnerships@rsn.club"
            >
              {t("Speak with Partnerships", "联系合作发展团队")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
