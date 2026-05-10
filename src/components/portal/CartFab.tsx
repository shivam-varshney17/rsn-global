"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, X, ChevronDown } from "lucide-react";
import { OrderBuilder, type CartLine } from "./OrderBuilder";
import { useT } from "@/lib/lang";
import { computeLanded, portalProducts } from "@/data/portal";

/**
 * Mobile-only floating button + bottom-sheet drawer.
 * Hidden on desktop (≥1100px) where the side panel is visible.
 */
export function CartFab({
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // total for the FAB label
  const total = lines.reduce((sum, l) => {
    const p = portalProducts.find((p) => p.sku === l.sku);
    if (!p) return sum;
    return (
      sum +
      computeLanded({
        qty: l.qty,
        unitPrice: l.unitPrice,
        category: p.category,
        shippingClass: p.shippingClass,
      }).total
    );
  }, 0);

  if (lines.length === 0) return null;

  return (
    <>
      <button className="cart-fab" onClick={() => setOpen(true)}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          <ShoppingBag size={16} />
          <span>
            {lines.length}{" "}
            {t(
              `line${lines.length === 1 ? "" : "s"} in order`,
              "项已加入订单"
            )}
          </span>
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span className="rsn-tabular">
            ${total.toLocaleString("en-US", { maximumFractionDigits: 0 })}
          </span>
          <ChevronDown size={14} style={{ transform: "rotate(180deg)" }} />
        </span>
      </button>

      {open && (
        <>
          <div
            className="cart-sheet-backdrop"
            onClick={() => setOpen(false)}
          />
          <aside className="cart-sheet" role="dialog" aria-modal="true">
            <div className="cart-sheet-handle" aria-hidden />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 18px 10px",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--rsn-muted)",
                }}
              >
                {t("Order Builder", "订单构建器")}
              </span>
              <button
                aria-label="Close"
                onClick={() => setOpen(false)}
                style={{
                  background: "transparent",
                  border: "1px solid var(--rsn-border)",
                  width: 32,
                  height: 32,
                  borderRadius: 2,
                  display: "grid",
                  placeItems: "center",
                  color: "var(--rsn-text-2)",
                  cursor: "pointer",
                }}
              >
                <X size={14} />
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto" }}>
              <OrderBuilder
                lines={lines}
                onRemove={onRemove}
                onClear={() => {
                  onClear();
                  setOpen(false);
                }}
                onSubmit={() => {
                  onSubmit();
                  setOpen(false);
                }}
              />
            </div>
          </aside>
        </>
      )}
    </>
  );
}
