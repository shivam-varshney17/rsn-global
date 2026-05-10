"use client";

import { X, ArrowUpRight, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { useT } from "@/lib/lang";

export function ApplyModal({
  open,
  onClose,
  variant = "membership",
}: {
  open: boolean;
  onClose: () => void;
  variant?: "membership" | "founding";
}) {
  const t = useT();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const isFounding = variant === "founding";

  return (
    <>
      <div className="rsn-overlay" onClick={onClose} />
      <div className="rsn-modal" role="dialog" aria-modal="true">
        <div className="rsn-modal-card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 24,
            }}
          >
            <div>
              <div
                className="rsn-mono"
                style={{
                  fontSize: 11,
                  color: "var(--rsn-gold)",
                  letterSpacing: "0.2em",
                  marginBottom: 10,
                }}
              >
                {isFounding
                  ? t("FOUNDING MEMBERSHIP", "创始会员")
                  : t("MEMBERSHIP APPLICATION", "会员申请")}
              </div>
              <h3
                className="rsn-serif"
                style={{
                  fontSize: 28,
                  lineHeight: 1.1,
                  letterSpacing: "-0.012em",
                }}
              >
                {isFounding
                  ? t("Founding access enquiry.", "创始通道申请。")
                  : t("Begin your application.", "开始会员申请。")}
              </h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                background: "transparent",
                border: "1px solid var(--rsn-border-2)",
                color: "var(--rsn-text-2)",
                width: 34,
                height: 34,
                borderRadius: 2,
                cursor: "pointer",
                display: "grid",
                placeItems: "center",
              }}
            >
              <X size={14} />
            </button>
          </div>

          {!submitted ? (
            <>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--rsn-text-2)",
                  lineHeight: 1.6,
                  marginBottom: 24,
                }}
              >
                {t(
                  "Membership is reviewed by RSN Operations within five business days. Submitting this form does not constitute admission.",
                  "会员资格将由 RSN 运营团队在五个工作日内审核。提交此表单不代表已获录取。"
                )}
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div>
                  <label className="rsn-label">{t("Full Name", "姓名")}</label>
                  <input
                    className="rsn-input"
                    required
                    placeholder={t("Your name", "您的姓名")}
                  />
                </div>
                <div>
                  <label className="rsn-label">{t("Business Name", "企业名称")}</label>
                  <input
                    className="rsn-input"
                    required
                    placeholder={t("Registered entity", "工商注册主体")}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label className="rsn-label">{t("City", "城市")}</label>
                    <input
                      className="rsn-input"
                      required
                      placeholder={t("Kathmandu", "加德满都")}
                    />
                  </div>
                  <div>
                    <label className="rsn-label">{t("Buyer Type", "买家类型")}</label>
                    <select className="rsn-input" required defaultValue="">
                      <option value="" disabled>{t("Select", "请选择")}</option>
                      <option>{t("Retailer", "零售商")}</option>
                      <option>{t("TikTok Seller", "TikTok 卖家")}</option>
                      <option>{t("Daraz Seller", "Daraz 卖家")}</option>
                      <option>{t("Bulk Buyer", "大宗买家")}</option>
                      <option>{t("Regional Wholesaler", "区域批发商")}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="rsn-label">
                    {t("Estimated Monthly Procurement (USD)", "预计月度采购金额(美元)")}
                  </label>
                  <input
                    className="rsn-input"
                    required
                    placeholder={t("e.g. 25,000", "例如 25,000")}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    color: "var(--rsn-muted)",
                    fontSize: 11,
                    marginTop: 4,
                  }}
                >
                  <Lock size={12} />
                  <span>
                    {t(
                      "Confidential. Reviewed only by RSN Operations.",
                      "信息保密,仅由 RSN 运营团队审核。"
                    )}
                  </span>
                </div>

                <button
                  type="submit"
                  className="rsn-btn rsn-btn-primary"
                  style={{ marginTop: 12 }}
                >
                  {t("Submit for Review", "提交审核")} <ArrowUpRight size={14} />
                </button>
              </form>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  margin: "0 auto 18px",
                  border: "1px solid var(--rsn-gold)",
                  background: "var(--rsn-gold-soft)",
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  color: "var(--rsn-gold)",
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: 22,
                }}
              >
                ✓
              </div>
              <h4
                className="rsn-serif"
                style={{ fontSize: 22, marginBottom: 10, letterSpacing: "-0.01em" }}
              >
                {t("Submission received.", "申请已收到。")}
              </h4>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--rsn-text-2)",
                  lineHeight: 1.6,
                  maxWidth: 340,
                  margin: "0 auto 24px",
                }}
              >
                {t(
                  "Operations will respond within five business days. Please monitor the email associated with your business registration.",
                  "运营团队将在五个工作日内回复。请留意您工商注册时所登记的邮箱。"
                )}
              </p>
              <button className="rsn-btn rsn-btn-ghost" onClick={onClose}>
                {t("Close", "关闭")}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
