import React from "react"
import { Composition } from "remotion"
import { Reel, reelDuration } from "./Reel"
import { REELS } from "./reels"
import { InvoiceReel } from "./InvoiceReel"
import { VerifiedReel } from "./VerifiedReel"

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="InvoiceReel" component={InvoiceReel} durationInFrames={300} fps={30} width={1080} height={1920} />
      <Composition id="VerifiedReel" component={VerifiedReel} durationInFrames={270} fps={30} width={1080} height={1920} />
      {REELS.map(r => (
        <Composition
          key={r.id}
          id={r.id}
          component={Reel as React.FC<Record<string, unknown>>}
          durationInFrames={reelDuration(r.scenes)}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ scenes: r.scenes } as Record<string, unknown>}
        />
      ))}
    </>
  )
}
