export const BOARD_SIZE = 8
export const EMPTY = 0
export const BLACK = 1
export const WHITE = 2

export const DIRECTIONS = [
  [-1, -1], [-1, 0], [-1, 1], // Top row
  [0, -1], [0, 1],             // Middle row
  [1, -1], [1, 0], [1, 1]      // Bottom row
] as const

export const CORNER_POSITIONS: readonly [number, number][] = [
  [0, 0], [0, 7], [7, 0], [7, 7]
] as const

export const X_SQUARE_POSITIONS: readonly [number, number][] = [
  [1, 1], [1, 6], [6, 1], [6, 6]
] as const

export const C_SQUARE_POSITIONS: readonly [number, number][] = [
  [0, 1], [1, 0], [0, 6], [1, 7],
  [6, 0], [7, 1], [6, 7], [7, 6]
] as const
