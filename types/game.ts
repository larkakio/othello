import { BLACK, WHITE, EMPTY } from '@/lib/game/constants'

export type Player = typeof BLACK | typeof WHITE
export type CellValue = typeof EMPTY | typeof BLACK | typeof WHITE
export type Board = CellValue[][]
export type Position = [number, number]

export interface GameState {
  board: Board
  currentPlayer: Player
  blackScore: number
  whiteScore: number
  validMoves: Position[]
  gameOver: boolean
  winner: Player | null
  moveHistory: Move[]
}

export interface Move {
  position: Position
  player: Player
  captured: Position[]
  timestamp: number
}

export type Difficulty = 'easy' | 'medium' | 'hard'
export type GameMode = 'ai' | 'pvp'
