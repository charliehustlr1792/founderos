'use client'

import { useEffect } from 'react'
import { initPostHog } from '@/lib/posthog'
import { useFounderStore } from '@/store/useFounderStore'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const hydrateFromStorage = useFounderStore((s) => s.hydrateFromStorage)

  useEffect(() => {
    // Hydrate Zustand store from localStorage first
    hydrateFromStorage()
    // Then init PostHog — it will pick up the sessionId from localStorage
    initPostHog()
  }, [hydrateFromStorage])

  return <>{children}</>
}