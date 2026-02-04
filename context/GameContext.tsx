'use client'

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react'
import { OthelloEngine } from '@/lib/game/othelloEngine'
import { BLACK, WHITE } from '@/lib/game/constants'
import { useAI } from '@/hooks/useAI'
import type { GameState, Player, Difficulty, GameMode } from '@/types/game'

interface GameContextType {
  gameState: GameState
  difficulty: Difficulty
  gameMode: GameMode
  playMove: (row: number, col: number) => boolean
  resetGame: () => void
  undoMove: () => void
  setDifficulty: (difficulty: Difficulty) => void
  setGameMode: (mode: GameMode) => void
}

const GameContext = createContext<GameContextType | null>(null)

export function useGame() {
  const context = useContext(GameContext)
  if (!context) throw new Error('useGame must be used within GameProvider')
  return context
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [engine] = useState(() => new OthelloEngine())
  const [gameState, setGameState] = useState<GameState>(engine.getState())
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')
  const [gameMode, setGameMode] = useState<GameMode>('ai')
  const ai = useAI(difficulty)

  const updateState = useCallback(() => {
    setGameState({ ...engine.getState() })
  }, [engine])

  const makeAIMove = useCallback(() => {
    if (gameMode !== 'ai' || engine.isGameOver()) return

    setTimeout(() => {
      const validMoves = engine.getValidMoves()
      if (validMoves.length > 0) {
        const aiMove = ai.getBestMove(engine.getBoard(), WHITE)
        if (aiMove) {
          engine.playMove(...aiMove)
          updateState()
        }
      }
    }, 800)
  }, [engine, gameMode, ai, updateState])

  const playMove = useCallback(
    (row: number, col: number) => {
      const success = engine.playMove(row, col)
      if (success) {
        updateState()
        
        // AI move
        if (gameMode === 'ai' && engine.getCurrentPlayer() === WHITE && !engine.isGameOver()) {
          makeAIMove()
        }
      }
      return success
    },
    [engine, gameMode, updateState, makeAIMove]
  )

  const resetGame = useCallback(() => {
    engine.reset()
    updateState()
  }, [engine, updateState])

  const undoMove = useCallback(() => {
    engine.undoMove()
    updateState()
  }, [engine, updateState])

  return (
    <GameContext.Provider
      value={{
        gameState,
        difficulty,
        gameMode,
        playMove,
        resetGame,
        undoMove,
        setDifficulty,
        setGameMode
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
