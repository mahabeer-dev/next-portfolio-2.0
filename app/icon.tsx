import { ImageResponse } from "next/og";

// Browser tab favicon — a blue "M" monogram, generated at build time.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 6,
          color: "#ffffff",
          fontSize: 24,
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
