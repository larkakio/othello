import { useMemo } from 'react'
import { AIPlayer } from '@/lib/game/aiPlayer'
import type { Difficulty } from '@/types/game'

export function useAI(difficulty: Difficulty) {
  return useMemo(() => new AIPlayer(difficulty), [difficulty])
}
