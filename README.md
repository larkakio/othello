# Othello - Cyber Edition

A futuristic Othello (Reversi) game built as a mini app for Base and Farcaster, featuring cyber-neon aesthetics and innovative swipe controls.

## Features

- **Cyber-Neon Design**: Tron-inspired visuals with glowing neon effects
- **AI Opponent**: Three difficulty levels (Easy, Medium, Hard)
- **Local Multiplayer**: Play against friends on the same device
- **Swipe Controls**: Innovative gesture-based gameplay
- **Mobile-First**: Optimized for touch interfaces
- **Farcaster Integration**: Seamlessly integrated with Base app

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Blockchain**: Base Network
- **Platform**: Farcaster Mini App

## Getting Started

### Prerequisites

- Node.js 18+ (ideally 20.9.0+)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build

```bash
npm run build
npm start
```

## Game Rules

Othello (Reversi) is a strategy board game for two players:

1. Players take turns placing discs on an 8×8 board
2. Capture opponent's discs by sandwiching them between your pieces
3. Captured discs flip to your color
4. The game ends when no valid moves remain
5. The player with the most discs wins

### Strategy Tips

- **Corners are King**: Corner positions cannot be flipped
- **Avoid X-squares**: Squares diagonal to corners are dangerous
- **Edge Control**: Control edges to limit opponent's options
- **Mobility**: Keep more valid moves than your opponent

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/othello-miniapp)

### Manual Deployment

1. Build the app: `npm run build`
2. Deploy to your hosting provider
3. Set environment variable: `NEXT_PUBLIC_APP_URL=https://your-domain.com`
4. Generate account association at Base Build dashboard
5. Update `public/.well-known/farcaster.json` with your credentials

## Farcaster Integration

This app is designed to work as a mini app within the Farcaster ecosystem:

1. Deploy your app to a public URL
2. Generate account association credentials at [base.dev](https://base.dev/preview?tab=account)
3. Update the `farcaster.json` manifest file
4. Test your app at [base.dev/preview](https://base.dev/preview)
5. Publish by creating a cast with your app's URL

## Project Structure

```
othello-miniapp/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main game page
├── components/            # React components
│   ├── GameBoard/        # Board, Cell, SwipeLayer
│   └── UI/               # Buttons, Menus, ScoreBar
├── context/              # React Context providers
├── hooks/                # Custom React hooks
├── lib/                  # Core game logic
│   └── game/             # Engine, AI, utilities
├── public/               # Static assets
│   ├── icon.png          # 1024×1024 app icon
│   ├── hero-image.png    # 1200×630 hero banner
│   └── .well-known/      # Farcaster manifest
└── types/                # TypeScript definitions
```

## License

MIT

## Credits

Inspired by Tron, Cyberpunk 2077, and classic Othello strategy games.
