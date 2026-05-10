"use client";

import { Headphones, FileBadge, Building2 } from "lucide-react";
import { currentMember } from "@/data/portal";
import { useT } from "@/lib/lang";

const TIER_ZH: Record<string, string> = {
  Founding: "创始",
  Platinum: "铂金",
  Gold: "金",
  Standard: "标准",
};

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
            {currentMember.id} · {t("Joined", "入会日期")} {currentMember.joinedDate} · {currentMember.city}
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
              Credit Line
            </span>
          </div>
          <div style={{ fontSize: 11, color: "var(--rsn-muted)", marginBottom: 6 }}>
            Used
          </div>
          <div
            className="rsn-serif rsn-tabular"
            style={{ fontSize: 32, fontWeight: 300, lineHeight: 1, marginBottom: 6 }}
          >
            ${currentMember.creditUsed.toLocaleString("en-US")}
          </div>
          <div className="rsn-tabular" style={{ fontSize: 12, color: "var(--rsn-muted)", marginBottom: 18 }}>
            of ${currentMember.creditLine.toLocaleString("en-US")} approved
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
            <span>{credit.toFixed(0)}% used</span>
            <span>Reset · 2026-12-31</span>
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
              Concierge
            </span>
          </div>
          <div style={{ fontSize: 13, color: "var(--rsn-text-2)", lineHeight: 1.6, marginBottom: 14 }}>
            Direct line to your account owner and the operations desk for sourcing,
            allocation, and customs queries.
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
              <span style={{ color: "var(--rsn-muted)" }}>Owner</span>
              <span>{currentMember.accountOwner}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ color: "var(--rsn-muted)" }}>Channel</span>
              <span className="rsn-mono" style={{ fontSize: 11 }}>
                {currentMember.conciergeChannel}
              </span>
            </div>
          </div>
          <button className="rsn-btn rsn-btn-ghost" style={{ marginTop: "auto" }}>
            Open Concierge
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
              Business Profile
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
              { k: "Channels", v: "Daraz · Storefronts · TikTok" },
              { k: "Markets", v: "Kathmandu Valley · Pokhara" },
              { k: "Categories", v: "Mobile · Home · Beauty" },
              { k: "Procurement Cycle", v: "Bi-weekly" },
              { k: "Avg Order Size", v: "$24.6K" },
              { k: "Renewal", v: "2026-11-04" },
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
