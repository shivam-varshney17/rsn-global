"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { portalQuotes, type PortalQuote } from "@/data/portal";
import { useT } from "@/lib/lang";

const QUOTE_STATUS: Record<string, string> = {
  Open: "待处理",
  Quoting: "报价中",
  "Quote Ready": "报价已就绪",
  Accepted: "已接受",
  Declined: "已拒绝",
};

const CATEGORY_ZH: Record<string, string> = {
  "Mobile Accessories": "手机配件",
  "Electronics Accessories": "电子配件",
  "Beauty Tools": "美妆工具",
  "Home Utility": "家居日用",
  "Fashion Basics": "服饰基础款",
  "Small Appliances": "小家电",
  "Packaging Supplies": "包装耗材",
};

export function QuotesView() {
  const t = useT();
  const [quotes, setQuotes] = useState<PortalQuote[]>(portalQuotes);
  const [open, setOpen] = useState(false);

  return (
    <div className="portal-page-pad" style={{ padding: "32px" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 28,
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--rsn-muted)",
              marginBottom: 8,
            }}
          >
            {t("Quotes · Custom Sourcing", "询价 · 定制采购")}
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
            {t("Off-catalog requests, tracked", "目录之外的需求,")}{" "}
            <em style={{ color: "var(--rsn-gold)", fontStyle: "italic" }}>
              {t("under member governance.", "在会员治理下被追踪。")}
            </em>
          </h1>
        </div>
        <button
          className="rsn-btn rsn-btn-primary"
          onClick={() => setOpen(true)}
        >
          <Plus size={14} /> {t("New Quote Request", "新建询价请求")}
        </button>
      </header>

      <div
        style={{
          border: "1px solid var(--rsn-border)",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <table className="rsn-table portal-quote-table">
          <thead>
            <tr>
              <th>{t("Quote", "询价单")}</th>
              <th>{t("Category", "品类")}</th>
              <th>{t("Description", "描述")}</th>
              <th>{t("Target Qty", "目标数量")}</th>
              <th>{t("Status", "状态")}</th>
              <th>{t("Quoted", "报价")}</th>
            </tr>
          </thead>
          <tbody className="rsn-tabular">
            {quotes.map((q) => (
              <tr key={q.id}>
                <td
                  className="rsn-mono"
                  style={{ color: "var(--rsn-gold)" }}
                  data-label={t("Quote", "询价单")}
                >
                  {q.id}
                </td>
                <td data-label={t("Category", "品类")}>
                  {t(q.category, CATEGORY_ZH[q.category] ?? q.category)}
                </td>
                <td
                  style={{ maxWidth: 360, color: "var(--rsn-text-2)" }}
                  data-label={t("Description", "描述")}
                >
                  {q.description}
                </td>
                <td data-label={t("Target Qty", "目标数量")}>
                  {q.targetQty.toLocaleString("en-US")}
                </td>
                <td data-label={t("Status", "状态")}>
                  <span
                    className={`rsn-chip ${
                      q.status === "Quote Ready"
                        ? "rsn-chip-emerald"
                        : q.status === "Open"
                        ? ""
                        : "rsn-chip-gold"
                    }`}
                  >
                    {t(q.status, QUOTE_STATUS[q.status] ?? q.status)}
                  </span>
                </td>
                <td data-label={t("Quoted", "报价")}>
                  {q.quotedPrice ? (
                    <div>
                      <div style={{ color: "var(--rsn-text)" }}>
                        ${q.quotedPrice.toFixed(2)}
                      </div>
                      <div
                        style={{ fontSize: 11, color: "var(--rsn-muted)" }}
                      >
                        {t(`${q.quotedLeadDays}d lead`, `交期 ${q.quotedLeadDays} 天`)} · {q.recommendedSupplier}
                      </div>
                    </div>
                  ) : (
                    <span style={{ color: "var(--rsn-muted)" }}>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <NewQuoteModal
          onClose={() => setOpen(false)}
          onCreate={(q) => {
            setQuotes((prev) => [q, ...prev]);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}

function NewQuoteModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (q: PortalQuote) => void;
}) {
  const [category, setCategory] = useState("Electronics Accessories");
  const [description, setDescription] = useState("");
  const [qty, setQty] = useState(1000);
  const [lead, setLead] = useState("Within 28 days");

  return (
    <>
      <div className="rsn-overlay" onClick={onClose} />
      <div className="rsn-modal">
        <div className="rsn-modal-card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 22,
            }}
          >
            <div>
              <div
                className="rsn-mono"
                style={{
                  fontSize: 11,
                  color: "var(--rsn-gold)",
                  letterSpacing: "0.2em",
                  marginBottom: 8,
                }}
              >
                NEW QUOTE REQUEST
              </div>
              <h3
                className="rsn-serif"
                style={{ fontSize: 26, letterSpacing: "-0.022em", fontWeight: 300 }}
              >
                Request a custom sourcing quote.
              </h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                background: "transparent",
                border: "1px solid var(--rsn-border)",
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

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const q: PortalQuote = {
                id: `Q-${3200 + Math.floor(Math.random() * 100)}`,
                category,
                description: description || "—",
                targetQty: qty,
                desiredLeadTime: lead,
                status: "Open",
                requestedAt: new Date().toISOString().slice(0, 10),
              };
              onCreate(q);
            }}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            <div>
              <label className="rsn-label">Category</label>
              <select
                className="rsn-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Electronics Accessories</option>
                <option>Mobile Accessories</option>
                <option>Beauty Tools</option>
                <option>Home Utility</option>
                <option>Fashion Basics</option>
                <option>Small Appliances</option>
                <option>Packaging Supplies</option>
              </select>
            </div>
            <div>
              <label className="rsn-label">Description / specifications</label>
              <textarea
                className="rsn-input"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Private-label hair brush, neutral packaging, single-color print."
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label className="rsn-label">Target Quantity</label>
                <input
                  className="rsn-input rsn-tabular"
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <label className="rsn-label">Lead Time</label>
                <select
                  className="rsn-input"
                  value={lead}
                  onChange={(e) => setLead(e.target.value)}
                >
                  <option>Within 14 days</option>
                  <option>Within 21 days</option>
                  <option>Within 28 days</option>
                  <option>Within 35 days</option>
                  <option>Flexible</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="rsn-btn rsn-btn-primary"
              style={{ marginTop: 6 }}
            >
              Submit to Operations
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
