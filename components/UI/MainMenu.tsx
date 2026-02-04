'use client'

import { motion } from 'framer-motion'
import { Button } from './Button'

interface MainMenuProps {
  onStartAI: () => void
  onStartPvP: () => void
  userName?: string
}

export function MainMenu({ onStartAI, onStartPvP, userName }: MainMenuProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen p-6 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Logo */}
      <motion.div
        className="text-center space-y-2"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="font-display text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          OTHELLO
        </h1>
        <p className="text-purple-300 text-sm">Cyber Edition</p>
      </motion.div>

      {/* User greeting */}
      {userName && (
        <motion.p
          className="text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Welcome, {userName}!
        </motion.p>
      )}

      {/* Menu buttons */}
      <motion.div
        className="flex flex-col space-y-4 w-full max-w-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button onClick={onStartAI} variant="primary" size="lg">
          Play vs AI
        </Button>
        <Button onClick={onStartPvP} variant="secondary" size="lg">
          Play vs Player
        </Button>
      </motion.div>

      {/* Footer */}
      <motion.p
        className="text-xs text-gray-500 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        A minute to learn — a lifetime to master
      </motion.p>
    </motion.div>
  )
}
