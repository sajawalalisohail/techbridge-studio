import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/providers/LenisProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { AnimatedBackground } from '@/components/background'
import ClientIntro from './ClientIntro'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
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
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <LenisProvider>
          {/* Animated background layer */}
          <AnimatedBackground />
          
          {/* Intro overlay (client component) */}
          <ClientIntro />
          
          {/* Main content */}
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
