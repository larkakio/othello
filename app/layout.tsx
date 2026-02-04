import type { Metadata } from 'next'
import './globals.css'

// Same as nibbles: hardcoded production URL fallback (no VERCEL_URL)
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://othello-omega.vercel.app'

const FC_EMBED = {
  version: '1',
  imageUrl: `${APP_URL}/hero-image.png`,
  button: {
    title: 'Play Othello',
    action: {
      type: 'launch_frame' as const,
      name: 'Othello - Cyber Edition',
      url: APP_URL,
      splashImageUrl: `${APP_URL}/hero-image.png`,
      splashBackgroundColor: '#0a0e1a',
    },
  },
}

export const metadata: Metadata = {
  title: 'Othello - Cyber Edition',
  description: 'Futuristic Othello game on Base & Farcaster',
  other: {
    'viewport': 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover',
    'theme-color': '#0a0e1a',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'base:app_id': '6983028cbd202a51855da57d',
    'fc:miniapp': JSON.stringify(FC_EMBED),
    'fc:frame': JSON.stringify(FC_EMBED),
  },
  openGraph: {
    title: 'Othello - Cyber Edition',
    description: 'Play futuristic Othello on Base',
    images: [
      {
        url: `${APP_URL}/hero-image.png`,
        width: 1200,
        height: 630,
        alt: 'Othello Cyber Edition Game',
      }
    ],
    type: 'website',
    url: APP_URL,
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
