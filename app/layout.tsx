import type { Metadata } from 'next'
import './globals.css'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'Othello - Cyber Edition',
  description: 'Futuristic Othello game on Base & Farcaster',
  other: {
    'viewport': 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover',
    'theme-color': '#0a0e1a',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
  openGraph: {
    title: 'Othello - Cyber Edition',
    description: 'Play futuristic Othello on Base',
    images: [`${APP_URL}/hero-image.png`],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-[#0f1729] to-[#1a0f2e] min-h-screen">
        {children}
      </body>
    </html>
  )
}
