import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0a0e1a',
        'bg-gradient-start': '#0f1729',
        'bg-gradient-end': '#1a0f2e',
        'surface': '#1a1f3a',
        'surface-elevated': '#252d4a',
        'neon-cyan': '#00f3ff',
        'neon-pink': '#ff006e',
        'neon-purple': '#c77dff',
        'neon-green': '#39ff14',
        'neon-yellow': '#ffea00',
        'player-black': '#00f3ff',
        'player-white': '#ff006e',
        'border-neon': '#7b2cbf',
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-strong': '0 0 20px rgba(0, 243, 255, 0.8)',
        'glow-medium': '0 0 15px rgba(0, 243, 255, 0.4)',
        'glow-soft': '0 0 10px rgba(0, 243, 255, 0.2)',
        'glow-pink': '0 0 20px rgba(255, 0, 110, 0.6)',
        'glow-purple': '0 0 20px rgba(199, 125, 255, 0.6)',
      },
    },
  },
  plugins: [],
}

export default config
