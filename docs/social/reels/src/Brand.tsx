import React from "react"
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion"
import { loadFont } from "@remotion/google-fonts/PlusJakartaSans"
export const { fontFamily } = loadFont()
export const NAVY = "#0F3D3E", MINT = "#A8D5CC", CREAM = "#F2F4F3"

export const Logo: React.FC<{ size?: number }> = ({ size = 88 }) => (
  <svg width={size} height={size} viewBox="0 0 30 30">
    <rect x="10" y="0" width="10" height="30" rx="3" fill={CREAM} />
    <rect x="0" y="10" width="30" height="10" rx="3" fill={CREAM} />
    <path d="M15 8 A7 7 0 0 1 15 22 Z" fill={MINT} />
  </svg>
)

export const Rise: React.FC<{ children: React.ReactNode; delay?: number; style?: React.CSSProperties }> = ({ children, delay = 0, style }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } })
  const opacity = interpolate(frame - delay, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  return <div style={{ opacity, transform: `translateY(${interpolate(s, [0, 1], [44, 0])}px)`, ...style }}>{children}</div>
}

export const Pop: React.FC<{ children: React.ReactNode; delay?: number; style?: React.CSSProperties }> = ({ children, delay = 0, style }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 180 } })
  const opacity = interpolate(frame - delay, [0, 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  return <div style={{ opacity, transform: `scale(${interpolate(s, [0, 1], [0.7, 1])})`, ...style }}>{children}</div>
}
