export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      style={{
        marginBottom: 64,
        textAlign: align,
        maxWidth: 880,
        marginLeft: align === "center" ? "auto" : undefined,
        marginRight: align === "center" ? "auto" : undefined,
      }}
    >
      <div className="rsn-eyebrow">{eyebrow}</div>
      <h2 className="rsn-serif rsn-section-title">{title}</h2>
      {description && (
        <p
          style={{
            marginTop: 22,
            fontSize: 17,
            lineHeight: 1.6,
            color: "var(--rsn-text-2)",
            maxWidth: 720,
            marginLeft: align === "center" ? "auto" : undefined,
            marginRight: align === "center" ? "auto" : undefined,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
