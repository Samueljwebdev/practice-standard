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
const Rise: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } })
  const opacity = interpolate(frame - delay, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  return <div style={{ opacity, transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)` }}>{children}</div>
}

export const VerifiedReel: React.FC = () => {
  const frame = useCurrentFrame()
  const tick = spring({ frame: frame - 175, fps: 30, config: { damping: 12, stiffness: 200 } })
  const base: React.CSSProperties = { fontFamily, color: CREAM, textAlign: "center", padding: "0 90px" }
  return (
    <AbsoluteFill style={{ backgroundColor: NAVY, justifyContent: "center", alignItems: "center" }}>
      <Sequence durationInFrames={90}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", ...base }}>
          <Rise><div style={{ fontSize: 60, fontWeight: 500, opacity: 0.85, marginBottom: 26 }}>Indeed sends 40 CVs.</div></Rise>
          <Rise delay={12}><div style={{ fontSize: 120, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>80% aren&rsquo;t even<br />registered.</div></Rise>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={90} durationInFrames={90}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", ...base }}>
          <Rise><div style={{ fontSize: 60, fontWeight: 500, opacity: 0.85, marginBottom: 40 }}>Here, every applicant&rsquo;s registration is</div></Rise>
          <div style={{ display: "flex", alignItems: "center", gap: 30, transform: `scale(${interpolate(tick, [0, 1], [0.6, 1])})` }}>
            <div style={{ width: 130, height: 130, borderRadius: 999, background: MINT, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <div style={{ fontSize: 110, fontWeight: 800, color: MINT }}>checked.</div>
          </div>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={180} durationInFrames={90}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", ...base }}>
          <Rise><div style={{ fontSize: 96, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05 }}>Hire verified.<br />Not hopeful.</div></Rise>
          <Rise delay={14}><div style={{ marginTop: 56 }}><Logo size={84} /></div></Rise>
          <Rise delay={20}><div style={{ fontSize: 34, fontWeight: 600, color: MINT, marginTop: 24 }}>thepracticestandard.co.uk</div></Rise>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  )
}
