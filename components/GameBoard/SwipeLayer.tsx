'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, PanInfo } from 'framer-motion'
import type { Board, Position } from '@/types/game'

interface SwipeLayerProps {
  board: Board
  validMoves: Position[]
  onMove: (row: number, col: number) => void
}

export function SwipeLayer({ board, validMoves, onMove }: SwipeLayerProps) {
  const [swipeStart, setSwipeStart] = useState<Position | null>(null)
  const [swipeEnd, setSwipeEnd] = useState<Position | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const getCellFromPoint = useCallback((x: number, y: number): Position | null => {
    if (!containerRef.current) return null

    const rect = containerRef.current.getBoundingClientRect()
    const cellSize = rect.width / 8
    const col = Math.floor((x - rect.left) / cellSize)
    const row = Math.floor((y - rect.top) / cellSize)

    if (row >= 0 && row < 8 && col >= 0 && col < 8) {
      return [row, col]
    }

    return null
  }, [])

  const isValidMove = useCallback(
    (pos: Position | null) => {
      if (!pos) return false
      return validMoves.some(([r, c]) => r === pos[0] && c === pos[1])
    },
    [validMoves]
  )

  const handlePanStart = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const point = 'touches' in event ? event.touches[0] : (event as MouseEvent)
    const cell = getCellFromPoint(point.clientX, point.clientY)
    setSwipeStart(cell)
  }

  const handlePan = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const point = 'touches' in event ? event.touches[0] : (event as MouseEvent)
    const cell = getCellFromPoint(point.clientX, point.clientY)
    setSwipeEnd(cell)
  }

  const handlePanEnd = () => {
    if (swipeEnd && isValidMove(swipeEnd)) {
      onMove(swipeEnd[0], swipeEnd[1])
    }
    setSwipeStart(null)
    setSwipeEnd(null)
  }

  return (
    <>
      {/* Swipe overlay */}
      <motion.div
        ref={containerRef}
        className="absolute inset-0 touch-none"
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
      />

      {/* Swipe trajectory visualization */}
      {swipeStart && swipeEnd && (
        <svg
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 10 }}
        >
          <motion.line
            x1={`${(swipeStart[1] + 0.5) * 12.5}%`}
            y1={`${(swipeStart[0] + 0.5) * 12.5}%`}
            x2={`${(swipeEnd[1] + 0.5) * 12.5}%`}
            y2={`${(swipeEnd[0] + 0.5) * 12.5}%`}
            stroke="rgba(0, 243, 255, 0.8)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.2 }}
          />
        </svg>
      )}
    </>
  )
}
