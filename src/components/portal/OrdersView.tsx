"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { portalOrders, portalProducts } from "@/data/portal";
import { useT } from "@/lib/lang";

const STATUS_DICT: Record<string, string> = {
  Draft: "草稿",
  Submitted: "已提交",
  Allocated: "已分货",
  Production: "生产中",
  Dispatched: "已发运",
  "In Transit": "在途",
  Delivered: "已送达",
  Reconciled: "已对账",
  Confirmed: "已确认",
  Booked: "已预订",
  "At Customs": "清关中",
  Cleared: "已清关",
  "Out for Delivery": "派送中",
  "On Hold": "暂缓",
  "Quote Ready": "报价已就绪",
  Quoting: "报价中",
  Open: "待处理",
  Accepted: "已接受",
  Declined: "已拒绝",
  Active: "运营中",
};

export function OrdersView() {
  const t = useT();
  const [expanded, setExpanded] = useState<string | null>(portalOrders[0]?.id ?? null);

  return (
    <div className="portal-page-pad" style={{ padding: "32px" }}>
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
          {t("Orders · Live fulfilment", "订单 · 实时履约")}
        </div>
        <h1
          className="rsn-serif"
          style={{
            fontSize: 36,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            fontWeight: 300,
          }}
        >
          {t("Active and historical", "进行中与历史")}{" "}
          <em style={{ color: "var(--rsn-gold)", fontStyle: "italic" }}>
            {t("procurement.", "采购订单。")}
          </em>
        </h1>
      </header>

      <div
        style={{
          border: "1px solid var(--rsn-border)",
          borderRadius: 4,
          background: "var(--rsn-surface)",
        }}
      >
        {portalOrders.map((o, i) => {
          const open = expanded === o.id;
          return (
            <article
              key={o.id}
              style={{
                borderBottom:
                  i === portalOrders.length - 1
                    ? "none"
                    : "1px solid var(--rsn-border)",
              }}
            >
              <button
                onClick={() => setExpanded(open ? null : o.id)}
                className="portal-order-row"
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto auto auto auto",
                  gap: 24,
                  padding: "16px 22px",
                  alignItems: "center",
                  background: open ? "var(--rsn-bg-2)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  textAlign: "left",
                }}
              >
                <ChevronRight
                  size={14}
                  className="order-chevron"
                  style={{
                    transform: open ? "rotate(90deg)" : "rotate(0)",
                    transition: "transform 0.2s ease",
                    color: "var(--rsn-muted)",
                  }}
                />
                <div className="order-id">
                  <div
                    className="rsn-mono"
                    style={{
                      fontSize: 12,
                      color: "var(--rsn-gold)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {o.id}
                  </div>
                  <div className="order-meta" style={{ fontSize: 11, color: "var(--rsn-muted)", marginTop: 2 }}>
                    <span>{o.date}</span>
                    <span>·</span>
                    <span>{t(`${o.lines.length} line${o.lines.length === 1 ? "" : "s"}`, `${o.lines.length} 项`)}</span>
                    <span>·</span>
                    <span>{o.fulfillment}</span>
                    <span className="order-meta-mobile-only">·</span>
                    <span className="order-meta-mobile-only">{t("ETA", "预计")} {o.eta}</span>
                    <span className="order-meta-mobile-only">·</span>
                    <span className="order-meta-mobile-only">{o.payment}</span>
                  </div>
                </div>
                <span
                  className="rsn-tabular order-meta-eta"
                  style={{ fontSize: 13, color: "var(--rsn-text-2)" }}
                >
                  {t("ETA", "预计")} {o.eta}
                </span>
                <span
                  className="rsn-mono order-meta-pay"
                  style={{ fontSize: 11, color: "var(--rsn-muted)" }}
                >
                  {o.payment}
                </span>
                <span
                  className={`rsn-chip order-chip ${
                    o.status === "Delivered" || o.status === "Reconciled"
                      ? "rsn-chip-emerald"
                      : "rsn-chip-gold"
                  }`}
                >
                  {t(o.status, STATUS_DICT[o.status] ?? o.status)}
                </span>
                <span
                  className="rsn-tabular order-value"
                  style={{ fontSize: 16, color: "var(--rsn-text)", minWidth: 90, textAlign: "right" }}
                >
                  ${o.total.toLocaleString("en-US")}
                </span>
              </button>

              {open && (
                <div style={{ padding: "0 22px 22px 50px", display: "flex", flexDirection: "column", gap: 18 }}>
                  {/* lines */}
                  <div
                    style={{
                      border: "1px solid var(--rsn-border)",
                      borderRadius: 2,
                    }}
                  >
                    {o.lines.map((l, j) => {
                      const p = portalProducts.find((p) => p.sku === l.sku);
                      return (
                        <div
                          key={l.sku}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr auto auto auto",
                            gap: 24,
                            padding: "12px 16px",
                            alignItems: "center",
                            borderBottom:
                              j === o.lines.length - 1
                                ? "none"
                                : "1px dashed var(--rsn-border)",
                            fontSize: 13,
                          }}
                        >
                          <div>
                            <span
                              className="rsn-mono"
                              style={{ fontSize: 11, color: "var(--rsn-muted)" }}
                            >
                              {l.sku}
                            </span>
                            <span style={{ marginLeft: 10, color: "var(--rsn-text)" }}>
                              {p?.name ?? l.sku}
                            </span>
                          </div>
                          <span
                            className="rsn-tabular"
                            style={{ color: "var(--rsn-muted)" }}
                          >
                            {l.qty.toLocaleString("en-US")}{t(" units", " 件")}
                          </span>
                          <span
                            className="rsn-tabular"
                            style={{ color: "var(--rsn-muted)" }}
                          >
                            ${l.unitPrice.toFixed(2)}
                          </span>
                          <span
                            className="rsn-tabular"
                            style={{ color: "var(--rsn-text)", minWidth: 80, textAlign: "right" }}
                          >
                            ${(l.qty * l.unitPrice).toLocaleString("en-US")}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* breakdown */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: 12,
                    }}
                  >
                    {[
                      { k: t("Subtotal", "小计"), v: o.subtotal },
                      { k: t("Freight", "运费"), v: o.freight },
                      { k: t("Duty", "关税"), v: o.duty },
                      { k: t("Handling", "服务费"), v: o.handling },
                    ].map((b) => (
                      <div
                        key={b.k}
                        style={{
                          padding: "12px 14px",
                          border: "1px solid var(--rsn-border)",
                          borderRadius: 2,
                          background: "var(--rsn-bg)",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 10,
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            color: "var(--rsn-muted)",
                            marginBottom: 6,
                          }}
                        >
                          {b.k}
                        </div>
                        <div
                          className="rsn-tabular"
                          style={{ fontSize: 16, color: "var(--rsn-text)" }}
                        >
                          ${b.v.toLocaleString("en-US")}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* status timeline */}
                  <StatusTimeline status={o.status} statusDict={STATUS_DICT} />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

const STATUS_FLOW = [
  "Submitted",
  "Allocated",
  "Production",
  "Dispatched",
  "In Transit",
  "Delivered",
  "Reconciled",
] as const;

function StatusTimeline({
  status,
  statusDict,
}: {
  status: string;
  statusDict: Record<string, string>;
}) {
  const t = useT();
  const idx = STATUS_FLOW.indexOf(status as typeof STATUS_FLOW[number]);
  return (
    <div
      style={{
        padding: "16px 18px",
        background: "var(--rsn-bg)",
        border: "1px solid var(--rsn-border)",
        borderRadius: 2,
      }}
    >
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--rsn-muted)",
          marginBottom: 14,
        }}
      >
        {t("Order timeline", "订单进度")}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${STATUS_FLOW.length}, 1fr)`,
          gap: 6,
          alignItems: "center",
          position: "relative",
        }}
      >
        {STATUS_FLOW.map((s, i) => {
          const passed = i <= idx;
          return (
            <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: passed ? "var(--rsn-emerald)" : "var(--rsn-bg-2)",
                  border: `1px solid ${passed ? "var(--rsn-emerald)" : "var(--rsn-border-2)"}`,
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  color: passed ? "var(--rsn-text)" : "var(--rsn-muted)",
                  letterSpacing: "0.04em",
                  whiteSpace: "nowrap",
                }}
              >
                {t(s, statusDict[s] ?? s)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
