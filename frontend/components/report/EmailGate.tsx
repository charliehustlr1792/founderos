'use client'
import { useState } from 'react'
import { useFounderStore } from '@/store/useFounderStore'
import { api } from '@/lib/api'
import { analytics } from '@/lib/analytics'
import { Button } from '@/components/ui'

export function EmailGate() {
  const { sessionId, quiz, archetype, activeTab, setEmail, setLeadTag, persistToStorage } = useFounderStore()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)

  async function handleSubmit() {
    if (!isValid) return
    setLoading(true)
    setError(null)
    try {
      const { leadTag } = await api.captureEmail({ email: input, sessionId, quiz, archetype, q4: quiz.q4 })
      setEmail(input)
      setLeadTag(leadTag)
      persistToStorage()
      analytics.emailSubmitted(sessionId, activeTab)
      analytics.reportUnlocked(sessionId, activeTab)
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-6 p-5 bg-[#f5f5f5] border border-[#e5e5e5] rounded-lg space-y-4">
      <div className="space-y-1">
        <p className="text-sm font-medium text-[#0a0a0a]">Your report is ready.</p>
        <p className="text-sm text-[#555555]">Enter your email to unlock the full breakdown and download your PDF.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email" value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="you@example.com"
          className="flex-1 bg-white border border-[#e5e5e5] rounded-md px-4 py-2.5 text-sm text-[#0a0a0a] placeholder:text-[#cccccc] focus:border-[#cccccc] transition-colors"
        />
        <Button onClick={handleSubmit} disabled={!isValid} loading={loading} size="md" className="shrink-0">
          Unlock full report
        </Button>
      </div>
      {error && <p className="text-xs text-[#555555]">{error}</p>}
      <p className="text-xs text-[#999999]">No spam. Unsubscribe anytime.</p>
    </div>
  )
}