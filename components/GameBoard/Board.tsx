'use client'

import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { Cell } from './Cell'
import { SwipeLayer } from './SwipeLayer'
import type { Board as BoardType, Position } from '@/types/game'
import { isCorner } from '@/lib/game/boardUtils'

interface BoardProps {
  board: BoardType
  validMoves: Position[]
  onMove: (row: number, col: number) => void
  disabled?: boolean
}

export function Board({ board, validMoves, onMove, disabled = false }: BoardProps) {
  const [hoveredCell, setHoveredCell] = useState<Position | null>(null)

  const isValidMove = useCallback(
    (row: number, col: number) => {
      return validMoves.some(([r, c]) => r === row && c === col)
    },
    [validMoves]
  )

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (!disabled && isValidMove(row, col)) {
        onMove(row, col)
      }
    },
    [disabled, isValidMove, onMove]
  )

  return (
    <div className="relative w-full max-w-[90vw] md:max-w-[500px] mx-auto">
      {/* Background glow */}
      <div
        className="absolute inset-0 -z-10 rounded-xl"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 243, 255, 0.1), transparent 70%)',
          filter: 'blur(40px)'
        }}
      />

      {/* Board container */}
      <motion.div
        className="relative p-2 rounded-xl bg-gradient-to-br from-[#1a1f3a] to-[#252d4a] border-2 border-[#7b2cbf]"
        style={{ boxShadow: '0 0 30px rgba(123, 44, 191, 0.3)' }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Grid */}
        <div className="grid grid-cols-8 gap-0.5 bg-[#252d4a] p-0.5 rounded-lg">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                value={cell}
                isValid={!disabled && isValidMove(rowIndex, colIndex)}
                isCorner={isCorner(rowIndex, colIndex)}
                isHighlighted={
                  hoveredCell?.[0] === rowIndex && hoveredCell?.[1] === colIndex
                }
                onClick={() => handleCellClick(rowIndex, colIndex)}
                onHoverStart={() => setHoveredCell([rowIndex, colIndex])}
                onHoverEnd={() => setHoveredCell(null)}
              />
            ))
          )}
        </div>

        {/* Swipe overlay */}
        {!disabled && <SwipeLayer board={board} validMoves={validMoves} onMove={onMove} />}
      </motion.div>
    </div>
  )
}
