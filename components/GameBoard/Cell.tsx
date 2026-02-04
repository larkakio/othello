'use client'

import { motion } from 'framer-motion'
import { memo } from 'react'
import type { CellValue } from '@/types/game'
import { EMPTY, BLACK, WHITE } from '@/lib/game/constants'

interface CellProps {
  value: CellValue
  isValid: boolean
  isCorner: boolean
  isHighlighted: boolean
  onClick: () => void
  onHoverStart: () => void
  onHoverEnd: () => void
}

export const Cell = memo(function Cell({
  value,
  isValid,
  isCorner,
  isHighlighted,
  onClick,
  onHoverStart,
  onHoverEnd
}: CellProps) {
  return (
    <motion.button
      className={`
        relative aspect-square border border-[#252d4a]
        ${isCorner ? 'bg-gradient-to-br from-[#ffd700]/10 to-transparent' : 'bg-[#1a1f3a]'}
        ${isValid ? 'cursor-pointer hover:bg-[#252d4a]' : 'cursor-not-allowed'}
        ${isHighlighted ? 'ring-2 ring-cyan-400 ring-inset' : ''}
        transition-all duration-200
      `}
      onClick={isValid ? onClick : undefined}
      onHoverStart={isValid ? onHoverStart : undefined}
      onHoverEnd={isValid ? onHoverEnd : undefined}
      whileHover={isValid ? { scale: 1.02 } : undefined}
      whileTap={isValid ? { scale: 0.98 } : undefined}
    >
      {/* Corner indicator */}
      {isCorner && (
        <div className="absolute inset-0 border-2 border-yellow-400/30 rounded-sm" />
      )}

      {/* Valid move indicator */}
      {isValid && value === EMPTY && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-3 h-3 rounded-full bg-cyan-400/40 shadow-[0_0_10px_rgba(0,243,255,0.6)]" />
        </motion.div>
      )}

      {/* Game piece */}
      {value !== EMPTY && <Piece player={value} />}
    </motion.button>
  )
})

function Piece({ player }: { player: typeof BLACK | typeof WHITE }) {
  const isBlack = player === BLACK

  return (
    <motion.div
      className="absolute inset-1 flex items-center justify-center"
      initial={{ rotateY: 0 }}
      animate={{ rotateY: 0 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className={`
          w-full h-full rounded-full
          ${
            isBlack
              ? 'bg-gradient-to-br from-cyan-400 to-cyan-600'
              : 'bg-gradient-to-br from-pink-400 to-pink-600'
          }
          shadow-[0_4px_6px_rgba(0,0,0,0.3)]
        `}
        style={{
          boxShadow: isBlack
            ? '0 0 15px rgba(0, 243, 255, 0.6), 0 4px 6px rgba(0,0,0,0.3)'
            : '0 0 15px rgba(255, 0, 110, 0.6), 0 4px 6px rgba(0,0,0,0.3)'
        }}
      />
    </motion.div>
  )
}
