import { BOARD_SIZE, EMPTY, BLACK, WHITE } from './constants'
import type { Board, CellValue, Position } from '@/types/game'

export function createEmptyBoard(): Board {
  return Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(EMPTY))
}

export function createInitialBoard(): Board {
  const board = createEmptyBoard()
  const mid = BOARD_SIZE / 2
  
  // Standard Othello starting position
  board[mid - 1][mid - 1] = WHITE
  board[mid - 1][mid] = BLACK
  board[mid][mid - 1] = BLACK
  board[mid][mid] = WHITE
  
  return board
}

export function cloneBoard(board: Board): Board {
  return board.map(row => [...row])
}

export function isValidPosition(row: number, col: number): boolean {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE
}

export function isCorner(row: number, col: number): boolean {
  return (row === 0 || row === BOARD_SIZE - 1) && (col === 0 || col === BOARD_SIZE - 1)
}

export function isEdge(row: number, col: number): boolean {
  return row === 0 || row === BOARD_SIZE - 1 || col === 0 || col === BOARD_SIZE - 1
}

export function countPieces(board: Board, player: CellValue): number {
  return board.flat().filter(cell => cell === player).length
}

export function getOpponent(player: CellValue): CellValue {
  return player === BLACK ? WHITE : BLACK
}
