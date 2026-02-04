export interface FarcasterUser {
  fid?: number
  username?: string
  displayName?: string
  pfpUrl?: string
}

export interface FarcasterContext {
  user: FarcasterUser | null
}
