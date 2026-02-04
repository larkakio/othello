'use client'

import { motion } from 'framer-motion'
import { BLACK, WHITE } from '@/lib/game/constants'
import type { Player } from '@/types/game'

interface ScoreBarProps {
  blackScore: number
  whiteScore: number
  currentPlayer: Player
}

export function ScoreBar({ blackScore, whiteScore, currentPlayer }: ScoreBarProps) {
  const total = blackScore + whiteScore
  const blackWidth = (blackScore / total) * 100
  const whiteWidth = (whiteScore / total) * 100

  return (
    <div className="w-full max-w-[90vw] md:max-w-[500px] mx-auto space-y-3">
      {/* Score display */}
      <div className="flex items-center justify-between text-lg font-mono">
        <motion.div
          className={`flex items-center space-x-2 ${
            currentPlayer === BLACK ? 'text-cyan-400' : 'text-gray-400'
          }`}
          animate={{ scale: currentPlayer === BLACK ? 1.1 : 1 }}
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-[0_0_10px_rgba(0,243,255,0.6)]" />
          <span className="font-bold">{blackScore}</span>
        </motion.div>

        <div className="text-purple-400">VS</div>

        <motion.div
          className={`flex items-center space-x-2 ${
            currentPlayer === WHITE ? 'text-pink-400' : 'text-gray-400'
          }`}
          animate={{ scale: currentPlayer === WHITE ? 1.1 : 1 }}
        >
          <span className="font-bold">{whiteScore}</span>
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 shadow-[0_0_10px_rgba(255,0,110,0.6)]" />
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="relative h-3 bg-[#1a1f3a] rounded-full overflow-hidden border border-[#252d4a]">
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-400 to-cyan-500"
          initial={{ width: '50%' }}
          animate={{ width: `${blackWidth}%` }}
          transition={{ duration: 0.3 }}
          style={{ boxShadow: '0 0 10px rgba(0, 243, 255, 0.5)' }}
        />
        <motion.div
          className="absolute right-0 top-0 h-full bg-gradient-to-l from-pink-400 to-pink-500"
          initial={{ width: '50%' }}
          animate={{ width: `${whiteWidth}%` }}
          transition={{ duration: 0.3 }}
          style={{ boxShadow: '0 0 10px rgba(255, 0, 110, 0.5)' }}
        />
      </div>
    </div>
  )
}
