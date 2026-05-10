"use client";

import { X, ArrowUpRight, Lock } from "lucide-react";
import { useEffect, useState } from "react";

export function ApplyModal({
  open,
  onClose,
  variant = "membership",
}: {
  open: boolean;
  onClose: () => void;
  variant?: "membership" | "founding";
}) {
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
                {isFounding ? "FOUNDING MEMBERSHIP" : "MEMBERSHIP APPLICATION"}
              </div>
              <h3
                className="rsn-serif"
                style={{
                  fontSize: 28,
                  lineHeight: 1.1,
                  letterSpacing: "-0.012em",
                }}
              >
                {isFounding ? "Founding access enquiry." : "Begin your application."}
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
                Membership is reviewed by RSN Operations within five business days.
                Submitting this form does not constitute admission.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div>
                  <label className="rsn-label">Full Name</label>
                  <input className="rsn-input" required placeholder="Your name" />
                </div>
                <div>
                  <label className="rsn-label">Business Name</label>
                  <input className="rsn-input" required placeholder="Registered entity" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label className="rsn-label">City</label>
                    <input className="rsn-input" required placeholder="Kathmandu" />
                  </div>
                  <div>
                    <label className="rsn-label">Buyer Type</label>
                    <select className="rsn-input" required defaultValue="">
                      <option value="" disabled>Select</option>
                      <option>Retailer</option>
                      <option>TikTok Seller</option>
                      <option>Daraz Seller</option>
                      <option>Bulk Buyer</option>
                      <option>Regional Wholesaler</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="rsn-label">Estimated Monthly Procurement (USD)</label>
                  <input className="rsn-input" required placeholder="e.g. 25,000" />
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
                  <span>Confidential. Reviewed only by RSN Operations.</span>
                </div>

                <button
                  type="submit"
                  className="rsn-btn rsn-btn-primary"
                  style={{ marginTop: 12 }}
                >
                  Submit for Review <ArrowUpRight size={14} />
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
                Submission received.
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
                Operations will respond within five business days. Please monitor
                the email associated with your business registration.
              </p>
              <button className="rsn-btn rsn-btn-ghost" onClick={onClose}>
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
