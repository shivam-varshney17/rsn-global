"use client";

import { Headphones, FileBadge, Building2 } from "lucide-react";
import { currentMember } from "@/data/portal";
import { useT } from "@/lib/lang";
import { CITY, MEMBER_TIER, tr, translateCityPair } from "@/lib/translations";

const TIER_ZH: Record<string, string> = MEMBER_TIER;

export function AccountView() {
  const t = useT();
  const credit = (currentMember.creditUsed / currentMember.creditLine) * 100;
  const tierZh = TIER_ZH[currentMember.tier] ?? currentMember.tier;
  return (
    <div className="portal-page-pad" style={{ padding: "32px", maxWidth: 1080, margin: "0 auto" }}>
      <header style={{ marginBottom: 28 }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--rsn-muted)",
            marginBottom: 8,
          }}
        >
          {t("Account · Member Profile", "账户 · 会员档案")}
        </div>
        <h1
          className="rsn-serif"
          style={{
            fontSize: 32,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            fontWeight: 300,
          }}
        >
          {currentMember.name},{" "}
          <em style={{ color: "var(--rsn-gold)", fontStyle: "italic" }}>
            {t(`${currentMember.tier} Member.`, `${tierZh} 会员。`)}
          </em>
        </h1>
      </header>

      {/* identity card */}
      <div
        className="acc-identity"
        style={{
          border: "1px solid var(--rsn-border)",
          background: "var(--rsn-surface)",
          borderRadius: 4,
          padding: 26,
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          gap: 28,
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 4,
            background: "linear-gradient(135deg, #d8c896, #8A6B2E)",
            display: "grid",
            placeItems: "center",
            color: "#0A0A0A",
            fontSize: 22,
            fontFamily: "Helvetica Neue",
            letterSpacing: "0.02em",
          }}
        >
          PT
        </div>
        <div>
          <div style={{ fontSize: 18, color: "var(--rsn-text)" }}>
            {currentMember.name}
          </div>
          <div
            className="rsn-mono"
            style={{
              fontSize: 11,
              color: "var(--rsn-muted)",
              marginTop: 4,
              letterSpacing: "0.06em",
            }}
          >
            {currentMember.id} · {t("Joined", "入会日期")} {currentMember.joinedDate} ·{" "}
            {translateCityPair(currentMember.city, t)}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "var(--rsn-text-2)",
              marginTop: 8,
            }}
          >
            {t("Contact", "联系人")}: {currentMember.contact}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <span className="rsn-chip rsn-chip-gold">{t(currentMember.tier, tierZh)}</span>
          <span className="rsn-chip rsn-chip-emerald">{t("Active", "运营中")}</span>
        </div>
      </div>

      {/* metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1,
          background: "var(--rsn-border)",
          border: "1px solid var(--rsn-border)",
          borderRadius: 4,
          marginBottom: 24,
          overflow: "hidden",
        }}
        className="acc-metrics"
      >
        {[
          { k: t("YTD Spend", "年初至今支出"), v: `$${currentMember.ytdSpend.toLocaleString("en-US")}` },
          { k: t("Open Orders", "进行中订单"), v: currentMember.openOrders.toString() },
          { k: t("Active Shipments", "在途货物"), v: currentMember.activeShipments.toString() },
          { k: t("Account Owner", "客户经理"), v: currentMember.accountOwner },
        ].map((m) => (
          <div
            key={m.k}
            style={{
              background: "var(--rsn-surface)",
              padding: "20px 22px",
            }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--rsn-muted)",
                marginBottom: 10,
              }}
            >
              {m.k}
            </div>
            <div
              className="rsn-serif rsn-tabular"
              style={{ fontSize: 24, lineHeight: 1, fontWeight: 300 }}
            >
              {m.v}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 18,
        }}
        className="acc-cards"
      >
        {/* credit line card */}
        <article
          style={{
            border: "1px solid var(--rsn-border)",
            background: "var(--rsn-surface)",
            borderRadius: 4,
            padding: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 18,
            }}
          >
            <FileBadge size={14} color="var(--rsn-gold)" strokeWidth={1.5} />
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--rsn-gold)",
              }}
            >
              {t("Credit Line", "授信额度")}
            </span>
          </div>
          <div style={{ fontSize: 11, color: "var(--rsn-muted)", marginBottom: 6 }}>
            {t("Used", "已使用")}
          </div>
          <div
            className="rsn-serif rsn-tabular"
            style={{ fontSize: 32, fontWeight: 300, lineHeight: 1, marginBottom: 6 }}
          >
            ${currentMember.creditUsed.toLocaleString("en-US")}
          </div>
          <div className="rsn-tabular" style={{ fontSize: 12, color: "var(--rsn-muted)", marginBottom: 18 }}>
            {t(
              `of $${currentMember.creditLine.toLocaleString("en-US")} approved`,
              `已核准额度 $${currentMember.creditLine.toLocaleString("en-US")}`
            )}
          </div>
          <div
            style={{
              height: 4,
              background: "var(--rsn-bg-2)",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${credit}%`,
                height: "100%",
                background: "linear-gradient(90deg, var(--rsn-gold), var(--rsn-emerald))",
              }}
            />
          </div>
          <div
            style={{
              marginTop: 8,
              fontSize: 11,
              color: "var(--rsn-muted)",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{t(`${credit.toFixed(0)}% used`, `已使用 ${credit.toFixed(0)}%`)}</span>
            <span>{t("Reset · 2026-12-31", "重置 · 2026-12-31")}</span>
          </div>
        </article>

        {/* concierge card */}
        <article
          style={{
            border: "1px solid var(--rsn-border)",
            background: "var(--rsn-surface)",
            borderRadius: 4,
            padding: 24,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 18,
            }}
          >
            <Headphones size={14} color="var(--rsn-gold)" strokeWidth={1.5} />
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--rsn-gold)",
              }}
            >
              {t("Concierge", "专属服务")}
            </span>
          </div>
          <div style={{ fontSize: 13, color: "var(--rsn-text-2)", lineHeight: 1.6, marginBottom: 14 }}>
            {t(
              "Direct line to your account owner and the operations desk for sourcing, allocation, and customs queries.",
              "直接对接客户经理与运营台,处理采购、分货与清关相关事项。"
            )}
          </div>
          <div
            style={{
              padding: "12px 14px",
              border: "1px dashed var(--rsn-border)",
              borderRadius: 2,
              background: "var(--rsn-bg)",
              fontSize: 12,
              color: "var(--rsn-text)",
              marginBottom: 14,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--rsn-muted)" }}>{t("Owner", "客户经理")}</span>
              <span>{currentMember.accountOwner}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ color: "var(--rsn-muted)" }}>{t("Channel", "频道")}</span>
              <span className="rsn-mono" style={{ fontSize: 11 }}>
                {currentMember.conciergeChannel}
              </span>
            </div>
          </div>
          <button className="rsn-btn rsn-btn-ghost" style={{ marginTop: "auto" }}>
            {t("Open Concierge", "打开专属服务")}
          </button>
        </article>
      </div>

      <div style={{ marginTop: 18 }}>
        <article
          style={{
            border: "1px solid var(--rsn-border)",
            background: "var(--rsn-surface)",
            borderRadius: 4,
            padding: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <Building2 size={14} color="var(--rsn-gold)" strokeWidth={1.5} />
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--rsn-gold)",
              }}
            >
              {t("Business Profile", "企业档案")}
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 18,
            }}
          >
            {[
              {
                k: t("Channels", "渠道"),
                v: t("Daraz · Storefronts · TikTok", "Daraz · 实体店 · TikTok"),
              },
              {
                k: t("Markets", "市场"),
                v: t("Kathmandu Valley · Pokhara", "加德满都谷地 · 博卡拉"),
              },
              {
                k: t("Categories", "品类"),
                v: t("Mobile · Home · Beauty", "手机配件 · 家居 · 美妆"),
              },
              {
                k: t("Procurement Cycle", "采购周期"),
                v: t("Bi-weekly", "每两周"),
              },
              {
                k: t("Avg Order Size", "平均订单金额"),
                v: "$24.6K",
              },
              {
                k: t("Renewal", "续期日期"),
                v: "2026-11-04",
              },
            ].map((m) => (
              <div key={m.k}>
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--rsn-muted)",
                    marginBottom: 4,
                  }}
                >
                  {m.k}
                </div>
                <div style={{ fontSize: 13, color: "var(--rsn-text)" }}>{m.v}</div>
              </div>
            ))}
          </div>
        </article>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .acc-metrics { grid-template-columns: repeat(2, 1fr) !important; }
          .acc-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
