import { DIRECTIONS, EMPTY } from './constants'
import { isValidPosition, getOpponent, cloneBoard } from './boardUtils'
import type { Board, Position, Player } from '@/types/game'

export function getCapturableInDirection(
  board: Board,
  row: number,
  col: number,
  direction: readonly [number, number],
  player: Player
): Position[] {
  const [dRow, dCol] = direction
  const opponent = getOpponent(player)
  const captured: Position[] = []
  
  let r = row + dRow
  let c = col + dCol
  
  // Must have at least one opponent piece
  while (isValidPosition(r, c) && board[r][c] === opponent) {
    captured.push([r, c])
    r += dRow
    c += dCol
  }
  
  // Must end with player's piece
  if (isValidPosition(r, c) && board[r][c] === player && captured.length > 0) {
    return captured
  }
  
  return []
}

export function getCapturedPieces(
  board: Board,
  row: number,
  col: number,
  player: Player
): Position[] {
  if (board[row][col] !== EMPTY) return []
  
  const allCaptured: Position[] = []
  
  for (const direction of DIRECTIONS) {
    const captured = getCapturableInDirection(board, row, col, direction, player)
    allCaptured.push(...captured)
  }
  
  return allCaptured
}

export function isValidMove(
  board: Board,
  row: number,
  col: number,
  player: Player
): boolean {
  return getCapturedPieces(board, row, col, player).length > 0
}

export function getAllValidMoves(board: Board, player: Player): Position[] {
  const validMoves: Position[] = []
  
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (isValidMove(board, row, col, player)) {
        validMoves.push([row, col])
      }
    }
  }
  
  return validMoves
}

export function makeMove(
  board: Board,
  row: number,
  col: number,
  player: Player
): { board: Board; captured: Position[] } | null {
  const captured = getCapturedPieces(board, row, col, player)
  
  if (captured.length === 0) {
    return null // Invalid move
  }
  
  const newBoard = cloneBoard(board)
  newBoard[row][col] = player
  
  // Flip captured pieces
  for (const [r, c] of captured) {
    newBoard[r][c] = player
  }
  
  return { board: newBoard, captured }
}

export function hasAnyValidMove(board: Board, player: Player): boolean {
  return getAllValidMoves(board, player).length > 0
}

export function isGameOver(board: Board, blackPlayer: Player, whitePlayer: Player): boolean {
  return !hasAnyValidMove(board, blackPlayer) && !hasAnyValidMove(board, whitePlayer)
}
