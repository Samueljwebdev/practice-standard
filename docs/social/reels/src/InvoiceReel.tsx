import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion"
import { loadFont } from "@remotion/google-fonts/PlusJakartaSans"
const { fontFamily } = loadFont()

const NAVY = "#0F3D3E", MINT = "#A8D5CC", CREAM = "#F2F4F3"

const Logo: React.FC<{ size?: number }> = ({ size = 88 }) => (
  <svg width={size} height={size} viewBox="0 0 30 30">
    <rect x="10" y="0" width="10" height="30" rx="3" fill={CREAM} />
    <rect x="0" y="10" width="30" height="10" rx="3" fill={CREAM} />
    <path d="M15 8 A7 7 0 0 1 15 22 Z" fill={MINT} />
  </svg>
)

const Rise: React.FC<{ children: React.ReactNode; delay?: number; style?: React.CSSProperties }> = ({ children, delay = 0, style }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } })
  const opacity = interpolate(frame - delay, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  return <div style={{ opacity, transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`, ...style }}>{children}</div>
}

export const InvoiceReel: React.FC = () => {
  const frame = useCurrentFrame()
  // count-up for £10,000 within sequence 2 (starts frame 75)
  const count = Math.round(interpolate(frame - 80, [0, 35], [0, 10000], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))
  const base: React.CSSProperties = { fontFamily, color: CREAM, textAlign: "center", padding: "0 90px" }

  return (
    <AbsoluteFill style={{ backgroundColor: NAVY, justifyContent: "center", alignItems: "center" }}>
      <Sequence durationInFrames={78}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", ...base }}>
          <Rise><div style={{ fontSize: 56, fontWeight: 500, opacity: 0.8, marginBottom: 24 }}>An empty clinical chair costs you</div></Rise>
          <Rise delay={10}><div style={{ fontSize: 130, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>£1,000s<br />a month.</div></Rise>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={78} durationInFrames={90}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", ...base }}>
          <Rise><div style={{ fontSize: 56, fontWeight: 500, opacity: 0.8, marginBottom: 30 }}>An agency to fill it?</div></Rise>
          <div style={{ fontSize: 190, fontWeight: 800, color: CREAM, letterSpacing: "-0.04em", lineHeight: 1 }}>£{count.toLocaleString("en-GB")}</div>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={168} durationInFrames={72}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", ...base }}>
          <Rise><div style={{ fontSize: 56, fontWeight: 500, opacity: 0.8, marginBottom: 30 }}>A verified hire here?</div></Rise>
          <Rise delay={8}><div style={{ fontSize: 200, fontWeight: 800, color: MINT, letterSpacing: "-0.04em", lineHeight: 1 }}>£149</div></Rise>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={240} durationInFrames={60}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", ...base }}>
          <Rise><Logo size={96} /></Rise>
          <Rise delay={8}><div style={{ fontSize: 52, fontWeight: 800, marginTop: 36, letterSpacing: "-0.02em" }}>The Practice Standard</div></Rise>
          <Rise delay={16}><div style={{ fontSize: 34, fontWeight: 600, color: MINT, marginTop: 16 }}>thepracticestandard.co.uk</div></Rise>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  )
}
