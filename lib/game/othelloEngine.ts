import { createInitialBoard, countPieces, getOpponent, cloneBoard } from './boardUtils'
import { getAllValidMoves, makeMove, hasAnyValidMove } from './moveValidator'
import { BLACK, WHITE } from './constants'
import type { GameState, Move, Player, Position } from '@/types/game'

export class OthelloEngine {
  private state: GameState

  constructor() {
    this.state = this.createInitialState()
  }

  private createInitialState(): GameState {
    const board = createInitialBoard()
    return {
      board,
      currentPlayer: BLACK,
      blackScore: 2,
      whiteScore: 2,
      validMoves: getAllValidMoves(board, BLACK),
      gameOver: false,
      winner: null,
      moveHistory: []
    }
  }

  public getState(): GameState {
    return this.state
  }

  public reset(): void {
    this.state = this.createInitialState()
  }

  public playMove(row: number, col: number): boolean {
    if (this.state.gameOver) return false

    const result = makeMove(
      this.state.board,
      row,
      col,
      this.state.currentPlayer
    )

    if (!result) return false

    const move: Move = {
      position: [row, col],
      player: this.state.currentPlayer,
      captured: result.captured,
      timestamp: Date.now()
    }

    this.state.board = result.board
    this.state.moveHistory.push(move)
    this.updateScores()
    this.switchPlayer()
    this.checkGameOver()

    return true
  }

  private updateScores(): void {
    this.state.blackScore = countPieces(this.state.board, BLACK)
    this.state.whiteScore = countPieces(this.state.board, WHITE)
  }

  private switchPlayer(): void {
    const nextPlayer = getOpponent(this.state.currentPlayer) as Player

    // Check if next player has valid moves
    if (hasAnyValidMove(this.state.board, nextPlayer)) {
      this.state.currentPlayer = nextPlayer
      this.state.validMoves = getAllValidMoves(this.state.board, nextPlayer)
    } else {
      // Next player has no moves, stay with current player
      this.state.validMoves = getAllValidMoves(
        this.state.board,
        this.state.currentPlayer
      )

      // If current player also has no moves, game over
      if (this.state.validMoves.length === 0) {
        this.state.gameOver = true
      }
    }
  }

  private checkGameOver(): void {
    if (!hasAnyValidMove(this.state.board, BLACK) && !hasAnyValidMove(this.state.board, WHITE)) {
      this.state.gameOver = true
      this.state.validMoves = []

      if (this.state.blackScore > this.state.whiteScore) {
        this.state.winner = BLACK
      } else if (this.state.whiteScore > this.state.blackScore) {
        this.state.winner = WHITE
      } else {
        this.state.winner = null // Draw
      }
    }
  }

  public isValidMove(row: number, col: number): boolean {
    return this.state.validMoves.some(([r, c]) => r === row && c === col)
  }

  public getBoard(): typeof this.state.board {
    return this.state.board
  }

  public getCurrentPlayer(): Player {
    return this.state.currentPlayer
  }

  public getValidMoves(): Position[] {
    return this.state.validMoves
  }

  public getScores(): { black: number; white: number } {
    return {
      black: this.state.blackScore,
      white: this.state.whiteScore
    }
  }

  public isGameOver(): boolean {
    return this.state.gameOver
  }

  public getWinner(): Player | null {
    return this.state.winner
  }

  public getMoveHistory(): Move[] {
    return this.state.moveHistory
  }

  public undoMove(): boolean {
    if (this.state.moveHistory.length === 0) return false

    // Reset and replay all moves except the last one
    const history = [...this.state.moveHistory]
    history.pop()

    this.reset()

    for (const move of history) {
      this.playMove(...move.position)
    }

    return true
  }
}
