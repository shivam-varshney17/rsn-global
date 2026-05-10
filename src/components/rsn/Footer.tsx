"use client";

import { useT } from "@/lib/lang";

export function Footer() {
  const t = useT();
  const cols = [
    {
      k: t("Institution", "机构"),
      items: [
        t("China Supply Authority", "中国供应链权威"),
        t("South Asia Digital Distribution", "南亚数字分销网络"),
        t("Members' Wholesale Institution", "会员制批发机构"),
      ],
    },
    {
      k: t("Operations", "运营"),
      items: [
        t("Sourcing", "供应链"),
        t("Logistics", "物流"),
        t("Membership", "会员"),
        t("AI Intelligence", "AI 智能"),
      ],
    },
    {
      k: t("Regions", "区域"),
      items: [
        t("Nepal", "尼泊尔"),
        t("India (Phased)", "印度(分阶段)"),
        t("Cross-Border", "跨境"),
      ],
    },
    {
      k: t("Contact", "联络"),
      items: ["partnerships@rsn.club", "operations@rsn.club"],
    },
  ];

  return (
    <footer
      style={{
        padding: "56px 0 48px",
        borderTop: "1px solid var(--rsn-border)",
        background: "var(--rsn-bg)",
      }}
    >
      <div className="rsn-shell">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 3fr)",
            gap: 36,
            marginBottom: 44,
            paddingBottom: 36,
            borderBottom: "1px solid var(--rsn-border)",
          }}
          className="rsn-footer-grid"
        >
          <div>
            <div className="rsn-logo" style={{ marginBottom: 18 }}>
              <span className="rsn-logo-mark">R</span>
              <span>RSN Club</span>
            </div>
            <p
              style={{
                fontSize: 13,
                color: "var(--rsn-text-2)",
                lineHeight: 1.6,
                maxWidth: 320,
              }}
            >
              {t(
                "The digital growth arm of RSLOG's South Asia Distribution Network. A members-only wholesale institution.",
                "RSLOG 南亚分销网络旗下的数字增长机构,以会员制方式运作的批发平台。"
              )}
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 24,
            }}
            className="rsn-footer-cols"
          >
            {cols.map((c) => (
              <div key={c.k}>
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--rsn-gold)",
                    marginBottom: 14,
                  }}
                >
                  {c.k}
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {c.items.map((it) => (
                    <li
                      key={it}
                      style={{ fontSize: 13, color: "var(--rsn-text-2)" }}
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            color: "var(--rsn-muted)",
            letterSpacing: "0.08em",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span>
            {t(
              "© 2026 RSN Club. Operated by RS Logistics.",
              "© 2026 RSN Club · 由 RS Logistics 运营"
            )}
          </span>
          <span>{t("Members-only · By invitation", "会员制 · 仅限受邀")}</span>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .rsn-footer-grid { grid-template-columns: 1fr !important; }
          .rsn-footer-cols { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </footer>
  );
}
