# Remotion reels (brand video for IG/LinkedIn)

Renders 9:16 MP4 reels in the brand palette (navy/mint, Plus Jakarta Sans).

## Render
```
cd docs/social/reels
npm install
npx remotion render src/index.ts InvoiceReel out/invoice-reel.mp4   # "The £10,000 invoice"
npx remotion render src/index.ts VerifiedReel out/verified-reel.mp4 # "Verified, not hopeful"
```
Rendered files (already made) live in C:\Users\samue\social-assets\video\.
Add new reels by creating a component in src/ and registering it in src/Root.tsx.
