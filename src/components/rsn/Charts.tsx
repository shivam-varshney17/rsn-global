"use client";

import { useMemo } from "react";

/** Smooth area + line chart, single or dual series */
export function AreaLineChart({
  data,
  primaryKey,
  secondaryKey,
  height = 220,
  primaryColor = "#8A6B2E",
  secondaryColor = "#8A8A8A",
  yLabel,
}: {
  data: Record<string, number | string>[];
  primaryKey: string;
  secondaryKey?: string;
  height?: number;
  primaryColor?: string;
  secondaryColor?: string;
  yLabel?: (v: number) => string;
}) {
  const width = 720;
  const padding = { top: 18, right: 24, bottom: 28, left: 44 };

  const { primaryPath, primaryArea, secondaryPath, xLabels, yTicks, max } = useMemo(() => {
    const xs = data.map((d, i) => i);
    const ys = data.flatMap((d) =>
      [d[primaryKey], secondaryKey ? d[secondaryKey] : null].filter(
        (v) => typeof v === "number"
      ) as number[]
    );
    const max = Math.max(...ys) * 1.08;
    const min = 0;
    const innerW = width - padding.left - padding.right;
    const innerH = height - padding.top - padding.bottom;
    const sx = (i: number) =>
      padding.left + (i / Math.max(1, xs.length - 1)) * innerW;
    const sy = (v: number) =>
      padding.top + innerH - ((v - min) / (max - min)) * innerH;

    const buildPath = (key: string) => {
      let d = "";
      data.forEach((row, i) => {
        const v = row[key] as number;
        d += i === 0 ? `M ${sx(i)} ${sy(v)}` : ` L ${sx(i)} ${sy(v)}`;
      });
      return d;
    };

    const buildArea = (key: string) => {
      let d = "";
      data.forEach((row, i) => {
        const v = row[key] as number;
        d += i === 0 ? `M ${sx(i)} ${sy(v)}` : ` L ${sx(i)} ${sy(v)}`;
      });
      d += ` L ${sx(data.length - 1)} ${padding.top + innerH} L ${sx(0)} ${
        padding.top + innerH
      } Z`;
      return d;
    };

    const xLabels = data.map((row, i) => ({
      x: sx(i),
      label: String(row.month ?? row.week ?? row.label ?? ""),
    }));

    const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
      y: padding.top + innerH * (1 - t),
      label: yLabel ? yLabel(max * t) : (max * t).toFixed(1),
    }));

    return {
      primaryPath: buildPath(primaryKey),
      primaryArea: buildArea(primaryKey),
      secondaryPath: secondaryKey ? buildPath(secondaryKey) : null,
      xLabels,
      yTicks,
      max,
    };
  }, [data, primaryKey, secondaryKey, height, yLabel]);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      preserveAspectRatio="none"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="rsn-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.22" />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* horizontal gridlines */}
      {yTicks.map((t, i) => (
        <g key={i}>
          <line
            x1={padding.left}
            x2={width - padding.right}
            y1={t.y}
            y2={t.y}
            stroke="#ECE9DF"
            strokeWidth={1}
          />
          <text
            x={padding.left - 10}
            y={t.y + 3}
            fontSize="10"
            fill="#8A8A8A"
            textAnchor="end"
            fontFamily="ui-monospace, monospace"
          >
            {t.label}
          </text>
        </g>
      ))}

      {/* x labels */}
      {xLabels.map((l, i) =>
        i % Math.ceil(xLabels.length / 8) === 0 || i === xLabels.length - 1 ? (
          <text
            key={i}
            x={l.x}
            y={height - 8}
            fontSize="10"
            fill="#8A8A8A"
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
          >
            {l.label}
          </text>
        ) : null
      )}

      <path d={primaryArea} fill="url(#rsn-area)" />
      {secondaryPath && (
        <path
          d={secondaryPath}
          stroke={secondaryColor}
          strokeWidth={1}
          strokeDasharray="3 3"
          fill="none"
        />
      )}
      <path
        d={primaryPath}
        stroke={primaryColor}
        strokeWidth={1.5}
        fill="none"
        style={{
          strokeDasharray: 2400,
          strokeDashoffset: 2400,
          animation: "rsn-draw 1.6s cubic-bezier(0.2,0.7,0.2,1) forwards",
        }}
      />

      <style>{`@keyframes rsn-draw { to { stroke-dashoffset: 0; } }`}</style>
    </svg>
  );
}

