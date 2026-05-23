import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          borderRadius: 6,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
          <rect x="10" y="0" width="10" height="30" rx="3" fill="#0F3D3E" />
          <rect x="0" y="10" width="30" height="10" rx="3" fill="#0F3D3E" />
          <path d="M15 8 A7 7 0 0 1 15 22 Z" fill="#F2F4F3" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
