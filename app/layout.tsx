import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/providers/LenisProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
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
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <LenisProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
