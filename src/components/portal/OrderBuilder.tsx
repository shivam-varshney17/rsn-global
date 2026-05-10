"use client";

import { Trash2, ArrowUpRight, Wallet } from "lucide-react";
import { computeLanded, portalProducts } from "@/data/portal";
import { useT } from "@/lib/lang";
import { PRODUCT_NAME, SHIP_CLASS, tr } from "@/lib/translations";

export interface CartLine {
  sku: string;
  qty: number;
  unitPrice: number;
}

export function OrderBuilder({
  lines,
  onRemove,
  onClear,
  onSubmit,
}: {
  lines: CartLine[];
  onRemove: (sku: string) => void;
  onClear: () => void;
  onSubmit: () => void;
}) {
  const t = useT();
  const enriched = lines.map((l) => {
    const p = portalProducts.find((p) => p.sku === l.sku);
    if (!p) return null;
    const cost = computeLanded({
      qty: l.qty,
      unitPrice: l.unitPrice,
      category: p.category,
      shippingClass: p.shippingClass,
    });
    return { line: l, product: p, cost };
  }).filter(Boolean) as { line: CartLine; product: typeof portalProducts[number]; cost: ReturnType<typeof computeLanded> }[];

  const subtotal = enriched.reduce((s, e) => s + e.cost.subtotal, 0);
  const freight = enriched.reduce((s, e) => s + e.cost.freight, 0);
  const duty = enriched.reduce((s, e) => s + e.cost.duty, 0);
  const handling = enriched.reduce((s, e) => s + e.cost.handling, 0);
  const total = enriched.reduce((s, e) => s + e.cost.total, 0);
  const maxLead = enriched.reduce((s, e) => Math.max(s, e.cost.durationDays[1]), 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* head */}
      <div
        style={{
          padding: "18px 22px",
          borderBottom: "1px solid var(--rsn-border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "var(--rsn-bg-2)",
        }}
      >
        <div>
          <div
            className="rsn-mono"
            style={{
              fontSize: 11,
              color: "var(--rsn-gold)",
              letterSpacing: "0.18em",
              marginBottom: 4,
            }}
          >
            {t("ORDER BUILDER", "订单构建器")}
          </div>
          <div style={{ fontSize: 13, color: "var(--rsn-text)" }}>
            {t(
              `${lines.length} line${lines.length === 1 ? "" : "s"} · Draft order`,
              `${lines.length} 项 · 草稿订单`
            )}
          </div>
        </div>
        {lines.length > 0 && (
          <button
            onClick={onClear}
            style={{
              background: "transparent",
              border: "1px solid var(--rsn-border)",
              padding: "6px 10px",
              fontSize: 11,
              letterSpacing: "0.06em",
              color: "var(--rsn-text-2)",
              cursor: "pointer",
              fontFamily: "inherit",
              borderRadius: 2,
            }}
          >
            {t("Clear", "清空")}
          </button>
        )}
      </div>

      {/* lines */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 22px" }}>
        {enriched.length === 0 ? (
          <div
            style={{
              padding: "60px 0",
              textAlign: "center",
              color: "var(--rsn-muted)",
              fontSize: 13,
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                margin: "0 auto 18px",
                border: "1px dashed var(--rsn-border-2)",
                display: "grid",
                placeItems: "center",
                color: "var(--rsn-muted)",
              }}
            >
              <Wallet size={18} strokeWidth={1.4} />
            </div>
            <div style={{ marginBottom: 6, color: "var(--rsn-text)" }}>
              {t("Empty order", "订单为空")}
            </div>
            <div style={{ maxWidth: 240, margin: "0 auto", lineHeight: 1.5 }}>
              {t(
                "Open a SKU to view tier pricing and add to your draft order.",
                "打开任意 SKU 查看价格档,并加入草稿订单。"
              )}
            </div>
          </div>
        ) : (
          enriched.map((e) => (
            <article
              key={e.line.sku}
              style={{
                padding: "14px 0",
                borderBottom: "1px dashed var(--rsn-border)",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 12,
              }}
            >
              <div>
                <div
                  className="rsn-mono"
                  style={{
                    fontSize: 10,
                    color: "var(--rsn-muted)",
                    marginBottom: 4,
                  }}
                >
                  {e.line.sku}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--rsn-text)",
                    marginBottom: 6,
                  }}
                >
                  {tr(e.product.name, PRODUCT_NAME, t)}
                </div>
                <div
                  className="rsn-tabular"
                  style={{
                    fontSize: 11,
                    color: "var(--rsn-muted)",
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <span>{e.line.qty.toLocaleString("en-US")}{t(" units", " 件")}</span>
                  <span>·</span>
                  <span>${e.line.unitPrice.toFixed(2)}{t("/u", "/件")}</span>
                  <span>·</span>
                  <span>{tr(e.product.shippingClass, SHIP_CLASS, t)}</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                <span
                  className="rsn-tabular"
                  style={{ fontSize: 14, color: "var(--rsn-text)" }}
                >
                  ${e.cost.total.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </span>
                <button
                  aria-label="Remove"
                  onClick={() => onRemove(e.line.sku)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--rsn-muted)",
                    cursor: "pointer",
                    padding: 4,
                  }}
                >
                  <Trash2 size={13} strokeWidth={1.4} />
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      {/* totals */}
      {enriched.length > 0 && (
        <div
          style={{
            borderTop: "1px solid var(--rsn-border)",
            padding: "18px 22px",
            background: "var(--rsn-bg-2)",
          }}
        >
          <Row label={t("Subtotal", "小计")} value={subtotal} />
          <Row label={t("Freight", "运费")} value={freight} />
          <Row label={t("Duty", "关税")} value={duty} />
          <Row label={t("Handling", "服务费")} value={handling} />
          <div
            style={{
              marginTop: 12,
              paddingTop: 14,
              borderTop: "1px solid var(--rsn-border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--rsn-muted)",
                  marginBottom: 4,
                }}
              >
                {t("Landed total", "到岸总价")}
              </div>
              <div style={{ fontSize: 11, color: "var(--rsn-muted)" }}>
                {t(`ETA ${maxLead} days`, `预计到货 ${maxLead} 天`)}
              </div>
            </div>
            <span
              className="rsn-serif rsn-tabular"
              style={{
                fontSize: 28,
                lineHeight: 1,
                color: "var(--rsn-text)",
                fontWeight: 300,
              }}
            >
              ${total.toLocaleString("en-US", { maximumFractionDigits: 0 })}
            </span>
          </div>
          <button
            onClick={onSubmit}
            className="rsn-btn rsn-btn-primary"
            style={{ width: "100%", marginTop: 16 }}
          >
            {t("Submit for Allocation", "提交分货")} <ArrowUpRight size={14} />
          </button>
          <button
            className="rsn-btn rsn-btn-ghost"
            style={{ width: "100%", marginTop: 8 }}
          >
            {t("Save as Draft", "保存草稿")}
          </button>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "5px 0",
        fontSize: 13,
        color: "var(--rsn-text-2)",
      }}
    >
      <span>{label}</span>
      <span className="rsn-tabular" style={{ color: "var(--rsn-text)" }}>
        ${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}
      </span>
    </div>
  );
}
