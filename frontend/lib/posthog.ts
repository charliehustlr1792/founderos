'use client'

import posthog from 'posthog-js'

let initialised = false

export function initPostHog() {
  if (
    typeof window === 'undefined' ||
    initialised ||
    !process.env.NEXT_PUBLIC_POSTHOG_KEY
  ) return

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com',
    capture_pageview: false,   // we fire page_viewed manually with session context
    capture_pageleave: true,
    autocapture: false,        // we track everything explicitly
    persistence: 'localStorage',
    bootstrap: {
      distinctID: getOrCreateSessionId(),
    },
  })

  initialised = true
}

export function getPostHogClient() {
  return posthog
}

function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return ''
  try {
    const stored = localStorage.getItem('founderOS_session')
    if (stored) {
      const parsed = JSON.parse(stored)
      if (parsed?.sessionId) return parsed.sessionId
    }
  } catch {
    // ignore
  }
  return crypto.randomUUID()
}