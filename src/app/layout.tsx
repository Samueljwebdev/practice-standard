import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Poppins } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { CookieBanner } from "@/components/ui/CookieBanner"

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-inter" })
const poppins = Poppins({ subsets: ["latin"], weight: ["600", "700", "800", "900"], variable: "--font-poppins" })

export const metadata: Metadata = {
  title: "The Practice Standard — Healthcare Jobs UK",
  description: "The UK's specialist job board for regulated private healthcare practices — dental, veterinary, optometry, aesthetics, physiotherapy, and private medical.",
  metadataBase: new URL("https://thepracticestandard.co.uk"),
  openGraph: {
    title: "The Practice Standard — Healthcare Jobs UK",
    description: "The UK's specialist job board for regulated private healthcare practices — dental, veterinary, optometry, aesthetics, physiotherapy, and private medical.",
    url: "https://thepracticestandard.co.uk",
    siteName: "The Practice Standard",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Practice Standard — Healthcare Jobs UK",
    description: "The UK's specialist job board for regulated private healthcare practices — dental, veterinary, optometry, aesthetics, physiotherapy, and private medical.",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${poppins.variable} font-sans min-h-screen flex flex-col bg-background`}>
        <Script id="ga-consent-default" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
          });
        `}</Script>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-215E91WXVX" strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-215E91WXVX');
        `}</Script>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  )
}
