import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-poppins" })

export const metadata: Metadata = {
  title: "The Practice Standard — Healthcare Jobs UK",
  description: "The UK's professional job board for dental, veterinary, optician, aesthetic, physio and GP practice roles.",
  metadataBase: new URL("https://thepracticestandard.co.uk"),
  openGraph: {
    title: "The Practice Standard — Healthcare Jobs UK",
    description: "The UK's professional job board for dental, veterinary, optician, aesthetic, physio and GP practice roles.",
    url: "https://thepracticestandard.co.uk",
    siteName: "The Practice Standard",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Practice Standard — Healthcare Jobs UK",
    description: "The UK's professional job board for dental, veterinary, optician, aesthetic, physio and GP practice roles.",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans min-h-screen flex flex-col bg-background`}>
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
      </body>
    </html>
  )
}
