"use client";

import { useMemo, useState } from "react";
import { Sparkles, ArrowUpRight, ShieldCheck, TrendingUp } from "lucide-react";
import { portalProducts, portalAIInsights, type PortalProduct } from "@/data/portal";
import { useT } from "@/lib/lang";

const CATEGORIES = [
  "All",
  "Mobile Accessories",
  "Electronics Accessories",
  "Beauty Tools",
  "Home Utility",
  "Fashion Basics",
  "Small Appliances",
  "Packaging Supplies",
];

const CATEGORY_ZH: Record<string, string> = {
  All: "全部",
  "Mobile Accessories": "手机配件",
  "Electronics Accessories": "电子配件",
  "Beauty Tools": "美妆工具",
  "Home Utility": "家居日用",
  "Fashion Basics": "服饰基础款",
  "Small Appliances": "小家电",
  "Packaging Supplies": "包装耗材",
};

const REGIONS = ["All", "Shenzhen", "Guangzhou", "Yiwu"];
const REGION_ZH: Record<string, string> = {
  All: "全部",
  Shenzhen: "深圳",
  Guangzhou: "广州",
  Yiwu: "义乌",
};

export function CatalogView({ onSelect }: { onSelect: (sku: string) => void }) {
  const t = useT();
  const [cat, setCat] = useState("All");
  const [region, setRegion] = useState("All");

  const filtered = useMemo(() => {
    return portalProducts.filter(
      (p) =>
        (cat === "All" || p.category === cat) &&
        (region === "All" || p.sourceRegion === region)
    );
  }, [cat, region]);

  return (
    <div>
      {/* page header */}
      <header
        className="catalog-header"
        style={{
          padding: "32px 32px 18px",
          borderBottom: "1px solid var(--rsn-border)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
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
              {t("Catalog · Member Pricing Visible", "商品目录 · 会员定价可见")}
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
              {t("Curated wholesale,", "精选批发,")}
              <em style={{ color: "var(--rsn-gold)", fontStyle: "italic" }}>
                {t(" governed access.", "受治理的渠道。")}
              </em>
            </h1>
          </div>
          <div
            style={{
              display: "flex",
              gap: 28,
              fontSize: 12,
              color: "var(--rsn-muted)",
            }}
          >
            {[
              { k: t("Member SKUs", "会员 SKU"), v: portalProducts.length },
              { k: t("Verified Suppliers", "认证供应商"), v: 312 },
              { k: t("Active Routes", "在用通路"), v: 11 },
              { k: t("Tier", "会员级别"), v: t("Gold", "金") },
            ].map((s) => (
              <div key={s.k}>
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  {s.k}
                </div>
                <div
                  className="rsn-tabular"
                  style={{ fontSize: 18, color: "var(--rsn-text)" }}
                >
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* AI strip */}
      <section className="catalog-ai-strip" style={{ padding: "20px 32px", borderBottom: "1px solid var(--rsn-border)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 14,
          }}
        >
          <Sparkles size={14} color="var(--rsn-gold)" strokeWidth={1.5} />
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--rsn-gold)",
            }}
          >
            {t("AI Briefing for Patan Trade Lines", "AI 简报 · Patan Trade Lines")}
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 12,
          }}
        >
          {portalAIInsights.map((ins) => {
            const headlineZh =
              ins.headline === "Reorder window opens"
                ? "补货窗口开启"
                : ins.headline === "Demand spike detected"
                ? "检测到需求激增"
                : "可解锁更优价格档";
            const detailZh =
              ins.sku === "RSN-MA-1109"
                ? "您的售出速度环比 +24%。建议补货 8,000 件以维持 7 天安全库存。"
                : ins.sku === "RSN-BT-4140"
                ? "美妆工具品类指数 30 天内上涨 22%。建议预置 1,800 件至加德满都仓。"
                : "提升至 2,500 件可解锁下一档位 −8.3% 单价优惠。";
            const actionZh =
              ins.action === "Build reorder"
                ? "构建补货单"
                : ins.action === "Add to order"
                ? "加入订单"
                : "提升至 2,500";
            return (
              <article
                key={ins.sku}
                style={{
                  border: "1px solid var(--rsn-border)",
                  background: "var(--rsn-surface)",
                  padding: "14px 16px",
                  borderRadius: 4,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 6,
                  }}
                >
                  <span
                    className="rsn-mono"
                    style={{ fontSize: 11, color: "var(--rsn-muted)" }}
                  >
                    {ins.sku}
                  </span>
                  <span className="rsn-chip rsn-chip-gold">
                    {(ins.confidence * 100).toFixed(0)}%
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "var(--rsn-text)",
                    marginBottom: 4,
                  }}
                >
                  {t(ins.headline, headlineZh)}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--rsn-muted)",
                    lineHeight: 1.5,
                    marginBottom: 12,
                  }}
                >
                  {t(ins.detail, detailZh)}
                </div>
                <button
                  onClick={() => onSelect(ins.sku)}
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    fontSize: 12,
                    color: "var(--rsn-text)",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    borderBottom: "1px solid var(--rsn-text)",
                    paddingBottom: 1,
                  }}
                >
                  {t(ins.action, actionZh)} <ArrowUpRight size={12} />
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {/* filters */}
      <section
        className="catalog-filters"
        style={{
          padding: "18px 32px",
          borderBottom: "1px solid var(--rsn-border)",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          background: "var(--rsn-surface)",
        }}
      >
        <FilterRow
          label={t("Category", "品类")}
          items={CATEGORIES}
          dict={CATEGORY_ZH}
          value={cat}
          onChange={setCat}
        />
        <FilterRow
          label={t("Source", "产地")}
          items={REGIONS}
          dict={REGION_ZH}
          value={region}
          onChange={setRegion}
        />
      </section>

      {/* product grid */}
      <section className="catalog-grid-wrap" style={{ padding: "24px 32px 64px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 18,
          }}
        >
          {filtered.map((p) => (
            <ProductCard key={p.sku} p={p} onClick={() => onSelect(p.sku)} />
          ))}
        </div>
      </section>
    </div>
  );
}

