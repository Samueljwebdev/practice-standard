import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "The Practice Standard — Healthcare Jobs UK"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0D1B2A",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top accent line */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 32, height: 2, backgroundColor: "#A8D5CC" }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: "#A8D5CC", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Where better practices hire
          </span>
        </div>

        {/* Main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 72, fontWeight: 800, color: "#F2F4F3", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            The hiring standard
          </div>
          <div style={{ fontSize: 72, fontWeight: 800, color: "#F2F4F3", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
            for modern healthcare.
          </div>
          <div style={{ width: 64, height: 4, backgroundColor: "#A8D5CC", borderRadius: 4, marginTop: 8 }} />
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 11, color: "#6B7A80", letterSpacing: "0.15em", textTransform: "uppercase" }}>The</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: "#F2F4F3", letterSpacing: "0.05em", textTransform: "uppercase" }}>Practice Standard</span>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {["Dental", "Aesthetic", "Veterinary", "Allied Health"].map(tag => (
              <div
                key={tag}
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#0F3D3E",
                  backgroundColor: "#A8D5CC",
                  padding: "6px 14px",
                  borderRadius: 999,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
