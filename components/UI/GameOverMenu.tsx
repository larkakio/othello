'use client'

import { motion } from 'framer-motion'
import { Button } from './Button'
import { BLACK, WHITE } from '@/lib/game/constants'
import type { Player } from '@/types/game'

interface GameOverMenuProps {
  winner: Player | null
  blackScore: number
  whiteScore: number
  onPlayAgain: () => void
  onMenu: () => void
}

export function GameOverMenu({
  winner,
  blackScore,
  whiteScore,
  onPlayAgain,
  onMenu
}: GameOverMenuProps) {
  const winnerText =
    winner === null ? 'Draw!' : winner === BLACK ? 'Cyan Wins!' : 'Pink Wins!'

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-gradient-to-br from-[#1a1f3a] to-[#252d4a] border-2 border-[#7b2cbf] rounded-2xl p-8 max-w-md w-full mx-4 space-y-6"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Title */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-4xl font-display font-bold text-white">GAME OVER!</h2>
          <h3
            className={`text-2xl font-bold ${
              winner === BLACK
                ? 'text-cyan-400'
                : winner === WHITE
                ? 'text-pink-400'
                : 'text-purple-400'
            }`}
          >
            {winnerText}
          </h3>
        </motion.div>

        {/* Scores */}
        <motion.div
          className="flex items-center justify-center space-x-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-[0_0_20px_rgba(0,243,255,0.6)]" />
            <p className="text-2xl font-bold text-cyan-400">{blackScore}</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 shadow-[0_0_20px_rgba(255,0,110,0.6)]" />
            <p className="text-2xl font-bold text-pink-400">{whiteScore}</p>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Button onClick={onPlayAgain} variant="primary" size="lg">
            Play Again
          </Button>
          <Button onClick={onMenu} variant="secondary" size="md">
            Main Menu
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
