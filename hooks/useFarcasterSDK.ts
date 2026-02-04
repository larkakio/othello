'use client'

import { useState, useEffect } from 'react'

type User = {
  fid?: number
  username?: string
  displayName?: string
  pfpUrl?: string
}

export function useFarcasterSDK() {
  const [user, setUser] = useState<User | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    import('@farcaster/frame-sdk')
      .then(async (module) => {
        const sdk = module.default
        try {
          const context = await sdk.context
          setUser(context.user || null)
          setIsReady(true)
        } catch (error) {
          console.error('SDK context error:', error)
          setIsReady(true)
        }
      })
      .catch((error) => {
        console.error('SDK import error:', error)
        setIsReady(true)
      })
  }, [])

  const openUrl = async (url: string) => {
    try {
      const module = await import('@farcaster/frame-sdk')
      const sdk = module.default
      await sdk.actions.openUrl(url)
    } catch {
      window.open(url, '_blank')
    }
  }

  const close = async () => {
    try {
      const module = await import('@farcaster/frame-sdk')
      const sdk = module.default
      await sdk.actions.close()
    } catch {
      window.close()
    }
  }

  return {
    user,
    isReady,
    openUrl,
    close
  }
}
