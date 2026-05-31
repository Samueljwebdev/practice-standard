import React from "react"
import { AbsoluteFill, Sequence } from "remotion"
import { fontFamily, NAVY, MINT, CREAM, Logo, Rise, Pop } from "./Brand"

export type Scene =
  | { t: "statement"; dur: number; eyebrow?: string; lines: string[]; accentLast?: boolean }
  | { t: "stat"; dur: number; eyebrow?: string; value: string; label?: string; color?: "mint" | "cream" }
  | { t: "lines"; dur: number; eyebrow?: string; items: string[] }
  | { t: "compare"; dur: number; left: { v: string; l: string }; right: { v: string; l: string } }
  | { t: "cta"; dur: number; headline: string }

export interface ReelDef { id: string; scenes: Scene[] }
export const reelDuration = (s: Scene[]) => s.reduce((a, x) => a + x.dur, 0)

const wrap: React.CSSProperties = { justifyContent: "center", alignItems: "center", textAlign: "center", padding: "0 92px", display: "flex", flexDirection: "column", height: "100%" }

const SceneView: React.FC<{ s: Scene }> = ({ s }) => {
  if (s.t === "statement") return (
    <div style={wrap}>
      {s.eyebrow && <Rise><div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: MINT, marginBottom: 30 }}>{s.eyebrow}</div></Rise>}
      {s.lines.map((l, i) => (
        <Rise key={i} delay={i * 6}>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.03em", color: s.accentLast && i === s.lines.length - 1 ? MINT : CREAM }}>{l}</div>
        </Rise>
      ))}
    </div>
  )
  if (s.t === "stat") return (
    <div style={wrap}>
      {s.eyebrow && <Rise><div style={{ fontSize: 50, fontWeight: 500, color: "rgba(242,244,243,.82)", marginBottom: 28 }}>{s.eyebrow}</div></Rise>}
      <Pop delay={6}><div style={{ fontSize: 184, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95, color: s.color === "cream" ? CREAM : MINT }}>{s.value}</div></Pop>
      {s.label && <Rise delay={14}><div style={{ fontSize: 44, fontWeight: 700, color: CREAM, marginTop: 26, lineHeight: 1.2 }}>{s.label}</div></Rise>}
    </div>
  )
  if (s.t === "lines") return (
    <div style={{ ...wrap, alignItems: "flex-start", textAlign: "left" }}>
      {s.eyebrow && <Rise><div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: MINT, marginBottom: 36 }}>{s.eyebrow}</div></Rise>}
      {s.items.map((it, i) => (
        <Rise key={i} delay={10 + i * 14} style={{ marginBottom: 28, display: "flex", gap: 22, alignItems: "flex-start" }}>
          <div style={{ width: 18, height: 18, borderRadius: 99, background: MINT, marginTop: 22, flex: "none" }} />
          <div style={{ fontSize: 52, fontWeight: 700, color: CREAM, lineHeight: 1.18 }}>{it}</div>
        </Rise>
      ))}
    </div>
  )
  if (s.t === "compare") return (
    <div style={{ ...wrap, flexDirection: "row", gap: 70 }}>
      {[s.left, s.right].map((c, i) => (
        <Pop key={i} delay={i * 10} style={{ flex: 1 }}>
          <div style={{ fontSize: 150, fontWeight: 800, color: i === 0 ? CREAM : MINT, lineHeight: 1 }}>{c.v}</div>
          <div style={{ fontSize: 36, fontWeight: 600, color: "rgba(242,244,243,.7)", marginTop: 18 }}>{c.l}</div>
        </Pop>
      ))}
    </div>
  )
  // cta
  return (
    <div style={wrap}>
      <Rise><div style={{ fontSize: 80, fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.03em", color: CREAM, marginBottom: 50 }}>{s.headline}</div></Rise>
      <Rise delay={10}><Logo size={86} /></Rise>
      <Rise delay={18}><div style={{ fontSize: 34, fontWeight: 600, color: MINT, marginTop: 22 }}>thepracticestandard.co.uk</div></Rise>
    </div>
  )
}

export const Reel: React.FC<{ scenes: Scene[] }> = ({ scenes }) => {
  let off = 0
  return (
    <AbsoluteFill style={{ backgroundColor: NAVY, fontFamily }}>
      {scenes.map((s, i) => {
        const from = off; off += s.dur
        return <Sequence key={i} from={from} durationInFrames={s.dur}><SceneView s={s} /></Sequence>
      })}
    </AbsoluteFill>
  )
}
