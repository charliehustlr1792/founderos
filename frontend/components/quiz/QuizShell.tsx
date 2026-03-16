'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useFounderStore } from '@/store/useFounderStore'
import { api } from '@/lib/api'
import { analytics } from '@/lib/analytics'
import { Q1Stage } from './Q1Stage'
import { Q2Idea } from './Q2Idea'
import { Q3UserType } from './Q3UserType'
import { Q4Seriousness } from './Q4Seriousness'
import type { RouteKey } from '@/types'

const ROUTE_MAP: Record<string, RouteKey> = { idea: 'A', validation: 'B', build: 'C' }

const LOADING_MESSAGES = [
  'Analysing idea...',
  'Detecting archetype...',
  'Scanning demand signals...',
  'Mapping communities...',
  'Building your report...',
]

function useTypewriter(messages: string[], active: boolean) {
  const [displayText, setDisplayText] = useState('')
  const [msgIdx, setMsgIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (!active) { setDisplayText(''); setMsgIdx(0); setCharIdx(0); setFading(false); return }
    if (fading) {
      const t = setTimeout(() => { setFading(false); setMsgIdx(i => (i + 1) % messages.length); setCharIdx(0) }, 300)
      return () => clearTimeout(t)
    }
    if (charIdx < messages[msgIdx].length) {
      const t = setTimeout(() => { setDisplayText(messages[msgIdx].slice(0, charIdx + 1)); setCharIdx(c => c + 1) }, 40)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setFading(true), 800)
    return () => clearTimeout(t)
  }, [active, charIdx, msgIdx, fading, messages])

  return { displayText, fading }
}

export function QuizShell() {
  const router = useRouter()
  const startTimeRef = useRef<number>(Date.now())
  const { sessionId, quiz, setQ1, setQ2, setQ3, setQ4, setArchetype, setActiveTab, persistToStorage } = useFounderStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [started, setStarted] = useState(false)

  const { displayText, fading } = useTypewriter(LOADING_MESSAGES, loading)

  useEffect(() => {
    if (started) return
    const handler = () => { analytics.quizStarted(sessionId); setStarted(true) }
    window.addEventListener('click', handler, { once: true })
    return () => window.removeEventListener('click', handler)
  }, [sessionId, started])

  useEffect(() => { analytics.pageViewed(sessionId) }, [sessionId])

  const isComplete = quiz.q1 !== null && quiz.q2.trim().length >= 20 && quiz.q3 !== null && quiz.q4 !== null

  async function handleSubmit() {
    if (!isComplete) return
    setLoading(true)
    setError(null)
    try {
      const { archetype } = await api.classify(quiz.q2)
      setArchetype(archetype)
      const assignedRoute = ROUTE_MAP[quiz.q1!] ?? 'A'
      setActiveTab(assignedRoute)
      persistToStorage()
      const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000)
      analytics.quizQ2Submitted(sessionId, quiz.q2.length, archetype)
      analytics.quizCompleted(sessionId, assignedRoute, elapsed)
      router.push('/report')
    } catch (err) {
      setError('Something went wrong. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-10">
      <Q1Stage value={quiz.q1} onChange={(val) => { setQ1(val); analytics.quizQ1Answered(sessionId, val) }} />
      <Q2Idea value={quiz.q2} onChange={setQ2} />
      <Q3UserType value={quiz.q3} onChange={(val) => { setQ3(val); analytics.quizQ3Answered(sessionId, val) }} />
      <Q4Seriousness value={quiz.q4} onChange={(val) => { setQ4(val); analytics.quizQ4Answered(sessionId, val) }} />

      <div className="mt-2 space-y-3">
        {error && (
          <p className="text-[12px] text-[#525252]" style={{ fontFamily: 'var(--font-geist-mono)' }}>{error}</p>
        )}
        <button
          onClick={handleSubmit}
          disabled={!isComplete || loading}
          className="w-full h-[52px] rounded-[6px] bg-[#171717] text-white text-[15px] font-medium flex items-center justify-center transition-opacity disabled:opacity-40 hover:opacity-90"
          style={{ fontFamily: 'var(--font-geist-sans)' }}
        >
          {loading ? (
            <span
              style={{ fontFamily: 'var(--font-geist-mono)', opacity: fading ? 0 : 1, transition: 'opacity 200ms ease', fontSize: '13px' }}
            >
              {displayText}
            </span>
          ) : (
            'Generate my report →'
          )}
        </button>
        <p
          className="text-[11px] text-[#a3a3a3] text-center tracking-[0.05em]"
          style={{ fontFamily: 'var(--font-geist-mono)' }}
        >
          No credit card · No spam · 5 minutes
        </p>
      </div>
    </div>
  )
}