function FilterRow({
  label,
  items,
  dict,
  value,
  onChange,
}: {
  label: string;
  items: string[];
  dict: Record<string, string>;
  value: string;
  onChange: (v: string) => void;
}) {
  const t = useT();
  return (
    <div
      className="portal-filter-scroll"
      style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}
    >
      <span
        style={{
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--rsn-muted)",
          width: 70,
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      {items.map((it) => (
        <button
          key={it}
          onClick={() => onChange(it)}
          className={`portal-filter ${value === it ? "active" : ""}`}
        >
          {t(it, dict[it] ?? it)}
        </button>
      ))}
    </div>
  );
}

function ProductCard({ p, onClick }: { p: PortalProduct; onClick: () => void }) {
  const t = useT();
  const lowest = Math.min(...p.moqTiers.map((m) => m.price));
  const hue1 = p.imageHue;
  const hue2 = (p.imageHue + 35) % 360;
  return (
    <article className="portal-product-card" onClick={onClick}>
      <div
        className="portal-img"
        style={
          {
            "--c1": `hsl(${hue1} 35% 70%)`,
            "--c2": `hsl(${hue2} 30% 55%)`,
          } as React.CSSProperties
        }
      >
        <div className="portal-img-grad" />
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
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
        {/* corner badges */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            display: "flex",
            gap: 6,
          }}
        >
          {p.tags.slice(0, 1).map((t) => (
            <span
              key={t}
              className="rsn-chip rsn-chip-gold"
              style={{ background: "rgba(255,255,255,0.92)" }}
            >
              {t}
            </span>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 8px",
            background: "rgba(255,255,255,0.92)",
            border: "1px solid var(--rsn-border)",
            borderRadius: 2,
            fontSize: 10,
            color: "var(--rsn-text)",
          }}
        >
          <TrendingUp size={10} color="var(--rsn-gold)" strokeWidth={2} />
          <span className="rsn-tabular">{p.demandScore}</span>
        </div>
      </div>
      <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
        <div>
          <div
            className="rsn-mono"
            style={{ fontSize: 10, color: "var(--rsn-muted)", marginBottom: 6 }}
          >
            {p.sku} · {p.sourceRegion}
          </div>
          <h3
            style={{
              fontSize: 15,
              lineHeight: 1.3,
              color: "var(--rsn-text)",
              fontWeight: 500,
              marginBottom: 6,
              letterSpacing: "-0.01em",
            }}
          >
            {p.name}
          </h3>
          <div style={{ fontSize: 11, color: "var(--rsn-muted)" }}>
            {t(p.category, CATEGORY_ZH[p.category] ?? p.category)}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            paddingTop: 12,
            borderTop: "1px dashed var(--rsn-border)",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--rsn-muted)",
                marginBottom: 4,
              }}
            >
              {t("From", "起价")}
            </div>
            <div
              className="rsn-tabular"
              style={{ fontSize: 22, lineHeight: 1, color: "var(--rsn-text)", fontWeight: 300 }}
            >
              ${lowest.toFixed(2)}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "var(--rsn-muted)",
                marginTop: 4,
              }}
            >
              {t("MOQ", "起订量")} {p.moqTiers[0].qty.toLocaleString("en-US")} ·{" "}
              {t(`${p.moqTiers[0].leadTimeDays}d lead`, `交付 ${p.moqTiers[0].leadTimeDays} 天`)}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 11,
              color: "var(--rsn-text-2)",
            }}
          >
            <ShieldCheck size={12} color="var(--rsn-emerald)" strokeWidth={1.6} />
            {t("Verified", "已认证")}
          </div>
        </div>
      </div>
    </article>
  );
}
