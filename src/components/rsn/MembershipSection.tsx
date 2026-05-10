"use client";

import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { useT } from "@/lib/lang";

export function MembershipSection({ onApply }: { onApply: () => void }) {
  const t = useT();
  const steps = [
    {
      step: "01",
      title: t("Application Review", "申请审核"),
      body: t(
        "Operations evaluates business profile, channel mix, and procurement scale. Reviewed within five business days.",
        "运营团队审核企业资质、渠道结构与采购规模。五个工作日内出具结果。"
      ),
    },
    {
      step: "02",
      title: t("Member Verification", "会员资格核验"),
      body: t(
        "Identity, registration, and trade-history verification. Tier eligibility is calibrated against operational fit.",
        "对身份、注册信息与往来贸易记录进行核验,并根据运营契合度匹配会员级别。"
      ),
    },
    {
      step: "03",
      title: t("Access Approval", "权限开通"),
      body: t(
        "Catalog access, credit envelope, and account governance issued. Membership term begins on activation.",
        "开通商品访问权限、授予信用额度并完成账户治理设定,会员期限自激活之日起算。"
      ),
    },
    {
      step: "04",
      title: t("Concierge Activation", "专属服务启动"),
      body: t(
        "Dedicated account owner, onboarding session, and first procurement cycle structured against member targets.",
        "配置专属客户经理,完成入驻沟通,并围绕会员业务目标规划首个采购周期。"
      ),
    },
  ];

  return (
    <section className="rsn-section" id="membership">
      <div className="rsn-shell">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.05fr)",
            gap: 80,
            alignItems: "start",
          }}
          className="rsn-membership-grid"
        >
          <div>
            <SectionHeader
              eyebrow={t("Membership Onboarding", "会员入驻")}
              title={
                <>
                  {t("Admission, not", "邀请准入,")}
                  <br />
                  <em style={{ color: "var(--rsn-gold)", fontStyle: "italic" }}>
                    {t("registration.", "并非公开注册。")}
                  </em>
                </>
              }
              description={t(
                "RSN Club operates as a private institution. Membership is invited, reviewed, and renewed under operational standards. There is no open signup.",
                "RSN Club 以私享机构方式运作。会员资格采用邀请制,经审核录取,按运营标准续期。平台不开放公开注册通道。"
              )}
            />
            <div
              style={{
                marginTop: 24,
                padding: "26px 0",
                borderTop: "1px solid var(--rsn-border)",
                borderBottom: "1px solid var(--rsn-border)",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 24,
              }}
            >
              {[
                {
                  k: t("Tiers", "会员等级"),
                  v: t(
                    "Founding · Platinum · Gold · Standard",
                    "创始 · 铂金 · 金 · 标准"
                  ),
                },
                { k: t("Review", "审核周期"), v: t("5 business days", "5 个工作日") },
                {
                  k: t("Renewal", "续期机制"),
                  v: t("Annual, performance-tied", "按年续期,与运营表现挂钩"),
                },
              ].map((it) => (
                <div key={it.k}>
                  <div
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--rsn-muted)",
                      marginBottom: 8,
                    }}
                  >
                    {it.k}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--rsn-text)" }}>
                    {it.v}
                  </div>
                </div>
              ))}
            </div>
            <button
              className="rsn-btn rsn-btn-ghost"
              onClick={onApply}
              style={{ marginTop: 36 }}
            >
              {t("Begin Application", "开始申请")} <ArrowUpRight size={14} />
            </button>
          </div>

          <ol
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              borderLeft: "1px solid var(--rsn-border)",
            }}
          >
            {steps.map((s, i) => (
              <li
                key={s.step}
                style={{
                  position: "relative",
                  paddingLeft: 36,
                  paddingBottom: i === steps.length - 1 ? 0 : 40,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: -7,
                    top: 4,
                    width: 13,
                    height: 13,
                    borderRadius: "50%",
                    background: "var(--rsn-bg)",
                    border: "1px solid var(--rsn-gold)",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      background: "var(--rsn-gold)",
                      borderRadius: "50%",
                    }}
                  />
                </span>
                <div
                  className="rsn-mono"
                  style={{
                    fontSize: 11,
                    color: "var(--rsn-gold)",
                    letterSpacing: "0.18em",
                    marginBottom: 8,
                  }}
                >
                  {t("STEP", "步骤")} {s.step}
                </div>
                <h3
                  className="rsn-serif"
                  style={{
                    fontSize: 24,
                    lineHeight: 1.15,
                    marginBottom: 10,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--rsn-text-2)",
                    maxWidth: 460,
                  }}
                >
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
        <style>{`
          @media (max-width: 1024px) {
            .rsn-membership-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
