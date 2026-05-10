"use client";

import { useEffect, useMemo, useState } from "react";
import {
  X,
  ShieldCheck,
  Plus,
  Minus,
  ArrowUpRight,
  Factory,
  Globe,
  Clock,
  TrendingUp,
} from "lucide-react";
import {
  computeLanded,
  portalProducts,
  portalSuppliers,
  freightRates,
  type PortalProduct,
} from "@/data/portal";
import { useT } from "@/lib/lang";

export function ProductDetailDrawer({
  sku,
  open,
  onClose,
  onAdd,
}: {
  sku: string | null;
  open: boolean;
  onClose: () => void;
  onAdd: (sku: string, qty: number, unitPrice: number) => void;
}) {
  const t = useT();
  const product: PortalProduct | undefined = useMemo(
    () => portalProducts.find((p) => p.sku === sku),
    [sku]
  );

  const [qty, setQty] = useState(0);
  const [shippingClass, setShippingClass] = useState<PortalProduct["shippingClass"]>("Cross-Border Express");

  useEffect(() => {
    if (product) {
      setQty(product.moqTiers[0].qty);
      setShippingClass(product.shippingClass);
    }
  }, [product]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !product) return null;

  const supplier = portalSuppliers.find((s) => s.id === product.supplierId);
  const tier = [...product.moqTiers]
    .reverse()
    .find((t) => qty >= t.qty) ?? product.moqTiers[0];
  const landed = computeLanded({
    qty,
    unitPrice: tier.price,
    category: product.category,
    shippingClass,
  });
  const nextTier = product.moqTiers.find((t) => t.qty > qty);
  const incrementsToNext = nextTier ? nextTier.qty - qty : 0;
  const savings = nextTier ? (tier.price - nextTier.price) / tier.price : 0;

  const hue1 = product.imageHue;
  const hue2 = (product.imageHue + 35) % 360;

  return (
    <>
      <div className="rsn-overlay" onClick={onClose} />
      <aside className="rsn-drawer" style={{ width: "min(720px, 96vw)" }}>
        {/* sticky head */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 28px",
            borderBottom: "1px solid var(--rsn-border)",
            position: "sticky",
            top: 0,
            background: "var(--rsn-bg-2)",
            zIndex: 2,
          }}
        >
          <div>
            <div
              className="rsn-mono"
              style={{ fontSize: 11, color: "var(--rsn-muted)" }}
            >
              {product.sku}
            </div>
            <div style={{ fontSize: 14, color: "var(--rsn-text)" }}>{product.name}</div>
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
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

        {/* hero image */}
        <div
          className="portal-img"
          style={
            {
              height: 280,
              "--c1": `hsl(${hue1} 35% 72%)`,
              "--c2": `hsl(${hue2} 30% 55%)`,
            } as React.CSSProperties
          }
        >
          <div className="portal-img-grad" />
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            {product.tags.map((t) => (
              <span
                key={t}
                className="rsn-chip rsn-chip-gold"
                style={{ background: "rgba(255,255,255,0.92)" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 28 }}>
          {/* description */}
          <div>
            <div
              style={{
                display: "flex",
                gap: 10,
                marginBottom: 12,
                flexWrap: "wrap",
              }}
            >
              <span className="rsn-chip">
                <ShieldCheck size={11} color="var(--rsn-emerald)" />
                {t("Verified Member SKU", "认证会员 SKU")}
              </span>
              <span className="rsn-chip">
                <Globe size={11} color="var(--rsn-muted)" />
                {product.sourceRegion}
              </span>
              <span className="rsn-chip">
                <TrendingUp size={11} color="var(--rsn-gold)" />
                {t("Demand", "需求指数")} {product.demandScore}
              </span>
              <span className="rsn-chip">
                <Clock size={11} color="var(--rsn-muted)" />
                {product.shippingClass}
              </span>
            </div>
            <p
              style={{
                fontSize: 14,
                color: "var(--rsn-text-2)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {product.description}
            </p>
          </div>

          {/* MOQ tier table */}
          <section>
            <SectionTitle>{t("Member pricing tiers", "会员价格档")}</SectionTitle>
            <div
              style={{
                border: "1px solid var(--rsn-border)",
                borderRadius: 4,
                background: "var(--rsn-surface)",
              }}
            >
              {product.moqTiers.map((mt, i) => {
                const active = tier.qty === mt.qty;
                return (
                  <button
                    key={mt.qty}
                    onClick={() => setQty(mt.qty)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr auto auto",
                      gap: 24,
                      width: "100%",
                      alignItems: "center",
                      padding: "14px 18px",
                      background: active ? "var(--rsn-bg-2)" : "transparent",
                      border: "none",
                      borderBottom:
                        i === product.moqTiers.length - 1
                          ? "none"
                          : "1px dashed var(--rsn-border)",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      textAlign: "left",
                    }}
                  >
                    <span
                      className="rsn-mono"
                      style={{
                        fontSize: 11,
                        color: active ? "var(--rsn-gold)" : "var(--rsn-muted)",
                        letterSpacing: "0.12em",
                      }}
                    >
                      T{i + 1}
                    </span>
                    <div>
                      <div
                        className="rsn-tabular"
                        style={{ fontSize: 14, color: "var(--rsn-text)" }}
                      >
                        {mt.qty.toLocaleString("en-US")}
                        {t("+ units", " 件起")}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--rsn-muted)" }}>
                        {t(
                          `${mt.leadTimeDays}-day production lead`,
                          `生产交期 ${mt.leadTimeDays} 天`
                        )}
                      </div>
                    </div>
                    <span
                      className="rsn-tabular"
                      style={{
                        fontSize: 11,
                        color: "var(--rsn-emerald)",
                      }}
                    >
                      {i === 0
                        ? t("Base", "基准")
                        : `−${(((product.moqTiers[0].price - mt.price) / product.moqTiers[0].price) * 100).toFixed(1)}%`}
                    </span>
                    <span
                      className="rsn-tabular"
                      style={{
                        fontSize: 18,
                        color: "var(--rsn-text)",
                        fontWeight: 300,
                      }}
                    >
                      ${mt.price.toFixed(2)}
                    </span>
                  </button>
                );
              })}
            </div>
            {nextTier && savings > 0 && (
              <div
                style={{
                  marginTop: 12,
                  padding: 12,
                  border: "1px solid rgba(138,107,46,0.35)",
                  background: "var(--rsn-gold-soft)",
                  borderRadius: 2,
                  fontSize: 12,
                  color: "var(--rsn-text)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span>
                  {t(
                    `Lift to ${nextTier.qty.toLocaleString("en-US")} units (+${incrementsToNext.toLocaleString("en-US")}) to unlock −${(savings * 100).toFixed(1)}% per unit.`,
                    `提升至 ${nextTier.qty.toLocaleString("en-US")} 件(+${incrementsToNext.toLocaleString("en-US")})可解锁单价 −${(savings * 100).toFixed(1)}%。`
                  )}
                </span>
                <button
                  onClick={() => setQty(nextTier.qty)}
                  style={{
                    border: "none",
                    background: "var(--rsn-text)",
                    color: "var(--rsn-bg)",
                    padding: "6px 12px",
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    borderRadius: 2,
                  }}
                >
                  {t("Lift", "提升")}
                </button>
              </div>
            )}
          </section>

          {/* qty + landed cost */}
          <section>
            <SectionTitle>{t("Configure & landed cost", "配置与到岸总价")}</SectionTitle>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 18,
                marginBottom: 20,
              }}
            >
              <div>
                <label className="rsn-label">{t("Quantity", "数量")}</label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid var(--rsn-border)",
                    background: "var(--rsn-surface)",
                    borderRadius: 2,
                  }}
                >
                  <button
                    onClick={() => setQty((q) => Math.max(product.moqTiers[0].qty, q - 100))}
                    style={iconBtn}
                  >
                    <Minus size={12} />
                  </button>
                  <input
                    className="rsn-tabular"
                    type="number"
                    value={qty}
                    min={product.moqTiers[0].qty}
                    onChange={(e) =>
                      setQty(Math.max(product.moqTiers[0].qty, parseInt(e.target.value) || 0))
                    }
                    style={{
                      flex: 1,
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      padding: "10px 12px",
                      fontSize: 16,
                      color: "var(--rsn-text)",
                      textAlign: "center",
                      fontFamily: "inherit",
                    }}
                  />
                  <button
                    onClick={() => setQty((q) => q + 100)}
                    style={iconBtn}
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              <div>
                <label className="rsn-label">{t("Shipping class", "运输方式")}</label>
                <select
                  className="rsn-input"
                  value={shippingClass}
                  onChange={(e) =>
                    setShippingClass(e.target.value as PortalProduct["shippingClass"])
                  }
                >
                  {freightRates.map((r) => (
                    <option key={r.shippingClass} value={r.shippingClass}>
                      {r.shippingClass} · {r.durationDays[0]}–{r.durationDays[1]}d · ${r.perUnit.toFixed(2)}/u
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div
              style={{
                border: "1px solid var(--rsn-border)",
                borderRadius: 4,
                background: "var(--rsn-bg-2)",
                padding: 18,
              }}
            >
              <CostRow label={t("Subtotal (FOB)", "小计 (FOB)")} value={landed.subtotal} />
              <CostRow label={t("Cross-border freight", "跨境运费")} value={landed.freight} />
              <CostRow label={t("Estimated duty", "预估关税")} value={landed.duty} />
              <CostRow label={t("RSN handling (1.2%)", "RSN 服务费 (1.2%)")} value={landed.handling} />
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
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--rsn-text-2)",
                  }}
                >
                  {t("Total landed", "到岸总价")}
                </span>
                <span
                  className="rsn-serif rsn-tabular"
                  style={{
                    fontSize: 26,
                    color: "var(--rsn-text)",
                    fontWeight: 300,
                  }}
                >
                  ${landed.total.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontSize: 11,
                  color: "var(--rsn-muted)",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>
                  {t("Landed unit", "到岸单价")}:{" "}
                  <span className="rsn-tabular">
                    ${(landed.total / Math.max(qty, 1)).toFixed(2)}
                  </span>
                </span>
                <span>
                  {t(
                    `ETA window: ${landed.durationDays[0]}–${landed.durationDays[1]} days`,
                    `预计到货:${landed.durationDays[0]}–${landed.durationDays[1]} 天`
                  )}
                </span>
              </div>
            </div>
          </section>

          {/* supplier */}
          {supplier && (
            <section>
              <SectionTitle>{t("Supplier transparency", "供应商透明度")}</SectionTitle>
              <div
                style={{
                  border: "1px solid var(--rsn-border)",
                  borderRadius: 4,
                  background: "var(--rsn-surface)",
                  padding: 18,
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: 18,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    border: "1px solid var(--rsn-border)",
                    borderRadius: 2,
                    display: "grid",
                    placeItems: "center",
                    color: "var(--rsn-gold)",
                  }}
                >
                  <Factory size={18} strokeWidth={1.4} />
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ fontSize: 14, color: "var(--rsn-text)" }}>
                      {supplier.name}
                    </span>
                    {supplier.verified && (
                      <span className="rsn-chip rsn-chip-emerald">
                        {t("Verified", "已认证")}
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--rsn-muted)",
                      display: "flex",
                      gap: 14,
                      flexWrap: "wrap",
                    }}
                  >
                    <span>{supplier.region}</span>
                    <span>·</span>
                    <span>{t(`${supplier.yearsActive} years active`, `${supplier.yearsActive} 年运营`)}</span>
                    <span>·</span>
                    <span className="rsn-tabular">{supplier.factorySize.toLocaleString("en-US")} m²</span>
                    <span>·</span>
                    <span className="rsn-tabular">{t(`${supplier.onTime}% on-time`, `${supplier.onTime}% 准时`)}</span>
                    <span>·</span>
                    <span className="rsn-tabular">★ {supplier.rating.toFixed(1)}</span>
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--rsn-muted)",
                      marginTop: 4,
                    }}
                  >
                    {t("Specialties", "专长")}: {supplier.specialties.join(" · ")}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* specs */}
          <section>
            <SectionTitle>{t("Specifications", "规格参数")}</SectionTitle>
            <div
              style={{
                border: "1px solid var(--rsn-border)",
                borderRadius: 4,
                background: "var(--rsn-surface)",
              }}
            >
              {product.specs.map((s, i) => (
                <div
                  key={s.k}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "180px 1fr",
                    gap: 18,
                    padding: "12px 18px",
                    borderBottom:
                      i === product.specs.length - 1
                        ? "none"
                        : "1px dashed var(--rsn-border)",
                    fontSize: 13,
                  }}
                >
                  <span style={{ color: "var(--rsn-muted)" }}>{s.k}</span>
                  <span style={{ color: "var(--rsn-text)" }}>{s.v}</span>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div
            style={{
              display: "flex",
              gap: 12,
              paddingTop: 18,
              borderTop: "1px solid var(--rsn-border)",
            }}
          >
            <button
              className="rsn-btn rsn-btn-primary"
              style={{ flex: 1 }}
              onClick={() => {
                onAdd(product.sku, qty, tier.price);
                onClose();
              }}
            >
              {t("Add to Order", "加入订单")} · ${landed.total.toLocaleString("en-US", { maximumFractionDigits: 0 })}{" "}
              <ArrowUpRight size={14} />
            </button>
            <button className="rsn-btn rsn-btn-ghost">{t("Request Quote", "发起询价")}</button>
          </div>
        </div>
      </aside>
    </>
  );
}

const iconBtn: React.CSSProperties = {
  width: 40,
  height: 40,
  display: "grid",
  placeItems: "center",
  background: "transparent",
  border: "none",
  borderRight: "1px solid var(--rsn-border)",
  cursor: "pointer",
  color: "var(--rsn-text-2)",
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--rsn-muted)",
        marginBottom: 12,
      }}
    >
      {children}
    </div>
  );
}

function CostRow({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        padding: "6px 0",
        fontSize: 13,
      }}
    >
      <span style={{ color: "var(--rsn-text-2)" }}>{label}</span>
      <span className="rsn-tabular" style={{ color: "var(--rsn-text)" }}>
        ${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}
      </span>
    </div>
  );
}
