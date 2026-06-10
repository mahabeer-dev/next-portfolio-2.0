import { ImageResponse } from "next/og";

// Apple touch icon (home-screen) — blue "M" monogram, generated at build time.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
          color: "#ffffff",
          fontSize: 120,
          fontWeight: 700,
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        M
      </div>
    ),
    { ...size }
  );
}
