'use client'

import { useAccount } from 'wagmi'

type User = {
  fid?: number
  username?: string
  displayName?: string
  pfpUrl?: string
}

export function useFarcasterSDK() {
  const { address } = useAccount()

  const user: User | null = address
    ? {
        displayName: `${address.slice(0, 6)}…${address.slice(-4)}`,
      }
    : null

  const openUrl = async (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const close = async () => {}

  return {
    user,
    isReady: true,
    openUrl,
    close,
  }
}
