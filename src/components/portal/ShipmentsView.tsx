"use client";

import { useState } from "react";
import { portalShipments, type PortalShipment } from "@/data/portal";
import { useT } from "@/lib/lang";

const SHIP_STATUS: Record<string, string> = {
  Booked: "已预订",
  Dispatched: "已发运",
  "In Transit": "在途",
  "At Customs": "清关中",
  Cleared: "已清关",
  "Out for Delivery": "派送中",
  Delivered: "已送达",
};

export function ShipmentsView() {
  const t = useT();
  const [active, setActive] = useState<PortalShipment | null>(portalShipments[0]);

  return (
    <div style={{ padding: "32px", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.05fr)", gap: 28 }} className="ship-grid">
      <div>
        <header style={{ marginBottom: 24 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--rsn-muted)",
              marginBottom: 8,
            }}
          >
            {t("Shipments · Cross-Border Visibility", "在途货物 · 跨境可视化")}
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
            {t("Live across", "覆盖")}{" "}
            <em style={{ color: "var(--rsn-gold)", fontStyle: "italic" }}>
              {t("every lane.", "每一条通路。")}
            </em>
          </h1>
        </header>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {portalShipments.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s)}
              style={{
                background: active?.id === s.id ? "var(--rsn-bg-2)" : "var(--rsn-surface)",
                border: `1px solid ${active?.id === s.id ? "var(--rsn-text)" : "var(--rsn-border)"}`,
                borderRadius: 4,
                padding: "16px 18px",
                cursor: "pointer",
                fontFamily: "inherit",
                textAlign: "left",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 16,
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 4,
                  }}
                >
                  <span
                    className="rsn-mono"
                    style={{
                      fontSize: 11,
                      color: "var(--rsn-gold)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {s.id}
                  </span>
                  <span style={{ fontSize: 13, color: "var(--rsn-text)" }}>
                    {s.route}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--rsn-muted)",
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                  }}
                >
                  <span>{s.carrier}</span>
                  <span>·</span>
                  <span>{t("ETA", "预计")} {s.expectedDelivery}</span>
                  <span>·</span>
                  <span className="rsn-tabular">{s.cbm} CBM</span>
                </div>
              </div>
              <span
                className={`rsn-chip ${
                  s.status === "Delivered" || s.status === "Cleared"
                    ? "rsn-chip-emerald"
                    : s.status === "At Customs"
                    ? "rsn-chip-gold"
                    : ""
                }`}
              >
                {t(s.status, SHIP_STATUS[s.status] ?? s.status)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {active && <ShipmentDetail s={active} statusDict={SHIP_STATUS} />}

      <style>{`
        @media (max-width: 1100px) {
          .ship-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function ShipmentDetail({
  s,
  statusDict,
}: {
  s: PortalShipment;
  statusDict: Record<string, string>;
}) {
  const t = useT();
  return (
    <div
      style={{
        border: "1px solid var(--rsn-border)",
        borderRadius: 4,
        background: "var(--rsn-surface)",
        position: "sticky",
        top: 24,
        alignSelf: "start",
      }}
    >
      <div
        style={{
          padding: "18px 22px",
          borderBottom: "1px solid var(--rsn-border)",
          background: "var(--rsn-bg-2)",
        }}
      >
        <div
          className="rsn-mono"
          style={{
            fontSize: 11,
            color: "var(--rsn-gold)",
            letterSpacing: "0.18em",
            marginBottom: 6,
          }}
        >
          {t("SHIPMENT", "在途货物")} · {s.id}
        </div>
        <div
          className="rsn-serif"
          style={{ fontSize: 22, letterSpacing: "-0.02em", fontWeight: 300 }}
        >
          {s.route}
        </div>
      </div>

      {/* route viz */}
      <div style={{ padding: 22, borderBottom: "1px solid var(--rsn-border)" }}>
        <RouteLine
          origin={s.origin}
          destination={s.destination}
          status={s.status}
          statusDict={statusDict}
        />
      </div>

      {/* metadata */}
      <div
        style={{
          padding: 22,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 16,
          borderBottom: "1px solid var(--rsn-border)",
        }}
      >
        {[
          { k: t("Carrier", "承运方"), v: s.carrier },
          { k: t("Container / Vessel", "集装箱 / 船次"), v: s.containerId ?? s.vessel ?? "—" },
          { k: t("Volume", "体积"), v: `${s.cbm} CBM` },
          { k: t("Weight", "重量"), v: `${s.weightKg.toLocaleString("en-US")} kg` },
          { k: t("Linked order", "关联订单"), v: s.orderId },
          { k: t("Landed cost", "到岸总价"), v: `$${s.landedCost.toLocaleString("en-US")}` },
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
            <div className="rsn-tabular" style={{ fontSize: 13, color: "var(--rsn-text)" }}>
              {m.v}
            </div>
          </div>
        ))}
      </div>

      {/* events */}
      <div style={{ padding: 22 }}>
        <div
          style={{
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--rsn-muted)",
            marginBottom: 14,
          }}
        >
          {t("Event log", "事件日志")}
        </div>
        <ol
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            borderLeft: "1px solid var(--rsn-border)",
          }}
        >
          {s.events.map((e, i) => (
            <li
              key={i}
              style={{
                position: "relative",
                paddingLeft: 18,
                paddingBottom: i === s.events.length - 1 ? 0 : 14,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: -5,
                  top: 4,
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: i === s.events.length - 1 ? "var(--rsn-gold)" : "var(--rsn-emerald)",
                  border: "2px solid var(--rsn-surface)",
                }}
              />
              <div className="rsn-tabular" style={{ fontSize: 11, color: "var(--rsn-muted)" }}>
                {e.ts}
              </div>
              <div style={{ fontSize: 13, color: "var(--rsn-text)" }}>{e.stage}</div>
              <div style={{ fontSize: 11, color: "var(--rsn-muted)" }}>{e.location}</div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function RouteLine({
  origin,
  destination,
  status,
  statusDict,
}: {
  origin: string;
  destination: string;
  status: string;
  statusDict: Record<string, string>;
}) {
  const t = useT();
  const completed =
    status === "Delivered" ||
    status === "Cleared" ||
    status === "Out for Delivery";
  const progress = completed ? 100 : status === "At Customs" ? 75 : status === "In Transit" ? 55 : status === "Dispatched" ? 30 : 12;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 11, color: "var(--rsn-muted)" }}>
        <span>{origin}</span>
        <span>{destination}</span>
      </div>
      <svg viewBox="0 0 360 24" width="100%" height="24">
        <defs>
          <linearGradient id="route-progress" x1="0" x2="1">
            <stop offset="0%" stopColor="#8A6B2E" />
            <stop offset="100%" stopColor="#1B4332" />
          </linearGradient>
        </defs>
        <line x1="20" x2="340" y1="12" y2="12" stroke="#E5E2DA" strokeWidth="2" />
        <line
          x1="20"
          x2={20 + (320 * progress) / 100}
          y1="12"
          y2="12"
          stroke="url(#route-progress)"
          strokeWidth="2"
        />
        <circle cx="20" cy="12" r="6" fill="#1B4332" />
        <circle cx={20 + (320 * progress) / 100} cy="12" r="5" fill="#8A6B2E" />
        <circle cx="340" cy="12" r="6" fill="none" stroke="#E5E2DA" strokeWidth="1.5" />
      </svg>
      <div style={{ marginTop: 10, fontSize: 12, color: "var(--rsn-text)" }}>
        {t("Status", "状态")}:{" "}
        <span style={{ color: "var(--rsn-gold)" }}>
          {t(status, statusDict[status] ?? status)}
        </span>
      </div>
    </div>
  );
}
