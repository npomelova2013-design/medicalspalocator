import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })

export const metadata: Metadata = {
  title: {
    default: 'Medical Spa Locator | Find the Best Med Spas in Illinois',
    template: '%s | Medical Spa Locator',
  },
  description: 'Compare 286+ medical spas across Illinois. Read reviews, compare ratings, and book your consultation. Botox, fillers, laser treatments and more.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://medicalspalocator.com'),
  openGraph: {
    title: 'Medical Spa Locator | Find the Best Med Spas in Illinois',
    description: 'Compare 286+ medical spas across Illinois. Read reviews, compare ratings, and book consultations.',
    type: 'website',
    siteName: 'Medical Spa Locator',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="font-sans min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