export function Sparkline({
  values,
  color = "#8A6B2E",
  height = 36,
  width = 120,
}: {
  values: number[];
  color?: string;
  height?: number;
  width?: number;
}) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const sx = (i: number) => (i / (values.length - 1)) * width;
  const sy = (v: number) => height - ((v - min) / range) * height;
  const d = values
    .map((v, i) => `${i === 0 ? "M" : "L"} ${sx(i)} ${sy(v)}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
      <path d={d} stroke={color} strokeWidth={1.5} fill="none" />
    </svg>
  );
}

export function MultiLineChart({
  data,
  series,
  height = 240,
}: {
  data: Record<string, number | string>[];
  series: { key: string; color: string; label: string }[];
  height?: number;
}) {
  const width = 720;
  const padding = { top: 18, right: 24, bottom: 28, left: 44 };

  const { paths, xLabels, yTicks } = useMemo(() => {
    const ys = data.flatMap((d) =>
      series.map((s) => d[s.key] as number)
    );
    const max = Math.max(...ys) * 1.08;
    const innerW = width - padding.left - padding.right;
    const innerH = height - padding.top - padding.bottom;
    const sx = (i: number) =>
      padding.left + (i / Math.max(1, data.length - 1)) * innerW;
    const sy = (v: number) =>
      padding.top + innerH - (v / max) * innerH;

    const paths = series.map((s) => {
      let d = "";
      data.forEach((row, i) => {
        const v = row[s.key] as number;
        d += i === 0 ? `M ${sx(i)} ${sy(v)}` : ` L ${sx(i)} ${sy(v)}`;
      });
      return { ...s, d };
    });

    const xLabels = data.map((row, i) => ({
      x: sx(i),
      label: String(row.week ?? row.month ?? row.label ?? ""),
    }));

    const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
      y: padding.top + innerH * (1 - t),
      label: Math.round(max * t).toString(),
    }));

    return { paths, xLabels, yTicks };
  }, [data, series, height]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height}>
      {yTicks.map((t, i) => (
        <g key={i}>
          <line
            x1={padding.left}
            x2={width - padding.right}
            y1={t.y}
            y2={t.y}
            stroke="#ECE9DF"
          />
          <text
            x={padding.left - 10}
            y={t.y + 3}
            fontSize="10"
            fill="#8A8A8A"
            textAnchor="end"
            fontFamily="ui-monospace, monospace"
          >
            {t.label}
          </text>
        </g>
      ))}
      {xLabels.map((l, i) =>
        i % 2 === 0 ? (
          <text
            key={i}
            x={l.x}
            y={height - 8}
            fontSize="10"
            fill="#8A8A8A"
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
          >
            {l.label}
          </text>
        ) : null
      )}
      {paths.map((p) => (
        <path
          key={p.key}
          d={p.d}
          stroke={p.color}
          strokeWidth={1.5}
          fill="none"
          style={{
            strokeDasharray: 2400,
            strokeDashoffset: 2400,
            animation: "rsn-draw 1.4s cubic-bezier(0.2,0.7,0.2,1) forwards",
          }}
        />
      ))}
    </svg>
  );
}

/** Horizontal bar list */
export function BarRows({
  rows,
  color = "#8A6B2E",
}: {
  rows: { label: string; value: number }[];
  color?: string;
}) {
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {rows.map((r) => (
        <div key={r.label}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              color: "var(--rsn-text-2, #4A4A4A)",
              marginBottom: 6,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            <span>{r.label}</span>
            <span style={{ color: "var(--rsn-text, #0A0A0A)" }}>{r.value}</span>
          </div>
          <div
            style={{
              height: 4,
              background: "var(--rsn-bg-2, #ECE9DF)",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${(r.value / max) * 100}%`,
                height: "100%",
                background: color,
                animation: "rsn-grow 1.2s cubic-bezier(0.2,0.7,0.2,1) both",
              }}
            />
          </div>
        </div>
      ))}
      <style>{`@keyframes rsn-grow { from { width: 0; } }`}</style>
    </div>
  );
}
