import { ImageResponse } from "next/og";

// Shared Open Graph card (1200x630) used by all `opengraph-image` routes.
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type OgCardProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
};

export function renderOgImage({ title, subtitle, eyebrow }: OgCardProps) {
  // Scale the title down for longer headings so it never overflows the card.
  const titleSize = title.length > 70 ? 48 : title.length > 40 ? 60 : 72;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          padding: 80,
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* header: monogram + domain */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #3b82f6, #2563eb)",
              fontSize: 38,
              fontWeight: 700,
            }}
          >
            M
          </div>
          <div style={{ fontSize: 28, color: "#94a3b8" }}>mahabeer.online</div>
        </div>

        {/* body: eyebrow + title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow ? (
            <div
              style={{
                fontSize: 28,
                color: "#60a5fa",
                fontWeight: 600,
                marginBottom: 16,
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div style={{ fontSize: titleSize, fontWeight: 800, lineHeight: 1.1 }}>
            {title}
          </div>
          {subtitle ? (
            <div style={{ fontSize: 30, color: "#cbd5e1", marginTop: 24 }}>
              {subtitle}
            </div>
          ) : null}
        </div>

        {/* footer: name + role */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            color: "#94a3b8",
          }}
        >
          <div style={{ color: "#e2e8f0", fontWeight: 600 }}>Mahabeer</div>
          <div>·</div>
          <div>Full Stack Developer</div>
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
