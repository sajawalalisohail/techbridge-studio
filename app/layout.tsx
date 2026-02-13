import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import { NeuralInteractionProvider } from '@/providers/NeuralInteractionProvider'
import LenisProvider from '@/providers/LenisProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import IntroOverlayShell from '@/components/IntroOverlayShell'
import IntroOverlayClient from '@/components/IntroOverlayClient'
import NeuralBackgroundLoader from '@/components/three/NeuralBackgroundLoader'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  adjustFontFallback: true,
  fallback: ['system-ui', 'Segoe UI', 'Arial'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'TechBridge | Modern Software Studio',
  description: 'Ship fast. Build clean. Automate operations. We build websites, web apps, mobile apps, and AI automation workflows.',
  keywords: ['software studio', 'web development', 'mobile apps', 'automation', 'AI', 'Next.js'],
  authors: [{ name: 'TechBridge' }],
  openGraph: {
    title: 'TechBridge | Modern Software Studio',
    description: 'Ship fast. Build clean. Automate operations.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechBridge | Modern Software Studio',
    description: 'Ship fast. Build clean. Automate operations.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <IntroOverlayShell />
        <IntroOverlayClient />
        <NeuralInteractionProvider>
          <NeuralBackgroundLoader />
          <LenisProvider>
            <Navbar />
            <div className="relative z-10 min-h-screen bg-transparent">
              <main className="bg-transparent">{children}</main>
              <Footer />
            </div>
          </LenisProvider>
        </NeuralInteractionProvider>
      </body>
    </html>
  )
}
