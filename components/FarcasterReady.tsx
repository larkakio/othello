'use client'

import { useEffect } from 'react'

/**
 * Calls sdk.actions.ready() from @farcaster/miniapp-sdk as soon as the app mounts.
 * This hides the Farcaster splash screen and allows the Mini App to display.
 * Must be called early - component is rendered in root layout.
 */
export function FarcasterReady() {
  useEffect(() => {
    import('@farcaster/miniapp-sdk')
      .then(({ sdk }) => {
        sdk.actions.ready().catch(() => {})
      })
      .catch(() => {})
  }, [])
  return null
}
