import { Composition } from "remotion"
import { InvoiceReel } from "./InvoiceReel"
import { VerifiedReel } from "./VerifiedReel"

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="InvoiceReel" component={InvoiceReel} durationInFrames={300} fps={30} width={1080} height={1920} />
      <Composition id="VerifiedReel" component={VerifiedReel} durationInFrames={270} fps={30} width={1080} height={1920} />
    </>
  )
}
