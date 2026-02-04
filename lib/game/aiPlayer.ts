import { getAllValidMoves, makeMove, getCapturedPieces } from './moveValidator'
import { getOpponent, countPieces } from './boardUtils'
import { CORNER_POSITIONS, X_SQUARE_POSITIONS, C_SQUARE_POSITIONS } from './constants'
import type { Board, Position, Player, Difficulty } from '@/types/game'

export class AIPlayer {
  constructor(private difficulty: Difficulty) {}

  public getBestMove(board: Board, player: Player): Position | null {
    switch (this.difficulty) {
      case 'easy':
        return this.getRandomMove(board, player)
      case 'medium':
        return this.getStrategicMove(board, player)
      case 'hard':
        return this.getMinimaxMove(board, player)
      default:
        return this.getRandomMove(board, player)
    }
  }

  private getRandomMove(board: Board, player: Player): Position | null {
    const validMoves = getAllValidMoves(board, player)
    if (validMoves.length === 0) return null
    return validMoves[Math.floor(Math.random() * validMoves.length)]
  }

  private getStrategicMove(board: Board, player: Player): Position | null {
    const validMoves = getAllValidMoves(board, player)
    if (validMoves.length === 0) return null

    // Priority: Corners > Edges > Avoid dangerous squares > Max captures

    // 1. Try to take corners
    const cornerMoves = validMoves.filter(([r, c]) =>
      CORNER_POSITIONS.some(([cr, cc]) => cr === r && cc === c)
    )
    if (cornerMoves.length > 0) {
      return cornerMoves[0]
    }

    // 2. Avoid X-squares and C-squares (dangerous!)
    const safeMoves = validMoves.filter(([r, c]) => {
      const isXSquare = X_SQUARE_POSITIONS.some(([xr, xc]) => xr === r && xc === c)
      const isCSquare = C_SQUARE_POSITIONS.some(([cr, cc]) => cr === r && cc === c)
      return !isXSquare && !isCSquare
    })

    const movesToConsider = safeMoves.length > 0 ? safeMoves : validMoves

    // 3. Prefer edge moves
    const edgeMoves = movesToConsider.filter(([r, c]) =>
      r === 0 || r === 7 || c === 0 || c === 7
    )

    if (edgeMoves.length > 0) {
      return this.getBestCaptureMove(board, edgeMoves, player)
    }

    // 4. Choose move with most captures
    return this.getBestCaptureMove(board, movesToConsider, player)
  }

  private getBestCaptureMove(board: Board, moves: Position[], player: Player): Position {
    let bestMove = moves[0]
    let maxCaptures = 0

    for (const [r, c] of moves) {
      const captured = getCapturedPieces(board, r, c, player)
      if (captured.length > maxCaptures) {
        maxCaptures = captured.length
        bestMove = [r, c]
      }
    }

    return bestMove
  }

  private getMinimaxMove(board: Board, player: Player): Position | null {
    const validMoves = getAllValidMoves(board, player)
    if (validMoves.length === 0) return null

    let bestMove: Position | null = null
    let bestScore = -Infinity

    for (const [r, c] of validMoves) {
      const result = makeMove(board, r, c, player)
      if (!result) continue

      const score = this.minimax(result.board, 4, false, player, -Infinity, Infinity)

      if (score > bestScore) {
        bestScore = score
        bestMove = [r, c]
      }
    }

    return bestMove
  }

  private minimax(
    board: Board,
    depth: number,
    isMaximizing: boolean,
    player: Player,
    alpha: number,
    beta: number
  ): number {
    if (depth === 0) {
      return this.evaluateBoard(board, player)
    }

    const currentPlayer = isMaximizing ? player : (getOpponent(player) as Player)
    const validMoves = getAllValidMoves(board, currentPlayer)

    if (validMoves.length === 0) {
      return this.evaluateBoard(board, player)
    }

    if (isMaximizing) {
      let maxScore = -Infinity

      for (const [r, c] of validMoves) {
        const result = makeMove(board, r, c, currentPlayer)
        if (!result) continue

        const score = this.minimax(result.board, depth - 1, false, player, alpha, beta)
        maxScore = Math.max(maxScore, score)
        alpha = Math.max(alpha, score)

        if (beta <= alpha) break // Alpha-beta pruning
      }

      return maxScore
    } else {
      let minScore = Infinity

      for (const [r, c] of validMoves) {
        const result = makeMove(board, r, c, currentPlayer)
        if (!result) continue

        const score = this.minimax(result.board, depth - 1, true, player, alpha, beta)
        minScore = Math.min(minScore, score)
        beta = Math.min(beta, score)

        if (beta <= alpha) break // Alpha-beta pruning
      }

      return minScore
    }
  }

  private evaluateBoard(board: Board, player: Player): number {
    const opponent = getOpponent(player) as Player

    // Position weights
    const weights = [
      [100, -20, 10, 5, 5, 10, -20, 100],
      [-20, -50, -2, -2, -2, -2, -50, -20],
      [10, -2, 5, 1, 1, 5, -2, 10],
      [5, -2, 1, 0, 0, 1, -2, 5],
      [5, -2, 1, 0, 0, 1, -2, 5],
      [10, -2, 5, 1, 1, 5, -2, 10],
      [-20, -50, -2, -2, -2, -2, -50, -20],
      [100, -20, 10, 5, 5, 10, -20, 100]
    ]

    let score = 0

    // Position score
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (board[r][c] === player) {
          score += weights[r][c]
        } else if (board[r][c] === opponent) {
          score -= weights[r][c]
        }
      }
    }

    // Piece count differential
    const playerPieces = countPieces(board, player)
    const opponentPieces = countPieces(board, opponent)
    score += (playerPieces - opponentPieces)

    // Mobility (valid moves)
    const playerMoves = getAllValidMoves(board, player).length
    const opponentMoves = getAllValidMoves(board, opponent).length
    score += (playerMoves - opponentMoves) * 2

    return score
  }
}
