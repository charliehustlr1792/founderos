'use client'
import { useState } from 'react'
import { useFounderStore } from '@/store/useFounderStore'
import { api } from '@/lib/api'
import { analytics } from '@/lib/analytics'

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
    <div className="mt-6 border border-[#171717] rounded-[4px] p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <div className="space-y-1 mb-4">
        <p className="text-[20px] font-semibold text-[#0a0a0a]" style={{ fontFamily: 'var(--font-geist-sans)' }}>
          Your report is ready.
        </p>
        <p className="text-[14px] text-[#525252]">Enter your email to unlock the full breakdown.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="you@example.com"
          className="flex-1 h-[44px] rounded-[4px] border border-[#e5e5e5] bg-white px-[14px] text-[14px] text-[#0a0a0a] outline-none transition-colors focus:border-[#171717] placeholder:text-[#a3a3a3]"
          style={{ fontFamily: 'var(--font-geist-sans)' }}
        />
        <button
          onClick={handleSubmit}
          disabled={!isValid || loading}
          className="h-[44px] px-5 rounded-[6px] bg-[#171717] text-white text-[14px] font-medium disabled:opacity-40 hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
          style={{ fontFamily: 'var(--font-geist-sans)' }}
        >
          {loading ? 'Unlocking...' : 'Unlock full report'}
        </button>
      </div>
      {error && (
        <p className="text-[12px] text-[#525252] mt-2" style={{ fontFamily: 'var(--font-geist-mono)' }}>{error}</p>
      )}
    </div>
  )
}