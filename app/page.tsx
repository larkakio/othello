'use client'

import { useState } from 'react'
import { GameProvider, useGame } from '@/context/GameContext'
import { FarcasterReady } from '@/components/FarcasterReady'
import { Board } from '@/components/GameBoard/Board'
import { ScoreBar } from '@/components/UI/ScoreBar'
import { MainMenu } from '@/components/UI/MainMenu'
import { GameOverMenu } from '@/components/UI/GameOverMenu'
import { useFarcasterSDK } from '@/hooks/useFarcasterSDK'
import { motion } from 'framer-motion'

function GameScreen() {
  const { gameState, playMove, resetGame, setGameMode } = useGame()
  const { user } = useFarcasterSDK()
  const [showMenu, setShowMenu] = useState(true)
  const [showDifficultySelect, setShowDifficultySelect] = useState(false)

  const handleStartAI = () => {
    setShowMenu(false)
    setGameMode('ai')
    resetGame()
  }

  const handleStartPvP = () => {
    setShowMenu(false)
    setGameMode('pvp')
    resetGame()
  }

  const handleBackToMenu = () => {
    setShowMenu(true)
    resetGame()
  }

  if (showMenu) {
    return (
      <MainMenu
        onStartAI={handleStartAI}
        onStartPvP={handleStartPvP}
        userName={user?.displayName || user?.username}
      />
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between w-full max-w-[90vw] md:max-w-[500px]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={handleBackToMenu}
          className="text-purple-400 hover:text-purple-300 transition-colors"
        >
          ← Menu
        </button>
        <h1 className="font-display text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
          OTHELLO
        </h1>
        <div className="w-16" /> {/* Spacer */}
      </motion.div>

      {/* Score Bar */}
      <ScoreBar
        blackScore={gameState.blackScore}
        whiteScore={gameState.whiteScore}
        currentPlayer={gameState.currentPlayer}
      />

      {/* Game Board */}
      <Board
        board={gameState.board}
        validMoves={gameState.validMoves}
        onMove={playMove}
        disabled={gameState.gameOver}
      />

      {/* Info */}
      <motion.div
        className="text-center space-y-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-gray-400 text-sm">
          Valid Moves: {gameState.validMoves.length}
        </p>
        {gameState.moveHistory.length > 0 && (
          <p className="text-gray-500 text-xs">
            Moves: {gameState.moveHistory.length}
          </p>
        )}
      </motion.div>

      {/* Game Over Menu */}
      {gameState.gameOver && (
        <GameOverMenu
          winner={gameState.winner}
          blackScore={gameState.blackScore}
          whiteScore={gameState.whiteScore}
          onPlayAgain={resetGame}
          onMenu={handleBackToMenu}
        />
      )}

      {/* Background particles effect */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse-slow" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse-slow" />
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <GameProvider>
      <FarcasterReady />
      <GameScreen />
    </GameProvider>
  )
}
